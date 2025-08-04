import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const originalCards = [
    { id: 1, text: "We’ve studied how similar clubs in 3 other schools succeeded with this idea.", type: "Logos" },
    { id: 2, text: "This project will help students feel more involved and boost morale.", type: "Pathos" },
    { id: 3, text: "It requires only ₹500 and takes one day to execute.", type: "Logos" },
    { id: 4, text: "I’ve led 2 successful campaigns in the past.", type: "Ethos" },
    { id: 5, text: "Our team is truly passionate about making a difference.", type: "Pathos" },
    { id: 6, text: "It fits well with the school’s goals of inclusivity and leadership.", type: "Ethos" },
    { id: 7, text: "We have signatures from 40 students who support this.", type: "Logos" },
    { id: 8, text: "I’ve discussed this idea with 2 teachers already, and they were encouraging.", type: "Ethos" },
    { id: 9, text: "We plan to track impact with a survey afterwards.", type: "Logos" },
];

const getFinalFeedback = (total) => {
    if (total <= 4) {
        return {
            label: "🌱 Beginner Persuader",
            message:
                "You're just getting started. Try mixing emotional, logical, and credible points next time to build stronger influence.",
        };
    } else if (total <= 7) {
        return {
            label: "🚀 Confident Communicator",
            message:
                "Good job! You’ve used multiple types of persuasion well. Now work on polishing structure and tone for maximum impact.",
        };
    } else {
        return {
            label: "🧠 Master Persuader",
            message:
                "Excellent! You’ve created a balanced, persuasive, and impactful pitch — just like a pro communicator.",
        };
    }
};


const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
const zoneNames = ["Introduction", "Main Argument", "Final Appeal"];
const APIKEY = import.meta.env.VITE_API_KEY;

