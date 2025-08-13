import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const candidates = [
  {
    id: "a",
    name: "Candidate A",
    video: "./nervous.mp4",
    correctLabels: ["Nervous or unsure", "Disinterested"],
  },
  {
    id: "b",
    name: "Candidate B",
    video: "./confident.mp4",

    correctLabels: ["Engaged and confident", "Friendly and warm"],
  },
  {
    id: "c",
    name: "Candidate C",
    video: "./aggressive.mp4",
    correctLabels: ["Overpowering or aggressive", "Engaged and confident"],
  },
];

const labelOptions = [
  "Nervous or unsure",
  "Engaged and confident",
  "Overpowering or aggressive",
  "Disinterested",
  "Friendly and warm",
];

export default function BodyLanguageGame() {
  const { completeCommunicationChallenge } = useCommunication();
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({});
  const [showGame, setShowGame] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleDrop = (candidateId, label) => {
    if (submitted) return;
    setSelections((prev) => {
      const current = prev[candidateId] || [];
      if (current.includes(label) || current.length >= 2) return prev;
      return {
        ...prev,
        [candidateId]: [...current, label],
      };
    });
  };

  const handleDragStart = (e, label) => {
    e.dataTransfer.setData("label", label);
  };

  const checkAnswers = () => {
    const res = {};
    let allCorrect = true;

    candidates.forEach(({ id, correctLabels }) => {
      const userLabels = selections[id] || [];
      const correct = userLabels.filter((l) => correctLabels.includes(l));
      const isCorrect = correct.length === 2;

      if (!isCorrect) allCorrect = false;

      res[id] = {
        correct: isCorrect,
      };
    });

    setResult(res);
    setSubmitted(true);

    if (allCorrect) {
      toast.success("🎉 Great job! You decoded all signals correctly!");
      completeCommunicationChallenge(0, 0);

      // ✅ Performance tracking
      const endTime = Date.now();
      const totalTimeSec = Math.floor((endTime - startTime) / 1000);
      const studyTimeMinutes = Math.max(1, Math.round(totalTimeSec / 60));

      const numberOfCandidates = candidates.length; // = 3
      const avgResponseTimeSec = Math.floor(totalTimeSec / numberOfCandidates);

      const accuracy = 100;
      const finalScore = 10;
      updatePerformance({
        moduleName: "Communication",
        topicName: "situationalAwareness",
        completed: true,
        studyTimeMinutes,
        avgResponseTimeSec,
        score: finalScore,
        accuracy,
      });
    }
  };

  const resetGame = () => {
    setSelections({});
    setResult({});
    setSubmitted(false);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
      {!showGame ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center p-10 rounded-[3rem] shadow-2xl border-[6px] border-white bg-gradient-to-br from-sky-100 via-white to-rose-100 relative overflow-hidden"
        >
          {/* 🎈 Floating Emojis */}
          <motion.div
            className="absolute top-4 left-6 text-3xl animate-bounce-slow"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🎈
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-8 text-3xl animate-pulse"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            💬
          </motion.div>

          <motion.h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 drop-shadow mb-2 pb-4 tracking-wide"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            🧠 Decode the Signal!
          </motion.h1>

          <motion.div
            className="absolute top-4 right-6 text-3xl animate-bounce-slow"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🎈
          </motion.div>

          <p className="text-xl text-purple-800 font-medium mb-6 leading-relaxed">
            You're shadowing a mentor during a{" "}
            <span className="text-pink-600 font-semibold">
              campus internship interview
            </span>
            .
            <br />
            Your mission: Identify what each candidate’s{" "}
            <strong>body language</strong> is really saying! 🕵️‍♀️
          </p>

          <div className="bg-white/70 border-2 border-dashed border-purple-300 rounded-xl shadow-md p-6 text-purple-800 text-base md:text-lg font-semibold space-y-2">
            ✅ <strong>Your Task:</strong> <br />
            🎥 Watch each candidate’s body language. <br />
            🧩 Drag & drop the best labels to their video. <br />
            📌 Each candidate has <strong>2 correct labels</strong>. <br />
            🔄 Labels may apply to more than one candidate.
          </div>

          <motion.button
            onClick={() => setShowGame(true)}
            className="mt-10 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-extrabold px-10 py-4 rounded-full text-xl shadow-xl tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            🎮 Start Game
          </motion.button>
        </motion.div>
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
            <div className="text-center max-w-3xl mx-auto mb-3">
              <motion.h1
                className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 drop-shadow   pb-4 tracking-wide"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                🧠 Decode the Signal!
              </motion.h1>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {candidates.map((c, index) => (
                <motion.div
                  key={c.id}
                  whileHover={{ scale: 1.02 }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const label = e.dataTransfer.getData("label");
                    if (label) handleDrop(c.id, label);
                  }}
                  className="bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 
rounded-[2rem] shadow-[0_8px_16px_rgba(0,0,0,0.15)] 
border-4 border-purple-700 
p-5 text-center flex flex-col justify-between transition-all duration-300"
                >
                  {/* 🎥 Video */}
                  <div className="relative">
                    <video
                      src={c.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="rounded-2xl w-full h-64 object-contain mb-4 bg-black border-4 border-purple-300"
                    />
                  </div>

                  {/* 🧑‍💼 Name & Description */}
                  <h2 className="text-2xl font-extrabold text-purple-800 mb-1  ">
                    🧑‍💼 {c.name}
                  </h2>

                  {/* 🎯 Drop Zone */}
                  <div className="bg-white/80 border-dashed border-4 border-purple-300 rounded-xl min-h-[90px] flex flex-wrap justify-center items-center gap-3 p-3 shadow-inner transition hover:shadow-purple-300 animate-in fade-in duration-500">
                    {(selections[c.id] || []).length === 0 ? (
                      <p className="text-purple-400 text-sm font-semibold animate-pulse">
                        🧩 Drag a label here!
                      </p>
                    ) : (
                      (selections[c.id] || []).map((label) => (
                        <motion.span
                          key={label}
                          whileHover={{ scale: 1.1 }}
                          className="bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-200 border border-purple-400 text-purple-900 font-bold text-sm px-4 py-1 rounded-full shadow-md transition-all duration-200"
                        >
                          🎈 {label}
                        </motion.span>
                      ))
                    )}
                  </div>

                  {/* 🎉 Feedback */}
                  {submitted && (
                    <div className="mt-4 text-lg font-bold">
                      {result[c.id]?.correct ? (
                        <motion.p
                          className="text-green-600 animate-bounce"
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          🏆 Yay! That’s Right!
                        </motion.p>
                      ) : (
                        <motion.p
                          className="text-red-500 animate-shake"
                          transition={{ type: "spring", stiffness: 150 }}
                        >
                          😕 Oops! Try Again
                        </motion.p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* 🧠 Section Title */}
            <motion.h3
              className="text-center text-3xl md:text-4xl mt-12 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-md tracking-widest select-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              🧩 Let’s Pick the Clues!
            </motion.h3>

            {/* 🕵️‍♀️ Subtext */}
            <motion.p
              className="text-center text-purple-700 text-lg md:text-xl mt-2 mb-5 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Drag and drop the best-fitting label onto each candidate’s card
              and also there are more than one correct option in each case. Use
              your inner detective! 🕵️‍♀️
            </motion.p>

            {/* 🎈 Label Options */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-4 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            >
              {labelOptions.map((label, index) => (
                <motion.div
                  key={label}
                  draggable
                  onDragStart={(e) => handleDragStart(e, label)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="bg-gradient-to-r from-pink-300 via-yellow-200 to-purple-200 text-purple-900 font-bold px-5 py-2 rounded-full shadow-xl text-base cursor-grab border-2 border-purple-400 hover:rotate-1 transition-transform duration-300"
                >
                  🎈 {label}
                </motion.div>
              ))}
            </motion.div>

            {/* Submit & Retry Buttons */}
            <div className="text-center mt-8 space-x-4">
              <motion.button
                className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-md text-lg transition-all duration-300"
                onClick={checkAnswers}
                disabled={submitted}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                🚀 Submit Answers
              </motion.button>

              {submitted && (
                <motion.button
                  className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-md text-lg transition-all duration-300"
                  onClick={resetGame}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  🔁 Try Again
                </motion.button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
