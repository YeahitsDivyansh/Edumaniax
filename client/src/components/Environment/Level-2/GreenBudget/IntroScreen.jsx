import React from "react";
import bgForFinance from "/financeGames6to8/bgForFinance.svg";
import btnExit from "/financeGames6to8/btn-exit.svg"; // make sure path is correct
import { Link } from "react-router-dom";
import btnAudio from "/financeGames6to8/btnAudio.svg";
import BottomProgressLoader from "./BottomProgressLoader";
import Vol from "@/components/icon/GreenBudget/Vol.jsx";

const IntroScreen = ({ onShowInstructions }) => {
  return (
    <div
      className="w-full -mt-8 h-screen relative flex items-center justify-center"
    >
      <img
        src="/environmentGameInfo/bg.gif"
        alt="Character talking"
        className=" absolute inset-0 w-full h-full object-cover z-0"
      />
      <Link
        to="/environment/games"
        className="absolute top-4 left-4 w-[120px] h-[48px] sm:w-[160px] sm:h-[64px] md:w-[202px] md:h-[82px] transition transform active:scale-95"
      >
        <img
          src={btnExit}
          alt="Exit"
          className="w-[7vw] h-[7vh] mt-7 ml-7 h-full object-contain cursor-pointer"
        />
      </Link>

      <button
        onClick={() => {
          console.log("Audio button clicked");
          // Optional: add toggle audio logic here
        }}
        className="absolute top-15 right-11  transition-transform active:scale-95"
      >
        <Vol/>
      </button>

      {/* Center Content */}
      <div className="text-center flex flex-col items-center justify-start sm:justify-center mt-10 sm:-mt-100 z-1">
        {/* Heading: The Budgeter */}
        <span className="lilita [text-shadow:0_6px_0_#000] [text-stroke:1px_black] text-[7vh] md:text-[9vh] text-[#ffcc00] tracking-[0.05vw]">
        Green Budget
        </span>

        {/* Subheading: Challenge 1 */}
        <h2 className="text-2xl lilita [text-shadow:0_6px_0_#000] [text-stroke:1px_black] sm:text-4xl text-white -mt-2 mb-6 sm:mb-10">
          Challenge 1
        </h2>
      </div>
        {/* Add the loader at the bottom */}
        <BottomProgressLoader onComplete={onShowInstructions} />
      
    </div>
  );
};

export default IntroScreen;
