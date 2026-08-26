import React, { useState } from "react";
import LocationPin from "./LocationPin";
import { INDIA_CITIES, INTL_LOCATIONS } from "../../data/data";

function Presence() {
  const [panel, setPanel] = useState("india");

  return (
    <section className="py-[110px]" id="presence">
      <div className="wrap">
        <div className="max-w-[720px] mb-14 text-center mx-auto">
          <span className="eyebrow justify-center">Where We Work</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] mt-4">
            Global reach, grounded in India
          </h2>
          <p className="text-muted text-[1.1rem] mt-4">
            A connected footprint that lets us serve you locally while opening
            doors internationally.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex gap-2.5 mb-9 flex-wrap">
            <button
              className={"ptab" + (panel === "india" ? " active" : "")}
              data-panel="india"
              onClick={() => setPanel("india")}
            >
              India Presence
            </button>
            <button
              className={"ptab" + (panel === "global" ? " active" : "")}
              data-panel="global"
              onClick={() => setPanel("global")}
            >
              Global Presence
            </button>
          </div>
        </div>

        {/* INDIA */}
        <div
          className={"presence-panel" + (panel === "india" ? " active" : "")}
          id="india"
        >
          <div className="flex items-baseline gap-4 mb-6.5 flex-wrap">
            <h3 className="text-[1.5rem]">India Presence</h3>
            <span className="font-sans text-[.8rem] font-semibold tracking-wide uppercase text-gold-deep bg-[rgba(201,154,46,.1)] px-3 py-1.5 rounded-full">
              19 cities
            </span>
            <p className="text-muted text-[.95rem] basis-full -mt-1.5">
              A pan-India delivery network putting our advisory, Virtual CFO and
              compliance teams within reach of every major business hub.
            </p>
          </div>
          <div className="grid grid-cols-4 tab:grid-cols-3 mob:grid-cols-2 gap-3">
            {INDIA_CITIES.map((entry) => {
              const [name, hq] = entry.split("|");
              return (
                <div className="city reveal" key={name}>
                  <LocationPin />
                  {name}{" "}
                  {hq && (
                    <span className="text-[.62rem] font-bold tracking-wide text-gold-deep bg-[rgba(201,154,46,.12)] px-1.5 py-0.5 rounded ml-auto">
                      HQ
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-7 text-center text-muted text-[.9rem]">
            Headquartered in{" "}
            <b className="text-teal-800 font-semibold">Mumbai</b> &amp;{" "}
            <b className="text-teal-800 font-semibold">Delhi</b>, with delivery
            teams across{" "}
            <b className="text-teal-800 font-semibold">19 Indian cities</b>.
          </p>
        </div>

        {/* INTERNATIONAL */}
        <div
          className={"presence-panel" + (panel === "global" ? " active" : "")}
          id="global"
        >
          <div className="flex items-baseline gap-4 mb-6.5 flex-wrap">
            <h3 className="text-[1.5rem]">International Presence</h3>
            <span className="font-sans text-[.8rem] font-semibold tracking-wide uppercase text-gold-deep bg-[rgba(201,154,46,.1)] px-3 py-1.5 rounded-full">
              9 countries
            </span>
            <p className="text-muted text-[.95rem] basis-full -mt-1.5">
              Cross-border reach that helps you structure entities, raise global
              capital and expand into new markets with confidence.
            </p>
          </div>
          <div className="grid grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 gap-4">
            {INTL_LOCATIONS.map((c) => (
              <div className="intl reveal" key={c.name}>
                <img
                  src={`https://flagcdn.com/w80/${c.code}.png`}
                  alt={`${c.name} flag`}
                  className="w-10 h-auto object-contain"
                />

                <div>
                  <h4 className="font-sans font-semibold text-base text-teal-900">
                    {c.name}
                  </h4>
                  <p className="text-muted text-[.83rem] mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-7 text-center text-muted text-[.9rem]">
            Active across{" "}
            <b className="text-teal-800 font-semibold">9 countries</b> spanning
            the Middle East, Europe, Asia-Pacific and North America.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Presence;
