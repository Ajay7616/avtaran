import React from "react";
import { CA_SERVICES } from "../data/corporateAdvisoryData";

function CorporateAdvisoryServices() {
  return (
    <section className="py-[100px]" id="ca-services">
      <div className="wrap">
        <div className="max-w-[1200px] mb-14">
          <span className="eyebrow">What We Handle</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            Advisory that keeps you compliant and competitive
          </h2>
          <p className="text-muted text-[1.05rem] mt-4">
            From contracts and due diligence to complex valuation work, here&apos;s how we
            support organizations through governance, transactions and growth.
          </p>
        </div>

        <div className="grid grid-cols-2 tab:grid-cols-1 gap-6">
          {CA_SERVICES.map((s) => (
            <div
              className={"svc-card reveal" + (s.subitems ? " col-span-2 tab:col-span-1" : "")}
              key={s.num}
            >
              <span className="font-serif text-gold-deep text-[1.05rem] font-semibold">{s.num}</span>
              <h3 className="text-[1.18rem] mt-2 mb-2.5">{s.title}</h3>
              {s.paragraphs.map((p, i) => (
                <p className="text-muted text-[.92rem] mb-3 last:mb-0" key={i}>{p}</p>
              ))}

              {s.subitems && (
                <div className="grid grid-cols-2 mob:grid-cols-1 gap-5 mt-6 pt-6 border-t border-line">
                  {s.subitems.map((sub) => (
                    <div className="bg-cream-2 rounded-2xl p-5.5" key={sub.num}>
                      <span className="font-serif text-gold-deep text-[.95rem] font-semibold italic">{sub.num}</span>
                      <h4 className="text-teal-900 font-sans text-[1.02rem] font-semibold mt-1.5 mb-2">{sub.title}</h4>
                      <p className="text-muted text-[.88rem]">{sub.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CorporateAdvisoryServices;
