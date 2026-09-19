import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminProfile } from "../../api/api";

function ProtectedRoute() {
  const location = useLocation();

  const [status, setStatus] = useState("checking");

  // Initial check on mount / route change.
  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        await getAdminProfile();

        if (!cancelled) {
          setStatus("authorized");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus("unauthorized");
        }
      }
    };

    checkSession();

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  // Ongoing: catches a session dying mid-use (refresh token expired or
  // revoked) rather than only at the point a route is first entered.
  // api.js's apiRequest fires this once a 401 can't be silently
  // recovered by refreshing.
  useEffect(() => {
    const handleExpired = () => setStatus("unauthorized");

    window.addEventListener("auth:expired", handleExpired);

    return () => {
      window.removeEventListener("auth:expired", handleExpired);
    };
  }, []);

  // --------------------------------------------------
  // Checking authentication
  // --------------------------------------------------
  if (status === "checking") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">

          <div className="w-10 h-10 rounded-full border-4 border-gold-2 border-t-gold-deep animate-spin" />

          <p className="text-muted text-[.85rem]">
            Checking session…
          </p>

        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Not authenticated
  // --------------------------------------------------
  if (status === "unauthorized") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // --------------------------------------------------
  // Authenticated
  // --------------------------------------------------
  return <Outlet />;
}

export default ProtectedRoute;