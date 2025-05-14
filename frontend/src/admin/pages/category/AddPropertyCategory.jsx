import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminLayout } from "../../components/AdminLayout";

export const AddPropertyCategory = () => {
  document.title = "Add Property Category";
  const apiURL = `${process.env.BASE_URL}/api/v1/category`;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(apiURL, {
        name: name,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
      console.error("Login error:", error);
    }
    setName("");
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center">
              Add a Property Category
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full">
                  <TextField
                    id="outlined-basic"
                    label="Enter Category Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
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
                  "Add Category"
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
