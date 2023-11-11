const express = require("express");
const route = express.Router();

const authRoute = require("./auth.route");
const todoRoute = require("./todo.route");

route.use("/auth", authRoute);
route.use("/todos", todoRoute);

module.exports = route;
