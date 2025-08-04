import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  Star,
  CheckCircle,
  XCircle,
  Home,
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  Zap,
  Shield,
} from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const LegalQuizQuestLevel3 = () => {
  const { completeLawChallenge } = useLaw();
  const [currentPage, setCurrentPage] = useState("home");
  const [gameMode, setGameMode] = useState("challenge"); // 'normal' or 'challenge'
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [moduleScores, setModuleScores] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [challengeWrongAnswer, setChallengeWrongAnswer] = useState(false);
  const [legalWhizBadge, setLegalWhizBadge] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const modules = [
    {
      id: 1,
      title: "The Making of the Indian Constitution",
      emoji: "📜",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      questions: [
        {
          question:
            "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
          options: [
            "Dr. B.R. Ambedkar",
            "Jawaharlal Nehru",
            "Mahatma Gandhi",
            "Sardar Patel",
          ],
          correct: 0,
          explanation:
            "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is known as the 'Father of the Indian Constitution'.",
        },
        {
          question: "When was the Indian Constitution adopted?",
          options: [
            "15th August 1947",
            "26th January 1950",
            "26th November 1949",
            "2nd October 1947",
          ],
          correct: 2,
          explanation:
            "The Indian Constitution was adopted on 26th November 1949, which is celebrated as Constitution Day.",
        },
        {
          question:
            "How many articles were there in the original Indian Constitution?",
          options: ["395", "448", "370", "356"],
          correct: 0,
          explanation:
            "The original Indian Constitution had 395 articles, making it one of the longest constitutions in the world.",
        },
      ],
    },
    {
      id: 2,
      title: "Structure and Nature of the Indian Judiciary",
      emoji: "⚖️",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      questions: [
        {
          question: "Which is the highest court in India?",
          options: [
            "High Court",
            "Supreme Court",
            "District Court",
            "Session Court",
          ],
          correct: 1,
          explanation:
            "The Supreme Court of India is the highest judicial authority in the country.",
        },
        {
          question: "How many judges can the Supreme Court have at maximum?",
          options: ["25", "30", "34", "31"],
          correct: 2,
          explanation:
            "The Supreme Court can have a maximum of 34 judges including the Chief Justice of India.",
        },
        {
          question: "Who appoints the Chief Justice of India?",
          options: [
            "Prime Minister",
            "President",
            "Parliament",
            "Law Minister",
          ],
          correct: 1,
          explanation:
            "The Chief Justice of India is appointed by the President of India.",
        },
      ],
    },
    {
      id: 3,
      title: "Law-Making Process in India",
      emoji: "🏛️",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      questions: [
        {
          question: "Which house is known as the 'Upper House' of Parliament?",
          options: [
            "Lok Sabha",
            "Rajya Sabha",
            "Vidhan Sabha",
            "Vidhan Parishad",
          ],
          correct: 1,
          explanation:
            "Rajya Sabha is the Upper House of the Indian Parliament, representing the states.",
        },
        {
          question: "What is the maximum strength of Lok Sabha?",
          options: ["545", "552", "550", "543"],
          correct: 1,
          explanation:
            "The maximum strength of Lok Sabha is 552 members (530 from states, 20 from UTs, and 2 nominated Anglo-Indians).",
        },
        {
          question: "Who has the power to dissolve the Lok Sabha?",
          options: ["Prime Minister", "President", "Speaker", "Chief Justice"],
          correct: 1,
          explanation:
            "The President of India has the power to dissolve the Lok Sabha on the advice of the Council of Ministers.",
        },
      ],
    },
    {
      id: 4,
      title: "Cyber Laws and Digital Rights",
      emoji: "💻",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      questions: [
        {
          question: "Which act governs cyber crimes in India?",
          options: [
            "IT Act 2000",
            "Cyber Act 2008",
            "Digital Act 2000",
            "Internet Act 2005",
          ],
          correct: 0,
          explanation:
            "The Information Technology Act, 2000 (IT Act) is the primary law dealing with cybercrime and electronic commerce in India.",
        },
        {
          question: "What is the punishment for cyber stalking under IT Act?",
          options: [
            "Fine only",
            "1 year imprisonment",
            "3 years imprisonment",
            "5 years imprisonment",
          ],
          correct: 2,
          explanation:
            "Under the IT Act, cyber stalking can be punished with imprisonment up to 3 years and/or fine.",
        },
        {
          question: "Which fundamental right covers digital privacy?",
          options: [
            "Right to Equality",
            "Right to Freedom",
            "Right to Privacy",
            "Right to Life",
          ],
          correct: 2,
          explanation:
            "The Right to Privacy, recognized by the Supreme Court, includes digital privacy and data protection.",
        },
      ],
    },
    {
      id: 5,
      title: "International Law and the United Nations",
      emoji: "🌍",
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
      questions: [
        {
          question: "When was the United Nations established?",
          options: ["1945", "1946", "1947", "1948"],
          correct: 0,
          explanation:
            "The United Nations was established on October 24, 1945, after World War II to promote international cooperation.",
        },
        {
          question:
            "How many permanent members are there in the UN Security Council?",
          options: ["4", "5", "6", "7"],
          correct: 1,
          explanation:
            "The UN Security Council has 5 permanent members: USA, Russia, China, France, and the United Kingdom.",
        },
        {
          question: "Where is the International Court of Justice located?",
          options: ["New York", "Geneva", "The Hague", "Vienna"],
          correct: 2,
          explanation:
            "The International Court of Justice is located in The Hague, Netherlands.",
        },
      ],
    },
  ];

  useEffect(() => {
    let timer;
    if (
      (timerEnabled || gameMode === "challenge") &&
      timeLeft > 0 &&
      !showFeedback &&
      currentPage === "quiz"
    ) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswer(-1); // Auto-submit wrong answer when time runs out
    }
    return () => clearTimeout(timer);
  }, [timerEnabled, timeLeft, showFeedback, currentPage, gameMode]);

  const resetTimer = () => {
    setTimeLeft(30);
  };

  const handleModuleSelect = (module, mode) => {
    setSelectedModule(module);
    setGameMode(mode);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
    setShowCelebration(false);
    setChallengeWrongAnswer(false);
    resetTimer();
    setCurrentPage("quiz");
  };

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const currentQ = selectedModule.questions[currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;

    if (isCorrect) {
      setScore(score + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    } else {
      // Challenge Mode: Wrong answer = retry module
      if (gameMode === "challenge") {
        setChallengeWrongAnswer(true);
      }
    }
  };

  const nextQuestion = () => {
    // Challenge Mode: If wrong answer, reset module
    if (gameMode === "challenge" && challengeWrongAnswer) {
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setChallengeWrongAnswer(false);
      resetTimer();
      return;
    }

    const maxQuestions =
      gameMode === "challenge" ? 2 : selectedModule.questions.length;

    if (currentQuestion < maxQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      resetTimer();
    } else {
      // Module complete
      const newModuleScores = { ...moduleScores };
      newModuleScores[selectedModule.id] = score;
      setModuleScores(newModuleScores);

      // Check for Legal Whiz Badge (all 5 modules completed in challenge mode with perfect score)
      if (gameMode === "challenge" && score === 2) {
        const completedChallengeModules = Object.keys(newModuleScores).filter(
          (moduleId) => newModuleScores[moduleId] === 2
        ).length;

        if (completedChallengeModules === 5) {
          setLegalWhizBadge(true);
        }
      }

      setGameComplete(true);
    }
  };

  const goHome = () => {
    setCurrentPage("home");
    setSelectedModule(null);
    setGameMode("normal");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
    setShowCelebration(false);
    setChallengeWrongAnswer(false);
    setStartTime(Date.now());

  };

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!gameComplete || !selectedModule) return;

    const endTime = Date.now();
    const totalQuestions = gameMode === "challenge" ? 2 : selectedModule.questions.length;
    const correctAnswers = score;
    const scaledScore = (correctAnswers / totalQuestions) * 10;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const avgResponseTimeSec = Math.round((endTime - startTime) / (1000 * totalQuestions));
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Law",
      topicName: "learnedCounsel",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,
       
    });
    setStartTime(Date.now());

  }, [gameComplete]);


  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (!myCanvas || !confetti) return; // check for canvas and confetti presence

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    let animationFrameId;

    const frame = () => {
      if (Date.now() > end) return;

      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.2 },
        colors,
      });

      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.2 },
        colors,
      });

      animationFrameId = requestAnimationFrame(frame);
    };

    frame();

    completeLawChallenge(2, 0);

    // ✅ Cleanup function to stop the animation
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gameComplete]);

  const renderHome = () => (
    <div className="w-[90%] mx-auto min-h-screen mt-5 mb-5 rounded-xl shadow-2xl overflow-auto bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4">
      <div className="w-full h-full p-5 max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-bounce">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎮 Legal Quiz Quest
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-semibold">
            Become a Legal Whiz Kid! 🌟
          </p>
        </div>

        {legalWhizBadge && (
          <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-3xl p-6 mb-6 text-center shadow-2xl border-4 border-yellow-600">
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-2xl font-bold text-yellow-900">
              Legal Whiz Badge Earned!
            </h2>
            <p className="text-yellow-800">
              You've mastered all Challenge Mode modules!
            </p>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl mb-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-blue-600" size={32} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              How to Play
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <p className="flex-1">
                  <strong>Choose a Module:</strong> Pick from 5 exciting legal
                  topics!
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <p className="flex-1">
                  <strong>Answer Questions:</strong> Each module has 3
                  multiple-choice questions (2 in Challenge Mode).
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <p className="flex-1">
                  <strong>Score Points:</strong> Get 1 point for each correct
                  answer!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-red-100 rounded-2xl border-2 border-red-300">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-red-600" size={20} />
              <h3 className="font-bold text-red-800">Challenge Mode</h3>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Fast-paced: 30 seconds per question (automatic)</li>
              <li>• Only 2 questions per module</li>
              <li>• Sudden death: 1 wrong answer = retry module</li>
              <li>
                • Complete all 5 modules perfectly to earn "Legal Whiz" badge!
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
              <Shield className="w-12 h-12 text-white mx-auto mb-2" />
              <h4 className="text-xl font-bold text-white mb-2">Normal Mode</h4>
              <p className="text-white/80 text-sm">
                Learn at your pace, 3 questions per module
              </p>
            </div>
            <div className="bg-red-500/30 backdrop-blur rounded-2xl p-4 text-center border-2 border-red-400">
              <Zap className="w-12 h-12 text-white mx-auto mb-2" />
              <h4 className="text-xl font-bold text-white mb-2">
                Challenge Mode
              </h4>
              <p className="text-white/80 text-sm">
                Fast & intense, earn the Legal Whiz badge!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div
                onClick={() => handleModuleSelect(module, "normal")}
                className={`${module.color} rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
              >
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">
                    {module.emoji}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight">
                    {module.title}
                  </h3>
                  <div className="text-sm text-black opacity-90 bg-white px-4 py-2 rounded-xl shadow-xl">
                    Normal Mode
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleModuleSelect(module, "challenge")}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                Challenge Mode
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage("instructions")}
            className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-bold hover:bg-purple-50 transition-colors shadow-lg"
          >
            📖 Detailed Instructions
          </button>
        </div>
      </div>
    </div>
  );

  const renderInstructions = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setCurrentPage("home")}
          className="mb-6 bg-white text-purple-600 px-4 py-2 rounded-xl font-bold hover:bg-purple-50 transition-colors flex items-center gap-2"
        >
          <Home size={20} />
          Back to Home
        </button>

        <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            📚 Game Instructions
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-3">
                🎯 Objective
              </h2>
              <p>
                Complete all 5 modules and become a Legal Whiz! Answer questions
                correctly to unlock the next question in each module.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-600 mb-3">
                🎮 Normal Mode
              </h2>
              <ul className="space-y-2 ml-4">
                <li>• Select a module from the home screen</li>
                <li>• Read each question carefully</li>
                <li>• Click on your chosen answer (a, b, c, or d)</li>
                <li>• Get immediate feedback with explanations</li>
                <li>• Complete all 3 questions per module</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-red-600 mb-3">
                ⚡ Challenge Mode
              </h2>
              <ul className="space-y-2 ml-4">
                <li>• Fast-paced version with 30-second timer per question</li>
                <li>• Only 2 questions per module</li>
                <li>
                  • <strong>Sudden Death:</strong> One wrong answer = retry
                  entire module
                </li>
                <li>• Perfect all 5 modules to earn the "Legal Whiz" badge</li>
                <li>• Ultimate test of your legal knowledge!</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-purple-600 mb-3">
                🏆 Scoring
              </h2>
              <ul className="space-y-2 ml-4">
                <li>
                  • Correct answer: <strong>+1 point</strong>
                </li>
                <li>
                  • Wrong answer: <strong>0 points</strong>
                </li>
                <li>• Normal Mode: Maximum 3 points per module</li>
                <li>• Challenge Mode: Maximum 2 points per module</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-orange-600 mb-3">
                ⏰ Timer System
              </h2>
              <p>
                <b>Challenge Mode:</b> Automatic 30-second timer. If time runs
                out, the answer will be marked as incorrect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-600 mb-3">
                🏅 Legal Whiz Badge
              </h2>
              <p>
                Complete all 5 modules in Challenge Mode with perfect scores to
                earn the prestigious "Legal Whiz" badge - the ultimate
                achievement for legal quiz masters!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const currentQ = selectedModule.questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;
    const maxQuestions =
      gameMode === "challenge" ? 2 : selectedModule.questions.length;

    return (
      <div className={`min-h-screen ${selectedModule.color} p-4`}>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="text-6xl animate-ping">🎉</div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button
              onClick={goHome}
              className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Home size={20} />
              Home
            </button>

            <div className="text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="text-lg md:text-xl font-bold">
                  {selectedModule.title}
                </h2>
                {gameMode === "challenge" && (
                  <div className="bg-red-500 px-2 py-1 rounded-full text-xs font-bold">
                    CHALLENGE
                  </div>
                )}
              </div>
              <p className="text-white/80">
                Question {currentQuestion + 1} of {maxQuestions}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {(timerEnabled || gameMode === "challenge") && (
                <div
                  className={`bg-white/20 backdrop-blur px-3 py-2 rounded-xl text-white font-bold ${timeLeft <= 10 ? "animate-pulse bg-red-500/50" : ""
                    }`}
                >
                  <Clock size={16} className="inline mr-1" />
                  {timeLeft}s
                </div>
              )}
              <div className="bg-white/20 backdrop-blur px-3 py-2 rounded-xl text-white font-bold">
                <Trophy size={16} className="inline mr-1" />
                {score}/{currentQuestion + (showFeedback ? 1 : 0)}
              </div>
            </div>
          </div>

          {gameComplete ? (
            <div className="bg-orange-200/95 w-full backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl text-center relative">
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                width={800}
                height={600}
              />
              <motion.div
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {gameMode === "challenge" ? "Challenge" : "Module"} Complete!
                </h2>
                <div className="text-2xl font-bold text-green-600 mb-6">
                  Final Score: {score}/{maxQuestions}
                </div>
                {gameMode === "challenge" && score === 2 && (
                  <div className="bg-yellow-300 rounded-xl p-4 mb-4">
                    <div className="text-2xl">⚡</div>
                    <p className="font-bold text-yellow-800">
                      Challenge Mode Mastered!
                    </p>
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="flex justify-center items-center mb-4 "
              >
                <span className="text-2xl bg-white p-5 py-3 rounded-xl shadow-xl">
                  {score === maxQuestions
                    ? "Excellent Champ 🏆"
                    : "Keep Learning"}
                </span>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={goHome}
                  className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Home size={20} />
                  Back to Modules
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-yellow-300">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 drop-shadow-sm" />
                  <span className="text-xl font-bold text-pink-600">
                    Question {currentQuestion + 1} of{" "}
                    {gameMode === "normal"
                      ? selectedModule.questions.length
                      : selectedModule.questions.length - 1}
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
                    width: `${((currentQuestion + 1) /
                      (gameMode === "normal"
                        ? selectedModule.questions.length
                        : selectedModule.questions.length - 1)) *
                      100
                      }%`,
                  }}
                ></div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-violet-700 mb-6 leading-relaxed text-center">
                  {currentQ.question}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showFeedback && handleAnswer(index)}
                      disabled={showFeedback}
                      className={`p-4 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${showFeedback
                        ? index === currentQ.correct
                          ? "bg-green-400 text-white border-green-600 shadow-lg"
                          : index === selectedAnswer
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

              {showFeedback && (
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
                          {currentQ.explanation}
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
                          {currentQ.explanation}
                        </p>
                        <div className="bg-white/80 rounded-xl p-4 border border-gray-300">
                          <p className="text-sm md:text-base text-gray-600">
                            <strong>Correct Answer:</strong>{" "}
                            {currentQ.options[currentQ.correct]}
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
                      {currentQuestion < selectedModule.questions.length - 1
                        ? gameMode === "normal"
                          ? "Next Question"
                          : isCorrect
                            ? "Next Question"
                            : "Restart Module"
                        : "See Results"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (currentPage === "home") return renderHome();
  if (currentPage === "instructions") return renderInstructions();
  if (currentPage === "quiz") return renderQuiz();

  return null;
};

export default LegalQuizQuestLevel3;
