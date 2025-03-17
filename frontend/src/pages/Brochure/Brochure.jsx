import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { Layout } from "../../components/Layout";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import successAnimation from "../../assets/img/success.json";
import "./Brochure.css";

export const Brochure = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    dealer: "",
  });

  const apiUrl = `${process.env.BASE_URL}/api/v1/brochures`;
  const enquiryApi = `${process.env.BASE_URL}/api/v1/property-enquiry`;
  const { data, loading, error } = useFetchData(apiUrl);
  const brochures = data?.brochure || [];

  const handleOpen = (brochure) => {
    setSelectedBrochure(brochure);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBrochure(null);
    setFormData({ name: "", email: "", phone: "", reason: "", dealer: "" });
    setSuccess(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBrochure) return;

    const requestData = {
      name: formData.name,
      email: formData.email,
      mobile: formData.phone,
      property: selectedBrochure._id,
      reason: formData.reason,
      dealer: formData.dealer,
    };

    try {
      await axios.post(enquiryApi, requestData);
      setSuccess(true);
      setTimeout(() => handleClose(), 3000);
    } catch (err) {
      alert("Failed to submit enquiry.");
    }
  };

  return (
    <Layout>
      <div className="brochurebanner flex flex-col items-center justify-center">
        <h1 className="font-dmsans font-medium text-white text-3xl lg:text-5xl mt-10 lg:mt-20">
          Brochure
        </h1>
      </div>

      <div>
        <h1 className="font-roboto text-2xl text-[#1d2a3b] lg:text-4xl font-medium py-8 text-center">
          Our Brochures
        </h1>

        <div className="max-w-[1280px] mx-auto px-6">
          {loading && (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
          {error && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {brochures.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-20">
              {brochures.map((brochure) => (
                <div
                  key={brochure._id}
                  className="relative group border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={brochure.image}
                    alt={brochure.name}
                    className="h-64 w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      onClick={() => handleOpen(brochure)}
                      className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <PictureAsPdfIcon size={30} color="red" /> Request PDF
                    </motion.button>
                  </div>
                  <h4 className="text-center text-xl font-semibold py-3">
                    {brochure.name.length > 20
                      ? `${brochure.name.substring(0, 20)}...`
                      : brochure.name}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No brochures available.</p>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="enquiry-form-title"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-96 shadow-lg">
          {success ? (
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
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
              />

              <FormControl fullWidth required>
                <InputLabel>Reason</InputLabel>
                <Select
                  label="Reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                >
                  <MenuItem value="investment">Investment</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Are you a dealer?</InputLabel>
                <Select
                  label="Are you a dealer"
                  name="dealer"
                  value={formData.dealer}
                  onChange={handleChange}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Request
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </Layout>
  );
};
