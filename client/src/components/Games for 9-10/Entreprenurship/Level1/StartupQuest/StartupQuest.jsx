// StartupQuest.jsx
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './TextArea';
import { Sparkles, ChevronDown, Radar, MousePointerClick, UserRound } from "lucide-react";
import toast from 'react-hot-toast';
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance


// const painPoints = [
//   "📱 Social media anxiety", "😰 Academic burnout", "😶 Lack of emotional outlets", // Mental Health
//   "🥤 Single-use plastic in canteens", "🔌 Wasted electricity", "🚮 Poor waste segregation", // Eco Living
//   "🕹️ Addiction to violent games", "📴 Lack of educational games", "👨‍👩‍👧 No parental awareness", // Gaming for Good
//   "🎒 Heavy bags", "🕰 Long queues in canteen", "🤖 No hands-on startup exposure" // School Life
// ];

const themes = ["🧠 Mental Health", "🌱 Eco Living", "🎮 Gaming for Good", "📚 School Life Innovation"];
const painPoints = [
  "📱 Social media anxiety", , "🕰 Long queues in canteen", "📴 Lack of educational games", // Mental Health
  "🚮 Poor waste segregation", // Eco Living
  "🕹️ Addiction to violent games", "👨‍👩‍👧 No parental awareness", // Gaming for Good
  "🎒 Heavy bags", "🤖 No hands-on startup exposure" // School Life
  , "😰 Academic burnout", "😶 Lack of emotional outlets", "🥤 Single-use plastic in canteens", "🔌 Wasted electricity",
];
const scamperPrompts = ["✨ Substitute", "🧩 Combine", "🛠 Adapt", "🎨 Modify", "🚀 Another Use", "✂️ Eliminate", "🔁 Reverse"];

const scamperOptions = {
  "✨ Substitute": [
    "Replace phone scroll time with gratitude journaling",
    "Substitute plastic bottles with refill stations",
    "Use games instead of textbooks for learning concepts",
    "Substitute paper notices with app-based alerts"
  ],
  "🧩 Combine": [
    "Combine study timer with breathing exercises",
    "Gamify waste sorting with reward points",
    "Merge quiz-based gaming with classroom topics",
    "Link student ID to canteen pre-ordering"
  ],
  "🛠 Adapt": [
    "Adapt productivity apps to include mood check-ins",
    "Adapt traffic lights for class energy usage",
    "Adapt car racing games into budgeting games",
    "Use slot-booking system for lab/canteen"
  ],
  "🎨 Modify": [
    "Make school diaries into mood-tracking journals",
    "Redesign dustbins with cartoon themes",
    "Add storyline to mental wellness apps",
    "Redesign school timetable as a visual dashboard"
  ],
  "🚀 Another Use": [
    "Use fitness bands to track classroom stress",
    "Use old uniforms to make eco-bags",
    "Use Minecraft to simulate clean energy worlds",
    "Turn project submissions into startup ideas"
  ],
  "✂️ Eliminate": [
    "Cut toxic leaderboard apps",
    "Eliminate plastic food trays",
    "Remove violent ads from free games",
    "Eliminate repetitive morning announcements"
  ],
  "🔁 Reverse": [
    "Flip class competition into support systems",
    "Let canteen reward reusable container users",
    "Reverse ads → sponsor study-based game unlocks",
    "Allow students to design class rules"
  ]
};



