import React, { useState, useEffect } from 'react';
import { ShoppingCart, Brain, DollarSign, AlertTriangle, CheckCircle, XCircle, Clock, Target, Lightbulb, TrendingDown, Wallet, Calculator, Heart, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

const Module6 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedHabits, setSelectedHabits] = useState({});
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComparison(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scenarios = [
    {
      title: "Scenario A: Quick Spender",
      amount: "₹500 for the week",
      action: "Spend ₹400 on gaming skin today",
      result: "Be broke by Wednesday",
      color: "from-red-400 to-red-500",
      icon: <XCircle className="w-8 h-8" />,
      emotion: "😰"
    },
    {
      title: "Scenario B: Smart Spender", 
      amount: "₹500 for the week",
      action: "Buy lunch (₹75), gift (₹50), save ₹200",
      result: "Still have money for next week",
      color: "from-green-500 to-emerald-500",
      icon: <CheckCircle className="w-8 h-8" />,
      emotion: "😊"
    }
  ];

  const needsVsWants = [
    {
      category: "Needs (Essentials)",
      items: ["School supplies", "Food and snacks", "Bus pass or travel", "Phone data for school"],
      color: "from-green-500 to-emerald-500",
      icon: <Heart className="w-6 h-6" />
    },
    {
      category: "Wants (Extras)", 
      items: ["Designer sneakers", "Extra pizza toppings", "Uber for short walk", "Unlimited streaming plan"],
      color: "from-blue-500 to-purple-500",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const smartQuestions = [
    {
      question: "Do I really need this?",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      question: "Can I afford it?",
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      question: "Will I still want this next week?",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600"
    },
    {
      question: "Is this the best price?",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      question: "What will I have to give up?",
      icon: <Target className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  const goodHabits = [
    {
      habit: "Make a budget before the month/week starts",
      icon: <Calculator className="w-6 h-6" />,
      type: "good"
    },
    {
      habit: "Track your expenses in a diary or app",
      icon: <CheckCircle className="w-6 h-6" />,
      type: "good"
    },
    {
      habit: "Avoid buying just because friends are",
      icon: <Brain className="w-6 h-6" />,
      type: "good"
    },
    {
      habit: "Look for discounts, sales, and cashback",
      icon: <TrendingDown className="w-6 h-6" />,
      type: "good"
    },
    {
      habit: "Wait 24 hours before buying expensive things",
      icon: <Clock className="w-6 h-6" />,
      type: "good"
    }
  ];

  const badHabits = [
    {
      habit: "Spending all pocket money on Day 1",
      icon: <XCircle className="w-6 h-6" />,
      type: "bad"
    },
    {
      habit: "Buying things just to 'fit in'",
      icon: <AlertTriangle className="w-6 h-6" />,
      type: "bad"
    },
    {
      habit: "Ignoring better deals or prices",
      icon: <TrendingDown className="w-6 h-6" />,
      type: "bad"
    },
    {
      habit: "Using credit to buy what you can't afford",
      icon: <DollarSign className="w-6 h-6" />,
      type: "bad"
    },
    {
      habit: "Not checking how much money is left",
      icon: <Wallet className="w-6 h-6" />,
      type: "bad"
    }
  ];

  const handleHabitClick = (index, type) => {
    setSelectedHabits(prev => ({
      ...prev,
      [`${type}-${index}`]: !prev[`${type}-${index}`]
    }));
  };

  return (
    <div
      id="6"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["6"] = el;
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
                <ShoppingCart className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Smart Spending Habits
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn to use your money wisely and make every rupee count
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Are Smart Spending Habits */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Are Smart Spending Habits?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Smart Spending</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Means using your money <strong className="text-green-600">wisely</strong>, not just quickly.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  It's not about never spending — it's about <strong className="text-emerald-600">thinking before spending</strong> and making your money go further.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-l-4 border-emerald-400">
                <h3 className="text-xl font-bold text-gray-800 mb-4">It helps you:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">Stay in control</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">Avoid regrets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">Save for what matters</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-6">🧠</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Think First, Spend Second</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">Pause and think</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">Make smart choices</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-teal-100 to-green-100 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">Feel good about it</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Life Example Scenarios */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <Calculator className="w-12 h-12 text-white mx-auto" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Real-Life Example</h2>
            <p className="text-xl text-gray-600">Which choice feels smarter by Friday?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${scenario.color} text-white rounded-2xl p-8 transform transition-all duration-500 ${
                  currentScenario === index ? 'scale-105 ring-4 ring-white/50' : 'scale-95 opacity-75'
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    {scenario.icon}
                    <span className="text-4xl">{scenario.emotion}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{scenario.title}</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-lg opacity-90 mb-2">You have:</p>
                      <p className="text-xl font-bold">{scenario.amount}</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-lg opacity-90 mb-2">You choose to:</p>
                      <p className="text-lg font-medium">{scenario.action}</p>
                    </div>
                    <div className="bg-white/30 rounded-lg p-4 border-2 border-white/50">
                      <p className="text-lg opacity-90 mb-2">Result:</p>
                      <p className="text-lg font-bold">{scenario.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showComparison && (
            <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 animate-fade-in">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Which choice feels smarter?</h3>
              <p className="text-lg text-gray-700">
                <strong className="text-green-600">Smart spenders</strong> think about how they'll feel 
                <strong className="text-emerald-600"> later</strong>, not just how they feel 
                <strong className="text-red-500"> right now</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Needs vs Wants */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Want vs. Need: What's the Difference?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-3xl mx-auto">
              <p className="text-lg text-gray-700">
                <strong className="text-green-600">Smart spenders</strong> learn to buy what they 
                <strong className="text-emerald-600"> need first</strong>, then save for what they 
                <strong className="text-teal-600"> want later</strong>.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {needsVsWants.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${category.color} text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 2) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="text-center mb-8">
                  <div className="bg-white/20 rounded-full p-4 w-fit mx-auto mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white/20 rounded-lg p-4 transform hover:bg-white/30 transition-all duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <span className="text-lg">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions to Ask Before Buying */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Questions to Ask Before You Buy
            </h2>
            <div className="text-4xl mb-6">💭</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartQuestions.map((q, index) => (
              <div
                key={index}
                className={`${q.color} border-2 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="text-center">
                  <div className="bg-white rounded-full p-3 w-fit mx-auto mb-4">
                    {q.icon}
                  </div>
                  <p className="text-lg font-semibold leading-relaxed">{q.question}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <p className="text-lg text-gray-700">
              <strong className="text-green-600">Pro tip:</strong> If you answer "no" to any of these questions, 
              maybe wait before buying!
            </p>
          </div>
        </div>

        {/* Good vs Bad Habits Interactive */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Good Habits vs Bad Habits
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Click on the habits to learn which ones to follow and which ones to avoid!
            </p>
          </div>

          {/* Good Habits */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-l-4 border-green-400">
            <div className="text-center mb-8">
              <div className="bg-green-500 rounded-full p-4 w-fit mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">✅ Good Spending Habits</h3>
              <p className="text-gray-600">Click to highlight the habits you want to follow!</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goodHabits.map((habit, index) => (
                <div
                  key={index}
                  className={`bg-white border-2 border-green-200 rounded-xl p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    selectedHabits[`good-${index}`] ? 'bg-green-100 border-green-400 shadow-lg' : 'hover:border-green-300'
                  }`}
                  onClick={() => handleHabitClick(index, 'good')}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`rounded-full p-2 ${selectedHabits[`good-${index}`] ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'}`}>
                      {habit.icon}
                    </div>
                    <p className="text-gray-700 font-medium flex-1">{habit.habit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bad Habits */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 border-l-4 border-red-400">
            <div className="text-center mb-8">
              <div className="bg-red-500 rounded-full p-4 w-fit mx-auto mb-4">
                <ThumbsDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">🚫 Bad Spending Habits (To Avoid)</h3>
              <p className="text-gray-600">Click to highlight the habits you want to avoid!</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badHabits.map((habit, index) => (
                <div
                  key={index}
                  className={`bg-white border-2 border-red-200 rounded-xl p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    selectedHabits[`bad-${index}`] ? 'bg-red-100 border-red-400 shadow-lg' : 'hover:border-red-300'
                  }`}
                  onClick={() => handleHabitClick(index, 'bad')}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`rounded-full p-2 ${selectedHabits[`bad-${index}`] ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'}`}>
                      {habit.icon}
                    </div>
                    <p className="text-gray-700 font-medium flex-1">{habit.habit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">🤔</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              Think About It
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                Think of something you bought recently. Was it a <strong className="text-green-600">need</strong> or a <strong className="text-blue-600">want</strong>?
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Do you still feel happy about it now?
              </p>
              <div className="flex justify-center space-x-6">
                <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-medium">
                  Still happy! 😊
                </div>
                <div className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium">
                  Not so much... 😐
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-12 shadow-2xl">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Remember This</h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-bold mb-4">
                Smart spending isn't about never having fun
              </p>
              <p className="text-lg">
                It's about making your money work for you, so you can have more fun later!
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

export default Module6;