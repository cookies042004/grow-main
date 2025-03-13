import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";

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
import { Card } from "../../components/Card";
import { PropertyCard1 } from "../../components/PropertyCard1";
import { Button } from "@mui/material";
import { Marquee } from "../../components/Marquee";

import { Calculator } from "../../components/Calculator";
import { SearchBar } from "../../components/SearchBar";
import findRealEstate from "../../assets/img/find real estate.jpg";
import keys from "../../assets/img/keys.jpeg";
import realtor from "../../assets/img/meet realtor.jpeg";
import bgImage from "/src/assets/img/img4.jpg";
import EnquiryHome from "../../components/EnquiryHome";
import { AwardComponent } from "../../components/AwardComponent";

export const Home = () => {
  return (
    <Layout>
      {/* Hero  */}

      <div className="homeBanner overflow-hidden relative h-screen flex flex-col items-center lg:items-start justify-center lg:ps-24 ">
        <div className="text-center">
          <h1 className="text-2xl lg:text-4xl font-medium mt-14 lg:mt-24">
            Find your next{" "}
            <Typewriter
              words={["best cozy place", "dream home", "office"]}
              loop={0}
              cursor
            />
          </h1>
        </div>
        <div className="my-5 lg:my-10">
          <p className="font-dmsans text-center font-normal text-sm lg:text-lg lg:text-left px-5 lg:px-0">
            Find the best places around you at the cheapest and affordable
            prices.
          </p>
        </div>
        <SearchBar />

        {/* Floating Button to Open Modal */}
        <EnquiryHome />
      </div>

      <div className="block lg:hidden p-5">
        <Calculator />
      </div>

      {/* Explore Our Properties */}
      <div className="bg-white">
        <h1 className="text-center text-[#03002e] text-2xl lg:text-4xl font-bold lg:font-medium py-6">
          Explore Our Properties
        </h1>

        <div className="max-w-[1280px] mx-auto md:p-12">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 
                 place-items-center"
          >
            <PropertyCard1
              title="Luxury Living"
              category="luxury"
              image="luxury-living.jpg"
              className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-full p-4 sm:p-6"
            />
            <PropertyCard1
              title="New Launches"
              category="newLaunches"
              image="new-launches.jpg"
              className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-full p-4 sm:p-6"
            />
            <PropertyCard1
              title="Affordable Living"
              category="affordable"
              image="affordable.jpg"
              className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-full p-4 sm:p-6"
            />
            <PropertyCard1
              title="Commercial"
              category="commercial"
              image="commercial.jpg"
              className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-full p-4 sm:p-6"
            />
          </div>
        </div>
      </div>

      {/* More than 10 years of experience  */}
      <div
        className="bg-[#03002e] text-white my-10 experience"
        style={{
          background: `linear-gradient(#0e1d3499, #0e1d34cc), url(${bgImage})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-[1280px] mx-auto py-10">
          <h1 className="text-xl text-center lg:text-4xl font-poppins font-bold py-4">
            More than{" "}
            <span className="text-red-500 transition-transform transform hover:text-200">
              10 Years
            </span>{" "}
            of Experience
          </h1>
          <div className="relative w-full overflow-hidden">
            <marquee
              direction="left"
              className="text-sm py-3 lg:py-5 text-center lg:text-lg font-poppins font-medium lg:me-10 me-0 px-3 lg:px-0"
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
          <div className="grid grid-cols-12 sm:grid-cols-2 lg:grid-cols-12 gap-6 mt-8">
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
                color: "text-yellow-200",
              },
              {
                Icon: AspectRatioIcon,
                count: 10,
                suffix: "+",
                label: "Years of Experience",
              },
              {
                Icon: AccessibilityNewIcon,
                count: 30,
                label: "Employees",
                color: "text-yellow-200",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="basis-1/4 col-span-6 md:col-span-6 lg:col-span-3 rounded-[17.07px] m-8 hover:text-white transition-all ease-in-out experience-card"
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
                    className={`experience-icon ${item.color}`}
                  />
                  <div className="flex flex-col gap-1 my-4">
                    <p className="font-poppins font-semibold text-xl lg:text-2xl text-center">
                      <span
                        className="purecounter"
                        data-purecounter-start="0"
                        data-purecounter-end={item.count}
                        data-purecounter-duration="3"
                      >
                        {item.count}
                      </span>
                      {item.suffix && <span>{item.suffix}</span>}
                    </p>
                    <p className="font-poppins font-medium text-sm lg:text-lg">
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
      <div className="bg-white">
        <h1 className="text-center text-[#03002e]  lg:text-4xl text-2xl font-bold mb-8 pt-2 lg:font-medium">
          Recent Listings
        </h1>
        <Card category="Affordable Living" />
        <div className="flex justify-center py-8">
          <Link to={"/property/affordable-living"}>
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

      {/* How it Works */}

      <div className="bg-gray-50 py-8">
  <div className="mx-auto max-w-[1280px] px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      {/* Left - Images Section */}
      <div className="hidden md:flex flex-col gap-5">
        <div className="w-full">
          <img
            src={findRealEstate}
            alt="Find Real Estate"
            className="rounded-lg w-full h-auto max-h-[350px] object-cover"
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

      {/* Right - Content Section */}
      <div className="flex flex-col justify-center lg:ps-14 text-center md:text-left">
        <h1 className="text-[#1A1A1A] font-roboto text-2xl lg:text-4xl font-medium">
          How It Works? <br />
          Find Your Perfect Home
        </h1>
        <p className="text-md lg:text-lg mt-5">
          Discover your ideal home with ease. Browse listings, get expert
          advice, and find the perfect match for your lifestyle.
        </p>
        
        {/* Steps List */}
        <ul className="my-10 flex flex-col gap-10">
          {[
            { img: Icon1, title: "Find Real Estate", text: "Finding your dream property has never been easier. With Grow Infinity Realtors, you access extensive listings, and expert guidance for a seamless real estate journey. Start exploring today and discover your perfect home." },
            { img: Icon2, title: "Meet Realtor", text: "Connect with trusted real estate professionals who understand your needs and priorities. Our experienced realtors will guide you through the process, ensuring a smooth transaction and helping you find the best property deals." },
            { img: Icon3, title: "Take the keys", text: "Unlock your future with confidence. Take the Home Keys and step into your new beginning with expert guidance and support. We ensure a hassle-free closing process so you can start your next chapter worry-free." }
          ].map((item, index) => (
            <li key={index} className="flex gap-5 items-start">
              <div className="relative w-[50px] h-[50px] flex-shrink-0">
                <div className="bg-[#e7c873b8] absolute h-[35px] w-[35px] rounded-full -left-1 top-1"></div>
                <img src={item.img} alt="" className="relative w-[35px] h-[35px]" />
              </div>
              <div className="flex-1">
                <h1 className="text-lg lg:text-xl font-medium">{item.title}</h1>
                <p className="mt-2 text-sm lg:text-[15px]">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</div>


      <Testimonials />
      <Choose />

      {/* Awards Segment  */}
      <div className="bg-gray-50 py-5">
        <AwardComponent />

        <div className="flex justify-center m-8">
          <Link to="/awards">
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
                  <h4 className="font-medium text-lg lg:text-2xl">
                    Looking for a new home?
                  </h4>
                  <p className="hidden lg:block text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                    Let us help you find the perfect place to suit your needs
                    and lifestyle.
                  </p>
                  <div className="flex lg:hidden justify-between">
                    <p className="basis-[60%] text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                      Let us help you find the perfect place to suit your needs
                      and lifestyle.
                    </p>
                    <img
                      src={home}
                      alt="Home"
                      className="w-[80px] h-[80px] object-contain"
                    />
                  </div>
                  <Link to={"/contact"}>
                    <button
                      className="bg-[#03002e] rounded-lg text-white min-w-[120px] lg:w-[150px] text-sm py-1 lg:py-3 
                          flex items-center justify-center gap-2 mt-8 transition-all duration-300 hover:scale-105 border-b-2 border-orange-500"
                    >
                      Contact us
                      <EastIcon size="small" sx={{ fontSize: "15px" }} />
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
                  <h4 className="font-medium text-lg lg:text-2xl">
                    Want to sell your home?
                  </h4>
                  <p className="hidden lg:block text-sm lg:text-lg font-normal lg:pe-20 text-justify">
                    Let our experts help you get the best price with a seamless
                    selling experience.
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
                      className="bg-[#03002e] rounded-lg text-white min-w-[120px] lg:w-[150px] text-sm py-1 lg:py-3 
                          flex items-center justify-center gap-2 mt-8 transition-all duration-300 hover:scale-105 border-b-2 border-orange-500"
                    >
                      Contact us
                      <EastIcon size="small" sx={{ fontSize: "15px" }} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-3 hidden lg:flex items-end">
                <img src={house} alt="House" className="w-[130px] h-[130px]" />
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
