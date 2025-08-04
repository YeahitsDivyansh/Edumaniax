import { useState } from "react";
import { motion } from "framer-motion";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const ethicsScenarios = [
  {
    question: "You find out a teammate is exaggerating impact numbers. What do you do?",
    options: ["🧾 Report it", "🙈 Ignore it", "🤝 Talk to them privately"],
    correct: "🧾 Report it"
  },
  {
    question: "Your startup's product harms the environment slightly. What do you choose?",
    options: ["🔁 Redesign", "🧪 Justify it", "⏳ Delay feature"],
    correct: "🔁 Redesign"
  }
];
const scalingOptions = [
  "📍 Local Ads",
  "🚛 Regional Partners",
  "📺 National TV",
  "🌐 Social Media",
  "📦 E-commerce Expansion",
  "🛒 Retail Store Partnerships",
  "📱 Influencer Marketing",
  "📈 SEO & Content Marketing",
  "📊 Email Campaigns",
  "🎤 Trade Shows & Conferences",
  "🤝 Strategic B2B Deals",
  "🚀 App Store Optimization",
  "🌍 International Launch",
  "🏫 Campus Ambassador Programs",
  "📚 Free Webinars or Workshops",
  "🎮 Gamified Referral Program",
  "🏪 Pop-up Stores or Events",
  "💼 LinkedIn Outreach",
  "📣 PR & Press Coverage"
];

const APIKEY = import.meta.env.VITE_API_KEY;

