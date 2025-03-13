import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import instagram from "../assets/icons/instagram.png";
import youtube from "../assets/icons/youtube.png";
import footerLogo from "../assets/img/Grow Infinity Logo White.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from '@mui/icons-material/Email';

import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="bg-[#1d2a3b] w-full text-[#d1cfda] py-10">
      <div className="max-w-screen-xl mx-auto px-5">
        {/* Grid Layout for Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Section: Logo & Description */}
          <div className="flex flex-col items-start">
            <img
              src={footerLogo}
              alt="Grow Infinity Logo"
              className="h-16 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-6">
              Grow Infinity Realtors is an accomplished real estate agency. With
              years of experience, we bring a strategic yet personal approach to
              home buying, selling, and renting.
            </p>
          </div>

          {/* Middle Section: Links */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="font-semibold text-lg text-white">
                Operational Zones
              </p>
              <ul className="mt-3 space-y-2">
                <li>Sector-150</li>
                <li>Ghaziabad</li>
                <li>Noida Expressway</li>
                <li>Yamuna Expressway</li>
                <li>Siddharth Vihar</li>
                <li>Noida Extension</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-lg text-white">Key Links</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>Terms & Conditions</li>
                <li>Business</li>
                <li>Entertainment</li>
                <li>
                  <Link to="/Contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section: Contact & Socials */}
          <div className="flex flex-col">
            <p className="font-semibold text-lg text-white">Let’s Connect</p>
            <ul className="mt-3 space-y-2">
              <li>
                Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida,
                Uttar Pradesh-201305
              </li>
              <li className="flex items-center space-x-2">
                <EmailIcon className="text-gray-300" />
                <a href="mailto:growinfinityrealtor1@gmail.com?subject=Inquiry related to propeties" className="hover:underline">
                  growinfinityrealtor1@gmail.com
                </a>
              </li>

              <li className="flex items-center space-x-2">
                <PhoneIcon className="text-gray-300" />
                <a href="tel:+919990052554" className="hover:underline">
                  +91-9990052554
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-5">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="Twitter" className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com/growinfinityrealtors_official/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Instagram" className="w-8 h-8" />
              </a>
              <a
                href="https://www.facebook.com/p/Grow-Infinity-Realtors-100092248133482/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" className="w-8 h-8" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtube} alt="YouTube" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white pt-5 mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Grow Infinity Realtors. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