const PitchPerfectGame = () => {
    const { completeCommunicationChallenge } = useCommunication();
    const [cardBank, setCardBank] = useState([]);
    const [zones, setZones] = useState([null, null, null]);
    const [custom, setCustom] = useState(["", "", ""]);
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [challengeCompleted, setChallengeCompleted] = useState(false);


    //for performance
    const { updatePerformance } = usePerformance();
   const [startTime,setStartTime] = useState(Date.now());
    const [finalScore, setFinalScore] = useState(null);

    useEffect(() => {
        setCardBank(shuffleArray(originalCards));
    }, []);

    useEffect(() => {
        if (finalScore !== null) {
            const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

            updatePerformance({
                moduleName: "Communication",
                topicName: "emotionalIntelligence",
                score: Math.round((finalScore / 20) * 10),
                accuracy: Math.round((finalScore / 20) * 100),
                avgResponseTimeSec: timeTakenSec,
                studyTimeMinutes: Math.ceil(timeTakenSec / 60),
                completed: finalScore >= 15,
                
            });
            setStartTime(Date.now());


            if (finalScore >= 15 && !challengeCompleted) {
                completeCommunicationChallenge(1, 0);
                setChallengeCompleted(true);
            }
        }
    }, [finalScore]);




    const onDrop = (zoneIndex, card) => {
        if (zones[zoneIndex]) return;
        setZones((z) => z.map((c, i) => (i === zoneIndex ? card : c)));
        setCardBank((bank) => bank.filter((c) => c.id !== card.id));
    };

    const handleReset = () => {
        setCardBank(shuffleArray(originalCards));
        setZones([null, null, null]);
        setCustom(["", "", ""]);
        setScore(null);
        setFeedback(null);
        setStartTime(Date.now());

    };

    const calculateScore = () => {
        let pts = 0;
        const types = zones.map((c) => c?.type);
        if (types.includes("Ethos") && types.includes("Pathos") && types.includes("Logos")) pts += 3;
        if (zones.every((c) => !!c)) pts += 2;
        const order = ["Ethos", "Pathos", "Logos"];
        if (zones.map((c) => c?.type).every((t, i) => t === order[i])) pts += 2;
        if (custom.some((t) => t.trim().length > 0)) pts += 3;
        setScore(pts);
    };

    const handleGeminiSubmit = async () => {
        setLoading(true);
        setFeedback(null);
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Evaluate the persuasive quality of the user's custom pitch.
Each section (Intro, Body, Appeal) is limited to 300 characters.
Score only based on keyword richness, tone (persuasive), and structure. Max 3 points total.
Give marks in "X/3" format.

User's Pitch:
Intro: ${custom[0]}
Body: ${custom[1]}
Appeal: ${custom[2]}

Respond ONLY in this raw JSON format:
{
  "customPitchScore": "X/3",
  "tips": "Practical improvement tips here",
  "avatarType": "congratulatory" or "disappointing"
}

Constraints:
- Never skip fields.
- Do NOT fabricate the score.
- If pitch uses persuasive tone + 3-part structure + keywords, give high score.
- If weak or vague, give lower score and critical tips.`
                                }
                            ]
                        }
                    ]
                }
            );

            let text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            // ✅ Clean triple backticks and optional "json" label
            text = text.replace(/```json|```/g, "").trim();

            const json = JSON.parse(text);
            setFeedback(json);
        } catch (error) {
            console.error("Gemini response error:", error);
            setFeedback({
                tips: "Failed to get feedback. Try again.",
                avatarType: "disappointing",
                customPitchScore: "0/3",
            });
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto my-5 bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl shadow-xl">
            <motion.h1
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-center mb-6 drop-shadow-lg"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 1, -1, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
                ✨🎤 Build Your Persuasive Pitch!💬🌟
            </motion.h1>




            <motion.div
                className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-lg border-l-8 border-pink-400 shadow"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="text-lg font-bold text-pink-800 mb-2">🎯 How to Play</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Drag cards into the 3 zones: <b>Introduction</b>, <b>Body</b>, and <b>Final Appeal</b>.</li>
                    <li>Pick cards that show facts 💡, feelings ❤️, and trust 🙋 to make your pitch awesome!</li>
                    <li>Then write your own pitch and let AI evaluate it! 🤖</li>
                </ul>
            </motion.div>


            <div className="flex flex-col md:flex-row gap-6 mb-10">
                {zones.map((zone, i) => (
                    <motion.div
                        key={i}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            const data = JSON.parse(e.dataTransfer.getData("card"));
                            onDrop(i, data);
                        }}
                        whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0] }}
                        className="flex-1 p-5 border-4 rounded-xl shadow-xl bg-gradient-to-br from-yellow-100 via-white to-pink-100 border-dashed border-purple-300 relative transition-all"
                    >
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-purple-200 shadow">
                            <h2 className="text-md font-bold text-purple-600 flex items-center gap-2 text-center">
                                {zoneNames[i]}
                            </h2>
                        </div>

                        <div className="min-h-[70px] mt-6 mb-3 flex items-center justify-center">
                            {zone ? (
                                <motion.div
                                    layout
                                    className="p-3 bg-green-100 rounded-lg shadow-inner border border-green-300 text-gray-800 font-medium"
                                    animate={{ scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    {zone.text}
                                </motion.div>
                            ) : (
                                <div className="text-gray-400 italic text-center text-sm">
                                    🧲 Drop your card here!
                                </div>
                            )}
                        </div>

                        {zone && (
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        setCardBank((b) => [...b, zone]);
                                        setZones((z) => z.map((c, ii) => (ii === i ? null : c)));
                                    }}
                                    className="mt-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
                                >
                                    ❌ Remove Card
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>


            <div className="mb-10">
                <motion.h3
                    className="text-2xl font-extrabold text-blue-700 mb-3 flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    🃏 Your Magical Card Bank
                </motion.h3>

                <div className="flex flex-wrap justify-between gap-3 max-h-[400px] overflow-y-auto p-4 bg-gradient-to-br from-cyan-50 via-white to-purple-50 rounded-xl shadow-inner border-4 border-blue-200">
                    {cardBank.map((card) => (
                        <motion.div
                            key={card.id}
                            layout
                            whileHover={{ scale: 1.07, rotate: [0, 1, -1, 0] }}
                            transition={{ duration: 0.3 }}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData("card", JSON.stringify(card))}
                            className="p-3 min-w-[200px] max-w-[240px] bg-white border-2 border-blue-300 rounded-lg shadow-md cursor-grab text-sm font-medium text-gray-700 hover:bg-blue-50 transition-all"
                        >
                            <div>{card.text}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-yellow-300 rounded-lg shadow-md hover:bg-yellow-400 transition-all"
                    >
                        🔄 Reset
                    </button>
                    <button
                        onClick={() => {
                            if (zones.every((z) => z)) {
                                calculateScore();
                            } else {
                                toast.error("🚧 Please place all 3 cards before submitting!");
                            }
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                        ✅ Submit Your Magical Pitch
                    </button>
                </div>

                {score !== null && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 p-4 bg-green-50 border-4 border-green-300 text-green-800 rounded-xl shadow-lg"
                    >
                        <h2 className="text-2xl font-bold">🧪 Pitch Score: {score} / 10</h2>
                    </motion.div>
                )}

                {/* BONUS ROUND: Show only after 1st score is available */}
                {score !== null && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 p-6 bg-purple-50 border-4 border-purple-300 rounded-xl shadow-md"
                    >
                        <h3 className="text-xl font-bold text-purple-700 mb-2">🎁 Bonus Round: Craft Your Own Spellbinding Pitch</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            ✍️ Use the structure: <strong>Intro</strong> – <strong>Body</strong> – <strong>Appeal</strong> (max 300 characters each)
                        </p>

                        {zones.map((_, i) => (
                            <textarea
                                key={i}
                                placeholder={`💭 ${zoneNames[i]}`}
                                maxLength={300}
                                value={custom[i]}
                                onChange={(e) =>
                                    setCustom((c) => c.map((t, ii) => (ii === i ? e.target.value : t)))
                                }
                                className="w-full p-3 border-2 border-purple-200 rounded-lg shadow-sm mb-3 text-gray-700"
                            />
                        ))}

                        <button
                            onClick={handleGeminiSubmit}
                            className="mt-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            ✨ Evaluate Custom Pitch
                        </button>

                        {loading && <p className="mt-4 text-blue-600">⏳ Summoning the Score...</p>}

                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 p-4 bg-white rounded-lg border-4 border-indigo-300 shadow"
                            >
                                <h2 className="text-xl font-bold text-indigo-600">🧠 Custom Pitch Score: {feedback.customPitchScore}</h2>
                                <div className="flex items-start gap-4 mt-3">
                                    <span className="text-3xl">
                                        {feedback.avatarType === "congratulatory" ? "🌟" : "🤔"}
                                    </span>
                                    <p className="text-gray-700">{feedback.tips}</p>
                                </div>
                            </motion.div>
                        )}

                        {feedback && (
                            (() => {
                                const customPts = parseInt(feedback.customPitchScore?.split("/")[0]) || 0;
                                const total = score + customPts;
                                setFinalScore(total);
                                const { label, message } = getFinalFeedback(total);
                                return (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-6 p-4 bg-yellow-50 rounded-lg border-4 border-yellow-400 shadow"
                                    >
                                        <h2 className="text-xl font-bold text-yellow-700">🏁 Final Score: {total} / 20</h2>
                                        <p className="text-lg font-semibold mt-2">{label}</p>
                                        <p className="mt-1 text-gray-700 italic">💬 {message}</p>
                                    </motion.div>
                                );
                            })()
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PitchPerfectGame;
