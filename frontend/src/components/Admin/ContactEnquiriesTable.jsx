import React, { useCallback, useEffect, useRef, useState } from "react";
import ContactEnquiryModal from "./ContactEnquiryModal";
import { getContacts, updateContactStatus, deleteContact } from "../../api/api";

const ITEMS_PER_PAGE = 5;
const POLL_INTERVAL = 15000; // matches the dashboard stats refetch cadence

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

function ContactEnquiriesTable({ onStatUpdate }) {
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

  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const pageRef = useRef(pagination.page);
  const modalOpenRef = useRef(false);

  useEffect(() => {
    pageRef.current = pagination.page;
  }, [pagination.page]);

  useEffect(() => {
    modalOpenRef.current = Boolean(selectedContact || pendingDelete);
  }, [selectedContact, pendingDelete]);

  // silent = true skips the loading spinner, used for background polls
  // so newly-submitted enquiries appear without flashing the whole
  // table into a loading state every 15 seconds.
  const loadContacts = useCallback((page, silent = false) => {
    if (!silent) setLoading(true);
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
          },
        );
      })
      .catch((err) => {
        console.error("Get contacts error:", err);
        if (!silent)
          setError(err.message || "Unable to load contact enquiries.");
      })
      .finally(() => {
        if (!silent) setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadContacts(1);
  }, [loadContacts]);

  // Background poll: keeps the table in sync with new submissions the
  // same way the dashboard stats already do, without a manual refresh.
  useEffect(() => {
    const interval = setInterval(() => {
      if (modalOpenRef.current) return;
      loadContacts(pageRef.current, true);
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [loadContacts]);

  const handlePrevious = () => {
    if (pagination.page > 1) loadContacts(pagination.page - 1);
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages)
      loadContacts(pagination.page + 1);
  };

  const handlePageChange = (page) => loadContacts(page);

  const handleStatusChange = async (id, status, extra = {}) => {
    try {
      await updateContactStatus(id, status, extra);

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c)),
      );

      setSelectedContact((prev) =>
        prev && prev._id === id ? { ...prev, status } : prev,
      );
    } catch (err) {
      console.error("Update contact status error:", err);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);

    if (contact.status === "new") {
      handleStatusChange(contact._id, "read");
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      setIsDeleting(true);
      await deleteContact(pendingDelete._id);

      setContacts((prev) =>
        prev.filter((contact) => contact._id !== pendingDelete._id),
      );

      setPagination((prev) => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
      }));

      // Trigger dashboard stat update
      if (onStatUpdate) {
        onStatUpdate(pendingDelete.status, "contact");
      }

      if (selectedContact?._id === pendingDelete._id) {
        setSelectedContact(null);
      }
      setPendingDelete(null);
    } catch (err) {
      console.error("Delete contact error:", err);
      setError(err.message || "Unable to delete contact enquiry.");
    } finally {
      setIsDeleting(false);
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
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-muted text-[.85rem]"
                  >
                    Loading enquiries…
                  </td>
                </tr>
              )}

              {!loading && contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-muted text-[.85rem]"
                  >
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
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleView(contact)}
                          className="text-[.75rem] font-semibold text-teal-800 hover:text-gold-deep transition-colors"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => setPendingDelete(contact)}
                          className="text-[.75rem] font-semibold text-[#a33] hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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
              {pagination.total === 0
                ? 0
                : (pagination.page - 1) * pagination.limit + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold text-teal-900">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-teal-900">
              {pagination.total}
            </span>
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

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
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
              ),
            )}

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

      {pendingDelete && (
        <div
          className="fixed inset-0 z-[2200] bg-[rgba(11,35,44,.55)] backdrop-blur-sm flex items-center justify-center p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isDeleting) setPendingDelete(null);
          }}
        >
          <div className="bg-white rounded-[20px] shadow-brand-md w-full max-w-[400px] p-6">
            <div className="w-10 h-10 rounded-full bg-[rgba(180,60,60,.1)] text-[#a33] flex items-center justify-center text-lg font-bold mb-4">
              !
            </div>

            <h3 className="font-serif text-[1.2rem] text-teal-900 font-semibold mb-1.5">
              Delete Enquiry
            </h3>

            <p className="text-muted text-[.85rem] mb-6 leading-relaxed">
              Are you sure you want to delete the enquiry from{" "}
              <strong className="text-teal-900">
                {pendingDelete.name}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-[.8rem] font-semibold text-teal-800 hover:bg-cream disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-[.8rem] font-semibold bg-[#a33] text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactEnquiriesTable;