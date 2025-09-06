const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    distance: { type: String, required: true },
    availability: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg" },
    services: [{ type: String }],
    homeCollection: { type: Boolean, default: false },
    timing: { type: String, required: true },
    reportTime: { type: String, required: true },
    // You can add more fields here like address, etc.
});

module.exports = mongoose.model("Lab", labSchema);