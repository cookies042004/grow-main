import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { CommercialCard } from "../../components/CommercialCard";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Navigation } from "../../components/Navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Commercial = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/commercial`;
  const { data, loading, error } = useFetchData(apiUrl);
  const properties = data.properties || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 properties per page

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Get the current page's properties
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#1d2a3b" size={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="projectbanner flex justify-center items-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center lg:mt-20">
            <h1 className="font-dmsans font-medium text-white text-3xl lg:text-4xl capitalize">
              {id.replace("-", " ")}
            </h1>
          </div>
        </div>
      </div>

      <Navigation />

      <div className="grid sm:grid-cols-12 max-w-[1280px] mx-auto my-10">
        {loading && (
          <div className="col-span-12 items-center flex justify-center">
            <CircularProgress size="30px" />
          </div>
        )}
        {error && (
          <div className="col-span-12 flex items-center justify-center">
            <p>Something went wrong: {error}</p>
          </div>
        )}
        {paginatedProperties.map((property) => (
          <div key={property._id} className="col-span-12 lg:col-span-3 m-3">
            <CommercialCard
              id={property._id}
              name={property.title}
              slug={property.slug}
              image={property.image[0]}
              location={property.location}
              builder={property.builder}
              unit={property.unit}
              size={property.size}
              sizeUnit={property.sizeUnit}
              price={property.price}
              propertyType={property.propertyType}
            />
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="flex justify-center my-5">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
            color="primary"
          />
        </div>
      )}
    </Layout>
  );
};
