// AI Problem Solver Game with Drag-and-Drop + Clickable Tools + Story Cards + Reflection Input
import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { useComputers } from "@/contexts/ComputersContext";
import { Link } from "react-router-dom";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const problems = [
  {
    id: 1,
    title: "📚 School Problem",
    description: "Students struggle with math homework",
    solution: null,
  },
  {
    id: 2,
    title: "🏠 Home Problem",
    description: "Elderly grandparents feel lonely",
    solution: null,
  },
  {
    id: 3,
    title: "🏙️ Community Problem",
    description: "Traffic jams in the city",
    solution: null,
  },
];

const aiTools = [
  { id: "mathbot", icon: "📐", label: "Math Bot" },
  { id: "chatbuddy", icon: "🗣️", label: "Chat Buddy" },
  { id: "smarttraffic", icon: "🚦", label: "Smart Traffic AI" },
];

const toolHelps = {
  mathbot: "Helps students solve problems step-by-step and learn concepts.",
  chatbuddy: "Keeps elderly company through conversation and reminders.",
  smarttraffic: "Uses sensors and AI predictions to reduce congestion.",
};

export default function AIProblemSolverGame() {
  const { completeComputersChallenge } = useComputers();
  const [assignedTools, setAssignedTools] = useState({});
  const [howItHelps, setHowItHelps] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);


  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());


  const handleAssign = (problemId) => {
    if (!selectedTool) return;

    // Prevent wrong assignments
    const validAssignments = {
      1: "mathbot",
      2: "chatbuddy",
      3: "smarttraffic",
    };

    if (validAssignments[problemId] !== selectedTool.id) {
      alert("🚫 Oops! That tool doesn't solve this problem. Try a better one!");
      return;
    }

    setAssignedTools((prev) => ({ ...prev, [problemId]: selectedTool }));
    setHowItHelps((prev) => ({ ...prev, [problemId]: "" }));
    setSelectedTool(null);
  };

  const handleChangeHelp = (e, problemId) => {
    setHowItHelps((prev) => ({ ...prev, [problemId]: e.target.value }));
  };

  const handleSubmit = () => {
    const allAssigned = Object.keys(assignedTools).length === problems.length;
    const allHelpFilled = problems.every(
      (p) => howItHelps[p.id]?.trim().length > 0
    );

    if (allAssigned && allHelpFilled) {
      setSubmitted(true);
      completeComputersChallenge(1, 2); // ✅ Mark task as complete

      const endTime = Date.now();
      const totalSeconds = Math.floor((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "Computers",
        topicName: "foundationsOfAIIntelligence",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: totalSeconds / problems.length,
        studyTimeMinutes: totalSeconds / 60,
        completed: true,

      });
      setStartTime(Date.now());
    } else {
      alert("Please assign a tool AND fill how it helps for every problem.");
    }
  };


  return (
    <div className="p-6 max-w-6xl mx-auto text-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 min-h-screen rounded-xl shadow-2xl">
      {submitted && <Confetti />}
      <motion.h1
        className="text-6xl font-black text-purple-800 mb-6 drop-shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: [0, -20, 0],
          opacity: 1,
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        🧠✨ AI Problem Solver! 🛠️🤩
      </motion.h1>

      <motion.p
        className="text-xl mb-10 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center text-xl text-gray-800 gap-3 mb-8">
          <MousePointerClick className="w-6 h-6 text-purple-600" />
          <span>Click an AI buddy</span>
          <ArrowRight className="w-5 h-5 text-pink-500" />
          <span>Click a problem that AI buddy solves</span>
          <ArrowRight className="w-5 h-5 text-blue-500" />
          <span>Explain how the AI helps</span>
        </div>
      </motion.p>

      <div className="flex justify-center gap-8 mb-10 flex-wrap">
        {aiTools.map((tool) => (
          <motion.div
            key={tool.id}
            className={`cursor-pointer p-4 rounded-2xl shadow-xl text-5xl border-4 transition-all duration-300 text-center w-40 h-40 flex flex-col justify-center items-center font-bold ${selectedTool?.id === tool.id
              ? "bg-green-300 border-green-600 scale-110"
              : "bg-white border-gray-300 hover:scale-105"
              }`}
            onClick={() => setSelectedTool(tool)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-6xl">{tool.icon}</div>
            <div className="text-lg mt-2">{tool.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problems.map((problem) => (
          <motion.div
            key={problem.id}
            className={`bg-white p-6 rounded-3xl border-4 shadow-xl text-left transition duration-300 hover:shadow-2xl ${assignedTools[problem.id]
              ? "border-green-400 bg-green-50"
              : "border-yellow-300"
              }`}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleAssign(problem.id)}
          >
            <motion.h2
              className="text-2xl font-extrabold text-blue-700 mb-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="whitespace-nowrap">{problem.title}</span>
            </motion.h2>
            <p className="text-lg mb-4 italic text-gray-800">
              🧐 {problem.description}
            </p>
            {assignedTools[problem.id] ? (
              <>
                <div className="text-xl mt-4 bg-green-100 p-2 rounded-lg">
                  ✅ You picked:{" "}
                  <strong>
                    {assignedTools[problem.id].icon}{" "}
                    {assignedTools[problem.id].label}
                  </strong>
                </div>
                <textarea
                  className="mt-4 w-full p-3 rounded-lg border-2 border-dashed border-gray-400"
                  placeholder="💭 Hmm... How does this AI work its magic?"
                  value={howItHelps[problem.id] || ""}
                  onChange={(e) => handleChangeHelp(e, problem.id)}
                />
              </>
            ) : (
              <p className="italic text-gray-500">
                🖱️ Click to let an AI buddy jump in!
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-10 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-2xl shadow-lg transition transform hover:scale-105"
        >
          🎉 Submit Solutions
        </button>
      )}

      {submitted && (
        <>
          <motion.div
            className="mt-10 bg-yellow-50 p-8 rounded-3xl border-4 border-fuchsia-400 shadow-xl animate-pulse"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-black text-emerald-600 mb-6 animate-bounce">
              🏅 Woohoo! You’re officially an AI Problem Solver Wizard! 🧙‍♂️✨
            </h2>
            <p className="text-xl text-gray-700 mb-6 font-semibold">
              Let’s see how your AI squad tackled these brain-bending missions:
            </p>
            <ul className="text-left text-lg space-y-6">
              {problems.map((problem) => (
                <li
                  key={problem.id}
                  className="bg-white p-4 rounded-xl shadow-lg border border-gray-300"
                >
                  <strong className="text-2xl">{problem.title}</strong> —{" "}
                  {problem.description} <br />
                  🤖 <span className="font-bold">AI Tool Deployed:</span>{" "}
                  {assignedTools[problem.id].icon}{" "}
                  {assignedTools[problem.id].label}
                  <br />
                  💬 <span className="font-bold">Your Genius Reason:</span>{" "}
                  {howItHelps[problem.id]} <br />
                  🎯 <span className="font-bold">AI’s Secret Sauce:</span>{" "}
                  {toolHelps[assignedTools[problem.id].id]}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-8 text-center">
            <Link to="/ai-ethics-detective">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-6 py-3 text-xl rounded-full shadow-md transition transform hover:scale-105">
                🚀 Move to Next Game
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
