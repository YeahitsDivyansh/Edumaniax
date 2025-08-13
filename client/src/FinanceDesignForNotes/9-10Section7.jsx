import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  DollarSign, 
  PiggyBank, 
  TrendingUp, 
  Building2,
  Target,
  ShoppingCart,
  Wallet,
  CreditCard,
  Calculator,
  BarChart3,
  Shield,
  Coins,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  AlertTriangle,
  Briefcase,
  FileText,
  Globe,
  Heart
} from 'lucide-react';

const Mod7 = ({ topicRefs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleTerms, setVisibleTerms] = useState([]);
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [featuredTerm, setFeaturedTerm] = useState(0);

  const glossaryTerms = [
    {
      id: 1,
      term: "Money",
      definition: "Anything that is accepted for buying and selling goods and services. It can be in the form of coins, notes, or digital payments.",
      icon: <DollarSign className="w-6 h-6" />,
      category: "basic",
      example: "₹100 note, coins, UPI payments"
    },
    {
      id: 2,
      term: "Budget",
      definition: "A plan that shows how much money you have, how much you will spend, and how much you will save. It helps you avoid overspending.",
      icon: <Calculator className="w-6 h-6" />,
      category: "basic",
      example: "Monthly plan: ₹1000 income, ₹700 expenses, ₹300 savings"
    },
    {
      id: 3,
      term: "Saving",
      definition: "Keeping a portion of your money aside instead of spending it. This saved money can be used for future needs or emergencies.",
      icon: <PiggyBank className="w-6 h-6" />,
      category: "basic",
      example: "Putting ₹50 from pocket money into a piggy bank"
    },
    {
      id: 4,
      term: "Expense",
      definition: "The money you spend on things like food, travel, school supplies, or entertainment. Expenses can be needs or wants.",
      icon: <ShoppingCart className="w-6 h-6" />,
      category: "basic",
      example: "₹20 for lunch, ₹200 for books, ₹50 for movies"
    },
    {
      id: 5,
      term: "Income",
      definition: "The money you earn or receive. For students, it can be pocket money, birthday gifts, or rewards.",
      icon: <Wallet className="w-6 h-6" />,
      category: "basic",
      example: "₹500 monthly pocket money, ₹1000 birthday gift"
    },
    {
      id: 6,
      term: "Needs",
      definition: "Essential items you must have to live or go to school, such as food, books, and clothes.",
      icon: <Heart className="w-6 h-6" />,
      category: "basic",
      example: "Food, school uniform, textbooks, transport"
    },
    {
      id: 7,
      term: "Wants",
      definition: "Items that are nice to have but are not essential, such as video games, toys, and snacks.",
      icon: <Star className="w-6 h-6" />,
      category: "basic",
      example: "Latest smartphone, branded shoes, video games"
    },
    {
      id: 8,
      term: "Interest",
      definition: "The extra money a bank or investment pays you for keeping your money with them. It is usually a percentage of the amount you saved or invested.",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "banking",
      example: "Bank pays 4% interest on ₹1000 = ₹40 extra per year"
    },
    {
      id: 9,
      term: "Simple Interest",
      definition: "Interest calculated only on the original amount of money (the principal). Formula: SI = (P × R × T)/100",
      icon: <Calculator className="w-6 h-6" />,
      category: "banking",
      example: "₹1000 at 5% for 2 years = (1000×5×2)/100 = ₹100"
    },
    {
      id: 10,
      term: "Compound Interest",
      definition: "Interest calculated on the original amount and also on the interest that was previously earned. It helps money grow faster over time.",
      icon: <BarChart3 className="w-6 h-6" />,
      category: "banking",
      example: "Money grows faster as interest earns interest too"
    },
    {
      id: 11,
      term: "Bank",
      definition: "A place where people can safely keep their money, earn interest, and access other financial services like loans and transfers.",
      icon: <Building2 className="w-6 h-6" />,
      category: "banking",
      example: "SBI, HDFC Bank, ICICI Bank"
    },
    {
      id: 12,
      term: "Fixed Deposit (FD)",
      definition: "A type of bank investment where your money is locked for a certain time, and you get higher interest than a savings account.",
      icon: <Shield className="w-6 h-6" />,
      category: "banking",
      example: "₹10,000 locked for 1 year at 6% interest"
    },
    {
      id: 13,
      term: "Recurring Deposit (RD)",
      definition: "A bank service where you deposit a fixed amount every month and earn interest on it.",
      icon: <Clock className="w-6 h-6" />,
      category: "banking",
      example: "₹500 every month for 12 months with interest"
    },
    {
      id: 14,
      term: "Investment",
      definition: "Using your money to buy things like shares or gold that can grow in value over time.",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "investing",
      example: "Buying gold, company shares, or mutual funds"
    },
    {
      id: 15,
      term: "Risk",
      definition: "The chance that you might lose money in an investment. Higher risk usually means the chance of higher rewards, but also bigger losses.",
      icon: <AlertTriangle className="w-6 h-6" />,
      category: "investing",
      example: "Stocks can go up or down in value"
    },
    {
      id: 16,
      term: "Return",
      definition: "The money you earn from an investment. It is usually expressed as a percentage of your original investment.",
      icon: <Target className="w-6 h-6" />,
      category: "investing",
      example: "10% return means ₹100 profit on ₹1000 investment"
    },
    {
      id: 17,
      term: "Diversification",
      definition: "Spreading your money across different investments to reduce risk. If one fails, others may still perform well.",
      icon: <BarChart3 className="w-6 h-6" />,
      category: "investing",
      example: "Investing in stocks, gold, and FDs together"
    },
    {
      id: 18,
      term: "Portfolio",
      definition: "All the investments a person owns. For example, if you invest in stocks, gold, and mutual funds, your portfolio includes all of them.",
      icon: <Briefcase className="w-6 h-6" />,
      category: "investing",
      example: "50% stocks + 30% bonds + 20% gold = your portfolio"
    },
    {
      id: 19,
      term: "Stock/Share",
      definition: "A small part of a company that you can buy. If the company grows, your share becomes more valuable.",
      icon: <BarChart3 className="w-6 h-6" />,
      category: "investing",
      example: "Buying shares of Reliance, TCS, or Infosys"
    },
    {
      id: 20,
      term: "Stock Exchange",
      definition: "A marketplace where people buy and sell shares of companies. Examples include the Bombay Stock Exchange (BSE) and National Stock Exchange (NSE).",
      icon: <Building2 className="w-6 h-6" />,
      category: "investing",
      example: "BSE and NSE in India, NYSE in America"
    },
    {
      id: 21,
      term: "Mutual Fund",
      definition: "A pool of money collected from many people that is invested by experts into stocks, bonds, or other assets.",
      icon: <Globe className="w-6 h-6" />,
      category: "investing",
      example: "100 people contribute ₹1000 each = ₹1 lakh fund"
    },
    {
      id: 22,
      term: "Government Bond",
      definition: "A loan you give to the government, which they return with interest after a few years. It is considered very safe.",
      icon: <Shield className="w-6 h-6" />,
      category: "investing",
      example: "Government pays 7% interest for 10-year bonds"
    },
    {
      id: 23,
      term: "Inflation",
      definition: "The rise in prices of goods and services over time. It reduces the purchasing power of money.",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "advanced",
      example: "₹100 today may buy what ₹80 bought last year"
    },
    {
      id: 24,
      term: "Financial Goal",
      definition: "A specific target you want to achieve with your money, such as saving for a bicycle, college, or a trip.",
      icon: <Target className="w-6 h-6" />,
      category: "advanced",
      example: "Save ₹5000 for a bicycle in 6 months"
    },
    {
      id: 25,
      term: "Emergency Fund",
      definition: "Money kept aside only for emergencies, like a medical issue, a sudden repair, or a lost school item.",
      icon: <Shield className="w-6 h-6" />,
      category: "advanced",
      example: "₹2000 saved for unexpected expenses"
    },
    {
      id: 26,
      term: "Buy (Stocks)",
      definition: "Purchasing shares of a company, expecting their value to increase.",
      icon: <ArrowRight className="w-6 h-6" />,
      category: "advanced",
      example: "Buy 10 shares of TCS at ₹3000 each"
    },
    {
      id: 27,
      term: "Sell (Stocks)",
      definition: "Selling your shares to either make a profit or reduce loss.",
      icon: <Coins className="w-6 h-6" />,
      category: "advanced",
      example: "Sell 10 TCS shares at ₹3500 each for ₹5000 profit"
    },
    {
      id: 28,
      term: "Hold (Stocks)",
      definition: "Keeping your shares without selling them, often waiting for the right time or price.",
      icon: <Clock className="w-6 h-6" />,
      category: "advanced",
      example: "Keep shares for 2 years hoping price will rise"
    },
    {
      id: 29,
      term: "Financial Discipline",
      definition: "Being careful and regular with your money habits—like saving consistently, spending wisely, and avoiding unnecessary debt.",
      icon: <CheckCircle className="w-6 h-6" />,
      category: "advanced",
      example: "Save 20% of income every month without fail"
    },
    {
      id: 30,
      term: "UPI (Unified Payments Interface)",
      definition: "A fast, digital way to send or receive money using mobile phones. Apps like Google Pay, PhonePe, and Paytm use UPI.",
      icon: <Smartphone className="w-6 h-6" />,
      category: "digital",
      example: "Send money instantly using phone number or QR code"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Terms', icon: <BookOpen className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
    { id: 'basic', name: 'Basic Terms', icon: <DollarSign className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500' },
    { id: 'banking', name: 'Banking', icon: <Building2 className="w-5 h-5" />, color: 'from-teal-500 to-green-600' },
    { id: 'investing', name: 'Investing', icon: <TrendingUp className="w-5 h-5" />, color: 'from-green-600 to-emerald-600' },
    { id: 'advanced', name: 'Advanced', icon: <BarChart3 className="w-5 h-5" />, color: 'from-emerald-600 to-teal-600' },
    { id: 'digital', name: 'Digital', icon: <Smartphone className="w-5 h-5" />, color: 'from-teal-600 to-green-700' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleTerms(Array.from({ length: glossaryTerms.length }, (_, i) => i));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedTerm((prev) => (prev + 1) % Math.min(5, glossaryTerms.length));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      id="m-7"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-7"] = el;
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
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Financial Glossary
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Master essential financial terms with detailed explanations and practical examples
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* Featured Term */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Term of the Moment</h2>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center justify-center space-x-6">
                <div className="text-4xl">{glossaryTerms[featuredTerm].icon}</div>
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-3">{glossaryTerms[featuredTerm].term}</h3>
                  <p className="text-lg opacity-90 mb-3">{glossaryTerms[featuredTerm].definition}</p>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm"><strong>Example:</strong> {glossaryTerms[featuredTerm].example}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for financial terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-2 border-green-200 rounded-xl text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-gradient-to-r from-green-50 to-emerald-50 text-gray-700 hover:from-green-100 hover:to-emerald-100'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-green-200 text-green-800'
                }`}>
                  {category.id === 'all' ? glossaryTerms.length : glossaryTerms.filter(t => t.category === category.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {filteredTerms.length} Terms Found
            </h2>
            {searchTerm && (
              <p className="text-gray-600">
                Showing results for "<span className="font-semibold text-green-600">{searchTerm}</span>"
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map((term, index) => (
              <div
                key={term.id}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  expandedTerm === term.id ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleTerms.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-3 flex-shrink-0">
                    {term.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{term.term}</h3>
                    <div className={`transition-all duration-300 ${
                      expandedTerm === term.id ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
                    } overflow-hidden`}>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {term.definition}
                      </p>
                      {expandedTerm === term.id && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                          <p className="text-sm text-gray-700">
                            <strong className="text-green-600">Example:</strong> {term.example}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        term.category === 'basic' ? 'bg-green-100 text-green-800' :
                        term.category === 'banking' ? 'bg-emerald-100 text-emerald-800' :
                        term.category === 'investing' ? 'bg-teal-100 text-teal-800' :
                        term.category === 'advanced' ? 'bg-green-200 text-green-900' :
                        'bg-emerald-200 text-emerald-900'
                      }`}>
                        {categories.find(c => c.id === term.category)?.name || term.category}
                      </span>
                      <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        expandedTerm === term.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Terms Found</h3>
              <p className="text-gray-600 mb-6">
                Try searching with different keywords or select a different category
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Reference Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Quick Reference Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential categories to master for financial literacy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category, index) => {
              const categoryTerms = glossaryTerms.filter(term => term.category === category.id);
              const topTerms = categoryTerms.slice(0, 3);
              
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${category.color} text-white rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {categoryTerms.length} terms to learn
                  </p>
                  <div className="space-y-2">
                    {topTerms.map((term, termIndex) => (
                      <div key={term.id} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-700">{term.term}</span>
                      </div>
                    ))}
                    {categoryTerms.length > 3 && (
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors duration-300"
                      >
                        +{categoryTerms.length - 3} more terms
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Study Tips for Learning Financial Terms
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl mb-3">📝</div>
                <h3 className="font-bold text-gray-800 mb-2">Take Notes</h3>
                <p className="text-gray-600 text-sm">Write down terms and their meanings in your own words</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl mb-3">🔄</div>
                <h3 className="font-bold text-gray-800 mb-2">Regular Review</h3>
                <p className="text-gray-600 text-sm">Review 5-10 terms daily to build your vocabulary</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="font-bold text-gray-800 mb-2">Use Examples</h3>
                <p className="text-gray-600 text-sm">Connect each term to real-life situations you understand</p>
              </div>
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

export default Mod7;