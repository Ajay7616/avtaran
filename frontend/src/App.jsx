import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ForexPage from "./pages/ForexPage";
import ScrollToTop from "./components/Common/ScrollToTop";
 
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forex" element={<ForexPage />} />
      </Routes>
    </BrowserRouter>
  );
}
 