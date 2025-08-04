import React, { useState, useEffect, useRef } from "react";
import { Shuffle, Trophy, Star, Clock, RotateCcw } from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const SortItOut = () => {
  const { completeLawChallenge } = useLaw();
  const [statements, setStatements] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [categories, setCategories] = useState({
    fundamental: [],
    cyber: [],
    consumer: [],
  });
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [dragOverCategory, setDragOverCategory] = useState(null);
  const timerRef = useRef(null);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());


  const allStatements = [
    {
      id: 1,
      text: "You can express your opinions peacefully.",
      category: "fundamental",
      icon: "🗣️",
    },
    {
      id: 2,
      text: "Free and compulsory education up to Class 8.",
      category: "fundamental",
      icon: "📚",
    },
    {
      id: 3,
      text: "You can't be treated unfairly because of your gender or religion.",
      category: "fundamental",
      icon: "⚖️",
    },
    {
      id: 4,
      text: "Spreading fake news online can lead to legal action.",
      category: "cyber",
      icon: "📱",
    },
    {
      id: 5,
      text: "Never share your OTP or passwords.",
      category: "cyber",
      icon: "🔐",
    },
    {
      id: 6,
      text: "Posting someone's private messages online is cyberbullying.",
      category: "cyber",
      icon: "💻",
    },
    {
      id: 7,
      text: "You can return a faulty product and ask for a refund.",
      category: "consumer",
      icon: "🛒",
    },
    {
      id: 8,
      text: "Factories must not dump waste into rivers.",
      category: "consumer",
      icon: "🌊",
    },
    {
      id: 9,
      text: "You can complain if you're overcharged for something.",
      category: "consumer",
      icon: "💰",
    },
  ];

  const categoryInfo = {
    fundamental: {
      title: "Fundamental Rights",
      color: "bg-green-400",
      borderColor: "border-green-500",
      emoji: "🟩",
    },
    cyber: {
      title: "Cyber Law",
      color: "bg-blue-400",
      borderColor: "border-blue-500",
      emoji: "🟦",
    },
    consumer: {
      title: "Consumer & Environment",
      color: "bg-yellow-400",
      borderColor: "border-yellow-500",
      emoji: "🟨",
    },
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    setStatements(shuffleArray(allStatements));
    setScore(0);
    setTimeLeft(120);
    setGameActive(true);
    setGameComplete(false);
    setCategories({ fundamental: [], cyber: [], consumer: [] });
    setFeedback("");
    setShowFeedback(false);
  };

  const resetGame = () => {
    setGameActive(false);
    setGameComplete(false);
    setStatements([]);
    setScore(0);
    setTimeLeft(120);
    setCategories({ fundamental: [], cyber: [], consumer: [] });
    setFeedback("");
    setShowFeedback(false);
    setStartTime(Date.now());

  };

  const shuffleStatements = () => {
    setStatements(shuffleArray(statements));
  };

  useEffect(() => {
    if (!gameComplete) return;

    const endTime = Date.now();
    const totalStatements = 9;
    const correctAnswers = score / 3; // +3 for each correct answer
    const scaledScore = (correctAnswers / totalStatements) * 10;
    const accuracy = Math.round((correctAnswers / totalStatements) * 100);
    const avgResponseTimeSec = Math.round((endTime - startTime) / (1000 * totalStatements));
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Law",
      topicName: "beginnerLegalIntellect",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,
      beginnerLegalIntellectAvgScore: scaledScore,
      beginnerLegalIntellectAccuracy: accuracy,
    });
    setStartTime(Date.now());

  }, [gameComplete]);


  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, gameActive]);

  const endGame = () => {
    setGameActive(false);
    setGameComplete(true);
    const completedInTime = timeLeft > 0;
    if (completedInTime) {
      setScore((prev) => prev + 5);
      setFeedback("🎉 Amazing! Bonus points for finishing in time!");
      completeLawChallenge(0, 1);
    } else {
      setFeedback(`⏰ Time's up! ${score > 15 ? "Good effort" : ""}`);
    }
    setShowFeedback(true);
  };

  const handleDragStart = (e, statement) => {
    setDraggedItem(statement);
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDragOverCategory(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, categoryKey) => {
    e.preventDefault();
    setDragOverCategory(categoryKey);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverCategory(null);
    }
  };

  const handleDrop = (e, categoryKey) => {
    e.preventDefault();
    setDragOverCategory(null);

    if (!draggedItem || !gameActive) return;

    const isCorrect = draggedItem.category === categoryKey;

    if (isCorrect) {
      setCategories((prev) => ({
        ...prev,
        [categoryKey]: [...prev[categoryKey], draggedItem],
      }));
      setStatements((prev) => prev.filter((s) => s.id !== draggedItem.id));
      setScore((prev) => prev + 3);
      setFeedback("✅ Correct! Great job!");
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      setFeedback("❌ Oops! Try again!");
    }

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500);
    setDraggedItem(null);

    // Check if game is complete
    const totalPlaced = Object.values({
      ...categories,
      [categoryKey]: isCorrect
        ? [...categories[categoryKey], draggedItem]
        : categories[categoryKey],
    }).reduce((sum, arr) => sum + arr.length, 0);

    if (totalPlaced === 9 && isCorrect) {
      setTimeout(() => endGame(), 500);
    }
  };

  const getTitle = () => {
    if (score >= 25) return "🏆 Rights Wizard";
    if (score >= 20) return "🌟 Law Sorter Pro";
    if (score >= 15) return "⭐ Legal Eagle";
    return "🎯 Future Lawyer";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            🎮 Sort It Out: Law Edition
          </h1>
          <p className="text-white text-sm sm:text-base lg:text-lg opacity-90 px-2">
            Drag and drop the statements into the correct categories!
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
          {!gameActive && !gameComplete && (
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🚀 Start Game
            </button>
          )}

          {gameActive && (
            <>
              <div className="bg-white rounded-full px-3 sm:px-4 py-2 shadow-lg">
                <Clock className="inline w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-blue-600" />
                <span
                  className={`font-bold text-sm sm:text-base ${timeLeft < 30 ? "text-red-600" : "text-blue-600"
                    }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="bg-white rounded-full px-3 sm:px-4 py-2 shadow-lg">
                <Star className="inline w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-yellow-600" />
                <span className="font-bold text-yellow-600 text-sm sm:text-base">
                  Score: {score}
                </span>
              </div>

              <button
                onClick={shuffleStatements}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-full font-bold text-sm sm:text-base transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                <span className=" text-white">Shuffle</span>
              </button>
            </>
          )}

          {gameComplete && (
            <button
              onClick={resetGame}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              Play Again
            </button>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="text-center mb-4">
            <div className="bg-white rounded-full px-4 sm:px-6 py-2 inline-block shadow-lg animate-bounce">
              <span className="font-bold text-sm sm:text-base text-gray-800">
                {feedback}
              </span>
            </div>
          </div>
        )}

        {/* Game Complete Screen */}
        {gameComplete && (
          <div className="text-center mb-6 bg-white rounded-xl p-4 sm:p-6 shadow-2xl mx-2 sm:mx-4">
            <div className="text-4xl sm:text-6xl mb-4">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Game Complete!
            </h2>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
              {getTitle()}
            </div>
            <div className="text-lg sm:text-xl text-gray-600">
              Final Score: {score} points
            </div>
            {timeLeft > 0 && (
              <div className="text-green-600 font-bold mt-2 text-sm sm:text-base">
                🎯 Completed with {formatTime(timeLeft)} remaining!
              </div>
            )}
          </div>
        )}

        {/* Game Area */}
        {gameActive && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Statements to Sort */}
            <div className="lg:col-span-1 order-1 lg:order-1">
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-gray-800">
                  📋 Statements to Sort
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {statements.map((statement) => (
                    <div
                      key={statement.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, statement)}
                      onDragEnd={handleDragEnd}
                      className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white p-3 sm:p-4 rounded-lg cursor-move hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-200 shadow-md"
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl flex-shrink-0">
                          {statement.icon}
                        </span>
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                          {statement.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drop Zones */}
            <div className="lg:col-span-3 order-2 lg:order-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {Object.entries(categoryInfo).map(([key, info]) => (
                  <div
                    key={key}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, key)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, key)}
                    className={`
                      ${info.color
                      } rounded-xl p-3 sm:p-4 min-h-[200px] sm:min-h-[300px] transition-all duration-300 shadow-lg
                      ${dragOverCategory === key
                        ? "scale-105 shadow-2xl ring-4 ring-white"
                        : "hover:scale-102"
                      }
                    `}
                  >
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                        {info.emoji}
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-white drop-shadow-md">
                        {info.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {categories[key].map((statement) => (
                        <div
                          key={statement.id}
                          className="bg-white bg-opacity-90 p-2 sm:p-3 rounded-lg shadow-md"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-base sm:text-lg flex-shrink-0">
                              {statement.icon}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                              {statement.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {categories[key].length === 0 && (
                      <div className="border-2 border-dashed border-white border-opacity-50 rounded-lg h-24 sm:h-32 flex items-center justify-center mt-2 sm:mt-4">
                        <span className="text-white text-opacity-70 text-xs sm:text-sm font-medium text-center px-2">
                          Drop statements here
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!gameActive && !gameComplete && (
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg mx-2 sm:mx-4 mt-4 sm:mt-6">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-800">
              🎯 How to Play
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">🟩</div>
                <h4 className="font-bold text-green-600 mb-2 text-sm sm:text-base">
                  Fundamental Rights
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Basic rights every citizen has
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">🟦</div>
                <h4 className="font-bold text-blue-600 mb-2 text-sm sm:text-base">
                  Cyber Law
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Rules for online behavior
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">🟨</div>
                <h4 className="font-bold text-yellow-600 mb-2 text-sm sm:text-base">
                  Consumer & Environment
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Protection for buyers and nature
                </p>
              </div>
            </div>
            <div className="text-center space-y-2 text-sm sm:text-base text-gray-700">
              <p>
                <strong>📱 Drag</strong> statements to the correct category
              </p>
              <p>
                <strong>⏱️ Beat the clock</strong> for bonus points!
              </p>
              <p>
                <strong>🌟 Scoring:</strong> +3 correct, -1 wrong, +5 time bonus
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortItOut;
