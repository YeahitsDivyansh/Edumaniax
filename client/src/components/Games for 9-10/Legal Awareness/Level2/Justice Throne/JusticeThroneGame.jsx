import React, { useState, useEffect } from "react";
import {
  Crown,
  Gavel,
  Shield,
  Trophy,
  Star,
  ChevronRight,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const JusticeThroneGame = () => {
  const { completeLawChallenge } = useLaw();
  const [currentPage, setCurrentPage] = useState("instructions"); // instructions, game, results
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [scenarioResults, setScenarioResults] = useState([]);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (currentPage !== "results") return;

    const endTime = Date.now();
    const totalQuestions = scenarioResults.length;
    const correctAnswers = scenarioResults.filter((r) => r.points === 10).length;
    const scaledScore = (correctAnswers / totalQuestions) * 10;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const avgResponseTimeSec = Math.round((endTime - startTime) / (1000 * totalQuestions));
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Law",
      topicName: "constitutionalRights",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,
 
    });
    setStartTime(Date.now());

  }, [currentPage]);


  useEffect(() => {
    if (currentPage === "results") {
      completeLawChallenge(1, 0);
    }
  }, [currentPage]);

  const scenarios = [
    {
      id: 1,
      scenario:
        "State of Karnataka vs. State of Telangana over water sharing dispute.",
      courts: ["Supreme Court", "High Court", "District Court"],
      articles: ["Article 131", "Article 226", "Article 32"],
      correctCourt: "Supreme Court",
      correctArticle: "Article 131",
      explanation:
        "Article 131 gives Supreme Court original jurisdiction over inter-state disputes.",
    },
    {
      id: 2,
      scenario:
        "Appeal against High Court judgment in a criminal case of murder.",
      courts: ["Supreme Court", "High Court", "District Court"],
      articles: ["Article 136", "Article 131", "Article 226"],
      correctCourt: "Supreme Court",
      correctArticle: "Article 136",
      explanation:
        "Article 136 allows Supreme Court to grant special leave to appeal from High Court judgments.",
    },
    {
      id: 3,
      scenario: "Man challenges state government order by writ petition.",
      courts: ["Supreme Court", "High Court", "District Court"],
      articles: ["Article 226", "Article 32", "Article 131"],
      correctCourt: "High Court",
      correctArticle: "Article 226",
      explanation:
        "High Courts have writ jurisdiction under Article 226 to enforce fundamental rights and legal remedies.",
    },
    {
      id: 4,
      scenario:
        "Shopkeeper files civil suit against neighbor for boundary dispute.",
      courts: ["Supreme Court", "High Court", "District Court"],
      articles: ["Local civil laws", "Article 226", "Article 131"],
      correctCourt: "District Court",
      correctArticle: "Local civil laws",
      explanation:
        "District courts handle civil suits involving local property disputes.",
    },
    {
      id: 5,
      scenario:
        "Public Interest Litigation about environmental pollution in a city.",
      courts: ["Supreme Court", "High Court", "District Court"],
      articles: ["Article 226", "Article 32", "Article 131"],
      correctCourt: "High Court",
      correctArticle: "Article 226",
      explanation:
        "High Courts entertain PILs under Article 226 for public welfare issues.",
    },
  ];

  const courtCharacters = {
    "Supreme Court": {
      title: "The Majesty",
      icon: Crown,
      color: "from-purple-600 to-purple-800",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      description: "The highest court in the land!",
    },
    "High Court": {
      title: "Regional King",
      icon: Shield,
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      description: "Powerful guardian of regional justice!",
    },
    "District Court": {
      title: "Wise Minister",
      icon: Gavel,
      color: "from-green-600 to-green-800",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      description: "The local problem solver!",
    },
  };

  const calculateScore = (court, article) => {
    const current = scenarios[currentScenario];
    if (court === current.correctCourt && article === current.correctArticle) {
      return 10;
    } else if (
      court === current.correctCourt &&
      article !== current.correctArticle
    ) {
      return 5;
    } else {
      return -5;
    }
  };

  const handleSubmit = () => {
    if (!selectedCourt || !selectedArticle) return;

    const points = calculateScore(selectedCourt, selectedArticle);
    const newScore = score + points;
    setScore(newScore);

    const result = {
      scenario: currentScenario + 1,
      selectedCourt,
      selectedArticle,
      correctCourt: scenarios[currentScenario].correctCourt,
      correctArticle: scenarios[currentScenario].correctArticle,
      points,
      explanation: scenarios[currentScenario].explanation,
    };

    setScenarioResults([...scenarioResults, result]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedCourt("");
      setSelectedArticle("");
      setShowResult(false);
    } else {
      setGameComplete(true);
      setCurrentPage("results");
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedCourt("");
    setSelectedArticle("");
    setShowResult(false);
    setGameComplete(false);
    setScenarioResults([]);
    setCurrentPage("instructions");
    setStartTime(Date.now());

  };

  const InstructionsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-4 shadow-lg">
            <Crown className="w-10 h-10 text-yellow-800" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Justice Throne
          </h1>
          <p className="text-xl md:text-2xl text-yellow-300 font-semibold">
            Court Clash Game
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              How to Play
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  🎯 Your Mission
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Face 5 legal scenarios and choose the right court and legal
                  article to solve each case!
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  ⚖️ Choose Wisely
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Pick your court character and the constitutional article that
                  gives them power to handle the case.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  🏆 Scoring
                </h3>
                <div className="text-white/90 text-sm md:text-base space-y-1">
                  <div>
                    ✅ Correct court + article:{" "}
                    <span className="text-green-400 font-bold">+10 points</span>
                  </div>
                  <div>
                    🟡 Correct court only:{" "}
                    <span className="text-yellow-400 font-bold">+5 points</span>
                  </div>
                  <div>
                    ❌ Wrong court:{" "}
                    <span className="text-red-400 font-bold">-5 points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Meet Your Court Characters
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(courtCharacters).map(([court, char]) => {
                const Icon = char.icon;
                return (
                  <div
                    key={court}
                    className={`${char.bgColor} rounded-2xl p-4 text-center transform hover:scale-105 transition-transform duration-300`}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${char.color} rounded-full mb-2`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4
                      className={`font-bold ${char.textColor} text-sm md:text-base`}
                    >
                      {court}
                    </h4>
                    <p className={`text-xs font-semibold ${char.textColor}/80`}>
                      "{char.title}"
                    </p>
                    <p className={`text-xs ${char.textColor}/70 mt-1`}>
                      {char.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentPage("game")}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
            >
              Start Playing
              <ChevronRight className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GamePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-400 rounded-full p-3 mr-4">
              <Trophy className="w-8 h-8 text-yellow-800" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                Justice Throne
              </h1>
              <div className="flex items-center justify-center mt-2 space-x-4 text-sm md:text-base">
                <span className="text-yellow-300 font-semibold">
                  Scenario {currentScenario + 1}/5
                </span>
                <span className="text-green-400 font-bold">Score: {score}</span>
              </div>
            </div>
          </div>
        </div>

        {!showResult ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            {/* Scenario */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl p-4 md:p-6 border border-yellow-400/30">
                <h2 className="text-lg md:text-xl font-bold text-white mb-3">
                  📋 Case Scenario
                </h2>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  {scenarios[currentScenario].scenario}
                </p>
              </div>
            </div>

            {/* Court Selection */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                🏛️ Choose Your Court
              </h3>
              <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                {scenarios[currentScenario].courts.map((court) => {
                  const char = courtCharacters[court];
                  const Icon = char.icon;
                  const isSelected = selectedCourt === court;

                  return (
                    <button
                      key={court}
                      onClick={() => setSelectedCourt(court)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${isSelected
                        ? `${char.bgColor} border-white shadow-lg scale-105`
                        : "bg-white/10 border-white/30 hover:bg-white/20"
                        }`}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${char.color} rounded-full mb-2`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4
                        className={`font-bold text-sm md:text-base ${isSelected ? char.textColor : "text-white"
                          }`}
                      >
                        {court}
                      </h4>
                      <p
                        className={`text-xs ${isSelected ? char.textColor + "/80" : "text-white/70"
                          }`}
                      >
                        "{char.title}"
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Article Selection */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                📜 Choose Legal Article
              </h3>
              <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                {scenarios[currentScenario].articles.map((article) => {
                  const isSelected = selectedArticle === article;

                  return (
                    <button
                      key={article}
                      onClick={() => setSelectedArticle(article)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${isSelected
                        ? "bg-pink-100 border-pink-400 text-pink-800 shadow-lg scale-105"
                        : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                        }`}
                    >
                      <div className="text-sm md:text-base font-semibold">
                        {article}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={!selectedCourt || !selectedArticle}
                className={`py-3 px-8 rounded-full font-bold text-lg transition-all duration-300 transform ${selectedCourt && selectedArticle
                  ? "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white hover:scale-105 shadow-lg"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
              >
                Submit Answer
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            {/* Result Display */}
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${scenarioResults[scenarioResults.length - 1].points > 0
                  ? "bg-green-400"
                  : "bg-red-400"
                  }`}
              >
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {scenarioResults[scenarioResults.length - 1].points > 0
                  ? "🎉 Great Job!"
                  : "😊 Keep Learning!"}
              </h2>
              <div
                className={`text-xl font-bold ${scenarioResults[scenarioResults.length - 1].points > 0
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {scenarioResults[scenarioResults.length - 1].points > 0
                  ? "+"
                  : ""}
                {scenarioResults[scenarioResults.length - 1].points} points
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 md:p-6 border border-blue-400/30 mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                💡 Explanation
              </h3>
              <p className="text-white/90 text-sm md:text-base">
                {scenarios[currentScenario].explanation}
              </p>
            </div>

            {/* Correct Answer */}
            <div className="bg-green-500/20 rounded-2xl p-4 border border-green-400/30 mb-6">
              <h3 className="text-lg font-bold text-green-300 mb-3">
                ✅ Correct Answer
              </h3>
              <div className="text-white/90 text-sm md:text-base">
                <div>
                  <strong>Court:</strong>{" "}
                  {scenarios[currentScenario].correctCourt}
                </div>
                <div>
                  <strong>Article:</strong>{" "}
                  {scenarios[currentScenario].correctArticle}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
              >
                {currentScenario < scenarios.length - 1
                  ? "Next Scenario"
                  : "View Results"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ResultsPage = () => {
    const maxScore = scenarios.length * 10;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Final Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-4 animate-bounce">
              <Trophy className="w-10 h-10 text-yellow-800" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Game Complete!
            </h1>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 inline-block">
              <div className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2">
                {score}
              </div>
              <div className="text-lg md:text-xl text-white">
                out of {maxScore} points
              </div>
              <div className="text-2xl md:text-3xl font-bold text-green-400 mt-2">
                {percentage}%
              </div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-8">
            <div
              className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${percentage >= 80
                ? "bg-green-500 text-white"
                : percentage >= 60
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
                }`}
            >
              {percentage >= 80
                ? "🏆 Justice Master!"
                : percentage >= 60
                  ? "⚖️ Good Judge!"
                  : "📚 Keep Studying!"}
            </div>
          </div>

          {/* Scenario Results */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
              📊 Your Performance
            </h2>
            <div className="space-y-4">
              {scenarioResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl border-2 ${result.points > 0
                    ? "bg-green-500/20 border-green-400"
                    : "bg-red-500/20 border-red-400"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold text-sm md:text-base">
                      Scenario {result.scenario}
                    </span>
                    <span
                      className={`font-bold text-sm md:text-base ${result.points > 0 ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {result.points > 0 ? "+" : ""}
                      {result.points} pts
                    </span>
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Your choice: {result.selectedCourt} +{" "}
                    {result.selectedArticle}
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Correct: {result.correctCourt} + {result.correctArticle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Play Again Button */}
          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {currentPage === "instructions" && <InstructionsPage />}
      {currentPage === "game" && <GamePage />}
      {currentPage === "results" && <ResultsPage />}
    </div>
  );
};

export default JusticeThroneGame;
