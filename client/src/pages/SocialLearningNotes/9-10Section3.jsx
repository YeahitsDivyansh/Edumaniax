import React, { useState, useEffect } from 'react';
import { Brain, Heart, Shield, Users, Target, Clock, CheckCircle, AlertCircle, Lightbulb, ArrowRight, MessageCircle, Palette, BookOpen, UserCheck, Zap, RefreshCw, Eye } from 'lucide-react';

const Module3StressManagement = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentCopingStrategy, setCurrentCopingStrategy] = useState(0);
  const [emergencyToolkit, setEmergencyToolkit] = useState([]);
  const [selectedConflictStep, setSelectedConflictStep] = useState(0);
  const [activeInfluenceExample, setActiveInfluenceExample] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCopingStrategy((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInfluenceExample((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const copingStrategies = [
    {
      title: "Deep Breathing",
      description: "Calm your mind with focused breathing",
      icon: <Brain className="w-8 h-8" />,
      technique: "Breathe in for 4, hold for 4, out for 4",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Journaling",
      description: "Write down your thoughts and feelings",
      icon: <BookOpen className="w-8 h-8" />,
      technique: "Express difficult thoughts on paper",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Creative Expression",
      description: "Use art or music to express emotions",
      icon: <Palette className="w-8 h-8" />,
      technique: "Draw, play music, or create something",
      color: "from-teal-500 to-green-600"
    },
    {
      title: "Reach Out",
      description: "Talk to someone you trust",
      icon: <Users className="w-8 h-8" />,
      technique: "Connect with a mentor or friend",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const conflictSteps = [
    {
      title: "Cool Off First",
      description: "Take time to calm down before discussing",
      icon: <RefreshCw className="w-6 h-6" />,
      detail: "Give yourself space to think clearly"
    },
    {
      title: "Listen to Understand",
      description: "Focus on understanding, not winning",
      icon: <Eye className="w-6 h-6" />,
      detail: "Try to see their perspective"
    },
    {
      title: "Use Respectful Language",
      description: "Choose words that don't hurt or blame",
      icon: <MessageCircle className="w-6 h-6" />,
      detail: "Speak with kindness and respect"
    },
    {
      title: "Be Open to Solutions",
      description: "Look for compromise or know when to step away",
      icon: <Target className="w-6 h-6" />,
      detail: "Find middle ground or agree to disagree"
    }
  ];

  const influenceExamples = [
    {
      title: "Time Management",
      description: "How you organize and use your time",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Communication Style",
      description: "How you talk and interact with others",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Stress Response",
      description: "How you choose to react to challenges",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const addToToolkit = (strategy) => {
    if (emergencyToolkit.length < 5 && !emergencyToolkit.includes(strategy)) {
      setEmergencyToolkit([...emergencyToolkit, strategy]);
    }
  };

  const removeFromToolkit = (strategy) => {
    setEmergencyToolkit(emergencyToolkit.filter(item => item !== strategy));
  };

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
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Managing Stress & Difficult Emotions
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              You can't avoid stress — but you can manage how you respond to it
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Understanding Stress Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Understanding Stress
              </h2>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                Stress is the body's response to demand or change. It can be <strong className="text-green-600">motivating</strong> or <strong className="text-emerald-600">overwhelming</strong>, depending on how it's managed.
              </p>
            </div>
          </div>

          {/* Stress Signs */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
              visibleCards.includes(0) ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '200ms' }}>
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Short-Term Signs</h3>
                <div className="space-y-4">
                  {[
                    "Racing thoughts",
                    "Rapid heartbeat", 
                    "Tense muscles"
                  ].map((sign, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">{sign}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
              visibleCards.includes(1) ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '400ms' }}>
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Long-Term Signs</h3>
                <div className="space-y-4">
                  {[
                    "Burnout",
                    "Irritability",
                    "Sleep problems"
                  ].map((sign, index) => (
                    <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border-l-4 border-emerald-400">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-700 font-medium">{sign}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Healthy Coping Skills */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Healthy Coping Skills
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700">
                Coping strategies are personal — what calms one person may not help another.
              </p>
            </div>
          </div>

          {/* Featured Coping Strategy (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Featured Strategy</div>
              <div className={`bg-gradient-to-r ${copingStrategies[currentCopingStrategy].color} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-white">{copingStrategies[currentCopingStrategy].icon}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{copingStrategies[currentCopingStrategy].title}</h3>
                    <p className="text-xl opacity-90 mb-2">{copingStrategies[currentCopingStrategy].description}</p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">{copingStrategies[currentCopingStrategy].technique}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Coping Strategies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copingStrategies.map((strategy, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentCopingStrategy === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 2) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
                onClick={() => setCurrentCopingStrategy(index)}
              >
                <div className={`bg-gradient-to-r ${strategy.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {strategy.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{strategy.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToToolkit(strategy.title);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Add to Toolkit
                </button>
              </div>
            ))}
          </div>

          {/* Emergency Toolkit Activity */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🧰</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Create Your Emergency Toolkit
              </h3>
              <p className="text-lg text-gray-600">
                Select up to 5 healthy coping strategies that work for you
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="grid md:grid-cols-5 gap-4 min-h-[100px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
                      emergencyToolkit[index] 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    {emergencyToolkit[index] ? (
                      <div className="space-y-2">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="text-sm font-medium text-gray-800">{emergencyToolkit[index]}</p>
                        <button
                          onClick={() => removeFromToolkit(emergencyToolkit[index])}
                          className="text-red-500 text-xs hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-8 h-8 border-2 border-dashed border-gray-400 rounded-full mx-auto"></div>
                        <p className="text-xs text-gray-500">Slot {index + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conflict Resolution Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Resolving Conflict with Respect
              </h2>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-l-4 border-emerald-400 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700">
                Conflict is normal. How you approach it shows emotional maturity.
              </p>
            </div>
          </div>

          {/* Conflict Resolution Steps */}
          <div className="space-y-6">
            {conflictSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                  selectedConflictStep === index ? 'ring-4 ring-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50' : ''
                } ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
                onClick={() => setSelectedConflictStep(index)}
              >
                <div className="flex items-center space-x-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-emerald-600">{step.icon}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    {selectedConflictStep === index && (
                      <div className="bg-emerald-100 rounded-lg p-4 mt-4 animate-fade-in">
                        <p className="text-emerald-800 font-medium">{step.detail}</p>
                      </div>
                    )}
                  </div>
                  <ArrowRight className={`w-6 h-6 text-emerald-500 transition-transform duration-300 ${
                    selectedConflictStep === index ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Reflection Activity */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl p-8 md:p-12 border-l-4 border-teal-400">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Reflection Time
              </h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Think of a recent conflict. What would you do differently next time?
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-gray-700 font-medium mb-2">
                    Describe the conflict situation:
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:outline-none transition-colors duration-200"
                    rows="3"
                    placeholder="What happened? How did you react?"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-gray-700 font-medium mb-2">
                    What would you do differently?
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:outline-none transition-colors duration-200"
                    rows="3"
                    placeholder="Which conflict resolution steps could you apply?"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control vs Influence Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-full p-3 mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Control vs Influence
              </h2>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-8 border-l-4 border-teal-400 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700">
                You can't control everything. The key is to focus energy on what's within your influence.
              </p>
            </div>
          </div>

          {/* Circle of Influence Visualization */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Circle of Influence Examples
              </h3>
              
              <div className="relative max-w-2xl mx-auto">
                {/* Outer Circle - Can't Control */}
                <div className="w-80 h-80 md:w-96 md:h-96 mx-auto relative border-4 border-gray-300 rounded-full bg-gray-50 flex items-center justify-center">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-600 font-medium text-sm">
                    Can't Control
                  </div>
                  
                  {/* Inner Circle - Can Influence */}
                  <div className="w-60 h-60 md:w-72 md:h-72 border-4 border-green-400 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center relative">
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-green-600 font-bold text-sm">
                      Can Influence
                    </div>
                    
                    {/* Current Active Example */}
                    <div className="text-center animate-fade-in">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        {influenceExamples[activeInfluenceExample].icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        {influenceExamples[activeInfluenceExample].title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {influenceExamples[activeInfluenceExample].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Influence Examples */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {influenceExamples.map((example, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                    activeInfluenceExample === index ? 'ring-4 ring-green-300 scale-105' : ''
                  }`}
                  onClick={() => setActiveInfluenceExample(index)}
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {example.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{example.title}</h4>
                  <p className="text-sm text-gray-600">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">🌟</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              Stress is manageable when you have the right tools and mindset. Focus on what you can influence, resolve conflicts respectfully, and build your personal coping toolkit.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Healthy Coping</strong> + 
                <strong className="text-emerald-600"> Respectful Conflict Resolution</strong> + 
                <strong className="text-teal-600"> Focus on Your Influence</strong> = 
                <strong className="text-green-700"> Emotional Strength! 💪</strong>
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

export default Module3StressManagement;