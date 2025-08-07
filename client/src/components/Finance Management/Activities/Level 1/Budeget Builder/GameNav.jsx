import React from "react";
import { FaHeart, FaVolumeUp, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const GameNav = ({ heartCount = 4 }) => {
  return (
    <div className="w-full bg-[#263238] px-4 py-6 flex items-center justify-between shadow-md rounded-none -mt-6">
      {/* Left Arrow */}
      <button className="mt-4">
        <img
          src="/financeGames6to8/btn-navigation.svg"
          alt="Back"
          className="h-10 w-auto"
        />
      </button>

      {/* Title */}
      <h1 className="text-yellow-400 mt-4 py-2 lilita-one-regular text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
        Weekly Budget Challenger
      </h1>

      {/* Right Icons */}
      <div className="flex gap-2 mt-4">
        <div className="h-10 px-3 bg-[#232E34] flex items-center justify-center gap-2 shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          <img
            src="/financeGames6to8/iconHeart.svg"
            alt="Heart"
            className="h-5 w-auto"
          />
          <span className="text-[#FF5A5F] font-bold text-base">
            {heartCount}
          </span>
        </div>

        <button>
          <img
            src="/financeGames6to8/btnAudio.svg"
            alt="Audio"
            className="h-10 w-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default GameNav;
