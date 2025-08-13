import React, { useState, useEffect } from 'react';
import { Brain, Smartphone, Camera, Mic, Play, Gamepad2, ShoppingCart, Car, Home, Lightbulb, Eye, Cpu, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const WhatIsAi = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const phoneFeatures = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Face Recognition",
      description: "When you look at your phone and it unlocks automatically, AI recognizes your face among millions of possible faces",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Assistants",
      description: "When you say Hey Siri or OK Google, AI understands your voice and responds",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Smart Camera",
      description: "When you take a photo and your phone automatically makes it brighter or focuses on your face, AI is working",
      color: "from-emerald-600 to-green-600"
    }
  ];

  const entertainmentPlatforms = [
    {
      platform: "YouTube",
      icon: <Play className="w-8 h-8" />,
      description: "Ever wonder why YouTube shows you videos of cats after you watch one cat video? AI learns that you like cats and suggests more cat videos",
      gradient: "from-emerald-400 to-green-500"
    },
    {
      platform: "Netflix/Disney+",
      icon: <Play className="w-8 h-8" />,
      description: "When you see Recommended for You, AI has studied what shows you have watched and suggests similar ones",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      platform: "Spotify",
      icon: <Mic className="w-8 h-8" />,
      description: "The Discover Weekly playlist is created by AI that learns your music taste and finds new songs you might like",
      gradient: "from-emerald-600 to-green-600"
    }
  ];

  const aiApplications = [
    {
      category: "Video Games",
      icon: <Gamepad2 className="w-8 h-8" />,
      items: [
        "Smart enemies in Minecraft that hunt you and work together",
        "Games that adjust difficulty based on how well you play"
      ],
      color: "from-emerald-100 to-green-100"
    },
    {
      category: "Shopping",
      icon: <ShoppingCart className="w-8 h-8" />,
      items: [
        "Amazon/Flipkart recommendations: People who bought this also bought",
        "Google Lens price comparison for better deals"
      ],
      color: "from-green-100 to-emerald-200"
    },
    {
      category: "Transportation",
      icon: <Car className="w-8 h-8" />,
      items: [
        "Tesla cars that drive themselves and avoid accidents",
        "Google Maps showing fastest routes and traffic warnings",
        "Uber/Ola finding closest drivers and best routes"
      ],
      color: "from-emerald-200 to-green-200"
    }
  ];

  const robotVacuumFeatures = [
    { icon: <Brain className="w-5 h-5" />, text: "Learns your house layout by remembering furniture", color: "text-emerald-600" },
    { icon: <Eye className="w-5 h-5" />, text: "Recognizes different dirt types and adjusts cleaning", color: "text-green-600" },
    { icon: <Cpu className="w-5 h-5" />, text: "Plans efficient cleaning paths for every room", color: "text-emerald-700" },
    { icon: <Home className="w-5 h-5" />, text: "Returns to charging station when battery is low", color: "text-green-700" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "Avoids stairs and fragile items", color: "text-emerald-600" }
  ];

  const recapData = [
    {
      term: "Artificial Intelligence",
      meaning: "Machines doing tasks that need thinking and learning",
      example: "Siri understanding Call mom",
      why: "It understands human language",
      color: "from-emerald-50 to-green-50"
    },
    {
      term: "Smart Device",
      meaning: "A machine that uses AI to work better",
      example: "Amazon Alexa",
      why: "It learns your preferences and improves responses",
      color: "from-green-50 to-emerald-100"
    },
    {
      term: "Pattern Recognition",
      meaning: "AI finding similarities in data",
      example: "Instagram tagging your friends in photos",
      why: "It recognizes faces and matches them",
      color: "from-emerald-100 to-green-100"
    }
  ];

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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              What is Artificial Intelligence?
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Making AI Simple with Real-World Examples
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Understanding AI */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3 mr-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Understanding AI
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border-l-4 border-emerald-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What is AI?</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  <strong className="text-emerald-600">Artificial Intelligence (AI)</strong> means making machines 
                  smart enough to think and act like humans.
                </p>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-emerald-400">
                  <div className="flex items-start space-x-4">
                    <Brain className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Think of it this way:</h4>
                      <p className="text-gray-600">
                        If a regular computer is like a very fast calculator that only follows exact instructions, 
                        then AI is like giving that computer the ability to learn, recognize patterns, and make decisions on its own.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-8xl mb-6">🤖</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">AI = Digital Brain</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <Eye className="w-6 h-6" />, text: "Recognizes", color: "bg-emerald-100 text-emerald-600" },
                      { icon: <Brain className="w-6 h-6" />, text: "Learns", color: "bg-green-100 text-green-600" },
                      { icon: <Cpu className="w-6 h-6" />, text: "Decides", color: "bg-emerald-200 text-emerald-700" },
                      { icon: <Zap className="w-6 h-6" />, text: "Adapts", color: "bg-green-200 text-green-700" }
                    ].map((item, index) => (
                      <div key={index} className={`${item.color} rounded-xl p-4`}>
                        <div className="flex flex-col items-center space-y-2">
                          {item.icon}
                          <span className="font-semibold">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI on Your Phone */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-4">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              AI on Your Phone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your smartphone is packed with AI features you use every day!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {phoneFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`bg-gradient-to-r ${feature.color} rounded-full p-4 inline-flex mb-6`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Entertainment Platforms */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              AI in Entertainment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how AI personalizes your entertainment experience
            </p>
          </div>

          <div className="space-y-6">
            {entertainmentPlatforms.map((platform, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 ${
                  visibleCards.includes(index + 3) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className={`bg-gradient-to-r ${platform.gradient} p-8 md:p-12 flex-shrink-0`}>
                    <div className="text-white flex flex-col items-center text-center">
                      {platform.icon}
                      <h3 className="text-xl font-bold mt-4 text-white">{platform.platform}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex-1">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Applications */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              AI Everywhere Around You
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiApplications.map((app, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${app.color} rounded-2xl p-8 border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-105 ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 250}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-white rounded-full p-3 mr-4 shadow-md">
                    <div className="text-emerald-600">
                      {app.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{app.category}</h3>
                </div>
                <ul className="space-y-3">
                  {app.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Robot Vacuum Example */}
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 rounded-3xl p-8 md:p-12 border border-emerald-200">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Robot Vacuum Cleaner Example
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how AI transforms a simple vacuum into a smart home assistant
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Without AI</h3>
                <p className="text-gray-600">
                  Just moves in straight lines and bumps into walls randomly
                </p>
              </div>
              <div className="text-center">
                <ArrowRight className="w-8 h-8 text-emerald-600 mx-auto animate-pulse" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-600 mb-4">With AI</h3>
                <div className="space-y-4">
                  {robotVacuumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`${feature.color}`}>
                        {feature.icon}
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-8xl mb-6">🏠</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Smart Home Cleaning</h3>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6">
                    <p className="text-gray-700 font-medium">
                      AI turns a simple machine into an intelligent helper that learns, 
                      adapts, and makes decisions just like a human would!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Terms Recap */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Key Terms Recap
            </h2>
            <p className="text-lg text-gray-600">
              Master these essential AI concepts
            </p>
          </div>

          <div className="space-y-6">
            {recapData.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${item.color} rounded-2xl p-8 border border-green-200 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 9) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-700 mb-2">Term</h3>
                    <p className="text-gray-800 font-semibold">{item.term}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-700 mb-2">Meaning</h3>
                    <p className="text-gray-700">{item.meaning}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-700 mb-2">Example</h3>
                    <p className="text-gray-700">{item.example}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-700 mb-2">Why It's AI</h3>
                    <p className="text-gray-700">{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl p-12 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            You've Mastered AI Basics!
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Now you understand how AI works around you every day - from your phone to your favorite apps, 
            from games to smart homes. You are ready to explore deeper into the world of AI!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WhatIsAi;