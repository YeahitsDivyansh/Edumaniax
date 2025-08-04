import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, RefreshCcw, Loader } from "lucide-react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const emojiOptions = ["😄", "🙂", "😐", "😟", "😢"];
const strategies = ["Pause", "Rethink", "Reframe", "Deep Breathing"];
const APIKEY = import.meta.env.VITE_API_KEY;


function parsePossiblyStringifiedJSON(text) {
  if (typeof text !== "string") return null;
  text = text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(json)?/, "").replace(/```$/, "").trim();
  }
  if (text.startsWith("`") && text.endsWith("`")) {
    text = text.slice(1, -1).trim();
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}

const EQGame = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [moodTracker, setMoodTracker] = useState(["", "", ""]);
  const [reflection, setReflection] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (stage === 4 && aiFeedback) {
      completeLeadershipChallenge(1, 0);

      if (!scoreSent) {
        const totalTimeMs = Date.now() - startTime;
        updatePerformance({
          moduleName: "Leadership",
          topicName: "foresight",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: parseFloat((totalTimeMs / (3 * 1000)).toFixed(2)), // 3 mood days
          studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
          completed: true,
           
        });
        setStartTime(Date.now());

      }
    }
  }, [stage, aiFeedback]);


  const handleMoodChange = (index, emoji) => {
    const updated = [...moodTracker];
    updated[index] = emoji;
    setMoodTracker(updated);
  };

  const getAIResponse = async () => {
    const prompt = `
You are an emotional intelligence coach.
A person tracked their mood over 3 days as: ${moodTracker.join(", ")}.
They reflected: "${reflection}"
They used the strategy: "${selectedStrategy}"

Return ONLY raw JSON (no backticks, no markdown, no explanations).
Example format:
{
  "feedback": "...",
  "suggestion": "...",
  "moodSummary": "...",
  "strategyUsed": "..."
}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = parsePossiblyStringifiedJSON(raw);
      setAiFeedback(parsed || {
        feedback: "❌ Couldn't parse AI response!",
        suggestion: "Check input or try again.",
        moodSummary: "",
        strategyUsed: ""
      });
    } catch {
      setAiFeedback({
        feedback: "❌ Network error!",
        suggestion: "Try again later.",
        moodSummary: "",
        strategyUsed: ""
      });
    } finally {
      setLoading(false);
    }
  };

  const finishGame = async () => {
    setLoading(true);
    await getAIResponse();
  };

  const restartGame = () => {
    setMoodTracker(["", "", ""]);
    setReflection("");
    setSelectedStrategy("");
    setStage(0);
    setStarted(false);
    setAiFeedback(null);
    setStartTime(Date.now());

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto p-6 rounded-[2rem] shadow-2xl bg-gradient-to-br from-pink-200 via-yellow-100 to-purple-200 border-4 border-pink-300 animate-fade-in-up">
        <h1 className="text-6xl font-extrabold text-rose-600  tracking-wide animate-bounce text-center mb-6">
          EQ Tracker Mission 💓
        </h1>

        {!started ? (
          <div className="text-center space-y-10 animate-fade-in-up">


            <div className="bg-yellow-100 border-4 border-yellow-300 rounded-3xl p-6 max-w-2xl mx-auto shadow-xl space-y-4">
              <h2 className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2">
                📋 Instructions
              </h2>
              <ul className="text-lg text-gray-800 space-y-3 font-medium px-4">
                <li>🗓 <span className="text-pink-600 font-semibold">Track your mood</span> for 3 days with emojis!</li>
                <li>💭 <span className="text-indigo-600 font-semibold">Reflect</span> on a big emotion you felt recently.</li>
                <li>🎯 <span className="text-blue-600 font-semibold">Pick a strategy</span> you used: Pause, Reframe, etc.</li>
                <li>🤖 <span className="text-green-600 font-semibold">Get fun feedback</span> from our AI Coach!</li>
              </ul>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setStarted(true);
                    setStage(1);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-extrabold text-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🚀 Start Game
                </button>
              </div>
            </div>

            {/* Optional Floating Emojis */}
            <div className="absolute top-10 left-5 animate-float-slow text-3xl">🎈</div>
            <div className="absolute bottom-10 right-5 animate-float-fast text-3xl">🎈</div>
          </div>

        ) : stage === 1 ? (
          <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-2 animate-fade-in-up">
              <h2 className="text-3xl font-extrabold text-pink-700 tracking-wide">
                📅 How Did You Feel Each Day?
              </h2>
              <p className="text-lg text-gray-800 font-medium">
                Pick one emoji for each of the last 3 days to show your mood. 😄🙂😐😟😢
              </p>
              <p className="text-base text-gray-600 italic">
                Think about happy, calm, or tough moments you had.
              </p>
            </div>


            <div className="space-y-6">
              <div className="space-y-6">
                {moodTracker.map((mood, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 rounded-xl px-4 py-3 border-l-8 border-pink-400 shadow-lg"
                  >
                    <span className="text-lg font-bold text-purple-700 bg-yellow-100 px-3 py-1 rounded-full shadow-sm">
                      Day {i + 1}
                    </span>
                    <div className="flex gap-3">
                      {emojiOptions.map((emoji) => (
                        <motion.button
                          key={emoji}
                          onClick={() => handleMoodChange(i, emoji)}
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 0.9 }}
                          className={`text-3xl transition-all duration-200 ease-in-out rounded-full px-2 py-1 ${mood === emoji
                            ? "bg-yellow-300 shadow-inner scale-125 ring-4 ring-pink-400"
                            : "  hover:scale-110"
                            }`}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={moodTracker.includes("")}
              onClick={() => setStage(2)}
              className={`w-full py-3 rounded-full text-xl font-bold shadow-lg transition-all duration-300 ${moodTracker.includes("")
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:shadow-2xl"
                }`}
            >
              Next ➡️
            </motion.button>

            <div className="text-center text-sm text-gray-500 pt-2 italic">
              💡 Tip: Think about what made you smile or frown each day!
            </div>
          </div>

        ) : stage === 2 ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-extrabold text-pink-600 tracking-wide drop-shadow-md">
                💭 Reflect on Your Feelings
              </h2>
              <p className="text-lg text-pink-800 font-medium">
                Think of a time when you felt strong emotions. What happened and how did you respond? 🌟
              </p>
              <p className="text-sm text-gray-600 italic">There’s no right or wrong—just be honest. 😊</p>
            </div>

            <textarea
              className="w-full p-4 rounded-2xl border-2 border-purple-300 bg-purple-50 text-gray-800 text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
              rows="5"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="E.g., I felt nervous during my school play but I took a deep breath and smiled..."
            />

            <div className="text-center">
              <button
                onClick={() => setStage(3)}
                disabled={!reflection.trim()}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ease-in-out shadow-md ${reflection.trim()
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-purple-200 text-white cursor-not-allowed"
                  }`}
              >
                ➡️ Next
              </button>
            </div>
          </div>

        ) : stage === 3 ? (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-extrabold text-pink-600 tracking-wide drop-shadow-sm">
                🎯 Pick Your Superpower!
              </h2>
              <p className="text-lg text-pink-600 font-medium">
                Choose the best strategy that matches your situation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {strategies.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStrategy(s)}
                  className={`p-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-md border-4 text-center ${selectedStrategy === s
                    ? "bg-indigo-100 border-indigo-500 text-indigo-700 scale-105"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:scale-105"
                    }`}
                >
                  🚀 {s}
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                className={`mt-6 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${selectedStrategy && !loading
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-indigo-200 text-white cursor-not-allowed"
                  }`}
                onClick={finishGame}
                disabled={!selectedStrategy || loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin w-5 h-5" /> Thinking...
                  </span>
                ) : (
                  "💡 Get AI Coach Feedback"
                )}
              </button>
            </div>

            {aiFeedback && !loading && (
              <div className="mt-8 bg-gradient-to-br from-indigo-100 to-purple-200 p-6 rounded-3xl shadow-lg border-4 border-purple-300 space-y-4 text-purple-800 text-base">
                <h3 className="text-xl font-extrabold flex items-center gap-2 text-purple-700">
                  🧠 AI Coach Says:
                </h3>
                <p>
                  <span className="font-semibold">📝 Feedback:</span> {aiFeedback.feedback}
                </p>
                <p>
                  <span className="font-semibold">💡 Tip:</span> {aiFeedback.suggestion}
                </p>
                <p>
                  <span className="font-semibold">📊 How You Felt:</span> {aiFeedback.moodSummary}
                </p>
                <p>
                  <span className="font-semibold">🎯 Strategy Picked:</span> {aiFeedback.strategyUsed}
                </p>
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => setStage(4)}
                disabled={!aiFeedback}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ease-in-out shadow-md ${aiFeedback
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-purple-200 text-white cursor-not-allowed"
                  }`}
              >
                ➡️ Next
              </button>
            </div>

          </div>
        ) : stage === 4 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <CheckCircle className="text-green-500 mx-auto w-16 h-16" />
            <h2 className="text-3xl font-bold text-green-600">🏅 Resilience Master</h2>
            <p className="text-lg">You’ve completed the EQ Tracker Mission!</p>
            <button
              onClick={restartGame}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 flex items-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-5 h-5" /> Restart Game
            </button>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default EQGame;
