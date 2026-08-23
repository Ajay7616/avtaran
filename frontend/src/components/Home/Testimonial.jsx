import React from "react";

function Testimonial() {
  return (
    <section className="py-[110px] bg-cream-2">
      <div className="wrap reveal max-w-[860px] mx-auto text-center">
        <p className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] text-teal-900 font-medium leading-[1.35] italic before:content-['“'] before:text-gold-1 before:text-[1.4em] before:leading-none before:align-[-.3em] before:mr-1">
          Avtaran didn&apos;t just help us raise—they made us investable. Their Virtual CFO team
          rebuilt our numbers, our story and our confidence going into every investor meeting.
        </p>
        <div className="mt-6.5 font-semibold text-teal-800">
          Founder &amp; CEO
          <span className="block text-muted font-normal text-[.9rem]">Series A SaaS company</span>
        </div>
      </div>
    </section>
  );
}


export default Testimonial;
