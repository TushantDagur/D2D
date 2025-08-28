import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

const doctors = [
    {
        id: 1,
        name: "Dr. Ramesh Gupta",
        specialty: "Cardiologist",
        location: "Delhi, India",
        availability: "Mon-Fri, 10AM - 4PM",
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        specialty: "Dermatologist",
        location: "Mumbai, India",
        availability: "Tue-Sat, 12PM - 6PM",
    },
];

export default function DoctorList() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-blue-600" />
                Available Doctors
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                    <Card key={doc.id} className="shadow-md hover:shadow-lg transition">
                        <CardContent className="p-4">
                            <h3 className="text-xl font-semibold">{doc.name}</h3>
                            <p className="text-gray-600">{doc.specialty}</p>
                            <p className="text-gray-500">{doc.location}</p>
                            <p className="text-sm text-gray-400">{doc.availability}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
