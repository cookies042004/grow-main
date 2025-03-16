import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import { Button, CircularProgress, Card, CardMedia, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useFetchData } from "../../../hooks/useFetchData";

export const ViewAwards = () => {
  document.title = "View Awards";
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  // Handle Delete Award
  const handleDelete = async (awardsId) => {
    try {
      const deleteUrl = `${apiUrl}/${awardsId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete award");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600 text-center sm:text-left">
              View Awards
            </h2>
            <Button variant="contained" color="primary" size="small" onClick={refetch} sx={{ textTransform: "none" }}>
              Refresh
            </Button>
          </div>

          {/* Loading and Error Handling */}
          {loading && (
            <div className="flex justify-center py-10">
              <CircularProgress size="large" color="secondary" />
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Awards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {awards.map((award) => (
              <Card key={award._id} className="shadow-md hover:shadow-lg transition rounded-lg">
                <CardMedia
                  component="img"
                  height="160"
                  image={award.image}
                  alt="Award Image"
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" className="text-center font-semibold">
                    Award
                  </Typography>
                  <div className="flex justify-center mt-3">
                    <Button
                      onClick={() => handleDelete(award._id)}
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      size="small"
                      color="error"
                      style={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
