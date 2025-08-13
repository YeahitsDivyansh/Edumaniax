// PersuasionGame.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // npm install framer-motion
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const PersuasionGame = () => {
  const data = {
    scenario: "Convince your school to allow an extra sports period.",
    openings: [
      "I believe an extra sports period would benefit all students.",
      "We should have more fun. Period.",
      "If we don’t get this, we’ll protest!",
    ],
    reasons: [
      "It improves focus and fitness.",
      "We can burn energy in a healthy way.",
      "It’s more fun than math.",
    ],
    slogans: ["Sweat Today, Succeed Tomorrow!", "Brain Boost = Sports Dose"],
    correctCombo: {
      opening: "I believe an extra sports period would benefit all students.",
      reasons: [
        "It improves focus and fitness.",
        "We can burn energy in a healthy way.",
      ],
      slogan: "Sweat Today, Succeed Tomorrow!",
    },
  };
  const { completeCommunicationChallenge } = useCommunication();
  const [step, setStep] = useState(1);
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedSlogan, setSelectedSlogan] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  // ✅ for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const [isCorrect, setIsCorrect] = useState(false);

  const handleReasonClick = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : prev.length < 2
          ? [...prev, reason]
          : prev
    );
  };
  //for performance
  const calculateScore = () => {
    let score = 0;

    if (selectedOpening === data.correctCombo.opening) {
      score += 3;
    }

    const correctReasons = data.correctCombo.reasons;
    correctReasons.forEach((reason) => {
      if (selectedReasons.includes(reason)) {
        score += 2.5;
      }
    });

    if (selectedSlogan === data.correctCombo.slogan) {
      score += 2;
    }

    return Math.round(score * 10) / 10; // round to 1 decimal
  };

  //for performance
  const handleSubmit = () => {
    setSubmitted(true);

    const finalScore = calculateScore(); // out of 10
    const accuracy = (finalScore / 10) * 100;

    const endTime = Date.now();
    const totalTimeSec = (endTime - startTime) / 1000;
    const avgResponseTimeSec = totalTimeSec / 3;

    const studyTimeMinutes = Math.max(1, Math.round((endTime - startTime) / 60000));

    updatePerformance({
      moduleName: "Communication",
      topicName: "interpersonalSkills",
      completed: true,
      studyTimeMinutes,
      avgResponseTimeSec, // ✅ simplified
      score: finalScore,
      accuracy,

    });
    setStartTime(Date.now());

    setScore(finalScore);

    if (finalScore === 10) {
      completeCommunicationChallenge(0, 2); // Only if fully correct
    }

    const audio = new Audio(
      finalScore === 10
        ? "https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.wav"
        : "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.wav"
    );
    audio.play();
  };



  const resetGame = () => {
    setStep(1);
    setSelectedOpening(null);
    setSelectedReasons([]);
    setSelectedSlogan(null);
    setSubmitted(false);
    setStartTime(Date.now());
  };

  return (
    <div className="py-8 px-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 min-h-screen text-center space-y-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-4 animate-pulse">
        🎯 Persuasive Speaking
      </h1>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-2xl space-y-6">
        {/* Progress Bar */}
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-2 flex-1 mx-1 rounded-full ${step === n || (submitted && n === 4)
                ? "bg-green-500"
                : "bg-gray-300"
                }`}
            ></div>
          ))}
        </div>

        <AnimatePresence>
          {!submitted ? (
            <>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-semibold mb-2">Scenario:</p>
                  <p className="text-gray-700 mb-4">{data.scenario}</p>
                  <p className="font-semibold mb-2">1️⃣ Choose your opening:</p>
                  <div className="flex flex-col gap-3">
                    {data.openings.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedOpening(opt);
                          setStep(2);
                        }}
                        className={`px-4 py-2 border rounded transition ${selectedOpening === opt
                          ? "bg-blue-300 font-bold"
                          : "bg-white hover:bg-blue-100"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-semibold mb-2">2️⃣ Choose 2 reasons:</p>
                  <div className="flex flex-col gap-3">
                    {data.reasons.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => handleReasonClick(reason)}
                        className={`px-4 py-2 border rounded transition ${selectedReasons.includes(reason)
                          ? "bg-green-300 font-bold"
                          : "bg-white hover:bg-green-100"
                          }`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                  {selectedReasons.length === 2 && (
                    <button
                      onClick={() => setStep(3)}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                      ➡️ Next
                    </button>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-semibold mb-2">3️⃣ Choose your slogan:</p>
                  <div className="flex flex-col gap-3">
                    {data.slogans.map((slogan) => (
                      <button
                        key={slogan}
                        onClick={() => setSelectedSlogan(slogan)}
                        className={`px-4 py-2 border rounded transition ${selectedSlogan === slogan
                          ? "bg-purple-300 font-bold"
                          : "bg-white hover:bg-purple-100"
                          }`}
                      >
                        {slogan}
                      </button>
                    ))}
                  </div>
                  {selectedSlogan && (
                    <button
                      onClick={handleSubmit}
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                      ✅ Submit
                    </button>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={`p-3 rounded-lg text-white font-semibold text-center ${isCorrect ? "bg-green-600" : "bg-red-500"
                  }`}
              >
                {isCorrect
                  ? "🎉 Congrats! You are good at persuading!"
                  : "❌ You can do better, please try again."}
              </div>

              <div className="mt-4 flex justify-center">
                <img
                  src={
                    isCorrect
                      ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWQ2ZXY1ZHB4YmVmcGxyc2VhcXN5ajdmejFla2FpaXRocnFubnN3bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5GoVLqeAOo6PK/giphy.gif"
                      : "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExemV2OG40ZmszZWcybmY0NnplcnRqa2x2bW5reXI2cnFxeXJlNWI5YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2JehQ2GitHGdVG9y/giphy.gif"
                  }
                  alt={isCorrect ? "Congrats" : "Try again"}
                  className="w-64 h-auto rounded-lg shadow-md transition-transform duration-700 hover:scale-105"
                />
              </div>

              <p className="text-lg mt-4 text-purple-700 font-bold">
                🏆 Your Persuasion Points: {score}
              </p>

              <button
                onClick={resetGame}
                className="mt-6 bg-purple-500 text-white py-2 px-6 rounded hover:bg-purple-600 transition"
              >
                🔄 Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PersuasionGame;
