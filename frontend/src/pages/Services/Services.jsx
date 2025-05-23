import React from "react";
import { Layout } from "../../components/Layout";

import "./Services.css";

import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { Link } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavigationBar } from "../../components/NavigationBar";
import serviceBanner from "../../assets/img/servicebanner.jpg";
import { Helmet } from "react-helmet-async";

export const Services = () => {
  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Grow Infinity Realtors | Services</title>
        <meta
        name="description"
        content="Explore our comprehensive range of real estate services, including residential, commercial, home rental, home loan, investment, and consultation services."
        />
        <meta name="robots" content="index, follow" />
        <link
        rel="canonical"
        href={`${process.env.BASE_URL}/services`}
        />
      </Helmet>
      <div className="bg-[#a79d900c]">
        {/* Service Hero  */}
        <div className="servicebanner flex items-center justify-center relative">
                {/* Lazy-loaded Background Image */}
                <img
                  src={serviceBanner}
                  alt="Event Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />  
              
                {/* Content */}
                <div className="grid sm:grid-cols-12 relative z-10">
                  <div className="col-span-12 text-center mt-10 lg:mt-20">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">Services</h1>
                  </div>
                </div>
              </div>

        <NavigationBar />

        {/* Our Services  */}
        <div className="my-5 max-w-[1280px] mx-auto">
          <h1 className="font-roboto py-3 lg:py-8 text-2xl font-medium text-[#1d2a3b] text-center">
            Our Services
          </h1>

          <div className="grid sm:grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <ApartmentIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3 className="text-[#1d2a3b]">RESIDENTIAL</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  These services focus on buying and selling homes, condos,
                  apartments, and other residential properties. They cater to
                  individuals and families for a place to live.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <StorefrontIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3 className="text-[#1d2a3b]">COMMERCIAL</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  Commercial real estate services deal with buying and selling
                  commercial properties like office buildings, retail spaces,
                  industrial warehouses, and land for development.
                  <br />
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <HomeWorkIcon sx={{ fontSize: { xs: "30px", lg: "50px" } }} />
                </i>
                <h3 className="text-[#1d2a3b]">HOME RENTAL</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  Home rental services streamline the rental process, ensuring a
                  convenient and secure experience for both property owners and
                  renters.
                  <br />
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <CreditScoreIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3 className="text-[#1d2a3b]">HOME LOAN</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  We offer a comprehensive suite of loan services to make your
                  home buying journey seamless. In addition to helping you find
                  the perfect property, expert home loan services.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <AutoGraphIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3 className="text-[#1d2a3b]">INVESTMENT</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  Investment-focused services assist clients in buying and
                  selling properties for investment purposes, such as rental
                  properties, vacation rentals, and fix-and-flip opportunities.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <PhoneCallbackIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3 className="text-[#1d2a3b]">CONSULTATION</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  These services offer expert advice to buyers and sellers,
                  helping them make informed decisions, understand market
                  trends, and strategize for successful transactions.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
