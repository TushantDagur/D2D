import DashboardHeader from "../../components/dashboard/dashboard-header";
import StatsCards from "../../components/dashboard/stats-cards";
import {RecentActivity} from "../../components/dashboard/recent-activity";
import {ServicesSection} from "../../components/dashboard/service-section";


const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <DashboardHeader />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Welcome to <span className="text-teal-700">D2D Healthcare</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Your health is our priority. Access nearby doctors, labs, pharmacies, and mental health support all in one
                        place.
                    </p>
                </div>

                <StatsCards />
                <ServicesSection />
                <RecentActivity />
            </main>
        </div>
    );
};

export default Dashboard;
