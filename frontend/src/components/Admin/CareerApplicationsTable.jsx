import React, { useMemo, useState } from "react";
import CareerApplicationModal from "./CareerApplicationModal";

const careerApplications = [
  {
    id: 1,
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    position: "Financial Analyst",
    portfolio: "https://linkedin.com/in/rahulsharma",
    resume: "Rahul-Sharma-CV.pdf",
    coverLetter:
      "I am a finance professional with 4 years of experience in financial analysis and advisory.",
    date: "25 Aug 2026",
    status: "New",
  },
  {
    id: 2,
    firstName: "Priya",
    lastName: "Mehta",
    email: "priya.mehta@gmail.com",
    phone: "+91 99887 66554",
    position: "Investment Analyst",
    portfolio: "https://linkedin.com/in/priyamehta",
    resume: "Priya-Mehta-CV.pdf",
    coverLetter:
      "I am interested in joining your team and contributing to investment advisory projects.",
    date: "24 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 3,
    firstName: "Arjun",
    lastName: "Kapoor",
    email: "arjun.kapoor@gmail.com",
    phone: "+91 91234 56789",
    position: "Business Analyst",
    portfolio: "https://linkedin.com/in/arjunkapoor",
    resume: "Arjun-Kapoor-CV.pdf",
    coverLetter:
      "I would love the opportunity to work with Avtaran Capital.",
    date: "22 Aug 2026",
    status: "New",
  },
  {
    id: 4,
    firstName: "Sneha",
    lastName: "Patel",
    email: "sneha.patel@gmail.com",
    phone: "+91 98765 11223",
    position: "Finance Manager",
    portfolio: "https://linkedin.com/in/snehapatel",
    resume: "Sneha-Patel-CV.pdf",
    coverLetter:
      "I have extensive experience in financial planning and reporting.",
    date: "21 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 5,
    firstName: "Karan",
    lastName: "Malhotra",
    email: "karan.malhotra@gmail.com",
    phone: "+91 99887 44556",
    position: "Investment Associate",
    portfolio: "https://linkedin.com/in/karanmalhotra",
    resume: "Karan-Malhotra-CV.pdf",
    coverLetter:
      "I am interested in investment advisory and transaction-related opportunities.",
    date: "20 Aug 2026",
    status: "New",
  },
  {
    id: 6,
    firstName: "Ananya",
    lastName: "Iyer",
    email: "ananya.iyer@gmail.com",
    phone: "+91 91234 77889",
    position: "Financial Analyst",
    portfolio: "https://linkedin.com/in/ananyaiyer",
    resume: "Ananya-Iyer-CV.pdf",
    coverLetter:
      "I would be excited to contribute my financial analysis experience.",
    date: "19 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 7,
    firstName: "Vikram",
    lastName: "Rao",
    email: "vikram.rao@gmail.com",
    phone: "+91 98765 88990",
    position: "Business Analyst",
    portfolio: "https://linkedin.com/in/vikramrao",
    resume: "Vikram-Rao-CV.pdf",
    coverLetter:
      "I am looking forward to exploring opportunities with Avtaran Capital.",
    date: "18 Aug 2026",
    status: "New",
  },
  {
    id: 8,
    firstName: "Riya",
    lastName: "Shah",
    email: "riya.shah@gmail.com",
    phone: "+91 99887 33445",
    position: "Accounts Manager",
    portfolio: "https://linkedin.com/in/riyashah",
    resume: "Riya-Shah-CV.pdf",
    coverLetter:
      "I have experience managing accounts and financial operations.",
    date: "17 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 9,
    firstName: "Aditya",
    lastName: "Joshi",
    email: "aditya.joshi@gmail.com",
    phone: "+91 91234 55667",
    position: "Senior Financial Analyst",
    portfolio: "https://linkedin.com/in/adityajoshi",
    resume: "Aditya-Joshi-CV.pdf",
    coverLetter:
      "I would love to bring my financial modelling experience to your team.",
    date: "16 Aug 2026",
    status: "New",
  },
  {
    id: 10,
    firstName: "Meera",
    lastName: "Nair",
    email: "meera.nair@gmail.com",
    phone: "+91 98765 66778",
    position: "Investment Analyst",
    portfolio: "https://linkedin.com/in/meeranair",
    resume: "Meera-Nair-CV.pdf",
    coverLetter:
      "I am passionate about investment research and financial advisory.",
    date: "15 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 11,
    firstName: "Rohan",
    lastName: "Bansal",
    email: "rohan.bansal@gmail.com",
    phone: "+91 99887 88990",
    position: "Finance Associate",
    portfolio: "https://linkedin.com/in/rohanbansal",
    resume: "Rohan-Bansal-CV.pdf",
    coverLetter:
      "I am interested in joining the finance and advisory team.",
    date: "14 Aug 2026",
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

function CareerApplicationsTable() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Number of records displayed on each page
  const itemsPerPage = 5;

  // Total number of pages
  const totalPages = Math.ceil(
    careerApplications.length / itemsPerPage
  );

  // Get only the applications for the current page
  const currentApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return careerApplications.slice(startIndex, endIndex);
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
              Career Applications
            </h2>

            <p className="text-muted text-[.8rem] mt-1">
              Applications submitted through the career form.
            </p>
          </div>

          <span className="bg-gold-2 text-gold-deep rounded-full px-3 py-1 text-[.72rem] font-semibold whitespace-nowrap">
            {careerApplications.length} Records
          </span>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px] text-left">

            <thead>
              <tr className="bg-cream border-b border-line">

                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Applicant
                </th>

                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Position
                </th>

                <th className="px-5 py-3 text-[.7rem] uppercase tracking-[.08em] text-muted font-semibold">
                  Contact
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

              {currentApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-line last:border-b-0 hover:bg-[#FFFDF5] transition-colors"
                >

                  {/* Applicant */}
                  <td className="px-5 py-4">

                    <div className="font-semibold text-teal-900 text-[.84rem]">
                      {application.firstName}{" "}
                      {application.lastName}
                    </div>

                    <div className="text-muted text-[.72rem] mt-0.5">
                      {application.date}
                    </div>

                  </td>

                  {/* Position */}
                  <td className="px-5 py-4">

                    <div className="text-teal-800 text-[.82rem] font-medium">
                      {application.position}
                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">

                    <div className="text-teal-900 text-[.78rem]">
                      {application.email}
                    </div>

                    <div className="text-muted text-[.72rem] mt-0.5">
                      {application.phone}
                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedApplication(application)
                      }
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

          {/* Showing information */}
          <div className="text-[.75rem] text-muted">
            Showing{" "}
            <span className="font-semibold text-teal-900">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>
            {" "}–{" "}
            <span className="font-semibold text-teal-900">
              {Math.min(
                currentPage * itemsPerPage,
                careerApplications.length
              )}
            </span>
            {" "}of{" "}
            <span className="font-semibold text-teal-900">
              {careerApplications.length}
            </span>
          </div>

          {/* Pagination buttons */}
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

      {/* Details modal */}
      {selectedApplication && (
        <CareerApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </>
  );
}

export default CareerApplicationsTable;