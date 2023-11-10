const express = require("express");
const {
  getAllTodoByUserController,
  addTodoController,
  getTodoByIdController,
  updateTodoController,
  deleteTodoByIdController,
  deleteAllTodoByUserController,
} = require("../controllers/todo.controller");
const { verifyToken } = require("../middleware/jwt");

const route = express.Router();

route.use(verifyToken);

route.post("/", addTodoController);
route.get("/", getAllTodoByUserController);
route.get("/:id", getTodoByIdController);
route.put("/:id", updateTodoController);
route.delete("/:id", deleteTodoByIdController);
route.delete("/", deleteAllTodoByUserController);

module.exports = route;
