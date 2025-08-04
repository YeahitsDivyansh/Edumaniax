import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Trophy,
  School,
  Car,
  Hospital,
  Home,
  Store,
  MapPin,
} from "lucide-react";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const SmartCityGame = () => {
  const { completeComputersChallenge } = useComputers();
  const [cityZones, setCityZones] = useState({
    schools: [],
    roads: [],
    hospitals: [],
    homes: [],
    shops: [],
  });
  const [showResults, setShowResults] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const zones = [
    {
      id: "schools",
      name: "Schools",
      icon: "🏫",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      correctSolutions: ["face-recognition", "smart-attendance", "ai-tutoring"],
    },
    {
      id: "roads",
      name: "Roads",
      icon: "🚦",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      correctSolutions: [
        "smart-traffic",
        "accident-detection",
        "route-optimization",
      ],
    },
    {
      id: "hospitals",
      name: "Hospitals",
      icon: "🏥",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      correctSolutions: [
        "medical-diagnosis",
        "patient-monitoring",
        "emergency-alert",
      ],
    },
    {
      id: "homes",
      name: "Homes",
      icon: "🏠",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      correctSolutions: ["robo-cleaner", "smart-security", "energy-management"],
    },
    {
      id: "shops",
      name: "Shops",
      icon: "🏪",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      correctSolutions: [
        "inventory-management",
        "customer-analytics",
        "checkout-automation",
      ],
    },
  ];

  const aiSolutions = [
    {
      id: "face-recognition",
      name: "Face Recognition Entry",
      icon: "👤",
      description: "Secure entry with facial scanning",
    },
    {
      id: "smart-attendance",
      name: "Smart Attendance System",
      icon: "📊",
      description: "Automatic student attendance tracking",
    },
    {
      id: "ai-tutoring",
      name: "AI Tutoring Assistant",
      icon: "🤖",
      description: "Personalized learning help for students",
    },
    {
      id: "smart-traffic",
      name: "Smart Traffic Lights",
      icon: "🚦",
      description: "Traffic lights that adapt to real-time flow",
    },
    {
      id: "accident-detection",
      name: "Accident Detection",
      icon: "🚨",
      description: "AI cameras that spot accidents instantly",
    },
    {
      id: "route-optimization",
      name: "Route Optimization",
      icon: "🗺️",
      description: "Best path suggestions for drivers",
    },
    {
      id: "medical-diagnosis",
      name: "AI Medical Diagnosis",
      icon: "🔬",
      description: "AI helps doctors diagnose diseases faster",
    },
    {
      id: "patient-monitoring",
      name: "Patient Monitoring",
      icon: "💓",
      description: "Smart sensors track patient health 24/7",
    },
    {
      id: "emergency-alert",
      name: "Emergency Alert System",
      icon: "🚑",
      description: "Instant alerts for medical emergencies",
    },
    {
      id: "robo-cleaner",
      name: "Robot Cleaner",
      icon: "🤖",
      description: "Autonomous cleaning robots for homes",
    },
    {
      id: "smart-security",
      name: "Smart Security System",
      icon: "🔒",
      description: "AI-powered home security monitoring",
    },
    {
      id: "energy-management",
      name: "Energy Management",
      icon: "⚡",
      description: "Smart energy usage optimization",
    },
    {
      id: "inventory-management",
      name: "Smart Inventory",
      icon: "📦",
      description: "AI tracks and manages store inventory",
    },
    {
      id: "customer-analytics",
      name: "Customer Analytics",
      icon: "📈",
      description: "AI analyzes shopping patterns",
    },
    {
      id: "checkout-automation",
      name: "Automated Checkout",
      icon: "🛒",
      description: "Self-checkout with AI assistance",
    },
  ];

  const handleDrop = (zoneId, solutionId) => {
    setCityZones((prev) => ({
      ...prev,
      [zoneId]: [...prev[zoneId], solutionId],
    }));
  };

  const removeSolution = (zoneId, solutionId) => {
    setCityZones((prev) => ({
      ...prev,
      [zoneId]: prev[zoneId].filter((id) => id !== solutionId),
    }));
  };

  const getUnusedSolutions = () => {
    const usedSolutions = Object.values(cityZones).flat();
    return aiSolutions.filter(
      (solution) => !usedSolutions.includes(solution.id)
    );
  };

  const checkAnswers = () => {
    setShowResults(true);

    // ✅ Mark challenge as complete (one-time)
    completeComputersChallenge(0, 2);

    // ✅ Performance Tracking
    const endTime = Date.now();
    const totalSolutionsPlaced = Object.values(cityZones).reduce(
      (total, zone) => total + zone.length,
      0
    );
    const avgResponseTimeSec =
      ((endTime - startTime) / 1000) / Math.max(totalSolutionsPlaced, 1); // avoid division by 0
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Computers",
      topicName: "exploringAITools",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,

    });
    setStartTime(Date.now());

  };


  const getScore = () => {
    let totalCorrect = 0;
    let totalPossible = 0;

    zones.forEach((zone) => {
      totalPossible += zone.correctSolutions.length;
      const userSolutions = cityZones[zone.id] || [];

      zone.correctSolutions.forEach((correctSolution) => {
        if (userSolutions.includes(correctSolution)) {
          totalCorrect++;
        }
      });
    });

    return { correct: totalCorrect, total: totalPossible };
  };

  const resetGame = () => {
    setCityZones({
      schools: [],
      roads: [],
      hospitals: [],
      homes: [],
      shops: [],
    });
    setShowResults(false);
    setStartTime(Date.now());

  };

  const allSolutionsPlaced = getUnusedSolutions().length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-indigo-600 mb-4">
              🎮 CHALLENGE : "Fill My Smart City" 🏙️
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              🎯 <strong>Mission:</strong> Visualize a city run by AI!
            </p>
            <p className="text-md text-gray-600 mt-2">
              AI can make cities safer, cleaner, and easier to live in. Drag AI
              solutions to the right city zones!
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="grid md:grid-cols-2 md:col-span-2 lg:grid-cols-3 gap-4 lg:col-span-3">
            {zones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${zone.bgColor} p-6 rounded-3xl shadow-lg border-4 border-dashed border-gray-300 md:max-h-[330px] lg:max-h-[400px] overflow-y-auto hover:border-yellow-400 transition-all duration-300`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const solutionId = e.dataTransfer.getData("text/plain");
                  if (solutionId && !cityZones[zone.id].includes(solutionId)) {
                    handleDrop(zone.id, solutionId);
                  }
                }}
              >
                <div className="text-center mb-4">
                  <span className="text-6xl mb-2 block">{zone.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {zone.name}
                  </h3>
                </div>

                <div className="min-h-[120px] bg-white/50 rounded-2xl p-4">
                  <p className="text-gray-700 font-medium mb-3 text-center">
                    AI Solutions:
                  </p>
                  <div className="space-y-2">
                    {cityZones[zone.id].map((solutionId) => {
                      const solution = aiSolutions.find(
                        (s) => s.id === solutionId
                      );
                      return (
                        <motion.div
                          key={solutionId}
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/90 p-3 rounded-xl flex items-center justify-between shadow-md"
                        >
                          <div className="flex items-center">
                            <span className="text-xl mr-2">
                              {solution.icon}
                            </span>
                            <div>
                              <span className="text-sm font-bold text-gray-800 block">
                                {solution.name}
                              </span>
                              <span className="text-xs text-gray-600">
                                {solution.description}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeSolution(zone.id, solutionId)}
                            className="text-red-500 hover:text-red-700 font-bold text-lg hover:scale-110 transition-all"
                          >
                            ✕
                          </button>
                        </motion.div>
                      );
                    })}
                    {cityZones[zone.id].length === 0 && (
                      <div className="text-center py-8">
                        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 italic">
                          Drop AI solutions here...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Solutions Toolbox */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl sticky top-4"
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                🛠️ AI Solutions Toolbox
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getUnusedSolutions().map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", solution.id);
                      e.currentTarget.style.opacity = "0.5";
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    className="bg-gradient-to-r from-yellow-200 to-yellow-300 p-4 rounded-xl shadow-md cursor-grab active:cursor-grabbing border-2 border-yellow-400 hover:border-yellow-500 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{solution.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {solution.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {getUnusedSolutions().length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-100 p-6 rounded-xl text-center"
                  >
                    <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                    <p className="text-green-800 font-bold">
                      All solutions placed! 🎉
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Check City Button */}
        <motion.div
          className="text-center mt-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswers}
            disabled={!allSolutionsPlaced}
            className={`px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 ${allSolutionsPlaced
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl hover:shadow-2xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            🏙️ Check My Smart City!
          </motion.button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl mb-8"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                    🏆 Smart City Score: {getScore().correct}/{getScore().total}{" "}
                    Perfect Matches!
                  </h2>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {zones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{zone.icon}</span>
                      <h4 className="font-bold text-gray-800">{zone.name}</h4>
                    </div>

                    <div className="space-y-2">
                      {zone.correctSolutions.map((correctSolutionId) => {
                        const solution = aiSolutions.find(
                          (s) => s.id === correctSolutionId
                        );
                        const userPlaced =
                          cityZones[zone.id].includes(correctSolutionId);

                        return (
                          <div
                            key={correctSolutionId}
                            className={`flex items-center p-2 rounded-lg ${userPlaced
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                              }`}
                          >
                            {userPlaced ? (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-2" />
                            )}
                            <span className="text-sm font-medium">
                              {solution.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-2xl mb-4">
                  <h3 className="text-xl font-bold mb-2">💡 Design Tip:</h3>
                  <p>
                    Great AI solutions include face recognition for school
                    entry, smart bins in public areas, and robo-cleaners in
                    homes!
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl mb-4"
                >
                  <h3 className="text-xl font-bold">
                    🏆 Badge Earned: 🏙️ AI Urban Planner
                  </h3>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🔄 Build Another City
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartCityGame;
