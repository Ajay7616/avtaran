import React from "react";
import DetailItem from "./DetailItem";
import { getResumeDownloadUrl } from "../../api/api";

const STATUS_OPTIONS = ["new", "reviewing", "shortlisted", "rejected", "hired"];

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CareerApplicationModal({ application, onClose, onStatusChange }) {
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
            <span className="eyebrow">Career Application</span>
            <h3 className="font-serif text-[1.5rem] text-teal-900 font-semibold mt-2">
              {application.firstName} {application.lastName}
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
                value={application.status}
                onChange={(e) => onStatusChange(application._id, e.target.value)}
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
            <DetailItem label="First Name" value={application.firstName} />
            <DetailItem label="Last Name" value={application.lastName} />
            <DetailItem label="Email" value={application.email} />
            <DetailItem label="Phone" value={application.phone} />
            <DetailItem label="Preferred Position" value={application.position} />
            <DetailItem label="Application Date" value={formatDate(application.createdAt)} />
          </div>

          <div className="mt-6">
            <DetailItem label="Portfolio / LinkedIn" value={application.portfolio} />
          </div>

          <div className="mt-6">
            <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
              Resume
            </div>

            {application.resume?.originalName ? (
              <a
                href={getResumeDownloadUrl(application._id)}
                className="inline-block mt-2 px-4 py-2.5 rounded-lg bg-gold-2 text-gold-deep text-[.82rem] font-semibold hover:bg-gold-1 hover:text-teal-900 transition-colors"
              >
                {application.resume.originalName} ↓
              </a>
            ) : (
              <p className="text-[.85rem] text-muted mt-2">No resume on file.</p>
            )}
          </div>

          <div className="mt-6">
            <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
              Cover Letter
            </div>
            <p className="text-[.9rem] text-muted mt-2 leading-7">
              {application.coverLetter || "No cover letter provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerApplicationModal;