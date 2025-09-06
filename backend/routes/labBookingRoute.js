const express = require("express");
const router = express.Router();
const { createLabBooking } = require("../controllers/labBookingController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new lab booking
router.post("/", authMiddleware, createLabBooking);

module.exports = router;