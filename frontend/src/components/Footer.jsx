import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import instagram from "../assets/icons/instagram.png";
import youtube from "../assets/icons/youtube.png";
import footerLogo from "../assets/img/Grow Infinity Logo White.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="bg-[#1d2a3b] text-white">
      <div className="px-5 pt-5 mx-auto max-w-screen-xl md:px-10 lg:px-9">
        <div className="grid gap-10 mb-8 lg:grid-cols-6">
          {/* Left Section - Logo & About */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <img
              src={footerLogo}
              alt="Grow Infinity Realtors Logo"
              className="h-[70px] w-[200px] lg:w-[250px] object-contain"
            />
            <p className="mt-5 text-sm lg:w-[340px] text-[#d1cfda]">
            Grow Infinity Realtors is a well-established and highly regarded real estate agent firm based in Noida, known for its expertise in helping clients buy and sell properties. With years of industry experience, the firm combines strategic market insights with a personalized approach, ensuring that every client receives tailored solutions to meet their unique real estate needs.
            </p>
          </div>

          {/* Right Sections - Links, Contact, Follow Us */}
          <div className="grid grid-cols-2 gap-10 lg:col-span-4 md:grid-cols-3">
            {/* Operational Zones */}
            <div>
              <p className="font-semibold text-lg">Operational Zones</p>
              <ul className="mt-2 space-y-2 text-[#d1cfda]">
                <li>Sector-150</li>
                <li>Ghaziabad</li>
                <li>Noida Expressway</li>
                <li>Yamuna Expressway</li>
                <li>Siddharth Vihar</li>
                <li>Noida Extension</li>
              </ul>
            </div>

            {/* Key Links */}
            <div>
              <p className="font-semibold text-lg">Key Links</p>
              <ul className="mt-2 space-y-2 text-[#d1cfda]">
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/awards">Awards & Achievements</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <p className="font-semibold text-lg">Let’s Connect</p>
              <ul className="mt-2 space-y-3 text-[#d1cfda]">
                <li className="text-sm">
                  Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida,
                  Uttar Pradesh-201305
                </li>
                <li className="flex items-center text-gray-300">
                  <EmailIcon />
                  <a
                    href="mailto:growinfinityrealtor1@gmail.com"
                    className="ml-2"
                  >
                    growinfinityrealtor1@gmail.com
                  </a>
                </li>
                <li className="flex items-center text-gray-300 whitespace-nowrap gap-2">
                  <PhoneIcon />
                  <a href="tel:+919990052554" className="text-base">
                    +91-9990052554
                  </a>
                </li>
              </ul>

              {/* Follow Us Section (Properly Aligned) */}
              <div className="flex flex-col mt-5">
                <p className="font-semibold text-lg mb-2">Follow Us</p>
                <div className="flex space-x-5">
                  <a href="https://www.linkedin.com/company/grow-infinity-realtors/" target="_blank" rel="noopener noreferrer">
                    <img
                      src={twitter}
                      alt="Twitter"
                      className="w-[25px] h-[25px]"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/growinfinityrealtors_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={instagram}
                      alt="Instagram"
                      className="w-[25px] h-[25px]"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/p/Grow-Infinity-Realtors-100092248133482/?_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={facebook}
                      alt="Facebook"
                      className="w-[25px] h-[25px]"
                    />
                  </a>
                  <a href="https://www.youtube.com/@growinfinityrealtors" target="_blank" rel="noopener noreferrer">
                    <img
                      src={youtube}
                      alt="YouTube"
                      className="w-[25px] h-[25px]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col items-center justify-center pt-5 pb-3 border-t border-white sm:flex-row">
          <p className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Grow Infinity Realtors. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
