import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  PiggyBank, 
  CreditCard, 
  Smartphone, 
  Building2, 
  TrendingUp, 
  Lock, 
  ArrowUpDown, 
  CheckCircle, 
  XCircle,
  Banknote,
  Wallet,
  Globe,
  Clock,
  Target
} from 'lucide-react';

const Module1 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentAccountType, setCurrentAccountType] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState({});
  const [showQuizFeedback, setShowQuizFeedback] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAccountType((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const bankFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keeps your money safe",
      description: "Like a secure vault for your savings",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: <ArrowUpDown className="w-8 h-8" />,
      title: "Easy withdrawals anytime",
      description: "Access your money whenever you need it",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Earn interest on savings",
      description: "Your money grows while it sits safely",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Digital payment options",
      description: "Pay without carrying cash everywhere",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  const accountTypes = [
    {
      type: "Savings Account",
      icon: "💰",
      purpose: "For saving and daily use",
      interest: "Yes (2-4%)",
      withdrawal: "Yes, anytime",
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      type: "Fixed Deposit (FD)",
      icon: "🔒",
      purpose: "For locking money for months/years",
      interest: "Higher (5-7%)",
      withdrawal: "No (until period ends)",
      color: "bg-gradient-to-r from-emerald-500 to-teal-500"
    },
    {
      type: "Current Account",
      icon: "🏢",
      purpose: "Mostly for businesses",
      interest: "No",
      withdrawal: "Yes, unlimited times",
      color: "bg-gradient-to-r from-teal-500 to-green-500"
    }
  ];

  const digitalTools = [
    {
      tool: "ATM/Debit Card",
      description: "Pull out money from an ATM or pay in shops",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-green-50 border-green-200"
    },
    {
      tool: "Net Banking",
      description: "Use a website to check and send money",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      tool: "Mobile Banking App",
      description: "Use your phone to do everything — send, receive, check",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-teal-50 border-teal-200"
    },
    {
      tool: "Digital Wallet (like Paytm)",
      description: "Keep small amounts to pay instantly for snacks, auto rides, etc.",
      icon: <Wallet className="w-6 h-6" />,
      color: "bg-green-50 border-green-200"
    }
  ];

  const comparisonData = [
    { feature: "Safe for big savings?", wallet: "❌", bank: "✅" },
    { feature: "Gives interest?", wallet: "❌", bank: "✅" },
    { feature: "Very fast for small payments?", wallet: "✅", bank: "✅" },
    { feature: "Government protection?", wallet: "❌", bank: "✅" }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main job of a bank?",
      options: [
        "Take money and hide it",
        "Spend your money",
        "Keep it safe and give interest",
        "Sell things"
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Which account type is best for everyday spending?",
      options: [
        "Fixed Deposit",
        "Savings Account",
        "Current Account",
        "Gold Account"
      ],
      correct: 1
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
      id="1"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["1"] = el;
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
                <Building2 className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Basics of Banking
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover how banks work and why they're like safe houses for your money
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is a Bank Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <Building2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is a Bank?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🏦</div>
                <div className="text-left">
                  <p className="text-lg text-gray-700 mb-4">
                    Imagine you have ₹500. You don't want to lose it or spend it all at once. So what do you do?
                  </p>
                  <p className="text-xl font-semibold text-green-600 mb-4">
                    You put it in a bank. Why? Because banks are like safe houses for your money.
                  </p>
                  <p className="text-lg text-gray-700">
                    A bank is a place that keeps your money secure and helps it grow!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bankFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Banking Works */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔄</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Happens When You Put Money in a Bank?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", action: "You deposit it", icon: <PiggyBank className="w-8 h-8" />, desc: "Put money in safely" },
              { step: "2", action: "Bank gives loans", icon: <Banknote className="w-8 h-8" />, desc: "To other people who need it" },
              { step: "3", action: "They charge interest", icon: <TrendingUp className="w-8 h-8" />, desc: "On loans they give out" },
              { step: "4", action: "You earn interest", icon: <Target className="w-8 h-8" />, desc: "Both sides win!" }
            ].map((step, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-200 transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <div className="text-green-600 mb-3 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{step.action}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Types Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Types of Bank Accounts
            </h2>
          </div>
          
          {/* Featured Account Type (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`${accountTypes[currentAccountType].color} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="text-6xl mb-4">{accountTypes[currentAccountType].icon}</div>
                <h3 className="text-3xl font-bold mb-4">{accountTypes[currentAccountType].type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="font-semibold">Purpose:</div>
                    <div>{accountTypes[currentAccountType].purpose}</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="font-semibold">Interest:</div>
                    <div>{accountTypes[currentAccountType].interest}</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="font-semibold">Withdrawal:</div>
                    <div>{accountTypes[currentAccountType].withdrawal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Account Types Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {accountTypes.map((account, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentAccountType === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                }`}
                onClick={() => setCurrentAccountType(index)}
              >
                <div className="text-4xl mb-4">{account.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{account.type}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-green-600">Purpose: </span>
                    {account.purpose}
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Interest: </span>
                    {account.interest}
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Withdrawal: </span>
                    {account.withdrawal}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Banking Tools */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Digital Banking Tools You Use
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {digitalTools.map((tool, index) => (
              <div
                key={index}
                className={`${tool.color} border-2 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-lg p-3 flex-shrink-0">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.tool}</h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Wallet vs Bank Account Comparison */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Digital Wallet vs Bank Account
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-green-200">
                  <th className="text-left p-4 font-bold text-gray-800">Feature</th>
                  <th className="text-center p-4 font-bold text-emerald-600">Digital Wallet (Paytm, GPay)</th>
                  <th className="text-center p-4 font-bold text-green-600">Bank Account</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-green-100 hover:bg-green-50 transition-colors duration-200">
                    <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                    <td className="p-4 text-center text-2xl">{row.wallet}</td>
                    <td className="p-4 text-center text-2xl">{row.bank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-bold text-green-700 mb-2">Pro Tip:</h3>
                <p className="text-gray-700">Always link your digital wallet to a bank for safety and easy money transfers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Life Example */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Real-Life Example
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Birthday Money Strategy:</h3>
              <p className="text-lg text-gray-700 mb-6">Let's say you get ₹1,000 for your birthday. You:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">₹800</div>
                    <h4 className="font-bold text-gray-800">Bank Account</h4>
                  </div>
                  <p className="text-gray-600">Keep it safe and earn interest</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">₹200</div>
                    <h4 className="font-bold text-gray-800">Paytm Wallet</h4>
                  </div>
                  <p className="text-gray-600">For quick snacks and shopping</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-green-600">That's using both wisely! 🎉</p>
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
                      ? '🎉 Correct! Well done!' 
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
              Reflection Prompt
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 font-medium mb-4">Ask someone at home:</p>
              <p className="text-gray-600">
                When did they open their first bank account? Was it online or in person? Did they get a debit card?
              </p>
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

export default Module1;