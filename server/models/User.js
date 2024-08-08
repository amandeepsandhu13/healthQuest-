const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
        type: String,
        required: `You need to provide a name to display`,
        trim: true,
    },
    gender: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    goal: { type: String, required: true, trim: true },
    // workout:{}
});

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
