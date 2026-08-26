import React from "react";

const NAV_SERVICE_LINKS = [
  {
    href: "/services/forex",
    title: "Foreign Exchange / RBI",
    sub: "FEMA, remittances, FDI/ODI",
  },
  {
    href: "/services/corporate-advisory",
    title: "Corporate Advisory",
    sub: "M&A, restructuring, strategy",
  },
  {
    href: "/services/investment-banking",
    title: "Investment Banking",
    sub: "Capital raising & deals",
  },
  {
    href: "/services/citizenship",
    title: "Citizenship / PR",
    sub: "Global residency pathways",
  },
  {
    href: "/services/virtual-cfo",
    title: "Virtual CFO Services",
    sub: "Fractional finance leadership",
  },
  {
    href: "/services/family-office",
    title: "Family Office Management",
    sub: "Wealth & succession",
  },
  {
    href: "/services/business-setup",
    title: "Business Set-up",
    sub: "Incorporation & compliance",
  },
  {
    href: "/services/startup",
    title: "Startup & Fundraising",
    sub: "Idea to investable",
  },
];


const TEAM = [
  { initial: "H", name: "Hardik", role: "Founder & CEO", featured: true },
  { initial: "C", name: "Chetna", role: "Non-Executive Director" },
  { initial: "P", name: "Pritesh", role: "Non-Executive Director" },
  { initial: "A", name: "Ashish", role: "Non-Executive Director" },
  { initial: "D", name: "Dilip Shah", role: "Ret. IRS" },
  { initial: "N", name: "Nikhil", role: "Business Head — Canada & SA" },
  { initial: "P", name: "Paresh", role: "Business Head — North America" },
];


const SERVICES = [
  {
    id: "forex",
    title: "Foreign Exchange / RBI",
    desc: "We guide you through foreign exchange regulations, RBI norms and currency-related requirements, ensuring smooth, fully compliant cross-border transactions.",
    items: ["FEMA & RBI compliance", "Inward & outward remittances", "FDI / ODI advisory", "Currency risk management"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
      </svg>
    ),
  },
  {
    id: "corporate-advisory",
    title: "Corporate Advisory",
    desc: "Our corporate advisory solutions support mergers, acquisitions, restructuring and strategic planning. With sharp market insight and financial expertise, we help organisations make decisions aligned with long-term growth.",
    items: ["Mergers & acquisitions", "Business restructuring", "Strategic & growth planning", "Market entry advisory"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    id: "investment-banking",
    title: "Investment Banking",
    desc: "We help businesses raise capital, structure deals and manage high-value transactions—offering end-to-end financial guidance at every stage of the process.",
    items: ["Equity & debt fundraising", "Deal structuring & execution", "Business valuation", "Investor & lender outreach"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V10M10 21V6M15 21V13M20 21V4" />
      </svg>
    ),
  },
  {
    id: "citizenship",
    title: "Citizenship / PR",
    desc: "We provide strategic assistance for global citizenship and residency pathways, helping individuals and families navigate the legal, financial and documentation requirements with ease.",
    items: ["Citizenship by investment", "Golden visa & residency", "Documentation & legal support", "Cross-border tax planning"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    id: "virtual-cfo-card",
    title: "Virtual CFO Services",
    desc: "Our Virtual CFOs act as your strategic financial advisors and performance overseers—delivering CFO-level leadership remotely, without the cost of a full-time hire.",
    items: ["MIS, budgeting & cash flow", "Board & investor reporting", "Financial modelling & forecasting", "Profitability & cost control"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M2 20h20M8 8l3 3-3 3M13 14h4" />
      </svg>
    ),
  },
  {
    id: "family-office",
    title: "Family Office Management",
    desc: "From wealth preservation to multi-asset planning, we manage family offices with a focus on governance, tax efficiency and long-term financial stewardship.",
    items: ["Wealth preservation & succession", "Multi-asset portfolio planning", "Governance & tax efficiency", "Estate & legacy planning"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.5 1.6-4.6 3.8-5.4" />
      </svg>
    ),
  },
  {
    id: "business-setup",
    title: "Business Set-up Services",
    desc: "We streamline the process of establishing a business—handling registrations, regulatory approvals, compliance and operational structuring to ensure a seamless launch.",
    items: ["Company incorporation", "Licences & regulatory approvals", "Statutory & tax compliance", "Operational structuring"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    id: "startup-advisory",
    title: "Startup & Fundraising",
    desc: "We take founders from a promising idea to an investable, scalable business—building the financial story, models and connections needed to raise capital with confidence.",
    items: ["Investor-ready models & decks", "Cap table & data room setup", "Seed to growth fundraising", "Virtual CFO for startups"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2c3 2 5 5 5 9a5 5 0 01-10 0c0-4 2-7 5-9z" />
        <path d="M9 21h6M10 18h4" />
      </svg>
    ),
  },
];


const INDIA_CITIES = [
  "Ahmedabad", "Bengaluru", "Bhuj", "Chandigarh", "Delhi|HQ", "Gurugram",
  "Hyderabad", "Indore", "Jaipur", "Jammu", "Mumbai|HQ", "Nagpur",
  "Noida", "Patna", "Rajkot", "Ranchi", "Surat", "Vadodara", "Vishakhapatnam",
];

const INTL_LOCATIONS = [
  { code: "ae", name: "UAE", sub: "Dubai & Abu Dhabi" },
  { code: "gb", name: "United Kingdom", sub: "London" },
  { code: "ch", name: "Switzerland", sub: "Geneva" },
  { code: "lv", name: "Latvia", sub: "Riga" },
  { code: "ee", name: "Estonia", sub: "Tallinn" },
  { code: "ca", name: "Canada", sub: "Vancouver & Toronto" },
  { code: "nl", name: "Netherlands", sub: "Amsterdam" },
  { code: "sg", name: "Singapore", sub: "Singapore" },
  { code: "hk", name: "Hong Kong", sub: "Hong Kong SAR" },
];

export { NAV_SERVICE_LINKS, TEAM, SERVICES, INDIA_CITIES, INTL_LOCATIONS };
