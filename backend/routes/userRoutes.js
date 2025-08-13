const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User added", user });
});

module.exports = router;