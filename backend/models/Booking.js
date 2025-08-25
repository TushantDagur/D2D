const mongoose = require("mongoose") 
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    date: {
      type: String, // example: "2025-08-20"
      required: true,
    },
    time: {
      type: String, // example: "10:30 AM"
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Booking", bookingSchema);