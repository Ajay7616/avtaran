const CareerApplication = require("../models/CareerApplication");
const { sendEmail } = require("../config/mail");

/**
 * Escape user-provided values before inserting them into HTML emails.
 */
const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Make a safe URL for an href.
 */
const safeUrl = (value = "") => {
  const url = String(value).trim();

  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const createCareerApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      portfolio,
      coverLetter,
    } = req.body;

    // ==========================================
    // Validate required fields
    // ==========================================

    if (!firstName || !lastName || !email || !phone || !position) {
      return res.status(400).json({
        success: false,
        message:
          "First name, last name, email, phone and position are required.",
      });
    }

    // ==========================================
    // Validate resume
    // ==========================================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your CV / Resume.",
      });
    }

    // ==========================================
    // Prepare values
    // ==========================================

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safePosition = escapeHtml(position);
    const safePortfolio = escapeHtml(portfolio || "");
    const safeCoverLetter = escapeHtml(coverLetter || "");

    const portfolioUrl = safeUrl(portfolio);

    // ==========================================
    // Resume path
    // ==========================================
    //
    // req.file.path on Windows:
    //
    // D:\Ajay Programmers\avtaran\backend\uploads\
    // 1787730043339-869011980.pdf
    //
    // We only store:
    //
    // uploads/1787730043339-869011980.pdf
    //
    // ==========================================

    const resumePath = `uploads/${req.file.filename}`;

    // ==========================================
    // Save application
    // ==========================================

    const application = await CareerApplication.create({
      firstName,
      lastName,
      email,
      phone,
      position,
      portfolio,
      coverLetter,

      resume: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: resumePath,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });

    //console.log("Career application saved:", application._id);

    // ==========================================
    // Resume information
    // ==========================================

    const resumeSize = (req.file.size / 1024 / 1024).toFixed(2);

    const resumeType = escapeHtml(req.file.mimetype);

    const resumeName = escapeHtml(req.file.originalname);

    // ==========================================
    // Portfolio button
    // ==========================================

    const portfolioButton = portfolioUrl
      ? `
        <a
          href="${portfolioUrl}"
          target="_blank"
          style="
            display:inline-block;
            padding:12px 22px;
            background:#c99a2e;
            color:#0e2831;
            text-decoration:none;
            border-radius:8px;
            font-size:14px;
            font-weight:700;
          "
        >
          View Portfolio / LinkedIn
        </a>
      `
      : `
        <span
          style="
            color:#777;
            font-size:14px;
          "
        >
          Not provided
        </span>
      `;

    // ==========================================
    // ADMIN EMAIL
    // ==========================================

    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,

        subject: `New Career Application — ${position}`,

        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Career Application</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f6f1e7;
    font-family:Arial, Helvetica, sans-serif;
    color:#253238;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f6f1e7;"
