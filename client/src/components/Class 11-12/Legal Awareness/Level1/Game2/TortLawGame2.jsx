import React, { useState, useEffect, useCallback, useRef } from "react"; // Added useCallback for better performance
import {
  ChevronRight,
  Star,
  Trophy,
  RotateCcw,
  BookOpen,
  Target,
  Shield,
  Heart,
  Gavel,
} from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
import { motion } from "framer-motion";

import clickSoundFile from "../../../Sound/clickSoundFile.mp3";
import clickSoundFileYay from "../../../Sound/clickSoundFileYay.mp3";
import clickSoundFileOops from "../../../Sound/clickSoundFileOops.mp3";
import confetti from "canvas-confetti";

const TortLawGame2 = () => {
  const { completeLawChallenge } = useLaw();
  const [currentPage, setCurrentPage] = useState("home");
  const [currentChallenge, setCurrentChallenge] = useState(1);
  const [selectedCase, setSelectedCase] = useState(null); // This state isn't directly used for case display, currentQuestionIndex is. Consider if you need it.
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [challengeScores, setChallengeScores] = useState({ 1: 0, 2: 0, 3: 0 });
  const [feedback, setFeedback] = useState(""); // This state is declared but not used in the provided code.
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const cases = [
    {
      id: 1,
      title: "Code Copy Cat",
      description:
        "A student copies another's code from a public GitHub repo and presents it as original work in a coding competition.",
      icon: "💻",
      color: "from-green-400 to-blue-500",
    },
    {
      id: 2,
      title: "Gym Slip-up",
      description:
        "A gym-goer injures themselves after using a machine with a faded warning label.",
      icon: "🏋️",
      color: "from-red-300 to-orange-400",
    },
    {
      id: 3,
      title: "Library Outburst",
      description:
        "A patron verbally abuses a librarian who denies them entry due to overdue books.",
      icon: "📚",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 4,
      title: "Bike Lane Blockade",
      description:
        "A food delivery rider crashes trying to avoid a car illegally parked in a bike lane.",
      icon: "🚴",
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: 5,
      title: "Lunchbox Leak",
      description:
        "A school's lunchbox inspection policy unintentionally leaks students' private health info.",
      icon: "🥪",
      color: "from-sky-400 to-blue-500",
    },
    {
      id: 6,
      title: "Drone Dilemma",
      description:
        "A hobbyist flies a drone over a private home, recording the backyard without consent.",
      icon: "🚁",
      color: "from-gray-500 to-zinc-700",
    },
  ];

  const challenges = {
    2: {
      title: "NAME THE DEFENSE",
      icon: <Gavel className="w-8 h-8" />,
      color: "from-red-500 to-orange-600",
      answers: [
        {
          id: "A",
          text: "Invasion of Privacy",
          color: "bg-pink-100 hover:bg-pink-200 border-pink-300",
        },
        {
          id: "B",
          text: "Assumption of Risk",
          color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300",
        },
        {
          id: "C",
          text: "Freedom of Expression",
          color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
        },
        {
          id: "D",
          text: "Product Liability",
          color: "bg-green-100 hover:bg-green-200 border-green-300",
        },
        {
          id: "E",
          text: "Provocation",
          color: "bg-gray-100 hover:bg-gray-200 border-gray-300",
        },
        {
          id: "F",
          text: "Negligent Warning",
          color: "bg-purple-100 hover:bg-purple-200 border-purple-300",
        },
      ],
      correctAnswers: {
        1: "C", // Plagiarism as expression defense
        2: "F", // Faulty equipment with poor warnings
        3: "E", // Patron's outburst provoked by policy
        4: "D", // Dangerous obstruction = product liability
        5: "A", // Breach of privacy
        6: "A", // Drone over private space = privacy violation
      },
    },
  };

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    const currentCase = cases[currentQuestionIndex];
    const correct =
      challenges[currentChallenge].correctAnswers[currentCase.id] ===
      selectedAnswer;

    setIsCorrect(correct);

    if (correct) {
      const newScore = score + 10;
      setScore(newScore);
      setChallengeScores((prev) => ({
        ...prev,
        [currentChallenge]: prev[currentChallenge] + 10,
      }));
      setShowCelebration(true);
      playClickSound(clickSoundRefYay);
      setTimeout(() => setShowCelebration(false), 1000);
    } else {
      playClickSound(clickSoundRefOops);
    }

    setShowFeedback(true);
  };

  const startChallenge = (challengeNum) => {
    setCurrentChallenge(challengeNum);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false); // Reset feedback when starting a new challenge
    setCurrentPage("game");
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < cases.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      // Challenge completed
      completeLawChallenge(0, 1); // ✅ Call it here
      setCompletedChallenges((prev) => [...prev, currentChallenge]);
      setCurrentPage("results");
    }
  };

  // This block of code was outside the component's return and would run on every render.
  // It should be part of a function (like resetGame) or an effect if intended to run once.
  // I've moved it into a `resetGame` function.
  const resetGame = useCallback(() => {
    setScore(0);
    setChallengeScores({ 1: 0, 2: 0, 3: 0 });
    setCurrentQuestionIndex(0);
    setCompletedChallenges([]);
    setCurrentPage("home");
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowCelebration(false);
    setStartTime(Date.now());
  }, []); // useCallback to memoize the function

  // These `const` declarations were inside the `GamePage` component, but needed access
  // to `cases`, `challenges`, `currentQuestionIndex`, and `currentChallenge` from `TortLawGame`.
  // They are moved here to be accessible within `GamePage` when it's rendered by `TortLawGame`.
  const currentCase = cases[currentQuestionIndex];
  const challenge = challenges[currentChallenge];
  const correctAnswerId = challenge?.correctAnswers[currentCase?.id]; // Added optional chaining for safety

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
    if (score < 60 || currentPage !== "results") return;

    const myCanvas = canvasRef.current;
    if (!myCanvas) return;

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
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
  }, [score, currentPage, canvasRef]);

  useEffect(() => {
    if (currentPage !== "results") return;

    const totalQuestions =
      Object.keys(challenges[currentChallenge]?.correctAnswers || {}).length;

    if (totalQuestions === 0) return;

    const challengeScore = challengeScores[currentChallenge];

    const normalizedScore = (challengeScore / (totalQuestions * 10)) * 10; // out of 10
    const accuracy = (challengeScore / (totalQuestions * 10)) * 100; // out of 100
    const avgResponseTimeSec = (Date.now() - startTime) / 1000 / totalQuestions;
    const studyTimeMinutes = (Date.now() - startTime) / 1000 / 60;

    updatePerformance({
      moduleName: "Law",
      topicName: "beginnerLegalIntellect",
      score: Number(normalizedScore.toFixed(2)),
      accuracy: Number(accuracy.toFixed(2)),
      avgResponseTimeSec: Number(avgResponseTimeSec.toFixed(2)),
      studyTimeMinutes: Number(studyTimeMinutes.toFixed(2)),
      completed: true,
    });
    setStartTime(Date.now());

  }, [currentPage]);


  const HomePage = () => (
    <div
      className="min-h-screen w-[90%] mx-auto"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full p-5 mx-auto bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
        <div className="text-center mb-8 animate-bounce">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🏛️ Tort Law Adventure 2
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Learn legal concepts through fun challenges!
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Game Rules
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Match cases with the correct legal concepts
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Trophy className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Earn 10 points for each correct answer
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  One question at a time, take your time to think
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {[2].map((challengeNum) => (
            <div
              key={challengeNum}
              className="bg-white/95 min-w-[50%] backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => startChallenge(challengeNum)}
            >
              <div
                className={`bg-gradient-to-r ${challenges[challengeNum].color} p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  {challenges[challengeNum].icon}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {challenges[challengeNum].title}
                </h3>
                <p className="text-white/90 text-sm">6 Questions</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Your Score:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {challengeScores[challengeNum]}
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                  {completedChallenges.includes(challengeNum)
                    ? "Play Again"
                    : "Start Challenge"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 inline-block">
            <div className="flex items-center justify-center space-x-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-gray-600">Total Score</p>
                <p className="text-3xl font-bold text-indigo-600">{score}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GamePage = () => {
    // These variables are now available from the parent `TortLawGame` scope.
    // Ensure `currentCase` and `challenge` are defined before use in GamePage.

    if (!currentCase || !challenge) {
      // Handle cases where currentCase or challenge might be undefined (e.g., initial render before state is set)
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gray-100"
          style={{ fontFamily: "'Comic Neue', cursive" }}
        >
          Loading game...
        </div>
      );
    }

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-200 to-green-200 p-4"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="text-6xl animate-ping">🎉</div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border-4 border-yellow-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400 drop-shadow-sm" />
                <span className="text-xl font-bold text-pink-600">
                  Question {currentQuestionIndex + 1} of {cases.length}
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
                  width: `${((currentQuestionIndex + 1) / cases.length) * 100
                    }%`,
                }}
              ></div>
            </div>

            {/* Challenge Title */}
            <div className="flex items-center justify-center mb-6">
              {challenge.icon}
              <h1 className="text-2xl md:text-3xl font-bold text-violet-700 ml-3 drop-shadow-lg">
                {challenge.title}
              </h1>
            </div>

            {/* Question Section */}
            <div
              className={`bg-gradient-to-r ${currentCase.color} rounded-2xl p-6 mb-8 text-white`}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{currentCase.icon}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {currentCase.title}
                  </h2>
                  <p className="text-white/90 text-lg mt-2">
                    {currentCase.description}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-violet-700 mb-6 text-center leading-relaxed">
              Select the correct defense
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {challenge.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => {
                    !showFeedback && setSelectedAnswer(answer.id);
                    playClickSound(clickSoundRefPop);
                  }}
                  disabled={showFeedback}
                  className={`p-4 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${showFeedback
                    ? answer.id === correctAnswerId
                      ? "bg-green-400 text-white border-green-600 shadow-lg"
                      : answer.id === selectedAnswer
                        ? "bg-red-400 text-white border-red-600 shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    : selectedAnswer === answer.id
                      ? "ring-4 ring-indigo-300 scale-105 " + answer.color
                      : answer.color + " hover:shadow-xl"
                    }`}
                >
                  <div className="font-semibold text-gray-800 mb-2">
                    {answer.id}.
                  </div>
                  <div
                    className={
                      showFeedback && answer.id === correctAnswerId
                        ? "text-white"
                        : showFeedback && answer.id === selectedAnswer
                          ? "text-white"
                          : "text-gray-700"
                    }
                  >
                    {answer.text}
                  </div>
                </button>
              ))}
            </div>

            {!showFeedback ? (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform ${selectedAnswer
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  Back to Home
                </button>
              </div>
            ) : (
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
                        Amazing!
                      </h4>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Great job! You correctly identified this as{" "}
                        {
                          challenge.answers.find(
                            (a) => a.id === correctAnswerId
                          )?.text
                        }
                        .
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
                        Don't worry! Learning is all about trying. The correct
                        answer helps us understand the legal concept better.
                      </p>
                      <div className="bg-white/80 rounded-xl p-4 border border-gray-300">
                        <p className="text-sm md:text-base text-gray-600">
                          <strong>Correct Answer:</strong>{" "}
                          {
                            challenge.answers.find(
                              (a) => a.id === correctAnswerId
                            )?.text
                          }
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
                    {currentQuestionIndex < cases.length - 1
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
  };

  const ResultsPage = () => (
    <div
      className="w-[90%] mx-auto p-5 h-screen"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-yellow-100 text-center p-6">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div className="mb-8 animate-bounce z-20">
          <Trophy className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4 drop-shadow-lg">
            Challenge Complete!
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="text-2xl mb-8 z-20"
        >
          <h2>{`${score === 60
            ? "Congratulations Champ"
            : score === 50
              ? "Well done"
              : "You can do better"
            }`}</h2>
        </motion.div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 z-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {challenges[currentChallenge].title} Results
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
              <div className="text-3xl font-bold">
                {challengeScores[currentChallenge]}
              </div>
              <div className="text-white/90">Challenge Score</div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl">
              <div className="text-3xl font-bold">
                {challenges[currentChallenge].correctAnswers
                  ? Math.round(
                    (challengeScores[currentChallenge] /
                      (Object.keys(
                        challenges[currentChallenge].correctAnswers
                      ).length *
                        10)) *
                    100
                  )
                  : 0}
                %
              </div>
              <div className="text-white/90">Accuracy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition duration-300 shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentPage === "home" && <HomePage />}
      {currentPage === "game" && <GamePage />}
      {currentPage === "results" && <ResultsPage />}
    </div>
  );
};

export default TortLawGame2;
