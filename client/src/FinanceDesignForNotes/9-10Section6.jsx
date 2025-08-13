import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Target, 
  ShoppingCart, 
  PiggyBank, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  BookOpen,
  Smartphone,
  Clock,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';

const Mod6 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeSpendingTip, setActiveSpendingTip] = useState(0);
  const [selectedGoalExample, setSelectedGoalExample] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpendingTip((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const spendingTips = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Make a Shopping List",
      description: "Write down what you need before going to the store",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Compare Prices",
      description: "Check different stores or websites for the best deals",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Buy Only What You Need",
      description: "Ask yourself: Do I really need this?",
      color: "from-teal-500 to-green-600"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Avoid Impulse Buying",
      description: "Don't buy things without thinking first",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const goalExamples = [
    {
      type: "Short-Term",
      goal: "Save ₹500 for a book",
      timeline: "within 2 months",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      type: "Mid-Term", 
      goal: "Save ₹5,000 for a bicycle",
      timeline: "in 1 year",
      icon: <Target className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      type: "Long-Term",
      goal: "Save ₹50,000 for college",
      timeline: "in 5 years", 
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-teal-600 to-green-700",
      bgColor: "from-teal-50 to-green-50"
    }
  ];

  const trackingMethods = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      method: "Use a diary or notebook",
      description: "Write down every rupee you spend and earn"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      method: "Use a mobile app",
      description: "Track expenses digitally with money management apps"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      method: "Review regularly",
      description: "Check your spending weekly or monthly"
    }
  ];

  const disciplineHabits = [
    {
      icon: <PiggyBank className="w-6 h-6" />,
      habit: "Save before you spend",
      description: "Put money aside first, then spend what's left"
    },
    {
      icon: <Target className="w-6 h-6" />,
      habit: "Stick to your budget", 
      description: "Follow your spending plan and don't exceed it"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      habit: "Avoid debt",
      description: "Don't borrow money unless absolutely necessary"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      habit: "Review your finances regularly",
      description: "Check your money situation every week or month"
    }
  ];

  return (
    <div
      id="m-6"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-6"] = el;
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
                <Wallet className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Personal Finance for Students
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn how to manage your money wisely and build healthy financial habits from a young age
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* What is Personal Finance */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is Personal Finance?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong className="text-green-600">Personal finance</strong> is how you manage your money — 
                from budgeting and saving to investing and spending. It's about making smart money choices.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Managing Money</span>
                  </div>
                  <p className="text-sm text-gray-600">How you handle your income and expenses</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-800">Smart Choices</span>
                  </div>
                  <p className="text-sm text-gray-600">Making wise financial decisions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Areas of Personal Finance</h3>
                <div className="space-y-4">
                  {[
                    { icon: <PiggyBank className="w-5 h-5" />, text: "Budgeting & Saving", color: "green" },
                    { icon: <ShoppingCart className="w-5 h-5" />, text: "Smart Spending", color: "emerald" },
                    { icon: <TrendingUp className="w-5 h-5" />, text: "Planning & Investing", color: "teal" }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-r from-${item.color}-50 to-${item.color === 'green' ? 'emerald' : item.color === 'emerald' ? 'teal' : 'green'}-50 rounded-lg p-4 border-l-4 border-${item.color}-400`}>
                      <div className="flex items-center space-x-3">
                        <div className={`text-${item.color}-600`}>{item.icon}</div>
                        <p className="text-gray-700 font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Spending Tips */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Smart Spending Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn how to spend your money wisely and avoid common spending mistakes
            </p>
          </div>

          {/* Featured Tip (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Featured Tip</div>
              <div className={`bg-gradient-to-r ${spendingTips[activeSpendingTip].color} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-4xl">{spendingTips[activeSpendingTip].icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">{spendingTips[activeSpendingTip].title}</h3>
                    <p className="text-lg opacity-90">{spendingTips[activeSpendingTip].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Tips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spendingTips.map((tip, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  activeSpendingTip === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setActiveSpendingTip(index)}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Goals Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Setting Financial Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn to set different types of financial goals based on time and amount
            </p>
          </div>

          {/* Interactive Goal Examples */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid lg:grid-cols-3 gap-8">
              {goalExamples.map((goal, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${goal.bgColor} rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedGoalExample === index ? 'border-green-400 ring-4 ring-green-200 scale-105' : 'border-green-200'
                  }`}
                  onClick={() => setSelectedGoalExample(index)}
                >
                  <div className="text-center">
                    <div className={`bg-gradient-to-r ${goal.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                      {goal.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.type}</h3>
                    <p className="text-lg font-semibold text-green-700 mb-2">{goal.goal}</p>
                    <p className="text-gray-600">{goal.timeline}</p>
                    {selectedGoalExample === index && (
                      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-700">
                          <strong className="text-green-600">Tip:</strong> {
                            index === 0 ? "Save ₹8-10 per day to reach this goal!" :
                            index === 1 ? "Save ₹400-500 per month to buy your bicycle!" :
                            "Start early! Save ₹800-1000 per month for college."
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Money Tracking Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                How to Track Your Money
              </h2>
            </div>
            
            <div className="space-y-4">
              {trackingMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300 ${
                    visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(index + 3) * 200}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-2">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{method.method}</h3>
                      <p className="text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Track Every Rupee</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
                  <div className="text-left space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Income (Pocket Money)</span>
                      <span className="font-bold text-green-600">+ ₹500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Lunch</span>
                      <span className="font-bold text-red-500">- ₹50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Books</span>
                      <span className="font-bold text-red-500">- ₹200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Snacks</span>
                      <span className="font-bold text-red-500">- ₹30</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-4">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-gray-800">Balance</span>
                        <span className="text-green-600">₹220</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Review weekly or monthly to stay on track!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inflation Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  What is Inflation?
                </h2>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <strong className="text-green-600">Inflation</strong> means prices of things go up over time. 
                  That's why ₹100 today may buy less in the future.
                </p>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">
                    💡 <strong>Solution:</strong> Investing helps fight inflation by growing your money faster than prices rise!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Inflation Example</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                  <div>
                    <p className="font-semibold text-gray-800">Today</p>
                    <p className="text-sm text-gray-600">A chocolate bar costs</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">₹10</div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                  <div>
                    <p className="font-semibold text-gray-800">After 5 Years</p>
                    <p className="text-sm text-gray-600">Same chocolate may cost</p>
                  </div>
                  <div className="text-2xl font-bold text-red-600">₹15</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Discipline Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is Financial Discipline?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Being careful and consistent with your money decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {disciplineHabits.map((habit, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-3">
                    {habit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{habit.habit}</h3>
                    <p className="text-gray-600 leading-relaxed">{habit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium mb-6">
              Good financial habits start early. Track your money, set clear goals, spend wisely, 
              and always save a part of what you earn.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Smart Spending</strong> + 
                <strong className="text-emerald-600"> Regular Saving</strong> + 
                <strong className="text-teal-600"> Clear Goals</strong> = 
                <strong className="text-green-700"> Financial Success! 💰</strong>
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

export default Mod6;