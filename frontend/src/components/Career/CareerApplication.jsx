import React, { useState } from "react";
import { submitCareerApplication } from "../../api/api";

function CareerApplication() {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // type: "ok" | "err" | null
  const [formMessage, setFormMessage] = useState({
    type: null,
    text: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Max 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFormMessage({
        type: "err",
        text: "Please upload a file smaller than 5MB.",
      });

      // Clear invalid file
      e.target.value = "";
      setFile(null);

      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setFormMessage({
        type: "err",
        text: "Please upload a PDF or DOCX file.",
      });

      // Clear invalid file
      e.target.value = "";
      setFile(null);

      return;
    }

    // Clear previous error after valid file selection
    setFormMessage({
      type: null,
      text: "",
    });

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message
    setFormMessage({
      type: null,
      text: "",
    });

    if (!file) {
      setFormMessage({
        type: "err",
        text: "Please upload your CV / Resume.",
      });

      return;
    }

    try {
      setSubmitting(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      await submitCareerApplication(formData);

      setFormMessage({
        type: "ok",
        text: "Your application has been submitted successfully. We will review your application and contact you if there is a suitable opportunity.",
      });

      form.reset();
      setFile(null);
    } catch (error) {
      console.error("Career application error:", error);

      setFormMessage({
        type: "err",
        text:
          error?.message ||
          "Unable to submit your application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-[90px] bg-cream">
      <div className="wrap">
        <div className="grid grid-cols-[.8fr_1.2fr] tab:grid-cols-1 gap-14 items-start">
          {/* Left content */}
          <div className="reveal sticky top-[110px] tab:static">
            <span className="eyebrow">Submit your Application</span>

            <h2 className="text-teal-900 text-[clamp(2rem,4vw,2.7rem)] mt-4">
              Your next opportunity could start here.
            </h2>

            <p className="text-muted text-[1.02rem] mt-5 leading-7">
              We believe great teams are built by people who bring curiosity,
              integrity, expertise, and a willingness to make a difference.
            </p>

            <p className="text-muted text-[1.02rem] mt-4 leading-7">
              If you are excited about working with Avtaran Capital, share your
              details and resume with us. Our team will review your application
              and get in touch when there is a suitable opportunity.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-grad-teal text-white shadow-brand-md">
              <div className="font-serif text-[1.3rem] font-semibold">
                We are always looking for talented individuals.
              </div>

              <p className="text-white/75 text-[.92rem] mt-2">
                Tell us about your experience, strengths, and the kind of
                opportunity you are looking for.
              </p>
            </div>
          </div>

          {/* Application form */}
          <div className="reveal cform">
            <form onSubmit={handleSubmit} noValidate>
              {/* Success / Error Message */}
              {formMessage.type && (
                <div className={`form-msg ${formMessage.type}`} id="formMsg">
                  {formMessage.text}
                </div>
              )}

              {/* Name */}
              <div className="grid grid-cols-2 tab:grid-cols-1 gap-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter your First Name"
                    className="field-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter your Last Name"
                    className="field-input"
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="grid grid-cols-2 tab:grid-cols-1 gap-5 mt-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your Email"
                    className="field-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Enter your Phone"
                    className="field-input"
                  />
                </div>
              </div>

              {/* Position */}
              <div className="mt-5">
                <label
                  htmlFor="position"
                  className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                >
                  Preferred Position
                </label>

                <input
                  id="position"
                  name="position"
                  type="text"
                  required
                  placeholder="e.g. Frontend Developer"
                  className="field-input"
                />
              </div>

              {/* Portfolio */}
              <div className="mt-5">
                <label
                  htmlFor="portfolio"
                  className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                >
                  Portfolio/LinkedIn URL
                </label>

                <input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://..."
                  className="field-input"
                />
              </div>

              {/* CV Upload */}
              <div className="mt-5">
                <label
                  htmlFor="resume"
                  className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                >
                  Upload CV / Resume
                </label>

                <label
                  htmlFor="resume"
                  className="career-upload"
                >
                  <div className="w-11 h-11 rounded-full bg-gold-2 text-gold-deep grid place-items-center text-xl">
                    ↑
                  </div>

                  {file ? (
                    <>
                      <span className="mt-3 text-[.92rem] font-semibold text-teal-900 text-center break-all">
                        {file.name}
                      </span>

                      <span className="text-[.78rem] text-muted mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mt-3 text-[.92rem] font-semibold text-teal-900 text-center">
                        Click to upload or drag and drop
                      </span>

                      <span className="text-[.78rem] text-muted mt-1">
                        PDF, DOCX (Max 5MB)
                      </span>
                    </>
                  )}

                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Cover Letter */}
              <div className="mt-5">
                <label
                  htmlFor="coverLetter"
                  className="block text-[.88rem] font-semibold text-teal-900 mb-2"
                >
                  Cover Letter
                </label>

                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="7"
                  placeholder="Tell us a bit about yourself..."
                  className="field-input resize-y min-h-[170px]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold mt-7 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Submitting Application..."
                  : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerApplication;