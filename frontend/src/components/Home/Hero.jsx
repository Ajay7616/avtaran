import React from "react";

function Hero() {
  return (
    <section
      className="relative pt-[180px] pb-[120px] overflow-hidden bg-grad-hero border-b border-line"
      id="home"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[120%] min-w-[1100px]">
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C99A2E" stopOpacity=".28" />
              <stop offset="1" stopColor="#EAC96A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,300 L600,60 L1200,300 Z" fill="url(#rg)" />
          <path d="M0,300 L600,120 L1200,300 Z" fill="url(#rg)" opacity=".6" />
        </svg>
      </div>
      <div className="absolute w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.14),transparent_62%)] -top-40 -right-32 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern bg-[length:64px_64px] [mask-image:radial-gradient(circle_at_50%_30%,#000_0%,transparent_70%)] opacity-70"></div>

      <div className="wrap relative z-[3] max-w-[1200px]">
        <span className="eyebrow reveal">Strategic Finance &middot; Virtual CFO &middot; Capital Advisory</span>
        <h1 className="reveal text-teal-900 text-[clamp(2.5rem,5.6vw,4.4rem)] font-semibold mt-5 tracking-[-.02em]">
          Finance leadership that helps you <em className="not-italic grad-text-gold">ascend</em>—from first cheque to global scale.
        </h1>
        <p className="lead reveal text-muted text-[1.18rem] mt-6 max-w-[600px]">
          Avtaran Capital partners with founders, promoters and enterprises to build financial
          clarity, raise the right capital, and navigate growth across India and international
          markets.
        </p>
        <div className="reveal flex gap-3.5 mt-9 flex-wrap">
          <a href="#contact" className="btn btn-gold">Start a Conversation &rarr;</a>
          <a href="#services" className="btn btn-outline">Explore Services</a>
        </div>
        <div className="flex gap-11 mt-16 flex-wrap relative z-[3]">
          <div className="stat reveal">
            <b data-count="20000" data-suffix="+" className="font-serif text-4xl text-teal-800 font-semibold block leading-none">0</b>
            <span className="text-muted text-[.86rem] font-medium tracking-wide">Satisfied clients</span>
          </div>
          <div className="stat reveal">
            <b data-count="43" data-suffix="+" className="font-serif text-4xl text-teal-800 font-semibold block leading-none">0</b>
            <span className="text-muted text-[.86rem] font-medium tracking-wide">Countries</span>
          </div>
          <div className="stat reveal">
            <b data-prefix="$" data-count="500" data-suffix="m+" className="font-serif text-4xl text-teal-800 font-semibold block leading-none">0</b>
            <span className="text-muted text-[.86rem] font-medium tracking-wide">Transactions managed</span>
          </div>
          <div className="stat reveal">
            <b data-count="98" data-suffix="%" className="font-serif text-4xl text-teal-800 font-semibold block leading-none">0</b>
            <span className="text-muted text-[.86rem] font-medium tracking-wide">Client retention</span>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Hero;
