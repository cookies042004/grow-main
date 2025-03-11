import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useFetchData } from "../hooks/useFetchData";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AwardComponent.css";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <div className="award-section">
      <div className="award-container">
        <h1 className="award-heading text-center text-3xl lg:text-4xl font-medium mb-6 text-[#03002e]">
          Awards
        </h1>
        <h2 className="award-subheading text-center text-xl lg:text-3xl mb-6 text-[#03002e]">
          Honoring a legacy of outstanding performance and impact.
        </h2>

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
          className="award-swiper_container"
        >
          {awards.map((award, index) => (
            <SwiperSlide key={index} className="award-swiper-slide">
              <img src={award.image} alt={`Award ${index + 1}`} className="award-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
