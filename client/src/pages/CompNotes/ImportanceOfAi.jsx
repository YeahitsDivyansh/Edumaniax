import React, { useState, useEffect } from 'react';
import { Brain, Shield, AlertTriangle, CheckCircle, XCircle, Trophy, Lightbulb, Users, Target, BookOpen, Scale, Eye, Clock, ArrowRight, Star, Flag, Zap } from 'lucide-react';

const Module7AIJudiciousUse = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(stepInterval);
  }, []);

  const scenarios = [
    {
      title: "Math Homework",
      judicious: "Use AI to check your work after solving problems yourself",
      poor: "Ask AI to solve all problems without trying first",
      result: "Helper approach builds confidence; replacement approach creates dependency"
    },
    {
      title: "Creative Projects", 
      judicious: "Use AI for inspiration and initial ideas, then develop them yourself",
      poor: "Submit AI-generated artwork or stories as your own work",
      result: "Helper approach enhances creativity; replacement approach kills original thinking"
    }
  ];

  const threeStepMethod = [
    {
      step: "ASK",
      title: "Do I Need AI for This?",
      questions: [
        "Can I do this task myself to learn something new?",
        "Will using AI help me understand better, or just give me an answer?",
        "Am I using AI because it's helpful or because I'm being lazy?"
      ],
      color: "from-green-500 to-emerald-500",
      icon: <Eye className="w-8 h-8" />
    },
    {
      step: "USE",
      title: "Apply AI Thoughtfully", 
      questions: [
        "Use AI as a starting point, not the final answer",
        "Always check AI results with other sources",
        "Combine AI suggestions with your own ideas and knowledge"
      ],
      color: "from-emerald-500 to-teal-500",
      icon: <Brain className="w-8 h-8" />
    },
    {
      step: "LEARN",
      title: "What Did I Gain?",
      questions: [
        "What new skills did I develop?",
        "How did AI help me learn rather than just complete the task?",
        "What would I do differently next time?"
      ],
      color: "from-teal-500 to-green-600",
      icon: <Lightbulb className="w-8 h-8" />
    }
  ];

  const realLifeExamples = [
    {
      name: "Alex - The Smart Student",
      avatar: "🧑‍🎓",
      actions: [
        "Uses AI to explain complex science concepts in simple terms",
        "Practices math problems himself, then checks answers with AI", 
        "Gets AI suggestions for essay topics, then researches and writes independently"
      ],
      result: "Improved grades AND stronger learning skills",
      color: "from-green-100 to-emerald-100"
    },
    {
      name: "Maya - The Creative Artist",
      avatar: "🎨",
      actions: [
        "Uses AI to generate color palette ideas for her paintings",
        "Studies AI-generated art styles to learn new techniques",
        "Creates original artwork inspired by AI suggestions"
      ],
      result: "Enhanced creativity while maintaining her unique artistic voice",
      color: "from-emerald-100 to-teal-100"
    },
    {
      name: "David - The Future Programmer",
      avatar: "💻",
      actions: [
        "Uses AI to understand coding concepts and debug errors",
        "Writes his own code first, then asks AI for optimization tips",
        "Studies AI-generated code examples to learn new programming patterns"
      ],
      result: "Stronger programming skills and faster learning",
      color: "from-teal-100 to-green-200"
    }
  ];

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  return (
    <div
      id="7"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["7"] = el;
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
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Using AI Judiciously
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Learn to use AI wisely, responsibly, and thoughtfully for your growth and learning
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Does Judicious Mean */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What Does "Using AI Judiciously" Mean?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Scale className="w-6 h-6 text-green-600 mr-3" />
                  Judicious Means
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Being <strong className="text-green-600">careful, wise, and thoughtful</strong> about decisions.
                  Using AI judiciously means thinking carefully about when, how, and why we use AI - 
                  not just using it because it's available.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-emerald-400">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mr-2" />
                  Think of it like this:
                </h4>
                <p className="text-gray-600">
                  Just because you can eat candy for every meal doesn't mean you should. 
                  Similarly, just because AI can do something doesn't always mean it's the best choice.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="text-6xl mb-6">⚖️</div>
                <h3 className="text-2xl font-bold mb-6">The Balance</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-xl font-semibold">
                    AI as a <span className="text-yellow-200">Tool</span>, <br />
                    Not a <span className="text-red-200">Replacement</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Should Help, Not Replace */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              AI Should Help, Not Replace Human Thinking
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Good Example */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border-2 border-green-200 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 rounded-full p-3 mr-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Good Example - AI as Helper</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-green-600 mb-3">Homework:</h4>
                <p className="text-gray-700 leading-relaxed">
                  You write your essay first, then use AI to check for grammar mistakes 
                  and suggest improvements. <strong className="text-green-600">You learn writing skills 
                  while AI catches small mistakes.</strong>
                </p>
              </div>
            </div>

            {/* Bad Example */}
            <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-3xl p-8 border-2 border-red-200 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-red-500 rounded-full p-3 mr-4">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Bad Example - AI as Replacement</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-red-600 mb-3">Homework:</h4>
                <p className="text-gray-700 leading-relaxed">
                  You ask AI to write your entire essay without thinking about the topic yourself. 
                  <strong className="text-red-600">You miss learning opportunities and don't 
                  develop your own abilities.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenarios */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Real-World Scenarios
            </h2>
            <div className="text-lg text-gray-600 mb-4">Currently Showing</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-500">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">Scenario: {scenarios[currentScenario].title}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-200 mr-2" />
                  <h4 className="text-xl font-bold">Judicious Use</h4>
                </div>
                <p className="text-green-100">{scenarios[currentScenario].judicious}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <XCircle className="w-6 h-6 text-red-200 mr-2" />
                  <h4 className="text-xl font-bold">Poor Use</h4>
                </div>
                <p className="text-red-100">{scenarios[currentScenario].poor}</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-yellow-200 mr-2" />
                <h4 className="text-xl font-bold">Result</h4>
              </div>
              <p className="text-lg">{scenarios[currentScenario].result}</p>
            </div>
          </div>
        </div>

        {/* Real Dangers */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600 mr-4" />
              Real Dangers of Over-Relying on AI
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Losing Important Skills",
                icon: <Brain className="w-8 h-8" />,
                examples: [
                  { type: "GPS Navigation", danger: "Always using GPS, even for familiar places", consequence: "Losing ability to read maps or remember directions" },
                  { type: "Calculator Dependency", danger: "Using calculator for simple math like 15 + 23", consequence: "Losing mental math abilities" }
                ],
                color: "from-red-100 to-orange-100",
                borderColor: "border-red-300"
              },
              {
                title: "Missing Learning Opportunities", 
                icon: <BookOpen className="w-8 h-8" />,
                story: "Sarah always used AI to write her essays. When she had to write a timed essay in class without AI, she struggled because she never learned to organize her thoughts or express ideas clearly on her own.",
                color: "from-orange-100 to-yellow-100",
                borderColor: "border-orange-300"
              },
              {
                title: "Losing Critical Thinking",
                icon: <Eye className="w-8 h-8" />,
                examples: [
                  { type: "Believing Everything AI Says", danger: "AI can make mistakes or give biased information", consequence: "Accepting wrong information without questioning" }
                ],
                color: "from-yellow-100 to-red-100", 
                borderColor: "border-yellow-300"
              }
            ].map((danger, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${danger.color} rounded-3xl p-8 border-2 ${danger.borderColor} transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-red-500 rounded-full p-3 mr-4 text-white">
                    {danger.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{danger.title}</h3>
                </div>
                
                {danger.examples && (
                  <div className="space-y-4">
                    {danger.examples.map((example, exIndex) => (
                      <div key={exIndex} className="bg-white rounded-xl p-4 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-2">{example.type}</h4>
                        <p className="text-sm text-gray-600 mb-2"><strong>Over-reliance:</strong> {example.danger}</p>
                        <p className="text-sm text-red-600"><strong>Consequence:</strong> {example.consequence}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {danger.story && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-2">Student Story:</h4>
                    <p className="text-sm text-gray-600 italic">{danger.story}</p>
                    <p className="text-sm text-green-600 font-semibold mt-2">Lesson: AI should enhance learning, not replace the learning process.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3-Step Judicious AI Method */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <Shield className="w-10 h-10 text-green-600 mr-4" />
              The 3-Step Judicious AI Method
            </h2>
          </div>
          
          {/* Featured Step (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${threeStepMethod[currentStep].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="bg-white/20 rounded-full p-4">
                    {threeStepMethod[currentStep].icon}
                  </div>
                  <div className="text-left">
                    <div className="text-4xl font-bold mb-2">Step {currentStep + 1}: {threeStepMethod[currentStep].step}</div>
                    <h3 className="text-2xl font-bold mb-4">{threeStepMethod[currentStep].title}</h3>
                    <div className="space-y-2">
                      {threeStepMethod[currentStep].questions.map((question, qIndex) => (
                        <div key={qIndex} className="bg-white/20 rounded-lg p-3">
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {threeStepMethod.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentStep === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`bg-gradient-to-r ${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Step {index + 1}: {step.step}</h3>
                <p className="text-lg text-gray-700 mb-4">{step.title}</p>
                <div className="space-y-2">
                  {step.questions.map((question, qIndex) => (
                    <p key={qIndex} className="text-sm text-gray-600">{question}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Guidelines */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Practical Guidelines for Students
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "For Learning",
                icon: <BookOpen className="w-8 h-8" />,
                guidelines: [
                  "Language learning: Practice conversations with AI chatbots to improve fluency",
                  "Research: Use AI to find relevant sources, then read and analyze them yourself", 
                  "Study help: Ask AI to explain difficult concepts in simpler terms",
                  "Practice: Use AI to create practice questions for test preparation"
                ],
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "For Creativity",
                icon: <Star className="w-8 h-8" />,
                guidelines: [
                  "Brainstorming: Get AI to suggest ideas, then develop your favorites",
                  "Feedback: Ask AI to review your work and suggest improvements",
                  "Learning new skills: Use AI tutorials to learn drawing, coding, or music"
                ],
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "For Productivity",
                icon: <Target className="w-8 h-8" />,
                guidelines: [
                  "Organization: Use AI to help create study schedules or organize tasks",
                  "Proofreading: Check your writing for errors after you've finished",
                  "Time management: Get AI suggestions for better daily routines"
                ],
                color: "from-teal-500 to-green-600"
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${section.color} rounded-full p-3 mr-4 text-white`}>
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <div className="space-y-3">
                  {section.guidelines.map((guideline, gIndex) => (
                    <div key={gIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{guideline}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What NOT to Do */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600 mr-4" />
              What NOT to Do
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Dishonesty",
                examples: [
                  "Having AI write assignments you should do yourself",
                  "Using AI to cheat on tests or exams",
                  "Copying AI answers without understanding or attribution"
                ],
                color: "from-red-100 to-pink-100",
                borderColor: "border-red-300"
              },
              {
                title: "Over-Dependency",
                examples: [
                  "Using AI for simple tasks you should know how to do",
                  "Relying on AI for all decision-making",
                  "Never trying to solve problems without AI first"
                ],
                color: "from-orange-100 to-red-100",
                borderColor: "border-orange-300"
              },
              {
                title: "Uncritical Acceptance",
                examples: [
                  "Believing everything AI tells you without verification",
                  "Not checking AI information against reliable sources",
                  "Sharing AI-generated content without fact-checking"
                ],
                color: "from-yellow-100 to-orange-100",
                borderColor: "border-yellow-300"
              }
            ].map((section, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${section.color} rounded-3xl p-8 border-2 ${section.borderColor} transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-red-500 rounded-full p-3 mr-4">
                    <XCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <div className="space-y-3">
                  {section.examples.map((example, eIndex) => (
                    <div key={eIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Life Examples */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Real-Life Examples of Judicious AI Use
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {realLifeExamples.map((example, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${example.color} rounded-3xl p-8 border-2 border-green-200 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{example.avatar}</div>
                  <h3 className="text-2xl font-bold text-gray-800">{example.name}</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {example.actions.map((action, aIndex) => (
                    <div key={aIndex} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm">{action}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-green-500 text-white rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 mr-2" />
                    <h4 className="text-lg font-bold">Result</h4>
                  </div>
                  <p className="text-sm">{example.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI's Impact on Society */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <Users className="w-10 h-10 text-green-600 mr-4" />
              AI's Impact on Society - Why Your Choices Matter
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Target className="w-6 h-6 text-green-600 mr-3" />
                  Individual Impact
                </h3>
                <p className="text-lg text-gray-700 mb-4">When you use AI responsibly:</p>
                <div className="space-y-3">
                  {[
                    "You develop stronger problem-solving skills",
                    "You maintain your ability to think independently", 
                    "You become better at evaluating information critically"
                  ].map((impact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-l-4 border-emerald-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="w-6 h-6 text-emerald-600 mr-3" />
                  Collective Impact
                </h3>
                <p className="text-lg text-gray-700 mb-4">When everyone uses AI judiciously:</p>
                <div className="space-y-3">
                  {[
                    "Society maintains human skills and knowledge",
                    "We prevent over-dependence on technology",
                    "We ensure AI remains a helpful tool, not a controlling force"
                  ].map((impact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Building an AI-Positive Future */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <Zap className="w-10 h-10 text-green-600 mr-4" />
              Building an AI-Positive Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Role as an AI-Informed Citizen
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Be a Critical Thinker",
                icon: <Eye className="w-8 h-8" />,
                points: [
                  "Question AI outputs and verify important information",
                  "Understand AI's limitations and biases",
                  "Think about the long-term consequences of AI decisions"
                ],
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Stay Human-Centered",
                icon: <Users className="w-8 h-8" />,
                points: [
                  "Remember that AI should serve humans, not the other way around",
                  "Maintain human connections and empathy",
                  "Value human creativity, intuition, and emotional intelligence"
                ],
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Keep Learning",
                icon: <BookOpen className="w-8 h-8" />,
                points: [
                  "Stay updated about AI developments",
                  "Learn how AI works to make better decisions about using it",
                  "Develop skills that complement AI rather than compete with it"
                ],
                color: "from-teal-500 to-green-600"
              }
            ].map((role, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className={`bg-gradient-to-r ${role.color} rounded-full p-4 inline-block mb-4 text-white`}>
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{role.title}</h3>
                </div>
                <div className="space-y-3">
                  {role.points.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Judicious AI Use Checklist */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 mr-4" />
              Judicious AI Use Checklist
            </h2>
            <p className="text-xl text-gray-600">Before using AI, ask yourself:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: "Learning",
                questions: [
                  "Am I using AI to learn or just to get an answer?",
                  "Will this help me develop new skills?",
                  "Am I being lazy or genuinely seeking assistance?"
                ],
                color: "from-green-100 to-emerald-100"
              },
              {
                category: "Understanding",
                questions: [
                  "Do I understand what the AI is doing?",
                  "Can I explain the AI's output to someone else?",
                  "Will I learn something valuable from this interaction?"
                ],
                color: "from-emerald-100 to-teal-100"
              },
              {
                category: "Independence",
                questions: [
                  "Can I do similar tasks without AI?",
                  "Am I maintaining my own thinking abilities?",
                  "Would I be helpless if AI wasn't available?"
                ],
                color: "from-teal-100 to-green-200"
              },
              {
                category: "Ethics",
                questions: [
                  "Is this use of AI honest and fair?",
                  "Am I giving proper credit where needed?",
                  "Would I be comfortable telling others how I used AI?"
                ],
                color: "from-green-200 to-emerald-200"
              }
            ].map((section, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${section.color} rounded-2xl p-6 border-2 border-green-200`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{section.category}</h3>
                </div>
                <div className="space-y-3">
                  {section.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <Star className="w-10 h-10 text-green-600 mr-4" />
              Key Takeaways for Judicious AI Use
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "AI is a powerful tool - Use it wisely to enhance your abilities, not replace them",
              "Think before you use - Always consider if AI is the right choice for the task",
              "Learn continuously - Use AI interactions as opportunities to grow and understand",
              "Stay critical - Question AI outputs and verify important information",
              "Maintain balance - Keep developing your own skills alongside AI assistance",
              "Be ethical - Use AI honestly and give credit where it's due",
              "Think long-term - Consider how your AI use habits will affect your future capabilities"
            ].map((takeaway, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 9) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 9) * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{takeaway}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Ultimate Goal */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl mb-6">🌟</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Ultimate Goal
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl leading-relaxed">
                The goal isn't to avoid AI or to use it for everything. The goal is to become 
                <strong className="text-yellow-200"> AI-literate citizens</strong> who can harness AI's power 
                while maintaining our human abilities, creativity, and critical thinking skills.
              </p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mt-8">
                <p className="text-lg font-semibold">
                  <strong className="text-yellow-200">Remember:</strong> The most successful people in an AI-powered future 
                  won't be those who can use AI the most, but those who can use AI the most 
                  <strong className="text-green-200"> thoughtfully and effectively</strong> while remaining 
                  <strong className="text-blue-200"> uniquely human</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Congratulations */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Congratulations!
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              You've completed your journey from AI beginner to AI-informed, responsible student! 
              You now understand how AI works, where it's used, what it can and cannot do, 
              how it might shape our future, and most importantly, how to use it wisely and responsibly.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                Remember, AI is a tool created by humans to help solve problems and make life better. 
                The most important thing is to use AI judiciously - thoughtfully, ethically, 
                and in ways that enhance rather than replace your own learning and growth.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 mt-8">
              <p className="text-xl font-bold">
                Keep exploring, keep questioning, stay curious, and maybe someday you'll be the one 
                creating the next amazing AI innovation that makes the world a better place! 🚀
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

export default Module7AIJudiciousUse;