import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ShieldCheck } from "lucide-react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const APIKEY = import.meta.env.VITE_API_KEY;

const conversations = [
  {
    id: 1,
    title: "🤼 Team Disagreement",
    scenario: "Your teammates disagree with your project approach. How do you explain your idea while staying calm?",
    tones: ["Confident", "Empathetic", "Neutral"],
    gestures: ["Smile", "Eye Contact", "Open Arms"]
  },
  {
    id: 2,
    title: "🏛️ Class Debate",
    scenario: "Someone challenges your opinion in front of the class. How do you respond respectfully?",
    tones: ["Firm", "Respectful", "Playful"],
    gestures: ["Nod", "Stand Tall", "Calm Voice"]
  },
  {
    id: 3,
    title: "🔁 Miscommunication",
    scenario: "You gave instructions that were misunderstood. How do you clarify without blaming others?",
    tones: ["Reassuring", "Understanding", "Positive"],
    gestures: ["Hand Gestures", "Calm Tone", "Smile"]
  }
];

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

export default function CommunicationCombatZone() {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (feedback) {
      completeLeadershipChallenge(0, 2);
    }

    if (feedback) {
      const totalTimeMs = Date.now() - startTime;
      updatePerformance({
        moduleName: "Leadership",
        topicName: "understandableLeader",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: parseFloat((totalTimeMs / (conversations.length * 1000)).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: true,
      });
      setStartTime(Date.now());
    }
  }, [feedback]);


  const handleSubmit = async () => {
    setLoading(true);
    const summary = conversations.map((conv, index) => {
      const r = responses[index] || {};
      return `Scenario: ${conv.title}\nTone: ${r.tone || "Not selected"}\nGesture: ${r.gesture || "Not selected"}`;
    }).join("\n\n");

    const prompt = `
You are an emotional intelligence coach.
A person handled 3 tough communication situations. Here is how they approached them:
${summary}

Return ONLY raw JSON (no backticks, no markdown, no explanations).
Example format:
{
  "team_disagreement": {"tone": "...", "gesture": "...", "analysis": "..."},
  "class_debate": {"tone": "...", "gesture": "...", "analysis": "..."},
  "miscommunication": {"tone": "...", "gesture": "...", "analysis": "..."}
}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          })
        }
      );
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = parsePossiblyStringifiedJSON(raw);
      setFeedback(parsed);
    } catch {
      setFeedback(null);
    } finally {
      setLoading(false);
      setStep(step + 1);
    }
  };

  const resetGame = () => {
    setStep(0);
    setResponses({});
    setFeedback(null);
    setLoading(false);
    setStartTime(Date.now());

  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-8 bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 rounded-[2rem] border-4 border-purple-200 shadow-2xl relative">
      <h1 className="text-6xl font-extrabold text-center mb-10 text-purple-700 flex items-center justify-center gap-4 relative">
        <span className="animate-bounce-slow">
          <Mic className="text-pink-500 w-8 h-8" />
        </span>

        <span className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 animate-pulse">
          Communication Combat Zone
        </span>

        <span className="animate-bounce-slow">
          <Mic className="text-yellow-500 w-8 h-8" />
        </span>
      </h1>



      <AnimatePresence mode="wait">
        {step < conversations.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-8 sm:p-10 rounded-[2.5rem] border-4 border-purple-300 shadow-[0_15px_45px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            {/* Decorative floating emojis */}
            <div className="absolute -top-4 -left-4 animate-spin-slow text-4xl opacity-30">🌈</div>
            <div className="absolute -bottom-4 -right-4 animate-bounce-slow text-4xl opacity-30">🎈</div>

            {/* Question Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-700 mb-4 tracking-wide flex items-center justify-center gap-3">
              {conversations[step].title}
            </h2>

            {/* Scenario */}
            <p className="text-lg sm:text-xl text-center text-gray-700 mb-6 leading-relaxed px-2 sm:px-8">
              {conversations[step].scenario}
            </p>

            {/* Tone Selector */}
            <div className="mb-5">
              <label className="block text-pink-700 font-bold mb-2 text-md sm:text-lg">
                🎭 Pick your speaking style:
              </label>
              <select
                className="w-full p-3 rounded-xl border-2 border-pink-300 bg-white shadow-inner text-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={(e) =>
                  setResponses({
                    ...responses,
                    [step]: { ...responses[step], tone: e.target.value },
                  })
                }
              >
                <option value="">🎨 Choose Tone</option>
                {conversations[step].tones.map((tone) => (
                  <option key={tone}>🎵 {tone}</option>
                ))}
              </select>
            </div>

            {/* Gesture Selector */}
            <div className="mb-6">
              <label className="block text-indigo-700 font-bold mb-2 text-md sm:text-lg">
                🕺 How will you express it?
              </label>
              <select
                className="w-full p-3 rounded-xl border-2 border-indigo-300 bg-white shadow-inner text-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) =>
                  setResponses({
                    ...responses,
                    [step]: { ...responses[step], gesture: e.target.value },
                  })
                }
              >
                <option value="">🎬 Choose Gesture</option>
                {conversations[step].gestures.map((gesture) => (
                  <option key={gesture}>💃 {gesture}</option>
                ))}
              </select>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  !responses[step]?.tone || !responses[step]?.gesture
                }
                className={`w-full transition-all duration-300 text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg tracking-wide ${responses[step]?.tone && responses[step]?.gesture
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 animate-wiggle"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                🚀 Next Challenge
              </button>
            </div>
          </motion.div>

        )}

        {step === conversations.length && !feedback && (
          <motion.div
            key="feedbackLoader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-lg font-semibold text-purple-700 mb-4 flex justify-center items-center gap-2">
              ✨ Ready to unlock your feedback?
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-xl ${loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 text-white animate-wiggle"
                }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin-slow">🔄</span> Loading...
                </>
              ) : (
                <>🧠 Get Feedback</>
              )}
            </button>
          </motion.div>
        )}

        {feedback && (
          <motion.div
            key="feedbackResult"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-50 via-yellow-50 to-pink-100 p-8 sm:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-4 border-green-300"
          >
            <h2 className="text-3xl font-extrabold text-center text-green-600 mb-8 flex items-center justify-center gap-3 tracking-wide">
              <ShieldCheck className="text-green-500 w-7 h-7 animate-bounce-slow" />
              🏅 Badge Earned: <span className="text-purple-700">Dialogue Commander</span>
              <ShieldCheck className="text-green-500 w-7 h-7 animate-bounce-slow" />
            </h2>

            <div className="space-y-8 text-gray-800">
              {Object.entries(feedback).map(([key, value]) => (
                <div key={key} className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    🧠 {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </h3>
                  <p className="mb-1"><span className="font-bold text-pink-600">🎭 Tone:</span> {value.tone}</p>
                  <p className="mb-1"><span className="font-bold text-indigo-600">🕺 Gesture:</span> {value.gesture}</p>
                  <p className="mt-2 text-sm text-gray-700"><span className="font-medium">🔍 Analysis:</span> {value.analysis}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 hover:from-yellow-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-xl text-lg transition-all duration-300 animate-wiggle"
              >
                🔁 Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
