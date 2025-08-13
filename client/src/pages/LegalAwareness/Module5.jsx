import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  UserX,
  MessageSquare,
  Camera,
  Target,
  CheckCircle,
  X,
  FileText,
  Lightbulb,
  Smartphone,
  Globe,
  Users,
  Download,
  Link,
  Key
} from 'lucide-react';

const Module5 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentCyberCrime, setCurrentCyberCrime] = useState(0);
  const [currentSafePractice, setCurrentSafePractice] = useState(0);
  const [digitalAudit, setDigitalAudit] = useState({
    appsCount: '',
    sharePasswords: '',
    safetyStep1: '',
    safetyStep2: '',
    safetyStep3: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCyberCrime((prev) => (prev + 1) % cyberCrimes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSafePractice((prev) => (prev + 1) % safePractices.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const cyberCrimes = [
    {
      name: "Cyberbullying",
      description: "Saying mean or threatening things to someone online",
      icon: <MessageSquare className="w-8 h-8" />,
      consequence: "Can cause serious emotional harm to victims",
      color: "from-red-500 to-orange-500",
      example: "Sending hateful messages on social media"
    },
    {
      name: "Hacking",
      description: "Breaking into someone's phone or computer without permission",
      icon: <Shield className="w-8 h-8" />,
      consequence: "Violates privacy and can steal sensitive information",
      color: "from-purple-500 to-pink-500",
      example: "Accessing someone's email account illegally"
    },
    {
      name: "Identity Theft",
      description: "Pretending to be someone else online",
      icon: <UserX className="w-8 h-8" />,
      consequence: "Can ruin someone's reputation and relationships",
      color: "from-blue-500 to-indigo-500",
      example: "Creating fake social media profiles"
    }
  ];

  const onlineMisuse = [
    {
      action: "Making fake profiles",
      icon: <UserX className="w-6 h-6" />,
      severity: "High Risk"
    },
    {
      action: "Sending mean or threatening messages",
      icon: <MessageSquare className="w-6 h-6" />,
      severity: "High Risk"
    },
    {
      action: "Sharing private photos/videos without permission",
      icon: <Camera className="w-6 h-6" />,
      severity: "Very High Risk"
    },
    {
      action: "Spreading lies or rumours online",
      icon: <AlertTriangle className="w-6 h-6" />,
      severity: "Medium Risk"
    }
  ];

  const safePractices = [
    {
      practice: "Never share OTPs, passwords, or personal info",
      description: "Even with friends—keep your digital keys private",
      icon: <Key className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      tip: "Your password is like your house key—don't give it away!"
    },
    {
      practice: "Don't click suspicious links or download unknown files",
      description: "They might contain viruses or malware",
      icon: <Download className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      tip: "If you don't recognize it, don't click it!"
    },
    {
      practice: "Avoid chatting with strangers online",
      description: "You never know who's really behind the screen",
      icon: <Users className="w-8 h-8" />,
      color: "from-teal-500 to-green-600",
      tip: "Stranger danger applies online too!"
    },
    {
      practice: "Use legal and safe apps/websites",
      description: "Avoid pirated games, movies, or software",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600",
      tip: "Free illegal content often comes with hidden dangers!"
    }
  ];

  const legalTools = [
    {
      name: "IT Act, 2000",
      fullName: "Information Technology Act",
      description: "This law helps stop online fraud, hacking, cyberstalking, and more",
      icon: <FileText className="w-8 h-8" />,
      protects: ["Online fraud", "Hacking", "Cyberstalking", "Data theft"],
      color: "from-green-400 to-emerald-400"
    },
    {
      name: "Juvenile Justice Act",
      fullName: "For minors who make mistakes online",
      description: "It helps them learn, improve, and come back stronger, not just punish them",
      icon: <Shield className="w-8 h-8" />,
      protects: ["Rehabilitation", "Education", "Second chances", "Growth"],
      color: "from-emerald-400 to-teal-400"
    }
  ];

  const handleAuditChange = (field, value) => {
    setDigitalAudit(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "Very High Risk": return "bg-red-100 text-red-700 border-red-300";
      case "High Risk": return "bg-orange-100 text-orange-700 border-orange-300";
      case "Medium Risk": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Wifi className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Digital World, Real Laws
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Navigate the online world safely while understanding the legal boundaries that protect everyone
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Wifi className="w-6 h-6" />, text: "What cyber law means and why it exists", color: "bg-green-100 text-green-600" },
              { icon: <AlertTriangle className="w-6 h-6" />, text: "Online actions that can get you in trouble", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Shield className="w-6 h-6" />, text: "Safe internet practices for daily life", color: "bg-teal-100 text-teal-600" },
              { icon: <FileText className="w-6 h-6" />, text: "Legal tools that protect you online", color: "bg-green-100 text-green-700" }
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
                  <p className="font-semibold text-sm">{objective.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What is Cyber Law Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What Is Cyber Law?
              </h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Think of cyber law as the <strong className="text-green-600">rules of the internet road</strong>. 
                Just like there are traffic rules for roads, cyber laws protect people online.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">They deal with:</h3>
                <div className="space-y-3">
                  {cyberCrimes.map((crime, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <p className="text-gray-700">
                        <strong className="text-green-600">{crime.name}</strong> — {crime.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🌐</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Why It Matters</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-400">
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    Even though the internet feels like a <strong className="text-emerald-600">"virtual"</strong> world, 
                    the law sees it as <strong className="text-green-600">very real</strong>.
                  </p>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <p className="text-gray-600 font-medium">
                      What you do online has <strong className="text-red-600">real-life consequences</strong> ⚠️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Cyber Crime (Auto-rotating) */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Understanding Cyber Crimes
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${cyberCrimes[currentCyberCrime].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-6xl">{cyberCrimes[currentCyberCrime].icon}</div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-3">{cyberCrimes[currentCyberCrime].name}</h3>
                    <p className="text-xl opacity-90 mb-4">{cyberCrimes[currentCyberCrime].description}</p>
                    <div className="bg-white/20 rounded-lg p-4 mb-3">
                      <p className="text-sm">Impact: <strong>{cyberCrimes[currentCyberCrime].consequence}</strong></p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-sm">Example: {cyberCrimes[currentCyberCrime].example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Online Misuse Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-3">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Online Misuse — And Legal Action
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some online actions that can get you (or someone else) into trouble:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {onlineMisuse.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 rounded-full p-2">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{item.action}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <p className="text-sm text-red-700">
                    <strong>⚠️ Legal Warning:</strong> These actions can be punished under law, even if the person doing it is under 18.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Juvenile Justice Act Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border-l-4 border-blue-400">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Juvenile Justice Act
              </h3>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                If someone below 18 years (called a <strong className="text-blue-600">minor</strong>) breaks a cyber law, 
                they may be handled under this law.
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 border-l-4 border-blue-400">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-800">The Goal:</h4>
                </div>
                <p className="text-gray-700">
                  It tries to <strong className="text-green-600">reform the child</strong>, not punish them like an adult. 
                  The focus is on learning and growing, not just punishment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Internet Practices Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Safe Internet Practices
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these smart habits to stay safe online:
            </p>
          </div>

          {/* Featured Safe Practice (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Safety Spotlight</div>
              <div className={`bg-gradient-to-r ${safePractices[currentSafePractice].color} text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-6xl">{safePractices[currentSafePractice].icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-3">{safePractices[currentSafePractice].practice}</h3>
                    <p className="text-lg opacity-90 mb-4">{safePractices[currentSafePractice].description}</p>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm">💡 <strong>{safePractices[currentSafePractice].tip}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Safe Practices Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {safePractices.map((practice, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentSafePractice === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 150}ms` }}
                onClick={() => setCurrentSafePractice(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    {practice.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{practice.practice}</h3>
                    <p className="text-sm text-gray-600 mb-3">{practice.description}</p>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-green-700">💡 {practice.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-yellow-400">
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                The Golden Rule of Internet Safety
              </h3>
              <p className="text-xl text-gray-700 font-medium">
                <strong className="text-orange-600">If it feels wrong, it probably is.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Legal Tools Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Legal Tools That Help
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {legalTools.map((tool, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${tool.color} text-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 8) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 8) * 200}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  {tool.icon}
                  <div>
                    <h3 className="text-2xl font-bold">{tool.name}</h3>
                    <p className="text-lg opacity-90">{tool.fullName}</p>
                  </div>
                </div>
                <p className="text-lg mb-6 opacity-90">{tool.description}</p>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold mb-3">What it protects against:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.protects.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Diary Check Activity */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Digital Diary Check
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Do a mini self-audit of your online habits. This helps you understand your digital footprint and improve your safety.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <span>Apps & Websites Count</span>
                  </h3>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many apps/websites do you use regularly?
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 15"
                    value={digitalAudit.appsCount}
                    onChange={(e) => handleAuditChange('appsCount', e.target.value)}
                  />
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Lock className="w-6 h-6 text-emerald-600" />
                    <span>Password Sharing</span>
                  </h3>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you share passwords with friends or family?
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={digitalAudit.sharePasswords}
                    onChange={(e) => handleAuditChange('sharePasswords', e.target.value)}
                  >
                    <option value="">Select an option</option>
                    <option value="never">Never</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="often">Often</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-6 border-2 border-teal-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Target className="w-6 h-6 text-teal-600" />
                  <span>Your 3 Safety Steps</span>
                </h3>
                <p className="text-gray-600 mb-4">List 3 steps you'll now take to stay safer online:</p>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-start space-x-3">
                      <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-1">
                        {num}
                      </div>
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={`Safety step ${num}...`}
                        value={digitalAudit[`safetyStep${num}`]}
                        onChange={(e) => handleAuditChange(`safetyStep${num}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Audit Results */}
                {(digitalAudit.appsCount || digitalAudit.sharePasswords) && (
                  <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-green-600" />
                      <span>Your Digital Safety Assessment</span>
                    </h4>
                    
                    {digitalAudit.appsCount && (
                      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-700">
                          <strong>Apps Count:</strong> {digitalAudit.appsCount} apps/websites
                          {parseInt(digitalAudit.appsCount) > 20 && (
                            <span className="ml-2 text-orange-600 text-sm">⚠️ Consider reducing for better security</span>
                          )}
                        </p>
                      </div>
                    )}
                    
                    {digitalAudit.sharePasswords && (
                      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-700">
                          <strong>Password Sharing:</strong> {digitalAudit.sharePasswords}
                          {digitalAudit.sharePasswords !== 'never' && (
                            <span className="ml-2 text-red-600 text-sm">❌ This increases security risks</span>
                          )}
                          {digitalAudit.sharePasswords === 'never' && (
                            <span className="ml-2 text-green-600 text-sm">✅ Great security practice!</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways Summary */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key Takeaways
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Remember these important points about digital world laws
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Wifi className="w-8 h-8" />,
                title: "Cyber Laws Are Real",
                description: "Internet actions have real-world consequences"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Stay Protected",
                description: "Follow safe practices to protect yourself online"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Legal Support Exists",
                description: "IT Act 2000 and Juvenile Justice Act help protect you"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Think Before You Act",
                description: "If it feels wrong online, it probably is"
              }
            ].map((takeaway, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {takeaway.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{takeaway.title}</h3>
                <p className="text-sm text-green-100">{takeaway.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">🌟 Remember</h3>
              <p className="text-lg text-green-100">
                The internet is a powerful tool that can help you learn, connect, and grow. 
                By understanding cyber laws and practicing digital safety, you can enjoy all 
                the benefits while staying protected and responsible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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

export default Module5;