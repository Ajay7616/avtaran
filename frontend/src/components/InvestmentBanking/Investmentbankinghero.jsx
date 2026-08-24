import React from "react";

function InvestmentBankingHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Capital Raising &amp; Transaction Advisory</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Investment <span className="not-italic grad-text-gold">Banking</span>
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          Our Investment Banking practice is built on deep transaction experience,
          sector-specific knowledge, and a strong client-first philosophy. We combine strategic
          insight with hands-on execution to help businesses unlock value, raise capital, and
          navigate complex financial decisions with confidence.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          With expertise across a wide range of investment banking solutions—and
          long-standing relationships with global and domestic investors, financial
          institutions, and market intermediaries—we are able to structure innovative,
          high-impact outcomes for our clients.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          By collaborating seamlessly across geographies, industries, and product lines, we
          deliver integrated advisory, financial structuring, and risk management solutions
          that support sustainable growth and long-term business success.
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Talk to an Expert &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default InvestmentBankingHero;