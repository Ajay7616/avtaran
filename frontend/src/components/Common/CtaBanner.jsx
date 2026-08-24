import React from "react";

/* Shared closing CTA banner used by service detail pages. */
function CtaBanner({ heading, subtext, buttonText = "Book Your Consultation \u2192", href = "/#contact" }) {
  return (
    <section className="pt-0 pb-[110px]">
      <div className="wrap">
        <div className="reveal bg-grad-cta rounded-[26px] p-14 mob:p-6 text-center relative overflow-hidden">
          <h2 className="text-teal-900 text-[2.1rem]">{heading}</h2>
          {subtext && (
            <p className="text-[rgba(14,40,49,.8)] max-w-[540px] mx-auto mt-3.5 mb-7.5 text-[1.05rem]">
              {subtext}
            </p>
          )}
          <a href={href} className="btn btn-dark">{buttonText}</a>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
