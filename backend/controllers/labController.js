const Lab = require("../models/Lab");

// Create a new lab
const createLab = async (req, res) => {
    try {
        const newLab = new Lab(req.body);
        const savedLab = await newLab.save();
        res.status(201).json(savedLab);
    } catch (error) {
        console.error("Error creating lab:", error);
        res.status(500).json({ message: "Server error while creating lab." });
    }
};

// Get all labs
const getAllLabs = async (req, res) => {
    try {
        const labs = await Lab.find({});
        res.status(200).json(labs);
    } catch (error) {
        console.error("Error fetching labs:", error);
        res.status(500).json({ message: "Server error while fetching labs." });
    }
};

module.exports = { createLab, getAllLabs };