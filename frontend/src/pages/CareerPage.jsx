import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";
import CareerHero from "../components/Career/CareerHero"
import CareerApplication from "../components/Career/CareerApplication"


export default function CareerPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        scrolled={scrolled}
      />
      <CareerHero />
      <CareerApplication />
      <Footer />
    </div>
  );
}
