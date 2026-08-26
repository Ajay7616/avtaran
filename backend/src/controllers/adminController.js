const Contact = require("../models/Contact");
const CareerApplication = require("../models/CareerApplication");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

// ==============================
// CONTACTS
// ==============================

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
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status.",
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
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "reviewing",
      "shortlisted",
      "rejected",
      "hired",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const application = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Career application not found.",
      });
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

    // Delete resume file
    if (application.resume?.path) {
      const resumePath = path.resolve(application.resume.path);

      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
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

const downloadResume = async (req, res) => {
  try {
    //.log("\n================ DOWNLOAD RESUME ================");

    //console.log("ID:", req.params.id);

    const application = await CareerApplication.findById(req.params.id);

    if (!application) {
      //console.log("APPLICATION NOT FOUND");

      return res.status(404).json({
        success: false,
        message: "Career application not found.",
      });
    }

    //console.log("RESUME:", application.resume);

    if (!application.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume information not found.",
      });
    }

    const filename = application.resume.filename;

    //console.log("FILENAME:", filename);

    if (!filename) {
      return res.status(404).json({
        success: false,
        message: "Resume filename not found.",
      });
    }

    // ============================================
    // IMPORTANT
    // ============================================

    const uploadsDir = path.resolve(__dirname, "../../uploads");

    const resumePath = path.resolve(uploadsDir, filename);

    //console.log("CONTROLLER DIRECTORY:");

    //console.log(__dirname);

    //console.log("UPLOADS DIRECTORY:");

    //console.log(uploadsDir);

    //console.log("FINAL RESUME PATH:");

    //console.log(resumePath);

    //console.log("UPLOADS DIRECTORY EXISTS:");

    //console.log(fs.existsSync(uploadsDir));

    //console.log("RESUME FILE EXISTS:");

    //console.log(fs.existsSync(resumePath));

    // ============================================
    // If uploads folder exists, show files
    // ============================================

    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);

      //console.log("FILES IN UPLOADS:");

      //console.log(files);
    }

    //console.log("=================================================\n");

    // ============================================
    // File not found
    // ============================================

    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found on server.",
        debug: {
          uploadsDir,
          filename,
          resumePath,
        },
      });
    }

    // ============================================
    // Download
    // ============================================

    return res.download(
      resumePath,
      application.resume.originalName || filename,
      (error) => {
        if (error) {
          console.error("Download failed:", error);

          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              message: "Unable to download resume.",
            });
          }
        }
      },
    );
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