export default function PitchArenaGame() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [answers, setAnswers] = useState({});
  const [scalingMap, setScalingMap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [ethicsAnswers, setEthicsAnswers] = useState({});
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const steps = [
    { label: " Problem", placeholder: "What problem are you solving?" },
    { label: " Solution", placeholder: "What's your unique solution?" },
    { label: " Target Market", placeholder: "Who will use your product?" },
    { label: " Revenue Model", placeholder: "How will you make money?" },
    { label: " Traction", placeholder: "What validation or results do you have?" },
    { label: " Team", placeholder: "Why is your team the right one?" },
    { label: " Ask", placeholder: "What do you need from investors/audience?" }
  ];

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    const item = e.dataTransfer.getData("text/plain");
    if (!scalingMap.includes(item)) {
      setScalingMap(prev => [...prev, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };


  const handleChange = (label, value) => setAnswers(prev => ({ ...prev, [label]: value }));
  const toggleScale = opt => setScalingMap(prev => prev.includes(opt) ? prev : [...prev, opt]);

  const evaluatePitch = async () => {
    setLoading(true);
    setReview(null);

    const pitchText = steps.map(s => `${s.label}: ${answers[s.label] || "N/A"}`).join("\n");
    const growthText = `Growth Strategy Pyramid: ${scalingMap.join(", ") || "None"}`;

    const prompt = `
You are a startup pitch evaluator. Analyze this pitch and respond with ONLY a valid JSON in this format:

{
  "Clarity": 1,
  "Originality": 1,
  "Impact": 1,
  "Design": 1,
  "Feasibility": 1,
  "Feedback": "Short feedback under 40 words."
}

Pitch Details:
${pitchText}
${growthText}
`;

    const tryParseAI = (text) => {
      const match = text.match(/\{[\s\S]*?\}/);
      if (!match) return null;
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    };

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const json = await res.json();
      console.log("🏁 Gemini full response:", json);

      const aiText = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const parsed = tryParseAI(aiText);

      if (parsed) {
        setReview(parsed);
        completeEntreprenerushipChallenge(0, 2);

        // ⏱️ Calculate metrics
        const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
        const score = (parsed.Clarity + parsed.Originality + parsed.Impact + parsed.Design + parsed.Feasibility) * 2;
        const studyTimeMinutes = Math.ceil(timeTakenSec / 60);

        updatePerformance({
          moduleName: "Entrepreneurship",
          topicName: "masteringPitch",
          score,
          accuracy: score * 10,
          avgResponseTimeSec: timeTakenSec,
          studyTimeMinutes,
          completed: true,
           
        });
        setStartTime(Date.now());

      }
      else {
        setReview({ Feedback: "⚠️ Could not parse AI response." });
      }
    } catch (e) {
      console.error("Gemini fetch error:", e);
      setReview({ Feedback: "❌ AI error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 min-h-screen font-[Comic Sans MS,cursive]">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-center text-pink-600 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          animate={{
            scale: [1, 1.03, 1],
            color: ["#ec4899", "#f97316", "#ec4899"], // pink to orange and back
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="inline-block drop-shadow-md"
        >
          🎨 Pitch Arena 🌈
        </motion.span>
      </motion.h1>


      {/* Pitch Builder Cards */}
      <div className="bg-purple-50 border-4 border-purple-200 rounded-3xl shadow-lg p-6 max-w-5xl mx-auto space-y-6 mb-10">
        <motion.h2
          className="text-3xl font-bold text-purple-600 drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎨 Pitch Deck Creator
        </motion.h2>
        <p className="text-center text-lg text-gray-700 font-medium">
          Fill each slide to pitch your startup! 🎤💡
        </p>

        {steps.map(({ label, placeholder }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-xl border-4 border-pink-200 max-w-4xl mx-auto"
            style={{
              backgroundImage:
                "radial-gradient(circle at top left, #fcd5ce 0%, #fff0f3 100%)",
            }}
          >
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl">🖼️</span>
              <h3 className="text-2xl font-bold text-pink-700 ml-3">{label}</h3>
            </div>
            <div className="relative h-60 bg-pink-50 rounded-xl border border-pink-300 shadow-inner flex items-center justify-center">
              <textarea
                placeholder={placeholder}
                value={answers[label] || ""}
                onChange={(e) => handleChange(label, e.target.value)}
                className="w-full h-full text-2xl text-center text-pink-700 bg-transparent font-semibold placeholder:text-pink-300 placeholder:italic resize-none outline-none"
                style={{
                  fontFamily: "'Comic Neue', 'Segoe UI', cursive",
                  lineHeight: "2",
                  padding: "2rem",
                }}
              />
              <div className="absolute bottom-3 right-4 text-sm text-pink-400 font-mono">
                Slide {idx + 1} 🎞️
              </div>
            </div>
          </motion.div>
        ))}
      </div>


      {/* Growth Pyramid */}
      <div className="bg-green-50 border-4 border-green-300 shadow-xl rounded-3xl max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          🌱 Build Your Growth Pyramid 🧱
        </h2>
        <p className="bg-white p-4 rounded-xl mb-4 shadow text-green-800 text-sm">
          Drag and drop your favorite strategies to the box below!
        </p>
        <div className="flex flex-wrap gap-3">
          {scalingOptions.map((opt) => (
            <div
              key={opt}
              draggable
              onDragStart={(e) => handleDragStart(e, opt)}
              className="px-4 py-2 rounded-full font-semibold bg-yellow-200 hover:bg-yellow-300 shadow cursor-grab"
            >
              {opt}
            </div>
          ))}
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="mt-4 p-4 min-h-[100px] border-4 border-dashed border-green-400 rounded-xl bg-white shadow-inner"
        >
          <p className="text-green-800 font-bold mb-2">🏗️ Your Steps:</p>
          {scalingMap.length ? (
            scalingMap.map((item, i) => (
              <div key={i} className="text-green-700">
                🔹 {item}
              </div>
            ))
          ) : (
            <p className="italic text-gray-500">Drop growth steps here!</p>
          )}
        </div>
      </div>


      {/* Ethics */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 shadow-xl rounded-3xl max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          ⚖️ Ethical Decision Scenarios
        </h2>
        {ethicsScenarios.map((scenario, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-inner border border-red-200 mb-4"
          >
            <p className="font-medium text-red-900 mb-2">{scenario.question}</p>
            {scenario.options.map((opt, i) => (
              <label key={i} className="block text-red-700">
                <input
                  type="radio"
                  name={`ethics-${idx}`}
                  value={opt}
                  onChange={() =>
                    setEthicsAnswers((prev) => ({ ...prev, [idx]: opt }))
                  }
                  checked={ethicsAnswers[idx] === opt}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
            {ethicsAnswers[idx] && (
              <div className="mt-2 text-sm text-red-700 font-semibold">
                ✅ Correct Answer:{" "}
                <span className="text-red-900">{scenario.correct}</span>
              </div>
            )}
          </div>
        ))}
      </div>



      {/* Peer Review */}
      {/* AI Review */}
      <div className="bg-blue-100 border-4 border-blue-300 rounded-3xl shadow-xl max-w-4xl mx-auto p-6">
        <button
          onClick={evaluatePitch}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          {loading ? "🤖 Thinking hard..." : "🧠✨ Let AI Review Your Pitch!"}
        </button>

        {review && (
          <div className="mt-4 bg-white p-5 rounded-xl shadow space-y-3">
            {["Clarity", "Originality", "Impact", "Design", "Feasibility"].map(
              (criteria) => {
                const value = review[criteria] ?? 0;
                return (
                  <div
                    key={criteria}
                    className="flex justify-between items-center"
                  >
                    <span className="font-bold text-indigo-800">
                      {criteria}
                    </span>
                    <span className="text-yellow-500 text-lg">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < value ? "⭐" : "☆"}</span>
                      ))}
                    </span>
                  </div>
                );
              }
            )}
            <hr className="my-2" />
            <p className="italic text-gray-700">💬 {review.Feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
