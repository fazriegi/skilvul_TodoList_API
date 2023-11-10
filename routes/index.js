const express = require("express");
const route = express.Router();

const authRoute = require("./auth.route");
const todoRoute = require("./todo.route");
const User = require("../models/user.model");

route.use("/auth", authRoute);
route.use("/todo", todoRoute);

module.exports = route;
