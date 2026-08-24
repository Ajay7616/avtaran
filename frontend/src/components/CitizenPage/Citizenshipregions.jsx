import React from "react";
import { CITIZENSHIP_REGIONS } from "../data/Citizenshipdata";

function CitizenshipRegions() {
  return (
    <section className="py-[100px]" id="citizenship-regions">
      <div className="wrap">
        <div className="max-w-[1200px] mb-14">
          <span className="eyebrow">Where We Help</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            End-to-end PR services, region by region
          </h2>
        </div>

        <div className="grid grid-cols-2 tab:grid-cols-1 gap-6">
          {CITIZENSHIP_REGIONS.map((r) => (
            <div className="svc-card reveal" key={r.num}>
              <span className="font-serif text-gold-deep text-[1.05rem] font-semibold">
                {r.num}
              </span>
              <h3 className="text-[1.18rem] mt-2 mb-4">{r.title}</h3>
              <div className="grid grid-cols-2 mob:grid-cols-1 gap-3">
                {r.countries.map((c) => (
                  <div className="intl" key={c.name}>
                    <img
                    src={`https://flagcdn.com/w80/${c.code}.png`}
                    alt={`${c.name} flag`}
                    className="w-10 h-auto object-contain"
                    />
                    <h4 className="font-sans font-semibold text-[.95rem] text-teal-900">
                      {c.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CitizenshipRegions;
