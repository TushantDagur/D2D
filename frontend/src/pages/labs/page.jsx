import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboard/dashboard-header";
import { ServiceHeader } from  "../../components/services/service-header"
import { ServiceFilters } from "../../components/services/service-filters";
import { LabsList } from "../../components/services/labs-list"

export default function LabsPage() {
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


    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <ServiceHeader
                title="Lab Services Nearby"
                description="Book health checkups and diagnostic tests"
                backUrl="/dashboard"
                location={location}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-1/4">
                        <ServiceFilters type="labs" />
                    </aside>
                    <main className="lg:w-3/4">
                        <LabsList />
                    </main>
                </div>
            </div>
        </div>
    )
}