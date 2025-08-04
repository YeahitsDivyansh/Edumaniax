import React, { useState, useEffect } from "react";
import {
  MapPin,
  Timer,
  Trophy,
  Star,
  Zap,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  Award,
  Target,
} from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const questions = [
  // Challenge 1
  {
    id: 1,
    level: 1,
    category: "Fundamental Rights",
    question:
      "Which right protects you from unfair treatment because of your religion or gender?",
    options: [
      "Right to Education",
      "Right to Equality",
      "Right to Freedom",
      "Right to Privacy",
    ],
    correct: 1,
    explanation:
      "Right to Equality ensures everyone is treated fairly regardless of religion, gender, caste, or race!",
  },
  {
    id: 2,
    level: 1,
    category: "Laws That Protect Children",
    question:
      "Which law ensures children below 14 years cannot work in hazardous jobs?",
    options: [
      "Right to Education Act",
      "POCSO Act",
      "Child Labour (Prohibition and Regulation) Act",
      "Juvenile Justice Act",
    ],
    correct: 2,
    explanation:
      "The Child Labour Act protects children from dangerous work and ensures they can go to school instead!",
  },
  {
    id: 3,
    level: 1,
    category: "Traffic Rules",
    question: "What should you wear when riding a two-wheeler on the road?",
    options: ["Sunglasses", "Helmet", "Cap", "No protection needed"],
    correct: 1,
    explanation:
      "Always wear a helmet! It protects your head and is required by law for your safety.",
  },
  {
    id: 4,
    level: 1,
    category: "Consumer Rights",
    question: "If a product you bought is faulty, what can you ask the seller?",
    options: [
      "Nothing, just keep it",
      "A refund or replacement",
      "To give you a different product for free",
      "To take it back without refund",
    ],
    correct: 1,
    explanation:
      "Consumer rights protect you! You can ask for a refund or replacement for faulty products.",
  },
  {
    id: 5,
    level: 1,
    category: "Digital World and Cyber Law",
    question: "Which of these is NOT safe internet behavior?",
    options: [
      "Sharing your password with friends",
      "Using strong, unique passwords",
      "Thinking before you share something online",
      "Reporting cyberbullying",
    ],
    correct: 0,
    explanation:
      "Never share passwords, even with friends! Keep your accounts safe and secure.",
  },
  // Challenge 2
  {
    id: 6,
    level: 2,
    category: "Courts and Justice",
    question:
      "Who is the person in court that listens to both sides and gives the final decision?",
    options: ["Lawyer", "Witness", "Judge", "Police officer"],
    correct: 2,
    explanation:
      "The Judge listens to everyone and makes fair decisions based on the law!",
  },
  {
    id: 7,
    level: 2,
    category: "Fundamental Duties",
    question:
      "Which of the following is NOT one of your fundamental duties as a citizen?",
    options: [
      "Protect the environment",
      "Respect national symbols",
      "Pay taxes honestly",
      "Develop scientific temper",
    ],
    correct: 2,
    explanation:
      "Children don't pay taxes yet! But protecting the environment and respecting our country are important duties.",
  },
  {
    id: 8,
    level: 2,
    category: "Child Rights and Protection",
    question:
      "What should you do if you see a child being forced to work in dangerous conditions?",
    options: [
      "Ignore it",
      "Report it to Childline 1098 or a trusted adult",
      "Join in helping the child work",
      "Tell the child to keep quiet",
    ],
    correct: 1,
    explanation:
      "Always report child labor to Childline 1098 or tell a trusted adult. Every child deserves protection!",
  },
  {
    id: 9,
    level: 2,
    category: "Traffic Rules",
    question: "When can pedestrians cross the road safely?",
    options: [
      "Anywhere they want",
      "Only at zebra crossings or pedestrian signals",
      "When there are no vehicles in sight",
      "While running fast",
    ],
    correct: 1,
    explanation:
      "Always use zebra crossings and follow traffic signals for your safety!",
  },
  {
    id: 10,
    level: 2,
    category: "Consumer Rights",
    question: "The Consumer Protection Act protects you against:",
    options: [
      "Only defective products",
      "Only overpricing",
      "Defective products, unfair trade practices, and services",
      "Only online shopping issues",
    ],
    correct: 2,
    explanation:
      "Consumer protection covers many things - bad products, unfair practices, and poor services!",
  },
  // Challenge 3
  {
    id: 11,
    level: 3,
    category: "Environment Laws",
    question: "Cutting trees without permission can lead to:",
    options: [
      "A warning letter only",
      "No consequences",
      "Legal penalties like fines or imprisonment",
      "Reward from the government",
    ],
    correct: 2,
    explanation:
      "Trees are precious! Cutting them illegally can result in serious legal consequences.",
  },
  {
    id: 12,
    level: 3,
    category: "Cyber Law",
    question: "Which of these is an example of cybercrime?",
    options: [
      "Helping a friend with homework",
      "Sending a threatening message online",
      "Posting your own pictures on social media",
      "Playing online games",
    ],
    correct: 1,
    explanation:
      "Threatening messages online are cybercrime. Always be kind and respectful on the internet!",
  },
  {
    id: 13,
    level: 3,
    category: "Juvenile Justice",
    question:
      "If a child breaks a law, what is the main aim of the juvenile justice system?",
    options: [
      "Punish the child like an adult",
      "Send the child to jail forever",
      "Reform and help the child improve",
      "Ignore the offence",
    ],
    correct: 2,
    explanation:
      "The juvenile justice system focuses on helping children learn and become better citizens!",
  },
  {
    id: 14,
    level: 3,
    category: "Court System",
    question: "Which court handles serious crimes and appeals in your state?",
    options: ["District Court", "High Court", "Supreme Court", "Village court"],
    correct: 1,
    explanation:
      "High Courts handle serious cases and appeals in each state of India!",
  },
  {
    id: 15,
    level: 3,
    category: "Digital Safety",
    question: "What is the safest way to protect your online accounts?",
    options: [
      "Use the same password for all sites",
      "Share passwords only with close friends",
      "Use strong, unique passwords and enable two-factor authentication",
      "Write passwords on your notebook",
    ],
    correct: 2,
    explanation:
      "Strong, unique passwords and two-factor authentication keep your accounts super safe!",
  },
  {
    id: 16,
    level: 3,
    category: "Legal Awareness",
    question: "Why is knowing your rights and duties important?",
    options: [
      "So you can break the law without getting caught",
      "To become responsible citizens and help society grow",
      "So you can argue with adults",
      "To avoid school",
    ],
    correct: 1,
    explanation:
      "Knowing your rights and duties helps you become a responsible citizen who makes society better!",
  },
];

