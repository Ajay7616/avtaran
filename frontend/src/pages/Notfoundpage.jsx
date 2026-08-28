import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

const QUICK_LINKS = [
  { to: "/#services", label: "Our Services" },
  { to: "/#about", label: "About Us" },
  { to: "//services/startup", label: "Startup Ecosystem" },
  { to: "/#contact", label: "Contact Us" },
];

export default function NotFoundPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />

      <section className="relative min-h-screen flex items-center overflow-hidden bg-grad-hero pt-[110px] pb-20">
        <div className="absolute w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.14),transparent_62%)] -top-40 -right-32 pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-[length:64px_64px] [mask-image:radial-gradient(circle_at_50%_30%,#000_0%,transparent_70%)] opacity-70"></div>

        <div className="wrap relative z-[2] text-center max-w-[640px] mx-auto">
          <span className="eyebrow justify-center reveal">Page Not Found</span>

          <h1 className="reveal font-serif font-semibold text-[clamp(4rem,14vw,8rem)] leading-none mt-6 grad-text-gold">
            404
          </h1>

          <h2 className="reveal text-teal-900 text-[clamp(1.5rem,3vw,2.2rem)] mt-4">
            This page took a wrong turn.
          </h2>

          <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[480px] mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, may have moved, or the link
            might be broken. Let&apos;s get you back on track.
          </p>

          <div className="reveal flex gap-3.5 mt-9 flex-wrap justify-center">
            <Link to="/" className="btn btn-gold">Back to Home &rarr;</Link>
            <Link to="/#contact" className="btn btn-outline">Contact Us</Link>
          </div>

          <div className="reveal mt-12 pt-8 border-t border-line">
            <p className="text-muted text-[.82rem] uppercase tracking-[.14em] font-semibold mb-4">
              Or try one of these
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {QUICK_LINKS.map((l) => (
                <Link to={l.to} key={l.to} className="ind-tag">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}