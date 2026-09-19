import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminHeader from "../components/Admin/AdminHeader";
import DashboardHero from "../components/Admin/DashboardHero";
import DashboardStats from "../components/Admin/DashboardStats";
import CareerApplicationsTable from "../components/Admin/CareerApplicationsTable";
import ContactEnquiriesTable from "../components/Admin/ContactEnquiriesTable";
import Loader from "../components/Common/Loader";
import { adminLogout, getAdminDashboard } from "../api/api";

const DASHBOARD_STATS_KEY = ["admin", "dashboardStats"];

function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const etagRef = useRef(null);

  const {
    data: stats,
    isLoading: statsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: DASHBOARD_STATS_KEY,
    queryFn: async () => {
      const res = await getAdminDashboard(etagRef.current);

      if (res.status === 304 || res.notModified) {
        // Nothing changed server-side — keep whatever's already in the cache.
        return queryClient.getQueryData(DASHBOARD_STATS_KEY) ?? null;
      }

      etagRef.current = res.etag || res.headers?.etag || null;
      return res.stats || res.data?.stats || null;
    },
    refetchInterval: 15000,           // still polls every 15s...
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000,
    retry: 1,
  });

  const handleStatUpdate = (status, type = "career") => {
    queryClient.setQueryData(DASHBOARD_STATS_KEY, (prevStats) => {
      if (!prevStats) return prevStats;

      if (type === "career") {
        return {
          ...prevStats,
          totalApplications: Math.max(0, (prevStats.totalApplications || 0) - 1),
          newApplications:
            status === "new"
              ? Math.max(0, (prevStats.newApplications || 0) - 1)
              : prevStats.newApplications,
        };
      }

      if (type === "contact") {
        return {
          ...prevStats,
          totalContacts: Math.max(0, (prevStats.totalContacts || 0) - 1),
          newContacts:
            status === "new"
              ? Math.max(0, (prevStats.newContacts || 0) - 1)
              : prevStats.newContacts,
        };
      }

      return prevStats;
    });
    // Force the next poll to refetch fully rather than trust a stale ETag,
    // since our local optimistic edit means the client and server diverge.
    etagRef.current = null;
  };

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
        
        {/* Dashboard Stats Section with Loader */}
        {statsLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-line p-6 mb-6">
            <Loader fullScreen={false} message="Loading dashboard metrics..." />
          </div>
        ) : isError ? (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            Failed to load dashboard stats: {error?.message || "Server error"}
          </div>
        ) : (
          <DashboardStats stats={stats} loading={false} />
        )}

        {/* Tables Section */}
        <div className="flex flex-col gap-y-6">
          <CareerApplicationsTable 
            onStatUpdate={handleStatUpdate} 
            loadingComponent={<Loader fullScreen={false} message="Loading career applications..." />}
          />
          <ContactEnquiriesTable 
            onStatUpdate={handleStatUpdate} 
            loadingComponent={<Loader fullScreen={false} message="Loading contact enquiries..." />}
          />
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