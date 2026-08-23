import React from "react";

function TrustBar() {
  const items = ["SaaS", "Manufacturing", "Fintech", "D2C", "Healthcare", "Real Estate"];
  return (
    <div className="bg-white py-5.5 border-b border-line">
      <div className="wrap flex items-center justify-center gap-3.5 flex-wrap text-muted text-[.82rem] tracking-wide">
        <span>Trusted by founders &amp; CFOs across</span>
        <span className="w-[5px] h-[5px] rounded-full bg-gold-1"></span>
        {items.map((item, i) => (
          <React.Fragment key={item}>
            <span>{item}</span>
            {i < items.length - 1 && <span className="w-[5px] h-[5px] rounded-full bg-gold-1"></span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}


export default TrustBar;
