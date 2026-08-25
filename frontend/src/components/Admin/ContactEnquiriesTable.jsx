import React, { useMemo, useState } from "react";
import ContactEnquiryModal from "./ContactEnquiryModal";

const contactEnquiries = [
  {
    id: 1,
    name: "Amit Verma",
    company: "Verma Technologies",
    email: "amit@vermatech.com",
    phone: "+91 98765 11111",
    service: "Virtual CFO",
    message:
      "We are looking for a Virtual CFO to help us improve our financial planning and reporting.",
    date: "25 Aug 2026",
    status: "New",
  },
  {
    id: 2,
    name: "Neha Gupta",
    company: "Gupta Ventures",
    email: "neha@guptaventures.com",
    phone: "+91 99887 22222",
    service: "Fundraising & Capital",
    message:
      "We are currently preparing for our next fundraising round.",
    date: "24 Aug 2026",
    status: "Contacted",
  },
  {
    id: 3,
    name: "Siddharth Jain",
    company: "Jain Industries",
    email: "siddharth@jainindustries.com",
    phone: "+91 91234 33333",
    service: "Transaction Advisory (M&A)",
    message:
      "We would like to understand your transaction advisory services.",
    date: "23 Aug 2026",
    status: "New",
  },
  {
    id: 4,
    name: "Rakesh Mehta",
    company: "Mehta Consulting",
    email: "rakesh@mehtaconsulting.com",
    phone: "+91 98765 44444",
    service: "Compliance & Governance",
    message:
      "We need assistance with our company's compliance and governance requirements.",
    date: "22 Aug 2026",
    status: "Contacted",
  },
  {
    id: 5,
    name: "Pooja Shah",
    company: "Shah Enterprises",
    email: "pooja@shahenterprises.com",
    phone: "+91 99887 55555",
    service: "Cross-Border Advisory",
    message:
      "We are exploring opportunities to expand our business internationally.",
    date: "21 Aug 2026",
    status: "New",
  },
  {
    id: 6,
    name: "Vivek Agarwal",
    company: "Agarwal Foods",
    email: "vivek@agarwalfoods.com",
    phone: "+91 91234 66666",
    service: "Virtual CFO",
    message:
      "We are looking for strategic financial support as we scale our operations.",
    date: "20 Aug 2026",
    status: "Contacted",
  },
  {
    id: 7,
    name: "Kavita Rao",
    company: "Rao Healthcare",
    email: "kavita@raohealthcare.com",
    phone: "+91 98765 77777",
    service: "Fundraising & Capital",
    message:
      "We would like to discuss our upcoming capital requirements.",
    date: "19 Aug 2026",
    status: "New",
  },
  {
    id: 8,
    name: "Manish Kumar",
    company: "MK Industries",
    email: "manish@mkindustries.com",
    phone: "+91 99887 88888",
    service: "Transaction Advisory (M&A)",
    message:
      "We are evaluating a potential acquisition and require advisory support.",
    date: "18 Aug 2026",
    status: "Contacted",
  },
  {
    id: 9,
    name: "Shreya Nair",
    company: "Nair Technologies",
    email: "shreya@nairtech.com",
    phone: "+91 91234 99999",
    service: "Startup Programme",
    message:
      "We are an early-stage startup looking for financial and strategic guidance.",
    date: "17 Aug 2026",
    status: "New",
  },
  {
    id: 10,
    name: "Ankit Bhatia",
    company: "Bhatia Retail",
    email: "ankit@bhatiaretail.com",
    phone: "+91 98765 10101",
    service: "Virtual CFO",
    message:
      "We need help improving our financial reporting and business planning.",
    date: "16 Aug 2026",
    status: "Contacted",
  },
  {
    id: 11,
    name: "Nisha Kapoor",
    company: "Kapoor Ventures",
    email: "nisha@kapoorventures.com",
    phone: "+91 99887 12121",
    service: "Fundraising & Capital",
    message:
      "We are preparing for our first institutional fundraising round.",
    date: "15 Aug 2026",
    status: "New",
  },
];

function StatusBadge({ status }) {
  const classes =
    status === "New"
      ? "bg-[rgba(201,154,46,.13)] text-gold-deep border-[rgba(201,154,46,.25)]"
      : "bg-[rgba(46,113,137,.1)] text-teal-800 border-[rgba(46,113,137,.2)]";

  return (
    <span
      className={
        "inline-flex items-center px-2.5 py-1 rounded-full text-[.7rem] font-semibold border " +
        classes
      }
    >
      {status}
    </span>
  );
}

function ContactEnquiriesTable() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Number of records shown per page
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(
    contactEnquiries.length / itemsPerPage
  );

  // Get records for current page
  const currentContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return contactEnquiries.slice(startIndex, endIndex);
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-line shadow-brand-sm overflow-hidden">

        {/* Header */}
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
            {contactEnquiries.length} Records
          </span>

        </div>

        {/* Table */}
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

              {currentContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-line last:border-b-0 hover:bg-[#FFFDF5] transition-colors"
                >

                  {/* Name */}
                  <td className="px-5 py-4">

                    <div className="font-semibold text-teal-900 text-[.84rem]">
                      {contact.name}
                    </div>

                    <div className="text-muted text-[.72rem] mt-0.5">
                      {contact.date}
                    </div>

                  </td>

                  {/* Company */}
                  <td className="px-5 py-4">

                    <div className="text-teal-800 text-[.82rem] font-medium">
                      {contact.company}
                    </div>

                  </td>

                  {/* Service */}
                  <td className="px-5 py-4">

                    <div className="text-teal-900 text-[.78rem] max-w-[180px]">
                      {contact.service}
                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={contact.status} />
                  </td>

                  {/* Action */}
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

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-line flex items-center justify-between gap-4 mob:flex-col">

          {/* Showing count */}
          <div className="text-[.75rem] text-muted">

            Showing{" "}

            <span className="font-semibold text-teal-900">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>

            {" "}–{" "}

            <span className="font-semibold text-teal-900">
              {Math.min(
                currentPage * itemsPerPage,
                contactEnquiries.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-teal-900">
              {contactEnquiries.length}
            </span>

          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-1.5">

            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={handlePrevious}
              className={
                "w-9 h-9 rounded-lg border text-[.8rem] font-semibold transition-all " +
                (
                  currentPage === 1
                    ? "border-line text-muted/40 cursor-not-allowed bg-cream"
                    : "border-line text-teal-800 bg-white hover:bg-gold-2 hover:border-gold-1 cursor-pointer"
                )
              }
            >
              ←
            </button>

            {/* Page numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={
                  "w-9 h-9 rounded-lg border text-[.8rem] font-semibold transition-all " +
                  (
                    currentPage === page
                      ? "bg-teal-800 text-white border-teal-800"
                      : "bg-white text-teal-800 border-line hover:bg-gold-2 hover:border-gold-1"
                  )
                }
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={handleNext}
              className={
                "w-9 h-9 rounded-lg border text-[.8rem] font-semibold transition-all " +
                (
                  currentPage === totalPages
                    ? "border-line text-muted/40 cursor-not-allowed bg-cream"
                    : "border-line text-teal-800 bg-white hover:bg-gold-2 hover:border-gold-1 cursor-pointer"
                )
              }
            >
              →
            </button>

          </div>

        </div>

      </div>

      {/* Contact details modal */}
      {selectedContact && (
        <ContactEnquiryModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </>
  );
}

export default ContactEnquiriesTable;
