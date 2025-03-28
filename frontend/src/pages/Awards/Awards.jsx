import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { ClipLoader } from "react-spinners";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import awardsBanner from "../../assets/img/awardsbanner.jpg";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

export const Awards = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];
  
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const awardsPerPage = 9;

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % awards.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + awards.length) % awards.length);
  };

  const indexOfLastAward = currentPage * awardsPerPage;
  const indexOfFirstAward = indexOfLastAward - awardsPerPage;
  const currentAwards = awards.slice(indexOfFirstAward, indexOfLastAward);
  const totalPages = Math.ceil(awards.length / awardsPerPage);

  return (
    <>
      <ToastContainer />
      <Layout>
        {/* Hero Banner */}
        <div
          className="relative flex items-center justify-center text-center h-[260px] sm:h-[300px] md:h-[350px] lg:h-[400px] px-4"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${awardsBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium">
            Awards & Achievements
          </h1>
        </div>

        <NavigationBar />

        {/* Awards Section */}
        <div className="my-10 px-4 sm:px-8 lg:px-8">
        <h1 className="font-sans lg:pb-8 text-2xl lg:text-4xl font-medium text-[#1d2a3b] text-center">
            Awards & Achievements
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {loading && (
              <div className="col-span-2 flex justify-center">
                <CircularProgress size="30px" />
              </div>
            )}

            {error && (
              <div className="col-span-12 flex flex-col items-center">
                <img src="https://shorturl.at/6C2TM" alt="error" />
                <p className="text-red-500 mt-2">Failed to load awards. Please try again.</p>
              </div>
            )}

            {currentAwards.length > 0
              ? currentAwards.map((award, index) => (
                  <div key={award._id} className="flex flex-col items-center p-3">
                    <img
                      src={award.image}
                      alt={award.name || "Award"}
                      className="w-full sm:w-[200px] md:w-[352px] h-[352px] sm:h-[200px] md:h-[352px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => openModal(index)}
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
          {/* Pagination */}
           {awards.length > awardsPerPage && (
                  <div className="flex justify-center m-6">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, page) => setCurrentPage(page)}
                      renderItem={(item) => (
                        <PaginationItem
                          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                          {...item}
                        />
                      )}
                    />
                  </div>
                )}
        </div>
      </Layout>

      {/* Modal for Image Preview */}
      {modalOpen && awards.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="absolute top-5 left-5 text-white text-lg">
            {currentIndex + 1} / {awards.length}  
          </div>
          <button
            className="absolute top-5 right-5 text-white text-xl z-50"
            onClick={closeModal}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-10 text-white text-xl z-50"
            onClick={prevImage}
          >
            <FaArrowLeft />
          </button>
          <img
            src={awards[currentIndex]?.image}
            alt={awards[currentIndex]?.name || "Award"}
            className="max-w-[90%] max-h-[80vh] object-contain rounded-lg shadow-lg"
          />
          <button
            className="absolute right-10 text-white text-xl z-50"
            onClick={nextImage}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </>
  );
};
