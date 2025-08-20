const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Get all doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Add a doctor
router.post("/", async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json({ message: "Doctor added", doctor });
});

module.exports = router;