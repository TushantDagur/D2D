import { useEffect, useState } from "react";
import axios from "axios";

const StatsCards = () => {
    const [stats, setStats] = useState({ appointments: 0, services: 0, earnings: 0 });

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/dashboard/stats", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setStats(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold">Appointments</h3>
                <p className="text-2xl">{stats.appointments}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold">Services</h3>
                <p className="text-2xl">{stats.services}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold">Earnings</h3>
                <p className="text-2xl">₹{stats.earnings}</p>
            </div>
        </div>
    );
};

export default StatsCards;
