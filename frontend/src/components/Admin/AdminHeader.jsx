import React from "react";

function AdminHeader({ onLogout }) {
  return (
    <header className="bg-teal-900 text-white border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-5">

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-grad-gold text-teal-900 grid place-items-center font-serif text-xl font-semibold">
              A
            </div>

            <div>
              <div className="font-serif font-semibold text-[1.1rem]">
                Avtaran Capital
              </div>

              <div className="text-white/55 text-[.72rem] uppercase tracking-[.16em]">
                Administration
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">
              <div className="text-[.82rem] font-semibold">
                Administrator
              </div>

              <div className="text-[.7rem] text-white/50">
                Admin Panel
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors text-[.82rem] font-semibold"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}

export default AdminHeader;