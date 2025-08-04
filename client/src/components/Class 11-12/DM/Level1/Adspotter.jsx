import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  RotateCcw,
  Home,
  Eye,
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const AdSpotterGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("start");
  const [selectedItems, setSelectedItems] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const phoneItems = [
    {
      id: 1,
      type: "instagram-sponsored",
      title: "Cool Sneakers Post",
      subtitle: "Sponsored",
      icon: "📸",
      description: "Amazing new sneakers! #ad",
      isAd: true,
      bgColor: "from-pink-400 to-purple-500",
    },
    {
      id: 2,
      type: "whatsapp-message",
      title: "Group Chat",
      subtitle: "Mom sent a photo",
      icon: "💬",
      description: "Family dinner tonight!",
      isAd: false,
      bgColor: "from-green-400 to-green-600",
    },
    {
      id: 3,
      type: "promotional-email",
      title: "Pizza Palace",
      subtitle: "Special Offer Inside!",
      icon: "📧",
      description: "50% off your next order!",
      isAd: true,
      bgColor: "from-yellow-400 to-orange-500",
    },
    {
      id: 4,
      type: "banner-ad",
      title: "Game Download",
      subtitle: "Play Now - Free!",
      icon: "🎮",
      description: "Epic adventure awaits!",
      isAd: true,
      bgColor: "from-blue-400 to-blue-600",
    },
    {
      id: 5,
      type: "friend-post",
      title: "Sarah's Update",
      subtitle: "2 hours ago",
      icon: "🤳",
      description: "Had the best day at the park!",
      isAd: false,
      bgColor: "from-teal-400 to-cyan-500",
    },
    {
      id: 6,
      type: "youtube-preroll",
      title: "Video Advertisement",
      subtitle: "Skip ad in 5s",
      icon: "📺",
      description: "New smartphone launch!",
      isAd: true,
      bgColor: "from-red-400 to-red-600",
    },
  ];

  const correctAnswers = phoneItems
    .filter((item) => item.isAd)
    .map((item) => item.id);

  const handleItemClick = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const calculateScore = () => {
    const correctSelections = selectedItems.filter((id) =>
      correctAnswers.includes(id)
    );
    const incorrectSelections = selectedItems.filter(
      (id) => !correctAnswers.includes(id)
    );

    const correctCount = correctSelections.length;
    const missedCorrect = correctAnswers.length - correctCount;

    let rawScore =
      correctCount * 100 - incorrectSelections.length * 50 - missedCorrect * 25;
    rawScore = Math.max(0, rawScore);

    // Scale the score out of 10
    const scaledScore = parseFloat(((rawScore / 300) * 10).toFixed(2)); // 300 is max score

    let newStars = 1;
    if (correctCount === 3 && incorrectSelections.length === 0) newStars = 5;
    else if (correctCount === 2) newStars = 3;

    setScore(scaledScore);
    setStars(newStars);

    // ✅ Mark the challenge as complete
    completeDMChallenge(0, 0);

    // ✅ Update performance
    const endTime = Date.now();
    const timeTakenSec = (endTime - startTime) / 1000;
    const timeTakenMin = Math.round(timeTakenSec / 60);

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "marketer",
      score: scaledScore,
      accuracy: (correctCount / 3) * 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: timeTakenMin,
      completed: true,
    });
    setStartTime(Date.now());
  };


  const submitAnswers = () => {
    if (selectedItems.length === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        calculateScore();
        setShowResults(true);
      }, 3000);
    }
  };

  const resetGame = () => {
    setCurrentPage("start");
    setSelectedItems([]);
    setGameStarted(false);
    setLoading(false);
    setShowResults(false);
    setScore(0);
    setStars(0);
  };

  const startGame = () => {
    setCurrentPage("game");
    setGameStarted(true);
  };

  const getFeedbackMessage = () => {
    const correctCount = selectedItems.filter((id) =>
      correctAnswers.includes(id)
    ).length;
    if (
      correctCount === 3 &&
      selectedItems.every((id) => correctAnswers.includes(id))
    ) {
      return "Nice catch! You've got the eye of a real digital detective! 🕵️‍♀️";
    } else if (correctCount === 2) {
      return "Close! Digital marketing is everywhere — even in your inbox! 📧";
    } else {
      return "Not quite. Digital marketing includes paid or promotional content, not personal messages. 💡";
    }
  };

  const canvasRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (!resultRef || !showResults) {
      return;
    }

    if (stars < 3) {
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
  }, [showResults, resultRef]);

  useEffect(() => {
    setTimeout(() => {
      if (!resultRef.current || !showResults) {
        return;
      }
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [resultRef.current, showResults]);

  const LoadingScreen = () => (
    <div className="fixed inset-10 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-12 h-12 border-4 border-t-pink-500 border-yellow-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-pink-600 text-2xl font-semibold">
            Loading results...
          </p>
        </div>
      </div>
    </div>
  );

  // Start Screen
  if (currentPage === "start") {
    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
          <div className="text-6xl md:text-7xl mb-4 animate-bounce">🕵️‍♀️</div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-3 drop-shadow-md">
            Ad Spotter
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-medium mb-6">
            Find the Hidden Campaigns! 🔍
          </p>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-200 rounded-xl p-4 md:p-5 mb-6 border-2 border-orange-300 shadow-inner">
            <h3 className="font-bold text-orange-900 text-lg mb-2">
              🎮 Your Mission:
            </h3>
            <ul className="text-sm md:text-base text-orange-800 text-left space-y-2 list-disc list-inside">
              <li>Look at the phone screen carefully</li>
              <li>Find 3 items that are marketing campaigns</li>
              <li>Tap to select suspicious posts!</li>
              <li>Submit when you have 3 selections</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-green-500 hover:to-purple-600 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Start Detective Work! 🚀
          </button>
        </div>
      </div>
    );
  }

  // Game Screen
  if (currentPage === "game") {
    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-4 relative">
        {/* Header */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        <div className="flex justify-between items-center mb-4 md:mb-6 bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4">
          <button
            onClick={() => setCurrentPage("start")}
            className="bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
          >
            <Home className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          <div className="text-white font-bold text-center">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span className="text-sm md:text-base">
                Selected: {selectedItems.length}/3
              </span>
            </div>
          </div>

          <div className="bg-white/30 rounded-full px-3 py-1">
            <span className="text-white font-bold text-sm md:text-base">
              Score: {score}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
            📱 You're scrolling your phone...
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Which 3 items are part of digital marketing campaigns? Tap to
            select!
          </p>
        </div>

        {/* Phone Screen */}
        <div className="max-w-sm mx-auto bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
          <div className="bg-white rounded-[2rem] overflow-hidden h-[600px] md:h-[700px]">
            {/* Phone Header */}
            <div className="bg-gray-800 text-white p-3 text-center text-sm font-medium">
              📱 My Phone
            </div>

            {/* Phone Content */}
            <div className="p-3 space-y-3 h-full overflow-y-auto">
              {phoneItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      relative cursor-pointer p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105
                      bg-gradient-to-br ${item.bgColor}
                      ${isSelected
                        ? "ring-4 ring-yellow-400 ring-offset-2 scale-105"
                        : "hover:shadow-xl"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-sm md:text-base">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm">
                          {item.subtitle}
                        </p>
                        <p className="text-white/90 text-xs mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-yellow-800" />
                      </div>
                    )}

                    {loading && <LoadingScreen />}

                    {showResults && (
                      <div className="absolute top-2 left-2">
                        {item.isAd ? (
                          <div className="bg-green-500 rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="bg-red-500 rounded-full p-1">
                            <XCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {!showResults && (
          <div className="text-center mt-6">
            <button
              onClick={submitAnswers}
              disabled={selectedItems.length !== 3}
              className={`
                font-bold py-3 px-8 rounded-full text-lg transform transition-all duration-300 shadow-xl
                ${selectedItems.length === 3
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 hover:scale-110"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              Submit My Findings! 🔍
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div
            ref={resultRef}
            className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-2xl"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">
                {stars === 5 ? "🏆" : stars === 3 ? "👍" : "💪"}
              </div>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < stars
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Detective Results!
              </h3>

              <p className="text-gray-700 mb-4 text-sm md:text-base">
                {getFeedbackMessage()}
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {score} Points
                </div>
                <div className="text-sm text-gray-600">
                  Correct:{" "}
                  {
                    selectedItems.filter((id) => correctAnswers.includes(id))
                      .length
                  }
                  /3
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-4 rounded-full hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm md:text-base"
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Home
                </button>
                <button
                  onClick={() => {
                    setSelectedItems([]);
                    setShowResults(false);
                    setScore(0);
                    setStars(0);
                    setStartTime(Date.now());
                  }}
                  className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-4 rounded-full hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm md:text-base"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default AdSpotterGame;
