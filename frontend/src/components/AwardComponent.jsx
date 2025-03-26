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
  if (error)
    return (
      <div className="col-span-12 flex flex-col items-center">
        <img src="https://shorturl.at/6C2TM" alt="Error loading awards" className="w-40" />
        <p className="text-red-500 mt-2 text-lg">Failed to load Awards. Please try again.</p>
      </div>
    );

  return (
    <div className="award-section py-12 px-6">
      <div className="award-container max-w-6xl mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-medium font-sans text-[#1d2a3b] mb-8">
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
            depth: 150,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="award-swiper_container pb-12"
        >
          {awards.map((award, index) => (
            <SwiperSlide key={index} className="award-swiper-slide">
              <div className="relative overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={award.image}
                  alt={award.title || `Award ${index + 1}`}
                  className="w-full h-64 object-cover rounded-3xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 text-white rounded-3xl">
                  {/* <h3 className="text-lg font-semibold">{award.title || "Award"}</h3>  */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
