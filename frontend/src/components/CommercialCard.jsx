import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { PropertyEnquiryForm } from "./PropertyEnquiryForm";
import "./LatestNews.css";

export const CommercialCard = ({
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
  customcategory,
  category,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

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
      return size + " sq.ft.";
    } else if (sizeUnit === "yard") {
      return size + " sq.yd.";
    }
  }

  function divide(sizeUnit) {
    if (sizeUnit === "sqFt") {
      return Math.trunc(price / size) + " /  sq.ft.";
    } else if (sizeUnit === "yard") {
      return Math.trunc(price / size) + " / sq.yd.";
    }
  }

  return (
    <div className="border relative p-2 hover:shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] bg-white transition-all duration-300">
      {/* Property Image */}
      <div className="flex justify-center">
        <img src={image} alt={name} className="h-[230px] w-full object-cover" />
      </div>

      {/* Property Details */}
      <div className="mt-3 font-sans text-sm flex justify-between">
        <p className="font-semibold ps-3 text-[#1d2a3b] text-sm">
          {name} <br />
          <span className="text-gray-700 font-normal text-xs">
            By {builder}
          </span>
        </p>
        <p className="font-semibold text-[#1d2a3b] text-lg">
          ₹{toINRCr(price)}*
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center mt-3">
        <LocationOnIcon
          sx={{ color: "#1d2a3b", fontSize: "18px", paddingBottom: "3px" }}
        />
        <p className="text-xs">{location}</p>
      </div>

      {/* Additional Info */}
      <div className="flex gap-3 justify-between mt-5 font-roboto">
        <div className="flex gap-1 items-center">
          <HomeIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
          <p className="text-xs">{unit}</p>
        </div>
        <div className="flex gap-1 items-center">
          <SquareFootIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
          <p className="text-xs">{selectUnit(sizeUnit)}</p>
        </div>
        <div className="flex gap-1 items-center">
          <CurrencyRupeeIcon sx={{ color: "#1d2a3b", fontSize: "18px" }} />
          <p className="text-xs">{divide(sizeUnit)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <div className="flex-1">
          <Link to={`/project/commercial/${slug}`}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#1d2a3b",
                color: "#fff",
                textTransform: "none",
              }}
            >
              View Details
            </Button>
          </Link>
        </div>
        <div className="flex-1">
          <Button
            onClick={handleOpen}
            fullWidth
            variant="contained"
            color="success"
            startIcon={<CallIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Enquiry
          </Button>
        </div>
      </div>

      {/* Property Enquiry Form */}
      <PropertyEnquiryForm id={id} handleClose={handleClose} open={open} />

      {/* Property Type Badge */}
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
