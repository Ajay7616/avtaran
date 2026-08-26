import React, { useEffect, useRef, useState } from "react";
import LOGO_SRC from "../../assets/logo.png";
import { NAV_SERVICE_LINKS } from "../../data/data";

function Nav({ navOpen, setNavOpen, scrolled }) {
  const navRef = useRef(null);

  const [openSection, setOpenSection] = useState(null);
  // "services" | "presence" | null

  const closeAll = () => {
    setNavOpen(false);
    setOpenSection(null);
  };

  // Mobile dropdown / accordion toggle
  const handleTriggerTap = (e, key) => {
    if (window.innerWidth <= 720) {
      e.preventDefault();

      setOpenSection((prev) => (prev === key ? null : key));
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!navOpen) return;

    const handlePointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [navOpen]);

  // Close menu with Escape
  useEffect(() => {
    if (!navOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [navOpen]);

  // Close mobile menu if viewport becomes desktop
  useEffect(() => {
    if (!navOpen) return;

    const mq = window.matchMedia("(min-width: 721px)");

    const handleChange = (e) => {
      if (e.matches) {
        closeAll();
      }
    };

    mq.addEventListener("change", handleChange);

    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, [navOpen]);

  // Reset accordion when mobile menu closes
  useEffect(() => {
    if (!navOpen) {
      setOpenSection(null);
    }
  }, [navOpen]);

  // Mobile dropdown classes
  const dropdownMobClasses = (key) => {
    if (openSection === key) {
      return [
        "mob:!opacity-100",
        "mob:!visible",
        "mob:!static",
        "mob:!translate-y-0",
        "mob:max-h-[600px]",
        "mob:pointer-events-auto",
      ].join(" ");
    }

    return [
      "mob:!opacity-0",
      "mob:!invisible",
      "mob:!absolute",
      "mob:max-h-0",
      "mob:overflow-hidden",
      "mob:pointer-events-none",
    ].join(" ");
  };

  return (
    <header
      className={
        "site-nav" + (scrolled ? " scrolled" : "")
      }
      id="nav"
      ref={navRef}
    >
      <div className="wrap flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3"
          onClick={closeAll}
        >
          <img
            src={LOGO_SRC}
            alt="Avtaran Capital logo"
            className={
              "transition-all duration-300 " +
              (scrolled ? "h-12" : "h-14")
            }
          />
        </a>

        {/* Navigation */}
        <nav
          id="navlinks"
          className={
            "flex items-center gap-1 " +
            "mob:absolute mob:top-full mob:left-0 mob:right-0 " +
            "mob:bg-white mob:flex-col mob:items-stretch " +
            "mob:p-3.5 mob:shadow-brand-md mob:rounded-b-2xl " +
            "mob:gap-0.5 mob:max-h-[80vh] mob:overflow-y-auto " +
            (navOpen ? "mob:flex" : "mob:hidden")
          }
        >
          {/* Home */}
          <a
            href="#home"
            onClick={closeAll}
            className="nav-link"
          >
            Home
          </a>

          {/* About */}
          <a
            href="#about"
            onClick={closeAll}
            className="nav-link"
          >
            About Us
          </a>

          {/* Team */}
          <a
            href="#team"
            onClick={closeAll}
            className="nav-link"
          >
            Team
          </a>

          {/* Services */}
          <div className="group relative mob:w-full">
            <a
              href="#services"
              className="nav-link mob:flex mob:items-center mob:justify-between mob:w-full"
              onClick={(e) =>
                handleTriggerTap(e, "services")
              }
            >
              <span>Services</span>

              <span
                className={
                  "inline-block transition-transform duration-200 " +
                  (openSection === "services"
                    ? "mob:rotate-180"
                    : "")
                }
              >
                &#9662;
              </span>
            </a>

            <div
              className={
                "nav-dropdown nav-dropdown-wide " +
                "mob:pl-3 mob:min-w-0 mob:grid-cols-1 " +
                "mob:!left-0 mob:!translate-x-0 " +
                "mob:shadow-none mob:border-none " +
                "mob:bg-transparent mob:p-0 " +
                "mob:transition-all mob:duration-200 " +
                dropdownMobClasses("services")
              }
            >
              {NAV_SERVICE_LINKS.map((l) => (
                <a
                  href={l.href}
                  key={l.href}
                  onClick={closeAll}
                >
                  {l.title}
                  <small>{l.sub}</small>
                </a>
              ))}
            </div>
          </div>

          {/* Startup */}
          <a
            href="#startup"
            onClick={closeAll}
            className="nav-link"
          >
            Startup
          </a>

          {/* Presence */}
          <div className="group relative mob:w-full">
            <a
              href="#presence"
              className="nav-link mob:flex mob:items-center mob:justify-between mob:w-full"
              onClick={(e) =>
                handleTriggerTap(e, "presence")
              }
            >
              <span>Presence</span>

              <span
                className={
                  "inline-block transition-transform duration-200 " +
                  (openSection === "presence"
                    ? "mob:rotate-180"
                    : "")
                }
              >
                &#9662;
              </span>
            </a>

            <div
              className={
                "nav-dropdown " +
                "mob:pl-3 mob:min-w-0 " +
                "mob:!left-0 mob:!translate-x-0 " +
                "mob:shadow-none mob:border-none " +
                "mob:bg-transparent mob:p-0 " +
                "mob:transition-all mob:duration-200 " +
                dropdownMobClasses("presence")
              }
            >
              <a
                href="#presence"
                className="pres-link"
                data-target="global"
                onClick={closeAll}
              >
                Global Presence
                <small>Cross-border reach</small>
              </a>

              <a
                href="#presence"
                className="pres-link"
                data-target="india"
                onClick={closeAll}
              >
                India Presence
                <small>Pan-India network</small>
              </a>
            </div>
          </div>

          {/* Career */}
          <a
            href="#contact"
            onClick={closeAll}
            className="nav-link"
          >
            Career
          </a>

          {/* Contact */}
          <a
            href="#contact"
            onClick={closeAll}
            className="nav-link"
          >
            Contact Us
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          {/* Desktop button */}
          <a
            href="#contact"
            className="btn btn-gold mob:hidden"
          >
            Book a Consultation
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="hidden mob:block bg-transparent border-none cursor-pointer p-2"
            id="menuBtn"
            aria-label="Menu"
            aria-expanded={navOpen}
            aria-controls="navlinks"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span
              className={
                "block w-6 h-0.5 bg-teal-800 " +
                "transition-transform duration-200" +
                (navOpen
                  ? " translate-y-2 rotate-45"
                  : "")
              }
            />

            <span
              className={
                "block w-6 h-0.5 bg-teal-800 my-1.5 " +
                "transition-opacity duration-200" +
                (navOpen ? " opacity-0" : "")
              }
            />

            <span
              className={
                "block w-6 h-0.5 bg-teal-800 " +
                "transition-transform duration-200" +
                (navOpen
                  ? " -translate-y-2 -rotate-45"
                  : "")
              }
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;