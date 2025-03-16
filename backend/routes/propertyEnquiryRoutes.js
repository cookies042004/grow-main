const express = require("express");
const {
  createPropertyEnquiry,
  getPropertyEnquiry,
  getTotalPropertyEnquiry,
  deleteEnquiryContacts,
} = require("../controllers/propertyEnquiryController");

const router = express.Router();

router.route("/").post(createPropertyEnquiry).get(getPropertyEnquiry);

router.route("/total-enquiry").get(getTotalPropertyEnquiry);

router.route("/:id").delete(deleteEnquiryContacts)

module.exports = router;
