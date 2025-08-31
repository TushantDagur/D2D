import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import ServiceSection from "../components/landing/ServiceSection";
import {FeaturesSection} from '../components/landing/features-section';


export default function Home(){
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <ServiceSection />
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
}