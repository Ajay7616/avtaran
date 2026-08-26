import React from "react";
import { SE_VALUES } from "../../data/Startupecosystemdata";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17.6l-6.2 3.6 1.6-6.9L2.1 9.6l7-.7z" />
    </svg>
  );
}

function StartupEcosystemValues() {
  return (
    <section className="py-[90px] bg-cream-2">
      <div className="wrap">
        <div className="max-w-[720px] mb-12 text-center mx-auto">
          <span className="eyebrow justify-center">Empowering Visionaries</span>
          <h2 className="text-teal-900 text-[clamp(1.8rem,3.6vw,2.4rem)] mt-4">
            Enabling Growth. Creating Global Businesses.
          </h2>
        </div>

        <div className="grid grid-cols-4 tab:grid-cols-2 mob:grid-cols-1 gap-5">
          {SE_VALUES.map((v) => (
            <div className="step reveal text-center" key={v.title}>
              <div className="w-13 h-13 rounded-xl bg-grad-gold text-teal-900 grid place-items-center mb-5 mx-auto">
                <StarIcon />
              </div>
              <h4 className="text-teal-900 font-sans text-[1.1rem] font-semibold mb-2">{v.title}</h4>
              <p className="text-muted text-[.92rem]">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal flex items-center justify-center gap-4 mt-12">
          <span className="font-serif text-4xl text-gold-deep font-semibold">100+</span>
          <span className="text-teal-800 font-semibold text-[1.05rem]">Startups Scaled</span>
        </div>
      </div>
    </section>
  );
}

export default StartupEcosystemValues;