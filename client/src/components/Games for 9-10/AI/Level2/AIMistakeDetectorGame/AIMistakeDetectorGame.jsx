import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Sparkles, AlertTriangle, Bot } from "lucide-react";
import Confetti from "react-confetti";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
    {
        scenario: "AI says a cat is a dog",
        correct: "🔴",
        reason: "The model likely had poor or imbalanced training data for cats and dogs.",
        icon: "🐶", // clearer than 🐾 for classification errors
    },
    {
        scenario: "Voice assistant can’t understand accent",
        correct: "🟡",
        reason: "The speech model wasn’t trained on enough diverse accent data.",
        icon: "🗣️", // represents voice/speech better than 🎤
    },
    {
        scenario: "Navigation app shows wrong road during a parade",
        correct: "🟡",
        reason: "The AI didn’t account for temporary events like parades or closures in real-time data.",
        icon: "🗺️", // better contextual emoji than 🚧
    },
    {
        scenario: "Smartwatch detects nap as deep sleep",
        correct: "🟡",
        reason: "The AI misinterpreted short rest data due to limited biomarker input.",
        icon: "⌚", // more accurate for smartwatch
    },
    {
        scenario: "AI detects diabetes from X-ray image accurately",
        correct: "🔴",
        reason: "X-rays are not standard for diagnosing diabetes — the AI used inappropriate data.",
        icon: "🧪", // representing lab/medical test
    },
    {
        scenario: "AI helps doctors detect pneumonia in chest X-rays",
        correct: "🟢",
        reason: "It was trained on a large set of annotated medical images.",
        icon: "🩻", // actual chest scan symbol
    },
];
const choices = [
    { symbol: "🟢", label: "Works Perfectly", color: "bg-green-400" },
    { symbol: "🟡", label: "Needs Improvement", color: "bg-yellow-300" },
    { symbol: "🔴", label: "Bad Mistake", color: "bg-red-400" },
];

