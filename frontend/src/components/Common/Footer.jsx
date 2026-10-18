import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_SERVICE_LINKS } from "../../data/data";

const COMPANY_LINKS = [
  ["About Us", "about"],
  ["Leadership", "team"],
  ["Services", "services"],
  ["Startup Programme", "startup"],
  ["Our Presence", "presence"],
  ["Industries", "industries"],
  ["Career", "career"],
  ["Contact", "contact"],
];

const POLICIES = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Use", "/terms-of-use"],
  ["Refund Policy", "/refund-policy"],
  ["Cookie Policy", "/cookie-policy"],
];

function Footer() {
  const navigate = useNavigate();

  const goToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", `/#${sectionId}`);
      }, 100);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `/#${sectionId}`);
  };

  const sectionLinkClass =
    "block py-1 text-[13px] leading-5 text-slate-600 " +
    "transition-colors duration-200 hover:text-[#b58a32]";

  const headingClass =
    "mb-3 text-[11px] font-bold uppercase tracking-[0.16em] " +
    "text-[#174b45]";

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-5 pt-10 sm:px-8 sm:pt-12 lg:px-10">
        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.4fr_0.8fr_1.15fr_0.8fr] lg:gap-8">
          {/* BRAND AND CONTACT */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Avtaran Capital home"
            >
              <img
                src="/favicon.png"
                alt="Avtaran Capital Advisors"
                className="h-10 w-auto max-w-[180px] object-contain object-left"
              />

              <span className="leading-tight">
                <span className="block text-[17px] font-bold tracking-[0.12em] text-[#174b45]">
                  AVTARAN
                </span>
                <span className="mt-1 block text-[9px] font-semibold tracking-[0.2em] text-[#a47b28]">
                  CAPITAL ADVISORS
                </span>
              </span>
            </Link>
{/* 
            <p className="mt-3 max-w-xs text-[13px] leading-[1.8] text-slate-600">
              Strategic finance, Virtual CFO and capital advisory for ambitious
              businesses across India and global markets.
            </p> */}

            <address className="mt-4 space-y-1 not-italic text-[12px] leading-[1.7] text-slate-600">
              <p className="font-semibold text-slate-800">
                AVTARAN Capital Advisors Pvt. Ltd.
              </p>
              <p>
                Office No. 301, Kamla Hub, N S Road No. 1, Beside Aromas Cafe,
                Near Criti Care Hospital, JVPD Scheme, Juhu, Vile Parle (West),
                Mumbai 400049
              </p>

              <p className="flex flex-wrap gap-x-2 gap-y-1 pt-1">
                <a
                  href="tel:+919833395565"
                  className="font-semibold text-[#174b45] hover:text-[#a47b28]"
                >
                  +91 98333 95565
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="mailto:hck@avtaran.com"
                  className="break-all font-semibold text-[#174b45] hover:text-[#a47b28]"
                >
                  hck@avtaran.com
                </a>
              </p>
            </address>

            {/* SOCIAL LINKS */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/avtaran-capital-advisors-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#174b45] transition hover:border-[#174b45] hover:bg-[#174b45] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4 0 4.74 2.64 4.74 6.07V21H18.5v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COMPANY LINKS */}
          <nav aria-label="Company navigation">
            <h2 className={headingClass}>Company</h2>

            <ul className="space-y-1">
              {COMPANY_LINKS.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    className={sectionLinkClass}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SERVICES */}
          <nav aria-label="Services navigation">
            <h2 className={headingClass}>Our Services</h2>

            <ul className="space-y-1">
              {NAV_SERVICE_LINKS.map((service) => (
                <li key={service.href}>
                  <Link to={service.href} className={sectionLinkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* PRESENCE AND CONTACT CTA */}
          <div>
            <h2 className={headingClass}>Our Presence</h2>

            <ul className="space-y-1">
              {[
                ["India Presence", "presence"],
                ["Global Presence", "presence"],
                ["Industries", "industries"],
              ].map(([label, id], index) => (
                <li key={`${label}-${index}`}>
                  <a
                    href={`/#${id}`}
                    className={sectionLinkClass}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/#contact"
              onClick={(event) => {
                event.preventDefault();
                goToSection("contact");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#c99a2e] px-4 py-2.5 text-xs font-semibold text-[#123e3a] transition duration-200 hover:bg-[#b58a25] focus:outline-none focus:ring-2 focus:ring-[#c99a2e] focus:ring-offset-2"
            >
              Book a Call
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-4 text-[11px] leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Avtaran Capital. All rights reserved.
          </p>

          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap gap-x-4 gap-y-1"
          >
            {POLICIES.map(([label, path]) => (
              <Link
                key={path}
                to={path}
                className="transition hover:text-[#a47b28]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <a
            href="https://www.avtaran.com"
            className="transition hover:text-[#174b45]"
          >
            avtaran.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
