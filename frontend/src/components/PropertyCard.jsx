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
import './LatestNews.css'

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
  customcategory,
  category
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
    <div className="border relative p-2 hover:shadow-2xl bg-white transition-all duration-300">
      {/* Property Image */}
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="h-[230px] w-full object-cover"
        />
      </div>
  
      {/* Property Details */}
      <div className="mt-3 font-roboto text-sm flex justify-between px-3">
        <div>
          <p className="font-semibold text-base">{name}</p>
          <p className="text-gray-700 font-normal text-xs">By {builder}</p>
        </div>
        <p className="font-semibold text-[#EB664E] text-lg">₹{toINRCr(price)}*</p>
      </div>

      {/* Location */}
      <div className="flex items-center mt-3 px-3">
        <LocationOnIcon sx={{ color: "darkblue", fontSize: "18px" }} />
        <span className="ml-1 text-xs">{location}</span>
      </div>

      {/* Property Features */}
      <div className="grid grid-cols-3 gap-3 mt-5 px-3 font-roboto text-xs">
        <div className="flex items-center gap-1">
          <HomeIcon sx={{ color: "darkblue", fontSize: "18px" }} />
          <span>{unit}</span>
        </div>
        <div className="flex items-center gap-1">
          <SquareFootIcon sx={{ color: "darkblue", fontSize: "18px" }} />
          <span>{selectUnit(sizeUnit)}</span>
        </div>
        <div className="flex items-center gap-1">
          <CurrencyRupeeIcon sx={{ color: "darkblue", fontSize: "18px" }} />
          <span>{divide(sizeUnit)}</span>
        </div>
      </div>
  
      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <div className="flex-1">
          <Link to={`/project/${slug}`}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#03002e",
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
