import React from "react";
import LOGO_SRC from "../../assets/logo.png";
import { NAV_SERVICE_LINKS } from "../data/data";

function Nav({ navOpen, setNavOpen, scrolled }) {
  const closeMenu = () => setNavOpen(false);

  return (
    <header className={"site-nav" + (scrolled ? " scrolled" : "")} id="nav">
      <div className="wrap flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="Avtaran Capital logo" className={"transition-all duration-300 " + (scrolled ? "h-12" : "h-14")} />
        </a>
        <nav
          className={
            "flex items-center gap-1 " +
            "mob:absolute mob:top-full mob:left-0 mob:right-0 mob:bg-white mob:flex-col mob:items-stretch mob:p-3.5 mob:shadow-brand-md mob:rounded-b-2xl mob:gap-0.5 " +
            (navOpen ? "mob:flex" : "mob:hidden")
          }
          id="navlinks"
        >
          <a href="#home" onClick={closeMenu} className="nav-link">Home</a>
          <a href="#about" onClick={closeMenu} className="nav-link">About Us</a>
          <a href="#team" onClick={closeMenu} className="nav-link">Team</a>
          <div className="group relative">
            <a href="#services" className="nav-link">Services &#9662;</a>
            <div className="nav-dropdown nav-dropdown-wide mob:static mob:opacity-100 mob:visible mob:translate-x-0 mob:shadow-none mob:border-none mob:pl-3 mob:min-w-0 mob:grid-cols-1">
              {NAV_SERVICE_LINKS.map((l) => (
                <a href={l.href} key={l.href} onClick={closeMenu}>
                  {l.title}
                  <small>{l.sub}</small>
                </a>
              ))}
            </div>
          </div>
          <a href="#startup" onClick={closeMenu} className="nav-link">Startup</a>
          <div className="group relative">
            <a href="#presence" className="nav-link">Presence &#9662;</a>
            <div className="nav-dropdown mob:static mob:opacity-100 mob:visible mob:translate-x-0 mob:shadow-none mob:border-none mob:pl-3 mob:min-w-0">
              <a href="#presence" className="pres-link" data-target="global" onClick={closeMenu}>
                Global Presence
                <small>Cross-border reach</small>
              </a>
              <a href="#presence" className="pres-link" data-target="india" onClick={closeMenu}>
                India Presence
                <small>Pan-India network</small>
              </a>
            </div>
          </div>
          <a href="#contact" onClick={closeMenu} className="nav-link">Contact Us</a>
        </nav>
        <div className="flex items-center gap-2.5">
          <a href="#contact" className="btn btn-gold mob:hidden">Book a Consultation</a>
          <button
            className="hidden mob:block bg-transparent border-none cursor-pointer p-2"
            id="menuBtn"
            aria-label="Menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className="block w-6 h-0.5 bg-teal-800 my-1.5"></span>
            <span className="block w-6 h-0.5 bg-teal-800 my-1.5"></span>
            <span className="block w-6 h-0.5 bg-teal-800 my-1.5"></span>
          </button>
        </div>
      </div>
    </header>
  );
}


export default Nav;
