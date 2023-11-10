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

  async getTodoByIdController(req, res) {
    const { id } = req.params;
    const userId = req.userId;

    try {
      const todo = await Todo.findById(id)
        .populate("owner", "name")
        .select("-__v");

      if (!todo) {
        res.status(404).json({ message: "data not found" });
        return;
      }

      if (todo.owner._id.toString() !== userId) {
        res.status(403).json({ message: "failed get data" });
        return;
      }

      res.json({
        message: "success get todo",
        data: todo,
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(404).json({
          message: "data not found",
        });
      }

      res.status(500).json({ message: error });
    }
  },

  async updateTodoController(req, res) {
    const { id } = req.params;
    const data = req.body;
    const userId = req.userId;

    try {
      const todo = await Todo.findById(id);

      if (!todo) {
        res.status(404).json({ message: "data not found" });
        return;
      }

      if (todo.owner._id.toString() !== userId)
        return res.status(403).json({
          message: "failed update todo",
        });

      if (data.description) {
        todo.description = data.description;
      }

      if (data.isDone != undefined) {
        todo.isDone = data.isDone;
      }

      await todo.save();

      res.json({
        message: "success update todo",
        data,
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(404).json({
          message: "data not found",
        });
      }

      res.status(500).json({ message: error });
    }
  },

  async deleteTodoByIdController(req, res) {
    const { id } = req.params;

    try {
      await Todo.findByIdAndDelete({ _id: id });

      res.json({
        message: "success delete todo",
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(404).json({
          message: "data not found",
        });
      }

      res.status(500).json({ message: error });
    }
  },

  async deleteAllTodoByUserController(req, res) {
    const userId = req.userId;

    try {
      await Todo.deleteMany({ owner: userId });

      res.json({
        message: "success delete all todo",
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
