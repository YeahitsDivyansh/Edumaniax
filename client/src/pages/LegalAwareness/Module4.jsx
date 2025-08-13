import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Shield, 
  ShoppingCart, 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  RefreshCw,
  Users,
  FileText,
  Lightbulb,
  Target,
  Gavel,
  TreePine,
  Droplets,
  Wind
} from 'lucide-react';

const Module4 = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentTrafficRule, setCurrentTrafficRule] = useState(0);
  const [currentConsumerRight, setCurrentConsumerRight] = useState(0);
  const [userLaws, setUserLaws] = useState([
    { name: '', reason: '', punishment: '' },
   
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrafficRule((prev) => (prev + 1) % trafficRules.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConsumerRight((prev) => (prev + 1) % consumerRights.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const trafficRules = [
    {
      rule: "Always wear a helmet when on a two-wheeler",
      icon: <Shield className="w-8 h-8" />,
      consequence: "Protects your head from serious injuries",
      color: "from-green-500 to-emerald-500"
    },
    {
      rule: "Cross only at zebra crossings",
      icon: <Users className="w-8 h-8" />,
      consequence: "Keeps pedestrians safe from traffic",
      color: "from-emerald-500 to-teal-500"
    },
    {
      rule: "Follow traffic lights",
      icon: <AlertTriangle className="w-8 h-8" />,
      consequence: "Prevents accidents and maintains order",
      color: "from-teal-500 to-green-600"
    },
    {
      rule: "Minimum age for gearless scooters: 16 (with license)",
      icon: <Car className="w-8 h-8" />,
      consequence: "Ensures maturity and skill for safe driving",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const consumerRights = [
    {
      right: "Right to Safety",
      description: "You can expect safe products (food, medicine)",
      icon: <Shield className="w-6 h-6" />,
      example: "Medicine without harmful side effects",
      color: "bg-green-100 text-green-600 border-green-200"
    },
    {
      right: "Right to Information",
      description: "Sellers must tell you ingredients, price, expiry date",
      icon: <Eye className="w-6 h-6" />,
      example: "Food labels with complete ingredient list",
      color: "bg-emerald-100 text-emerald-600 border-emerald-200"
    },
    {
      right: "Right to Choose",
      description: "No one can force you to buy one brand or product",
      icon: <Target className="w-6 h-6" />,
      example: "Freedom to choose between different brands",
      color: "bg-teal-100 text-teal-600 border-teal-200"
    },
    {
      right: "Right to Complain",
      description: "If you get a faulty item, you can ask for refund or replacement",
      icon: <FileText className="w-6 h-6" />,
      example: "Return expired juice for full refund",
      color: "bg-green-100 text-green-700 border-green-300"
    }
  ];

  const environmentLaws = [
    {
      name: "Air Pollution Control Act",
      description: "Factories can't release harmful smoke without control measures",
      icon: <Wind className="w-8 h-8" />,
      impact: "Keeps our air clean and breathable",
      color: "from-green-400 to-emerald-400"
    },
    {
      name: "Water Protection Act",
      description: "It's illegal to dump untreated waste into rivers",
      icon: <Droplets className="w-8 h-8" />,
      impact: "Protects our water sources from pollution",
      color: "from-emerald-400 to-teal-400"
    },
    {
      name: "Wildlife Protection Act",
      description: "Hunting endangered animals is a serious crime",
      icon: <TreePine className="w-8 h-8" />,
      impact: "Saves animals from extinction",
      color: "from-teal-400 to-green-500"
    },
    {
      name: "Plastic Ban Rules",
      description: "Many states have banned single-use plastic",
      icon: <RefreshCw className="w-8 h-8" />,
      impact: "Reduces environmental damage",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const handleLawChange = (index, field, value) => {
    setUserLaws(prev => 
      prev.map((law, i) => 
        i === index ? { ...law, [field]: value } : law
      )
    );
  };

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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Gavel className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Law in Daily Life
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              You're Already a Legal Expert! Discover how laws protect and guide us every single day
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
              { icon: <Car className="w-6 h-6" />, text: "Traffic rules that keep you safe", color: "bg-green-100 text-green-600" },
              { icon: <ShoppingCart className="w-6 h-6" />, text: "Your rights as a consumer", color: "bg-emerald-100 text-emerald-600" },
              { icon: <Leaf className="w-6 h-6" />, text: "Laws that protect our environment", color: "bg-teal-100 text-teal-600" },
              { icon: <Shield className="w-6 h-6" />, text: "How police help and protect us", color: "bg-green-100 text-green-700" }
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

        {/* Traffic Rules Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Traffic Rules and You
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Even kids follow laws—especially on the road!
            </p>
          </div>

          {/* Featured Traffic Rule (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Currently Highlighting</div>
              <div className={`bg-gradient-to-r ${trafficRules[currentTrafficRule].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-6xl">{trafficRules[currentTrafficRule].icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-3">{trafficRules[currentTrafficRule].rule}</h3>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-lg">Why? <strong>{trafficRules[currentTrafficRule].consequence}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Traffic Rules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Always wear a helmet when on a two-wheeler",
              "Cross only at zebra crossings", 
              "Follow traffic lights",
              "No underage driving — Minimum age: 16 (with license)",
              "Seat belts always, even in the back seat",
              "Emergency vehicles first, give way to ambulances",
              "Don't honk unnecessarily — Noise pollution is real",
              "Respecting red lights — Jumping signals cause chaos",
              "Wear visible clothing at night or while cycling"
            ].map((rule, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{rule}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Consequences Warning */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-400">
            <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold text-gray-800">Remember</h3>
            </div>
            <p className="text-lg text-gray-700">
              Breaking these rules is dangerous and can cause <strong className="text-red-600">accidents</strong>, 
              <strong className="text-red-600"> injuries</strong>, or <strong className="text-red-600">fines</strong> (money paid as punishment).
            </p>
          </div>
        </div>

        {/* Consumer Rights Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Consumer Rights
              </h2>
            </div>
          </div>

          {/* Scenario Introduction */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12 border-l-4 border-emerald-400">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🧃</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Imagine This Scenario
              </h3>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                You bought a packet of juice, and it was expired. What can you do?
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  India's Consumer Protection Act helps you get:
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {["A refund", "A replacement", "Justice if something is fake, spoiled, or broken"].map((solution, index) => (
                    <div key={index} className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg p-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-gray-700 font-medium">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 text-center">
                <p className="text-lg text-gray-700">
                  <strong className="text-green-600">Consumer</strong> = anyone who buys goods or services.
                  <br />
                  <strong className="text-emerald-600">You have legal rights when you shop!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Featured Consumer Right (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">Your Rights as a Consumer</div>
              <div className={`${consumerRights[currentConsumerRight].color} rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500 border-2`}>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-4xl">{consumerRights[currentConsumerRight].icon}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-3">{consumerRights[currentConsumerRight].right}</h3>
                    <p className="text-lg mb-3">{consumerRights[currentConsumerRight].description}</p>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-sm">Example: <strong>{consumerRights[currentConsumerRight].example}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Consumer Rights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {consumerRights.map((right, index) => (
              <div
                key={index}
                className={`${right.color} border-2 rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentConsumerRight === index ? 'ring-4 ring-green-300 scale-105' : ''
                } ${
                  visibleCards.includes(index + 4) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
                onClick={() => setCurrentConsumerRight(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-white rounded-full p-2">
                    {right.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{right.right}</h3>
                    <p className="text-sm mb-3">{right.description}</p>
                    <div className="bg-white/80 rounded-lg p-2">
                      <p className="text-xs">Example: {right.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Laws Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-3">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Environment Laws
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These laws protect nature—and our future.
            </p>
          </div>

          {/* Environment Laws Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {environmentLaws.map((law, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${law.color} text-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 6) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  {law.icon}
                  <h3 className="text-2xl font-bold">{law.name}</h3>
                </div>
                <p className="text-lg mb-4 opacity-90">{law.description}</p>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm">Impact: <strong>{law.impact}</strong></p>
                </div>
              </div>
            ))}
          </div>

          {/* Why It Matters */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Why It Matters
              </h3>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
                The law says we all must care for the planet. Even small actions help—like not littering and saving water.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
                <p className="text-lg text-gray-600">
                  <strong className="text-green-600">Small Actions</strong> + 
                  <strong className="text-teal-600"> Environment Laws</strong> = 
                  <strong className="text-emerald-600"> Better Future! 🌱</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Police and FIR Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Police: Your Helpers and Protectors
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border-l-4 border-emerald-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  What is an FIR?
                </h3>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-lg text-gray-700 mb-4">
                    <strong className="text-emerald-600">FIR</strong> = First Information Report
                  </p>
                  <p className="text-gray-600">
                    This is the first official complaint you make at a police station when 
                    something wrong happens (like theft or an accident).
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">👮‍♀️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Fun Fact!</h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-400">
                    <p className="text-lg text-gray-700 font-medium">
                      The police <strong className="text-green-600">can't say no</strong> to 
                      registering an FIR in a serious matter!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Activity Section */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                "If I Were the Lawmaker" Challenge
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your own simple laws to improve life at home, school, or in your city. 
              Give each law a name, say why it's needed, and what the punishment would be.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="space-y-8">
              {userLaws.map((law, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Law #{index + 1}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Law Name
                      </label>
                     
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Why is this law needed?
                      </label>
                      
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What should be the punishment?
                      </label>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Remember This
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-6">
              Laws aren't just rules—they're protection. They keep us safe on roads, 
              fair in markets, and preserve our planet for future generations.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">
                <strong className="text-green-600">Traffic Rules</strong> + 
                <strong className="text-emerald-600"> Consumer Rights</strong> + 
                <strong className="text-teal-600"> Environment Laws</strong> = 
                <strong className="text-green-700"> Better Society! 🌟</strong>
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