"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, Clock, Stethoscope, Briefcase } from "lucide-react";


// Map the activity type string to the correct Lucide icon component
const getIconComponent = (type) => {
    switch (type) {
        case "appointment":
            return Calendar;
        case "lab":
            return Stethoscope;
        case "pharmacy":
            return Clock;
        case "doctor_visit":
            return Briefcase;
        default:
            return MapPin; // Default icon for unknown types
    }
};

export function RecentActivity() {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // CORRECTED: Removed <string | null>

    // Function to determine badge color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "ready":
                return "bg-blue-100 text-blue-800";
            case "delivered":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchActivities = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dashboard/recentActivity",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setActivities(response.data);
            } catch (err) {
                console.error("Failed to fetch recent activity:", err);
                setError("Could not load recent activity. Please try again later.");
                setActivities([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center py-8">
                    <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-muted-foreground">Loading activities...</p>
                </div>
            );
        }

        if (error) {
            return (
                <p className="text-center text-red-500 py-8 font-medium">{error}</p>
            );
        }

        if (activities.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-lg font-medium text-gray-600">No recent activity.</p>
                    <p className="text-sm text-muted-foreground">Check back after your next visit!</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {activities.map((activity, index) => {
                    const IconComponent = getIconComponent(activity.type);
                    return (
                        <div
                            key={index}
                            className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-medium text-foreground">
                                        {activity.title}
                                    </h3>
                                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                                        {activity.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Recent Activity</h2>
                <p className="text-muted-foreground">Your latest healthcare interactions</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </section>
    );
}