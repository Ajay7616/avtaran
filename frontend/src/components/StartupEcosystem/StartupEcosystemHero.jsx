import React from "react";

function StartupEcosystemHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Startup Ecosystem</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          From Idea to <span className="not-italic grad-text-gold">Impact</span>. From
          Startup to Scale-Up.
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          Whether you&apos;re validating an idea, building your MVP, raising capital, expanding
          internationally, or preparing for an exit, we act as your trusted growth partner. Our
          team of experts delivers strategic, financial, legal, and regulatory solutions that
          empower founders to build sustainable, investor-ready, and globally competitive
          businesses.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          Every great company starts with an idea, but scaling it requires the right guidance.
          We partner with visionary founders and high-growth startups, providing end-to-end
          support across incorporation, compliance, fundraising, finance, legal, taxation, and
          global expansion—so you can focus on innovation while we take care of the
          complexities.
        </p>

        <div className="reveal flex gap-3 flex-wrap mt-7">
          {["Launch", "Fund", "Scale", "Expand"].map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 bg-white border border-line rounded-full px-4 py-2 text-[.85rem] font-semibold text-teal-800"
            >
              <span className="text-gold-deep">&#10003;</span> {s}
            </span>
          ))}
        </div>

        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Schedule a Consultation &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default StartupEcosystemHero;