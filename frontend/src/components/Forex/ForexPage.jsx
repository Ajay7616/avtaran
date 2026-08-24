import React, { useRef, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ForexHero from "./ForexHero";
import ForexValues from "./ForexValues";
import ForexServices from "./ForexServices";
import ForexCta from "./ForexCta";
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
