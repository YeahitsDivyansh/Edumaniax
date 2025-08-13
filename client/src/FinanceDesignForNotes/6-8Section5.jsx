import React, { useState, useEffect } from 'react';
import { TrendingUp, Coins, Clock, Calculator, Target, DollarSign, PiggyBank, Zap, ArrowRight, Star, Trophy, ChevronRight } from 'lucide-react';

const Module5 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentYear, setCurrentYear] = useState(1);
  const [comparisonStep, setComparisonStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prev) => (prev % 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setComparisonStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const compoundData = [
    { year: 1, simple: 1100, compound: 1100, difference: 0 },
    { year: 2, simple: 1200, compound: 1210, difference: 10 },
    { year: 3, simple: 1300, compound: 1331, difference: 31 }
  ];

  const earlyVsLateData = [
    {
      profile: "Early Bird (Age 15)",
      monthly: "₹500",
      years: "10 years",
      total: "₹60,000",
      finalValue: "₹1,00,000+",
      color: "from-green-500 to-emerald-500",
      icon: <Star className="w-6 h-6" />
    },
    {
      profile: "Late Starter (Age 25)", 
      monthly: "₹1,000",
      years: "10 years",
      total: "₹1,20,000",
      finalValue: "₹90,000-95,000",
      color: "from-gray-400 to-gray-500",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const smartTips = [
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Start Small",
      description: "Even ₹100/month can grow significantly over time",
      color: "bg-green-100 text-green-600 border-green-200"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Start Early", 
      description: "Time is your biggest advantage in investing",
      color: "bg-emerald-100 text-emerald-600 border-emerald-200"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Be Consistent",
      description: "Regular investing beats trying to time the market",
      color: "bg-teal-100 text-teal-600 border-teal-200"
    }
  ];

  return (
    <div
      id="5"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["5"] = el;
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
              The Value of Investing Early
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover the magic of compound interest and why starting early is your superpower
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Does Investing Early Mean */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Does "Investing Early" Mean?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Investing</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Means putting your money into something (like stocks, mutual funds, or savings) 
                  so it can <strong className="text-green-600">grow</strong> over time.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-l-4 border-emerald-400">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Starting Early</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Gives your money more <strong className="text-emerald-600">time to grow</strong>, 
                  which means you can end up with a lot more in the future — even if you invest smaller amounts.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-6">🌱</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Money Tree</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">Plant early = Bigger tree</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">More time = More fruit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Life Example */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <Calculator className="w-12 h-12 text-white mx-auto" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Real-Life Example</h2>
            <p className="text-xl text-gray-600">Who ends up with more money at 40?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {earlyVsLateData.map((person, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${person.color} text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  {person.icon}
                  <h3 className="text-2xl font-bold">{person.profile}</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-lg opacity-90 mb-2">Monthly Savings</p>
                    <p className="text-2xl font-bold">{person.monthly}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-lg opacity-90 mb-2">Saving Period</p>
                    <p className="text-2xl font-bold">{person.years}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-lg opacity-90 mb-2">Total Invested</p>
                    <p className="text-2xl font-bold">{person.total}</p>
                  </div>
                  <div className="bg-white/30 rounded-lg p-4 border-2 border-white/50">
                    <p className="text-lg opacity-90 mb-2">Value at Age 40</p>
                    <p className="text-3xl font-bold">{person.finalValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">The Winner: Early Bird!</h3>
            <p className="text-lg text-gray-700">
              Even though the early bird saved <strong className="text-green-600">less money total</strong>, 
              they ended up with <strong className="text-green-600">more wealth</strong> because of 
              <strong className="text-emerald-600"> compound interest</strong>!
            </p>
          </div>
        </div>

        {/* What is Compound Interest */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Is Compound Interest?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                Compound interest means you earn interest <strong className="text-green-600">on your money</strong>, 
                then you earn interest <strong className="text-emerald-600">on that interest too</strong>, 
                and it keeps growing like a snowball! ❄️
              </p>
            </div>
          </div>

          {/* Interactive Compound Interest Demo */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">See It In Action!</h3>
              <p className="text-lg text-gray-600">₹1,000 invested at 10% interest</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {compoundData.map((data, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 transform transition-all duration-500 ${
                    currentYear === data.year 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-105 shadow-xl' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-4">Year {data.year}</h4>
                    <div className="space-y-3">
                      <div className={`rounded-lg p-3 ${currentYear === data.year ? 'bg-white/20' : 'bg-white'}`}>
                        <p className="text-sm opacity-80 mb-1">Simple Interest</p>
                        <p className="text-lg font-bold">₹{data.simple.toLocaleString()}</p>
                      </div>
                      <div className={`rounded-lg p-3 ${currentYear === data.year ? 'bg-white/30 border-2 border-white' : 'bg-green-50 border-2 border-green-200'}`}>
                        <p className="text-sm opacity-80 mb-1">Compound Interest</p>
                        <p className="text-lg font-bold">₹{data.compound.toLocaleString()}</p>
                      </div>
                      {data.difference > 0 && (
                        <div className={`rounded-lg p-2 ${currentYear === data.year ? 'bg-yellow-400 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          <p className="text-sm font-medium">+₹{data.difference} extra!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-700">
                See the difference? <strong className="text-green-600">Compound interest</strong> grows faster over time!
              </p>
            </div>
          </div>
        </div>

        {/* Why Time Matters More Than Amount */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-12">
            <div className="text-5xl mb-6">⏰</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Time Matters More Than Amount
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-800 font-bold">Start Age</th>
                  <th className="text-left py-4 px-4 text-gray-800 font-bold">Monthly Save</th>
                  <th className="text-left py-4 px-4 text-gray-800 font-bold">Total Invested</th>
                  <th className="text-left py-4 px-4 text-gray-800 font-bold">Value at Age 40</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b border-gray-100">
                  <td className="py-6 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 rounded-full p-2">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-800">15</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 font-semibold text-gray-700">₹500</td>
                  <td className="py-6 px-4 font-semibold text-gray-700">₹60,000</td>
                  <td className="py-6 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold text-lg">₹1,00,000+</span>
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Winner</div>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-6 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-400 rounded-full p-2">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-800">25</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 font-semibold text-gray-700">₹1,000</td>
                  <td className="py-6 px-4 font-semibold text-gray-700">₹1,20,000</td>
                  <td className="py-6 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 font-bold text-lg">₹90,000-95,000</span>
                      <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm">❌ Less</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-xl text-gray-700">
                Even though you saved <strong className="text-red-500">less money</strong>, 
                you gained <strong className="text-green-600">more</strong> — because of 
                <strong className="text-emerald-600"> time</strong>!
              </p>
            </div>
          </div>
        </div>

        {/* Golden Rule */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-12 shadow-2xl">
            <div className="text-6xl mb-6">💎</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Golden Rule</h2>
            <blockquote className="text-2xl md:text-3xl font-bold italic mb-8">
              "Start small, start early."
            </blockquote>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-xl">
                Even ₹100/month can become a lot if you start now.
              </p>
            </div>
          </div>
        </div>

        {/* Smart Tips */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Smart Investment Tips
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {smartTips.map((tip, index) => (
              <div
                key={index}
                className={`${tip.color} rounded-2xl p-8 border-2 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 200}ms` }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-6 p-3 bg-white rounded-full w-fit">
                    {tip.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{tip.title}</h3>
                  <p className="text-lg leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
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
                If you started saving ₹100 per month today, what would you spend less on?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">Snacks?</span>
                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">Games?</span>
                <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full">Movies?</span>
              </div>
              <p className="text-gray-600 mt-6 italic">Think about it...</p>
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

export default Module5;