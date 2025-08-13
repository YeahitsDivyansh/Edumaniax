import React, { useState, useEffect } from 'react';
import { Shield, Book, Users, AlertTriangle, Phone, Heart, Scale, FileText, CheckCircle, XCircle } from 'lucide-react';

const Module3 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentLaw, setCurrentLaw] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLaw((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const childRights = [
    {
      title: "Right to Education",
      description: "Every child has the right to learn and go to school",
      icon: <Book className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Right to Safety",
      description: "Every child deserves to be protected from harm",
      icon: <Shield className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Right to Play",
      description: "Children need time to play and enjoy childhood",
      icon: <Heart className="w-8 h-8" />,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Right to Health",
      description: "Growing up healthy and getting medical care when needed",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600"
    }
  ];

  const protectionLaws = [
    {
      name: "Right to Education Act (RTE), 2009",
      description: "Free and compulsory education for all children aged 6-14 years",
      keyPoint: "You should be in school, not working!",
      icon: <Book className="w-10 h-10" />,
      color: "from-green-500 to-emerald-500",
      details: "This law ensures every child gets quality education without paying fees"
    },
    {
      name: "Child Labour Act",
      description: "Prohibits children below 14 from working in dangerous places",
      keyPoint: "Childhood is for learning, not laboring!",
      icon: <Shield className="w-10 h-10" />,
      color: "from-emerald-500 to-teal-500",
      details: "Protects children from working in factories, construction sites, and hazardous conditions"
    },
    {
      name: "POCSO Act (2012)",
      description: "Protection of Children from Sexual Offences Act",
      keyPoint: "Your body, your safety, your rights!",
      icon: <Scale className="w-10 h-10" />,
      color: "from-teal-500 to-green-600",
      details: "Strong legal protection against any form of abuse or inappropriate behavior"
    }
  ];

  const warningSignsData = [
    {
      situation: "Someone bullies you",
      action: "Tell a trusted adult immediately",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      situation: "Uncomfortable or inappropriate touch",
      action: "Say 'NO' loudly and report it",
      icon: <Shield className="w-6 h-6" />
    },
    {
      situation: "Forced to work instead of study",
      action: "Contact authorities or Childline",
      icon: <Book className="w-6 h-6" />
    },
    {
      situation: "Threats or physical harm",
      action: "Seek help from police or trusted adults",
      icon: <Phone className="w-6 h-6" />
    }
  ];

  const interactiveQuestions = [
    {
      question: "What does UNCRC stand for?",
      options: [
        "United Nations Children's Rights Committee",
        "United Nations Convention on the Rights of the Child",
        "Universal Nations Child Rights Code",
        "United Nations Child Relief Council"
      ],
      correct: 1,
      explanation: "UNCRC is the United Nations Convention on the Rights of the Child - a global promise to protect children's rights."
    },
    {
      question: "At what age does the Right to Education Act provide free education?",
      options: [
        "5 to 12 years",
        "6 to 14 years", 
        "7 to 15 years",
        "6 to 16 years"
      ],
      correct: 1,
      explanation: "The RTE Act ensures free and compulsory education for children aged 6 to 14 years."
    }
  ];

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
    
    setShowFeedback(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  return (
    <div
      id="3"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["3"] = el;
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
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Laws That Protect Children
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Understanding your rights and knowing when to speak up for your safety and well-being
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What You Will Learn
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="w-6 h-6" />, text: "What are child rights?", color: "bg-green-100 text-green-600" },
              { icon: <Shield className="w-6 h-6" />, text: "Key child protection laws", color: "bg-emerald-100 text-emerald-600" },
              { icon: <AlertTriangle className="w-6 h-6" />, text: "When and how to speak up", color: "bg-teal-100 text-teal-600" }
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

        {/* Child Rights Introduction */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What Are Child Rights?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Child rights are <strong className="text-green-600">special protections and freedoms</strong> that every child deserves—just because they are children!
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">UNCRC - A Global Promise</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  The <strong className="text-green-600">United Nations Convention on the Rights of the Child</strong> is like a big promise made by many countries (including India) to keep children safe and happy.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    🇮🇳 India has made its own child-friendly laws to follow these rights.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Fundamental Rights</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {childRights.map((right, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${right.color} text-white rounded-xl p-4 transform hover:scale-105 transition-all duration-300 ${
                      visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${(index + 3) * 150}ms` }}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        {right.icon}
                      </div>
                      <h4 className="font-bold text-sm mb-2">{right.title}</h4>
                      <p className="text-xs opacity-90">{right.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Protection Laws */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Key Child Protection Laws
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These laws are designed to keep you safe and ensure your rights are protected
            </p>
          </div>
          
          {/* Featured Law (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${protectionLaws[currentLaw].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-center">
                    {protectionLaws[currentLaw].icon}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{protectionLaws[currentLaw].name}</h3>
                    <p className="text-lg opacity-90 mb-3">{protectionLaws[currentLaw].description}</p>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm mb-2">📝 <strong>{protectionLaws[currentLaw].details}</strong></p>
                      <p className="text-sm font-bold">💡 {protectionLaws[currentLaw].keyPoint}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Laws Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {protectionLaws.map((law, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentLaw === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 7) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 7) * 150}ms` }}
                onClick={() => setCurrentLaw(index)}
              >
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${law.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    {law.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{law.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{law.description}</p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold">{law.keyPoint}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* When to Speak Up Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 border-l-4 border-red-400">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-3">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                When to Speak Up
              </h2>
            </div>
            <p className="text-lg text-gray-700">
              If someone does any of these things, <strong className="text-red-600">you should speak up!</strong>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {warningSignsData.map((warning, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-400 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 text-red-600 rounded-full p-3 flex-shrink-0">
                    {warning.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">If {warning.situation}</h3>
                    <p className="text-gray-600 font-medium">{warning.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who to Contact Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Who Can You Talk To?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-green-500 text-white rounded-full p-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Trusted Adults</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Parents or guardians</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Teachers or school counselors</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Older siblings or relatives</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Family friends you trust</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-emerald-500 text-white rounded-full p-3">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Emergency Helpline</h3>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6">
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-emerald-600 mb-2">1098</h4>
                  <p className="text-lg font-semibold text-gray-800 mb-2">Childline</p>
                  <p className="text-gray-600 text-sm">Free helpline for children in trouble</p>
                  <div className="mt-4 bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600">
                      📞 Available 24/7 • 🆓 Completely Free • 🌐 All over India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Knowledge Check */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Test Your Knowledge
            </h2>
            <p className="text-gray-600">Click on the answers you think are correct!</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {interactiveQuestions.map((question, qIndex) => (
              <div key={qIndex} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{question.question}</h3>
                
                <div className="grid gap-3">
                  {question.options.map((option, oIndex) => {
                    const isSelected = selectedAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === question.correct;
                    const showResult = showFeedback[qIndex];
                    
                    let buttonClass = "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300";
                    
                    if (showResult) {
                      if (isSelected) {
                        buttonClass = isCorrect 
                          ? "bg-green-100 border-green-500 text-green-700" 
                          : "bg-red-100 border-red-500 text-red-700";
                      } else if (isCorrect) {
                        buttonClass = "bg-green-100 border-green-500 text-green-700";
                      }
                    }

                    return (
                      <button
                        key={oIndex}
                        className={`${buttonClass} rounded-lg p-4 text-left transition-all duration-300 flex items-center justify-between`}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      >
                        <span>{option}</span>
                        {showResult && (
                          <div>
                            {isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showFeedback[qIndex] && (
                  <div className="mt-4 bg-white rounded-lg p-4 border-l-4 border-green-400">
                    <p className="text-sm text-gray-700">
                      <strong className="text-green-600">Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Safety Checklist Activity */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Home Safety Checklist Activity
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Think about your home and check if these safety measures are in place
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Cleaning chemicals stored safely away from reach",
                "Emergency contact numbers easily accessible",
                "First aid kit available and accessible",
                "Fire extinguisher or safety equipment present",
                "Safe locks on doors and windows",
                "Good lighting in all areas of the house",
                "Non-slip mats in bathroom areas",
                "Electrical outlets covered or protected"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
                  <div className="w-5 h-5 border-2 border-green-400 rounded flex items-center justify-center cursor-pointer hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 text-green-600 opacity-0 hover:opacity-100" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                💡 <strong>Note:</strong> Discuss any gaps with your family to improve home safety!
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This Always
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-gray-700 font-medium">
                Your rights are there to protect you. <strong className="text-green-600">Never hesitate to speak up</strong> when something doesn't feel right.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-green-600 mb-2">Your Rights</h3>
                  <p className="text-gray-600 text-sm">Are protected by law</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-emerald-600 mb-2">Your Voice</h3>
                  <p className="text-gray-600 text-sm">Matters and should be heard</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-teal-600 mb-2">Your Safety</h3>
                  <p className="text-gray-600 text-sm">Is the top priority</p>
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

export default Module3;