import React from "react";
import AdminHeader from "../components/Admin/AdminHeader";
import DashboardHero from "../components/Admin/DashboardHero";
import DashboardStats from "../components/Admin/DashboardStats";
import CareerApplicationsTable from "../components/Admin/CareerApplicationsTable";
import ContactEnquiriesTable from "../components/Admin/ContactEnquiriesTable";

function AdminDashboardPage() {
  const handleLogout = () => {
    // Clear authentication/session here.
    console.log("Admin logout");
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader onLogout={handleLogout} />

      <DashboardHero />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <DashboardStats />

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 items-start">
          <CareerApplicationsTable />
          <ContactEnquiriesTable />
        </div>
      </main>

      <footer className="border-t border-line mt-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <p className="text-muted text-[.75rem] text-center">
            © {new Date().getFullYear()} Avtaran Capital · Administration Panel
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboardPage;