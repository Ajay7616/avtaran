import React from "react";

function ImpactStats() {
  return (
    <section className="pt-0 pb-[110px]" id="why">
      <div className="wrap">
        <div className="grid grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 gap-6">
          <div className="impact-card reveal bg-grad-ic-teal ">
            <div className="font-serif font-semibold text-[clamp(2.8rem,5vw,4rem)] text-white leading-none relative z-[2]">
              <span data-count="20000" data-plain="1">0</span>+
            </div>
            <div className="font-sans font-semibold text-[1.3rem] text-white mt-3 relative z-[2]">Satisfied Clients</div>
            <div className="mt-auto pt-6.5 text-[.85rem] font-medium text-white/80 relative z-[2]">Trusted globally by our clients</div>
          </div>
          <div className="impact-card reveal bg-grad-ic-slate">
            <div className="font-serif font-semibold text-[clamp(2.8rem,5vw,4rem)] text-white leading-none relative z-[2]">
              <span data-count="43" data-plain="1">0</span>+
            </div>
            <div className="font-sans font-semibold text-[1.3rem] text-white mt-3 relative z-[2]">Countries</div>
            <div className="mt-auto pt-6.5 text-[.85rem] font-medium text-white/80 relative z-[2]">Global presence across continents</div>
          </div>
          <div className="impact-card reveal bg-grad-ic-gold">
            <div className="font-serif font-semibold text-[clamp(2.8rem,5vw,4rem)] text-white leading-none relative z-[2]">
              $<span data-count="1500" data-plain="1">0</span>m+
            </div>
            <div className="font-sans font-semibold text-[1.3rem] text-white mt-3 relative z-[2]">Transactions Managed</div>
            <div className="mt-auto pt-6.5 text-[.85rem] font-medium text-white/80 relative z-[2]">Value successfully handled</div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default ImpactStats;
