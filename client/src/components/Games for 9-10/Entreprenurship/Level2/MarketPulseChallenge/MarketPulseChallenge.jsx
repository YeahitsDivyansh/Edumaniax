import React, { useState } from "react";
import { Card, CardContent } from "../../Level1/LeanMachineGame/Card";
import { Input } from "../../Level1/LeanMachineGame/Input";
import { Textarea } from "../../Level1/LeanMachineGame/Textarea";
import { motion } from "framer-motion";
import DiceAnimation from "@/components/Dice";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const APIKEY = import.meta.env.VITE_API_KEY;

const ideas = [
  "🎓 College Buddy: A peer-to-peer tutoring platform for students",
  "🏥 QuickCare: Instant doctor appointment finder + wait-time tracker",
  "📚 BookSwap: A community book exchange app for students & readers",
  "🛒 LocalFresh: Hyperlocal grocery delivery from nearby farms",
  "🧘 CalmNest: Guided breathing + focus exercises for stressed students",
  "🧼 RefillOn: Eco-friendly home product refill station locator",
  "🎮 StudyPlay: Gamified app for competitive group study challenges",
  "💬 CampusCircle: A private college social network & event tracker",
  "🔐 SafeRent: Verified rental listings + roommate matcher for students",
  "🎨 LogoGenie: Instant AI-powered logo & branding builder for startups"
];

const landingTemplates = [
  { key: "minimalist", label: "Minimalist" },
  { key: "feature-first", label: "Feature-Focused" },
  { key: "storytelling", label: "Storytelling" },
  { key: "social-proof", label: "Social Proof Driven" },
  { key: "video-hero", label: "Video Hero Section" },
  { key: "lead-magnet", label: "Lead Magnet" }
];

const getTemplatePreview = (key) => {
  switch (key) {
    case "minimalist":
      return (
        <div className="bg-white border border-gray-300 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🧼 Minimalist Design</h3>
          <p className="text-sm text-gray-500">Focus on one bold headline, clean layout, and a single CTA button.</p>
        </div>
      );
    case "feature-first":
      return (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">⚙️ Feature-Focused</h3>
          <p className="text-sm text-blue-600">Highlights product features in blocks. Great for tech tools and apps.</p>
        </div>
      );
    case "storytelling":
      return (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-yellow-700 mb-2">📖 Storytelling</h3>
          <p className="text-sm text-yellow-700">A user journey or founder story that builds emotional connection.</p>
        </div>
      );
    case "social-proof":
      return (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-green-700 mb-2">👥 Social Proof Driven</h3>
          <p className="text-sm text-green-700">Includes testimonials, ratings, and logos of trusted users/brands.</p>
        </div>
      );
    case "video-hero":
      return (
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">🎥 Video Hero</h3>
          <p className="text-sm text-indigo-700">Top section with autoplay product demo video and CTA below.</p>
        </div>
      );
    case "lead-magnet":
      return (
        <div className="bg-pink-50 border border-pink-200 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-pink-700 mb-2">🎁 Lead Magnet</h3>
          <p className="text-sm text-pink-700">Offers a free resource (eBook, checklist) in exchange for email signup.</p>
        </div>
      );
    default:
      return null;
  }
  const [bg, titleColor, textColor] = configs[key] || [];

  return (
    <div className={`${bg} ${styles.base}`}>
      <h3 className={`${styles.title} ${titleColor}`}>{landingTemplates.find(t => t.key === key)?.label}</h3>
      <p className={`${styles.text} ${textColor}`}>
        {key === "minimalist" && "Focus on one bold headline, clean layout, and a single CTA button."}
        {key === "feature-first" && "Highlights product features in blocks. Great for tech tools and apps."}
        {key === "storytelling" && "A user journey or founder story that builds emotional connection."}
        {key === "social-proof" && "Includes testimonials, ratings, and logos of trusted users/brands."}
        {key === "video-hero" && "Top section with autoplay product demo video and CTA below."}
        {key === "lead-magnet" && "Offers a free resource (eBook, checklist) in exchange for email signup."}
      </p>
    </div>
  );
};

