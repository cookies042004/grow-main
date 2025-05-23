import React, { useState, useRef } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./AddProperty.css";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/img/success.json";

export const AddProperty = () => {
  document.title = "Add Property";

  const [loading, setLoading] = useState(false);
  const [sizeUnit, setSizeUnit] = useState("sqFt");

  // Fetch categories and amenities data
  const {
    data: categoriesData,
    error: categoryError,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/category`);

  const categories = categoriesData?.category || [];

  const {
    data: amenitiesData,
    error: amenitiesError,
    loading: amenitiesLoading,
    refetch: refetchAmenities,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/amenities`);

  const amenities = amenitiesData?.amenity || [];

  // State to manage form data
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    builder: "",
    unit: "",
    size: "",
    price: "",
    location: "",
    address: "",
    description: "",
    furnishType: "",
    societyAmenities: [],
    flatAmenities: [],
    locationAdvantages: [],
    propertyType: "",
    projectStatus: "",
    projectSize: "",
    totalUnits: "",
  });

  // State to manage select all
  const [selectAllSociety, setSelectAllSociety] = useState(false);
  const [selectAllFlat, setSelectAllFlat] = useState(false);
  const [selectAllLocation, setSelectAllLocation] = useState(false);

  // State to track uploaded images and brochure
  const [uploadedImages, setUploadedImages] = useState([]);
  // State to track uploaded video
  const [uploadedVideos, setUploadedVideos] = useState(null);
  // State to track uploaded dp image
  const [uploadedDpImage, setUploadedDpImage] = useState(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [shouldIndex, setShouldIndex] = useState(true);
  const [headCode, setHeadCode] = useState("");
  const [footerCode, setFooterCode] = useState("");

  // Ref to the file input element
  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const dpInputRef = useRef();

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "sizeUnit") {
      setSizeUnit(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle select changes
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target; // Use name instead of value

    if (name === "selectAll") {
      if (type === "societyAmenities") setSelectAllSociety(checked);
      if (type === "flatAmenities") setSelectAllFlat(checked);
      if (type === "locationAdvantages") setSelectAllLocation(checked);

      setFormData({
        ...formData,
        [type]: checked
          ? amenities
            .filter((amenity) => amenity.type === amenityTypeMap[type])
            .map((amenity) => amenity._id)
          : [],
      });
    } else {
      const updatedAmenities = checked
        ? [...formData[type], name] // Using `name` instead of `value`
        : formData[type].filter((amenity) => amenity !== name);

      setFormData({ ...formData, [type]: updatedAmenities });

      // Check if all checkboxes are selected, then auto-check "Select All"
      const allSelected =
        updatedAmenities.length ===
        amenities.filter((amenity) => amenity.type === getAmenityType(type))
          .length;

      if (type === "societyAmenities") setSelectAllSociety(allSelected);
      if (type === "flatAmenities") setSelectAllFlat(allSelected);
      if (type === "locationAdvantages") setSelectAllLocation(allSelected);
    }
  };

  // dynamic amenity type mapping
  const getAmenityType = (type) => {
    return type === "locationAdvantages"
      ? "location_advantages"
      : type.replace("Amenities", "_amenity");
  };

  // radio button handler
  const handleRadioChange = (event, type) => {
    const { value } = event.target;

    const isSelectAll = value === "selectAll";

    const selectAllStateSetters = {
      societyAmenities: setSelectAllSociety,
      flatAmenities: setSelectAllFlat,
      locationAdvantages: setSelectAllLocation,
    };
    selectAllStateSetters[type](isSelectAll);

    setFormData({
      ...formData,
      [type]: isSelectAll
        ? amenities
          .filter((amenity) => amenity.type === getAmenityType(type))
          .map((amenity) => amenity._id)
        : [],
    });
  };

  // Handler for image uploading
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 5 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`Image size should be less than 5Mb.`);
        return false;
      }
      return true;
    });

    setUploadedImages((prevImages) => [...prevImages, ...validFiles]);
  };

  // Handler for video uplaoding
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    let maxSize = 1024 * 1024 * 5;

    if (file.size > maxSize) {
      toast.error(`Video size should be less than 5Mb`);
    } else {
      if (
        (file && file.type === "video/mp4") ||
        file.type === "video/webm" ||
        file.type === "video/ogg"
      ) {
        setUploadedVideos(file);
      } else {
        toast.error(`Invalid video file.`);
      }
    }
  };

  const handleDescriptionUpload = (event) => {
    const file = event.target.files[0];
    let maxSize = 1024 * 1024 * 5;
    if (file.size > maxSize) {
      toast.error(`Dp size should be less than 5Mb`);
    } else {
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/webp")
      ) {
        setUploadedDpImage(file);
      } else {
        toast.error(`Invalid image file.`);
      }
    }
  };

  // Function to remove image
  const removeImage = (index) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image, i) => i !== index)
    );
  };

  const removeDpImage = () => {
    setUploadedDpImage(null);
  };

  const removeVideo = () => {
    setUploadedVideos(false);
  };


  const renderImagePreviews = () => {
    return uploadedImages.map((image, index) => (
      <div
        key={index}
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="image-preview"
        />
        <button
          type="button"
          className="delete-image"
          onClick={() => removeImage(index)}
        >
          X
        </button>
      </div>
    ));
  };


  const renderVideoPreview = () => {
    return uploadedVideos ? (
      <div className="preview">
        <video controls>
          <source src={URL.createObjectURL(uploadedVideos)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          type="button"
          className="delete-video"
          onClick={() => removeVideo()}
        >
          X
        </button>
      </div>
    ) : null;
  };

  const renderDescriptionPreview = () => {
    return uploadedDpImage ? (
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={URL.createObjectURL(uploadedDpImage)}
          alt="Preview"
          className="image-preview"
        />
        <button
          type="button"
          className="delete-image"
          onClick={() => removeDpImage()}
        >
          X
        </button>
      </div>
    ) : null;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const allSelectedAmenities = [
      ...formData.societyAmenities,
      ...formData.flatAmenities,
      ...formData.locationAdvantages,
    ];

    const formDataToSend = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (
        Array.isArray(formData[key]) &&
        (key === "societyAmenities" ||
          key === "flatAmenities" ||
          key === "locationAdvantages")
      ) {
        formData[key].forEach((item) =>
          formDataToSend.append("amenities", item)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("sizeUnit", sizeUnit);

    // Append uploaded images
    uploadedImages.forEach((image) => {
      formDataToSend.append("images", image);
    });

    formDataToSend.append("video", uploadedVideos);

    formDataToSend.append("dp", uploadedDpImage);
    formDataToSend.append("seoTitle", seoTitle);
    formDataToSend.append("seoDescription", seoDescription);
    formDataToSend.append("indexStatus", shouldIndex);
    formDataToSend.append("headerCode", headCode);
    formDataToSend.append("footerCode", footerCode);

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/property`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        // toast.success("Property added successfully!");
        <div className="flex flex-col items-center">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: 150, height: 150 }}
          />
          <h2 className="text-2xl font-bold text-center">Success!</h2>
          <p className="text-center text-gray-600">
            Your request has been submitted.
          </p>
        </div>;
        setFormData({
          category: "",
          name: "",
          builder: "",
          unit: "",
          size: "",
          price: "",
          location: "",
          address: "",
          description: "",
          furnishType: "",
          societyAmenities: [],
          flatAmenities: [],
          locationAdvantages: [],
          propertyType: "",
          projectStatus: "",
          projectSize: "",
          totalUnits: "",
        });
        setSizeUnit("sqFt");
        setSelectAllFlat(false);
        setSelectAllLocation(false);
        setSelectAllSociety(false);
        setUploadedVideos(false);
        setUploadedImages([]);
        setUploadedDpImage("");

        
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add property.", error);
    }
  };

  const inWords = (num) => {
    const price = Number(num);

    const ones = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const suffixes = ["", "Hundred", "Thousand", "Lakhs", "Crore"];

    const toWords = (num) => {
      if (num === 0) return "";
      if (num < 10) return ones[num];
      if (num < 20) return teens[num - 10];
      if (num < 100)
        return tens[Math.floor(num / 10) - 2] + " " + toWords(num % 10);
      if (num < 1000)
        return (
          ones[Math.floor(num / 100)] +
          " " +
          suffixes[1] +
          " " +
          toWords(num % 100)
        );
      if (num < 100000)
        return (
          toWords(Math.floor(num / 1000)) +
          " " +
          suffixes[2] +
          " " +
          toWords(num % 1000)
        );
      if (num < 10000000)
        return (
          toWords(Math.floor(num / 100000)) +
          " " +
          suffixes[3] +
          " " +
          toWords(num % 100000)
        );
      return (
        toWords(Math.floor(num / 10000000)) +
        " " +
        suffixes[4] +
        " " +
        toWords(num % 10000000)
      );
    };

    return toWords(price);
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          {/* <h2 className="text-2xl font-bold p-2 text-center">Add Property</h2> */}
          <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Property Details
                </Typography>
                <FormControl color="secondary" size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Property Category*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                    label="Enter Amenity Type*"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Enter Type of Property like Rera etc."
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="propertyType"
                  className="w-48"
                  value={formData.propertyType}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Enter Property Name*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Enter Builder Name*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="builder"
                  value={formData.builder}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Enter Property Location*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Enter Property Address*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Enter Property Description*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  minRows={4}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Size & Price
                </Typography>
                <TextField
                  type="string"
                  label="Enter Unit (in BHK-bhk should be capital written)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="number"
                  label="Enter Size of Porperty (in digits)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  fullWidth
                />
                <FormControl variant="outlined" size="small" className="w-48">
                  <InputLabel id="size-input-label">Unit Type</InputLabel>
                  <Select
                    labelId="size-input-label"
                    id="size-input"
                    name="sizeUnit"
                    value={sizeUnit}
                    onChange={handleChange}
                    label="Size Unit"
                  >
                    <MenuItem value="sqFt">Sqft</MenuItem>
                    <MenuItem value="yard">yard</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  label="Enter Price(In digits)*"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                />
                <Typography variant="body2">
                  Price in words:{" "}
                  {formData.price ? inWords(Number(formData.price)) : "N/A"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Project Details
                </Typography>
                <TextField
                  type="string"
                  label="Enter Rera Number"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="propertyRera"
                  value={formData.propertyRera}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="string"
                  label="Enter Project Size With Measurements like acres etc."
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="projectSize"
                  value={formData.projectSize}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="string"
                  label="Enter Project Status like under construction, completed etc."
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="string"
                  label="Enter Total Units"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  padding: "12px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontWeight: "600", color: "#333" }}
                >
                  Facilities
                </Typography>
                {/* Furnish Type */}
                <FormControl
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px ",
                  }}
                >
                  {/* Title */}
                  <FormLabel
                    color="secondary"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: "#333",
                    }}
                  >
                    Furnish Type
                  </FormLabel>

                  {/* Radio Buttons */}
                  <RadioGroup
                    name="furnishType"
                    value={formData.furnishType}
                    onChange={handleChange}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <FormControlLabel
                      value="Fully Furnished"
                      control={<Radio color="secondary" />}
                      label="Fully Furnished"
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                    <FormControlLabel
                      value="Semi Furnished"
                      control={<Radio color="secondary" />}
                      label="Semi Furnished"
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                    <FormControlLabel
                      value="Unfurnished"
                      control={<Radio color="secondary" />}
                      label="Unfurnished"
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </RadioGroup>
                </FormControl>

                {/* Society Amenitie */}
                <FormControl component="fieldset">
                  <FormLabel color="secondary">Society Amenities</FormLabel>
                  <RadioGroup
                    value={selectAllSociety ? "selectAll" : "individual"}
                    onChange={(e) => handleRadioChange(e, "societyAmenities")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      backgroundColor: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            color="secondary"
                            value="selectAll"
                            onChange={(e) =>
                              handleRadioChange(e, "societyAmenities")
                            }
                          />
                        }
                        label="Select All"
                        style={{ marginBottom: "8px" }} // Inline style
                      />

                      {amenities
                        .filter((amenity) => amenity.type === "society_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.societyAmenities?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "societyAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                            style={{
                              backgroundColor: "#f5f5f5",
                              padding: "6px 12px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* Flat Amenities */}
                <FormControl component="fieldset">
                  <FormLabel color="secondary">Flat Amenities</FormLabel>
                  <RadioGroup
                    value={selectAllFlat ? "selectAll" : "individual"}
                    onChange={(e) => handleRadioChange(e, "flatAmenities")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      backgroundColor: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            color="secondary"
                            value="selectAll"
                            onChange={(e) =>
                              handleRadioChange(e, "flatAmenities")
                            }
                          />
                        }
                        label="Select All"
                      />

                      {amenities
                        .filter((amenity) => amenity.type === "flat_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.flatAmenities?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "flatAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                            style={{
                              backgroundColor: "#f5f5f5",
                              padding: "6px 12px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                    </div>
                  </RadioGroup>
                </FormControl>

                {/* Location Advantages */}
                <FormControl component="fieldset">
                  <FormLabel color="secondary">Location Advantages</FormLabel>
                  <RadioGroup
                    value={selectAllLocation ? "selectAll" : "individual"}
                    onChange={(e) => handleRadioChange(e, "locationAdvantages")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      backgroundColor: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            color="secondary"
                            value="selectAll"
                            onChange={(e) =>
                              handleRadioChange(e, "locationAdvantages")
                            }
                          />
                        }
                        label="Select All"
                      />

                      {amenities
                        .filter(
                          (amenity) => amenity.type === "location_advantages"
                        )
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.locationAdvantages?.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "locationAdvantages")
                                }
                              />
                            }
                            label={amenity.name}
                            style={{
                              backgroundColor: "#f5f5f5",
                              padding: "6px 12px",
                              borderRadius: "5px",
                            }}
                          />
                        ))}
                    </div>
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  marginTop: 2,
                }}
              >
                <h3 className="text-lg font-semibold mt-4">SEO Settings</h3>

                <div className="mb-4">
                  <label>SEO Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="border w-full p-2"
                    placeholder="e.g. 3BHK Flats in Noida by Grow Infinity"
                  />
                </div>

                <div className="mb-4">
                  <label>SEO Description</label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="border w-full p-2"
                    placeholder="e.g. Explore our top 3BHK flats available in Sector 74, Noida..."
                  />
                </div>

                <div className="mb-4">
                  <label>
                    <input
                      type="checkbox"
                      checked={shouldIndex}
                      onChange={(e) => setShouldIndex(e.target.checked)}
                    />
                    Allow search engine indexing
                  </label>
                </div>

                <div className="mb-4">
                  <label>Header Code (e.g. Google Tag Manager)</label>
                  <textarea
                    value={headCode}
                    onChange={(e) => setHeadCode(e.target.value)}
                    className="border w-full p-2"
                  />
                </div>

                <div className="mb-4">
                  <label>Footer Code (e.g. chat widget)</label>
                  <textarea
                    value={footerCode}
                    onChange={(e) => setFooterCode(e.target.value)}
                    className="border w-full p-2"
                  />
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#333",
                    marginTop: 2,
                  }}
                >
                  Upload
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel id="image-upload">
                    Upload Property Images - (Only jpeg, jpg, png files are
                    allowed Max size: 5Mb)
                  </FormLabel>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload-input"
                    type="file"
                    ref={imageInputRef}
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload-input">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      style={{ textTransform: "none" }}
                    >
                      Choose Images
                    </Button>
                  </label>

                  <div className="flex flex-wrap mt-2">
                    {renderImagePreviews()}
                  </div>
                  <Typography variant="body2">
                    {uploadedImages.length} images selected
                  </Typography>
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel id="video-upload">
                    Upload Property Videos - (Only mp4, webm, ogg files are
                    required)
                  </FormLabel>
                  <input
                    accept="video/*"
                    style={{ display: "none" }}
                    id="video-input-upload"
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                  />
                  <label htmlFor="video-input-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      style={{ textTransform: "none" }}
                    >
                      Choose Video
                    </Button>
                  </label>
                  <div className="flex flex-wrap mt-2">
                    {renderVideoPreview()}
                  </div>
                  <Typography variant="body2">
                    {uploadedVideos ? "1 video selected" : "No video selected"}
                  </Typography>
                </FormControl>

                <FormControl>
                  <FormLabel id="description-upload">
                    Upload Property Description
                  </FormLabel>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="description-input-upload"
                    type="file"
                    ref={dpInputRef}
                    onChange={handleDescriptionUpload}
                  />
                  <label htmlFor="description-input-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      style={{ textTransform: "none" }}
                    >
                      Enter Property DP
                    </Button>
                  </label>
                  <div className="flex flex-wrap mt-2">
                    {renderDescriptionPreview()}
                  </div>
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={loading ? null : <AddCircleIcon />}
                  type="submit"
                  size="small"
                  onClick={handleSubmit}
                  sx={{
                    width: "150px",
                    alignSelf: "center",
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: "500",
                    ":hover": { backgroundColor: "#d32f2f" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Add Property"
                  )}
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
