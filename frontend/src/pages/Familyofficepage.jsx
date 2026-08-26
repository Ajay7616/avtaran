import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import ValuesGrid from "../components/Common/ValuesGrid";
import CtaBanner from "../components/Common/CtaBanner";
import FamilyOfficeHero from "../components/FamilyOffice/Familyofficehero";
import FamilyOfficeServices from "../components/FamilyOffice/FamilyOfficeServices";
import { FO_VALUES } from "../data/Familyofficedata";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function FamilyOfficePage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <FamilyOfficeHero />
      <ValuesGrid values={FO_VALUES} />
      <FamilyOfficeServices />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}