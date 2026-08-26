import React, { useRef, useState } from "react";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import ValuesGrid from "../components/Common/ValuesGrid";
import CtaBanner from "../components/Common/CtaBanner";
import InvestmentBankingHero from "../components/InvestmentBanking/Investmentbankinghero";
import InvestmentBankingServices from "../components/InvestmentBanking/InvestmentBankingservices";
import { IB_VALUES } from "../data/Investmentbankingdata";
import useNavScroll from "../hooks/useNavScroll";
import useScrollReveal from "../hooks/useScrollReveal";

export default function InvestmentBankingPage() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef}>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />
      <InvestmentBankingHero />
      <ValuesGrid values={IB_VALUES} />
      <InvestmentBankingServices />
      <CtaBanner
        heading="Let's build your growth story — together."
        subtext="Step into smarter finance with Avtaran Capital."
      />
      <Footer />
    </div>
  );
}