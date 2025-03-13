import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import EastIcon from "@mui/icons-material/East";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";

import "./ProjectDetails.css";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
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

        console.log("data is ", data);

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

  console.log("property is ", property);

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
            top: targetElement.offsetTop - 200, // Adjust according to navbar height
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
              <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.3)] pb-2 mb-10">
                <div className="pt-10 px-10">
                  <Carousel galleryImages={images} />
                </div>

                <div className="border border-gray-300 m-10 mt-5 mb-1 flex flex-row lg:flex-row gap-8 p-1">
                  {/* Left Section */}
                  <div className="flex flex-row lg:flex-row items-center lg:items-start gap-3 w-full">
                    <img
                      src={property?.dp}
                      alt="dealer"
                      className="h-20 w-20 object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-[#03002a] px-2 text-lg lg:text-xl py-[1px] w-full max-w-[250px]">
                        {property?.name}
                      </h1>
                      <p className="text-sm text-[#03002a] lg:text-m px-2 py-[1px]">
                        By {property?.builder}
                      </p>
                      <div className="flex items-center">
                        <LocationOnIcon className="text-red-600 text-xs" />
                        <p className="text-sm text-red-600 py-[1px]">
                          {property?.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-center lg:items-end w-full lg:w-2/3">
                    <h5 className="flex font-semibold text-[#03002a] text-xl lg:text-2xl pr-2">
                      ₹{toINRCr(property?.price)}*
                    </h5>

                    <div className="flex gap-3 w-full lg:w-auto py-2 pr-2">
                      <Link to={`/brochure`}>
                        <Button
                          startIcon={<PictureAsPdfIcon />}
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{ textTransform: "none" }}
                          className="w-full lg:w-auto"
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
                        className="w-full lg:w-auto"
                      >
                        WhatsApp Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 my-6 border-b pb-2">
                <div>
                  <Link
                    href="#description"
                    onClick={(e) => handleAnchorClick(e, "description")}
                    className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-bold hover:text-lg"
                  >
                    Description
                  </Link>
                </div>
                <div>
                  <Link
                    href="#Overview"
                    onClick={(e) => handleAnchorClick(e, "Overview")}
                    className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-bold hover:text-lg"
                  >
                    Overview
                  </Link>
                </div>
                <div>
                  <Link
                    href="#Project Amenities"
                    onClick={(e) => handleAnchorClick(e, "Project Amenities")}
                    className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-bold hover:text-lg"
                  >
                    Project Amenities
                  </Link>
                </div>
                <div>
                  <Link
                    href="#location"
                    onClick={(e) => handleAnchorClick(e, "location")}
                    className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-bold hover:text-lg"
                  >
                    Location Benefits
                  </Link>
                </div>
                <div>
                  <Link
                    href="#video"
                    onClick={(e) => handleAnchorClick(e, "video")}
                    className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-bold hover:text-lg"
                  >
                    Video Tour
                  </Link>
                </div>
                <div>
                  <Link
                    href="#emi"
                    onClick={(e) => handleAnchorClick(e, "emi")}
                    className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-950 hover:font-bold hover:text-lg"
                  >
                    EMI Calculator
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-12 mt-8 gap-8">
                {/* Description */}
                <div
                  className="col-span-12 bg-white p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="description"
                >
                  <h3 className="text-3xl border-b-2 pb-2 font-poppins font-semibold">
                    Description
                  </h3>
                  <div className="mt-4 text-gray-500 text-md lg:leading-[1.5]">
                    {/* Container for description text with transition */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out`}
                      style={{
                        maxHeight: isExpanded ? "9999px" : "500px", // Use a large value for expanded state
                      }}
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
                        borderRadius: "2px",
                        textTransform: "none",
                        display: "inline-block",
                        marginTop: "10px",
                        backgroundColor: "#5BC0EB",
                      }}
                      onClick={toggleDescription}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                  </div>
                </div>

                {/* Overview */}
                <div
                  className="col-span-12 bg-white p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="Overview"
                >
                  <h3 className="text-3xl border-b-2 font-poppins font-semibold pb-3 text-gray-900">
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

                    {/* Unit Size */}
                    <div className="flex items-start gap-4">
                      <img src={bhk} alt="Unit Size" className="w-10 h-10" />
                      <div>
                        <p className="text-gray-600 text-sm">Unit Size</p>
                        <p className="text-lg font-bold text-gray-900">
                          {property?.unit || "-"}
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

                    {/* Total Units */}
                    <div className="flex items-start gap-4">
                      <img
                        src={units}
                        alt="Total Units"
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="text-gray-600 text-sm">Total Units</p>
                        <p className="text-lg font-bold text-gray-900">
                          {property?.totalUnits || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Amenities */}
                <div
                  className="col-span-12 bg-white p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="Project Amenities"
                >
                  <h3 className="text-3xl border-b-2 font-poppins font-semibold pb-3 text-gray-900">
                    Project Amenities
                  </h3>

                  {/* Society Amenities */}
                  <div className="mt-5 rounded-md shadow-[0px_0px_1px_rgba(0,0,0,0.3)] border border-blue-50 ">
                    <div className="p-4 bg-blue-50 rounded-md">
                      <h3 className="text-2xl lg:text-2xl text-center font-roboto font-semibold text-gray-800">
                        Society Amenities
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 p-4 rounded-md">
                      {property?.amenities?.some(
                        (item) => item.type === "society_amenity"
                      ) ? (
                        property.amenities
                          .filter((item) => item.type === "society_amenity")
                          .map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center gap-4 p-2 border bg-white hover:shadow-md transition-all"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-7 w-7"
                              />
                              <p className="text-lg font-semibold text-gray-700">
                                {item.name}
                              </p>
                            </div>
                          ))
                      ) : (
                        <div className="col-span-full text-center">
                          <p className="text-gray-500">
                            No society amenities is there
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Flat Amenities */}
                  <div className="mt-5 rounded-md shadow-[0px_0px_1px_rgba(0,0,0,0.3)] border border-red-50">
                    <div className="p-4 bg-red-50 rounded-md">
                      <h3 className="text-2xl lg:text-2xl text-center font-roboto font-semibold text-gray-800">
                        Flat Amenities
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 p-4 rounded-md">
                      {property?.amenities?.some(
                        (item) => item.type === "flat_amenity"
                      ) ? (
                        property.amenities
                          .filter((item) => item.type === "flat_amenity")
                          .map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center gap-4 p-2 border bg-white hover:shadow-md transition-all"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-7 w-7"
                              />
                              <p className="text-lg font-semibold text-gray-700">
                                {item.name}
                              </p>
                            </div>
                          ))
                      ) : (
                        <div className="col-span-full text-center">
                          <p className="text-gray-500">
                            No flat amenities is there
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Benefits */}
                <div
                  className="col-span-12 bg-white p-6 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="location"
                >
                  <h3 className="text-3xl border-b-2 mb-5 font-poppins font-semibold pb-2 text-gray-900">
                    Location Benefits
                  </h3>

                  {/* Location Advantages */}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {property?.amenities?.some(
                      (item) => item.type === "location_advantages"
                    ) ? (
                      property.amenities
                        .filter((item) => item.type === "location_advantages")
                        .map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-4 p-2 border bg-white hover:shadow-md transition-all"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-5 w-5"
                            />
                            <p className="text-lg font-semibold text-gray-700">
                              {item.name}
                            </p>
                          </div>
                        ))
                    ) : (
                      <div className="col-span-full text-center">
                        <p className="text-gray-500">
                          No location advantages is there
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Tour */}
                <div
                  className="col-span-12 bg-white p-6 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
                  id="video"
                >
                  <h3 className="text-3xl border-b-2 font-poppins font-semibold">
                    Video Tour
                  </h3>

                  <div className="flex rounded-xl items-center justify-center my-3">
                    {video?.length > 0 ? (
                      <video
                        className="w-full max-w-3xl h-auto rounded-lg shadow-md"
                        src={video}
                        controls
                        loop
                      ></video>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src={comingsoon}
                          alt="Video coming soon"
                          className="object-contain object-center max-w-[31rem]"
                        />
                        <p className="text-gray-500 mt-2">
                          Video coming soon...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="col-span-12">
                  <h3 className="text-xl font-poppins font-semibold">
                    Address
                  </h3>
                  <p className="py-3 text-md">{property?.address}</p>
                </div> */}

                {/* Calculator */}
                <div className="col-span-12" id="emi">
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
        <h1 className="text-center text-black lg:text-4xl text-2xl font-bold py-8 lg:font-medium">
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
                backgroundColor: "#03002e",
                color: "white",
                textTransform: "none",
                borderBottom: "2px solid orange",
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
