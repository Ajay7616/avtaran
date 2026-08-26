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
  }
);

const careerApplicationSchema =
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      position: {
        type: String,
        required: true,
        trim: true,
      },

      portfolio: {
        type: String,
        trim: true,
      },

      coverLetter: {
        type: String,
      },

      resume: {
        type: resumeSchema,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "CareerApplication",
  careerApplicationSchema
);