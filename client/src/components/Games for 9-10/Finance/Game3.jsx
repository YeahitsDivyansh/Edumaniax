import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Target,
  TrendingUp,
  Gift,
  AlertCircle,
  Star,
  Award,
  Book,
  Home,
  Play,
  RotateCcw,
  CheckCircle,
  X,
  Download,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import InvestmentGuidePDF from "./Game3PDF";
import { pdf } from "@react-pdf/renderer";
import { useFinance } from "@/contexts/FinanceContext";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance 

const BudgetBossGame = () => {
  const { completeFinanceChallenge } = useFinance();
  const [currentPage, setCurrentPage] = useState("intro");
  const [currentMonth, setCurrentMonth] = useState(1);
  const [totalIncome] = useState(2000);
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);
  const [surpriseEvents, setSurpriseEvents] = useState([]);
  const [draggedAmount, setDraggedAmount] = useState(null);
  const [currentBudget, setCurrentBudget] = useState({
    needs: { food: 0, stationery: 0, transport: 0 },
    wants: { mobile: 0, snacks: 0, movies: 0 },
    savings: 0,
  });
  const [gameComplete, setGameComplete] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showSurpriseEvent, setShowSurpriseEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // for performance tracking
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const surpriseEventPool = [
    {
      text: "Your cycle tire burst – repair needed!",
      amount: -250,
      type: "expense",
    },
    { text: "Won debate competition – reward!", amount: 200, type: "income" },
    {
      text: "Friend's birthday party – gift needed!",
      amount: -150,
      type: "expense",
    },
    { text: "Found money in old jacket pocket!", amount: 100, type: "income" },
    { text: "Library book damaged – fine!", amount: -80, type: "expense" },
    { text: "Helped neighbor – earned reward!", amount: 150, type: "income" },
  ];

  const categories = {
    needs: [
      {
        id: "food",
        name: "Food",
        recommended: 500,
        icon: "🍎",
        color: "bg-green-500",
      },
      {
        id: "stationery",
        name: "Stationery",
        recommended: 300,
        icon: "📚",
        color: "bg-blue-500",
      },
      {
        id: "transport",
        name: "Transport",
        recommended: 200,
        icon: "🚌",
        color: "bg-yellow-500",
      },
    ],
    wants: [
      {
        id: "mobile",
        name: "Mobile Recharge",
        recommended: 150,
        icon: "📱",
        color: "bg-purple-500",
      },
      {
        id: "snacks",
        name: "Snacks",
        recommended: 200,
        icon: "🍿",
        color: "bg-orange-500",
      },
      {
        id: "movies",
        name: "Movies",
        recommended: 300,
        icon: "🎬",
        color: "bg-red-500",
      },
    ],
  };

  const moneyAmounts = [50, 100, 150, 200, 250, 300, 500];

  const quizQuestions = [
    {
      id: 1,
      question: "Which item is a 'want'?",
      options: ["School uniform", "Ice cream", "Textbooks", "Bus fare"],
      correct: 1,
    },
    {
      id: 2,
      question: "What happens if you overspend and have an emergency?",
      options: [
        "Nothing happens",
        "You can borrow from friends",
        "You might not have money for important things",
        "Your parents will always help",
      ],
      correct: 2,
    },
    {
      id: 3,
      question: "How much should you ideally save each month?",
      options: ["0%", "At least 10-20%", "50%", "Everything"],
      correct: 1,
    },
  ];

  useEffect(() => {
    if (currentMonth <= 3 && currentPage === "game") {
      triggerSurpriseEvent();
    }
  }, [currentMonth, currentPage]);

  const triggerSurpriseEvent = () => {
    const randomEvent =
      surpriseEventPool[Math.floor(Math.random() * surpriseEventPool.length)];
    setCurrentEvent(randomEvent);
    setShowSurpriseEvent(true);
  };

  const handleSurpriseEventClose = () => {
    setShowSurpriseEvent(false);
    setSurpriseEvents([...surpriseEvents, currentEvent]);
  };

  const handleDragStart = (e, amount) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", amount.toString());
    e.dataTransfer.setData("application/json", JSON.stringify({ amount }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, category, subcategory = null) => {
    e.preventDefault();
    e.stopPropagation();

    let amount;
    try {
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        amount = JSON.parse(data).amount;
      } else {
        amount = parseInt(e.dataTransfer.getData("text/plain"));
      }
    } catch {
      amount = parseInt(e.dataTransfer.getData("text/plain"));
    }

    if (!amount) return;

    const availableMoney = getAvailableMoney();
    if (amount > availableMoney) {
      toast.info(
        `Not enough money! You only have ₹${availableMoney} remaining.`
      );
      return;
    }

    const newBudget = { ...currentBudget };
    if (subcategory) {
      newBudget[category][subcategory] += amount;
    } else {
      newBudget[category] += amount;
    }

    const totalAllocated = calculateTotalAllocated(newBudget);

    // Check if this allocation would exceed available money
    console.log(amount, availableMoney);

    setCurrentBudget(newBudget);

    // Check if all money is spent
    const newAvailable = availableMoney - amount;
    if (newAvailable === 0) {
      console.log("Hi");
      toast.info("Perfect! You've allocated all your money! 🎉");
      return;
    }
  };

  const calculateTotalAllocated = (budget) => {
    const needsTotal = Object.values(budget.needs).reduce(
      (sum, val) => sum + val,
      0
    );
    const wantsTotal = Object.values(budget.wants).reduce(
      (sum, val) => sum + val,
      0
    );
    return needsTotal + wantsTotal + budget.savings;
  };

  const finishMonth = () => {
    // Apply surprise event effect to available money
    let adjustedIncome = totalIncome;
    let eventEffect = 0;

    if (currentEvent) {
      eventEffect = currentEvent.amount;
      adjustedIncome += eventEffect; // Add if positive (income), subtract if negative (expense)
    }

    const monthData = {
      month: currentMonth,
      budget: { ...currentBudget },
      surpriseEvent: currentEvent,
      adjustedIncome: adjustedIncome,
      eventEffect: eventEffect,
      totalSaved: currentBudget.savings,
      totalSpent:
        calculateTotalAllocated(currentBudget) - currentBudget.savings,
    };

    setMonthlyBudgets([...monthlyBudgets, monthData]);

    if (currentMonth === 3) {
      // for performance
      const finalScore = Math.round(calculateScore() / 10); // ✅ scale to 0–10 and round
      const totalTime = (Date.now() - startTime) / 1000; // in seconds
      const studyTimeMinutes = Math.ceil(totalTime / 60);

      updatePerformance({
        moduleName: "Finance",
        topicName: "budgetExpert",
        score: finalScore,
        accuracy: finalScore * 10,
        avgResponseTimeSec: totalTime,
        studyTimeMinutes,
        completed: true,

      });
      setStartTime(Date.now());
      completeFinanceChallenge(0, 2); // ✅ Marks the challenge as complete
      setGameComplete(true);
      setCurrentPage("results");
    } else {
      setCurrentMonth(currentMonth + 1);
      setCurrentBudget({
        needs: { food: 0, stationery: 0, transport: 0 },
        wants: { mobile: 0, snacks: 0, movies: 0 },
        savings: 0,
      });
      setCurrentEvent(null); // Reset event for next month
    }
  };

  const calculateScore = () => {
    const totalSavings = monthlyBudgets.reduce(
      (sum, month) => sum + month.totalSaved,
      0
    );
    const avgSavingsRate = (totalSavings / (totalIncome * 3)) * 100;
    return Math.min(Math.max(avgSavingsRate * 2, 0), 100);
  };

  const resetGame = () => {
    setCurrentPage("intro");
    setCurrentMonth(1);
    setMonthlyBudgets([]);
    setSurpriseEvents([]);
    setCurrentBudget({
      needs: { food: 0, stationery: 0, transport: 0 },
      wants: { mobile: 0, snacks: 0, movies: 0 },
      savings: 0,
    });
    setGameComplete(false);
    setShowEducation(false);
    setQuizAnswers({});
    setShowQuiz(false);
    setQuizScore(0);
    setQuizCompleted(false);
    setStartTime(Date.now());
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizCompleted(true);
  };

  const getAvailableMoney = () => {
    let available = totalIncome - calculateTotalAllocated(currentBudget);
    if (currentEvent) {
      available += currentEvent.amount;
    }
    return available;
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  // Intro Page
  const IntroPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center transform hover:scale-105 transition-all duration-300">
        <div className="mb-6">
          <div className="text-4xl sm:text-6xl mb-4 animate-bounce">💰</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Budget Boss
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Can you save wisely and still enjoy life?
          </p>
        </div>

        <div className="mb-8 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-xl sm:text-2xl">🏠</div>
            <div className="text-xl sm:text-2xl">📱</div>
            <div className="text-xl sm:text-2xl">🐷</div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700">
            Manage your monthly ₹2,000 budget across needs, wants, and savings!
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentPage("game")}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Start Playing</span>
          </button>

          <button
            onClick={() => setShowEducation(true)}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Book className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Learn First</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Game Page
  const GamePage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-2 sm:p-4">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="text-2xl sm:text-3xl">💰</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Month {currentMonth}/3
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Monthly Income: ₹{totalIncome}
                  {currentEvent && (
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${currentEvent.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {currentEvent.type === "income" ? "+" : ""}₹
                      {currentEvent.amount}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">Remaining</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">
                  ₹{getAvailableMoney()}
                </p>
              </div>
              <button
                onClick={() => setCurrentPage("intro")}
                className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 text-sm"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </div>
          </div>
        </div>

        {/* Money Bills */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Drag Money to Categories
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
            {moneyAmounts.map((amount) => (
              <div
                key={amount}
                draggable
                onDragStart={(e) => handleDragStart(e, amount)}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 sm:py-3 px-1 sm:px-2 rounded-lg cursor-move hover:from-green-500 hover:to-green-700 transition-all duration-300 text-center shadow-lg transform hover:scale-105 text-xs sm:text-sm"
              >
                ₹{amount}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Needs */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-green-600 mb-4 flex items-center">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Needs (Essential)
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {categories.needs.map((category) => (
                <div
                  key={category.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "needs", category.id)}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-2xl">
                        {category.icon}
                      </span>
                      <span className="font-semibold text-sm sm:text-base">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Optimal : ₹{category.recommended}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-green-600">
                      ₹{currentBudget.needs[category.id]}
                    </span>
                    <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                        style={{
                          width: `${Math.min(
                            (currentBudget.needs[category.id] /
                              category.recommended) *
                            100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wants */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-purple-600 mb-4 flex items-center">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Wants (Optional)
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {categories.wants.map((category) => (
                <div
                  key={category.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "wants", category.id)}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-2xl">
                        {category.icon}
                      </span>
                      <span className="font-semibold text-sm sm:text-base">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Optimal : ₹{category.recommended}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-purple-600">
                      ₹{currentBudget.wants[category.id]}
                    </span>
                    <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                        style={{
                          width: `${Math.min(
                            (currentBudget.wants[category.id] /
                              category.recommended) *
                            100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Savings */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-600 mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Savings (Future)
            </h2>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "savings")}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-300 text-center"
            >
              <div className="text-4xl sm:text-6xl mb-4">🐷</div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">
                ₹{currentBudget.savings}
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Drag money here to save!
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (currentBudget.savings / 400) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Goal: ₹400 (20%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Finish Month Button */}
        <div className="mt-4 sm:mt-6 text-center">
          <button
            onClick={finishMonth}
            disabled={calculateTotalAllocated(currentBudget) === 0}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto text-sm sm:text-base"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Finish Month {currentMonth}</span>
          </button>
        </div>
      </div>

      {/* Surprise Event Modal */}
      {showSurpriseEvent && currentEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center transform animate-pulse">
            <div className="text-4xl sm:text-6xl mb-4">
              {currentEvent.type === "income" ? "🎉" : "😱"}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Surprise Event!
            </h3>
            <p className="text-base sm:text-lg mb-4">{currentEvent.text}</p>
            <div
              className={`text-2xl sm:text-3xl font-bold mb-6 ${currentEvent.type === "income"
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {currentEvent.type === "income" ? "+" : ""}₹{currentEvent.amount}
            </div>
            <button
              onClick={handleSurpriseEventClose}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm sm:text-base"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Results Page
  const ResultsPage = () => {
    const handleDownload = async () => {
      const blob = await pdf(<InvestmentGuidePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Finance_Guide.pdf";
      a.click();
      URL.revokeObjectURL(url);
    };
    const score = calculateScore();
    const totalSavings = monthlyBudgets.reduce(
      (sum, month) => sum + month.totalSaved,
      0
    );

    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-2 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center">
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4">🏆</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Budget Boss Results!
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                You've completed 3 months of budgeting!
              </p>
            </div>

            {/* Score */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Your Smart Spending Score
              </h2>
              <div className="relative">
                <div className="text-4xl sm:text-6xl font-bold text-orange-600 mb-2">
                  {Math.round(score)}/100
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-green-100 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-2">💰</div>
                <h3 className="text-lg sm:text-xl font-bold text-green-800">
                  Total Saved
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  ₹{totalSavings}
                </p>
              </div>

              <div className="bg-blue-100 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-2">📊</div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-800">
                  Avg. Savings Rate
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {Math.round((totalSavings / (totalIncome * 3)) * 100)}%
                </p>
              </div>

              <div className="bg-purple-100 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-2">🎯</div>
                <h3 className="text-lg sm:text-xl font-bold text-purple-800">
                  Months Completed
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  3/3
                </p>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Monthly Breakdown
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {monthlyBudgets.map((month, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start "
                  >
                    <div className="mb-2 sm:mb-0">
                      <h4 className="font-bold text-sm sm:text-base">
                        Month {month.month}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Saved: ₹{month.totalSaved}
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm">
                      {month.surpriseEvent && (
                        <span
                          className={`px-2 rounded-xl  ${month.surpriseEvent.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {month.surpriseEvent.text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-4">
                💡 Smart Tips for You
              </h3>
              <div className="space-y-2 text-left text-sm sm:text-base">
                {score >= 80 && (
                  <p className="text-green-700">
                    🌟 Excellent! You're a natural at budgeting!
                  </p>
                )}
                {score >= 60 && score < 80 && (
                  <p className="text-blue-700">
                    👍 Good job! Try to save a bit more each month.
                  </p>
                )}
                {score < 60 && (
                  <p className="text-orange-700">
                    💪 Keep trying! Focus on needs first, then wants.
                  </p>
                )}
                <p className="text-gray-700">
                  • Try to save at least 20% of your income
                </p>
                <p className="text-gray-700">
                  • Always budget for needs before wants
                </p>
                <p className="text-gray-700">
                  • Keep some money for surprise events
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={resetGame}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Play Again</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <Download size={20} />
                Download Investment Guide
              </button>

              <button
                onClick={() => setShowEducation(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Book className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Education Page
  const EducationPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-3xl sm:text-4xl">📚</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Smart Money Learning
              </h1>
            </div>
            <button
              onClick={() => setShowEducation(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Needs vs Wants Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Needs vs Wants
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✅</span>
                  NEEDS (Must Have)
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">📚</span>
                    <span className="font-medium">Stationery</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">🚌</span>
                    <span className="font-medium">School Bus</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">👕</span>
                    <span className="font-medium">Uniform</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">🍎</span>
                    <span className="font-medium">Food</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  WANTS (Nice to Have)
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">🍦</span>
                    <span className="font-medium">Ice Cream</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">📖</span>
                    <span className="font-medium">Comic Books</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">🎮</span>
                    <span className="font-medium">Mobile Games</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <span className="text-xl">🎬</span>
                    <span className="font-medium">Movies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Creation Steps */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              How to Create a Monthly Budget
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-bold text-blue-800 mb-2">Step 1</h3>
                <p className="text-sm text-blue-700">
                  List your income (pocket money, gifts)
                </p>
              </div>
              <div className="bg-green-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-green-800 mb-2">Step 2</h3>
                <p className="text-sm text-green-700">
                  Divide into: Needs, Wants, Savings
                </p>
              </div>
              <div className="bg-purple-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-bold text-purple-800 mb-2">Step 3</h3>
                <p className="text-sm text-purple-700">Track actual spending</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-bold text-yellow-800 mb-2">Step 4</h3>
                <p className="text-sm text-yellow-700">
                  Review and adjust monthly
                </p>
              </div>
            </div>
          </div>

          {/* Why Save Money */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Why Save Money?
            </h2>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white rounded-full p-2">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Helps in emergencies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white rounded-full p-2">
                      <Gift className="w-4 h-4" />
                    </div>
                    <span className="font-medium">
                      Buy something big later (bicycle, gadget)
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-orange-600 mb-2 flex items-center">
                    <span className="text-xl mr-2">🎯</span>
                    Emergency Fund Goal
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Target: Save ₹1,000 for emergencies
                  </p>
                  <p className="text-xs text-gray-600">
                    Use only for unexpected needs, not regular expenses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Test Your Knowledge
            </h2>
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Take Quiz 🧠
            </button>
          </div>

          {/* Action Buttons */}
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
            {!quizCompleted ? (
              <>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Quick Quiz! 🧠
                </h3>
                <div className="space-y-6">
                  {quizQuestions.map((question) => (
                    <div key={question.id} className="border-b pb-4">
                      <h4 className="font-bold mb-3">{question.question}</h4>
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={index}
                              checked={quizAnswers[question.id] === index}
                              onChange={() =>
                                handleQuizAnswer(question.id, index)
                              }
                              className="text-blue-500"
                            />

                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={submitQuiz}
                    className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-green-600 transition-colors"
                  >
                    Submit Quiz
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="flex-1 bg-gray-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {quizScore === 3 ? "🏆" : quizScore >= 2 ? "⭐" : "💪"}
                </div>
                <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                <p className="text-xl mb-4">You scored {quizScore}/3</p>
                <div className="mb-6">
                  {quizScore === 3 && (
                    <p className="text-green-600 font-bold">
                      Perfect! You're a budgeting expert! 🌟
                    </p>
                  )}
                  {quizScore === 2 && (
                    <p className="text-blue-600 font-bold">
                      Great job! Almost perfect! 👍
                    </p>
                  )}
                  {quizScore === 1 && (
                    <p className="text-orange-600 font-bold">
                      Good try! Keep learning! 📚
                    </p>
                  )}
                  {quizScore === 0 && (
                    <p className="text-red-600 font-bold">
                      Keep studying! You'll get it! 💪
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizCompleted(false);
                    setQuizAnswers({});
                    setQuizScore(0);
                  }}
                  className="bg-blue-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Render current page
  if (showEducation) {
    return <EducationPage />;
  }

  switch (currentPage) {
    case "intro":
      return <IntroPage />;
    case "game":
      return <GamePage />;
    case "results":
      return <ResultsPage />;
    default:
      return <IntroPage />;
  }
};

export default BudgetBossGame;
