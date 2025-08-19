import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className="flex-grow">
                <H1>Tera Papa aaya tera papa aaya</H1>
            </main>
            <Footer />
        </div>
    );
}