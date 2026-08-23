import React from "react";
import LOGO_SRC from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-white text-muted pt-[70px] pb-7.5 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] tab:grid-cols-2 mob:grid-cols-1 gap-10 mb-12">
          <div>
            <img src={LOGO_SRC} alt="Avtaran Capital" className="h-13 mb-4" />
            <p className="text-[.9rem] max-w-[280px] leading-relaxed">Strategic finance, Virtual CFO and capital advisory for ambitious businesses—across India and global markets.</p>
            <p className="mt-3.5 text-[.86rem] text-muted leading-relaxed">
              AVTARAN Capital Advisors Pvt. Ltd.
              <br />
              Office No. 301, Kamla Hub, N S Road No. 1,
              <br />
              Beside Aromas Cafe, Near Criti Care Hospital,
              <br />
              JVPD Scheme, Juhu, Vile Parle (West),
              <br />
              Mumbai 400049
              <br />
              <a href="tel:+919833395565" className="text-teal-800 font-semibold">
                +91 98333 95565
              </a>{" "}
              &middot;{" "}
              <a href="mailto:hck@avtaran.com" className="text-teal-800 font-semibold">
                hck@avtaran.com
              </a>
            </p>
            <div className="flex gap-2.5 mt-4.5">
              <a href="#" aria-label="LinkedIn" className="foot-social-link">
                <svg width="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4 0 4.74 2.64 4.74 6.07V21H18.5v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="foot-social-link">
                <svg width="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.8l7.5-8.6L2.4 2h6.6l4.5 6.7zM17.8 20h1.7L8.3 4H6.5z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="foot-social-link">
                <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-teal-900 font-sans text-[.82rem] uppercase tracking-wide mb-4 font-semibold">Company</h5>
            <a href="#about" className="foot-link">About Us</a>
            <a href="#team" className="foot-link">Leadership</a>
            <a href="#services" className="foot-link">Services</a>
            <a href="#startup" className="foot-link">Startup Programme</a>
            <a href="#presence" className="foot-link">Our Presence</a>
            <a href="#contact" className="foot-link">Contact</a>
          </div>
          <div>
            <h5 className="text-teal-900 font-sans text-[.82rem] uppercase tracking-wide mb-4 font-semibold">Services</h5>
            <a href="#vcfo" className="foot-link">Virtual CFO</a>
            <a href="#services" className="foot-link">Fundraising</a>
            <a href="#services" className="foot-link">Transaction Advisory</a>
            <a href="#services" className="foot-link">Compliance</a>
            <a href="#services" className="foot-link">Cross-Border</a>
          </div>
          <div>
            <h5 className="text-teal-900 font-sans text-[.82rem] uppercase tracking-wide mb-4 font-semibold">Presence</h5>
            <a href="#presence" className="foot-link">India Presence</a>
            <a href="#presence" className="foot-link">Global Presence</a>
            <a href="#industries" className="foot-link">Industries</a>
            <a href="#contact" className="foot-link">Book a Call</a>
          </div>
        </div>
        <div className="border-t border-line pt-6 flex justify-between flex-wrap gap-3 text-[.84rem]">
          <span>&copy; 2026 Avtaran Capital. All rights reserved.</span>
          <span>www.avtaran.com &middot; Privacy Policy &middot; Terms of Use</span>
        </div>
      </div>
    </footer>
  );
}


export default Footer;
