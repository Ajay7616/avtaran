import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import ValuesGrid from "../components/Common/ValuesGrid";
import CtaBanner from "../components/Common/CtaBanner";
import CitizenshipHero from "../components/CitizenPage/Citizenshiphero";
import CitizenshipRegions from "../components/CitizenPage/Citizenshipregions";
import { CITIZENSHIP_VALUES } from "../data/Citizenshipdata";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function CitizenshipPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <CitizenshipHero />
      <ValuesGrid values={CITIZENSHIP_VALUES} />
      <CitizenshipRegions />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}