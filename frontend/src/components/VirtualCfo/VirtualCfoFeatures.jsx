import React from "react";
import { VCFO_FEATURES } from "../../data/VirtualCfoData";

function VirtualCfoFeatures() {
  return (
    <section className="py-[100px]" id="vcfo-features">
      <div className="wrap">
        <div className="max-w-[720px] mb-14">
          <span className="eyebrow">What Virtual CFOs Deliver</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            What Are Virtual CFO Services?
          </h2>
          <p className="text-muted text-[1.05rem] mt-4">
            A closer look at the areas our Virtual CFOs take ownership of, day to day.
          </p>
        </div>

        <div className="grid grid-cols-2 tab:grid-cols-1 gap-6">
          {VCFO_FEATURES.map((f) => (
            <div className="svc-card reveal" key={f.num}>
              <span className="font-serif text-gold-deep text-[1.05rem] font-semibold">{f.num}</span>
              <h3 className="text-[1.18rem] mt-2 mb-2.5">{f.title}</h3>
              <p className="text-muted text-[.92rem]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VirtualCfoFeatures;