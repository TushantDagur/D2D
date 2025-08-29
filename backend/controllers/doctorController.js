const Doctor = require('../models/Doctor')

// GET /api/doctors?distance=5&specialty=Cardiology,Neurology&availability=Today,Now
const getDoctors = async (req, res) => {
  try {
    const { distance, specialty, availability } = req.query;

    let filter = {};

    // Specialty filter: supports multiple values
    if (specialty) {
      const specialties = specialty.split(","); 
      filter.specialty = { $in: specialties };
    }

    // Availability filter: supports multiple values
    if (availability) {
      const availArray = availability.split(",");
      filter.availability = { $in: availArray };
    }

    // TODO: Distance filter - needs patient location to calculate
    // For now we’ll just handle "max distance" if stored directly in DB
    if (distance) {
      filter.distance = { $lte: parseFloat(distance) }; 
    }

    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

const postDoctors = async(req, res) => {
    try {
        const result = await Doctor.insertMany(req.body);
        if(result){
        return res.status(201).json(
        {
            "message " : "Doctor added successfuly",
            "data": result
        }
        )
    }
    } catch (error) {
        res.status(500).json({
        "message": error.msg
        }) 
    }
}

module.exports = {getDoctors, postDoctors}