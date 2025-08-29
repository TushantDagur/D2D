"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"

export function ServiceFilters({ type, onApplyFilters }) {
    const [distance, setDistance] = useState(50);
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);

    const getFilters = () => {
        switch (type) {
            case "doctors":
                return {
                    specialties: ["General Medicine", "Cardiology", "Dermatology", "Pediatrics", "Orthopedics"],
                    availability: ["Available Now", "Today", "This Week", "Emergency"],
                }
            case "labs":
                return {
                    services: ["Blood Test", "X-Ray", "MRI", "CT Scan", "Ultrasound"],
                    availability: ["Same Day", "Next Day", "Home Collection", "Walk-in"],
                }
            case "pharmacy":
                return {
                    services: ["Prescription", "OTC Medicines", "Health Products", "Medical Equipment"],
                    availability: ["24/7", "Home Delivery", "Express Delivery", "In Stock"],
                }
            case "psychology":
                return {
                    specialties: ["Anxiety", "Depression", "Stress Management", "Relationship", "Addiction"],
                    availability: ["Available Now", "Today", "This Week", "Free Session"],
                }
        }
    }

    const filters = getFilters()

    // Create handlers to update local state when checkboxes are clicked
    const handleSpecialtyChange = (specialty) => {
        setSelectedSpecialties(prev =>
            prev.includes(specialty)
                ? prev.filter(s => s !== specialty)
                : [...prev, specialty]
        );
    };

    const handleAvailabilityChange = (availability) => {
        setSelectedAvailability(prev =>
            prev.includes(availability)
                ? prev.filter(a => a !== availability)
                : [...prev, availability]
        );
    };

    const handleApply = () => {
        onApplyFilters({
            distance,
            specialties: selectedSpecialties,
            availability: selectedAvailability,
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Distance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Slider 
                            value={[distance]}
                            onValueChange= {(value) => setDistance(value[0])}
                            max={50} 
                            step={1} 
                            className="w-full" 
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>0 km</span>
                            <span>{distance} km</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        {type === "doctors" || type === "psychology" ? "Specialties" : "Services"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {(type === "doctors" || type === "psychology" ? filters.specialties : filters.services).map(
                            (item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`specialty-${index}`} 
                                        checked = {selectedSpecialties.includes(item)}
                                        onCheckedRange= {() => handleSpecialtyChange(item)}
                                    />
                                    <Label htmlFor={`specialty-${index}`} className="text-sm">
                                        {item}
                                    </Label>
                                </div>
                            ),
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {filters.availability.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`availability-${index}`}
                                    checked={selectedAvailability.includes(item)}
                                    onCheckedChange={() => handleAvailabilityChange(item)}
                                />
                                <Label htmlFor={`availability-${index}`} className="text-sm">
                                    {item}
                                </Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button className="w-full" onClick={handleApply}>Apply Filters</Button>
        </div>
    )
}