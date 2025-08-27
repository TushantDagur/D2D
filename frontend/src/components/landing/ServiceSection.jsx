// "use client"
import React from "react"
import { Stethoscope, FlaskConical, Pill, Brain } from "lucide-react"
import brigade from "../../assets/drs.gif"
import lab from "../../assets/labReports.gif"
import pill from "../../assets/landingPill.gif"
import psychology from "../../assets/psychologyConsulting.gif"
import { Link } from "react-router-dom"

export function ServicesSection() {
    const handleServiceClick = () => {
        // Redirect to login first
        window.location.href = "/login"
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-white pt-16 px-4 sm:px-6 lg:px-8">

            <div className="max-w-7xl mx-auto">

                {/* Main Section Heading */}

                <div className="text-center">

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">

                        Instant Care at Your Fingertips

                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">

                        Connect with certified doctors virtually or at home. Get medicine delivered fast.

                    </p>

                </div>



                {/* Cards Container with Animation and Layout Improvements */}

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Card 1 */}

                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1 animate-fadeIn delay-100">
                        <div className="rounded-full border-2 border-teal-500 bg-teal-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                            <img src={brigade} alt="Find Doctor Nearby" className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Find Doctor Nearby</h2>
                        <p className="text-gray-600 text-center mb-4">Connect with qualified doctors in your area for consultations and emergency home visits.</p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 justify-start w-full">
                            <li>Video/Call Consultation</li>
                            <li>Emergency Home Visits</li>
                            <li>Specialist Doctors</li>
                            <li>24/7 Availability</li>
                        </ul>
                        <button onClick={() => handleServiceClick()}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300">
                            Get Started
                        </button>
                    </div>


                    {/* Card 2 */}

                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1 animate-fadeIn delay-100">
                        <div className="rounded-full border-2 border-teal-500 bg-teal-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                            <img src={lab} alt="Lab Services" className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Lab Services</h2>
                        <p className="text-gray-600 text-center mb-4">Book diagnostic tests and health checkups from certified laboratories near you.</p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 justify-start w-full">
                            <li>Home Sample Collection</li>
                            <li>Digital Reports</li>
                            <li>Health Packages</li>
                            <li>Quick Results</li>
                        </ul>
                        <button onClick={() => handleServiceClick()}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300">
                            Get Started
                        </button>
                    </div>



                    {/* Card 3 */}

                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1 animate-fadeIn delay-200">
                        <div className="rounded-full border-2 border-teal-500 bg-teal-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                            <img src={pill} alt="Pharmacy Nearby" className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Pharmacy Nearby</h2>
                        <p className="text-gray-600 text-center mb-4">Order medicines and healthcare products with fast delivery to your doorstep.</p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 justify-start w-full">
                            <li>Medicine Delivery</li>
                            <li>Prescription Upload</li>
                            <li>Generic Options</li>
                            <li>Health Products</li>
                        </ul>
                        <button onClick={() => handleServiceClick()}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300">
                            Get Started
                        </button>

                    </div>



                    {/* Card 4 */}

                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1 animate-fadeIn delay-300">
                        <div className="rounded-full border-2 border-teal-500 bg-teal-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                            <img src={psychology} alt="Psychology Consultation" className="w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Psychology Consultation</h2>
                        <p className="text-gray-600 text-center mb-4">Mental health support with psychologists. First session free for anxiety/depression.</p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 justify-start w-full">
                            <li>Free First Session</li>
                            <li>Anxiety Support</li>
                            <li>Depression Care</li>
                            <li>Youth Focuesd</li>
                        </ul>
                        <button onClick={() => handleServiceClick()}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300">
                            Get Started
                        </button>
                    </div>

                </div>

            </div>

        </div >
    );
}

export default ServicesSection;
