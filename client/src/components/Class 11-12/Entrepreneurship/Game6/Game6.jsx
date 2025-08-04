import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const sdgs = [
  { id: 1, title: "No Poverty", icon: "🌍" },
  { id: 2, title: "Zero Hunger", icon: "🍽️" },
  { id: 3, title: "Good Health", icon: "🩺" },
  { id: 4, title: "Quality Education", icon: "📘" },
  { id: 5, title: "Gender Equality", icon: "🚺" },
  { id: 6, title: "Clean Water", icon: "💧" },
  { id: 7, title: "Affordable Energy", icon: "⚡" },
  { id: 8, title: "Decent Work", icon: "💼" },
  { id: 9, title: "Industry & Innovation", icon: "🏗️" },
  { id: 10, title: "Reduced Inequality", icon: "📉" },
  { id: 11, title: "Sustainable Cities", icon: "🏙️" },
  { id: 12, title: "Responsible Consumption", icon: "♻️" },
  { id: 13, title: "Climate Action", icon: "🌱" },
  { id: 14, title: "Life Below Water", icon: "🐟" },
  { id: 15, title: "Life on Land", icon: "🌳" },
  { id: 16, title: "Peace & Justice", icon: "🕊️" },
  { id: 17, title: "Partnerships", icon: "🤝" },
];

