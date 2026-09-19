const Contact = require("../models/Contact");
const CareerApplication = require("../models/CareerApplication");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
// const path = require("path");
// const fs = require("fs");
const { sendEmail } = require("../config/mail");
const { getSignedResumeUrl } = require("../utils/cloudinaryResume");


// ==============================
// CONTACTS
// ==============================
const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const formatInterviewDateTime = (schedule) => {
  if (!schedule?.date) return "";

  try {
    const [year, month, day] = schedule.date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);

    const dateLabel = dateObj.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const timeLabel = schedule.time
      ? new Date(`2000-01-01T${schedule.time}`).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "";

    return timeLabel ? `${dateLabel} at ${timeLabel}` : dateLabel;
  } catch (error) {
    return `${schedule.date} ${schedule.time || ""}`.trim();
  }
};

/**
 * Shared branded email shell for career status updates.
 */
const buildStatusEmailHtml = ({
  firstName,
  position,
  headline,
  intro,
  statusLabel,
  statusNote,
  accentColor = "#c99a2e",
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${headline}</title>
</head>

<body style="margin:0;padding:0;background:#f6f1e7;font-family:Arial, Helvetica, sans-serif;color:#253238;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f1e7;">
  <tr>
    <td align="center" style="padding:40px 15px;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(14,40,49,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0e2831;padding:38px 40px;text-align:center;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#c99a2e;font-weight:700;margin-bottom:14px;">
              AVTARAN CAPITAL
            </div>
            <div style="color:#ffffff;font-size:28px;line-height:1.3;font-weight:700;">
              ${headline}
            </div>
          </td>
        </tr>

        <!-- Accent line -->
        <tr>
          <td style="height:4px;background:${accentColor};font-size:0;line-height:0;"></td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px;">

            <div style="color:#0e2831;font-size:20px;font-weight:700;margin-bottom:18px;">
              Hi ${escapeHtml(firstName)},
            </div>

            <div style="color:#526066;font-size:15px;line-height:1.8;">
              ${intro}
            </div>

            <!-- Status card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;background:#faf8f3;border:1px solid #e3ddd1;border-radius:12px;">
              <tr>
                <td style="padding:22px;">
                  <div style="color:#a47b20;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin-bottom:8px;">
                    Application Status — ${escapeHtml(position)}
                  </div>
                  <div style="color:#0e2831;font-size:16px;font-weight:700;">
                    ${statusLabel}
                  </div>
                  <div style="color:#6b777b;font-size:13px;line-height:1.6;margin-top:7px;">
                    ${statusNote}
                  </div>
                </td>
              </tr>
            </table>

            <div style="margin-top:30px;padding-top:25px;border-top:1px solid #e3ddd1;color:#7a8589;font-size:12px;line-height:1.6;">
              Please keep this email for your records. There is no need to reply to this automated notification.
            </div>

            <div style="margin-top:32px;color:#0e2831;font-size:15px;line-height:1.7;">
              Regards,<br />
              <strong>Avtaran Capital</strong><br />
              <span style="color:#7a8589;font-size:13px;">Talent &amp; Careers</span>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f2eee6;padding:24px 40px;text-align:center;">
            <div style="color:#0e2831;font-size:13px;font-weight:700;">AVTARAN CAPITAL</div>
            <div style="margin-top:6px;color:#7a8589;font-size:11px;">Building careers. Creating opportunities.</div>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;

const STATUS_EMAIL_CONTENT = {
  interview: {
    subject: "You've Been Shortlisted for an Interview — Avtaran Capital",
    getBody: (application) => {
      const scheduleLabel = formatInterviewDateTime(
        application.interviewSchedule,
      );

      return buildStatusEmailHtml({
        firstName: application.firstName,
        position: application.position,
        headline: "Interview Shortlist",
        intro: `Great news! We've reviewed your application for the <strong style="color:#0e2831;">${escapeHtml(
          application.position,
        )}</strong> position and would like to move forward with an interview.`,
        statusLabel: "Shortlisted for Interview",
        statusNote: scheduleLabel
          ? `Your interview is scheduled for <strong style="color:#0e2831;">${escapeHtml(
              scheduleLabel,
            )}</strong>. Our team will share further details (venue/link) shortly.`
          : "Our team will reach out shortly to schedule a time that works for you.",
        accentColor: "#c99a2e",
      });
    },
  },
  selected: {
    subject: "Congratulations — You've Been Selected! — Avtaran Capital",
    getBody: (application) =>
      buildStatusEmailHtml({
        firstName: application.firstName,
        position: application.position,
        headline: "Congratulations!",
        intro: `We're delighted to let you know that you've been selected for the <strong style="color:#0e2831;">${escapeHtml(
          application.position,
        )}</strong> position.`,
        statusLabel: "Selected",
        statusNote:
          "We'll be in touch shortly with next steps and onboarding details.",
        accentColor: "#2f8c5a",
      }),
  },
  rejected: {
    subject: "Update on Your Application — Avtaran Capital",
    getBody: (application) =>
      buildStatusEmailHtml({
        firstName: application.firstName,
        position: application.position,
        headline: "Application Update",
        intro: `Thank you for applying for the <strong style="color:#0e2831;">${escapeHtml(
          application.position,
        )}</strong> position and for taking the time to share your background with us.`,
        statusLabel: "Not Selected",
        statusNote:
          "After careful review, we've decided not to move forward at this time. We appreciate your interest and wish you the best in your search.",
        accentColor: "#a33",
      }),
  },
};

const buildContactReplyEmailHtml = ({ name, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Response to Your Enquiry</title>
</head>

<body style="margin:0;padding:0;background:#f6f1e7;font-family:Arial, Helvetica, sans-serif;color:#253238;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f1e7;">
  <tr>
    <td align="center" style="padding:40px 15px;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(14,40,49,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0e2831;padding:38px 40px;text-align:center;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#c99a2e;font-weight:700;margin-bottom:14px;">
              AVTARAN CAPITAL
            </div>
            <div style="color:#ffffff;font-size:28px;line-height:1.3;font-weight:700;">
              Response to Your Enquiry
            </div>
          </td>
        </tr>

        <!-- Accent line -->
        <tr>
          <td style="height:4px;background:#2e7189;font-size:0;line-height:0;"></td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px;">

            <div style="color:#0e2831;font-size:20px;font-weight:700;margin-bottom:18px;">
              Hi ${escapeHtml(name)},
            </div>

            <div style="color:#526066;font-size:15px;line-height:1.8;">
              Thank you for reaching out to <strong style="color:#0e2831;">Avtaran Capital</strong>. Here's our response to your enquiry:
            </div>

            <!-- Message card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;background:#faf8f3;border:1px solid #e3ddd1;border-radius:12px;">
              <tr>
                <td style="padding:22px;">
                  <div style="color:#0e2831;font-size:14px;line-height:1.8;">
                    ${escapeHtml(message).replace(/\n/g, "<br />")}
                  </div>
                </td>
              </tr>
            </table>

            <div style="margin-top:30px;padding-top:25px;border-top:1px solid #e3ddd1;color:#7a8589;font-size:12px;line-height:1.6;">
              If you have further questions, feel free to reply directly to this email.
            </div>

            <div style="margin-top:32px;color:#0e2831;font-size:15px;line-height:1.7;">
              Regards,<br />
              <strong>Avtaran Capital</strong>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f2eee6;padding:24px 40px;text-align:center;">
            <div style="color:#0e2831;font-size:13px;font-weight:700;">AVTARAN CAPITAL</div>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status = "" } = req.query;

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const skip = (pageNumber - 1) * limitNumber;

    const query = {};

    // Status filter
    if (status) {
      query.status = status;
    }

    // Search
    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      query.$or = [
        { name: searchRegex },
        { company: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { service: searchRegex },
        { message: searchRegex },
      ];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Contact.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,

      data: contacts,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Get contacts error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contacts.",
    });
  }
};

