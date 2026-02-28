const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 login attempts
  message: "Too many login attempts. Try again later.",
});

router.post("/register", registerUser);

router.post("/login", loginLimiter, loginUser);

module.exports = router;