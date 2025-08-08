import React from "react";
import CancelIcon from "/financeGames6to8/button-cancel.svg"; // adjust path as needed

const InstructionOverlay = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Main container */}
      <div className="relative bg-[#0B2917] shadow-xl w-[95%] md:w-[1000px] text-white z-10 border border-gray-700">
        {/* Cancel button */}
        <button
          onClick={onClose}
          className="absolute -top-8 -right-8 rounded-full shadow-md 
             hover:scale-110 transition-transform z-50
             w-[103px] h-[68px] sm:w-[90px] sm:h-[60px] md:w-[103px] md:h-[68px]"
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
          <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
            {/* Available Expenses */}
            <div className="w-full lg:w-72">
              <h2 className="text-xl font-semibold text-center text-white mb-4">
                Available Expenses
              </h2>
              <div className="bg-[#202F364D] p-6 rounded-xl shadow-lg w-full min-h-[370px] border border-gray-600">
                {/* Save for Shoes */}
                <div className="transition-all duration-200 p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                  <div className="flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border border-gray-600">
                    <img
                      src="/financeGames6to8/coin.svg"
                      alt="coin"
                      className="w-5 h-5"
                    />
                    <span className="text-yellow-400 font-bold">₹350</span>
                  </div>
                  <div className="text-white font-medium text-sm text-center flex-1">
                    Save for Shoes
                  </div>
                  <img
                    src="/financeGames6to8/level-1/shoes.svg"
                    alt="Shoes"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </div>

                {/* Ice Cream Treat */}
                <div className="transition-all duration-200 p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                  <div className="flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border border-gray-600">
                    <img
                      src="/financeGames6to8/coin.svg"
                      alt="coin"
                      className="w-5 h-5"
                    />
                    <span className="text-yellow-400 font-bold">₹150</span>
                  </div>
                  <div className="text-green-300 font-medium text-sm text-center flex-1">
                    Ice Cream Treat
                  </div>
                  <img
                    src="/financeGames6to8/level-1/ice-cream.svg"
                    alt="Ice Cream"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </div>

                {/* Gift */}
                <div className="transition-all duration-200 p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                  <div className="flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border border-gray-600">
                    <img
                      src="/financeGames6to8/coin.svg"
                      alt="coin"
                      className="w-5 h-5"
                    />
                    <span className="text-yellow-400 font-bold">₹150</span>
                  </div>
                  <div className="text-white font-medium text-sm text-center flex-1">
                    Gift
                  </div>
                  <img
                    src="/financeGames6to8/level-1/gift.svg"
                    alt="Gift"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </div>

                {/* Data Plan */}
                <div className="transition-all duration-200 p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm border border-gray-600 bg-[#131F24] hover:bg-[#202F36]">
                  <div className="flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border border-gray-600">
                    <img
                      src="/financeGames6to8/coin.svg"
                      alt="coin"
                      className="w-5 h-5"
                    />
                    <span className="text-yellow-400 font-bold">₹210</span>
                  </div>
                  <div className="text-white font-medium text-sm text-center flex-1">
                    Data Plan
                  </div>
                  <img
                    src="/financeGames6to8/level-1/data-plan.svg"
                    alt="Data Plan"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Spend It */}
            <div className="w-full lg:w-72">
              <h2 className="text-xl font-semibold text-center text-white mb-4">
                Spend It
              </h2>
              <div className="bg-[#0A160E] p-6 rounded-xl shadow-lg w-full min-h-[370px] border border-gray-600 flex items-center justify-center text-gray-400 text-center text-sm">
                Drag and drop here from
                <br />
                available expenses
              </div>
            </div>
          </div>

          {/* Right side: Instructions */}
          <div className="flex flex-col lg:w-1/2 gap-6">
            <p className="text-gray-200 leading-relaxed">
              You're a student with{" "}
              <span className="font-bold text-yellow-300">₹2,000</span> pocket
              money for the month. You want to hang out with friends, save up
              for a gaming mouse, and also manage your daily expenses like
              snacks, school supplies, and data top-ups.
            </p>

            {/* Learning Outcome */}
            <div className="bg-yellow-400 text-black font-semibold p-4 rounded-sm shadow-md">
              Students experience the trade-offs and unexpected costs of real
              life.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionOverlay;
