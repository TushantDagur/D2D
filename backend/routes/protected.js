const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js')
const router = express.Router();
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Backend API working perfectly!' });
});


// router.get("/profile", authMiddleware, (req, res) => {
//     res.json({ message: "Welcome to your profile!", user: req.user });
// });

module.exports = router;