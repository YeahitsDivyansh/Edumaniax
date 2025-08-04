import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const questions = [
    {
        scenario: "📝 Ask AI to check grammar after writing an essay",
        correct: "✔",
        reason: "✅ Great! You wrote it yourself and used AI to polish it.",
    },
    {
        scenario: "🧮 Use AI to solve all math homework without understanding",
        correct: "✘",
        reason: "❌ Uh-oh! Using AI without learning is not helpful.",
    },
    {
        scenario: "📅 Use AI to generate a study schedule",
        correct: "✔",
        reason: "✅ Smart move! Planning helps you focus better.",
    },
    {
        scenario: "📎 Copy AI-generated project and claim it as your own",
        correct: "✘",
        reason: "❌ Not cool! It’s important to do your own work.",
    },
    {
        scenario: "🧠 Use AI for fun quizzes to test your knowledge",
        correct: "✔",
        reason: "✅ Yes! Quizzes are a fun way to learn with AI.",
    },
];

const reflectionOptions = [
    {
        good: "learn and understand better",
        bad: "all the work for me",
        isCorrect: true,
    },
    {
        good: "get organized and plan",
        bad: "my homework without me learning",
        isCorrect: true,
    },
    {
        good: "think through problems",
        bad: "everything without asking me",
        isCorrect: true,
    },
    {
        good: "come up with my own ideas",
        bad: "copy answers for me",
        isCorrect: true,
    },
    {
        good: "ask smart questions",
        bad: "give me full answers",
        isCorrect: false,
    },
];

const correctReflection = {
    good: "learn and understand better",
    bad: "all the work for me",
};


