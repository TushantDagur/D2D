// File Path: src/components/bookings/lab-booking-modal.jsx

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-toastify'; // Corrected import for react-toastify

export const LabBookingModal = ({ isOpen, onClose, lab }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        patientAge: '',
        patientSex: '',
        patientContact: '',
        reason: '',
        testType: '',
        date: '',
        time: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value, field) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleBookTest = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to book a test.");
            return;
        }

        try {
            const bookingData = {
                labId: lab._id,
                ...formData,
                patientAge: parseInt(formData.patientAge),
            };

            const res = await fetch("http://localhost:5000/api/labbookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to book test.');
            }

            toast.success("Lab test booked successfully!");
            onClose();
        } catch (error) {
            console.error("Booking error:", error);
            toast.error(error.message);
        }
    };

    if (!lab) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book a Test at {lab.name}</DialogTitle>
                    <DialogDescription>
                        Fill out the details to book your diagnostic test.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookTest} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patientName" className="text-right">Name</Label>
                        <Input id="patientName" value={formData.patientName} onChange={handleInputChange} required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patientAge" className="text-right">Age</Label>
                        <Input id="patientAge" type="number" value={formData.patientAge} onChange={handleInputChange} required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patientSex" className="text-right">Sex</Label>
                        <Select onValueChange={(val) => handleSelectChange(val, 'patientSex')} required className="col-span-3">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Sex" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patientContact" className="text-right">Contact</Label>
                        <Input id="patientContact" value={formData.patientContact} onChange={handleInputChange} required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="testType" className="text-right">Test</Label>
                        <Select onValueChange={(val) => handleSelectChange(val, 'testType')} required className="col-span-3">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a Test" />
                            </SelectTrigger>
                            <SelectContent>
                                {lab.services.map((service, index) => (
                                    <SelectItem key={index} value={service}>{service}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">Date</Label>
                        <Input id="date" type="date" value={formData.date} onChange={handleInputChange} required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Time</Label>
                        <Input id="time" type="time" value={formData.time} onChange={handleInputChange} required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reason" className="text-right">Reason</Label>
                        <Textarea id="reason" value={formData.reason} onChange={handleInputChange} required className="col-span-3" />
                    </div>
                    <Button type="submit" className="w-full mt-4">Book Test</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};