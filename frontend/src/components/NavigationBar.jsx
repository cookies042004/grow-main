import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export const NavigationBar = () => {
  const location = useLocation();
  const { id } = useParams(); // Get event ID from URL
  const [eventName, setEventName] = useState("");

  // Fetch event name when ID changes
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.BASE_URL}/api/v1/events/${id}`)
        .then((response) => {
          if (response.data?.event?.title) {
            setEventName(response.data.event.title);
          }
        })
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [id]);

  const path = location.pathname;
  const pathSegments = path.split("/").filter(Boolean);

  // Convert raw paths into readable names
  const formatPath = (segment) => {
    const pathMap = {
      events: "Events",
      about: "About Us",
      contact: "Contact",
      services: "Services",
    };
    return pathMap[segment] || segment;
  };

  return (
    <div className="w-full p-4 flex justify-center">
      <div className="w-full max-w-[1280px] mx-auto my-5 bg-gray-100 p-3 lg:p-4 shadow-md rounded-lg text-xs lg:text-sm">
        <span className="text-gray-600">Home</span>

        {pathSegments.map((segment, index) => (
          <span key={index} className="font-medium text-gray-700">
            {" → "}
            {index === pathSegments.length - 1 && id ? (
              <span>{eventName || "Loading..."}</span>
            ) : (
              formatPath(segment)
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
