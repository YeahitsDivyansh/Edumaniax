import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Smile, Video, RotateCcw } from "lucide-react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const steps = ["Problem", "Prototype", "Pitch"];

const problems = [
  "Too much school stress",
  "Classroom waste",
  "Miscommunication with teachers",
  "Long assembly time",
];

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { label: "Problem", emoji: "🧠" },
    { label: "Prototype", emoji: "🛠️" },
    { label: "Pitch", emoji: "🎤" },
  ];

  return (
    <div className="flex justify-center gap-6 mb-10">
      {steps.map((step, index) => {
        const isActive = currentStep === index;

        return (
          <div key={step.label} className="flex flex-col items-center relative">
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold shadow-xl transition-all duration-500 
              ${isActive
                  ? "bg-gradient-to-r from-pink-400 to-yellow-300 text-white scale-110 animate-bounce"
                  : "bg-gray-200 text-gray-400"
                }`}
            >
              {step.emoji}
            </div>
            <span
              className={`mt-2 text-sm font-semibold transition-colors duration-300 
              ${isActive ? "text-orange-600" : "text-gray-500"}`}
            >
              {step.label}
            </span>

            {/* Glowing ring effect on active step */}
            {isActive && (
              <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-4 border-pink-300 animate-ping opacity-50" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const InnovationLaunchpadGame = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [prototypeIdea, setPrototypeIdea] = useState("");
  const [pitchSummary, setPitchSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (submitted) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "innovativeLeader",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: parseFloat((totalTimeMs / (steps.length * 1000)).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: true,
       
      });
setStartTime(Date.now());

      completeLeadershipChallenge(2, 1);
    }
  }, [submitted]);



  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => setSubmitted(true);
  const handleRestart = () => {
    setStep(0);
    setSelectedProblem("");
    setPrototypeIdea("");
    setPitchSummary("");
    setSubmitted(false);
    setStartTime(Date.now());

  };

  const isStepValid = () => {
    if (step === 0) return selectedProblem !== "";
    if (step === 1) return prototypeIdea.trim() !== "";
    if (step === 2) return pitchSummary.trim() !== "";
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-orange-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto rounded-3xl bg-white p-8 shadow-xl border-4 border-yellow-200 animate__animated animate__fadeIn">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-orange-500 drop-shadow mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [1, 0.9, 1],
            scale: [1, 1.05, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⚡ Innovation Launchpad ⚡
        </motion.h1>


        {!submitted ? (
          <div>
            <StepIndicator currentStep={step} />
            <h2 className="text-xl font-bold mb-4 text-orange-600 text-center">
              Step {step + 1}: {steps[step]}
            </h2>

            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <p className="text-2xl font-bold text-center text-yellow-500 bg-yellow-100 px-4 py-3 rounded-xl shadow animate-pulse flex items-center justify-center gap-3">
                    🎒 Pick a school problem you want to fix!
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {problems.map((prob, i) => (
                      <motion.button
                        key={prob}
                        onClick={() => setSelectedProblem(prob)}
                        whileHover={{ scale: 1.08, rotate: 1 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
                        className={`w-full px-5 py-4 rounded-2xl border shadow-xl font-semibold text-base text-gray-800 transition-all duration-300
            ${selectedProblem === prob
                            ? "bg-yellow-200 border-yellow-500 ring-2 ring-yellow-400 animate__animated animate__heartBeat"
                            : "bg-white border-gray-300 hover:bg-yellow-100"
                          }`}
                      >
                        <span className="text-2xl mr-2">🎯</span> {prob}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}


              {step === 1 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <label className="text-2xl font-bold text-yellow-700 bg-yellow-100 px-4 py-3 rounded-xl shadow-md flex items-center justify-center gap-3 animate-pulse">
                    💡 Share your awesome idea or prototype!
                  </label>

                  <motion.textarea
                    className="w-full p-4 border-2 border-yellow-300 bg-yellow-50 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    rows={5}
                    placeholder="🌟 E.g., A chill zone in the library for stress relief"
                    value={prototypeIdea}
                    onChange={(e) => setPrototypeIdea(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              )}


              {step === 2 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <label className="text-2xl font-bold text-orange-700 bg-orange-100 px-4 py-3 rounded-xl shadow-md flex items-center justify-center gap-3 animate-pulse">
                    🎬 Summarize your pitch (slide or video link):
                  </label>

                  <motion.textarea
                    className="w-full p-4 border-2 border-yellow-300 bg-orange-50 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    rows={5}
                    placeholder="🎥 E.g., A 90-second pitch or Google Slides link"
                    value={pitchSummary}
                    onChange={(e) => setPitchSummary(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              )}

            </motion.div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 shadow"
              >
                ⬅ Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-6 py-2 rounded-full font-bold shadow-xl text-white transition-all duration-300 ${isStepValid()
                    ? "bg-lime-400 hover:bg-lime-500"
                    : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  Next ➡
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`px-6 py-2 rounded-full font-bold shadow-xl text-white transition-all duration-300 ${isStepValid()
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  🎬 Submit & Earn Badge
                </button>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl font-extrabold text-green-600 mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ⚡ You’re a <span className="text-yellow-500">Change Pioneer!</span>
            </motion.h2>

            <motion.div
              className="mb-6 space-y-2 text-lg text-gray-700"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>📌 <strong>Problem:</strong> {selectedProblem}</p>
              <p>💡 <strong>Idea:</strong> {prototypeIdea}</p>
              <p>🎥 <strong>Pitch:</strong> {pitchSummary}</p>
            </motion.div>

            <motion.div
              className="my-6"
              initial={{ y: -10 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <span className="text-yellow-500 text-6xl drop-shadow-md">🏅</span>
              <p className="text-xl font-bold text-yellow-600 mt-2">Badge Earned: <span className="underline">Change Pioneer</span></p>
            </motion.div>

            <div className="flex item-center justify-center">

              <button
                onClick={handleRestart}
                className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" /> Restart Challenge
              </button>
            </div>


          </motion.div>

        )}
      </div>
    </div>
  );
};

export default InnovationLaunchpadGame;
