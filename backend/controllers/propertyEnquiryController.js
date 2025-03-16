const propertyEnquiry = require("../models/propertyEnquiry");

const createPropertyEnquiry = async (req, res) => {
  try {
    const { name, email, mobile, property, reason, dealer } = req.body;

    const newPropertyEnquiry = new propertyEnquiry({
      name,
      email,
      mobile,
      property,
      reason,
      dealer,
    });

    await newPropertyEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Property Enquiry created successfully",
      newPropertyEnquiry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getPropertyEnquiry = async (req, res) => {
  try {
    const propertyEnquiries = await propertyEnquiry
      .find()
      .populate("property", "name");

    if (!propertyEnquiry) {
      res.status(404).json({
        success: false,
        message: "No property Enquiry Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      propertyEnquiries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Count number of Property Enquiry
const getTotalPropertyEnquiry = async (req, res) => {
  try {
    const totalPropertyEnquiry = await propertyEnquiry.countDocuments({}); // Assuming you are using MongoDB
    res.status(200).json({ success: true, totalPropertyEnquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteEnquiryContacts = async (req, res) => {
  try {
    const contactId = req.params.id;

    const deletedContact = await propertyEnquiry.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    const contact = await propertyEnquiry.find();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      contact,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createPropertyEnquiry,
  getPropertyEnquiry,
  getTotalPropertyEnquiry,
  deleteEnquiryContacts
};
