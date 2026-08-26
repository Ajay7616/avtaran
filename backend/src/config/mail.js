// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,

//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },

//   connectionTimeout: 15000,
//   greetingTimeout: 15000,
//   socketTimeout: 20000,
// });

// const sendEmail = async ({ to, subject, html, attachments = [] }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Avtaran Capital" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       html,
//       attachments,
//     });

//     console.log("Email sent:", info.messageId);

//     return info;
//   } catch (error) {
//     console.error("Email sending failed:", {
//       code: error.code,
//       command: error.command,
//       message: error.message,
//     });

//     throw error;
//   }
// };

// const verifyEmailConnection = async () => {
//   try {
//     await transporter.verify();
//     console.log("SMTP connection successful");
//   } catch (error) {
//     console.error("SMTP connection failed:", {
//       code: error.code,
//       command: error.command,
//       message: error.message,
//     });
//   }
// };

// verifyEmailConnection();

// module.exports = {
//   sendEmail,
// };

const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error("RESEND_API_KEY is missing");
}

const resend = apiKey ? new Resend(apiKey) : null;

const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      attachments,
    });

    if (result.error) {
      throw result.error;
    }

    console.log("Email sent:", result.data?.id);

    return result.data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};