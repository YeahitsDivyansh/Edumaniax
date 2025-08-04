import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Trophy,
  Stethoscope,
  GraduationCap,
  Wheat,
  Car,
  ShoppingCart,
  MessageCircle,
  Droplets,
  Scan,
  Zap,
  Star,
  RotateCcw,
} from "lucide-react";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const WhichAIDoesWhat = () => {
  const { completeComputersChallenge } = useComputers();
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const professions = [
    {
      id: "doctor",
      name: "Doctor",
      icon: "👨‍⚕️",
      color: "from-red-400 to-pink-500",
      correctMatches: ["medical-scanner"],
    },
    {
      id: "teacher",
      name: "Teacher",
      icon: "👩‍🏫",
      color: "from-blue-400 to-indigo-500",
      correctMatches: ["chatbot", "exam-grader"],
    },
    {
      id: "farmer",
      name: "Farmer",
      icon: "👨‍🌾",
      color: "from-green-400 to-emerald-500",
      correctMatches: ["irrigation-sensor"],
    },
    {
      id: "traffic-police",
      name: "Traffic Police",
      icon: "👮‍♂️",
      color: "from-yellow-400 to-orange-500",
      correctMatches: ["traffic-system"],
    },
    {
      id: "shop-owner",
      name: "Shop Owner",
      icon: "👨‍💼",
      color: "from-purple-400 to-violet-500",
      correctMatches: ["recommendation-engine"],
    },
  ];

  const aiTools = [
    {
      id: "chatbot",
      name: "AI Chatbot for student queries",
      icon: "💬",
      description: "Answers student questions 24/7",
    },
    {
      id: "irrigation-sensor",
      name: "Smart irrigation sensor",
      icon: "🌱",
      description: "Monitors soil and waters crops automatically",
    },
    {
      id: "medical-scanner",
      name: "Medical image scanner",
      icon: "🏥",
      description: "Detects diseases in X-rays and scans",
    },
    {
      id: "traffic-system",
      name: "Dynamic traffic signal system",
      icon: "🚦",
      description: "Changes lights based on traffic flow",
    },
    {
      id: "recommendation-engine",
      name: "Recommendation engine",
      icon: "🛒",
      description: "Suggests products customers might like",
    },
    {
      id: "exam-grader",
      name: "Online exam grader",
      icon: "📝",
      description: "Automatically grades tests and assignments",
    },
  ];

  const handleDrop = (professionId, toolId) => {
    setMatches((prev) => ({
      ...prev,
      [professionId]: [...(prev[professionId] || []), toolId],
    }));
  };

  const removeMatch = (professionId, toolId) => {
    setMatches((prev) => ({
      ...prev,
      [professionId]: (prev[professionId] || []).filter((id) => id !== toolId),
    }));
  };
  const checkAnswers = () => {
    setShowResults(true);
    completeComputersChallenge(0, 1); // ✅ Mark challenge complete

    // ✅ Performance tracking
    const endTime = Date.now();
    const { correct, total } = getScore();

    const scaledScore = Math.round((correct / total) * 10); // Score out of 10
    const accuracy = Math.round((correct / total) * 100); // Accuracy in %
    const avgResponseTimeSec = ((endTime - startTime) / 1000) / Math.max(total, 1);
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Computers",
      topicName: "exploringAITools",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,

    });
    setStartTime(Date.now());

  };


  const getScore = () => {
    let totalCorrect = 0;
    let totalPossible = 0;

    professions.forEach((profession) => {
      totalPossible += profession.correctMatches.length;
      const userMatches = matches[profession.id] || [];

      profession.correctMatches.forEach((correctMatch) => {
        if (userMatches.includes(correctMatch)) {
          totalCorrect++;
        }
      });
    });

    return { correct: totalCorrect, total: totalPossible };
  };

  const resetGame = () => {
    setMatches({});
    setShowResults(false);
    setStartTime(Date.now());

  };

  const getUnusedTools = () => {
    const usedTools = Object.values(matches).flat();
    return aiTools.filter((tool) => !usedTools.includes(tool.id));
  };

  const allToolsAssigned = getUnusedTools().length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-bold  text-indigo-600 mb-4">
              🎮 CHALLENGE : "Which AI Does What?" 🧰
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              🎯 <strong>Mission:</strong> Discover how AI helps in real jobs!
            </p>
            <p className="text-md text-gray-600 mt-2">
              Match each profession with the correct AI tools. Drag and drop to
              make matches!
            </p>
          </div>
        </motion.div>
        <div className="block md:hidden text-center text-sm text-white bg-yellow-500/80 px-4 py-2 rounded-xl mb-4 animate-pulse">
          👉 Swipe right to see AI Tools
        </div>

        <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-2 gap-8">
          {/* Professions Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-[85vw] md:min-w-0 md:col-span-2 lg:col-span-1 p-3"
          >
            <h2 className="text-2xl text-center font-bold text-white  mb-6 bg-black/20 rounded-2xl flex items-center justify-center p-4">
              👥 Professions
            </h2>

            <div className="max-h-[80vh] space-y-4 overflow-y-auto">
              {professions.map((profession, index) => (
                <motion.div
                  key={profession.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${profession.color} p-6 rounded-2xl shadow-lg`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const toolId = e.dataTransfer.getData("text/plain");
                    if (
                      toolId &&
                      !(matches[profession.id] || []).includes(toolId)
                    ) {
                      handleDrop(profession.id, toolId);
                    }
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">{profession.icon}</span>
                    <h3 className="text-xl font-bold text-white">
                      {profession.name}
                    </h3>
                  </div>

                  <div className="min-h-[100px] bg-white/20 rounded-xl p-3">
                    <p className="text-white font-medium mb-2">
                      AI Tools Matched:
                    </p>
                    <div className=" space-y-2">
                      {(matches[profession.id] || []).map((toolId) => {
                        const tool = aiTools.find((t) => t.id === toolId);
                        return (
                          <motion.div
                            key={toolId}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white/90 p-2 rounded-lg flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{tool.icon}</span>
                              <span className="text-sm font-medium text-gray-800">
                                {tool.name}
                              </span>
                            </div>
                            <button
                              onClick={() => removeMatch(profession.id, toolId)}
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              ✕
                            </button>
                          </motion.div>
                        );
                      })}
                      {(matches[profession.id] || []).length === 0 && (
                        <p className="text-white/80 italic">
                          Drop AI tools here...
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Tools Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-[85vw] md:min-w-0 md:col-span-1 lg:col-span-1 p-3"
          >
            <h2 className="text-2xl flex items-center justify-center font-bold text-white text-center mb-6 bg-black/20 rounded-2xl p-4">
              🤖 AI Tools
            </h2>

            <div className="grid gap-4 max-h-[80vh] overflow-y-auto">
              {getUnusedTools().map((tool, index) => (
                <div className="w-[90%] mx-auto lg:w-[100%]">
                  <div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 1.1, rotate: 5 }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragStart={(e) => {
                      setDraggedItem(tool.id);
                      e.dataTransfer.setData("text/plain", tool.id);
                    }}
                    onDragEnd={() => setDraggedItem(null)}
                    draggable
                    className="bg-white/90 w-full backdrop-blur-sm p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-yellow-300 transition-all duration-300"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{tool.icon}</span>
                      <h4 className="font-bold text-gray-800">{tool.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
              ))}

              {getUnusedTools().length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 p-6 rounded-xl text-center"
                >
                  <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                  <p className="text-green-800 font-bold">
                    All tools assigned! 🎉
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Check Answers Button */}
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
            disabled={!allToolsAssigned}
            className={`px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 ${allToolsAssigned
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl hover:shadow-2xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            🔍 Check My Matches!
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
                    🏆 Results: {getScore().correct}/{getScore().total} Correct
                    Matches!
                  </h2>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {professions.map((profession, index) => (
                  <motion.div
                    key={profession.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{profession.icon}</span>
                      <h4 className="font-bold text-gray-800">
                        {profession.name}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {profession.correctMatches.map((correctToolId) => {
                        const tool = aiTools.find(
                          (t) => t.id === correctToolId
                        );
                        const userMatched = (
                          matches[profession.id] || []
                        ).includes(correctToolId);

                        return (
                          <div
                            key={correctToolId}
                            className={`flex items-center p-2 rounded-lg ${userMatched
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                              }`}
                          >
                            {userMatched ? (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-2" />
                            )}
                            <span className="text-sm font-medium">
                              {tool.name}
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
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl mb-4">
                  <h3 className="text-xl font-bold mb-2">🧩 Bonus Insight:</h3>
                  <p>
                    Many industries use <strong>Narrow AI</strong>, which means
                    it's designed for only one smart task!
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl mb-4"
                >
                  <h3 className="text-xl font-bold">
                    🏆 Badge Earned: 🧰 AI WorkBuddy
                  </h3>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🔄 Play Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhichAIDoesWhat;
