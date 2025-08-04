import React, { useState, useEffect, useRef } from "react";
import { Clock, Star, Trophy, RefreshCw, Play, Home } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const CrimeCivilGame = () => {
  const { completeLawChallenge } = useLaw();
  const [currentPage, setCurrentPage] = useState("home");
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [gameState, setGameState] = useState("waiting"); // waiting, playing, finished
  const [currentScenario, setCurrentScenario] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZoneHighlight, setDropZoneHighlight] = useState("");
  const timerRef = useRef(null);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (currentPage === "results") {
      completeLawChallenge(1, 0);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== "results") return;

    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 60000); // in minutes
    const totalQuestions = answers.length;
    const scaledScore = (score / totalQuestions) * 10; // score out of 10
    const accuracy = Math.round((score / totalQuestions) * 100); // out of 100
    const avgResponseTimeSec = Math.round((endTime - startTime) / (1000 * totalQuestions));

    updatePerformance({
      moduleName: "Law",
      topicName: "constitutionalRights",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes: timeSpent,
      completed: true
    });
    setStartTime(Date.now());

  }, [currentPage]);


  const scenarios = [
    {
      id: 1,
      text: "A driver intentionally runs over someone.",
      correctAnswer: "crime",
      explanation: "Intentional harm → offense against society",
    },
    {
      id: 2,
      text: "A neighbor builds a wall blocking your sunlight.",
      correctAnswer: "civil",
      explanation: "Property dispute → affects individual rights",
    },
    {
      id: 3,
      text: "Someone steals ₹5,000 from your bag.",
      correctAnswer: "crime",
      explanation: "Theft → criminal offense",
    },
    {
      id: 4,
      text: "A shopkeeper sells spoiled milk.",
      correctAnswer: "both",
      explanation:
        "Consumer protection (civil) & food safety law violation (crime)",
    },
    {
      id: 5,
      text: "A person spreads false rumors about a colleague damaging their reputation.",
      correctAnswer: "civil",
      explanation: "Defamation → civil tort",
    },
    {
      id: 6,
      text: "A tenant refuses to pay rent to the landlord.",
      correctAnswer: "civil",
      explanation: "Breach of contract between tenant and landlord",
    },
    {
      id: 7,
      text: "A hacker steals your bank account details online.",
      correctAnswer: "crime",
      explanation: "Cybercrime → criminal offense",
    },
    {
      id: 8,
      text: "A factory pollutes a river affecting nearby villagers' health.",
      correctAnswer: "crime",
      explanation: "Environmental crime affecting public health",
    },
    {
      id: 9,
      text: "Someone accidentally breaks your phone and offers to pay.",
      correctAnswer: "civil",
      explanation: "Negligence, accidental damage → civil remedy",
    },
    {
      id: 10,
      text: "A company fires an employee without notice or reason.",
      correctAnswer: "civil",
      explanation: "Employment dispute, wrongful termination",
    },
  ];

  const challenges = {
    rookie: {
      name: "Rookie Round",
      subtitle: "Basics of Crime vs Civil",
      scenarios: 5,
      timePerCard: 15,
      color: "from-blue-400 to-purple-600",
    },
    blitz: {
      name: "Blitz Round",
      subtitle: "Speed & Accuracy Challenge",
      scenarios: 10,
      timePerCard: 9,
      color: "from-red-400 to-pink-600",
    },
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTotalTime(totalTime + 1);
      }, 1000);
    } else if (gameState === "playing" && timeLeft === 0) {
      handleTimeUp();
    }

    return () => clearTimeout(timerRef.current);
  }, [gameState, timeLeft, totalTime]);

  const startChallenge = (type) => {
    setCurrentChallenge(type);
    setCurrentScenario(0);
    setScore(0);
    setAnswers([]);
    setTotalTime(0);
    const challenge = challenges[type];
    setTimeLeft(challenge.timePerCard);
    setGameState("playing");
    setCurrentPage("game");
  };

  const handleTimeUp = () => {
    // Auto-assign wrong answer for timeout
    const newAnswers = [...answers];
    newAnswers[currentScenario] = {
      scenario: scenarios[currentScenario],
      userAnswer: null,
      correct: false,
      timedOut: true,
    };
    setAnswers(newAnswers);

    nextScenario(newAnswers);
  };

  const nextScenario = (currentAnswers) => {
    const challenge = challenges[currentChallenge];

    if (currentScenario + 1 >= challenge.scenarios) {
      // Game finished

      setGameState("finished");
      setCurrentPage("results");

      // Calculate final score
      const correctAnswers = currentAnswers.filter((a) => a.correct).length;
      let finalScore = correctAnswers;

      // // Bonus points for "both" answers
      // currentAnswers.forEach((answer) => {
      //   if (answer.correct && answer.userAnswer === "both") {
      //     finalScore += 1; // Extra point for bonus answers
      //   }
      // });

      // // Penalty for wrong "both" answers in blitz mode
      // if (currentChallenge === "blitz") {
      //   currentAnswers.forEach((answer) => {
      //     if (!answer.correct && answer.userAnswer === "both") {
      //       finalScore -= 1;
      //     }
      //   });
      // }

      setScore(finalScore);
      setTotalScore(totalScore + finalScore);
    } else {
      // Next scenario
      setCurrentScenario(currentScenario + 1);
      setTimeLeft(challenge.timePerCard);
    }
  };

  const handleDrop = (dropZone, e) => {
    e.preventDefault();
    setDropZoneHighlight("");

    if (!draggedItem) return;

    const scenario = scenarios[currentScenario];
    const isCorrect = scenario.correctAnswer === dropZone;

    const newAnswers = [...answers];
    newAnswers[currentScenario] = {
      scenario: scenario,
      userAnswer: dropZone,
      correct: isCorrect,
      timedOut: false,
    };
    setAnswers(newAnswers);

    setDraggedItem(null);

    // Small delay to show feedback, then move to next
    setTimeout(() => {
      nextScenario(newAnswers);
    }, 1000);
  };

  const handleDragStart = (e) => {
    setDraggedItem(scenarios[currentScenario]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (dropZone) => {
    setDropZoneHighlight(dropZone);
  };

  const handleDragLeave = () => {
    setDropZoneHighlight("");
  };

  const resetGame = () => {
    setCurrentPage("home");
    setCurrentChallenge(null);
    setGameState("waiting");
    setCurrentScenario(0);
    setTimeLeft(0);
    setTotalTime(0);
    setScore(0);
    setAnswers([]);
    setDraggedItem(null);
    setDropZoneHighlight("");
    setStartTime(Date.now());

  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const x = currentChallenge;

    if (currentPage !== "results") return;

    const myCanvas = canvasRef.current;
    if (!myCanvas) return;

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#61dc23", "#fd8bbc", "#eca184", "#f8deb1"];
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors,
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
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

    return () => {
      clearInterval(interval);
    };
  }, [currentPage, canvasRef, currentChallenge]);

  // Home Page
  if (currentPage === "home") {
    return (
      <div
        className="min-h-screen bg-orange-200  p-4"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <div className="w-[90%] rounded-2xl shadow-2xl p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
              🏛️ Law Detective Game! 🕵️
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              Crime or Civil? - Drag & Drop Showdown
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-white font-semibold">
                Total Score:{" "}
                <span className="text-yellow-300 text-2xl">{totalScore}</span>{" "}
                ⭐
              </p>
            </div>
          </div>

          {/* Challenge Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {Object.entries(challenges).map(([key, challenge]) => (
              <div
                key={key}
                className={`bg-gradient-to-r ${challenge.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => startChallenge(key)}
              >
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {challenge.name}
                  </h3>
                  <p className="text-lg mb-4 opacity-90">
                    {challenge.subtitle}
                  </p>

                  <div className="space-y-2 text-sm md:text-base">
                    <div className="flex items-center justify-center space-x-2">
                      <span>📊 Scenarios: {challenge.scenarios}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Clock size={16} />
                      <span>{challenge.timePerCard}s per card</span>
                    </div>
                  </div>

                  <button className="mt-4 bg-white text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center mx-auto space-x-2">
                    <Play size={20} />
                    <span>Start Challenge!</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-center">
              🎯 How to Play
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-4xl">🏃‍♂️</div>
                <p className="font-semibold">Drag & Drop</p>
                <p className="text-sm">
                  Drag scenarios to the correct box before time runs out!
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">⚡</div>
                <p className="font-semibold">Beat the Clock</p>
                <p className="text-sm">Quick thinking gets you bonus points!</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">🏆</div>
                <p className="font-semibold">Score High</p>
                <p className="text-sm">
                  Get "Both" answers right for extra points!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Page
  if (currentPage === "game") {
    const challenge = challenges[currentChallenge];
    const scenario = scenarios[currentScenario];
    const progress = (currentScenario / challenge.scenarios) * 100;

    return (
      <div
        className="min-h-screen bg-orange-200 p-4"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <div className="w-[90%] rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 shadow-2xl p-4 mx-auto">
          {/* Game Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {challenge.name}
                </h2>
                <p className="text-gray-600">
                  Question {currentScenario + 1} of {challenge.scenarios}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                  <Clock size={20} />
                  <span className="text-xl font-bold">{timeLeft}s</span>
                </div>
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full">
                  <span className="font-bold">Score: {score}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario Card */}
          <div className="mb-8">
            <div
              className="bg-white max-w-[40%] mx-auto rounded-2xl p-6 shadow-2xl cursor-move transform hover:scale-105 transition-all duration-300 border-4 border-dashed border-gray-300"
              draggable
              onDragStart={handleDragStart}
            >
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  📋 Drag this scenario to the correct box!
                </h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {scenario.text}
                </p>
                <div className="mt-4 text-gray-500">
                  <span className="text-sm">🖱️ Click and drag me!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drop Zones */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Crime Box */}
            <div
              className={`bg-red-500 rounded-2xl p-6 text-white text-center min-h-40 flex flex-col justify-center transform transition-all duration-300 ${dropZoneHighlight === "crime"
                ? "scale-110 bg-red-400 shadow-2xl"
                : "hover:scale-105"
                }`}
              onDrop={(e) => handleDrop("crime", e)}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter("crime")}
              onDragLeave={handleDragLeave}
            >
              <div className="text-6xl mb-4">🚨</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">CRIME</h3>
              <p className="text-sm md:text-base opacity-90">
                Offenses against society
              </p>
            </div>

            {/* Civil Box */}
            <div
              className={`bg-blue-500 rounded-2xl p-6 text-white text-center min-h-40 flex flex-col justify-center transform transition-all duration-300 ${dropZoneHighlight === "civil"
                ? "scale-110 bg-blue-400 shadow-2xl"
                : "hover:scale-105"
                }`}
              onDrop={(e) => handleDrop("civil", e)}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter("civil")}
              onDragLeave={handleDragLeave}
            >
              <div className="text-6xl mb-4">⚖️</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                CIVIL WRONG
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Private disputes
              </p>
            </div>

            {/* Both Box */}
            <div
              className={`bg-green-500 rounded-2xl p-6 text-white text-center min-h-40 flex flex-col justify-center transform transition-all duration-300 ${dropZoneHighlight === "both"
                ? "scale-110 bg-green-400 shadow-2xl"
                : "hover:scale-105"
                }`}
              onDrop={(e) => handleDrop("both", e)}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter("both")}
              onDragLeave={handleDragLeave}
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                BONUS: BOTH
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Can be both types
              </p>
              <div className="mt-2 text-yellow-300 font-bold">+2 Points!</div>
            </div>
          </div>

          {/* Exit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={resetGame}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors duration-300 flex items-center mx-auto space-x-2"
            >
              <Home size={20} />
              <span>Exit Game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Page
  if (currentPage === "results") {
    const correctAnswers = answers.filter((a) => a.correct).length;
    const accuracy = Math.round((correctAnswers / answers.length) * 100);
    console.log(score, answers, correctAnswers);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4">
        <div
          className="w-[90%] max-w-4xl p-4 rounded-3xl shadow-2xl mx-auto relative bg-gradient-to-br from-pink-300 via-indigo-400 to-purple-400 border-4 border-white"
          style={{ fontFamily: "'Comic Neue', cursive" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          />

          {/* Game Complete Header */}
          <div className="text-center mb-6 pt-10">
            <div className="text-5xl md:text-6xl text-yellow-100 font-extrabold drop-shadow-lg animate-bounce">
              🎉 Game Complete!
            </div>
            {(currentChallenge === "rookie" ? score === 5 : score === 10) && (
              <div className="text-6xl mb-2 animate-bounce mt-2">🏆</div>
            )}
            <motion.div
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-xl md:text-2xl font-semibold text-white mb-6 z-20"
            >
              {currentChallenge === "rookie"
                ? score === 5
                  ? "Congratulations Champ!"
                  : score === 4
                    ? "Well done!"
                    : "Keep practicing!"
                : score === 10
                  ? "You're a Star!"
                  : score >= 8
                    ? "Well done!"
                    : "You can do better!"}
            </motion.div>

            {/* Summary Box */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-md">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-extrabold text-blue-600">
                    {correctAnswers}/{answers.length}
                  </div>
                  <div className="text-sm text-gray-700">Game Score</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-green-600">
                    {correctAnswers}
                  </div>
                  <div className="text-sm text-gray-700">Correct</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-purple-600">
                    {accuracy}%
                  </div>
                  <div className="text-sm text-gray-700">Accuracy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-md">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
              📊 Your Answers
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${answer.correct
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        {answer.scenario.text}
                      </p>
                      <div className="text-sm space-y-1 text-gray-700">
                        <p>
                          <strong>Your answer:</strong>{" "}
                          {answer.timedOut
                            ? "⏰ Timed out"
                            : answer.userAnswer?.toUpperCase() || "None"}
                        </p>
                        <p>
                          <strong>Correct answer:</strong>{" "}
                          {answer.scenario.correctAnswer.toUpperCase()}
                        </p>
                        <p className="italic text-gray-600">
                          {answer.scenario.explanation}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl">
                      {answer.correct ? "✅" : "❌"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pb-6">
            <button
              onClick={() => startChallenge(currentChallenge)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw size={24} />
              <span>Play Again</span>
            </button>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Home size={24} />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CrimeCivilGame;
