import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import { Link } from "react-router-dom";

export const RecentProperty = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/property/recent-properties`;
  const { data, loading, error } = useFetchData(apiUrl);
  const properties = data.properties;

  return (
    <div className="bg-white p-4 border border-gray-200 shadow-sm">
      <h2 className="text-lg text-center font-semibold text-gray-800 mb-4 border-b pb-2">
        Latest Properties
      </h2>

      {loading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-sm text-red-500 text-center">Failed to load</p>}

      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scroll">
        {properties?.map((property) => (
          <Link
            to={`/project/${property.slug}`}
            key={property._id}
            className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition"
          >
            <img
              src={property.image?.[0] || "https://via.placeholder.com/60"}
              alt={property.name}
              className="h-[50px] w-[50px] rounded object-cover border"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-700 line-clamp-1">
                {property.name}
              </h3>
              <p className="text-xs text-gray-500">
                {new Date(property.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
