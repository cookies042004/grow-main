import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/img/logo.png";

export const Navbar = ({ mobileMenu, setMobileMenu }) => {

  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "null" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileMenu]);

  const handleLinkClick = () => {
    setMobileMenu(false);
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      navigate(0);
    } else {
      navigate("/");
    }
    window.scrollTo(0, 0);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Events", path: "/event" },
    { name: "Services", path: "/services" },
    { name: "News", path: "/news" },
    { name: "Contact us", path: "/contact" },
    { name: "Brochure", path: "/brochure" },
  ];

  return (
    <>
      <nav
        className={`fixed z-[20] top-0 shadow-lg transition-all duration-500 w-full ${
          isSticky
            ? "bg-white p-1 shadow-md"
            : "lg:w-[90%] lg:left-[5%] lg:top-[8%] lg:rounded-[15px] bg-[#FFFFFF80]"
        }`}
      >
        <div className="flex items-center justify-between pr-4">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <img src={logo} alt="Logo" width={isSticky ? 200 : 200} />
          </div>
          <ul className="hidden lg:flex gap-10">
            {navItems.slice(0, 6).map((item, index) => (
              <li key={index} className="font-dmsans font-[12.49px]">
                <NavLink to={item.path} onClick={handleLinkClick}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/brochure"
            className="hidden lg:block font-dmsans px-10 py-2 bg-[#1d2a3b] text-white rounded-[10px] uppercase shadow-md"
            style={{ boxShadow: "0px 5.46px 13.27px 0px #00000080" }}
          >
            Brochure
          </Link>
          {isMobile && (
            <IconButton
              sx={{ color: "#1d2a3b" }}
              size="large"
              aria-label="mobile-menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav
        className={`fixed z-[100] h-screen bg-white w-[70%] text-black transform  ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mx-3">
            <IconButton
              sx={{ color: "#1d2a3b" }}
              size="large"
              aria-label="close-menu"
              onClick={() => setMobileMenu(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="flex flex-col ms-5 mt-10 gap-10">
            {navItems.map((item, index) => (
              <li key={index} className="font-dmsans font-[12.49px]">
                <NavLink
                  to={item.path}
                  onClick={handleLinkClick}
                  className="hover:text-[#1d2a3b]"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
