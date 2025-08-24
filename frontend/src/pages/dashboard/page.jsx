import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCards from "../../components/dashboard/StatsCards";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingAppointments from "../../components/dashboard/UpcomingAppointments";
import ServicesSection from "../../components/dashboard/ServicesSection";

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <DashboardHeader />
            <StatsCards />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentActivity />
                <UpcomingAppointments />
            </div>
            <div className="mt-6">
                <ServicesSection />
            </div>
        </div>
    );
};

export default Dashboard;
