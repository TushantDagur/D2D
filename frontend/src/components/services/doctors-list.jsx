import React, { useState, useEffect } from "react";
import { Card,CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"
import { Star, MapPin, Clock, Phone, Video, Navigation } from "lucide-react"


export function DoctorsList({ filters }) {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                // 2. Build a query string from the filters object
                const params = new URLSearchParams();
                if (filters.distance) {
                    params.append('distance', filters.distance);
                }
                if (filters.specialties && filters.specialties.length > 0) {
                    // Join array into a comma-separated string for the URL
                    params.append('specialty', filters.specialties.join(','));
                }
                if (filters.availability && filters.availability.length > 0) {
                    params.append('availability', filters.availability.join(','));
                }

                const queryString = params.toString();
                // 3. Append the query string to the fetch URL
                const url = `http://localhost:5000/api/doctors${queryString ? `?${queryString}` : ''}`;

                const res = await fetch(url);
                const data = await res.json();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error)
                setDoctors([]);
            } finally {
                setLoading(false)
            }
        };
        fetchDoctors()
    }, [filters])

    const handleBookAppointment = (doctorId) => {
        console.log(`Booking appointment with doctor ${doctorId}`)
    }

    const handleVideoCall = (doctorId) => {
        console.log(`Starting video call with doctor ${doctorId}`)
    }

    const handleViewOnMap = (doctorId) => {
        window.location.href = `/map?provider=${doctorId}&type=doctor`
    }

    if (loading) return <p>Loading doctors...</p> 

    // Add a helpful message if no doctors match the filters
    // if (!loading && doctors.length === 0) {
    //     return (
    //         <div className="text-center py-10">
    //             <h3 className="text-xl font-semibold">No Doctors Found</h3>
    //             <p className="text-muted-foreground mt-2">Try adjusting your filters to find more results.</p>
    //         </div>
    //     )
    // }

    
    return (
        <div className="space-y-4">
            <div className="flex items-left justify-between">
                <h2 className="text-xl font-semibold">Available Doctors ({doctors.length})</h2>
                <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => (window.location.href = "/map")}>
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                    </Button>
                    <div className="text-sm text-muted-foreground">Sorted by distance</div>
                </div>
            </div>

            {doctors.map((doctor) => (
                <Card key={doctor._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                        <div className="flex items-start space-x-4">
                            <img
                                src={doctor.image || "/placeholder.svg"}
                                alt={doctor.name}
                                className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                                        <p className="text-primary font-medium">{doctor.specialty}</p>
                                        <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center space-x-1 mb-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{doctor.rating}</span>
                                            <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {doctor.availability}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div className="flex items-center space-x-1 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{doctor.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{doctor.experience}</span>
                            </div>
                            <div className="text-muted-foreground">
                                Fee: <span className="font-medium text-foreground">${doctor.consultationFee}</span>
                            </div>
                            <div className="text-muted-foreground">
                                Next: <span className="font-medium text-foreground">{doctor.nextSlot}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button className="flex-1" onClick={() => handleBookAppointment(doctor._id)}>
                                <Phone className="h-4 w-4 mr-2" />
                                Book Appointment
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => handleVideoCall(doctor._id)}>
                                <Video className="h-4 w-4 mr-2" />
                                Video Call
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleViewOnMap(doctor._id)}>
                                <Navigation className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}