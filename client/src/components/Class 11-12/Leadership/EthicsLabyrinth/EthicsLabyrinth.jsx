import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const questions = [
  {
    text: "🎭 A teammate is taking credit for your work. What do you do?",
    options: [
      { text: "Ignore it and hope it stops.", bias: "🤔 Are you avoiding the issue?", ethical: false },
      { text: "Talk to them kindly and explain your side.", ethical: true },
      { text: "Tell the manager they’re cheating.", bias: "😬 Jumping to conclusions?", ethical: false },
    ],
  },
  {
    text: "🤝 Your team wants to finish a project fast, but it might hurt users. What do you do?",
    options: [
      { text: "Go along to avoid conflict.", bias: "👥 Are you just going with the group?", ethical: false },
      { text: "Pause and ask how it may affect users.", ethical: true },
      { text: "Let it go. It’s not your job.", bias: "🙈 Ignoring your part?", ethical: false },
    ],
  },
  {
    text: "🧠 You’re stressed and make a quick choice that feels unfair. What now?",
    options: [
      { text: "Admit it and fix your decision.", ethical: true },
      { text: "Make excuses and move on.", bias: "🙃 Looking for proof you're right?", ethical: false },
      { text: "Blame the situation.", bias: "😓 Blaming everything else?", ethical: false },
    ],
  },
  {
    text: "🎨 Your idea was ignored because you're quiet in meetings. What do you do?",
    options: [
      { text: "Stay quiet. That’s just how you are.", bias: "🤫 Holding yourself back?", ethical: false },
      { text: "Talk to the team later and share your idea.", ethical: true },
      { text: "Complain to a friend but don’t act.", bias: "😶 Avoiding action again?", ethical: false },
    ],
  },
  {
    text: "📢 You disagree with your team’s idea. What do you do?",
    options: [
      { text: "Go along to avoid being difficult.", bias: "👥 Following the crowd?", ethical: false },
      { text: "Speak up kindly and suggest something better.", ethical: true },
      { text: "Let the team fail and say 'I told you so'.", bias: "😠 Being quietly angry?", ethical: false },
    ],
  },
];


const EthicsLabyrinth = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [currentQ, setCurrentQ] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showEnd, setShowEnd] = useState(false);
  const [started, setStarted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (started && chosen === null && !showEnd) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) setTimeLeft(timeLeft - 1);
        else nextQuestion();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, chosen, started]);

  useEffect(() => {
    if (showEnd && !scoreSent) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "theStrategist",
        score: Math.round((score / questions.length) * 10),
        accuracy: parseFloat(((score / questions.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / (questions.length * 1000)).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score === questions.length,
      });
      setStartTime(Date.now());

      if (score === questions.length) {
        completeLeadershipChallenge(1, 1);
      }
    }
  }, [showEnd, score]);



  const handleOptionClick = (option) => {
    setChosen(option);
    if (option.ethical) setScore(score + 1);
  };

  const nextQuestion = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setChosen(null);
      setTimeLeft(25);
    } else {
      setShowEnd(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setChosen(null);
    setScore(0);
    setTimeLeft(20);
    setShowEnd(false);
    setStarted(false);
    setStartTime(Date.now());

  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 p-6 font-sans">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {!started ? (
          <>
            <motion.h1
              className="text-6xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg pb-4"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🌟 The Ethics Labyrinth ⚖️
            </motion.h1>
            <motion.div
              className="bg-blue-50 border border-blue-300 p-6 rounded-2xl shadow-inner mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-4">🎮 How to Play:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>⏳ You have <span className="font-bold text-pink-500">20 seconds</span> to answer each question.</li>
                <li>🧠 Pick the <span className="text-green-600 font-semibold">most ethical</span> choice for each situation.</li>
                <li>✅ Correct answers turn <span className="text-green-600 font-bold">green</span>.</li>
                <li>🚨 Wrong answers show a <span className="text-red-600 font-semibold">red bias alert</span> to help you learn.</li>
                <li>👉 After answering, use the <span className="font-bold text-blue-600">“Next”</span> button to move to the next question.</li>
                <li>🏅 Score a perfect 5 to earn the <span className="text-yellow-500 font-bold">"Justice Seeker" badge</span>.</li>
                <li>🔄 You can restart the game anytime if you wish to try again.</li>
              </ul>
              <div className="text-center mt-6">
                <button
                  onClick={() => setStarted(true)}
                  className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-xl rounded-full font-bold shadow-lg transition-all duration-300"
                >
                  🚀 Start Game
                </button>
              </div>
            </motion.div>
          </>
        ) : !showEnd ? (
          <>
            <motion.h1
              className="text-6xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-lg pb-4"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🌟 The Ethics Labyrinth ⚖️
            </motion.h1>
            <p className="text-center text-xl font-semibold text-pink-700 mb-6 animate-pulse">
              🧠 Think smart. 💡 Choose fair. 🚫 Beat the bias traps!
            </p>

            <div className="text-center mb-4">
              <span className="inline-block bg-yellow-300 text-yellow-900 font-bold px-4 py-2 rounded-full shadow text-lg animate-pulse">
                ⏰ Time Left: {timeLeft}s
              </span>
            </div>

            <motion.h2
              className="text-4xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide leading-snug"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {questions[currentQ].text}
            </motion.h2>

            <div className="space-y-4">
              {questions[currentQ].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  disabled={chosen !== null}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-center px-6 py-6 rounded-3xl font-bold text-xl shadow-xl border-4 transition-all duration-300 ease-in-out relative tracking-wide
                    ${chosen === option
                      ? option.ethical
                        ? "bg-green-100 border-green-400 text-green-800"
                        : "bg-red-100 border-red-400 text-red-800"
                      : "bg-yellow-50 border-yellow-300 hover:scale-[1.03] hover:shadow-2xl"}`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 3 + idx * 0.3 }}
                >
                  <span className="block leading-relaxed">{option.text}</span>

                  {chosen === option && option.bias && (
                    <motion.div
                      className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-xl text-red-700 shadow-inner flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <AlertTriangle className="w-6 h-6 mt-1 animate-pulse shrink-0" />
                      <div className="text-left">
                        <p className="font-semibold text-lg">⚠️ Bias Alert</p>
                        <p className="text-md">{option.bias}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}

              {chosen && (
                <div className="text-center mt-6">
                  <motion.button
                    onClick={nextQuestion}
                    whileHover={{ scale: 1.08 }}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold shadow-lg transition-all duration-300"
                  >
                    {currentQ + 1 < questions.length ? "Next 👉" : "See Results 🎉"}
                  </motion.button>
                </div>
              )}
            </div>

            <div className="mt-6 text-right text-sm text-gray-500">
              Question {currentQ + 1} of {questions.length}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-4xl font-bold text-pink-600 mb-4 animate-bounce">
              🎉 Game Over!
            </h2>
            {score === questions.length ? (
              <>
                <p className="text-2xl text-green-700 mb-2">
                  You made all the right ethical choices!
                </p>
                <p className="text-lg text-gray-700 mb-3">Badge Earned:</p>
                <motion.h3
                  className="text-3xl font-extrabold text-yellow-500 animate-pulse"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🧠 Justice Seeker
                </motion.h3>
              </>
            ) : (
              <>
                <p className="text-2xl text-red-600 mb-2">
                  You got {score} out of {questions.length} ethical decisions right.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Try again to earn the badge! 💪
                </p>
              </>
            )}
            <button
              onClick={restart}
              className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 transition-all duration-300 mx-auto"
            >
              <RefreshCcw className="w-5 h-5" /> Restart
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EthicsLabyrinth;