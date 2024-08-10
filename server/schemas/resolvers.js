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
              return User.findOne({ username }).populate('exerciseLogs');
          }
          throw new AuthenticationError('You need to be logged in!');
      },

        exerciseCategories: async () => {
          return await ExerciseCategory.find();
        },
        exerciseLogs: async (_, { userId }, context) => {
          if (!context.user) throw AuthenticationError;
          return await ExerciseLog.find({ user: userId }).populate('category');
        },

        me: async (parent, args, context) => {
          if (context.user) {
            console.log('Context User:', context.user);
            const user = await User.findOne({ _id: context.user._id }).populate('exerciseLogs');
            console.log('User with Exercise Logs:', user);
            return user;          }
          throw new AuthenticationError('You need to be logged in!');
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
        addExerciseLog: async (parent, { input }, context) => {
          if (!context.user) {
            throw new AuthenticationError('You need to be logged in!');
          }
          try {       
            
            const { categoryId, duration, date } = input;
          
            const newLog = await ExerciseLog.create({
              user: context.user._id, // Correctly reference the user
              category: categoryId,
              duration,
              date
            });
        
            return {
              ...newLog._doc,
              userId: newLog.user, 
              categoryId: newLog.category };
          } catch (error) {
            console.error(error);
            throw new Error('Failed to create exercise log');
          }
        },

       
    },
};

module.exports = resolvers;
