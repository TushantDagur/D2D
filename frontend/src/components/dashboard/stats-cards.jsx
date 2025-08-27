import { useEffect, useState } from "react";
import axios from "axios";

// Helper component for a styled card
const StatCard = ({ title, value, icon, colorClass, emoji }) => (
    <div className={`bg-white shadow-xl rounded-xl p-6 transition transform hover:scale-[1.02] duration-300 ${colorClass}`}>
        <div className="flex items-center justify-between">
            {/* Emoji and Icon Section */}
            <div className="text-4xl mr-4">
                {emoji}
            </div>

            {/* Text Content */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">
                    {title}
                </h3>
                <p className="text-4xl font-bold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    </div>
);

const StatsCards = () => {
    // Note: I'm keeping the original stat names but using them for the enhanced cards
    const [stats, setStats] = useState({
        appointments: 0,
        doctorsNearby: 0,
        avgResponseTime: "0 min"
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Using a more robust fetch pattern
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                // Optionally set an error state or default values
            }
        };

        fetchStats();
    }, []);

    // Define card data with titles, emojis, and a color theme class
    const cardData = [
        {
            title: "Appointments",
            value: stats.appointments,
            emoji: "📅", // Calendar/Schedule
            colorClass: "border-l-4 border-blue-500 hover:border-blue-700",
        },
        {
            title: "Doctors Nearby",
            value: stats.doctorsNearby,
            emoji: "👨‍⚕️", // Doctor/Medical
            colorClass: "border-l-4 border-green-500 hover:border-green-700",
        },
        {
            title: "Avg. Response Time",
            value: stats.avgResponseTime,
            emoji: "⏱️", // Stopwatch/Time
            colorClass: "border-l-4 border-purple-500 hover:border-purple-700",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cardData.map((card, index) => (
                <StatCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    emoji={card.emoji}
                    colorClass={card.colorClass}
                />
            ))}
        </div>
    );
};

export default StatsCards;


