import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { PropertyCard } from "../../components/PropertyCard";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress } from "@mui/material";
import "./Search.css";

export const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const query = searchParams.get("query");
  const bhk = searchParams.get("bhk");

  const apiUrl = `${process.env.BASE_URL}/api/v1/property/search?query=${query}${bhk ? `&bhk=${bhk}` : ""}`;

  const { data, loading, error } = useFetchData(apiUrl);

  const properties = data?.properties;

  return (
    <Layout>
      <div className="searchbanner flex items-center justify-center">
        <h1 className="font-dmsans text-3xl lg:text-4xl font-medium text-white">
          Search Results
        </h1>
      </div>

      <div className="flex my-8 justify-center">
        <h3 className="text-3xl">
          {properties?.length > 0 ? (
            <>
              Results for: <span className="font-bold capitalize">{query}</span>{" "}
              {bhk && `(${bhk})`}
            </>
          ) : (
            <div className="text-center text-gray-600">
              No results found for <span className="font-bold">{query}</span> {bhk && `(${bhk})`}
            </div>
          )}
        </h3>
      </div>

      <div className="grid sm:grid-cols-12 mx-16">
        {loading && (
          <div className="col-span-12 flex items-center justify-center">
            <CircularProgress size="30px" />
          </div>
        )}
        {properties?.map((property) => (
          <div className="col-span-3 flex justify-center m-3" key={property._id}>
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </Layout>
  );
};
