import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Play,
  RotateCcw,
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  MousePointer,
  Bookmark,
  Eye,
  CheckCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const MetricMatchUpGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("intro"); // intro, game, loading, result
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [userReason, setUserReason] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [stars, setStars] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  // Game data
  const gameData = {
    scenario: {
      title: "Dashboard Detective Challenge! 📊🔍",
      description:
        "You ran two different ads for your brand. Time to analyze which one performed better!",
    },
    metrics: [
      {
        id: "reach",
        name: "Reach",
        icon: Users,
        adA: "4,000",
        adB: "2,500",
        color: "text-blue-500",
        description: "How many people saw your ad",
      },
      {
        id: "engagement",
        name: "Engagement",
        icon: Heart,
        adA: "80",
        adB: "200",
        color: "text-pink-500",
        description: "Likes, comments, reactions",
      },
      {
        id: "clicks",
        name: "Clicks",
        icon: MousePointer,
        adA: "20",
        adB: "50",
        color: "text-green-500",
        description: "People who clicked your ad",
      },
      {
        id: "saves",
        name: "Saves",
        icon: Bookmark,
        adA: "5",
        adB: "30",
        color: "text-purple-500",
        description: "People who saved your post",
      },
    ],
  };

  // Check if user can proceed
  useEffect(() => {
    setCanProceed(
      selectedAd && selectedMetrics.length === 2 && userReason.trim().length > 0
    );
  }, [selectedAd, selectedMetrics, userReason]);

  // Loading animation effect
  useEffect(() => {
    if (currentPage === "loading") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              calculateScore();
              setCurrentPage("result");
            }, 500);
            return 100;
          }
          return prev + 3;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  const calculateScore = () => {
    let rawScore = 0;
    const correctMetrics = ["engagement", "clicks", "saves"];
    const correctSelected = selectedMetrics.filter((metric) =>
      correctMetrics.includes(metric)
    );

    const hasGoodReason = [
      "better",
      "higher",
      "more",
      "connects",
      "engagement",
      "action",
      "results",
    ].some((word) => userReason.toLowerCase().includes(word));

    // 🎯 Scoring breakdown (out of 5)
    if (selectedAd === "B") {
      rawScore += 2;

      if (correctSelected.length === 2) rawScore += 2;
      else if (correctSelected.length === 1) rawScore += 1;

      if (hasGoodReason) rawScore += 1;
    } else {
      if (correctSelected.length > 0) rawScore += 1;
      if (hasGoodReason) rawScore += 1;
    }

    rawScore = Math.min(rawScore, 5);
    const scaledScore = Math.round((rawScore / 5) * 10);       // Score out of 10
    const scaledAccuracy = Math.round((rawScore / 5) * 100);   // Accuracy %

    setStars(Math.max(1, rawScore));
    completeDMChallenge(2, 1);

    const endTime = Date.now();
    const responseTimeSec = (endTime - startTime) / 1000;
    const studyTimeMinutes = Math.ceil(responseTimeSec / 60);

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "marketer",
      score: scaledScore,
      accuracy: scaledAccuracy,
      avgResponseTimeSec: Math.round(responseTimeSec),
      studyTimeMinutes,
      completed: true,
    });
    setStartTime(Date.now());
  };


  const handleMetricSelect = (metricId) => {
    setSelectedMetrics((prev) => {
      if (prev.includes(metricId)) {
        return prev.filter((id) => id !== metricId);
      } else if (prev.length < 2) {
        return [...prev, metricId];
      } else {
        // Replace first selected metric
        return [prev[1], metricId];
      }
    });
  };

  const handleSubmit = () => {
    if (canProceed) {
      setCurrentPage("loading");
      setLoadingProgress(0);
    }
  };

  const resetGame = () => {
    setCurrentPage("intro");
    setSelectedAd(null);
    setSelectedMetrics([]);
    setUserReason("");
    setShowResult(false);
    setStars(0);
    setLoadingProgress(0);
    setCanProceed(false);
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

  const getFeedback = () => {
    if (selectedAd === "B" && stars >= 4) {
      return "You're reading numbers like a true marketer! 🎯";
    } else if (selectedAd === "A") {
      return "More reach isn't always better. It's about results! 📈";
    } else {
      return "Try comparing which ad made people take action! 💪";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-pulse">📊</div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Metric Match-Up
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              Read the Dashboard! 🔍
            </h2>
          </div>

          <div className="bg-gradient-to-r from-cyan-100 to-purple-100 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🎮 How to Play:
            </h3>
            <div className="text-gray-700 text-lg leading-relaxed space-y-2">
              <p>📈 Compare two ad performances</p>
              <p>🎯 Choose the better performing ad</p>
              <p>📊 Select 2 metrics that support your choice</p>
              <p>✍️ Write why you think it's better</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            <BarChart3 className="w-6 h-6" />
            Start Dashboard Analysis
          </button>
        </div>
      </div>
    );
  }

  // Game Page
  if (currentPage === "game") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-indigo-400 via-cyan-400 to-teal-400 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {gameData.scenario.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {gameData.scenario.description}
            </p>
          </div>

          {/* Dashboard */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              📊 Performance Dashboard
            </h3>

            {/* Metrics Table */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="font-bold text-lg text-gray-800 text-center md:text-left">
                  Metric
                </div>
                <div className="font-bold text-lg text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg">
                  Ad A 🅰️
                </div>
                <div className="font-bold text-lg text-center bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg">
                  Ad B 🅱️
                </div>
                <div className="font-bold text-lg text-gray-600 text-center md:text-left">
                  Select
                </div>
              </div>

              {gameData.metrics.map((metric, index) => (
                <div
                  key={metric.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center"
                >
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    <span className="font-semibold text-gray-800">
                      {metric.name}
                    </span>
                  </div>
                  <div className="text-center text-2xl font-bold text-blue-600 bg-blue-50 py-3 rounded-lg">
                    {metric.adA}
                  </div>
                  <div className="text-center text-2xl font-bold text-green-600 bg-green-50 py-3 rounded-lg">
                    {metric.adB}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleMetricSelect(metric.id)}
                      disabled={
                        selectedMetrics.length >= 2 &&
                        !selectedMetrics.includes(metric.id)
                      }
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${selectedMetrics.includes(metric.id)
                        ? "bg-purple-500 border-purple-500 text-white scale-110"
                        : selectedMetrics.length >= 2
                          ? "border-gray-300 text-gray-300 cursor-not-allowed"
                          : "border-purple-300 text-purple-500 hover:bg-purple-100 hover:scale-110"
                        }`}
                    >
                      {selectedMetrics.includes(metric.id) && (
                        <CheckCircle className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-600 mb-6">
              💡 Select exactly 2 metrics that support your choice
            </div>
          </div>

          {/* Ad Selection */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              🤔 Which ad should you continue?
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <button
                onClick={() => setSelectedAd("A")}
                className={`p-6 rounded-2xl border-4 transition-all duration-300 ${selectedAd === "A"
                  ? "border-blue-500 bg-blue-50 transform scale-105"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
              >
                <div className="text-4xl mb-3">🅰️</div>
                <h4 className="text-2xl font-bold text-blue-600 mb-2">
                  Continue Ad A
                </h4>
                <p className="text-gray-600">Higher reach, broader audience</p>
              </button>

              <button
                onClick={() => setSelectedAd("B")}
                className={`p-6 rounded-2xl border-4 transition-all duration-300 ${selectedAd === "B"
                  ? "border-green-500 bg-green-50 transform scale-105"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
              >
                <div className="text-4xl mb-3">🅱️</div>
                <h4 className="text-2xl font-bold text-green-600 mb-2">
                  Continue Ad B
                </h4>
                <p className="text-gray-600">Better engagement metrics</p>
              </button>
            </div>
          </div>

          {/* Reason Input */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              ✍️ Explain your choice in one line:
            </h3>
            <textarea
              value={userReason}
              onChange={(e) => setUserReason(e.target.value)}
              placeholder="Why did you choose this ad? What makes it better?"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-purple-500 focus:outline-none resize-none"
              rows="3"
              maxLength="150"
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {userReason.length}/150 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              className={`font-bold py-4 px-8 rounded-full text-xl transform transition-all duration-300 shadow-lg ${canProceed
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-110 hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {canProceed ? "🚀 Analyze My Choice" : "⏳ Complete All Steps"}
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-4">
            <div className="flex justify-center items-center gap-4 text-white">
              <span className={selectedAd ? "✅" : "⏳"}>Choose Ad</span>
              <span className={selectedMetrics.length === 2 ? "✅" : "⏳"}>
                Select 2 Metrics ({selectedMetrics.length}/2)
              </span>
              <span className={userReason.trim() ? "✅" : "⏳"}>
                Write Reason
              </span>
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
          <div className="text-6xl mb-6 animate-spin">📊</div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Analyzing Dashboard Data...
          </h2>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-lg">{loadingProgress}%</p>

          <div className="mt-4 text-white/70">
            <p>🔍 Checking your metrics selection...</p>
            <p>📈 Evaluating your reasoning...</p>
          </div>
        </div>
      </div>
    );
  }

  // Result Page
  if (currentPage === "result") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-3xl p-8 text-center shadow-2xl">
            {/* Stars */}
            <div className="mb-6">
              <div className="flex justify-center gap-2 mb-4">
                {renderStars(stars)}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {stars === 5
                  ? "Marketing Genius! 🎉"
                  : stars >= 3
                    ? "Good Analysis! 👍"
                    : "Keep Learning! 💪"}
              </h2>
            </div>

            {/* Your Choices */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div
                className={`rounded-2xl p-6 ${selectedAd === "A"
                  ? "bg-blue-100 border-2 border-blue-300"
                  : "bg-green-100 border-2 border-green-300"
                  }`}
              >
                <h3 className="text-xl font-bold mb-3">Your Choice:</h3>
                <div className="text-4xl mb-2">
                  {selectedAd === "A" ? "🅰️" : "🅱️"}
                </div>
                <p className="text-lg font-semibold">Ad {selectedAd}</p>
              </div>

              <div className="bg-purple-100 border-2 border-purple-300 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3">Selected Metrics:</h3>
                <div className="space-y-2">
                  {selectedMetrics.map((metricId) => {
                    const metric = gameData.metrics.find(
                      (m) => m.id === metricId
                    );
                    return (
                      <div key={metricId} className="flex items-center gap-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span>{metric.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Your Reason */}
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Your Reasoning:</h3>
              <p className="text-lg italic">"{userReason}"</p>
            </div>

            {/* Feedback */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {selectedAd === "B" && stars >= 4
                  ? "✅ Excellent Choice!"
                  : "🎯 Learning Opportunity"}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {getFeedback()}
              </p>

              <div className="bg-cyan-100 rounded-xl p-4">
                <p className="text-cyan-800 font-semibold">
                  💡 The Right Answer: <strong>Ad B</strong> - Even though reach
                  is lower, Ad B actually connects better with the audience
                  through higher engagement, clicks, and saves!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Analyze Again
              </button>
              <button
                onClick={() => setCurrentPage("intro")}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                Home
              </button>
            </div>

            {/* Marketing Tip */}
            <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2">
                📈 Marketing Tip:
              </h4>
              <p className="text-gray-700">
                Quality engagement beats quantity reach! Look for metrics that
                show people are actually taking action - clicks, saves, and
                meaningful interactions matter more than just views.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MetricMatchUpGame;
