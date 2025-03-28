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
    <div className="py-2 lg:py-4 lg:px-10 px-10">
      <div>
        <h1 className="flex justify-center items-center lg:text-4xl text-2xl text-[#1d2a3b] font-medium py-4">
          Testimonials
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 max-w-[1280px] mx-auto">
        <div className="flex flex-col items-center m-3 lg:m-5 px-5 lg:px-7 font-roboto lg:pe-20">
          <h1 className="text-xl lg:text-3xl items-left text-[#1A1A1A] my-4 px-[-80px] font-medium">
            What our customers are saying?
          </h1>
          <p className="text-[#1A1A1A] text-md lg:text-lg mt-5">
            Don't just take our word for it—hear directly from those who have
            experienced our services. Our customer's stories reflect the
            dedication, expertise, and care we put into every transaction. Read
            their testimonials and see why we're the trusted choice for all your
            real estate needs.
          </p>
          <div className="flex justify-end lg:justify-start gap-10 mt-12">
            <div>
              <h3 className="font-bold text-[#1d2b3a] text-sm lg:text-2xl">
                2k+
              </h3>
              <p className="text-md lg:text-lg">Happy People</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1d2b3a] text-sm lg:text-2xl">
                4.88
              </h3>
              <p className="text-md lg:text-lg">Overall rating</p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#e7c874" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative my-12 w-full flex flex-col items-center">
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
                        <p className="text-sm lg:text-lg px-4 text-justify font-roboto font-medium text-[#1A1A1A] lg:leading-[1.5]">
                          {testimonial.review.length > 200
                            ? testimonial.review.slice(0, 150) + "..."
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
                className="w-[30px] h-[30px] p-2 bg-[#1d2a3b] text-white rounded-full"
              >
                <FaChevronLeft size={15} />
              </button>
              <div
                ref={paginationRef}
                className="swiper-pagination-custom"
              ></div>
              <button
                ref={nextRef}
                className="w-[30px] h-[30px] p-2 bg-[#1d2a3b] text-white rounded-full"
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