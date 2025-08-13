import React, { useState, useEffect } from 'react';
import { Scale, Gavel, Building, Users, Shield, BookOpen, Target, CheckCircle, ArrowRight, Eye, Heart, Lightbulb } from 'lucide-react';

const Module6 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentCourtType, setCurrentCourtType] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [activityResponse, setActivityResponse] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourtType((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const courtTypes = [
    {
      name: "District Court",
      description: "For your city or local area",
      icon: <Building className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      examples: ["Traffic disputes", "Property matters", "Local crimes"]
    },
    {
      name: "High Court", 
      description: "For your state",
      icon: <Scale className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      examples: ["State-level appeals", "Constitutional matters", "Major civil cases"]
    },
    {
      name: "Supreme Court",
      description: "The topmost court in India",
      icon: <Gavel className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      examples: ["National importance", "Final appeals", "Constitutional disputes"]
    }
  ];

  const courtRoles = [
    {
      role: "Judge",
      description: "Like the referee. They listen carefully and make a decision.",
      icon: <Gavel className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      role: "Lawyers",
      description: "Like the players. Each side has a lawyer who speaks for them.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      role: "Evidence",
      description: "Facts, objects, or witness statements that support a case.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600"
    },
    {
      role: "Verdict",
      description: "The final decision of the court.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-100 text-green-700"
    }
  ];

  const juvenileFeatures = [
    {
      feature: "Focuses on reform, not punishment",
      icon: <Heart className="w-6 h-6" />,
      description: "Helping children become better citizens"
    },
    {
      feature: "Send them to a juvenile home, not jail",
      icon: <Shield className="w-6 h-6" />,
      description: "Safe environment for rehabilitation"
    },
    {
      feature: "Provides counselling, education, and support",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Comprehensive development programs"
    }
  ];

  const changemaker = [
    "Speak up when something is wrong",
    "Help others who may not know their rights", 
    "Make fair, smart choices in life"
  ];

  return (
    <div
      id="6"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["6"] = el;
        }
      }}
      className="mb-10"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Scale className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Courts, Justice, and You
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover how courts work and learn your role in creating a just society
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Scale className="w-6 h-6" />, text: "How courts function", color: "bg-green-100 text-green-600" },
              { icon: <Building className="w-6 h-6" />, text: "Types of courts in India", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Shield className="w-6 h-6" />, text: "Juvenile justice system", color: "bg-teal-100 text-teal-600" },
              { icon: <Eye className="w-6 h-6" />, text: "Your role as a changemaker", color: "bg-green-100 text-green-700" }
            ].map((objective, index) => (
              <div
                key={index}
                className={`${objective.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  {objective.icon}
                  <p className="font-semibold text-sm">{objective.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens in a Court */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What Happens in a Court?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 mb-4">
                Imagine a real-life drama scene — only this one decides what's fair.
              </p>
              <p className="text-lg text-gray-600">
                A court is a place where disputes (fights, misunderstandings, crimes) are settled with the help of law.
              </p>
            </div>
          </div>

          {/* Court Roles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courtRoles.map((role, index) => (
              <div
                key={index}
                className={`${role.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 200}ms` }}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white rounded-full p-3 shadow-sm">
                      {role.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{role.role}</h3>
                  <p className="text-sm leading-relaxed">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Courts */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Types of Courts in India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Even small problems can reach higher courts if not resolved at the local level
            </p>
          </div>
          
          {/* Featured Court (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${courtTypes[currentCourtType].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-white">{courtTypes[currentCourtType].icon}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{courtTypes[currentCourtType].name}</h3>
                    <p className="text-xl opacity-90 mb-4">{courtTypes[currentCourtType].description}</p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm mb-2"><strong>Handles:</strong></p>
                      <ul className="text-sm space-y-1">
                        {courtTypes[currentCourtType].examples.map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Courts Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {courtTypes.map((court, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentCourtType === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
                onClick={() => setCurrentCourtType(index)}
              >
                <div className={`bg-gradient-to-r ${court.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {court.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{court.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{court.description}</p>
              </div>
            ))}
          </div>

          {/* Tip Box */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 text-white rounded-full p-2 mt-1">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Tip:</h3>
                <p className="text-gray-700">
                  Even a small problem, like land disputes or traffic accidents, can reach higher courts if it's not resolved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Juvenile Justice System */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Juvenile Justice System
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-3xl mx-auto">
              <p className="text-xl text-gray-700 mb-4">
                <strong className="text-green-600">What if a child commits a crime?</strong>
              </p>
              <p className="text-lg text-gray-600">
                They are not treated like adult criminals.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                The Juvenile Justice System
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A special system designed to help young people, not punish them
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {juvenileFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{feature.feature}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Goal</h3>
              <p className="text-xl text-gray-700">
                Help them become <strong className="text-green-600">better</strong>, not <strong className="text-red-500">bitter</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* You as a Future Changemaker */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              You as a Future Changemaker
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-3xl mx-auto">
              <p className="text-xl text-gray-700">
                You don't have to be a lawyer to fight for justice.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Legal awareness gives you the power to:
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {changemaker.map((power, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    {index + 1}
                  </div>
                  <p className="font-medium text-gray-800">{power}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Being legally literate means being:
              </h3>
              <div className="flex justify-center space-x-8 text-lg font-semibold">
                <span className="text-green-600">Brave</span>
                <span className="text-emerald-600">Responsible</span>
                <span className="text-teal-600">Aware</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Activity */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Mini Justice Journal Activity
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Think of a time when something unfair happened (in school, at home, or online). 
              Write how it could've been handled using fairness, rules, or dialogue — like a little courtroom in your head.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Describe the unfair situation:
                </label>
                <select
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  className="w-full p-4 border-2 border-green-200 rounded-xl text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                >
                  <option value="">Choose a situation...</option>
                  <option value="bullying">Someone was bullying a classmate</option>
                  <option value="unfair-grade">Received an unfair grade on an assignment</option>
                  <option value="broken-promise">A friend broke an important promise</option>
                  <option value="online-harassment">Witnessed online harassment</option>
                  <option value="other">Other situation</option>
                </select>
              </div>
              
              {selectedActivity && (
                <div className="animate-fade-in">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    How could this be resolved fairly?
                  </label>
                  
                  
                  {activityResponse && (
                    <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 animate-fade-in">
                      <div className="flex items-center space-x-2 text-green-600 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Great thinking!</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        You're developing your sense of justice and fairness. These skills will help you become a responsible citizen!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Key Takeaways
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 font-medium mb-4">
                  Courts are like referees that help solve disputes fairly using the law
                </p>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-green-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 font-medium mb-4">
                  India has different levels of courts to handle different types of cases
                </p>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 font-medium mb-4">
                  Young people get special treatment focused on rehabilitation, not punishment
                </p>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6">
                <p className="text-xl text-gray-800 font-bold">
                  You can be a force for justice by being aware, brave, and responsible! 🌟
                </p>
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

export default Module6;