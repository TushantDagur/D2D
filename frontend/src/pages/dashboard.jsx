import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        } else {
            setUser({ email : "user@example.com" }); // Simulate fetching user data
        }
    }, [navigate]);

    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome, {user?.email || "Loading..."}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Appointments Card */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Appointments</h2>
                    <p className="text-gray-500 mt-2">No appointments yet.</p>
                </div>

                {/* Doctors Card */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Doctors</h2>
                    <p className="text-gray-500 mt-2">Explore doctors coming soon...</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Profile</h2>
                    <p className="text-gray-500 mt-2">User details will appear here.</p>
                </div>
            </div>
        </div>
    );
}