import React, { useState } from "react";
import "./SingleEvent.css";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { useFetchData } from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { MdClose, MdArrowBack, MdArrowForward } from "react-icons/md";
import eventBanner from "../../assets/img/eventBanner.jpg";
import { Helmet } from "react-helmet-async";

export const SingleEvent = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/events/${id}`;
  const { data, loading, error } = useFetchData(apiUrl);
  const event = data?.event;

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 8;

  // Function to open modal at selected image
  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to navigate images in modal
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? event.image.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === event.image.length - 1 ? 0 : prev + 1));
  };

  // Pagination logic
  const totalPages = Math.ceil((event?.image?.length || 0) / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const paginatedImages = event?.image?.slice(startIndex, startIndex + imagesPerPage) || [];

  // Handle page navigation
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Grow Infinity Realtors | Event</title>
        <meta
          name="description"
          content="Explore our latest events and activities at Grow Infinity Realtors."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}/events/${id}`}
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
          <div className="text-center text-white relative z-10">
            <h1 className="font-dmsans font-semibold text-4xl mb-4">
              Events
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      {/* Event Content */}
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          {event && (
            <>
              <h1 className="font-sans text-3xl lg:text-4xl font-medium text-center text-[#1d2a3b] mb-8">
                {event.title}
              </h1>
              <div className="text-gray-700 text-justify mb-6">
                {event.description}
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedImages.map((item, index) => (
                  <div
                    key={startIndex + index}
                    className="rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => openModal(startIndex + index)}
                  >
                    <img
                      src={item}
                      alt={`Event Image ${startIndex + index + 1}`}
                      className="w-full h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-gray-800 text-white rounded-md ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-lg font-semibold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-gray-800 text-white rounded-md ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={closeModal}
          >
            <MdClose />
          </button>

          {/* Image Counter */}
          <div className="absolute top-5 left-5 text-white text-lg">
            {currentIndex + 1} / {event.image.length}
          </div>

          {/* Image Display */}
          <img
            src={event.image[currentIndex]}
            alt="Event"
            className="lg:w-[500px] lg:h-[450px] w-[300px] object-contain"
          />

          {/* Navigation Arrows */}
          <button
            className="absolute left-1 text-white text-3xl bg-black/50 p-2 rounded-full"
            onClick={prevImage}
          >
            <MdArrowBack />
          </button>
          <button
            className="absolute right-1 text-white text-3xl bg-black/50 p-2 rounded-full"
            onClick={nextImage}
          >
            <MdArrowForward />
          </button>
        </div>
      )}
    </Layout>
  );
};
