const Contact = require("../models/Contact");
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


const createContact = async (req, res) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      service,
      message,
    } = req.body;

    // ==========================================
    // Validation
    // ==========================================

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }


    // ==========================================
    // Save contact to MongoDB
    // ==========================================

    const contact = await Contact.create({
      name,
      company,
      email,
      phone,
      service,
      message,
    });

    console.log("Contact saved:", contact._id);


    // ==========================================
    // Safe values for HTML email
    // ==========================================

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(
      company || "Not provided"
    );
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(
      phone || "Not provided"
    );
    const safeService = escapeHtml(
      service || "Not selected"
    );

    const safeMessage = escapeHtml(message).replace(
      /\n/g,
      "<br />"
    );


    // ==========================================
    // 1. ADMIN EMAIL
    // ==========================================

    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,

        subject: `New Contact Enquiry — ${name}`,

        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>New Contact Enquiry</title>
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
  style="
    background:#f6f1e7;
  "
>
  <tr>

    <td
      align="center"
      style="
        padding:40px 15px;
      "
    >

      <!-- Main Container -->

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

        <!-- ============================= -->
        <!-- HEADER -->
        <!-- ============================= -->

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
              New Contact Enquiry
            </div>


            <div
              style="
                margin-top:10px;
                color:#d9e1e4;
                font-size:14px;
                line-height:1.6;
              "
            >
              A new enquiry has been submitted
              through the Avtaran Capital website.
            </div>

          </td>

        </tr>


        <!-- ============================= -->
        <!-- GOLD LINE -->
        <!-- ============================= -->

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


        <!-- ============================= -->
        <!-- CONTENT -->
        <!-- ============================= -->

        <tr>

          <td
            style="
              padding:36px 40px;
            "
          >


            <!-- SECTION TITLE -->

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
              Enquiry Details
            </div>


            <!-- DETAILS CARD -->

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

              <!-- NAME -->

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
                    font-weight:700;
                  "
                >
                  ${safeName}
                </td>

              </tr>


              <!-- COMPANY -->

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
                  Company
                </td>

                <td
                  style="
                    padding:15px 18px;
                    font-size:14px;
                    color:#0e2831;
                  "
                >
                  ${safeCompany}
                </td>

              </tr>


              <!-- EMAIL -->

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


              <!-- PHONE -->

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


              <!-- SERVICE -->

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
                  Service
                </td>

                <td
                  style="
                    padding:15px 18px;
                    font-size:14px;
                    color:#0e2831;
                    font-weight:700;
                  "
                >
                  ${safeService}
                </td>

              </tr>

            </table>


            <!-- SPACER -->

            <div style="height:30px;"></div>


            <!-- ============================= -->
            <!-- MESSAGE -->
            <!-- ============================= -->

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
              Message
            </div>


            <div
              style="
                padding:22px;
                background:#faf8f3;
                border-left:4px solid #c99a2e;
                border-radius:10px;
                color:#445157;
                font-size:14px;
                line-height:1.75;
              "
            >
              ${safeMessage}
            </div>


            <!-- ============================= -->
            <!-- APPLICATION ID -->
            <!-- ============================= -->

            <div
              style="
                margin-top:30px;
                padding-top:22px;
                border-top:1px solid #e3ddd1;
                color:#7a8589;
                font-size:12px;
                line-height:1.6;
              "
            >

              <strong
                style="
                  color:#46545a;
                "
              >
                Enquiry ID:
              </strong>

              ${contact._id}

            </div>


          </td>

        </tr>


        <!-- ============================= -->
        <!-- FOOTER -->
        <!-- ============================= -->

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
              Contact Enquiries
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
        Avtaran Capital website.
      </div>

    </td>

  </tr>
</table>

</body>
</html>
        `,
      });

      console.log(
        "Admin email sent successfully"
      );

    } catch (emailError) {

      console.error(
        "Admin email failed:",
        emailError
      );

    }


    // ==========================================
    // 2. VISITOR CONFIRMATION EMAIL
    // ==========================================

    try {

      await sendEmail({

        to: email,

        subject:
          "We received your enquiry — Avtaran Capital",

        html: `
<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Enquiry Received
  </title>

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
  style="
    background:#f6f1e7;
  "
>

  <tr>

    <td
      align="center"
      style="
        padding:40px 15px;
      "
    >


      <!-- MAIN CONTAINER -->

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


        <!-- ============================= -->
        <!-- HEADER -->
        <!-- ============================= -->

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
              Thank You
            </div>

          </td>

        </tr>


        <!-- GOLD LINE -->

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


        <!-- ============================= -->
        <!-- CONTENT -->
        <!-- ============================= -->

        <tr>

          <td
            style="
              padding:40px;
            "
          >


            <div
              style="
                color:#0e2831;
                font-size:20px;
                font-weight:700;
                margin-bottom:18px;
              "
            >
              Hi ${safeName},
            </div>


            <div
              style="
                color:#526066;
                font-size:15px;
                line-height:1.8;
              "
            >
              Thank you for reaching out to
              <strong style="color:#0e2831;">
                Avtaran Capital
              </strong>.
              We have successfully received your enquiry.
            </div>


            <div
              style="
                color:#526066;
                font-size:15px;
                line-height:1.8;
                margin-top:14px;
              "
            >
              Our team will review your message and get
              back to you as soon as possible.
            </div>


            <!-- STATUS CARD -->

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

                <td
                  style="
                    padding:22px;
                  "
                >

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
                    Enquiry Status
                  </div>


                  <div
                    style="
                      color:#0e2831;
                      font-size:16px;
                      font-weight:700;
                    "
                  >
                    Successfully Received
                  </div>


                  <div
                    style="
                      color:#6b777b;
                      font-size:13px;
                      line-height:1.6;
                      margin-top:7px;
                    "
                  >
                    Your enquiry has been sent to our team
                    for review.
                  </div>

                </td>

              </tr>

            </table>


            <!-- RESPONSE -->

            <div
              style="
                color:#526066;
                font-size:15px;
                line-height:1.8;
                margin-top:28px;
              "
            >
              We appreciate you taking the time to
              contact us. A member of our team will be
              in touch with you shortly.
            </div>


            <!-- REFERENCE -->

            <div
              style="
                margin-top:30px;
                padding-top:22px;
                border-top:1px solid #e3ddd1;
                color:#7a8589;
                font-size:12px;
                line-height:1.6;
              "
            >

              <strong
                style="
                  color:#46545a;
                "
              >
                Enquiry Reference:
              </strong>

              ${contact._id}

            </div>


            <!-- SIGNATURE -->

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
                Client Relations
              </span>

            </div>


          </td>

        </tr>


        <!-- ============================= -->
        <!-- FOOTER -->
        <!-- ============================= -->

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
              Thank you for connecting with us.
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


      console.log(
        "Customer confirmation email sent successfully"
      );

    } catch (emailError) {

      console.error(
        "Customer email failed:",
        emailError
      );

    }


    // ==========================================
    // 3. SUCCESS RESPONSE
    // ==========================================

    return res.status(201).json({

      success: true,

      message:
        "Your message has been received successfully.",

      // Uncomment if you want to return the ID
      // data: {
      //   id: contact._id,
      // },

    });


  } catch (error) {

    console.error(
      "Contact form error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Something went wrong while submitting your message.",

    });

  }
};


module.exports = {
  createContact,
};