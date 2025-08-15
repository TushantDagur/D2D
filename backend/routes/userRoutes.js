const express = require("express");
const User = require("../models/User");
const router = express.Router();

const {createUser, loginUser} = require('../controllers/userController')

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
router.post("/", createUser);
router.post('/login', loginUser)

module.exports = router;