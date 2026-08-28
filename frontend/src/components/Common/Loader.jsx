import React from "react";

export default function Loader({ fullScreen = true, message = "Loading..." }) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-cream z-[9999] transition-opacity duration-300 ${
        fullScreen ? "fixed inset-0 min-h-screen w-full" : "w-full py-16"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Gradient Ring */}
        <div className="w-24 h-24 rounded-full border-2 border-transparent border-t-[#C99A2E] border-r-[#C99A2E]/40 animate-spin-slow" />

        {/* Inner Subtle Ring */}
        <div className="absolute inset-0 m-auto w-20 h-20 rounded-full border border-teal-900/15" />

        {/* Center Brand Logo / Emblem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse-subtle">
          <span className="font-serif text-2xl font-bold tracking-tight text-teal-900">
            A<span className="text-[#C99A2E]">C</span>
          </span>
        </div>
      </div>

      {/* Brand Text & Status */}
      <div className="mt-6 text-center">
        <h3 className="font-serif text-lg font-bold tracking-tight text-teal-900">
          Avtaran <span className="text-[#C99A2E]">Capital</span>
        </h3>
        {message && (
          <p className="mt-1 text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}