import React, { useState } from "react";
import { motion } from "framer-motion";
import { GiMagicPalm, GiFilmSpool, GiMicrophone, GiClick } from "react-icons/gi";
import { FaCheckCircle, FaRedo } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { Heart, MessageCircle, Send } from "lucide-react";
import toast from "react-hot-toast";
import Confetti from 'react-confetti';
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const sections = [
    { label: "CTA", icon: <GiClick className="text-xl mr-2 animate-wiggle" />, color: "bg-green-200" },
    { label: "Visual Demo", icon: <GiFilmSpool className="text-xl mr-2 animate-spin" />, color: "bg-blue-200" },
    { label: "Opening Hook", icon: <GiMagicPalm className="text-xl mr-2 animate-bounce" />, color: "bg-pink-200" },
    { label: "Voiceover/Script", icon: <GiMicrophone className="text-xl mr-2 animate-pulse" />, color: "bg-yellow-200" },
];

const correctSequence = ["Opening Hook", "Visual Demo", "Voiceover/Script", "CTA"];

const visualStyles = [
    { label: "Minimal aesthetic with foam ASMR", key: "foam" },
    { label: "Vibrant pop with emojis and stickers", key: "pop" },
    { label: "Eco-clean with green overlays and captions", key: "eco" }
];

