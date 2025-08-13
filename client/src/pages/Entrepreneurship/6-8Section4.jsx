import React, { useState, useEffect } from 'react';
import { Bot, Brain, TrendingUp, MessageSquare, Palette, BarChart3, Shield, Globe, Zap, Lightbulb, Rocket, Users, Eye, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const Module4 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentExample, setCurrentExample] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const aiApplications = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Idea Generation",
      description: "AI tools can suggest new business ideas by analyzing trends and data",
      example: "AI analyzes market gaps and suggests profitable business opportunities",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Market Research",
      description: "AI can quickly analyze large amounts of data to identify market opportunities",
      example: "Processing thousands of customer reviews to find product improvement areas",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Customer Service",
      description: "Chatbots and virtual assistants provide 24/7 support",
      example: "AI chatbots handle 80% of customer queries automatically",
      color: "from-green-600 to-emerald-700"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Product Development",
      description: "AI helps design and test products faster and more efficiently",
      example: "AI simulations reduce product testing time from months to days",
      color: "from-teal-500 to-green-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Marketing",
      description: "AI personalizes marketing messages and targets the right audience",
      example: "AI increases marketing ROI by 30% through better targeting",
      color: "from-emerald-600 to-green-700"
    }
  ];

  const realLifeExamples = [
    {
      icon: <Palette className="w-12 h-12" />,
      title: "AI-powered Logo Makers",
      description: "Create professional logos in seconds",
      detail: "Tools like Looka and Brandmark use AI to generate thousands of logo options based on your preferences",
      emoji: "🖼️"
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Customer Support Chatbots",
      description: "Answer customer queries instantly",
      detail: "Companies save 30% on customer service costs while providing 24/7 support",
      emoji: "💬"
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Recommendation Engines",
      description: "Suggest products based on preferences",
      detail: "Netflix and Amazon use AI to recommend content, increasing engagement by 40%",
      emoji: "🛒"
    }
  ];

  const aiTools = [
    { name: "No-code App Builders", icon: "🛠️", description: "Build apps without coding knowledge" },
    { name: "AI Writing Assistants", icon: "✍️", description: "Create content and copy automatically" },
    { name: "Data Analysis Platforms", icon: "📊", description: "Understand your business metrics easily" }
  ];

  const challenges = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ethical Concerns",
      description: "Ensuring AI is fair and unbiased",
      detail: "AI systems must be designed to avoid discrimination and promote fairness",
      emoji: "⚖️"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Privacy",
      description: "Protecting user information",
      detail: "Entrepreneurs must ensure customer data is secure and used responsibly",
      emoji: "🔒"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessibility",
      description: "Making AI tools available to all",
      detail: "Ensuring AI benefits reach entrepreneurs regardless of their background or resources",
      emoji: "🌐"
    }
  ];

  return (
    <div
      id="4"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["4"] = el;
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
                <Bot className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              The Role of AI in Entrepreneurship
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover how Artificial Intelligence is revolutionizing the way entrepreneurs build and grow their businesses
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What is AI Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is Artificial Intelligence?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong className="text-green-600">AI</strong> refers to computer systems that can perform tasks that usually require human intelligence, such as learning, reasoning, and problem-solving.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-800">Think of AI as:</h3>
                </div>
                <p className="text-gray-600">
                  A <strong className="text-green-600">super-smart assistant</strong> that can analyze data, make predictions, and automate tasks faster than humans ever could.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">AI Capabilities</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <p className="text-gray-700 font-medium">Learning from data</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-gray-700 font-medium">Making smart decisions</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-teal-400">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      <p className="text-gray-700 font-medium">Solving complex problems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How AI is Transforming Entrepreneurship */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How AI is Transforming Entrepreneurship
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI is revolutionizing every aspect of business, from idea generation to customer service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiApplications.map((app, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-r ${app.color} rounded-full p-3 w-fit mb-4`}>
                  <div className="text-white">
                    {app.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{app.title}</h3>
                <p className="text-gray-600 mb-4">{app.description}</p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border-l-3 border-green-400">
                  <p className="text-sm text-gray-700 font-medium">{app.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Life Examples - Auto-rotating */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Real-Life Examples
            </h2>
            <p className="text-lg text-gray-600">
              See how AI is being used by entrepreneurs today
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Featured Example</div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <div className="text-4xl">{realLifeExamples[currentExample].emoji}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">{realLifeExamples[currentExample].title}</h3>
                    <p className="text-lg opacity-90">{realLifeExamples[currentExample].description}</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm font-medium">{realLifeExamples[currentExample].detail}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {realLifeExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExample(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentExample === index ? 'bg-green-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AI Tools for Young Entrepreneurs */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🛠️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              AI Tools for Young Entrepreneurs
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Powerful tools that don't require technical expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges and Considerations */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Challenges and Considerations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              While AI offers incredible opportunities, entrepreneurs must also consider these important factors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{challenge.emoji}</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 w-fit mx-auto mb-4">
                    <div className="text-white">
                      {challenge.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{challenge.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{challenge.description}</p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-3 border-green-400">
                  <p className="text-sm text-gray-700">{challenge.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Think About It!
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Which AI application interests you the most for your future business?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "AI-powered market research to understand customers",
              "Chatbots for 24/7 customer support",
              "AI tools for creating marketing content",
              "AI analytics to track business performance"
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => setActiveChallenge(index)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  activeChallenge === index 
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {activeChallenge === index ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                  <span className="font-medium text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          {activeChallenge !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-400 max-w-2xl mx-auto animate-fade-in">
              <div className="flex items-center space-x-3 mb-3">
                <Lightbulb className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-800">Great Choice!</h3>
              </div>
              <p className="text-gray-700">
                That's an excellent area to explore! AI in that field can help you save time, reduce costs, and provide better service to your customers.
              </p>
            </div>
          )}
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              The Future is AI-Powered
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              AI is not just a tool—it's becoming an essential partner for entrepreneurs who want to build successful, scalable businesses.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Start learning</strong> about AI tools now, so you can <strong className="text-emerald-600">lead tomorrow's</strong> business revolution! 🌟
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

export default Module4;