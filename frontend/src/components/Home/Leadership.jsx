import React from "react";
import { TEAM } from "../../data/data";

function Leadership() {
  return (
    <section className="py-[110px] bg-gradient-to-b from-cream to-[#EAF1F4]" id="team">
      <div className="wrap">
        <div className="max-w-[720px] mb-14 text-center mx-auto">
          <span className="eyebrow justify-center">Leadership</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mt-4">The minds steering Avtaran Capital</h2>
          <p className="text-muted text-[1.1rem] mt-4">
            A leadership team blending entrepreneurial drive, financial expertise and global
            reach.
          </p>
        </div>
        <div className="grid grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 gap-5.5">
          {TEAM.map((m, i) => (
            <div className={"tcard reveal" + (m.featured ? " featured" : "")} key={i}>
              <span className={"absolute -top-3.5 right-1.5 font-serif text-[6rem] font-bold leading-none pointer-events-none " + (m.featured ? "text-white opacity-10" : "text-teal-800 opacity-[.06]")}>{m.initial}</span>
              <div className="w-11 h-1 rounded bg-grad-gold mb-5"></div>
              <h4 className={"font-sans font-bold text-[1.35rem] relative z-[2] " + (m.featured ? "text-white" : "text-teal-900")}>{m.name}</h4>
              <div className={"font-semibold text-[.92rem] mt-1.5 relative z-[2] " + (m.featured ? "text-gold-2" : "text-teal-700")}>{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Leadership;
