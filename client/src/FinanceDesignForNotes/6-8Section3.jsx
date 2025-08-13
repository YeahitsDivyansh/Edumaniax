import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, AlertTriangle, CheckCircle, XCircle, TrendingUp, Clock, Calculator, Shield, Info } from 'lucide-react';

const Module3 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentExample, setCurrentExample] = useState(0);
  const [selectedComparison, setSelectedComparison] = useState('smart');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const creditTypes = [
    {
      type: "Loan",
      description: "Money borrowed for something big — like college or a car",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      type: "Credit Card", 
      description: "A card that lets you spend now and repay later",
      icon: <CreditCard className="w-8 h-8" />,
      color: "from-emerald-500 to-green-600"
    },
    {
      type: "EMI",
      description: "Equated Monthly Installment — paying for something in small chunks monthly",
      icon: <Calculator className="w-8 h-8" />,
      color: "from-green-600 to-teal-600"
    },
    {
      type: "BNPL (Buy Now Pay Later)",
      description: "Apps let you buy stuff now and pay next month",
      icon: <Clock className="w-8 h-8" />,
      color: "from-teal-500 to-green-600"
    }
  ];

  const usageComparison = {
    smart: [
      { text: "Buying school laptop with 0% EMI", icon: <CheckCircle className="w-6 h-6 text-green-600" /> },
      { text: "Emergency hospital bill", icon: <CheckCircle className="w-6 h-6 text-green-600" /> },
      { text: "Paying full amount on time", icon: <CheckCircle className="w-6 h-6 text-green-600" /> }
    ],
    risky: [
      { text: "Shopping online every day and not paying bills", icon: <XCircle className="w-6 h-6 text-red-500" /> },
      { text: "Buying expensive clothes on credit for fun", icon: <XCircle className="w-6 h-6 text-red-500" /> },
      { text: "Paying only minimum due — and interest grows!", icon: <XCircle className="w-6 h-6 text-red-500" /> }
    ]
  };

  const examples = [
    { amount: "₹500", item: "cricket bat", payback: "₹550", interest: "₹50", timeframe: "next month" },
    { amount: "₹1000", item: "school books", payback: "₹1100", interest: "₹100", timeframe: "in 2 months" },
    { amount: "₹300", item: "headphones", payback: "₹330", interest: "₹30", timeframe: "next week" }
  ];

  return (
    <div
      id="3"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["3"] = el;
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
                <CreditCard className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              What Is Credit and Why It Matters
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Understanding the power of borrowing money and using it wisely
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Is Credit? */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 mb-6">
              <Info className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-700 font-semibold">Core Concept</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Is Credit?
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Credit means borrowing money now and paying it back later.
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Let's say you want to buy something but don't have enough money right now. 
                  A friend or a bank lends you money — that's credit. But here's the catch: 
                  you must pay it back with <strong className="text-green-600">interest</strong> (extra money).
                </p>
              </div>
            </div>

            {/* Dynamic Example */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-4">💡 Real-Life Example</div>
                <div className="bg-white/20 rounded-xl p-6">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">{examples[currentExample].amount}</div>
                      <div className="text-sm opacity-90">You borrow</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">{examples[currentExample].item}</div>
                      <div className="text-sm opacity-90">To buy</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-yellow-200">{examples[currentExample].payback}</div>
                      <div className="text-sm opacity-90">You pay back</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-lg">
                      That extra <strong className="text-yellow-200">{examples[currentExample].interest}</strong>? 
                      That's <strong>interest</strong> — the cost of borrowing.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Example indicator dots */}
              <div className="flex justify-center space-x-2">
                {examples.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentExample === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Types of Credit */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Common Types of Credit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Different ways you can borrow money for different needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditTypes.map((credit, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-r ${credit.color} rounded-xl p-4 text-white mb-4`}>
                  <div className="flex items-center justify-between">
                    {credit.icon}
                    <div className="text-right">
                      <h3 className="text-lg font-bold">{credit.type}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {credit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Smart vs Risky Usage */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-6 py-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">Important Warning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Credit Can Be Tricky
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-full p-2">
                <button
                  onClick={() => setSelectedComparison('smart')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedComparison === 'smart'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Smart Use ✅
                </button>
                <button
                  onClick={() => setSelectedComparison('risky')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedComparison === 'risky'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Risky Use ⚠️
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-600 text-center mb-6">Smart Use</h3>
                {usageComparison.smart.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-green-50 rounded-xl p-4 border-l-4 border-green-400 transition-all duration-500 ${
                      selectedComparison === 'smart' ? 'transform scale-105' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <p className="text-gray-700 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-red-600 text-center mb-6">Risky Use</h3>
                {usageComparison.risky.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-red-50 rounded-xl p-4 border-l-4 border-red-400 transition-all duration-500 ${
                      selectedComparison === 'risky' ? 'transform scale-105' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <p className="text-gray-700 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Debt Warning */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 border-l-4 border-red-400">
          <div className="text-center">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Important Warning
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
              <p className="text-xl text-gray-700 font-semibold leading-relaxed">
                If you keep borrowing and don't pay back, it becomes <strong className="text-red-600">debt</strong>. 
                That's when credit becomes dangerous.
              </p>
            </div>
          </div>
        </div>

        {/* Credit Score Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-green-100 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-700 font-semibold">Your Money Reputation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Credit Score — Your Money Reputation
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Every time you borrow and pay back, the bank gives you a <strong className="text-green-600">credit score</strong>.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <p className="text-gray-700">
                      <strong className="text-green-600">Good credit score</strong> = banks trust you and offer more credit
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <p className="text-gray-700">
                      <strong className="text-red-600">Bad score</strong> = they say "No thanks" when you need a loan later
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧾</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Credit Score</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-4">
                      <div className="text-3xl font-bold mb-2">750+</div>
                      <div className="text-sm opacity-90">Excellent Score</div>
                      <div className="text-xs mt-1">Easy loan approval</div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-4">
                      <div className="text-3xl font-bold mb-2">600-749</div>
                      <div className="text-sm opacity-90">Good Score</div>
                      <div className="text-xs mt-1">Moderate approval</div>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
                      <div className="text-3xl font-bold mb-2">Below 600</div>
                      <div className="text-sm opacity-90">Poor Score</div>
                      <div className="text-xs mt-1">Difficult approval</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Reflection Prompt
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 font-medium">
                <strong className="text-green-600">Ask an adult:</strong> Have you used a credit card? 
                What was it for? Did you ever forget to pay the bill?
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

export default Module3;