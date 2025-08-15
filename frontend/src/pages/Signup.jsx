import {useState} from "react";
import axios from "axios";



export default function Signup() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/users/signup', form);
            setMessage(response.data.message);
            setForm({
                name: '',
                email: '',
                password: '',   
            });
        }catch (err) {
            setMessage(err.response ? err.response.data.message : "An error occurred");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Sign Up
                </button>

                {message && <p className="text-center text-sm text-red-500">{message}</p>}
            </form>
        </div>
    );
}