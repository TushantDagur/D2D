const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

// Create a booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, time, reason, patientContact, patientSex, patientAge, patientName,} = req.body;
    console.log(req.body)
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // console.log(req.user.id)
    const booking = await Booking.create({
      userId: req.user.id,
      doctorId,
      date,
      reason,
      patientContact,
      patientSex,
      patientAge,
      patientName,
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
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;