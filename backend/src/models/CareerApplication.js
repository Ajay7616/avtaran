const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    resourceType: {
      type: String,
      default: "raw",
    },

    type: {
      type: String,
      default: "authenticated",
    },

    originalName: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },

    mimetype: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const careerApplicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    portfolio: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    coverLetter: {
      type: String,
      maxlength: 5000,
    },

    consent: {
      given: { type: Boolean, default: false },
      at: { type: Date },
      policyVersion: { type: String },
    },

    status: {
      type: String,
      enum: ["new", "interview", "selected", "rejected"],
      default: "new",
    },

    interviewSchedule: {
      date: { type: String }, // "YYYY-MM-DD"
      time: { type: String }, // "HH:mm"
    },

    // resume: {
    //   type: resumeSchema,
    //   required: true,
    // },
    resume: {
      originalName: { type: String, required: true },
      mimetype: { type: String, required: true },
      size: { type: Number, required: true },

      cloudinary: {
        publicId: { type: String, required: true },
        format: { type: String },
        resourceType: { type: String },
        bytes: { type: Number },
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);
