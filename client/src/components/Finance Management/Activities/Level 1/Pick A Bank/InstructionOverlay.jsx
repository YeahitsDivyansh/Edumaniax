import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CancelIcon from "/financeGames6to8/button-cancel.svg"; // adjust path as needed

const InstructionOverlay = ({ onClose }) => {
  const [highlightIndex, setHighlightIndex] = useState(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setHighlightIndex(index);
      setTimeout(() => setHighlightIndex(null), 2000); // highlight duration 2s
      index = (index + 1) % 3; // move to next bank
    }, 4000); // 2s highlight + 2s gap = 4s cycle

    return () => clearInterval(interval);
  }, []);

  const banks = [
    { name: "Bank A", img: "/financeGames6to8/level-2/bankA.svg" },
    { name: "Bank B", img: "/financeGames6to8/level-2/bankB.svg" },
    { name: "Bank C", img: "/financeGames6to8/level-2/bankC.svg" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
             md:overflow-hidden overflow-y-auto"
    >
      {/* ✅ scroll only on small screens */}
      <div
        className="relative bg-[#0e341d] shadow-xl w-[95%] md:w-[1000px] text-white z-10 
               border border-gray-700 
               max-h-[90vh] overflow-y-auto md:overflow-visible 
               p-4 sm:p-6"
      >
        {/* ✅ only scroll inside on phone */}

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="
            absolute 
            top-2 right-2 
            sm:top-4 sm:right-4 
            md:top-[-20px] md:right-[-20px]
            w-[50px] h-[35px] 
            sm:w-[70px] sm:h-[50px] 
            md:w-[103px] md:h-[68px] 
            rounded-full shadow-md 
            hover:scale-110 
            transition-transform 
            z-50
          "
        >
          {/* Push it out for desktop */}
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
          {/* Game Content — will move below on mobile */}
          <div className="w-full lg:-ml-6 max-w-5xl mx-auto border border-[#F3F4F6] rounded-xl p-4 bg-[#00260E] order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {banks.map((bank, i) => (
                <div key={i}>
                  <h3 className="text-white font-bold mb-2">{bank.name}</h3>
                  <div
                    className={`rounded-lg w-40 h-48 mx-auto flex items-center justify-center bg-[#00260E] transition-all duration-300 ${
                      highlightIndex === i
                        ? "border-4 border-white"
                        : "border border-[#28343A]"
                    }`}
                  >
                    <img
                      src={bank.img}
                      alt={bank.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Instructions — moves to top on mobile */}
          <div className="flex flex-col lg:w-1/2 gap-4 order-1 lg:order-2">
            <div className="text-gray-200 lilita-one-regular leading-snug text-xs sm:text-sm lg:text-base text-left">
              <p>
                You're opening your first bank account. Compare 3
                student-friendly options:
              </p>
              <ul className="list-disc list-inside mt-1">
                <li>Bank A: ₹0 monthly fee, 3% interest</li>
                <li>Bank B: ₹50/month fee, free UPI + cashback</li>
                <li>Bank C: ₹0 fees but only offline services</li>
              </ul>
              <p className="mt-2 font-bold">
                Task: Pick one, explain your choice.
              </p>
            </div>

            {/* Learning Outcome */}
            <div className="bg-[#FCB813] lilita-one-regular text-white font-semibold p-2 sm:p-3 rounded-sm shadow-md text-xs sm:text-sm text-left leading-snug mt-0 lg:mt-8 max-w-md text-outline">
              <div className="uppercase text-sm sm:text-base mb-1">
                Learning Outcome:
              </div>
              <div>Introducing banking basics.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionOverlay;