// Get single contact
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get contact error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch contact.",
    });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { status, replyMessage } = req.body;

    const allowedStatuses = ["new", "read", "replied", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status.",
      });
    }

    if (status === "replied" && !replyMessage?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    if (status === "replied" && contact.email) {
      try {
        await sendEmail({
          to: contact.email,
          subject: "Re: Your Enquiry — Avtaran Capital",
          html: buildContactReplyEmailHtml({
            name: contact.name,
            message: replyMessage,
          }),
        });
      } catch (mailError) {
        console.error("Contact reply email error:", mailError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Contact status updated.",
      data: contact,
    });
  } catch (error) {
    console.error("Update contact status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update contact status.",
    });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact enquiry deleted.",
    });
  } catch (error) {
    console.error("Delete contact error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete contact.",
    });
  }
};

// ==============================
// CAREER APPLICATIONS
// ==============================

// Get all career applications
const getCareerApplications = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      position = "",
    } = req.query;

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);

    const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const skip = (pageNumber - 1) * limitNumber;

    const query = {};

    // Status filter
    if (status) {
      query.status = status;
    }

    // Position filter
    if (position.trim()) {
      query.position = new RegExp(position.trim(), "i");
    }

    // Search
    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { position: searchRegex },
      ];
    }

    const [applications, total] = await Promise.all([
      CareerApplication.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      CareerApplication.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,

      data: applications,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Get career applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications.",
    });
  }
};

