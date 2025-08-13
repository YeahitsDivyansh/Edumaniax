import React, { useState, useEffect } from 'react';
import { PiggyBank, Calculator, Target, AlertTriangle, TrendingUp, CheckCircle, XCircle, Book, Car, Pizza, Gamepad2, Shirt, Home, ArrowRight, Star } from 'lucide-react';

const Mod2 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentBudgetExample, setCurrentBudgetExample] = useState(0);
  const [userBudget, setUserBudget] = useState({
    income: 1000,
    needs: 600,
    wants: 300,
    savings: 100
  });
  const [selectedNeedsWants, setSelectedNeedsWants] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBudgetExample((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const savingReasons = [
    {
      title: "Big Purchases",
      description: "Save for expensive items like bicycles or mobile phones",
      icon: <Target className="w-6 h-6" />,
      example: "₹200/month for 10 months = ₹2000 bicycle",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Emergencies",
      description: "Prepare for unexpected expenses",
      icon: <AlertTriangle className="w-6 h-6" />,
      example: "Medical needs, broken school bag repairs",
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "Independence",
      description: "Avoid borrowing from others",
      icon: <TrendingUp className="w-6 h-6" />,
      example: "Have your own money when needed",
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Good Habits",
      description: "Build strong financial discipline",
      icon: <Star className="w-6 h-6" />,
      example: "Start early, benefit for life",
      color: "from-emerald-600 to-green-700"
    }
  ];

  const budgetExamples = [
    {
      income: 500,
      needs: 300,
      wants: 150,
      savings: 50,
      description: "Basic monthly allowance"
    },
    {
      income: 1000,
      needs: 600,
      wants: 300,
      savings: 100,
      description: "Average pocket money"
    },
    {
      income: 2000,
      needs: 1200,
      wants: 500,
      savings: 300,
      description: "Higher allowance example"
    }
  ];

  const needsVsWants = [
    { item: "School uniform", category: "need", icon: <Shirt className="w-5 h-5" /> },
    { item: "Designer shoes", category: "want", icon: <Shirt className="w-5 h-5" /> },
    { item: "Transport to school", category: "need", icon: <Car className="w-5 h-5" /> },
    { item: "Cab rides", category: "want", icon: <Car className="w-5 h-5" /> },
    { item: "Books and stationery", category: "need", icon: <Book className="w-5 h-5" /> },
    { item: "Fancy pens", category: "want", icon: <Book className="w-5 h-5" /> },
    { item: "Basic meals", category: "need", icon: <Home className="w-5 h-5" /> },
    { item: "Ice cream and soft drinks", category: "want", icon: <Pizza className="w-5 h-5" /> }
  ];

  const handleNeedWantClick = (index, userChoice) => {
    const correct = needsVsWants[index].category === userChoice;
    setSelectedNeedsWants(prev => ({
      ...prev,
      [index]: { choice: userChoice, correct }
    }));
  };

  const calculatePercentage = (amount, total) => {
    return Math.round((amount / total) * 100);
  };

  return (
    <div
      id="m-2"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-2"] = el;
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
                <PiggyBank className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Saving and Budgeting
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Master the art of saving money and creating smart budgets for your future
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is Saving Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is Saving?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-green-600">Saving</strong> means not spending all the money you receive. 
                You keep some of it aside to use later for bigger goals or emergencies.
              </p>
            </div>
          </div>

          {/* Simple Saving Example */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Simple Example</h3>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    ₹500
                  </div>
                  <p className="font-medium text-gray-700">Monthly Income</p>
                </div>
                
                <div className="text-center">
                  <ArrowRight className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <div className="bg-red-500 text-white rounded-lg p-4">
                    <p className="font-bold">Spend ₹300</p>
                    <p className="text-sm">Lunch & snacks</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <ArrowRight className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <div className="bg-emerald-500 text-white rounded-lg p-4">
                    <p className="font-bold">Save ₹200</p>
                    <p className="text-sm">Keep for later</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✅
                  </div>
                  <p className="font-medium text-gray-700">You're saving!</p>
                  <p className="text-green-600 font-bold">₹200 monthly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Save Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Should You Save?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {savingReasons.map((reason, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${reason.color} text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mx-auto mb-4 w-fit">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{reason.description}</p>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-xs font-medium">{reason.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Tip */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Golden Tip
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <p className="text-xl text-gray-700 mb-4">
                Before buying anything, ask yourself:
              </p>
              <div className="text-2xl font-bold text-green-600 mb-4">
                "Do I really NEED this or do I just WANT it?"
              </div>
              <p className="text-gray-600">This simple question will save you lots of money!</p>
            </div>
          </div>
        </div>

        {/* What is a Budget Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is a Budget?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                A <strong className="text-green-600">budget</strong> is a simple plan showing how much money you have 
                and how you will use it. It helps you control expenses and avoid overspending.
              </p>
            </div>
          </div>

          {/* Budget Example with Auto-rotation */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Budget Example - Currently Showing</div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold mb-2">₹{budgetExamples[currentBudgetExample].income} Monthly</h3>
                  <p className="text-xl opacity-90">{budgetExamples[currentBudgetExample].description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">₹{budgetExamples[currentBudgetExample].needs}</div>
                    <div className="text-sm opacity-90">Needs ({calculatePercentage(budgetExamples[currentBudgetExample].needs, budgetExamples[currentBudgetExample].income)}%)</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">₹{budgetExamples[currentBudgetExample].wants}</div>
                    <div className="text-sm opacity-90">Wants ({calculatePercentage(budgetExamples[currentBudgetExample].wants, budgetExamples[currentBudgetExample].income)}%)</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">₹{budgetExamples[currentBudgetExample].savings}</div>
                    <div className="text-sm opacity-90">Savings ({calculatePercentage(budgetExamples[currentBudgetExample].savings, budgetExamples[currentBudgetExample].income)}%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 60:30:10 Rule */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              The Pocket Money Rule
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-2xl mx-auto">
              <p className="text-xl text-gray-700">
                Use the <strong className="text-green-600 text-2xl">60:30:10 Rule</strong>
              </p>
            </div>
          </div>

          {/* Rule Visualization */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 mb-4">
                  <div className="text-4xl font-bold mb-2">60%</div>
                  <div className="text-xl">Needs</div>
                </div>
                <p className="text-gray-600">Essential items you must have</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 mb-4">
                  <div className="text-4xl font-bold mb-2">30%</div>
                  <div className="text-xl">Wants</div>
                </div>
                <p className="text-gray-600">Things you like but can live without</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-6 mb-4">
                  <div className="text-4xl font-bold mb-2">10%</div>
                  <div className="text-xl">Savings</div>
                </div>
                <p className="text-gray-600">Money to keep for later</p>
              </div>
            </div>

            {/* Practical Example */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                If you get ₹1,000 monthly:
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">₹600</div>
                  <div className="text-lg font-medium mb-2">Needs</div>
                  <p className="text-sm text-gray-600">School supplies, transport, basic meals</p>
                </div>
                <div className="bg-green-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹300</div>
                  <div className="text-lg font-medium mb-2">Wants</div>
                  <p className="text-sm text-gray-600">Games, movies, treats</p>
                </div>
                <div className="bg-emerald-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">₹100</div>
                  <div className="text-lg font-medium mb-2">Savings</div>
                  <p className="text-sm text-gray-600">Emergency fund, future goals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Needs vs Wants Interactive Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Understanding Needs vs Wants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on each item to guess if it's a NEED or WANT, then see if you're correct!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {needsVsWants.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                  selectedNeedsWants[index] 
                    ? selectedNeedsWants[index].correct 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-green-300'
                } ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-2">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{item.item}</h3>
                  </div>
                  {selectedNeedsWants[index] && (
                    <div className="text-2xl">
                      {selectedNeedsWants[index].correct ? '✅' : '❌'}
                    </div>
                  )}
                </div>
                
                {!selectedNeedsWants[index] ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleNeedWantClick(index, 'need')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      NEED
                    </button>
                    <button
                      onClick={() => handleNeedWantClick(index, 'want')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      WANT
                    </button>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${
                    selectedNeedsWants[index].correct ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <p className={`font-medium ${
                      selectedNeedsWants[index].correct ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {selectedNeedsWants[index].correct ? 'Correct!' : 'Not quite!'} 
                      This is a <strong>{item.category.toUpperCase()}</strong>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Fund Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Emergency Fund
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                An <strong className="text-green-600">emergency fund</strong> is money saved to help during unexpected problems. 
                It's like your personal safety net.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { situation: "Medical costs for sudden fever", icon: "🏥", amount: "₹500" },
              { situation: "Cycle repair after flat tyre", icon: "🚴", amount: "₹200" },
              { situation: "Buying lost school book before exams", icon: "📚", amount: "₹300" }
            ].map((emergency, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{emergency.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{emergency.situation}</h3>
                  <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-3">
                    <p className="text-red-700 font-bold">Emergency Cost: {emergency.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Emergency Fund Challenge
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-green-600 mb-4">Start Small, Think Big!</h3>
              <p className="text-gray-700 mb-6">
                Begin your emergency fund with just ₹10 per week. Watch it grow over time!
              </p>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">₹40</div>
                    <div className="text-sm text-gray-600">1 Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">₹120</div>
                    <div className="text-sm text-gray-600">3 Months</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">₹240</div>
                    <div className="text-sm text-gray-600">6 Months</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">₹520</div>
                    <div className="text-sm text-gray-600">1 Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Weekly Budget Challenge
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-green-600 mb-4">Track Your Money for One Month</h3>
              <p className="text-gray-700 mb-6">
                Maintain a weekly budget diary. Write down your pocket money and daily spending. 
                Calculate how much you saved each week.
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                  <div key={index} className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-green-700">{week}</div>
                    <div className="text-sm text-green-600">Income - Spending = ?</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              Smart budgeting and regular saving habits will set you up for financial success in life.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Budget wisely</strong> + 
                <strong className="text-emerald-600"> Save regularly</strong> = 
                <strong className="text-teal-600"> Financial freedom! 💪</strong>
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

export default Mod2;