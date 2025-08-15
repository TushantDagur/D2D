import React from "react";
import ambulanceIcon from "../assets/ambulance.gif"; 
import healthcareIllustration from "../assets/Healthcare-illustration1.png";
import brigade from "../assets/brigade.gif";

const Hero = () => {
    return (
        <section className="bg-blue-50 py-16 px-6 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
                <h1 className="text-4xl font-bold text-blue-700">
                    <span>
                    Get Healthcare at Your Doorstep in 30 Minutes{" "} 
                    <img src={ambulanceIcon} alt="Ambulance Icon" className="inline-block ml-2 w-12 h-12" />
                    </span>
                </h1>
                <p className="mt-4 text-gray-700 text-lg">
                    D2D connects you instantly to doctors and medical professionals for fast, reliable home healthcare services.
                </p>
                <div className="mt-6 space-x-4">
                    <a href="/book" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Book Now
                    </a>
                    <a href="/learn" className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300">
                        Learn More
                    </a>
                </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2">
                <img
                    src={healthcareIllustration}
                    alt="Healthcare illustration"
                    className="w-full max-w-md mx-auto"
                />


                {/* <img
                    src={brigade}
                    alt="Healthcare illustration"
                    className="w-full max-w-md mx-auto"
                /> */}
            </div>
        </section>
    );
};

export default Hero;

