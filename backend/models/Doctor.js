const { default: mongoose } = require('mongoose')
const mmongoose = require('mongoose')

    const doctorSchema = new mmongoose.Schema({
        name: String,
        specialization: String,
        available: Boolean
    })

module.exports = mongoose.model("Doctor", doctorSchema)