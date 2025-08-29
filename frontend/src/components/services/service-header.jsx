"use client"

import { Button } from "../ui/button"
import { ArrowLeft, MapPin } from "lucide-react"

export function ServiceHeader({ title, description, backUrl, location }) {
    return (
        <header className="bg-primary text-primary-foreground py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => (window.location.href = backUrl)}
                        className="text-primary-foreground hover:bg-primary-foreground/20 mr-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                        <p className="text-lg opacity-90">{description}</p>
                    </div>
                    <div className="hidden md:flex items-center text-sm opacity-80">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{location || "Finding Location..."}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}