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
        .catch((error) => console.error("Error fetching property details:", error));
    }
  }, [slug]);

  const path = location.pathname;
  const pathSegments = path.split("/").filter(Boolean);

  // Convert raw paths into readable names
  const formatPath = (segment) => {
    const pathMap = {
      properties: "Properties",
      about: "About Us",
      contact: "Contact",
    };
    return pathMap[segment] || segment;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1280px] mx-5 my-5 bg-gray-100 p-3 lg:p-4 shadow-md rounded-lg text-xs lg:text-sm">
        <span className="text-gray-600">Home</span>

        {pathSegments.map((segment, index) => (
          <span key={index} className="font-medium text-gray-700">
            {" → "}
            {index === pathSegments.length - 1 && slug ? categoryName || "Loading..." : formatPath(decodeURIComponent(segment))}
          </span>
        ))}
      </div>
    </div>
  );
};