export default function StartupQuest() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [draggedPain, setDraggedPain] = useState([]);
  const [persona, setPersona] = useState({ age: '', goals: '', frustrations: '' });
  const [ideas, setIdeas] = useState({});
  const [pitch, setPitch] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const handleReset = () => {
    setSelectedTheme("");
    setDraggedPain([]);
    setPersona({ age: '', goals: '', frustrations: '' });
    setIdeas({});
    setPitch("");
    setShowSummary(false);
    setStartTime(Date.now());

  };

  const handleDrop = (e, pain) => {
    e.preventDefault();
    if (!draggedPain.includes(pain)) {
      setDraggedPain([...draggedPain, pain]);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const generatePersonaSummary = () => {
    return `🧒 Meet Alex! A bright ${persona.age}-year-old who dreams of ${persona.goals} 💫 but feels stuck because of ${persona.frustrations} 😟.`;
  };

  const handleSubmit = () => {
    const missing = [];
    if (!selectedTheme) missing.push("theme");
    if (draggedPain.length === 0) missing.push("pain points");
    if (!persona.age || !persona.goals || !persona.frustrations) missing.push("persona");
    if (Object.keys(ideas).filter(k => !k.endsWith('_text')).length < scamperPrompts.length) missing.push("SCAMPER ideas");
    if (!pitch.trim()) missing.push("pitch");

    if (missing.length > 0) {
      toast.error("❗ Please complete all activities before continuing.");
      return;
    }

    // ✅ Mark challenge as completed
    completeEntreprenerushipChallenge(0, 0);

    // ⏱️ Performance tracking
    const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
    const studyTimeMinutes = Math.ceil(timeTakenSec / 60);

    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "ideationIntellect",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes,
      completed: true,

    });
    setStartTime(Date.now());
    setShowSummary(true);
  };

  if (showSummary) {
    return (
      <div className="p-10 sm:p-14 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-200 via-rose-300 to-sky-300 min-h-screen text-lg text-center relative overflow-hidden rounded-t-[3rem] shadow-2xl border-4 border-white/60 backdrop-blur-lg">

        {/* Background Decoratives */}
        <div className="absolute -top-16 -left-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-10 right-0 w-40 h-40 bg-sky-400 rounded-full blur-2xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-yellow-300 rounded-full blur-2xl opacity-20 animate-pulse"></div>

        {/* Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{
            y: [0, -12, 0, 12, 0],
            rotate: [0, 2, -2, 2, 0],
            scale: [1, 1, 1],
            opacity: 1
          }}
          transition={{
            duration: 5,
            repeat: Infinity,

          }}
          className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-400 drop-shadow-[0_0_20px_rgba(255,0,128,0.6)]   pb-2 mb-2"
        >
          🚀 Startup Quest Summary!
        </motion.h2>



        {/* Theme */}
        <p className="text-2xl text-purple-800 font-bold mb-4">
          🎨 Theme Chosen: <span className="underline decoration-wavy decoration-pink-500">{selectedTheme}</span>
        </p>

        {/* Dragged Issues */}
        <p className="mb-6 text-lg text-blue-700 bg-white/70 inline-block px-4 py-2 rounded-full shadow">
          🚨 Radar Issues: <span className="font-semibold text-purple-900">{draggedPain.join(", ")}</span>
        </p>

        {/* Persona Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 rounded-2xl p-6 mx-auto max-w-2xl text-pink-700 font-medium shadow-lg mb-8 border border-pink-200"
        >
          <p className="text-xl leading-relaxed">{generatePersonaSummary()}</p>
        </motion.div>

        {/* SCAMPER Ideas */}
        <div className="bg-gradient-to-br from-yellow-100 via-white to-pink-100 p-6 rounded-3xl shadow-lg max-w-2xl mx-auto border border-yellow-300">
          <h3 className="text-orange-500 font-bold text-2xl mb-4">💡 SCAMPER-Inspired Innovations</h3>
          <ul className="list-disc list-inside space-y-2 text-left text-purple-800">
            {scamperPrompts.map(prompt => (
              <li key={prompt}>
                <strong className="text-pink-600">{prompt}</strong>: {ideas[prompt] || "—"}
              </li>
            ))}
          </ul>
        </div>

        {/* Final Pitch */}
        <div className="mt-8 bg-purple-100/70 border-2 border-purple-300 p-6 rounded-3xl max-w-2xl mx-auto shadow-md backdrop-blur-sm">
          <h3 className="text-pink-700 font-extrabold text-2xl mb-3 tracking-wide">🎤 Your Final Pitch</h3>
          <p className="text-purple-900 italic text-lg">{pitch}</p>
        </div>

        {/* Reset Button */}
        <Button className="mt-10 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold px-8 py-3 rounded-full shadow-xl text-xl transition-transform hover:scale-105" onClick={handleReset}>
          🔁 Play Again
        </Button>
      </div>
    );
  }


  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-yellow-100 to-pink-100 min-h-screen text-lg">
      <div className="absolute -top-12 -left-16 w-48 h-48 bg-rose-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-sky-300 rounded-full blur-2xl opacity-20 animate-bounce"></div>
      <motion.h2
        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
        animate={{
          y: [0, -12, 0, 12, 0],
          rotate: [0, 2, -2, 2, 0],
          scale: [1, 1, 1],
          opacity: 1
        }}
        transition={{
          duration: 5,
          repeat: Infinity,

        }}
        className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-400 drop-shadow-[0_0_20px_rgba(255,0,128,0.6)] animate-pulse pb-3"
      >
        🚀 Startup Quest Summary!
      </motion.h2>


      {/* 🎨 Theme Selector */}
      <Card className="bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 border-4 border-dashed border-pink-300 rounded-3xl shadow-xl">
        <CardContent className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -5, 0, 5, 0] }}
            className="text-3xl font-extrabold text-blue-600 flex items-center justify-center gap-3"
          >

            <Sparkles className="w-8 h-8 text-purple-500 animate-bounce" />
            Pick Your Innovation Arena!
          </motion.h3>

          <div className="relative">
            <select
              className="w-full p-4 sm:p-5 border-4 border-purple-300 rounded-full bg-white text-purple-800 font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 appearance-none"
              onChange={(e) => setSelectedTheme(e.target.value)}
              value={selectedTheme}
            >
              <option value="">✨ Select a Theme to Begin...</option>
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>

            {/* Lucide Chevron Icon */}
            <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-purple-600 w-6 h-6 pointer-events-none animate-bounce" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 border-4 border-dashed border-blue-300 rounded-3xl shadow-xl">
        <CardContent className="space-y-6">
          {/* Header with icon and animation */}
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -5, 0, 5, 0] }}
            className="text-3xl font-extrabold text-blue-600 flex items-center justify-center gap-3"
          >
            <Radar className="w-8 h-8 text-purple-600 animate-pulse" />
            Problem Radar Canvas
          </motion.h3>
          <p className="text-center text-sm text-gray-600 italic">
            🎯 Drag & drop <span className="font-semibold text-purple-600">only those challenges</span> that relate to your selected theme — focus on what really matters!
          </p>

          {/* Draggable Problems */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {painPoints.map((pain, index) => (
              <motion.div
                key={pain}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', pain)}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                <div className="bg-gradient-to-r from-yellow-200 to-orange-300 transition-all duration-300 text-black font-semibold px-4 py-2 rounded-full shadow-lg border border-yellow-500 cursor-grab">
                  <MousePointerClick className="inline-block w-4 h-4 mr-2" />
                  {pain}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reset Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => setDraggedPain([])}
              className="px-6 py-2 rounded-full bg-red-100 text-red-700 font-bold border border-red-300 shadow hover:bg-red-200 transition"
            >
              🔄 Reset Selections
            </button>
          </div>


          {/* Dropzone */}
          <motion.div
            onDrop={(e) => handleDrop(e, e.dataTransfer.getData('text'))}
            onDragOver={allowDrop}

            className="mt-8 border-4 border-dashed border-indigo-400 p-6 min-h-[140px] rounded-[2rem] bg-white/70 shadow-2xl backdrop-blur-sm"
          >
            <h4 className="text-lg font-bold text-indigo-800 mb-2">📍 Your Radar Picks:</h4>
            {draggedPain.length === 0 ? (
              <p className="font-bold text-gray-800 animate-bounce">👆 Drag issues above and drop them here...</p>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {draggedPain.map((p, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="inline-block bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white px-4 py-1 rounded-full font-bold shadow-md border border-white"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Persona Builder */}
      <Card>
        <CardContent className="space-y-5">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -5, 0, 5, 0] }}
            className="text-3xl font-extrabold text-blue-600 flex items-center justify-center gap-3"
          >
            <UserRound className="text-blue-600 w-6 h-6" />
            Let's Build a Hero Persona!
          </motion.h3>


          {/* Age */}
          <div className="space-y-1">
            <label className="text-lg font-semibold text-purple-700">🎂 Age</label>
            <p className="text-sm text-gray-500">Enter your persona's current age to help us better contextualize their journey.</p>
            <Input
              type="number"
              min="6"
              max="100"
              className="bg-purple-50 border-purple-300 focus:ring-purple-400"
              onChange={(e) => setPersona({ ...persona, age: e.target.value })}
            />
          </div>

          {/* Goals */}
          <div className="space-y-1">
            <label className="text-lg font-semibold text-purple-700">🏆 Personal Dreams & Goals</label>
            <p className="text-sm text-gray-500">What does this person aspire to become or achieve?</p>
            <Input
              className="bg-purple-50 border-purple-300 focus:ring-purple-400"
              onChange={(e) => setPersona({ ...persona, goals: e.target.value })}
            />
          </div>

          {/* Frustrations */}
          <div className="space-y-1">
            <label className="text-lg font-semibold text-purple-700">😤 Everyday Frustrations</label>
            <p className="text-sm text-gray-500">Mention pain points, challenges, or things that bother them.</p>
            <Input
              className="bg-purple-50 border-purple-300 focus:ring-purple-400"
              onChange={(e) => setPersona({ ...persona, frustrations: e.target.value })}
            />
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-4 rounded-xl shadow-inner border border-purple-200">
            <p className="text-md font-medium text-purple-800">📌 <span className="font-bold">Persona Summary:</span></p>
            <p className="text-purple-700 font-semibold italic">{generatePersonaSummary()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Idea Generation – SCAMPER */}
      <Card className="bg-gradient-to-tr from-yellow-50 via-pink-50 to-purple-50 shadow-xl border border-orange-200">
        <CardContent className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -5, 0, 5, 0] }}
            className="text-3xl font-extrabold text-blue-600 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
            Let's Spark Ideas with SCAMPER!
          </motion.h3>


          <p className="text-base text-purple-800 font-medium">
            Use each SCAMPER prompt to turn real problems into smart and creative solutions. Just pick an idea or write your own!
          </p>
          {scamperPrompts.map(prompt => (
            <motion.div
              key={prompt}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="space-y-4 bg-gradient-to-br from-purple-50 via-yellow-50 to-white border-l-4 border-purple-400 p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <label className="text-2xl font-extrabold text-purple-700 tracking-wide flex items-center gap-2">
                {prompt}
              </label>

              <select
                value={ideas[prompt] && scamperOptions[prompt].includes(ideas[prompt]) ? ideas[prompt] : ""}
                onChange={(e) => {
                  setIdeas(prev => ({
                    ...prev,
                    [prompt]: e.target.value,
                    [prompt + "_text"]: "" // Clear custom if dropdown used
                  }));
                }}
                className="w-full p-4 border-2 border-yellow-300 rounded-full bg-yellow-100 text-purple-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">🔍 Explore a unique approach</option>
                {scamperOptions[prompt].map((opt, i) => (
                  <option key={i} value={opt}>💡 {opt}</option>
                ))}
              </select>

              <Textarea
                className="w-full text-purple-800 bg-white/60 border border-purple-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                placeholder={`✏️ Got your own idea for "${prompt}"? Share your twist here!`}
                value={ideas[prompt + "_text"] || ""}
                onChange={(e) => {
                  const customText = e.target.value;
                  setIdeas(prev => ({
                    ...prev,
                    [prompt]: customText,
                    [prompt + "_text"]: customText
                  }));
                }}
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>


      {/* Pitch Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="bg-gradient-to-br from-rose-100 via-yellow-50 to-purple-100 shadow-2xl rounded-3xl border-pink-200 border-2">
          <CardContent className="space-y-4">
            <h3 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-yellow-500 drop-shadow-lg">
              🎤 Pitch It Loud: Share Your Big Idea!
            </h3>

            <p className="text-sm text-purple-700 italic text-center">
              ✨ Craft a compelling pitch that explains your idea’s magic. Think big, be bold, and let your creativity shine!
            </p>

            <Textarea
              className="bg-white/80 border-2 border-purple-300 rounded-xl p-4 text-lg shadow-inner focus:ring-2 focus:ring-pink-300"
              placeholder="📝 Type your pitch here... Make it persuasive and inspiring!"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
            />
          </CardContent>
        </Card>
      </motion.div>


      <div className="text-center">
        <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-xl" onClick={handleSubmit}>🚀 Launch My Idea!</Button>
      </div>
    </div>
  );
}
