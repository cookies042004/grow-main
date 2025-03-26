import React from "react";
import "./Event.css";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress } from "@mui/material";
import eventBanner from "../../assets/img/eventBanner.jpg";

export const Event = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/events`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const events = data?.events || [];

  return (
    <Layout>
      <div className="eventbanner relative overflow-hidden">
        <img
          src={eventBanner}
          alt="Event Banner"
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 flex items-center justify-center">
          <div className="text-center text-white relative z-10">
            <h1 className="font-dmsans font-semibold text-4xl mb-4">
              Explore Our Events
            </h1>
            <p className="text-lg">Discover exciting experiences and join the adventure.</p>
          </div>
        </div>
      </div>

      <NavigationBar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center">
              <CircularProgress size={40} />
            </div>
          )}
          {error && (
            <div className="text-center text-red-500">
              <p>Error: {error}</p>
            </div>
          )}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => {
                const imageUrl = event.image[0].replace(/\\/g, "/");
                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg" // Added hover:shadow-lg
                  >
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link
                          to={`/event/${event._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Posted On: {new Date(event.createdAt).toLocaleDateString()}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading && !error && <p className="text-center text-gray-500">No events found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};