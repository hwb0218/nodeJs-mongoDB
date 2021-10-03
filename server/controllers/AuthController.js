const User = require("../models/User");

module.exports = {
  errorMessage: "An error occured!",
  register: async function (req, res) {
    try {
      const user = new User(req.body);
      await user.save();

      return res.json({ message: "User added successfully", user });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
};
