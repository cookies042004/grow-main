import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export const NavigationProject = () => {
  const location = useLocation();
  const { slug } = useParams(); // Grabs the event ID from the URL
  const [eventName, setEventName] = useState("");

  console.log("slug", slug);

  // Fetch event name when the ID is available
//   useEffect(() => {
//     if (slug) {
//       axios
//         .get(`${process.env.BASE_URL}/api/v1/property/${slug}`)
//         .then((response) => {
//           const decoded = decodeURIComponent(
//             response.data.property.category.name
//           );
//           setEventName(decoded); // Set event name
//         })
//         .catch((error) => {
//           console.error("Error fetching event details:", error);
//         });
//     }
//   }, [slug]);

  const path = location.pathname; // Get the full path (e.g., '/about')
  const pathSegments = path.split("/").filter(Boolean); // Split the path and remove empty segments
  console.log("path", pathSegments);

  return (
    <div className="max-w-[1280px] mx-5 my-10">
      <div className="bg-gray-100 p-3 lg:p-4 shadow-lg capitalize rounded-lg text-xs lg:text-sm">
        Home{" "}
        {pathSegments.map((item, index) => {
          const decodedItem = decodeURIComponent(item); // Decode each segment

          if (index === pathSegments.length - 1 && slug) {
            return (
              <span
                key={index}
                className="font-medium text-xs lg:text-sm capitalize"
              >
                / {slug || ""}
              </span>
            );
          }

          return (
            <span
              key={index}
              className="font-medium text-xs lg:text-sm capitalize"
            >
              / {decodedItem}
            </span>
          );
        })}
      </div>
    </div>
  );
};
