"use client"

import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Star, MapPin, Clock, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabBooking from "../bookings/lab-booking";


export function LabsList() {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedLab, setSelectedLab] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/labs");
                if (!response.ok) {
                    throw new Error("Failed to fetch labs");
                }
                const data = await response.json();
                setLabs(data);

                //Fetch the current user's data.
                // This requires a protected backend route that returns the user's details.
                const token = localStorage.getItem('token');
                if (token) {
                    const userResponse = await fetch("http://localhost:5000/api/users/profile", { // Assuming you have a route like this
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setCurrentUser(userData);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLabs();
    }, []);


    // Function to open the lab booking
    const handleBookTest = (lab) => {
        setSelectedLab(lab);
        setIsBookingOpen(true);
    };


    // Function to close the lab booking 
    const handleCloseBooking = () => {
        setIsBookingOpen(false);
        setSelectedLab(null);
    };

    if (loading) {
        return <div className="text-center text-lg">Loading labs...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">Error: {error}</div>;
    }

    if (labs.length === 0) {
        return <div className="text-center text-lg text-muted-foreground">No labs available at the moment.</div>;
    }

    return (
        <div className="space-y-6">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Available Labs ({labs.length})</h2>
                <div className="text-sm text-muted-foreground">Sorted by distance</div>
            </div>

            {labs.map((lab) => (
                <Card key={lab._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                        <div className="flex items-start space-x-4">
                            <img src={lab.image || "/placeholder.svg"} alt={lab.name} className="w-20 h-20 rounded-lg object-cover" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{lab.name}</h3>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {lab.services.slice(0, 3).map((service, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {service}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center space-x-1 mb-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{lab.rating}</span>
                                            <span className="text-sm text-muted-foreground">({lab.reviews})</span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {lab.availability}
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
                                <span>{lab.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{lab.timing}</span>
                            </div>
                            <div className="text-muted-foreground">
                                Reports: <span className="font-medium text-foreground">{lab.reportTime}</span>
                            </div>
                            <div className="text-muted-foreground">
                                {lab.homeCollection && (
                                    <Badge variant="outline" className="text-xs">
                                        Home Collection
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Button className="flex-1" onClick={() => handleBookTest(lab)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Book Test
                            </Button>
                            <Button variant="outline">View Services</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Render the lab booking */}
            <LabBooking
                isOpen={isBookingOpen}
                onClose={handleCloseBooking}
                lab={selectedLab}
                user={currentUser}
            />
        </div>
    );
}