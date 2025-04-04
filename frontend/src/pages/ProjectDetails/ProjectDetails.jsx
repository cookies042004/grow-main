import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import "./ProjectDetails.css";
import { Link } from "react-router-dom";
import { TCard } from "../../components/TCard";
import { Marquee } from "../../components/Marquee";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
import { NavigationProject } from "../../components/NavigationProject";
import rera from "../../assets/img/icons8-approved.gif";

export const ProjectDetails = () => {
  const { slug } = useParams(); // Get slug from URL
  const decodedSlug = decodeURIComponent(slug); // Decode slug if needed

  const [propertyId, setPropertyId] = useState(null);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyByName = async () => {
      try {
        // Fetch property details using slug
        const res = await fetch(
          `${process.env.BASE_URL}/api/v1/property/search-by-name/${decodedSlug}`
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

  // Fetch full property details using ID (when propertyId is available)
  const apiUrl = propertyId
    ? `${process.env.BASE_URL}/api/v1/property/${propertyId}`
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
    // Check if amount is less than 1 crore (10 million)
    if (amount < 10000000) {
      // Convert to lakhs, round to 1 decimal place
      return (amount / 100000).toFixed(1) + " L";
    } else {
      // Convert to crores, round to 1 decimal place
      return (amount / 10000000).toFixed(2) + " Cr";
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
          <div className="col-span-12 text-center mt-20">
            <h1 className="ffont-sans font-bold text-white text-3xl lg:text-4xl">
              Property Details
            </h1>
          </div>
        </div>
      </div>

      <NavigationProject />

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
                <div className="border border-gray-300 m-4 sm:mx-10 mt-5 mb-1 flex flex-col sm:flex-row gap-4 sm:gap-8 p-3 items-center sm:items-start">
                  {/* Left Section - Property Details */}
                  <div className="flex sm:flex-row flex-col items-center sm:items-start gap-3 w-full">
                    <div className="border border-gray-300">
                      <img
                        src={property?.dp}
                        alt="dealer"
                        className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="flex items-center justify-center sm:justify-start font-bold text-[#1d2a3b] text-lg py-[1px] sm:pl-2">
                        {property?.name}
                      </h1>
                      <p className="flex items-center justify-center sm:justify-start text-sm text-[#03002a] py-[1px] sm:pl-2">
                        By {property?.builder}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start">
                        <LocationOnIcon className="text-red-600 text-xs" />
                        <p className="text-sm text-red-600 py-[1px]">
                          {property?.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Price & Buttons */}
                  <div className="flex flex-col items-center sm:items-end w-full">
                    <h5 className="font-semibold text-[#1d2a3b] text-xl sm:text-2xl">
                      ₹{toINRCr(property?.price)}*
                    </h5>

                    {/* Buttons - Stack on Small Screens */}
                    <div className="flex flex-row sm:flex-row gap-1 sm:gap-3 w-full sm:w-auto py-2">
                      <Link to={`/brochure`} className="w-full sm:w-auto">
                        <Button
                          startIcon={<PictureAsPdfIcon />}
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{ textTransform: "none" }}
                          className="w-full sm:w-full text-sm sm:text-sm"
                        >
                          Request Pdf
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
                        className="w-full sm:w-auto text-sm sm:text-sm"
                      >
                        WhatsApp Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap  justify-center sm:justify-start gap-2 sm:gap-4 my-6 border-b pb-2">
                {[
                  { href: "#Description", label: "Description" },
                  { href: "#Project Overview", label: "Project Overview" },
                  { href: "#Project Amenities", label: "Project Amenities" },
                  { href: "#Location Benefits", label: "Location Benefits" },
                  { href: "#Video Tour", label: "Video Tour" },
                  { href: "#EMI Calculator", label: "EMI Calculator" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.label)}
                    className="px-3 sm:px-4 py-2 text-gray-700 text-sm sm:text-sm transition-all duration-300 ease-in-out hover:text-gray-800 hover:font-semibold focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 mt-8 gap-6 sm:gap-8">
                {/* Description */}
                <div
                  className="col-span-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg shadow-gray-"
                  id="Description"
                >
                  <h3 className="text-2xl sm:text-2xl border-b-2 pb-2 font-sans font-semibold text-[#1d2a3b]">
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
                  className="col-span-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg shadow-gray-"
                  id="Project Overview"
                >
                  <h3 className="text-2xl sm:text-2xl border-b-2 pb-2 font-sans font-semibold text-[#1d2a3b]">
                    Project Overview
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {[
                      {
                        icon: construction,
                        label: "Project Status",
                        value: property?.projectStatus || "-",
                      },
                      {
                        icon: size,
                        label: "Project Size",
                        value: property?.projectSize || "-",
                      },
                      {
                        icon: bhk,
                        label: "Unit Size",
                        value: property?.unit || "-",
                      },
                      {
                        icon: price,
                        label: "Price",
                        value: divide(property?.sizeUnit || "-"),
                      },
                      {
                        icon: area,
                        label: "Unit Area",
                        value: selectUnit(property?.sizeUnit || "-"),
                      },
                      {
                        icon: units,
                        label: "Total Units",
                        value: property?.totalUnits || "-",
                      },
                      {
                        icon: rera,
                        label: "Rera No.",
                        value: property?.propertyRera || "-",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-8 sm:w-10 h-8 sm:h-10"
                        />
                        <div>
                          <p className="text-gray-600 text-sm sm:text-md">
                            {item.label}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Amenities */}
                <div
                  className="col-span-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg shadow-gray-"
                  id="Project Amenities"
                >
                  <h3 className="text-2xl sm:text-2xl border-b-2 pb-2 font-sans font-semibold text-[#1d2a3b]">
                    Project Amenities
                  </h3>

                  {/* Society Amenities */}
                  <div className="mt-5 shadow-sm border rounded-md">
                    <div className="p-3 bg-blue-50 rounded-t-md text-center">
                      <h3 className="text-xl sm:text-xl font-semibold text-gray-800">
                        Society Amenities
                      </h3>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {property?.amenities?.some(
                          (item) => item.type === "society_amenity"
                        ) ? (
                          property.amenities
                            .filter((item) => item.type === "society_amenity")
                            .map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center gap-2 p-2"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-8 w-8 sm:h-8 sm:w-8 object-contain"
                                />
                                <p className="text-sm sm:text-base font-medium text-gray-700">
                                  {item.name}
                                </p>
                              </div>
                            ))
                        ) : (
                          <div className="col-span-full text-center text-gray-500">
                            No society amenities available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Flat Amenities */}
                  <div className="mt-5 shadow-sm border rounded-md">
                    <div className="p-3 bg-red-50 text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Flat Amenities
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                      {property?.amenities?.some(
                        (item) => item.type === "flat_amenity"
                      ) ? (
                        property.amenities
                          .filter((item) => item.type === "flat_amenity")
                          .map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center gap-3 p-2"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-8 w-8 sm:h-8 sm:w-8 object-contain"
                              />
                              <p className="text-sm sm:text-base font-medium text-gray-700">
                                {item.name}
                              </p>
                            </div>
                          ))
                      ) : (
                        <div className="col-span-full text-center text-gray-500">
                          No flat amenities available
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Benefits */}
                <div
                  className="col-span-12 bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
                  id="Location Benefits"
                >
                  <h3 className="text-xl sm:text-2xl border-b-2 pb-2 font-sans font-semibold text-[#1d2a3b]">
                    Location Benefits
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {property?.amenities?.some(
                      (item) => item.type === "location_advantages"
                    ) ? (
                      property.amenities
                        .filter((item) => item.type === "location_advantages")
                        .map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3 p-2"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                            />
                            <p className="text-sm sm:text-base font-medium text-gray-700">
                              {item.name}
                            </p>
                          </div>
                        ))
                    ) : (
                      <div className="col-span-full text-center text-gray-500">
                        No location advantages available
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Tour */}
                <div
                  className="col-span-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg shadow-gray-"
                  id="Video Tour"
                >
                  <h3 className="text-2xl sm:text-2xl border-b-2 pb-2 font-poppins font-semibold text-[#1d2a3b]">
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
                <div className="col-span-12" id="EMI Calculator">
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
      <div className="p-3 max-w-[1280px] mx-auto my-14">
        <h1 className="text-center text-[#1d2a3b] lg:text-3xl text-2xl font-medium py-8 lg:font-medium">
          Trending Properties
        </h1>
        <TCard
          category={[
            "New Launches",
            "Affordable Living",
            "New Launches",
            "Commercial",
          ]}
        />
      </div>

      <Marquee />
    </Layout>
  );
};
