const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  distance: { type: String },
  availability: { type: String },
  consultationFee: { type: Number, required: true },
  image: { type: String },
  hospital: { type: String, required: true },
  experience: { type: String },
  nextSlot: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor