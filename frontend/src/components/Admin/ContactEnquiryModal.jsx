import React, { useState } from "react";
import DetailItem from "./DetailItem";

const STATUS_OPTIONS = ["new", "read", "replied", "closed"];

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ContactEnquiryModal({ contact, onClose, onStatusChange }) {
  const [pendingReply, setPendingReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleStatusSelect = (e) => {
    const newStatus = e.target.value;

    if (newStatus === "replied") {
      setReplyMessage("");
      setPendingReply(true);
      return;
    }

    onStatusChange(contact._id, newStatus);
  };

  const handleConfirmReply = () => {
    if (!replyMessage.trim()) return;

    onStatusChange(contact._id, "replied", { replyMessage });
    setPendingReply(false);
  };

  const handleCancelReply = () => setPendingReply(false);

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
        <div className="px-6 py-5 border-b border-line flex items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Contact Enquiry</span>
            <h3 className="font-serif text-[1.5rem] text-teal-900 font-semibold mt-2">
              {contact.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-cream text-teal-800 border-none cursor-pointer hover:bg-gold-2 text-xl shrink-0"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {onStatusChange && (
            <div className="mb-6">
              <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold mb-2">
                Status
              </div>
              <select
                value={contact.status}
                onChange={handleStatusSelect}
                className="field-input capitalize"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 mob:grid-cols-1 gap-5">
            <DetailItem label="Full Name" value={contact.name} />
            <DetailItem label="Company" value={contact.company} />
            <DetailItem label="Email" value={contact.email} />
            <DetailItem label="Phone" value={contact.phone} />
            <DetailItem label="Interested In" value={contact.service} />
            <DetailItem label="Date" value={formatDate(contact.createdAt)} />
          </div>

          <div className="mt-6">
            <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
              Message
            </div>
            <div className="mt-3 p-4 rounded-xl bg-cream border border-line">
              <p className="text-[.9rem] text-muted leading-7">{contact.message}</p>
            </div>
          </div>
        </div>
      </div>

      {pendingReply && (
        <div
          className="fixed inset-0 z-[2100] bg-[rgba(11,35,44,.55)] flex items-center justify-center p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleCancelReply();
          }}
        >
          <div className="bg-white rounded-2xl shadow-brand-md w-full max-w-[480px] p-6">
            <h4 className="font-serif text-[1.15rem] text-teal-900 font-semibold mb-1">
              Reply to {contact.name}
            </h4>
            <p className="text-muted text-[.8rem] mb-5">
              This message will be emailed directly to {contact.email}.
            </p>

            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={6}
              placeholder="Write your reply here…"
              className="field-input resize-none"
            />

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={handleCancelReply}
                className="px-4 py-2 rounded-lg text-[.8rem] font-semibold text-teal-800 hover:bg-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!replyMessage.trim()}
                onClick={handleConfirmReply}
                className="px-4 py-2 rounded-lg text-[.8rem] font-semibold bg-teal-800 text-white disabled:opacity-40"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactEnquiryModal;