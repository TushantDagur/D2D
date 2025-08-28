import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboard/dashboard-header";
import { ServiceHeader } from "../../components/services/service-header";
import { ServiceFilters } from "../../components/services/service-filters";
import { DoctorsList } from "../../components/services/doctors-list"



const Doctors = () => {
    const [location, setLocation] = useState("Loading...");
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await res.json();
                        const city = data.address.city || data.address.town || data.address.village;
                        const state = data.address.state;
                        setLocation(`${city}, ${state}`);
                    } catch (error) {
                        console.error("Error fetching location name:", error);
                        setLocation("Could not find location");
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setLocation("Location access denied");
                }
            );
        } else {
            setLocation("Geolocation not supported");
        }
    }, []);

    // Add state to hold the currently applied filters
    const [appliedFilters, setAppliedFilters] = useState({
        distance: 50,
        specialties: [],
        availability: [],
    });

    // This function will be passed to ServiceFilters and called when the user clicks "Apply"
    const handleApplyFilters = (newFilters) => {
        setAppliedFilters(newFilters);
    };

    return (
        <div className="min-h-screen bg-background">
                <DashboardHeader />
                <ServiceHeader
                    title="Find Doctors Nearby"
                    description="Connect with qualified doctors in your area"
                    backUrl="/dashboard"
                    location={location}
                />
                <div className="container px-2 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className="lg:w-1/4">
                        <ServiceFilters type="doctors" onApplyFilters={handleApplyFilters} />
                        </aside>
                        <main className="lg:w-3/4">
                            <DoctorsList filters={appliedFilters} />
                        </main>
                    </div>
                </div>
        </div>
    );
};

export default Doctors;
