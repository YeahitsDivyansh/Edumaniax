import React, { useState, useEffect } from 'react';
import { Brain, Database, Zap, Camera, Search, MessageSquare, Users, BookOpen, Lightbulb, Target, ArrowRight, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';

const WorkOfAi = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLearningType, setCurrentLearningType] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through AI learning steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through learning types
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLearningType((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const aiWorkingSteps = [
    {
      id: 1,
      title: "Input (Getting Information)",
      description: "AI receives data like photos, text, or voice",
      icon: <Camera className="w-8 h-8" />,
      example: "You take a photo with your phone camera",
      detail: "AI sees millions of tiny dots (pixels) with different colors and brightness",
      color: "from-green-400 to-emerald-500"
    },
    {
      id: 2,
      title: "Processing (Understanding)",
      description: "AI analyzes and compares with learned patterns",
      icon: <Brain className="w-8 h-8" />,
      example: "AI analyzes the photo using algorithms",
      detail: "AI compares patterns with millions of photos it has seen before",
      color: "from-emerald-500 to-green-600"
    },
    {
      id: 3,
      title: "Output (Giving Answer)",
      description: "AI provides results or takes action",
      icon: <Zap className="w-8 h-8" />,
      example: "AI identifies objects and labels them",
      detail: "Your phone says 'Photo contains: dog, park, sunset'",
      color: "from-green-600 to-emerald-700"
    }
  ];

  const learningTypes = [
    {
      title: "Rule-based AI",
      subtitle: "Like Following a Recipe",
      description: "Follows exact instructions, never changes",
      example: "Traffic lights that change every 60 seconds",
      characteristics: "Can't handle unexpected situations",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-green-400 to-emerald-400"
    },
    {
      title: "Learning AI",
      subtitle: "Like Getting Better at a Game",
      description: "Improves by practicing with examples",
      example: "Gmail learning what emails are spam",
      characteristics: "The more data it sees, the smarter it becomes",
      icon: <Target className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500"
    },
    {
      title: "Smart AI",
      subtitle: "Like Human Thinking",
      description: "Makes complex decisions and understands context",
      example: "ChatGPT having conversations",
      characteristics: "Still being perfected by scientists",
      icon: <Brain className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600"
    }
  ];

  const dogRecognitionSteps = [
    { phase: "Training", description: "AI sees 1 million photos of different dog breeds", icon: <Database className="w-6 h-6" /> },
    { phase: "Learning", description: "AI learns dogs have fur, four legs, tails, specific face shapes", icon: <Brain className="w-6 h-6" /> },
    { phase: "Recognition", description: "You show AI your pet dog photo", icon: <Camera className="w-6 h-6" /> },
    { phase: "Analysis", description: "AI compares your photo with learned patterns", icon: <Search className="w-6 h-6" /> },
    { phase: "Result", description: "AI concludes: 'This is a dog!' and guesses the breed", icon: <CheckCircle className="w-6 h-6" /> }
  ];

  return (
    <div
      id="2"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["2"] = el;
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
              How Does AI Work?
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover the fascinating process of how machines learn and think like humans
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
              { icon: <Brain className="w-6 h-6" />, text: "How AI learns like a student", color: "bg-green-100 text-green-600" },
              { icon: <Zap className="w-6 h-6" />, text: "The 3 steps of how AI works", color: "bg-emerald-100 text-emerald-600" }
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

        {/* How AI Learns Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                How AI Learns (Like a Student!)
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              AI learns just like you do when studying for an exam - by seeing lots of examples and practicing until it gets better.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👶</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Teaching AI is Like Teaching a Baby
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "Show Many Examples",
                  description: "Just like you show a baby many dogs and say 'dog' each time",
                  icon: <Database className="w-12 h-12 text-green-600" />
                },
                {
                  step: "Practice and Correct",
                  description: "When the baby points to a cat and says 'dog,' you correct them",
                  icon: <AlertCircle className="w-12 h-12 text-emerald-600" />
                },
                {
                  step: "Get Better Over Time",
                  description: "Eventually, the baby learns to tell dogs from cats",
                  icon: <CheckCircle className="w-12 h-12 text-green-700" />
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    visibleCards.includes(index + 2) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(index + 2) * 200}ms` }}
                >
                  <div className="text-center">
                    <div className="mb-4">{item.icon}</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">{item.step}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How AI Works in 3 Steps */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How AI Works in 3 Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every AI system follows these three basic steps to process information
            </p>
          </div>

          {/* Interactive Step Display */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Showing Step</div>
              <div className={`bg-gradient-to-r ${aiWorkingSteps[currentStep].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="bg-white/20 rounded-full p-4">
                    {aiWorkingSteps[currentStep].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{aiWorkingSteps[currentStep].title}</h3>
                    <p className="text-xl opacity-90 mb-4">{aiWorkingSteps[currentStep].description}</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-2">Example:</h4>
                  <p className="text-lg mb-2">{aiWorkingSteps[currentStep].example}</p>
                  <p className="text-sm opacity-80">{aiWorkingSteps[currentStep].detail}</p>
                </div>
              </div>
            </div>

            {/* Step Navigation */}
            <div className="flex justify-center space-x-4">
              {aiWorkingSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === index
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Step {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* All Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {aiWorkingSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${step.color} text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentStep === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 5) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 5) * 150}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{step.description}</p>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-xs font-medium">{step.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Example: Dog Recognition */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🐕</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Detailed Example: How AI Recognizes Your Pet Dog
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Let's follow the complete journey of how AI learns to identify your furry friend
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-8">
              {dogRecognitionSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-3 flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{step.phase} Phase</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < dogRecognitionSteps.length - 1 && (
                    <div className="absolute left-9 mt-12 w-0.5 h-8 bg-green-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Types of AI Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Types of AI Explained
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI comes in different types, each with its own capabilities and limitations
            </p>
          </div>

          {/* Featured AI Type (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${learningTypes[currentLearningType].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="bg-white/20 rounded-full p-4">
                    {learningTypes[currentLearningType].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{learningTypes[currentLearningType].title}</h3>
                    <p className="text-lg opacity-90 mb-2">{learningTypes[currentLearningType].subtitle}</p>
                    <p className="text-sm opacity-80">{learningTypes[currentLearningType].description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold text-sm mb-2">Example:</h4>
                    <p className="text-sm">{learningTypes[currentLearningType].example}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h4 className="font-bold text-sm mb-2">Key Feature:</h4>
                    <p className="text-sm">{learningTypes[currentLearningType].characteristics}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All AI Types Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {learningTypes.map((type, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentLearningType === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 8) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 8) * 150}ms` }}
                onClick={() => setCurrentLearningType(index)}
              >
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${type.color} text-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{type.subtitle}</p>
                  <p className="text-xs text-gray-500">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scenario */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Putting It All Together: Taking a Photo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              See how all these AI concepts work together in something you do every day
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Data", description: "Your photo becomes data (millions of pixels)", icon: <Database className="w-8 h-8 text-green-600" /> },
                { title: "Algorithm", description: "Camera app uses algorithms to adjust brightness", icon: <Zap className="w-8 h-8 text-emerald-600" /> },
                { title: "Training", description: "AI was trained on millions of photos", icon: <Brain className="w-8 h-8 text-green-700" /> },
                { title: "Result", description: "You get a great photo automatically", icon: <CheckCircle className="w-8 h-8 text-emerald-700" /> }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              AI learns by studying examples, processes information in steps, and comes in different types with varying capabilities.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Learning</strong> + 
                <strong className="text-emerald-600"> Processing</strong> + 
                <strong className="text-green-700"> Output</strong> = 
                <strong className="text-emerald-700"> Smart AI! 🤖</strong>
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

export default WorkOfAi;