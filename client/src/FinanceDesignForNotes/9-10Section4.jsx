import React, { useState, useEffect } from 'react';
import { TrendingUp, Sprout, PieChart, Shield, AlertTriangle, Target, DollarSign, BarChart3, Coins, Building, Gem } from 'lucide-react';

const Mod4 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentInvestment, setCurrentInvestment] = useState(0);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('medium');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInvestment((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const investmentTypes = [
    {
      name: "Fixed Deposit (FD)",
      description: "Bank locks your money for a fixed time",
      risk: "Low",
      return: "6%",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
      example: "₹10,000 for 1 year = ₹10,600"
    },
    {
      name: "Government Bonds",
      description: "You lend money to the government",
      risk: "Low",
      return: "7%",
      icon: <Building className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600",
      example: "Safe like FD but slightly better returns"
    },
    {
      name: "Mutual Funds",
      description: "Experts invest your money in many companies",
      risk: "Medium",
      return: "10%",
      icon: <PieChart className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600",
      example: "Professional management + diversification"
    },
    {
      name: "Stocks/Equity",
      description: "You buy a small part of a company",
      risk: "High",
      return: "14%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-green-200 text-green-700",
      example: "Higher returns but more volatile"
    },
    {
      name: "Gold",
      description: "Investment in gold coins, jewellery or digital gold",
      risk: "Medium",
      return: "8%",
      icon: <Gem className="w-6 h-6" />,
      color: "bg-emerald-200 text-emerald-700",
      example: "Traditional safe haven investment"
    }
  ];

  const compoundExample = [
    { year: 1, amount: 11000, gain: 1000 },
    { year: 2, amount: 12100, gain: 1100 },
    { year: 3, amount: 13310, gain: 1210 }
  ];

  const diversificationExample = {
    total: 10000,
    allocation: [
      { type: "FD", amount: 3000, percentage: 30, color: "bg-green-500" },
      { type: "Mutual Funds", amount: 3000, percentage: 30, color: "bg-emerald-500" },
      { type: "Gold", amount: 2000, percentage: 20, color: "bg-teal-500" },
      { type: "Stocks", amount: 2000, percentage: 20, color: "bg-green-600" }
    ]
  };

  return (
    <div
      id="m-4"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-4"] = el;
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
              Investing
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn how to make your money grow and work for you
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is Investing */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is Investing?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong className="text-green-600">Investing</strong> means using your money to buy something today 
                that will hopefully grow in value or give you returns in the future. Unlike saving, where your money stays the same, 
                investing helps your money grow over time.
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <Sprout className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">Simple Analogy:</h3>
                </div>
                <p className="text-gray-600">
                  Think of planting a mango seed. You water it, take care of it, and after some years, you get a big tree full of mangoes. 
                  Investing is similar — you invest your money now, and it grows over time if you take care of it wisely.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">From Seed to Tree</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Today: Plant the seed</span>
                      <span className="text-2xl">🌱</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Years later: Enjoy mangoes</span>
                      <span className="text-2xl">🥭</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Should You Invest */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Should You Invest?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: <TrendingUp className="w-8 h-8" />, 
                title: "Grow Money Faster", 
                desc: "Make your money work harder than simple saving",
                color: "bg-green-100 text-green-600" 
              },
              { 
                icon: <Target className="w-8 h-8" />, 
                title: "Reach Long-term Goals", 
                desc: "College, car, business - achieve your dreams",
                color: "bg-emerald-100 text-emerald-600" 
              },
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Beat Inflation", 
                desc: "Keep your money's buying power strong",
                color: "bg-teal-100 text-teal-600" 
              }
            ].map((reason, index) => (
              <div
                key={index}
                className={`${reason.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-4">{reason.icon}</div>
                <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                <p className="text-sm opacity-80">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Investments */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Types of Investments
            </h2>
          </div>
          
          {/* Featured Investment (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-4xl">{investmentTypes[currentInvestment].icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">{investmentTypes[currentInvestment].name}</h3>
                    <p className="text-lg opacity-90 mb-2">{investmentTypes[currentInvestment].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm opacity-80">Risk Level</p>
                    <p className="font-bold text-lg">{investmentTypes[currentInvestment].risk}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm opacity-80">Average Return</p>
                    <p className="font-bold text-lg">{investmentTypes[currentInvestment].return}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm opacity-80">Example</p>
                    <p className="font-bold text-sm">{investmentTypes[currentInvestment].example}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Investment Types Grid */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-100">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <th className="px-6 py-4 text-left rounded-tl-2xl">Investment Type</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Risk Level</th>
                  <th className="px-6 py-4 text-left rounded-tr-2xl">Average Return</th>
                </tr>
              </thead>
              <tbody>
                {investmentTypes.map((investment, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      currentInvestment === index ? 'bg-green-50' : ''
                    }`}
                    onClick={() => setCurrentInvestment(index)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`${investment.color} rounded-lg p-2`}>
                          {investment.icon}
                        </div>
                        <span className="font-bold text-gray-800">{investment.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{investment.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        investment.risk === 'Low' ? 'bg-green-100 text-green-600' :
                        investment.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {investment.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600 text-lg">{investment.return}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk and Return */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">⚖️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Risk vs Return
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">Risk</h3>
              </div>
              <p className="text-gray-600">
                The chance that your investment may not grow or could lose value.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800">Return</h3>
              </div>
              <p className="text-gray-600">
                The extra money you earn from your investment.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm mt-6 text-center">
            <p className="text-lg text-gray-700 font-medium">
              <strong className="text-green-600">High Return</strong> = Usually High Risk
              <br />
              <strong className="text-emerald-600">Low Risk</strong> = Lower but Safer Return
            </p>
          </div>
        </div>

        {/* Diversification */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is Diversification?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't put all your eggs in one basket. Spread your money across different types of investments.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Example: ₹10,000 Investment</h3>
                <p className="text-gray-600">
                  Instead of putting ₹10,000 only in gold, you could spread it like this:
                </p>
                
                <div className="space-y-3">
                  {diversificationExample.allocation.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                      <span className="font-medium text-gray-800">{item.type}</span>
                      <span className="text-gray-600">₹{item.amount.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                  <p className="text-green-700">
                    This way, even if one investment doesn't do well, others might perform better!
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#e5e7eb" strokeWidth="2"/>
                    {diversificationExample.allocation.map((item, index) => {
                      const circumference = 2 * Math.PI * 16;
                      const offset = diversificationExample.allocation.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0) / 100 * circumference;
                      const strokeDasharray = `${item.percentage / 100 * circumference} ${circumference}`;
                      
                      return (
                        <circle
                          key={index}
                          cx="18"
                          cy="18"
                          r="16"
                          fill="transparent"
                          stroke={item.color.replace('bg-', '').replace('green-500', '#10b981').replace('emerald-500', '#10b981').replace('teal-500', '#14b8a6').replace('green-600', '#059669')}
                          strokeWidth="4"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={-offset}
                          className="transition-all duration-1000"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">₹10K</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compound Interest in Investing */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Compound Interest in Investing
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              You earn money not just on your original investment but also on the gains it earns over time.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              ₹10,000 invested at 10% annual return
            </h3>
            
            <div className="space-y-4">
              {compoundExample.map((year, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {year.year}
                    </div>
                    <span className="font-medium text-gray-800">Year {year.year}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-800">₹{year.amount.toLocaleString()}</div>
                    <div className="text-sm text-green-600">+₹{year.gain.toLocaleString()} gain</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 mt-6 text-center">
              <p className="text-green-700 font-medium">
                Over years, the difference becomes BIG! 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              Start investing early, diversify your investments, and let compound interest work its magic over time.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Start Early</strong> + 
                <strong className="text-emerald-600"> Diversify</strong> + 
                <strong className="text-teal-600"> Stay Patient</strong> = 
                <strong className="text-green-700"> Wealth Growth! 💰</strong>
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

export default Mod4;