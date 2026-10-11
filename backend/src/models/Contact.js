const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
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
      trim: true,
      default: "",
      maxlength: 20,
    },

    service: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50000,
    },

    consent: {
      given: { type: Boolean, default: false },
      at: { type: Date },
      policyVersion: { type: String },
    },

    status: {
      type: String,
      enum: [
        "new",
        "read",
        "replied",
        "closed",
      ],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Contact",
  contactSchema
);