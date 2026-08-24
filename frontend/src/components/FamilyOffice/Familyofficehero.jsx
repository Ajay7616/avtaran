import React from "react";

function FamilyOfficeHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Wealth &amp; Legacy Advisory</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Family Office <span className="not-italic grad-text-gold">Management</span>
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          Our team brings together a multidisciplinary practice with a modern, collaborative
          approach—equipped with the expertise, technology, and industry insights needed to
          deliver holistic consulting solutions in today&apos;s fast-evolving business
          landscape.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          Through our Family Office Services, we support clients with end-to-end advisory,
          including strategic financial planning, succession and estate planning, regulatory
          and tax compliance, and long-term business legacy management. Our goal is to help
          families and enterprises make informed decisions, safeguard their wealth, and build a
          future-ready foundation for the next generation.
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Talk to an Expert &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default FamilyOfficeHero;