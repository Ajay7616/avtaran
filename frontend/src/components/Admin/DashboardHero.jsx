import React from "react";

function DashboardHero() {
  return (
    <section className="relative overflow-hidden bg-grad-hero border-b border-line">

      <div className="absolute w-[900px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.14),transparent_65%)] -top-[300px] right-[-150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-14 relative">

        <div className="flex items-end justify-between gap-8 mob:flex-col mob:items-start">

          <div>
            <span className="eyebrow">
              Admin Dashboard
            </span>

            <h1 className="text-teal-900 text-[clamp(2rem,4vw,3rem)] font-serif font-semibold mt-4">
              Welcome back,{" "}
              <span className="grad-text-gold">
                Admin
              </span>
            </h1>

            <p className="text-muted text-[1rem] mt-3 max-w-[650px]">
              Manage career applications and contact enquiries from one
              centralized workspace.
            </p>
          </div>

          <div className="hidden md:block text-right">
            <div className="text-[.72rem] uppercase tracking-[.16em] text-muted">
              Dashboard
            </div>

            <div className="text-teal-900 font-serif text-xl font-semibold mt-1">
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardHero;