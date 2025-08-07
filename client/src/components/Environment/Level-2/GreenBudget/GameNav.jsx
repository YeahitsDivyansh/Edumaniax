import React from "react";
import BackButton from "@/components/icon/GreenBudget/BackButton";
import Vol from "@/components/icon/GreenBudget/Vol.jsx";
import Heart from "@/components/icon/GreenBudget/heart.jsx";

const GameNav = () => {
  return (
    <div className="w-full h-[10vh] bg-[#28343A] flex items-center justify-between px-[2vw] relative z-10">
        <BackButton/>
        <span className="lilita [text-shadow:0_6px_0_#000] [text-stroke:1px_black] text-[4vh] md:text-[5vh] text-[#ffcc00] ml-[8vw] tracking-[0.05vw]">
        Green Budget
        </span>
        <div className="flex items-center space-x-[1vw]">
        <Heart/>
        <Vol/>
        </div>
    </div>
  );
};

export default GameNav;