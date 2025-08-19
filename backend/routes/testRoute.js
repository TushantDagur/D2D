const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
router.get('/', (req, res) => {
  res.json({ message: 'Backend API working perfectly!' });
});

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;

module.exports = router;