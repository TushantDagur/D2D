const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

// Create a booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      doctor,
      date,
      time,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bookings of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;