import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ForexPage from "./pages/ForexPage";
import CorporateAdvisoryPage from "./pages/CorporateAdvisoryPage";
import ScrollToTop from "./components/Common/ScrollToTop";
import ProtectedRoute from "./components/Common/Protectedroute";
import InvestmentBankingPage from "./pages/Investmentbankingpage";
import CitizenshipPage from "./pages/Citizenshippage";
import FamilyOfficePage from "./pages/Familyofficepage";
import BusinessSetupPage from "./pages/Businesssetuppage";
import StartupEcosystemPage from "./pages/StartupEcosystemPage";
import VirtualCfoPage from "./pages/VirtualCfoPage";
import CareerPage from "./pages/CareerPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
      </Routes>
    </BrowserRouter>
  );
}