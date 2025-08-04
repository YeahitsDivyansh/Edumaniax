import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { toast } from "react-hot-toast";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
    { id: 1, title: "🧑‍🏫 AI that recognizes faces for school security" },
    { id: 2, title: "💼 AI that decides who gets a job" },
    { id: 3, title: "🛒 AI that suggests what you should buy" },
    { id: 4, title: "🩺 AI that helps doctors diagnose diseases" },
];

const comicOptions = {
    why: [
        "👁️ It watches carefully, but might make mistakes.",
        "📊 Based on data, but needs checking.",
        "🎯 Can help a lot if used fairly!",
    ],
    improve: [
        "🤖 Make it explain its decisions!",
        "🔍 Add a human reviewer!",
        "🧠 Train it with more examples!",
    ],
};

export default function AIEthicsDetective() {
    const { completeComputersChallenge } = useComputers();
    const [step, setStep] = useState(1);
    const [draggedId, setDraggedId] = useState(null);
    const [judgments, setJudgments] = useState({});
    const [responses, setResponses] = useState({});
    const [deepAnswers, setDeepAnswers] = useState({
        q1: "",
        q2: "",
        q3: "",
    });
    const [challengeCompleted, setChallengeCompleted] = useState(false);

    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());


    const handleDrop = (label) => {
        if (draggedId !== null) {
            setJudgments((prev) => ({
                ...prev,
                [draggedId]: label,
            }));
            toast.success(`Dropped into ${label}! 🎯`, {
                style: {
                    borderRadius: "10px",
                    background: "#f0f9ff",
                    color: "#0f172a",
                    border: "2px solid #38bdf8",
                },
                icon: "✅",
            });
            setDraggedId(null);
        }
    };


    const handleSelect = (scenarioId, type, value) => {
        setResponses((prev) => ({
            ...prev,
            [scenarioId]: { ...prev[scenarioId], [type]: value },
        }));
    };

    const allJudged = scenarios.every((s) => judgments[s.id]);
    const allComicAnswered = scenarios.every(
        (s) => responses[s.id]?.why && responses[s.id]?.improve
    );
    const allDeepAnswered = deepAnswers.q1 && deepAnswers.q2 && deepAnswers.q3;

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-yellow-100 to-pink-200 rounded-3xl shadow-2xl min-h-screen text-center font-[Comic Sans MS,cursive]">

            {step === 4 && <Confetti />}

            <motion.h1
                className="text-5xl md:text-6xl font-extrabold text-purple-800 mb-10 origin-bottom inline-block"
                initial={{ rotate: 0, scale: 1, y: 0 }}
                animate={{
                    rotate: [0, -2, 2, -1, 0],     // subtle detective glances
                    scale: [1, 1.02, 1, 1.01, 1],  // gentle lean-in and back
                    y: [0, -1, 0, 1, 0],           // small bob like tiptoeing
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                🕵️ AI Ethics Detective
            </motion.h1>



            {/* STEP 1: Categorization */}
            {step === 1 && (
                <>
                    <p className="text-lg text-gray-700 mb-4">
                        Drag each AI case into a category!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center mb-8">
                        {scenarios.map((s) =>
                            !judgments[s.id] ? (
                                <motion.div
                                    key={s.id}
                                    draggable
                                    onDragStart={() => setDraggedId(s.id)}
                                    className="p-4 bg-white border-4 border-blue-400 rounded-2xl shadow-xl cursor-grab text-center"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: [0, 3, -3, 0] }} // Only rotation
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 3,
                                        ease: "easeInOut",
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 0, // stop rotation and hold steady on hover
                                        boxShadow: "0px 12px 30px rgba(59, 130, 246, 0.3)", // strong shadow
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <h2 className="text-xl font-bold text-blue-800 leading-snug">
                                        {s.title} <span className="text-2xl animate-pulse">🎭</span>
                                    </h2>
                                </motion.div>

                            ) : null
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-around mb-10">
                        {["Helpful", "Harmful", "Both"].map((label) => (
                            <motion.div
                                key={label}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(label)}
                                className="w-full sm:w-1/3 p-4 border-4 border-dashed rounded-xl text-center bg-white shadow-md hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-3xl mb-2 animate-bounce">
                                    {label === "Helpful" ? "✅" : label === "Harmful" ? "❌" : "🤔"}
                                </div>
                                <h3 className="font-bold text-lg text-purple-700">{label}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {allJudged && (
                        <button
                            onClick={() => setStep(2)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg transition hover:scale-105"
                        >
                            ➡️ Explain Your Choices
                        </button>
                    )}
                </>
            )}

            {/* STEP 2: Comic Bubbles */}
            {step === 2 && (
                <>
                    <p className="text-lg text-gray-700 mb-6">
                        Pick answers for each scenario.
                    </p>
                    {scenarios.map((s) => (
                        <motion.div
                            key={s.id}
                            className="bg-white border-2 p-6 rounded-xl mb-6 text-left shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h2 className="text-xl font-bold mb-2">{s.title}</h2>
                            <p className="font-medium mb-2">
                                Judgment: {judgments[s.id]}{" "}
                                {judgments[s.id] === "Helpful"
                                    ? "✅"
                                    : judgments[s.id] === "Harmful"
                                        ? "❌"
                                        : "🤔"}
                            </p>

                            <div className="mb-4">
                                <h3 className="font-bold mb-1">💬 Why?</h3>
                                <div className="flex flex-wrap gap-2">
                                    {comicOptions.why.map((option, i) => (
                                        <button
                                            key={i}
                                            className={`px-3 py-2 rounded-xl border ${responses[s.id]?.why === option
                                                ? "bg-yellow-300 border-yellow-600"
                                                : "bg-gray-100"
                                                }`}
                                            onClick={() => handleSelect(s.id, "why", option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-1">🔧 How to Make it Better?</h3>
                                <div className="flex flex-wrap gap-2">
                                    {comicOptions.improve.map((option, i) => (
                                        <button
                                            key={i}
                                            className={`px-3 py-2 rounded-xl border ${responses[s.id]?.improve === option
                                                ? "bg-green-300 border-green-600"
                                                : "bg-gray-100"
                                                }`}
                                            onClick={() => handleSelect(s.id, "improve", option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {allComicAnswered && (
                        <button
                            onClick={() => setStep(3)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg transition hover:scale-105"
                        >
                            ➡️Deep Thinking Time
                        </button>
                    )}
                </>
            )}

            {/* STEP 3: Deep Thinking Questions */}
            {step === 3 && (
                <>
                    <motion.div
                        className="mt-8 px-6 py-4 rounded-3xl bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 border-4 border-purple-300 shadow-xl max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-extrabold text-purple-800 text-center mb-6 animate-pulse">
                            🧠 Deep Thinking Questions
                        </h2>

                        <div className="space-y-6">
                            {[
                                {
                                    key: "q1",
                                    q: "🤖 Should AI make decisions about people's lives?",
                                },
                                {
                                    key: "q2",
                                    q: "⚖️ How can we prevent AI bias?",
                                },
                                {
                                    key: "q3",
                                    q: "📜 What rules should AI follow?",
                                },
                            ].map(({ key, q }) => (
                                <div
                                    key={key}
                                    className="bg-white border-2 border-yellow-400 rounded-2xl p-4 shadow-lg"
                                >
                                    <p className="font-bold text-lg text-purple-700 mb-2">{q}</p>
                                    <textarea
                                        className="w-full p-3 rounded-xl border-2 border-purple-200 focus:ring-4 focus:ring-purple-300 transition-all duration-300 resize-none"
                                        rows={3}
                                        placeholder="💬 Type your thoughtful answer here..."
                                        value={deepAnswers[key]}
                                        onChange={(e) =>
                                            setDeepAnswers({ ...deepAnswers, [key]: e.target.value })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>


                    {allDeepAnswered && (
                        <button
                            onClick={() => {
                                if (!challengeCompleted) {
                                    completeComputersChallenge(2, 0);
                                    setChallengeCompleted(true);
                                }

                                // ✅ Always update performance
                                const endTime = Date.now();
                                const totalPrompts = scenarios.length * 2 + 3; // why + improve + 3 deep answers
                                const avgResponseTimeSec = ((endTime - startTime) / 1000) / totalPrompts;
                                const studyTimeMinutes = Math.round((endTime - startTime) / 60000);


                                updatePerformance({
                                    moduleName: "Computers",
                                    topicName: "aIFuturesAndPossibilities",
                                    score: 10,
                                    accuracy: 100,
                                    avgResponseTimeSec,
                                    studyTimeMinutes,
                                    completed: true,

                                });
                                setStartTime(Date.now());
                                setStep(4);
                            }}
                            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg transition hover:scale-105"
                        >
                            🏁 See Your Badge!
                        </button>
                    )}
                </>
            )}

            {/* STEP 4: Final Result */}
            {step === 4 && (
                <motion.div
                    className="mt-10 bg-gradient-to-br from-green-100 to-yellow-100 p-8 rounded-3xl border-4 border-green-400 shadow-2xl max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-black text-green-700 mb-4 text-center animate-bounce">
                        🏆 You Earned the <span className="text-purple-700">AI Ethics Expert</span> Badge!
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-8">
                        🎉 Great work thinking deeply, fairly, and creatively about AI!
                    </p>

                    <div className="space-y-6 text-left">
                        <h3 className="text-2xl font-bold text-purple-800 mb-2">✅ Correct Answers</h3>

                        <div className="bg-white p-4 rounded-2xl border-l-8 border-green-500 shadow-sm">
                            <p className="font-bold mb-1 text-green-700">🤖 Should AI make decisions about people's lives?</p>
                            <p className="text-gray-800">
                                Not completely. AI can help with suggestions, but humans should make the final decision — especially for things like jobs, school, or medical treatment.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border-l-8 border-green-500 shadow-sm">
                            <p className="font-bold mb-1 text-green-700">⚖️ How can we prevent AI bias?</p>
                            <p className="text-gray-800">
                                By training AI on diverse, fair, and balanced data. Also, real people should regularly test and check the AI to catch unfair patterns.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border-l-8 border-green-500 shadow-sm">
                            <p className="font-bold mb-1 text-green-700">📜 What rules should AI follow?</p>
                            <p className="text-gray-800">
                                AI should be honest, fair, and respect everyone’s privacy. It should follow safety rules, and people should always know when AI is being used.
                            </p>
                        </div>
                    </div>

                    {/* Try Again Button */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => {
                                setStep(1);
                                setResponses({});
                                setDeepAnswers({
                                    q1: "",
                                    q2: "",
                                    q3: "",
                                });
                                setJudgments({});
                                setDraggedId(null);
                                 setStartTime(Date.now());
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
                        >
                            🔁 Try Again
                        </button>
                    </div>
                </motion.div>
            )}

        </div>
    );
}
