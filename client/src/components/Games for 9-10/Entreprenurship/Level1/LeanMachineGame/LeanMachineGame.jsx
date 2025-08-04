// LeanMachineGame.jsx
import React, { useState } from 'react';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import AIHomeworkAnimation from '@/components/AIHomework';
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const canvasSections = [
  "Problem", "Solution", "Key Metrics", "Unique Value Proposition",
  "Channels", "Customer Segments", "Cost Structure",
  "Revenue Streams", "Unfair Advantage"
];

const suggestions = {
  problem: [
    "Homework takes too long",
    "Students struggle to find accurate answers",
    "Lack of 24/7 homework support"
  ],
  solution: [
    "AI chatbot to solve homework instantly",
    "Step-by-step explanations for better understanding",
    "24/7 intelligent assistant with subject-specific help"
  ],
  keymetrics: [
    "Daily active users",
    "Homework completion rate",
    "Retention after 7 days"
  ],
  uniquevalueproposition: [
    "Instant, accurate answers powered by AI",
    "Friendly tutor-like experience",
    "Built for students by students"
  ],
  channels: [
    "Instagram reels with study tips",
    "YouTube explainer videos",
    "School newsletter promotions",
    "WhatsApp sharing & peer invites"
  ],
  customersegments: [
    "High school students",
    "College freshmen",
    "Parents of struggling students"
  ],
  coststructure: [
    "AI model hosting",
    "Content verification team",
    "Marketing and promotions"
  ],
  revenuestreams: [
    "Monthly student subscriptions",
    "Freemium model with paid features",
    "Sponsored study tools"
  ],
  unfairadvantage: [
    "Custom AI model trained on curriculum",
    "Partnerships with tutoring centers",
    "Community of student ambassadors"
  ]
};
const featureModules = [
  'Title',
  'Question Box',
  'AI Answer Bubble',
  'Submit Button',
  'AI Hint Box',
  'Voice Input Icon',
  'Image Upload',
  'Tip of the Day'
];
const channels = suggestions.channels;
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

const challengeCards = [
  {
    challenge: "Your demo launch was ignored!",
    options: ["Use video explainer", "Post on student forums", "Delay release"],
    correct: "Use video explainer"
  },
  {
    challenge: "Students are confused by the UI!",
    options: ["Add onboarding", "Simplify the layout", "Remove AI icon"],
    correct: "Simplify the layout"
  }
];

