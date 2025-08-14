import React, { useState, useEffect } from "react";
import CancelIcon from "/financeGames6to8/button-cancel.svg";

const InstructionOverlay = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = [
    "Lend them money",
    "Suggest selling something",
    "Help them budget next month",
    "Tell them to skip the trip",
  ];

  // Auto-cycle through options
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % options.length);
    }, 1500); // change every 1.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:overflow-hidden overflow-y-auto">
      <div className="relative bg-[#0e341d] shadow-xl w-[95%] md:w-[1000px] text-white z-10 border border-gray-700 max-h-[90vh] overflow-y-auto md:overflow-visible p-4 sm:p-6">
        {/* Cancel button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-[-20px] md:right-[-20px] w-[50px] h-[35px] sm:w-[70px] sm:h-[50px] md:w-[103px] md:h-[68px] rounded-full shadow-md hover:scale-110 transition-transform z-50"
        >
          <img
            src={CancelIcon}
            alt="Close"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Top nav */}
        <div className="flex justify-center items-center bg-[#28343A] px-5 py-3 border-b border-gray-700">
          <h2 className="text-xl sm:text-2xl md:text-3xl lilita-one-regular font-bold text-white">
            How to Play?
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row p-6 gap-6">
          {/* Left side game UI */}
          <div className="w-full lg:-ml-6 max-w-5xl mx-auto border border-[#F3F4F6] rounded-xl p-6 bg-[#202F364D] order-2 lg:order-1">
            <h2 className="text-3xl font-extrabold lilita-one-regular mb-6 text-white font-sans text-center">
              🎯 Overspend Trap
            </h2>
            <p className="mb-6 lilita-one-regular text-lg text-white font-medium text-center">
              Your friend just spent ₹1,200 on concert tickets and now can’t pay
              for school trip fees.
            </p>

            <div className="space-y-4">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`block lilita-one-regular p-4 rounded-2xl border-2 text-lg font-semibold shadow-md transition-all duration-300 bg-[#131F24] text-white ${
                    activeIndex === index
                      ? "border-green-500 scale-[1.02]"
                      : "border-gray-300"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          {/* Right side instructions */}
          <div className="flex flex-col lg:w-1/2 gap-4 order-1 lg:order-2">
            <div className="text-gray-200 lilita-one-regular leading-snug text-xs sm:text-sm lg:text-base text-left">
              <p>
                Your friend just spent ₹1,200 on concert tickets and now can’t
                pay for school trip fees. You need to decide how to respond:
              </p>
              <ul className="list-disc list-inside mt-1">
                <li>Lend them money</li>
                <li>Suggest selling something</li>
                <li>Help them budget next month</li>
                <li>Tell them to skip the trip</li>
              </ul>
              <p className="mt-2 font-bold">
                Task: Choose the best option and explain why.
              </p>
            </div>

            {/* Learning Outcome */}
            <div className="bg-[#FCB813] lilita-one-regular text-white font-semibold p-2 sm:p-3 rounded-sm shadow-md text-xs sm:text-sm text-left leading-snug mt-0 lg:mt-8 max-w-md text-outline">
              <div className="uppercase text-sm sm:text-base mb-1">
                Learning Outcome:
              </div>
              <div>
                Understanding how impulsive spending can lead to tough choices.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionOverlay;
