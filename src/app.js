const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { protect } = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


app.get("/api/protected", protect, (req, res) => {
   res.json({ message: "Protected route accessed", user: req.user });
});


app.use(errorHandler);

module.exports = app;