function extractJSON(str) {
  try {
    const start = str.indexOf("{");
    const end = str.lastIndexOf("}");
    const jsonStr = str.slice(start, end + 1);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export default function MarketPulseChallenge() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [flipped, setFlipped] = useState(false);
  const [idea, setIdea] = useState(ideas[0]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [persona, setPersona] = useState({ user: '', problem: '', challenge: '' });
  const [landing, setLanding] = useState({ template: '', cta: '' });
  const [metrics, setMetrics] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [decision, setDecision] = useState({ choice: '', reason: '' });
  const [loading, setLoading] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const spinIdea = () => {
    const random = ideas[Math.floor(Math.random() * ideas.length)];
    setIdea(random);
    setSelectedIdea(random);
    setFlipped(true);
    setTimeout(() => setFlipped(false), 3000);
  };

  const simulateMarketWithGemini = async () => {
    setLoading(true);
    setAiResult(null);

    const prompt = `
You are acting as a startup marketing simulator.

Given this input:
- Startup Idea: "${selectedIdea || idea}"
- Target User: "${persona.user}"
- User Problem: "${persona.problem}"
- Core Challenge Solved: "${persona.challenge}"
- Landing Page Style: "${landing.template}"
- CTA: "${landing.cta}"

Return a STRICT VALID JSON with the following format:

{
  "traffic": 78,
  "signups": 19,
  "feedback": [
    "CTA is clear and action-driven.",
    "Persona definition needs improvement.",
    "Landing style suits the audience."
  ]
}

⚠️ No explanation, no notes — return ONLY the raw JSON. Make sure it is valid JSON.
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const json = await response.json();
      console.log("🔍 Gemini full response:", json); // 👈 Debug log

      const aiText = json?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      const cleaned = extractJSON(aiText);

      if (cleaned) {
        setMetrics({ visits: cleaned.traffic, signups: cleaned.signups });
        setAiResult(Array.isArray(cleaned.feedback) ? cleaned.feedback : ["No feedback provided."]);
      } else {
        setMetrics({ visits: 0, signups: 0 });
        setAiResult(["⚠️ Could not parse Gemini output."]);
      }
    } catch (err) {
      console.error("❌ Gemini API error:", err);
      setAiResult(["❌ Gemini API error."]);
    } finally {
      setLoading(false);
    }
  };

  const evaluateDecisionWithGemini = async () => {
    setLoading(true);
    setDecision(prev => ({ ...prev, score: null, evaluation: null }));

    const prompt = `
You're a startup coach evaluating a founder's decision after testing a product idea.

Given this input:
- Startup Idea: "${selectedIdea || idea}"
- Target User: "${persona.user}"
- User Problem: "${persona.problem}"
- Core Challenge Solved: "${persona.challenge}"
- Landing Page Style: "${landing.template}"
- CTA: "${landing.cta}"
- Traffic: ${metrics?.visits || 0}
- Signups: ${metrics?.signups || 0}
- Gemini Feedback: ${JSON.stringify(aiResult || [])}
- User Decision: "${decision.choice}"
- Justification: "${decision.reason}"

Evaluate the quality of the user’s decision.

🎯 Return STRICT VALID JSON:

{
  "score": 7,
  "evaluation": "Good decision to improve. The signup rate is decent, and user understood where to iterate."
}

⚠️ Only JSON. No extra text.
`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const json = await res.json();
      console.log("🎯 Decision Evaluation Raw Response:", json);

      const aiText = json?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      const result = extractJSON(aiText);

      if (result?.score !== undefined) {
        const endTime = Date.now();
        const timeSpentMinutes = Math.floor((endTime - startTime) / 60000);

        setDecision(prev => ({
          ...prev,
          score: result.score,
          evaluation: result.evaluation || "No evaluation text provided."
        }));

        // ✅ Save performance
        updatePerformance({
          moduleName: "Entrepreneurship",
          topicName: "ideationIntellect",
          score: result.score,
          accuracy: result.score * 10, // Optional: scale accuracy
          avgResponseTimeSec: 0, // Not applicable here
          studyTimeMinutes: timeSpentMinutes,
          completed: true,

        });
        setStartTime(Date.now());

        // ✅ Mark challenge as completed
        completeEntreprenerushipChallenge(1, 0);
      }
      else {
        setDecision(prev => ({ ...prev, score: 0, evaluation: "⚠️ Could not parse Gemini response." }));
      }
    } catch (err) {
      setDecision(prev => ({ ...prev, score: 0, evaluation: "❌ Gemini API error." }));
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50 to-indigo-100 min-h-screen">
      <div className="relative flex justify-center items-center mb-3">
        {/* 🌪️ Swirl Background */}
        <motion.div
          className="absolute w-56 h-56 bg-gradient-to-tr from-cyan-200 to-blue-300 opacity-30 rounded-full blur-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* ✨ Sparkles */}
        <motion.div
          className="absolute -top-2 left-12 text-cyan-400 text-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute top-2 right-12 text-blue-400 text-xl"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌟
        </motion.div>

        {/* 🎯 Animated Heading */}
        <motion.h1
          className="pb-3 text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        >
          🎯 Market Pulse Challenge
        </motion.h1>
      </div>

      {/* Idea Deck */}
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 border-2 border-cyan-300 rounded-3xl shadow-xl  ">
        <h2 className="text-3xl font-extrabold text-cyan-700 flex items-center gap-2 mb-4">💡 Cool Idea Spinner</h2>

        <div className="w-72 h-48 perspective mb-6 relative">
          <motion.div
            className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
            animate={{ rotateY: flipped ? 180 : 0 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div className="absolute w-full h-full bg-white border-4 border-cyan-300 rounded-2xl shadow-2xl flex flex-col items-center justify-center backface-hidden p-4 hover:scale-105 transition-all duration-300">
              <span className="text-6xl animate-pulse mb-2"><DiceAnimation /></span>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-100 to-blue-300 border-4 border-blue-400 rounded-2xl shadow-2xl flex flex-col items-center justify-center rotate-y-180 backface-hidden p-4 hover:scale-105 transition-all duration-300">
              <span className="text-5xl mb-2 drop-shadow-sm">{idea?.split(" ")[0]}</span>
              <span className="text-lg font-bold text-blue-900 text-center leading-tight px-2">
                {idea?.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </motion.div>

          {/* Sparkles */}
          <div className="absolute -top-4 -right-4 text-cyan-300 text-xl animate-bounce">✨</div>
          <div className="absolute -bottom-4 -left-4 text-blue-400 text-xl animate-bounce delay-200">🌟</div>
        </div>


        <motion.button
          onClick={spinIdea}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [2, -4, 2] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-bold px-6 py-2 rounded-full shadow-xl"
        >
          💡 Discover a Bright Idea!
        </motion.button>

        <div className="mt-6 w-full max-w-md">
          <label className="block text-md font-bold text-blue-700 mb-2">
            📝 Your Startup Idea:
          </label>
          <div className="w-full max-w-2xl px-4 py-3 bg-blue-50 border-2 border-blue-300 rounded-lg shadow-md text-blue-900 font-semibold text-center text-lg">
            {selectedIdea || "🎯 Your idea will appear here..."}
          </div>
        </div>
      </div>


      {/* Persona Builder */}
      <Card className="bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 border-2 border-cyan-300 rounded-3xl shadow-2xl px-4 py-6">
        <CardContent className="space-y-6">
          <h2 className="text-3xl font-extrabold text-cyan-700 flex items-center gap-3">
            🧠✨ Build Your Dream User!
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <label className="block text-lg font-medium text-cyan-900">
              Who is going to use your product?
            </label>
          </div>
          <Input
            placeholder="E.g., 🧑‍🎓 College students prepping for finals"
            className="bg-white border-2 border-cyan-300 rounded-xl p-3 text-cyan-800 font-semibold shadow-md transition-transform hover:scale-[1.02]"
            onChange={(e) => setPersona({ ...persona, user: e.target.value })}
          />

          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <label className="block text-lg font-medium text-cyan-900">
              What problem does your product solve for them?
            </label>
          </div>
          <Input
            placeholder="E.g., 📚 Struggle to find structured revision resources"
            className="bg-white border-2 border-cyan-300 rounded-xl p-3 text-cyan-800 font-semibold shadow-md transition-transform hover:scale-[1.02]"
            onChange={(e) => setPersona({ ...persona, problem: e.target.value })}
          />

          <div className="flex items-center gap-3">
            <span className="text-2xl">📌</span>
            <label className="block text-lg font-medium text-cyan-900">
              What professional challenge does your product address?
            </label>
          </div>
          <Input
            placeholder="E.g., 🧭 Lack of career direction after college"
            className="bg-white border-2 border-cyan-300 rounded-xl p-3 text-cyan-800 font-semibold shadow-md transition-transform hover:scale-[1.02]"
            onChange={(e) => setPersona({ ...persona, challenge: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* Landing Page */}
      {/* Landing Page */}
      <Card className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-2 border-cyan-300 rounded-3xl shadow-2xl px-4 py-6">
        <CardContent className="space-y-6">
          <h2 className="text-3xl font-extrabold text-cyan-700 flex items-center gap-3">
            🌐✨ Landing Page Playground
          </h2>

          <div>
            <label className="text-md font-bold text-cyan-900 mt-4 mb-1 flex items-center gap-2">
              ✍️ Your Call-To-Action (CTA):
            </label>
            <Input
              placeholder="E.g., 🎁 Get Your Free Guide Now!"
              className="border-3 border-blue-800 shadow-inner bg-cyan-50 text-cyan-800 font-semibold rounded-xl p-3 transition-transform hover:scale-[1.02]"
              onChange={(e) => setLanding({ ...landing, cta: e.target.value })}
            />
          </div>

          <h3 className="text-2xl font-extrabold text-cyan-700 mb-4 text-center">
            🎨 Choose Your Landing Page Style
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {landingTemplates.map((template) => (
              <motion.div
                key={template.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 shadow-md ${landing.template === template.key
                  ? "bg-cyan-50 border-[5px] border-cyan-500 shadow-xl scale-105"
                  : "bg-white border-[3px] border-cyan-200 hover:border-cyan-400"
                  }`}
                onClick={() => setLanding({ ...landing, template: template.key })}
              >
                <div className="text-lg font-bold text-cyan-900 text-center mb-2 tracking-wide">
                  {template.label}
                </div>
                {getTemplatePreview(template.key)}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Market Simulation */}
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-100 border-2 border-cyan-300 rounded-3xl shadow-xl px-4 py-6">
        <CardContent className="space-y-5">
          <h2 className="text-3xl font-extrabold text-cyan-700 flex items-center gap-2">
            📊 Market Simulation
          </h2>

          <motion.button
            onClick={simulateMarketWithGemini}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-bold px-6 py-2 rounded-full shadow-lg transition"
          >
            🚀 Launch AI Simulation
          </motion.button>

          {loading && (
            <p className="text-blue-700 text-sm animate-pulse">⏳ Thinking...</p>
          )}

          {metrics && (
            <p className="text-md font-semibold text-blue-800">
              📈 <strong>{metrics.signups}</strong> people signed up out of <strong>{metrics.visits}</strong> visits.
            </p>
          )}

          {aiResult && (
            <ul className="list-disc list-inside text-sm text-cyan-900 space-y-1">
              {aiResult.map((s, i) => (
                <li key={i}>✅ {s}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Decision Point */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-cyan-300 rounded-3xl shadow-xl px-4 py-6">
        <CardContent className="space-y-5">
          <h2 className="text-3xl font-extrabold text-cyan-700 flex items-center gap-2">
            🧭 Decision Point
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 text-cyan-800 font-semibold">
            {['Validate', 'Improve', 'Pivot'].map((choice) => (
              <label
                key={choice}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border-2 transition ${decision.choice === choice
                  ? "bg-cyan-200 border-cyan-500 shadow-md"
                  : "border-cyan-200 hover:bg-cyan-100"
                  }`}
              >
                <input
                  type="radio"
                  name="decision"
                  value={choice}
                  checked={decision.choice === choice}
                  onChange={() => setDecision({ ...decision, choice })}
                />
                {choice}
              </label>
            ))}
          </div>

          <Textarea
            placeholder="✍️ Explain your decision..."
            className="mt-2 bg-blue-50 border-2 border-cyan-300 text-cyan-800 rounded-xl p-3 shadow-inner"
            onChange={(e) => setDecision({ ...decision, reason: e.target.value })}
          />

          <motion.button
            onClick={evaluateDecisionWithGemini}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-bold px-6 py-2 rounded-full shadow-lg transition"
          >
            🎯 Evaluate My Decision with AI
          </motion.button>

          {loading && (
            <p className="text-blue-700 text-sm animate-pulse">⏳ Evaluating...</p>
          )}

          {decision.score !== undefined && decision.score !== null && (
            <div className="mt-2 bg-cyan-50 border border-cyan-200 rounded-xl p-4 shadow text-blue-900 text-sm space-y-1">
              <p>🧠 <strong>Score:</strong> {decision.score}/10</p>
              <p>💡 <strong>Feedback:</strong> {decision.evaluation}</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
