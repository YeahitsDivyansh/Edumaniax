import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Database, 
  Settings, 
  MessageSquare, 
  Bot, 
  Network, 
  HardDrive, 
  Cloud, 
  Search,
  ChevronRight,
  Lightbulb,
  Camera,
  Mic,
  Play,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Eye
} from 'lucide-react';

const ImpAIWords = ({ topicRefs }) => {
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const vocabularyTerms = [
    {
      word: "Data",
      simple: "Information AI learns from",
      detailed: "Like textbooks for AI - pictures, text, numbers that teach AI how to work",
      example: "1 million cat photos to teach AI what cats look like",
      realWorld: "When you upload photos to Google Photos, you're giving it data",
      icon: <Database className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      word: "Algorithm",
      simple: "Step-by-step instructions for AI",
      detailed: "Like a recipe that tells AI exactly what to do with information",
      example: "Instagram's algorithm decides which posts to show you first",
      realWorld: "The order of posts on your Instagram feed",
      icon: <Settings className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      word: "Training",
      simple: "How AI learns and gets better",
      detailed: "Like studying for an exam - AI practices with lots of examples until it gets good",
      example: "Spam detection AI studying millions of spam emails",
      realWorld: "Gmail getting better at filtering spam over time",
      icon: <Brain className="w-6 h-6" />,
      color: "from-green-600 to-emerald-600"
    },
    {
      word: "Chatbot",
      simple: "AI that talks like a human",
      detailed: "A computer program that can have conversations through text or voice",
      example: "Customer service chat on websites",
      realWorld: "When you ask a question on a website and get an instant response",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-teal-500 to-green-500"
    },
    {
      word: "Robot",
      simple: "A machine that can move and work",
      detailed: "Physical machine that uses AI to do tasks in the real world",
      example: "Roomba vacuum cleaner that navigates your house",
      realWorld: "Automated vacuum that cleans while you're away",
      icon: <Bot className="w-6 h-6" />,
      color: "from-emerald-600 to-green-600"
    },
    {
      word: "Neural Network",
      simple: "AI brain structure",
      detailed: "Computer system inspired by how human brains work, with connected parts",
      example: "Face recognition in photos",
      realWorld: "When Facebook suggests tagging friends in pictures",
      icon: <Network className="w-6 h-6" />,
      color: "from-green-500 to-teal-500"
    },
    {
      word: "Big Data",
      simple: "Huge amounts of information",
      detailed: "So much data that regular computers can't handle it",
      example: "All YouTube videos watched in one day",
      realWorld: "YouTube processing billions of hours of video",
      icon: <HardDrive className="w-6 h-6" />,
      color: "from-teal-600 to-emerald-600"
    },
    {
      word: "Cloud Computing",
      simple: "Using internet computers",
      detailed: "Storing and processing data on powerful computers via internet",
      example: "Google Drive storing your files",
      realWorld: "Accessing your photos from any device",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500"
    }
  ];

  const scenarios = [
    {
      title: "Taking a Photo",
      icon: <Camera className="w-8 h-8" />,
      steps: [
        { term: "Data", description: "Your photo becomes data (millions of pixels)" },
        { term: "Algorithm", description: "Camera app uses algorithms to adjust brightness and focus" },
        { term: "Training", description: "The AI was trained on millions of photos to know what looks good" },
        { term: "Result", description: "You get a great photo automatically", isResult: true }
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Asking Siri a Question",
      icon: <Mic className="w-8 h-8" />,
      steps: [
        { term: "Data", description: "Your voice becomes audio data" },
        { term: "Algorithm", description: "Speech recognition algorithm converts your voice to text" },
        { term: "Training", description: "Siri was trained on millions of voice samples" },
        { term: "Chatbot", description: "Siri acts as a voice chatbot to respond" },
        { term: "Cloud Computing", description: "Your question is processed on Apple's internet computers" },
        { term: "Result", description: "You get a spoken answer", isResult: true }
      ],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Watching YouTube",
      icon: <Play className="w-8 h-8" />,
      steps: [
        { term: "Big Data", description: "YouTube analyzes billions of videos and user preferences" },
        { term: "Algorithm", description: "Recommendation algorithm picks videos for you" },
        { term: "Training", description: "AI learns from what millions of people watch" },
        { term: "Result", description: "You see videos you're likely to enjoy", isResult: true }
      ],
      gradient: "from-teal-500 to-green-500"
    }
  ];

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
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              AI Words You Should Know
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Master the essential AI vocabulary with real-world examples that make sense
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
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What You Will Learn
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Database className="w-6 h-6" />, text: "8 Essential AI Terms with Real Examples", color: "bg-green-100 text-green-600" },
              { icon: <Eye className="w-6 h-6" />, text: "How AI Works in Your Daily Life", color: "bg-emerald-100 text-emerald-600" }
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

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              {[
                { id: 'vocabulary', label: 'Vocabulary', icon: <Database className="w-5 h-5" /> },
                { id: 'scenarios', label: 'Real Scenarios', icon: <Sparkles className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === 'vocabulary' && (
          <>
            {/* Vocabulary Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vocabularyTerms.map((term, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    selectedTerm === index ? 'ring-4 ring-green-300 scale-105' : ''
                  } ${
                    visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedTerm(index)}
                >
                  <div className={`bg-gradient-to-r ${term.color} rounded-xl p-4 text-white mb-4`}>
                    <div className="flex items-center justify-between">
                      {term.icon}
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{term.word}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{term.simple}</p>
                </div>
              ))}
            </div>

            {/* Selected Term Detail */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${vocabularyTerms[selectedTerm].color} rounded-full p-3`}>
                      {vocabularyTerms[selectedTerm].icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                      {vocabularyTerms[selectedTerm].word}
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Simple Meaning</h3>
                      <p className="text-gray-600">{vocabularyTerms[selectedTerm].simple}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Detailed Explanation</h3>
                      <p className="text-gray-600">{vocabularyTerms[selectedTerm].detailed}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Real Example</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{vocabularyTerms[selectedTerm].example}</p>
                    
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-gray-800">How You See It</h4>
                          <p className="text-gray-600 text-sm">{vocabularyTerms[selectedTerm].realWorld}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'scenarios' && (
          <>
            {/* Scenarios Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Vocabulary in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how AI vocabulary works together in real-world scenarios you experience every day
              </p>
            </div>

            {/* Auto-rotating Current Scenario */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="text-lg text-gray-600 mb-4">Currently Showing</div>
                <div className={`bg-gradient-to-r ${scenarios[currentScenario].gradient} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    {scenarios[currentScenario].icon}
                    <h3 className="text-3xl font-bold">{scenarios[currentScenario].title}</h3>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  {scenarios[currentScenario].steps.map((step, index) => (
                    <div
                      key={index}
                      className={`${step.isResult 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-400' 
                        : 'bg-gray-50'
                      } rounded-xl p-6 transform hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`${step.isResult ? 'bg-green-500' : 'bg-gray-400'} rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm`}>
                          {step.isResult ? <CheckCircle className="w-5 h-5" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`font-bold ${step.isResult ? 'text-green-600' : 'text-gray-800'}`}>
                              {step.term}
                            </span>
                            {!step.isResult && <ArrowRight className="w-4 h-4 text-gray-400" />}
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All Scenarios Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    currentScenario === index ? 'ring-4 ring-green-300 scale-105' : ''
                  }`}
                  onClick={() => setCurrentScenario(index)}
                >
                  <div className={`bg-gradient-to-r ${scenario.gradient} rounded-xl p-4 text-white mb-4`}>
                    <div className="flex items-center justify-center">
                      {scenario.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{scenario.title}</h3>
                  <p className="text-gray-600 text-sm text-center">
                    {scenario.steps.length - 1} AI concepts in action
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-6">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              AI is all around you! Understanding these basic terms helps you see how artificial intelligence makes your daily life easier and more convenient.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <Zap className="w-8 h-8 text-green-600" />
                <p className="text-lg text-gray-600">
                  <strong className="text-green-600">Data</strong> + 
                  <strong className="text-emerald-600"> Algorithms</strong> + 
                  <strong className="text-teal-600"> Training</strong> = 
                  <strong className="text-green-700"> Smart AI! 🤖</strong>
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

export default ImpAIWords;