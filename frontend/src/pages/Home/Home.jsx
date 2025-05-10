import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import CountUp from 'react-countup'
import "./Home.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

import { Choose } from "../../components/Choose";
import { Testimonials } from "../../components/Testimonials";

import { Typewriter } from "react-simple-typewriter";

import { Link } from "react-router-dom";
import Icon1 from "../../assets/img/Icon.png";
import Icon2 from "../../assets/img/Icon (1).png";
import Icon3 from "../../assets/img/Icon (2).png";
import home from "../../assets/img/home.png";
import house from "../../assets/img/house.png";
import EastIcon from "@mui/icons-material/East";
import { TCard } from "../../components/TCard";
import { PropertyCard1 } from "../../components/PropertyCard1";
import { Button } from "@mui/material";
import { Marquee } from "../../components/Marquee";

import { Calculator } from "../../components/Calculator";
import { SearchBar } from "../../components/SearchBar";
import findRealEstate from "../../assets/img/find real estate.jpg";
import keys from "../../assets/img/keys.jpg";
import realtor from "../../assets/img/meet realtor.jpeg";
import bgImage from "/src/assets/img/img4.jpg";
import EnquiryHome from "../../components/EnquiryHome";
import { AwardComponent } from "../../components/AwardComponent";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <Layout>
      {/* Hero  */}
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Grow Infinity - Home</title>
        <meta
          name="description"
          content="Discover your dream home with Grow Infinity. Explore our listings and find the perfect property for you."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.BASE_URL}/`} />
      </Helmet>

      <div className="homeBanner overflow-hidden relative h-screen flex flex-col items-center lg:items-start justify-center lg:ps-24 ">
        <div className="text-center">
          <h1 className="text-2xl text-[#1d2a3b] lg:text-4xl font-medium mt-14 lg:mt-24">
            Find your next{" "}
            <Typewriter
              words={["best cozy place", "dream home", "office"]}
              loop={0}
              cursor
            />
          </h1>
        </div>
        <div className="my-5 lg:my-10">
          <p className="font-dmsans text-center text-[#1d2a3b] font-normal text-sm lg:text-lg lg:text-left px-5 lg:px-0">
            Find the best places around you at the cheapest and affordable
            prices.
          </p>
        </div>
        <SearchBar />

        {/* Floating Button to Open Modal */}
        <EnquiryHome />
      </div>

      {/* <div className="block lg:hidden p-5">
        <Calculator />
      </div> */}

      {/* Discover Your Dream Home */}
      <div className="bg-white">
        <h1 className="text-center text-[#1d2a3b] text-2xl lg:text-4xl font-sans font-medium py-6">
          Discover Your Dream Home
        </h1>

        <div className="max-w-[1280px] md:p-5 mx-auto px-4 sm:px-6">
          <div
            className="flex flex-wrap justify-center gap-5"
          >
            {[
              {
                title: "Luxury Living",
                category: "luxury",
                image: "luxury-living.jpg",
              },
              {
                title: "New Launches",
                category: "newLaunches",
                image: "new-launches.jpg",
              },
              {
                title: "Affordable Living",
                category: "affordable",
                image: "affordable.jpg",
              },
              {
                title: "Commercial",
                category: "commercial",
                image: "commercial.jpg",
              },
            ].map((property, index) => (
              <PropertyCard1
                key={index}
                title={property.title}
                category={property.category}
                image={property.image}
                className="w-full sm:w-[80%] md:w-[60%] lg:w-[22%] p-4 sm:p-6 
          transition-transform duration-300 ease-in-out 
          shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:scale-105 
          hover:rotate-[2deg] hover:bg-gray-100 
          rounded-xl bg-white transform-gpu"
              />
            ))}
          </div>
        </div>
      </div>


      {/* More than 10 years of experience  */}
      <div
        className="bg-[#1d2a3b] text-white my-10 experience"
        style={{
          background: `linear-gradient(#0e1d3499, #0e1d34cc), url(${bgImage})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-[1280px] mx-auto py-10">
          <h1 className="text-2xl text-center lg:text-4xl font-poppins font-bold py-4">
            More than{" "}
            <span className="text-red-500 transition-transform transform hover:text-200">
              10 Years
            </span>{" "}
            of Experience
          </h1>
          <div className="relative w-full overflow-hidden">
            <marquee
              direction="left"
              className="text-sm py-3 lg:py-5 text-center lg:text-lg font-medium font-sans lg:me-10 me-0 px-3 lg:px-0"
            >
              <span className="transition-all duration-300 hover:text-xl hover:font-bold">
                Over the years,{" "}
                <span className="text-red-500">Grow Infinity</span> has built a
                reputation for providing a{" "}
                <span className="text-yellow-200">seamless experience</span> to
                customers to secure their{" "}
                <span className="text-red-500">dream homes</span>.
              </span>
            </marquee>
          </div>

          <div className="grid grid-cols-12 sm:grid-cols-2 md:grid-cols-12 lg:grid-cols-12">
            {[
              {
                Icon: ApartmentIcon,
                count: 2000,
                suffix: "+",
                label: "Units Sold",
              },
              {
                Icon: EmojiEmotionsIcon,
                count: 1500,
                suffix: "+",
                label: "Happy Users",
                // color: "text-yellow-200",
              },
              {
                Icon: AspectRatioIcon,
                count: 10,
                suffix: "+",
                label: "Years Experience",
              },
              {
                Icon: AccessibilityNewIcon,
                count: 40,
                suffix: "+",
                label: "Employees",
                // color: "text-yellow-200",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="basis-1/4 col-span-6 md:col-span-6 lg:col-span-3 rounded-[17.07px] m-4 hover:text-white transition-all ease-in-out experience-card" 
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div
                  className="flex flex-col items-center justify-center  animate-move rounded-xl"
                  style={{ boxShadow: "0px 4px 20px rgba(159, 154, 154, 0.9)" }}
                >
                  <item.Icon
                    sx={{
                      fontSize: { xs: 50, sm: 75, md: 100 },
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      transition: "color 0.3s ease-in-out",
                    }}
                    className={`experience-icon ${item.color} hover:text-yellow-200`}
                  />
                  <div className="flex flex-col gap-1 my-4">
                    <p className="font-sans font-semibold text-2xl lg:text-2xl text-center">
                    <CountUp
                        start={0}
                        end={item.count}
                        duration={5}
                        separator=","
                      />
                      {item.suffix && <span>{item.suffix}</span>}
                    </p>
                    <p className="font-sans font-medium text-lg lg:text-lg">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* Recent Listings  */}
      <div className="bg-white  max-w-[1280px] mx-auto mb-20">
        <h1 className="text-center text-[#1d2a3b] lg:text-4xl text-2xl font-medium font-sans mb-8 pt-2 lg:font-medium">
          Trending Properties
        </h1>
        <TCard category={["Affordable Living", "Luxury Living","New Launches"]} />
      </div>

      {/* How it Works */}

      <div className="bg-gray-50 py-8">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Right - content Section */}
            <div className="hidden md:flex flex-col gap-5">
              <div className="w-full">
                <img
                  src={findRealEstate}
                  alt="Find Real Estate"
                  className="rounded-lg h-auto max-h-[320px] object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <img
                  src={realtor}
                  alt="Meet Realtor"
                  className="rounded-lg w-full h-[280px] object-cover"
                />
                <img
                  src={keys}
                  alt="Take the keys"
                  className="rounded-lg w-full h-auto max-h-[280px] object-cover"
                />
              </div>
            </div>
            {/* Left - image Section */}
            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-[#1d2a3b] text-center text-2xl lg:text-4xl font-sans font-medium">
                How It Works? <br />
                Find Your Perfect Home
              </h1>
              <p className="text-md text-[#1d2a3b] lg:text-lg mt-5">
                Discover your ideal home with ease. Browse listings, get expert
                advice, and find the perfect match for your lifestyle.
              </p>

              {/* Steps List */}
              <ul className="my-10 text-[#1d2a3b] flex flex-col gap-10">
                {[
                  {
                    img: Icon1,
                    title: "Find Real Estate",
                    text: "Finding your dream property has never been easier. With Grow Infinity Realtors, you access extensive listings, and expert guidance for a seamless real estate journey. Start exploring today and discover your perfect home.",
                  },
                  {
                    img: Icon2,
                    title: "Meet Realtor",
                    text: "Connect with trusted real estate professionals who understand your needs and priorities. Our experienced realtors will guide you through the process, ensuring a smooth transaction and helping you find the best property deals.",
                  },
                  {
                    img: Icon3,
                    title: "Take the keys",
                    text: "Unlock your future with confidence. Take the Home Keys and step into your new beginning with expert guidance and support. We ensure a hassle-free closing process so you can start your next chapter worry-free.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex gap-5 items-start">
                    <div className="relative w-[50px] h-[50px] flex-shrink-0">
                      <div className="bg-[#e7c873b8] absolute h-[35px] w-[35px] rounded-full -left-1 top-1"></div>
                      <img
                        src={item.img}
                        alt=""
                        className="relative w-[35px] h-[35px]"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg lg:text-xl font-medium">
                        {item.title}
                      </h1>
                      <p className="m-2 text-sm lg:text-[15px]">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF8F6]">
        <Testimonials />
      </div>
      <Choose />

      {/* Awards Segment  */}
     <div className="bg-gray-50 lg:py-5 max-w-[1520px] mx-auto">
        <AwardComponent />

        <div className="flex justify-center pb-5 lg:pb-5">
          <Link to="/awards">
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

      {/* Both Boxes */}

      <div className="max-w-[1280px] mx-auto my-5">
        <div className="grid sm:grid-cols-12">
          {/* Box 1 - Looking for a new home */}
          <div className="col-span-12 lg:col-span-6 m-5">
            <div
              className="bg-[#F9F9F9] font-roboto p-8 lg:p-14 rounded-lg 
                transition-transform duration-300 hover:translate-x-4 hover:shadow-lg hover:scale-[1.03]"
            >
              <div className="grid sm:grid-cols-12">
                <div className="col-span-12 lg:col-span-9">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <h4 className="font-medium text-2xl lg:text-3xl">
                      Looking for a new home?
                    </h4>
                    <p className="hidden lg:block text-sm font-sans lg:pe-20 text-justify">
                      Let us help you find the perfect place to suit your needs
                      and lifestyle.
                    </p>
                    <div className="flex lg:hidden justify-between">
                      <p className="basis-[60%] text-sm font-sans lg:pe-20 text-justify">
                        Let us help you find the perfect place to suit your
                        needs and lifestyle.
                      </p>
                      <img
                        src={home}
                        alt="Home"
                        className="w-[80px] h-[80px] object-contain"
                      />
                    </div>
                    <Link to={"/contact"}>
                      <button
                        className="bg-[#1d2a3b] rounded-lg text-white min-w-[120px] lg:w-[150px] text-sm py-1 lg:py-3 
                          flex items-center justify-center gap-2 mt-8 transition-all duration-300 hover:scale-105 border-b-2 border-gray-400"
                      >
                        Contact us
                        <EastIcon size="small" sx={{ fontSize: "25px" }} />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-3 hidden lg:flex items-end">
                  <img src={home} alt="Home" className="w-[130px] h-[130px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Box 2 - Want to sell your home? */}
          <div className="col-span-12 lg:col-span-6 m-5">
            <div
              className="bg-[#FFF8F6] font-roboto p-8 lg:p-14 rounded-lg 
                transition-transform duration-300 hover:translate-x-4 hover:shadow-lg hover:scale-[1.03]"
            >
              <div className="grid sm:grid-cols-12">
                <div className="col-span-12 lg:col-span-9">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <h4 className="font-medium text-2xl lg:text-3xl">
                      Want to sell your home?
                    </h4>
                    <p className="hidden lg:block text-sm font-sans lg:pe-20 text-justify">
                      Let our experts help you get the best price with a
                      seamless selling experience.
                    </p>
                    <div className="flex lg:hidden justify-between">
                      <p className="basis-[60%] text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                        Let our experts help you get the best price with a
                        seamless selling experience.
                      </p>
                      <img
                        src={house}
                        alt="House"
                        className="w-[80px] h-[80px] object-contain"
                      />
                    </div>
                    <Link to={"/contact"}>
                      <button
                        className="bg-[#1d2a3b] rounded-lg text-white min-w-[120px] lg:w-[150px] text-sm py-1 lg:py-3 
                          flex items-center justify-center gap-2 mt-8 transition-all duration-300 hover:scale-105 border-b-2 border-gray-400"
                      >
                        Contact us
                        <EastIcon size="small" sx={{ fontSize: "25px" }} />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-3 hidden lg:flex items-end">
                  <img
                    src={house}
                    alt="House"
                    className="w-[130px] h-[130px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </Layout>
  );
};
