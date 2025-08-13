import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const questions = [
  {
    question: "What inspires how you lead?",
    options: [
      { text: "Trying new ways to solve problems", archetype: "Disruptor" },
      { text: "Getting things done smoothly", archetype: "Operator" },
      { text: "Sharing big dreams and ideas", archetype: "Visionary" },
      { text: "Caring about people and teamwork", archetype: "Connector" },
    ],
  },
  {
    question: "How do you like working with others?",
    options: [
      { text: "Getting everyone excited about a goal", archetype: "Visionary" },
      { text: "Listening and building connections", archetype: "Connector" },
      { text: "Making clear steps and plans", archetype: "Operator" },
      { text: "Fixing things that don’t work anymore", archetype: "Disruptor" },
    ],
  },
  {
    question: "What does success as a leader mean to you?",
    options: [
      { text: "When things are organized and run well", archetype: "Operator" },
      { text: "When everyone feels supported", archetype: "Connector" },
      { text: "When a bold idea changes everything", archetype: "Disruptor" },
      { text: "When your big dream becomes real", archetype: "Visionary" },
    ],
  },
  {
    question: "What’s your best quality in personal branding?",
    options: [
      { text: "Having a clear goal", archetype: "Visionary" },
      { text: "Being steady and dependable", archetype: "Operator" },
      { text: "Being real and telling good stories", archetype: "Connector" },
      { text: "Being bold and different", archetype: "Disruptor" },
    ],
  },
  {
    question: "How do others see your leadership?",
    options: [
      { text: "Organized and reliable", archetype: "Operator" },
      { text: "Creative and brave", archetype: "Disruptor" },
      { text: "Kind and caring", archetype: "Connector" },
      { text: "Inspiring and full of purpose", archetype: "Visionary" },
    ],
  },
];

const archetypeDescriptions = {
  Visionary:
    "You are driven by purpose and big-picture thinking. You rally people with your clarity and ambition to create meaningful change.",
  Connector:
    "You lead through relationships, empathy, and collaboration. You unify teams and cultivate trust wherever you go.",
  Operator:
    "You value systems, execution, and consistency. You lead with reliability and structure, ensuring goals are met efficiently.",
  Disruptor:
    "You challenge norms and innovate fearlessly. You inspire by breaking barriers and redefining what’s possible.",
};

