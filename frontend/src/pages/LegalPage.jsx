import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Common/Nav";
import Footer from "../components/Common/Footer";
import Seo from "../components/Common/Seo";
import useNavScroll from "../hooks/useNavScroll";
import { LEGAL_DOCS } from "../data/legalContent";
import { LEGAL } from "../data/legalConfig";

// Usage: <LegalPage doc="privacy" />  (keys: privacy, terms, refund, cookies)
export default function LegalPage({ doc }) {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useNavScroll();
  const content = LEGAL_DOCS[doc];

  if (!content) return null;

  const OTHER_DOCS = [
    { to: "/privacy-policy", label: "Privacy Policy", key: "privacy" },
    { to: "/terms-of-use", label: "Terms of Use", key: "terms" },
    { to: "/refund-policy", label: "Refund Policy", key: "refund" },
    { to: "/cookie-policy", label: "Cookie Policy", key: "cookies" },
  ].filter((d) => d.key !== doc);

  return (
    <div>
      <Seo page={content.seoKey} />
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} scrolled={scrolled} />

      <section className="bg-grad-hero pt-[130px] pb-12 border-b border-line">
        <div className="wrap max-w-[860px]">
          <span className="eyebrow">Legal</span>
          <h1 className="font-serif text-teal-900 font-semibold text-[clamp(2rem,4.5vw,3rem)] mt-3 leading-tight">
            {content.title}
          </h1>
          <p className="text-muted text-[.9rem] mt-3">
            Last updated: {LEGAL.effectiveDate}
          </p>
          <p className="text-muted text-[1.02rem] mt-5 leading-relaxed">
            {content.intro}
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="wrap max-w-[860px]">
          <nav
            aria-label="On this page"
            className="bg-cream-2 border border-line rounded-2xl p-5 mb-12"
          >
            <p className="text-[.78rem] uppercase tracking-wide text-muted font-semibold mb-3">
              On this page
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[.92rem]">
              {content.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-teal-900 hover:text-gold-deep">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {content.sections.map((s) => (
            <article key={s.id} id={s.id} className="mb-10 scroll-mt-[110px]">
              <h2 className="font-serif text-teal-900 text-[1.4rem] font-semibold mb-3">
                {s.heading}
              </h2>

              {s.paras?.map((p, i) => (
                <p key={i} className="text-muted leading-relaxed mb-3 whitespace-pre-line">
                  {p}
                </p>
              ))}

              {s.items && (
                <ul className="list-disc pl-6 text-muted leading-relaxed space-y-2 mb-3">
                  {s.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              )}

              {s.paras2?.map((p, i) => (
                <p key={`b${i}`} className="text-muted leading-relaxed mb-3">
                  {p}
                </p>
              ))}

              {s.table && (
                <div className="overflow-x-auto border border-line rounded-xl mt-3">
                  <table className="w-full text-left text-[.88rem]">
                    <thead className="bg-cream-2 text-teal-900">
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h} className="px-4 py-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, i) => (
                        <tr key={i} className="border-t border-line align-top">
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-muted">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}

          <div className="border-t border-line pt-6 mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[.9rem]">
            {OTHER_DOCS.map((d) => (
              <Link key={d.to} to={d.to} className="text-gold-deep font-semibold hover:underline">
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
