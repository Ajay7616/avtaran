import { LEGAL as L } from "./legalConfig";

// Each document: { title, intro, sections: [{ id, heading, paras?, items?, table? }] }
// Edit wording here; the page layout is generated automatically.

const officer = L.grievanceOfficerName
  ? `${L.grievanceOfficerName}, Grievance Officer`
  : "The Grievance Officer";

export const LEGAL_DOCS = {
  privacy: {
    seoKey: "privacy",
    title: "Privacy Policy",
    intro: `${L.companyName} ("${L.brand}", "we", "us") respects your privacy. This policy explains what personal data we collect through ${L.website}, why we collect it, who we share it with, how long we keep it, and the choices you have. We handle personal data in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.`,
    sections: [
      {
        id: "who-we-are",
        heading: "1. Who we are",
        paras: [
          `${L.companyName} is a financial and corporate advisory firm based at ${L.address}. For the personal data described below, we decide why and how it is used.`,
          `You can reach us at ${L.email} or ${L.phone}.`,
        ],
      },
      {
        id: "data-we-collect",
        heading: "2. Personal data we collect",
        paras: ["We collect only what you choose to give us, plus limited technical data."],
        items: [
          "Enquiry form: your name, company, email address, phone number, the service you are interested in, and the message you write.",
          "Careers form: your name, email address, phone number, position applied for, portfolio or LinkedIn link, CV or resume file, and cover letter.",
          "Technical data: your IP address and request details, which our servers and hosting providers process briefly to deliver the site, prevent abuse and limit repeated requests. We do not add this to our own records of your enquiry.",
          "Our correspondence with you by email, phone or meeting, if you become a client or contact.",
        ],
      },
      {
        id: "why-we-use",
        heading: "3. Why we use your data",
        items: [
          "To respond to your enquiry and arrange a consultation.",
          "To assess your job application and contact you about opportunities.",
          "To provide and manage our services if you become a client.",
          "To keep the website and our systems secure, and to prevent spam and misuse.",
          "To meet legal, regulatory, accounting and record-keeping duties.",
        ],
        paras2: [
          "We rely mainly on your consent, which you give by ticking the consent box on our forms. You can withdraw it at any time (see section 8). We may also process data where the law allows or requires it, for example to meet legal obligations or respond to a legal claim.",
        ],
      },
      {
        id: "sharing",
        heading: "4. Who we share data with",
        paras: [
          "We do not sell your personal data. We share it only with the following, and only as needed:",
        ],
        items: [
          "Service providers that run our website and systems, such as website and server hosting, database hosting, file storage for CVs, and email delivery. They act on our instructions.",
          "Our professional advisers, auditors and regulators or authorities, where required by law.",
          "Other firms or specialists, only when you have asked us to involve them in your matter.",
          "A buyer or successor, if our business is restructured or transferred, who must continue to protect your data.",
        ],
        paras2: [
          "Our pages load fonts from Google Fonts, which means your browser contacts Google servers and your IP address is visible to Google when a page loads.",
        ],
      },
      {
        id: "transfers",
        heading: "5. Storage and transfers outside India",
        paras: [
          "Some of our service providers store or process data on servers located outside India. Where this happens, we use providers that apply security measures appropriate to the data, and we transfer data only as permitted by Indian law.",
        ],
      },
      {
        id: "retention",
        heading: "6. How long we keep data",
        items: [
          `Enquiries: ${L.retentionEnquiries}, unless you ask us to delete them sooner or the law requires us to keep records longer.`,
          `Job applications: ${L.retentionApplications}, unless you agree to a longer period for future openings.`,
          "Client records: for as long as the engagement lasts and for the period required by law afterwards.",
        ],
        paras2: ["When data is no longer needed, we delete or anonymise it."],
      },
      {
        id: "security",
        heading: "7. How we protect data",
        paras: [
          "We use reasonable security safeguards, including encrypted connections (HTTPS), access controls on our admin area, and limits on who can see submitted forms. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a data breach affects you, we will tell you and the authorities as the law requires.",
        ],
      },
      {
        id: "rights",
        heading: "8. Your rights",
        paras: ["Under Indian data protection law you can ask us to:"],
        items: [
          "Tell you what personal data of yours we hold and how we use it.",
          "Correct or complete inaccurate data.",
          "Erase your data, unless we must keep it for a legal reason.",
          "Withdraw your consent. This does not affect what we did before you withdrew it.",
          "Nominate another person to exercise your rights if you die or become unable to do so.",
          "Resolve a complaint about how we handle your data.",
        ],
        paras2: [
          `To use any of these rights, email ${L.grievanceOfficerEmail}. We may need to confirm your identity first, and we will reply within the time the law allows. If you are not satisfied, you may complain to the Data Protection Board of India once it is operational.`,
        ],
      },
      {
        id: "children",
        heading: "9. Children",
        paras: [
          "Our website and services are not directed at anyone under 18. We do not knowingly collect data from children. If you believe a child has sent us data, contact us and we will delete it.",
        ],
      },
      {
        id: "cookies",
        heading: "10. Cookies",
        paras: [
          "We do not place cookies or similar tracking tools on visitors' browsers. Details are in our Cookie Policy.",
        ],
      },
      {
        id: "links",
        heading: "11. Links to other sites",
        paras: [
          "Our website may link to other sites. We are not responsible for their content or privacy practices, so please read their policies.",
        ],
      },
      {
        id: "changes",
        heading: "12. Changes to this policy",
        paras: [
          `We may update this policy from time to time. The date at the top shows the latest version (${L.effectiveDate}). If a change is significant, we will give notice on the website and ask for fresh consent where the law requires it.`,
        ],
      },
      {
        id: "contact",
        heading: "13. Contact and grievances",
        paras: [
          `${officer}, ${L.companyName}, ${L.address}.`,
          `Email: ${L.grievanceOfficerEmail}  |  Phone: ${L.phone}`,
        ],
      },
    ],
  },

  terms: {
    seoKey: "terms",
    title: "Terms of Use",
    intro: `These terms govern your use of ${L.website}, operated by ${L.companyName}. By using the site you agree to them. If you do not agree, please do not use the site.`,
    sections: [
      {
        id: "about",
        heading: "1. About this website",
        paras: [
          "This website gives general information about our services. It is not a platform for paying for services or for entering into a client relationship by itself.",
        ],
      },
      {
        id: "no-advice",
        heading: "2. No professional advice or offer",
        paras: [
          "The content on this site is for general information only. It is not legal, tax, financial, investment or immigration advice, and it is not an offer or solicitation to buy or sell any security or financial product. Laws, regulations and government policies change, so please speak to us about your specific situation before acting.",
          "Using the site, sending an enquiry or booking a consultation does not create an advisory or client relationship. That relationship begins only when we both sign an engagement letter or proposal.",
        ],
      },
      {
        id: "no-guarantee",
        heading: "3. No guarantee of outcomes",
        paras: [
          "Many of our services depend on decisions made by third parties, such as regulators, banks, investors and foreign governments. We cannot guarantee that an application, approval, residency or citizenship outcome, funding round, loan or transaction will succeed or happen within a certain time.",
        ],
      },
      {
        id: "use",
        heading: "4. Acceptable use",
        paras: ["You agree not to:"],
        items: [
          "Use the site for any unlawful purpose or in a way that harms others.",
          "Submit false, misleading or someone else's personal information.",
          "Try to gain unauthorised access to the site, the admin area or our servers.",
          "Upload malware or send automated, spam or excessive requests.",
          "Copy, scrape or republish our content in bulk without our written permission.",
        ],
      },
      {
        id: "forms",
        heading: "5. What you send us",
        paras: [
          `When you use our forms, you confirm that the information is yours to share and is accurate. We use it as described in our Privacy Policy. Please do not send sensitive information such as passwords, card numbers or government ID numbers through the forms.`,
        ],
      },
      {
        id: "ip",
        heading: "6. Intellectual property",
        paras: [
          `The text, design, logo, graphics and other content on this site belong to ${L.companyName} or its licensors and are protected by law. You may view and print pages for your own personal, non-commercial use. Any other use needs our written permission.`,
        ],
      },
      {
        id: "links",
        heading: "7. Third-party links",
        paras: [
          "We may link to websites run by others. We do not control or endorse them and are not responsible for them.",
        ],
      },
      {
        id: "warranty",
        heading: "8. Availability and disclaimer",
        paras: [
          "We work to keep the site accurate and available, but we provide it on an \"as is\" and \"as available\" basis. We do not promise it will be error-free, uninterrupted or fully up to date.",
        ],
      },
      {
        id: "liability",
        heading: "9. Limitation of liability",
        paras: [
          "To the extent allowed by law, we are not liable for any loss or damage arising from your use of, or reliance on, this website, including indirect or consequential loss. Nothing in these terms limits liability that cannot be limited under Indian law. Liability for paid services is governed by the engagement letter for those services.",
        ],
      },
      {
        id: "law",
        heading: "10. Governing law and disputes",
        paras: [
          `These terms are governed by the laws of India. The courts at ${L.governingCity} have exclusive jurisdiction over any dispute arising from them, subject to any dispute-resolution clause in a signed engagement letter.`,
        ],
      },
      {
        id: "changes",
        heading: "11. Changes",
        paras: [
          `We may update these terms. The latest version is always on this page, with the date ${L.effectiveDate}. Continued use after a change means you accept the new terms.`,
        ],
      },
      {
        id: "contact",
        heading: "12. Contact",
        paras: [`${L.companyName}, ${L.address}.`, `Email: ${L.email}  |  Phone: ${L.phone}`],
      },
    ],
  },

  refund: {
    seoKey: "refund",
    title: "Refund & Cancellation Policy",
    intro: `This policy explains how fees, cancellations and refunds work for services provided by ${L.companyName}. It is a general summary. The engagement letter or proposal you sign for a specific service is the final word on that service.`,
    sections: [
      {
        id: "payments",
        heading: "1. No payments on this website",
        paras: [
          "You cannot pay for services through this website. Our fees are agreed in writing before work starts, in a proposal or engagement letter, and are paid by bank transfer or other methods stated in that document.",
        ],
      },
      {
        id: "consultation",
        heading: "2. Consultations",
        paras: [
          "An initial consultation to understand your needs is offered without obligation. You are free to decide not to proceed, and you owe nothing for that first conversation.",
        ],
      },
      {
        id: "engagement-terms",
        heading: "3. Engagement terms come first",
        paras: [
          "If your engagement letter contains refund or cancellation terms, those terms apply and override this page wherever they differ.",
        ],
      },
      {
        id: "cancel",
        heading: "4. Cancelling a service",
        items: [
          "You may cancel in writing by emailing us. Cancellation takes effect from the date we receive your notice.",
          "If we have not started work, you may request a refund of fees paid in advance for that work.",
          "If work has started, you pay for work already done up to the cancellation date, and we may refund any unused part of an advance.",
          "For ongoing retainers (such as Virtual CFO services), cancellation follows the notice period stated in your engagement letter.",
        ],
      },
      {
        id: "non-refundable",
        heading: "5. What is not refundable",
        items: [
          "Fees for work already completed or delivered.",
          "Government, regulator, stamp duty, filing, registration and similar third-party charges that we have paid or must pay on your behalf.",
          "Fees where a third party declines or delays an outcome (for example a regulator, bank, investor or foreign government), because we cannot guarantee those decisions, unless your engagement letter says otherwise.",
          "Costs we incur for third-party professionals or services you asked us to arrange.",
        ],
      },
      {
        id: "if-we-fail",
        heading: "6. If we cannot deliver",
        paras: [
          "If we are unable to provide a service we agreed to, we will refund the fees paid for the part we did not deliver.",
        ],
      },
      {
        id: "how",
        heading: "7. How to request a refund",
        paras: [
          `Email ${L.email} with your name, the service, the date and amount of payment, and the reason for your request. Please send it within ${L.refundRequestWindow} of the event you are relying on (for example, the cancellation or the missed delivery). We will review it and tell you our decision in writing.`,
          `Approved refunds are paid back to the original payment method or bank account within ${L.refundProcessingTime} of approval.`,
        ],
      },
      {
        id: "disputes",
        heading: "8. Questions or disputes",
        paras: [
          `If you disagree with a decision, write to us at ${L.grievanceOfficerEmail} and we will look at it again. These terms are governed by Indian law, with disputes subject to the courts at ${L.governingCity}.`,
        ],
      },
      {
        id: "contact",
        heading: "9. Contact",
        paras: [`${L.companyName}, ${L.address}.`, `Email: ${L.email}  |  Phone: ${L.phone}`],
      },
    ],
  },

  cookies: {
    seoKey: "cookies",
    title: "Cookie Policy",
    intro: `This policy explains how ${L.website} uses cookies. Last updated ${L.effectiveDate}.`,
    sections: [
      {
        id: "what",
        heading: "1. What are cookies?",
        paras: [
          "Cookies are small text files that a website stores on your device. They can remember your settings or track how you use a site.",
        ],
      },
      {
        id: "visitors",
        heading: "2. Visitors to our website",
        paras: [
          "We do not set cookies, or use local storage, advertising tools or analytics trackers, on the devices of visitors to this website. Because of this, we do not show a cookie banner. The only information we store from visitors is what you choose to send us through our contact and careers forms, as described in our Privacy Policy.",
        ],
      },
      {
        id: "third-party",
        heading: "3. Third-party content",
        paras: [
          "Our pages load fonts from Google Fonts. This is a request made by your browser, not a cookie we set, and it makes your IP address visible to Google. See Google's privacy policy for details.",
        ],
      },
      {
        id: "changes",
        heading: "4. If this changes",
        paras: [
          "If we ever add analytics or other optional tools, we will update this policy first and ask for your consent through a cookie banner before they run.",
        ],
      },
      {
        id: "more",
        heading: "5. Questions",
        paras: [
          `Our Privacy Policy explains how we handle personal data. For questions about this policy, email ${L.email}.`,
        ],
      },
    ],
  },
};
