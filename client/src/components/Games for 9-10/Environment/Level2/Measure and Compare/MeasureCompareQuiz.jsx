import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Star, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { usePerformance } from "@/contexts/PerformanceContext";
import clickSoundFileYay from "../../Sound/clickSoundFileYay.mp3";
import clickSoundFileOops from "../../Sound/clickSoundFileOops.mp3";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";

const MeasureCompareQuiz = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [currentPage, setCurrentPage] = useState("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  const questions = [
    {
      id: 1,
      question:
        "A country with high literacy, long life expectancy, but huge deforestation – sustainable or not?",
      options: [
        "Sustainable",
        "Partially sustainable",
        "Not sustainable",
        "Need more data",
      ],
      correct: "Not sustainable",
      explanation:
        "Despite good social indicators, huge deforestation makes it environmentally unsustainable!",
    },
    {
      id: 2,
      question:
        "Country X uses solar power widely but lacks clean water access. HDI or Ecological Footprint?",
      options: [
        "Ecological Footprint is better",
        "HDI is better",
        "Both are equal",
        "Neither is good",
      ],
      correct: "Ecological Footprint is better",
      explanation:
        "Good environmental practices but poor human development - Ecological Footprint is better, HDI is low!",
    },
    {
      id: 3,
      question: "A country reduces its emissions but GDP drops. What improves?",
      options: [
        "Economic growth",
        "Population growth",
        "Nothing improves",
        "Ecological sustainability",
      ],
      correct: "Ecological sustainability",
      explanation:
        "Lower emissions mean better environmental health - ecological sustainability improves!",
    },
    {
      id: 4,
      question:
        "Country Y imports all its goods, keeping domestic emissions low. Is that fully sustainable?",
      options: [
        "No, emissions are outsourced",
        "Yes, very sustainable",
        "Partially sustainable",
        "Depends on imports",
      ],
      correct: "No, emissions are outsourced",
      explanation:
        "Just moving pollution elsewhere isn't truly sustainable - emissions are outsourced!",
    },
    {
      id: 5,
      question:
        "Country A has low emissions but high infant mortality. HDI status?",
      options: ["High HDI", "Medium HDI", "Low HDI", "HDI not affected"],
      correct: "Low HDI",
      explanation:
        "High infant mortality indicates poor healthcare and living conditions - Low HDI!",
    },
    {
      id: 6,
      question:
        "Country B has high GDP and life expectancy but produces massive plastic waste. Is it sustainable?",
      options: [
        "Yes, it's sustainable",
        "No, environmental harm offsets gains",
        "Depends on recycling",
        "Only economically sustainable",
      ],
      correct: "No, environmental harm offsets gains",
      explanation:
        "Plastic pollution undermines environmental health, offsetting economic and social gains.",
    },
    {
      id: 7,
      question:
        "A nation’s HDI rises due to education reforms, but its air quality drops. What's happening?",
      options: [
        "Balanced growth",
        "Ecological gain",
        "Sustainability conflict",
        "HDI is unaffected",
      ],
      correct: "Sustainability conflict",
      explanation:
        "Improving HDI at the cost of the environment shows conflicting sustainability priorities.",
    },
    {
      id: 8,
      question:
        "Country C generates power from coal but builds more hospitals. What improves?",
      options: [
        "Environmental index",
        "Ecological Footprint",
        "HDI (Health dimension)",
        "Carbon neutrality",
      ],
      correct: "HDI (Health dimension)",
      explanation:
        "More hospitals improve health outcomes, raising HDI's health component, despite coal usage.",
    },
    {
      id: 9,
      question:
        "A country enforces strict conservation laws but limits press freedom. What does this impact?",
      options: [
        "HDI (Freedom dimension)",
        "Ecological sustainability only",
        "Both positively",
        "None negatively",
      ],
      correct: "HDI (Freedom dimension)",
      explanation:
        "Limited press freedom can reduce perceived quality of life and democratic freedom, impacting HDI.",
    },
    {
      id: 10,
      question:
        "A rich country exports its waste to poorer nations. Sustainable behavior?",
      options: [
        "Yes, efficient outsourcing",
        "No, unethical and unsustainable",
        "Depends on consent",
        "HDI improves",
      ],
      correct: "No, unethical and unsustainable",
      explanation:
        "Exporting waste shifts the burden and violates sustainability ethics and equity principles.",
    },
  ];

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer("");
    setIsCorrect(null);
    setShowCelebration(false);
    setCurrentPage("quiz");
    setStartTime(Date.now());

  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correct;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
      setShowCelebration(true);
      playClickSound(clickSoundRefYay);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      playClickSound(clickSoundRefOops);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setIsCorrect(null);
      setShowResult(false);
    } else {
      setCurrentPage("final");
    }
  };

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
    if (score < 5 || currentPage !== "final") {
      return;
    }

    completeEnvirnomentChallenge(1, 0); // <-- Add this here


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
  }, [score, currentPage]);

  useEffect(() => {
    if (currentPage !== "final") return;

    const endTime = Date.now();
    const timeTakenSec = Math.floor((endTime - startTime) / 1000);
    const studyTimeMin = Math.ceil(timeTakenSec / 60);
    const accuracy = score / questions.length;

    // Scale score out of 10
    const scaledScore = parseFloat(((score / questions.length) * 10).toFixed(2));

    updatePerformance({
      moduleName: "Environment",
      topicName: "ecoDecisionMaker",
      score: scaledScore,
      accuracy: parseFloat((accuracy * 100).toFixed(2)),
      avgResponseTimeSec: parseFloat((timeTakenSec / questions.length).toFixed(2)),
      studyTimeMinutes: studyTimeMin,
      completed: score >= 5,
      
    });
    setStartTime(Date.now());

  }, [currentPage]);


  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4">
      <div className="text-center  bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 p-4 rounded-2xl shadow-2xl max-w-2xl mx-auto">
        <div className="animate-bounce mb-8">
          <Sparkles className="w-16 h-16 mx-auto text-yellow-300 mb-4" />
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-pulse">
          Measure & Compare
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-yellow-200 mb-8">
          Quiz Adventure! 🌍
        </h2>
        <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed">
          Test your knowledge about sustainability, development, and
          environmental indicators!
        </p>
        <button
          onClick={() => setCurrentPage("quiz")}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
        >
          Start Quiz Adventure
          <ChevronRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const QuizPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-200 to-green-200 p-4">
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-ping">🎉</div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border-4 border-yellow-300">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400 drop-shadow-sm" />
              <span className="text-xl font-bold text-pink-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-green-500 drop-shadow-sm" />
              <span className="text-xl font-bold text-purple-600">
                Score: {score}
              </span>
            </div>
          </div>

          <div className="w-full bg-yellow-100 rounded-full h-3 mb-8 shadow-inner">
            <div
              className="bg-gradient-to-r from-green-300 to-teal-400 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-violet-700 mb-6 leading-relaxed text-center">
              {questions[currentQuestion].question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-4 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${showResult
                    ? option === questions[currentQuestion].correct
                      ? "bg-green-400 text-white border-green-600 shadow-lg"
                      : option === selectedAnswer
                        ? "bg-red-400 text-white border-red-600 shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    : "bg-gradient-to-br from-pink-100 to-yellow-100 hover:from-pink-200 hover:to-yellow-200 text-purple-700 hover:shadow-xl"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-pink-200">
              {isCorrect ? (
                <div className="text-center">
                  <div className="text-6xl md:text-8xl mb-6 animate-bounce">
                    🎉
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    Correct!
                  </h3>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mb-6 border-2 border-green-300">
                    <h4 className="font-bold text-lg md:text-xl text-green-800 mb-3 flex items-center justify-center gap-2">
                      <Star className="w-6 h-6" />
                      Amazing Fact!
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl md:text-8xl mb-6 animate-pulse">
                    ⚠️
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
                    Oops! Not quite right!
                  </h3>
                  <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-red-300">
                    <h4 className="font-bold text-lg md:text-xl text-red-800 mb-3 flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6" />
                      Learning Moment!
                    </h4>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      {questions[currentQuestion].explanation}
                    </p>
                    <div className="bg-white/80 rounded-xl p-4 border border-gray-300">
                      <p className="text-sm md:text-base text-gray-600">
                        <strong>Correct Answer:</strong>{" "}
                        {questions[currentQuestion].correct}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
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
    </div>
  );

  const FinalPage = () => {
    const getGrade = () => {
      if (score >= 10)
        return {
          grade: "A+",
          message: "Outstanding!",
          emoji: "🏆",
          color: "from-yellow-400 to-orange-500",
        };
      if (score === 9)
        return {
          grade: "B+",
          message: "Great job!",
          emoji: "🌟",
          color: "from-green-400 to-blue-500",
        };
      if (score >= 8)
        return {
          grade: "C+",
          message: "Good effort!",
          emoji: "💪",
          color: "from-blue-400 to-purple-500",
        };
      return {
        grade: "D",
        message: "Keep Trying!",
        emoji: "😔",
        color: "from-blue-400 to-purple-500",
      };
    };
    const result = getGrade();

    return (
      <div className="min-h-screen bg-gradient-to-br bg-white flex items-center justify-center p-4">
        <div className="text-center w-[80%] mx-auto">
          <div className="bg-gradient-to-br from-orange-500 to-yellow-100  backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 sm:p-12 relative border-[3px] border-white/60">
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <div className="text-6xl mb-6 animate-bounce drop-shadow-lg">
              {result.emoji}
            </div>
            <motion.h1
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 mb-4"
            >
              Quiz Complete!
            </motion.h1>
            <motion.div
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl font-bold   text-black mb-4 drop-shadow-md"
            >
              {result.message}
            </motion.div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 mb-8 shadow-inner">
              <div className="text-3xl text-center font-bold text-gray-900 mb-2">
                Your score : {score}/{questions.length}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-lime-500 to-teal-500 hover:from-lime-600 hover:to-teal-600 text-white font-extrabold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <RotateCcw className="mr-2 w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={() => setCurrentPage("home")}
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-extrabold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {currentPage === "home" && <HomePage />}
      {currentPage === "quiz" && <QuizPage />}
      {currentPage === "final" && <FinalPage />}
    </div>
  );
};

export default MeasureCompareQuiz;
