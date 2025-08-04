import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Play,
  RotateCcw,
  TrendingUp,
  Users,
  Heart,
  Share,
  Bookmark,
  Eye,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const BoostOrPostGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("intro"); // intro, game, loading, result
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  // Game data
  const gameData = {
    scenario: {
      title: "Your Stationery Brand Reel Challenge! 📝✨",
      description:
        "You posted a reel for your cool stationery brand 3 days ago. Here's what happened:",
      stats: [
        { icon: Heart, value: "45", label: "Likes", color: "text-pink-500" },
        { icon: Share, value: "2", label: "Shares", color: "text-blue-500" },
        { icon: Bookmark, value: "0", label: "Saves", color: "text-green-500" },
        {
          icon: Eye,
          value: "80%",
          label: "Drop-off after 5s",
          color: "text-red-500",
        },
      ],
    },
    options: [
      {
        id: 1,
        text: "Boost the post with ₹500 💰",
        emoji: "💸",
        feedback: "Wait — why pay to boost if the post isn't working?",
        stars: 1,
        isCorrect: false,
        color: "from-red-400 to-red-600",
      },
      {
        id: 2,
        text: "Make a new reel with a better hook 🎬",
        emoji: "🎯",
        feedback: "Smart move! Good marketers fix content before boosting.",
        stars: 5,
        isCorrect: true,
        color: "from-green-400 to-green-600",
      },
      {
        id: 3,
        text: "Do nothing and wait longer ⏰",
        emoji: "😴",
        feedback: "Time won't help if people are skipping it.",
        stars: 1,
        isCorrect: false,
        color: "from-yellow-400 to-yellow-600",
      },
    ],
  };

  // Loading animation effect
  useEffect(() => {
    if (currentPage === "loading") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentPage("result"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setStars(option.stars);
    setCurrentPage("loading");
    setLoadingProgress(0);

    if (option.isCorrect) {
      completeDMChallenge(2, 0); // full completion only on correct
    }

    const endTime = Date.now();
    const timeTakenSec = Math.round((endTime - startTime) / 1000);
    const score = option.stars;
    const accuracy = option.isCorrect ? 100 : 33;

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "marketer",
      score,
      accuracy,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: Math.round(timeTakenSec / 60),
      completed: option.isCorrect, // ✅ full only if correct
    });
    setStartTime(Date.now());
  };


  const resetGame = () => {
    setCurrentPage("intro");
    setSelectedOption(null);
    setShowResult(false);
    setStars(0);
    setLoadingProgress(0);
    setStartTime(Date.now());
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-8 h-8 transition-all duration-300 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
      />
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const canvasRef = useRef(null);
  useEffect(() => {
    if (currentPage !== "result" || stars < 5) {
      return;
    }

    window.scrollTo(0, 0);

    // Use the default confetti (targets document.body) instead of custom canvas
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      // Center burst
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });

      // Left side burst
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.8 },
        colors,
      });

      // Right side burst
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.8 },
        colors,
      });

      // Only run once, not continuously
      if (Date.now() < end - 2500) {
        setTimeout(frame, 150);
      }
    };

    frame();
  }, [currentPage, stars]);

  // Intro Page
  if (currentPage === "intro") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🚀</div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Boost or Post
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              Make the Right Move! 🎯
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🎮 How to Play:
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              You're a social media manager for a stationery brand! 📝 Look at
              your post's performance and decide what to do next. Make smart
              choices to become a marketing superstar! ⭐
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            Start Game
          </button>
        </div>
      </div>
    );
  }

  // Game Page
  if (currentPage === "game") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {gameData.scenario.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {gameData.scenario.description}
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              📊 Your Post Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gameData.scenario.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 text-center transform hover:scale-105 transition-all duration-300 border-2 border-gray-100 hover:border-gray-200"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
              🤔 What should you do next?
            </h3>

            <div className="grid gap-4 md:gap-6">
              {gameData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`bg-gradient-to-r ${option.color} hover:scale-105 text-white font-bold py-6 px-8 rounded-2xl text-lg md:text-xl transform transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-3xl">{option.emoji}</span>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentPage("intro")}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full backdrop-blur transition-all duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading Page
  if (currentPage === "loading") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-6 animate-spin">⚡</div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Analyzing Your Choice...
          </h2>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-lg">{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  // Result Page
  if (currentPage === "result") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4">

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-3xl p-8 text-center shadow-2xl">
            {/* Stars */}
            <div className="mb-6">
              <div className="flex justify-center gap-2 mb-4">
                {renderStars(stars)}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {stars === 5
                  ? "Outstanding! 🎉"
                  : stars === 3
                    ? "Good Try! 👍"
                    : "Keep Learning! 💪"}
              </h2>
            </div>

            {/* Selected Option */}
            <div
              className={`bg-gradient-to-r ${selectedOption?.color} rounded-2xl p-6 mb-6 text-white`}
            >
              <div className="text-4xl mb-3">{selectedOption?.emoji}</div>
              <h3 className="text-xl font-bold mb-2">Your Choice:</h3>
              <p className="text-lg">{selectedOption?.text}</p>
            </div>

            {/* Feedback */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {selectedOption?.isCorrect
                  ? "✅ Correct!"
                  : "❌ Not Quite Right"}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedOption?.feedback}
              </p>

              {selectedOption?.isCorrect && (
                <div className="mt-4 p-4 bg-green-100 rounded-xl">
                  <p className="text-green-800 font-semibold">
                    🎯 Smart move! Good marketers fix content before boosting.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={() => setCurrentPage("intro")}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                Home
              </button>
            </div>

            {/* Fun Fact */}
            <div className="mt-8 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2">
                💡 Marketing Tip:
              </h4>
              <p className="text-gray-700">
                Always analyze why content isn't performing before spending
                money on promotion. A strong hook in the first 3 seconds is
                crucial for engagement!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BoostOrPostGame;
