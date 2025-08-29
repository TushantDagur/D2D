// "use client"

import { useEffect, useState } from "react"
import axios from "axios";
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Bell, Settings, LogOut, User } from "lucide-react"
import logo from "../../assets/navBarLogo.png"


const DashboardHeader = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        axios
            .get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleLogout = () => {
        // Redirect to home page on logout
        localStorage.removeItem("token");
        window.location.href = "/"
    }

    // ✨ Helper to generate initials, handles cases where user data isn't loaded yet
    const getInitials = () => {
        if (user && user.name) {
            const nameParts = user.name.split(' ');

            if (nameParts.length > 1) {
                const firstInitial = nameParts[0].charAt(0);
                const lastInitial = nameParts[nameParts.length - 1].charAt(0); // Takes the last part for names with middle names
                return `${firstInitial}${lastInitial}`.toUpperCase();
            }
            else if (nameParts.length === 1 && nameParts[0] !== '') {
                return nameParts[0].charAt(0).toUpperCase();
            }
        }
        return "U";
    };

    return (
        <header className="sticky mt-0 top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-11 w-11" />
                        <h1 className="text-2xl font-bold text-primary ml-2">D2D</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/generic-user-avatar.png" alt="User" />
                                        <AvatarFallback>{getInitials()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    {user ? (
                                        <div className="flex flex-col space-y-1">
                                            {/* ✨ MODIFIED: Now using user.name */}
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-2">
                                            <div className="h-4 bg-muted rounded w-3/4"></div>
                                            <div className="h-3 bg-muted rounded w-full"></div>
                                        </div>
                                    )}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;