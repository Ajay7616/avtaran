import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";
import DashboardHero from "../components/Admin/DashboardHero";
import DashboardStats from "../components/Admin/DashboardStats";
import CareerApplicationsTable from "../components/Admin/CareerApplicationsTable";
import ContactEnquiriesTable from "../components/Admin/ContactEnquiriesTable";
import { adminLogout, getAdminDashboard } from "../api/api";

function AdminDashboardPage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getAdminDashboard()
      .then((res) => {
        if (!cancelled) setStats(res.data?.stats || null);
      })
      .catch((error) => {
        console.error("Dashboard stats error:", error);
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader onLogout={handleLogout} />

      <DashboardHero />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <DashboardStats stats={stats} loading={statsLoading} />

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