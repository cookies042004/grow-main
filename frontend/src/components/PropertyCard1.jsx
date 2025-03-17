import { useNavigate } from "react-router-dom";
import luxuryLiving from "../assets/img/luxury-living.jpg";
import newLaunches from "../assets/img/new-launches.jpg";
import affordable from "../assets/img/affordable.jpg";
import commercial from "../assets/img/commercial.jpg";

export const PropertyCard1 = ({ title }) => {
  const navigate = useNavigate();

  const submitHandler = () => {
    if (title === "Commercial") {
      navigate(`/commercial/${title}`);
    } else {
      navigate(`/property/${title}`);
    }
  };

  const getImage =
    title === "Luxury Living"
      ? luxuryLiving
      : title === "New Launches"
      ? newLaunches
      : title === "Commercial"
      ? commercial
      : affordable;

  return (
    <div
      className="relative items-center w-72 h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105 "
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      onClick={submitHandler}
    >
      <img src={getImage} alt={title} className="w-full h-full object-cover" />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white transition-opacity duration-100 `}
      >
        {/* <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white transition-opacity duration-100 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      > */}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
    </div>
  );
};
