import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const APIKEY = import.meta.env.VITE_API_KEY;

const categories = [
  { name: "Energy ⚡", key: "energy", color: "#facc15" },
  { name: "Motivation 🚀", key: "motivation", color: "#f472b6" },
  { name: "Focus 🎯", key: "focus", color: "#60a5fa" },
  { name: "Mood 😊", key: "mood", color: "#4ade80" },
  { name: "Stress 😰", key: "stress", color: "#f87171" }
];

const emojis = (val, key) => {
  if (key === "stress") return val > 70 ? "😰" : val > 40 ? "😟" : "😌";
  return val > 70 ? "😄" : val > 40 ? "😐" : "😴";
};

const parsePossiblyStringifiedJSON = (str) => {
  try {
    const jsonMatch = str.match(/({[\s\S]*})/);
    if (!jsonMatch) throw new Error("No JSON found");
    const parsed = JSON.parse(jsonMatch[1]);

    if (parsed.feedback && parsed.selfCarePlans) {
      return parsed;
    }
    throw new Error("Missing keys");
  } catch {
    return {
      feedback: ["Could not parse response."],
      selfCarePlans: ["Try again later."]
    };
  }
};

export default function BurnoutBarometer() {
  const { completeSELChallenge } = useSEL();
  const [values, setValues] = useState({
    energy: 50,
    motivation: 50,
    focus: 50,
    mood: 50,
    stress: 50
  });
  const [showReport, setShowReport] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [selfCarePlans, setSelfCarePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const handleChange = (key, val) => {
    setValues({ ...values, [key]: parseInt(val) });
  };

  const handleGeminiReport = async () => {
    setLoading(true);
    setError("");

    const prompt = `
You are a helpful AI wellness assistant.

Given the user's self-rated emotional scores:
- Energy: ${values.energy}
- Motivation: ${values.motivation}
- Focus: ${values.focus}
- Mood: ${values.mood}
- Stress: ${values.stress}

Return ONLY a strict JSON object in the following format (limit to 5 points maximum per list):

{
  "feedback": [
    "Insight for energy...",
    "Insight for motivation...",
    ...
  ],
  "selfCarePlans": [
    "Self-care tip 1...",
    "Self-care tip 2...",
    ...
  ]
}

No explanation or extra text. Only JSON.
`;


    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }
      );

      const aiReply = response.data.candidates[0].content.parts[0].text;
      const parsed = parsePossiblyStringifiedJSON(aiReply);
      setFeedback(parsed.feedback);
      setSelfCarePlans(parsed.selfCarePlans);
      setShowReport(true);

      // ✅ Track SEL performance
      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);
      const total = values.energy + values.motivation + values.focus + values.mood + (100 - values.stress);
      const maxTotal = 500; // 5 categories * 100
      const scaledScore = Math.round((total / maxTotal) * 10); // out of 10
      const accuracy = Math.round((scaledScore / 10) * 100); // out of 100

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: scaledScore,
        accuracy: accuracy,
        avgResponseTimeSec: durationSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: true,

      });
      setStartTime(Date.now());
      // ✅ Mark SEL challenge complete here
      completeSELChallenge(0, 2);
    } catch (e) {
      console.error("Error generating feedback", e);
      setError("Error generating feedback. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 p-6 font-sans">
      <motion.div
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border-4 border-purple-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 mb-4"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⚡ Burnout Barometer 🧠
        </motion.h1>

        <motion.p
          className="text-center text-xl text-purple-700 font-semibold mb-10 italic leading-relaxed animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          ✨ Tap into your inner magic and uncover your emotional power levels 🧚‍♀️<br />
          📜 A custom care scroll awaits, written by the AI Wizard of Wellness! 🌈💖
        </motion.p>

        <motion.div
          className="max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-2xl p-6 shadow-2xl border-4 border-dashed border-purple-300 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-center text-purple-800 mb-4 flex items-center justify-center gap-2">
            📖 How to Play the Burnout Barometer Game ✨
          </h3>
          <ul className="text-gray-800 text-lg space-y-3 list-inside list-disc">
            <li>🎛️ Slide each meter to reflect how you're feeling today.</li>
            <li>🧙 Click the <span className="font-bold">“Generate My Magical Care Plan”</span> button when you're ready.</li>
            <li>💡 The AI Wizard will conjure a personalized self-care scroll just for you.</li>
            <li>🔁 You can always reassess your powers and try again!</li>
          </ul>
        </motion.div>


        {/* Gauges */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              className="bg-white p-5 rounded-3xl shadow-xl border-4 border-dashed flex flex-col items-center transition-all"
              style={{ borderColor: cat.color }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {/* Label at top */}
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {cat.name}
              </h2>

              {/* Gauge */}
              <div className="w-24 h-24 mb-3">
                <CircularProgressbar
                  value={values[cat.key]}
                  text={`${values[cat.key]}%`}
                  styles={buildStyles({
                    pathColor: cat.color,
                    textColor: "#374151",
                    trailColor: "#e5e7eb",
                    textSize: "16px"
                  })}
                />
              </div>

              {/* Emoji in middle */}
              <div className="text-3xl mb-4">
                {emojis(values[cat.key], cat.key)}
              </div>

              {/* Slider at bottom */}
              <input
                type="range"
                min="0"
                max="100"
                value={values[cat.key]}
                onChange={(e) => handleChange(cat.key, e.target.value)}
                className="w-full rounded-lg bg-gray-200 accent-[var(--color)]"
                style={{ "--color": cat.color }}
              />
            </motion.div>
          ))}

        </div>

        {/* Button */}
        <div className="text-center">
          <motion.button
            onClick={handleGeminiReport}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className={`py-3 px-8 rounded-full text-lg shadow-lg font-semibold transition-all
    ${loading
                ? "bg-gray-400 text-white cursor-wait"
                : "bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white hover:opacity-90"
              }`}
          >
            {loading ? "✨ Summoning AI Wizard..." : "🧠 Generate My Magical Care Plan"}
          </motion.button>
        </div>

        {/* Report Section */}
        {showReport && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-pink-50 p-8 rounded-3xl border-4 border-pink-300"
          >
            <motion.h2
              className="text-2xl font-bold text-green-600 mb-4 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              🌿 Emotional Insight Scroll
            </motion.h2>

            {feedback.length > 0 && (
              <ul className="list-disc pl-6 text-gray-800 space-y-2 text-lg">
                {feedback.map((tip, i) => (
                  <li key={`feedback-${i}`}>💡 {tip}</li>
                ))}
              </ul>
            )}

            <h2 className="text-2xl font-bold text-blue-600 mt-8 mb-4 text-center">
              🛠️ Magical Self-Care Spells
            </h2>

            {selfCarePlans.length > 0 && (
              <ul className="list-disc pl-6 text-gray-800 space-y-2 text-lg">
                {selfCarePlans.map((plan, i) => (
                  <li key={`care-${i}`}>🪄 {plan}</li>
                ))}
              </ul>
            )}

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            <div className="text-center mt-6">
              <motion.button
                onClick={() => {
                  setShowReport(false);
                  setFeedback([]);
                  setSelfCarePlans([]);
                  setStartTime(Date.now());
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-semibold py-2 px-6 rounded-full shadow"
              >
                🔁 Try Again!
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}