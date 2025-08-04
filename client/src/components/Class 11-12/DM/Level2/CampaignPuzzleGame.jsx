import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Calendar,
  Target,
  Users,
  Zap,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Clock,
  Rocket,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const CampaignPuzzleGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("intro");
  const [timeline, setTimeline] = useState([null, null, null]);
  const [availableTiles, setAvailableTiles] = useState([]);
  const [draggedTile, setDraggedTile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [celebrationMode, setCelebrationMode] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const campaignTiles = [
    {
      id: "awareness",
      title: "Awareness Phase",
      content: "Post a reel showing students struggling with messy notes",
      icon: "📱",
      phase: "Day 1",
      color: "from-red-400 to-pink-500",
      borderColor: "border-red-300",
      correctPosition: 0,
      description: "Hook viewers with relatable problems",
    },
    {
      id: "interest",
      title: "Interest Phase",
      content: "Share 3 carousel posts explaining features of the planner",
      icon: "📋",
      phase: "Day 2",
      color: "from-blue-400 to-purple-500",
      borderColor: "border-blue-300",
      correctPosition: 1,
      description: "Build interest with detailed benefits",
    },
    {
      id: "action",
      title: "Action Phase",
      content: 'Announce giveaway: "Win your own PlanIt Notebook!"',
      icon: "🎁",
      phase: "Day 3",
      color: "from-green-400 to-teal-500",
      borderColor: "border-green-300",
      correctPosition: 2,
      description: "Drive action with clear call-to-action",
    },
  ];

  useEffect(() => {
    // Randomize tiles when game starts
    if (currentPage === "game") {
      const shuffled = [...campaignTiles].sort(() => Math.random() - 0.5);
      setAvailableTiles(shuffled);
    }
  }, [currentPage]);

  const handleDragStart = (e, tile) => {
    setDraggedTile(tile);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    // Get the position from the drop target
    const dropTarget = e.currentTarget;
    const position = parseInt(dropTarget.dataset.position);

    // If the position is occupied, show a "not-allowed" cursor
    if (timeline[position] !== null) {
      e.dataTransfer.dropEffect = "none";
    } else {
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (e, position) => {
    e.preventDefault();
    if (draggedTile) {
      // Check if the drop position is already occupied
      if (timeline[position] !== null) {
        // Position is occupied, don't allow the drop
        setDraggedTile(null);
        return;
      }

      // Remove tile from current position if it's already on timeline
      const newTimeline = timeline.map((tile) =>
        tile?.id === draggedTile.id ? null : tile
      );

      // Place tile in new position (we already checked it's empty)
      newTimeline[position] = draggedTile;
      setTimeline(newTimeline);

      // Update available tiles
      setAvailableTiles((prev) =>
        prev.filter((tile) => tile.id !== draggedTile.id)
      );

      setDraggedTile(null);
    }
  };

  const handleRemoveFromTimeline = (position) => {
    const removedTile = timeline[position];
    if (removedTile) {
      const newTimeline = [...timeline];
      newTimeline[position] = null;
      setTimeline(newTimeline);
      setAvailableTiles((prev) => [...prev, removedTile]);
    }
  };

  const checkResults = () => {
    setIsLoading(true);
    setLoadingProgress(0);

    // Simulate loading with progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          analyzeResults();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const analyzeResults = () => {
    let correctCount = 0;

    timeline.forEach((tile, index) => {
      if (tile && tile.correctPosition === index) {
        correctCount++;
      }
    });

    let feedbackMessage = "";
    let starCount = 0;

    if (correctCount === 3) {
      feedbackMessage = "This campaign is ready to launch 🚀";
      starCount = 5;
      setCelebrationMode(true);
      setTimeout(() => setCelebrationMode(false), 3000);
    } else if (correctCount === 2) {
      feedbackMessage =
        "Almost there! Think of the campaign like telling a short story.";
      starCount = 3;
    } else {
      feedbackMessage =
        "Try again — build it like a funnel: catch attention → build interest → invite action.";
      starCount = 1;
    }

    // Scale score out of 10
    const scaledScore = starCount === 5 ? 10 : starCount === 3 ? 7 : 3;

    const endTime = Date.now();
    const timeSpentSec = Math.floor((endTime - startTime) / 1000);

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "contentStrategist",
      score: scaledScore,
      accuracy: (correctCount / 3) * 100,
      avgResponseTimeSec: timeSpentSec / 3,
      studyTimeMinutes: Math.ceil(timeSpentSec / 60),
      completed: true,

    });
    setStartTime(Date.now());
    setFeedback(feedbackMessage);
    setStars(starCount);
    setIsLoading(false);
    setCurrentPage("results");
    completeDMChallenge(1, 2);
  };


  const resetGame = () => {
    setTimeline([null, null, null]);
    setAvailableTiles([]);
    setFeedback("");
    setStars(0);
    setIsLoading(false);
    setLoadingProgress(0);
    setCurrentPage("game");
    setStartTime(Date.now());
  };

  const canvasRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (currentPage !== "results" || !celebrationMode || !resultRef?.current) {
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
  }, [currentPage, resultRef, celebrationMode]);

  const renderIntroPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
            Campaign Puzzle
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Connect the Pieces! 🧩
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Mission:
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <Calendar className="text-orange-500" size={20} />
              <span className="text-gray-700">
                Plan a 3-day campaign for "PlanIt" notebooks
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="text-red-500" size={20} />
              <span className="text-gray-700">
                Drag & drop tiles in the correct order
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="text-pink-500" size={20} />
              <span className="text-gray-700">
                Create the perfect marketing funnel!
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            📚 About PlanIt Notebooks
          </h3>
          <p className="text-gray-700">
            A new brand of planner notebooks designed to help students organize
            their messy notes and boost productivity!
          </p>
        </div>

        <button
          onClick={() => setCurrentPage("game")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
        >
          <span>Start Planning!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderGamePage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
              Campaign Puzzle
            </h1>
            <p className="text-gray-600">
              Drag tiles to create the perfect 3-day campaign timeline!
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📅 Campaign Timeline
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[0, 1, 2].map((position) => (
                <div
                  key={position}
                  className="relative"
                  data-position={position}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, position)}
                >
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 min-h-[200px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative hover:border-gray-400 transition-colors duration-200">
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-sm font-bold text-gray-600">
                      Day {position + 1}
                    </div>

                    {timeline[position] ? (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${timeline[position].color} rounded-xl p-4 text-white cursor-pointer transform hover:scale-105 transition-all duration-200`}
                        onClick={() => handleRemoveFromTimeline(position)}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">
                            {timeline[position].icon}
                          </div>
                          <h3 className="font-bold text-lg mb-2">
                            {timeline[position].title}
                          </h3>
                          <p className="text-sm opacity-90 mb-2">
                            {timeline[position].content}
                          </p>
                          <div className="bg-white bg-opacity-20 rounded-lg p-2 text-xs">
                            {timeline[position].description}
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold hover:bg-red-600">
                          ✕
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2 opacity-50">📋</div>
                        <p className="text-gray-500 font-semibold">
                          Drop campaign tile here
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Day {position + 1}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Tiles */}
          {availableTiles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🧩 Campaign Pieces
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {availableTiles.map((tile) => (
                  <div
                    key={tile.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, tile)}
                    className={`bg-gradient-to-br ${tile.color} rounded-2xl p-6 text-white cursor-move shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{tile.icon}</div>
                      <h3 className="font-bold text-lg mb-3">{tile.title}</h3>
                      <p className="text-sm opacity-90 mb-3">{tile.content}</p>
                      <div className="bg-white text-black bg-opacity-20 rounded-lg p-2 text-md">
                        {tile.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  💡 Drag tiles to the timeline above!
                </p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={checkResults}
              disabled={timeline.some((slot) => slot === null)}
              className={`font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto ${timeline.some((slot) => slot === null)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg transform hover:scale-105"
                }`}
            >
              <Rocket size={24} />
              <span>Launch Campaign!</span>
            </button>
            {timeline.some((slot) => slot === null) && (
              <p className="text-sm text-gray-500 mt-2">
                Fill all timeline slots to launch!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Analyzing Campaign...
          </h2>
          <p className="text-gray-600">Checking your marketing strategy</p>
        </div>

        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {loadingProgress}% Complete
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div
            className={`flex items-center space-x-2 ${loadingProgress > 20 ? "text-green-600" : ""
              }`}
          >
            <CheckCircle
              size={16}
              className={
                loadingProgress > 20 ? "text-green-500" : "text-gray-400"
              }
            />
            <span>Checking campaign sequence...</span>
          </div>
          <div
            className={`flex items-center space-x-2 ${loadingProgress > 50 ? "text-green-600" : ""
              }`}
          >
            <CheckCircle
              size={16}
              className={
                loadingProgress > 50 ? "text-green-500" : "text-gray-400"
              }
            />
            <span>Analyzing funnel strategy...</span>
          </div>
          <div
            className={`flex items-center space-x-2 ${loadingProgress > 80 ? "text-green-600" : ""
              }`}
          >
            <CheckCircle
              size={16}
              className={
                loadingProgress > 80 ? "text-green-500" : "text-gray-400"
              }
            />
            <span>Calculating results...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResultsPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-600 p-4 flex items-center justify-center">
      <div
        ref={resultRef}
        className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-4xl w-full"
      >
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50"
        />
        <div
          className={`text-center mb-8 ${celebrationMode ? "animate-bounce" : ""
            }`}
        >
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 mx-1 ${i < stars ? "text-yellow-400 fill-current" : "text-gray-300"
                  } transition-all duration-300`}
              />
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-4">
            Campaign Results! 📊
          </h1>

          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-6 mb-6">
            <p className="text-xl font-semibold text-gray-800">{feedback}</p>
          </div>
        </div>

        {/* Timeline Review */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Your Campaign Timeline
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {timeline.map((tile, index) => {
              const isCorrect = tile && tile.correctPosition === index;
              const correctTile = campaignTiles.find(
                (t) => t.correctPosition === index
              );

              return (
                <div key={index} className="relative">
                  <div
                    className={`rounded-2xl p-6 border-2 ${isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-white rounded-full px-3 py-1 text-sm font-bold text-gray-600">
                        Day {index + 1}
                      </span>
                      {isCorrect ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <div className="text-red-500 font-bold">✕</div>
                      )}
                    </div>

                    {tile ? (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xl">{tile.icon}</span>
                          <h3 className="font-bold text-gray-800">
                            {tile.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {tile.content}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No tile placed</p>
                    )}

                    {!isCorrect && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-green-600 font-semibold">
                          Correct: {correctTile.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {correctTile.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campaign Strategy Explanation */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
            Perfect Campaign Funnel 📈
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-xl p-4 mb-2">
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-bold text-red-800">Day 1: Awareness</h4>
                <p className="text-sm text-gray-700">
                  Hook viewers with a relatable problem they face
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-xl p-4 mb-2">
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-bold text-blue-800">Day 2: Interest</h4>
                <p className="text-sm text-gray-700">
                  Build interest by showing how you solve the problem
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-xl p-4 mb-2">
                <div className="text-2xl mb-2">🎁</div>
                <h4 className="font-bold text-green-800">Day 3: Action</h4>
                <p className="text-sm text-gray-700">
                  Drive action with an irresistible offer
                </p>
              </div>
            </div>
          </div>
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
            onClick={() => {
              resetGame();
              setCurrentPage("intro");
            }}
            className="bg-gradient-to-r from-blue-400 to-teal-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            New Campaign
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return renderLoadingScreen();
  }

  switch (currentPage) {
    case "intro":
      return renderIntroPage();
    case "game":
      return renderGamePage();
    case "results":
      return renderResultsPage();
    default:
      return renderIntroPage();
  }
};

export default CampaignPuzzleGame;
