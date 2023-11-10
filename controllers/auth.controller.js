const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports = {
  async registerController(req, res) {
    const userData = req.body;
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const user = new User(userData);
      await user.save();

      res.status(201).json({
        message: "success create user",
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },
};
