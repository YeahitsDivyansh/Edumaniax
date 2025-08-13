import React, { useState, useEffect } from 'react';
import { Bot, Lightbulb, Users, Cog, Brain, Smartphone, Mic, Trophy, ChevronRight, CheckCircle, Target, Zap, Star, Award } from 'lucide-react';

const BuildAi = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [aiBlueprint, setAiBlueprint] = useState({
    botName: '',
    problem: '',
    targetUsers: '',
    mainFunction: '',
    howItWorks: '',
    dataSource: '',
    smartFeatures: '',
    interaction: '',
    personality: '',
    specialFeatures: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      id: 'problem',
      title: 'Identify the Problem',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'design',
      title: 'Design Your AI Solution',
      icon: <Bot className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'visualize',
      title: 'Draw Your AI',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 'test',
      title: 'Test Your Idea',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const problemAreas = [
    { category: 'At Home', icon: '🏠', problems: ['Messy room', 'Forgetting homework', 'Pet care'] },
    { category: 'At School', icon: '🏫', problems: ['Difficulty with subjects', 'Finding books in library', 'Managing assignments'] },
    { category: 'In Community', icon: '🌍', problems: ['Traffic jams', 'Finding lost pets', 'Helping elderly people'] }
  ];

  const aiFeatures = [
    { name: 'Voice Recognition', icon: <Mic className="w-5 h-5" />, description: 'Understands speech' },
    { name: 'Image Detection', icon: '👁️', description: 'Recognizes pictures' },
    { name: 'Smart Learning', icon: <Brain className="w-5 h-5" />, description: 'Gets better over time' },
    { name: 'Natural Language', icon: '💬', description: 'Talks like humans' },
    { name: 'Pattern Recognition', icon: '🔍', description: 'Finds hidden patterns' },
    { name: 'Predictive Analysis', icon: '📊', description: 'Predicts future trends' }
  ];

  const handleInputChange = (field, value) => {
    setAiBlueprint(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const markStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const testQuestions = [
    "Would people actually use this?",
    "Is it better than existing solutions?",
    "Could it be built with today's technology?",
    "What could go wrong, and how would you fix it?"
  ];

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
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Bot className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Let's Build an AI! 🤖
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Your Turn - Detailed AI Creator Workshop: Think like a real AI engineer!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Introduction */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💡</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Think Like a Real AI Engineer!
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Before building your AI, let's understand what problem it will solve and how it will help people.
            </p>
          </div>
        </div>

        

        {/* Step 1: Identify the Problem */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Step 1: Identify the Problem
            </h2>
          </div>
          
          <p className="text-xl text-gray-700 mb-8">
            What problem do you see around you that AI could help solve?
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {problemAreas.map((area, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{area.category}</h3>
                </div>
                <div className="space-y-3">
                  {area.problems.map((problem, problemIndex) => (
                    <div
                      key={problemIndex}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border-l-4 border-green-400 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-gray-700 font-medium">{problem}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          
        </div>

        {/* Step 2: AI Blueprint */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Step 2: Design Your AI Solution
            </h2>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border-l-4 border-emerald-400">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI BLUEPRINT</h3>
              <p className="text-gray-600">Fill in your AI design details below</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { key: 'botName', label: 'Bot Name', placeholder: 'Make it catchy and related to what it does', icon: <Bot className="w-5 h-5" /> },
                { key: 'problem', label: 'Problem it solves', placeholder: 'What specific problem does your AI fix?', icon: <Target className="w-5 h-5" /> },
                { key: 'targetUsers', label: 'Target users', placeholder: 'Who will use your AI? Kids, adults, teachers, etc.', icon: <Users className="w-5 h-5" /> },
                { key: 'mainFunction', label: 'What does it do?', placeholder: 'Describe its main function in simple terms', icon: <Cog className="w-5 h-5" /> },
                { key: 'howItWorks', label: 'How does it work?', placeholder: 'What steps does it follow to solve the problem?', icon: <Zap className="w-5 h-5" /> },
                { key: 'dataSource', label: 'What data does it learn from?', placeholder: 'What information does it need to get better?', icon: <Brain className="w-5 h-5" /> },
                { key: 'interaction', label: 'How do people interact with it?', placeholder: 'Voice commands, touch screen, mobile app, etc.', icon: <Smartphone className="w-5 h-5" /> },
                { key: 'personality', label: 'What will it say/sound like?', placeholder: 'Friendly, professional, funny, etc.', icon: <Mic className="w-5 h-5" /> }
              ].map((field, index) => (
                <div
                  key={field.key}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                    visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg p-2">
                      {field.icon}
                    </div>
                    <label className="text-lg font-semibold text-gray-800">{field.label}</label>
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Smart Features Selection */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">What makes it smart?</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {aiFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg p-2">
                        {typeof feature.icon === 'string' ? (
                          <span className="text-lg">{feature.icon}</span>
                        ) : (
                          feature.icon
                        )}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">{feature.name}</h5>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
          </div>
        </div>

        {/* Step 3: Draw Your AI */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-full p-3">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Step 3: Draw Your AI
            </h2>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl p-8 border-l-4 border-teal-400">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Create a visual representation:</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Physical Appearance', question: 'What does it look like?', icon: '🎨', color: 'from-teal-100 to-green-100' },
                { title: 'Interface Design', question: 'How do people see and use it?', icon: '📱', color: 'from-green-100 to-emerald-100' },
                { title: 'Environment', question: 'Where does it work?', icon: '🌍', color: 'from-emerald-100 to-teal-100' }
              ].map((aspect, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${aspect.color} rounded-2xl p-6 border-2 border-teal-200 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{aspect.icon}</div>
                    <h4 className="text-lg font-bold text-gray-800">{aspect.title}</h4>
                    <p className="text-gray-600 mb-4">{aspect.question}</p>
                  </div>
                  
                </div>
              ))}
            </div>

            
          </div>
        </div>

        {/* Step 4: Test Your Idea */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Step 4: Test Your Idea
            </h2>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-l-4 border-green-400">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Ask yourself these important questions:</h3>
            
            <div className="space-y-6">
              {testQuestions.map((question, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${
                    visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{question}</h4>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>

        {/* Example AI Blueprint */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-3xl font-bold text-gray-800">Example AI Blueprint</h2>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bot className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Bot Name:</span>
                  </div>
                  <p className="text-gray-700">HomeworkBuddy</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Problem:</span>
                  </div>
                  <p className="text-gray-700">Students forgetting assignments and struggling with time management</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Target Users:</span>
                  </div>
                  <p className="text-gray-700">Middle school students (grades 6-8)</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Cog className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Function:</span>
                  </div>
                  <p className="text-gray-700">Reminds students about homework, breaks big assignments into smaller tasks, provides study tips</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Brain className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Smart Features:</span>
                  </div>
                  <p className="text-gray-700">Learns each student's learning style and adjusts difficulty of explanations</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Interaction:</span>
                  </div>
                  <p className="text-gray-700">Mobile app with voice commands and text messages</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mic className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Personality:</span>
                  </div>
                  <p className="text-gray-700">Encouraging and supportive, like a helpful older sibling</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Special Features:</span>
                  </div>
                  <p className="text-gray-700">Rewards system with points for completing tasks, study group matching with classmates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-l-4 border-green-400">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-6">
                <Award className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              🏅 Badge Earned: 🎨 AI Innovation Designer
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Congratulations! You've completed the AI Creator Workshop and designed your own AI solution!
            </p>
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

export default BuildAi;