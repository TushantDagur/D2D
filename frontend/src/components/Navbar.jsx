import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Phone, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll for shadow effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-md bg-white" : "bg-white shadow-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo & Brand */}
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 p-2 rounded-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                  2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 
                  3.41 0.81 4.5 2.09C13.09 3.81 14.76 
                  3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                  3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            />
                        </svg>
                    </div>
                    <span className="font-bold text-blue-500 text-lg">
                        D2D
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6 text-gray-400">
                    <a href="/#" className="hover:text-blue-500">Home</a>
                    <a href="#" className="hover:text-blue-500">Doctors</a>
                    <a href="#" className="hover:text-blue-500">Lab Tests</a>
                    <a href="#" className="hover:text-blue-500">Pharmacy</a>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    <button className="flex items-center space-x-1 border border-gray-200 rounded-full px-3 py-1 text-gray-300 cursor-not-allowed">
                        <Phone size={14} />
                        <span>Emergency</span>
                    </button>
                    <button className="bg-teal-500 hover:bg-teal-800 text-white rounded-full px-4 py-1" >
                        <a href="/login">Log In </a>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden px-6 space-y-3 transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
                    } overflow-hidden`}
            >
                <a href="#" className="block text-gray-400 hover:text-blue-500">Home</a>
                <a href="#" className="block text-gray-400 hover:text-blue-500">Doctors</a>
                <a href="#" className="block text-gray-400 hover:text-blue-500">Lab Tests</a>
                <a href="#" className="block text-gray-400 hover:text-blue-500">Pharmacy</a>

                <button className="flex items-center space-x-1 border border-gray-200 rounded-full px-3 py-1 text-gray-300 cursor-not-allowed w-full justify-center">
                    <Phone size={14} />
                    <span>Emergency</span>
                </button>

                <button className="bg-teal-500 hover:bg-teal-800 text-white rounded-full px-4 py-1 w-full">
                    Login
                </button>
            </div>
        </nav>
    );
}
