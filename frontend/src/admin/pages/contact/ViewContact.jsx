import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { useFetchData } from "../../../hooks/useFetchData";
import axios from "axios";
import { AdminLayout } from "../../components/AdminLayout";

export const ViewContact = () => {
  document.title = "View Contact";

  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const contacts = data?.contact || [];

  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await axios.delete(`${apiUrl}/${contactId}`);
        if (response.data.success) {
          refetch();
          toast.success(response.data.message);
        } else {
          toast.error("Failed to delete contact");
        }
      } catch (err) {
        toast.error("An error occurred while deleting");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600">Contact Enquiries</h2>
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

          {/* No Contacts Found */}
          {!loading && contacts.length === 0 && (
            <div className="text-center text-gray-600 py-10 text-lg">
              No contact enquiries found.
            </div>
          )}

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {contacts.map((contact, index) => (
              <Card key={contact._id} sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {index + 1}. {contact.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {contact.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Phone:</strong> {contact.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Message:</strong> {contact.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> {new Date(contact.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(contact._id)}
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
