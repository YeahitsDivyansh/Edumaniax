import React, { useState, useEffect } from 'react';
import { 
  School, 
  Lightbulb, 
  Search, 
  Users, 
  Brain, 
  Wrench, 
  Mic, 
  MessageSquare, 
  CheckCircle, 
  Target, 
  ArrowRight,
  Eye,
  Recycle,
  Book,
  Heart,
  TrendingUp
} from 'lucide-react';

const Module3 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [userIdeas, setUserIdeas] = useState({
    problems: ['', '', ''],
    interviews: ['', '', ''],
    solutions: ['', '', ''],
    plan: {
      what: '',
      who: '',
      how: '',
      works: ''
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 7);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const entrepreneurshipSteps = [
    {
      id: 1,
      title: "Spot a Problem in Your School",
      icon: <Search className="w-8 h-8" />,
      description: "Start by observing things around you",
      color: "from-green-500 to-emerald-500",
      activity: "Make a list of 3 everyday problems you notice in school",
      questions: [
        "Is there something students struggle with?",
        "Is something missing in your school experience?",
        "Can something be improved?"
      ]
    },
    {
      id: 2,
      title: "Understand the Needs of Others",
      icon: <Brain className="w-8 h-8" />,
      description: "Entrepreneurs care about helping people",
      color: "from-emerald-500 to-teal-500",
      activity: "Interview 2-3 people in school and write down what they said",
      questions: [
        "What do they find hard?",
        "What would make their school day better?",
        "What do they wish they had?"
      ]
    },
    {
      id: 3,
      title: "Brainstorm Ideas to Solve the Problem",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "This is your time to think creatively!",
      color: "from-teal-500 to-green-600",
      activity: "Pick one school problem and come up with at least 3 different ideas to solve it",
      techniques: ["Mind maps", "Group brainstorming", "What if thinking"]
    },
    {
      id: 4,
      title: "Test for Product-Market Fit",
      icon: <Target className="w-8 h-8" />,
      description: "Find the sweet spot between your product and what people want",
      color: "from-green-600 to-emerald-600",
      activity: "Test if your idea matches what people really need",
      steps: [
        { step: "Ask Around", action: "Talk to classmates: 'Would you use this?'", tells: "Checks if your idea is interesting to others" },
        { step: "Show a Sample", action: "Share a drawing, model, or demo", tells: "See if they get excited or bored" },
        { step: "Collect Feedback", action: "Ask what they like, what's missing", tells: "Helps you improve your idea" },
        { step: "Compare Options", action: "Do you prefer my idea or another one?", tells: "Find out if your solution is truly better" },
        { step: "Check Repeat Interest", action: "Do people keep asking about it?", tells: "Shows if they really want it—not just being nice!" }
      ]
    },
    {
      id: 5,
      title: "Make a Simple Prototype or Plan",
      icon: <Wrench className="w-8 h-8" />,
      description: "You don't need to build the real thing yet",
      color: "from-emerald-600 to-teal-600",
      activity: "Create a one-page plan of your idea",
      methods: ["Draw your idea", "Create a mini-poster or model", "Make a written plan or presentation"]
    },
    {
      id: 6,
      title: "Share Your Idea (Pitch It!)",
      icon: <Mic className="w-8 h-8" />,
      description: "Entrepreneurs explain their ideas clearly and confidently",
      color: "from-teal-600 to-green-700",
      activity: "Prepare a 1-minute pitch about your idea and present it to your class or teacher",
      tips: ["Make a short presentation or speech", "Show your prototype or drawing", "Be ready to answer questions"]
    },
    {
      id: 7,
      title: "Get Feedback and Reflect",
      icon: <MessageSquare className="w-8 h-8" />,
      description: "Every great idea gets better with feedback",
      color: "from-green-700 to-emerald-700",
      activity: "Write down 2 things you learned from the feedback and 1 improvement you'll make",
      questions: ["What did people like?", "What can I improve?", "What should I change?"]
    }
  ];

  const schoolProjects = [
    {
      idea: "Eco-Bottle Drive",
      problem: "Too many plastic bottles in school",
      outcome: "Started a bottle recycling system",
      icon: <Recycle className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      impact: "Environmental"
    },
    {
      idea: "Quiet Club",
      problem: "No quiet place to read or relax",
      outcome: "Created a 'Calm Corner' in the library",
      icon: <Book className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      impact: "Wellness"
    },
    {
      idea: "Healthy Tuck Shop",
      problem: "Junk food in canteen",
      outcome: "Ran a pop-up healthy snacks stall during lunch",
      icon: <Heart className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      impact: "Health"
    }
  ];

  const productMarketFit = {
    definition: "Product-Market Fit is when your product perfectly matches what people want and need",
    analogy: "Imagine you baked 100 cupcakes, but nobody liked them. That means your product (the cupcakes) didn't match what people wanted. But if everyone asks for more—bingo! You've found the sweet spot.",
    breakdown: {
      product: "What you're offering (like a snack, app, or service)",
      market: "The people who might use or buy it (your customers)",
      fit: "A perfect match! Your product solves a real need or problem, and people actually want it."
    }
  };

  const handleInputChange = (category, index, value) => {
    if (category === 'plan') {
      setUserIdeas(prev => ({
        ...prev,
        plan: {
          ...prev.plan,
          [index]: value
        }
      }));
    } else {
      setUserIdeas(prev => ({
        ...prev,
        [category]: prev[category].map((item, i) => i === index ? value : item)
      }));
    }
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
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <School className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Learning Entrepreneurship Through School Activities
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
                "What if we told you that you don't need a fancy office or a million dollars to be an entrepreneur? 
                You can actually start learning and practicing entrepreneurship—right at school!"
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Is Entrepreneurship Reminder */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 mr-4">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              But wait... What Is Entrepreneurship Again?
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <p className="text-2xl md:text-3xl text-gray-800 font-bold mb-6">
              Entrepreneurship means <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">finding a problem and solving it in a smart, creative way</span>
            </p>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6">
              <p className="text-lg text-gray-700">
                And guess what? That skill can be used in your school life too!
              </p>
            </div>
          </div>
        </div>

        {/* Entrepreneurial Journey Steps */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How Can You Learn Entrepreneurship in School?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's a breakdown of how each step in the entrepreneurial journey can turn into an exciting school-based activity:
            </p>
          </div>

          {/* Featured Step (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting Step {currentStep + 1}</div>
              <div className={`bg-gradient-to-r ${entrepreneurshipSteps[currentStep].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    {entrepreneurshipSteps[currentStep].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{entrepreneurshipSteps[currentStep].title}</h3>
                    <p className="text-lg opacity-90">{entrepreneurshipSteps[currentStep].description}</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-3">📝 Activity:</h4>
                  <p className="text-base">{entrepreneurshipSteps[currentStep].activity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* All Steps Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {entrepreneurshipSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentStep === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`bg-gradient-to-r ${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product-Market Fit Explanation */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              What is Product-Market Fit?
            </h2>
          </div>

          {/* Cupcake Analogy */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">🧁</div>
                  <h3 className="text-2xl font-bold text-gray-800">The Cupcake Story</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {productMarketFit.analogy}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Breaking It Down for Students:</h3>
                {Object.entries(productMarketFit.breakdown).map(([key, value], index) => (
                  <div key={key} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-400">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {key.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 capitalize">{key}</h4>
                    </div>
                    <p className="text-gray-600">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product-Market Fit Testing Steps */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              How Can You Test for Product-Market Fit in School Activities?
            </h3>
            
            <div className="space-y-4">
              {entrepreneurshipSteps[3].steps.map((step, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400">
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="text-center md:text-left">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto md:mx-0 mb-2 font-bold">
                        {index + 1}
                      </div>
                      <h4 className="font-bold text-gray-800">{step.step}</h4>
                    </div>
                    <div>
                      <p className="text-gray-700">{step.action}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-600">{step.tells}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Activity Sections */}
        <div className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            Try It Yourself! 💡
          </h2>

          {/* Problem Spotting Activity */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Step 1: Spot Problems in Your School</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700 mb-6">List 3 everyday problems you notice in school:</p>
              {userIdeas.problems.map((problem, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problem {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={problem}
                    onChange={(e) => handleInputChange('problems', index, e.target.value)}
                    placeholder={`e.g., ${index === 0 ? 'The school canteen line is too long' : index === 1 ? "There's no quiet space for reading" : 'Students struggle with heavy backpacks'}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interview Activity */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 border-l-4 border-emerald-400">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Step 2: Interview People</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700 mb-6">What did you learn from interviewing 2-3 people?</p>
              {userIdeas.interviews.map((interview, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview {index + 1}:
                  </label>
                  <textarea
                    value={interview}
                    onChange={(e) => handleInputChange('interviews', index, e.target.value)}
                    placeholder={`e.g., ${index === 0 ? 'Students find it hard to carry heavy books all day' : index === 1 ? 'Teachers wish there was a better way to organize school events' : 'Parents want healthier food options in the canteen'}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Solution Brainstorming */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl p-8 md:p-12 border-l-4 border-teal-400">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-full p-3">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Step 3: Brainstorm Solutions</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700 mb-6">Come up with 3 different ideas to solve one problem:</p>
              {userIdeas.solutions.map((solution, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solution Idea {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => handleInputChange('solutions', index, e.target.value)}
                    placeholder={`e.g., ${index === 0 ? 'Create a mobile app for pre-ordering food' : index === 1 ? 'Set up express counters for quick items' : 'Organize staggered lunch times'}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Plan Creation */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Step 5: Create Your One-Page Plan</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: 'what', label: 'What it is', placeholder: 'Describe your idea in simple terms...' },
                { key: 'who', label: 'Who it\'s for', placeholder: 'Who will use or benefit from this?' },
                { key: 'how', label: 'How it helps', placeholder: 'What problem does it solve?' },
                { key: 'works', label: 'How it works', placeholder: 'Explain the basic process...' }
              ].map((field) => (
                <div key={field.key} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    {field.label}:
                  </label>
                  <textarea
                    value={userIdeas.plan[field.key]}
                    onChange={(e) => handleInputChange('plan', field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* School-Based Project Examples */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              School-Based Entrepreneurship Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some cool ways students like you have used entrepreneurship in school:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {schoolProjects.map((project, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${project.color} text-white rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  selectedProject === index ? 'ring-4 ring-green-300' : ''
                } ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 200}ms` }}
                onClick={() => setSelectedProject(index)}
              >
                <div className="text-center mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.idea}</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                    <span className="text-sm font-medium">{project.impact}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-bold mb-2">Problem Solved:</h4>
                    <p className="text-sm opacity-90">{project.problem}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-bold mb-2">Outcome:</h4>
                    <p className="text-sm opacity-90">{project.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 font-medium mb-6">
                You don't need a fancy office or millions of dollars to be an entrepreneur. 
                The skills you learn through school activities will prepare you for real-world entrepreneurship!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Observe", "Listen", "Create", "Test", "Improve"].map((skill, index) => (
                  <div key={skill} className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg px-4 py-2">
                    <span className="text-green-600 font-bold">{skill}</span>
                  </div>
                ))}
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