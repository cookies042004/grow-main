const mongoose = require("mongoose");
const Property = require("../models/property");

const propertyEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    mobile: {
      type: Number,
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brochure",
      required: false,
    },
    reason: {
      type: String,
      required: false,
    },
    dealer: {
      type: String,
      required: false,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const propertyEnquiry = mongoose.model(
  "propertyEnquiry",
  propertyEnquirySchema
);

module.exports = propertyEnquiry;
