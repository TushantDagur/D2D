"use client"

import { Card,CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"

import brigade from "../../assets/drs.gif"
import lab from "../../assets/labReports.gif"
import pill from "../../assets/landingPill.gif"
import psychology from "../../assets/psychologyConsulting.gif"

export function ServicesSection() {
    const services = [
        {
            iconSrc: brigade,
            title: "Find Doctors Nearby",
            description: "Connect with qualified doctors in your area for consultations and treatments",
            bgColor: "bg-primary/10",
            iconColor: "text-teal-700",
            buttonText: "Find Doctors",
            href: "/doctors",
        },
        {
            iconSrc: lab,
            title: "Lab Services",
            description: "Book health checkups and diagnostic tests at nearby laboratories",
            bgColor: "bg-primary/10",
            iconColor: "text-primary",
            buttonText: "Find Labs",
            href: "/labs",
        },
        {
            iconSrc: pill,
            title: "Pharmacy Nearby",
            description: "Find nearby pharmacies and get your medications delivered to your door",
            bgColor: "bg-primary/10",
            iconColor: "text-primary",
            buttonText: "Find Pharmacy",
            href: "/pharmacy",
        },
        {
            iconSrc: psychology,
            title: "Psychology Consultation",
            description: "Professional mental health support with qualified psychologists",
            bgColor: "bg-accent/10",
            iconColor: "text-accent",
            buttonText: "Book Session",
            href: "/psychology",
            badge: "First Session Free",
        },
    ]

    const handleServiceClick = (href: string) => {
        // NOTE: Corrected to use the actual service href
        window.location.href = href;
    } 

    return (
        <section className="mb-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Our Healthcare Services ✨</h2>
                <p className="text-lg text-muted-foreground">Explore comprehensive health solutions designed for your convenience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => {
                    // 3. Removed: const IconComponent = service.icon 
                    return (
                        <Card
                            key={index}
                            className="hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden" // Enhanced hover
                        >
                            <CardHeader className="text-center p-0 pt-6">
                                <div
                                    // Increased size for prominence and added scale effect
                                    className={`mx-auto w-24 h-24 ${service.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner`}
                                >
                                    {/* 4. Render the GIF using <img> */}
                                    <img
                                        src={service.iconSrc}
                                        alt={`${service.title} illustration`}
                                        className="w-16 h-16 object-contain rounded-full"
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-2 mb-2 px-6">
                                    <CardTitle className="text-xl font-semibold text-gray-800">{service.title}</CardTitle>
                                    {service.badge && (
                                        <Badge
                                            variant="default"
                                            // Enhanced badge styling
                                            className={`text-xs font-medium px-2 py-1 ${service.iconColor} bg-white border border-current`}
                                        >
                                            {service.badge}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="text-center p-6 pt-2">
                                <CardDescription className="mb-5 text-gray-600">{service.description}</CardDescription>
                                <Button
                                    className="w-full font-bold transition-all duration-300 group-hover:shadow-lg"
                                    onClick={() => handleServiceClick(service.href)}
                                    // Use a distinct variant for the "Psychology" card
                                    variant={service.iconSrc === psychology ? "outline" : "default"}
                                >
                                    {service.buttonText}
                                    {/* Added arrow animation */}
                                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </section>
    );
}
