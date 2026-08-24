import React from "react";

function VcfoFeature() {
  const feats = [
    { n: "01", title: "Financial Command Centre", desc: "Real-time dashboards, MIS and cash-flow visibility you can trust." },
    { n: "02", title: "Fundraising Readiness", desc: "Investor-grade models, decks and data rooms built to close." },
    { n: "03", title: "Profit & Cash Discipline", desc: "Margin analysis, cost control and working-capital optimisation." },
    { n: "04", title: "Board & Investor Reporting", desc: "Clear narratives that keep stakeholders aligned and confident." },
  ];
  return (
    <section className="py-[110px]" id="vcfo">
      <div className="wrap">
        <div className="reveal bg-white border border-line text-ink rounded-[26px] overflow-hidden relative shadow-brand-md before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-grad-gold before:z-[2]">
          <div className="grid grid-cols-2 tab:grid-cols-1">
            <div className="p-16 tab:p-10 mob:p-7">
              <span className="eyebrow">Flagship Offering</span>
              <h2 className="text-teal-900 text-4xl mt-4 mb-4.5">Virtual CFO, on your terms</h2>
              <p className="text-muted mb-3.5">
                Get the strategic firepower of a seasoned CFO without the full-time cost. We
                embed with your team to bring rigour to numbers, discipline to spending, and
                confidence to every board conversation.
              </p>
              <p className="text-muted mb-3.5">
                Ideal for startups scaling past their first crore, SMEs professionalising their
                finance function, and enterprises needing specialist bandwidth.
              </p>
              <a href="#contact" className="btn btn-gold mt-3.5">
                Get a Virtual CFO &rarr;
              </a>
            </div>
            <div className="bg-cream-2 p-14 tab:p-10 mob:p-7 tab:border-t tab:border-line flex flex-col justify-center">
              {feats.map((f) => (
                <div className="flex gap-4 py-4.5 border-b border-line last:border-b-0" key={f.n}>
                  <span className="font-serif text-gold-deep text-[1.1rem] min-w-[34px]">{f.n}</span>
                  <div>
                    <h4 className="text-teal-900 font-sans text-base font-semibold mb-1">{f.title}</h4>
                    <p className="text-muted text-[.88rem]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default VcfoFeature;
