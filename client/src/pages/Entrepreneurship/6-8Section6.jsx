import React, { useState, useEffect } from 'react';
import { Scale, Shield, Eye, AlertTriangle, Users, Lock, Heart, Brain, Building2, GraduationCap, CheckCircle, XCircle, ArrowRight, Lightbulb, Target, Star } from 'lucide-react';

const Module6 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentEthical, setCurrentEthical] = useState(0);
  const [selectedCase, setSelectedCase] = useState(0);
  const [userResponses, setUserResponses] = useState({
    bias: null,
    transparency: null,
    accountability: null,
    privacy: null
  });
  const [showFeedback, setShowFeedback] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEthical((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const ethicalConsiderations = [
    {
      title: "Bias and Fairness",
      description: "AI systems can inherit biases from their creators or data",
      icon: <Scale className="w-8 h-8" />,
      example: "An AI hiring system might unfairly favor certain groups over others",
      solution: "Use diverse data and test for fairness across different groups",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Transparency",
      description: "Users should know how AI makes decisions",
      icon: <Eye className="w-8 h-8" />,
      example: "Social media algorithms should explain why they show certain content",
      solution: "Provide clear explanations of how AI systems work",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Accountability",
      description: "Who is responsible if AI makes a mistake?",
      icon: <Shield className="w-8 h-8" />,
      example: "If an AI medical diagnosis is wrong, who takes responsibility?",
      solution: "Clear guidelines on responsibility and human oversight",
      color: "from-teal-500 to-green-600"
    }
  ];

  const socialImpacts = [
    {
      title: "Job Creation and Loss",
      description: "AI creates new jobs but may also replace some roles",
      positive: "New jobs: AI trainers, data scientists, robot technicians",
      negative: "Some traditional jobs might be automated",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-green-50 to-emerald-50"
    },
    {
      title: "Accessibility",
      description: "Ensuring everyone can benefit from AI innovations",
      positive: "AI can help people with disabilities navigate the world",
      negative: "Not everyone has access to AI technology",
      icon: <Users className="w-6 h-6" />,
      color: "from-emerald-50 to-teal-50"
    },
    {
      title: "Privacy",
      description: "Protecting user data is crucial",
      positive: "AI can help detect privacy breaches",
      negative: "AI systems collect lots of personal data",
      icon: <Lock className="w-6 h-6" />,
      color: "from-teal-50 to-green-50"
    }
  ];

  const responsiblePrinciples = [
    {
      principle: "Design Fair AI",
      description: "Create systems that treat everyone equally",
      action: "Test your AI with diverse groups of people",
      icon: <Scale className="w-6 h-6" />
    },
    {
      principle: "Be Transparent",
      description: "Explain how your AI works in simple terms",
      action: "Create user-friendly explanations of your AI decisions",
      icon: <Eye className="w-6 h-6" />
    },
    {
      principle: "Stay Accountable",
      description: "Take responsibility for your AI's actions",
      action: "Have humans monitor and oversee AI decisions",
      icon: <Shield className="w-6 h-6" />
    },
    {
      principle: "Educate Users",
      description: "Help people understand AI capabilities and limits",
      action: "Provide clear information about what your AI can and cannot do",
      icon: <Brain className="w-6 h-6" />
    }
  ];

  const caseStudies = [
    {
      title: "AI in Healthcare",
      icon: "🏥",
      description: "AI is revolutionizing medical diagnosis and treatment",
      benefits: [
        "Faster and more accurate diagnoses",
        "Early disease detection",
        "Personalized treatment plans",
        "24/7 health monitoring"
      ],
      concerns: [
        "Patient privacy and data security",
        "AI bias in medical decisions",
        "Over-reliance on AI recommendations",
        "Unequal access to AI healthcare"
      ],
      realExample: "AI systems can detect cancer in medical scans with 95% accuracy",
      color: "from-green-100 to-emerald-100"
    },
    {
      title: "AI in Education",
      icon: "🎓",
      description: "Personalizing learning experiences for every student",
      benefits: [
        "Customized learning paths",
        "Instant feedback and assessment",
        "Support for different learning styles",
        "Teacher workload reduction"
      ],
      concerns: [
        "Potential bias in AI grading systems",
        "Student privacy and data collection",
        "Reduced human interaction",
        "Digital divide and access issues"
      ],
      realExample: "AI tutors can adapt to each student's learning pace and style",
      color: "from-emerald-100 to-teal-100"
    }
  ];

  const ethicalScenarios = [
    {
      scenario: "Your AI app collects user data to improve recommendations",
      question: "What's the most ethical approach?",
      options: [
        { text: "Collect all data without telling users", correct: false, feedback: "This violates user privacy and trust" },
        { text: "Ask users for permission and explain what data you collect", correct: true, feedback: "Excellent! Transparency and consent are key" },
        { text: "Only collect data from some users", correct: false, feedback: "This creates unfairness and inconsistency" }
      ],
      key: "privacy"
    },
    {
      scenario: "Your AI hiring tool shows bias against certain groups",
      question: "What should you do first?",
      options: [
        { text: "Ignore it - AI is always objective", correct: false, feedback: "AI can have serious biases that need addressing" },
        { text: "Stop using the AI immediately and fix the bias", correct: true, feedback: "Great choice! Addressing bias is crucial for fairness" },
        { text: "Continue using it but warn users", correct: false, feedback: "This perpetuates unfair treatment" }
      ],
      key: "bias"
    }
  ];

  const handleScenarioResponse = (scenarioKey, optionIndex) => {
    const scenario = ethicalScenarios.find(s => s.key === scenarioKey);
    const selectedOption = scenario.options[optionIndex];
    
    setUserResponses(prev => ({
      ...prev,
      [scenarioKey]: {
        selected: optionIndex,
        correct: selectedOption.correct,
        feedback: selectedOption.feedback
      }
    }));
    
    setShowFeedback(prev => ({
      ...prev,
      [scenarioKey]: true
    }));
  };

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
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Scale className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Ethics & Social Impact
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn how to use AI responsibly in entrepreneurship and understand its impact on society ⚖️🌍
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
              { icon: <Scale className="w-6 h-6" />, text: "Key ethical considerations when using AI", color: "bg-green-100 text-green-600" },
              { icon: <Users className="w-6 h-6" />, text: "How AI impacts society and different communities", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Shield className="w-6 h-6" />, text: "How to use AI responsibly in your projects", color: "bg-teal-100 text-teal-600" },
              { icon: <Heart className="w-6 h-6" />, text: "Real-world examples of AI ethics in action", color: "bg-green-100 text-green-600" }
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

        {/* Ethical Considerations */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ethical Considerations ⚖️
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When building AI-powered businesses, we must consider these important ethical questions:
            </p>
          </div>
          
          {/* Featured Ethical Issue (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Exploring</div>
              <div className={`bg-gradient-to-r ${ethicalConsiderations[currentEthical].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-white">
                    {ethicalConsiderations[currentEthical].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{ethicalConsiderations[currentEthical].title}</h3>
                    <p className="text-xl opacity-90">{ethicalConsiderations[currentEthical].description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Example Problem:</h4>
                    <p className="text-sm">{ethicalConsiderations[currentEthical].example}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Solution:</h4>
                    <p className="text-sm">{ethicalConsiderations[currentEthical].solution}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Ethical Considerations Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {ethicalConsiderations.map((ethical, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentEthical === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
                onClick={() => setCurrentEthical(index)}
              >
                <div className="text-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {ethical.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{ethical.title}</h3>
                  <p className="text-gray-600 text-sm">{ethical.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Ethical Scenarios */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Test Your Ethics! 🧠
            </h2>
            <p className="text-xl text-gray-600">
              What would you do in these situations?
            </p>
          </div>

          {ethicalScenarios.map((scenario, index) => (
            <div key={scenario.key} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Scenario {index + 1}</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-400">
                  <p className="text-lg text-gray-700 mb-4">{scenario.scenario}</p>
                  <p className="font-semibold text-gray-800">{scenario.question}</p>
                </div>
              </div>

              <div className="space-y-3">
                {scenario.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleScenarioResponse(scenario.key, optionIndex)}
                    disabled={userResponses[scenario.key] !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      userResponses[scenario.key]?.selected === optionIndex
                        ? userResponses[scenario.key]?.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : userResponses[scenario.key] !== null
                        ? option.correct
                          ? 'border-green-300 bg-green-25'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                        : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {userResponses[scenario.key]?.selected === optionIndex && (
                        userResponses[scenario.key]?.correct ? 
                        <CheckCircle className="w-6 h-6 text-green-600" /> :
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      {userResponses[scenario.key] !== null && userResponses[scenario.key]?.selected !== optionIndex && option.correct && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      )}
                      <span className={`${
                        userResponses[scenario.key]?.selected === optionIndex
                          ? userResponses[scenario.key]?.correct ? 'text-green-800' : 'text-red-800'
                          : 'text-gray-700'
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback[scenario.key] && userResponses[scenario.key] && (
                <div className={`mt-4 p-4 rounded-lg ${
                  userResponses[scenario.key].correct 
                    ? 'bg-green-100 border border-green-300' 
                    : 'bg-red-100 border border-red-300'
                }`}>
                  <p className={`font-medium ${
                    userResponses[scenario.key].correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {userResponses[scenario.key].feedback}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Impact */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Social Impact 🌍
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI affects society in many ways - both positive and challenging. Here's what you need to know:
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {socialImpacts.map((impact, index) => (
              <div
                key={index}
                className={`${impact.color} rounded-3xl p-8 border-2 border-green-200 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 7) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 7) * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {impact.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{impact.title}</h3>
                  <p className="text-gray-600">{impact.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" /> Positive Impact
                    </h4>
                    <p className="text-green-700 text-sm">{impact.positive}</p>
                  </div>
                  <div className="bg-orange-100 rounded-lg p-4">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" /> Challenges
                    </h4>
                    <p className="text-orange-700 text-sm">{impact.negative}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible AI Use */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Responsible AI Use 🛡️
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a young entrepreneur, here's how you can use AI responsibly:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {responsiblePrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-3 flex-shrink-0">
                    {principle.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{principle.principle}</h3>
                    <p className="text-gray-600 mb-4">{principle.description}</p>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-700"><strong>Action:</strong> {principle.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Case Studies 📚
            </h2>
            <p className="text-xl text-gray-600">
              Real examples of AI ethics in action
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${study.color} rounded-3xl p-8 md:p-12 border-2 border-green-200 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  selectedCase === index ? 'ring-4 ring-green-300 scale-105' : ''
                }`}
                onClick={() => setSelectedCase(index)}
              >
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{study.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">{study.title}</h3>
                  <p className="text-xl text-gray-600">{study.description}</p>
                  <div className="bg-white rounded-lg p-4 mt-4 max-w-2xl mx-auto">
                    <p className="text-green-700 font-medium">{study.realExample}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" /> Benefits
                    </h4>
                    <ul className="space-y-3">
                      {study.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6">
                    <h4 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2" /> Concerns
                    </h4>
                    <ul className="space-y-3">
                      {study.concerns.map((concern, concernIndex) => (
                        <li key={concernIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700">{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
              With great AI power comes great responsibility. As future entrepreneurs, 
              you have the opportunity to build a better world through ethical AI use.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Ethics</strong> + 
                <strong className="text-emerald-600"> AI</strong> + 
                <strong className="text-teal-600"> Entrepreneurship</strong> = 
                <strong className="text-green-700"> Better Future! 🌟</strong>
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

export default Module6;