import React, { useState } from "react";
import { Button, Checkbox, Typography, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

export const PropertyEnquiryForm = ({ id, handleClose, open }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    property: id,
    mobile: "",
    reason: "",
    dealer: "",
  });
  const [error, setError] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // 90% of the screen width
    maxWidth: 600, // Maximum width of 600px
    bgcolor: "#f3f3fe",
    borderRadius: "20px",
    boxShadow: 24,
    py: 2,
    px: 1,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number regex validation (Indian format: 10-digit number starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.mobile) { 
      setError("Name and Mobile is required.");
      return;
    }

    try {
      // Sending data using axios
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/property-enquiry`,
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          mobile: formData.mobile,
          property: id,
          reason: formData.reason,
          dealer: formData.dealer,
        }
      );

      if (response.data.success) {
        toast.success(response.data.success.message); // Show success toast
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          property: id,
          mobile: "",
          reason: "",
          dealer: "",
        });
        handleClose(); // Close the modal on success
      } else {
        setError("There was an issue submitting your enquiry. Please try again.");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Network error. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, color: "black" }}
          >
            <CloseIcon />
          </IconButton>
          <h1 className="font-roboto text-center text-2xl lg:text-4xl py-2">
            Contact Us
          </h1>
          <p className="font-roboto text-center text-sm lg:text-lg">
            We will get back to you asap!
          </p>
          {error && <Typography color="error">{error}</Typography>}
          <form className="mx-3 lg:mx-8 mt-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-12 gap-3">
              <div className="col-span-12">
                <div className="flex border rounded-lg items-center bg-white">
                  <div className="flex justify-center ps-3">
                    <PersonIcon sx={{ color: "gray" }} />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    className="outline-none p-3 rounded-lg w-full"
                    placeholder="Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex border rounded-lg items-center bg-white">
                  <div className="flex justify-center ps-3">
                    <MarkunreadIcon sx={{ color: "gray" }} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="outline-none p-3 rounded-lg w-full"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex border rounded-lg items-center bg-white">
                  <div className="flex justify-center ps-3">
                    <LocalPhoneIcon sx={{ color: "gray" }} />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      setFormData({ ...formData, mobile: value });
                    }}
                    className="outline-none p-3 rounded-lg w-full"
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <FormLabel sx={{ fontWeight: "bold" }}>
                  Your reason to buy is?
                </FormLabel>
                <RadioGroup row name="reason" value={formData.reason} onChange={handleChange}>
                  <FormControlLabel value="investment" control={<Radio size="small" />} label="Investment" />
                  <FormControlLabel value="business" control={<Radio size="small" />} label="Business use" />
                </RadioGroup>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <FormLabel sx={{ fontWeight: "bold" }}>
                  Are you a property dealer?
                </FormLabel>
                <RadioGroup row name="dealer" size="small" onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </div>

              <div className="col-span-12">
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked />}
                  label={<Typography variant="body2" sx={{ fontSize: "0.78rem" }}>I agree to be contacted by Grow Infinity agents.</Typography>}
                />
              </div>
              <div className="col-span-12">
                <Button variant="contained" sx={{ background: "#1d2a3b" }} size="large" fullWidth type="submit">
                  Send
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
