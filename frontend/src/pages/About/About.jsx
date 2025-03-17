import React from "react";
import { Layout } from "../../components/Layout";

import "./About.css";

import aboutImg from "../../assets/img/aboutImg.png";
import aboutImg2 from "../../assets/img/aboutImg2.png";
import { Choose } from "../../components/Choose";
import { Testimonials } from "../../components/Testimonials";

import founder from "../../assets/img/ankitgoyal.jpeg";
import coFounder from "../../assets/img/tushargupta.jpg";
import whatwedo from "../../assets/img/17.jpg";
import { NavigationBar } from "../../components/NavigationBar";
import { AwardComponent } from "../../components/AwardComponent";
import { Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

import bgImage from "../../assets/img/img4.jpg";
import findRealEstate from "../../assets/img/find real estate.jpg";
import realtor from "../../assets/img/meet realtor.jpeg";
import keys from "../../assets/img/keys.jpeg";
import Icon1 from "../../assets/img/Icon.png";
import Icon2 from "../../assets/img/Icon (1).png";
import Icon3 from "../../assets/img/Icon (2).png";

export const About = () => {
  const teamMembers = [
    {
      name: "Ankit Goyal",
      role: "Founder",
      image: founder,
      tagline:
        "Leading with vision, redefining modern living through innovation, creativity, and integrity. We strive to build a smarter, more connected world, transforming ideas into impactful solutions. Our commitment to excellence drives progress, inspires change, and shapes a future where passion, purpose, and innovation create lasting success for generations to come.",
    },
    {
      name: "Tushar Gupta",
      role: "Co-Founder",
      image: coFounder,
      tagline:
        "Driving innovation and excellence in real estate by redefining spaces, enhancing communities, and setting new industry benchmarks. Through visionary leadership and a commitment to quality, we create transformative environments that inspire, elevate lifestyles, and shape the future of modern living with integrity, sustainability, and excellence.",
    },
  ];
  return (
    <Layout>
      {/* About Hero  */}
      <div className="aboutbanner flex items-center justify-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center mt-10 lg:mt-20">
            <h1 className="font-dmsans text-center font-medium text-white text-3xl lg:text-4xl">
              About Us
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      {/* welcome to grow infinity  */}
      <div className="my-8 mx-auto max-w-[1280px]">
        <h1 className="text-2xl lg:text-4xl text-center font-medium lg:mt-16">
          <span className="text-gray-500">Welcome To </span>
          Grow Infinity Realtors
        </h1>

        <div className="grid sm:grid-cols-12 my-6">
          <div className="col-span-12 lg:col-span-6 flex flex-col mt-3 lg:mt-6 items-start gap-3">
            <p className="font-poppins text-sm lg:text-lg lg:leading-9 text-justify text-gray-700 px-8">
              Grow Infinity Realtors is a highly regarded and accomplished real
              estate agency with a proven track record of success. Leveraging
              years of experience in the industry, the firm combines a strategic
              approach with a personalized touch to guide clients through every
              step of the home buying, and selling process. Whether clients are
              looking to purchase their first home or sell an existing property,
              Grow Infinity Realtors takes the time to understand their unique
              needs and aspirations.
            </p>
            <p className="font-poppins text-sm lg:text-lg lg:leading-9 text-justify text-gray-700 px-8">
              Grow Infinity Realtors is a highly regarded and accomplished real
              estate agency with a proven track record of success. Leveraging
              years of experience in the industry
            </p>
            <p className="font-poppins text-sm lg:text-lg lg:leading-9 text-justify text-gray-700 px-8">
              Grow Infinity Realtors is a highly regarded and accomplished real
              estate agency with a proven track record of success. Leveraging
              years of experience in the industry
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 flex items-center justify-center mt-8 lg:mt-0 lg:justify-end ">
            <img
              src={aboutImg}
              alt="about-welcome-image"
              className="h-[280px] lg:h-[400px] w-[480px] mx-5"
            />
          </div>
        </div>
      </div>

      <div className="my-5 max-w-[1280px] mx-auto">
        <h1 className="text-center text-2xl lg:text-4xl font-roboto font-medium py-3 lg:py-8">
          <span className="text-gray-500">Stress-Free</span> Step to Your Dream
          Home
        </h1>
        <div className="grid sm:grid-cols-12 mt-4 lg:mt-10 gap-3 lg:gap-5">
          {[
            {
              number: "01",
              title: "Dream & Discover",
              description:
                "Envision your perfect home with our guidance and expertise",
            },
            {
              number: "02",
              title: "Pre-Approval",
              description:
                "Obtain financial pre-approval to streamline your buying process",
            },
            {
              number: "03",
              title: "Schedule Viewing",
              description: "Book visits to explore your top property choices",
            },
            {
              number: "04",
              title: "Offer & Negotiation",
              description:
                "Strategically craft your offer and skillfully negotiate terms",
            },
            {
              number: "05",
              title: "Secure Your Dream",
              description: "Carefully review contracts and secure financing",
            },
            {
              number: "06",
              title: "Welcome Home",
              description:
                "Celebrate your new beginning and settle in comfortably",
            },
          ].map((item, index) => (
            <div
              className="col-span-6 md:col-span-6 lg:col-span-4 p-5"
              key={item.number}
            >
              <div className="text-[#1d2a3b] hover:text-white p-6 lg:p-10 font-roboto text-center border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-indigo-900 to-black">
                <h5 className="text-2xl lg:text-4xl font-bold mb-2">
                  {item.number}
                </h5>
                <h3 className="text-xl lg:text-2xl py-3 font-semibold">
                  {item.title}
                </h3>
                <p className="text-center text-sm lg:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* What we do?  */}
      <div className="bg-gray-50">
        <div className="my-10 max-w-[1280px] mx-auto">
          <h2 className="font-roboto font-medium text-[#1d2a3b] text-center text-3xl lg:text-4xl py-8">
            What we do?
          </h2>
          <div className="grid sm:grid-cols-12">
            <div className="col-span-12 lg:col-span-6 flex justify-center pb-10">
              <img
                src={whatwedo}
                alt=""
                className="w-[300px] lg:w-[600px] border"
              />
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center pb-10">
              <p className="font-poppins text-sm px-8 lg:text-lg lg:leading-9 text-justify text-gray-700">
                At Grow Infinity Realtors, we take immense pride in our
                unwavering commitment to providing personalized real estate
                solutions tailored specifically to meet the unique needs and
                preferences of each client. We understand that every individual
                or family has distinct goals and desires when it comes to
                finding the perfect property, and we work diligently to ensure
                that those needs are not only met but exceeded. Our team’s deep
                market knowledge, combined with a robust network of industry
                connections, allows us to offer a wide variety of properties
                that cater to diverse tastes and requirements. Whether you're
                seeking a luxurious estate, a cozy family home, or a prime
                commercial space for your business, Grow Infinity has the
                expertise and resources to guide you to the ideal property. Our
                approach goes beyond simply facilitating a transaction; we focus
                on building long-term relationships and ensuring that each
                client’s experience is seamless, enjoyable, and rewarding.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mission  */}
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
                      <p className="mt-2 text-sm lg:text-[15px]">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <Choose />
      </div>

      {/* Meet our directors  */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-center text-[#1d2a3b] text-2xl lg:text-4xl font-medium pb-10">
            Get to Know Our Team
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto">
            {teamMembers.map((member, index) => (
              <div className="p-4 md:p-6" key={index}>
                <div className="director-card bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                  <div
                    className={`flex flex-col md:flex-row items-center md:items-start gap-6 p-6`}
                  >
                    {/* Image Section */}
                    <div className="relative w-full md:w-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="rounded-3xl h-[220px] lg:h-[350px] w-full md:w-[220px] lg:w-[250px] object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-30 rounded-3xl transition-opacity duration-300"></div>
                    </div>

                    {/* Text Section */}
                    <div className="flex-1 md:text-left">
                      <h3 className="text-[#03002e] text-lg lg:text-2xl font-bold font-roboto">
                        {member.name}
                      </h3>
                      <h5 className="text-gray-500 text-sm lg:text-md pb-3 font-roboto">
                        {member.role}
                      </h5>
                      <p className="hidden md:block text-gray-600 text-sm lg:text-md font-light">
                        {member.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-5">
        {/* Award Images Section */}
        <div className="flex justify-center lg:justify-start">
          <AwardComponent />
        </div>

        <div className="flex justify-center mt-6">
          <Link to="/awards">
            <Button
              size="large"
              variant="contained"
              endIcon={<EastIcon />}
              sx={{
                backgroundColor: "#03002e",
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

      <Testimonials />
    </Layout>
  );
};
