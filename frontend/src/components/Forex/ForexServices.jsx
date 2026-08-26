import React from "react";
import { FOREX_SERVICES } from "../../data/Forexdata";

function ForexServices() {
  return (
    <section className="py-[100px]" id="forex-services">
      <div className="wrap">
        <div className="max-w-[1200px] mb-14">
          <span className="eyebrow">What We Handle</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            Every stage of your cross-border journey
          </h2>
          <p className="text-muted text-[1.05rem] mt-4">
            From market entry structures to ongoing compliance, here&apos;s how we support
            businesses and individuals navigating FEMA and RBI requirements.
          </p>
        </div>

        <div className="grid grid-cols-2 tab:grid-cols-1 gap-6">
          {FOREX_SERVICES.map((s) => (
            <div className="svc-card reveal" key={s.num}>
              <span className="font-serif text-gold-deep text-[1.05rem] font-semibold">{s.num}</span>
              <h3 className="text-[1.18rem] mt-2 mb-2.5">{s.title}</h3>
              {s.paragraphs.map((p, i) => (
                <p className="text-muted text-[.92rem] mb-3 last:mb-0" key={i}>{p}</p>
              ))}
              {s.list && (
                <div className="mt-4 pt-4 border-t border-line">
                  <h5 className="font-sans text-[.82rem] font-semibold text-teal-800 mb-2">{s.list.heading}</h5>
                  <ul className="list-none text-[.86rem] text-teal-700">
                    {s.list.items.map((it, i) => (
                      <li key={i} className="py-1 pl-4.5 relative before:content-['›'] before:absolute before:left-0 before:text-gold-deep before:font-bold">{it}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ForexServices;
