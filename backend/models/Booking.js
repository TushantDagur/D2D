const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true 
    },
    date: { type: String, required: true }, // Format: "YYYY-MM-DD"
    time: { type: String, required: true }, // Format: "HH:MM"

    // --- Patient Information from the Form ---
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientSex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    patientContact: { type: String, required: true },
    reason: { type: String, required: true },
    
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled'], 
        default: 'Confirmed' 
    }

}, { timestamps: true });
 
module.exports = mongoose.model("Booking", bookingSchema);