import React, { useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { AdminLayout } from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
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
  CircularProgress,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";

export const ViewBrochure = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/brochures`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const brochures = data?.brochure || []; // Ensuring it's always an array

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (brochureId) => {
    if (window.confirm("Are you sure you want to delete this brochure?")) {
      try {
        const response = await axios.delete(`${apiUrl}/${brochureId}`);
        if (response.data.success) {
          refetch();
          toast.success(response.data.message);
        } else {
          toast.error("Failed to delete brochure");
        }
      } catch (err) {
        toast.error("An error occurred while deleting");
      }
    }
  };

  const handleCopyPdfUrl = (pdfUrl) => {
    navigator.clipboard.writeText(pdfUrl);
    toast.success("PDF URL copied to clipboard!");
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600">View Brochures</h2>
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

          {/* No Brochures Found */}
          {!loading && brochures.length === 0 && (
            <div className="text-center text-gray-600 py-10 text-lg">
              No brochures found.
            </div>
          )}

          {/* Table Content */}
          {brochures.length > 0 && (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="bg-blue-100">
                      <TableCell className="font-semibold text-gray-700">S No.</TableCell>
                      <TableCell className="font-semibold text-gray-700">Name</TableCell>
                      <TableCell className="font-semibold text-gray-700">Location</TableCell>
                      <TableCell className="font-semibold text-gray-700">Image</TableCell>
                      <TableCell className="font-semibold text-gray-700">PDF</TableCell>
                      <TableCell className="font-semibold text-gray-700">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brochures
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((brochure, index) => {
                        const pdfUrl = brochure.pdf;
                        const pdfFilename = pdfUrl.split("\\").pop();
                        const truncatedPdf =
                          pdfFilename.length > 20
                            ? pdfFilename.slice(0, 20) + "..."
                            : pdfFilename;

                        return (
                          <TableRow key={brochure._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {brochure.name.length > 20 ? `${brochure.name.slice(0, 20)}...` : brochure.name}
                            </TableCell>
                            <TableCell>
                              {brochure.location.length > 80 ? `${brochure.location.slice(0, 80)}...` : brochure.location}
                            </TableCell>
                            <TableCell>
                              <img
                                src={brochure.image}
                                alt={brochure.name}
                                style={{
                                  height: "100px",
                                  width: "200px",
                                  objectFit: "contain",
                                  objectPosition: "center",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Click to copy">
                                <span
                                  className="cursor-pointer hover:text-blue-600 flex items-center"
                                  onClick={() => handleCopyPdfUrl(pdfUrl)}
                                >
                                  {truncatedPdf} <ContentCopyIcon fontSize="small" className="ml-1" />
                                </span>
                              </Tooltip>
                            </TableCell>
                            <TableCell>
                              <div className="flex sm:block">
                                <Link to={`/admin/update-brochure/${brochure?._id}`}>
                                  <Button variant="outlined" size="small" color="success" sx={{ textTransform: "none", mr: 2 }} endIcon={<EditIcon />}>
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => handleDelete(brochure._id)}
                                  variant="contained"
                                  size="small"
                                  color="error"
                                  sx={{ textTransform: "none" }}
                                  endIcon={<DeleteIcon />}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={brochures.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  ".MuiTablePagination-toolbar": { justifyContent: "center" },
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-input": { fontSize: "0.9rem" },
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
