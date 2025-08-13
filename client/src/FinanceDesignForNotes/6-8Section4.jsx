import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Building2,XCircle, ShoppingCart,CheckCircle, Users, BarChart3, Lightbulb, AlertTriangle, Shield, Coins, Target, BookOpen } from 'lucide-react';

const Module4StockMarket = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [stockPrice, setStockPrice] = useState(100);
  const [priceDirection, setPriceDirection] = useState('up');
  const [currentFactor, setCurrentFactor] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Stock price animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStockPrice(prev => {
        const change = Math.random() * 20 - 10; // -10 to +10
        const newPrice = Math.max(50, Math.min(200, prev + change));
        setPriceDirection(change >= 0 ? 'up' : 'down');
        return Math.round(newPrice);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Rotating factors that affect stock prices
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactor((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const priceFactors = [
    {
      title: "Company Profits/Losses",
      description: "When a company makes more money, stock price usually goes up",
      icon: <BarChart3 className="w-6 h-6" />,
      example: "CrunchyMunch reports record sales → Price ↑",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "News & Events",
      description: "Good or bad news about the company affects investor confidence",
      icon: <Lightbulb className="w-6 h-6" />,
      example: "New product launch announcement → Price ↑",
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "People Buying/Selling",
      description: "High demand increases price, high selling decreases it",
      icon: <Users className="w-6 h-6" />,
      example: "Everyone wants CrunchyMunch shares → Price ↑",
      color: "from-green-600 to-teal-600"
    },
    {
      title: "Government & World Events",
      description: "Policies and global events can impact entire markets",
      icon: <Shield className="w-6 h-6" />,
      example: "New food safety rules → Food stocks ↓",
      color: "from-teal-500 to-green-600"
    }
  ];

  const keyTerms = [
    {
      word: "Share/Stock",
      meaning: "A small part of a company you can buy",
      icon: <Building2 className="w-6 h-6" />,
      example: "1 share of CrunchyMunch = tiny ownership"
    },
    {
      word: "Investor",
      meaning: "Someone who puts money into shares",
      icon: <Users className="w-6 h-6" />,
      example: "You become an investor when you buy shares"
    },
    {
      word: "Profit",
      meaning: "When your share price goes up and you sell",
      icon: <TrendingUp className="w-6 h-6" />,
      example: "Bought at ₹100, sold at ₹120 = ₹20 profit"
    },
    {
      word: "Loss",
      meaning: "When you sell a share for less than you paid",
      icon: <TrendingDown className="w-6 h-6" />,
      example: "Bought at ₹100, sold at ₹80 = ₹20 loss"
    },
    {
      word: "Dividend",
      meaning: "A reward companies give to shareholders from profits",
      icon: <Coins className="w-6 h-6" />,
      example: "CrunchyMunch gives ₹5 per share as dividend"
    }
  ];

  const stockExchanges = [
    {
      name: "NSE",
      fullName: "National Stock Exchange",
      description: "One of India's major stock exchanges",
      icon: "🏛️",
      established: "1992"
    },
    {
      name: "BSE", 
      fullName: "Bombay Stock Exchange",
      description: "Asia's oldest stock exchange",
      icon: "🏢",
      established: "1875"
    }
  ];

  return (
    <div
      id="4"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["4"] = el;
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
                <TrendingUp className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Understanding the Stock Market
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn how to become a mini-owner of companies and understand market dynamics
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Is Stock Market */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 mb-6">
              <Building2 className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-700 font-semibold">Core Concept</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Is the Stock Market?
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    The stock market is like a big shop where people buy and sell pieces of companies.
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">These pieces are called <strong className="text-green-600">stocks</strong> or <strong className="text-green-600">shares</strong></p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">When you buy a share, you own a <strong className="text-emerald-600">small part of a company</strong></p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">It's like being a <strong className="text-teal-600">mini-owner!</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🛍️</div>
                    <h3 className="text-2xl font-bold mb-6">Stock Market = Big Shop</h3>
                    <div className="space-y-4">
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Buy</span>
                          <ShoppingCart className="w-6 h-6" />
                          <span className="font-semibold">Sell</span>
                        </div>
                      </div>
                      <div className="text-sm opacity-90">
                        Company pieces (shares) traded daily
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Life Example - CrunchyMunch */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Real-Life Example
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">🍟</div>
                  <h3 className="text-xl font-bold">CrunchyMunch</h3>
                  <p className="text-sm opacity-90">Your favorite chips brand</p>
                </div>
                
                <div className="space-y-4">
                  <div className="text-4xl">📈</div>
                  <h3 className="text-xl font-bold">Needs Money to Grow</h3>
                  <p className="text-sm opacity-90">So it sells shares in the stock market</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold">₹{stockPrice}</div>
                    <div className="text-sm">Current Price</div>
                    <div className={`flex items-center justify-center mt-2 ${
                      priceDirection === 'up' ? 'text-green-200' : 'text-red-200'
                    }`}>
                      {priceDirection === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      <span className="text-xs">Live Price</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">You buy 1 share for ₹100</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20 text-center">
                <p className="text-lg">
                  <strong>If CrunchyMunch does well → your share might be worth ₹120</strong>
                </p>
                <p className="text-lg mt-2">
                  <strong className="text-yellow-200">You made a profit! 🎉</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Where to Buy Shares */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Where Do You Buy Shares?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              You don't go to a real shop. You use a <strong className="text-green-600">stock exchange</strong> — like a giant online market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stockExchanges.map((exchange, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{exchange.icon}</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-4 mb-4">
                    <h3 className="text-2xl font-bold">{exchange.name}</h3>
                    <p className="text-sm opacity-90">{exchange.fullName}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{exchange.description}</p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-700">
                      <strong>Established:</strong> {exchange.established}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                You also need a Demat Account
              </h3>
              <p className="text-gray-700">
                Like a bank account but for holding shares. It stores your digital shares safely.
              </p>
            </div>
          </div>
        </div>

        {/* Why Prices Go Up/Down */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-6 py-3 mb-6">
              <BarChart3 className="w-6 h-6 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">Market Dynamics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Do Share Prices Go Up or Down?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share prices change every day. Here's why:
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            {/* Featured Factor (Auto-rotating) */}
            <div className="text-center mb-12">
              <div className="text-lg text-gray-600 mb-4">Currently Explaining</div>
              <div className={`bg-gradient-to-r ${priceFactors[currentFactor].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-4xl">{priceFactors[currentFactor].icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">{priceFactors[currentFactor].title}</h3>
                    <p className="text-lg opacity-90 mb-3">{priceFactors[currentFactor].description}</p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">
                        <strong>Example:</strong> {priceFactors[currentFactor].example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Factors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {priceFactors.map((factor, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 text-center cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    currentFactor === index ? 'ring-4 ring-green-300 scale-105' : ''
                  }`}
                  onClick={() => setCurrentFactor(index)}
                >
                  <div className="text-2xl mb-2">{factor.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">{factor.title}</h4>
                  <div className="text-green-600 text-xs">Click to learn more</div>
                </div>
              ))}
            </div>
          </div>

          {/* Supply and Demand Explanation */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border-l-4 border-blue-400 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Think of it like this:</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-100 rounded-lg p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-green-700 mb-2">Price Goes UP ↑</h4>
                <p className="text-gray-700">If everyone wants a CrunchyMunch share</p>
              </div>
              <div className="bg-red-100 rounded-lg p-6 text-center">
                <TrendingDown className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-red-700 mb-2">Price Goes DOWN ↓</h4>
                <p className="text-gray-700">If everyone wants to sell their shares</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investing vs Gambling */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-red-100 to-yellow-100 rounded-full px-6 py-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <span className="text-red-700 font-semibold">Important Question</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Is the Stock Market Like Gambling?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-400">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎰</div>
                <h3 className="text-2xl font-bold text-red-600 mb-4">YES, if you guess randomly</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <p className="text-gray-700">No research or learning</p>
                </div>
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <p className="text-gray-700">Following tips blindly</p>
                </div>
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <p className="text-gray-700">Emotional decisions</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 border-l-4 border-green-400">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-green-600 mb-4">NO, if you learn and research</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-gray-700">Study company health</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-gray-700">Understand industry trends</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-gray-700">Know risks and returns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-3xl mx-auto">
            <div className="text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                So we INVEST, not gamble.
              </h3>
              <p className="text-gray-700">
                Learning makes all the difference between smart investing and risky gambling.
              </p>
            </div>
          </div>
        </div>

        {/* Key Terms */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 mb-6">
              <BookOpen className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-700 font-semibold">Vocabulary</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Key Terms to Know
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyTerms.map((term, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {term.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{term.word}</h3>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{term.meaning}</p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-700">
                      <strong>Example:</strong> {term.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
                <strong className="text-green-600">Ask an adult:</strong> Have they ever invested in the stock market? 
                What happened?
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

export default Module4StockMarket;