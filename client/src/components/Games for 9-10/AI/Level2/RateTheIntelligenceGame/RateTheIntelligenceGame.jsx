import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const aiTools = [
  { name: "Calculator", image: "./calculator.jpg" },
  { name: "Google Maps", image: "./google_maps.jpg" },
  { name: "Face Unlock", image: "./face.jpg" },
  { name: "AI Writing Assistant", image: "./ai_writer.jpg" },
  { name: "Counseling Chatbot", image: "./counselling.jpg" },
];

export default function RateTheIntelligenceGame() {
  const { completeComputersChallenge } = useComputers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [stars, setStars] = useState(0);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (submitted) {
      completeComputersChallenge(1, 2);

      const endTime = Date.now();
      const total = aiTools.length;

      const totalStars = ratings.reduce((sum, r) => sum + r.stars, 0);
      const avgStars = totalStars / total;

      const score = Math.round((avgStars / 5) * 10);
      const accuracy = Math.round((avgStars / 5) * 100);
      const avgResponseTimeSec = ((endTime - startTime) / 1000) / total;
      const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

      updatePerformance({
        moduleName: "Computers",
        topicName: "understandingAIPerformance",
        score,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes,
        completed: true,

      });
      setStartTime(Date.now());

    }
  }, [submitted]);


  const handleRestart = () => {
    setStars(0);
    setCurrentIndex(0);
    setRatings([]);
    setReason("");
    setSubmitted(false);
    setStartTime(Date.now());

  };


  const currentTool = aiTools[currentIndex];

  const handleNext = () => {
    const newRating = {
      tool: currentTool.name,
      emoji: currentTool.emoji,
      stars,
      reason,
    };
    setRatings([...ratings, newRating]);
    setStars(0);
    setReason("");
    if (currentIndex < aiTools.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center px-6 py-10 max-w-3xl mx-auto bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 rounded-3xl shadow-2xl border-4 border-yellow-400">
        <Confetti numberOfPieces={300} />
        <motion.h1
          className="text-5xl font-black text-yellow-500 mb-6 drop-shadow-[0_2px_8px_rgba(255,255,0,0.4)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        >
          <motion.span
            animate={{
              scale: [1, 1.1, 1],
              textShadow: [
                "0px 0px 0px #fff",
                "0px 0px 10px #ffeb3b",
                "0px 0px 20px #ffeb3b",
                "0px 0px 10px #ffeb3b",
                "0px 0px 0px #fff",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            🌟Rate the Intelligence🌟
          </motion.span>
        </motion.h1>
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 drop-shadow-md mb-4">
          🎓 Your AI IQ Ratings!
        </h2>

        <motion.p
          className="text-xl text-green-200 mb-8 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🏆 You've earned the badge:{" "}
          <span className="text-3xl animate-pulse text-yellow-300">🌟 AI IQ Rater!</span>
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {ratings.map((r, idx) => (
            <motion.div
              key={idx}
              className="bg-white/90 p-5 rounded-xl border-4 border-purple-200 shadow-[0_5px_25px_rgba(0,0,0,0.15)] backdrop-blur-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <p className="text-xl font-bold text-purple-700 mb-1">
                {r.emoji} {r.tool}
              </p>
              <p className="text-yellow-500 font-semibold">⭐ Rating: {r.stars} / 5</p>
              <p className="text-gray-800 mt-2">💡 Why: {r.reason}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-xl hover:from-yellow-300 hover:to-purple-500 transition-all duration-300"
          >
            🔁 Start Over
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center px-6 py-10 max-w-3xl mx-auto bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 rounded-3xl shadow-2xl border-4 border-yellow-400">
      <motion.h1
        className="text-5xl font-black text-yellow-500 mb-6 drop-shadow-[0_2px_8px_rgba(255,255,0,0.4)]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        <motion.span
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              "0px 0px 0px #fff",
              "0px 0px 10px #ffeb3b",
              "0px 0px 20px #ffeb3b",
              "0px 0px 10px #ffeb3b",
              "0px 0px 0px #fff",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          🌟Rate the Intelligence🌟
        </motion.span>
      </motion.h1>



      <motion.p
        className="text-xl sm:text-2xl font-semibold text-yellow-200 drop-shadow-md mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span className="animate-bounce inline-block">🧠</span> <span className="text-pink-300">How smart</span> is this AI?{" "}
        <span className="animate-bounce inline-block">✨</span>
      </motion.p>



      <div className="relative text-center mb-10">
        <motion.img
          key={currentTool.name}
          src={currentTool.image}
          alt={currentTool.name}
          className="h-40 w-auto object-contain mx-auto mb-6 rounded-3xl border-4 border-yellow-200 shadow-2xl drop-shadow-[0_0_15px_rgba(255,221,0,0.7)] bg-white  "
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />

        <motion.p
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 drop-shadow-[0_0_10px_rgba(255,200,0,0.7)] pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          ✨ {currentTool.name} ✨
        </motion.p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setStars(star)}
            className={`relative text-5xl transition-transform duration-300 transform hover:scale-125 ${stars >= star ? "text-yellow-400 drop-shadow-glow" : "text-gray-300"
              }`}
          >
            <span className="z-10 relative">★</span>
            {stars >= star && (
              <motion.div
                className="absolute inset-0 bg-yellow-200 rounded-full opacity-30 blur-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1.4 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative mb-10">
        <div className="absolute -top-3 -right-3 animate-ping">
          <span className="text-yellow-400 text-2xl">✨</span>
        </div>

        <textarea
          className="w-full p-4 rounded-2xl border-2 border-pink-400 shadow-[inset_0_4px_10px_rgba(255,192,203,0.3)] text-base text-purple-800 font-semibold bg-gradient-to-br from-white via-pink-50 to-purple-50 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300"
          rows={4}
          placeholder="💬 Share your smart thoughts here... Why did you give this rating?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.08, rotate: [0, 1.5, -1.5, 0] }}
          whileTap={{ scale: 0.95 }}
          disabled={stars === 0 || reason.length < 5}
          onClick={handleNext}
          className={`relative px-8 py-4 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 text-white text-lg font-bold rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ${stars === 0 || reason.length < 5 ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
            }`}
        >
          <span className="inline-block animate-bounce">✅</span> Next
          <span className="absolute -top-2 -right-2 text-pink-200 animate-pulse">🌟</span>
        </motion.button>
      </div>

    </div>
  );
}
