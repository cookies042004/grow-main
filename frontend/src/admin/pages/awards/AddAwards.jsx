import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AdminLayout } from "../../components/AdminLayout";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const AddAwards = () => {
  document.title = "Add Awards";

  const [formData, setFormData] = useState({ image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef();
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ image: file });
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({ image: null });

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("images", formData.image);

    try {
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to add awards");
      }

      handleRemoveImage();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the award");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold p-2 text-center">Add Awards</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full p-2">
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload Awards Image - (Only jpeg, jpg, png files are allowed, Max size: 5MB)
                    </Typography>
                    <input
                      ref={imageInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-button-file"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button-file">
                      <Button variant="outlined" color="primary" component="span" size="small">
                        Choose File
                      </Button>
                    </label>

                    {imagePreview && (
                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="body2" gutterBottom>
                          Image Preview:
                        </Typography>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                            border: "2px solid #ddd",
                            padding: "5px",
                            borderRadius: "8px",
                            background: "#f9f9f9",
                          }}
                        >
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              maxWidth: "250px",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                          <button
                            onClick={handleRemoveImage}
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "-10px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              fontSize: "16px",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </Box>
                    )}
                  </Box>
                </div>
              </div>
              <div className="flex flex-col *:p-2">
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
                  {loading ? <CircularProgress size="25px" sx={{ color: "white" }} /> : "Add Awards"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
