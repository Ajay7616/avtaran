import React, { useRef, useState } from "react";
import { submitContact } from "../../api/api";

function Contact() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const [errFields, setErrFields] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [formMsg, setFormMsg] = useState({ type: null, text: "" }); // type: 'ok' | 'err' | null

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormMsg({
      type: "",
      text: "",
    });

    const form = e.currentTarget;

    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    const errors = {};

    if (!name) {
      errors.name = true;
    }

    if (!email) {
      errors.email = true;
    }

    if (!message) {
      errors.message = true;
    }

    if (Object.keys(errors).length > 0) {
      setErrFields(errors);

      setFormMsg({
        type: "error",
        text: "Please fill in all required fields.",
      });

      return;
    }

    setErrFields({});

    try {
      setSubmitting(true);

      await submitContact({
        name,
        company: formData.get("company")?.trim() || "",
        email,
        phone: formData.get("phone")?.trim() || "",
        service: formData.get("service") || "",
        message,
      });

      setFormMsg({
        type: "success",
        text: "Thank you! Your message has been received. We'll get back to you shortly.",
      });

      form.reset();
    } catch (error) {
      console.error("Contact submission error:", error);

      setFormMsg({
        type: "error",
        text: error.message || "Unable to send your message. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-[110px] bg-cream-2" id="contact">
      <div className="wrap grid grid-cols-[.85fr_1.15fr] tab:grid-cols-1 gap-14 tab:gap-10">
        <div className="reveal">
          <span className="eyebrow">Get in Touch</span>
          <h3 className="text-[1.5rem] mb-2 mt-3.5">
            Let&apos;s talk about your next move
          </h3>
          <p className="text-muted mb-7.5">
            Tell us where you are and where you want to go. We&apos;ll respond
            within one business day.
          </p>

          <div className="flex gap-4 mb-5.5">
            <div className="w-11 h-11 shrink-0 rounded-[11px] bg-white border border-line grid place-items-center text-gold-deep">
              <svg
                viewBox="0 0 24 24"
                width="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M4 6l8 6 8-6" />
              </svg>
            </div>
            <div>
              <h5 className="font-sans text-[.78rem] uppercase tracking-wide text-muted font-semibold">
                Email
              </h5>
              <p className="font-medium text-teal-900 leading-normal">
                <a
                  href="mailto:hck@avtaran.com"
                  className="hover:bg-gold-2 hover:text-teal-800 rounded px-0.5 transition-colors duration-200"
                >
                  hck@avtaran.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-5.5">
            <div className="w-11 h-11 shrink-0 rounded-[11px] bg-white border border-line grid place-items-center text-gold-deep">
              <svg
                viewBox="0 0 24 24"
                width="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z" />
              </svg>
            </div>
            <div>
              <h5 className="font-sans text-[.78rem] uppercase tracking-wide text-muted font-semibold">
                Phone
              </h5>
              <p className="font-medium text-teal-900 leading-normal">
                <a
                  href="tel:+919833395565"
                  className="hover:bg-gold-2 hover:text-teal-800 rounded px-0.5 transition-colors duration-200"
                >
                  +91 98333 95565
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-5.5">
            <div className="w-11 h-11 shrink-0 rounded-[11px] bg-white border border-line grid place-items-center text-gold-deep">
              <svg
                viewBox="0 0 24 24"
                width="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h5 className="font-sans text-[.78rem] uppercase tracking-wide text-muted font-semibold">
                Head Office
              </h5>
              <p className="font-medium text-teal-900 leading-relaxed">
                AVTARAN Capital Advisors Pvt. Ltd.
                <br />
                Office No. 301, Kamla Hub, N S Road No. 1,
                <br />
                Beside Aromas Cafe, Near Criti Care Hospital,
                <br />
                JVPD Scheme, Juhu, Vile Parle (West),
                <br />
                Mumbai 400049, India
              </p>
            </div>
          </div>
        </div>

        <form
          className="cform reveal"
          id="contactForm"
          noValidate
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {formMsg.type && (
            <div className={"form-msg " + formMsg.type} id="formMsg">
              {formMsg.text}
            </div>
          )}
          <div className="grid grid-cols-2 mob:grid-cols-1 gap-4.5">
            <div className="mb-4.5">
              <label
                htmlFor="name"
                className="block text-[.82rem] font-semibold text-teal-800 mb-1.5"
              >
                Full name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                ref={nameRef}
                className={"field-input" + (errFields.name ? " err-field" : "")}
              />
            </div>
            <div className="mb-4.5">
              <label
                htmlFor="company"
                className="block text-[.82rem] font-semibold text-teal-800 mb-1.5"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company name"
                className="field-input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 mob:grid-cols-1 gap-4.5">
            <div className="mb-4.5">
              <label
                htmlFor="email"
                className="block text-[.82rem] font-semibold text-teal-800 mb-1.5"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                ref={emailRef}
                className={
                  "field-input" + (errFields.email ? " err-field" : "")
                }
              />
            </div>
            <div className="mb-4.5">
              <label
                htmlFor="phone"
                className="block text-[.82rem] font-semibold text-teal-800 mb-1.5"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91"
                className="field-input"
              />
            </div>
          </div>
          <div className="mb-4.5">
            <label
              htmlFor="service"
              className="block text-[.82rem] font-semibold text-teal-800 mb-1.5"
            >
              I&apos;m interested in
            </label>
            <select
              id="service"
              name="service"
              defaultValue=""
              className="field-input"
            >
              <option value="">Select a service</option>
              <option>Virtual CFO</option>
              <option>Fundraising &amp; Capital</option>
              <option>Transaction Advisory (M&amp;A)</option>
              <option>Compliance &amp; Governance</option>
              <option>Cross-Border Advisory</option>
              <option>Startup Programme</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-4.5">
            <label
              htmlFor="message"
              className="block text-[.82rem] font-semibold text-teal-800 mb-1.5"
            >
              How can we help? *
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us a little about your business and goals&hellip;"
              ref={messageRef}
              className={
                "field-input resize-y min-h-[110px]" +
                (errFields.message ? " err-field" : "")
              }
            ></textarea>
          </div>
          <button type="submit" className="btn btn-gold w-full justify-center">
            Send Message &rarr;
          </button>
          <p className="text-[.8rem] text-muted mt-1.5">
            By submitting, you agree to be contacted by Avtaran Capital. We
            respect your privacy.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
