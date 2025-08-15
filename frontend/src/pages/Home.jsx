import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home(){
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <section className="py-12 container mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
                    <p className="mt-2 text-gray-600">Quick, reliable, and verified medical services at your doorstep.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
}