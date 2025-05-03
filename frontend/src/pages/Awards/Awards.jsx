import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import awardsBanner from "../../assets/img/awardsbanner.jpg";
import { FaTimes } from "react-icons/fa";

export const Awards = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const awardsPerPage = 9;

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

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
          className="relative flex items-center justify-center text-center h-[300px] px-4"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${awardsBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white text-3xl lg:text-4xl mt-10 font-bold">Awards & Achievements</h1>
        </div>

        <NavigationBar />

        {/* Awards Section */}
        <div className="my-10 px-4 sm:px-8 lg:px-8">
          <h1 className="text-2xl font-medium text-[#1d2a3b] text-center mb-6">
            Awards & Achievements
          </h1>

          <div className="flex flex-wrap justify-start gap-10 lg:p-6">
            {loading && (
              <div className="flex justify-center items-center w-full">
                <CircularProgress size="30px" className="flex justify-center" />
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center w-full">
                <p className="text-red-500 mt-2 font-medium">Failed to load awards. Please try again.</p>
              </div>
            )}

            {currentAwards.length > 0
              ? currentAwards.map((award, index) => (
                <div key={award._id} className="flex flex-col items-center">
                  <img
                    src={award.image}
                    alt={award.name || "Award Image"}
                    className="w-[350px] h-[350px] object-contain rounded-lg shadow-lg transition-transform duration-300 cursor-pointer"
                    onClick={() => openModal(index + indexOfFirstAward)}
                  />
                  <p className="text-center text-sm sm:text-base font-medium text-gray-700 mt-2">
                    {award.name}
                  </p>
                </div>
              ))
              : !loading && (
                <div className="flex justify-center w-full">
                  <p className="text-gray-500">No awards found.</p>
                </div>
              )}
          </div>


          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center m-6">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                renderItem={(item) => (
                  <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                )}
              />
            </div>
          )}
        </div>
      </Layout>

      {/* Modal for Image Preview */}
      {modalOpen && awards.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="absolute top-5 left-5 text-white text-lg">{currentIndex + 1} / {awards.length}</div>
          <button className="absolute top-5 right-5 text-white text-xl z-50" onClick={closeModal}>
            <FaTimes />
          </button>
          <button className="absolute left-1 text-white text-xl bg-black/50 rounded-full z-50" onClick={prevImage}>
            <ArrowBackIcon fontSize="large" />
          </button>
          <img
            src={awards[currentIndex]?.image}
            alt={awards[currentIndex]?.name || "Award"}
            className="lg:w-[550px] lg:h-[500px] w-[400px] h-[300px] object-contain rounded-lg shadow-lg"
          />
          <button className="absolute right-1 text-white bg-black/50 rounded-full text-xl z-50" onClick={nextImage}>
            <ArrowForwardIcon fontSize="large" />
          </button>
        </div>
      )}
    </>
  );
};
