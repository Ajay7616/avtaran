import React from "react";

function StartupProgramme() {
  const steps = [
    { num: "01", title: "Validate", desc: "Business model review, unit economics and market sizing to prove the thesis." },
    { num: "02", title: "Structure", desc: "Entity setup, cap table design, financial systems and compliance foundation." },
    { num: "03", title: "Fund", desc: "Investor-ready model, pitch, data room and warm introductions to capital." },
    { num: "04", title: "Scale", desc: "Ongoing Virtual CFO support to hit milestones and prepare the next round." },
  ];
  return (
    <section className="py-[110px] bg-cream-2" id="startup">
      <div className="wrap">
        <div className="max-w-[720px] mb-14">
          <span className="eyebrow">For Founders</span>
          <h2 className="text-teal-900 text-[clamp(2rem,4vw,3rem)] mt-4">From idea to investable</h2>
          <p className="text-muted text-[1.1rem] mt-4">
            A structured startup programme that takes you from a promising concept to a
            fundable, scalable business—with finance leadership at every step.
          </p>
        </div>
        <div className="grid grid-cols-4 tab:grid-cols-2 mob:grid-cols-1 gap-5">
          {steps.map((s) => (
            <div className="step reveal" key={s.num}>
              <div className="font-serif text-2xl text-gold-deep font-semibold">{s.num}</div>
              <h4 className="text-teal-900 font-sans text-[1.05rem] font-semibold mt-3.5 mb-2">{s.title}</h4>
              <p className="text-muted text-[.88rem]">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-11 flex gap-3.5 flex-wrap">
          <a href="#contact" className="btn btn-gold">Apply to the Startup Programme &rarr;</a>
          <a href="#services" className="btn btn-outline">See how we help</a>
        </div>
      </div>
    </section>
  );
}


export default StartupProgramme;
