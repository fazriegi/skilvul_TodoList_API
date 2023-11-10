const Todo = require("../models/todo.model");

module.exports = {
  async getAllTodoByUserController(req, res) {
    const userId = req.userId;

    try {
      const todos = await Todo.find({ owner: userId }, [
        "_id",
        "description",
        "isDone",
      ]);
      res.status(200).json({
        message: "success get todos",
        data: todos,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async addTodoController(req, res) {
    const userId = req.userId;
    const { description } = req.body;

    const newTodo = { description, owner: userId, isDone: false };
    const todo = new Todo(newTodo);

    try {
      await todo.save();
      res.status(201).json({
        message: "success add todo",
        data: { description, isDone: false },
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
