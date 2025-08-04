import React, { useState } from "react";
import { FaChartLine, FaChartBar, FaCoins } from "react-icons/fa";
import PieChart from "../../../charts/PieChart";
import { useFinance } from "../../../../contexts/FinanceContext";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance


const getRandom = (max, min) => Math.random() * (max - min) + min;

const generateStockEffect = () => {
  // Stocks: Always negative (between -0.01 to -0.15)
  const stockRandom = (-getRandom(0.15, 0.01)).toFixed(2);
  return { stocks: +stockRandom };
};

const generateGoldEffect = () => {
  // Gold: Always positive (between 0.05 to 0.20)
  const goldRandom = getRandom(0.2, 0.05).toFixed(2);
  return { gold: +goldRandom };
};

const generateMutualFundsEffect = () => {
  // Mutual Funds: Always positive (between 0.02 to 0.15)
  const mutualFundsRandom = getRandom(0.15, 0.02).toFixed(2);
  return { mutualFunds: +mutualFundsRandom };
};

const newsItems = [
  {
    title: "📉 Tech stocks crash after regulations",
    explanation: "Regulations cause panic in the tech sector.",
    effectType: "stocks", // Specify which asset this affects
    icon: "📉",
  },
  {
    title: "🏆 Gold hits all-time high",
    explanation: "Investors rush to gold as a safe asset.",
    effectType: "gold", // Specify which asset this affects
    icon: "🏆",
  },
  {
    title: "📈 Mutual funds outperform savings accounts",
    explanation: "Mutual funds yield better returns.",
    effectType: "mutualFunds", // Specify which asset this affects
    icon: "📈",
  },
];

