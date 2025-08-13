import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, Target, CheckCircle, Rocket, Brain, Globe, Laptop, ArrowRight, Star, Eye, Zap, Building, Gamepad2 } from 'lucide-react';

const Module7 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [userIdea, setUserIdea] = useState({
    problem: '',
    customer: '',
    solution: '',
    marketFit: '',
    prototype: '',
    aiTools: ''
  });
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const entrepreneurSteps = [
    {
      step: 1,
      title: "Spot the Problem",
      description: "Look around you. Is there something people struggle with? Something annoying or missing?",
      example: "Students can't find healthy snacks at school. That's a real problem!",
      icon: <Eye className="w-8 h-8" />,
      questions: ["What frustrates you daily?", "What do your friends complain about?", "What's missing in your school/community?"],
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 2,
      title: "Understand Customer Needs",
      description: "Before jumping to solutions, ask: Who has this problem? What do they really want?",
      example: "Interview your friends or family. Ask questions. Listen carefully. That's how real entrepreneurs start!",
      icon: <Users className="w-8 h-8" />,
      questions: ["Who exactly has this problem?", "How does it affect their daily life?", "What would make their life easier?"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      step: 3,
      title: "Come Up with Ideas",
      description: "Brainstorm creative solutions. Use tools like ChatGPT to help generate new ideas.",
      example: "Use mind maps or sticky notes. No idea is too silly—just write everything down!",
      icon: <Lightbulb className="w-8 h-8" />,
      questions: ["What are 5 different ways to solve this?", "How can technology help?", "What would the ideal solution look like?"],
      color: "from-teal-500 to-green-600"
    },
    {
      step: 4,
      title: "Identify Product-Market Fit",
      description: "Do people actually want what you're offering? How is your idea better than existing solutions?",
      example: "Even the coolest idea doesn't work if nobody needs it. That's why this step is super important!",
      icon: <Target className="w-8 h-8" />,
      questions: ["Will people actually use this?", "How is it better than alternatives?", "Are people willing to pay for it?"],
      color: "from-green-600 to-emerald-600"
    },
    {
      step: 5,
      title: "Create a Simple Prototype",
      description: "You don't need to build the product yet. Just sketch it, describe it, or make a basic version.",
      example: "Draw what your app might look like or write how your service will work.",
      icon: <Building className="w-8 h-8" />,
      questions: ["What's the simplest version that solves the problem?", "How can you test this quickly?", "What features are absolutely essential?"],
      color: "from-emerald-600 to-teal-600"
    },
    {
      step: 6,
      title: "Use AI to Build Smarter",
      description: "Leverage AI tools to enhance your solution and make it more efficient.",
      example: "AI can help with design, customer service, data analysis, and much more!",
      icon: <Brain className="w-8 h-8" />,
      questions: ["Which AI tools can help your business?", "How can AI make your solution better?", "What tasks can AI automate for you?"],
      color: "from-teal-600 to-green-500"
    }
  ];

  const futureSkills = [
    {
      skill: "Digital Literacy",
      description: "Know how to use tech tools smartly",
      icon: <Laptop className="w-6 h-6" />,
      importance: "Essential for using AI tools, understanding digital platforms, and staying current with technology",
      examples: ["Understanding how AI works", "Using no-code platforms", "Digital marketing skills"],
      color: "from-green-100 to-emerald-100"
    },
    {
      skill: "Critical Thinking",
      description: "Think clearly, solve problems creatively",
      icon: <Brain className="w-6 h-6" />,
      importance: "Helps you identify real problems, evaluate solutions, and make smart business decisions",
      examples: ["Analyzing market data", "Identifying biases", "Problem-solving strategies"],
      color: "from-emerald-100 to-teal-100"
    },
    {
      skill: "Collaboration",
      description: "Work in teams, share ideas, build together",
      icon: <Users className="w-6 h-6" />,
      importance: "Modern businesses are built by teams. You'll need to work with others to succeed",
      examples: ["Team communication", "Conflict resolution", "Shared decision-making"],
      color: "from-teal-100 to-green-100"
    },
    {
      skill: "Ethical Awareness",
      description: "Use AI responsibly, think about fairness and privacy",
      icon: <CheckCircle className="w-6 h-6" />,
      importance: "As AI becomes more powerful, using it ethically becomes more important for business success",
      examples: ["Fair AI practices", "Data privacy", "Transparent communication"],
      color: "from-green-100 to-emerald-100"
    }
  ];

  const futureOpportunities = [
    {
      title: "AI Startups Everywhere",
      description: "Young people are starting businesses using AI to solve real problems",
      examples: ["Health monitoring apps", "Educational games", "Environmental solutions"],
      icon: "🚀"
    },
    {
      title: "Work From Anywhere",
      description: "You don't need a big office—just a great idea and the right tools",
      examples: ["Remote collaboration", "Global markets", "Digital-first businesses"],
      icon: "🌍"
    },
    {
      title: "Learning Through Play",
      description: "Schools are using AI-powered learning tools that feel like games",
      examples: ["Gamified education", "Personalized learning", "Interactive simulations"],
      icon: "🎮"
    }
  ];

  const handleInputChange = (field, value) => {
    setUserIdea(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
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
                <Rocket className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Turning Ideas into Reality
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Build your business idea step by step with the help of AI technology! 🤖💡
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-5xl mb-6">👩‍🏫</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Let's Bring Everything Together!
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium">
              Now that you know how to think like an entrepreneur and use AI tools, 
              let's build your business idea—step by step—with the help of technology!
            </p>
          </div>
        </div>

        {/* Step-by-Step Entrepreneur Journey */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Step-by-Step Entrepreneur Journey 🚶‍♂️
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow this proven path from problem to solution:
            </p>
          </div>
          
          {/* Featured Step (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${entrepreneurSteps[currentStep].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="bg-white/20 rounded-full p-4">
                    {entrepreneurSteps[currentStep].icon}
                  </div>
                  <div className="text-left">
                    <div className="text-4xl font-bold mb-2">Step {entrepreneurSteps[currentStep].step}</div>
                    <h3 className="text-3xl font-bold mb-2">{entrepreneurSteps[currentStep].title}</h3>
                    <p className="text-xl opacity-90">{entrepreneurSteps[currentStep].description}</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-6 mb-4">
                  <p className="text-lg">{entrepreneurSteps[currentStep].example}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {entrepreneurSteps[currentStep].questions.map((question, index) => (
                    <div key={index} className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm font-medium">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Steps Grid with Progress Tracking */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entrepreneurSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentStep === index ? 'border-green-400 ring-4 ring-green-300 scale-105' : 'border-green-200'
                } ${
                  completedSteps.includes(index) ? 'bg-green-100 border-green-400' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                <div className="text-center mb-4">
                  <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${
                    completedSteps.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  }`}>
                    {completedSteps.includes(index) ? <CheckCircle className="w-8 h-8" /> : step.icon}
                  </div>
                  <div className="text-sm text-green-600 font-bold mb-1">STEP {step.step}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStepCompletion(index);
                    }}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      completedSteps.includes(index)
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-green-600 border border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {completedSteps.includes(index) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full px-6 py-3">
                  <span className="text-2xl font-bold text-green-600">
                    {completedSteps.length}/{entrepreneurSteps.length}
                  </span>
                  <span className="text-green-600 ml-2">Steps Completed</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(completedSteps.length / entrepreneurSteps.length) * 100}%` }}
                ></div>
              </div>
              {completedSteps.length === entrepreneurSteps.length && (
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-green-800 font-bold">🎉 Congratulations! You've completed all the entrepreneur steps!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Idea Builder */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Build Your Idea! ✏️
            </h2>
            <p className="text-xl text-gray-600">
              Use this space to develop your own business idea step by step:
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { key: 'problem', title: 'What Problem Did You Spot?', placeholder: 'e.g., Students can\'t find healthy snacks at school...' },
                { key: 'customer', title: 'Who Are Your Customers?', placeholder: 'e.g., High school students who want healthy options...' },
                { key: 'solution', title: 'What\'s Your Solution?', placeholder: 'e.g., A healthy snack subscription service for schools...' },
                { key: 'marketFit', title: 'Why Will People Want This?', placeholder: 'e.g., It\'s convenient, healthy, and affordable...' },
                { key: 'prototype', title: 'How Will You Test It?', placeholder: 'e.g., Start with a survey, then a small pilot program...' },
                { key: 'aiTools', title: 'How Can AI Help?', placeholder: 'e.g., AI can predict popular snacks, manage inventory...' }
              ].map((field, index) => (
                <div key={field.key} className="space-y-3">
                  <label className="block text-lg font-bold text-gray-800">
                    {field.title}
                  </label>
                  <textarea
                    value={userIdea[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none transition-colors duration-300 min-h-[120px] resize-none"
                  />
                </div>
              ))}
            </div>
            
            {Object.values(userIdea).some(value => value.trim() !== '') && (
              <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                <h4 className="text-lg font-bold text-green-800 mb-3">Great work! You're thinking like an entrepreneur! 🎉</h4>
                <p className="text-green-700">Keep developing your idea and don't be afraid to iterate and improve based on feedback.</p>
              </div>
            )}
          </div>
        </div>

        {/* The Future of Entrepreneurship with AI */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              The Future of Entrepreneurship with AI 🌍🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              The world is changing fast—and YOU are going to be part of shaping it. 
              With AI and entrepreneurial thinking, you can solve real problems and help people in new ways.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {futureOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 text-center transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
              >
                <div className="text-6xl mb-6">{opportunity.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{opportunity.title}</h3>
                <p className="text-gray-600 mb-6">{opportunity.description}</p>
                <div className="space-y-3">
                  {opportunity.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="bg-white rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Must-Have Skills for Young Entrepreneurs */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Must-Have Skills for Young Entrepreneurs 🧠
            </h2>
            <p className="text-xl text-gray-600">
              These skills will help you succeed in the AI-powered future:
            </p>
          </div>

          {/* Featured Skill (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Featured Skill</div>
              <div className={`bg-gradient-to-r ${futureSkills[currentSkill].color} rounded-2xl p-8 max-w-4xl mx-auto border-2 border-green-200`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    {futureSkills[currentSkill].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{futureSkills[currentSkill].skill}</h3>
                    <p className="text-xl text-gray-600">{futureSkills[currentSkill].description}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 mb-4">
                  <p className="text-gray-700">{futureSkills[currentSkill].importance}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {futureSkills[currentSkill].examples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-700 font-medium">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureSkills.map((skill, index) => (
              <div
                key={index}
                className={`${skill.color} rounded-2xl p-6 border-2 border-green-200 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentSkill === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 9) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 9) * 150}ms` }}
                onClick={() => setCurrentSkill(index)}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{skill.skill}</h3>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Change the World?
            </h2>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
              You now have all the tools and knowledge to start your entrepreneurial journey. 
              The future belongs to young innovators like you who can combine creativity, 
              technology, and ethical thinking to solve real problems.
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Your Next Steps:</h3>
              <div className="space-y-3 text-left">
                {[
                  "Identify a problem you're passionate about solving",
                  "Talk to potential customers to understand their needs",
                  "Start small with a simple prototype or pilot",
                  "Use AI tools to enhance your solution",
                  "Stay ethical and think about your impact on society"
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-green-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-green-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>
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
              Every great business started with someone who saw a problem and decided to solve it. 
              With AI as your partner and ethical thinking as your guide, there's no limit to what you can achieve!
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-3xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Your Ideas</strong> + 
                <strong className="text-emerald-600"> AI Tools</strong> + 
                <strong className="text-teal-600"> Ethical Thinking</strong> = 
                <strong className="text-green-700"> Future Success! 🌟</strong>
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

export default Module7;