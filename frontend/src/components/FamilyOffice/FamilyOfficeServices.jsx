import React from "react";
import { FO_SERVICES } from "../data/Familyofficedata";

function FamilyOfficeServices() {
  return (
    <section className="py-[100px]" id="fo-services">
      <div className="wrap">
        <div className="max-w-[1200px] mb-14">
          <span className="eyebrow">What We Handle</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            Stewardship across generations
          </h2>
          <p className="text-muted text-[1.05rem] mt-4">
            From structuring the family business to day-to-day back office support, here&apos;s
            where our Family Office team plugs in.
          </p>
        </div>

        <div className="grid grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 gap-5">
          {FO_SERVICES.map((s) => (
            <div className="step reveal" key={s.num}>
              <div className="font-serif text-2xl text-gold-deep font-semibold">{s.num}</div>
              <h4 className="text-teal-900 font-sans text-[1.05rem] font-semibold mt-3.5">{s.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FamilyOfficeServices;