import React from "react";
import ambulanceIcon from "../../assets/ambulance_.gif"; 
import healthcareIllustration from "../../assets/HealthcareIllustration.png";
import brigade from "../../assets/drs.gif";

const Hero = () => {
    return (
        <section className="bg-blue-50 pt-16 px-6 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-700 my-4">
                    <span>
                        Healthcare at Your <span className="text-teal-600">Doorstep</span>{" "} 
                    <img src={ambulanceIcon} alt="Ambulance Icon" className="inline-block ml-2 w-12 h-12" />
                    </span>
                </h1>
                <p className="mt-4 text-gray-700 text-lg">
                    D2D connects you instantly to qualified doctors, book lab tests, and get medicines delivered. Your health, our priority – anytime, anywhere.
                </p>
                <div className="flex flex-col md:flex-row items-center md:justify-start gap-4 mt-6">
                    <button className="flex items-center gap-2 px-3 py-3 rounded-full text-white bg-teal-600 hover:bg-teal-700 transition-colors">
                        <img src={brigade} alt="Download App" className="w-6 h-6" />
                        Find Doctor Nearby
                    </button>
                    <button className="flex items-center gap-2 px-3 py-3 rounded-full text-teal-600 border border-teal-600 hover:bg-teal-50 transition-colors">
                        Download App
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mt-8 gap-6">
                    <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> 24/7 Available
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Verified Doctors
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Quick Delivery
                    </span>
                </div>
            </div>

            <div className="mt-10 md:mt-10 md:w-1/2 p-2">
                <img
                    src={healthcareIllustration}
                    alt="Healthcare illustration"
                    className="w-full max-w-md mx-auto"
                />
            </div>
        </section>
    );
};

export default Hero;

