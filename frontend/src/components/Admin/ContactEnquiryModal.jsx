import React from "react";
import DetailItem from "./DetailItem";

function ContactEnquiryModal({ contact, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[2000] bg-[rgba(11,35,44,.55)] backdrop-blur-sm flex items-center justify-center p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-[20px] shadow-brand-md w-full max-w-[650px] max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-5 border-b border-line flex items-center justify-between">

          <div>
            <span className="eyebrow">
              Contact Enquiry
            </span>

            <h3 className="font-serif text-[1.5rem] text-teal-900 font-semibold mt-2">
              {contact.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-cream text-teal-800 border-none cursor-pointer hover:bg-gold-2 text-xl"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <div className="grid grid-cols-2 mob:grid-cols-1 gap-5">

            <DetailItem
              label="Full Name"
              value={contact.name}
            />

            <DetailItem
              label="Company"
              value={contact.company}
            />

            <DetailItem
              label="Email"
              value={contact.email}
            />

            <DetailItem
              label="Phone"
              value={contact.phone}
            />

            <DetailItem
              label="Interested In"
              value={contact.service}
            />

            <DetailItem
              label="Date"
              value={contact.date}
            />

          </div>

          <div className="mt-6">

            <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
              Message
            </div>

            <div className="mt-3 p-4 rounded-xl bg-cream border border-line">
              <p className="text-[.9rem] text-muted leading-7">
                {contact.message}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactEnquiryModal;