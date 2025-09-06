const LabBooking = require("../models/labBooking");

const createLabBooking = async (req, res) => {
    try {
        const { labId, testType, date, time, patientName, patientAge, patientSex, patientContact, reason } = req.body;
        const userId = req.user.id; // Get user ID from the authMiddleware

        // Create and save the new lab booking document
        const newLabBooking = new LabBooking({
            userId,
            labId,
            testType,
            date,
            time,
            patientName,
            patientAge,
            patientSex,
            patientContact,
            reason
        });

        const savedLabBooking = await newLabBooking.save();

        res.status(201).json({ 
            message: 'Lab test booked successfully!', 
            booking: savedLabBooking 
        });

    } catch (error) {
        console.error('Error creating lab booking:', error);
        res.status(500).json({ message: 'Server error while creating lab booking.' });
    }
};

module.exports = { createLabBooking };