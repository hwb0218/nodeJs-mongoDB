const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPass = await bcrypt.hash(user.password, salt);
      user.password = hashedPass;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password, callback) {
  try {
    const user = this;
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) callback(null, isMatched);
  } catch (error) {
    return callback(new Error("Invalid password"), error);
  }
};

module.exports = model("User", userSchema);
