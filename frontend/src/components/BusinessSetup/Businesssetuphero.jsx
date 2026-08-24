import React from "react";

function BusinessSetupHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Incorporation &amp; Strategic Consulting</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Business <span className="not-italic grad-text-gold">Set-Up Services</span>
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          Strategic planning is essential for achieving business goals and using resources
          effectively. But the process can be challenging — it involves analyzing the
          company&apos;s current situation, identifying problems, and exploring the best
          possible solutions. This is where business consulting becomes valuable. Consultants
          help organizations understand their strengths and weaknesses, uncover hidden
          opportunities, and prepare for potential risks.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          At AVTARAN CAPITAL, we provide a comprehensive range of consulting services designed
          to help our clients make informed decisions, improve performance, and confidently
          move toward their goals.
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Talk to an Expert &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default BusinessSetupHero;