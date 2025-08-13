import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  PieChart, 
  Target, 
  TrendingUp, 
  Wallet, 
  ShoppingCart, 
  BookOpen, 
  Smartphone,
  Gift,
  CheckCircle, 
  XCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

const Module2 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentBudgetStep, setCurrentBudgetStep] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState({});
  const [showQuizFeedback, setShowQuizFeedback] = useState({});
  const [budgetCalculator, setBudgetCalculator] = useState({
    income: 2000,
    needs: 1000,
    wants: 600,
    savings: 400
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBudgetStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const budgetingBenefits = [
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Avoid going broke",
      description: "Don't run out of money in the second week",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Cover your needs",
      description: "Make sure you have enough for essentials",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Save for wants",
      description: "Plan for things you desire like phones or games",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Build wealth",
      description: "Make your money grow over time",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  const exampleBudget = [
    { category: "Canteen snacks", amount: 600, icon: <ShoppingCart className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
    { category: "Data top-up", amount: 200, icon: <Smartphone className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-600" },
    { category: "Birthday gift for friend", amount: 300, icon: <Gift className="w-6 h-6" />, color: "bg-teal-100 text-teal-600" },
    { category: "Books for school", amount: 500, icon: <BookOpen className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
    { category: "Save for smartwatch", amount: 400, icon: <Target className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-600" }
  ];

  const rule503020 = [
    {
      percentage: "50%",
      category: "Needs",
      description: "Food, data, books",
      examples: ["Canteen meals", "School supplies", "Transport"],
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      icon: "🥗"
    },
    {
      percentage: "30%", 
      category: "Wants",
      description: "Pizza, games, parties",
      examples: ["Gaming items", "Movies", "Extra snacks"],
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      icon: "🎮"
    },
    {
      percentage: "20%",
      category: "Savings", 
      description: "Gadgets, emergencies",
      examples: ["Future purchases", "Emergency fund", "Investments"],
      color: "bg-gradient-to-r from-teal-500 to-green-500",
      icon: "💰"
    }
  ];

  const budgetingTools = [
    {
      tool: "Envelope Method",
      description: "Put money in different envelopes for different things",
      icon: "✉️",
      pros: ["Visual and simple", "Hard to overspend"],
      color: "bg-green-50 border-green-200"
    },
    {
      tool: "Google Sheets",
      description: "For those who like tracking with numbers",
      icon: "📊",
      pros: ["Detailed tracking", "Easy calculations"],
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      tool: "Mobile Apps",
      description: "Try Walnut, Spendee, or just your Notes app!",
      icon: "📱",
      pros: ["Always with you", "Automatic tracking"],
      color: "bg-teal-50 border-teal-200"
    }
  ];

  const budgetSteps = [
    { step: "1", title: "Track Income", desc: "Know how much money comes in", icon: <DollarSign className="w-8 h-8" /> },
    { step: "2", title: "List Expenses", desc: "Write down where money goes", icon: <Calculator className="w-8 h-8" /> },
    { step: "3", title: "Categorize", desc: "Separate needs from wants", icon: <PieChart className="w-8 h-8" /> },
    { step: "4", title: "Allocate", desc: "Assign money to each category", icon: <Target className="w-8 h-8" /> }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Why is a budget useful?",
      options: [
        "To spend more",
        "To make your money last",
        "To delete money",
        "To hide your money"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "In the 50-30-20 rule, what is the 20% for?",
      options: [
        "Shopping",
        "Snacks", 
        "Savings",
        "Surprise gifts"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Which is a 'want'?",
      options: [
        "Bus pass",
        "Books",
        "New headphones",
        "School uniform"
      ],
      correct: 2
    }
  ];

  const handleQuizAnswer = (questionId, selectedIndex) => {
    setSelectedQuizAnswer(prev => ({
      ...prev,
      [questionId]: selectedIndex
    }));
    setShowQuizFeedback(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  return (
    <div
      id="2"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["2"] = el;
        }
      }}
      className="mb-10"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Calculator className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Budgeting 101
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn to create a plan for your money so it lasts the whole month
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is a Budget Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <Wallet className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is a Budget?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">📋</div>
                <div className="text-left">
                  <p className="text-xl font-semibold text-green-600 mb-4">
                    A budget is a plan for your money.
                  </p>
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                      <div className="text-2xl mr-3">🍱</div>
                      Think of your money like your lunchbox:
                    </h3>
                    <p className="text-gray-700 mb-2">
                      If you eat all your food in the first hour of school, what will you eat later?
                    </p>
                    <p className="text-lg font-medium text-green-600">
                      A budget makes sure your money lasts the <strong>whole month</strong>, just like your food needs to last the <strong>whole day</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Budget Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetingBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`${benefit.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {benefit.icon}
                  <h3 className="font-bold text-lg">{benefit.title}</h3>
                  <p className="text-sm opacity-90">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Formula */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🧮</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Simple Budget Formula
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-2xl md:text-3xl font-bold">
                <div className="bg-green-500 text-white rounded-xl px-6 py-4 text-center">
                  Money In<br/>
                  <span className="text-lg font-normal">(Income)</span>
                </div>
                <div className="text-gray-600 text-4xl">-</div>
                <div className="bg-red-500 text-white rounded-xl px-6 py-4 text-center">
                  Money Out<br/>
                  <span className="text-lg font-normal">(Expenses)</span>
                </div>
                <div className="text-gray-600 text-4xl">=</div>
                <div className="bg-emerald-500 text-white rounded-xl px-6 py-4 text-center">
                  Savings<br/>
                  <span className="text-lg font-normal">(Left Over)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Budget */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Example Budget: ₹2,000 per month
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid gap-4 mb-8">
              {exampleBudget.map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} border-2 border-green-200 rounded-xl p-4 transform hover:scale-105 transition-all duration-300 ${
                    visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(index + 4) * 150}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-semibold text-gray-800">{item.category}</span>
                    </div>
                    <div className="font-bold text-xl text-gray-800">₹{item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="text-green-600">₹2,000 — All planned out! 🎉</span>
              </div>
            </div>
          </div>
        </div>

        {/* 50-30-20 Rule */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              The 50-30-20 Rule (Easy Version)
            </h2>
          </div>
          
          {/* Featured Rule Category (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`${rule503020[currentBudgetStep % 3].color} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="text-6xl mb-4">{rule503020[currentBudgetStep % 3].icon}</div>
                <h3 className="text-4xl font-bold mb-2">{rule503020[currentBudgetStep % 3].percentage}</h3>
                <h4 className="text-2xl font-semibold mb-4">{rule503020[currentBudgetStep % 3].category}</h4>
                <p className="text-xl opacity-90 mb-4">{rule503020[currentBudgetStep % 3].description}</p>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm font-medium">Examples:</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rule503020[currentBudgetStep % 3].examples.map((example, i) => (
                      <span key={i} className="bg-white/30 rounded-full px-3 py-1 text-sm">{example}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Rules Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {rule503020.map((rule, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  (currentBudgetStep % 3) === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                }`}
                onClick={() => setCurrentBudgetStep(index)}
              >
                <div className="text-4xl mb-4">{rule.icon}</div>
                <h3 className="text-3xl font-bold text-green-600 mb-2">{rule.percentage}</h3>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{rule.category}</h4>
                <p className="text-gray-600 mb-4">{rule.description}</p>
                <div className="space-y-2">
                  {rule.examples.map((example, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 text-sm text-gray-700">{example}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budgeting Tools */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <Calculator className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Budgeting Tools
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {budgetingTools.map((tool, index) => (
              <div
                key={index}
                className={`${tool.color} border-2 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{tool.tool}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="space-y-2">
                    {tool.pros.map((pro, i) => (
                      <div key={i} className="bg-white rounded-lg p-2 text-sm text-green-600 font-medium flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Life Scenario */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Real-Life Scenario
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">The Gaming Mouse Goal 🖱️</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="text-lg font-semibold text-gray-800">Target: Gaming mouse for ₹1,200</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-emerald-200">
                      <div className="text-lg font-semibold text-gray-800">Plan: Save ₹300 every month</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-teal-200">
                      <div className="text-lg font-semibold text-gray-800">Timeline: 4 months</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6">
                    <div className="text-3xl mb-3">🎉</div>
                    <h4 className="text-xl font-bold mb-2">Result:</h4>
                    <p className="text-lg">You bought it without asking anyone for money!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quiz Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Test Your Knowledge
            </h2>
          </div>
          
          <div className="space-y-8">
            {quizQuestions.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{quiz.question}</h3>
                <div className="grid gap-3">
                  {quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(quiz.id, index)}
                      className={`p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedQuizAnswer[quiz.id] === index
                          ? index === quiz.correct
                            ? 'bg-green-100 border-2 border-green-500 text-green-700'
                            : 'bg-red-100 border-2 border-red-500 text-red-700'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                      disabled={showQuizFeedback[quiz.id]}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showQuizFeedback[quiz.id] && selectedQuizAnswer[quiz.id] === index && (
                          index === quiz.correct ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {showQuizFeedback[quiz.id] && (
                  <div className={`mt-4 p-3 rounded-lg ${
                    selectedQuizAnswer[quiz.id] === quiz.correct 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedQuizAnswer[quiz.id] === quiz.correct 
                      ? '🎉 Correct! Great budgeting knowledge!' 
                      : `❌ Incorrect. The correct answer is: ${quiz.options[quiz.correct]}`
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 border-l-4 border-emerald-400">
          <div className="text-center">
            <div className="text-4xl mb-4">💭</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Reflection Challenge
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 font-medium mb-4">Try this:</p>
              <p className="text-gray-600 mb-4">
                Track your spending for the next 7 days. Where is most of your money going?
              </p>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Use one of the budgeting tools we learned about!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Module2;