const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    Register User     ---------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ---------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>    Login User   ----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 // ---------------------------->>>>>>>>>>>>>>>>>>>>>>>>>   Generating Token   ---------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 🍪 ---------------------------->>>>>>>>>>>>>>>>>>>>>>>>     Set cookie    ------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { registerUser, loginUser };