export default function NewsFlash() {
  const { completeFinanceChallenge } = useFinance();
  const [base, setBase] = useState({
    stocks: 1000,
    gold: 1000,
    mutualFunds: 1000,
  });

  const [investments, setInvestments] = useState(base);
  const [input, setInput] = useState({
    stocks: 1000,
    gold: 1000,
    mutualFunds: 1000,
  });

  const [highlighted, setHighlighted] = useState("");
  const [message, setMessage] = useState("");
  const [appliedEffects, setAppliedEffects] = useState(new Set());

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());


  const applyEffect = (item) => {
    // Generate effect dynamically based on the item's effectType
    let effect;
    if (item.effectType === "stocks") {
      effect = generateStockEffect();
    } else if (item.effectType === "gold") {
      effect = generateGoldEffect();
    } else if (item.effectType === "mutualFunds") {
      effect = generateMutualFundsEffect();
    }

    const updated = { ...investments };
    for (const key in effect) {
      updated[key] = Math.round(
        (investments[key] * (1 + effect[key]) * 100) / 100
      );
    }
    setInvestments(updated);
    setHighlighted(Object.keys(effect)[0]);

    // Get the rate percentage for the message
    const effectKey = Object.keys(effect)[0];
    const ratePercentage = (effect[effectKey] * 100).toFixed(2);
    const sign = ratePercentage >= 0 ? "+" : "";

    setMessage(`News Applied: ${item.title} - Rate: ${sign}${ratePercentage}%`);

    // Update the applied effects
    setAppliedEffects((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(effectKey);

      if (
        updatedSet.has("stocks") &&
        updatedSet.has("gold") &&
        updatedSet.has("mutualFunds")
      ) {
        completeFinanceChallenge(2, 0); //mark challenge completed 
        //for performance
        const totalTimeSec = (Date.now() - startTime) / 1000;
        updatePerformance({
          moduleName: "Finance",
          topicName: "investorLevel",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: totalTimeSec / 3,
          studyTimeMinutes: Math.ceil(totalTimeSec / 60),
          completed: true,
           
        });
        setStartTime(Date.now());
      }

      return updatedSet; // ✅ this is essential
    });


    setTimeout(() => {
      setHighlighted("");
      setMessage("");
    }, 1500);
  };

  const resetInvestments = () => {
    setInvestments(base);
    setAppliedEffects(new Set()); // ✅ clear effect tracking
    setMessage("Portfolio reset.");
    setTimeout(() => setMessage(""), 1500);
    setStartTime(Date.now());
  };

  const updateBase = () => {
    setBase(input);
    setInvestments(input);
    setMessage("Portfolio updated.");
    setTimeout(() => setMessage(""), 1500);
  };

  let colors = ["bg-red-200", "bg-blue-200", "bg-green-200"];
  let colors2 = ["bg-indigo-200", "bg-pink-200", "bg-yellow-200"];
  let colors3 = ["bg-sky-200", "bg-yellow-200", "bg-orange-100"];

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">
      <div
        className="p-4 sm:p-6 lg:p-8 bg-gradient-to-tr from-blue-200 to-purple-400 rounded-2xl sm:rounded-3xl shadow-2xl mx-auto"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl p-3 sm:p-4 bg-yellow-200 rounded-xl sm:rounded-2xl inline-block font-extrabold text-blue-900 mb-3 animate-bounce">
            ⚡ Market News Flash
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-blue-900 font-bold px-2">
            See how the market turns your fortunes upside down.
          </p>
        </div>

        {/* News Cards - Mobile: Stack vertically, Desktop: Horizontal */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => applyEffect(item)}
              className={`cursor-pointer ${colors[idx]} hover:bg-blue-100 hover:shadow-lg hover:rotate-1 hover:scale-105 transition-all border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col items-start gap-2 w-full sm:w-auto`}
            >
              <div className="flex items-center text-lg sm:text-xl gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                <p className="font-semibold text-blue-800 text-sm sm:text-base lg:text-lg leading-tight">
                  {item.title}
                </p>
              </div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Investment Inputs */}
        <div className="bg-gradient-to-br from-green-200 to-teal-200 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-3">
            💼 Set Your Portfolio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            {["stocks", "gold", "mutualFunds"].map((key, idx) => (
              <div
                key={key}
                className={`flex flex-col p-3 sm:p-4 rounded-lg shadow-xl ${colors2[idx]} gap-1`}
              >
                <label className="capitalize text-lg sm:text-xl text-gray-600 font-medium">
                  {key === "mutualFunds" ? "Mutual Funds" : key}
                </label>
                <input
                  type="number"
                  value={input[key]}
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, [key]: +e.target.value }))
                  }
                  className="p-2 sm:p-3 rounded-lg border text-lg sm:text-xl border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full"
                  min="0"
                />
              </div>
            ))}
          </div>
          <button
            onClick={updateBase}
            className="mt-4 sm:mt-5 text-lg sm:text-xl bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Update Portfolio
          </button>
        </div>

        {/* Reset & Message */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
          <button
            onClick={resetInvestments}
            className="px-4 sm:px-6 py-2 text-lg sm:text-xl text-white bg-red-500 rounded-lg hover:bg-red-800 transition w-full sm:w-auto"
          >
            Reset Portfolio
          </button>
          {message && (
            <span className="text-sm sm:text-lg lg:text-xl text-green-700 font-medium break-words">
              {message}
            </span>
          )}
        </div>

        {/* Investment Display */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-900">
            📊 Your Investment Portfolio
          </h3>

          {/* Mobile: Stack vertically, Desktop: Horizontal */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            {Object.entries(investments).map(([type, value], idx) => (
              <div
                key={type}
                className={`flex items-center justify-between sm:justify-start ${colors3[idx]
                  } space-x-3 px-3 sm:px-5 py-3 rounded-lg border ${highlighted === type
                    ? "bg-green-100 border-green-300"
                    : "border-gray-200"
                  } transition w-full sm:w-auto`}
              >
                <span className="capitalize font-medium text-lg sm:text-xl text-gray-700">
                  {type === "mutualFunds" ? "Mutual Funds" : type}
                </span>
                <span className="text-gray-800 text-lg sm:text-xl font-semibold">
                  ₹ {Math.round(value).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Pie Charts Section - Mobile: Stack vertically, Desktop: Side by side */}
          <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Asset Distribution Chart */}
            <div className="bg-orange-200 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
              <h4 className="text-lg sm:text-xl text-center font-semibold mb-3 text-gray-800">
                Asset Distribution
              </h4>
              <div className="flex justify-center">
                <div className="w-full max-w-xs">
                  <PieChart
                    values={Object.values(investments)}
                    labels={["Stocks", "Gold", "Mutual Funds"]}
                    colors={["#3b82f6", "#facc15", "#10b981"]}
                  />
                </div>
              </div>
            </div>

            {/* Investment vs Return Chart */}
            <div className="bg-orange-200 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
              <h4 className="text-lg sm:text-xl text-center font-semibold mb-3 text-gray-800">
                Investment vs Returns
              </h4>
              <div className="flex justify-center">
                <div className="w-full max-w-xs">
                  <PieChart
                    values={[
                      Object.values(base).reduce((a, b) => a + b, 0),
                      Object.values(investments).reduce((a, b) => a + b, 0),
                    ]}
                    labels={["Invested ₹", "Current Value ₹"]}
                    colors={["#4e7fe1", "#4ade80"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
