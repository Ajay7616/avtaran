import React from "react";

// Required tick-box used under the contact and career forms.
// The form reads it with formData.get("consent") === "on".
export default function ConsentCheckbox({ id, children, invalid = false }) {
  return (
    <div className="my-3">
      <label
        htmlFor={id}
        className={`flex items-start gap-3 text-[.84rem] leading-relaxed cursor-pointer ${
          invalid ? "text-red-700" : "text-muted"
        }`}
      >
        <input
          id={id}
          name="consent"
          type="checkbox"
          aria-required="true"
          aria-invalid={invalid}
          className="mt-1 h-4 w-4 shrink-0 accent-[#0E4D66]"
        />
        <span>{children}</span>
      </label>
    </div>
  );
}
