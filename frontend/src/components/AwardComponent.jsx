import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useFetchData } from "../hooks/useFetchData";
import { ClipLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AwardComponent.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  const swiperRef = useRef(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#1d2a3b" size={50} />
      </div>
    );
  }
  if (error) return <p>Error fetching data.</p>;

  return (
    <div className="award-section relative">
      <div className="award-container">
        <h1 className="award-heading text-center text-2xl lg:text-4xl font-medium text-[#1d2a3b]">
          Awards & Achievements
        </h1>

        {/* Swiper Slider */}
        <div className="relative flex items-center justify-center">
          <button
            className="arrow prev bg-[#1d2a3b] text-white rounded-full p-1"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <MdArrowBack size={24} />
          </button>

          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="award-swiper_container pb-12"
          >
            {awards.map((award, index) => (
              <SwiperSlide key={index} className="award-swiper-slide">
                <img
                  src={award.image}
                  alt={`Award ${index + 1}`}
                  className="award-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="arrow arrow next bg-[#1d2a3b] text-white rounded-full p-1"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <MdArrowForward size={24} />
          </button>
        </div>

        {/* View All Button */}
        {/* <div className="flex justify-center mt-6">
          <button className="bg-[#1d2a3b] text-white px-6 py-3 rounded-lg shadow-md flex items-center space-x-2">
            <span>View all</span>
            <FaArrowRight />
          </button>
        </div> */}
      </div>
    </div>
  );
};