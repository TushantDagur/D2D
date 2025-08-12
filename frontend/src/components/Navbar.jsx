import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold">D2D</h1>
            <ul className="flex gap-6">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/login" className="hover:underline">Login</a></li>
                <li><a href="/signup" className="hover:underline">Signup</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
