import React from "react";
import "./Event.css";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress } from "@mui/material";
import eventBanner from "../../assets/img/eventBanner.jpg";
import { Helmet } from "react-helmet-async";

export const Event = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/events`;
  const { data, loading, error } = useFetchData(apiUrl);
  const events = data?.events || [];

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Grow Infinity Realtors | Events</title>
        <meta
          name="description"
          content="Explore Grow Infinity latest events and activities that showcase our commitment to excellence."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}/events`}
        />
      </Helmet>

      {/* Banner Section */}
      <div className="eventbanner relative overflow-hidden">
        <img
          src={eventBanner}
          alt="Event Banner"
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 flex items-center justify-center">
          <div className="text-center text-white relative z-10 mt-10">
            <h1 className="font-sans font-bold text-3xl lg:text-4xl">
              Events
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      {/* Events Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
         <h1 className="font-sans lg:pb-8 text-2xl font-medium text-[#1d2a3b] text-center">
          Events
        </h1>
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
                const imageUrl =
                  event.image?.[0]?.replace(/\\/g, "/") || "/default-event.jpg";

                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link
                          to={`/event/${event._id}`}
                          className="bg-[#1d2a3b] text-white font-semibold py-2 px-4 rounded-full transition-colors"
                        >
                          View Images
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Posted On:{" "}
                        {new Date(event.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="flex flex-col items-center text-center">
                <img
                  src="/no-events.svg"
                  alt="No events"
                  className="w-52 h-52 mb-4"
                  loading="lazy"
                />
                <p className="text-lg text-gray-500">
                  No events found at the moment.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};
