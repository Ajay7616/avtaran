import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Common/ScrollToTop";
import ProtectedRoute from "./components/Common/Protectedroute";
import Loader from "./components/Common/Loader";

// Lazy-loaded page components for optimal load performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ForexPage = lazy(() => import("./pages/ForexPage"));
const CorporateAdvisoryPage = lazy(() => import("./pages/CorporateAdvisoryPage"));
const InvestmentBankingPage = lazy(() => import("./pages/Investmentbankingpage"));
const CitizenshipPage = lazy(() => import("./pages/Citizenshippage"));
const FamilyOfficePage = lazy(() => import("./pages/Familyofficepage"));
const BusinessSetupPage = lazy(() => import("./pages/Businesssetuppage"));
const StartupEcosystemPage = lazy(() => import("./pages/StartupEcosystemPage"));
const VirtualCfoPage = lazy(() => import("./pages/VirtualCfoPage"));
const CareerPage = lazy(() => import("./pages/CareerPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const NotFoundPage = lazy(() => import("./pages/Notfoundpage"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader fullScreen={true} message="Loading Page..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/forex" element={<ForexPage />} />
          <Route path="/services/corporate-advisory" element={<CorporateAdvisoryPage />} />
          <Route path="/services/investment-banking" element={<InvestmentBankingPage />} />
          <Route path="/services/citizenship" element={<CitizenshipPage />} />
          <Route path="/services/family-office" element={<FamilyOfficePage />} />
          <Route path="/services/business-setup" element={<BusinessSetupPage />} />
          <Route path="/services/startup" element={<StartupEcosystemPage />} />
          <Route path="/services/virtual-cfo" element={<VirtualCfoPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}