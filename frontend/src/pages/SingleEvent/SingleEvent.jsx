import React from "react";
import "./SingleEvent.css";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { useFetchData } from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const SingleEvent = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/events/${id}`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const event = data?.event;

  return (
    <Layout>
      <div className="singleeventbanner flex justify-center items-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center mt-10 lg:mt-20">
            <h1 className="font-dmsans font-medium text-white text-3xl lg:text-4xl capitalize">
              Events
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-sans text-3xl lg:text-4xl font-medium text-center mb-8">
            {event?.title}
          </h1>
          {event && (
            <div className="flex flex-col space-y-8 lg:space-x-10">
              <div className="text-gray-700 leading-relaxed lg:w-full">
                {event.description}
              </div>
              <div className="lg:w-[90%]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {event.image.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                    >
                      <img
                        src={item}
                        alt={`Event Image ${index + 1}`}
                        className="w-full h-52 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {loading && (
            <div className="flex justify-center mt-8">
              <CircularProgress size={30} />
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 mt-8">
              <p>Error: {error}</p>
            </div>
          )}
          {!loading && !error && !event && (
            <p className="text-center text-gray-500 mt-8">Event not found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};