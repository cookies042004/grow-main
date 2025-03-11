import React, { useState, useRef, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
// import quote from "../assets/img/SVG.png";
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
        <h1 className="flex justify-center items-center lg:text-4xl text-2xl text-[#03002e] font-bold py-4">
          <hr className="border-t-4 border-[#03002e] w-[80px] h-[2px]" /> &nbsp;
          Testimonials &nbsp;
          <hr className="border-t-4 border-[#03002e] w-[80px] h-[2px]" />
        </h1>
        <h1 className="flex justify-center items-center text-xl lg:text-3xl text-[#03002e]">
          Words That Speak Louder Than Promises.
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center m-3 lg:m-5 px-5 lg:px-7 font-roboto lg:pe-20">
          <h1 className="text-xl lg:text-3xl items-left text-[#1A1A1A] my-4 font-medium">
            What our customers are saying?
          </h1>
          <p className="text-[#1A1A1A] text-md lg:text-lg text-justify my-5 lg:pe-20">
            Don't just take our word for it—hear directly from those who have
            experienced our services. Our customers' stories reflect the
            dedication, expertise, and care we put into every transaction. Read
            their testimonials and see why we're the trusted choice for all your
            real estate needs.
          </p>
          <div className="flex justify-end lg:justify-start gap-10 mt-5">
            <div>
              <h3 className="font-bold text-[#1A1A1A] text-sm lg:text-2xl">
                2k+
              </h3>
              <p className="text-xs lg:text-lg">Happy People</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A] text-sm lg:text-2xl">
                4.88
              </h3>
              <p className="text-xs lg:text-lg">Overall rating</p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#e7c874" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative my-14 w-full flex flex-col items-center">
          <div className="w-full max-w-xl p-4 bg-white tranform shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)]">
            {loading && <CircularProgress size={30} className="mx-auto" />}
            {error && (
              <div className="col-span-12 flex flex-col items-center">
                <img src="https://shorturl.at/6C2TM" alt="error" />
                <p className="text-red-500 mt-2">
                  Failed to load testimonails. Please try again.
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
                      <div className="relative flex items-center gap-5">
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
                        {/* Google Review Image Positioned at Top Right */}
                        <div className="absolute right-0 brightness-105">
                          <img
                            src={googleReview}
                            alt="Google Review"
                            className="w-[40px] lg:w-[70px] h-[40px] lg:h-[70px] object-cover"
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm lg:text-lg text-justify font-roboto font-medium text-[#1A1A1A] lg:leading-[1.5]">
                          {testimonial.review.slice(0, 270) + "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="flex gap-4 mb-3">
              <div className="pr-16">
                <button
                  ref={prevRef}
                  className="p-3 bg-[#03002e] text-white rounded-full"
                >
                  <FaChevronLeft size={15} />
                </button>
              </div>
              <div
                ref={paginationRef}
                className="swiper-pagination-custom py-2"
              ></div>
              <div className="pl-16">
                <button
                  ref={nextRef}
                  className="p-3 bg-[#03002e] text-white rounded-full"
                >
                  <FaChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