export default function BrandYouSimulator() {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [mission, setMission] = useState("");
  const [bio, setBio] = useState("");
  const [completed, setCompleted] = useState(false);
  const [archetype, setArchetype] = useState("");
  const [feedback, setFeedback] = useState({ mission: "", bio: "" });
  const [loading, setLoading] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (completed) {
      completeLeadershipChallenge(0, 0);
    }

    if (completed) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "understandableLeader",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: parseFloat(
          (totalTimeMs / (questions.length * 1000)).toFixed(2)
        ),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: true,
      });
      setStartTime(Date.now());
    }
  }, [completed]);

  const recordAnswer = (selectedArchetype) => {
    const newAnswers = [...answers, selectedArchetype];
    setAnswers(newAnswers);
    if (newAnswers.length === questions.length) {
      calculateArchetype(newAnswers);
      setStep(2);
    }
  };

  const calculateArchetype = (ans) => {
    const counts = {};
    ans.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    setArchetype(sorted[0][0]);
  };

  const handleMissionSubmit = () => {
    if (mission.trim()) setStep(3);
  };

  const handleBioSubmit = async () => {
    if (!bio.trim()) return;
    setLoading(true);
    const result = await getGeminiFeedback(mission, bio);
    setFeedback(result);
    setCompleted(true);
    setStep(4);
    setLoading(false);
  };

  const restartGame = () => {
    setStep(1);
    setAnswers([]);
    setMission("");
    setBio("");
    setArchetype("");
    setFeedback({ mission: "", bio: "" });
    setCompleted(false);
    setLoading(false);
    setStartTime(Date.now());
  };

  const getGeminiFeedback = async (mission, bio) => {
    const APIKEY = import.meta.env.VITE_API_KEY;
    const prompt = `
You are a career branding expert. Give constructive feedback on the following in exactly this JSON format:
{
  "missionFeedback": "your feedback here",
  "bioFeedback": "your feedback here"
}
Only return valid JSON, no markdown, no explanation, no commentary, no backticks.

Mission Statement: "${mission}"
LinkedIn Bio: "${bio}"
`;

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
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // 🔧 Clean Gemini output if it contains code block markers
      text = text.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(text);
      return {
        mission: parsed.missionFeedback || "No feedback.",
        bio: parsed.bioFeedback || "No feedback.",
      };
    } catch (err) {
      console.error("Gemini feedback error:", err);
      return {
        mission: "⚠️ Failed to get feedback.",
        bio: "⚠️ Failed to get feedback.",
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-teal-100 p-6 text-gray-800 font-[Comic_Sans_MS] selection:bg-pink-200 selection:text-purple-800">
      <div className="max-w-5xl mx-auto bg-white/80 rounded-[3rem] p-6 md:p-10 shadow-2xl border-4 border-yellow-200 transition-all duration-500">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center text-pink-600 drop-shadow-lg mb-6 tracking-tight animate-pulse"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🎨✨Brand You Simulator✨🎨
        </motion.h1>
        <p className="text-lg md:text-xl text-center text-purple-600 font-semibold mb-4">
          🧠 Discover your leadership superpower with a fun quiz!
        </p>

        {step === 1 && (
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-yellow-100 via-white to-pink-100 p-8 rounded-[2.5rem] shadow-2xl border-4 border-yellow-200 transition-all duration-300 hover:shadow-yellow-300">
            <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-4 drop-shadow-md tracking-tight">
              🔍🧠 Discover Your Leadership Archetype!
            </h2>

            <div className="text-center text-lg text-purple-700 font-semibold mb-6">
              Answer these fun questions to reveal your inner super-leader! 💥👑
            </div>

            {questions[answers.length] && (
              <>
                {/* 🎈 Animated Question Bubble */}
                <div className="relative mb-8 text-center">
                  <div className="inline-block px-6 py-4 bg-white/90 text-indigo-700 text-2xl font-extrabold rounded-[2rem] shadow-xl animate-bounce-slow border-4 border-purple-200">
                    🧠 {questions[answers.length].question} ❓
                  </div>
                </div>

                {/* 🌈 Option Cards with Floating Motion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {questions[answers.length].options.map((opt, idx) => (
                    <div
                      key={idx}
                      onClick={() => recordAnswer(opt.archetype)}
                      className="cursor-pointer bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-100 text-purple-800 text-center font-bold text-lg px-6 py-5 rounded-[2rem] shadow-lg border-4 border-pink-300 hover:border-yellow-300 transition-all duration-300 transform hover:scale-105 animate-floating-card min-h-[100px] h-[100px]"
                    >
                      {opt.text}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 shadow-2xl rounded-[2rem] p-8 max-w-2xl mx-auto text-center border-4 border-yellow-200 animate-bounce-slow">
            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-4 tracking-tight">
              ✍️ Craft Your Magical Mission Statement!
            </h2>
            <p className="text-purple-600 mb-4 font-medium">
              🌟 Write one sentence that reflects how you lead with purpose.
            </p>
            <textarea
              className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 bg-white text-purple-800 text-lg"
              rows={4}
              placeholder="Eg: I lead by empowering others to find purpose and spark change."
              value={mission}
              onChange={(e) => setMission(e.target.value)}
            />
            <button
              onClick={handleMissionSubmit}
              className="mt-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              🚀 Submit My Mission
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-gradient-to-br from-blue-100 via-white to-purple-100 shadow-2xl rounded-[2rem] p-8 max-w-2xl mx-auto text-center border-4 border-blue-200 animate-bounce-slow">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-3 tracking-tight">
              🌐 Upload Your LinkedIn Bio or Webpage Blurb!
            </h2>
            <p className="text-blue-600 mb-4 font-medium">
              📣 Share a short snippet that shows who you are and what you stand
              for.
            </p>
            <textarea
              className="w-full p-4 border-2 border-purple-300 rounded-2xl shadow-md bg-white text-blue-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
              rows={4}
              placeholder="Eg: Future tech leader | Empathy-driven change-maker | Social impact enthusiast..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <button
              onClick={handleBioSubmit}
              className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              🚀 Upload My Bio
            </button>

            {/* AI Loading State */}
            {loading && (
              <div className="text-center text-lg text-purple-600 mt-8 animate-pulse">
                ⏳ Analyzing your response with AI... 🧠✨
              </div>
            )}
          </div>
        )}

        {step === 4 && completed && !loading && (
          <div className="bg-gradient-to-br from-yellow-50 via-white to-green-100 p-10 max-w-3xl mx-auto rounded-[3rem] shadow-2xl border-[5px] border-dashed border-green-300 animate-bounce-slow">
            <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-6 tracking-tight underline decoration-wavy decoration-pink-400">
              📝 Leadership Report Card
            </h2>

            {/* 🎭 Archetype Section */}
            <div className="bg-white border-l-8 border-purple-400 rounded-xl shadow-md mb-6 p-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-1">
                🎭 Leadership Archetype
              </h3>
              <p className="text-xl text-pink-600 font-extrabold mb-1">
                {archetype}
              </p>
              <p className="italic text-gray-700">
                {archetypeDescriptions[archetype]}
              </p>
            </div>

            {/* 🧭 Mission Section */}
            <div className="bg-white border-l-8 border-yellow-400 rounded-xl shadow-md mb-6 p-6">
              <h3 className="text-2xl font-bold text-yellow-600 mb-1">
                🧭 Mission Statement
              </h3>
              <p className="text-lg text-gray-800 mb-2">
                <em>{mission}</em>
              </p>
              <p className="text-sm text-green-700">
                📌 Teacher’s Note: {feedback.mission}
              </p>
            </div>

            {/* 🌐 Bio Section */}
            <div className="bg-white border-l-8 border-blue-400 rounded-xl shadow-md mb-6 p-6">
              <h3 className="text-2xl font-bold text-blue-700 mb-1">
                🌐 Personal Bio
              </h3>
              <p className="text-lg text-gray-800 mb-2">
                <em>{bio}</em>
              </p>
              <p className="text-sm text-green-700">
                📌 Teacher’s Note: {feedback.bio}
              </p>
            </div>

            {/* 🔁 Restart Button */}
            <div className="mt-6">
              <button
                onClick={restartGame}
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                🔁 Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
