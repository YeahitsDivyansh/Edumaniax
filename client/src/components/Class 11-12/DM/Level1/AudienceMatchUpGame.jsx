import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Trophy,
  RotateCcw,
  Target,
  CheckCircle,
  XCircle,
  Home,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const AudienceMatchUpGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("start");
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverTarget, setDragOverTarget] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (currentPage === "result") {
      completeDMChallenge(0, 2);
    }
  }, [currentPage]);

  const brands = [
    {
      id: "zenbuds",
      name: "ZenBuds",
      description: "Noise-cancelling headphones",
      icon: "🎧",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "chilltales",
      name: "ChillTales",
      description: "Audio story app for kids",
      icon: "📚",
      color: "from-green-400 to-green-600",
    },
    {
      id: "powerfuel",
      name: "PowerFuel",
      description: "Gym supplements",
      icon: "💪",
      color: "from-red-400 to-red-600",
    },
  ];

  const audiences = [
    {
      id: "kids",
      name: "School Kids",
      description: "School-going kids who love bedtime stories",
      icon: "👶",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "teens",
      name: "Study Teens",
      description: "Teens who study in noisy environments",
      icon: "🎓",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "adults",
      name: "Fitness Adults",
      description: "Young adults into fitness and weightlifting",
      icon: "🏋️",
      color: "from-pink-400 to-pink-600",
    },
  ];

  const correctMatches = {
    zenbuds: "teens",
    chilltales: "kids",
    powerfuel: "adults",
  };

  const handleDragStart = (e, brandId) => {
    setDraggedItem(brandId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, audienceId) => {
    e.preventDefault();
    setDragOverTarget(audienceId);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setDragOverTarget(null);
  };

  const handleDrop = (e, audienceId) => {
    e.preventDefault();
    setDragOverTarget(null);

    if (draggedItem) {
      // Remove any existing match for this brand
      const newMatches = { ...matches };
      Object.keys(newMatches).forEach((key) => {
        if (newMatches[key] === draggedItem) {
          delete newMatches[key];
        }
      });

      // Add new match
      newMatches[audienceId] = draggedItem;
      setMatches(newMatches);
      setDraggedItem(null);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    const feedbackArray = [];

    Object.keys(correctMatches).forEach((brandId) => {
      const correctAudience = correctMatches[brandId];
      const matchedAudience = Object.keys(matches).find(
        (audienceId) => matches[audienceId] === brandId
      );

      const brand = brands.find((b) => b.id === brandId);
      const audience = audiences.find((a) => a.id === correctAudience);

      if (matchedAudience === correctAudience) {
        correctCount++;
        feedbackArray.push({
          brand: brand.name,
          correct: true,
          message: `Spot on! ${brand.name
            } is perfect for ${audience.name.toLowerCase()}. ${brand.name === "ZenBuds"
              ? "Students need focus in noisy places!"
              : brand.name === "ChillTales"
                ? "Kids love bedtime stories!"
                : "Fitness enthusiasts need protein!"
            }`,
        });
      } else {
        const wrongAudience = audiences.find((a) => a.id === matchedAudience);
        feedbackArray.push({
          brand: brand.name,
          correct: false,
          message: `Hmm... ${brand.name} with ${wrongAudience ? wrongAudience.name.toLowerCase() : "no one"
            }? Think about who would actually *use* ${brand.description.toLowerCase()}!`,
        });
      }
    });

    let finalScore = 0;
    if (correctCount === 3) finalScore = 5;
    else if (correctCount === 2) finalScore = 3;
    else finalScore = 1;

    const scaledScore = finalScore * 2;

    setScore(finalScore);
    setFeedback(feedbackArray);
    setGameComplete(true);
    setCurrentPage("result");

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "contentStrategist",
      score: scaledScore,
      accuracy: (correctCount / 3) * 100,
      avgResponseTimeSec: (Date.now() - startTime) / 1000,
      studyTimeMinutes: Math.round((Date.now() - startTime) / 60000),
      completed: true,
    });
    setStartTime(Date.now());
  };

  const resetGame = () => {
    setCurrentPage("start");
    setMatches({});
    setScore(0);
    setFeedback([]);
    setGameComplete(false);
    setDraggedItem(null);
    setDragOverTarget(null);
    setStartTime(Date.now());
  };

  const getUnmatchedBrands = () => {
    const matchedBrandIds = Object.values(matches);
    return brands.filter((brand) => !matchedBrandIds.includes(brand.id));
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef?.current || currentPage !== "result") {
      return;
    }

    if (score < 5) {
      return;
    }

    const myCanvas = canvasRef.current;
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, [currentPage, canvasRef]);

  // Start Screen
  if (currentPage === "start") {
    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full transform  transition-all duration-300">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎯</div>
            <motion.h1
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-4xl font-bold text-blue-800 mb-2"
            >
              Audience Match-Up
            </motion.h1>
            <p className="text-purple-600 text-lg font-medium">
              Who Buys What?
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 mb-6 border-2 border-green-300">
            <h3 className="font-bold text-blue-800 text-xl mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Your Mission:
            </h3>
            <p className="text-blue-700 text-sm md:text-lg leading-relaxed mb-3">
              You're consulting for 3 new brands! Match each product with its
              most likely target audience.
            </p>
            <div className="text-md text-blue-600 space-y-1">
              <p>🎧 ZenBuds - Noise-cancelling headphones</p>
              <p>📚 ChillTales - Audio story app for kids</p>
              <p>💪 PowerFuel - Gym supplements</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 mb-6 border-2 border-yellow-300">
            <h4 className="font-bold text-orange-800 text-lg mb-2">
              🎮 How to Play:
            </h4>
            <p className="text-orange-700 text-md">
              Drag each brand card to its perfect audience match. Think: "Who
              would actually buy and use this product?"
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("game")}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-full text-xl hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Matching! 🚀
          </button>
        </div>
      </div>
    );
  }

  // Game Screen
  if (currentPage === "game") {
    const unmatchedBrands = getUnmatchedBrands();
    const allMatched = Object.keys(matches).length === 3;

    return (
      <div className="min-h-screen w-[90%] mx-auto mt-10 mb-10 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 inline-block shadow-lg">
            <motion.h2
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-4xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg"
            >
              Match the Brands!
            </motion.h2>
            <p className="text-white/90 text-lg">
              Drag brands to their perfect audience
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Brands Pool */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-sm">
              🏪 Brands to Match
            </h3>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 min-h-[140px] shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {unmatchedBrands.map((brand) => (
                  <div
                    key={brand.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, brand.id)}
                    className={`bg-gradient-to-r ${brand.color} text-white p-5 rounded-2xl shadow-xl cursor-grab transform hover:scale-105 transition duration-300 hover:shadow-2xl`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{brand.icon}</div>
                      <h4 className="font-semibold text-lg">{brand.name}</h4>
                      <p className="text-sm text-white/90">
                        {brand.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {unmatchedBrands.length === 0 && (
                <p className="text-white/70 text-center text-lg mt-6">
                  All brands matched! 🎉
                </p>
              )}
            </div>
          </div>

          {/* Audience Drop Zones */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-sm">
              👥 Target Audiences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {audiences.map((audience) => {
                const matchedBrand = matches[audience.id]
                  ? brands.find((b) => b.id === matches[audience.id])
                  : null;
                const isDropTarget = dragOverTarget === audience.id;

                return (
                  <div
                    key={audience.id}
                    onDragOver={(e) => handleDragOver(e, audience.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, audience.id)}
                    className={`bg-gradient-to-r ${audience.color
                      } rounded-3xl p-6 min-h-[220px] shadow-2xl transition duration-300 ease-in-out ${isDropTarget ? "scale-105 ring-4 ring-white/60" : ""
                      }`}
                  >
                    <div className="text-center text-white">
                      <div className="text-5xl mb-4">{audience.icon}</div>
                      <h4 className="font-semibold text-xl mb-2">
                        {audience.name}
                      </h4>
                      <p className="text-sm text-white/90 mb-6">
                        {audience.description}
                      </p>

                      {/* Drop Zone */}
                      <div
                        className={`border-2 border-dashed rounded-xl p-4 min-h-[80px] flex items-center justify-center transition duration-200 ${isDropTarget
                          ? "bg-white/40 border-white"
                          : "bg-white/10 border-white/40"
                          }`}
                      >
                        {matchedBrand ? (
                          <div
                            className={`bg-gradient-to-r ${matchedBrand.color} text-white p-3 rounded-lg shadow-md animate-pulse`}
                          >
                            <div className="text-2xl mb-1">
                              {matchedBrand.icon}
                            </div>
                            <div className="font-semibold text-sm">
                              {matchedBrand.name}
                            </div>
                          </div>
                        ) : (
                          <div className="text-white/70 text-sm">
                            {isDropTarget ? "🎯 Drop here!" : "Drag brand here"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-6">
            {allMatched && !gameComplete && (
              <button
                onClick={calculateScore}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform hover:scale-110 hover:from-green-500 hover:to-emerald-600 transition-all duration-300 animate-bounce"
              >
                Check My Matches! ✨
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-white/20 backdrop-blur-md text-white font-bold py-3 px-6 rounded-full hover:bg-white/30 transition duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <Home className="w-5 h-5" />
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentPage === "result") {
    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 flex items-center justify-center relative">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full transform transition-all duration-300">
          {/* Header with Stars */}
          <div className="text-center mb-8">
            <div className="text-6xl sm:text-8xl mb-4 animate-bounce">
              {score === 5 ? "🏆" : score === 3 ? "⭐" : "💪"}
            </div>
            <motion.h2
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2"
            >
              {score === 5
                ? "Marketing Genius!"
                : score === 3
                  ? "Great Job!"
                  : "Keep Learning!"}
            </motion.h2>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 sm:w-10 sm:h-10 ${star <= score
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                    } animate-pulse`}
                  style={{ animationDelay: `${star * 0.1}s` }}
                />
              ))}
            </div>

            <p className="text-lg sm:text-xl text-purple-600 font-medium">
              {score === 5
                ? "Perfect matches! You understand your audiences!"
                : score === 3
                  ? "Almost there! You're getting the hang of it!"
                  : "Every expert was once a beginner!"}
            </p>
          </div>

          {/* Detailed Feedback */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-purple-800 text-center mb-4">
              📊 Your Results:
            </h3>
            {feedback.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 ${item.correct
                  ? "bg-green-50 border-green-300 text-green-800"
                  : "bg-red-50 border-red-300 text-red-800"
                  } transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-start gap-3">
                  {item.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.brand}</h4>
                    <p className="text-md leading-relaxed">{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8 border-2 border-blue-300">
            <h4 className="font-bold text-lg text-blue-800 mb-3 flex items-center justify-center">
              <Target className="w-5 h-5 mr-2" />
              💡 Marketing Tip!
            </h4>
            <p className="text-blue-700 text-md text-center leading-relaxed">
              {score === 5
                ? "You've mastered audience targeting! Great marketers always think: 'Who has this problem, and how can my product solve it?'"
                : score === 3
                  ? "You're on the right track! Remember: the best products solve real problems for specific people."
                  : "Keep practicing! Think about WHO would actually USE the product in their daily life."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-4 px-6 rounded-full text-lg hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
            <button
              onClick={() => setCurrentPage("start")}
              className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-full text-lg hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AudienceMatchUpGame;
