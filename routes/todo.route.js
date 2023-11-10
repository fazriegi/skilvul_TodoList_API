const express = require("express");
const {
  getAllTodoByUserController,
  addTodoController,
} = require("../controllers/todo.controller");
const { verifyToken } = require("../middleware/jwt");

const route = express.Router();

route.post("/", verifyToken, addTodoController);
route.get("/", verifyToken, getAllTodoByUserController);

module.exports = route;
