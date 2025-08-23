import { useEffect, useState } from "react";
import axios from "axios";
import Services from "../../components/landing/ServiceSection"

export default function Dashboard() {
    const [summary, setSummary] = useState({});
    const [recentActivity, setRecentActivity] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const username = localStorage.getItem("username"); // from login

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const res1 = await axios.get("http://localhost:5000/api/dashboard/summary", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSummary(res1.data);

                const res2 = await axios.get("http://localhost:5000/api/dashboard/recent-activity", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRecentActivity(res2.data);

                const res3 = await axios.get("http://localhost:5000/api/dashboard/upcoming", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUpcoming(res3.data);
            } catch (error) {
                console.error("Error loading dashboard", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <nav className="bg-teal-600 text-white p-4 rounded-xl flex justify-between">
                <h1 className="text-xl font-bold">D2D HealthCare</h1>
                <p>Welcome back, <span className="font-semibold">{username}</span> 👋</p>
            </nav>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <div className="bg-white shadow-lg p-6 rounded-xl">
                    <h2 className="text-lg font-semibold">Total Appointments</h2>
                    <p className="text-2xl">{summary.totalAppointments || 0}</p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-xl">
                    <h2 className="text-lg font-semibold">Doctors Nearby</h2>
                    <p className="text-2xl">{summary.doctorsNearby || 0}</p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-xl">
                    <h2 className="text-lg font-semibold">Avg. Response Time</h2>
                    <p className="text-2xl">{summary.avgResponseTime || "N/A"}</p>
                </div>
            </div>

            {/* Services Section (reuse from HomePage) */}
            <div className="mt-8">
                {/* Import your Services component */}
                <Services  />
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <ul className="space-y-3">
                    {recentActivity.map((a) => (
                        <li key={a._id} className="p-4 bg-gray-100 rounded-lg shadow">
                            Appointment with <b>{a.doctor?.name}</b> ({a.doctor?.specialization}) on{" "}
                            {new Date(a.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Upcoming Appointments */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
                <ul className="space-y-3">
                    {upcoming.map((a) => (
                        <li key={a._id} className="p-4 bg-green-100 rounded-lg shadow">
                            With <b>{a.doctor?.name}</b> on{" "}
                            {new Date(a.date).toLocaleDateString()} at {new Date(a.date).toLocaleTimeString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
