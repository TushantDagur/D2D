const express = require('express')
const {getDoctors, postDoctors} = require('../controllers/doctorController') 
const Doctor = require('../models/Doctor')
const router = express.Router();

router.get("/", getDoctors);
router.post("/", postDoctors)

module.exports = router