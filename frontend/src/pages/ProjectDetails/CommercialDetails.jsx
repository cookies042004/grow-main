import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import EastIcon from "@mui/icons-material/East";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import axios from "axios";
import "./CommercialDetails.css";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { Marquee } from "../../components/Marquee";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import size from "../../assets/icons/size.png";
import construction from "../../assets/icons/construction.png";
import area from "../../assets/icons/area.png";
import bhk from "../../assets/icons/bhk.png";
import price from "../../assets/icons/price.png";
import units from "../../assets/icons/units.png";
import { Calculator } from "../../components/Calculator";
import comingsoon from "../../assets/img/comingsoon.jpg";
import { RecentProperty } from "../../components/RecentProperty";
import { ContactForm } from "../../components/ContactForm";
import Carousel from "../../components/Carousel";

export const CommercialDetails = () => {
  const { slug } = useParams(); // Get slug from URL
  const decodedSlug = decodeURIComponent(slug); // Decode slug if needed

  const [propertyId, setPropertyId] = useState(null);
  const [property, setProperty] = useState(null);
  const [allAmenities, setAllAmenities] = useState([]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);

  useEffect(() => {
    const fetchPropertyByName = async () => {
      try {
        // Fetch property details using slug
        const res = await fetch(
          `${process.env.BASE_URL}/api/v1/commercial/search-by-name/${decodedSlug}`
        );
        const data = await res.json();

        if (data.property) {
          setProperty(data.property); // Store full property data
          setPropertyId(data.property._id); // Store ID
        } else {
          console.error("Property not found");
        }
      } catch (error) {
        console.error("Error fetching property by name:", error);
      }
    };

    fetchPropertyByName();
  }, [slug]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/api/v1/commercial-amenities`)
      .then((response) => {
        setAllAmenities(response.data.amenity);
      })
      .catch((error) => {
        console.error("Error fetching amenities:", error);
      });
  }, []);

  useEffect(() => {
    if (property?.amenities?.length && Array.isArray(allAmenities)) {
      const matchedAmenities = allAmenities.filter((amenity) =>
        property.amenities.includes(amenity._id)
      );
      setFilteredAmenities(matchedAmenities);
    }
  }, [property, allAmenities]);

  // Fetch full property details using ID (when propertyId is available)
  const apiUrl = propertyId
    ? `${process.env.BASE_URL}/api/v1/commercial/${propertyId}`
    : null;
  const { data, loading, error, refetch } = useFetchData(apiUrl);

  useEffect(() => {
    if (data?.property) {
      setProperty(data.property);
    }
  }, [data]);

  const images = property?.image ? property.image.map((item) => item) : [];
  const video = property?.video ? property.video.map((item) => item) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  function toINRCr(amount) {
    // writing code for converting amount in lakhs and crores
    if (amount < 10000000) {
      return (amount / 100000).toFixed(1) + " Lac";
    } else {
      return (amount / 10000000).toFixed(1) + " Cr";
    }
  }

  // function for unit selection on the basis of sizeUnit
  function selectUnit(sizeUnit) {
    if (sizeUnit === "sqFt") {
      return property?.size + " sq.ft.";
    } else if (sizeUnit === "yard") {
      return property?.size + " sq.yd.";
    }
  }

  function divide(sizeUnit) {
    if (sizeUnit === "sqFt") {
      return Math.trunc(property?.price / property?.size) + " /  sq.ft.";
    } else if (sizeUnit === "yard") {
      return Math.trunc(property?.price / property?.size) + " / sq.yd.";
    }
  }

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsFading(false);
    }, 500); // Fade duration in ms
  };

  const handlePrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 500);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const fullDescription = property?.description || "";

  // Truncate description only if it has content
  const truncatedDescription =
    fullDescription.length > 200
      ? fullDescription.slice(0, 500) + "..."
      : fullDescription; // If less than 200 characters, no truncation

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault(); // Prevent default anchor behavior

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Adjust according to navbar height
        behavior: "smooth",
      });
    }
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        // When user scrolls down, make navbar sticky
        setIsSticky(true);
      } else {
        // When at the top, revert to normal position
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      {/* Project Details Hero */}
      <div className="detailsbanner flex items-center justify-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center lg:mt-20">
            <h1 className="ffont-dmsans font-medium text-white text-3xl lg:text-4xl">
              Property Details
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 lg:p-3" style={{ scrollBehavior: "smooth" }}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:grid sm:grid-cols-12 gap-6 max-w-[1280px] mt-3 lg:mt-8 mx-auto">
            <div className="col-span-12 lg:col-span-9 bg-white px-3 lg:px-12 py-4 lg:py-8">
              <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.3)] pb-4 mb-10">
                {/* Image Carousel */}
                <div className="pt-6 px-4 sm:px-10">
                  <Carousel galleryImages={images} />
                </div>

                {/* Property Info Container */}
                <div className="border border-gray-300 sm:m-10 mt-5 mb-1 flex flex-col sm:flex-row gap-4 sm:gap-8 p-3 bg-gray-100">
                  {/* Left Section - Property Details */}
                  <div className="flex flex-row items-center sm:items-start gap-3 w-full">
                    <img
                      src={property?.dp}
                      alt="dealer"
                      className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-[#1d2a3b] lg:px-2 pl-5 text-2xl sm:text-xl py-[1px] max-w-[250px]">
                        {property?.title}
                      </h1>
                      <p className="text-sm text-[#03002a] lg:px-2 pl-5 py-[1px]">
                        By {property?.builder}
                      </p>
                      <div className="flex items-center lg:px-0 pl-4">
                        <LocationOnIcon className="text-red-600 text-xs" />
                        <p className="text-sm text-red-600 py-[1px]">
                          {property?.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Price & Buttons */}
                  <div className="flex flex-col items-center sm:items-end w-full sm:w-2/3">
                    <h5 className="font-semibold text-[#1d2a3b] text-xl sm:text-2xl pr-2">
                      ₹{toINRCr(property?.price)}*
                    </h5>

                    {/* Buttons - Stack on Small Screens */}
                    <div className="flex flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto py-2 pr-2">
                      <Link to={`/brochure`} className="w-full sm:w-auto">
                        <Button
                          startIcon={<PictureAsPdfIcon />}
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{ textTransform: "none" }}
                          className="w-full sm:w-auto"
                        >
                          Request PDF
                        </Button>
                      </Link>

                      <Button
                        startIcon={<WhatsAppIcon />}
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{ textTransform: "none" }}
                        component="a"
                        href={`https://wa.me/+918750238581?text=Hi I am interested in ${property?.name}, Please share the details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        WhatsApp Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 my-6 border-b pb-2">
                {[
                  { href: "#Description", label: "Description" },
                  { href: "#Overview", label: "Overview" },
                  { href: "#Project Amenities", label: "Project Amenities" },
                  { href: "#Video Tour", label: "Video Tour" },
                  { href: "#Emi Calculator", label: "Emi Calculator" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.label)}
                    className="px-3 sm:px-4 py-2 text-gray-700 text-base sm:text-lg transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-semibold focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 mt-8 gap-6 sm:gap-8">
                {/* Description */}
                <div
                  className="col-span-12 bg-white p-6 sm:p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="Description"
                >
                  <h3 className="text-2xl sm:text-3xl border-b-2 pb-2 font-poppins font-semibold text-[#1d2a3b]">
                    Description
                  </h3>
                  <div className="mt-4 text-gray-500 text-sm sm:text-md leading-relaxed">
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: isExpanded ? "9999px" : "500px" }}
                    >
                      <p>
                        {isExpanded ? fullDescription : truncatedDescription}
                      </p>
                    </div>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        borderRadius: "4px",
                        textTransform: "none",
                        marginTop: "10px",
                        backgroundColor: "#1d2a3b",
                      }}
                      onClick={toggleDescription}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                  </div>
                </div>

                {/* Overview */}
                <div
                  className="col-span-12 bg-white p-6 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="Overview"
                >
                  <h3 className="text-2xl border-b-2 font-poppins font-semibold pb-3 text-gray-900">
                    Project Overview
                  </h3>
                  <hr className="mb-4 border-gray-300" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    {/* Project Status */}
                    <div className="flex items-start gap-4">
                      <img
                        src={construction}
                        alt="Project Status"
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="text-gray-600 text-sm">Project Status</p>
                        <p className="text-lg font-bold text-gray-900">
                          {property?.projectStatus || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Project Size */}
                    <div className="flex items-start gap-4">
                      <img
                        src={size}
                        alt="Project Size"
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="text-gray-600 text-sm">Project Size</p>
                        <p className="text-lg font-bold text-gray-900">
                          {property?.projectSize || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Unit Area */}
                    <div className="flex items-start gap-4">
                      <img src={area} alt="Unit Area" className="w-10 h-10" />
                      <div>
                        <p className="text-gray-600 text-sm">Unit Area</p>
                        <p className="text-lg font-bold text-gray-900">
                          {selectUnit(property?.sizeUnit || "-")}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-start gap-4">
                      <img src={price} alt="Price" className="w-10 h-10" />
                      <div>
                        <p className="text-gray-600 text-sm">Price</p>
                        <p className="text-lg font-bold text-gray-900">
                          {divide(property?.sizeUnit || "-")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-span-12 bg-white p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="Project Amenities"
                >
                  <h3 className="text-3xl border-b-2 font-poppins font-semibold pb-3 text-gray-900">
                    Project Amenities
                  </h3>

                  {/* Society Amenities */}
                  <div className="p-3 bg-gray-50 shadow-md rounded-lg">
                    <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                      {filteredAmenities.length ? (
                        filteredAmenities.map((item) => (
                          <div
                            key={item._id}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={item.image || "/default-image.png"}
                              alt={item.name || "Amenity"}
                              className="h-8 w-8 object-cover rounded"
                            />
                            <p className="text-xs text-gray-600 text-center">
                              {item.name || "Unnamed"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-center text-gray-500">
                          No amenities available
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video Tour */}
                <div
                  className="col-span-12 bg-white p-6 sm:p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="Video Tour"
                >
                  <h3 className="text-2xl sm:text-3xl border-b-2 pb-2 font-poppins font-semibold text-[#1d2a3b]">
                    Video Tour
                  </h3>

                  <div className="flex items-center justify-center my-3">
                    {video?.length > 0 ? (
                      <video
                        className="w-full max-w-3xl h-auto rounded-lg shadow-md"
                        src={video}
                        controls
                        loop
                      ></video>
                    ) : (
                      <div className="text-center">
                        <img
                          src={comingsoon}
                          alt="Coming Soon"
                          className="lg:max-w-[30rem]"
                        />
                        <p className="text-gray-500 mt-2">
                          Video coming soon...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* EMI Calculator */}
                <div className="col-span-12" id="Emi Calculator">
                  <Calculator />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 bg-gray-100 w-auto px-5">
              <div className="flex flex-col gap-5 sticky top-0">
                <ContactForm />
                <RecentProperty />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects  */}
      <div className="bg-gray-100 p-3">
        <h1 className="text-center text-[#1d2a3b] lg:text-4xl text-2xl font-bold py-8 lg:font-medium">
          Recent Listings
        </h1>
        <Card category="New Launches" />
        <div className="flex justify-center my-3">
          <Link to={"/property/new-launches"}>
            <Button
              size="large"
              variant="contained"
              endIcon={<EastIcon />}
              sx={{
                backgroundColor: "#1d2a3b",
                color: "white",
                textTransform: "none",
                borderBottom: "2px solid gray",
              }}
            >
              View all
            </Button>
          </Link>
        </div>
      </div>

      <Marquee />
    </Layout>
  );
};
