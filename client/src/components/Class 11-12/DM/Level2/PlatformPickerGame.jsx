import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Smartphone,
  Monitor,
  Camera,
  Users,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const PlatformPickerGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("intro");
  const [selections, setSelections] = useState({});
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const contentCards = [
    {
      id: "comedy-reel",
      title: "Short Comedy Reel",
      description: "About exam stress",
      icon: "😂",
      type: "Video Content",
      audience: "Young, visual-focused",
      correctPlatforms: ["instagram"],
      color: "from-pink-400 to-red-400",
    },
    {
      id: "blog-post",
      title: "Long-form Blog",
      description: "Productivity tips",
      icon: "📝",
      type: "Written Content",
      audience: "Professional, detail-oriented",
      correctPlatforms: ["blog-website", "linkedin"],
      color: "from-blue-400 to-purple-400",
    },
    {
      id: "infographic",
      title: "Healthy Snacks Infographic",
      description: "Visual guide",
      icon: "🥗",
      type: "Visual Content",
      audience: "Health-conscious, visual learners",
      correctPlatforms: ["pinterest"],
      color: "from-green-400 to-teal-400",
    },
  ];

  const platforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: "📷",
      description: "Visual stories & reels",
      audience: "Young, visual-focused",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "🎥",
      description: "Long-form videos",
      audience: "All ages, video lovers",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
    },
    {
      id: "pinterest",
      name: "Pinterest",
      icon: "📌",
      description: "Visual inspiration",
      audience: "DIY enthusiasts, planners",
      color: "bg-gradient-to-br from-red-400 to-pink-400",
      hoverColor: "hover:from-red-500 hover:to-pink-500",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "💼",
      description: "Professional network",
      audience: "Working professionals",
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      id: "blog-website",
      name: "Blog Website",
      icon: "🌐",
      description: "Detailed articles",
      audience: "Readers, researchers",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
  ];

  const handleSelection = (contentId, platformId) => {
    setSelections((prev) => ({
      ...prev,
      [contentId]: platformId,
    }));
  };

  const checkResults = () => {
    let correctCount = 0;

    contentCards.forEach((content) => {
      const selectedPlatform = selections[content.id];
      if (
        selectedPlatform &&
        content.correctPlatforms.includes(selectedPlatform)
      ) {
        correctCount++;
      }
    });

    let feedbackMessage = "";
    let starCount = 0;

    if (correctCount === 3) {
      feedbackMessage =
        "Right post, right platform — you're a strategist in the making! 🎯";
      starCount = 5;
      setCelebrationMode(true);
      setTimeout(() => setCelebrationMode(false), 4000);
      completeDMChallenge(1, 1); // only for full completion
    } else if (correctCount === 2) {
      feedbackMessage =
        "Nice work! Think more about where your audience *actually hangs out*. 🤔";
      starCount = 3;
    } else {
      feedbackMessage = "Let's rewind. A reel needs views, not readers! 📱";
      starCount = 1;
    }

    setFeedback(feedbackMessage);
    setStars(starCount);
    setShowResults(true);

    // ✅ Track performance (partial or full)
    const endTime = Date.now();
    const timeTakenSec = Math.round((endTime - startTime) / 1000);
    const accuracy = Math.round((correctCount / 3) * 100);

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "contentStrategist",
      score: (starCount / 5) * 10,
      accuracy,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: Math.round(timeTakenSec / 60),
      completed: correctCount === 3,
    });
    setStartTime(Date.now());
  };


  const resetGame = () => {
    setSelections({});
    setFeedback("");
    setStars(0);
    setShowResults(false);
    setCurrentPage("game");
    setStartTime(Date.now());
  };

  const canvasRef = useRef(null);
  const resultRef = useRef(null);


  useEffect(() => {
    if (!showResults || !celebrationMode || !resultRef?.current) {
      return;
    }

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
  }, [showResults, resultRef, celebrationMode]);


  useEffect(() => {
    setTimeout(() => {
      if (!resultRef.current || !showResults) {
        return;
      }
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [resultRef.current, showResults]);

  const renderIntroPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Platform Picker
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Right Post, Right Place! 🎯
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Mission:
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <Smartphone className="text-pink-500" size={20} />
              <span className="text-gray-700">
                Match 3 different content types
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="text-blue-500" size={20} />
              <span className="text-gray-700">Find their perfect platform</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="text-yellow-500" size={20} />
              <span className="text-gray-700">
                Think about where audiences hang out!
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage("game")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
        >
          <span>Start Matching!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderGamePage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4 relative">
      <div className="max-w-6xl mx-auto ">
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50"
        />

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              Platform Picker
            </h1>
            <p className="text-gray-600">
              Match each content type with its perfect platform!
            </p>
          </div>

          {/* Content Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📱 Your Content to Post
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contentCards.map((content) => (
                <div
                  key={content.id}
                  className={`bg-gradient-to-br ${content.color} rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{content.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{content.title}</h3>
                    <p className="text-sm opacity-90 mb-3">
                      {content.description}
                    </p>
                    <div className="bg-white text-purple-700 bg-opacity-20 rounded-lg p-2 text-lg">
                      <p className="font-semibold">{content.type}</p>
                      <p className="opacity-80">{content.audience}</p>
                    </div>
                  </div>

                  {/* Selected Platform Display */}
                  {selections[content.id] && (
                    <div className="mt-4 bg-white bg-opacity-30 rounded-lg p-3 text-center">
                      <p className="text-lg text-black font-semibold">
                        Chosen Platform:
                      </p>
                      <p className="text-md text-black">
                        {
                          platforms.find((p) => p.id === selections[content.id])
                            ?.icon
                        }{" "}
                        {
                          platforms.find((p) => p.id === selections[content.id])
                            ?.name
                        }
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Platform Selection Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🌐 Choose the Perfect Platform
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`${platform.color} ${platform.hoverColor} rounded-2xl p-4 text-white text-center cursor-pointer shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-2xl mb-2">{platform.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{platform.name}</h3>
                  <p className="text-md opacity-80 mb-2">
                    {platform.description}
                  </p>
                  <p className="text-xmd opacity-70">{platform.audience}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Matching Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Make Your Matches!
            </h3>
            <div className="space-y-4">
              {contentCards.map((content) => (
                <div
                  key={content.id}
                  className="bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{content.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {content.title}
                        </h4>
                        <p className="text-md text-gray-600">
                          {content.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() =>
                            handleSelection(content.id, platform.id)
                          }
                          className={`px-4 py-2 rounded-lg text-md font-semibold transition-all duration-300 ${selections[content.id] === platform.id
                            ? "bg-blue-500 text-white shadow-lg scale-105"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          {platform.icon} {platform.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={checkResults}
                disabled={Object.keys(selections).length < 3}
                className={`font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto ${Object.keys(selections).length < 3
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg transform hover:scale-105"
                  }`}
              >
                <CheckCircle size={24} />
                <span>Check My Matches!</span>
              </button>
              {Object.keys(selections).length < 3 && (
                <p className="text-sm text-gray-500 mt-2">
                  Select a platform for each content type!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div
            ref={resultRef}
            className={`bg-white rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all duration-500 ${celebrationMode ? "animate-bounce" : ""
              }`}
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 mx-1 ${i < stars
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                      } transition-all duration-300`}
                  />
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                <p className="text-xl font-semibold text-gray-800">
                  {feedback}
                </p>
              </div>
            </div>

            {/* Results Breakdown */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {contentCards.map((content) => {
                const selectedPlatform = selections[content.id];
                const isCorrect =
                  selectedPlatform &&
                  content.correctPlatforms.includes(selectedPlatform);
                const correctPlatformNames = content.correctPlatforms
                  .map((id) => platforms.find((p) => p.id === id)?.name)
                  .join(" or ");

                return (
                  <div
                    key={content.id}
                    className={`rounded-xl p-4 border-2 ${isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                      }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <X className="text-red-500" size={20} />
                      )}
                      <h4 className="font-bold text-gray-800">
                        {content.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Your choice:{" "}
                      {platforms.find((p) => p.id === selectedPlatform)?.name}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600 font-semibold">
                        Best platform: {correctPlatformNames}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>Try Again</span>
              </button>

              <button
                onClick={() => setCurrentPage("tips")}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Platform Tips
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTipsPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-4">
            Platform Strategy Tips! 💡
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Platform Breakdown */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Platform Personalities
            </h2>

            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`${platform.color} rounded-xl p-4 text-white`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{platform.icon}</span>
                  <h3 className="font-bold text-lg">{platform.name}</h3>
                </div>
                <p className="text-sm opacity-90 mb-1">
                  {platform.description}
                </p>
                <p className="text-xs opacity-80">
                  Best for: {platform.audience}
                </p>
              </div>
            ))}
          </div>

          {/* Content Strategy */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Content Strategy
            </h2>

            <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
              <h3 className="font-bold text-pink-800 mb-2">😂 Comedy Reels</h3>
              <p className="text-sm text-gray-700">
                Short, visual, shareable content works best on Instagram where
                young audiences scroll for entertainment.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">
                📝 Long-form Blogs
              </h3>
              <p className="text-sm text-gray-700">
                Detailed articles belong on Blog Websites or LinkedIn where
                professionals seek in-depth information.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <h3 className="font-bold text-green-800 mb-2">🥗 Infographics</h3>
              <p className="text-sm text-gray-700">
                Visual guides perform amazing on Pinterest where people save
                ideas and inspiration for later use.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-gray-700">
                Always think: "Where does my audience spend time?" and "What
                format works best on this platform?"
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Play Again
          </button>

          <button
            onClick={() => setCurrentPage("intro")}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Back to Start
          </button>
        </div>
      </div>
    </div>
  );

  switch (currentPage) {
    case "intro":
      return renderIntroPage();
    case "game":
      return renderGamePage();
    case "tips":
      return renderTipsPage();
    default:
      return renderIntroPage();
  }
};

export default PlatformPickerGame;