export default function LeanMachineGame() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const { width, height } = useWindowSize();
  const [canvasData, setCanvasData] = useState({});
  const [draggingText, setDraggingText] = useState("");
  const [draggingItem, setDraggingItem] = useState(null);
  const [placedItems, setPlacedItems] = useState([]);
  const [draggingChannel, setDraggingChannel] = useState(null);
  const [gtmPlan, setGtmPlan] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [canvasBg, setCanvasBg] = useState("bg-gray-50");
  const [dragIndex, setDragIndex] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const currentCard = challengeCards[currentIndex];
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleMouseDown = (e, index) => {
    setDragIndex(index);
    const canvas = e.currentTarget.parentNode.getBoundingClientRect();
    const offsetX = e.clientX - placedItems[index].x - canvas.left;
    const offsetY = e.clientY - placedItems[index].y - canvas.top;

    const handleMouseMove = (moveEvent) => {
      const x = moveEvent.clientX - canvas.left - offsetX;
      const y = moveEvent.clientY - canvas.top - offsetY;

      const updated = [...placedItems];
      updated[index] = { ...updated[index], x, y };
      setPlacedItems(updated);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setDragIndex(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleSubmit = () => setShowAnswer(true);
  const handleNext = () => {
    setSelectedOption("");
    setShowAnswer(false);
    if (currentIndex + 1 < challengeCards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleDropProto = (e) => {
    e.preventDefault();
    const canvas = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvas.left;
    const y = e.clientY - canvas.top;
    setPlacedItems([...placedItems, { type: draggingItem, x, y }]);
    setDraggingItem(null);
  };

  const handleDrop = (e, section) => {
    e.preventDefault();
    setCanvasData({
      ...canvasData,
      [section]: (canvasData[section] || "") + draggingText,
    });
    setDraggingText("");
  };

  const handleRestart = () => {
    setCanvasData({});
    setDraggingText("");
    setDraggingItem(null);
    setPlacedItems([]);
    setDraggingChannel(null);
    setGtmPlan({});
    setMcqAnswers({});
    setSelectedOption("");
    setShowAnswer(false);
    setCurrentIndex(0);
    setQuizComplete(false);
    setGameFinished(false);
    setStartTime(Date.now());

  };

  const handleFinish = () => {
    const allCanvasFilled = canvasSections.every((section) => canvasData[section]);
    const allGtmFilled = weeks.every((week) => gtmPlan[week] && mcqAnswers[week]);
    const allQuizDone = quizComplete;

    if (!allCanvasFilled) {
      toast.error("🧩 Please complete all Lean Canvas sections.");
    } else if (!allGtmFilled) {
      toast.error("📢 Complete all GTM Planner weeks with reason.");
    } else if (!allQuizDone) {
      toast.error("🎯 Finish all Market Challenge questions.");
    } else {
      completeEntreprenerushipChallenge(0, 1);

      // ⏱️ Performance tracking
      const endTime = Date.now();
      const timeTakenSec = (endTime - startTime) / 1000;
      const timeTakenMin = Math.round(timeTakenSec / 60);

      const correctAnswers = challengeCards.filter(
        (card, idx) => mcqAnswers[idx]?.trim() === card.correct
      ).length;

      const score = Math.round((correctAnswers / challengeCards.length) * 10);
      const accuracy = Math.round((correctAnswers / challengeCards.length) * 100);

      updatePerformance({
        moduleName: "Entrepreneurship",
        topicName: "strategist",
        score,
        accuracy,
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: timeTakenMin,
        completed: true,

      });
      setStartTime(Date.now());
      setGameFinished(true);
    }
  };


  if (gameFinished) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 via-yellow-50 to-white px-4 text-center animate-fade-in">
        <Confetti width={width} height={height} recycle={false} numberOfPieces={600} />

        <div className="bg-white/90 backdrop-blur-md shadow-2xl border-4 border-green-300 rounded-3xl p-10 max-w-2xl w-full transition-all duration-500 scale-100 hover:scale-[1.02]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700 drop-shadow mb-2 tracking-tight">
            🚀 Mission Complete!
          </h2>

          <p className="text-lg sm:text-xl text-gray-800 font-medium mb-2 leading-relaxed">
            You've officially built your own <span className="text-purple-600 font-semibold">AI Homework Hero</span>!
            🌟 Your creative founder journey was bold, smart, and unforgettable.
          </p>

          <div className="mb-3">
            <AIHomeworkAnimation />
          </div>

          <p className="text-md text-gray-700 italic mb-3">
            🎯 Keep solving, keep building — the next big idea might be just one click away!
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
          >
            🔁 Play Again
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100  min-h-screen">


      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-indigo-100 text-center mb-10 shadow-xl border border-purple-200">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold text-purple-800 drop-shadow-md tracking-wide mb-4"
          initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
          animate={{
            scale: [0.9, 1.05, 1],
            rotate: [0, 2, -2, 0],
            opacity: 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          🎮 Build Your Lean Machine
        </motion.h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 tracking-tight mb-3">
          🧠 AI Homework Helper Edition
        </h2>

        <p className="text-gray-800 text-md sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Step into the shoes of a creative founder building an AI that <span className="text-purple-700 font-semibold">instantly helps students solve homework</span>. This game challenges your strategy and imagination!
        </p>

        <div className="mt-6 text-left max-w-2xl mx-auto bg-white/80 rounded-xl p-5 text-base text-gray-700 shadow-inner border-l-4 border-indigo-300">
          <p>📋 <strong>Lean Canvas:</strong> Brainstorm your business model block by block.</p>
          <p>🎨 <strong>Prototype Builder:</strong> Design your AI helper's interface with drag-and-drop tools.</p>
          <p>📢 <strong>GTM Planner:</strong> Map out how you’ll launch and promote your app.</p>
          <p>💡 <strong>Market Challenges:</strong> Handle real-world curveballs with smart decisions.</p>
        </div>
      </div>



      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 rounded-2xl shadow-xl border border-purple-200">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-700 mb-3 tracking-tight">
            📋 Lean Canvas
          </h3>
          <p className="text-base text-gray-700 mb-6 leading-relaxed  ">
            🎓 You're designing an AI Homework Helper! Fill each box with ideas—either pick from dropdowns or type your own creative solution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {canvasSections.map((section, index) => {
              const sectionKey = section.toLowerCase().replace(/\s+/g, '');
              const options = suggestions[sectionKey] || [];

              const bgColors = [
                "bg-purple-100", "bg-indigo-100", "bg-pink-100",
                "bg-yellow-100", "bg-blue-100", "bg-green-100"
              ];
              const cardBg = bgColors[index % bgColors.length];

              return (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`rounded-xl border border-purple-300 shadow-md ${cardBg} p-4 animate-pulse`}
                >
                  <label className="text-md font-semibold text-purple-800 block mb-1">
                    🧩 {section}
                  </label>

                  {options.length > 0 && (
                    <select
                      className="w-full border border-purple-300 bg-white text-sm rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      onChange={(e) =>
                        setCanvasData({
                          ...canvasData,
                          [section]: e.target.value,
                        })
                      }
                      value={canvasData[section] || ''}
                    >
                      <option value="">✨ Choose a suggestion...</option>
                      {options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  <textarea
                    className="w-full border border-purple-300 rounded px-3 py-2 text-sm text-gray-800 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder={`Or type ✍️ your idea here for "${section}"`}
                    value={canvasData[section] || ''}
                    onChange={(e) =>
                      setCanvasData({ ...canvasData, [section]: e.target.value })
                    }
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🎨 Prototype Builder for AI Homework Helper */}
      <div className="p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-white rounded-2xl shadow-lg border border-indigo-200 mb-12">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-800 mb-3 tracking-tight">
          🎨 Build Your AI Homework Helper UI
        </h3>
        <p className="text-base text-gray-700 mb-3 leading-relaxed">
          🧠 Drag elements below into the canvas to design how your AI assistant will interact with students.
          Customize the interface to make learning fun, helpful, and smart!
        </p>
        <p className="text-sm text-gray-600 mb-5 italic">
          🧩 Tip: Mix widgets to simulate real student queries and responses. Change background to match your AI personality.
        </p>


        {/* Canvas Background Color Selector */}
        <div className="mb-5 flex flex-wrap items-center gap-4">
          <label className="font-bold text-md text-gray-700">
            🎨 Choose Canvas Background:
          </label>
          <select
            className="border border-purple-300 rounded px-3 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={canvasBg}
            onChange={(e) => setCanvasBg(e.target.value)}
          >
            <option value="bg-indigo-200">💡 Indigo Brainstorm</option>
            <option value="bg-blue-200">📘 Homework Blue</option>
            <option value="bg-teal-200">🤖 AI Teal</option>
            <option value="bg-violet-200">🔮 Neon Violet</option>
            <option value="bg-rose-200">⚠️ Alert Rose</option>
            <option value="bg-yellow-200">🖍 Highlight Yellow</option>
            <option value="bg-cyan-200">📤 Prompt Cyan</option>
          </select>
        </div>
        <p className="text-md font-bold text-gray-700 mb-4 leading-relaxed">
          🛠 Below are smart building blocks for your AI-powered helper :
        </p>

        {/* Draggable Components */}
        <div className="flex flex-wrap gap-4 items-center mb-6">

          {featureModules.map((item) => (
            <div
              key={item}
              draggable
              onDragStart={() => setDraggingItem(item)}
              className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium border border-yellow-500 rounded shadow-md cursor-move transition-all text-sm"
            >
              {item}
            </div>
          ))}
          <button
            onClick={() => setPlacedItems([])}
            className="ml-auto px-4 py-2 bg-gradient-to-r from-red-200 to-red-300 text-red-800 font-semibold border border-red-400 rounded shadow hover:shadow-md text-sm transition"
          >
            🔄 Reset Canvas
          </button>
        </div>

        {/* Drop Canvas */}
        <div
          className={`relative w-full h-[400px] ${canvasBg} border-4 border-dashed border-blue-200 rounded-lg overflow-hidden`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropProto}
          onMouseDown={(e) => handleMouseDown(e, idx)}
        >
          {placedItems.map((item, idx) => (
            <div
              key={idx}
              onMouseDown={(e) => handleMouseDown(e, idx)}
              className="absolute p-3 border shadow-xl text-base rounded-xl cursor-move transition-all duration-300 hover:scale-105"
              style={{
                top: item.y,
                left: item.x,
                width:
                  item.type === 'Question Box' || item.type === 'AI Answer Bubble'
                    ? '60%'
                    : 'auto',
                height:
                  item.type === 'Question Box' ? '60px' :
                    item.type === 'AI Answer Bubble' ? '160px' :
                      'auto',
                backgroundColor:
                  item.type === 'Question Box' ? '#FEF3C7' :
                    item.type === 'AI Answer Bubble' ? '#D1FAE5' :
                      item.type === 'AI Hint Box' ? '#FDE68A' :
                        item.type === 'Tip of the Day' ? '#DDD6FE' :
                          item.type === 'Voice Input Icon' ? '#E0F2FE' :
                            item.type === 'Submit Button' ? '#BFDBFE' :
                              item.type === 'Image Upload' ? '#EDE9FE' : '#FFFFFF'
              }}
            >
              {item.type === 'Question Box' && (
                <input
                  placeholder="🧠 Ask your question..."
                  className="border border-gray-300 px-4 py-2 w-full h-full text-base rounded bg-gray-100"
                  disabled
                />
              )}

              {item.type === 'AI Answer Bubble' && (
                <div className="bg-white border-l-4 border-green-500 rounded p-4 text-base w-full h-full shadow-inner text-gray-700 overflow-y-auto">
                  🤖 AI: Here's your detailed and accurate answer with extra space for longer responses.
                </div>
              )}

              {item.type === 'Submit Button' && (
                <button
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-xl text-base shadow-xl cursor-not-allowed opacity-90"
                  disabled
                >
                  🚀 Submit to AI
                </button>
              )}

              {item.type === 'AI Hint Box' && (
                <div className="text-sm bg-yellow-100 p-3 rounded shadow-inner w-[220px]">
                  💡 Try rephrasing your question for better results.
                </div>
              )}
              {item.type === 'Voice Input Icon' && (
                <button
                  className="text-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-full shadow-xl cursor-not-allowed opacity-90"
                  disabled
                >
                  🎙️
                </button>
              )}

              {item.type === 'Image Upload' && (
                <label className="inline-block text-sm text-white bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 rounded-full shadow-lg cursor-not-allowed opacity-90">
                  📷 Upload Image
                  <input type="file" accept="image/*" className="hidden" disabled />
                </label>
              )}

              {item.type === 'Tip of the Day' && (
                <div className="text-sm bg-purple-100 p-3 rounded w-[240px]">
                  📌 Tip: Stay focused, ask one question at a time!
                </div>
              )}
              {item.type === 'Title' && (
                <h2 className="text-2xl font-bold text-blue-800 bg-blue-100 px-4 py-2 rounded shadow-md">
                  📘 Homework Helper UI
                </h2>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 📅 GTM Planner */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-xl shadow-xl border border-indigo-200 mb-10">
        <h3 className="text-2xl font-bold text-indigo-700 mb-2">📅 Go-To-Market Launch Planner</h3>
        <p className="text-sm text-gray-700 mb-4">
          📢 Drag your marketing channels into each week below to plan your launch.
          <br />
          💬 Pick the best strategy to connect with students and build hype!
        </p>

        {/* Channel Cards */}
        <div className="flex flex-wrap gap-3 mb-6">
          {channels
            .filter((ch) => !Object.values(gtmPlan).includes(ch))
            .map((ch) => (
              <div
                key={ch}
                draggable
                onDragStart={() => setDraggingChannel(ch)}
                className="px-4 py-2 bg-yellow-200 text-gray-800 font-medium rounded-full shadow-md text-sm cursor-move hover:bg-yellow-300 transition-all"
              >
                🚀 {ch}
              </div>
            ))}
        </div>

        {/* Weekly Planner Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {weeks.map((week) => (
            <div
              key={week}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                setGtmPlan({ ...gtmPlan, [week]: draggingChannel });
                setDraggingChannel(null);
              }}
              className="bg-white border-4 border-dashed border-purple-300 rounded-lg min-h-[160px] p-4 shadow-inner hover:border-purple-400 transition-all"
            >
              <p className="font-bold text-purple-700 text-lg mb-2">🗓️ {week}</p>

              {gtmPlan[week] ? (
                <>
                  <div className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full inline-block mb-2 shadow">
                    📣 {gtmPlan[week]}
                  </div>
                  <div className="text-sm">
                    <p className="mb-1 text-gray-700">🎯 Why this channel?</p>
                    <select
                      className="w-full border rounded p-1 bg-blue-50 text-sm"
                      value={mcqAnswers[week] || ""}
                      onChange={(e) =>
                        setMcqAnswers({ ...mcqAnswers, [week]: e.target.value })
                      }
                    >
                      <option value="">Choose a reason...</option>
                      <option value="Students active here">👩‍🎓 Students active here</option>
                      <option value="High engagement">📈 High engagement</option>
                      <option value="Low cost">💸 Low cost</option>
                    </select>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 italic text-sm">⬇️ Drop a channel here</p>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* Market Challenge Quiz */}
      <div className="p-6 flex justify-center">
        {!quizComplete && currentCard && (
          <div className="animate-fade-in-down p-6 bg-gradient-to-br from-red-50 via-white to-pink-50 rounded-2xl shadow-xl max-w-xl w-full space-y-5 border-4 border-dashed border-red-300">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-4 text-center tracking-tight">
              🎯 Market Challenge Round
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6 max-w-2xl mx-auto">
              Test your startup instincts! Read the scenario and pick the best business decision to keep your AI Homework Helper on track.
            </p>
            <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
              🚨 Challenge: <span className="italic">{currentCard.challenge}</span>
            </h2>

            {currentCard.options.map((option, idx) => (
              <label
                key={idx}
                className={`block px-4 py-2 rounded-lg border hover:shadow-md transition-all cursor-pointer ${selectedOption === option
                  ? "bg-red-100 border-red-300"
                  : "bg-white border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="challenge"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="mr-3"
                  disabled={showAnswer}
                />
                {option}
              </label>
            ))}

            {!showAnswer && (
              <button
                disabled={!selectedOption}
                onClick={handleSubmit}
                className={`mt-4 px-6 py-2 rounded-full text-white font-semibold transition-all ${selectedOption
                  ? "bg-green-500 hover:bg-green-600 shadow"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                ✅ Submit Answer
              </button>
            )}

            {showAnswer && (
              <div className="space-y-3">
                {selectedOption === currentCard.correct ? (
                  <p className="text-green-600 font-semibold text-center">
                    ✅ Great job! Your answer is correct.
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold text-center">
                    ❌ Oops! The correct answer is: <strong>{currentCard.correct}</strong>
                  </p>
                )}
                <div className="text-center">
                  <button
                    onClick={handleNext}
                    className="mt-2 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  >
                    ⏭ Next Challenge
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {quizComplete && (
          <div className="p-6 text-center bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl max-w-xl mt-2 shadow-xl animate-fade-in-up">
            <h2 className="text-3xl font-extrabold text-green-700 mb-2">🎉 Mission Accomplished!</h2>
            <p className="text-gray-700 text-lg mb-1">You've tackled every twist like a true entrepreneur.</p>
            <p className="text-gray-600 text-base">Your AI Homework Helper is now one step closer to launch! 🚀</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-10 mb-16">
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-red-100 text-red-700 border border-red-300 rounded-full hover:bg-red-200 font-semibold shadow"
        >
          🔁 Restart Game
        </button>
        <button
          onClick={handleFinish}
          className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 font-semibold shadow"
        >
          ✅ Finish Game
        </button>
      </div>
    </div>
  );
}