const GameHeader = ({ score, currentLevel, timeLeft, gamePhase }) => (
  <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white p-4 rounded-lg shadow-lg mb-6">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl animate-bounce">🏰</div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Law Labyrinth</h1>
          <p className="text-sm text-purple-200">
            Maze of Choices - Hard Level
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="font-bold">{score} pts</span>
        </div>
        {gamePhase === "playing" && (
          <>
            <div className="bg-white/20 px-3 py-2 rounded-full text-sm">
              Level {currentLevel}/3
            </div>
            <div
              className={`bg-white/20 px-3 py-2 rounded-full text-sm flex items-center gap-1 ${timeLeft <= 5 ? "animate-pulse bg-red-500/30" : ""
                }`}
            >
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

const MazeMap = ({ currentQuestion, completedQuestions, currentLevel }) => {
  const getNodeStatus = (questionId) => {
    if (completedQuestions.includes(questionId)) return "completed";
    if (questionId === currentQuestion) return "current";
    if (
      questionId === currentQuestion + 1 &&
      completedQuestions.includes(questionId - 1)
    )
      return "available";
    return "locked";
  };

  const getNodeColor = (status, level) => {
    const levelColors = {
      1: {
        completed: "bg-green-500",
        current: "bg-blue-500 animate-pulse",
        available: "bg-blue-300",
        locked: "bg-gray-300",
      },
      2: {
        completed: "bg-purple-500",
        current: "bg-orange-500 animate-pulse",
        available: "bg-orange-300",
        locked: "bg-gray-300",
      },
      3: {
        completed: "bg-red-500",
        current: "bg-pink-500 animate-pulse",
        available: "bg-pink-300",
        locked: "bg-gray-300",
      },
    };
    return levelColors[level][status];
  };

  const renderLevel = (level) => {
    const startId = (level - 1) * 5 + 1;
    const endId = level * 5;
    const levelQuestions = questions.filter((q) => q.level === level);

    return (
      <div key={level} className="mb-12">
        <div className="text-center mb-4">
          <h3
            className={`text-lg font-bold ${level === 1
              ? "text-green-600"
              : level === 2
                ? "text-purple-600"
                : "text-red-600"
              }`}
          >
            Challenge {level}
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {levelQuestions.map((question) => {
            const status = getNodeStatus(question.id);
            const nodeColor = getNodeColor(status, level);

            return (
              <div key={question.id} className="relative  space-y-5">
                <div className=" flex items-center justify-center">
                  <div
                    className={`w-12 min-h-12  rounded-full ${nodeColor} flex items-center justify-center text-white font-bold shadow-lg transform transition-all duration-300 ${status === "current" ? "scale-110" : "hover:scale-105"
                      }`}
                  >
                    {status === "completed" ? (
                      <CheckCircle className="w-6 h-6 text-center" />
                    ) : (
                      <span className="text-sm">{question.id}</span>
                    )}
                  </div>
                </div>
                <div className="text-xs  text-center w-20">
                  <div
                    className={`${status === "current"
                      ? "font-bold text-blue-600"
                      : "text-gray-600 mt-6"
                      }`}
                  >
                    {question.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-orange-100 rounded-xl p-6 shadow-lg mb-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          🗺️ Maze Progress
        </h2>
        <p className="text-gray-600 text-sm">
          Complete each challenge to unlock the next level!
        </p>
      </div>
      {[1, 2, 3].map((level) => renderLevel(level))}
    </div>
  );
};

const QuestionCard = ({
  question,
  onAnswer,
  timeLeft,
  selectedAnswer,
  showResult,
}) => {
  const getLevelColor = (level) => {
    const colors = {
      1: "from-green-400 to-green-600",
      2: "from-purple-400 to-purple-600",
      3: "from-red-400 to-red-600",
    };
    return colors[level];
  };

  const getOptionStyle = (index) => {
    if (!showResult) {
      return selectedAnswer === index
        ? "bg-blue-100 border-blue-400 scale-105"
        : "bg-white border-gray-200 hover:border-blue-300 hover:scale-102";
    }

    if (index === question.correct) {
      return "bg-green-100 border-green-400 scale-105";
    } else if (selectedAnswer === index && index !== question.correct) {
      return "bg-red-100 border-red-400";
    }
    return "bg-gray-50 border-gray-200";
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl shadow-lg overflow-hidden">
      <div
        className={`bg-gradient-to-r ${getLevelColor(
          question.level
        )} text-white p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Checkpoint {question.id}</h3>
              <p className="text-sm opacity-90">{question.category}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">Challenge {question.level}</div>
            <div className={`text-sm ${timeLeft <= 5 ? "animate-pulse" : ""}`}>
              {timeLeft}s remaining
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-violet-700 mb-4 leading-relaxed">
            {question.question}
          </h4>

          <div className="w-full bg-violet-100 rounded-full h-2 mb-4">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft > 10
                ? "bg-lime-400"
                : timeLeft > 5
                  ? "bg-orange-300"
                  : "bg-pink-400"
                }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && onAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-300 ${getOptionStyle(
                index
              )}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${showResult && index === question.correct
                    ? "bg-lime-400 text-white"
                    : showResult &&
                      selectedAnswer === index &&
                      index !== question.correct
                      ? "bg-pink-300 text-white"
                      : "bg-blue-100 text-blue-600"
                    }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
                {showResult && index === question.correct && (
                  <CheckCircle className="w-5 h-5 text-lime-400" />
                )}
                {showResult &&
                  selectedAnswer === index &&
                  index !== question.correct && (
                    <XCircle className="w-5 h-5 text-pink-300" />
                  )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div
            className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.correct
              ? "bg-lime-50 border-2 border-lime-200"
              : "bg-orange-50 border-2 border-orange-200"
              }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === question.correct ? (
                <>
                  <CheckCircle className="w-5 h-5 text-lime-400" />
                  <span className="font-bold text-lime-700">
                    Correct! +10 points
                  </span>
                </>
              ) : selectedAnswer === -1 ? (
                <>
                  <XCircle className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-700">Time's up</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-700">Try again!</span>
                </>
              )}
            </div>
            <p className="text-sm text-violet-800">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CompletionScreen = ({ score, totalQuestions, timeBonus, onRestart }) => {
  const maxScore = totalQuestions * 10 + timeBonus;
  const percentage = (score / maxScore) * 100;

  useEffect(() => {
    if (percentage >= 90) {
      completeLawChallenge(3, 0);
    }
  }, [percentage]);

  console.log(score, totalQuestions, timeBonus);

  const getBadge = () => {
    if (percentage >= 90)
      return {
        emoji: "👑",
        title: "Legal Master!",
        color: "text-yellow-500",
        bg: "from-yellow-400 to-orange-500",
      };
    if (percentage >= 80)
      return {
        emoji: "🏆",
        title: "Legal Hero!",
        color: "text-blue-500",
        bg: "from-blue-400 to-purple-500",
      };
    if (percentage >= 70)
      return {
        emoji: "⭐",
        title: "Legal Champion!",
        color: "text-green-500",
        bg: "from-green-400 to-blue-500",
      };
    if (percentage >= 60)
      return {
        emoji: "🎯",
        title: "Legal Explorer!",
        color: "text-purple-500",
        bg: "from-purple-400 to-pink-500",
      };
    return {
      emoji: "📚",
      title: "Legal Learner!",
      color: "text-indigo-500",
      bg: "from-indigo-400 to-purple-500",
    };
  };

  const badge = getBadge();

  return (
    <div className="text-center space-y-6">
      <div className="text-8xl animate-bounce mb-6">{badge.emoji}</div>

      <div
        className={`bg-gradient-to-br ${badge.bg} text-white p-8 rounded-xl shadow-xl`}
      >
        <h2 className="text-3xl font-bold mb-4">
          {percentage >= 90
            ? "Outstanding!"
            : percentage >= 80
              ? "Great Job!"
              : percentage >= 70
                ? "Well Done!"
                : percentage >= 60
                  ? "Nice Try!"
                  : "Keep Learning!"}
        </h2>
        <h3 className="text-xl mb-6">{badge.title}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-sm opacity-90">Total Score</div>
          </div>
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold">{Math.round(percentage)}%</div>
            <div className="text-sm opacity-90">Accuracy</div>
          </div>
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-2xl font-bold">{timeBonus}</div>
            <div className="text-sm opacity-90">Time Bonus</div>
          </div>
        </div>

        <div className="bg-white/10 rounded-full h-4 overflow-hidden mb-4">
          <div
            className="bg-white h-full transition-all duration-2000 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-lg font-semibold text-gray-700">
          {percentage >= 90
            ? "🎉 You’ve aced the Law Labyrinth with flying colors!"
            : percentage >= 80
              ? "🚀 You’re almost a legal legend!"
              : percentage >= 70
                ? "✨ Solid effort in mastering key laws!"
                : percentage >= 60
                  ? "📘 You’ve made good progress. Keep it up!"
                  : "🧠 Keep exploring and learning. You’ll get there!"}
        </div>
        <p className="text-gray-600">
          {percentage >= 70
            ? "You're now better equipped to be a responsible citizen and legal hero!"
            : "Review some topics and try again to boost your score!"}
        </p>

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default function MazeOfChoices() {
  const { completeLawChallenge } = useLaw();
  const [gamePhase, setGamePhase] = useState("menu"); // menu, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeBonus, setTimeBonus] = useState(0);
  const [levelCorrectAnswers, setLevelCorrectAnswers] = useState({
    1: [],
    2: [],
    3: [],
  });

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());


  const currentQuestionData = questions.find((q) => q.id === currentQuestion);
  const currentLevel = currentQuestionData ? currentQuestionData.level : 1;

  useEffect(() => {
    if (gamePhase === "completed") {
      const endTime = Date.now();
      const timeTakenSec = Math.floor((endTime - startTime) / 1000);
      const maxScore = 160; // 16 questions * 10 points each
      const totalScore = score; // Already includes timeBonus

      const scaledScore = Math.round((totalScore / maxScore) * 10); // out of 10
      const accuracyPercent = Math.round((totalScore / maxScore) * 100); // out of 100

      updatePerformance({
        moduleName: "Law",
        topicName: "learnedCounsel",
        score: scaledScore,
        accuracy: accuracyPercent,
        avgResponseTimeSec: Math.round(timeTakenSec / 16),
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: true,

      });
      setStartTime(Date.now());

    }
  }, [gamePhase]);


  useEffect(() => {
    let timer;
    if (gamePhase === "playing" && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gamePhase === "playing" && timeLeft === 0 && !showResult) {
      // Time up - treat as wrong answer
      setSelectedAnswer(-1);
      setShowResult(true);

      const currentLevel = currentQuestionData.level;

      // Always mark question as completed (attempted)
      setCompletedQuestions([...completedQuestions, currentQuestion]);

      setTimeout(() => {
        // Check if we've completed all questions in current level
        const currentLevelQuestions = questions.filter(
          (q) => q.level === currentLevel
        );
        const attemptedInLevel = [
          ...completedQuestions,
          currentQuestion,
        ].filter((qId) => {
          const q = questions.find((quest) => quest.id === qId);
          return q && q.level === currentLevel;
        });

        if (attemptedInLevel.length === currentLevelQuestions.length) {
          // Completed all questions in this level
          const correctInLevel = levelCorrectAnswers[currentLevel] || [];

          if (correctInLevel.length === currentLevelQuestions.length) {
            // All correct - can proceed to next level or finish
            if (currentLevel < 3) {
              const nextLevelStart = currentLevel * 5 + 1;
              setCurrentQuestion(nextLevelStart);
            } else {
              setGamePhase("completed");
              return;
            }
          } else {
            // Some wrong answers - restart this level
            const levelStart = (currentLevel - 1) * 5 + 1;
            setCurrentQuestion(levelStart);
            const otherLevelsCompleted = completedQuestions.filter((qId) => {
              const q = questions.find((quest) => quest.id === qId);
              return q && q.level !== currentLevel;
            });
            setCompletedQuestions(otherLevelsCompleted);
            setLevelCorrectAnswers((prev) => ({
              ...prev,
              [currentLevel]: [],
            }));
          }
        } else {
          // Still have questions left in this level
          setCurrentQuestion(currentQuestion + 1);
        }

        setShowResult(false);
        setSelectedAnswer(null);
        setTimeLeft(15);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [gamePhase, timeLeft, showResult]);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestionData.correct;
    const currentLevel = currentQuestionData.level;

    if (isCorrect) {
      const newScore = score + 10;
      const bonus = timeLeft > 10 ? 5 : timeLeft > 5 ? 3 : 1;
      setScore(newScore + bonus);
      setTimeBonus((prev) => prev + bonus);

      // Track correct answers for this level
      setLevelCorrectAnswers((prev) => ({
        ...prev,
        [currentLevel]: [...prev[currentLevel], currentQuestion],
      }));
    }

    // Always mark question as completed (attempted)
    setCompletedQuestions([...completedQuestions, currentQuestion]);

    setTimeout(() => {
      // Check if we've completed all questions in current level
      const currentLevelQuestions = questions.filter(
        (q) => q.level === currentLevel
      );
      const attemptedInLevel = [...completedQuestions, currentQuestion].filter(
        (qId) => {
          const q = questions.find((quest) => quest.id === qId);
          return q && q.level === currentLevel;
        }
      );

      if (attemptedInLevel.length === currentLevelQuestions.length) {
        // Completed all questions in this level
        const correctInLevel = isCorrect
          ? [...(levelCorrectAnswers[currentLevel] || []), currentQuestion]
          : levelCorrectAnswers[currentLevel];

        if (correctInLevel.length === currentLevelQuestions.length) {
          // All correct - can proceed to next level or finish
          if (currentLevel < 3) {
            // Move to next level
            const nextLevelStart = currentLevel * 5 + 1;
            setCurrentQuestion(nextLevelStart);
          } else {
            // Game completed
            setGamePhase("completed");
            return;
          }
        } else {
          // Some wrong answers - restart this level
          const levelStart = (currentLevel - 1) * 5 + 1;
          setCurrentQuestion(levelStart);
          // Clear completed questions for this level
          const otherLevelsCompleted = completedQuestions.filter((qId) => {
            const q = questions.find((quest) => quest.id === qId);
            return q && q.level !== currentLevel;
          });
          setCompletedQuestions(otherLevelsCompleted);
          // Clear correct answers for this level
          setLevelCorrectAnswers((prev) => ({
            ...prev,
            [currentLevel]: [],
          }));
        }
      } else {
        // Still have questions left in this level
        setCurrentQuestion(currentQuestion + 1);
      }

      setShowResult(false);
      setSelectedAnswer(null);
      setTimeLeft(15);
    }, 2000);
  };

  const handleStart = () => {
    setGamePhase("playing");
    setCurrentQuestion(1);
    setCompletedQuestions([]);
    setScore(0);
    setTimeLeft(15);
    setTimeBonus(0);
  };

  const handleRestart = () => {
    setGamePhase("menu");
    setCurrentQuestion(1);
    setCompletedQuestions([]);
    setLevelCorrectAnswers({ 1: [], 2: [], 3: [] }); // Add this line
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeBonus(0);
    setStartTime(Date.now());

  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          score={score}
          currentLevel={currentLevel}
          timeLeft={timeLeft}
          gamePhase={gamePhase}
        />

        <div className="bg-gradient-to-br from-yellow-100 to-red-300  backdrop-blur-sm rounded-xl shadow-xl p-6">
          {gamePhase === "menu" && (
            <div className="text-center space-y-6">
              <div className="text-8xl animate-bounce mb-6">🏰</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Law Labyrinth!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                You're trapped in a magical maze filled with legal puzzles!
                Answer questions correctly to open doors and find your way out.
                Can you become a Legal Hero? 🌟
              </p>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-2 border-orange-200 max-w-2xl mx-auto mb-8">
                <h3 className="font-bold text-orange-700 mb-3 flex items-center justify-center gap-2">
                  <Target className="w-5 h-5" />
                  Game Rules
                </h3>
                <div className="text-sm text-orange-600 space-y-2">
                  <p>
                    • Answer legal questions to progress through 3 challenging
                    levels
                  </p>
                  <p>• Each correct answer = 10 points + time bonus</p>
                  <p>
                    • To unlock the next level, you must answer all questions of
                    the current level correctly
                  </p>
                  <p>
                    • Otherwise, you will be redirected to the current level
                  </p>
                  <p>• 15 seconds per question - think fast!</p>
                  <p>• Complete all 15 questions to escape the maze</p>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
              >
                <Play className="w-6 h-6" />
                Start Maze Adventure!
              </button>
            </div>
          )}

          {gamePhase === "playing" && (
            <div className="space-y-6">
              <MazeMap
                currentQuestion={currentQuestion}
                completedQuestions={completedQuestions}
                currentLevel={currentLevel}
              />

              {currentQuestionData && (
                <QuestionCard
                  question={currentQuestionData}
                  onAnswer={handleAnswer}
                  timeLeft={timeLeft}
                  selectedAnswer={selectedAnswer}
                  showResult={showResult}
                />
              )}
            </div>
          )}

          {gamePhase === "completed" && (
            <CompletionScreen
              score={score}
              totalQuestions={16}
              timeBonus={timeBonus}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
}
