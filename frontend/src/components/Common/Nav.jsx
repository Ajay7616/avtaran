import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LOGO_SRC from "../../assets/logo.png";
import { NAV_SERVICE_LINKS } from "../../data/data";

function Nav({ navOpen, setNavOpen, scrolled }) {
  const navRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [openSection, setOpenSection] = useState(null);
  // "services" | "presence" | null

  // --------------------------------------------------
  // Close everything
  // --------------------------------------------------
  const closeAll = useCallback(() => {
    setNavOpen(false);
    setOpenSection(null);
  }, [setNavOpen]);

  // --------------------------------------------------
  // Navigate to homepage section
  // --------------------------------------------------
  const handleSectionNavigation = useCallback(
    (e, sectionId) => {
      e.preventDefault();

      closeAll();

      // Already on homepage
      if (location.pathname === "/") {
        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        // Update URL without creating unnecessary history
        window.history.replaceState(null, "", `/#${sectionId}`);

        return;
      }

      // On another page:
      // navigate to homepage first.
      navigate(`/#${sectionId}`);
    },
    [location.pathname, navigate, closeAll],
  );

  // --------------------------------------------------
  // Handle logo navigation
  // --------------------------------------------------
  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();

      closeAll();

      if (location.pathname === "/") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        window.history.replaceState(null, "", "/");
      } else {
        navigate("/");
      }
    },
    [location.pathname, navigate, closeAll],
  );

  // --------------------------------------------------
  // Mobile dropdown / accordion toggle
  // --------------------------------------------------
  const handleTriggerTap = (e, key) => {
    if (window.innerWidth <= 720) {
      e.preventDefault();

      setOpenSection((prev) => (prev === key ? null : key));
    }
  };

  // --------------------------------------------------
  // Close menu when clicking outside
  // --------------------------------------------------
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
  }, [navOpen, closeAll]);

  // --------------------------------------------------
  // Close menu with Escape
  // --------------------------------------------------
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
  }, [navOpen, closeAll]);

  // --------------------------------------------------
  // Close mobile menu if viewport becomes desktop
  // --------------------------------------------------
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
  }, [navOpen, closeAll]);

  // --------------------------------------------------
  // Reset accordion when mobile menu closes
  // --------------------------------------------------
  useEffect(() => {
    if (!navOpen) {
      setOpenSection(null);
    }
  }, [navOpen]);

  // --------------------------------------------------
  // Scroll to hash after navigating to homepage
  // --------------------------------------------------
  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = hash.substring(1);

    // Small delay allows HomePage to render first
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // --------------------------------------------------
  // Mobile dropdown classes
  // --------------------------------------------------
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
      className={"site-nav" + (scrolled ? " scrolled" : "")}
      id="nav"
      ref={navRef}
    >
      <div className="wrap flex items-center justify-between gap-6">
        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <a
          href="/"
          className="flex items-center gap-3"
          onClick={handleLogoClick}
        >
          <img
            src={LOGO_SRC}
            alt="Avtaran Capital logo"
            className={
              "transition-all duration-300 " + (scrolled ? "h-12" : "h-14")
            }
          />
        </a>

        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

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
          {/* ================================================= */}
          {/* HOME */}
          {/* ================================================= */}

          <a
            href="/#home"
            onClick={(e) => handleSectionNavigation(e, "home")}
            className="nav-link"
          >
            Home
          </a>

          {/* ================================================= */}
          {/* ABOUT */}
          {/* ================================================= */}

          <a
            href="/#about"
            onClick={(e) => handleSectionNavigation(e, "about")}
            className="nav-link"
          >
            About Us
          </a>

          {/* ================================================= */}
          {/* TEAM */}
          {/* ================================================= */}

          <a
            href="/#team"
            onClick={(e) => handleSectionNavigation(e, "team")}
            className="nav-link"
          >
            Team
          </a>

          {/* ================================================= */}
          {/* SERVICES */}
          {/* ================================================= */}

          <div className="group relative mob:w-full">
            <a
              href="/#services"
              className="nav-link mob:flex mob:items-center mob:justify-between mob:w-full"
              onClick={(e) => handleTriggerTap(e, "services")}
            >
              <span>Services</span>

              <span
                className={
                  "inline-block transition-transform duration-200 " +
                  (openSection === "services" ? "mob:rotate-180" : "")
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
                <Link to={l.href} key={l.href} onClick={closeAll}>
                  {l.title}
                  <small>{l.sub}</small>
                </Link>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* STARTUP */}
          {/* ================================================= */}

          <a
            href="/#startup"
            onClick={(e) => handleSectionNavigation(e, "startup")}
            className="nav-link"
          >
            Startup
          </a>

          {/* ================================================= */}
          {/* PRESENCE */}
          {/* ================================================= */}

          <div className="group relative mob:w-full">
            <a
              href="/#presence"
              className="nav-link mob:flex mob:items-center mob:justify-between mob:w-full"
              onClick={(e) => handleTriggerTap(e, "presence")}
            >
              <span>Presence</span>

              <span
                className={
                  "inline-block transition-transform duration-200 " +
                  (openSection === "presence" ? "mob:rotate-180" : "")
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
                href="/#presence"
                className="pres-link"
                data-target="global"
                onClick={(e) => handleSectionNavigation(e, "presence")}
              >
                Global Presence
                <small>Cross-border reach</small>
              </a>

              <a
                href="/#presence"
                className="pres-link"
                data-target="india"
                onClick={(e) => handleSectionNavigation(e, "presence")}
              >
                India Presence
                <small>Pan-India network</small>
              </a>
            </div>
          </div>

          {/* ================================================= */}
          {/* CAREER */}
          {/* ================================================= */}

          <a
            href="/career"
            onClick={(e) => handleSectionNavigation(e, "career")}
            className="nav-link"
          >
            Career
          </a>

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <a
            href="/#contact"
            onClick={(e) => handleSectionNavigation(e, "contact")}
            className="nav-link"
          >
            Contact Us
          </a>
        </nav>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="flex items-center gap-2.5">
          {/* Desktop consultation button */}

          <a
            href="/#contact"
            className="btn btn-gold mob:hidden"
            onClick={(e) => handleSectionNavigation(e, "contact")}
          >
            Book a Consultation
          </a>

          {/* Mobile menu button */}

          <button
            type="button"
            className="hidden mob:block bg-transparent border-none cursor-pointer p-2"
            id="menuBtn"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="navlinks"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span
              className={
                "block w-6 h-0.5 bg-teal-800 " +
                "transition-transform duration-200" +
                (navOpen ? " translate-y-2 rotate-45" : "")
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
                (navOpen ? " -translate-y-2 -rotate-45" : "")
              }
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;
