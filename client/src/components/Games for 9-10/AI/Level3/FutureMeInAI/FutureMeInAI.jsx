import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const careers = [
    {
        emoji: "📊",
        title: "AI Data Scientist",
        whatTheyDo: "Analyze data to help AI learn smarter",
        skills: "Math, Python, Critical Thinking",
    },
    {
        emoji: "🎨",
        title: "AI UX Designer",
        whatTheyDo: "Design how people interact with AI",
        skills: "Design, Psychology, Coding",
    },
    {
        emoji: "⚖️",
        title: "AI Legal Analyst",
        whatTheyDo: "Check if AI follows the law",
        skills: "Ethics, Law, Technology",
    },
    {
        emoji: "🤖",
        title: "Robotics Engineer",
        whatTheyDo: "Build AI-powered physical machines",
        skills: "Mechanics, Programming",
    },
];

const interestEmojis = ["😴", "😐", "🙂", "😊", "😃", "😄", "😁", "😆", "🤩", "🚀"];

export default function FutureMeInAI() {
    const { completeComputersChallenge } = useComputers();
    const [careerData, setCareerData] = useState(
        careers.map((c) => ({ ...c, interest: "" }))
    );
    const [reflection, setReflection] = useState({
        favorite: "",
        skillsToLearn: "",
    });
    const [step, setStep] = useState(1);

    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        if (step === 2) {
            completeComputersChallenge(2, 2);
        }
    }, [step]);

    const handleInterestChange = (index, value) => {
        const updated = [...careerData];
        updated[index].interest = value;
        setCareerData(updated);
    };

    const handleReflectionChange = (field, value) => {
        setReflection({ ...reflection, [field]: value });
    };

    const handleSubmit = () => {
        const isInterestValid = careerData.every(
            (c) => Number(c.interest) >= 1 && Number(c.interest) <= 10
        );
        const isReflectionFilled = Object.values(reflection).every((r) => r.trim());

        if (!isInterestValid || !isReflectionFilled) {
            toast.error("Fill all fields to continue 🚦");
            return;
        }

        const endTime = Date.now();
        const studyTimeMinutes = Math.round((endTime - startTime) / 60000);
        const avgResponseTimeSec = (endTime - startTime) / 1000;

        updatePerformance({
            moduleName: "Computers",
            topicName: "humanCenteredAIThinking",
            score: 10,
            accuracy: 100,
            avgResponseTimeSec,
            studyTimeMinutes,
            completed: true,
        });
        setStartTime(Date.now());

        setStep(2);
    };


    const bestCareer = () => {
        const interests = careerData.map((c) => Number(c.interest));
        const max = Math.max(...interests);

        // If interest is too low, give an encouraging message
        if (max < 4) {
            return "✨ You're just getting started — explore more to find your spark!";
        }

        const top = careerData.find((c) => Number(c.interest) === max);
        return top ? `${top.emoji} ${top.title}` : "✨ You're just getting started — explore more to find your spark!";
    };
    return (
        <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 rounded-3xl shadow-2xl border-4 border-purple-600">

            <motion.h1
                className="text-5xl md:text-6xl font-extrabold text-center text-yellow-300 mb-10 drop-shadow-[0_0_10px_rgba(255,255,150,0.5)]"
                animate={{
                    y: [0, -4, 0, 4, 0], // subtle bounce
                    scale: [1, 1.02, 1.05, 1.02, 1], // gentle pulse
                    textShadow: [
                        "0px 0px 10px rgba(255,255,150,0.4)",
                        "0px 0px 20px rgba(255,255,180,0.6)",
                        "0px 0px 30px rgba(255,255,200,0.8)",
                        "0px 0px 20px rgba(255,255,180,0.6)",
                        "0px 0px 10px rgba(255,255,150,0.4)"
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >💡 Future Me in AI 💡
            </motion.h1>

            {step === 1 && (
                <>
                    <p
                        className="text-3xl   text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 mb-10 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)] animate-bounce tracking-wide"
                    >
                        ✨ Discover Your Sparkling Future in the World of AI! 🌟
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {careerData.map((career, index) => {
                            const interest = Number(career.interest);
                            return (
                                <motion.div
                                    key={career.title}
                                    className="bg-gradient-to-br from-white via-pink-50 to-yellow-100 border-4 border-purple-200 rounded-3xl p-6 shadow-2xl transform hover:scale-[1.03]  transition-all duration-300"
                                >
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-3 flex items-center">
                                        <span className="mr-3 text-4xl animate-bounce">{career.emoji}</span> {career.title}
                                    </h2>
                                    <p className="text-lg text-purple-700 font-semibold italic mb-2 bg-purple-50 p-3 rounded-xl shadow-sm border-l-4 border-purple-300">
                                        💼 <span className="text-purple-900">{career.whatTheyDo}</span>
                                    </p>

                                    <p className="text-base text-purple-900 mb-4 bg-gradient-to-br from-white via-yellow-50 to-pink-50 px-4 py-3 rounded-2xl shadow-inner border border-yellow-300">
                                        🧠 <span className="font-extrabold text-pink-600">Skills You’ll Need:</span> {career.skills}
                                    </p>

                                    <label className="block text-xl text-pink-700 font-bold mb-2">
                                        📊 Rate Your Interest here!
                                    </label>

                                    <p className="text-sm text-purple-600 italic mb-4 bg-purple-100 px-3 py-2 rounded-lg shadow">
                                        ✍️ Just type a number from <span className="font-bold text-purple-800">1 to 10</span> below to show how excited you are!
                                    </p>


                                    <div className="flex items-center space-x-3">
                                        <motion.input
                                            type="number"
                                            min="1"
                                            max="10"
                                            placeholder="1–10"
                                            value={career.interest}
                                            onChange={(e) => handleInterestChange(index, e.target.value)}
                                            className="w-20 text-center font-extrabold rounded-full border-2 border-yellow-400 bg-yellow-100 p-2 focus:ring-2 focus:ring-pink-400 transition duration-300"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 5px #facc15, 0 0 10px #f472b6",
                                                    "0 0 15px #facc15, 0 0 25px #f472b6",
                                                    "0 0 5px #facc15, 0 0 10px #f472b6",
                                                ],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <span className="text-3xl">
                                            {interest >= 1 && interest <= 10 ? interestEmojis[interest - 1] : "❓"}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>


                    <div className="mt-10 bg-gradient-to-br from-purple-50 via-yellow-50 to-pink-50 rounded-3xl p-6 shadow-xl border border-purple-200">
                        <h3 className="text-3xl font-extrabold text-purple-800 mb-6 text-center">
                            🎯 Reflection Time!
                        </h3>

                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-purple-700 mb-2">
                                🌟 Which AI job sounds the most exciting to you?
                            </label>
                            <textarea
                                className="w-full p-4 rounded-2xl border-2 border-yellow-300 bg-white shadow-inner text-purple-800 placeholder-purple-400 focus:ring-2 focus:ring-pink-300 transition"
                                rows={3}
                                placeholder="Type your dream AI job here..."
                                value={reflection.favorite}
                                onChange={(e) => handleReflectionChange("favorite", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-purple-700 mb-2">
                                📚 What will you need to learn to reach it?
                            </label>
                            <textarea
                                className="w-full p-4 rounded-2xl border-2 border-yellow-300 bg-white shadow-inner text-purple-800 placeholder-purple-400 focus:ring-2 focus:ring-pink-300 transition"
                                rows={3}
                                placeholder="List any skills, tools, or subjects you’ll explore!"
                                value={reflection.skillsToLearn}
                                onChange={(e) => handleReflectionChange("skillsToLearn", e.target.value)}
                            />
                        </div>
                    </div>

                    <motion.button
                        onClick={handleSubmit}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-2xl rounded-full font-extrabold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                    >
                        🚀 Show My Future Path
                    </motion.button>
                </>
            )}

            {step === 2 && (
                <motion.div
                    className="text-center mt-10 p-8 bg-green-100 rounded-3xl shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Confetti />

                    <h2 className="text-4xl font-bold text-green-800 mb-4">🎉 You're Future-Ready!</h2>

                    {bestCareer().includes("You're just getting started") ? (
                        <>
                            <p className="text-xl font-semibold text-purple-700 mb-6">
                                You’re still exploring — and that’s awesome! The world of AI has many paths.
                            </p>
                            <motion.div
                                className="text-2xl font-bold italic text-pink-700 mb-6"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 1.8 }}
                            >
                                ✨ You're just getting started — explore more to find your spark!
                            </motion.div>
                            <div className="text-6xl mb-3 animate-pulse">🧭</div>
                            <div className="text-2xl font-bold text-green-700 mb-4">
                                Badge Earned: <span className="text-4xl"> Curious Explorer</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-xl font-semibold text-purple-700 mb-6">
                                Based on your interests, your golden AI career match is:
                            </p>
                            <motion.div
                                className="text-5xl font-extrabold mb-4"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            >
                                {bestCareer()}
                            </motion.div>
                            <div className="text-6xl mb-3 animate-pulse">🏅</div>
                            <div className="text-2xl font-bold text-green-700 mb-4">
                                Badge Earned: <span className="text-4xl"> Future-Ready Explorer</span>
                            </div>
                        </>
                    )}


                    <motion.button
                        className="mt-6 px-8 py-3 bg-white text-purple-700 font-bold rounded-full border-2 border-purple-500 shadow-lg"
                        onClick={() => {
                            setCareerData(careers.map((c) => ({ ...c, interest: "" })));
                            setReflection({ favorite: "", skillsToLearn: "" });
                            setStep(1);
                            setStartTime(Date.now());

                        }}
                        whileHover={{ scale: 1.1 }}
                    >
                        🔄 Try Again
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
