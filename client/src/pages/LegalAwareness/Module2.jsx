import React, { useState, useEffect } from 'react';
import { BookOpen, Shield, Users, Star, Heart, Scale, Flag, TreePine, Lightbulb, Palette, Eye, Target, CheckCircle, Crown, Zap, Globe } from 'lucide-react';

const Module2 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentRight, setCurrentRight] = useState(0);
  const [currentDuty, setCurrentDuty] = useState(0);
  const [selectedPosterRight, setSelectedPosterRight] = useState('');
  const [posterText, setPosterText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRight((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dutyInterval = setInterval(() => {
      setCurrentDuty((prev) => (prev + 1) % 10);
    }, 3000);
    return () => clearInterval(dutyInterval);
  }, []);

  const fundamentalRights = [
    {
      title: "Right to Equality",
      article: "Article 14-18",
      description: "No one can treat you unfairly because of your religion, caste, gender, or place of birth",
      icon: <Scale className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      emoji: "⚖️"
    },
    {
      title: "Right to Freedom", 
      article: "Article 19-22",
      description: "Freedom to speak, write, move, choose your job, and live anywhere in India",
      icon: <Flag className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      emoji: "🗽"
    },
    {
      title: "Right Against Exploitation",
      article: "Article 23-24", 
      description: "No one can force you to work unfairly. Child labour and trafficking are banned",
      icon: <Shield className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      emoji: "🛡️"
    },
    {
      title: "Right to Freedom of Religion",
      article: "Article 25-28",
      description: "You can follow any religion or none at all. Everyone is free to pray and believe", 
      icon: <Heart className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600",
      emoji: "🙏"
    },
    {
      title: "Cultural and Educational Rights",
      article: "Article 29-30",
      description: "You can learn in your own language and preserve your culture",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-emerald-600 to-green-500",
      emoji: "📚"
    },
    {
      title: "Right to Constitutional Remedies",
      article: "Article 32",
      description: "If your rights are violated, you can go to court. It's your legal shield",
      icon: <Crown className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      emoji: "👑"
    }
  ];

  const fundamentalDuties = [
    { text: "Respect the Constitution, national flag, and anthem", icon: <Flag className="w-5 h-5" />, emoji: "🇮🇳" },
    { text: "Cherish India's freedom and follow its ideals", icon: <Star className="w-5 h-5" />, emoji: "⭐" },
    { text: "Protect the unity and spirit of our country", icon: <Users className="w-5 h-5" />, emoji: "🤝" },
    { text: "Defend the nation and help during emergencies", icon: <Shield className="w-5 h-5" />, emoji: "🛡️" },
    { text: "Promote harmony among all religions and groups", icon: <Heart className="w-5 h-5" />, emoji: "❤️" },
    { text: "Value and preserve India's heritage and culture", icon: <Palette className="w-5 h-5" />, emoji: "🎨" },
    { text: "Protect the environment, forests, rivers, and wildlife", icon: <TreePine className="w-5 h-5" />, emoji: "🌳" },
    { text: "Develop a scientific temper -- think logically, not blindly", icon: <Lightbulb className="w-5 h-5" />, emoji: "💡" },
    { text: "Safeguard public property and avoid vandalism", icon: <Shield className="w-5 h-5" />, emoji: "🏛️" },
    { text: "Work to improve excellence in all fields", icon: <Star className="w-5 h-5" />, emoji: "🏆" }
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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700  text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              India's Constitution
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Understanding Your Rights and Responsibilities as an Indian Citizen
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
              { icon: <BookOpen className="w-6 h-6" />, text: "What the Constitution is and who created it", color: "bg-green-100 text-green-600" },
              { icon: <Zap className="w-6 h-6" />, text: "Your Fundamental Rights as superpowers", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Users className="w-6 h-6" />, text: "Your duties and responsibilities to India", color: "bg-teal-100 text-teal-600" }
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

        {/* Section 2.1: What Is the Constitution? */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What Is the Constitution?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The Constitution of India is the <strong className="text-green-600">supreme law book</strong> that tells how our country should run and how people should be treated.
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-800">Created by the Constituent Assembly</h3>
                  </div>
                  <p className="text-gray-600">
                    A special team of leaders worked together to write our Constitution
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">📜</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Father of Indian Constitution</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-400">
                  <div className="text-4xl mb-3">👨‍⚖️</div>
                  <h4 className="text-xl font-bold text-green-700 mb-2">Dr. B.R. Ambedkar</h4>
                  <p className="text-gray-700">Chairman of the Drafting Committee</p>
                  <div className="mt-4 bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600 font-medium">
                      Often called the "Father of the Indian Constitution"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2.2: Fundamental Rights - Your Superpowers */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Fundamental Rights
              </h2>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-2xl mx-auto">
              <p className="text-2xl text-green-700 font-bold mb-2">Your Superpowers! ⚡</p>
              <p className="text-lg text-gray-700">
                These rights protect you and give you the power to live freely in India
              </p>
            </div>
          </div>
          
          {/* Featured Right (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${fundamentalRights[currentRight].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-5xl">{fundamentalRights[currentRight].emoji}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-2">{fundamentalRights[currentRight].title}</h3>
                    <p className="text-lg opacity-80 mb-2">{fundamentalRights[currentRight].article}</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-lg">{fundamentalRights[currentRight].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* All Rights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundamentalRights.map((right, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentRight === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                } ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
                onClick={() => setCurrentRight(index)}
              >
                <div className="text-3xl mb-3">{right.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{right.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{right.article}</p>
                <div className="text-green-600">
                  {right.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Right to Education Special Highlight */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <div className="text-5xl mb-6">🎓</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Special Right: Right to Education (RTE Act)
              </h3>
              <p className="text-xl max-w-3xl mx-auto font-medium">
                All children aged 6-14 have the right to <strong>free and compulsory education</strong> in school
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto mt-6">
                <p className="text-lg">
                  This means every child in India has the superpower of education! 📚✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2.3: Fundamental Duties */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-full p-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Fundamental Duties
              </h2>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400 max-w-2xl mx-auto">
              <p className="text-xl text-gray-700">
                Your <strong className="text-green-600">responsibilities</strong> as an Indian citizen
              </p>
              <p className="text-lg text-gray-600 mt-2">[Article 51A]</p>
            </div>
          </div>
          
          {/* Featured Duty (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Duty #{currentDuty + 1}</div>
              <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-5xl">{fundamentalDuties[currentDuty].emoji}</div>
                  <div className="text-left">
                    <p className="text-xl font-medium">{fundamentalDuties[currentDuty].text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Duties Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {fundamentalDuties.map((duty, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentDuty === index ? 'ring-4 ring-teal-300 scale-105 bg-gradient-to-r from-teal-50 to-green-100' : ''
                } ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
                onClick={() => setCurrentDuty(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{duty.emoji}</div>
                  <p className="text-gray-700 font-medium">{duty.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity: My Rights, My Voice Poster */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Activity: "My Rights, My Voice" Poster
              </h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Design a poster about one right you value most and write how you exercise or protect it
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Right Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choose Your Most Important Right</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Right to Education", "Right to Freedom of Expression", "Right to Equality",
                  "Right to Freedom of Religion", "Right Against Exploitation", "Right to Constitutional Remedies"
                ].map((right, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPosterRight(right)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPosterRight === right
                        ? 'border-green-500 bg-green-100 text-green-700 font-bold'
                        : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {right}
                  </button>
                ))}
              </div>
            </div>

            {/* Poster Design Area */}
            {selectedPosterRight && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your Poster Design</h3>
                  <p className="text-gray-600">Selected Right: <strong className="text-green-600">{selectedPosterRight}</strong></p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200 min-h-96">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">
                      {selectedPosterRight.includes('Education') ? '🎓' :
                       selectedPosterRight.includes('Expression') ? '🗣️' :
                       selectedPosterRight.includes('Equality') ? '⚖️' :
                       selectedPosterRight.includes('Religion') ? '🙏' :
                       selectedPosterRight.includes('Exploitation') ? '🛡️' : '👑'}
                    </div>
                    <h4 className="text-2xl font-bold text-green-700 mb-4">{selectedPosterRight}</h4>
                  </div>
                  
                  <textarea
                    className="w-full h-48 p-6 border-2 border-gray-200 rounded-lg resize-none focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white"
                    placeholder="Write how you exercise or protect this right in your daily life. For example: 'I exercise my Right to Education by attending school regularly, asking questions in class, and helping my classmates learn...'"
                    value={posterText}
                    onChange={(e) => setPosterText(e.target.value)}
                  />
                  
                  <div className="mt-4 text-center">
                    <div className="bg-green-100 rounded-lg p-4">
                      <p className="text-green-700 font-medium">
                        💡 Your poster is ready! You can now draw or design it on paper with these ideas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <div className="text-4xl mb-6">🇮🇳</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Remember This
            </h2>
            <p className="text-xl max-w-3xl mx-auto font-medium mb-6">
              The Constitution gives you amazing rights (your superpowers) and important duties (your responsibilities). 
              Together, they make India a fair and peaceful country for everyone!
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-lg">
                <strong>Rights</strong> + <strong>Duties</strong> = <strong>Strong Democracy! 💪</strong>
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

export default Module2;