import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import ServiceSection from "../components/landing/ServiceSection";

export default function Home(){
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <ServiceSection />
                <section className="py-12 text-center  bg-slate-200 container mx-auto px-6">
                    <h2 className="text-2 font-bold text-gray-800">Features</h2>
                    <p className="mt-4 text-gray-600">
                        Explore our range of services designed to make healthcare accessible and convenient for you.
                        </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}