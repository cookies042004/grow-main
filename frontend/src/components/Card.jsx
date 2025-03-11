import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Card.css";
import { useFetchData } from "../hooks/useFetchData";
import { PropertyCard } from "./PropertyCard";
import { CircularProgress } from "@mui/material";

export const Card = ({ category }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;
  const { data, loading, error } = useFetchData(apiUrl);
  const properties = data?.properties || [];

  return (
    <div className="card-container">
      {loading && (
        <div className="flex justify-center">
          <CircularProgress size="30px" />
        </div>
      )}
      {error && (
        <div className="col-span-12 flex flex-col items-center">
          <img src="https://shorturl.at/6C2TM" alt="error" />
        </div>
      )}

      {properties.length > 0 ? (
        <Slider {...settings}>
          {properties
            .filter((property) => property.category.name === category)
            .map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
                image={property.image[0]}
              />
            ))}
        </Slider>
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No properties found.</p>
        )
      )}
    </div>
  );
};