export default function ReelArchitectGame() {
    const { completeDMChallenge } = useDM();
    const [sequence, setSequence] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [style, setStyle] = useState(null);
    const [styleFeedback, setStyleFeedback] = useState("");
    const [campaignName, setCampaignName] = useState("");
    const [caption, setCaption] = useState("");
    const [step, setStep] = useState(1);
    const [points, setPoints] = useState(0);
    //for performance
    const { updatePerformance } = usePerformance();
   const [startTime,setStartTime] = useState(Date.now());

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("dragIndex", index);
    };

    const handleDrop = (e, dropIndex) => {
        const dragIndex = e.dataTransfer.getData("dragIndex");
        const draggedItem = sections[dragIndex];

        if (!sequence.find((s) => s.label === draggedItem.label)) {
            const newSequence = [...sequence];
            newSequence.splice(dropIndex, 0, draggedItem);
            setSequence(newSequence.slice(0, 4));
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const checkSequence = () => {
        const isCorrect = JSON.stringify(sequence.map((s) => s.label)) === JSON.stringify(correctSequence);
        setFeedback(isCorrect ? "correct" : "wrong");
        if (isCorrect) {
            setPoints((prev) => prev + 3); // ✅ Give 3 points for sequence
            setTimeout(() => setStep(2), 1500);
        }
    };

    const checkStyle = () => {
        const isCorrect = style === "foam";
        setStyleFeedback(
            isCorrect
                ? "💨 Subtle foam burst - perfect brand tone!"
                : "🎉 Looks fun, but doesn’t match the brand story!"
        );
        return isCorrect ? 3 : 0;
    };

    const checkCaption = () => {
        let score = 0;
        if (/foam|cleanser/i.test(campaignName)) {
            score += 2;
        }
        const isShort = campaignName.length <= 120;
        const hasHashtag = /#\w+/.test(campaignName);
        const hasEmoji = /[✨🔥💧🌟🌸]/.test(campaignName);

        if ((hasHashtag || hasEmoji) && isShort) {
            score += 2;
        }
        const isCamelCase = /\b[A-Z][a-z]+[A-Z][a-z]+\b/.test(campaignName); // e.g., GlowAndGo
        const isRhyming = /\b(\w+)\b.*\b\1\b/.test(campaignName); // rough idea for duplicate words
        if (hasEmoji || isCamelCase || isRhyming) {
            score += 1;
        }
        return score;
    };


    const calculateScore = () => {
        if (!campaignName.trim() || !caption.trim()) {
            toast.error("Please enter a campaign name and select at least one hashtag!");
            return;
        }

        const stylePoints = checkStyle();
        const captionPoints = checkCaption();
        const totalPoints = stylePoints + captionPoints + points; // max = 11

        setPoints(totalPoints);
        setStep(4);
        completeDMChallenge(1, 0);

        // ⏱️ Performance Tracking
        const endTime = Date.now();
        const durationSec = Math.round((endTime - startTime) / 1000);
        const durationMinutes = Math.round(durationSec / 60) || 1; // avoid zero

        const scoreOutOf10 = Math.round((totalPoints / 11) * 10);
        const accuracyOutOf100 = Math.round((totalPoints / 11) * 100);
        const avgResponseTimeSec = Math.round(durationSec); // per point

        updatePerformance({
            moduleName: "DigitalMarketing",
            topicName: "creativity",
            score: scoreOutOf10,
            accuracy: accuracyOutOf100,
            avgResponseTimeSec,
            studyTimeMinutes: durationMinutes,
            completed: true,
          
        });
        setStartTime(Date.now());

    };


    const resetGame = () => {
        setSequence([]);
        setFeedback(null);
        setStyle(null);
        setCaption("");
        setPoints(0);
        setStep(1);
        setStyleFeedback("");
        setCampaignName("");
        setStartTime(Date.now());

    };

    const getStyleVisual = (key) => {
        switch (key) {
            case "foam":
                return (
                    <div className="mt-3 p-6 rounded-3xl bg-white shadow-xl text-center relative border-2 border-blue-300">
                        <div className="h-28 bg-gradient-to-br from-white via-blue-200 to-cyan-500 rounded-2xl relative overflow-hidden shadow-inner border border-blue-100">
                            {/* Floating bubbles */}
                            <div className="absolute w-12 h-12 bg-white bg-opacity-40 rounded-full top-6 left-1/4 animate-pulse blur-sm shadow-md" />
                            <div className="absolute w-8 h-8 bg-white bg-opacity-50 rounded-full top-1/3 left-2/3 animate-ping blur-sm shadow-sm" />
                            <div className="absolute w-6 h-6 bg-white bg-opacity-60 rounded-full top-2/3 left-1/3 animate-bounce blur-sm shadow-sm" />
                            <div className="absolute w-10 h-10 bg-white bg-opacity-30 rounded-full top-1/2 right-1/4 animate-pulse blur-md shadow-sm" />

                            {/* Emojis & sparkles */}
                            <motion.div
                                className="absolute text-3xl top-2 left-4"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                            >
                                ✨
                            </motion.div>
                            <motion.div
                                className="absolute text-3xl bottom-3 right-4"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                🫧
                            </motion.div>
                        </div>


                    </div>
                );
            case "pop":
                return (
                    <div className="mt-3 p-4 rounded-xl bg-pink-50 shadow-inner text-center relative">
                        <div className="h-24 bg-gradient-to-tr from-yellow-100 via-pink-200 to-purple-300 rounded-lg relative overflow-hidden">
                            <motion.div className="absolute text-2xl left-4 top-3" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>✨</motion.div>
                            <motion.div className="absolute text-2xl right-6 bottom-2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>😍</motion.div>
                            <motion.div className="absolute text-2xl left-1/2 top-1/2" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>🔥</motion.div>
                        </div>
                    </div>
                );
            case "eco":
                return (
                    <div className="mt-3 p-4 rounded-xl bg-green-50 shadow-inner text-center relative">
                        <div className="h-24 bg-gradient-to-tr from-green-100 via-emerald-200 to-lime-300 rounded-lg relative overflow-hidden">
                            <motion.div className="absolute text-2xl left-1/4 top-1/3" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🍃</motion.div>
                            <motion.div className="absolute text-2xl right-6 top-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🌱</motion.div>
                            <motion.div className="absolute text-2xl left-1/2 bottom-4" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>🕊️</motion.div>
                            <motion.div className="absolute bottom-1 left-1/3 text-green-800 italic font-serif text-sm"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: [0, 1, 0.8, 1], y: [10, 0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}>
                                “Breathe in the freshness. Let the planet shine.”
                            </motion.div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="relative p-6 max-w-5xl mx-auto bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 rounded-3xl border-4 border-purple-300 shadow-2xl space-y-6 mt-4 mb-4"
        >
            {/* Decorative Emojis in Corners */}
            <div className="absolute -top-5 -left-5 text-3xl animate-bounce">🌟</div>
            <div className="absolute -top-5 -right-5 text-3xl animate-bounce">🧠</div>
            <div className="absolute -bottom-5 -left-5 text-3xl animate-pulse">🎮</div>
            <div className="absolute -bottom-5 -right-5 text-3xl animate-pulse">💡</div>

            {/* Main content */}
            <div className="text-lg md:text-xl font-semibold text-purple-800">
                <motion.h1 className="text-4xl font-bold text-center text-pink-600 animate-pulse mb-3">
                    🎬 Reel Architect Challenge
                </motion.h1>

                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="p-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-xl space-y-6"
                    >
                        {/* 🧠 OBJECTIVE */}
                        <div className="text-center text-lg md:text-xl font-semibold text-purple-700 bg-white p-4 rounded-xl shadow-md">
                            🧠 <strong>Objective:</strong> Build a super cool Instagram Reel 📱 for the <span className="text-pink-500 font-bold">GlowPop Foam Cleanser</span> launch using fun scenes, catchy captions, and creative energy! 🌟
                        </div>

                        {/* 🎬 SCENARIO PROMPT */}
                        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                            🎬 <strong className="text-lg text-blue-700">Scenario Prompt:</strong><br />
                            <span className="text-gray-700">
                                "GlowPop is launching a ✨ Foamy Face Cleanser! Your job? Make a <span className="font-bold text-purple-600">15-second Reel</span> that grabs attention in <span className="font-bold text-pink-600">3 seconds</span> and keeps viewers watching till the end! 🎯 Use the best scenes, captions & hooks!"
                            </span>
                        </div>

                        {/* 👷 STEP TITLE */}
                        <motion.h2
                            className="text-3xl font-extrabold text-center text-purple-800"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        >
                            🛠️ Step 1: Build Your Reel!
                        </motion.h2>

                        <p className="text-center text-gray-600 mb-4">🎬 Drag your favorite sections to the 15s timeline below!</p>

                        {/* DRAGGABLE SECTIONS */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            {sections.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`cursor-grab px-4 py-2 rounded-full shadow-md flex items-center font-semibold transition-all duration-300 ${item.color}`}
                                >
                                    {item.icon} {item.label}
                                </motion.div>
                            ))}
                        </div>

                        {/* TIMELINE SECTION */}
                        <div className="relative w-full mt-6 p-4 bg-gradient-to-r from-yellow-200 via-blue-100 to-green-100 rounded-xl shadow-inner">
                            <div className="flex justify-between items-center gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        onDrop={(e) => handleDrop(e, i)}
                                        onDragOver={handleDragOver}
                                        className="w-24 h-16 rounded-xl border-2 border-dashed border-gray-400 bg-white flex items-center justify-center"
                                    >
                                        {sequence[i] && (
                                            <motion.div
                                                className={`rounded-lg px-3 py-2 text-sm font-bold shadow ${sequence[i].color}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <div className="flex items-center gap-1">
                                                    {sequence[i].icon} {sequence[i].label}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute -top-4 left-2 text-xs text-gray-500">⏱️ 0s</div>
                            <div className="absolute -top-4 right-2 text-xs text-gray-500">⏱️ 15s</div>
                        </div>

                        {/* CHECK BUTTON */}
                        {sequence.length === 4 && (
                            <div className="text-center mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={checkSequence}
                                    className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow-lg text-lg"
                                >
                                    ✅ Check My Flow!
                                </motion.button>
                            </div>
                        )}

                        {/* FEEDBACK SECTION */}
                        {feedback === "correct" && (
                            <motion.div className="mt-4 text-green-600 font-bold flex items-center justify-center gap-2 animate-bounce text-lg">
                                <FaCheckCircle className="text-xl" /> 🔥 Awesome! You nailed the engagement flow!
                            </motion.div>
                        )}

                        {feedback === "wrong" && (
                            <motion.div className="mt-4 text-red-500 font-bold flex flex-col items-center text-lg">
                                <p>😕 Oops… Your reel lost some sparkle.</p>
                                <button
                                    className="mt-2 flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
                                    onClick={resetGame}
                                >
                                    <FaRedo /> Try Another Sequence
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-8 rounded-3xl shadow-2xl border-4 border-purple-300"
                    >
                        {/* 🎨 HEADER */}
                        <motion.h2
                            className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 drop-shadow-lg"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            <Typewriter
                                options={{
                                    strings: [" Pick Your Reel Vibe!", " Choose Your Style!", "Set the Mood!"],
                                    autoStart: true,
                                    loop: true,
                                    delay: 60
                                }}
                            />
                        </motion.h2>

                        {/* ✨ DESCRIPTION */}
                        <p className="text-center text-lg text-purple-700 font-semibold mb-6 italic animate-pulse">
                            “GlowPop’s Foam Cleanser is here!” How would YOU show it in a Reel? Pick the perfect style to match its feel!
                        </p>

                        {/* 🎉 VISUAL STYLE OPTIONS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {visualStyles.map((vs, i) => (
                                <motion.div
                                    whileHover={{ rotate: 2, scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={i}
                                    onClick={() => setStyle(vs.key)}
                                    className={`text-center p-6 rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl transform ${style === vs.key
                                        ? "bg-green-100 border-4 border-green-500 scale-105"
                                        : "bg-white border-4 border-gray-200"
                                        }`}
                                >
                                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                                        <div className="text-4xl mb-2">{vs.icon}</div>
                                    </motion.div>
                                    <div className="text-lg text-purple-700">{vs.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 📢 FEEDBACK & PREVIEW */}
                        {style && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 text-center space-y-4"
                            >
                                <p className="text-md italic text-purple-800">{styleFeedback}</p>

                                {/* 👀 Visual Preview if any */}
                                {getStyleVisual(style)}

                                {/* ✅ NEXT BUTTON */}
                                <motion.button
                                    onClick={() => setStep(3)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-full text-lg shadow-xl hover:bg-purple-700 transition"
                                >
                                    🎯 Lock Style & Continue ➡️
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <h2 className="text-2xl font-bold text-center text-indigo-600">💡 Step 3: Campaign Name Creator</h2>
                        <p className="text-center text-sm text-gray-600 italic">
                            “Write a catchy Instagram caption using fun emojis, product keywords and keep it short” ✨🔥
                        </p>
                        <input
                            type="text"
                            placeholder="🌟 Write your catchy caption here!"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="w-full px-4 py-3 text-base rounded-2xl bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 placeholder-purple-500 font-semibold border-2 border-purple-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                        />
                        {/* Emoji Buttons */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-center text-md text-gray-700 font-semibold">Add Emojis in Campaign Name:</span>
                            {['✨', '🔥', '💧', '🌟', '🍕', '🚀', '🐶', '⚽'].map((emo) => (
                                <motion.button
                                    key={emo}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setCampaignName((prev) => prev + emo)}
                                    className="text-xl px-2 py-1 bg-pink-100 rounded-full hover:scale-105 transition"
                                >
                                    {emo}
                                </motion.button>
                            ))}
                        </div>
                        {/* Hashtag Buttons */}
                        <div className="mt-4">
                            <p className="text-center text-md text-gray-700 font-semibold mb-2">🎯 Select Hashtags:</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    '#GlowPopMagic',
                                    '#FoamyFun',
                                    '#GlowUpTime',
                                    '#FreshFaceFeels',
                                    '#SqueakyCleanGlow',
                                    '#BubbleGlow',
                                    '#MorningGlowRoutine',
                                    '#NoPimpleParty',
                                    '#FaceFirstGlow'
                                ].map((tag) => (
                                    <motion.button
                                        key={tag}
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setCaption((prev) => prev + (prev ? " " : "") + tag)}
                                        className="text-xs sm:text-sm bg-pink-100 px-3 py-1 rounded-full text-pink-700 font-semibold shadow hover:bg-pink-200 transition"
                                    >
                                        {tag}
                                    </motion.button>
                                ))}
                            </div>
                        </div>


                        <p className="text-center text-xl font-extrabold text-pink-600 italic mb-2   drop-shadow-sm tracking-wide">
                            🎥 Preview Your Reel:
                        </p>


                        <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-md max-w-md mx-auto">


                            <div className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center space-x-3">
                                    <img src="./logoglow.jpg" alt="logo" className="w-10 h-10 rounded-full border border-pink-300" />
                                    <span className="font-semibold text-sm text-pink-600">glowpop_official</span>
                                </div>
                                <div className="text-gray-400 text-xl font-bold">&hellip;</div>
                            </div>
                            <div className="relative h-64 bg-gradient-to-br from-white via-blue-200 to-cyan-500 shadow-inner">
                                <div className="absolute w-10 h-10 bg-white bg-opacity-70 rounded-full top-1/4 left-1/3 animate-pulse" />
                                <div className="absolute w-8 h-8 bg-white bg-opacity-60 rounded-full top-2/3 left-2/4 animate-ping" />
                                <div className="absolute w-6 h-6 bg-white bg-opacity-50 rounded-full top-3/4 left-1/4 animate-bounce" />
                                <motion.div
                                    className="absolute text-3xl bottom-3 right-4"
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                >
                                    🫧
                                </motion.div>
                                <motion.div
                                    className="absolute text-xl top-3 left-4"
                                    animate={{
                                        opacity: [1, 0.3, 1],
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    💧
                                </motion.div>

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                    <h2 className="text-3xl font-extrabold text-blue-800 drop-shadow">GlowPop 💫</h2>
                                    <p className="mt-2 text-blue-900 font-semibold text-lg">
                                        {campaignName || "Your Campaign Name Here!"}
                                    </p>
                                </div>
                            </div>
                            <div className="px-4 py-3">
                                <div className="flex space-x-4 text-pink-500">
                                    <Heart className="w-5 h-5" />
                                    <MessageCircle className="w-5 h-5" />
                                    <Send className="w-5 h-5" />
                                </div>
                                <p className="mt-2 text-sm font-medium text-gray-800">
                                    <span className="font-semibold">{campaignName || "YourCampaignName"}</span> {caption || "#YourHashtagsHere"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 uppercase">View all 132 comments</p>
                                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold mb-2">🎯 Rubric</h4>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li><strong>Relevance to product/platform</strong> — 2 pts</li>
                                <li><strong>Trend appeal</strong> — 2 pts</li>
                                <li><strong>Creativity</strong> — 1 pt</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <button onClick={calculateScore} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                                Submit Campaign Name
                            </button>
                        </div>
                    </motion.div>
                )}
                {step === 4 && (
                    <>
                        {points >= 7 && <Confetti />}

                        <motion.div
                            className="relative text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-6 rounded-3xl shadow-xl mt-6 space-y-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-extrabold text-purple-700 drop-shadow-sm">
                                🏆 Your Score: {points} / 11
                            </h2>

                            {points >= 7 ? (
                                <>
                                    <p className="text-green-600 font-bold text-xl animate-pulse">
                                        🔥 You earned the <span className="text-pink-600">Optimal Engagement</span> Badge!
                                    </p>
                                    <div className="text-4xl animate-bounce mt-2">🏅</div>
                                </>
                            ) : (
                                <p className="text-red-500 font-semibold text-lg">
                                    😕 Hmm… Try improving your Reel for better results!
                                </p>
                            )}

                            <motion.button
                                onClick={resetGame}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-all"
                            >
                                🔁 Try Again
                            </motion.button>
                        </motion.div>
                    </>
                )}

            </div>
        </motion.div>
    );
}
