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

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  try {
    const result = await resend.emails.send({
      from: "Avtaran Capital <noreply@yourdomain.com>",
      to,
      subject,
      html,
      attachments,
    });

    if (result.error) {
      throw result.error;
    }

    console.log("Email sent:");

    return result.data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};