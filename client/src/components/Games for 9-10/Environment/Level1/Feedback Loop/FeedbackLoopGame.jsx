import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  RotateCcw,
  Star,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import clickSoundFile from "../../Sound/clickSoundFile.mp3";
import clickSoundFileYay from "../../Sound/clickSoundFileYay.mp3";
import clickSoundFileOops from "../../Sound/clickSoundFileOops.mp3";
import confetti from "canvas-confetti";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; 

const FeedbackLoopGame = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [currentPage, setCurrentPage] = useState("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [animateWrong, setAnimateWrong] = useState(false);
  const [showCrash, setShowCrash] = useState(false);
  const [questions, setQuestions] = useState([]);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const toShuffleQuestions = [
    {
      id: 1,
      title: "Climate Warming Loop",
      flowSteps: [
        {
          text: "Increased CO2",
          icon: "🏭",
          color: "from-red-400 to-orange-500",
        },
        {
          text: "Global Warming",
          icon: "🌡️",
          color: "from-orange-400 to-yellow-800",
        },
        {
          text: "More Forest Fires",
          icon: "🔥",
          color: "from-red-500 to-pink-500",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-500 to-gray-700",
          missing: true,
        },
      ],
      correctAnswer: "Release more CO2",
      linkCards: [
        "Release more CO2",
        "Create more oxygen",
        "Cool the atmosphere",
        "Increase rainfall",
      ],
      feedbackType: "positive",
      explanation:
        "This is a POSITIVE feedback loop! Forest fires release more CO2, which causes more warming, creating even more fires - it amplifies the change!",
      crashMessage:
        "Without stopping this cycle, runaway climate change could make large areas of Earth uninhabitable!",
      crashIcon: "🌍💥",
    },
    {
      id: 2,
      title: "Ocean Phytoplankton Loop",
      flowSteps: [
        {
          text: "Warming Oceans",
          icon: "🌊",
          color: "from-blue-400 to-red-400",
        },
        {
          text: "Less Phytoplankton",
          icon: "🦠",
          color: "from-green-400 to-yellow-500",
        },
        {
          text: "Less CO2 Absorbed",
          icon: "⬇️",
          color: "from-blue-500 to-purple-500",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-400",
          missing: true,
        },
      ],
      correctAnswer: "More CO2 in atmosphere",
      linkCards: [
        "More CO2 in atmosphere",
        "Cooler ocean temperatures",
        "More fish in oceans",
        "Cleaner air quality",
      ],
      feedbackType: "positive",
      explanation:
        "Another POSITIVE feedback loop! Less phytoplankton means more CO2 stays in the air, warming oceans even more!",
      crashMessage:
        "Ocean ecosystems could collapse, affecting billions of people who depend on marine food sources!",
      crashIcon: "🐟💀",
    },
    {
      id: 3,
      title: "Air Conditioning Loop",
      flowSteps: [
        {
          text: "Hot Weather",
          icon: "☀️",
          color: "from-yellow-400 to-red-500",
        },
        {
          text: "More AC Usage",
          icon: "❄️",
          color: "from-blue-400 to-cyan-500",
        },
        {
          text: "Higher Electricity Use",
          icon: "⚡",
          color: "from-yellow-500 to-orange-500",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-400",
          missing: true,
        },
      ],
      correctAnswer: "More fossil fuel burning",
      linkCards: [
        "More fossil fuel burning",
        "Cleaner energy production",
        "Less power consumption",
        "Solar panel installation",
      ],
      feedbackType: "positive",
      explanation:
        "POSITIVE feedback strikes again! More fossil fuel burning creates more heat, requiring even more air conditioning!",
      crashMessage:
        "Energy grids could fail during extreme heat waves, leaving millions without cooling when they need it most!",
      crashIcon: "🔌💥",
    },
    {
      id: 4,
      title: "Permafrost Thaw Loop",
      flowSteps: [
        {
          text: "Rising Temperatures",
          icon: "🌡️",
          color: "from-red-400 to-orange-500",
        },
        {
          text: "Permafrost Thawing",
          icon: "🧊",
          color: "from-blue-400 to-white",
        },
        {
          text: "Methane Released",
          icon: "💨",
          color: "from-green-400 to-yellow-500",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-400",
          missing: true,
        },
      ],
      correctAnswer: "Enhanced greenhouse effect",
      linkCards: [
        "Enhanced greenhouse effect",
        "Atmospheric cooling",
        "Ice sheet formation",
        "Reduced gas emissions",
      ],
      feedbackType: "positive",
      explanation:
        "POSITIVE feedback loop! Methane is 25x more powerful than CO2 at trapping heat, making the greenhouse effect even stronger!",
      crashMessage:
        "Massive methane releases could trigger unstoppable climate tipping points!",
      crashIcon: "🌍🔥",
    },
    {
      id: 5,
      title: "Snow Cover Loop",
      flowSteps: [
        {
          text: "Global Warming",
          icon: "🌡️",
          color: "from-red-400 to-orange-500",
        },
        {
          text: "Less Snow Cover",
          icon: "❄️",
          color: "from-white to-blue-300",
        },
        {
          text: "Reduced Reflection",
          icon: "☀️",
          color: "from-yellow-400 to-orange-500",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-400",
          missing: true,
        },
      ],
      correctAnswer: "More heat absorption",
      linkCards: [
        "More heat absorption",
        "Increased snow formation",
        "Better light reflection",
        "Cooler surface temperatures",
      ],
      feedbackType: "positive",
      explanation:
        "POSITIVE feedback loop! Dark surfaces absorb more heat than white snow, accelerating warming even more!",
      crashMessage:
        "Arctic ice could disappear completely, raising sea levels and drowning coastal cities!",
      crashIcon: "🏝️🌊",
    },
    {
      id: 6,
      title: "Ozone Recovery Loop",
      flowSteps: [
        {
          text: "Ban on CFCs",
          icon: "🚫",
          color: "from-green-500 to-blue-500",
        },
        {
          text: "Ozone Layer Heals",
          icon: "🌀",
          color: "from-blue-400 to-purple-400",
        },
        {
          text: "Less UV Reaches Earth",
          icon: "🌤️",
          color: "from-yellow-300 to-green-300",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-400",
          missing: true,
        },
      ],
      correctAnswer: "Less skin cancer risk",
      linkCards: [
        "Less skin cancer risk",
        "More UV exposure",
        "More ozone depletion",
        "Increased global warming",
      ],
      feedbackType: "negative",
      explanation:
        "NEGATIVE feedback loop! Healing the ozone layer reduces UV radiation and improves health outcomes, reversing previous damage.",
      crashMessage:
        "Reversing this trend could bring harmful radiation levels back!",
      crashIcon: "☀️🧴",
    },
    {
      id: 7,
      title: "Plant Growth Loop",
      flowSteps: [
        { text: "Higher CO2", icon: "💨", color: "from-gray-400 to-green-500" },
        {
          text: "Faster Plant Growth",
          icon: "🌱",
          color: "from-green-400 to-green-700",
        },
        {
          text: "More CO2 Absorbed",
          icon: "📉",
          color: "from-blue-300 to-green-300",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-400",
          missing: true,
        },
      ],
      correctAnswer: "Reduced CO2 in atmosphere",
      linkCards: [
        "Reduced CO2 in atmosphere",
        "Less plant growth",
        "Increased emissions",
        "Warming intensifies",
      ],
      feedbackType: "negative",
      explanation:
        "This is a NEGATIVE feedback loop! Plants absorb more CO2, which helps balance atmospheric carbon and slow warming.",
      crashMessage:
        "Deforestation can break this helpful loop, worsening climate change.",
      crashIcon: "🌳💔",
    },
    {
      id: 8,
      title: "Cloud Formation Loop",
      flowSteps: [
        {
          text: "More Evaporation",
          icon: "💧",
          color: "from-blue-400 to-gray-600",
        },
        {
          text: "Increased Cloud Cover",
          icon: "☁️",
          color: "from-white to-gray-700",
        },
        {
          text: "More Sunlight Reflected",
          icon: "🔆",
          color: "from-yellow-300 to-gray-600",
        },
        {
          text: "???",
          icon: "❓",
          color: "from-gray-300 to-gray-700",
          missing: true,
        },
      ],
      correctAnswer: "Cooling effect on Earth",
      linkCards: [
        "Cooling effect on Earth",
        "Higher global warming",
        "Less cloud formation",
        "More solar energy absorbed",
      ],
      feedbackType: "negative",
      explanation:
        "NEGATIVE feedback! More clouds can reflect sunlight, helping cool the Earth and reduce warming effects.",
      crashMessage: "Loss of cloud formation could accelerate climate heating.",
      crashIcon: "☁️🔥",
    },
  ];

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    playClickSound(clickSoundRefPop);
  };

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedCard === currentQ.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      playClickSound(clickSoundRefYay);
    } else {
      setAnimateWrong(true);
      setShowCrash(true);
      setTimeout(() => {
        setAnimateWrong(false);
        setShowCrash(false);
      }, 3000);
      playClickSound(clickSoundRefOops);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedCard(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedCard(null);
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
    const shuffledQuestions = [...toShuffleQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (score < 8 || !gameComplete) {
      return;
    }
    completeEnvirnomentChallenge(0, 1); // ✅ Add this line here
    const myCanvas = canvasRef.current;
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 }, // left of container
        colors,
      });

      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 }, // right of container
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, [score, gameComplete]);

  useEffect(() => {
    if (!gameComplete) return;

    const studyTimeMinutes = Math.round((Date.now() - startTime) / 60000);
    const avgResponseTimeSec = Math.round((Date.now() - startTime) / 1000 / questions.length); // simple average
    const accuracy = (score / questions.length) * 100;
    const scaledScore = (score / questions.length) * 10;

    updatePerformance({
      moduleName: "Environment",
      topicName: "climateAnalyst",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: score >= 8,
      
    });
    setStartTime(Date.now());

  }, [gameComplete, score]);


  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-12 max-w-2xl w-full text-center shadow-2xl">
        <div className="text-6xl md:text-8xl mb-6 animate-spin-slow">🔄</div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Feedback Loop
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">
          Fix Challenge! 🎯
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Environmental systems are full of feedback loops that can amplify or
          stabilize changes! Can you complete the missing links and understand
          how Earth's systems connect? 🌍
        </p>
        <button
          onClick={() => setCurrentPage("instructions")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
        >
          Start Challenge! <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const InstructionsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 max-w-4xl w-full shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl md:text-6xl mb-4">🔧</div>
          <h2 className="text-2xl md:text-4xl font-bold text-blue-800 mb-4">
            How to Fix Feedback Loops
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-2xl border-l-4 border-blue-400">
            <h3 className="font-bold text-lg md:text-xl text-blue-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Your Mission
            </h3>
            <p className="text-gray-700 text-base md:text-lg">
              Complete broken feedback loops by finding the missing link! Each
              loop shows how environmental changes create chain reactions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border-l-4 border-green-400">
            <h3 className="font-bold text-lg md:text-xl text-green-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔄</span> Feedback Types
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base">
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📈</span>
                  <span className="font-bold text-red-700">
                    POSITIVE Feedback
                  </span>
                </div>
                <p className="text-gray-600">
                  Amplifies change - makes things grow bigger/faster!
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚖️</span>
                  <span className="font-bold text-blue-700">
                    NEGATIVE Feedback
                  </span>
                </div>
                <p className="text-gray-600">
                  Stabilizes change - keeps things balanced!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border-l-4 border-orange-400">
            <h3 className="font-bold text-lg md:text-xl text-orange-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎮</span> How to Play
            </h3>
            <ol className="text-gray-700 text-base md:text-lg space-y-2 list-decimal list-inside">
              <li>
                Study the <strong>flow diagram</strong> with the missing link
              </li>
              <li>
                Choose the correct <strong>Link Card</strong> from the options
              </li>
              <li>See if you can complete the feedback loop!</li>
              <li>
                Learn about <strong>positive vs negative</strong> feedback
              </li>
              <li>
                Watch out for <strong>System Crashes</strong> if you're wrong!
                💥
              </li>
            </ol>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
          >
            Fix the Loops! <Zap className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const GamePage = () => {
    const currentQ = questions[currentQuestion];

    if (gameComplete) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-4 ">
          <div className="bg-white/95 backdrop-blur-sm relative rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl">
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              {`${score < 7
                ? "Keep Trying"
                : score < 8
                  ? "Well done"
                  : "Outstanding, Champ"
                }`}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              You fixed {score} out of {questions.length} loops!
            </p>
            <div className="text-lg text-gray-600 mb-8">
              {score === questions.length
                ? "Perfect! You understand feedback systems completely! 🌟"
                : score >= questions.length * 0.7
                  ? "Great job! You're getting the hang of feedback loops! 🔄"
                  : "Good effort! Environmental systems are complex - keep learning! 🌱"}
            </div>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
            >
              Play Again! <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      );
    }

    if (showCrash) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl animate-pulse">
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">
              {currentQ.crashIcon}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
              System Crash! 💥
            </h2>
            <div className="bg-red-100 rounded-2xl p-6 mb-6">
              <p className="text-lg md:text-xl text-red-800 leading-relaxed">
                {currentQ.crashMessage}
              </p>
            </div>
            <div className="text-lg text-gray-600">
              Let's see the correct answer...
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="text-lg md:text-xl font-bold text-purple-800">
                Loop {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-lg md:text-xl font-bold text-green-800 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Fixed: {score}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {!showResult ? (
            <div className="space-y-6">
              {/* Loop Title */}
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {currentQ.title}
                </h2>
                <p className="text-lg text-white/80">
                  Find the missing link to complete the feedback loop!
                </p>
              </div>

              {/* Flow Diagram */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
                  {currentQ.flowSteps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`bg-gradient-to-br ${step.color
                          } rounded-2xl p-4 md:p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300 ${step.missing ? "animate-pulse" : ""
                          }`}
                      >
                        <div className="text-3xl md:text-4xl mb-2">
                          {step.icon}
                        </div>
                        <div className="text-sm md:text-base font-bold text-white">
                          {step.text}
                        </div>
                      </div>
                      {index < currentQ.flowSteps.length - 1 && (
                        <div className="hidden md:flex justify-center">
                          <ArrowRight className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                      {index < currentQ.flowSteps.length - 1 && (
                        <div className="md:hidden flex justify-center py-2">
                          <ArrowRight className="w-6 h-6 text-purple-600 rotate-90" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Loop back arrow */}
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2 text-purple-600 font-bold">
                    <RefreshCw className="w-6 h-6" />
                    <span className="text-sm md:text-base">Feedback Loop</span>
                  </div>
                </div>
              </div>

              {/* Link Cards */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-center text-purple-800 mb-6 flex items-center justify-center gap-2">
                  🧩 Choose the Missing Link
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQ.linkCards.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleCardSelect(card)}
                      className={`p-4 md:p-6 rounded-2xl font-semibold text-left transition-all duration-300 transform hover:scale-105 ${selectedCard === card
                        ? "bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-lg scale-105"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 text-gray-700"
                        } ${animateWrong && selectedCard === card
                          ? "animate-pulse bg-red-400"
                          : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔗</span>
                        <span className="text-sm md:text-base">{card}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedCard && (
                  <div className="text-center mt-6 animate-fadeIn">
                    <button
                      onClick={checkAnswer}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Fix the Loop! 🔧
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl">
              {selectedCard === currentQ.correctAnswer ? (
                <div className="text-center">
                  <div className="text-6xl md:text-8xl mb-6 animate-bounce">
                    🎉
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    Loop Fixed!
                  </h3>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h4 className="font-bold text-lg md:text-xl text-green-800">
                        Understanding Feedback
                      </h4>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      {currentQ.explanation}
                    </p>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full inline-block font-bold">
                      {currentQ.feedbackType.toUpperCase()} FEEDBACK LOOP
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <XCircle className="w-6 h-6 text-red-600" />
                      <h4 className="font-bold text-lg md:text-xl text-red-800">
                        The Correct Loop
                      </h4>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      {currentQ.explanation}
                    </p>
                    <div className="bg-white/80 rounded-xl p-4">
                      <p className="text-sm md:text-base text-gray-600">
                        <strong>Correct Answer:</strong>{" "}
                        {currentQ.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Loop"
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
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {currentPage === "welcome" && <WelcomePage />}
      {currentPage === "instructions" && <InstructionsPage />}
      {currentPage === "game" && <GamePage />}
    </div>
  );
};

export default FeedbackLoopGame;
