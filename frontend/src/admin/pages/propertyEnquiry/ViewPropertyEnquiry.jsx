import React, { useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export const ViewPropertyEnquiry = () => {
  document.title = "View Property Enquiry";
  const apiUrl = `${process.env.BASE_URL}/api/v1/property-enquiry`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const propertyEnquiries = data?.propertyEnquiries || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        alert("Enquiry deleted successfully");
        refetch();
      } catch (error) {
        alert("Failed to delete enquiry");
      }
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-20">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-center sm:text-left text-blue-600">
              View Property Enquiries
            </h2>
            <Button variant="contained" color="primary" size="small" onClick={refetch}>
              Refresh
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-10">
              <CircularProgress size="large" color="secondary" />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 py-4">
              <p>{error}</p>
            </div>
          )}

          {/* No Enquiries Found */}
          {!loading && propertyEnquiries.length === 0 && (
            <div className="text-center text-gray-600 py-10 text-lg">
              No property enquiries found.
            </div>
          )}

          {/* Enquiries List */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {propertyEnquiries.map((enquiry, index) => (
              <Card key={enquiry._id} sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {index + 1}. {enquiry.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {enquiry.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Mobile:</strong> {enquiry.mobile}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Property:</strong> {enquiry.property?.name || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Reason:</strong> {enquiry.reason}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Dealer:</strong> {enquiry.dealer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> {new Date(enquiry.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(enquiry._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
