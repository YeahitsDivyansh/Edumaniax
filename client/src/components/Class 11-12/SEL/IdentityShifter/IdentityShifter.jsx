import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
// Expanded THEN vs NOW pairs
const initialThen = [
  { id: 1, text: "Used to give up easily", matched: false },
  { id: 2, text: "Avoided challenges", matched: false },
  { id: 3, text: "Didn’t speak up", matched: false },
  { id: 4, text: "Got frustrated quickly", matched: false },
  { id: 5, text: "Feared trying new things", matched: false },
  { id: 6, text: "Ignored feedback", matched: false },
  { id: 7, text: "Stayed in comfort zone", matched: false },
];

const nowCards = [
  { id: 2, text: "🚀 Takes on new challenges" },
  { id: 3, text: "🗣️ Shares ideas with confidence" },
  { id: 4, text: "😌 Stays calm & solves problems" },
  { id: 7, text: "🌱 Steps out of comfort zone" },
  { id: 1, text: "💪 Keeps trying after setbacks" },
  { id: 5, text: "🎯 Tries new things bravely" },
  { id: 6, text: "🧠 Learns from feedback" },
];

export default function IdentityShifter() {
  const { completeSELChallenge } = useSEL();
  const [thenList, setThenList] = useState(initialThen);
  const [draggingId, setDraggingId] = useState(null);
  const [celebrate, setCelebrate] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (celebrate) {
      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "SEL",
        topicName: "selfAwareness",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: durationSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: true,
      
      });
      setStartTime(Date.now());

    }
  }, [celebrate]);

  const onDragStart = (id) => setDraggingId(id);

  const onDrop = (dropId) => {
    if (draggingId === dropId) {
      const updated = thenList.map((item) =>
        item.id === dropId ? { ...item, matched: true } : item
      );
      setThenList(updated);
      setDraggingId(null);
      if (updated.every((item) => item.matched)) {
        setTimeout(() => {
          setCelebrate(true);
          completeSELChallenge(2, 0); // ✅ Mark as complete
        }, 600);
      }
    } else {
      toast.error("❌ Oops! That doesn't match. Try again!", {
        style: {
          borderRadius: "10px",
          background: "#ffe4e6",
          color: "#b91c1c",
          fontWeight: "bold",
        },
        icon: "🚫",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 p-6 sm:p-10 font-sans transition-all ease-in-out">
      <motion.div
        className="max-w-7xl mx-auto bg-white rounded-[2rem] p-8 sm:p-12 shadow-2xl border-4 border-purple-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="mb-10 tracking-tight text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Visible Gradient Title */}
          <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-xl animate-pulse pb-3">
            🌟 Identity Shifter 🌟
          </div>

          {/* Then -> Now Line with Bolder Arrow */}
          <div className="flex justify-center items-center gap-4 text-3xl sm:text-4xl font-bold">
            <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full shadow-sm border border-red-300">
              Then
            </span>

            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.2, 1], x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-10 h-10 stroke-[3] text-purple-800" />
            </motion.span>

            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full shadow-sm border border-green-300">
              Now!
            </span>
          </div>
        </motion.h1>


        <p className="text-center text-xl sm:text-2xl text-gray-700 mb-10">
          🧠 Match the “Then” habits with their “Now” glow-up! Drag & drop to grow! 🌱
        </p>

        {celebrate && (
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-green-600 animate-bounce">
              🎉 You’ve unlocked your growth superpowers!
            </h2>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* THEN SIDE */}
          <motion.div
            className="bg-gradient-to-br from-rose-100 to-red-100 p-6 rounded-2xl border-[3px] border-rose-300 shadow-[0_0_25px_rgba(244,114,182,0.4)] "
            animate={{ boxShadow: ["0 0 15px rgba(244,114,182,0.4)", "0 0 25px rgba(244,114,182,0.6)", "0 0 15px rgba(244,114,182,0.4)"] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-rose-600 mb-6 flex flex-col items-center text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              😟 Then
              <span className="text-lg font-medium text-rose-500">[Old Habits]</span>
            </motion.h2>

            {thenList.map(
              (item) =>
                !item.matched && (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={() => onDragStart(item.id)}
                    className="bg-white p-4 mb-4 rounded-xl text-rose-800 font-semibold cursor-grab border-2 border-rose-300 shadow hover:shadow-rose-300 transition duration-200"
                  >
                    {item.text}
                  </motion.div>
                )
            )}
          </motion.div>

          {/* NOW SIDE */}
          <motion.div
            className="bg-gradient-to-br from-emerald-100 to-teal-100 p-6 rounded-2xl border-[3px] border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.4)] "
            animate={{ boxShadow: ["0 0 15px rgba(52,211,153,0.4)", "0 0 25px rgba(52,211,153,0.6)", "0 0 15px rgba(52,211,153,0.4)"] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-6 flex flex-col items-center text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              😄 Now
              <span className="text-lg font-medium text-emerald-500">[You Today]</span>
            </motion.h2>

            {nowCards.map((card) => (
              <motion.div
                key={card.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(card.id)}
                className={`bg-white p-4 mb-4 rounded-xl font-semibold text-emerald-900 min-h-[55px] flex justify-between items-center border-2 shadow-md transition-all ${thenList.find((t) => t.id === card.id && t.matched)
                  ? "bg-emerald-200 border-emerald-500 shadow-emerald-400"
                  : "border-emerald-300"
                  }`}
              >
                <span>{card.text}</span>
                {thenList.find((t) => t.id === card.id && t.matched) && (
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>


        <div className="text-center mt-10">
          <button
            onClick={() => {
              setThenList(initialThen);
              setCelebrate(false);
              setStartTime(Date.now());

            }}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full text-lg shadow-lg transition"
          >
            🔄 Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
