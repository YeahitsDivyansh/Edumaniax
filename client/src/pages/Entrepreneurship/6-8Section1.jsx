import React, { useState, useEffect } from 'react';
import { Rocket, Lightbulb, Users, TrendingUp, Target, Award, Globe, RefreshCw, Palette, Zap, Shield, UserCheck, Apple, Car, Dna } from 'lucide-react';

const EntrepreneurshipModule1 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentCharacteristic, setCurrentCharacteristic] = useState(0);
  const [currentType, setCurrentType] = useState(0);

  useEffect(() => {
    // Staggered card animations
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate characteristics
    const interval = setInterval(() => {
      setCurrentCharacteristic((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-rotate types
    const interval = setInterval(() => {
      setCurrentType((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const characteristics = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creativity",
      description: "Thinking outside the box and coming up with unique solutions",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Risk-taking",
      description: "Willingness to take calculated risks to achieve goals",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-100 to-green-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Resilience",
      description: "Bouncing back from failures and setbacks",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Leadership",
      description: "Inspiring and guiding a team towards a common goal",
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-100"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Adaptability",
      description: "Adjusting to changing circumstances and feedback",
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-50 to-green-50"
    }
  ];

  const entrepreneurTypes = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovators",
      description: "Create entirely new products or services",
      example: "Inventing the smartphone",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Imitators",
      description: "Improve existing ideas or products", 
      example: "Making a better pizza delivery app",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Social Entrepreneurs",
      description: "Focus on solving social problems",
      example: "Creating clean water solutions",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Serial Entrepreneurs", 
      description: "Start multiple businesses over time",
      example: "Building and selling several companies",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const famousEntrepreneurs = [
    {
      name: "Steve Jobs",
      company: "Apple",
      icon: <Apple className="w-8 h-8" />,
      achievement: "Revolutionized personal computing and mobile phones",
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Elon Musk",
      company: "Tesla, SpaceX",
      icon: <Car className="w-8 h-8" />,
      achievement: "Innovated in electric cars and space travel",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Kiran Mazumdar-Shaw",
      company: "Biocon",
      icon: <Dna className="w-8 h-8" />,
      achievement: "Pioneered biotechnology in India",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div
      id="1"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["1"] = el;
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
                <Rocket className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Introduction to Entrepreneurship
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover the art of identifying problems and creating innovative solutions to make a difference
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is Entrepreneurship */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is Entrepreneurship?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Entrepreneurship is the <strong className="text-green-600">art of identifying a problem</strong> or 
                an unmet need in society and coming up with <strong className="text-emerald-600">innovative solutions</strong>.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Entrepreneurs are:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Risk-takers', 'Visionaries', 'Problem-solvers'].map((trait, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 text-center">
                      <span className="text-green-700 font-semibold">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Turn Ideas into Reality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Entrepreneurs take creative ideas and transform them into real businesses, 
                  products, and services that solve problems and create value.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Characteristics - Interactive Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Key Characteristics of Entrepreneurs
            </h2>
          </div>
          
          {/* Featured Characteristic (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${characteristics[currentCharacteristic].color} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-white">
                    {characteristics[currentCharacteristic].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{characteristics[currentCharacteristic].title}</h3>
                    <p className="text-xl opacity-90">{characteristics[currentCharacteristic].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Characteristics Grid */}
          <div className="grid md:grid-cols-5 gap-6">
            {characteristics.map((char, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${char.bgColor} border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentCharacteristic === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setCurrentCharacteristic(index)}
              >
                <div className={`bg-gradient-to-r ${char.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {char.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{char.title}</h3>
                <p className="text-sm text-gray-600">{char.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Entrepreneurial Mindset */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  The Entrepreneurial Mindset
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Having an entrepreneurial mindset means being <strong className="text-green-600">curious</strong>, 
                <strong className="text-emerald-600"> proactive</strong>, and <strong className="text-teal-600">persistent</strong>.
              </p>
              <p className="text-gray-600">
                Entrepreneurs are always on the lookout for new opportunities and are not afraid to challenge the status quo.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Mindset Qualities</h3>
              <div className="space-y-4">
                {[
                  { icon: "🔍", text: "Always Curious" },
                  { icon: "⚡", text: "Takes Initiative" },
                  { icon: "💪", text: "Never Gives Up" },
                  { icon: "🎯", text: "Spots Opportunities" }
                ].map((quality, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                    <span className="text-2xl">{quality.icon}</span>
                    <span className="text-gray-700 font-medium">{quality.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Types of Entrepreneurs - Interactive */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Types of Entrepreneurs
            </h2>
          </div>
          
          {/* Featured Type (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Showcasing</div>
              <div className={`bg-gradient-to-r ${entrepreneurTypes[currentType].color} text-white rounded-2xl p-8 max-w-3xl mx-auto`}>
                <div className="flex items-center justify-center space-x-6 mb-4">
                  {entrepreneurTypes[currentType].icon}
                  <h3 className="text-3xl font-bold">{entrepreneurTypes[currentType].title}</h3>
                </div>
                <p className="text-xl opacity-90 mb-4">{entrepreneurTypes[currentType].description}</p>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm">Example: <strong>{entrepreneurTypes[currentType].example}</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* All Types Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {entrepreneurTypes.map((type, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentType === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setCurrentType(index)}
              >
                <div className={`bg-gradient-to-r ${type.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {type.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">{type.title}</h3>
                <p className="text-sm text-gray-600 text-center mb-3">{type.description}</p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 text-center">
                    <strong>Example:</strong> {type.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Importance of Entrepreneurship */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              The Importance of Entrepreneurship
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, title: "Drives Economic Growth", desc: "Creates new markets and opportunities" },
              { icon: <Users className="w-8 h-8" />, title: "Creates Jobs", desc: "Provides employment for millions" },
              { icon: <Lightbulb className="w-8 h-8" />, title: "Fosters Innovation", desc: "Brings new ideas to life" },
              { icon: <Award className="w-8 h-8" />, title: "Encourages Competition", desc: "Leads to better products and services" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Famous Entrepreneurs */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Famous Entrepreneurs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from the success stories of entrepreneurs who changed the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {famousEntrepreneurs.map((entrepreneur, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-500 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 250}ms` }}
              >
                <div className={`bg-gradient-to-r ${entrepreneur.color} text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
                  {entrepreneur.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{entrepreneur.name}</h3>
                  <p className="text-green-600 font-semibold mb-4">{entrepreneur.company}</p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{entrepreneur.achievement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Entrepreneurship in Everyday Life */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Entrepreneurship in Everyday Life
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                You don't have to start a big company to be an entrepreneur. 
                Entrepreneurship can be found in simple, everyday activities!
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Simple Examples</h3>
              <div className="space-y-4">
                {[
                  { icon: "🏫", text: "Starting a school club" },
                  { icon: "🎉", text: "Organizing a community event" },
                  { icon: "🛍️", text: "Launching a small online store" },
                  { icon: "📱", text: "Creating a helpful app" }
                ].map((example, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                    <span className="text-2xl">{example.icon}</span>
                    <span className="text-gray-700 font-medium">{example.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Activity */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Activity: Spot the Entrepreneur
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Think About It
            </h3>
            <div className="space-y-4 text-lg text-gray-700">
              <p className="text-center">
                🤔 <strong>Think of someone in your community who started something new.</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-green-600 mb-3">Ask Yourself:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• What problem did they solve?</li>
                    <li>• How did they do it?</li>
                    <li>• What makes them entrepreneurial?</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-emerald-600 mb-3">Examples to Look For:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Local shop owners</li>
                    <li>• Community leaders</li>
                    <li>• Creative artists</li>
                    <li>• Tech innovators</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Entrepreneurship is not just about business; it's about making a difference!
            </p>
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

export default EntrepreneurshipModule1;