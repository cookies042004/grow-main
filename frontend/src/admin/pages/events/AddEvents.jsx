import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

export const AddEvents = () => {
  document.title = "Add Events";

  // Ref to the file input element
  const imageInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = Array.from(event.target.files);
    setFormData({ ...formData, images: file });

    const previews = file.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      !formData.title ||
      !formData.description ||
      formData.images.length === 0
    ) {
      toast.error("Please fill all the fields and upload images!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    formData.images.forEach((file) => data.append("images", file));

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/api/v1/events`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setLoading(false);
        toast.success("Event added successfully!");
        setFormData({ title: "", description: "", images: [] });
        setImagePreviews([]);
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      } else {
        setLoading(false);

        console.error(response.data);
        toast.error("Failed to add event. Please try again.");
      }
    } catch (error) {
      setLoading(false);

      toast.error("Failed to add event. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold p-2 text-center">
              Add Events
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Event Title"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="title"
                    value={formData.title}
                    fullWidth
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Event Description"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="description"
                    value={formData.description}
                    fullWidth
                    required
                    multiline
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full p-2">
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload Event Images - (Only jpeg, jpg, png files are
                      allowed Max size: 5 mb)
                    </Typography>
                    <input
                      ref={imageInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-button-file"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        size="small"
                        style={{ textTransform: "none" }}
                      >
                        Choose Files
                      </Button>
                    </label>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        {imagePreviews.map((preview, index) => (
                          <div key={index} style={{ position: "relative" }}>
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </Box>
                    )}
                  </Box>
                </div>
              </div>
              <div className="flex flex-col p-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={!loading && <AddCircleIcon />}
                  type="submit"
                  size="small"
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
                    <CircularProgress size="25px" sx={{ color: "white" }} />
                  ) : (
                    "Add Events"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
