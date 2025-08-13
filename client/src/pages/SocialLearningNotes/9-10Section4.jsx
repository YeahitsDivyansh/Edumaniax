import React, { useState, useEffect } from 'react';
import { Target, Clock, CheckCircle, Trophy, Brain, Lightbulb, ArrowRight, Star, Zap, Calendar, BookOpen, Award } from 'lucide-react';

const Module4SelfDiscipline = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentExample, setCurrentExample] = useState(0);
  const [habitTracker, setHabitTracker] = useState(Array(21).fill(false));
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [motivationTip, setMotivationTip] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationTip((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const disciplineExamples = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Studying when you'd rather scroll",
      description: "Choosing productive activities over instant gratification"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Choosing sleep over late-night distractions",
      description: "Prioritizing health and well-being over momentary entertainment"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Apologizing even when it's uncomfortable",
      description: "Doing the right thing despite personal discomfort"
    }
  ];

  const smartFramework = [
    { letter: "S", word: "Specific", description: "Clear and well-defined", icon: <Target className="w-6 h-6" /> },
    { letter: "M", word: "Measurable", description: "Trackable progress", icon: <CheckCircle className="w-6 h-6" /> },
    { letter: "A", word: "Achievable", description: "Realistic and attainable", icon: <Star className="w-6 h-6" /> },
    { letter: "R", word: "Relevant", description: "Meaningful to you", icon: <Lightbulb className="w-6 h-6" /> },
    { letter: "T", word: "Time-bound", description: "Has a deadline", icon: <Calendar className="w-6 h-6" /> }
  ];

  const motivationTips = [
    { icon: <Target className="w-6 h-6" />, tip: "Visual reminders of your 'why'" },
    { icon: <Trophy className="w-6 h-6" />, tip: "Accountability partners" },
    { icon: <CheckCircle className="w-6 h-6" />, tip: "Progress tracking" },
    { icon: <Award className="w-6 h-6" />, tip: "Celebrating milestones" }
  ];

  const toggleHabit = (index) => {
    setHabitTracker(prev => {
      const newTracker = [...prev];
      newTracker[index] = !newTracker[index];
      return newTracker;
    });
  };

  const completedDays = habitTracker.filter(day => day).length;

  return (
    <div
      id="m-4"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["m-4"] = el;
        }
      }}
      className="mb-10"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Self-Discipline & Goal Mastery
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              To achieve anything meaningful, discipline matters more than motivation
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* What Self-Discipline Really Means */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What Self-Discipline Really Means
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
                It's the ability to follow through on your <strong className="text-green-600">values</strong> and <strong className="text-emerald-600">goals</strong> — even when it's inconvenient or boring.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Everyday Examples:</h3>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 text-white">
                        {disciplineExamples[currentExample].icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          {disciplineExamples[currentExample].title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {disciplineExamples[currentExample].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Self-Discipline Is:</h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                        <p className="text-gray-700 font-medium">Following through on commitments</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                        <p className="text-gray-700 font-medium">Choosing long-term rewards</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                        <p className="text-gray-700 font-medium">Acting on values, not feelings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Building Habits That Stick */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3 mr-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Building Habits That Stick
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start small, stay consistent. Habits form through repetition and reward.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">21-Day Habit Tracker</h3>
                <p className="text-gray-600">
                  Pick one habit you want to build. Track it for 21 days and notice what helps you stay consistent.
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-800">Your Progress</h4>
                    <div className="bg-green-500 text-white rounded-full px-4 py-2 text-sm font-bold">
                      {completedDays}/21 Days
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {habitTracker.map((completed, index) => (
                      <button
                        key={index}
                        onClick={() => toggleHabit(index)}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                          completed 
                            ? 'bg-green-500 border-green-500 text-white transform scale-110' 
                            : 'bg-white border-gray-300 text-gray-400 hover:border-green-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Consistency Rate:</span>
                      <span className="text-green-600 font-bold">
                        {Math.round((completedDays / 21) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(completedDays / 21) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Habit-Building Tips</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Target className="w-6 h-6" />, tip: "Start with just 2 minutes" },
                    { icon: <Clock className="w-6 h-6" />, tip: "Pick a consistent time" },
                    { icon: <CheckCircle className="w-6 h-6" />, tip: "Track your progress visually" },
                    { icon: <Star className="w-6 h-6" />, tip: "Reward yourself for milestones" },
                    { icon: <Lightbulb className="w-6 h-6" />, tip: "Stack with existing habits" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-green-600">{item.icon}</div>
                      <p className="text-gray-700 font-medium">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setting Meaningful Goals */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-3 mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Setting Meaningful Goals
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Effective goals challenge you but don't overwhelm you. They also align with your bigger values.
            </p>
          </div>

          {/* SMART Framework */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Use the SMART Framework
              </h3>
              <p className="text-gray-600">Click on each letter to learn more</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {smartFramework.map((smart, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGoal(index)}
                  className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 ${
                    selectedGoal === index ? 'ring-4 ring-green-300 scale-105 bg-gradient-to-r from-green-100 to-emerald-100' : ''
                  }`}
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {smart.letter}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{smart.word}</h4>
                  <p className="text-sm text-gray-600 mb-3">{smart.description}</p>
                  <div className="text-green-600 mx-auto flex justify-center">
                    {smart.icon}
                  </div>
                </button>
              ))}
            </div>

            {/* SMART Goal Example */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">SMART Goal Transformation</h4>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-6 items-center">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-center">
                    <div className="text-red-500 text-2xl mb-2">❌</div>
                    <h5 className="text-lg font-bold text-gray-800 mb-2">Vague Goal</h5>
                    <p className="text-gray-600">"Improve writing"</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-8 h-8 text-green-600 animate-pulse" />
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200">
                  <div className="text-center">
                    <div className="text-green-500 text-2xl mb-2">✅</div>
                    <h5 className="text-lg font-bold text-green-800 mb-2">SMART Goal</h5>
                    <p className="text-gray-700 font-medium">
                      "Write one essay each week for a month and ask for feedback"
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-4 mt-8">
                {[
                  { letter: "S", check: "Write one essay" },
                  { letter: "M", check: "One per week" },
                  { letter: "A", check: "Realistic workload" },
                  { letter: "R", check: "Improves writing" },
                  { letter: "T", check: "For a month" }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 text-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">
                      {item.letter}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{item.check}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Staying Focused and Motivated */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 mr-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Staying Focused and Motivated
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discipline builds momentum, but motivation keeps the purpose alive.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Helps:</h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-green-600 bg-white rounded-full p-2">
                      {motivationTips[motivationTip].icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Currently Highlighting:</h4>
                      <p className="text-gray-700 font-medium">{motivationTips[motivationTip].tip}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {motivationTips.map((tip, index) => (
                  <div key={index} className={`bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 text-center transition-all duration-300 ${
                    motivationTip === index ? 'ring-2 ring-green-300 transform scale-105' : ''
                  }`}>
                    <div className="text-green-600 mx-auto mb-2 flex justify-center">
                      {tip.icon}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-l-4 border-green-400">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-800">Success Formula</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-center space-x-4 text-center">
                    <div className="bg-green-500 text-white rounded-full p-3">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">+</span>
                    <div className="bg-emerald-500 text-white rounded-full p-3">
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">=</span>
                    <div className="bg-teal-500 text-white rounded-full p-3">
                      <Trophy className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-4 text-sm font-medium">
                    <span className="text-green-600">Discipline</span>
                    <span className="text-emerald-600">Goals</span>
                    <span className="text-teal-600">Success</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">Remember:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Small consistent actions beat big sporadic efforts</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>Progress matters more than perfection</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>Your future self will thank you</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Key Takeaway
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium mb-6">
              Self-discipline is the bridge between goals and accomplishment. Start small, stay consistent, and celebrate your progress along the way.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Discipline</strong> + 
                <strong className="text-emerald-600"> SMART Goals</strong> + 
                <strong className="text-teal-600"> Consistency</strong> = 
                <strong className="text-green-700"> Mastery! 🏆</strong>
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

export default Module4SelfDiscipline;