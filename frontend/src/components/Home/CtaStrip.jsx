import React from "react";

function CtaStrip() {
  return (
    <section className="pt-[110px] pb-0">
      <div className="wrap">
        <div className="reveal bg-grad-cta rounded-[26px] p-14 mob:p-6 text-center relative overflow-hidden">
          <h2 className="text-teal-900 text-[2.3rem]">Ready to ascend?</h2>
          <p className="text-[rgba(14,40,49,.8)] max-w-[540px] mx-auto mt-3.5 mb-7.5 text-[1.08rem]">
            Book a no-obligation consultation and get a clear read on your finance, funding and
            growth priorities.
          </p>
          <a href="#contact" className="btn btn-dark">Book Your Consultation &rarr;</a>
        </div>
      </div>
    </section>
  );
}


export default CtaStrip;
