import { useEffect, useState } from "react";
import axios from "axios";

const ServicesSection = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/services", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setServices(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Services</h3>
            <ul className="space-y-2">
                {services.map((service, index) => (
                    <li key={index} className="text-gray-700">
                        {service.name} – ₹{service.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesSection;
