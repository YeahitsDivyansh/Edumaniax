import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const careers = [
  { title: "🤖 AI Engineer", description: "Builds smart machines and algorithms" },
  { title: "📊 Data Scientist", description: "Finds patterns in big data" },
  { title: "🛠️ Robot Designer", description: "Creates robots that can move and think" },
  { title: "🧠 AI Ethics Specialist", description: "Makes sure AI is fair and safe" },
];

const interestEmojis = [
  "😴", "😐", "🙂", "😊", "😃", "😄", "😁", "😆", "🤩", "🚀"
];

export default function AICareerExplorerGame() {
  const { completeComputersChallenge } = useComputers();
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const [careerData, setCareerData] = useState(
    careers.map((c) => ({ ...c, skills: "", aiHelps: "", interest: "" }))
  );
  const [reflection, setReflection] = useState({
    favorite: "",
    skillsToLearn: "",
    preparation: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = (index, field, value) => {
    const updated = [...careerData];
    if (field === "interest") {
      if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
        updated[index][field] = value;
      }
    } else {
      updated[index][field] = value;
    }
    setCareerData(updated);
  };

  const handleReflectionChange = (field, value) => {
    setReflection({ ...reflection, [field]: value });
  };

  const handleSubmit = () => {
    const allInterestValid = careerData.every((career) => {
      const val = Number(career.interest);
      return val >= 1 && val <= 10;
    });

    const allReflectionFilled = Object.values(reflection).every(
      (val) => val.trim() !== ""
    );

    if (!allInterestValid || !allReflectionFilled) {
      toast.error("Please fill all the fields before submitting.");
      return;
    }

    if (!challengeCompleted) {
      completeComputersChallenge(2, 2);
      setChallengeCompleted(true);
    }
    // ✅ Performance tracking
    const endTime = Date.now();
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);
    const avgResponseTimeSec = ((endTime - startTime) / 1000) / (careerData.length + 3); // 3 reflections

    updatePerformance({
      moduleName: "Computers",
      topicName: "aIFuturesAndPossibilities",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,

    });
    setStartTime(Date.now());
    setStep(2);
  };



  const getRecommendedCareer = () => {
    let maxInterest = -1;
    let recommendedCareer = null;
    careerData.forEach((career) => {
      const val = Number(career.interest);
      if (val > maxInterest) {
        maxInterest = val;
        recommendedCareer = career.title;
      }
    });

    if (maxInterest < 3) {
      return "Your interest levels seem low. Keep exploring AI careers to find what excites you!";
    }

    return `Based on your interest levels, we recommend: ${recommendedCareer}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto rounded-3xl shadow-2xl bg-gradient-to-tr from-pink-100 via-purple-200 to-indigo-200">
      <motion.h1
        className="text-5xl text-center md:text-6xl font-extrabold text-purple-900 mb-10"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        💼 AI Career Explorer
      </motion.h1>

      {step === 1 && (
        <>
          <p className="text-xl text-center text-purple-800 mb-8 font-semibold">
            🌟 Explore exciting careers in AI and reflect on your future!
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-purple-400 text-white text-lg font-semibold">
                <tr>
                  <th className="p-3 rounded-tl-xl">Career</th>
                  <th className="p-3">What They Do</th>
                  <th className="p-3">Skills Needed</th>
                  <th className="p-3">How AI Helps</th>
                  <th className="p-3 rounded-tr-xl">Interest</th>
                </tr>
              </thead>
              <tbody>
                {careerData.map((career, i) => {
                  const interestNum = Number(career.interest);
                  return (
                    <tr key={career.title} className="hover:bg-purple-50">
                      <td className="p-3 font-extrabold text-xl">{career.title}</td>
                      <td className="p-3 italic text-purple-700">{career.description}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          className="w-full rounded-lg border border-purple-300 p-2"
                          value={career.skills}
                          placeholder="e.g., Coding, Math, Design"
                          onChange={(e) => handleChange(i, "skills", e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          className="w-full rounded-lg border border-purple-300 p-2"
                          value={career.aiHelps}
                          placeholder="e.g., Automates tasks, finds patterns"
                          onChange={(e) => handleChange(i, "aiHelps", e.target.value)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <div className="inline-flex items-center space-x-3">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            className="w-20 rounded-xl border-2 border-purple-500 p-2 text-center font-bold"
                            value={career.interest}
                            placeholder="1-10"
                            onChange={(e) => handleChange(i, "interest", e.target.value)}
                          />
                          <span className="text-3xl">
                            {interestNum >= 1 && interestNum <= 10
                              ? interestEmojis[interestNum - 1]
                              : "❓"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">🎈 Reflection</h2>
            <div className="space-y-4">
              <textarea
                className="w-full border-2 border-purple-400 bg-purple-50 rounded-lg p-3"
                placeholder="Which career interests you the most?"
                value={reflection.favorite}
                onChange={(e) => handleReflectionChange("favorite", e.target.value)}
              />
              <textarea
                className="w-full border-2 border-purple-400 bg-purple-50 rounded-lg p-3"
                placeholder="What skills would you like to develop?"
                value={reflection.skillsToLearn}
                onChange={(e) => handleReflectionChange("skillsToLearn", e.target.value)}
              />
              <textarea
                className="w-full border-2 border-purple-400 bg-purple-50 rounded-lg p-3"
                placeholder="How will you prepare for an AI-powered future?"
                value={reflection.preparation}
                onChange={(e) => handleReflectionChange("preparation", e.target.value)}
              />
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-2xl rounded-full font-extrabold shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            🎯 Submit My AI Career Path
          </motion.button>
        </>
      )}

      {step === 2 && (
        <motion.div
          className="mt-12 mx-auto w-full max-w-2xl text-center p-6 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-extrabold text-purple-900 mb-4">
            🌟 Career Match Recommendation
          </h2>
          <motion.p
            className="text-3xl font-extrabold italic mb-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent text-center drop-shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            🏅 Your Golden Career Match:<br /> {getRecommendedCareer()} ✨
          </motion.p>

          <div className="text-5xl mb-3 animate-pulse">🏆</div>
          <div className="text-3xl font-extrabold text-white mb-2">
            You earned the badge:
          </div>
          <div className="text-6xl mb-4">💼 Future Ready!</div>
          <p className="font-semibold text-white text-lg mb-4">
            Keep exploring and learning about AI! 🚀
          </p>

          <motion.button
            onClick={() => {
              setCareerData(
                careers.map((c) => ({
                  ...c,
                  skills: "",
                  aiHelps: "",
                  interest: "",
                }))
              );
              setReflection({
                favorite: "",
                skillsToLearn: "",
                preparation: "",
              });
              setStep(1);
              setStartTime(Date.now());
            }}
            className="mt-4 px-6 py-3 bg-white text-green-700 font-bold rounded-full shadow-md hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
          >
            🔁 Replay
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
