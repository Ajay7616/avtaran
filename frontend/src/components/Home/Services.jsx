import React from "react";
import { SERVICES } from "../data/data";

function Services() {
  return (
    <section className="py-[110px] bg-cream-2" id="services">
      <div className="wrap">
        <div className="max-w-[720px] mb-14 text-center mx-auto">
          <span className="eyebrow justify-center">What We Do</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mt-4">Comprehensive financial &amp; advisory services</h2>
          <p className="text-muted text-[1.1rem] mt-4">
            From cross-border transactions and capital raising to global mobility and family
            wealth, we bring institutional-grade expertise to every stage of your journey.
          </p>
        </div>
        <div className="grid grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 gap-6">
          {SERVICES.map((s) => (
            <div className="svc-card reveal" id={s.id} key={s.id}>
              <div className="w-13 h-13 rounded-xl bg-cream-2 grid place-items-center mb-5 text-teal-700 [&>svg]:w-6.5 [&>svg]:h-6.5">{s.icon}</div>
              <h3 className="text-[1.24rem] mb-2.5">{s.title}</h3>
              <p className="text-muted text-[.95rem] mb-4">{s.desc}</p>
              <ul className="list-none text-[.86rem] text-teal-700">
                {s.items.map((it) => (
                  <li key={it} className="py-1.5 pl-4.5 relative before:content-['›'] before:absolute before:left-0 before:text-gold-deep before:font-bold">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Services;
