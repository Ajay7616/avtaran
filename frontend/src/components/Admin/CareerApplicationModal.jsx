import React, { useState } from "react";
import DetailItem from "./DetailItem";
import { getResumeDownloadUrl } from "../../api/api";

const STATUS_OPTIONS = ["new", "interview", "selected", "rejected"];

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatInterviewSchedule(schedule) {
  if (!schedule?.date) return null;

  const [year, month, day] = schedule.date.split("-").map(Number);
  const dateLabel = new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeLabel = schedule.time
    ? new Date(`2000-01-01T${schedule.time}`).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return timeLabel ? `${dateLabel} at ${timeLabel}` : dateLabel;
}

function CareerApplicationModal({ application, onClose, onStatusChange }) {
  const [pendingInterview, setPendingInterview] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusSelect = async (e) => {
    const newStatus = e.target.value;

    if (newStatus === "interview") {
      setInterviewDate(application.interviewSchedule?.date || "");
      setInterviewTime(application.interviewSchedule?.time || "");
      setPendingInterview(true);
      return;
    }

    try {
      setIsUpdating(true);
      await onStatusChange(application._id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmInterview = async () => {
    if (!interviewDate || !interviewTime) return;

    try {
      setIsUpdating(true);
      await onStatusChange(application._id, "interview", {
        interviewDate,
        interviewTime,
      });
      setPendingInterview(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelInterview = () => setPendingInterview(false);

  const scheduleLabel = formatInterviewSchedule(application.interviewSchedule);

  return (
    <div
      className="fixed inset-0 z-[2000] bg-[rgba(11,35,44,.55)] backdrop-blur-sm flex items-center justify-center p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isUpdating) onClose();
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
            disabled={isUpdating}
            className="w-9 h-9 rounded-lg bg-cream text-teal-800 border-none cursor-pointer hover:bg-gold-2 text-xl shrink-0 disabled:opacity-40"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {onStatusChange && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Status
                </span>
                {isUpdating && (
                  <span className="text-[.75rem] text-teal-800 font-medium animate-pulse">
                    Updating status...
                  </span>
                )}
              </div>
              <select
                value={application.status}
                onChange={handleStatusSelect}
                disabled={isUpdating}
                className="field-input capitalize disabled:opacity-50 cursor-pointer"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </select>

              {application.status === "interview" && scheduleLabel && (
                <p className="text-[.78rem] text-teal-800 mt-2">
                  Interview scheduled for <strong>{scheduleLabel}</strong>
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 mob:grid-cols-1 gap-5">
            <DetailItem label="First Name" value={application.firstName} />
            <DetailItem label="Last Name" value={application.lastName} />
            <DetailItem label="Email" value={application.email} />
            <DetailItem label="Phone" value={application.phone} />
            <DetailItem
              label="Preferred Position"
              value={application.position}
            />
            <DetailItem
              label="Application Date"
              value={formatDate(application.createdAt)}
            />
          </div>

          <div className="mt-6">
            <DetailItem
              label="Portfolio / LinkedIn"
              value={application.portfolio}
            />
          </div>

          <div className="mt-6">
            <div className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold">
              Resume
            </div>

            {application.resume?.originalName ? (
              <a
                href={getResumeDownloadUrl(application._id)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2.5 rounded-lg bg-gold-2 text-gold-deep text-[.82rem] font-semibold hover:bg-gold-1 hover:text-teal-900 transition-colors"
              >
                {application.resume.originalName} ↓
              </a>
            ) : (
              <p className="text-[.85rem] text-muted mt-2">
                No resume on file.
              </p>
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

      {pendingInterview && (
        <div
          className="fixed inset-0 z-[2100] bg-[rgba(11,35,44,.55)] flex items-center justify-center p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isUpdating)
              handleCancelInterview();
          }}
        >
          <div className="bg-white rounded-2xl shadow-brand-md w-full max-w-[380px] p-6">
            <h4 className="font-serif text-[1.15rem] text-teal-900 font-semibold mb-1">
              Schedule Interview
            </h4>
            <p className="text-muted text-[.8rem] mb-5">
              This date & time will be included in the email sent to the
              applicant.
            </p>

            <div className="mb-4">
              <label className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold block mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                disabled={isUpdating}
                className="field-input"
              />
            </div>

            <div className="mb-6">
              <label className="text-[.72rem] uppercase tracking-[.08em] text-muted font-semibold block mb-1.5">
                Time
              </label>
              <input
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                disabled={isUpdating}
                className="field-input"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelInterview}
                disabled={isUpdating}
                className="px-4 py-2 rounded-lg text-[.8rem] font-semibold text-teal-800 hover:bg-cream disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!interviewDate || !interviewTime || isUpdating}
                onClick={handleConfirmInterview}
                className="px-4 py-2 rounded-lg text-[.8rem] font-semibold bg-teal-800 text-white disabled:opacity-40 flex items-center gap-2"
              >
                {isUpdating ? "Saving..." : "Confirm & Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerApplicationModal;