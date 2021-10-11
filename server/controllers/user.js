const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async function (req, res) {
    try {
      const user = new User(req.body);
      await user.save();

      return res.json({ message: "User added successfully", user });
    } catch (error) {
      res.json(400, { message: "An error occured!", error });
    }
  },
  login: async function (req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.json(400, { message: "User doesn't exist" });

      const isPasswordCorrect = await existingUser.comparePassword(password);
      if (!isPasswordCorrect)
        return res.json(400, { message: "Invalid credentials" });

      const { accessToken, refreshToken } = await existingUser.generateToken();

      return res.json({
        message: "Login successful!",
        existingUser,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.json(400, { message: "An error occured!", error });
    }
  },
  refreshToken(req, res) {
    const { email, _id } = req.user;
    const { refreshToken } = req.body;

    const accessToken = jwt.sign(
      { email, id: _id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );

    return res.json(400, {
      message: "Token refreshed success!",
      accessToken,
      refreshToken,
    });
  },
};
