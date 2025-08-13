import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Target, Zap,  Gamepad2, Car, Smartphone, CheckCircle, ArrowRight, Lightbulb, Star, Trophy, BookOpen } from 'lucide-react';

const TypesAndUseOfAi = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeAIType, setActiveAIType] = useState(0);
  const [currentExample, setCurrentExample] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10 ,]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAIType((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % narrowAIExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const narrowAIExamples = [
    {
      name: "Google Translate",
      description: "Only translates languages, can't do math or play games",
      icon: "🌍",
      specialty: "Language Translation",
      limitation: "Can't recognize faces or solve math problems"
    },
    {
      name: "Shazam",
      description: "Only identifies songs, can't recognize faces or drive cars",
      icon: "🎵",
      specialty: "Music Recognition",
      limitation: "Can't translate languages or predict weather"
    },
    {
      name: "Chess AI",
      description: "Can beat world champions at chess but can't play checkers",
      icon: "♟️",
      specialty: "Chess Strategy",
      limitation: "Completely useless at other board games"
    },
    {
      name: "Weather Apps",
      description: "Predict weather perfectly but can't recommend movies",
      icon: "🌤️",
      specialty: "Weather Forecasting",
      limitation: "Has no idea about entertainment or movies"
    }
  ];

  const aiTypes = [
    {
      title: "Narrow AI",
      subtitle: "Today's AI - The Specialist",
      description: "AI that's really good at ONE specific job, like a specialist doctor who only treats heart problems.",
      icon: <Target className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-400",
      status: "Available Now",
      analogy: "Like a person who's amazing at playing piano but terrible at cooking"
    },
    {
      title: "General AI",
      subtitle: "Future AI - The Multi-Talented Human", 
      description: "AI that can think, learn, and solve different types of problems just like humans do.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-400",
      status: "Still Being Developed",
      analogy: "Like having a super-smart friend who's good at everything"
    },
    {
      title: "Machine Learning",
      subtitle: "The Learning Branch of AI",
      description: "A special type of AI that learns by studying examples, just like how you learn to recognize different dog breeds by seeing many pictures of dogs.",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      bgColor: "from-teal-50 to-green-50", 
      borderColor: "border-teal-400",
      status: "Powering Today's Apps",
      analogy: "Like studying for a test by looking at many practice examples"
    }
  ];

  const machineLearningExamples = [
    {
      title: "Email Spam Detection",
      icon: "📧",
      steps: [
        { phase: "Learning", description: "AI studies 1 million emails labeled 'spam' or 'not spam'" },
        { phase: "Pattern Recognition", description: "AI learns that emails with words like 'FREE MONEY' are usually spam" },
        { phase: "Real-world Use", description: "When you get a new email, AI checks if it matches spam patterns" },
        { phase: "Getting Better", description: "The more emails it sees, the better it becomes at detecting spam" }
      ]
    },
    {
      title: "Music Recommendation (Spotify)",
      icon: "🎧",
      steps: [
        { phase: "Learning", description: "AI studies what millions of people listen to" },
        { phase: "Pattern Recognition", description: "AI learns that people who like Taylor Swift often like Olivia Rodrigo" },
        { phase: "Real-world Use", description: "When you like Taylor Swift songs, AI suggests Olivia Rodrigo" },
        { phase: "Getting Better", description: "The more you listen, the better it understands your taste" }
      ]
    }
  ];

  const funUses = [
    {
      category: "AI in Games",
      icon: <Gamepad2 className="w-6 h-6" />,
      examples: [
        "FIFA Soccer: AI players learn your playing style and adapt their strategy",
        "Minecraft: AI mobs (like zombies) learn to find you even when you hide",
        "Chess.com: AI opponents adjust their difficulty based on your skill level"
      ]
    },
    {
      category: "AI Digital Pets",
      icon: <Smartphone className="w-6 h-6" />,
      examples: [
        "Talking Tom: Responds to your voice and learns your favorite words",
        "Pet simulation games: AI pets remember if you fed them and act happy or sad accordingly"
      ]
    },
    {
      category: "AI in Smart Cars",
      icon: <Car className="w-6 h-6" />,
      examples: [
        "Lane Keeping: AI watches road lines and keeps the car centered",
        "Collision Avoidance: AI sees obstacles and automatically brakes",
        "Parking Assistance: AI calculates the perfect angle to park in tight spaces"
      ]
    }
  ];

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
              Types and Uses of AI
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover the different types of AI and how they're changing our world
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
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What You Will Learn
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Target className="w-6 h-6" />, text: "Different types of AI and their capabilities", color: "bg-green-100 text-green-600" },
              { icon: <Lightbulb className="w-6 h-6" />, text: "How Machine Learning works with examples", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Gamepad2 className="w-6 h-6" />, text: "Fun ways AI is used in games and apps", color: "bg-teal-100 text-teal-600" }
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

        {/* AI Types Overview */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Three Types of AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's explore the different kinds of artificial intelligence and what makes each one special
            </p>
          </div>

          {/* Featured AI Type (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${aiTypes[activeAIType].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="flex-shrink-0">
                    {aiTypes[activeAIType].icon}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{aiTypes[activeAIType].title}</h3>
                    <p className="text-xl opacity-90 mb-3">{aiTypes[activeAIType].subtitle}</p>
                    <p className="text-lg opacity-80 mb-4">{aiTypes[activeAIType].description}</p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm"><strong>Status:</strong> {aiTypes[activeAIType].status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All AI Types Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {aiTypes.map((type, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${type.bgColor} border-2 ${type.borderColor} rounded-3xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  activeAIType === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
                onClick={() => setActiveAIType(index)}
              >
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${type.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{type.subtitle}</p>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-500 italic">{type.analogy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrow AI Deep Dive */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Narrow AI Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These AI systems are specialists - they're amazing at one thing but can't do anything else
            </p>
          </div>

          {/* Featured Example (Auto-rotating) */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="text-center">
              <div className="text-6xl mb-4">{narrowAIExamples[currentExample].icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {narrowAIExamples[currentExample].name}
              </h3>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                {narrowAIExamples[currentExample].description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-green-100 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-bold text-green-800">What it's great at:</h4>
                  </div>
                  <p className="text-green-700">{narrowAIExamples[currentExample].specialty}</p>
                </div>
                
                <div className="bg-red-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✗</span>
                    </div>
                    <h4 className="text-lg font-bold text-red-800">What it can't do:</h4>
                  </div>
                  <p className="text-red-700">{narrowAIExamples[currentExample].limitation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* All Narrow AI Examples Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {narrowAIExamples.map((example, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentExample === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 150}ms` }}
                onClick={() => setCurrentExample(index)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{example.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{example.name}</h3>
                  <p className="text-sm text-gray-600">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General AI Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 border-l-4 border-emerald-400">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  General AI - The Future
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  General AI would be like having a super-smart friend who's good at everything. 
                  One AI that can drive your car, help with homework, cook dinner, and play games!
                </p>
                
                <div className="bg-yellow-100 border-l-4 border-yellow-400 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-lg font-bold text-yellow-800">Current Status</h3>
                  </div>
                  <p className="text-yellow-700">
                    Scientists are still working on this - it doesn't exist yet!
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Why is it so hard to create?</h3>
                  <p className="text-gray-600 mb-6">
                    Think about everything your brain does in one day:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Recognize faces and understand emotions",
                      "Understand jokes and sarcasm", 
                      "Solve complex problems creatively",
                      "Learn new skills quickly",
                      "Make decisions with incomplete information"
                    ].map((skill, index) => (
                      <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border-l-4 border-emerald-400">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <p className="text-gray-700 text-sm">{skill}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Machine Learning Deep Dive */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Machine Learning in Detail
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How AI learns by studying examples - just like how you learned to recognize different animals by seeing lots of pictures
            </p>
          </div>

          {/* Machine Learning Examples */}
          <div className="grid lg:grid-cols-2 gap-12">
            {machineLearningExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{example.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800">{example.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {example.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-6 border-l-4 border-teal-400 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {stepIndex + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-800 mb-2">{step.phase}</h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Uses Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Fun Ways AI is Used Today 🎮
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI isn't just for serious stuff - it's making games, apps, and everyday life more exciting!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {funUses.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 8) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 8) * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-700">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Quick Summary
            </h2>
            <p className="text-xl text-gray-600">
              Here's everything you need to remember about AI types
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <th className="px-6 py-4 text-left rounded-tl-xl">AI Type</th>
                  <th className="px-6 py-4 text-left">Special Skill</th>
                  <th className="px-6 py-4 text-left">Real Example</th>
                  <th className="px-6 py-4 text-left">What Makes It Special</th>
                  <th className="px-6 py-4 text-left rounded-tr-xl">How You Use It</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b border-green-200">
                  <td className="px-6 py-4 font-bold text-gray-800">Narrow AI</td>
                  <td className="px-6 py-4 text-gray-700">One specific task</td>
                  <td className="px-6 py-4 text-gray-700">Instagram face filters</td>
                  <td className="px-6 py-4 text-gray-700">Recognizes faces and adds effects</td>
                  <td className="px-6 py-4 text-gray-700">Open camera, apply filter</td>
                </tr>
                <tr className="bg-emerald-50 border-b border-emerald-200">
                  <td className="px-6 py-4 font-bold text-gray-800">General AI</td>
                  <td className="px-6 py-4 text-gray-700">Think like humans</td>
                  <td className="px-6 py-4 text-gray-700">Not available yet</td>
                  <td className="px-6 py-4 text-gray-700">Would understand everything</td>
                  <td className="px-6 py-4 text-gray-700">Future technology</td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="px-6 py-4 font-bold text-gray-800">Machine Learning</td>
                  <td className="px-6 py-4 text-gray-700">Learns from examples</td>
                  <td className="px-6 py-4 text-gray-700">TikTok's "For You" page</td>
                  <td className="px-6 py-4 text-gray-700">Learns what videos you like</td>
                  <td className="px-6 py-4 text-gray-700">The more you use it, the better it gets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              Today's AI is like having many different specialists working together. 
              Each AI is amazing at one thing, but the future might bring us AI that can do everything!
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Narrow AI</strong> (Today) + 
                <strong className="text-emerald-600"> Machine Learning</strong> (Learning) = 
                <strong className="text-teal-600"> Amazing Apps! 🚀</strong>
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

export default TypesAndUseOfAi;