const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
    //    -------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Task ownership from middleware
      user: req.user._id,                   
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};


const getMyTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Task.countDocuments({ user: req.user._id });

    const tasks = await Task.find({ user: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    return res.status(200).json({
      message: "Task updated",
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createTask, getMyTasks, updateTask, deleteTask };