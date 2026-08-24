import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import ValuesGrid from "../components/Common/ValuesGrid";
import CtaBanner from "../components/Common/CtaBanner";
import BusinessSetupHero from "../components/BusinessSetup/Businesssetuphero";
import BusinessSetupRegions from "../components/BusinessSetup/Businesssetupregions";
import { BS_VALUES } from "../components/data/Businesssetupdata";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function BusinessSetupPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <BusinessSetupHero />
      <ValuesGrid values={BS_VALUES} />
      <BusinessSetupRegions />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}