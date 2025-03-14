import React from "react";
import brand1 from "../assets/img/Ace.png";
import brand2 from "../assets/img/ATS LOGO.png";
import brand3 from "../assets/img/dasnac.png";
import brand4 from "../assets/img/Eldeco La Vida Bella Group Logo.png";
import brand5 from "../assets/img/Eldeco.png";
import brand6 from "../assets/img/fusion.png";
import brand7 from "../assets/img/gaurs.png";
import brand8 from "../assets/img/irish.png";
import brand9 from "../assets/img/M3M.png";
import brand10 from "../assets/img/Mahagun.png";
import brand11 from "../assets/img/prateek.png";
import brand12 from "../assets/img/Prestige Group Logo.png";
import brand13 from "../assets/img/Stellar Group Logo.png";
import brand14 from "../assets/img/Tata.png";

const brands = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
  brand11,
  brand12,
  brand13,
  brand14,
];

export const Marquee = () => {
  return (
    <div className="relative w-full py-6 overflow-hidden">
      <div className="marquee">
        <div className="marquee-track">
          {brands.concat(brands).map((brand, index) => (
            <div key={index} className="marquee-item">
              <img
                src={brand}
                alt={`brandlogo${index + 1}`}
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          overflow: hidden;
          position: relative;
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent,
            white 20%,
            white 80%,
            transparent
          );
        }

        .marquee-track {
          display: flex;
          width: 200%;
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-item {
          flex: 0 0 auto;
          width: 150px;
          margin: 0 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brand-logo {
          width: 140px;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.1));
        }

        .brand-logo:hover {
          transform: scale(1.1) rotate(2deg);
          filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.2));
        }

        @keyframes marqueeScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            width: 100px;
            margin: 0 10px;
          }

          .brand-logo {
            width: 90px;
          }
        }
      `}</style>
    </div>
  );
};
