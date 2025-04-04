const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  getProperty,
  getSingleProperty,
  createProperty,
  deleteProperty,
  searchProperty,
  getTotalProperties,
  recentProperty,
  updateProperty,
  getByName
} = require("../controllers/commercialController");

const router = express.Router();

router.route("/search").get(searchProperty);
router.get("/total-properties", getTotalProperties);  
router.get("/recent-properties", recentProperty); 

router.get("/", getProperty);

router.route("/").post(upload, createProperty);

router.route("/search-by-name/:slug").get(getByName);

router.route("/:id").get(getSingleProperty).delete(deleteProperty).patch(upload, updateProperty);


module.exports = router;    
