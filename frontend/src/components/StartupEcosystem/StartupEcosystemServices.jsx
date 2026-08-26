import React from "react";
import { SE_SERVICE_CATEGORIES } from "../../data/Startupecosystemdata";

function StartupEcosystemServices() {
  return (
    <section className="py-[100px]" id="startup-ecosystem-services">
      <div className="wrap">
        <div className="max-w-[720px] mb-14">
          <span className="eyebrow">Our Services</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            End-to-End Professional Services
          </h2>
          <p className="text-muted text-[1.05rem] mt-4">
            Whether you are at the idea stage, launching your first product, raising capital, or
            expanding globally, we provide comprehensive professional services designed
            specifically for startups and high-growth businesses.
          </p>
        </div>

        <div className="grid grid-cols-2 tab:grid-cols-1 gap-6">
          {SE_SERVICE_CATEGORIES.map((c) => (
            <div className="svc-card reveal" key={c.num}>
              <span className="font-serif text-gold-deep text-[1.05rem] font-semibold">{c.num}</span>
              <h3 className="text-[1.15rem] mt-2 mb-3">{c.title}</h3>
              <ul className="list-none text-[.88rem] text-teal-700">
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="py-1.5 pl-4.5 relative before:content-['›'] before:absolute before:left-0 before:text-gold-deep before:font-bold"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StartupEcosystemServices;