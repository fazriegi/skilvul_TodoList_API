const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { createJWTToken } = require("../middleware/jwt");

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
  async loginController(req, res) {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      res.status(401).json({ message: "email or password wrong!" });
      return;
    }

    const match = await bcrypt.compare(userData.password, user.password);

    if (match) {
      const token = createJWTToken(user.id);

      res.status(200).json({
        message: "success login",
        data: {
          token,
        },
      });
      return;
    }

    res.status(401).json({
      message: "email or password wrong!",
    });
  },
};
