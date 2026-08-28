import React from "react";

function About() {
  return (
    <section className="py-[110px]" id="about">
      <div className="wrap grid grid-cols-[1.05fr_.95fr] tab:grid-cols-1 gap-16 tab:gap-10 items-center">
        <div className="reveal">
          <span className="eyebrow">About Avtaran Capital</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mt-4 mb-1.5">
            A finance partner built for the ambitious.
          </h2>
          <p className="text-muted mb-4 mt-4.5">
            Avtaran—meaning &ldquo;ascent&rdquo;—reflects our single purpose: to help businesses
            rise. We bring institutional-grade financial expertise to organisations that need a
            sharper edge, whether that&apos;s a bootstrapped startup preparing for its first round
            or an established enterprise entering new markets.
          </p>
          <p className="text-muted mb-4">
            Our team blends CFO-level experience, investment banking discipline and hands-on
            execution. We don&apos;t hand over slide decks and disappear—we sit alongside your
            leadership and own outcomes.
          </p>
          <h3 className="text-[1.4rem] mt-6.5 mb-2.5 text-teal-800">What sets us apart</h3>
          <p className="text-muted mb-4">
            Sector-agnostic thinking, cross-border capability, and a promoter-first mindset. We
            translate complex financial decisions into clear, confident choices you can act on.
          </p>
          <a href="#contact" className="btn btn-outline mt-2">
            Meet the team &rarr;
          </a>
        </div>
        <div className="reveal relative">
          <div className="bg-white border border-line rounded-[22px] p-11 shadow-brand-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-grad-gold"></div>
            <div className="absolute -right-10 -bottom-10 w-[200px] h-[200px] bg-grad-gold opacity-10 rounded-full blur-[10px]"></div>
            <div className="font-serif text-5xl text-gold-deep font-semibold leading-none relative">2009</div>
            <span className="text-muted text-[.9rem] mb-6.5 block relative">Advising founders &amp; enterprises since</span>
            <ul className="list-none mt-3.5 relative">
              <li className="flex gap-3 py-3 border-t border-line text-[.95rem] text-ink before:content-['▲'] before:text-gold-deep before:text-[.7rem] before:mt-1">
                <div>
                  <strong className="text-teal-900">Clarity over complexity</strong>
                  <br />
                  <span className="text-muted text-[.86rem]">Financial decisions made simple and defensible.</span>
                </div>
              </li>
              <li className="flex gap-3 py-3 border-t border-line text-[.95rem] text-ink before:content-['▲'] before:text-gold-deep before:text-[.7rem] before:mt-1">
                <div>
                  <strong className="text-teal-900">Skin in the game</strong>
                  <br />
                  <span className="text-muted text-[.86rem]">We measure success by yours, not by billable hours.</span>
                </div>
              </li>
              <li className="flex gap-3 py-3 border-t border-line text-[.95rem] text-ink before:content-['▲'] before:text-gold-deep before:text-[.7rem] before:mt-1">
                <div>
                  <strong className="text-teal-900">Global lens, local depth</strong>
                  <br />
                  <span className="text-muted text-[.86rem]">Cross-border reach with on-ground execution.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


export default About;
