import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const responses = [
  {
    type: "Stay Quiet",
    emoji: "🤐",
    text: "Say nothing and listen, even if you're tired.",
    score: 2,
    feedback: {
      result: "You didn’t speak up, and now you feel drained.",
      advice: "It's okay to take care of your own feelings too."
    }
  },
  {
    type: "Speak Kindly",
    emoji: "💬",
    text: "Say, 'I care, but I'm tired. Can we talk later?'",
    score: 10,
    feedback: {
      result: "You were kind and honest. Your friend understands.",
      advice: "Speaking up nicely helps keep your friendship strong."
    }
  },
  {
    type: "React Harshly",
    emoji: "😠",
    text: "Say, 'Stop it! I'm not your therapist!'",
    score: 1,
    feedback: {
      result: "Your friend got hurt and stopped talking to you.",
      advice: "Being too angry can push people away."
    }
  },
  {
    type: "Avoid Friend",
    emoji: "🕶️",
    text: "Stop replying to their messages.",
    score: 3,
    feedback: {
      result: "You feel safe, but your friend feels confused.",
      advice: "It’s okay to pause, but clear words help more."
    }
  },
  {
    type: "Distract",
    emoji: "🧃",
    text: "Change the topic to something fun.",
    score: 5,
    feedback: {
      result: "You both laugh, but the real problem stays.",
      advice: "Distraction helps short-term. Talking helps long-term."
    }
  },
  {
    type: "Set a Time",
    emoji: "🕰️",
    text: "Say, 'Let's talk after dinner. I want to give you full attention.'",
    score: 9,
    feedback: {
      result: "You create space without rejecting them.",
      advice: "Scheduling shows care and protects your energy."
    }
  },
  {
    type: "Use Humor",
    emoji: "😅",
    text: "Make a light joke: 'Wow, your drama is a Netflix series!'",
    score: 4,
    feedback: {
      result: "They laugh, but may not feel heard.",
      advice: "Humor softens things but shouldn’t replace honesty."
    }
  },
  {
    type: "Offer Limited Support",
    emoji: "🤝",
    text: "Say, 'I can listen for 5 minutes, then I need rest.'",
    score: 8,
    feedback: {
      result: "You offer help while setting a clear limit.",
      advice: "Small boundaries keep things balanced and kind."
    }
  },
  {
    type: "Text Instead",
    emoji: "📱",
    text: "Say, 'I’m tired now. Can you text me instead of calling?'",
    score: 6,
    feedback: {
      result: "You reduce intensity, but stay connected.",
      advice: "Using tech tools can give emotional space."
    }
  }
];

// Generate suggestion based on score
const getSuggestion = (score) => {
  if (score >= 9) return "🎉 Great job! You balanced care and honesty.";
  if (score >= 5) return "💡 Good try! Maybe add a bit more clarity.";
  return "🧠 You can do better next time. Your feelings matter too!";
};