export default function ThinkBeforeYouTechGame() {
    const { completeComputersChallenge } = useComputers();
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showReflection, setShowReflection] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false); // New state to track if a question has been answered
    const [challengeCompleted, setChallengeCompleted] = useState(false);

    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        if (showFeedback && selectedOption && !challengeCompleted) {
            completeComputersChallenge(2, 3);
            setChallengeCompleted(true);
        }
    }, [showFeedback, selectedOption, challengeCompleted]);

    useEffect(() => {
        if (showFeedback && selectedOption) {
            const endTime = Date.now();
            const studyTimeMinutes = Math.round((endTime - startTime) / 60000);
            const avgResponseTimeSec = (endTime - startTime) / 1000;

            updatePerformance({
                moduleName: "Computers",
                topicName: "humanCenteredAIThinking",
                score: finalScore,
                accuracy: (finalScore / 10) * 100,
                avgResponseTimeSec,
                studyTimeMinutes,
                completed: true,

            });
            setStartTime(Date.now());

        }
    }, [showFeedback, selectedOption]);


    const avatars = ["🦄", "🧚‍♀️", "🐵", "🤖", "🐯", "🦸‍♂️"];
    const avatar = avatars[step % avatars.length];

    const handleAnswer = (choice) => {
        // Prevent multiple clicks for the same question
        if (isAnswered) return;

        const current = questions[step];
        const isCorrect = choice === current.correct;

        if (isCorrect) setScore((prev) => prev + 1);

        setAnswers((prev) => [
            ...prev,
            { ...current, userAnswer: choice, isCorrect },
        ]);

        // Set isAnswered to true to disable buttons
        setIsAnswered(true);

        setTimeout(() => {
            if (step < questions.length - 1) {
                setStep(step + 1);
                // Reset isAnswered for the next question
                setIsAnswered(false);
            } else {
                setShowResult(true);
            }
        }, 800);
    };

    const restartGame = () => {
        setStep(0);
        setScore(0);
        setAnswers([]);
        setShowResult(false);
        setShowReflection(false);
        setSelectedOption(null);
        setShowFeedback(false);
        setIsAnswered(false);// Reset for a new game
        setStartTime(Date.now());

    };

    const isReflectionCorrect =
        selectedOption?.good === correctReflection.good &&
        selectedOption?.bad === correctReflection.bad;

    const finalScore = score + (isReflectionCorrect ? 5 : 0);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-br from-white via-cyan-50 to-cyan-100 rounded-3xl shadow-2xl border-4 border-cyan-300">
            {!showResult ? (
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-500 drop-shadow-lg tracking-wide mb-6"
                    >
                        🤖 Think Before You Tech!
                    </motion.h1>

                    <p className="text-3xl font-bold text-pink-600 mb-3">
                        🌟 Question {step + 1} of {questions.length}
                    </p>

                    <div className="bg-white p-6 text-2xl font-semibold text-purple-900 border-4 border-purple-300 rounded-xl shadow-inner mb-6">
                        {questions[step].scenario}
                    </div>

                    <motion.div
                        className="text-[6rem] mb-4"
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {avatar}
                    </motion.div>

                    <div className="flex justify-center gap-12">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAnswer("✔")}
                            disabled={isAnswered} // Disable button when answered
                            className={`bg-green-200 text-5xl px-8 py-4 rounded-full border-4 border-green-500 shadow-md ${isAnswered ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            ✔️
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAnswer("✘")}
                            disabled={isAnswered} // Disable button when answered
                            className={`bg-red-200 text-5xl px-8 py-4 rounded-full border-4 border-red-500 shadow-md ${isAnswered ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            ✖️
                        </motion.button>
                    </div>
                </motion.div>
            ) : !showReflection ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="text-6xl animate-bounce mb-4">🎉</div>
                    <h2 className="text-4xl font-extrabold text-green-800 mb-4">
                        Game Over! Great Job!
                    </h2>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-4 bg-purple-500 text-white text-xl rounded-full shadow-xl"
                        onClick={() => setShowReflection(true)}
                    >
                        ➡️ Next: Reflection Time!
                    </motion.button>
                </motion.div>
            ) : (
                <motion.div
                    className="text-center"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mt-10 p-6 bg-white rounded-3xl shadow-xl border-2 border-cyan-300">
                        <h2 className="text-4xl font-extrabold text-cyan-700 mb-4">
                            💭 Reflection Time!
                        </h2>

                        <p className="mb-6 text-xl font-semibold text-purple-800 leading-relaxed">
                            “From now on, I’ll use AI to help me{" "}
                            <span className="text-blue-600 underline decoration-dotted">
                                {selectedOption?.good || "__________"}
                            </span>{" "}
                            instead of letting it do{" "}
                            <span className="text-red-600 underline decoration-dotted">
                                {selectedOption?.bad || "__________"}
                            </span>{" "}
                            for me.”
                        </p>

                        <label className="block text-lg text-purple-700 mb-2 font-bold">
                            ✨ Choose how you’ll use AI:
                        </label>

                        <select
                            className="w-full p-3 rounded-xl border-2 border-cyan-400 bg-cyan-50 text-lg font-semibold text-purple-800 mb-4"
                            onChange={(e) => {
                                const selected = reflectionOptions[parseInt(e.target.value)];
                                setSelectedOption(selected);
                                setShowFeedback(true);
                            }}
                        >
                            <option value="">-- Select Your Reflection --</option>
                            {reflectionOptions.map((opt, index) => (
                                <option key={index} value={index}>
                                    Help me {opt.good} instead of doing {opt.bad}
                                </option>
                            ))}
                        </select>

                        {showFeedback && selectedOption && (
                            <div className="mt-4 text-lg font-bold text-center">
                                {selectedOption?.good === correctReflection.good &&
                                    selectedOption?.bad === correctReflection.bad ? (
                                    <div className="text-green-700">
                                        ✅ Great job! You chose a responsible way to use AI! 🎉
                                    </div>
                                ) : (
                                    <div className="text-red-600">
                                        ❌ Hmm, that’s not the best way to use AI. Let’s learn! 🧠
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {showFeedback && (
                        <div className="mt-10">
                            {/* Badge and Score */}
                            <div className="mb-8 bg-gradient-to-br from-green-100 via-white to-green-200 border-4 border-green-400 p-6 rounded-3xl shadow-2xl">
                                <p className="text-3xl font-extrabold text-green-800 mb-3">
                                    🎉 Final Score: {finalScore} / 10
                                </p>
                                <p className="text-2xl font-bold text-purple-700 mb-3">
                                    🏅 You’ve earned the badge:
                                </p>
                                <div className="text-6xl mb-2 animate-bounce">🧠</div>
                                <p className="text-3xl font-extrabold text-pink-600">
                                    Responsible AI Thinker
                                </p>
                            </div>

                            {/* Correct Answers */}
                            <div className="bg-white border-4 border-blue-300 rounded-3xl p-6 shadow-inner">
                                <h3 className="text-3xl font-bold text-blue-700 mb-6">
                                    ✅ Correct Answers Review
                                </h3>
                                {answers.map((ans, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-6 p-5 rounded-xl border-4 ${ans.isCorrect
                                            ? "border-green-400 bg-green-50"
                                            : "border-red-400 bg-red-50"
                                            } shadow-lg`}
                                    >
                                        <p className="text-2xl font-bold text-purple-800 mb-2">
                                            {idx + 1}. {ans.scenario}
                                        </p>
                                        <p className="text-xl mb-1">
                                            <span className="font-semibold">Your Answer:</span>{" "}
                                            <span className="text-2xl">{ans.userAnswer}</span>{" "}
                                            {ans.isCorrect ? "✅" : "❌"}
                                        </p>
                                        <p className="text-lg italic text-gray-700">{ans.reason}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Final Reflection Display */}
                            <div className="mt-10 bg-yellow-50 border-4 border-yellow-300 p-6 rounded-3xl shadow-xl">
                                <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                                    💬 Reflection
                                </h3>
                                <p className="text-lg mb-2">
                                    <strong>What you chose:</strong>
                                    <br />
                                    “From now on, I’ll use AI to help me{" "}
                                    <span className="text-blue-600 font-bold">
                                        {selectedOption?.good}
                                    </span>{" "}
                                    instead of letting it do{" "}
                                    <span className="text-red-600 font-bold">
                                        {selectedOption?.bad}
                                    </span>{" "}
                                    for me.”
                                </p>
                                <p className="text-lg mt-4">
                                    <strong>Best Practice Reflection:</strong>
                                    <br />✅ “From now on, I’ll use AI to help me{" "}
                                    <span className="text-blue-700 font-bold">
                                        {correctReflection.good}
                                    </span>{" "}
                                    instead of letting it do{" "}
                                    <span className="text-red-700 font-bold">
                                        {correctReflection.bad}
                                    </span>{" "}
                                    for me.”
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-10 px-8 py-4 bg-purple-600 text-white text-xl rounded-full shadow-xl"
                                onClick={restartGame}
                            >
                                🔁 Play Again
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}