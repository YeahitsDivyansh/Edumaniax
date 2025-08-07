import React from "react";
import bgForFinance from "/financeGames6to8/bgForFinance.svg";
import btnExit from "/financeGames6to8/btn-exit.svg"; // make sure path is correct
import { Link } from "react-router-dom";
import btnAudio from "/financeGames6to8/btnAudio.svg";
import BottomProgressLoader from "./BottomProgressLoader";

const IntroScreen = () => {
  return (
    <div
      className="w-full -mt-8 h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${bgForFinance})` }}
    >
      <Link
        to="/finance/games"
        className="absolute top-4 left-4 w-[120px] h-[48px] sm:w-[160px] sm:h-[64px] md:w-[202px] md:h-[82px] transition transform active:scale-95"
      >
        <img
          src={btnExit}
          alt="Exit"
          className="w-full mt-10 h-full object-contain cursor-pointer"
        />
      </Link>

      <button
        onClick={() => {
          console.log("Audio button clicked");
          // Optional: add toggle audio logic here
        }}
        className="absolute top-4 right-4 w-[82px] h-[82px] sm:w-[120px] sm:h-[120px] md:w-[202px] md:h-[82px] transition-transform active:scale-95"
      >
        <img
          src={btnAudio}
          alt="Audio"
          className="w-full mt-10 h-full object-contain cursor-pointer"
        />
      </button>

      {/* Center Content */}
      <div className="text-center flex flex-col items-center justify-start sm:justify-center mt-10 sm:mt-0">
        {/* Heading: The Budgeter */}
        <h1 className="text-5xl sm:text-6xl lilita-one-regular text-[#FFE303] font-extrabold drop-shadow-lg mb-2 sm:mb-4">
          The Budgeter
        </h1>

        {/* Subheading: Challenge 1 */}
        <h2 className="text-2xl lilita-one-regular sm:text-4xl text-white font-semibold mb-6 sm:mb-10">
          Challenge 1
        </h2>

        {/* Add the loader at the bottom */}
        <BottomProgressLoader />
      </div>
    </div>
  );
};

export default IntroScreen;
