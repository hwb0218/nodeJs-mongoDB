const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.comparePassword = async function (password) {
  try {
    const user = this;
    return bcrypt.compare(password, user.password);
  } catch (error) {
    return new Error(error);
  }
};

userSchema.methods.generateToken = async function () {
  try {
    const user = this;
    const userPayload = { email: user.email, id: user._id };

    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    return new Error(error);
  }
};

module.exports = model("User", userSchema);
