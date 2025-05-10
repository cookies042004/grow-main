import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import "./SingleProject.css";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { PropertyCard } from "../../components/PropertyCard";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { ClipLoader } from "react-spinners";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Navigation } from "../../components/Navigation";
import { Helmet } from "react-helmet-async";

export const SingleProject = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;
  const { data, loading, error } = useFetchData(apiUrl);
  const properties = data.properties || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Capitalize words function
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Filter properties based on category
  const filteredProperties = properties.filter(
    (property) => property.category?.name === capitalizeWords(id.replace("-", " "))
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Grow Infinity Realtors | {id.replace("-", " ")}</title>
        <meta
          name="description"
          content={`Explore our ${id.replace("-", " ")} properties at Grow Infinity Realtors.`}
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}/projects/${id}`}
        />
      </Helmet>
      <div className="projectbanner flex justify-center items-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center lg:mt-20">
            <h1 className="font-dmsans font-bold text-white text-3xl lg:text-4xl capitalize">
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
          <div key={property._id} className="col-span-12 md:col-span-5 lg:col-span-3 m-3">
            <PropertyCard
              id={property._id}
              name={property.name}
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

      {/* MUI Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center m-6">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </div>
      )}
    </Layout>
  );
};
