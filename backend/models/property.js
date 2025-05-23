const mongoose = require("mongoose");
const slugify = require("slugify");

const propertySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    propertyType: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true
    },
    builder: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    sizeUnit: {
      type: String,
      enum: ["sqFt", "yard"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    furnishType: {
      type: String,
      enum: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
      required: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
        required: true,
      },
    ],
    image: {
      type: [String],
      required: true,
    },
    video: {
      type: [String],
      required: false,
    },
    dp: {
      type: [String],
      required: false,
    },
    projectSize: {
      type: String,
      required: false,
    },
    projectStatus: {
      type: String,
      required: false,
    },
    totalUnits: {
      type: Number,
      required: false,
    },
    propertyRera: {
      type: String,
      required: false,
    },
    seoTitle: {
      type: String,
      default: ""
    },
    seoDescription: {
      type: String,
      default: ""
    },
    shouldIndex: {
      type: Boolean,
      default: true
    },
    headCode: {
      type: String,
      default: ""
    },
    footerCode: {
      type: String,
      default: ""
    }

  },
  { timestamps: true }
);

propertySchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${this.location}`, { lower: true, strict: true });
  next();
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
