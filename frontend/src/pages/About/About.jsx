import React from "react";
import { Layout } from "../../components/Layout";

import "./About.css";

import aboutImg from "../../assets/img/aboutImg.jpg";
import aboutImg2 from "../../assets/img/aboutImg2.jpg";
import about from "../../assets/img/about.png"
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
import keys from "../../assets/img/keys.jpg";
import Icon1 from "../../assets/img/Icon.png";
import Icon2 from "../../assets/img/Icon (1).png";
import Icon3 from "../../assets/img/Icon (2).png";
import aboutBanner from "../../assets/img/aboutbanner.jpg";

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
      <div className="aboutbanner flex items-center justify-center relative">
        {/* Lazy-loaded image */}
        <img
          src={aboutBanner}
          alt="About Us and us"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="grid sm:grid-cols-12 relative z-10">
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
          <div className="col-span-12 lg:col-span-6 flex flex-col mt-3 lg:mt-6 items-start gap-3 pl-8">
            <p className="font-sans text-sm lg:text-lg lg:leading-9 text-justify text-gray-700">
              Grow Infinity Realtors is a highly regarded and accomplished real
              estate agency with a proven track record of success. Leveraging
              years of experience in the industry, the firm combines a strategic
              approach with a personalized touch to guide clients through every
              step of the home buying, and selling process. Whether clients are
              looking to purchase their first home or sell an existing property,
              Grow Infinity Realtors takes the time to understand their unique
              needs and aspirations.
            </p>
            <p className="font-poppins text-sm lg:text-lg lg:leading-9 text-justify text-gray-700">
              Grow Infinity Realtors is a highly regarded and accomplished real
              estate agency with a proven track record of success. Leveraging
              years of experience in the industry
            </p>
            <p className="font-poppins text-sm lg:text-lg lg:leading-9 text-justify text-gray-700">
              Grow Infinity Realtors is a highly regarded and accomplished real
              estate agency with a proven track record of success. Leveraging
              years of experience in the industry.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 flex items-center justify-center mt-8 lg:mt-0 lg:justify-end ">
            <img
              src={aboutImg}
              alt="about-welcome-image"
              className="h-[280px] lg:h-[430px] w-[480px] mx-5"
            />
          </div>
        </div>
      </div>

      <div className="my-5 max-w-[1280px] mx-auto">
        <h1 className="text-center text-2xl lg:text-4xl font-sans font-medium py-3 lg:py-8 m-2">
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
              <div className="text-[#1d2a3b] hover:text-white p-6 lg:p-10 font-roboto text-center border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-gray-600 to-gray-800">
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
          <h2 className="font-sans font-medium text-[#1d2a3b] text-center text-3xl lg:text-4xl py-8">
            What we do?
          </h2>
          <div className="grid sm:grid-cols-12">
          <div className="col-span-12 lg:col-span-6 flex justify-center">
              <img
                src={whatwedo}
                alt=""
                className="my-5 w-[300px] lg:w-[450px] lg:h-[410px] object-cover"
              />
            </div>

            <div className="col-span-12 lg:col-span-6 flex flex-col justify-evenly pb-10">
              <p className="font-sans text-sm pr-8 lg:text-lg lg:leading-8 text-justify text-gray-700">
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
      <div className="bg-gradient-to-r from-[#0e1d3499] to-[#0e1d34cc] text-white mt-10 mb-10 py-5 px-8">
        <div className="grid sm:grid-cols-12 flex-col-reverse max-w-[1280px] mx-auto my-8">
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-start">
            <h2 className="font-inter font-semibold text-center text-3xl lg:text-left lg:text-4xl mb-4 flex items-center justify-center lg:justify-start">
              Our Mission
            </h2>
            <p className="font-inter font-normal text-sm lg:text-lg lg:leading-9 my-3 text-justify">
              Our mission is to deliver seamless, rewarding experiences for
              every client, ensuring that each real estate transaction is not
              only smooth but also transparent and successful. We believe that
              buying, selling, or renting a property should be an exciting and
              stress-free journey, which is why we go above and beyond to make
              the process as effortless as possible. Trust, integrity, and
              professionalism are the foundation of our company, and these core
              values guide everything we do.
            </p>
            <p className="font-inter font-normal text-sm lg:text-lg lg:leading-9 my-3 text-justify">
              We prioritize building meaningful, long-term relationships with
              our clients, ensuring that their needs are always met with honesty
              and respect. By maintaining an unwavering commitment to excellence
              and exceeding expectations at every turn, we aim to foster lasting
              connections that continue well beyond a single transaction. Our
              ultimate goal is to be the trusted partner clients can rely on for
              all their real estate needs, today and in the future.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:flex items-center justify-end mt-3">
            <img
              src={about}
              alt="About us"
              className="h-[250px] lg:h-[400px] w-full lg:w-[503px] border-4 border-white shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <Choose />
      </div>

      {/* Meet our directors  */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-center text-[#1d2a3b] text-3xl lg:text-4xl font-sans font-medium pb-10">
          Dreamers, Doers, Disruptors – Our Founders!
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
                        loading="lazy"
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

        <div className="flex justify-center pb-5 lg:pb-5">
          <Link to="/awards">
            <Button
              size="large"
              variant="contained"
              endIcon={<EastIcon />}
              sx={{
                backgroundColor: "#1d2b3a",
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
