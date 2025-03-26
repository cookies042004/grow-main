import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Button, Tooltip } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";
import { PropertyEnquiryForm } from "./PropertyEnquiryForm";
import "./LatestNews.css";

export const PropertyCard = ({
  id,
  name,
  slug,
  image,
  location,
  builder,
  unit,
  size,
  sizeUnit,
  price,
  propertyType,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function toINRCr(amount) {
    return amount < 10000000
      ? (amount / 100000).toFixed(1) + " L"
      : (amount / 10000000).toFixed(1) + " Cr";
  }

  function selectUnit(sizeUnit) {
    return sizeUnit === "sqFt" ? size + " sq.ft." : size + " sq.yd.";
  }

  function divide(sizeUnit) {
    return Math.trunc(price / size) + (sizeUnit === "sqFt" ? " / sq.ft." : " / sq.yd.");
  }

  const handlePropertyNavigation = () => {
    navigate(`/project/${slug}`);
  };

  return (
    <div className="border relative p-2 hover:shadow-2xl bg-white transition-all duration-300">
      {/* Property Image */}
      <div className="flex justify-center">
        <img src={image} alt={name} className="h-[230px] w-full object-cover" />
      </div>

      {/* Property Details */}
      <div className="mt-3 text-sm flex justify-between">
        <div className="flex-1 min-w-0 px-2">
          <Tooltip title={name} arrow>
            <p className="font-semibold text-[14px] text-[#1d2a3b] truncate cursor-pointer">
              {name || title}
            </p>
          </Tooltip>
          <p className="text-[#1d2a3b] font-normal text-[12px]">By {builder}</p>
        </div>
        <p className="font-semibold text-[#1d2a3b] text-lg">₹{toINRCr(price)}*</p>
      </div>

      {/* Location */}
      <div className="flex items-center mt-3">
        <LocationOnIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
        <span className="ml-1 text-xs">{location}</span>
      </div>

      {/* Features - Units, Size, Price per sq.ft. */}
      <div className="grid grid-cols-3 gap-3 mt-5 font-roboto text-xs">
        <div className="flex items-center gap-1">
          <HomeIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
          <span>{unit}</span>
        </div>
        <div className="flex items-center gap-1">
          <SquareFootIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
          <span>{selectUnit(sizeUnit)}</span>
        </div>
        <div className="flex items-center">
          <CurrencyRupeeIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
          <span>{divide(sizeUnit)}</span>
        </div>
      </div>

      {/* Buttons - View Details & Enquiry */}
      <div className="mt-5 flex gap-3">
        <div className="flex-1">
          <Button
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "#1d2a3b",
              color: "#fff",
              textTransform: "none",
              fontSize: { xs:"14px",sm:"13px",md: "14px" },
            }}
            onClick={handlePropertyNavigation}
          >
            View Details
          </Button>
        </div>
        
        <div className="flex-1">
          <Button
            onClick={handleOpen}
            fullWidth
            variant="contained"
            color="success"
            startIcon={<CallIcon />}
            sx={{ color: "#fff", textTransform: "none",fontSize: { xs:"14px",sm:"13px",md: "14px" }, }}
            
          >
            Enquiry
          </Button>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <PropertyEnquiryForm id={id} handleClose={handleClose} open={open} />

      {/* Property Type Tag */}
      <div className="absolute top-[20px]">
        <Button
          endIcon={<DoneIcon />}
          size="small"
          variant="contained"
          color="success"
          sx={{ borderRadius: "0px", height: "25px" }}
        >
          {propertyType}
        </Button>
      </div>
    </div>
  );
};
