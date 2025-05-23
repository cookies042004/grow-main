const fs = require("fs");
const path = require("path");
const Amenity = require("../models/amenity");
const Property = require("../models/property");
      
// Create a Amenity
const createAmenity = async (req, res) => {
  try {
    const { type, name } = req.body;

    const image = [];

    if(req.files['images']){
      req.files['images'].forEach((file) => {
        image.push(file.path);
      })
    }

    const imageToSave = image.length > 0 ? image[0] : null;

    const amenity = new Amenity({
      type,
      name,
      image: imageToSave
    });

    await amenity.save();

    res.status(201).json({
      success: true,
      message: "Amenity created successfully",
      amenity,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all the amenities
const getAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.find();
    res.status(201).json({
      success: true,
      message: "All amenities fetched !",
      amenity,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch the single amenity
const getSingleAmenity = async (req, res) => {
  try {
    const amenityId = req.params.id;
    const amenity = await Amenity.findById(amenityId);

    if (!amenity) {
      return res
        .status(404)
        .json({ success: false, message: "Amenity not found" });
    }

    res.status(200).json({
      success: true,
      message: "Amenity found successfully",
      amenity,
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
const updateAmenity = async (req, res) => {
  try {
    const amenityId = req.params.id;
    const { type, name } = req.body;

    // Fetch the existing amenity document
    const existingAmenity = await Amenity.findById(amenityId);
    if (!existingAmenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found",
      });
    }

    let updatedFields = { type, name };

    // Handle new images
    if (req.files && req.files["images"]) {
      let newImages = req.files["images"].map((file) => file.path);

      // Delete old images if they exist and are local
      if (existingAmenity.image && existingAmenity.image.length > 0) {
        existingAmenity.image.forEach((img) => {
          if (!img.startsWith("http")) {
            const oldImagePath = path.join(__dirname, "..", img);
            if (fs.existsSync(oldImagePath)) {
              fs.unlink(oldImagePath, (err) => {
                if (err) console.error(`Error deleting old image: ${err.message}`);
              });
            }
          }
        });
      }

      // Update the image field with new images
      updatedFields.image = newImages;
    }

    // Update the amenity item
    const updatedAmenity = await Amenity.findByIdAndUpdate(amenityId, updatedFields, { new: true });

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      amenity: updatedAmenity,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteAmenity = async (req, res) => {
  try {
    const amenityId = req.params.id;

    // Check if any property is using the amenity
    const associatedProperty = await Property.findOne({
      amenities: amenityId,
    });

    if (associatedProperty) {
      return res.status(400).json({
        success: false,
        message: "Amenity cannot be deleted as it is associated with a property.",
      });
    }

    // Proceed to delete the amenity if it is not associated with any property
    const deletedAmenity = await Amenity.findByIdAndDelete(amenityId);

    if (!deletedAmenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found",
      });
    }

    // Get the path to the image and delete it from the uploads folder
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads/amenities",
      path.basename(deletedAmenity.image)
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

    const amenities = await Amenity.find();

    res.status(200).json({
      success: true,
      message: "Amenity deleted successfully",
      amenities,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createAmenity,
  getAmenity,
  getSingleAmenity,
  updateAmenity,
  deleteAmenity,
};
