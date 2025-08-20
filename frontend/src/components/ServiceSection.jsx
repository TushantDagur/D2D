import React from 'react';

const PageTemplate = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-white pt-16 px-2 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-gray-800">
                        Our Healthcare Services
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive healthcare solutions delivered to your doorstep. Find the right care when you need it most.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Consult Anywhere
                            </h3>
                            <p className="mt-2 text-gray-600">
                                No waiting rooms. Access doctors anytime, anywhere.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Swift Home Services
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Book home visits or medicine deliveries in under 30 minutes.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Life-Friendly Healthcare
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Advanced tech and trusted pros for your busy life.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTemplate;