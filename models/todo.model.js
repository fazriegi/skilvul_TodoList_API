const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  description: String,
  owner: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  isDone: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
