import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import ForexHero from "../components/Forex/ForexHero";
import ForexValues from "../components/Forex/ForexValues";
import ForexServices from "../components/Forex/ForexServices";
import ForexCta from "../components/Forex/ForexCta";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ForexPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <ForexHero />
      <ForexValues />
      <ForexServices />
      <ForexCta />
      <Footer />
    </div>
  );
}