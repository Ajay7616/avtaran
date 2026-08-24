import React from "react";

function CorporateAdvisoryHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Governance &amp; Strategic Advisory</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Corporate <span className="not-italic grad-text-gold">Advisory</span>
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          By offering strategic guidance across governance, compliance, restructuring, and
          financial planning, Corporate Advisory services empower organizations to make
          informed decisions that support sustainable growth. These services play a crucial
          role in helping businesses navigate today&apos;s complex financial, regulatory, and
          legal landscape.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          We provide end-to-end support for companies at every stage — whether you are
          expanding, restructuring, entering new markets, or strengthening internal controls.
          We help leaders identify risks, uncover opportunities, and align business strategy
          with long-term objectives. With a future-ready approach and deep industry expertise,
          we ensure that your organization remains compliant, competitive, and positioned for
          long-term success.
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Talk to an Expert &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default CorporateAdvisoryHero;
