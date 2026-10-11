// Central SEO config. Change SITE_URL to the domain you want Google to index
// (it must be the live production domain, and every page must be reachable on it).
export const SITE_URL = "https://www.avtaran.com";
export const SITE_NAME = "Avtaran Capital";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`; // add a 1200x630 image to /public

export const SEO = {
  home: {
    path: "/",
    title: "Avtaran Capital | Virtual CFO & Capital Advisory India",
    description:
      "Virtual CFO, investment banking, RBI/FEMA, corporate advisory and startup fundraising for founders and enterprises in India and abroad.",
  },
  forex: {
    path: "/services/forex",
    title: "FEMA, RBI & FDI/ODI Compliance Advisory | Avtaran",
    description:
      "FEMA and RBI compliance for FDI, ODI, ECB, liaison and branch offices, LRS and repatriation of funds. Talk to Avtaran Capital's experts.",
  },
  corporateAdvisory: {
    path: "/services/corporate-advisory",
    title: "Corporate Advisory, Valuation & Due Diligence | Avtaran",
    description:
      "Corporate law advisory, due diligence, and business, share and asset valuation to support M&A, restructuring and growth decisions.",
  },
  investmentBanking: {
    path: "/services/investment-banking",
    title: "Investment Banking & Capital Raising India | Avtaran",
    description:
      "Project finance, working capital limits, private equity and M&A advisory from Avtaran Capital's investment banking team.",
  },
  citizenship: {
    path: "/services/citizenship",
    title: "Citizenship & Permanent Residency Advisory | Avtaran",
    description:
      "End-to-end PR and global mobility advisory for the UAE, Canada, USA, UK, Singapore and Europe: eligibility, documentation and process.",
  },
  virtualCfo: {
    path: "/services/virtual-cfo",
    title: "Virtual CFO Services in India | Avtaran Capital",
    description:
      "Outsourced CFO services: financial planning, cash flow, budgeting, MIS, reporting and compliance for startups and growing businesses.",
  },
  familyOffice: {
    path: "/services/family-office",
    title: "Family Office Management & Succession Planning | Avtaran",
    description:
      "Succession planning, family business structuring and HNI / UHNI services, with regulatory and tax compliance for long-term wealth.",
  },
  businessSetup: {
    path: "/services/business-setup",
    title: "Business Set-up & Company Incorporation | Avtaran",
    description:
      "Company incorporation, licences and regulatory approvals in India, UAE, Singapore, UK, USA and other markets.",
  },
  startup: {
    path: "/services/startup",
    title: "Startup Services: Incorporation to Fundraising | Avtaran",
    description:
      "Incorporation, compliance, Virtual CFO, pitch decks, valuation and investor support for startups, from launch to scale-up.",
  },
  career: {
    path: "/career",
    title: "Careers at Avtaran Capital | Join Our Team",
    description:
      "Join Avtaran Capital, a financial advisory firm. Share your CV and tell us about the opportunity you are looking for.",
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy | Avtaran Capital",
    description:
      "How Avtaran Capital collects, uses, shares and protects personal data, and the rights you have over it.",
  },
  terms: {
    path: "/terms-of-use",
    title: "Terms of Use | Avtaran Capital",
    description:
      "The terms that apply when you use the Avtaran Capital website.",
  },
  refund: {
    path: "/refund-policy",
    title: "Refund & Cancellation Policy | Avtaran Capital",
    description:
      "How fees, cancellations and refunds work for Avtaran Capital's advisory services.",
  },
  cookies: {
    path: "/cookie-policy",
    title: "Cookie Policy | Avtaran Capital",
    description:
      "The cookies and browser storage used on the Avtaran Capital website and how to control them.",
  },
  notFound: {
    path: "/404",
    title: "Page Not Found | Avtaran Capital",
    description: "The page you are looking for does not exist.",
    noindex: true,
  },
  admin: {
    path: "/admin",
    title: "Admin | Avtaran Capital",
    description: "Admin area.",
    noindex: true,
  },
};

// Organization schema (home page only). Details taken from the site footer.
export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Avtaran Capital Advisors Pvt. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  telephone: "+91 98333 95565",
  email: "hck@avtaran.com",
  foundingDate: "2009",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Office No. 301, Kamla Hub, N S Road No. 1, JVPD Scheme, Juhu, Vile Parle (West)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400049",
    addressCountry: "IN",
  },
  areaServed: "IN",
  description:
    "Virtual CFO, investment banking, RBI/FEMA, corporate advisory, family office and business set-up services.",
};
