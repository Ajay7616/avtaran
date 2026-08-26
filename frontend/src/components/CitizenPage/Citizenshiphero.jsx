import React from "react";
import { CITIZENSHIP_NOTE } from "../../data/Citizenshipdata";

function CitizenshipHero() {
  return (
    <section className="relative pt-[170px] pb-[70px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>
      <div className="wrap relative max-w-[1200px]">
        <span className="eyebrow reveal">Global Mobility Advisory</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Citizenship <span className="not-italic grad-text-gold">/ PR</span>
        </h1>
        <p className="lead reveal text-muted text-[1.1rem] mt-6 max-w-[1200px]">
          Permanent Residency (PR) allows an individual to live in a country long-term without
          becoming a citizen. In simple terms, a permanent resident is someone who retains
          their original nationality but is legally authorized by a foreign government to live,
          work, and study in that country indefinitely.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          Many individuals pursue PR to access better career opportunities, advanced education,
          global mobility, and an improved quality of life. Holding a permanent residency visa
          offers the stability of living abroad with full legal rights — without the
          requirement to surrender your home-country citizenship.
        </p>
        <p className="reveal text-muted text-[1.05rem] mt-4 max-w-[1200px]">
          Our Citizenship and PR Advisory Services help clients understand eligibility
          criteria, documentation requirements, regulatory processes, and long-term
          implications before making this important transition. We guide you through every
          step to ensure clarity, compliance, and a smooth pathway toward building a secure
          future abroad.
        </p>
        <p className="reveal text-muted text-[.95rem] mt-6 max-w-[1200px] italic border-l-2 border-gold-1 pl-4">
          {CITIZENSHIP_NOTE}
        </p>
        <div className="reveal flex gap-3.5 mt-8 flex-wrap">
          <a href="/#contact" className="btn btn-gold">Talk to an Expert &rarr;</a>
        </div>
      </div>
    </section>
  );
}

export default CitizenshipHero;