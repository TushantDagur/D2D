import { useEffect, useState } from "react";
import axios from "axios";

const RecentActivity = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/dashboard/recent-activity", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setActivities(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-2">
                {activities.map((activity, index) => (
                    <li key={index} className="text-gray-700">
                        {activity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;
