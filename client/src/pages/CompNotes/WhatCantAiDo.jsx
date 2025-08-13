import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  MessageCircle, 
  Globe, 
  FileText, 
  Music, 
  Heart, 
  Lightbulb, 
  Shield, 
  Navigation, 
  ShoppingCart, 
  Camera, 
  Car,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  Zap,
  Users,
  Eye,
  Target,
  Gamepad2,
  Stethoscope,
  ArrowRight,
  Book,
  Palette
} from 'lucide-react';

const WhatCantAiDo = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentCapability, setCurrentCapability] = useState(0);
  const [currentLimitation, setCurrentLimitation] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(Array.from({ length: 20 }, (_, i) => i));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const capabilityInterval = setInterval(() => {
      setCurrentCapability((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(capabilityInterval);
  }, []);

  useEffect(() => {
    const limitationInterval = setInterval(() => {
      setCurrentLimitation((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(limitationInterval);
  }, []);

  const capabilities = [
    {
      category: "Communication & Language",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      items: [
        { 
          title: "Talk and answer questions", 
          example: "Siri can tell you the weather, set reminders, and answer \"What's 15% of 200?\"",
          icon: <MessageCircle className="w-6 h-6" />
        },
        { 
          title: "Translate languages", 
          example: "Google Translate can translate a menu in a foreign restaurant instantly using your camera",
          icon: <Globe className="w-6 h-6" />
        },
        { 
          title: "Write assistance", 
          example: "Grammarly fixes your grammar and suggests better words while you type",
          icon: <FileText className="w-6 h-6" />
        }
      ]
    },
    {
      category: "Entertainment & Media",
      icon: <Music className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      items: [
        { 
          title: "Suggest content", 
          example: "Netflix knows you love superhero movies and suggests new ones before you even search",
          icon: <Eye className="w-6 h-6" />
        },
        { 
          title: "Create music", 
          example: "AI can compose background music for YouTube videos",
          icon: <Music className="w-6 h-6" />
        },
        { 
          title: "Gaming", 
          example: "AI creates different game levels in Minecraft so you never run out of new worlds to explore",
          icon: <Gamepad2 className="w-6 h-6" />
        }
      ]
    },
    {
      category: "Healthcare & Safety",
      icon: <Shield className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      items: [
        { 
          title: "Help doctors", 
          example: "AI can spot diseases in X-rays that doctors might miss",
          icon: <Stethoscope className="w-6 h-6" />
        },
        { 
          title: "Emergency response", 
          example: "AI in smartwatches can detect if you've fallen and call for help",
          icon: <Shield className="w-6 h-6" />
        },
        { 
          title: "Drug discovery", 
          example: "AI helps find new medicines by testing millions of combinations virtually",
          icon: <Zap className="w-6 h-6" />
        }
      ]
    },
    {
      category: "Daily Life Assistance",
      icon: <Navigation className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600",
      items: [
        { 
          title: "Navigation", 
          example: "Google Maps not only shows directions but predicts traffic and suggests faster routes",
          icon: <Navigation className="w-6 h-6" />
        },
        { 
          title: "Shopping", 
          example: "Amazon's AI suggests products you might need before you even know you need them",
          icon: <ShoppingCart className="w-6 h-6" />
        },
        { 
          title: "Photography", 
          example: "Your phone's AI makes your photos look professional by adjusting lighting and colors automatically",
          icon: <Camera className="w-6 h-6" />
        }
      ]
    }
  ];

  const limitations = [
    {
      category: "Emotions and Feelings",
      icon: <Heart className="w-8 h-8" />,
      color: "from-orange-400 to-amber-400",
      description: "Can't feel love or sadness",
      example: "When Siri says \"I'm sorry to hear that,\" it's following programmed responses, not actually feeling sorry",
      reason: "Emotions come from complex biological processes that AI doesn't have"
    },
    {
      category: "True Creativity and Imagination",
      icon: <Palette className="w-8 h-8" />,
      color: "from-orange-400 to-amber-400",
      description: "Can't create truly original ideas",
      example: "AI-generated artwork looks creative, but it's mixing styles it learned from human artists",
      reason: "True creativity requires understanding meaning, emotion, and human experience"
    },
    {
      category: "Understanding Values and Ethics",
      icon: <Users className="w-8 h-8" />,
      color: "from-orange-400 to-amber-400",
      description: "Can't understand right from wrong",
      example: "AI might efficiently solve a problem but not consider if the solution is fair to everyone",
      reason: "Moral understanding requires life experience and empathy"
    },
    {
      category: "Complex Real-World Situations",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-400",
      description: "Can't handle unexpected situations",
      example: "AI might not know what to do if it sees a ball rolling into the street (might mean a child is chasing it)",
      reason: "The real world has infinite possibilities that AI hasn't been trained for"
    }
  ];

  const taskTable = [
    { 
      task: "Write a poem", 
      canDo: "Yes, but...", 
      howWell: "Good technically", 
      whyOrWhyNot: "Copies patterns but no real feelings", 
      example: "AI poems sound nice but lack emotional depth",
      status: "partial"
    },
    { 
      task: "Cook a meal", 
      canDo: "Partially", 
      howWell: "Getting better", 
      whyOrWhyNot: "Needs robotic hands and understanding of taste", 
      example: "Some robot chefs exist but very limited",
      status: "partial"
    },
    { 
      task: "Win at chess", 
      canDo: "Yes, perfectly", 
      howWell: "Better than humans", 
      whyOrWhyNot: "Can calculate millions of moves", 
      example: "AI beat world champion in 1997",
      status: "yes"
    },
    { 
      task: "Understand jokes", 
      canDo: "Sometimes", 
      howWell: "Hit or miss", 
      whyOrWhyNot: "Humor requires cultural understanding", 
      example: "AI often misses sarcasm or wordplay",
      status: "partial"
    },
    { 
      task: "Drive a car", 
      canDo: "Yes, mostly", 
      howWell: "95% effective", 
      whyOrWhyNot: "Struggles with unexpected situations", 
      example: "Tesla Autopilot works on highways",
      status: "yes"
    },
    { 
      task: "Feel lonely", 
      canDo: "No", 
      howWell: "Not at all", 
      whyOrWhyNot: "Emotions require consciousness", 
      example: "AI can detect loneliness but not feel it",
      status: "no"
    }
  ];

  const handleQuizAnswer = (questionId, answer) => {
    setSelectedQuiz(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

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
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              What AI Can and Can't Do
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover the amazing abilities and important limitations of Artificial Intelligence
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
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What You Will Learn
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <CheckCircle className="w-6 h-6" />, text: "Amazing things AI can do today", color: "bg-green-100 text-green-600" },
              { icon: <XCircle className="w-6 h-6" />, text: "Important limitations AI still has", color: "bg-emerald-100 text-emerald-600" }
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

        {/* AI Capabilities Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 mr-4" />
              What AI CAN Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI is already helping us in many amazing ways in our daily lives
            </p>
          </div>

          {/* Featured Capability (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${capabilities[currentCapability].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-6xl">{capabilities[currentCapability].icon}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-4">{capabilities[currentCapability].category}</h3>
                    <div className="space-y-3">
                      {capabilities[currentCapability].items.map((item, index) => (
                        <div key={index} className="bg-white/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            {item.icon}
                            <p className="font-semibold">{item.title}</p>
                          </div>
                          <p className="text-sm opacity-90">{item.example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Capabilities Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {capabilities.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={`bg-gradient-to-r ${category.color} rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentCapability === categoryIndex ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(categoryIndex + 2) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
                onClick={() => setCurrentCapability(categoryIndex)}
              >
                <div className="flex items-center space-x-4 mb-6">
                  {category.icon}
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {item.icon}
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm opacity-90">{item.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Limitations Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-500 mr-4" />
              What AI CAN'T Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Even the smartest AI has important limitations we need to understand
            </p>
          </div>

          {/* Featured Limitation (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${limitations[currentLimitation].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-6xl">{limitations[currentLimitation].icon}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{limitations[currentLimitation].category}</h3>
                    <p className="text-xl mb-4">{limitations[currentLimitation].description}</p>
                    <div className="bg-white/20 rounded-lg p-4 mb-3">
                      <p className="text-sm font-semibold mb-2">Example:</p>
                      <p className="text-sm">{limitations[currentLimitation].example}</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm font-semibold mb-2">Why not:</p>
                      <p className="text-sm">{limitations[currentLimitation].reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Limitations Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {limitations.map((limitation, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${limitation.color} rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentLimitation === index ? 'ring-4 ring-red-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setCurrentLimitation(index)}
              >
                <div className="flex items-center space-x-4 mb-6">
                  {limitation.icon}
                  <h3 className="text-2xl font-bold">{limitation.category}</h3>
                </div>
                <p className="text-lg font-semibold mb-4">{limitation.description}</p>
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Example:</p>
                  <p className="text-sm">{limitation.example}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Why not:</p>
                  <p className="text-sm">{limitation.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Remember This
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              AI is like a <strong className="text-green-600">super-smart student</strong> who's memorized millions of textbooks 
              but has <strong className="text-emerald-600">never lived in the real world</strong>. It knows facts but doesn't 
              understand <strong className="text-teal-600">life experience, emotions, or what it means to be human</strong>.
            </p>
          </div>
        </div>

        {/* Enhanced Task Table */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              AI Task Assessment
            </h2>
            <p className="text-xl text-gray-600">
              Let's see how well AI performs different tasks
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl font-bold text-gray-700">
                <div>Task</div>
                <div>Can AI Do It?</div>
                <div>How Well?</div>
                <div>Why or Why Not?</div>
                <div>Real Example</div>
                <div>Status</div>
              </div>

              {/* Table Rows */}
              {taskTable.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-6 gap-4 p-4 rounded-xl mb-4 border-2 hover:shadow-lg transition-all duration-300 ${
                    row.status === 'yes' ? 'border-green-200 bg-green-50' :
                    row.status === 'partial' ? 'border-yellow-200 bg-yellow-50' :
                    'border-red-200 bg-red-50'
                  } ${
                    visibleCards.includes(index + 10) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="font-semibold text-gray-800">{row.task}</div>
                  <div className="text-gray-700">{row.canDo}</div>
                  <div className="text-gray-700">{row.howWell}</div>
                  <div className="text-gray-600 text-sm">{row.whyOrWhyNot}</div>
                  <div className="text-gray-600 text-sm">{row.example}</div>
                  <div className="flex justify-center">
                    {row.status === 'yes' && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {row.status === 'partial' && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
                    {row.status === 'no' && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              The Future of AI
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                AI will continue to get better at many tasks, but it will always need 
                <strong className="text-green-600"> human creativity</strong>, 
                <strong className="text-emerald-600"> emotional intelligence</strong>, and 
                <strong className="text-teal-600"> moral judgment</strong> to truly serve humanity.
              </p>
              <div className="flex justify-center space-x-8 text-center">
                <div className="flex flex-col items-center">
                  <Brain className="w-8 h-8 text-green-600 mb-2" />
                  <p className="text-sm font-semibold text-gray-600">AI Strengths</p>
                </div>
                <div className="text-2xl text-gray-400">+</div>
                <div className="flex flex-col items-center">
                  <Heart className="w-8 h-8 text-emerald-600 mb-2" />
                  <p className="text-sm font-semibold text-gray-600">Human Touch</p>
                </div>
                <div className="text-2xl text-gray-400">=</div>
                <div className="flex flex-col items-center">
                  <Sparkles className="w-8 h-8 text-teal-600 mb-2" />
                  <p className="text-sm font-semibold text-gray-600">Amazing Future</p>
                </div>
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

export default WhatCantAiDo;