import React, { useState, useEffect } from 'react';
import { Gamepad2, Brain, Users, Zap, BookOpen, Mic, TrendingUp, Settings, Play, Target, Lightbulb, ArrowRight, Star, CheckCircle } from 'lucide-react';

const Module5 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentEnhancement, setCurrentEnhancement] = useState(0);
  const [selectedGame, setSelectedGame] = useState(0);
  const [buildingStep, setBuildingStep] = useState(0);
  const [userProgress, setUserProgress] = useState({
    personalizedLearning: false,
    smartOpponents: false,
    dynamicStorytelling: false,
    instantFeedback: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEnhancement((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildingStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const aiEnhancements = [
    {
      title: "Personalized Learning",
      description: "AI adapts the game to each player's skill level",
      icon: <Target className="w-8 h-8" />,
      example: "Game becomes easier if you're struggling, harder if you're excelling",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Smart Opponents",
      description: "AI creates challenging and realistic opponents",
      icon: <Brain className="w-8 h-8" />,
      example: "NPCs that learn from your playing style and adapt",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Dynamic Storytelling",
      description: "AI changes the story based on player choices",
      icon: <BookOpen className="w-8 h-8" />,
      example: "Your decisions create unique storylines each time",
      color: "from-teal-500 to-green-600"
    },
    {
      title: "Instant Feedback",
      description: "AI provides tips and suggestions during gameplay",
      icon: <Zap className="w-8 h-8" />,
      example: "Real-time hints when you're stuck on a puzzle",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const educationalGames = [
    {
      title: "Math and Science Tutors",
      description: "AI guides students through problems step-by-step",
      icon: "🧮",
      features: ["Adaptive difficulty", "Visual explanations", "Progress tracking"],
      color: "from-green-50 to-emerald-50"
    },
    {
      title: "Language Learning Games",
      description: "AI helps with pronunciation and vocabulary building",
      icon: "🗣️",
      features: ["Speech recognition", "Pronunciation feedback", "Cultural context"],
      color: "from-emerald-50 to-teal-50"
    },
    {
      title: "Business Simulations",
      description: "AI simulates realistic market conditions and customer behavior",
      icon: "💹",
      features: ["Market simulation", "Customer AI", "Economic modeling"],
      color: "from-teal-50 to-green-50"
    }
  ];

  const buildingSteps = [
    {
      step: 1,
      title: "Define Learning Objectives",
      description: "What should players learn or achieve?",
      icon: <Target className="w-6 h-6" />,
      example: "Students should master multiplication tables"
    },
    {
      step: 2,
      title: "Choose AI Technology",
      description: "Select the right AI tools and methods",
      icon: <Settings className="w-6 h-6" />,
      example: "Use machine learning for adaptive difficulty"
    },
    {
      step: 3,
      title: "Design Engaging Gameplay",
      description: "Create fun and interactive experiences",
      icon: <Gamepad2 className="w-6 h-6" />,
      example: "Turn math problems into adventure quests"
    },
    {
      step: 4,
      title: "Test and Iterate",
      description: "Get feedback and improve the game",
      icon: <CheckCircle className="w-6 h-6" />,
      example: "Students test and suggest improvements"
    }
  ];

  const toggleProgress = (key) => {
    setUserProgress(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Gamepad2 className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              AI in Games & Simulations
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover how Artificial Intelligence is revolutionizing gaming and creating smarter, more engaging learning experiences 🎮🤖
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Learning Objectives */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What You Will Learn
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Gamepad2 className="w-6 h-6" />, text: "How AI enhances games and makes them smarter", color: "bg-green-100 text-green-600" },
              { icon: <BookOpen className="w-6 h-6" />, text: "AI-powered educational games that help you learn", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Settings className="w-6 h-6" />, text: "How to build your own AI-driven games", color: "bg-teal-100 text-teal-600" },
              { icon: <Star className="w-6 h-6" />, text: "The exciting future of AI in gaming", color: "bg-green-100 text-green-600" }
            ].map((objective, index) => (
              <div
                key={index}
                className={`${objective.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-3">
                  {objective.icon}
                  <p className="font-semibold text-lg">{objective.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How AI Enhances Games */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How AI Enhances Games 🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI is making games smarter, more personalized, and incredibly engaging. Here's how:
            </p>
          </div>
          
          {/* Featured Enhancement (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${aiEnhancements[currentEnhancement].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-white">
                    {aiEnhancements[currentEnhancement].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{aiEnhancements[currentEnhancement].title}</h3>
                    <p className="text-xl opacity-90 mb-3">{aiEnhancements[currentEnhancement].description}</p>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm"><strong>Example:</strong> {aiEnhancements[currentEnhancement].example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Enhancements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiEnhancements.map((enhancement, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentEnhancement === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
                onClick={() => setCurrentEnhancement(index)}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {enhancement.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{enhancement.title}</h3>
                <p className="text-sm text-gray-600">{enhancement.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Progress Tracker */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-l-4 border-green-400">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Track Your Understanding ✅
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(userProgress).map(([key, completed], index) => (
                <div
                  key={key}
                  className={`bg-white rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                    completed ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => toggleProgress(key)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`font-medium ${completed ? 'text-green-700' : 'text-gray-700'}`}>
                      I understand {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI-Powered Educational Games */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              AI-Powered Educational Games 📚
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These games use AI to make learning more effective and fun!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {educationalGames.map((game, index) => (
              <div
                key={index}
                className={`${game.color} rounded-3xl p-8 border-2 border-green-200 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  selectedGame === index ? 'ring-4 ring-green-400 scale-105' : ''
                } ${
                  visibleCards.includes(index + 8) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 8) * 200}ms` }}
                onClick={() => setSelectedGame(index)}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{game.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{game.title}</h3>
                  <p className="text-gray-600">{game.description}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800 mb-3">Key Features:</h4>
                  {game.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Building AI-Driven Games */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Building AI-Driven Games 🛠️
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these steps to create your own AI-powered educational game:
            </p>
          </div>

          {/* Featured Step (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Current Step</div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-6">
                  <div className="bg-white/20 rounded-full p-4">
                    {buildingSteps[buildingStep].icon}
                  </div>
                  <div className="text-left">
                    <div className="text-4xl font-bold mb-2">Step {buildingSteps[buildingStep].step}</div>
                    <h3 className="text-2xl font-bold mb-2">{buildingSteps[buildingStep].title}</h3>
                    <p className="text-lg opacity-90 mb-3">{buildingSteps[buildingStep].description}</p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm"><strong>Example:</strong> {buildingSteps[buildingStep].example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Steps Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-200 to-emerald-200"></div>
            <div className="space-y-12">
              {buildingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 transform hover:scale-105 transition-all duration-300 ${
                      buildingStep === index ? 'ring-4 ring-green-300 scale-105' : ''
                    }`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-3">
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-sm text-green-600 font-bold">STEP {step.step}</div>
                          <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-gray-700"><strong>Example:</strong> {step.example}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full relative z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Future of AI in Games */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Future of AI in Games
            </h2>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
              AI will continue to make games more immersive, personalized, and effective for learning. 
              It opens up new possibilities for teaching complex concepts in fun and interactive ways.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "More Immersive", description: "Games that feel completely real", icon: "🌟" },
                { title: "Highly Personalized", description: "Games that adapt to your unique learning style", icon: "🎯" },
                { title: "Better Learning", description: "More effective ways to master complex topics", icon: "🧠" }
              ].map((future, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">{future.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{future.title}</h3>
                  <p className="text-green-100">{future.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-5xl mb-6">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium mb-6">
              AI is transforming games from simple entertainment into powerful learning tools that adapt, 
              engage, and teach in ways we've never seen before.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Games</strong> + 
                <strong className="text-emerald-600"> AI</strong> = 
                <strong className="text-teal-600"> Future of Learning! 🎮✨</strong>
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

export default Module5;