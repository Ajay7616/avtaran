import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ForexPage from "./pages/ForexPage";
import CorporateAdvisoryPage from "./pages/CorporateAdvisoryPage";
import ScrollToTop from "./components/Common/ScrollToTop";
import InvestmentBankingPage from "./pages/Investmentbankingpage";
import CitizenshipPage from "./pages/Citizenshippage";
import FamilyOfficePage from "./pages/Familyofficepage";
import BusinessSetupPage from "./pages/Businesssetuppage";

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
      </Routes>
    </BrowserRouter>
  );
}
