import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import CtaBanner from "../components/Common/CtaBanner";
import VirtualCfoHero from "../components/VirtualCfo/VirtualCfoHero";
import VirtualCfoFeatures from "../components/VirtualCfo/VirtualCfoFeatures";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function VirtualCfoPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <VirtualCfoHero />
      <VirtualCfoFeatures />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}