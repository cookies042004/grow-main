import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useFetchData } from "../hooks/useFetchData";
import { ClipLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AwardComponent.css";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#1d2a3b" size={50} />
      </div>
    );
  }
  if (error) return <p>Error fetching data.</p>;

  return (
    <div className="award-section">
      <div className="award-container">
        <h1 className="award-heading text-center text-2xl lg:text-4xl font-medium mb-6 text-[#1d2a3b]">
          Awards & Achievements
        </h1>

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
          navigation={true}
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
      </div>
    </div>
  );
};