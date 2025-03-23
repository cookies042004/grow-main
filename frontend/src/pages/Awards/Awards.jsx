import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress } from "@mui/material";
import awardsBanner from "../../assets/img/awardsbanner.jpg";

export const Awards = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;

  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  return (
    <>
      <ToastContainer />
      <Layout>
        {/* Hero Banner */}
        <div
          className="relative flex items-center justify-center text-center h-[260px] sm:h-[300px] md:h-[350px] lg:h-[400px] px-4"
          style={{
            background: `linear-gradient(
                rgba(0, 0, 0, 0.6), 
                rgba(0, 0, 0, 0.3)
              ), url(${awardsBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Our Achievements & Awards
          </h1>
        </div>

        <NavigationBar />

        {/* Awards Section */}
        <div className="my-10 px-4 sm:px-8 lg:px-16">
          <h2 className="text-center text-[#1d2a3b] text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-4">
            Recognizing Excellence
          </h2>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1280px] mx-auto">
            {loading && (
              <div className="col-span-12 flex justify-center">
                <CircularProgress size="30px" />
              </div>
            )}

            {error && (
              <div className="col-span-12 flex flex-col items-center">
              <img src="https://shorturl.at/6C2TM" alt="error" />
              <p className="text-red-500 mt-2">
                Failed to load awards. Please try again.
              </p>
            </div>
            )}

            {awards.length > 0
              ? awards.map((award) => (
                  <div
                    key={award._id}
                    className="flex flex-col items-center p-3"
                  >
                    <img
                      src={award.image}
                      alt={award.name || "Award"}
                      className="w-[280px] sm:w-[200px] md:w-[220px] h-[280px] sm:h-[200px] md:h-[220px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                    <p className="mt-3 text-center text-sm sm:text-base font-medium text-gray-700">
                      {award.name}
                    </p>
                  </div>
                ))
              : !loading && (
                  <div className="col-span-12 flex justify-center">
                    <p className="text-gray-500">No awards found.</p>
                  </div>
                )}
          </div>
        </div>
      </Layout>
    </>
  );
};