export default function AIOopsGame() {
    const { completeComputersChallenge } = useComputers();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [selected, setSelected] = useState(null);

    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        if (showResult) {
            completeComputersChallenge(1, 1);

            const endTime = Date.now();
            const total = scenarios.length;
            const correct = answers.filter((a) => a.isCorrect).length;

            const scaledScore = Math.round((correct / total) * 10);
            const accuracy = Math.round((correct / total) * 100);
            const avgResponseTimeSec = ((endTime - startTime) / 1000) / total;
            const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

            updatePerformance({
                moduleName: "Computers",
                topicName: "understandingAIPerformance",
                score: scaledScore,
                accuracy,
                avgResponseTimeSec,
                studyTimeMinutes,
                completed: true,

            });
            setStartTime(Date.now());

        }
    }, [showResult]);



    const handleAnswer = (symbol) => {
        setSelected(symbol);
        const isCorrect = symbol === scenarios[step].correct;
        setAnswers((prev) => [
            ...prev,
            { ...scenarios[step], selected: symbol, isCorrect },
        ]);

        setTimeout(() => {
            setSelected(null);
            if (step + 1 < scenarios.length) {
                setStep(step + 1);
            } else {
                setShowResult(true);
            }
        }, 800);
    };

    const handleRestart = () => {
        setStep(0);
        setAnswers([]);
        setShowResult(false);
        setSelected(null);
        setStartTime(Date.now());

    };

    if (showResult) {
        const score = answers.filter((a) => a.isCorrect).length;

        return (
            <div className="relative text-center px-6 py-10 max-w-4xl mx-auto bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden">

                {/* 🎉 Confetti Animation */}
                <Confetti numberOfPieces={300} />
                <motion.h1
                    className="text-5xl font-black text-purple-700 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    🏅 You Scored {score} / {scenarios.length}
                </motion.h1>

                <p className="text-2xl font-semibold mb-8 text-purple-800">
                    {score === scenarios.length ? (
                        <>🌟 <span className="text-green-700">Perfect!</span> You're a top-notch <span className="underline">AI Detective</span> 🕵️‍♀️! 🏆</>
                    ) : score >= scenarios.length * 0.7 ? (
                        <>🎉 <span className="text-green-700">Great job!</span> You're getting the hang of spotting AI goof-ups! 🔍✨</>
                    ) : score >= scenarios.length * 0.4 ? (
                        <>🛠️ <span className="text-yellow-700">Good try!</span> You noticed some mistakes — keep training your AI eyes! 👁️</>
                    ) : (
                        <>🚨 <span className="text-red-600">Uh-oh!</span> Looks like the AI fooled you. Want to give it another shot? 🔁</>
                    )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    {answers.map((a, idx) => (
                        <motion.div
                            key={idx}
                            className={`rounded-2xl p-5 shadow-lg border-4 ${a.isCorrect ? "border-green-400 bg-green-50" : "border-red-300 bg-red-50"
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <p className="text-xl font-bold mb-2">{a.scenario}</p>
                            <p className="text-base mb-1">✅ Correct: <span className="font-bold">{a.correct}</span></p>
                            <p className="text-base mb-1">📘 Why: <span className="text-gray-700">{a.reason}</span></p>
                            <p className="text-base">
                                🙋‍♂️ Your Answer:{" "}
                                <span className={`font-bold ${a.isCorrect ? "text-green-600" : "text-red-500"}`}>
                                    {a.selected}
                                </span>
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRestart}
                    className="mt-10 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                >
                    🔄 Try Again
                </motion.button>
            </div>
        );
    }

    const current = scenarios[step];

    const getBackground = (symbol) => {
        switch (symbol) {
            case "🟢":
                return "radial-gradient(circle at 30% 30%, #a7f3d0, #10b981)";
            case "🟡":
                return "radial-gradient(circle at 30% 30%, #fef9c3, #facc15)";
            case "🔴":
                return "radial-gradient(circle at 30% 30%, #fecaca, #ef4444)";
            default:
                return "#e5e7eb"; // fallback
        }
    };

    return (
        <div className="text-center px-4 py-10 max-w-3xl mx-auto bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-100 rounded-3xl shadow-xl border-4 border-purple-200">
            <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-8 drop-shadow-lg flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <motion.div
                    animate={{
                        y: [0, -12, 0],
                        rotate: [0, -6, 6, 0],
                        color: ["#8b5cf6", "#f472b6", "#facc15", "#8b5cf6"],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut",
                    }}
                    className="inline-flex items-center gap-4"
                >
                    <Sparkles className="w-10 h-10 text-pink-500 drop-shadow-sm" />
                    <span className="whitespace-nowrap">Oops! AI Goof-Ups</span>
                    <Bot className="w-10 h-10 text-yellow-500 drop-shadow-sm" />
                </motion.div>
            </motion.h1>

            <p className="text-lg mb-4 text-gray-700 font-medium">
                Tap a colored circle to rate how well the AI did 👇
            </p>

            <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-6 shadow-xl border-4 border-yellow-200">


                <motion.p
                    className="text-3xl font-extrabold text-pink-600 mb-4 text-center flex items-center justify-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-4xl"
                    >
                        🚨
                    </motion.span>
                    <span className="text-shadow-sm">{current.scenario}</span>
                    <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-4xl"
                    >
                        🚨
                    </motion.span>
                </motion.p>

                <motion.div
                    className="text-7xl sm:text-8xl mb-8"
                    animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 2,
                        ease: "easeInOut",
                    }}
                >
                    <motion.span
                        animate={{ textShadow: ["0px 0px 10px rgba(255, 200, 0, 0.8)", "0px 0px 0px rgba(255, 200, 0, 0)", "0px 0px 10px rgba(255, 200, 0, 0.8)"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        {current.icon}
                    </motion.span>
                </motion.div>

                <p className="text-lg font-semibold text-purple-700 mt-3 mb-1">
                    🧠 Choose how well the AI did using the colors below!
                </p>

                <div className="flex justify-center gap-8 mt-10">
                    {choices.map((choice, index) => (
                        <div className="relative flex items-center justify-center" key={index}>
                            {/* Outer pulsing ring */}
                            <motion.div
                                className="absolute w-24 h-24 rounded-full border-4 border-white"
                                animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [0.7, 0.3, 0.7],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                                style={{ zIndex: 0 }}
                            />

                            {/* Inner emoji circle */}
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 rounded-full cursor-pointer flex items-center justify-center shadow-xl border-4 border-white relative z-10 transition-all duration-300"
                                onClick={() => handleAnswer(choice.symbol)}
                                style={{
                                    background:
                                        selected === choice.symbol
                                            ? "radial-gradient(circle at center, #ffffff, #d1fae5)"
                                            : getBackground(choice.symbol),
                                }}
                            >
                                <span className="text-3xl">{choice.symbol}</span>

                                {/* ✅ tick icon on selected */}
                                {selected === choice.symbol && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="absolute -top-3 -right-3 bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md"
                                    >
                                        <CheckCircle size={16} strokeWidth={3} className="text-white" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>


                {/* Legends */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-3 bg-green-100 border-l-4 border-green-500 rounded-lg p-3 shadow-sm">
                        <span className="text-2xl animate-wiggle">🟢</span>
                        <div>
                            <p className="text-green-700">Works Perfectly</p>
                            <p className="text-xs text-green-600">Great performance! 🎯</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-3 shadow-sm">
                        <span className="text-2xl animate-wiggle">🟡</span>
                        <div>
                            <p className="text-yellow-700">Needs Improvement</p>
                            <p className="text-xs text-yellow-600">Almost there! 🛠️</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-red-100 border-l-4 border-red-500 rounded-lg p-3 shadow-sm">
                        <span className="text-2xl animate-wiggle">🔴</span>
                        <div>
                            <p className="text-red-700">Bad Mistake</p>
                            <p className="text-xs text-red-600">Needs fixing! 🚨</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
