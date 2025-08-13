import React, { useState, useEffect } from 'react';
import { Coins, CreditCard, Smartphone, TrendingUp, Users, Clock, DollarSign, ArrowRight, Star, Target } from 'lucide-react';

const Mod1 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeline((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const moneyForms = [
    {
      title: "Coins and Notes",
      description: "Physical forms like ₹1, ₹2, ₹10 coins and ₹10, ₹100 notes",
      icon: <Coins className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Bank Accounts",
      description: "Digital records of money deposited in banks",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "Cards",
      description: "Debit and credit cards for easy spending",
      icon: <CreditCard className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Digital Payments",
      description: "UPI, Google Pay, PhonePe, Paytm for quick transactions",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-emerald-600 to-green-700"
    }
  ];

  const moneyFunctions = [
    {
      title: "Medium of Exchange",
      description: "Replaces bartering - no need to exchange goods directly",
      icon: <Users className="w-6 h-6" />,
      example: "Buy sandwich with ₹30 instead of trading items"
    },
    {
      title: "Unit of Account",
      description: "Compare prices of different items easily",
      icon: <Target className="w-6 h-6" />,
      example: "Notebook costs ₹50, pen costs ₹10"
    },
    {
      title: "Store of Value",
      description: "Save money and use it later when needed",
      icon: <TrendingUp className="w-6 h-6" />,
      example: "Save ₹200 monthly for a bicycle"
    },
    {
      title: "Standard of Deferred Payment",
      description: "Borrow money and repay over time",
      icon: <Clock className="w-6 h-6" />,
      example: "Buy phone now, pay in installments"
    }
  ];

  const timeline = [
    { era: "Barter System", description: "Direct exchange of goods", emoji: "🤝" },
    { era: "Commodity Money", description: "Salt, rice, gold as currency", emoji: "🌾" },
    { era: "Metallic Money", description: "Copper, silver, gold coins", emoji: "🪙" },
    { era: "Paper Money", description: "Government-issued notes", emoji: "💵" },
    { era: "Plastic Money", description: "Debit and credit cards", emoji: "💳" },
    { era: "Digital Money", description: "UPI and mobile wallets", emoji: "📱" }
  ];

  return (
    <div
      id="m-1"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-1"] = el;
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
                <DollarSign className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Money and Its Value
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover what money is, how it evolved, and why it's essential in our daily lives
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is Money Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is Money?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-green-600">Money</strong> is anything that is accepted as a way to pay for things. 
                It helps people buy and sell goods and services, save for the future, and compare the value of different items.
              </p>
            </div>
          </div>

          {/* Real-Life Example */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-Life Example</h3>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                    🥪
                  </div>
                  <p className="font-medium text-gray-700">You want a sandwich</p>
                  <p className="text-green-600 font-bold">Costs ₹30</p>
                </div>
                
                <div className="text-center">
                  <ArrowRight className="w-8 h-8 text-green-600 mx-auto mb-4 animate-pulse" />
                  <div className="bg-emerald-500 text-white rounded-lg p-4">
                    <p className="font-bold">Pay ₹50 note</p>
                    <p className="text-sm">Get ₹20 change back</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✅
                  </div>
                  <p className="font-medium text-gray-700">Transaction complete!</p>
                  <p className="text-green-600 font-bold">Money accepted by both</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forms of Money */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Forms of Money
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moneyForms.map((form, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${form.color} text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mx-auto mb-4 w-fit">
                    {form.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{form.title}</h3>
                  <p className="text-sm opacity-90">{form.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why is Money Important */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why is Money Important?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {moneyFunctions.map((func, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-3 flex-shrink-0">
                    {func.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{func.title}</h3>
                    <p className="text-gray-600 mb-4">{func.description}</p>
                    <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400">
                      <p className="text-sm text-green-700 font-medium">
                        <strong>Example:</strong> {func.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evolution of Money Timeline */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How Did Money Evolve?
            </h2>
          </div>

          {/* Featured Timeline Item */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Evolution Timeline - Currently Showing</div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-6xl">{timeline[currentTimeline].emoji}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{timeline[currentTimeline].era}</h3>
                    <p className="text-xl opacity-90">{timeline[currentTimeline].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600"></div>
            <div className="space-y-8">
              {timeline.map((era, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} ${
                    visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{era.emoji}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{era.era}</h3>
                          <p className="text-gray-600">{era.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Activity */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Activity Challenge
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-green-600 mb-4">Create Your Money Journey Poster</h3>
              <p className="text-gray-700 mb-6">
                Design a poster showing the evolution of money from the Barter System to Digital Payments. 
                Include drawings or pictures for each stage.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                {timeline.map((era, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    {era.emoji} {era.era}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              Money has evolved from simple bartering to digital payments, making our lives easier and trade more efficient.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Understanding money</strong> is the first step to 
                <strong className="text-emerald-600"> financial success! 🌟</strong>
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

export default Mod1;