import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import CtaBanner from "../components/Common/CtaBanner";
import StartupEcosystemHero from "../components/StartupEcosystem/StartupEcosystemHero";
import StartupEcosystemValues from "../components/StartupEcosystem/StartupEcosystemValues";
import StartupEcosystemServices from "../components/StartupEcosystem/StartupEcosystemServices";
import StartupEcosystemWhyUs from "../components/StartupEcosystem/StartupEcosystemWhyUs";
import StartupEcosystemIpoCta from "../components/StartupEcosystem/StartupEcosystemIpoCta";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function StartupEcosystemPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <StartupEcosystemHero />
      <StartupEcosystemValues />
      <StartupEcosystemServices />
      <StartupEcosystemWhyUs />
      <StartupEcosystemIpoCta />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}