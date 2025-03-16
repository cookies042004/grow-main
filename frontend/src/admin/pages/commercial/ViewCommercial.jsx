import React, { useState } from "react";
import { Box, Card, CardContent, Button, Typography, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFetchData } from "../../../hooks/useFetchData";

export const ViewCommercial = () => {
  document.title = "View Commercial Property";
  const apiUrl = `${process.env.BASE_URL}/api/v1/commercial`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const properties = data?.properties || [];

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleDelete = async (propertyId) => {
    try {
      const deleteUrl = `${apiUrl}/${propertyId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        setSelectedProperty(null);
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />      
      <div style={{
          display: "flex",
          padding: "12px",
          gap: "5px",
          marginTop: "15px",
          marginBottom: "15px",
        }}>
          
        <Link to="/admin/dashboard">
          <Button variant="contained" color="primary">Back</Button>
        </Link>
        <Link to="/admin/add-commercial">
          <Button variant="contained" color="success">Add Commercial Property</Button>
        </Link>
      </div>
      <Box textAlign="center" mt={3}>
        <Typography variant="h4" fontWeight="bold">View Commercial Property</Typography>
      </Box>

      <Box p={3} mt={5} display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {loading && <Typography>Loading properties...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {properties.length === 0 && !loading && <Typography>No properties found</Typography>}

        {properties.slice(0, visibleCount).map((property) => (
          <Card key={property._id} sx={{ width: 300, cursor: "pointer", boxShadow: 3, borderRadius: 2 }} onClick={() => setSelectedProperty(property)}>
            <img src={property.image?.[0] || "/placeholder.jpg"} alt={property.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{property.name}</Typography>
              <Typography variant="body2" color="textSecondary">By {property.location}</Typography>
              <Typography variant="body2" color="primary">₹ {property.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {properties.length > visibleCount && (
        <Box textAlign="center" mt={3} mb={5}>
          <Button variant="contained" color="primary" onClick={() => setVisibleCount(visibleCount + 6)}>Load More</Button>
        </Box>
      )}

      {selectedProperty && (
        <Modal open={!!selectedProperty} onClose={() => setSelectedProperty(null)}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 600, bgcolor: "background.paper", borderRadius: 2, p: 3, boxShadow: 3, textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>{selectedProperty.name}</Typography>
            <img src={selectedProperty.image?.[0] || "/placeholder.jpg"} alt={selectedProperty.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} />
            <Typography variant="body1">Builder: {selectedProperty.builder}</Typography>
            <Typography variant="body1">Location: {selectedProperty.location}</Typography>
            <Typography variant="body1">Size: {selectedProperty.size} {selectedProperty.sizeUnit}</Typography>
            <Typography variant="body1">Unit: {selectedProperty.unit}</Typography>
            <Typography variant="body1" mb={2}>Price: ₹ {selectedProperty.price}</Typography>
            <Box display="flex" justifyContent="space-around" mt={3}>
              <Link to={`/admin/update-commercial/${selectedProperty._id}`}>
                <Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button>
              </Link>
              <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(selectedProperty._id)}>Delete</Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