export default function BoundaryBuilder() {
  const { completeSELChallenge } = useSEL();
  const [selected, setSelected] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6 font-sans">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-dashed border-purple-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        <motion.div
          className="flex flex-col items-center justify-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}


          {/* Artistic Header */}

          <motion.div
            className="relative flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Floating Icon */}
            <motion.div
              className="bg-pink-100 p-4 rounded-full shadow-2xl border border-purple-300"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ShieldCheck className="w-10 h-10 text-pink-500" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 drop-shadow-md px-4 pb-2"
              animate={{ scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              Boundary Builder Game
            </motion.h1>

            {/* Right Floating Icon */}
            <motion.div
              className="bg-yellow-100 p-4 rounded-full shadow-2xl border border-pink-300"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ShieldCheck className="w-10 h-10 text-yellow-500" />
            </motion.div>

            {/* Sparkles Icon - background decoration */}
            <motion.div
              className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-full bg-white p-2 rounded-full shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
            </motion.div>
          </motion.div>


          {/* Fun, Clear Subtext */}
          <p className="text-lg text-center text-gray-700 italic font-medium max-w-2xl">
            💬 Choose the kindest way to protect your space & feelings. <br />
            Let's build magical boundaries together! ✨🛡️
          </p>
        </motion.div>


        <motion.div
          className="relative overflow-hidden bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-8 rounded-3xl shadow-xl mb-10 max-w-4xl mx-auto border-4 border-dashed border-purple-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Corner Emojis */}
          <div className="absolute top-2 left-3 text-3xl animate-float-x">🎭</div>
          <div className="absolute top-2 right-3 text-3xl animate-float-y">💭</div>
          <div className="absolute bottom-2 left-3 text-3xl animate-float-y">💬</div>
          <div className="absolute bottom-2 right-3 text-3xl animate-float-x">✨</div>

          {/* Main Text */}
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-4">
            The Situation
          </h2>
          <p className="text-xl text-center text-gray-800 font-medium leading-relaxed">
            Your friend keeps sharing their problems a lot. You're feeling tired and unsure how to speak up kindly without hurting their feelings.
          </p>
          <p className="text-xl text-center text-gray-800 font-medium leading-relaxed">
            Pick the option below that feels most respectful and true to you.
            <br />
            Your choice will guide your emotional journey! 🌟
          </p>
        </motion.div>




        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {responses.map((res, idx) => (
            <motion.button
              key={idx}
              disabled={selected !== null}
              onClick={() => {
                const endTime = Date.now();
                const durationSec = Math.round((endTime - startTime) / 1000);
                const selectedScore = responses[idx].score;

                setSelected(idx);

                if (selectedScore >= 9) {
                  completeSELChallenge(0, 1);
                }

                updatePerformance({
                  moduleName: "SEL",
                  topicName: "peerSupportNetworks",
                  score: selectedScore,                     // Out of 10
                  accuracy: Math.round((selectedScore / maxScore) * 100), // Scaled to 100
                  avgResponseTimeSec: durationSec,
                  studyTimeMinutes: Math.ceil(durationSec / 60),
                  completed: selectedScore >= 9,

                });
                setStartTime(Date.now());

              }}
              whileHover={{ scale: 1.06, rotate: [0, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              className={`relative group flex flex-col items-center justify-start text-center px-6 py-6 rounded-3xl border-4 shadow-xl h-52 w-full transition-all duration-300
        ${selected === idx
                  ? "border-purple-600 bg-gradient-to-br from-purple-100 to-pink-100"
                  : "border-gray-300 bg-white hover:from-yellow-50 hover:to-purple-50 bg-gradient-to-tr"
                }`}
            >
              {/* Animated Floating Emoji */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: idx * 0.1 }}
                className="text-5xl mb-3 drop-shadow-sm"
              >
                {res.emoji}
              </motion.div>

              {/* Type Label */}
              <div className="text-xl font-bold text-purple-700 mb-2 tracking-wide drop-shadow-sm">
                {res.type}
              </div>

              {/* Description */}
              <p className="text-base text-gray-700 font-medium leading-relaxed px-2">
                {res.text}
              </p>

              {/* Glowing border on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.5)] transition-all duration-300 pointer-events-none" />
            </motion.button>
          ))}
        </div>



        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-3xl border-4 border-green-300 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
              <Sparkles className="text-green-600" />
              Magical Feedback:
            </h2>
            <p className="text-gray-800 mb-2">
              <strong>🪞 What happened:</strong> {responses[selected].feedback.result}
            </p>
            <p className="text-gray-700 italic">
              <strong>🌱 Advice:</strong> {responses[selected].feedback.advice}
            </p>
            <p className="text-lg mt-4 text-purple-700 font-semibold">
              🧮 Your Score: {responses[selected].score}/10
            </p>
            <p className="text-md mt-2 text-gray-800">
              💬 <strong>Suggestion:</strong> {getSuggestion(responses[selected].score)}
            </p>

            <div className="text-center mt-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelected(null);
                  setStartTime(Date.now());
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-full shadow"
              >
                🔄 Try Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div >
  );
}
