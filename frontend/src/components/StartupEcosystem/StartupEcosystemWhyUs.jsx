import React from "react";
import { SE_WHY_US, SE_INDUSTRIES } from "../data/Startupecosystemdata";

function StartupEcosystemWhyUs() {
  return (
    <section className="py-[100px] bg-cream-2">
      <div className="wrap grid grid-cols-2 tab:grid-cols-1 gap-14 tab:gap-10">
        <div className="reveal">
          <span className="eyebrow">Why Choose Us?</span>
          <h2 className="text-teal-900 text-[clamp(1.8rem,3.6vw,2.4rem)] mt-4 mb-6">
            One-stop advisory for ambitious founders
          </h2>
          <ul className="list-none">
            {SE_WHY_US.map((it) => (
              <li key={it} className="flex items-start gap-3 py-2.5 border-t border-line first:border-t-0">
                <span className="text-gold-deep font-bold mt-0.5">&#10003;</span>
                <span className="text-ink text-[.98rem]">{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <span className="eyebrow">Industries We Serve</span>
          <h2 className="text-teal-900 text-[clamp(1.8rem,3.6vw,2.4rem)] mt-4 mb-6">
            Depth across sectors
          </h2>
          <div className="flex flex-wrap gap-3">
            {SE_INDUSTRIES.map((ind) => (
              <span className="ind-tag" key={ind}>{ind}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartupEcosystemWhyUs;