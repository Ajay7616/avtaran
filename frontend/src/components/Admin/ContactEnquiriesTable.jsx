import React, { useCallback, useEffect, useState } from "react";
import ContactEnquiryModal from "./ContactEnquiryModal";
import { getContacts, updateContactStatus } from "../../api/api";

const ITEMS_PER_PAGE = 5;

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const classes =
    status === "new"
      ? "bg-[rgba(201,154,46,.13)] text-gold-deep border-[rgba(201,154,46,.25)]"
      : status === "closed"
      ? "bg-[rgba(90,112,121,.12)] text-muted border-[rgba(90,112,121,.25)]"
      : "bg-[rgba(46,113,137,.1)] text-teal-800 border-[rgba(46,113,137,.2)]";

  return (
    <span
      className={
        "inline-flex items-center px-2.5 py-1 rounded-full text-[.7rem] font-semibold border capitalize " +
        classes
      }
    >
      {status}
    </span>
  );
}

function ContactEnquiriesTable() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: ITEMS_PER_PAGE,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const loadContacts = useCallback((page) => {
    setLoading(true);
    setError("");

    getContacts({ page, limit: ITEMS_PER_PAGE })
      .then((res) => {
        setContacts(res.data || []);
        setPagination(
          res.pagination || {
            page,
            totalPages: 1,
            total: 0,
            limit: ITEMS_PER_PAGE,
          }
        );
      })
      .catch((err) => {
        console.error("Get contacts error:", err);
        setError(err.message || "Unable to load contact enquiries.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadContacts(1);
  }, [loadContacts]);

  const handlePrevious = () => {
    if (pagination.page > 1) loadContacts(pagination.page - 1);
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages) loadContacts(pagination.page + 1);
  };

  const handlePageChange = (page) => loadContacts(page);

  const handleStatusChange = async (id, status) => {
    try {
      await updateContactStatus(id, status);

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );

      setSelectedContact((prev) =>
        prev && prev._id === id ? { ...prev, status } : prev
      );
    } catch (err) {
      console.error("Update contact status error:", err);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-line shadow-brand-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-line flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-[1.35rem] text-teal-900 font-semibold">
              Contact Enquiries
            </h2>
            <p className="text-muted text-[.8rem] mt-1">
              Messages submitted through the contact form.
            </p>
          </div>

          <span className="bg-[rgba(46,113,137,.1)] text-teal-800 rounded-full px-3 py-1 text-[.72rem] font-semibold whitespace-nowrap">
            {pagination.total} Records
          </span>
        </div>

        {error && (
          <div className="px-6 py-4 text-[.82rem] text-[#a33] bg-[rgba(180,60,60,.06)]">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-cream border-b border-line">
                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Name
                </th>
                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Company
                </th>
                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Service
                </th>
                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Status
                </th>
                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted text-[.85rem]">
                    Loading enquiries…
                  </td>
                </tr>
              )}

              {!loading && contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted text-[.85rem]">
                    No enquiries yet.
                  </td>
                </tr>
              )}

              {!loading &&
                contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b border-line last:border-b-0 hover:bg-[#FFFDF5] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-teal-900 text-[.84rem]">
                        {contact.name}
                      </div>
                      <div className="text-muted text-[.72rem] mt-0.5">
                        {formatDate(contact.createdAt)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-teal-800 text-[.82rem] font-medium">
                        {contact.company || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-teal-900 text-[.78rem] max-w-[180px]">
                        {contact.service || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={contact.status} />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedContact(contact)}
                        className="text-[.75rem] font-semibold text-teal-800 hover:text-gold-deep transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-line flex items-center justify-between gap-4 mob:flex-col">
          <div className="text-[.75rem] text-muted">
            Showing{" "}
            <span className="font-semibold text-teal-900">
              {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold text-teal-900">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            of <span className="font-semibold text-teal-900">{pagination.total}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.page === 1}
              onClick={handlePrevious}
              className={
                "w-9 h-9 rounded-lg border text-[.8rem] font-semibold transition-all " +
                (pagination.page === 1
                  ? "border-line text-muted/40 cursor-not-allowed bg-cream"
                  : "border-line text-teal-800 bg-white hover:bg-gold-2 hover:border-gold-1 cursor-pointer")
              }
            >
              ←
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={
                  "w-9 h-9 rounded-lg border text-[.8rem] font-semibold transition-all " +
                  (pagination.page === page
                    ? "bg-teal-800 text-white border-teal-800"
                    : "bg-white text-teal-800 border-line hover:bg-gold-2 hover:border-gold-1")
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={pagination.page === pagination.totalPages}
              onClick={handleNext}
              className={
                "w-9 h-9 rounded-lg border text-[.8rem] font-semibold transition-all " +
                (pagination.page === pagination.totalPages
                  ? "border-line text-muted/40 cursor-not-allowed bg-cream"
                  : "border-line text-teal-800 bg-white hover:bg-gold-2 hover:border-gold-1 cursor-pointer")
              }
            >
              →
            </button>
          </div>
        </div>
      </div>

      {selectedContact && (
        <ContactEnquiryModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
}

export default ContactEnquiriesTable;