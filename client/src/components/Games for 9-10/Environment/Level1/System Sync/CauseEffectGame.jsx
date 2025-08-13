import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  RotateCcw,
  Star,
  Zap,
  Globe,
  Droplets,
  Wind,
  TreePine,
  AlertTriangle,
} from "lucide-react";

import clickSoundFile from "../../Sound/clickSoundFile.mp3";
import clickSoundFileYay from "../../Sound/clickSoundFileYay.mp3";
import clickSoundFileOops from "../../Sound/clickSoundFileOops.mp3";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext";


const CauseEffectGame = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [currentPage, setCurrentPage] = useState("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [selectedSphere, setSelectedSphere] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [animateWrong, setAnimateWrong] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  const questions = [
    {
      id: 1,
      cause: "Urbanization",
      causeIcon: "🏙️",
      correctEffect: "Soil sealing with concrete",
      correctSphere: "Geosphere",
      effects: [
        "Soil sealing with concrete",
        "Increased plant growth",
        "More rainfall",
        "Ocean warming",
      ],
      spheres: ["Geosphere", "Atmosphere", "Hydrosphere", "Biosphere"],
      trivia:
        "Urban areas cover soil with concrete and asphalt, preventing water from soaking into the ground and reducing groundwater recharge!",
      systemShock:
        "Without proper planning, cities can become heat islands and flood zones, disrupting natural water cycles!",
    },
    {
      id: 2,
      cause: "Industrial Air Pollution",
      causeIcon: "🏭",
      correctEffect: "Toxic substances in air",
      correctSphere: "Biosphere",
      effects: [
        "Cleaner oceans",
        "Toxic substances in air",
        "More fertile soil",
        "Cooler temperatures",
      ],
      spheres: ["Biosphere", "Geosphere", "Hydrosphere", "Atmosphere"],
      trivia:
        "Air pollution doesn't just stay in the air - it falls as acid rain and contaminates soil and water, harming all living things!",
      systemShock:
        "Polluted air can travel thousands of miles, affecting forests, crops, and wildlife far from the pollution source!",
    },
    {
      id: 3,
      cause: "Ocean Acidification",
      causeIcon: "🌊",
      correctEffect: "Damage to marine life",
      correctSphere: "Biosphere",
      effects: [
        "Stronger coral reefs",
        "More fish reproduction",
        "Damage to marine life",
        "Cleaner water",
      ],
      spheres: ["Hydrosphere", "Biosphere", "Atmosphere", "Geosphere"],
      trivia:
        "When oceans absorb too much CO2, they become acidic like lemon juice, making it hard for sea creatures to build shells and skeletons!",
      systemShock:
        "Acidic oceans could collapse entire marine food chains, affecting billions of people who depend on seafood!",
    },
    {
      id: 4,
      cause: "Agriculture",
      causeIcon: "🚜",
      correctEffect: "Methane and nitrous oxide release",
      correctSphere: "Atmosphere",
      effects: [
        "Cleaner air production",
        "Methane and nitrous oxide release",
        "Ocean cooling",
        "Mountain formation",
      ],
      spheres: ["Atmosphere", "Geosphere", "Biosphere", "Hydrosphere"],
      trivia:
        "Cows burp methane, and fertilizers release nitrous oxide - both are greenhouse gases that trap heat in our atmosphere!",
      systemShock:
        "Agricultural emissions contribute significantly to climate change, affecting weather patterns worldwide!",
    },
    {
      id: 5,
      cause: "Wildfires",
      causeIcon: "🔥",
      correctEffect: "Ash contamination",
      correctSphere: "Hydrosphere",
      effects: [
        "Improved air quality",
        "Ash contamination",
        "Stronger tree roots",
        "More snow formation",
      ],
      spheres: ["Hydrosphere", "Atmosphere", "Geosphere", "Biosphere"],
      trivia:
        "Wildfire ash washes into rivers and lakes, making water unsafe to drink and harming aquatic life!",
      systemShock:
        "Massive wildfires can contaminate water supplies for entire cities, creating long-term environmental damage!",
    },
  ];

  const getSphereIcon = (sphere) => {
    switch (sphere) {
      case "Geosphere":
        return <Globe className="w-5 h-5" />;
      case "Atmosphere":
        return <Wind className="w-5 h-5" />;
      case "Hydrosphere":
        return <Droplets className="w-5 h-5" />;
      case "Biosphere":
        return <TreePine className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getSphereColor = (sphere) => {
    switch (sphere) {
      case "Geosphere":
        return "from-amber-400 to-orange-500";
      case "Atmosphere":
        return "from-blue-400 to-cyan-500";
      case "Hydrosphere":
        return "from-blue-500 to-indigo-600";
      case "Biosphere":
        return "from-green-400 to-emerald-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const handleEffectSelect = (effect) => {
    setSelectedEffect(effect);
    setSelectedSphere(null);
  };

  const handleSphereSelect = (sphere) => {
    setSelectedSphere(sphere);
  };

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const isCorrect =
      selectedEffect === currentQ.correctEffect &&
      selectedSphere === currentQ.correctSphere;

    if (isCorrect) {
      setScore(score + 1);
      playClickSound(clickSoundRefYay);
    } else {
      setAnimateWrong(true);
      setTimeout(() => setAnimateWrong(false), 1000);
      playClickSound(clickSoundRefOops);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedEffect(null);
      setSelectedSphere(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedEffect(null);
    setSelectedSphere(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
    setCurrentPage("welcome");
    setStartTime(Date.now());

  };

  const clickSoundRefPop = useRef(new Audio(clickSoundFile));
  const clickSoundRefYay = useRef(new Audio(clickSoundFileYay));
  const clickSoundRefOops = useRef(new Audio(clickSoundFileOops));

  const playClickSound = (clickSoundRef) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
  };

  const canvasRef = useRef(null);
  useEffect(() => {
    if (!gameComplete) return;

    const studyTimeMinutes = Math.round((Date.now() - startTime) / 60000);
    const avgResponseTimeSec = Math.round((Date.now() - startTime) / 1000 / questions.length);
    const accuracy = (score / questions.length) * 100;
    const scaledScore = (score / questions.length) * 10;

    updatePerformance({
      moduleName: "Environment",
      topicName: "climateAnalyst",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: score >= 4, // ✅ You mentioned completed = score < 8, here it means if passed 4 or more out of 5
     
    });
    setStartTime(Date.now());

  }, [gameComplete]);


  useEffect(() => {
    if (score < 5 || !gameComplete) {
      return;
    }

    completeEnvirnomentChallenge(0, 0); // ✅ Add this line here

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
  }, [score, gameComplete]);

  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl animate-pulse">
        <div className="text-6xl md:text-8xl mb-6 animate-bounce">🌍</div>
        <h1 className="text-3xl md:text-5xl font-bold  text-blue-600  mb-4">
          Earth Systems
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-6">
          Cause & Effect Adventure!
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Discover how human activities create ripple effects across our
          planet's systems! Connect causes to effects and learn about Earth's
          amazing interconnected world! 🌟
        </p>
        <button
          onClick={() => setCurrentPage("instructions")}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
        >
          Let's Explore! <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const InstructionsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 max-w-3xl w-full shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl md:text-6xl mb-4">🎮</div>
          <motion.h2
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 0.9 }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="text-2xl md:text-4xl font-bold text-blue-800 mb-4"
          >
            How to Play?
          </motion.h2>
        </div>

        <div className="space-y-6 text-left">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-l-4 border-orange-400">
            <h3 className="font-bold text-lg md:text-xl text-orange-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Your Mission
            </h3>
            <p className="text-gray-700 text-base md:text-lg">
              Connect human activities to their effects on Earth's systems!
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border-l-4 border-green-400">
            <h3 className="font-bold text-lg md:text-xl text-green-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Game Steps
            </h3>
            <ol className="text-gray-700 text-base md:text-lg space-y-2 list-decimal list-inside">
              <li>
                Read the <strong>Cause Card</strong> (human activity)
              </li>
              <li>
                Select the correct <strong>Effect</strong>
              </li>
              <li>
                Choose which <strong>Earth System</strong> is affected
              </li>
              <li>Learn amazing facts or face a System Shock!</li>
            </ol>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border-l-4 border-purple-400">
            <h3 className="font-bold text-lg md:text-xl text-purple-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">🌍</span> Earth's Systems
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Globe className="w-5 h-5 text-orange-500" />
                <span>Geosphere (Land/Rocks)</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Wind className="w-5 h-5 text-blue-500" />
                <span>Atmosphere (Air)</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Droplets className="w-5 h-5 text-indigo-500" />
                <span>Hydrosphere (Water)</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <TreePine className="w-5 h-5 text-green-500" />
                <span>Biosphere (Life)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
          >
            Start Game! <Zap className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const GamePage = () => {
    const currentQ = questions[currentQuestion];

    if (gameComplete) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-4">
          <div className="bg-white/95 relative backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl">
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">{`${score < 4 ? "" : "🎉"
              }`}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              {`${score < 4
                ? "Keep Trying"
                : score < 5
                  ? "Well done"
                  : "Outstanding, Champ"
                }`}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              You scored {score} out of {questions.length}!
            </p>
            <div className="text-lg text-gray-600 mb-8">
              {score === questions.length
                ? "Perfect! You're an Earth Systems Expert! 🌟"
                : score >= questions.length * 0.7
                  ? "Excellent! You understand Earth's connections! 🌍"
                  : "Good effort! Keep learning about our amazing planet! 🌱"}
            </div>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
            >
              Play Again! <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="text-lg md:text-xl font-bold text-purple-800">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-lg md:text-xl font-bold text-green-800 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Score: {score}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {!showResult ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cause Card */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-3xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
                    🎯 Cause
                  </h3>
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl mb-4">
                      {currentQ.causeIcon}
                    </div>
                    <div className="text-xl md:text-2xl font-bold bg-white/20 rounded-2xl p-4">
                      {currentQ.cause}
                    </div>
                  </div>
                </div>
              </div>

              {/* Effects */}
              <div className="lg:col-span-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-purple-800 flex items-center justify-center gap-2">
                    ⚡ Choose the Effect
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentQ.effects.map((effect, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleEffectSelect(effect);
                          playClickSound(clickSoundRefPop);
                        }}
                        className={`p-4 rounded-2xl font-semibold text-left transition-all duration-300 transform hover:scale-105 ${selectedEffect === effect
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg scale-105"
                          : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-yellow-100 hover:to-orange-100 text-gray-700"
                          } ${animateWrong && selectedEffect === effect
                            ? "animate-pulse bg-red-400"
                            : ""
                          }`}
                      >
                        {effect}
                      </button>
                    ))}
                  </div>

                  {selectedEffect && (
                    <div className="animate-fadeIn">
                      <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-purple-800 flex items-center justify-center gap-2">
                        🌍 Which Earth System is Affected?
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {currentQ.spheres.map((sphere, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleSphereSelect(sphere);
                              playClickSound(clickSoundRefPop);
                            }}
                            className={`p-4 rounded-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2 ${selectedSphere === sphere
                              ? `bg-gradient-to-br ${getSphereColor(
                                sphere
                              )} text-white shadow-lg scale-105`
                              : "bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 text-gray-700"
                              } ${animateWrong && selectedSphere === sphere
                                ? "animate-pulse bg-red-400"
                                : ""
                              }`}
                          >
                            {getSphereIcon(sphere)}
                            <span className="text-sm md:text-base">
                              {sphere}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEffect && selectedSphere && (
                    <div className="text-center animate-fadeIn">
                      <button
                        onClick={checkAnswer}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Check Answer!
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              {selectedEffect === currentQ.correctEffect &&
                selectedSphere === currentQ.correctSphere ? (
                <div className="text-center">
                  <div className="text-6xl md:text-8xl mb-6 animate-bounce">
                    🎉
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    Correct!
                  </h3>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-lg md:text-xl text-green-800 mb-3 flex items-center justify-center gap-2">
                      <Star className="w-6 h-6" />
                      Amazing Fact!
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {currentQ.trivia}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl md:text-8xl mb-6 animate-pulse">
                    ⚠️
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
                    System Shock!
                  </h3>
                  <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-lg md:text-xl text-red-800 mb-3 flex items-center justify-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      Real-World Impact
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      {currentQ.systemShock}
                    </p>
                    <div className="bg-white/80 rounded-xl p-4">
                      <p className="text-sm md:text-base text-gray-600">
                        <strong>Correct Answer:</strong> {currentQ.cause} →{" "}
                        {currentQ.correctEffect} → {currentQ.correctSphere}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "See Results"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {currentPage === "welcome" && <WelcomePage />}
      {currentPage === "instructions" && <InstructionsPage />}
      {currentPage === "game" && <GamePage />}
    </div>
  );
};

export default CauseEffectGame;