>
  <tr>
    <td align="center" style="padding:40px 15px;">

      <!-- Main container -->

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width:680px;
          background:#ffffff;
          border-radius:18px;
          overflow:hidden;
          box-shadow:0 8px 30px rgba(14,40,49,0.08);
        "
      >

        <!-- Header -->

        <tr>
          <td
            style="
              background:#0e2831;
              padding:34px 40px;
            "
          >

            <div
              style="
                font-size:12px;
                letter-spacing:3px;
                text-transform:uppercase;
                color:#c99a2e;
                font-weight:700;
                margin-bottom:12px;
              "
            >
              AVTARAN CAPITAL
            </div>

            <div
              style="
                color:#ffffff;
                font-size:28px;
                line-height:1.25;
                font-weight:700;
              "
            >
              New Career Application
            </div>

            <div
              style="
                margin-top:10px;
                color:#d9e1e4;
                font-size:14px;
                line-height:1.6;
              "
            >
              A new candidate has submitted an application
              through the Avtaran Capital website.
            </div>

          </td>
        </tr>

        <!-- Gold line -->

        <tr>
          <td
            style="
              height:4px;
              background:#c99a2e;
              font-size:0;
              line-height:0;
            "
          >
          </td>
        </tr>

        <!-- Content -->

        <tr>
          <td style="padding:36px 40px;">

            <!-- Applicant -->

            <div
              style="
                font-size:12px;
                letter-spacing:2px;
                text-transform:uppercase;
                color:#a47b20;
                font-weight:700;
                margin-bottom:12px;
              "
            >
              Applicant Details
            </div>

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                border:1px solid #e3ddd1;
                border-radius:12px;
                overflow:hidden;
              "
            >

              <tr>
                <td
                  style="
                    padding:15px 18px;
                    background:#faf8f3;
                    width:35%;
                    color:#68757a;
                    font-size:13px;
                    font-weight:600;
                  "
                >
                  Name
                </td>

                <td
                  style="
                    padding:15px 18px;
                    font-size:14px;
                    color:#0e2831;
                    font-weight:600;
                  "
                >
                  ${safeFirstName} ${safeLastName}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding:15px 18px;
                    background:#faf8f3;
                    color:#68757a;
                    font-size:13px;
                    font-weight:600;
                  "
                >
                  Email
                </td>

                <td
                  style="
                    padding:15px 18px;
                    font-size:14px;
                    color:#0e2831;
                  "
                >
                  ${safeEmail}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding:15px 18px;
                    background:#faf8f3;
                    color:#68757a;
                    font-size:13px;
                    font-weight:600;
                  "
                >
                  Phone
                </td>

                <td
                  style="
                    padding:15px 18px;
                    font-size:14px;
                    color:#0e2831;
                  "
                >
                  ${safePhone}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding:15px 18px;
                    background:#faf8f3;
                    color:#68757a;
                    font-size:13px;
                    font-weight:600;
                  "
                >
                  Position
                </td>

                <td
                  style="
                    padding:15px 18px;
                    font-size:14px;
                    color:#0e2831;
                    font-weight:700;
                  "
                >
                  ${safePosition}
                </td>
              </tr>

            </table>

            <!-- Spacer -->

            <div style="height:30px;"></div>

            <!-- Portfolio -->

            <div
              style="
                font-size:12px;
                letter-spacing:2px;
                text-transform:uppercase;
                color:#a47b20;
                font-weight:700;
                margin-bottom:12px;
              "
            >
              Portfolio / LinkedIn
            </div>

            <div
              style="
                padding:20px;
                background:#faf8f3;
                border:1px solid #e3ddd1;
                border-radius:12px;
              "
            >
              ${portfolioButton}

            </div>

            <!-- Spacer -->

            <div style="height:30px;"></div>

            <!-- Cover Letter -->

            <div
              style="
                font-size:12px;
                letter-spacing:2px;
                text-transform:uppercase;
                color:#a47b20;
                font-weight:700;
                margin-bottom:12px;
              "
            >
              Cover Letter
            </div>

            <div
              style="
                padding:20px;
                background:#faf8f3;
                border-left:4px solid #c99a2e;
                border-radius:10px;
                color:#445157;
                font-size:14px;
                line-height:1.75;
              "
            >
              ${
                safeCoverLetter
                  ? safeCoverLetter.replace(/\n/g, "<br />")
                  : "No cover letter provided."
              }
            </div>

            <!-- Spacer -->

            <div style="height:30px;"></div>

            <!-- Resume -->

            <div
              style="
                font-size:12px;
                letter-spacing:2px;
                text-transform:uppercase;
                color:#a47b20;
                font-weight:700;
                margin-bottom:12px;
              "
            >
              Resume / CV
            </div>

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background:#0e2831;
                border-radius:12px;
              "
            >
              <tr>
                <td style="padding:22px;">

                  <div
                    style="
                      color:#ffffff;
                      font-size:16px;
                      font-weight:700;
                      margin-bottom:8px;
                    "
                  >
                    ${resumeName}
                  </div>

                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->

        <tr>
          <td
            style="
              background:#f2eee6;
              padding:25px 40px;
              text-align:center;
            "
          >

            <div
              style="
                color:#0e2831;
                font-size:14px;
                font-weight:700;
              "
            >
              Avtaran Capital
            </div>

            <div
              style="
                margin-top:6px;
                color:#7a8589;
                font-size:12px;
              "
            >
              Talent &amp; Careers
            </div>

          </td>
        </tr>

      </table>

      <!-- Bottom text -->

      <div
        style="
          max-width:600px;
          margin-top:18px;
          color:#8b918f;
          font-size:11px;
          line-height:1.5;
          text-align:center;
        "
      >
        This is an automated notification from the
        Avtaran Capital careers system.
      </div>

    </td>
  </tr>
</table>

