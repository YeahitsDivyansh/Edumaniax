import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CancelIcon from "/financeGames6to8/button-cancel.svg"; // adjust path as needed

const InstructionOverlay = ({ onClose }) => {
  const [iceCreamInSpend, setIceCreamInSpend] = useState(false);

  // Toggle every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIceCreamInSpend((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const iceCreamCard = (
    <motion.div
      key="ice-cream-card"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`transition-all duration-200 p-4 mb-3 rounded-lg flex items-center justify-between shadow-sm 
        border ${iceCreamInSpend ? "border-[#5F8428]" : "border-gray-600"} 
        bg-[#131F24] hover:bg-[#202F36]`}
    >
      <div className="flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border border-gray-600">
        <img src="/financeGames6to8/coin.svg" alt="coin" className="w-5 h-5" />
        <span className="text-yellow-400 font-bold">₹150</span>
      </div>
      <div className="flex items-center gap-3 flex-1 justify-center">
        <div className="text-white font-medium text-sm text-center">
          Ice Cream Treat
        </div>
        <img
          src="/financeGames6to8/level-1/ice-cream.svg"
          alt="Ice Cream"
          className="w-6 h-6 flex-shrink-0"
        />
      </div>
    </motion.div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
             md:overflow-hidden overflow-y-auto" // ✅ scroll only on small screens
    >
      <div
        className="relative bg-[#0e341d] shadow-xl w-[95%] md:w-[1000px] text-white z-10 
               border border-gray-700 
               max-h-[90vh] overflow-y-auto md:overflow-visible // ✅ only scroll inside on phone
               p-4 sm:p-6"
      >
        {/* Cancel button */}
        <button
          onClick={onClose}
          className="
    absolute 
    top-2 right-2 
    sm:top-4 sm:right-4 
    md:top-[-20px] md:right-[-20px]    /* Push it out for desktop */
    w-[50px] h-[35px] 
    sm:w-[70px] sm:h-[50px] 
    md:w-[103px] md:h-[68px] 
    rounded-full shadow-md 
    hover:scale-110 
    transition-transform 
    z-50
  "
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
          <div className="w-full lg:-ml-6 max-w-5xl mx-auto border border-green-800 rounded-xl p-4 bg-[#00260E]">
            <div className="flex flex-col lg:flex-row gap-4 w-full justify-center">
              {/* Available Expenses */}
              <div className="w-full lg:w-64">
                <h2 className="text-lg font-semibold text-center text-white mb-3">
                  Available Expenses
                </h2>
                <div className="bg-[#202F364D] p-4 rounded-xl shadow-lg w-full min-h-[340px]">
                  {/* Save for Shoes */}
                  <div className="transition-all duration-200 p-3 mb-2 rounded-lg flex items-center justify-between shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                    <div className="flex items-center gap-1 min-w-[65px] px-1 py-0.5 rounded-md border border-gray-600">
                      <img
                        src="/financeGames6to8/coin.svg"
                        alt="coin"
                        className="w-4 h-4"
                      />
                      <span className="text-yellow-400 font-bold text-sm">
                        ₹350
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-center">
                      <div className="text-white font-medium text-xs text-center whitespace-nowrap">
                        Save for Shoes
                      </div>
                      <img
                        src="/financeGames6to8/level-1/shoes.svg"
                        alt="Shoes"
                        className="w-5 h-5 flex-shrink-0"
                      />
                    </div>
                  </div>

                  {/* Ice Cream Treat */}
                  <AnimatePresence>
                    {!iceCreamInSpend && iceCreamCard}
                  </AnimatePresence>

                  {/* Gift */}
                  <div className="transition-all duration-200 p-3 mb-2 rounded-lg flex items-center justify-between shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                    <div className="flex items-center gap-1 min-w-[65px] px-1 py-0.5 rounded-md border border-gray-600">
                      <img
                        src="/financeGames6to8/coin.svg"
                        alt="coin"
                        className="w-4 h-4"
                      />
                      <span className="text-yellow-400 font-bold text-sm">
                        ₹150
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-center">
                      <div className="text-white font-medium text-xs text-center whitespace-nowrap">
                        Gift
                      </div>
                      <img
                        src="/financeGames6to8/level-1/gift.svg"
                        alt="Gift"
                        className="w-5 h-5 flex-shrink-0"
                      />
                    </div>
                  </div>

                  {/* Data Plan */}
                  <div className="transition-all duration-200 p-3 mb-2 rounded-lg flex items-center justify-between shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                    <div className="flex items-center gap-1 min-w-[65px] px-1 py-0.5 rounded-md border border-gray-600">
                      <img
                        src="/financeGames6to8/coin.svg"
                        alt="coin"
                        className="w-4 h-4"
                      />
                      <span className="text-yellow-400 font-bold text-sm">
                        ₹210
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-center">
                      <div className="text-white font-medium text-xs text-center whitespace-nowrap">
                        Data Plan
                      </div>
                      <img
                        src="/financeGames6to8/level-1/data-plan.svg"
                        alt="Data Plan"
                        className="w-5 h-5 flex-shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spend It */}
              <div className="w-full lg:w-64">
                <h2 className="text-lg font-semibold text-center text-white mb-3">
                  Spend It
                </h2>
                <div className="bg-[#0A160E] p-4 rounded-xl shadow-lg w-full min-h-[350px] border border-gray-600 flex flex-col items-center justify-center text-gray-400 text-center text-xs">
                  <AnimatePresence>
                    {iceCreamInSpend && iceCreamCard}
                  </AnimatePresence>
                  {!iceCreamInSpend && (
                    <>
                      Drag and drop here from
                      <br />
                      available expenses
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Instructions */}
          <div className="flex flex-col lg:w-1/2 gap-4">
            <p className="text-gray-200 lilita-one-regular leading-snug text-xs sm:text-sm lg:text-base text-left">
              You're a student with ₹2,000 pocket money for the month. You want
              to hang out with friends, save up for a gaming mouse, and also
              manage your daily expenses like snacks, school supplies, and data
              top-ups.
            </p>

            {/* Learning Outcome */}
            <div className="bg-[#FCB813] lilita-one-regular text-white font-semibold p-2 sm:p-3 rounded-sm shadow-md text-xs sm:text-sm text-left leading-snug mt-0 lg:mt-8 max-w-md">
              <div className="uppercase text-sm sm:text-base mb-1">
                Learning Outcome:
              </div>
              <div>
                Students experience the trade-offs and unexpected costs of real
                life.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionOverlay;
