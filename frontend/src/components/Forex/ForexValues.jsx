import React from "react";
import { FOREX_VALUES } from "../data/Forexdata";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17.6l-6.2 3.6 1.6-6.9L2.1 9.6l7-.7z" />
    </svg>
  );
}

function ForexValues() {
  return (
    <section className="py-[90px] bg-cream-2">
      <div className="wrap">
        <div className="grid grid-cols-3 tab:grid-cols-1 gap-6">
          {FOREX_VALUES.map((v) => (
            <div className="step reveal text-center" key={v.title}>
              <div className="w-13 h-13 rounded-xl bg-grad-gold text-teal-900 grid place-items-center mb-5 mx-auto">
                <StarIcon />
              </div>
              <h4 className="text-teal-900 font-sans text-[1.1rem] font-semibold mb-2">{v.title}</h4>
              <p className="text-muted text-[.92rem]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ForexValues;
