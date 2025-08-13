import React, { useState, useEffect } from 'react';
import { Search, Users, Lightbulb, BarChart3, Target, Hammer, MessageSquare, Rocket, RotateCcw, Bot, ChevronRight, CheckCircle, Play, Pause, Eye, PenTool, FileText, Megaphone, BookOpen } from 'lucide-react';

const EntrepreneurshipModule2 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userProblems, setUserProblems] = useState(['', '', '']);
  const [userFeedback, setUserFeedback] = useState(['', '', '']);

  const steps = [
    {
      number: 1,
      title: "Spot the Problem",
      subtitle: "Every business starts with a simple question: What problem can I solve?",
      icon: <Search className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      example: "Students wait too long in the canteen line and sometimes miss their break.",
      activity: "List 3 small problems you see every day.",
      description: "Look around your school, home, or community. Entrepreneurs are like detectives—they observe, listen, and notice what's missing."
    },
    {
      number: 2,
      title: "Understand Customer Needs",
      subtitle: "What do people actually need?",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-100 to-green-50",
      example: "Talk to classmates: 'How does waiting in line affect your break time?'",
      activity: "Ask 3 people about their biggest daily frustrations.",
      description: "Talk to your classmates, friends, or teachers. Ask why the problem matters to them and listen carefully to their answers."
    },
    {
      number: 3,
      title: "Brainstorm Solutions",
      subtitle: "Time to get creative!",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      example: "Mind map: Mobile ordering app → Pre-order system → Express pickup counters",
      activity: "Use mind mapping to explore all possible solutions.",
      description: "Once you understand the problem and who's facing it, start dreaming up ideas using mind mapping, group discussions, or SCAMPER techniques."
    },
    {
      number: 4,
      title: "Research & Validation",
      subtitle: "Is your idea really useful? Is it new?",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-100",
      example: "Check if similar canteen apps exist and what makes yours different.",
      activity: "Research 3 existing solutions and find your unique advantage.",
      description: "Ask: Are others already doing something similar? What makes your idea special or better? Would people actually use it?"
    },
    {
      number: 5,
      title: "Product-Market Fit",
      subtitle: "Does your idea match what people truly need?",
      icon: <Target className="w-8 h-8" />,
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-50 to-green-50",
      example: "Students say: 'I would totally use this canteen app!'",
      activity: "Ask 3 friends: 'Would you want to use this? Why or why not?'",
      description: "Look for signs: People are excited when you explain it, they say they'd use it, and they offer suggestions to make it better."
    },
    {
      number: 6,
      title: "Make a Prototype",
      subtitle: "A basic model of your idea",
      icon: <Hammer className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      example: "Draw mockup screens of your canteen app on paper or use Canva.",
      activity: "Create a simple drawing or model of your solution.",
      description: "A prototype doesn't need to be perfect—it just helps others understand what you're imagining. Use drawings, mockups, or simple materials."
    },
    {
      number: 7,
      title: "Feedback & Iteration",
      subtitle: "Change and improve step by step",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-100 to-green-50",
      example: "Users suggest adding 'favorites' feature to speed up ordering.",
      activity: "Collect feedback and make 3 improvements to your idea.",
      description: "Show your prototype to others. Ask what they like, what's unclear, and what should change. Use surveys, interviews, or AI tools."
    },
    {
      number: 8,
      title: "Launch Your Idea",
      subtitle: "Time to share with more people!",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      example: "Present your canteen app at the school innovation fair.",
      activity: "Plan how you'll introduce your idea to your target audience.",
      description: "Launch could mean showing at school exhibitions, creating a simple website, or running a test version for classmates."
    },
    {
      number: 9,
      title: "Reflect & Grow",
      subtitle: "Learn from your journey",
      icon: <RotateCcw className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-100",
      example: "Journal: 'I learned that listening to users is more important than my first idea.'",
      activity: "Write down 3 things you learned about yourself and entrepreneurship.",
      description: "Reflect on what you did well, what could be better next time, and what you learned about people, ideas, and yourself."
    }
  ];

  const aiTools = [
    { stage: "Spotting Problems", tools: "ChatGPT for idea prompts, Google Trends", icon: <Search className="w-5 h-5" /> },
    { stage: "Designing Solutions", tools: "AI image generators for mockups", icon: <PenTool className="w-5 h-5" /> },
    { stage: "Planning", tools: "AI business plan tools", icon: <FileText className="w-5 h-5" /> },
    { stage: "Prototyping", tools: "No-code tools for basic apps/websites", icon: <Hammer className="w-5 h-5" /> },
    { stage: "Testing", tools: "AI surveys and feedback analyzers", icon: <BarChart3 className="w-5 h-5" /> },
    { stage: "Launching", tools: "Canva AI for logos and posters", icon: <Megaphone className="w-5 h-5" /> },
    { stage: "Promoting", tools: "AI writing assistants for ads", icon: <Rocket className="w-5 h-5" /> },
    { stage: "Reflecting", tools: "AI tools for tracking growth", icon: <BookOpen className="w-5 h-5" /> }
  ];

  const brainstormingTechniques = [
    {
      name: "Mind Mapping",
      description: "Start with the problem and branch out with ideas",
      icon: "🧠"
    },
    {
      name: "Group Discussions", 
      description: "Team up and bounce ideas off each other",
      icon: "👥"
    },
    {
      name: "SCAMPER",
      description: "Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse",
      icon: "🔄"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(Array.from({length: 15}, (_, i) => i));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleProblemChange = (index, value) => {
    const newProblems = [...userProblems];
    newProblems[index] = value;
    setUserProblems(newProblems);
  };

  const handleFeedbackChange = (index, value) => {
    const newFeedback = [...userFeedback];
    newFeedback[index] = value;
    setUserFeedback(newFeedback);
  };

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
                <Rocket className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              The Entrepreneurial Process
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Step by Step Guide to Turn Your Ideas into Reality
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
              <p className="text-lg text-green-100 italic">
                "Have you ever noticed something around you that just doesn't work well? 
                Or thought of a cool idea that could help people? That's how many businesses begin!"
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Interactive Step Navigator */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              9-Step Entrepreneurial Journey
            </h2>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? 'Pause' : 'Play'} Auto</span>
            </button>
          </div>
          
          {/* Current Step Showcase */}
          <div className={`bg-gradient-to-r ${steps[currentStep].color} text-white rounded-2xl p-8 mb-8`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    {steps[currentStep].icon}
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Step {steps[currentStep].number}</div>
                    <h3 className="text-3xl font-bold">{steps[currentStep].title}</h3>
                  </div>
                </div>
                <p className="text-xl opacity-90 mb-4">{steps[currentStep].subtitle}</p>
                <p className="opacity-80">{steps[currentStep].description}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="font-bold mb-3">Example:</h4>
                <p className="text-sm opacity-90 mb-4">{steps[currentStep].example}</p>
                <div className="bg-white/20 rounded-lg p-3">
                  <h5 className="font-semibold text-sm mb-1">Try This:</h5>
                  <p className="text-sm opacity-90">{steps[currentStep].activity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step Progress Indicator */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  currentStep === index 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                }`}
              >
                <span className="text-sm font-semibold">{step.number}</span>
                <span className="text-sm">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${step.bgColor} rounded-2xl p-6 border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300 ${
                visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-r ${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                {step.icon}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Step {step.number}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                <div className="bg-white rounded-lg p-3 text-left">
                  <h4 className="font-semibold text-green-600 text-xs mb-1">EXAMPLE:</h4>
                  <p className="text-xs text-gray-600 mb-3">{step.example}</p>
                  <h4 className="font-semibold text-emerald-600 text-xs mb-1">TRY THIS:</h4>
                  <p className="text-xs text-gray-600">{step.activity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brainstorming Techniques Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Brainstorming Techniques
            </h2>
            <p className="text-lg text-gray-600 mt-4">Try these creative approaches to generate ideas</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {brainstormingTechniques.map((technique, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">{technique.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{technique.name}</h3>
                <p className="text-gray-600 text-sm">{technique.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Problem Spotting Activity */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Activity: Spot Your Problems
            </h2>
            <p className="text-lg text-gray-600 mt-4">List 3 small problems you see every day</p>
          </div>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {userProblems.map((problem, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Problem #{index + 1}
                </label>
                <input
                  type="text"
                  value={problem}
                  onChange={(e) => handleProblemChange(index, e.target.value)}
                  placeholder="What problem do you notice in your daily life?"
                  className="w-full p-4 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {problem && (
                  <div className="mt-3 flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Great observation!</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product-Market Fit Validation Activity */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Product-Market Fit Signs
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "😍",
                title: "Excitement Test",
                description: "People are excited when you explain your idea"
              },
              {
                icon: "✋",
                title: "Usage Intent",
                description: "They say, 'I would totally use this!'"
              },
              {
                icon: "💡",
                title: "Improvement Ideas",
                description: "They offer suggestions to make it even better"
              }
            ].map((sign, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">{sign.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{sign.title}</h3>
                <p className="text-gray-600 text-sm">{sign.description}</p>
              </div>
            ))}
          </div>

          {/* Feedback Collection Activity */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Collect Feedback from 3 Friends
            </h3>
            <div className="space-y-4">
              {userFeedback.map((feedback, index) => (
                <div key={index} className="border border-green-200 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Friend #{index + 1} Response: "Would you want to use this? Why or why not?"
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                    placeholder="Record their honest feedback here..."
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prototype Types */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔨</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Types of Prototypes
            </h2>
            <p className="text-lg text-gray-600 mt-4">Choose the best way to show your idea</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <PenTool className="w-8 h-8" />,
                title: "Drawing or Sketch",
                description: "Simple hand-drawn concepts and layouts",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Paper Mockup",
                description: "Detailed mockups using tools like Canva",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Hammer className="w-8 h-8" />,
                title: "Mini Model",
                description: "Physical models with paper or recycled materials",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((type, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                <div className={`bg-gradient-to-r ${type.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {type.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              How AI Can Help at Every Step
            </h2>
            <p className="text-lg text-gray-600 mt-4">Modern tools to accelerate your entrepreneurial journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.map((tool, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  visibleCards.includes(index + 10) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-2">
                    {tool.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">{tool.stage}</h3>
                </div>
                <p className="text-xs text-gray-600">{tool.tools}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Ideas */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Ways to Launch Your Idea
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏫",
                title: "School Exhibition",
                description: "Present during science fairs or innovation events"
              },
              {
                icon: "💻",
                title: "Simple Website",
                description: "Create a basic landing page to showcase your idea"
              },
              {
                icon: "👥",
                title: "Test with Classmates",
                description: "Run a pilot version with friends and get feedback"
              }
            ].map((launch, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center border-l-4 border-green-400">
                <div className="text-4xl mb-4">{launch.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{launch.title}</h3>
                <p className="text-gray-600 text-sm">{launch.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection Questions */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🤔</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Reflect and Grow
            </h2>
            <p className="text-lg text-gray-600 mt-4">Every great entrepreneur reflects on their journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                question: "What did I do well?",
                icon: "✅",
                color: "bg-green-100"
              },
              {
                question: "What could I do better next time?",
                icon: "🔄",
                color: "bg-emerald-100"
              },
              {
                question: "What did I learn about people, ideas, and myself?",
                icon: "💡",
                color: "bg-teal-100"
              }
            ].map((reflection, index) => (
              <div key={index} className={`${reflection.color} rounded-2xl p-6 text-center`}>
                <div className="text-4xl mb-4">{reflection.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{reflection.question}</h3>
                <textarea
                  placeholder="Write your thoughts here..."
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows="4"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium mb-6">
              Every successful business follows this process: <strong className="text-green-600">Spot → Understand → Create → Test → Improve → Launch → Learn</strong>
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Start small</strong>, 
                <strong className="text-emerald-600"> think big</strong>, and 
                <strong className="text-teal-600"> never stop learning! 🚀</strong>
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

export default EntrepreneurshipModule2;