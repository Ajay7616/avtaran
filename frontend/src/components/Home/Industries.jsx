import React from "react";

function Industries() {
  const industries = [
    "SaaS & Technology", "Fintech", "Manufacturing", "D2C & Retail",
    "Healthcare & Life Sciences", "Real Estate & Infra", "Logistics & Mobility",
    "EdTech", "Renewable Energy", "Professional Services", "Agri & FMCG",
    "Media & Entertainment",
  ];
  return (
    <section className="pt-0 pb-[110px]" id="industries">
      <div className="wrap">
        <div className="max-w-[720px] mb-14 text-center mx-auto">
          <span className="eyebrow justify-center">Sectors We Serve</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mt-4">Depth across industries</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {industries.map((ind) => (
            <span className="ind-tag" key={ind}>{ind}</span>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Industries;
