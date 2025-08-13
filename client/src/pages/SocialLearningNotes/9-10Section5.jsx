import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, Users, Clock, Star, ArrowRight, Lightbulb, Target, Shield, Award, AlertCircle, Heart } from 'lucide-react';

const Module5ResponsibleDecisionMaking = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [reflectionAnswers, setReflectionAnswers] = useState({
    wellToday: '',
    responsibilityTomorrow: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const decisionSteps = [
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Stop and Pause",
      description: "Take a moment to breathe and think before acting",
      color: "from-green-500 to-emerald-500",
      example: "When faced with peer pressure, pause before responding"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Consider All Options",
      description: "Think about different ways you could respond",
      color: "from-emerald-500 to-teal-500",
      example: "List at least 3 different choices you could make"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Think Short & Long-term",
      description: "Consider immediate and future consequences",
      color: "from-teal-500 to-green-600",
      example: "How will this affect me today? Next month? Next year?"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Make a Choice & Own It",
      description: "Decide confidently and take responsibility",
      color: "from-green-600 to-emerald-600",
      example: "Stand by your decision and accept the outcomes"
    }
  ];

  const moralQuestions = [
    {
      icon: <Users className="w-6 h-6" />,
      question: "Who will be affected?",
      description: "Consider impact on others around you"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      question: "Am I okay explaining this to someone I respect?",
      description: "Would you be comfortable sharing your choice?"
    },
    {
      icon: <Star className="w-6 h-6" />,
      question: "Will I feel proud of this tomorrow?",
      description: "Think about your future self's perspective"
    }
  ];

  const responsibilityExamples = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Owning up to a mistake",
      description: "Admitting when you've done something wrong",
      scenario: "You accidentally broke something at home",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Completing tasks without being reminded",
      description: "Taking initiative with your responsibilities",
      scenario: "Finishing homework before anyone asks",
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Standing by your values under peer pressure",
      description: "Staying true to what you believe is right",
      scenario: "Refusing to cheat even when friends suggest it",
      color: "bg-teal-50 border-teal-200"
    }
  ];

  const scenarios = [
    {
      id: 1,
      title: "The Copied Assignment",
      situation: "Your friend offers to let you copy their homework that's due in 5 minutes.",
      options: [
        { text: "Copy the homework", consequence: "Quick fix but compromises integrity", isGood: false },
        { text: "Turn in what you have done", consequence: "Shows honesty and effort", isGood: true },
        { text: "Ask for an extension", consequence: "Takes responsibility and communicates", isGood: true }
      ]
    },
    {
      id: 2,
      title: "The Group Project",
      situation: "One member of your group isn't contributing, and others want to exclude them from the final presentation.",
      options: [
        { text: "Exclude them completely", consequence: "Might be unfair and hurtful", isGood: false },
        { text: "Talk to them about contributing", consequence: "Addresses the issue directly", isGood: true },
        { text: "Include them but discuss with teacher", consequence: "Fair approach with adult guidance", isGood: true }
      ]
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
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Responsible Decision-Making
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              The choices you make now shape who you become
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Key Message */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400 max-w-4xl mx-auto">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Every Choice Matters
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              The decisions you make today become the foundation of who you are tomorrow. 
              Learning to make responsible choices is one of life's most valuable skills.
            </p>
          </div>
        </div>

        {/* Decision-Making Process */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              The Decision-Making Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these four steps to make better decisions
            </p>
          </div>

          {/* Featured Step (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting: Step {currentStep + 1}</div>
              <div className={`bg-gradient-to-r ${decisionSteps[currentStep].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="bg-white/20 rounded-full p-4">
                    {decisionSteps[currentStep].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{decisionSteps[currentStep].title}</h3>
                    <p className="text-xl opacity-90 mb-3">{decisionSteps[currentStep].description}</p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">Example: {decisionSteps[currentStep].example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentStep === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigating Difficult Choices */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Navigating Difficult Choices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Moral decisions aren't always black and white. Ask yourself these questions:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {moralQuestions.map((question, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 text-center transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 200}ms` }}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {question.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{question.question}</h3>
                <p className="text-sm text-gray-600">{question.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Being Responsible */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Being Responsible
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-400 max-w-3xl mx-auto">
              <p className="text-xl text-gray-700">
                Responsibility means doing what's right — not just what's easy. 
                It also means being accountable without excuses.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {responsibilityExamples.map((example, index) => (
              <div
                key={index}
                className={`${example.color} rounded-2xl p-6 border-2 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  visibleCards.includes(index + 5) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 5) * 200}ms` }}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {example.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{example.title}</h3>
                <p className="text-gray-600 mb-3">{example.description}</p>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> {example.scenario}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scenarios */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Practice Decision-Making
            </h2>
            <p className="text-lg text-gray-600">
              Try these scenarios and see different choices in action
            </p>
          </div>

          <div className="space-y-6">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{scenario.title}</h3>
                <p className="text-gray-600 mb-4">{scenario.situation}</p>
                
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700">What would you do?</p>
                  {scenario.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => setSelectedScenario(selectedScenario === `${scenario.id}-${optionIndex}` ? null : `${scenario.id}-${optionIndex}`)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedScenario === `${scenario.id}-${optionIndex}`
                          ? option.isGood 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.text}</span>
                        {selectedScenario === `${scenario.id}-${optionIndex}` && (
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            option.isGood ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {option.isGood ? '✓ Good choice' : '⚠ Consider this'}
                          </span>
                        )}
                      </div>
                      {selectedScenario === `${scenario.id}-${optionIndex}` && (
                        <p className="mt-2 text-sm text-gray-600">{option.consequence}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taking Ownership */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">💪</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Taking Ownership
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-xl text-gray-700 font-medium">
                Blame is easy. Growth requires ownership.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Try This Practice
              </h3>
              <p className="text-lg text-gray-700 mb-6 text-center">
                Each night, ask yourself these questions:
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    What did I do well today?
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none resize-none"
                    rows="3"
                    placeholder="Reflect on your positive actions and decisions..."
                    value={reflectionAnswers.wellToday}
                    onChange={(e) => setReflectionAnswers(prev => ({...prev, wellToday: e.target.value}))}
                  />
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    What can I take more responsibility for tomorrow?
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none resize-none"
                    rows="3"
                    placeholder="Think about areas where you can improve..."
                    value={reflectionAnswers.responsibilityTomorrow}
                    onChange={(e) => setReflectionAnswers(prev => ({...prev, responsibilityTomorrow: e.target.value}))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 text-white rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Remember This
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
              Every decision is a chance to become the person you want to be. 
              Choose wisely, own your choices, and grow from every experience.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-bold text-lg mb-2">Pause & Think</h3>
                <p className="text-green-100">Take time before deciding</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-bold text-lg mb-2">Consider Others</h3>
                <p className="text-green-100">Think about the impact</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-bold text-lg mb-2">Own Your Choice</h3>
                <p className="text-green-100">Be accountable and grow</p>
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

export default Module5ResponsibleDecisionMaking;