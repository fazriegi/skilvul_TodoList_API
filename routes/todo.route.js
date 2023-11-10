const express = require("express");
const {
  getAllTodoByUserController,
  addTodoController,
  getTodoByIdController,
} = require("../controllers/todo.controller");
const { verifyToken } = require("../middleware/jwt");

const route = express.Router();

route.post("/", verifyToken, addTodoController);
route.get("/", verifyToken, getAllTodoByUserController);
route.get("/:id", verifyToken, getTodoByIdController);

module.exports = route;
