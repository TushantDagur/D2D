import DashboardHeader from "../../components/dashboard/dashboard-header";
import StatsCards from "../../components/dashboard/stats-cards";
import DoctorsList from "../../components/services/doctors-list"


const Doctors = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <DashboardHeader />
            <DoctorsList />
        </div>
    );
};

export default Doctors;
