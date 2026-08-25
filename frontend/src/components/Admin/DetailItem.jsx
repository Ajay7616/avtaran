import React from "react";

function DetailItem({ label, value }) {
  return (
    <div>
      <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
        {label}
      </div>

      <div className="text-[.88rem] text-teal-900 font-medium mt-1 break-words">
        {value || "—"}
      </div>
    </div>
  );
}

export default DetailItem;