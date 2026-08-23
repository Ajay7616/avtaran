import React from "react";

function ForexHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1120px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1150px]">
        <span className="eyebrow reveal">
          Foreign Exchange &amp; RBI Compliance
        </span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Foreign Exchange{" "}
          <span className="not-italic grad-text-gold">/ RBI</span>
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1000px]">
          Foreign Direct Investment (FDI) refers to an investment made by a
          company or individual in one country into a business or entity located
          in another country. These cross-border investments play a crucial role
          in global trade and economic growth, but they also come with strict
          regulatory requirements under the Foreign Exchange Management Act
          (FEMA) and guidelines issued by the Reserve Bank of India (RBI).
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1000px]">
          Our Foreign Exchange &amp; RBI Compliance services help businesses
          understand, manage, and execute FDI transactions in full compliance
          with Indian regulations. From structuring investments and preparing
          documentation to obtaining necessary approvals and ensuring ongoing
          regulatory adherence, we guide clients through every step of the
          process.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1000px]">
          With our expertise in FEMA, RBI reporting norms, and international
          investment frameworks, we enable organizations to expand globally with
          confidence, transparency, and regulatory clarity.
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">
            Talk to an Expert &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

export default ForexHero;
