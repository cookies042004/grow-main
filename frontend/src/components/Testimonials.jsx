import React, { useState, useRef, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import googleReview from "../assets/img/googleReview.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CircularProgress } from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Testimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const apiUrl = `${process.env.BASE_URL}/api/v1/testimonials`;

  const { data, loading, error } = useFetchData(apiUrl);
  const testimonials = data?.testimonials || [];
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.params.pagination.el = paginationRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
      swiperInstance.pagination.init();
      swiperInstance.pagination.update();
    }
  }, [swiperInstance]);

  return (
    <div className="py-2 lg:py-4 lg:px-16 px-10">
      <div>
        <h1 className="flex justify-center items-center lg:text-4xl text-3xl text-[#1d2a3b] font-medium py-4">
          Testimonials
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left m-4 lg:m-8 px-6 lg:px-10 font-roboto">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-medium text-[#1A1A1A] mb-6 leading-snug">
            What Our Customers Are Saying
          </h1>

          {/* Description */}
          <p className="text-[#444] text-base lg:text-lg leading-relaxed max-w-xl">
            Don't just take our word for it—hear directly from those who have
            experienced our services. Our customer stories reflect our
            dedication, expertise, and care. Read their testimonials and see why
            we're the trusted choice for all your real estate
            needs.
          </p>

          {/* Stats Section */}
          <div className="mt-10 flex gap-10">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-bold text-[#1A1A1A] bg-gradient-to-r from-[#e7c874] to-[#f1d488] text-transparent bg-clip-text">
                2k+
              </h3>
              <p className="text-gray-600 text-lg">Happy Clients</p>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-bold text-[#1A1A1A] bg-gradient-to-r from-[#e7c874] to-[#f1d488] text-transparent bg-clip-text">
                4.88
              </h3>
              <p className="text-gray-600 text-lg">Overall Rating</p>

              {/* Star Rating */}
              <div className="flex justify-center lg:justify-start mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#e7c874" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative my-14 w-full flex flex-col items-center">
          <div className="w-full max-w-xl p-4 bg-white transform shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
            {loading && <CircularProgress size={30} className="mx-auto" />}
            {error && (
              <div className="col-span-12 flex flex-col items-center">
                <img src="https://shorturl.at/6C2TM" alt="error" />
                <p className="text-red-500 mt-2">
                  Failed to load testimonials. Please try again.
                </p>
              </div>
            )}
            <Swiper
              onSwiper={setSwiperInstance}
              grabCursor
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: paginationRef.current }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              className="mySwiper testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <div className="font-roboto">
                    <div className="flex-col items-center gap-4 testimonial-item">
                      <div className="relative flex items-center gap-5 px-4">
                        <div className="border border-gray-300 p-1 lg:p-1 rounded-full">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-[50px] lg:w-[70px] rounded-[50%] h-[50px] lg:h-[70px] object-cover object-top"
                          />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <h6 className="text-[#1A1A1A] text-sm lg:text-2xl">
                            {testimonial.name}
                          </h6>
                          <h2 className="text-sm text-[#1A1A1A] font-bold">
                            {testimonial.role}
                          </h2>
                        </div>
                        <div className="absolute right-0 brightness-105">
                          <img
                            src={googleReview}
                            alt="Google Review"
                            className="w-[40px] lg:w-[70px] h-[40px] lg:h-[70px] object-cover"
                          />
                        </div>
                      </div>

                      <div className="mt-5 h-[170px] overflow-hidden">
                        <p className="text-sm lg:text-lg text-justify font-roboto font-medium text-[#1A1A1A] lg:leading-[1.5] px-4">
                          {testimonial.review.length > 200
                            ? testimonial.review.slice(0, 200) + "..."
                            : testimonial.review}
                        </p>
                        {testimonial.review.length > 200 && (
                          <button
                            className="text-[#1d2a3b] font-semibold mt-5 cursor-pointer px-4"
                            onClick={() => setSelectedReview(testimonial)}
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="flex gap-4 mb-3">
              <button
                ref={prevRef}
                className="p-3 bg-[#1d2a3b] text-white rounded-full"
              >
                <FaChevronLeft size={15} />
              </button>
              <div
                ref={paginationRef}
                className="swiper-pagination-custom py-2"
              ></div>
              <button
                ref={nextRef}
                className="p-3 bg-[#1d2a3b] text-white rounded-full"
              >
                <FaChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedReview.name}</h2>
              <img
                src={googleReview}
                alt="Google Review"
                className="w-[40px] h-[40px] object-cover"
              />
            </div>
            <p className="mt-4">{selectedReview.review}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#1d2a3b]  text-white rounded"
              onClick={() => setSelectedReview(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