</body>
</html>
        `,
      });

      //console.log("Career admin email sent");
    } catch (emailError) {
      console.error("Career admin email failed:", emailError);
    }

    // ==========================================
    // APPLICANT CONFIRMATION EMAIL
    // ==========================================

    try {
      await sendEmail({
        to: email,

        subject: "Application Received — Avtaran Capital",

        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>Application Received</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f6f1e7;
    font-family:Arial, Helvetica, sans-serif;
    color:#253238;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f6f1e7;"
>
  <tr>
    <td align="center" style="padding:40px 15px;">

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width:620px;
          background:#ffffff;
          border-radius:18px;
          overflow:hidden;
          box-shadow:0 8px 30px rgba(14,40,49,0.08);
        "
      >

        <!-- Header -->

        <tr>
          <td
            style="
              background:#0e2831;
              padding:38px 40px;
              text-align:center;
            "
          >

            <div
              style="
                font-size:12px;
                letter-spacing:3px;
                text-transform:uppercase;
                color:#c99a2e;
                font-weight:700;
                margin-bottom:14px;
              "
            >
              AVTARAN CAPITAL
            </div>

            <div
              style="
                color:#ffffff;
                font-size:28px;
                line-height:1.3;
                font-weight:700;
              "
            >
              Application Received
            </div>

          </td>
        </tr>

        <!-- Gold line -->

        <tr>
          <td
            style="
              height:4px;
              background:#c99a2e;
              font-size:0;
              line-height:0;
            "
          >
          </td>
        </tr>

        <!-- Content -->

        <tr>
          <td style="padding:40px;">

            <div
              style="
                color:#0e2831;
                font-size:20px;
                font-weight:700;
                margin-bottom:18px;
              "
            >
              Hi ${safeFirstName},
            </div>

            <div
              style="
                color:#526066;
                font-size:15px;
                line-height:1.8;
              "
            >
              Thank you for your interest in joining
              <strong style="color:#0e2831;">
                Avtaran Capital
              </strong>.
            </div>

            <div
              style="
                color:#526066;
                font-size:15px;
                line-height:1.8;
                margin-top:14px;
              "
            >
              We have successfully received your
              application for the
              <strong style="color:#0e2831;">
                ${safePosition}
              </strong>
              position.
            </div>

            <!-- Status card -->

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                margin-top:30px;
                background:#faf8f3;
                border:1px solid #e3ddd1;
                border-radius:12px;
              "
            >
              <tr>
                <td style="padding:22px;">

                  <div
                    style="
                      color:#a47b20;
                      font-size:11px;
                      letter-spacing:2px;
                      text-transform:uppercase;
                      font-weight:700;
                      margin-bottom:8px;
                    "
                  >
                    Application Status
                  </div>

                  <div
                    style="
                      color:#0e2831;
                      font-size:16px;
                      font-weight:700;
                    "
                  >
                    Successfully Submitted
                  </div>

                  <div
                    style="
                      color:#6b777b;
                      font-size:13px;
                      line-height:1.6;
                      margin-top:7px;
                    "
                  >
                    Your application is now with our
                    recruitment team for review.
                  </div>

                </td>
              </tr>
            </table>

            <div
              style="
                color:#526066;
                font-size:15px;
                line-height:1.8;
                margin-top:28px;
              "
            >
              Our team will carefully review your
              application and contact you if your profile
              matches a suitable opportunity.
            </div>

            <div
              style="
                margin-top:30px;
                padding-top:25px;
                border-top:1px solid #e3ddd1;
                color:#7a8589;
                font-size:12px;
                line-height:1.6;
              "
            >
              Please keep this email for your records.
              There is no need to reply to this automated
              confirmation.
            </div>

            <div
              style="
                margin-top:32px;
                color:#0e2831;
                font-size:15px;
                line-height:1.7;
              "
            >
              Regards,<br />

              <strong>
                Avtaran Capital
              </strong>

              <br />

              <span
                style="
                  color:#7a8589;
                  font-size:13px;
                "
              >
                Talent &amp; Careers
              </span>
            </div>

          </td>
        </tr>

        <!-- Footer -->

        <tr>
          <td
            style="
              background:#f2eee6;
              padding:24px 40px;
              text-align:center;
            "
          >

            <div
              style="
                color:#0e2831;
                font-size:13px;
                font-weight:700;
              "
            >
              AVTARAN CAPITAL
            </div>

            <div
              style="
                margin-top:6px;
                color:#7a8589;
                font-size:11px;
              "
            >
              Building careers. Creating opportunities.
            </div>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
        `,
      });

      //console.log("Career applicant confirmation email sent");
    } catch (emailError) {
      console.error("Career applicant email failed:", emailError);
    }

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message: "Your application has been submitted successfully.",

      data: {
        id: application._id,
      },
    });
  } catch (error) {
    console.error("Career application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit application. Please try again later.",
    });
  }
};

module.exports = {
  createCareerApplication,
};
