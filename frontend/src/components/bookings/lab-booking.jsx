"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from 'react-toastify';
import placeHolder from "../../assets/placeholder.svg"; // Reusing the same placeholder

// The component now accepts a `user` prop to pre-fill data
export default function LabBooking({ isOpen, onClose, lab, user }) {
    // State for the form fields
    const [bookingDetails, setBookingDetails] = useState({
        patientName: "",
        patientAge: "",
        patientSex: "Male",
        patientContact: "",
        testType: "",
        date: "",
        time: "",
        reason: "",
    });

    // State to manage UI
    const [loading, setLoading] = useState(false);

    // Effect to pre-fill the patient's name from the user object when the modal opens
    useEffect(() => {
        if (isOpen && user?.name) {
            setBookingDetails(prev => ({ ...prev, patientName: user.name }));
        }
    }, [isOpen, user]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple validation to ensure all fields are filled
        for (const key in bookingDetails) {
            if (!bookingDetails[key]) {
                toast.error("Please fill out all fields.");
                return;
            }
        }
        setLoading(true);

        const bookingData = {
            userId: user?._id,
            labId: lab?._id,
            ...bookingDetails,
            patientAge: parseInt(bookingDetails.patientAge), // Ensure age is a number
        };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/api/labBookings", { // Make sure this is your correct backend endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                toast.success(`Test at ${lab.name} confirmed!`);
                onClose(); // Close modal on success
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Booking Failed ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    // Don't render anything if the lab data isn't available yet
    if (!lab) return null;

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
                                {/* Left Column: Lab Info */}
                                <div className="w-full md:w-1/3 bg-slate-50 p-6">
                                    <img
                                        src={lab.image || placeHolder}
                                        alt={lab.name}
                                        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                                    />
                                    <h2 className="text-2xl font-bold text-center text-gray-800">{lab.name}</h2>
                                    <p className="text-center text-primary font-medium mb-4">{lab.location}</p>
                                    <h3 className="font-semibold text-gray-700 mt-6 mb-2">Available Tests</h3>
                                    <ul className="text-sm text-gray-600 list-disc list-inside">
                                        {lab.services?.map((service, index) => (
                                            <li key={index}>{service}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right Column: Booking Form */}
                                <div className="w-full md:w-2/3 p-6 space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Patient Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input name="patientName" value={bookingDetails.patientName} onChange={handleInputChange} placeholder="Full Name" className="form-input" required />
                                        <input name="patientContact" value={bookingDetails.patientContact} onChange={handleInputChange} placeholder="Contact Number" className="form-input" required />
                                        <input name="patientAge" type="number" value={bookingDetails.patientAge} onChange={handleInputChange} placeholder="Age" className="form-input" required />
                                        <select name="patientSex" value={bookingDetails.patientSex} onChange={handleSelectChange} className="form-input" required>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <textarea name="reason" value={bookingDetails.reason} onChange={handleInputChange} placeholder="Reason for Test (e.g., Doctor's prescription)" className="form-input w-full min-h-[80px]" required></textarea>

                                    <h2 className="text-xl font-semibold text-gray-800 pt-4">Select Test and Slot</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <select name="testType" value={bookingDetails.testType} onChange={handleSelectChange} className="form-input md:col-span-3" required>
                                            <option value="" disabled>-- Select a Test --</option>
                                            {lab.services?.map((service, index) => (
                                                <option key={index} value={service}>{service}</option>
                                            ))}
                                        </select>
                                        <input name="date" type="date" value={bookingDetails.date} onChange={handleInputChange} className="form-input" required />
                                        <input name="time" type="time" value={bookingDetails.time} onChange={handleInputChange} className="form-input" required />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                                        <Button type="submit" disabled={loading}>{loading ? "Booking..." : "Confirm Test"}</Button>
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
