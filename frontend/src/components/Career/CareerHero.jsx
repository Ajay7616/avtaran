import React from "react";

function CareerHero() {
  return (
    <section className="relative pt-[170px] pb-[80px] overflow-hidden bg-grad-hero border-b border-line">
      <div className="absolute w-[1500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.13),transparent_62%)] -top-40 -right-24 pointer-events-none"></div>

      <div className="wrap relative">
        <span className="eyebrow reveal">Join Our Team</span>

        <h1 className="reveal text-teal-900 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Build Your <span className="grad-text-gold">Career</span> With Us
        </h1>

        <p className="reveal text-muted text-[1.1rem] mt-6 max-w-[760px]">
          We are always looking for talented individuals who are passionate
          about creating impact, solving meaningful problems, and growing with
          a forward-thinking financial advisory firm.
        </p>
      </div>
    </section>
  );
}

export default CareerHero;