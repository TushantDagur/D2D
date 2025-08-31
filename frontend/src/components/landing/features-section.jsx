import { MapPin, Phone, Clock } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: MapPin,
            title: "Location-Based Services",
            description: "Find healthcare providers near you with real-time location tracking and navigation",
            bgColor: "bg-primary/10",
            iconColor: "text-primary",
        },
        {
            icon: Phone,
            title: "Video Consultations",
            description: "Connect with doctors through secure video calls from the comfort of your home",
            bgColor: "bg-primary/10",
            iconColor: "text-primary",
        },
        {
            icon: Clock,
            title: "Emergency Care",
            description: "Quick access to emergency services and home visits when you need immediate care",
            bgColor: "bg-primary/10",
            iconColor: "text-accent",
        },
    ]

    return (
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose D2D?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Advanced features designed for your healthcare needs
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <div key={index} className="text-center">
                                <div
                                    className={`mx-auto w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-6`}
                                >
                                    <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
