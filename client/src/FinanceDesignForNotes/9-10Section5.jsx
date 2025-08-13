import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Building2, PieChart, ShoppingCart, DollarSign, Users, Lightbulb, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';

const Mod5 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentAction, setCurrentAction] = useState(0);
  const [stockPrice, setStockPrice] = useState(100);
  const [priceDirection, setPriceDirection] = useState('up');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAction((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Stock price animation
  useEffect(() => {
    const priceInterval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10;
      setStockPrice(prev => {
        const newPrice = Math.max(50, Math.min(150, prev + change));
        setPriceDirection(change > 0 ? 'up' : 'down');
        return newPrice;
      });
    }, 2000);
    return () => clearInterval(priceInterval);
  }, []);

  const stockActions = [
    {
      action: "BUY",
      description: "When you expect the price to go up",
      example: "Company launches new product → Buy shares",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      action: "SELL",
      description: "When you want to take profit or prevent losses",
      example: "Stock reached your target → Sell for profit",
      icon: <TrendingDown className="w-8 h-8" />,
      color: "bg-red-500",
      textColor: "text-red-600"
    },
    {
      action: "HOLD",
      description: "You keep the shares and wait for a better time",
      example: "Market is uncertain → Hold and wait",
      icon: <Clock className="w-8 h-8" />,
      color: "bg-blue-500",
      textColor: "text-blue-600"
    }
  ];

  const priceFactors = [
    {
      factor: "Good News",
      effect: "Prices Rise",
      examples: ["New products", "Higher profits", "Good partnerships"],
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
      trend: "📈"
    },
    {
      factor: "Bad News", 
      effect: "Prices Fall",
      examples: ["Company losses", "Court cases", "Bad reviews"],
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-red-100 text-red-600",
      trend: "📉"
    }
  ];

  const youngInvestorTips = [
    {
      tip: "Start small with pocket money",
      icon: <DollarSign className="w-6 h-6" />,
      description: "Begin with small amounts you can afford to lose"
    },
    {
      tip: "Learn first, then invest",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Understand before you put money in"
    },
    {
      tip: "Don't panic if prices go down",
      icon: <Target className="w-6 h-6" />,
      description: "Stock prices naturally go up and down"
    },
    {
      tip: "Always diversify",
      icon: <PieChart className="w-6 h-6" />,
      description: "Don't put all money in one stock"
    },
    {
      tip: "Never invest borrowed money",
      icon: <AlertTriangle className="w-6 h-6" />,
      description: "Only invest money you own"
    }
  ];

  return (
    <div
      id="m-5"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-5"] = el;
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
              Stock Market Fundamentals
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Understand how stocks work and learn the basics of stock market investing
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is a Share or Stock */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is a Share or Stock?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong className="text-green-600">share</strong> is a small part of a company. 
                When you buy shares, you become a part-owner of the company.
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <p className="font-bold text-green-600">Company does well</p>
                    <p className="text-sm text-gray-600">You earn money</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📉</div>
                    <p className="font-bold text-red-600">Company doesn't do well</p>
                    <p className="text-sm text-gray-600">You may lose money</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Think of it like a Pizza</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                    <p className="text-gray-700">🍕 Company = Whole Pizza</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                    <p className="text-gray-700">🍕 Share = One Slice</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                    <p className="text-gray-700">👥 You = Pizza Slice Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How Does Stock Market Work */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                How Does the Stock Market Work?
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              People buy and sell shares of companies in a market called the <strong className="text-green-600">stock exchange</strong> 
              (like BSE or NSE in India).
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Live Stock Price Demo</h3>
              <div className={`text-6xl font-bold mb-4 transition-colors duration-500 ${
                priceDirection === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                ₹{stockPrice.toFixed(2)}
              </div>
              <div className={`flex items-center justify-center space-x-2 text-lg ${
                priceDirection === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {priceDirection === 'up' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                <span>Stock prices change constantly!</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4 text-center">Stock exchanges in India:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <h5 className="font-bold text-green-600">BSE</h5>
                  <p className="text-sm text-gray-600">Bombay Stock Exchange</p>
                </div>
                <div className="bg-emerald-100 rounded-lg p-4 text-center">
                  <h5 className="font-bold text-emerald-600">NSE</h5>
                  <p className="text-sm text-gray-600">National Stock Exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Makes Stock Prices Change */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Makes Stock Prices Change?
            </h2>
            <p className="text-xl text-gray-600">
              Stock prices go up and down based on news and market demand
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {priceFactors.map((factor, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{factor.trend}</div>
                  <h3 className="text-2xl font-bold text-gray-800">{factor.factor}</h3>
                  <p className={`text-lg font-medium ${factor.color}`}>{factor.effect}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-700">Examples:</h4>
                  {factor.examples.map((example, idx) => (
                    <div key={idx} className={`${factor.color} rounded-lg p-3 flex items-center space-x-3`}>
                      {factor.icon}
                      <span className="font-medium">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Real Example</h3>
              <p className="text-lg text-gray-700">
                If a company launches a popular product, more people want its shares. 
                <br />
                <strong className="text-green-600">Result: Price goes up! 📈</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Buy, Sell, Hold Actions */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Buy, Sell, Hold - What Do They Mean?
            </h2>
          </div>
          
          {/* Featured Action (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-white">{stockActions[currentAction].icon}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{stockActions[currentAction].action}</h3>
                    <p className="text-lg opacity-90 mb-2">{stockActions[currentAction].description}</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm">Example: <strong>{stockActions[currentAction].example}</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* All Actions Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {stockActions.map((action, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  currentAction === index ? 'border-green-300 ring-4 ring-green-100' : 'border-gray-100'
                } ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
                onClick={() => setCurrentAction(index)}
              >
                <div className="text-center">
                  <div className={`${action.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${action.textColor}`}>{action.action}</h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">{action.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What is a Portfolio */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">💼</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              What is a Portfolio?
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 text-center">
              Your <strong className="text-green-600">portfolio</strong> is the group of investments you own
            </p>
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: "Stocks", icon: "📈", color: "bg-green-100 text-green-600" },
                { name: "Gold", icon: "🪙", color: "bg-yellow-100 text-yellow-600" },
                { name: "Mutual Funds", icon: "📊", color: "bg-blue-100 text-blue-600" },
                { name: "FDs", icon: "🏦", color: "bg-purple-100 text-purple-600" }
              ].map((item, index) => (
                <div key={index} className={`${item.color} rounded-lg p-4 text-center`}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-bold">{item.name}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                <strong className="text-green-600">All together</strong> = Your Portfolio
              </p>
            </div>
          </div>
        </div>

        {/* Tips for Young Investors */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tips for Young Investors
            </h2>
            <p className="text-xl text-gray-600">
              Smart advice to start your investment journey safely
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngInvestorTips.map((tip, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 150}ms` }}
              >
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 rounded-lg p-3 w-fit mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{tip.tip}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              The stock market can help you grow wealth, but it requires knowledge, patience, and careful planning.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Learn First</strong> + 
                <strong className="text-emerald-600"> Start Small</strong> + 
                <strong className="text-teal-600"> Stay Patient</strong> = 
                <strong className="text-green-700"> Smart Investing! 🎯</strong>
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

export default Mod5;