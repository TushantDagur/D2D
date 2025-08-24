import { useEffect, useState } from "react";
import axios from "axios";

const UpcomingAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/dashboard/upcoming-appointments", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <ul className="space-y-2">
                {appointments.map((appt, index) => (
                    <li key={index} className="text-gray-700">
                        {appt.date} - {appt.client}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingAppointments;
