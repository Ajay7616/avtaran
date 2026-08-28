import React from "react";
import { Link } from "react-router-dom";

import LOGO_SRC from "../../assets/logo.png";
import { NAV_SERVICE_LINKS } from "../../data/data";

function Footer() {
  const handleSectionClick = (sectionId) => {
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      window.history.replaceState(
        null,
        "",
        `/#${sectionId}`
      );
    }
  };

  return (
    <footer className="bg-white text-muted pt-[70px] pb-7.5 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] tab:grid-cols-2 mob:grid-cols-1 gap-10 mb-12">

          {/* COMPANY INFORMATION */}
          <div>
            {/* <img
              src={LOGO_SRC}
              alt="Avtaran Capital"
              className="h-13 mb-4"
            />

            <p className="text-[.9rem] max-w-[280px] leading-relaxed">
              Strategic finance, Virtual CFO and capital advisory for
              ambitious businesses—across India and global markets.
            </p> */}

            <p className="text-[.86rem] text-muted leading-relaxed">
              AVTARAN Capital Advisors Pvt. Ltd.
              <br />
              Office No. 301, Kamla Hub, N S Road No. 1,
              <br />
              Beside Aromas Cafe, Near Criti Care Hospital,
              <br />
              JVPD Scheme, Juhu, Vile Parle (West),
              <br />
              Mumbai 400049
              <br />

              <a
                href="tel:+919833395565"
                className="text-teal-800 font-semibold"
              >
                +91 98333 95565
              </a>

              {" "}&middot;{" "}

              <a
                href="mailto:hck@avtaran.com"
                className="text-teal-800 font-semibold"
              >
                hck@avtaran.com
              </a>
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-2.5 mt-4.5">

              {/* LinkedIn */}
              <button
                type="button"
                aria-label="LinkedIn"
                className="foot-social-link"
                onClick={() => {
                  // Add official LinkedIn URL when available
                }}
              >
                <svg
                  width="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4 0 4.74 2.64 4.74 6.07V21H18.5v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10z" />
                </svg>
              </button>

              {/* X / TWITTER */}
              <button
                type="button"
                aria-label="Twitter"
                className="foot-social-link"
                onClick={() => {
                  // Add official X/Twitter URL when available
                }}
              >
                <svg
                  width="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.8l7.5-8.6L2.4 2h6.6l4.5 6.7zM17.8 20h1.7L8.3 4H6.5z" />
                </svg>
              </button>

              {/* INSTAGRAM */}
              <button
                type="button"
                aria-label="Instagram"
                className="foot-social-link"
                onClick={() => {
                  // Add official Instagram URL when available
                }}
              >
                <svg
                  width="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17"
                    cy="7"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </button>

            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h5 className="text-teal-900 font-sans text-[.82rem] uppercase tracking-wide mb-4 font-semibold">
              Company
            </h5>

            <a
              href="/#about"
              className="foot-link"
              onClick={() => handleSectionClick("about")}
            >
              About Us
            </a>

            <a
              href="/#team"
              className="foot-link"
              onClick={() => handleSectionClick("team")}
            >
              Leadership
            </a>

            <a
              href="/#services"
              className="foot-link"
              onClick={() => handleSectionClick("services")}
            >
              Services
            </a>

            <a
              href="/#startup"
              className="foot-link"
              onClick={() => handleSectionClick("startup")}
            >
              Startup Programme
            </a>

            <a
              href="/#presence"
              className="foot-link"
              onClick={() => handleSectionClick("presence")}
            >
              Our Presence
            </a>

            <a
              href="/#contact"
              className="foot-link"
              onClick={() => handleSectionClick("contact")}
            >
              Contact
            </a>

            <a
              href="/#career"
              className="foot-link"
              onClick={() => handleSectionClick("career")}
            >
              Career
            </a>
          </div>

          {/* SERVICES */}
          <div>
            <h5 className="text-teal-900 font-sans text-[.82rem] uppercase tracking-wide mb-4 font-semibold">
              Services
            </h5>

            {NAV_SERVICE_LINKS.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="foot-link"
              >
                {service.title}
              </Link>
            ))}
          </div>

          {/* PRESENCE */}
          <div>
            <h5 className="text-teal-900 font-sans text-[.82rem] uppercase tracking-wide mb-4 font-semibold">
              Presence
            </h5>

            <a
              href="/#presence"
              className="foot-link"
              onClick={() => handleSectionClick("presence")}
            >
              India Presence
            </a>

            <a
              href="/#presence"
              className="foot-link"
              onClick={() => handleSectionClick("presence")}
            >
              Global Presence
            </a>

            <a
              href="/#industries"
              className="foot-link"
              onClick={() => handleSectionClick("industries")}
            >
              Industries
            </a>

            <a
              href="/#contact"
              className="foot-link"
              onClick={() => handleSectionClick("contact")}
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="border-t border-line pt-6 flex justify-between flex-wrap gap-3 text-[.84rem]">
          <span>
            &copy; 2026 Avtaran Capital. All rights reserved.
          </span>

          <span>
            www.avtaran.com &middot; Privacy Policy &middot; Terms of Use
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;