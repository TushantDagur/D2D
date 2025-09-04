"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from 'react-toastify';
import placeHolder from "../../assets/placeholder.svg";

export default function DoctorBooking({ isOpen, onClose, doctor, user }) {
    // State for the form fields
    const [bookingDetails, setBookingDetails] = useState({
        date: new Date(),
        selectedTime: "",
        patientName: user?.name || "",
        patientAge: "",
        patientSex: "Male",
        patientContact: "",
        reason: "",
    });

    // State to manage UI
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(false);

    // This effect updates the available time slots whenever the date changes
    useEffect(() => {
        let slots = doctor?.availableSlots;

        // Check if the data is a string and parse it if necessary
        if (typeof slots === 'string') {
            try {
                slots = JSON.parse(slots);
            } catch (e) {
                console.error("Failed to parse availableSlots string:", e);
                slots = [];
            }
        }

        if (slots && Array.isArray(slots)) {
            const selectedDateString = bookingDetails.date.toISOString().split("T")[0];
            const slotsForDate = slots.find(slot => slot.date === selectedDateString);
            setAvailableTimes(slotsForDate ? slotsForDate.times : []);
            setBookingDetails(prev => ({ ...prev, selectedTime: "" })); // Reset selected time when date changes
        } else {
            // Handle cases where availableSlots is not an array or is missing
            setAvailableTimes([]);
            setBookingDetails(prev => ({ ...prev, selectedTime: "" }));
        }
    }, [bookingDetails.date, doctor]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setBookingDetails(prev => ({ ...prev, date }));
    };

    const handleTimeSelect = (time) => {
        setBookingDetails(prev => ({ ...prev, selectedTime: time }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookingDetails.selectedTime) {
            toast.error("Please select an available time slot.");
            return;
        }
        setLoading(true);

        const bookingData = {
            userId: user?._id,
            doctorId: doctor?._id,
            date: bookingDetails.date.toISOString().split("T")[0],
            time: bookingDetails.selectedTime,
            patientName: bookingDetails.patientName,
            patientAge: bookingDetails.patientAge,
            patientSex: bookingDetails.patientSex,
            patientContact: bookingDetails.patientContact,
            reason: bookingDetails.reason,
        };

        try {
            // Get the token from local storage
            const token = localStorage.getItem('token');

            const res = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookingData),
            });

            // const data = await res.json();

            if (res.ok) {
                console.log("Appointment Saved:", res);
                toast.success(`Appointment with ${doctor.name} confirmed!`);
                onClose();
            } else {
                const errorData = await res.json();
                console.log("errorData.message");
                toast.error("Booking Failed ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl bg-white">
                        <CardContent className="p-0">
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
                                {/* Left Column: Doctor Info */}
                                <div className="w-full md:w-1/3 bg-slate-50 p-6">
                                    <img
                                        src={doctor.image || placeHolder}
                                        alt={doctor.name}
                                        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                                    />
                                    <h2 className="text-2xl font-bold text-center text-gray-800">{doctor.name}</h2>
                                    <p className="text-center text-primary font-medium mb-4">{doctor.specialty}</p>
                                    <h3 className="font-semibold text-gray-700 mt-6 mb-2">About Doctor</h3>
                                    <p className="text-sm text-gray-600 text-justify">{doctor.about || "No biography available."}</p>
                                </div>

                                {/* Right Column: Booking Form */}
                                <div className="w-full md:w-2/3 p-6 space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Patient Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input name="patientName" value={bookingDetails.patientName} onChange={handleInputChange} placeholder="Full Name" className="form-input" required />
                                        <input name="patientContact" value={bookingDetails.patientContact} onChange={handleInputChange} placeholder="Contact Number" className="form-input" required />
                                        <input name="patientAge" type="number" value={bookingDetails.patientAge} onChange={handleInputChange} placeholder="Age" className="form-input" required />
                                        <select name="patientSex" value={bookingDetails.patientSex} onChange={handleInputChange} className="form-input" required>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <textarea name="reason" value={bookingDetails.reason} onChange={handleInputChange} placeholder="Reason for Consultation" className="form-input w-full min-h-[80px]" required></textarea>

                                    <h2 className="text-xl font-semibold text-gray-800 pt-4">Select Slot</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DatePicker selected={bookingDetails.date} onChange={handleDateChange} className="form-input w-full" minDate={new Date()} />
                                        <div className="p-2 border rounded-lg h-32 overflow-y-auto">
                                            <div className="grid grid-cols-3 gap-2">
                                                {availableTimes.length > 0 ? availableTimes.map(time => (
                                                    <Button
                                                        key={time}
                                                        type="button"
                                                        variant={bookingDetails.selectedTime === time ? "default" : "outline"}
                                                        onClick={() => handleTimeSelect(time)}
                                                    >
                                                        {time}
                                                    </Button>
                                                )) : <p className="col-span-3 text-sm text-center text-gray-500">No slots available for this date.</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                                        <Button type="submit" disabled={loading}>{loading ? "Booking..." : "Confirm Appointment"}</Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}