import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import ValuesGrid from "../components/Common/ValuesGrid";
import CtaBanner from "../components/Common/CtaBanner";
import CorporateAdvisoryHero from "../components/Corporate/CorporateAdvisoryHero";
import CorporateAdvisoryServices from "../components/Corporate/CorporateAdvisoryServices";
import { CA_VALUES } from "../components/data/corporateAdvisoryData";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function CorporateAdvisoryPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <CorporateAdvisoryHero />
      <ValuesGrid values={CA_VALUES} />
      <CorporateAdvisoryServices />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}