// Get single career application
const getCareerApplication = async (req, res) => {
  try {
    const application = await CareerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Career application not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Get career application error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch application.",
    });
  }
};

// Update career application status
const updateCareerStatus = async (req, res) => {
  try {
    const { status, interviewDate, interviewTime } = req.body;

    const allowedStatuses = ["new", "interview", "selected", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const updateFields = { status };

    if (status === "interview") {
      if (!interviewDate || !interviewTime) {
        return res.status(400).json({
          success: false,
          message: "Interview date and time are required.",
        });
      }

      updateFields.interviewSchedule = { date: interviewDate, time: interviewTime };
    }

    const application = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Career application not found.",
      });
    }

    const emailContent = STATUS_EMAIL_CONTENT[status];

    if (emailContent && application.email) {
      try {
        await sendEmail({
          to: application.email,
          subject: emailContent.subject,
          html: emailContent.getBody(application),
        });
      } catch (mailError) {
        console.error("Career status email error:", mailError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Application status updated.",
      data: application,
    });
  } catch (error) {
    console.error("Update career status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update application status.",
    });
  }
};
// Delete career application
// const deleteCareerApplication = async (req, res) => {
//   try {
//     const application = await CareerApplication.findByIdAndDelete(
//       req.params.id,
//     );

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Career application not found.",
//       });
//     }

//     // Delete resume file
//     if (application.resume?.path) {
//       const resumePath = path.resolve(application.resume.path);

//       if (fs.existsSync(resumePath)) {
//         fs.unlinkSync(resumePath);
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: "Career application deleted.",
//     });
//   } catch (error) {
//     console.error("Delete career application error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Unable to delete application.",
//     });
//   }
// };

const cloudinary = require("../config/cloudinary");

const deleteCareerApplication = async (req, res) => {
  try {
    const application = await CareerApplication.findByIdAndDelete(
      req.params.id,
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Career application not found.",
      });
    }

    // Delete resume from Cloudinary
    const cloudinaryInfo = application.resume?.cloudinary;

    if (cloudinaryInfo?.publicId) {
      try {
        await cloudinary.uploader.destroy(cloudinaryInfo.publicId, {
          resource_type: "raw",
          type: "authenticated",
          invalidate: true,
        });
      } catch (cloudinaryError) {
        // Application record is already deleted — log but don't fail the request
        console.error("Cloudinary resume delete error:", cloudinaryError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Career application deleted.",
    });
  } catch (error) {
    console.error("Delete career application error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete application.",
    });
  }
};

// const downloadResume = async (req, res) => {
//   try {
//     //.log("\n================ DOWNLOAD RESUME ================");

//     //console.log("ID:", req.params.id);

//     const application = await CareerApplication.findById(req.params.id);

//     if (!application) {
//       //console.log("APPLICATION NOT FOUND");

