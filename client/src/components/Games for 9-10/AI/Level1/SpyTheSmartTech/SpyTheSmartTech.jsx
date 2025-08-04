import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Trophy,
  Smartphone,
  Camera,
  Volume2,
  Thermometer,
  Battery,
} from "lucide-react";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const SpyTheSmartTech = () => {
  const { completeComputersChallenge } = useComputers();
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [completedRows, setCompletedRows] = useState(new Set());

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const devices = [
    {
      id: "smartwatch",
      name: "Smartwatch",
      feature: "Heart rate alert",
      icon: "⌚",
      correctAnswer: "yes",
      explanation:
        "Uses AI algorithms to analyze heart rate patterns and detect abnormalities!",
    },
    {
      id: "camera",
      name: "Camera Surveillance",
      feature: "Detects suspicious movement",
      icon: "📹",
      correctAnswer: "yes",
      explanation:
        "Uses computer vision AI to recognize and analyze movement patterns!",
    },
    {
      id: "speaker",
      name: "Bluetooth Speaker",
      feature: "Plays music from your phone",
      icon: "🔊",
      correctAnswer: "no",
      explanation:
        "Just receives and plays audio signals - no AI needed for basic playback!",
    },
    {
      id: "thermostat",
      name: "Smart Thermostat",
      feature: "Adjusts temperature automatically",
      icon: "🌡️",
      correctAnswer: "yes",
      explanation:
        "Uses AI to learn your preferences and predict optimal temperature settings!",
    },
    {
      id: "powerbank",
      name: "Power Bank",
      feature: "Charges phone quickly",
      icon: "🔋",
      correctAnswer: "no",
      explanation:
        "Uses electrical circuits for fast charging - no AI intelligence required!",
    },
  ];

  const handleAnswerChange = (deviceId, answer, reason) => {
    setAnswers((prev) => ({
      ...prev,
      [deviceId]: { answer, reason },
    }));

    if (answer && reason) {
      setCompletedRows((prev) => new Set([...prev, deviceId]));
    }
  };

  const checkAnswers = () => {
    setShowResults(true);

    // ✅ Mark challenge as completed
    completeComputersChallenge(0, 0);

    // ✅ Performance tracking
    const endTime = Date.now();
    const totalQuestions = devices.length;
    const correctAnswers = getScore();

    const scaledScore = Math.round((correctAnswers / totalQuestions) * 10); // Score out of 10
    const avgResponseTimeSec = ((endTime - startTime) / 1000) / Math.max(totalQuestions, 1);
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Computers",
      topicName: "exploringAITools",
      score: scaledScore,
      accuracy: ((correctAnswers / totalQuestions) * 100).toFixed(2),
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,

    });
    setStartTime(Date.now());

  };


  const getScore = () => {
    let correct = 0;
    devices.forEach((device) => {
      if (answers[device.id]?.answer === device.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetGame = () => {
    setAnswers({});
    setShowResults(false);
    setCompletedRows(new Set());
    setStartTime(Date.now());

  };

  const allAnswered = devices.every(
    (device) => answers[device.id]?.answer && answers[device.id]?.reason
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
              🎮 CHALLENGE : "Spy the Smart Tech" 🕵️
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              🎯 <strong>Mission:</strong> Track how AI helps modern devices
              work!
            </p>
            <p className="text-md text-gray-600 mt-2">
              Can you spot which gadgets are actually using AI? Fill in the
              table below!
            </p>
          </div>
        </motion.div>

        <div className="block sm:hidden text-center text-sm text-white bg-yellow-500/80 px-4 py-2 rounded-xl mb-4 animate-pulse">
          👉 Swipe right for more columns
        </div>

        {/* Game Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl mb-8"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="p-4 rounded-tl-2xl text-left font-bold text-lg">
                    Device/Tool
                  </th>
                  <th className="p-4 text-left font-bold text-lg">
                    Smart Feature
                  </th>
                  <th className="p-4 text-left font-bold text-lg">Uses AI?</th>
                  <th className="p-4 rounded-tr-2xl text-left font-bold text-lg">
                    Why or Why Not?
                  </th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <motion.tr
                    key={device.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b-2 border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${completedRows.has(device.id) ? "bg-green-50" : ""
                      }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{device.icon}</span>
                        <span className="font-bold text-gray-800 text-lg">
                          {device.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-700 font-medium">
                        {device.feature}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {["yes", "no"].map((option) => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleAnswerChange(
                                device.id,
                                option,
                                answers[device.id]?.reason
                              )
                            }
                            className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${answers[device.id]?.answer === option
                              ? option === "yes"
                                ? "bg-green-500 text-white shadow-lg"
                                : "bg-red-500 text-white shadow-lg"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                          >
                            {option === "yes" ? "✅ Yes" : "❌ No"}
                          </motion.button>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        placeholder="Explain your reasoning..."
                        value={answers[device.id]?.reason || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            device.id,
                            answers[device.id]?.answer,
                            e.target.value
                          )
                        }
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-gray-700"
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Check Answers Button */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswers}
            disabled={!allAnswered}
            className={`px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 ${allAnswered
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl hover:shadow-2xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            🔍 Check My Answers!
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
                    🏆 Results: {getScore()}/{devices.length} Correct!
                  </h2>
                </motion.div>
              </div>

              <div className="space-y-4">
                {devices.map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${answers[device.id]?.answer === device.correctAnswer
                      ? "bg-green-100 border-2 border-green-400"
                      : "bg-red-100 border-2 border-red-400"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg flex items-center">
                        <span className="text-2xl mr-2">{device.icon}</span>
                        {device.name}
                      </span>
                      {answers[device.id]?.answer === device.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <p className="text-gray-700 font-medium">
                      {device.explanation}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl mb-4">
                  <h3 className="text-2xl font-bold mb-4">
                    🧠 Reflection Questions:
                  </h3>
                  <div className="text-left space-y-2">
                    <p>• Which device surprised you the most?</p>
                    <p>• Do you think AI makes devices better? Why?</p>
                    <p>• Can devices be smart without being AI-powered?</p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl mb-4"
                >
                  <h3 className="text-xl font-bold">
                    🏆 Badge Earned: 🕵️ AI Tracker
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

export default SpyTheSmartTech;
