import React from "react";
import { IB_SERVICES } from "../data/Investmentbankingdata";

function InvestmentBankingServices() {
  return (
    <section className="py-[100px]" id="ib-services">
      <div className="wrap">
        <div className="max-w-[1200px] mb-14">
          <span className="eyebrow">What We Handle</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
            Capital solutions across the deal lifecycle
          </h2>
          <p className="text-muted text-[1.05rem] mt-4">
            From day-to-day funding to complex transactions, here&apos;s where our Investment
            Banking team plugs in.
          </p>
        </div>

        <div className="grid grid-cols-4 tab:grid-cols-2 mob:grid-cols-1 gap-5">
          {IB_SERVICES.map((s) => (
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

export default InvestmentBankingServices;