//       return res.status(404).json({
//         success: false,
//         message: "Career application not found.",
//       });
//     }

//     //console.log("RESUME:", application.resume);

//     if (!application.resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume information not found.",
//       });
//     }

//     const filename = application.resume.filename;

//     //console.log("FILENAME:", filename);

//     if (!filename) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume filename not found.",
//       });
//     }

//     // ============================================
//     // IMPORTANT
//     // ============================================

//     const uploadsDir = path.resolve(__dirname, "../../uploads");

//     const resumePath = path.resolve(uploadsDir, filename);

//     //console.log("CONTROLLER DIRECTORY:");

//     //console.log(__dirname);

//     //console.log("UPLOADS DIRECTORY:");

//     //console.log(uploadsDir);

//     //console.log("FINAL RESUME PATH:");

//     //console.log(resumePath);

//     //console.log("UPLOADS DIRECTORY EXISTS:");

//     //console.log(fs.existsSync(uploadsDir));

//     //console.log("RESUME FILE EXISTS:");

//     //console.log(fs.existsSync(resumePath));

//     // ============================================
//     // If uploads folder exists, show files
//     // ============================================

//     if (fs.existsSync(uploadsDir)) {
//       const files = fs.readdirSync(uploadsDir);

//       //console.log("FILES IN UPLOADS:");

//       //console.log(files);
//     }

//     //console.log("=================================================\n");

//     // ============================================
//     // File not found
//     // ============================================

//     if (!fs.existsSync(resumePath)) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume file not found on server.",
//         debug: {
//           uploadsDir,
//           filename,
//           resumePath,
//         },
//       });
//     }

//     // ============================================
//     // Download
//     // ============================================

//     return res.download(
//       resumePath,
//       application.resume.originalName || filename,
//       (error) => {
//         if (error) {
//           console.error("Download failed:", error);

//           if (!res.headersSent) {
//             res.status(500).json({
//               success: false,
//               message: "Unable to download resume.",
//             });
//           }
//         }
//       },
//     );
//   } catch (error) {
//     console.error("Download resume error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to download resume.",
//     });
//   }
// };

const downloadResume = async (req, res) => {
  try {
    const application = await CareerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Career application not found.",
      });
    }

    const cloudinaryInfo = application.resume?.cloudinary;

    if (!cloudinaryInfo?.publicId) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found.",
      });
    }

    const downloadUrl = getSignedResumeUrl(
      cloudinaryInfo.publicId,
      cloudinaryInfo.format,
      60 * 5, // 5-minute link, generated fresh on each request
    );

    return res.redirect(downloadUrl);
  } catch (error) {
    console.error("Download resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to download resume.",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalContacts,
      newContacts,
      totalApplications,
      newApplications,
      shortlistedApplications,
      hiredApplications,
      recentContacts,
      recentApplications,
    ] = await Promise.all([
      Contact.countDocuments(),

      Contact.countDocuments({
        status: "new",
      }),

      CareerApplication.countDocuments(),

      CareerApplication.countDocuments({
        status: "new",
      }),

      CareerApplication.countDocuments({
        status: "shortlisted",
      }),

      CareerApplication.countDocuments({
        status: "hired",
      }),

      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name company email service message status createdAt")
        .lean(),

      CareerApplication.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "firstName lastName email phone position status createdAt resume.originalName",
        )
        .lean(),
    ]);

    return res.status(200).json({
      success: true,

      data: {
        stats: {
          totalContacts,
          newContacts,

          totalApplications,
          newApplications,

          shortlistedApplications,
          hiredApplications,
        },

        recentContacts,

        recentApplications,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard statistics.",
    });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Get admin profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch admin profile.",
    });
  }
};

const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least 8 characters.",
      });
    }

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      admin.password,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 12);

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password.",
    });
  }
};

module.exports = {
  getDashboardStats,
  getAdminProfile,
  changeAdminPassword,

  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,

  getCareerApplications,
  getCareerApplication,
  updateCareerStatus,
  deleteCareerApplication,
  downloadResume,
};
