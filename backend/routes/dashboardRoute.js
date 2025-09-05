// dashboardRoute.js
const express = require("express");
const Booking = require("../models/Booking.js");
const Doctor = require("../models/Doctor.js"); // Import the Doctor model
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get recent activity for logged-in user
router.get("/recentActivity", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch latest 10 bookings, populating doctorId with the doctor's name
    const bookings = await Booking.find({ userId })
      .populate('doctorId', 'name') // 'doctorId' is the path to populate, 'name' is the field to select
      .sort({ createdAt: -1 })
      .limit(10);

    // Format into activity objects
    const activities = bookings.map((b) => ({
      type: "appointment",
      // Access the populated doctor name directly from b.doctorId.name
      title: `Appointment with Dr. ${b.doctorId.name}`,
      description: `Consultation booked for ${b.date} at ${b.time}`,
      status: "booked", 
      time: new Date(b.createdAt).toLocaleString(),
    }));

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    console.log(await Booking.findOne());
    console.log(await Doctor.findOne());
    const userId = req.user.id;

    // Count only this user's appointments
    const appointmentCount = await Booking.countDocuments({ userId });

    // Count all doctors in system
    const doctorCount = await Doctor.countDocuments();

    // Placeholder: you can later calculate avg wait time or response
    const avgResponseTime = "15 min";

    res.json({
      appointments: appointmentCount,
      doctorsNearby: doctorCount,
      avgResponseTime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});


module.exports = router;