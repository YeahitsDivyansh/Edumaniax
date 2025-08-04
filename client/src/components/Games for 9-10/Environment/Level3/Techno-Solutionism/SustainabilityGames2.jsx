import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  TreePine,
  Zap,
  Car,
  Droplets,
  Sun,
  Building,
  Recycle,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Home,
  Star,
} from "lucide-react";

import clickSoundFile from "../../Sound/clickSoundFile.mp3";
import clickSoundFileYay from "../../Sound/clickSoundFileYay.mp3";
import clickSoundFileOops from "../../Sound/clickSoundFileOops.mp3";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";


const SustainabilityGames2 = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [currentPage, setCurrentPage] = useState("home");
  const [currentGame, setCurrentGame] = useState("infrastructure");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  const [totalResponseTime, setTotalResponseTime] = useState(0);

  const infrastructureQuestions = [
    {
      question:
        "Which infrastructure project contributes more to long-term sustainability?",
      scenario:
        "A city wants to beautify its downtown area. They're considering two options:",
      options: [
        "Building decorative fountains in the plaza",
        "Installing vertical gardens on building walls",
      ],
      correct: 1,
      explanation:
        "Vertical gardens improve air quality, provide insulation, and create habitats for wildlife!",
      icon: <TreePine className="w-8 h-8" />,
    },
    {
      question: "Which option creates a more sustainable urban environment?",
      scenario:
        "The city council is planning street improvements. They need to choose between:",
      options: [
        "Planting trees along all major streets",
        "Installing bright LED billboards for advertising",
      ],
      correct: 0,
      explanation:
        "Tree-lined streets clean the air, provide shade, reduce heat, and create a healthier environment!",
      icon: <TreePine className="w-8 h-8" />,
    },
    {
      question:
        "Which transportation infrastructure is better for sustainability?",
      scenario:
        "Traffic is increasing in the city. The mayor must decide between:",
      options: [
        "Building dedicated bike lanes throughout the city",
        "Making roads wider to accommodate more cars",
      ],
      correct: 0,
      explanation:
        "Bike lanes reduce pollution, promote health, and create safer streets for everyone!",
      icon: <Car className="w-8 h-8" />,
    },
    {
      question: "Which water management system is more sustainable?",
      scenario:
        "The city needs to improve its water infrastructure. They're debating between:",
      options: [
        "Building new decorative swimming pools in parks",
        "Installing water reuse and recycling systems",
      ],
      correct: 1,
      explanation:
        "Water reuse systems conserve precious water resources and reduce waste!",
      icon: <Droplets className="w-8 h-8" />,
    },
    {
      question: "Which energy infrastructure choice is more sustainable?",
      scenario:
        "New buildings are being constructed. The architect must choose between:",
      options: [
        "Designing tall glass skyscrapers with lots of windows",
        "Installing solar panels on all rooftops",
      ],
      correct: 1,
      explanation:
        "Solar rooftops generate clean, renewable energy and reduce dependence on fossil fuels!",
      icon: <Sun className="w-8 h-8" />,
    },
  ];

  const technoSolutionismQuestions = [
    {
      question: "Is this a real solution or just a tech illusion?",
      scenario:
        "A polluted city introduces self-driving cars but doesn't reduce the total number of vehicles or address emissions:",
      options: [
        "This is a real solution to urban pollution",
        "This is a tech illusion - it doesn't solve the core problem",
      ],
      correct: 1,
      explanation:
        "Self-driving cars don't reduce pollution if there are still the same number of polluting vehicles!",
      icon: <Car className="w-8 h-8" />,
    },
    {
      question: "Which approach better addresses air quality?",
      scenario:
        "A company suggests putting air purifiers in every room instead of planting trees in the city:",
      options: [
        "Planting trees - nature's solution is more effective",
        "Air purifiers in every room - modern technology is better",
      ],
      correct: 0,
      explanation:
        "Trees are nature's air purifiers AND provide oxygen, habitat, shade, and beauty!",
      icon: <TreePine className="w-8 h-8" />,
    },
    {
      question: "Which solution addresses traffic problems more sustainably?",
      scenario:
        "A city faces traffic congestion. They're considering two approaches:",
      options: [
        "Installing AI-powered traffic signals to optimize car flow",
        "Expanding public transportation (buses, trains, metros)",
      ],
      correct: 1,
      explanation:
        "Public transport reduces the number of cars on roads - much better than just managing more cars!",
      icon: <Car className="w-8 h-8" />,
    },
    {
      question: "Which approach to climate change is more effective?",
      scenario:
        "To fight climate change, a company proposes two different strategies:",
      options: [
        "Building expensive carbon-capture machines to remove CO2 from air",
        "Reducing emissions at the source by using renewable energy",
      ],
      correct: 1,
      explanation:
        "Prevention is always better than trying to fix the problem after it's created!",
      icon: <Recycle className="w-8 h-8" />,
    },
    {
      question: "How should you respond to this sustainability claim?",
      scenario:
        "A company's advertisement claims their product is 'eco-friendly' but provides no data or proof:",
      options: [
        "Be suspicious - this could be greenwashing without proof",
        "Trust the company - they wouldn't lie about being eco-friendly",
      ],
      correct: 0,
      explanation:
        "Always look for real data, certifications, and proof when companies claim to be sustainable!",
      icon: <AlertTriangle className="w-8 h-8" />,
    },
  ];

  const gameInstructions = {
    infrastructure: {
      title: "Infrastructure Showdown",
      description:
        "Help build a sustainable city by choosing the best infrastructure projects!",
      rules: [
        "You'll see different infrastructure scenarios",
        "Choose which option contributes more to long-term sustainability",
        "Think about environmental impact, community benefits, and future generations",
        "Get points for each correct answer!",
      ],
    },
    techno: {
      title: "Tech Detective",
      description:
        "Become a detective and spot when technology is oversold as a magic solution!",
      rules: [
        "You'll see different technology scenarios",
        "Identify if it's a real solution or just tech illusion",
        "Look for solutions that address root problems, not just symptoms",
        "Watch out for greenwashing - false environmental claims!",
      ],
    },
  };

  const startGame = (gameType) => {
    setCurrentGame(gameType);
    setShowInstructions(true);
    setScore(0);
    setQuestionIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameCompleted(false);
    setStartTime(Date.now());

  };

  const startQuestions = () => {
    setShowInstructions(false);
    setCurrentPage("game");
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

  const handleAnswer = (answerIndex) => {
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000; // in seconds
    setTotalResponseTime((prev) => prev + responseTime);

    setSelectedAnswer(answerIndex);
    const questions =
      currentGame === "infrastructure"
        ? infrastructureQuestions
        : technoSolutionismQuestions;
    const isCorrect = answerIndex === questions[questionIndex].correct;

    if (isCorrect) {
      setScore(score + 1);
      playClickSound(clickSoundRefYay);
    } else {
      playClickSound(clickSoundRefOops);
    }

    setShowResult(true);

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameCompleted(true);
      }
    }, 3500);
  };


  const resetGame = () => {
    setCurrentPage("home");
    setCurrentGame(null);
    setScore(0);
    setQuestionIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameCompleted(false);
    setShowInstructions(false);
    setStartTime(Date.now());

  };

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!gameCompleted) return;

    const totalQuestions = currentGame === "infrastructure"
      ? infrastructureQuestions.length
      : technoSolutionismQuestions.length;

    const accuracy = (score / totalQuestions) * 100;
    const scaledScore = Math.round((score / totalQuestions) * 10);
    const avgResponseTimeSec = totalResponseTime / totalQuestions;
    const studyTimeMinutes = (Date.now() - startTime) / 60000;

    updatePerformance({
      moduleName: "Environment",
      topicName: "sustainableLeader",
      score: scaledScore,
      accuracy: parseFloat(accuracy.toFixed(2)),
      avgResponseTimeSec: parseFloat(avgResponseTimeSec.toFixed(2)),
      studyTimeMinutes: parseFloat(studyTimeMinutes.toFixed(2)),
      completed: true,
      
    });
  }, [gameCompleted]);


  useEffect(() => {
    if (score < 5 || !gameCompleted) {
      return;
    }

    completeEnvirnomentChallenge(2, 1);

    // Use the default confetti (full screen)
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    frame();
  }, [score, gameCompleted]);

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-bounce">
            🌱 Eco Champions 🌱
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Learn about sustainability through fun games!
          </p>
        </div>

        <div
          onClick={() => startGame("techno")}
          className="bg-gradient-to-br from-pink-400 via-yellow-300 to-blue-400 rounded-3xl p-6 sm:p-8 border-4 border-white/30 cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-pink-200"
        >
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-yellow-400 p-4 rounded-full animate-bounce shadow-md hover:rotate-6 transition-all duration-300">
                <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-pink-700" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 drop-shadow-md mb-4">
              Tech Detective
            </h2>
            <p className="text-purple-950 mb-6 text-sm sm:text-base font-medium">
              Spot when technology is oversold as a solution without addressing
              root issues!
            </p>
            <div className="flex items-center justify-center text-white">
              <span className="mr-2 bg-black px-5 py-3 rounded-2xl  font-bold text-lg hover:rotate-3 hover:shadow-black hover:shadow-2xl transition-all duration-200 ease-in-out">
                Start Game
              </span>
              <ChevronRight className="w-5 h-5 animate-bounce text-yellow-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InstructionsPage = () => {
    const instructions = gameInstructions[currentGame];
    return (
      <div
        className={`min-h-screen p-4 flex items-center justify-center ${currentGame === "infrastructure"
          ? "bg-gradient-to-br from-green-400 via-teal-500 to-blue-600"
          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
          }`}
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border-4 border-white/50">
          <div className="text-center mb-6">
            <div
              className={`inline-block p-4 rounded-full mb-4 ${currentGame === "infrastructure"
                ? "bg-green-500"
                : "bg-purple-500"
                }`}
            >
              {currentGame === "infrastructure" ? (
                <Building className="w-12 h-12 text-white" />
              ) : (
                <Brain className="w-12 h-12 text-white" />
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {instructions.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {instructions.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📋 How to Play:
            </h2>
            <div className="space-y-3">
              {instructions.rules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${currentGame === "infrastructure"
                      ? "bg-green-500"
                      : "bg-purple-500"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300"
            >
              ← Back to Games
            </button>
            <button
              onClick={startQuestions}
              className={`px-8 py-3 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 ${currentGame === "infrastructure"
                ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }`}
            >
              Start Playing! 🎮
            </button>
          </div>
        </div>
      </div>
    );
  };

  const GamePage = () => {
    const questions =
      currentGame === "infrastructure"
        ? infrastructureQuestions
        : technoSolutionismQuestions;
    const currentQuestion = questions[questionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;

    if (gameCompleted) {
      const percentage = Math.round((score / questions.length) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-800 via-indigo-500 p-4 flex items-center justify-center relative">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-center border-4 border-yellow-300">
            <div className="mb-6">
              {score === questions.length ? (
                <div className="text-6xl mb-4 animate-bounce">🏆</div>
              ) : score >= questions.length * 0.7 ? (
                <div className="text-6xl mb-4 animate-bounce">⭐</div>
              ) : (
                <div className="text-6xl mb-4 animate-bounce"></div>
              )}
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
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              {currentGame === "infrastructure"
                ? "Infrastructure Challenge Complete!"
                : "Detective Mission Complete!"}
            </motion.h2>

            <div className="bg-gray-100 rounded-2xl p-4 mb-6">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {score} / {questions.length}
              </div>
              <div className="flex justify-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < Math.floor(percentage / 20)
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 0.9 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-xl text-gray-600 mb-6"
            >
              {score === questions.length
                ? "Perfect! You're a true Eco Champion! 🌱"
                : score >= questions.length * 0.7
                  ? "Excellent work! You're learning fast! 🚀"
                  : "Keep practicing to become an expert! 💪"}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transform transition-all duration-300"
              >
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </button>
              <button
                onClick={() => {
                  setScore(0);
                  setQuestionIndex(0);
                  setShowResult(false);
                  setSelectedAnswer(null);
                  setGameCompleted(false);
                }}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transform transition-all duration-300"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`min-h-screen p-4 ${currentGame === "infrastructure"
          ? "bg-gradient-to-br from-green-400 via-teal-500 to-blue-600"
          : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
          }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={resetGame}
                className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all"
              >
                ← Back
              </button>
              <div className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full font-bold">
                Question {questionIndex + 1} of {questions.length}
              </div>
              <div className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full font-bold">
                Score: {score}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              {currentGame === "infrastructure"
                ? "🏗️ Infrastructure Showdown"
                : "🕵️ Tech Detective"}
            </h1>
          </div>

          {/* Question Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-6 border-4 border-white/50">
            <div className="text-center mb-6">
              <div
                className={`inline-block p-4 rounded-full mb-4 ${currentGame === "infrastructure"
                  ? "bg-green-100"
                  : "bg-purple-100"
                  }`}
              >
                {currentQuestion.icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                {currentQuestion.question}
              </h2>
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>Scenario:</strong> {currentQuestion.scenario}
                </p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid gap-4 sm:gap-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`p-4 sm:p-6 rounded-2xl border-3 font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 text-left ${showResult
                    ? index === currentQuestion.correct
                      ? "bg-green-500 text-white border-green-600 animate-pulse"
                      : selectedAnswer === index
                        ? "bg-red-500 text-white border-red-600"
                        : "bg-gray-200 text-gray-500 border-gray-300"
                    : currentGame === "infrastructure"
                      ? "bg-green-100 hover:bg-green-200 border-green-300 text-green-800"
                      : "bg-purple-100 hover:bg-purple-200 border-purple-300 text-purple-800"
                    }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center font-bold text-white ${currentGame === "infrastructure"
                        ? "bg-green-500"
                        : "bg-purple-500"
                        }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Result Popup */}
          {showResult && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div
                className={`bg-white rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-center transform animate-bounce ${isCorrect
                  ? "border-4 border-green-500"
                  : "border-4 border-red-500"
                  }`}
              >
                <div className="mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-spin" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
                  )}
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 ${isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {isCorrect ? "🎉 Correct!" : "😔 Oops!"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {currentQuestion.explanation}
                </p>
                <div className="text-sm text-gray-500">
                  {questionIndex < questions.length - 1
                    ? "Next question coming up..."
                    : "Calculating final score..."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (showInstructions) {
    return <InstructionsPage />;
  }

  return (
    <div className="font-sans">
      {currentPage === "home" && <HomePage />}
      {currentPage === "game" && <GamePage />}
    </div>
  );
};

export default SustainabilityGames2;
