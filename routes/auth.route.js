const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");
const validate = require("../middleware/validator");
const { body } = require("express-validator");

const route = express.Router();

route.post(
  "/register",
  validate([
    body("name").notEmpty(),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password length must be more than 6"),
  ]),
  registerController
);
route.post(
  "/login",
  validate([
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Not a valid e-mail address"),
    body("password").notEmpty(),
  ]),
  loginController
);

module.exports = route;
