const fs = require("fs");
const path = require("path");
const Brochure = require("../models/brochure");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create brochure
const createBrochure = async (req, res) => {
  try {
    const { name, location } = req.body;

    // Retrieve the uploaded image and pdf paths
    const image = req.files["images"] ? req.files["images"][0].path : null;
    const pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;

    const newBrochure = new Brochure({
      name,
      location,
      image,
      pdf,
    });

    await newBrochure.save();

    res.status(201).json({
      success: true,
      message: "Brochure created successfully!",
      brochure: newBrochure,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch all the brochures
const getBrochure = async (req, res) => {
  try {
    const brochure = await Brochure.find();
    res.status(200).json({
      success: true,
      message: "All brochures fetched !",
      brochure,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

// Fetch a single Brochure
const getSingleBrochure = async (req, res) => {
  try {
    const brochureId = req.params.id;
    const brochure = await Brochure.findById(brochureId);

    if (!brochure) {
      return res
        .status(404)
        .json({ success: false, message: "Brochure not found" });
    }

    res.status(200).json({
      success: true,
      message: "Brochure found!",
      brochure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Intenal Server Error",
      error,
    });
  }
};

// Delete a brochure
const deleteBrochure = async (req, res) => {
  try {
    const brochureId = req.params.id;
    const deletedBrochure = await Brochure.findByIdAndDelete(brochureId);

    if (!deletedBrochure) {
      return res.status(404).json({
        success: false,
        message: "Brochure not found",
      });
    }

    // Helper function to extract Cloudinary public ID
    const getPublicId = (url) => {
      return url.split("/").slice(-2).join("/").split(".")[0]; // Extracts "brochures/hpah6bzrdsyij8zlqpbv"
    };

    // Delete image from Cloudinary
    if (deletedBrochure.image) {
      const oldImagePublicId = getPublicId(deletedBrochure.image);
      cloudinary.uploader.destroy(oldImagePublicId, (err, result) => {
        if (err) {
          console.error(`Error deleting old image from Cloudinary: ${err.message}`);
        } else {
          console.log(`Cloudinary delete result (image): ${result}`);
        }
      });
    }

    // Delete PDF from Cloudinary
    if (deletedBrochure.pdf) {
      const oldPdfPublicId = getPublicId(deletedBrochure.pdf);
      cloudinary.uploader.destroy(oldPdfPublicId, { resource_type: "raw" }, (err, result) => {
        if (err) {
          console.error(`Error deleting old PDF from Cloudinary: ${err.message}`);
        }
      });
    }

    const brochures = await Brochure.find(); // Fetch remaining brochures

    res.status(200).json({
      success: true,
      message: "Brochure deleted successfully",
      brochures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};


// Update Brochure
const updateBrochure = async (req, res) => {
  try {
    const brochureId = req.params.id;
    const { name, location } = req.body;

    // Fetch the current brochure document
    const existingBrochure = await Brochure.findById(brochureId);

    if (!existingBrochure) {
      return res.status(404).json({
        success: false,
        message: "Brochure not found",
      });
    }

    let updatedFields = { name, location };

    // Helper function to extract Cloudinary public ID
    const getPublicId = (url) => {
      return url.split("/").slice(-2).join("/").split(".")[0];
    };

    // Handle image upload
    if (req.files && req.files.images) {
      const imagePath = req.files.images[0].path;
      updatedFields.image = imagePath;

      // Delete old image from Cloudinary
      if (existingBrochure.image) {
        const oldImagePublicId = getPublicId(existingBrochure.image);
        cloudinary.uploader.destroy(oldImagePublicId, (err, result) => {
          if (err) {
            console.error(`Error deleting old image from Cloudinary: ${err.message}`);
          }
        });
      }
    }

    // Handle PDF upload
    if (req.files && req.files.pdf) {
      const pdfPath = req.files.pdf[0].path;
      updatedFields.pdf = pdfPath;

      // Delete old PDF from Cloudinary
      if (existingBrochure.pdf) {
        const oldPdfPublicId = getPublicId(existingBrochure.pdf);
        cloudinary.uploader.destroy(oldPdfPublicId, { resource_type: "raw" }, (err, result) => {
          if (err) {
            console.error(`Error deleting old PDF from Cloudinary: ${err.message}`);
          } else {
            console.log(`Cloudinary delete result (PDF): ${result}`);
          }
        });
      }
    }

    // Update the brochure item
    const updatedBrochure = await Brochure.findByIdAndUpdate(
      brochureId,
      updatedFields,
      { new: true }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Brochure updated successfully",
      brochure: updatedBrochure,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};


module.exports = {
  createBrochure,
  getBrochure,
  getSingleBrochure,
  deleteBrochure,
  updateBrochure,
};
