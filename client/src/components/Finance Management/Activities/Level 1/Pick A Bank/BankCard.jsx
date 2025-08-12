import React from "react";

export default function BankCard({ bank, selected, onSelect }) {
  const bankImages = {
    A: "/financeGames6to8/level-2/bankA.svg",
    B: "/financeGames6to8/level-2/bankB.svg",
    C: "/financeGames6to8/level-2/bankC.svg",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Bank Name outside card */}
      <h2 className="text-lg md:text-2xl font-bold text-white">{bank.name}</h2>

      {/* Card */}
      <div
        onClick={() => onSelect && onSelect(bank)}
        className={`flex flex-col items-center justify-start p-6 rounded-2xl shadow-lg transition-transform hover:scale-99 cursor-pointer 
        w-full max-w-sm md:max-w-md

        ${
          selected
            ? "border-4 border-white bg-[#202F36]/30"
            : "border border-gray-500 bg-[#202F36]/30"
        }`}
      >
        {/* Vault Image */}
        <img
          src={bankImages[bank.id]}
          alt={bank.name}
          className="w-36 md:w-44 mb-4 object-contain"
        />

        {/* "We will offer:" */}
        <p className="text-gray-300 lilita-one-regular text-sm md:text-base mb-4">
          We will offer:
        </p>
        {/* Fee + Interest Row */}
        <div className="flex gap-2 mb-2 w-full">
          {/* Fee */}
          <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg border border-white/30 text-xs">
            <span className="text-white">{bank.fee}</span>
            <img
              src="/financeGames6to8/coin.svg"
              alt="Fee"
              className="w-6 h-6"
            />
          </div>

          {/* Interest */}
          <div className="flex items-center justify-center gap-1 px-4 py-2 h-10 rounded-lg border border-white/30 flex-1">
            <span className="text-xs md:text-sm text-white whitespace-nowrap">
              {bank.interest}
            </span>
            <img
              src="/financeGames6to8/level-2/interest.svg"
              alt="Interest"
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/30 w-full text-center leading-tight">
          <span className="text-xs md:text-sm text-white">{bank.digital}</span>
          <img
            src="/financeGames6to8/level-2/features.svg"
            alt="Features"
            className="w-5 h-5 flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
