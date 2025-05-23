const fs = require("fs");
const path = require("path");
const Testimonials = require("../models/testimonials");

// Create Testimonials
const createTestimonials = async (req, res) => {
  try {
    const { name, role, review } = req.body;
    const imagePath = req.files && req.files.images[0]?.path;
    const testimonial = new Testimonials({
      name,
      role,
      review,
      image: imagePath,
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all the Testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find();
    res.status(201).json({
      success: true,
      message: "All Testimonials fetched !",
      testimonials,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch the single Testimonial
const getSingleTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    const testimonial = await Testimonials.findById(testimonialId);

    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial found successfully",
      testimonial,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err,
    });
  }
};

// Update a amenity
const updateTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;
    const { name, role, review } = req.body;

    // Fetch the existing testimonial
    const existingTestimonial = await Testimonials.findById(testimonialId);
    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Prepare updated fields
    let updatedFields = {};
    if (name) updatedFields.name = name;
    if (role) updatedFields.role = role;
    if (review) updatedFields.review = review;

    // Check if a new image was uploaded
    if (req.files?.images?.[0]) {
      const imagePath = req.files.images[0].path;
      updatedFields.image = imagePath;

      // Delete old image if it exists
      if (existingTestimonial.image) {
        const oldImagePath = path.resolve(__dirname, "..", existingTestimonial.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error(`Error deleting old image: ${err.message}`);
        });
      }
    }

    // Update the testimonial
    const updatedTestimonial = await Testimonials.findByIdAndUpdate(
      testimonialId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Delete Testimonials
const deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;

    // Proceed to delete the amenity if it is not associated with any property
    const deletedTestimonial = await Testimonials.findByIdAndDelete(
      testimonialId
    );

    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Get the path to the image and delete it from the uploads folder
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads/testimonials",
      path.basename(deletedTestimonial.image)
    );

    // Check if the image file exists before deleting it
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        // If file exists, delete it
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Failed to delete image file:", err);
          } else {
            console.log("Image file deleted:", imagePath);
          }
        });
      } else {
        console.error("Image file not found:", err);
      }
    });

    const testimonial = await Testimonials.find();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      testimonial,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createTestimonials,
  getTestimonials,
  deleteTestimonial,
  getSingleTestimonial,
  updateTestimonial,
};
