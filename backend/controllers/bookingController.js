const Booking = require('../models/Booking')
const Doctor = require('../models/Doctor')

const createBooking = async (req, res) => {
    try {
        // --- 1. Get all data from the frontend ---
        const {
            userId, doctorId, date, time, patientName,
            patientAge, patientSex, patientContact, reason
        } = req.body;

        // --- 2. Find the doctor being booked ---
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found." });
        }

        // --- 3. Remove the booked time slot from the doctor's availability ---
        const slotIndex = doctor.availableSlots.findIndex(slot => slot.date === date);
        if (slotIndex > -1) {
            // Filter out the booked time
            doctor.availableSlots[slotIndex].times = doctor.availableSlots[slotIndex].times.filter(t => t !== time);
            // If no times are left for that date, remove the date entry
            if (doctor.availableSlots[slotIndex].times.length === 0) {
                doctor.availableSlots.splice(slotIndex, 1);
            }
            await doctor.save();
        } else {
            // This case handles if the slot was somehow already gone
            return res.status(400).json({ message: "Selected time slot is no longer available." });
        }
        
        // --- 4. Create and save the new booking document ---
        const newBooking = new Booking({
            userId, doctorId, date, time, patientName,
            patientAge, patientSex, patientContact, reason
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({ 
            message: 'Appointment booked successfully!', 
            booking: savedBooking 
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error while creating booking.' });
    }
};

module.exports = {createBooking}