const { User, ExerciseCategory, ExerciseLog } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            // return User.find().populate('thoughts');
            return User.find();
        },
        user: async (parent, { username }, context) => {
            if (context.user) {
                return User.findOne({ username }).populate("exerciseLogs");
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({
                    _id: context.user._id,
                }).populate("exerciseLogs");
                return user;
            }
            throw new AuthenticationError("You need to be logged in!");
        },

        exerciseCategories: async () => {
            return await ExerciseCategory.find();
        },
        exerciseLogs: async (_, { userId }, context) => {
            if (!context.user)
                throw AuthenticationError("You need to be logged in!");
            //return await ExerciseLog.find({ user: userId }).populate('category');
            return await ExerciseLog.find({ userId }).populate(
                "categorySpecificData"
            );
        },
        getEachExercise: async (_, { _id }, context) => {
            if (!context.user) throw AuthenticationError;

            return await ExerciseLog.findById(_id).populate(
                "categorySpecificData"
            );
        },
        getUserProfile: async (parent, { id }, context) => {
          if (context.user && context.user._id === id) {
            return await User.findById(id);
          }
          throw new AuthenticationError('You are not authorized to view this profile.');
        },
    },

    Mutation: {
        addUser: async (
            parent,
            { username, email, password, gender, age, height, weight, goal }
        ) => {
            const user = await User.create({
                username,
                email,
                password,
                gender,
                age,
                height,
                weight,
                goal,
            });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        addExerciseCategory: async (_, { name }, context) => {
            if (!context.user) throw AuthenticationError;
            const category = new ExerciseCategory({ name });
            await category.save();
            return category;
        },

        addExerciseLog: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            try {
                const { category, categorySpecificData, duration, date } = args;
                // Debugging: Log input to verify
                console.log("Received input:", {
                    category,
                    categorySpecificData,
                    duration,
                    date,
                });
                console.log(context.user._id);
                const newLog = await ExerciseLog.create({
                    category,
                    categorySpecificData,
                    duration,
                    // date,
                    userId: context.user._id,
                });

                // Update the user's exerciseLogs
                await User.findByIdAndUpdate(context.user._id, {
                    $push: { exerciseLogs: newLog._id },
                });

                return {
                    ...newLog._doc,
                    userId: newLog.userId,
                    categoryId: newLog.category,
                };
            } catch (error) {
                console.error(error);
                throw new Error("Failed to create exercise log");
            }
        },

        // to delete the exercise session
        deleteExerciseLog: async (parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }

            try {
                // Find the exercise log to ensure it exists and belongs to the user
                const log = await ExerciseLog.findOne({
                    _id,
                    userId: context.user._id,
                });

                if (!log) {
                    throw new Error(
                        "Exercise log not found or you do not have permission to delete it."
                    );
                }

                // Delete the exercise log
                await ExerciseLog.findByIdAndDelete(_id);

                await User.findByIdAndUpdate(context.user._id, {
                    $pull: { exerciseLogs: _id },
                });

                return {
                    success: true,
                    message: "Exercise log deleted successfully.",
                };
            } catch (error) {
                console.error(error);
                throw new Error("Failed to delete exercise log.");
            }
        },
        updateUser: async (parent, args, context) => {
          if (context.user && context.user._id === args.id) {
            return await User.findByIdAndUpdate(args.id, args, {
              new: true,
            });
          }
          throw new AuthenticationError('You are not authorized to update this profile.');
        },
    },
};

module.exports = resolvers;
