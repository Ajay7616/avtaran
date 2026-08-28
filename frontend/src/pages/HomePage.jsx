import React, { useEffect, useRef, useState, useCallback } from "react";
import Nav from "../components/Common/Nav";
import Hero from "../components/Home/Hero";
import TrustBar from "../components/Home/TrustBar";
import About from "../components/Home/About";
import ImpactStats from "../components/Home/ImpactStats";
import Leadership from "../components/Home/Leadership";
import Services from "../components/Home/Services";
import VcfoFeature from "../components/Home/VcfoFeature";
import StartupProgramme from "../components/Home/StartupProgramme";
import Presence from "../components/Home/Presence";
import Industries from "../components/Home/Industries";
import Testimonial from "../components/Home/Testimonial";
import CtaStrip from "../components/Home/CtaStrip";
import Contact from "../components/Home/Contact";
import Footer from "../components/Common/Footer";
import GroupExposure from "../components/Home/Groupexposure";

/* ---------------------------------------------------------
   Avtaran Capital — React + Tailwind conversion
   Each section lives in ./components; shared data in
   ./components/data.js. Layout/spacing use Tailwind
   utilities; complex/reused patterns use @apply component
   classes defined in index.css.
   --------------------------------------------------------- */

export default function Home() {
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
      <GroupExposure />
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
