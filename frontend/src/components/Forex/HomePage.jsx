import React, { useEffect, useRef, useState, useCallback } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import About from "../components/About";
import ImpactStats from "../components/ImpactStats";
import Leadership from "../components/Leadership";
import Services from "../components/Services";
import VcfoFeature from "../components/VcfoFeature";
import StartupProgramme from "../components/StartupProgramme";
import Presence from "../components/Presence";
import Industries from "../components/Industries";
import Testimonial from "../components/Testimonial";
import CtaStrip from "../components/CtaStrip";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/* ---------------------------------------------------------
   Avtaran Capital — React + Tailwind conversion
   Each section lives in ./components; shared data in
   ./components/data.js. Layout/spacing use Tailwind
   utilities; complex/reused patterns use @apply component
   classes defined in index.css.
   --------------------------------------------------------- */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const rootRef = useRef(null);

  // Nav scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal (mirrors the original IntersectionObserver behaviour)
  useEffect(() => {
    const els = rootRef.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 5) * 70 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Count-up animation for stat numbers
  useEffect(() => {
    function countUp(el) {
      const target = +el.dataset.count;
      const suf = el.dataset.suffix || "";
      const pre = el.dataset.prefix || "";
      let t0 = null;
      const dur = 1600;
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        const cur = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = pre + cur.toLocaleString("en-IN") + suf;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = pre + target.toLocaleString("en-IN") + suf;
      };
      requestAnimationFrame(step);
    }

    const els = rootRef.current.querySelectorAll("[data-count]");
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => cio.observe(el));
    return () => cio.disconnect();
  }, []);

  const handlePresLinkClick = useCallback((e) => {
    const target = e.target.closest(".pres-link");
    if (!target) return;
    e.preventDefault();
    const panel = target.dataset.target;
    const tabBtn = rootRef.current.querySelector(
      `.ptab[data-panel="${panel}"]`
    );
    if (tabBtn) tabBtn.click();
    setNavOpen(false);
  }, []);

  return (
    <div ref={rootRef} onClickCapture={handlePresLinkClick}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <Hero />
      <TrustBar />
      <About />
      <ImpactStats />
      <Leadership />
      <Services />
      <VcfoFeature />
      <StartupProgramme />
      <Presence />
      <Industries />
      <Testimonial />
      <CtaStrip />
      <Contact />
      <Footer />
    </div>
  );
}
