import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import DetectiveAnimation from "@/components/Detective"; // Ensure this is a fun animated component!
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const cases = [
  {
    title: "🏫 Student Council Election",
    scenario:
      "A popular student wins despite less experience, while a more qualified but quiet candidate is ignored.",
    biasOptions: ["Favoritism", "Groupthink", "Stereotyping"],
    correctBias: "Groupthink",
    solution:
      "Encourage debates and clear criteria to avoid decisions based only on popularity."
  },
  {
    title: "🧪 Science Fair Project Selection",
    scenario:
      "Teachers choose boys’ projects more often, assuming they're naturally better at science.",
    biasOptions: ["Favoritism", "Stereotyping", "Groupthink"],
    correctBias: "Stereotyping",
    solution:
      "Use anonymous project submissions and neutral criteria for fair judging."
  },
  {
    title: "🎤 Debate Team Tryouts",
    scenario:
      "Only English-medium students are picked even though others spoke confidently too.",
    biasOptions: ["Stereotyping", "Groupthink", "Favoritism"],
    correctBias: "Favoritism",
    solution:
      "Evaluate based on debating skills, not background or language."
  }
];

const BiasDetectiveGame = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [customSolution, setCustomSolution] = useState("");
  const [showResult, setShowResult] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (current === cases.length) {
      completeLeadershipChallenge(2, 0);
    }

    if (current === cases.length) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "foresight",
        score: Math.round((score / cases.length) * 10),
        accuracy: parseFloat(((score / cases.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / (cases.length * 1000)).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: true,
        
      });
      setStartTime(Date.now());

    }
  }, [current]);


  const handleCheck = () => {
    if (selected === cases[current].correctBias) setScore(score + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelected("");
    setCustomSolution("");
    setShowResult(false);
    setCurrent(current + 1);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected("");
    setCustomSolution("");
    setShowResult(false);
    setStartTime(Date.now());

  };

  if (current === cases.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-pink-100 text-center p-10 font-sans">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-extrabold text-pink-600 mb-4 animate-bounce">
            🏁 All Cases Solved!
          </h1>
          <p className="text-xl text-green-700 font-semibold mb-4">
            You got <span className="text-3xl">{score}/{cases.length}</span> correct 🎯
          </p>
          <p className="text-lg text-gray-600 mb-2">Here’s your reward:</p>
          <h2 className="text-3xl text-yellow-500 font-extrabold animate-pulse">
            🛡️ Truth Defender Badge!
          </h2>
          <motion.button
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-400 hover:to-pink-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 transition-all duration-300 mx-auto"
          >
            <RotateCcw className="w-5 h-5" /> Restart Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 p-6 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto p-6 rounded-[3rem] shadow-2xl bg-white border-4 border-dashed border-pink-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <motion.h1
            className="text-6xl font-black bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
          >
            Bias Detective Mission
          </motion.h1>


          <DetectiveAnimation />

        </motion.div>
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-2xl text-lg font-medium shadow mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="">
            👀 <strong>Detect hidden bias:</strong> Look closely at each school story.
            <br />
            🧠 <strong>Think wisely:</strong> Pick the bias you see—like favoritism or groupthink.
            <br />
            💡 <strong>Learn the solution:</strong> See how to make things fair and kind.
            <br />
            📝 <strong>Your turn:</strong> Share your own smart idea to make the situation better!
          </p>
        </motion.div>


        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl text-center font-extrabold text-indigo-700 mb-2 animate__animated animate__bounceIn"
            animate={{
              scale: [1, 1.05, 1],

            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {cases[current].title}
          </motion.h2>

          <motion.p
            className="text-lg leading-relaxed mb-6 text-gray-800 bg-gradient-to-r from-yellow-100 via-white to-pink-100 p-4 rounded-2xl shadow-inner border-l-4 border-pink-300"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🕵️ {cases[current].scenario}
          </motion.p>


          <div className="grid gap-6 mb-8">
            {cases[current].biasOptions.map((option, idx) => (
              <motion.button
                key={option}
                animate={{

                  boxShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0px 0px 15px rgba(255, 179, 255, 0.6)",
                    "0px 0px 0px rgba(0,0,0,0)",
                  ],
                }}
                transition={{
                  duration: 3 + idx * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`w-full py-3 px-6 rounded-full font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-2
        ${selected === option
                    ? "bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 border-4 border-purple-600 text-purple-900"
                    : "bg-gradient-to-br from-pink-100 to-purple-200 text-purple-800 border-2 border-pink-300"
                  }`}
                onClick={() => setSelected(option)}
                disabled={showResult}
              >
                🌟 {option}
              </motion.button>
            ))}
          </div>




          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-5 rounded-2xl bg-green-50 border border-green-300 text-green-900"
            >
              <p className="font-semibold text-lg">✅ Correct Bias: {cases[current].correctBias}</p>
              <p className="mt-2 mb-3 text-md">💡 AI's Suggested Fix: {cases[current].solution}</p>

              <div className="mt-3">
                <label className="font-semibold text-gray-700 block mb-1">
                  ✍️ Propose Your Inclusive Solution:
                </label>
                <textarea
                  className="w-full p-3 border border-yellow-400 rounded-xl shadow-inner focus:ring-2 focus:ring-pink-300"
                  rows={3}
                  placeholder="Write your idea to make it fair and inclusive..."
                  value={customSolution}
                  onChange={(e) => setCustomSolution(e.target.value)}
                />
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex justify-center">
            {!showResult ? (
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="px-8 py-3 bg-green-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-green-600 transition"
                disabled={!selected}
                onClick={handleCheck}
              >
                ✅ Check Answer
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="px-8 py-3 bg-pink-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-pink-600 transition"
                onClick={handleNext}
              >
                👉 Next Case
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BiasDetectiveGame;
