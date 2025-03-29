import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export const Navigation = () => {
  const location = useLocation();
  const { slug } = useParams(); // Get the property slug from URL
  const [categoryName, setCategoryName] = useState("");

  // Fetch category name when slug changes
  useEffect(() => {
    if (slug) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/property/${slug}`)
        .then((response) => {
          const category = response.data?.property?.category?.name;
          if (category) setCategoryName(decodeURIComponent(category));
        })
        .catch((error) =>
          console.error("Error fetching property details:", error)
        );
    }
  }, [slug]);

  const path = location.pathname;
  const pathSegments = path.split("/").filter(Boolean);

  // If the last segment is the slug, remove it from the breadcrumb
  const isSlug = slug && pathSegments[pathSegments.length - 1] === slug;
  const displaySegments = isSlug ? pathSegments.slice(0, -1) : pathSegments;

  // Convert raw paths into readable names and replace "commercial" with an empty string
  const formatPath = (segment) => {
    const pathMap = {
      properties: "Properties",
      about: "About Us",
      contact: "Contact",
      commercial: "", // Replace "commercial" with an empty string
    };
    return pathMap[segment] || segment;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1280px] mx-5 my-5 bg-gray-100 p-3 lg:p-4 shadow-md rounded-lg text-xs lg:text-sm">
        <span className="text-gray-600">Home</span>

        {displaySegments.map((segment, index) => {
          const formattedSegment = formatPath(decodeURIComponent(segment));
          return formattedSegment ? (
            <span key={index} className="font-medium text-gray-700">
              {" → "}
              {formattedSegment}
            </span>
          ) : null; // Skip rendering if empty
        })}

        {slug && categoryName === "Commercial" && (
          <span className="font-medium text-gray-700">
            {" → "}
            {"categoryName" || "Loading..."}
          </span>
        )}
      </div>
    </div>
  );
};