export default function SDGStartupQuest() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [step, setStep] = useState(1);
  const [selectedSDGs, setSelectedSDGs] = useState([]);
  const [problem, setProblem] = useState("");
  const [change, setChange] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const toggleSDG = (id) => {
    if (selectedSDGs.includes(id)) {
      setSelectedSDGs(selectedSDGs.filter((s) => s !== id));
    } else if (selectedSDGs.length < 2) {
      setSelectedSDGs([...selectedSDGs, id]);
    }
  };

  const selectedSDGData = sdgs.filter((sdg) => selectedSDGs.includes(sdg.id));

  return (
    <div className="p-6 max-w-5xl mx-auto my-4 font-sans bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 rounded-[2.5rem] shadow-xl border-4 border-green-200">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 drop-shadow-lg animate-pulse">
          🌱 SDG Startup Quest
        </h1>
        <p className="mt-2 text-lg text-gray-700 italic">
          Align your startup with global goals for a greener future.
        </p>
      </div>



      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 rounded-[2rem] bg-gradient-to-br from-yellow-50 via-green-100 to-emerald-50 border-4 border-emerald-300 shadow-xl"
        >
          {/* 🎉 Fun Heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-yellow-500 animate-pulse">
              🧩 Step 1: Match Your Startup with SDGs!
            </h2>
            <p className="text-md text-emerald-800 mt-2 italic">
              💡 Tip: Think about the big problem your idea solves — and match it with the goals that make the world better! 🌍✨<br />
              ✅ You can choose up to <strong>2 goals</strong> that fit your idea best.
            </p>
          </div>

          {/* SDG Picker Grid */}
          <div className="grid grid-cols-2  gap-4 max-h-100 overflow-y-auto mb-6">
            {sdgs.map((sdg) => (
              <motion.label
                key={sdg.id}
                className={`p-4 rounded-[2rem] border-4 cursor-pointer flex items-center gap-3 text-lg font-semibold shadow-md transition-all duration-500 ease-in-out
    ${selectedSDGs.includes(sdg.id)
                    ? "bg-animated border-emerald-500 animate-glow shadow-xl"
                    : "bg-white border-gray-300"}
  `}
              >
                <input
                  type="checkbox"
                  checked={selectedSDGs.includes(sdg.id)}
                  onChange={() => toggleSDG(sdg.id)}
                  className="w-5 h-5 accent-emerald-500"
                />
                <span className="text-3xl animate-bounce-slow">{sdg.icon}</span>
                <span className="truncate text-emerald-800">{sdg.title}</span>
              </motion.label>

            ))}
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button
              onClick={() => setStep(2)}
              disabled={selectedSDGs.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-40"
            >
              🎉 Let’s Go ➡️
            </button>
          </div>
        </motion.div>
      )}



      {step === 2 && (
        <motion.div
          className="p-8 rounded-[2rem] bg-gradient-to-br from-green-100 via-yellow-50 to-pink-100 border-4 border-emerald-300 shadow-2xl space-y-6 animate-fade-in"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-black text-center bg-gradient-to-r from-emerald-600 via-lime-500 to-teal-400 text-transparent bg-clip-text flex items-center justify-center gap-2"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 1, -1, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            ✨🧠 Step 2: Describe Your Impact 🌍✨
          </motion.h2>

          <p className="text-center text-lg text-emerald-800 italic font-medium">
            🚀 Let’s shape the world with your idea! Fill in these fun fields below 🎨
          </p>

          {/* Problem Field */}
          <div className="space-y-2">
            <label className="block text-emerald-900 text-lg font-bold">
              ❓ What problem are you solving?
            </label>
            <textarea
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. Kids in villages can't access learning tools 📚"
              className="w-full p-4 bg-white border-4 border-yellow-300 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 transition-all text-emerald-900"
            />
          </div>

          {/* Change Field */}
          <div className="space-y-2">
            <label className="block text-emerald-900 text-lg font-bold">
              🔧 What change will your startup bring?
            </label>
            <textarea
              rows={3}
              value={change}
              onChange={(e) => setChange(e.target.value)}
              placeholder="e.g. We give out colorful solar tablets with fun lessons! 🌞📱"
              className="w-full p-4 bg-white border-4 border-pink-300 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all text-emerald-900"
            />
          </div>

          {/* Beneficiaries Field */}
          <div className="space-y-2">
            <label className="block text-emerald-900 text-lg font-bold">
              🎯 Who will benefit from it?
            </label>
            <input
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              placeholder="e.g. Students 👧👦, Farmers 👩‍🌾, Grandparents 👵"
              className="w-full p-4 bg-white border-4 border-blue-300 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all text-emerald-900"
            />
          </div>

          {/* Next Button */}
          <div className="text-center">
            <motion.button
              onClick={() => setStep(3)}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white font-extrabold rounded-full text-xl shadow-lg hover:scale-105 transition-transform"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Submit
            </motion.button>
          </div>
        </motion.div>
      )}

      {step === 3 && !submitted && (
        <div className="p-6 bg-gradient-to-br from-yellow-50 via-green-50 to-pink-50 rounded-[2rem] border-4 border-emerald-300 shadow-2xl space-y-6 animate-fade-in">
          <h2 className="text-3xl font-black text-center bg-gradient-to-r from-green-600 via-lime-400 to-teal-400 text-transparent bg-clip-text">
            🧩 Step 3: Your Impact Snapshot 🌟
          </h2>

          <div className="p-6 bg-white rounded-2xl border-4 border-lime-300 shadow-inner space-y-4">
            <h3 className="text-xl font-bold text-green-700">🌱 Chosen SDGs:</h3>
            <ul className="list-disc pl-6 text-lg text-emerald-800 space-y-1">
              {selectedSDGData.map((sdg) => (
                <li key={sdg.id}>
                  <span className="text-2xl">{sdg.icon}</span> {sdg.title}
                </li>
              ))}
            </ul>

            <div className="pt-4 space-y-2 text-emerald-900 text-md">
              <p>
                <strong>🚨 Problem:</strong> {problem}
              </p>
              <p>
                <strong>🔧 Change:</strong> {change}
              </p>
              <p>
                <strong>🎯 Beneficiaries:</strong> {beneficiary}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-2">
            <button
              onClick={() => setStep(1)}
              className="bg-yellow-400 text-white px-5 py-2 rounded-full text-lg font-bold shadow-md hover:scale-105 transition"
            >
              ✏️ Edit Again
            </button>
            <button
              onClick={() => {
                const endTime = Date.now();
                const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds

                const completed = true;

                // Mark challenge complete
                completeEntreprenerushipChallenge(1, 2);

                // Update performance
                updatePerformance({
                  moduleName: "Entrepreneurship",
                  topicName: "ideationIntellect",
                  score: 10,
                  accuracy: 100,
                  avgResponseTimeSec: timeSpent,
                  studyTimeMinutes: Math.ceil(timeSpent / 60),
                  completed,
                });
                setStartTime(Date.now());
                setSubmitted(true);
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-full text-lg font-extrabold shadow-lg animate-bounce"
            >
              🎖️ Submit & Celebrate!
            </button>
          </div>
        </div>
      )}


      {submitted && (
        <> <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="relative mt-12 flex items-center justify-center">

            <div className="bg-white border-8 border-emerald-400 rounded-3xl shadow-2xl p-10 max-w-3xl text-center font-serif animate-fade-in">
              {/* 🌟 Heading */}
              <h2 className="text-4xl font-extrabold text-green-700 mb-6">🌱 Certificate of Impact</h2>

              {/* 🧾 Main Content */}
              <p className="text-xl text-gray-800 mb-4">
                <strong className="text-emerald-600">Congratulations!</strong> You’ve redesigned your startup for <span className="text-green-600 font-bold">global good</span>.
              </p>

              <p className="text-md text-gray-700 leading-relaxed mb-6">
                You’ve now explored the frontier of modern entrepreneurship. With the right mindset,
                ethical approach, and the tools of AI and digital innovation, you're ready to not only launch a startup—
                but to lead it responsibly into the future.
              </p>

              {/* 🧠 Quote */}
              <blockquote className="italic text-indigo-700 mb-8">
                "The best way to predict the future is to create it." – Peter Drucker
              </blockquote>

              {/* 🏅 Footer */}
              <p className="text-lg font-bold text-purple-800">
                🎓 You are now certified as an <span className="underline">Advanced Youth Entrepreneur</span>.
              </p>

              {/* 🎉 Emojis */}
              <div className="mt-6 text-3xl animate-wiggle">🌍💼✨🌱🎓</div>
            </div>
          </div>
        </>

      )}

    </div>

  );
}
