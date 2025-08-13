import React, { useState, useEffect } from 'react';
import { Scale, Shield, Users, AlertTriangle, BookOpen, Lightbulb, FileText, Eye, Target, CheckCircle } from 'lucide-react';

const Module1 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [journalEntries, setJournalEntries] = useState({
    home: '',
    school: '',
    public: '',
    reflection: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scenarios = [
    {
      title: "Traffic Without Laws",
      description: "Cars driving on any side of the road",
      emoji: "🚗💥",
      color: "from-red-500 to-red-600"
    },
    {
      title: "No Property Protection", 
      description: "Anyone could take anything from anyone",
      emoji: "🏠❌",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Disputes Everywhere",
      description: "No fair way to resolve conflicts",
      emoji: "⚖️❓",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const handleJournalChange = (field, value) => {
    setJournalEntries(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div
      id="1"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["1"] = el;
        }
      }}
      className="mb-10"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700  text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Scale className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Understanding Law
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              The Invisible Rulebook That Guides Our Society
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
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Scale className="w-6 h-6" />, text: "What laws are and how they work", color: "bg-green-100 text-green-600" },
              { icon: <Shield className="w-6 h-6" />, text: "Why we need laws in society", color: "bg-emerald-100 text-emerald-600" },
              { icon: <AlertTriangle className="w-6 h-6" />, text: "What happens without laws", color: "bg-teal-100 text-teal-600" }
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

        {/* Section 1.1: What Is Law? */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What Is Law?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Laws are <strong className="text-green-600">formal rules made by the government</strong> that apply to everyone in society.
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-800">Universal Application</h3>
                  </div>
                  <p className="text-gray-600">
                    Laws apply to <strong>everyone</strong> — citizens, leaders, even police officers. No one is above the law.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">⚖️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Rules vs Laws</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-400">
                    <h4 className="font-bold text-blue-700 mb-2">Rules</h4>
                    <p className="text-sm text-gray-700">Made by schools, families, or organizations</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">VS</div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                    <h4 className="font-bold text-green-700 mb-2">Laws</h4>
                    <p className="text-sm text-gray-700">Have legal power and can lead to punishment if broken</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1.2: Why Do We Need Laws? */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Why Do We Need Laws?
              </h2>
            </div>
          </div>

          {/* Football Analogy */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-4 text-center">⚽</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Think About Football
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  Imagine a football match with <strong className="text-green-600">no referee</strong>. 
                  That's life without law!
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Shield className="w-5 h-5" />, text: "Protect rights", color: "text-green-600" },
                  { icon: <Users className="w-5 h-5" />, text: "Maintain order", color: "text-emerald-600" },
                  { icon: <Scale className="w-5 h-5" />, text: "Solve conflicts fairly", color: "text-teal-600" }
                ].map((purpose, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm flex items-center space-x-3">
                    <div className={purpose.color}>
                      {purpose.icon}
                    </div>
                    <p className="font-medium text-gray-700">{purpose.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1.3: What If Laws Didn't Exist? */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-3">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What If Laws Didn't Exist?
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-8">Everyday chaos would rule our world</p>
          </div>

          {/* Chaos Scenarios - Auto-rotating */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Chaos Scenario #{currentScenario + 1}</div>
              <div className={`bg-gradient-to-r ${scenarios[currentScenario].color} text-white rounded-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="text-4xl mb-4">{scenarios[currentScenario].emoji}</div>
                <h3 className="text-2xl font-bold mb-4">{scenarios[currentScenario].title}</h3>
                <p className="text-lg opacity-90">{scenarios[currentScenario].description}</p>
              </div>
            </div>
            
            {/* Driving Example Highlight */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="text-4xl mr-4">🚗</div>
                <h3 className="text-xl font-bold text-gray-800">Real Example</h3>
              </div>
              <p className="text-lg text-gray-700 text-center">
                If there were <strong className="text-red-600">no laws about driving</strong>, 
                anyone could drive on <strong className="text-red-600">any side of the road!</strong>
              </p>
            </div>
          </div>

          {/* Chaos Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚦", title: "Traffic Jams", description: "No rules for roads", color: "from-red-50 to-red-100" },
              { icon: "💰", title: "Stealing", description: "No protection for property", color: "from-orange-50 to-orange-100" },
              { icon: "👊", title: "Fights", description: "No peaceful conflict resolution", color: "from-yellow-50 to-yellow-100" }
            ].map((chaos, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${chaos.color} rounded-2xl p-6 text-center border-2 border-gray-200 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
              >
                <div className="text-4xl mb-4">{chaos.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{chaos.title}</h3>
                <p className="text-sm text-gray-600">{chaos.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity: Rules Around Me Journal */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Activity: "Rules Around Me" Journal
              </h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Write down 3 rules you follow in different places and reflect on their importance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { place: "Home", icon: "🏠", color: "from-green-100 to-green-200", field: "home" },
              { place: "School", icon: "🏫", color: "from-emerald-100 to-emerald-200", field: "school" },
              { place: "Public", icon: "🏛️", color: "from-teal-100 to-teal-200", field: "public" }
            ].map((location, index) => (
              <div key={index} className={`bg-gradient-to-r ${location.color} rounded-2xl p-6`}>
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{location.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800">Rules at {location.place}</h3>
                </div>
                
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Reflection Questions</h3>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <p className="text-gray-700 font-medium">• Why do we need these rules?</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                <p className="text-gray-700 font-medium">• What would happen without them?</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <div className="text-4xl mb-6">💡</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Key Takeaway
            </h2>
            <p className="text-xl max-w-3xl mx-auto font-medium mb-6">
              Laws are the invisible rulebook that keeps our society functioning smoothly. 
              They protect our rights, maintain order, and help us resolve conflicts fairly.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-lg">
                Without laws, society would be chaotic and unsafe for everyone! ⚖️
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

export default Module1;