const express = require("express");
const User = require("../models/User");
const router = express.Router();

const {registerUser, loginUser, getMe} = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
router.post("/register", registerUser);
router.post('/login', loginUser)
router.get('/me', authMiddleware, getMe)

module.exports = router;