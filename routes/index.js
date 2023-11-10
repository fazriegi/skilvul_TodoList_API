const express = require("express");
const route = express.Router();

const authRoute = require("./auth.route");
const User = require("../models/user.model");

route.use("/auth", authRoute);

module.exports = route;
