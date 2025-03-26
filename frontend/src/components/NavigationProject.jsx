import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export const NavigationProject = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [eventName, setEventName] = useState("");

  console.log("slug", slug);

  // Fetch event category name when slug is available
  useEffect(() => {
    if (slug) {
      axios
        .get(`${process.env.BASE_URL}/api/v1/property/${slug}`)
        .then((response) => {
          const category = response.data?.property?.category?.name;
          if (category) setEventName(decodeURIComponent(category));
        })
        .catch((error) => console.error("Error fetching event details:", error));
    }
  }, [slug]);

  console.log("Event Name:", eventName);

  const path = location.pathname.split("/").filter(Boolean);

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-[1280px] mx-auto my-5 bg-gray-100 p-3 lg:p-4 shadow-md rounded-lg text-xs lg:text-sm">
        <span className="text-gray-600">Home</span>

        {path.map((segment, index) => {
          const decodedSegment = decodeURIComponent(segment);

          return (
            <span key={index} className="font-medium text-gray-700">
              {" → "}
              {index === path.length - 1 && slug ? slug || "Loading..." : decodedSegment}
            </span>
          );
        })}
      </div>
    </div>
  );
};
