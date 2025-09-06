const mongoose = require("mongoose")

const labBookingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    labId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lab', 
        required: true 
    },
    testType: { type: String, required: true }, 
    date: { type: String, required: true }, 
    time: { type: String, required: true }, 

    // Patient Information from the Form
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientSex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    patientContact: { type: String, required: true },
    reason: { type: String, required: true },
    
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled'], 
        default: 'Pending' 
    }

}, { timestamps: true });
 
module.exports = mongoose.model("LabBooking", labBookingSchema);