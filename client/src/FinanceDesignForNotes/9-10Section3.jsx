import React, { useState, useEffect } from 'react';
import { Banknote, Shield, Percent, CreditCard, Smartphone, PiggyBank, TrendingUp, Calculator, ArrowRight, CheckCircle, Building, Clock, Target } from 'lucide-react';

const Mod3 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentInterestType, setCurrentInterestType] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    principal: 10000,
    rate: 6,
    time: 5
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInterestType((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearTimeout(interval);
  }, []);

  const bankServices = [
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Savings Account",
      description: "A basic account for keeping money. You can add and withdraw money anytime.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fixed Deposit (FD)",
      description: "You keep a fixed amount for a fixed time (e.g., 1 year) and earn higher interest.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Recurring Deposit (RD)",
      description: "You deposit a fixed amount every month. After a few months or years, you get back your money with interest.",
      color: "from-teal-500 to-green-600"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "ATM Services",
      description: "Automatic Teller Machine helps you withdraw money using a card.",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Online Banking/UPI",
      description: "Use apps to send/receive money or pay bills instantly.",
      color: "from-emerald-600 to-green-500"
    }
  ];

  const accountTypes = [
    {
      type: "Savings Account",
      purpose: "For regular saving and spending",
      icon: <PiggyBank className="w-6 h-6" />,
      color: "bg-green-50 border-green-200 text-green-700"
    },
    {
      type: "Fixed Deposit",
      purpose: "Long-term saving with better interest",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-emerald-50 border-emerald-200 text-emerald-700"
    },
    {
      type: "Recurring Deposit",
      purpose: "Monthly deposits for a fixed term (like 1 year)",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-teal-50 border-teal-200 text-teal-700"
    }
  ];

  const whyUseBanks = [
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Your money is safe and secure",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Percent className="w-6 h-6" />,
      text: "You can earn interest on your savings",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      text: "You can pay bills and transfer money easily",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      text: "You can take loans when needed",
      color: "bg-green-100 text-green-600"
    }
  ];

  const calculateSimpleInterest = (p, r, t) => {
    return (p * r * t) / 100;
  };

  const calculateCompoundInterest = (p, r, t) => {
    return p * Math.pow((1 + r/100), t) - p;
  };

  const handleCalculatorChange = (field, value) => {
    setCalculatorValues(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const simpleInterest = calculateSimpleInterest(calculatorValues.principal, calculatorValues.rate, calculatorValues.time);
  const compoundInterest = calculateCompoundInterest(calculatorValues.principal, calculatorValues.rate, calculatorValues.time);

  return (
    <div
      id="m-3"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-3"] = el;
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
                <Building className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Banking Basics
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn how banks work and how they can help you manage your money safely
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* What is a Bank Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is a Bank?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong className="text-green-600">bank</strong> is a safe place to keep your money. 
                It offers services to save, transfer, and borrow money.
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Banknote className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">Example:</h3>
                </div>
                <p className="text-gray-600">
                  You deposit ₹1,000 in your bank account. It is kept safe and earns ₹60 interest in a year.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🏦</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Money's Safe Home</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <p className="text-gray-700 font-medium">Keeps money secure</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-gray-700 font-medium">Helps money grow</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-teal-400">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      <p className="text-gray-700 font-medium">Easy transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Use a Bank */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Use a Bank?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {whyUseBanks.map((reason, index) => (
              <div
                key={index}
                className={`${reason.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-3">
                  {reason.icon}
                  <p className="font-semibold text-lg">{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Offered by Banks */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Services Offered by Banks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bankServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-r ${service.color} rounded-2xl p-4 w-fit mb-6`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Bank Accounts */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Types of Bank Accounts
            </h2>
          </div>

          <div className="space-y-6">
            {accountTypes.map((account, index) => (
              <div
                key={index}
                className={`${account.color} border-2 rounded-2xl p-6 transform hover:scale-102 transition-all duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white rounded-full p-3">
                    {account.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{account.type}</h3>
                    <p className="text-lg">{account.purpose}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 mt-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">💡</div>
              <h3 className="text-lg font-bold text-gray-800">Pro Tip:</h3>
            </div>
            <p className="text-gray-600">
              Always choose a savings account as your first bank account. Ask your parents to help you open one.
            </p>
          </div>
        </div>

        {/* Interest Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is Interest?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-3xl mx-auto">
              <p className="text-xl text-gray-700">
                <strong className="text-green-600">Interest</strong> is the extra money the bank gives you for keeping your money with them.
              </p>
            </div>
          </div>

          {/* Interest Types Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-fit mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Simple Interest</h3>
                <p className="text-gray-600 mt-2">Only on your original amount</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 mb-4">
                  Formula: <strong className="text-green-600">(P × R × T) / 100</strong>
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>P = Principal (₹10,000)</p>
                  <p>R = Rate (6%)</p>
                  <p>T = Time (5 years)</p>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-lg font-bold text-green-600">
                    Interest: ₹3,000<br />
                    Total: ₹13,000
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-4 w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Compound Interest</h3>
                <p className="text-gray-600 mt-2">On your amount + past interest</p>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 mb-4">
                  Formula: <strong className="text-emerald-600">P(1 + r)^t</strong>
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>P = Principal (₹10,000)</p>
                  <p>r = Rate (0.06)</p>
                  <p>t = Time (5 years)</p>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-lg font-bold text-emerald-600">
                    Interest: ₹3,382<br />
                    Total: ₹13,382
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {showCalculator ? 'Hide' : 'Try'} Interest Calculator
              </button>
            </div>

            {showCalculator && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Principal Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={calculatorValues.principal}
                      onChange={(e) => handleCalculatorChange('principal', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      value={calculatorValues.rate}
                      onChange={(e) => handleCalculatorChange('rate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Time (Years)
                    </label>
                    <input
                      type="number"
                      value={calculatorValues.time}
                      onChange={(e) => handleCalculatorChange('time', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-green-700 mb-4">Simple Interest</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{simpleInterest.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Total: ₹{(calculatorValues.principal + simpleInterest).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-emerald-700 mb-4">Compound Interest</h4>
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{compoundInterest.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Total: ₹{(calculatorValues.principal + compoundInterest).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Why It Matters</h3>
            <p className="text-lg text-gray-700">
              <strong className="text-green-600">Compound interest gives you more money</strong> because you earn interest on your interest too!
            </p>
          </div>
        </div>

        {/* How Banks Make Money */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏦</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How Do Banks Make Money?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Banks earn money by lending your deposits to others and charging more interest than they pay you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-lg font-bold text-green-700 mb-2">You Save Money</h3>
                <p className="text-green-600 font-bold text-xl">Bank pays you 6%</p>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
                <div className="text-3xl mb-4">🏠</div>
                <h3 className="text-lg font-bold text-emerald-700 mb-2">Someone Takes Loan</h3>
                <p className="text-emerald-600 font-bold text-xl">Bank charges 10%</p>
              </div>
            </div>
            
            <div className="mt-8 bg-teal-50 rounded-xl p-6 text-center border-2 border-teal-200">
              <h3 className="text-lg font-bold text-teal-700 mb-2">Bank's Profit</h3>
              <p className="text-teal-600 font-bold text-2xl">4% Difference = Bank's Earning</p>
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

export default Mod3;