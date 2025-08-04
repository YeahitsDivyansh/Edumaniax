import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Lightbulb, PartyPopper } from "lucide-react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const dilemmas = [
    {
        id: 1,
        scenario: "🎉 Your best friend invites you to a party during team practice. What do you do?",
        options: ["Go to the party", "Go to practice", "Try to do both"],
    },
    {
        id: 2,
        scenario: "🕒 You have two deadlines: a team task and a scholarship form. Choose one!",
        options: ["Team task", "Scholarship", "Split time"],
    },
    {
        id: 3,
        scenario: "📱 Your friend is texting you during an important class. What's your choice?",
        options: ["Reply quickly", "Ignore till class ends", "Step out to reply"],
    }
];

const flashcards = [
    {
        id: 1,
        question: "🚀 If we don't launch today, we'll fail. So we must launch now.",
        options: ["False choice", "Too emotional", "Quick guess"],
        answer: "False choice"
    },
    {
        id: 2,
        question: "🙋‍♂️ Everyone is doing it, so it must be right.",
        options: ["Follow the crowd", "Change topic", "Jump to conclusion"],
        answer: "Follow the crowd"
    }
];

export default function FunDilemmaGame() {
    const { completeLeadershipChallenge } = useLeadership();
    const [step, setStep] = useState(1);
    const [dilemmaIndex, setDilemmaIndex] = useState(0);
    const [selected, setSelected] = useState({});
    const [flashIndex, setFlashIndex] = useState(0);
    const [flashAnswers, setFlashAnswers] = useState({});
    const [justifications, setJustifications] = useState({});
    const [score, setScore] = useState(0);
    const [showJustify, setShowJustify] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());
    useEffect(() => {
        if (step === 4 && score >= flashcards.length) {
            const totalTimeMs = Date.now() - startTime;

            updatePerformance({
                moduleName: "Leadership",
                topicName: "theStrategist",
                score: Math.round((score / flashcards.length) * 100),
                accuracy: parseFloat(((score / flashcards.length) * 100).toFixed(2)),
                avgResponseTimeSec: parseFloat((totalTimeMs / (flashcards.length * 1000)).toFixed(2)),
                studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
                completed: true,
            });
            setStartTime(Date.now());
            completeLeadershipChallenge(0, 1);
        }
    }, [step, score]);


    const restartGame = () => {
        setStep(1);
        setDilemmaIndex(0);
        setSelected({});
        setFlashIndex(0);
        setFlashAnswers({});
        setJustifications({});
        setScore(0);
        setShowJustify(false);
        setCurrentAnswer("");
        setStartTime(Date.now());
    };

    const handleDilemmaAnswer = (option) => {
        setCurrentAnswer(option);
        setShowJustify(true);
    };

    const submitJustification = () => {
        const current = dilemmas[dilemmaIndex];
        setSelected({ ...selected, [current.id]: currentAnswer });
        setJustifications({ ...justifications, [current.id]: currentJustification });
        setCurrentAnswer("");
        setCurrentJustification("");
        setShowJustify(false);
        if (dilemmaIndex + 1 < dilemmas.length) setDilemmaIndex(dilemmaIndex + 1);
        else setStep(2);
    };

    const [currentJustification, setCurrentJustification] = useState("");

    const handleFlashNext = (option) => {
        const current = flashcards[flashIndex];
        setFlashAnswers({ ...flashAnswers, [current.id]: option });
        if (option === current.answer) setScore(score + 1);
        if (flashIndex + 1 < flashcards.length) setFlashIndex(flashIndex + 1);
        else setStep(3);
    };

    return (
        <div className="max-w-5xl mx-auto my-10 p-10 sm:p-12 bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 border-8 border-pink-200 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] text-gray-800 font-sans relative overflow-hidden ring-4 ring-purple-300">
            <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-pink-300 rounded-full blur-2xl opacity-40 animate-spin-slow"></div>
            <h1 className="text-5xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-center mb-8 flex items-center justify-center gap-3 animate-bounce pb-2">
                <Sparkles className="text-yellow-400 w-8 h-8 animate-spin-slow" />
                Strategic Fun Game
                <Sparkles className="text-yellow-400 w-8 h-8 animate-spin-slow" />
            </h1>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="bg-white/70 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-purple-200 backdrop-blur-md animate-fadeIn"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                            🤔 Q{dilemmaIndex + 1}:
                            <span className="text-yellow-500 animate-pulse">What would you do?</span>
                        </h2>

                        <p className="text-lg mb-5 text-gray-800 leading-relaxed">{dilemmas[dilemmaIndex].scenario}</p>

                        {!showJustify ? (
                            <div className="space-y-3">
                                {dilemmas[dilemmaIndex].options.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleDilemmaAnswer(opt)}
                                        className="w-full p-4 rounded-full bg-gradient-to-r from-pink-200 via-yellow-100 to-purple-200 hover:from-purple-300 hover:to-pink-300 border-2 border-purple-300 text-lg font-semibold text-gray-800 shadow-lg transition-all duration-300 ease-in-out"
                                    >
                                        🌟 {opt}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-6 bg-pink-50 border border-pink-300 rounded-xl p-5 shadow-inner">
                                <h3 className="text-md font-bold text-pink-700 mb-3">
                                    💭 Why did you choose:
                                    <span className="italic text-purple-600"> “{currentAnswer}”</span>?
                                </h3>

                                <textarea
                                    value={currentJustification}
                                    onChange={(e) => setCurrentJustification(e.target.value)}
                                    placeholder="Write your smart reason here... ✨"
                                    rows={4}
                                    className="w-full p-4 border-2 border-purple-300 rounded-xl text-md shadow resize-none bg-white"
                                />

                                <button
                                    onClick={submitJustification}
                                    disabled={currentJustification.trim().length < 10}
                                    className="mt-4 w-full py-3 rounded-full text-white text-lg font-bold shadow-lg transition-transform duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 disabled:opacity-50"
                                >
                                    🚀 Next
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="bg-white/80 backdrop-blur-md border-4 border-green-200 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-green-600 mb-4 flex items-center gap-2">
                            🧠 Spot the Mistake!
                            <span className="text-yellow-500 animate-bounce">⚡</span>
                        </h2>

                        <p className="text-lg sm:text-xl mb-6 text-gray-800 font-medium bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg shadow-inner">
                            {flashcards[flashIndex].question}
                        </p>

                        <div className="space-y-3">
                            {flashcards[flashIndex].options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleFlashNext(opt)}
                                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-green-200 via-green-100 to-yellow-100 hover:from-green-300 hover:to-yellow-200 text-lg font-semibold text-gray-800 border-2 border-green-300 shadow-md transition-transform duration-300 hover:scale-105"
                                >
                                    🧐 {opt}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >

                        <button
                            onClick={() => setStep(4)}
                            className="mt-4 w-full py-3 rounded-full text-white text-lg font-semibold shadow-xl bg-gradient-to-r from-pink-400 to-purple-500"
                        >
                            See Results
                        </button>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-5"
                    >
                        <h2 className="text-3xl font-bold text-green-600 flex justify-center items-center gap-2">
                            <PartyPopper className="text-green-500" /> Well Done!
                        </h2>
                        <p className="text-xl">🏅 You earned the <strong>Logic Leader</strong> badge!</p>

                        <button
                            onClick={restartGame}
                            className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-full shadow-lg"
                        >
                            🔁 Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
