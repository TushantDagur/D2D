import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../landing/Navbar';
import bgImage from '../../assets/loginBg.png';
import heartIcon from '../../assets/icons/heartBeats.gif';
import pillIcon from '../../assets/icons/pills.gif';
import stethoscopeIcon from '../../assets/icons/healthCheckup.gif';
import hospitalIcon from '../../assets/icons/doctorsOffice.gif';
import { useNavigate } from 'react-router-dom';


export default function Login({ onToggleForm }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', form);
            localStorage.setItem("token", response.data.token);
            toast.success("Login Successful ✅");

            // Use navigate for a smooth redirect without a page reload
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500); // Timeout allows the user to see the success message

            setForm({
                email: '',
                password: '',
            });
        } catch (err) {
            toast.error(err.response ? err.response.data.message : "An error occurred... ( Login Failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Navbar />
            <div className="flex w-full max-w-6xl bg-transparent items-center justify-center gap-10">

                {/* Floating Icons */}
                <img
                    src={heartIcon}
                    alt="Heart"
                    className="absolute w-14 h-14 animate-float1 left-10 top-24"
                />
                <img
                    src={pillIcon}
                    alt="Pill"
                    className="absolute w-12 h-12 animate-float2 right-20 top-46"
                />
                <img
                    src={stethoscopeIcon}
                    alt="Stethoscope"
                    className="absolute w-16 h-16 animate-float3 left-10 bottom-44"
                />
                <img
                    src={hospitalIcon}
                    alt="Hospital"
                    className="absolute w-14 h-14 animate-float1 right-30 bottom-30"
                />


                {/* Left Side Image */}
                <div className="flex-1 relative h-full max-w-md">
                    <img
                        src={bgImage}
                        alt="Login Background"
                        className="object-contain h-full w-full object-center rounded-2xl"
                    />
                </div>


                {/* Right Side Form */}
                <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-md animate-fadeIn flex-shrink-0">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Log In</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
                        />

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-transform transform hover:scale-105 duration-300">
                            Login
                        </button>

                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Don't have an account?{" "}
                            <button type="button" onClick={onToggleForm} className="text-blue-600 hover:underline">
                                Sign up
                            </button>
                        </p>
                    </form>

                    <ToastContainer position="top-center" autoClose={3000} />
                </div>
            </div>
        </div>
    );
}
