"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from 'react-toastify'; 


export default function DoctorBooking({ isOpen, onClose, doctor, user }) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bookingData = {
            userId: user?._id || "guest_user",
            userName: user?.name || "Guest",
            doctorId: doctor?._id,
            doctorName: doctor?.name,
            date: date.toISOString().split("T")[0],
            time,
        };

        try {
            // Change ApI according to ur api
            const res = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                toast.success("Booking Confirmed ✅");
                onClose(); // 👈 CHANGED: Close the modal on success
            } else {
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
            {/* 👈 CHANGED: Visibility is now controlled by the 'isOpen' prop */}
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: -50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -50 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Card className="w-[350px] p-4 rounded-2xl shadow-xl bg-white">
                            <CardContent>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    {/* 👈 CHANGED: Dynamic title with doctor's name */}
                                    Book Appointment with {doctor?.name}
                                </h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {/* Date Picker */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Select Date</label>
                                        <DatePicker
                                            selected={date}
                                            onChange={(d) => setDate(d)}
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            minDate={new Date()}
                                        />
                                    </div>

                                    {/* Time Picker */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Select Time</label>
                                        <input
                                            type="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            required
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-between">
                                        <Button type="button" variant="outline" onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? "Booking..." : "Confirm"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}