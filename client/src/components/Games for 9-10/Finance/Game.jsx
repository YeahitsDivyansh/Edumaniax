import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Trophy,
  PiggyBank,
  TrendingUp,
  Shield,
  Sparkles,
  Star,
  Award,
  Download,
  RefreshCw,
  Info,
  DollarSign,
  Calendar,
  BarChart3,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { pdf } from "@react-pdf/renderer";
import InvestmentGuidePDFGame1 from "./Game1PDF";
import { useFinance } from "@/contexts/FinanceContext";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance


const WealthQuestGame = () => {
  const { completeFinanceChallenge } = useFinance();
  const [currentPage, setCurrentPage] = useState("intro");
  const [portfolio, setPortfolio] = useState({
    fd: 0,
    bonds: 0,
    mutualFunds: 0,
    equity: 0,
    gold: 0,
  });
  const [simulationResults, setSimulationResults] = useState(null);
  const [currentYear, setCurrentYear] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // for performance tracking
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const totalBudget = 10000;
  const allocatedAmount = Object.values(portfolio).reduce(
    (sum, val) => sum + val,
    0
  );

  const investmentOptions = {
    fd: {
      name: "Fixed Deposit",
      rate: 6,
      volatility: 0,
      icon: "🏦",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      description: "Safe & Guaranteed Returns",
    },
    bonds: {
      name: "Government Bonds",
      rate: 7,
      volatility: 0,
      icon: "📜",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      description: "Government Backed Security",
    },
    mutualFunds: {
      name: "Mutual Funds",
      rate: 10,
      volatility: 3,
      icon: "📊",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      description: "Diversified Portfolio",
    },
    equity: {
      name: "Stocks/Equity",
      rate: 14,
      volatility: 7,
      icon: "📈",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      description: "High Risk, High Reward",
    },
    gold: {
      name: "Gold Investment",
      rate: 8,
      volatility: 4,
      icon: "🥇",
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      description: "Inflation Hedge",
    },
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setCurrentYear(0);

    const yearlyResults = [];
    let currentPortfolio = { ...portfolio };

    for (let year = 1; year <= 5; year++) {
      const yearResult = {};

      Object.keys(currentPortfolio).forEach((asset) => {
        if (currentPortfolio[asset] > 0) {
          const baseRate = investmentOptions[asset].rate;
          const volatility = investmentOptions[asset].volatility;
          const randomFactor = (Math.random() - 0.5) * 2 * volatility;
          const actualRate = Math.max(0, baseRate + randomFactor);
          const newValue = currentPortfolio[asset] * (1 + actualRate / 100);
          yearResult[asset] = {
            value: newValue,
            return: actualRate,
          };
          currentPortfolio[asset] = newValue;
        } else {
          yearResult[asset] = { value: 0, return: 0 };
        }
      });

      yearlyResults.push(yearResult);
    }

    // Animate through years
    let yearIndex = 0;
    const yearInterval = setInterval(() => {
      setCurrentYear(yearIndex + 1);
      yearIndex++;

      if (yearIndex >= 5) {
        clearInterval(yearInterval);
        setIsSimulating(false);

        const totalFinalValue = Object.values(yearlyResults[4]).reduce(
          (sum, asset) => sum + asset.value,
          0
        );
        const totalReturn =
          ((totalFinalValue - totalBudget) / totalBudget) * 100;
        const cagr = Math.pow(totalFinalValue / totalBudget, 1 / 5) - 1;

        setSimulationResults({
          yearlyResults,
          finalPortfolio: currentPortfolio,
          totalValue: totalFinalValue,
          totalReturn,
          cagr: cagr * 100,
        });

        // for performance
        const totalTime = (Date.now() - startTime) / 1000; // in seconds
        const studyTimeMinutes = Math.ceil(totalTime / 60);

        updatePerformance({
          moduleName: "Finance",
          topicName: "investorLevel",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: totalTime,
          studyTimeMinutes,
          completed: true,

        });
        setStartTime(Date.now());
        completeFinanceChallenge(0, 0); // ✅ Marks the challenge as complete
        setCurrentPage("results");
      }
    }, 1500);
  };

  const handleDownload = async () => {
    const blob = await pdf(<InvestmentGuidePDFGame1 />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Finance_Guide.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const IntroPage = () => (
    <div className="w-[90%] mx-auto p-4 rounded-xl mt-5 mb-5 min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        <div className="animate-bounce mt-5 mb-8">
          <div className="text-8xl md:text-9xl mb-4">💰</div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-pulse">
          Wealth Quest
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 font-semibold">
          The Long-Term Growth Challenge
        </p>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-8 border border-white/30">
          <p className="text-lg md:text-xl text-white mb-4">
            🎯 Can you grow your ₹10,000 wisely over 5 years?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-white/80">
            <span className="flex items-center gap-1">
              <Calendar size={16} />5 Years Journey
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={16} />
              ₹10,000 Budget
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 size={16} />5 Investment Options
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentPage("allocation");
            setPortfolio({
              fd: 0,
              bonds: 0,
              mutualFunds: 0,
              equity: 0,
              gold: 0,
            });
            setSimulationResults(null);
            setCurrentYear(0);
          }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-full text-lg md:text-xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 mx-auto group"
        >
          <PiggyBank className="group-hover:animate-spin" size={24} />
          Start Investing
          <ChevronRight
            className="group-hover:translate-x-2 transition-transform"
            size={24}
          />
        </button>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
          {Object.entries(investmentOptions).map(([key, option]) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur rounded-2xl p-3 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl md:text-3xl mb-2">{option.icon}</div>
              <div className="text-white text-xs md:text-sm font-medium">
                {option.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AllocationPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            💼 Build Your Portfolio
          </h2>
          <div className="bg-white  backdrop-blur-lg rounded-2xl p-4 inline-block">
            <p className="text-purple-500 text-lg md:text-xl">
              Budget: ₹{totalBudget.toLocaleString()} | Allocated: ₹
              {allocatedAmount.toLocaleString()} | Remaining: ₹
              {(totalBudget - allocatedAmount).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(investmentOptions).map(([key, option]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-purple-100 to-purple-700 via-purple-300  backdrop-blur-lg rounded-3xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center mb-4">
                <div className="text-4xl md:text-5xl mb-2">{option.icon}</div>
                <h3 className="text-blue-700 font-bold text-lg md:text-xl mb-1">
                  {option.name}
                </h3>
                <p className="text-sky-500 text-lg">{option.description}</p>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <span className="text-green-900 font-semibold">
                    {option.rate}% avg
                  </span>
                  {option.volatility > 0 && (
                    <span className="text-yellow-200 text-md">
                      ±{option.volatility}%
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max={totalBudget}
                  step="500"
                  value={portfolio[key]}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    const otherAllocations = Object.entries(portfolio)
                      .filter(([k]) => k !== key)
                      .reduce((sum, [, val]) => sum + val, 0);

                    if (otherAllocations + newValue <= totalBudget) {
                      setPortfolio((prev) => ({
                        ...prev,
                        [key]: newValue,
                      }));
                    }
                  }}
                  className="w-full h-3  rounded-lg appearance-auto cursor-pointer slider"
                />

                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">
                    ₹{portfolio[key].toLocaleString()}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        const newValue = Math.max(0, portfolio[key] - 500);
                        setPortfolio((prev) => ({ ...prev, [key]: newValue }));
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition  -colors"
                    >
                      -
                    </button>
                    <button
                      onClick={() => {
                        const newValue = portfolio[key] + 500;
                        const otherAllocations = Object.entries(portfolio)
                          .filter(([k]) => k !== key)
                          .reduce((sum, [, val]) => sum + val, 0);

                        if (otherAllocations + newValue <= totalBudget) {
                          setPortfolio((prev) => ({
                            ...prev,
                            [key]: newValue,
                          }));
                        }
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          {allocatedAmount !== totalBudget && (
            <p className="text-yellow-300 font-semibold text-lg animate-pulse">
              ⚠️ Please allocate exactly ₹{totalBudget.toLocaleString()}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("intro")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              ← Back
            </button>

            <button
              onClick={runSimulation}
              disabled={allocatedAmount !== totalBudget}
              className={`font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 ${allocatedAmount === totalBudget
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:scale-105 shadow-lg"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
            >
              <TrendingUp size={20} />
              Start 5-Year Journey
              <Sparkles size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsPage = () => {
    const badges = [];
    const totalInvested = totalBudget;
    const finalValue = simulationResults?.totalValue || 0;
    const totalReturn = simulationResults?.totalReturn || 0;

    if (totalReturn > 50)
      badges.push({ name: "🚀 Growth Master", color: "bg-purple-500" });
    if (totalReturn > 30)
      badges.push({ name: "📈 Smart Investor", color: "bg-blue-500" });
    if (Object.values(portfolio).filter((v) => v > 0).length >= 4)
      badges.push({ name: "🌟 Diversified Pro", color: "bg-green-500" });
    if (portfolio.equity > totalBudget * 0.3)
      badges.push({ name: "⚡ Risk Taker", color: "bg-red-500" });

    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Your Investment Journey Complete!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  ₹{Math.round(finalValue).toLocaleString()}
                </div>
                <div className="text-white/80">Final Portfolio Value</div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
                <div className="text-3xl md:text-4xl font-bold text-green-300">
                  +{totalReturn.toFixed(1)}%
                </div>
                <div className="text-white/80">Total Return</div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                  {simulationResults?.cagr.toFixed(1)}%
                </div>
                <div className="text-white/80">CAGR (Per Year)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                📊 Asset Performance
              </h3>
              <div className="space-y-4">
                {Object.entries(simulationResults?.finalPortfolio || {}).map(
                  ([key, finalValue]) => {
                    if (portfolio[key] === 0) return null;
                    const initialValue = portfolio[key];
                    const growth =
                      ((finalValue - initialValue) / initialValue) * 100;

                    return (
                      <div key={key} className="bg-white/10 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white text-2xl font-semibold flex items-center gap-2">
                            <span className="">
                              {investmentOptions[key].icon}
                            </span>
                            {investmentOptions[key].name}
                          </span>
                          <span
                            className={`text-2xl font-bold ${growth >= 0 ? "text-green-300" : "text-red-300"
                              }`}
                          >
                            {growth >= 0 ? "+" : ""}
                            {growth.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-lg text-white/80">
                          <span>
                            ₹{initialValue.toLocaleString()} → ₹
                            {Math.round(finalValue).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                🏆 Your Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`${badge.color} rounded-2xl p-4 text-white text-center font-bold text-lg hover:scale-105 transition-transform`}
                  >
                    {badge.name}
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-2xl p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">
                  💡 Key Learnings:
                </h4>
                <ul className="text-white/80 text-lg space-y-1">
                  <li>• Diversification helps balance risk and return</li>
                  <li>• Compound interest grows wealth over time</li>
                  <li>• Higher returns often come with higher risk</li>
                  <li>• Starting early gives more time to grow</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentPage("allocation");
                  setSimulationResults(null);
                  setCurrentYear(0);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <RefreshCw size={20} />
                Try Different Strategy
              </button>

              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <Download size={20} />
                Download Investment Guide
              </button>
            </div>

            <button
              onClick={() => {
                setCurrentPage("intro");
                setPortfolio({
                  fd: 0,
                  bonds: 0,
                  mutualFunds: 0,
                  equity: 0,
                  gold: 0,
                });
                setSimulationResults(null);
                setCurrentYear(0);
                setStartTime(Date.now());
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isSimulating) {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-6xl md:text-8xl mb-8 animate-pulse">📈</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Year {currentYear} of 5
          </h2>
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/30">
            <p className="text-xl md:text-2xl text-white mb-4">
              🚀 Your investments are growing...
            </p>
            <div className="flex justify-center items-center space-x-4 mb-6">
              {[1, 2, 3, 4, 5].map((year) => (
                <div
                  key={year}
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${year <= currentYear
                    ? "bg-green-500 text-white scale-110"
                    : year === currentYear + 1
                      ? "bg-yellow-500 text-white animate-pulse"
                      : "bg-white/30 text-white/60"
                    }`}
                >
                  {year}
                </div>
              ))}
            </div>
            <div className="animate-spin text-4xl">💫</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {currentPage === "intro" && <IntroPage />}
      {currentPage === "allocation" && <AllocationPage />}
      {currentPage === "results" && <ResultsPage />}
    </div>
  );
};

export default WealthQuestGame;
