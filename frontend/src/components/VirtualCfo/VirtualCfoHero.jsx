import React from "react";

function VirtualCfoHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Fractional Finance Leadership</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          What Are <span className="not-italic grad-text-gold">Virtual CFO</span> Services?
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          Virtual CFOs (Chief Financial Officers) are the strategic advisors and financial
          performance overseers of a business who work remotely. Virtual CFOs or fractional
          CFOs are finance pros with multi-industry experience who provide financial advice
          and implementation support to an organization.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          Virtual CFO services are very important to the entrepreneurial world, particularly
          small to medium-sized enterprises and start-up businesses, because these providers
          offer expert skills at a much cheaper rate without the need to get a full-time CFO.
          These services are the most useful for businesses that need financial advice and
          management on a flexible and low-cost basis. Avtaran Capital is a trustworthy
          partner that meets all requirements for providing premium Virtual CFO services in
          India.
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Get In Touch &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default VirtualCfoHero;