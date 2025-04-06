import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import CircularProgress from "@mui/material/CircularProgress";
import { AdminLayout } from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const ViewPropertyEnquiry = () => {
  document.title = "View Property Enquiry";
  const apiUrl = `${process.env.BASE_URL}/api/v1/property-enquiry`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const propertyEnquiries = data.propertyEnquiries || [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle resolve/delete
  const handleResolve = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/${id}`);
      if (res.data.success) {
        toast.success("Enquiry marked as resolved!");
        refetch();
      } else {
        toast.error("Failed to update enquiry");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-20">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-center sm:text-left text-blue-600">
              View Property Enquiries
            </h2>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={refetch}
              sx={{ textTransform: "none" }}
            >
              Refresh
            </Button>
          </div>

          {/* Table */}
          <Paper sx={{ marginTop: "20px" }}>
            {loading ? (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-blue-100">
                        <TableCell>S No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Property Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Dealer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {propertyEnquiries
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((enquiry, i) => (
                          <TableRow
                            key={enquiry._id}
                            className={`${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-200`}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{enquiry.name || "N/A"}</TableCell>
                            <TableCell>{enquiry.email}</TableCell>
                            <TableCell>{enquiry.mobile}</TableCell>
                            <TableCell>
                              {typeof enquiry.property === "object"
                                ? enquiry.property?.name
                                : enquiry.property}
                            </TableCell>
                            <TableCell>{enquiry.reason}</TableCell>
                            <TableCell>{enquiry.dealer}</TableCell>
                            <TableCell>
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleResolve(enquiry._id)}
                                sx={{ textTransform: "none" }}
                              >
                                Resolved
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={propertyEnquiries.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      justifyContent: "center",
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                      {
                        fontSize: "0.9rem",
                      },
                  }}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
