const express = require("express");
const router = express.Router();

const { createTask, getMyTasks, updateTask, deleteTask } = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");

const { authorizeRoles } = require("../middleware/role.middleware");

router.post("/", protect, createTask);
router.get("/", protect, getMyTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.get("/admin/all", protect, authorizeRoles("admin"), async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
module.exports = router;