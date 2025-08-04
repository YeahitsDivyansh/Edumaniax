import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const tasks = [
    {
        id: 1,
        avatar: "🗣️",
        question: "Can AI translate languages?",
        correct: "Yes"
    },
    {
        id: 2,
        avatar: "💖",
        question: "Can AI feel emotions?",
        correct: "No"
    },
    {
        id: 3,
        avatar: "🚗",
        question: "Can AI drive a car?",
        correct: "Yes"
    },
    {
        id: 4,
        avatar: "📚",
        question: "Can AI write a story?",
        correct: "Yes"
    },
    {
        id: 5,
        avatar: "👁️",
        question: "Can AI recognize faces?",
        correct: "Yes"
    },
    {
        id: 6,
        avatar: "🎨",
        question: "Can AI be creative?",
        correct: "No"
    }
];

const emojiLevels = ["🥇", "🥈", "🥉", "💎", "👑"];

const difficultyDescriptions = [
    "Super Easy 😌",
    "Kinda Simple 🙂",
    "Getting Tricky 😅",
    "Brain Buster 🤯",
    "Alien Hard 👽"
];

export default function SmartOrNotGame() {
    const { completeComputersChallenge } = useComputers();
    const [current, setCurrent] = useState(0);
    const [responses, setResponses] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [difficulty, setDifficulty] = useState(3);
    const [reflection, setReflection] = useState({
        whyHard: "",
        unique: "",
        submitted: false
    });


    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());


    const handleAnswer = (canDo) => {
        const task = tasks[current];
        const answer = {
            question: task.question,
            canDo,
            difficulty,
            correct: task.correct,
            isCorrect: canDo === task.correct
        };
        setResponses([...responses, answer]);
        setDifficulty(3);

        if (current + 1 < tasks.length) {
            setCurrent(current + 1);
        } else {
            setShowSummary(true);
        }
    };

    const handleSlider = (e) => {
        setDifficulty(Number(e.target.value));
    };

    const handleReflection = (e) => {
        setReflection({ ...reflection, [e.target.name]: e.target.value });
    };

    const score = responses.filter((r) => r.isCorrect).length;

    return (
        <div className="p-6 max-w-5xl mx-auto text-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 min-h-screen rounded-xl shadow-2xl">
            <motion.h1
                className="text-7xl font-black text-yellow-600 mb-10 drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)] tracking-wide flex justify-center items-center gap-4"
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                <motion.span
                    className="inline-block"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    🧠
                </motion.span>

                <span className="text-purple-800 font-extrabold">Smart or Silly?</span>

                <motion.span
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 20, -20, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🤪
                </motion.span>
            </motion.h1>

            {!showSummary ? (
                <motion.div
                    key={tasks[current].id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border-4 border-yellow-300 p-10 rounded-3xl shadow-xl mx-auto max-w-3xl"
                >
                    <div className="text-7xl mb-4 animate-bounce">{tasks[current].avatar}</div>
                    <h2 className="text-3xl font-bold text-indigo-700 mb-6 drop-shadow-sm">
                        {tasks[current].question}
                    </h2>

                    <div className="flex justify-center gap-6 mb-6">
                        <button
                            onClick={() => handleAnswer("Yes")}
                            className="bg-green-400 hover:bg-green-500 text-white text-2xl px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                        >
                            🤖 Yes, AI Can!
                        </button>

                        <button
                            onClick={() => handleAnswer("No")}
                            className="bg-red-400 hover:bg-red-500 text-white text-2xl px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                        >
                            🙅‍♂️ Not Yet!
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-yellow-50 rounded-xl shadow-md w-full max-w-xl mx-auto">
                        <label className="block text-2xl mb-4 text-purple-800 font-extrabold">
                            🤔 How Tough is This for AI to Handle?
                        </label>

                        <div className="flex justify-between items-center gap-4">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setDifficulty(level)}
                                    className={`text-4xl w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300
          ${difficulty === level
                                            ? "bg-pink-200 border-4 border-pink-500 scale-125 shadow-md"
                                            : "bg-white opacity-70 hover:scale-110"
                                        }`}
                                >
                                    {emojiLevels[level - 1]}
                                </button>
                            ))}
                        </div>

                        <div className="text-center mt-4 text-xl text-purple-600 font-medium">
                            Level {difficulty} – {difficultyDescriptions[difficulty - 1]}
                        </div>
                    </div>


                </motion.div>
            ) : (
                <>
                    <Confetti />
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white border-4 border-blue-300 p-10 rounded-3xl shadow-2xl mt-10"
                    >
                        <h2 className="text-4xl text-green-600 font-extrabold mb-6">
                            🎉 You’re an AI Explorer!
                        </h2>
                        <p className="text-2xl text-gray-800 mb-4">
                            🏅 Congratulations! You’ve earned the <strong>Smart or Not?</strong> badge.
                        </p>
                        <p className="text-xl text-purple-700 font-semibold mb-8">
                            🧠 Your Score: {score} / {tasks.length}
                        </p>

                        <div className="space-y-4 text-left text-lg">
                            {responses.map((r, i) => (
                                <div
                                    key={i}
                                    className={`p-4 border-l-8 rounded-xl shadow-md ${r.isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}
                                >
                                    <strong className="text-xl">{r.question}</strong> <br />
                                    <span>👉 Your Answer: <strong>{r.canDo === "Yes" ? "✅ Yes" : "❌ No"}</strong></span> <br />
                                    <span>✅ Correct Answer: <strong>{r.correct === "Yes" ? "✅ Yes" : "❌ No"}</strong></span> <br />
                                    <span>🎯 Difficulty: <strong>{emojiLevels[r.difficulty - 1]}</strong></span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-left bg-purple-50 p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-pink-800 mb-4">
                                💭 Critical Thinking Time!
                            </h3>

                            <p className="text-lg mb-2 text-purple-700">
                                🤔 What makes some tasks harder for AI?
                            </p>
                            <textarea
                                name="whyHard"
                                placeholder="Type your thoughts here..."
                                value={reflection.whyHard}
                                onChange={handleReflection}
                                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl mb-4 shadow-sm"
                            />

                            <p className="text-lg mb-2 text-purple-700">
                                🌟 Which human abilities are truly unique?
                            </p>
                            <textarea
                                name="unique"
                                placeholder="Share your ideas..."
                                value={reflection.unique}
                                onChange={handleReflection}
                                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl shadow-sm"
                            />

                            {!reflection.submitted ? (
                                <button
                                    onClick={() => {
                                        const endTime = Date.now();
                                        const totalSeconds = Math.floor((endTime - startTime) / 1000);

                                        // Scale score out of 10
                                        const scaledScore = Math.round((score / tasks.length) * 10);

                                        updatePerformance({
                                            moduleName: "Computers",
                                            topicName: "foundationsOfAIIntelligence",
                                            score: scaledScore,
                                            accuracy: (score / tasks.length) * 100,
                                            avgResponseTimeSec: totalSeconds / tasks.length,
                                            studyTimeMinutes: totalSeconds / 60,
                                            completed: true,
                                        });
                                        setStartTime(Date.now());
                                        completeComputersChallenge(1, 1); // ✅ Mark task as complete
                                        setReflection({ ...reflection, submitted: true });
                                    }}

                                    className="mt-6 bg-pink-500 hover:bg-pink-600 text-white text-xl px-6 py-3 rounded-full shadow-md transition transform hover:scale-105"
                                >
                                    ✅ Submit Reflection
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 bg-white p-4 rounded-lg shadow-md border-l-4 border-green-400"
                                >
                                    <h4 className="text-xl font-bold text-green-700 mb-2">
                                        ✅ Great thinking! Here's what experts say:
                                    </h4>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                        <li>
                                            🤖 <strong>Why some tasks are harder:</strong> AI struggles with abstract thinking, emotions, common sense, and creativity.
                                        </li>
                                        <li>
                                            🧠 <strong>Unique human abilities:</strong> Empathy, moral reasoning, true creativity, self-awareness, and deep understanding.
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
