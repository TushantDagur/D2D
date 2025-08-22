import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/Navbar"; // assuming we created earlier
import ServicesSection from "../components/ServiceSection"; // reused from Home
import axios from "axios";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        appointmentsCount: 0,
        doctorsNearby: 0,
        avgResponseTime: "—",
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data.user);
                setStats(res.data.stats);
                setRecentActivity(res.data.recentActivity);
                setUpcomingAppointments(res.data.upcomingAppointments);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            <div className="p-6">
                {/* Welcome */}
                <h1 className="text-3xl font-bold mb-4">
                    Welcome back, {user?.username || "User"} 👋
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="shadow-xl">
                        <CardContent className="p-4 text-center">
                            <h2 className="text-lg font-semibold">Appointments</h2>
                            <p className="text-2xl font-bold">{stats.appointmentsCount}</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl">
                        <CardContent className="p-4 text-center">
                            <h2 className="text-lg font-semibold">Doctors Nearby</h2>
                            <p className="text-2xl font-bold">{stats.doctorsNearby}</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl">
                        <CardContent className="p-4 text-center">
                            <h2 className="text-lg font-semibold">Avg. Response Time</h2>
                            <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Services Section */}
                <div className="mb-6">
                    <ServicesSection />
                </div>

                {/* Recent Activity */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
                    <ul className="bg-white p-4 rounded-xl shadow-md">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, idx) => (
                                <li key={idx} className="border-b py-2 last:border-none">
                                    {item}
                                </li>
                            ))
                        ) : (
                            <p>No recent activity yet.</p>
                        )}
                    </ul>
                </div>

                {/* Upcoming Appointments */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
                    <ul className="bg-white p-4 rounded-xl shadow-md">
                        {upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map((appt, idx) => (
                                <li
                                    key={idx}
                                    className="border-b py-2 last:border-none flex justify-between"
                                >
                                    <span>{appt.doctorName}</span>
                                    <span className="text-gray-600">{appt.date}</span>
                                </li>
                            ))
                        ) : (
                            <p>No upcoming appointments.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
