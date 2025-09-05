const express = require("express");
const router = express.Router();
const { createLab, getAllLabs } = require("../controllers/labController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new lab (protected route)
router.post("/", authMiddleware, createLab);

// Route to get all labs
router.get("/", getAllLabs);

module.exports = router;