import React, { useState } from "react";
import { CheckCircle, XCircle, Trophy, Star, Medal } from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { useEffect } from "react";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const LegalQuiz = () => {
  const { completeLawChallenge } = useLaw();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [confirmedAnswer, setConfirmedAnswer] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (!gameComplete) return;

    const endTime = Date.now();
    const totalQuestions = questions.length;
    const correctAnswers = score / 10;
    const scaledScore = (correctAnswers / totalQuestions) * 10;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const avgResponseTimeSec = Math.round((endTime - startTime) / (1000 * totalQuestions));
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Law",
      topicName: "beginnerLegalIntellect",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true, // You can set your own pass criteria here

    });
    setStartTime(Date.now());
  }, [gameComplete]);


  const questions = [
    {
      id: 1,
      question:
        "Your friend is not allowed to attend school because of their religion. Which fundamental right is violated?",
      options: ["Right to Equality", "Right to Freedom", "Right to Education"],
      correct: 0,
      explanation:
        "The Right to Equality ensures no discrimination based on religion!",
    },
    {
      id: 2,
      question: "Someone is riding a bicycle without a helmet. Is this legal?",
      options: ["Yes", "No", "Only if the road is empty"],
      correct: 1,
      explanation:
        "Safety first! Wearing a helmet while cycling is required by law.",
    },
    {
      id: 3,
      question: "You bought a toy that broke the next day. What can you do?",
      options: [
        "Ask for a replacement or refund",
        "Throw it away",
        "Keep it broken",
      ],
      correct: 0,
      explanation:
        "Consumer rights protect you! You can always ask for replacement or refund.",
    },
    {
      id: 4,
      question:
        "A factory is dumping waste into a river near your village. Which law is being broken?",
      options: [
        "Water Pollution Prevention Act",
        "Traffic Rules",
        "Child Labour Act",
      ],
      correct: 0,
      explanation:
        "Environmental laws protect our water! The Water Pollution Prevention Act is being violated.",
    },
    {
      id: 5,
      question:
        "Someone creates a fake social media account pretending to be you. Is this allowed?",
      options: ["Yes", "No", "Only if it's for fun"],
      correct: 1,
      explanation:
        "Identity theft is never okay! Cyber laws protect your digital identity.",
    },
    {
      id: 6,
      question: "Which of these is a fundamental duty?",
      options: [
        "To respect the national flag",
        "To ignore rules",
        "To disturb others",
      ],
      correct: 0,
      explanation:
        "Great job! Respecting our national symbols is indeed a fundamental duty.",
    },
  ];

  const getBadge = (score) => {
    if (score >= 50)
      return {
        name: "Legal Eagle",
        icon: Trophy,
        color: "text-yellow-500",
        bg: "bg-yellow-100",
      };
    if (score >= 30)
      return {
        name: "Justice Learner",
        icon: Medal,
        color: "text-blue-500",
        bg: "bg-blue-100",
      };
    return {
      name: "Law Explorer",
      icon: Star,
      color: "text-purple-500",
      bg: "bg-purple-100",
    };
  };

  const handleAnswerSelect = (index) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer !== null) {
      setConfirmedAnswer(true);
      setShowFeedback(true);
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 10);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setConfirmedAnswer(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setGameComplete(false);
    setConfirmedAnswer(false);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (gameComplete) {
      completeLawChallenge(0, 0);
    }
  }, [gameComplete]);

  if (gameComplete) {
    const badge = getBadge(score);
    const BadgeIcon = badge.icon;


    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full text-center animate-bounce">
          <div className="mb-4 sm:mb-6">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ${badge.bg} mb-3 sm:mb-4 animate-pulse`}
            >
              <BadgeIcon
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${badge.color}`}
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              🎉 Congratulations! 🎉
            </h2>
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-600 mb-2">
              {score}/60
            </div>
            <div
              className={`text-lg sm:text-xl font-semibold ${badge.color} mb-3 sm:mb-4`}
            >
              {badge.name}
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="bg-gray-200 rounded-full h-3 sm:h-4 mb-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 sm:h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(score / 60) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              You got {score / 10} out of 6 questions correct!
            </p>
          </div>

          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🚀 Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-3 sm:p-4 md:p-6">
      <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 pt-2 sm:pt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 animate-pulse">
            🎮 LawQuest: Legal Adventure
          </h1>
          <div className="flex flex-col mt-3 sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-white">
            <div className="bg-white text-black bg-opacity-20 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
              <span className="font-bold text-sm sm:text-base">
                Question {currentQuestion + 1}/6
              </span>
            </div>
            <div className="bg-white text-black bg-opacity-20 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
              <span className="font-bold text-sm sm:text-base">
                Score: {score}/60
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white bg-opacity-30 rounded-full h-2 sm:h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 transform hover:scale-105 transition-all duration-300">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {currentQ.options.map((option, index) => {
              let buttonClass =
                "w-full p-3 sm:p-4 text-left rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-200 transform hover:scale-105 ";

              if (showFeedback) {
                if (index === currentQ.correct) {
                  buttonClass += "bg-green-500 text-white shadow-lg";
                } else if (
                  index === selectedAnswer &&
                  index !== currentQ.correct
                ) {
                  buttonClass += "bg-red-500 text-white shadow-lg";
                } else {
                  buttonClass += "bg-gray-200 text-gray-600";
                }
              } else if (selectedAnswer === index) {
                buttonClass +=
                  "bg-blue-500 text-white shadow-lg ring-2 sm:ring-4 ring-blue-300";
              } else {
                buttonClass +=
                  "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:shadow-md";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  <div className="flex items-center justify-between">
                    <span className="pr-2 leading-tight">
                      {String.fromCharCode(65 + index)}) {option}
                    </span>
                    {showFeedback && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce flex-shrink-0" />
                    )}
                    {showFeedback &&
                      index === selectedAnswer &&
                      index !== currentQ.correct && (
                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce flex-shrink-0" />
                      )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 animate-fadeIn ${selectedAnswer === currentQ.correct
                ? "bg-green-100 border-2 border-green-300"
                : "bg-red-100 border-2 border-red-300"
                }`}
            >
              <div className="flex items-center mb-2">
                {selectedAnswer === currentQ.correct ? (
                  <>
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 flex-shrink-0" />
                    <span className="font-bold text-green-800 text-lg sm:text-xl">
                      🎉 Correct!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2 flex-shrink-0" />
                    <span className="font-bold text-red-800 text-lg sm:text-xl">
                      ❌ Wrong!
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base leading-tight">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3 sm:space-x-4">
            {!showFeedback && (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-200 transform hover:scale-105 ${selectedAnswer !== null
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:from-green-600 hover:to-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                ✅ Confirm Answer
              </button>
            )}

            {showFeedback && (
              <button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {currentQuestion < questions.length - 1
                  ? "➡️ Next Question"
                  : "🏆 View Results"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LegalQuiz;
