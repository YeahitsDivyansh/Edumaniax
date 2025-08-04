import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trophy,
  BookOpen,
  Play,
  ArrowRight,
  Star,
  Zap,
  Target,
  Award,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import { pdf } from "@react-pdf/renderer";
import Game2PDF from "./Game2PDF";
import { useFinance } from "@/contexts/FinanceContext";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance


const MiniMarketMaster = () => {
  const { completeFinanceChallenge } = useFinance();
  const [currentPage, setCurrentPage] = useState("intro");
  const [gameData, setGameData] = useState({
    cash: 50000,
    day: 1,
    portfolio: {},
    totalValue: 50000,
    transactions: [],
  });

  // for performance tracking
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const companies = [
    {
      id: "snackco",
      name: "SnackCo",
      icon: "🍪",
      description: "School canteen brand",
      volatility: "high",
      basePrice: 150,
      currentPrice: 150,
      history: [145, 148, 150, 152, 150],
      analystNote: "Expected to grow due to lunch season!",
      color: "from-orange-400 to-red-500",
    },
    {
      id: "studytech",
      name: "StudyTech",
      icon: "📚",
      description: "Education app",
      volatility: "stable",
      basePrice: 200,
      currentPrice: 200,
      history: [195, 198, 200, 202, 200],
      analystNote: "Steady growth with new features",
      color: "from-blue-400 to-indigo-600",
    },
    {
      id: "sportify",
      name: "Sportify",
      icon: "⚽",
      description: "Sports goods",
      volatility: "volatile",
      basePrice: 120,
      currentPrice: 120,
      history: [110, 125, 115, 130, 120],
      analystNote: "Seasonal demand, watch for tournaments!",
      color: "from-green-400 to-emerald-600",
    },
    {
      id: "chillzone",
      name: "ChillZone",
      icon: "🎬",
      description: "Streaming entertainment",
      volatility: "cyclical",
      basePrice: 180,
      currentPrice: 180,
      history: [170, 175, 180, 185, 180],
      analystNote: "New shows coming this season",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "greengo",
      name: "GreenGo",
      icon: "🌱",
      description: "Eco products",
      volatility: "stable",
      basePrice: 250,
      currentPrice: 250,
      history: [240, 245, 250, 255, 250],
      analystNote: "Growing eco-conscious market",
      color: "from-emerald-400 to-teal-600",
    },
  ];

  const [stocks, setStocks] = useState(companies);
  const [news, setNews] = useState("");
  const [showNews, setShowNews] = useState(false);

  const newsEvents = [
    {
      company: "snackco",
      text: "SnackCo introduces healthy options - Shares rise!",
      impact: -12,
    },
    {
      company: "studytech",
      text: "StudyTech wins education award - Steady growth!",
      impact: 8,
    },
    {
      company: "sportify",
      text: "Major sports tournament announced - Sportify soars!",
      impact: -15,
    },
    {
      company: "chillzone",
      text: "ChillZone releases blockbuster series - Streaming up!",
      impact: 10,
    },
    {
      company: "greengo",
      text: "GreenGo secures international partnership - Eco boom!",
      impact: 14,
    },
    {
      company: "snackco",
      text: "Supply chain issues affect SnackCo - Prices dip!",
      impact: -10,
    },
    {
      company: "sportify",
      text: "Off-season begins - Sportify demand drops!",
      impact: -12,
    },
  ];

  const IntroScreen = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center transform hover:scale-105 transition-all duration-300">
        <div className="animate-bounce mb-6">
          <div className="text-8xl mb-4">📈</div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse">
          Mini Market Master
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Can you master the market with your trading skills?
        </p>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="text-white text-3xl mr-2" />
            <span className="text-2xl font-bold text-white">
              Starting Balance: ₹50,000
            </span>
          </div>
          <div className="text-white">
            <p className="text-lg">🎯 Trade 5 amazing companies</p>
            <p className="text-lg">🎯 Show your investing skills for 10 days</p>
            <p className="text-lg">📊 Watch market news</p>
            <p className="text-lg">💰 Grow your money!</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage("game")}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
        >
          <Play className="mr-2" />
          Start Trading Adventure!
        </button>
      </div>
    </div>
  );

  const GameScreen = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [tradeAmount, setTradeAmount] = useState(1);
    const [tradeType, setTradeType] = useState("buy");

    const generateNews = () => {
      const randomNews =
        newsEvents[Math.floor(Math.random() * newsEvents.length)];

      setNews(randomNews);
      setShowNews(true);

      // Update stock price based on news
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.id === randomNews.company
            ? {
              ...stock,
              currentPrice: Math.round(
                stock.currentPrice * (1 + randomNews.impact / 100)
              ),
            }
            : stock
        )
      );

      setTimeout(() => setShowNews(false), 2000);
    };

    const executeTrade = () => {
      if (!selectedStock) return;

      const stock = stocks.find((s) => s.id === selectedStock);
      const totalCost = stock.currentPrice * tradeAmount;

      if (tradeType === "buy" && totalCost <= gameData.cash) {
        setGameData((prev) => ({
          ...prev,
          cash: prev.cash - totalCost,
          portfolio: {
            ...prev.portfolio,
            [selectedStock]: (prev.portfolio[selectedStock] || 0) + tradeAmount,
          },
          transactions: [
            ...prev.transactions,
            {
              type: "buy",
              company: stock.name,
              shares: tradeAmount,
              price: stock.currentPrice,
              day: prev.day,
            },
          ],
        }));
      } else if (
        tradeType === "sell" &&
        (gameData.portfolio[selectedStock] || 0) >= tradeAmount
      ) {
        setGameData((prev) => ({
          ...prev,
          cash: prev.cash + totalCost,
          portfolio: {
            ...prev.portfolio,
            [selectedStock]: (prev.portfolio[selectedStock] || 0) - tradeAmount,
          },
          transactions: [
            ...prev.transactions,
            {
              type: "sell",
              company: stock.name,
              shares: tradeAmount,
              price: stock.currentPrice,
              day: prev.day,
            },
          ],
        }));
      }
      setSelectedStock(null);
      setTradeAmount(1);
    };

    const nextDay = () => {
      if (gameData.day >= 10) {
        completeFinanceChallenge(0, 1); // ✅ Marks the challenge as complete

        // for performance
        const totalTime = (Date.now() - startTime) / 1000; // in seconds
        const studyTimeMinutes = Math.ceil(totalTime / 60);

        updatePerformance({
          moduleName: "Finance",
          topicName: "bankingExpert",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: totalTime,
          studyTimeMinutes,
          completed: true,
        });
        setStartTime(Date.now());
        setCurrentPage("results");
        return;
      }

      setGameData((prev) => ({ ...prev, day: prev.day + 1 }));
      generateNews();

      // Random price fluctuations
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          currentPrice: Math.round(
            stock.currentPrice * (0.95 + Math.random() * 0.1)
          ),
        }))
      );
    };

    const totalPortfolioValue = Object.entries(gameData.portfolio).reduce(
      (total, [stockId, shares]) => {
        const stock = stocks.find((s) => s.id === stockId);
        return total + (stock ? stock.currentPrice * shares : 0);
      },
      0
    );

    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl  mt-5 mb-5 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        {/* News Flash */}
        {showNews && (
          <div className="fixed top-4 left-4 right-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center">
              <Zap className="mr-2 text-2xl" />
              <div>
                <h3 className="font-bold text-lg">📺 MARKET NEWS FLASH!</h3>
                <p className="text-sm md:text-base">{news.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-xl text-white   flex items-center justify-center mr-4">
                <span className="font-bold text-xl">Day {gameData.day}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Trading Dashboard
                </h2>
                <p className="text-gray-600">Make your moves wisely!</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl text-center">
                <DollarSign className="mx-auto mb-2" />
                <p className="text-sm">Cash</p>
                <p className="text-xl font-bold">
                  ₹{gameData.cash.toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-4 rounded-xl text-center">
                <TrendingUp className="mx-auto mb-2" />
                <p className="text-sm">Portfolio Value</p>
                <p className="text-xl font-bold">
                  ₹{totalPortfolioValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          {stocks.map((stock) => (
            <div
              key={stock.id}
              className={`bg-gradient-to-br ${stock.color
                } rounded-2xl p-4 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${selectedStock === stock.id ? "ring-4 ring-yellow-400" : ""
                }`}
              onClick={() => setSelectedStock(stock.id)}
            >
              <div className="text-4xl mb-2 text-center">{stock.icon}</div>
              <h3 className="font-bold text-lg mb-1">{stock.name}</h3>
              <p className="text-sm opacity-90 mb-2">{stock.description}</p>
              <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-2">
                <div className="flex justify-between text-black items-center">
                  <span className="text-sm">Price</span>
                  <span className="font-bold text-lg">
                    ₹{stock.currentPrice}
                  </span>
                </div>
                <div className="flex justify-between text-black items-center">
                  <span className="text-sm">Owned</span>
                  <span className="font-bold">
                    {gameData.portfolio[stock.id] || 0}
                  </span>
                </div>
              </div>
              <div className="bg-white text-black bg-opacity-20 rounded-lg p-2">
                <p className="text-md">{stock.analystNote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trading Panel */}
        {selectedStock && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="text-4xl mr-4">
                  {stocks.find((s) => s.id === selectedStock)?.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {stocks.find((s) => s.id === selectedStock)?.name}
                  </h3>
                  <p className="text-gray-600">
                    Price: ₹
                    {stocks.find((s) => s.id === selectedStock)?.currentPrice}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setTradeType("buy")}
                    className={`px-4 py-2 rounded-md font-semibold transition-all ${tradeType === "buy"
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setTradeType("sell")}
                    className={`px-4 py-2 rounded-md font-semibold transition-all ${tradeType === "sell"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Sell
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={tradeAmount}
                    onChange={(e) =>
                      setTradeAmount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 p-2 border rounded-lg text-center"
                  />
                  <span className="text-gray-600">shares</span>
                </div>

                <button
                  onClick={executeTrade}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  Execute Trade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Next Day Button */}
        <div className="text-center">
          <button
            onClick={nextDay}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
          >
            {gameData.day >= 10 ? "See Results!" : "Next Day"}
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const ResultsScreen = () => {
    const totalPortfolioValue = Object.entries(gameData.portfolio).reduce(
      (total, [stockId, shares]) => {
        const stock = stocks.find((s) => s.id === stockId);
        return total + (stock ? stock.currentPrice * shares : 0);
      },
      0
    );

    const totalValue = gameData.cash + totalPortfolioValue;
    const profit = totalValue - 50000;
    const isProfit = profit > 0;

    const getBadges = () => {
      const badges = [];
      if (profit > 10000)
        badges.push({
          name: "Value Investor",
          icon: "💰",
          color: "from-yellow-400 to-orange-500",
        });
      if (profit > 0)
        badges.push({
          name: "Profit Maker",
          icon: "📈",
          color: "from-green-400 to-emerald-500",
        });
      if (Object.keys(gameData.portfolio).length === 5)
        badges.push({
          name: "Market Explorer",
          icon: "🌟",
          color: "from-blue-400 to-indigo-500",
        });
      if (gameData.transactions.length > 15)
        badges.push({
          name: "Active Trader",
          icon: "⚡",
          color: "from-purple-400 to-pink-500",
        });
      return badges;
    };

    const handleDownload = async () => {
      const blob = await pdf(<Game2PDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Stock_Guide.pdf";
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">
              {isProfit ? "🎉" : "📊"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Trading Complete!
            </h1>
            <p className="text-xl text-white opacity-90">
              Here's how you performed over 10 days
            </p>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6 rounded-2xl text-center">
                <DollarSign className="mx-auto mb-2 text-3xl" />
                <h3 className="text-lg font-semibold">Final Cash</h3>
                <p className="text-2xl font-bold">
                  ₹{gameData.cash.toLocaleString()}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-2xl text-center">
                <TrendingUp className="mx-auto mb-2 text-3xl" />
                <h3 className="text-lg font-semibold">Portfolio Value</h3>
                <p className="text-2xl font-bold">
                  ₹{totalPortfolioValue.toLocaleString()}
                </p>
              </div>

              <div
                className={`bg-gradient-to-r ${isProfit
                  ? "from-yellow-400 to-orange-500"
                  : "from-gray-400 to-gray-600"
                  } text-white p-6 rounded-2xl text-center`}
              >
                <Trophy className="mx-auto mb-2 text-3xl" />
                <h3 className="text-lg font-semibold">Total Profit/Loss</h3>
                <p className="text-2xl font-bold">
                  {isProfit ? "+" : ""}₹{profit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Your Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {getBadges().map((badge, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${badge.color} text-white p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <p className="font-bold">{badge.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Final Portfolio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stocks.map((stock) => (
                  <div
                    key={stock.id}
                    className={`bg-gradient-to-br ${stock.color} text-white p-4 rounded-xl`}
                  >
                    <div className="text-3xl mb-2 text-center">
                      {stock.icon}
                    </div>
                    <h4 className="font-bold text-lg">{stock.name}</h4>
                    <p className="text-sm opacity-90">
                      Shares: {gameData.portfolio[stock.id] || 0}
                    </p>
                    <p className="text-sm opacity-90">
                      Value: ₹
                      {(
                        (gameData.portfolio[stock.id] || 0) * stock.currentPrice
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <BookOpen className="mr-3 text-blue-500" />
              What Did You Learn?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl">
                <h4 className="text-xl font-bold text-blue-800 mb-3">
                  📊 Stock Basics
                </h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• Stocks represent ownership in companies</li>
                  <li>• Prices change based on news and demand</li>
                  <li>• Buy low, sell high for profit</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl">
                <h4 className="text-xl font-bold text-green-800 mb-3">
                  💡 Trading Tips
                </h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Diversify your portfolio</li>
                  <li>• Watch market news carefully</li>
                  <li>• Don't invest all money in one stock</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center space-x-2">
            <button
              onClick={() => {
                setCurrentPage("intro");
                setGameData({
                  cash: 50000,
                  day: 1,
                  portfolio: {},
                  totalValue: 50000,
                  transactions: [],
                });
                setStocks(companies);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold p-3 rounded-full text-sm md:text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Play Again
            </button>

            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold p-3 rounded-full transition-all duration-300 text-sm md:text-xl flex items-center gap-2 hover:scale-105"
            >
              <Download size={20} />
              Download Guide
            </button>

            <button
              onClick={() => setCurrentPage("education")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold p-3 rounded-full text-sm md:text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EducationScreen = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">📚</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            How Stocks Work
          </h1>
          <p className="text-xl text-white opacity-90">
            A Quick Guide for Beginners
          </p>
        </div>

        <div className="space-y-6">
          {/* What is a Share */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">🏢</div>
              <h2 className="text-2xl font-bold text-gray-800">
                What is a Share?
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              A share is a small part of a company. When you buy shares, you
              become a partial owner! If the company does well, your shares
              become more valuable.
            </p>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl">
              <p className="text-blue-800 font-semibold">
                💡 Think of it like owning a slice of your favorite pizza place!
              </p>
            </div>
          </div>

          {/* Why Prices Change */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">📈</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Why Share Prices Change
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl">
                <h3 className="font-bold text-green-800 mb-2">
                  📰 Good News = Prices Up!
                </h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Company makes profit</li>
                  <li>• New product launch</li>
                  <li>• More people want to buy</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-xl">
                <h3 className="font-bold text-red-800 mb-2">
                  📉 Bad News = Prices Down!
                </h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Company loses money</li>
                  <li>• Problems with products</li>
                  <li>• People want to sell</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">🎬</div>
              <h2 className="text-2xl font-bold text-gray-800">Real Example</h2>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
              <p className="text-purple-800 text-lg mb-2">
                <strong>ChillZone launches a hit show</strong>
              </p>
              <p className="text-purple-700">
                → More people want to subscribe → More people buy ChillZone
                shares → Price goes up! 📈
              </p>
            </div>
          </div>

          {/* Trading Tips */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">💡</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Smart Trading Tips
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-green-600 mb-2">✅ Do This:</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Track your trades carefully</li>
                  <li>• Learn from market news</li>
                  <li>• Spread money across different stocks</li>
                  <li>• Be patient with your investments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-600 mb-2">❌ Avoid This:</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Don't put all money in one company</li>
                  <li>• Don't panic when prices drop</li>
                  <li>• Don't ignore important news</li>
                  <li>• Don't make quick decisions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Understanding Graphs */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Understanding Price Charts
              </h2>
            </div>
            <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    📈 Green Line
                  </h3>
                  <p className="text-gray-700">
                    Shows prices going up - good trend!
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">📉 Red Line</h3>
                  <p className="text-gray-700">
                    Shows prices going down - be careful!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Terms */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">📖</div>
              <h2 className="text-2xl font-bold text-gray-800">
                Important Words to Know
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="font-bold text-blue-800">Portfolio</h3>
                  <p className="text-blue-700 text-sm">
                    All the stocks you own together
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="font-bold text-green-800">Equity</h3>
                  <p className="text-green-700 text-sm">
                    Another word for stocks or shares
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl">
                  <h3 className="font-bold text-purple-800">
                    Buy Low, Sell High
                  </h3>
                  <p className="text-purple-700 text-sm">
                    The golden rule of trading!
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <h3 className="font-bold text-orange-800">Diversify</h3>
                  <p className="text-orange-700 text-sm">
                    Spread your money across many stocks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Game Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setCurrentPage("intro")
              setStartTime(Date.now());
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentPage === "intro" && <IntroScreen />}
      {currentPage === "game" && <GameScreen />}
      {currentPage === "results" && <ResultsScreen />}
      {currentPage === "education" && <EducationScreen />}
    </div>
  );
};

export default MiniMarketMaster;
