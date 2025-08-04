import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance


const initialFrames = [
    { id: 'cover', label: 'Cover Frame 🎀', emoji: '📸', description: 'Start your carousel with a catchy title!' },
    { id: 'tip1', label: 'Tip Frame 1 🧴', emoji: '✨', description: 'First helpful skincare tip goes here!' },
    { id: 'tip2', label: 'Tip Frame 2 💧', emoji: '🫧', description: 'Second skincare tip to keep the flow going!' },
    { id: 'cta', label: 'CTA Frame 📢', emoji: '👆', description: 'End with a call to action like "Save this!"' }
];
const styleBackgrounds = {
    "Clean & pastel": "bg-pink-50 text-gray-700",
    "Vibrant & emoji-rich": "bg-yellow-100 text-pink-800 animate-pulse",
    "Earthy & calming": "bg-green-100 text-green-800",
};

const toneStyles = {
    "Informative": {
        textClass: "text-blue-800 font-medium",
        emojiPrefix: "🧠 ",
        emojiSuffix: " 📘"
    },
    "Conversational": {
        textClass: "text-purple-700 italic font-semibold",
        emojiPrefix: "💬 ",
        emojiSuffix: " 😊"
    },
    "Trendy": {
        textClass: "text-pink-600 font-bold animate-pulse",
        emojiPrefix: "🔥 ",
        emojiSuffix: " ✨"
    }
};

const correctOrder = ["cover", "tip1", "tip2", "cta"];

export default function StoryboardSprintGame() {
    const { completeDMChallenge } = useDM();
    const [frames, setFrames] = useState(["", "", "", ""]);
    const [dragged, setDragged] = useState(null);
    const [aesthetic, setAesthetic] = useState("");
    const [tone, setTone] = useState("");
    const [headings, setHeadings] = useState({ cover: "", tip1: "", tip2: "", cta: "" });
    const [points, setPoints] = useState(0);
    const [step, setStep] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());
    useEffect(() => {
        if (step === 4 && points >= 7) {
            completeDMChallenge(1, 1);
        }
    }, [step, points]);

    useEffect(() => {
        if (step !== 3) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % correctOrder.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [step]);

    const handleDrop = (id, position) => {
        const newFrames = [...frames];
        newFrames[position] = id;
        setFrames(newFrames);
    };

    const checkOrder = () => JSON.stringify(frames) === JSON.stringify(correctOrder);
    const checkOrderScore = () => {
        return JSON.stringify(frames) === JSON.stringify(correctOrder) ? 2 : 0;
    };
    const checkPlatformFitScore = () => {
        return aesthetic && tone ? 2 : 0;
    };
    const checkCarouselBuildScore = () => {
        const filledAll = headings.cover?.trim() && headings.tip1?.trim() && headings.tip2?.trim() && headings.cta?.trim();
        return filledAll ? 3 : 0;
    };

    const checkToneMatchScore = () => {
        return tone === "Conversational" ? 3 : 0;
    };
    const checkCtaScore = () => {
        return headings.cta?.toLowerCase().includes("save") || headings.cta?.toLowerCase().includes("try") ? 1 : 0;
    };


    const checkHeadingsScore = () => {
        let score = 0;
        if (headings.cover?.trim()) score += 1; // Cover title
        if (headings.tip1?.trim() && headings.tip2?.trim()) score += 2; // Tip 1 & 2
        if (headings.cta?.trim()) score += 2; // Any CTA text (not judging content here)
        return score;
    };

    const calculateScore = () => {
        const buildScore = checkOrderScore();          // 2 pts
        const platformFit = checkPlatformFitScore();   // 2 pts
        const carouselScore = checkCarouselBuildScore(); // 3 pts
        const toneMatch = checkToneMatchScore();       // 3 pts
        const ctaScore = checkCtaScore();              // 1 pt

        const rawScore = buildScore + platformFit + carouselScore + toneMatch + ctaScore; // total out of 11
        const scaledScore = Math.round((rawScore / 11) * 10); // scale to 10 and round
        const accuracy = Math.round((rawScore / 11) * 100);   // scale to 100 and round


        const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

        updatePerformance({
            moduleName: "DigitalMarketing",
            topicName: "creativity",
            score: scaledScore,
            accuracy,
            avgResponseTimeSec: timeTakenSec,
            completed: scaledScore >= 7,
            studyTimeMinutes: Math.ceil(timeTakenSec / 60),

        });
        setStartTime(Date.now());
        setStep(4);
    };


    const resetGame = () => {
        setFrames(["", "", "", ""]);
        setAesthetic("");
        setTone("");
        setHeadings({ cover: "", tip1: "", tip2: "", cta: "" });
        setPoints(0);
        setStep(1);
        setStartTime(Date.now());

    };

    const getFrameClass = () => {
        return styleBackgrounds[aesthetic] || "bg-white text-black";
    };

    const getToneHeading = (type) => {
        const defaultHeadings = {
            cover: "Start with a strong hook",
            tip1: "Tip #1 goes here",
            tip2: "Tip #2 goes here",
            cta: "CTA: Save or Try it!",
        };
        const content = headings[type] || defaultHeadings[type];
        const toneStyle = toneStyles[tone];
        return toneStyle
            ? `${toneStyle.emojiPrefix}${content}${toneStyle.emojiSuffix}`
            : content;
    };

    const FrameDropZone = ({ position }) => {
        const frameId = frames[position];
        const frame = initialFrames.find(f => f.id === frameId);


        return (
            <motion.div
                whileHover={{ scale: 1.05 }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => dragged && handleDrop(dragged, position)}
                className="w-full p-4 min-h-[120px] border-4 border-dashed border-purple-400 rounded-2xl bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-100 transition"
            >
                {frame ? (
                    <>
                        <motion.div className="text-4xl animate-bounce">{frame.emoji}</motion.div>
                        <div className="text-sm mt-2 font-semibold text-purple-700">{frame.label}</div>
                    </>
                ) : (
                    <div className="text-purple-300 text-lg">⬇️ Drop Frame Here</div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 p-6 font-sans">
            <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="text-5xl font-extrabold text-center text-pink-500 mb-8"
            >
                🌟 Storyboard Sprint Game 🎠
            </motion.h1>

            {/* STEP 1 */}
            {step === 1 && (
                <motion.div className="bg-white p-6 rounded-3xl shadow-xl space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-center text-purple-600">🎯 Step 1: Arrange the Frames</h2>
                    <p className="text-center text-gray-600 mb-4">Drag & drop the frames in the right carousel order!</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {frames.map((_, index) => (
                            <FrameDropZone key={index} position={index} />
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {initialFrames.map((frame) => (
                            <motion.div
                                key={frame.id}
                                draggable
                                onDragStart={() => setDragged(frame.id)}
                                className="cursor-grab bg-pink-100 hover:bg-pink-200 p-4 rounded-2xl shadow-md text-center w-40 border border-pink-300"
                                whileHover={{ scale: 1.1, rotate: 2 }}
                            >
                                <div className="text-3xl">{frame.emoji}</div>
                                <div className="text-sm font-bold">{frame.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-6">
                        {frames.includes("") ? (
                            <button
                                disabled
                                className="px-6 py-2 rounded-full text-white bg-gray-400 cursor-not-allowed font-bold"
                            >
                                🧩 Complete All Slots
                            </button>
                        ) : checkOrder() ? (
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 font-bold"
                            >
                                ➡️ Next: Choose Style & Tone
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setFrames(["", "", "", ""]);
                                }}
                                className="px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 font-bold"
                            >
                                ❌ Incorrect Order — 🔄 Try Again
                            </button>
                        )}
                    </div>

                </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <motion.div
                    className="bg-white p-6 rounded-3xl shadow-xl space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2 className="text-2xl font-bold text-center text-indigo-600">
                        🎨 Step 2: Pick a Style & a Tone
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mt-4">
                        {/* Aesthetic Section */}
                        <div>
                            <h3 className="text-xl text-center font-extrabold text-pink-500 mb-2">
                                🎨 Aesthetic (How it looks)
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">Choose the visual feel of your carousel.</p>
                            <div className="grid grid-cols-1 gap-3">
                                {["Clean & pastel", "Vibrant & emoji-rich", "Earthy & calming"].map(style => (
                                    <div
                                        key={style}
                                        className={`p-4 rounded-xl shadow-md cursor-pointer text-center border transition-all duration-200 ${aesthetic === style
                                            ? 'border-purple-600 bg-purple-50 scale-105'
                                            : 'border-gray-300'
                                            }`}
                                        onClick={() => setAesthetic(style)}
                                    >
                                        {style}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tone Section */}
                        <div>
                            <h3 className="text-xl font-extrabold text-yellow-600 mb-2 text-center">
                                🗣️ Tone (How it sounds or feels)
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">Pick the emotion your text should have.</p>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.keys(toneStyles).map(t => (
                                    <div
                                        key={t}
                                        className={`p-4 rounded-xl shadow-md cursor-pointer text-center border transition-all duration-200 ${tone === t
                                            ? 'border-yellow-600 bg-yellow-50 scale-105'
                                            : 'border-gray-300'
                                            }`}
                                        onClick={() => setTone(t)}
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    {aesthetic && tone && (
                        <div className="text-center mt-8">
                            <h3 className="text-xl font-bold text-purple-600 mb-2">🔍 Preview Style</h3>
                            <div className={`rounded-2xl p-6 shadow-inner ${getFrameClass()}`}>
                                <p className="text-lg font-semibold">✨ Aesthetic: {aesthetic}</p>
                                <p className="italic text-sm text-gray-600">Tone: {tone}</p>
                                <p className="mt-2">
                                    {toneStyles[tone]?.emojiPrefix} Sample text {toneStyles[tone]?.emojiSuffix}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Next Button */}
                    <div className="text-center">
                        <button
                            disabled={!aesthetic || !tone}
                            onClick={() => setStep(3)}
                            className={`mt-6 px-6 py-3 rounded-full text-white text-lg font-bold transition-all shadow-lg ${!aesthetic || !tone
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-500 hover:bg-indigo-600'
                                }`}
                        >
                            📝 Next: Add Headings
                        </button>
                    </div>
                </motion.div>
            )}


            {/* STEP 3 */}
            {step === 3 && (
                <motion.div className="bg-white p-6 rounded-3xl shadow-xl space-y-6 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-center text-purple-700">📝 Step 3: Write Slide Headings</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-bold text-purple-600 mb-1">🎀 Cover Slide Title</label>
                            <input
                                type="text"
                                value={headings.cover}
                                onChange={(e) => setHeadings({ ...headings, cover: e.target.value })}
                                className="w-full p-3 rounded-full border border-purple-300 text-sm"
                                placeholder="E.g. My Skincare Journey"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-purple-600 mb-1">💧 Tip Slide 1</label>
                            <input
                                type="text"
                                value={headings.tip1}
                                onChange={(e) => setHeadings({ ...headings, tip1: e.target.value })}
                                className="w-full p-3 rounded-full border border-purple-300 text-sm"
                                placeholder="E.g. Use sunscreen daily"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-purple-600 mb-1">🫧 Tip Slide 2</label>
                            <input
                                type="text"
                                value={headings.tip2}
                                onChange={(e) => setHeadings({ ...headings, tip2: e.target.value })}
                                className="w-full p-3 rounded-full border border-purple-300 text-sm"
                                placeholder="E.g. Hydrate your skin"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-purple-600 mb-1">📣 Call to Action (CTA)</label>
                            <input
                                type="text"
                                value={headings.cta}
                                onChange={(e) => setHeadings({ ...headings, cta: e.target.value })}
                                className="w-full p-3 rounded-full border border-purple-300 text-sm"
                                placeholder="E.g. Save this for later!"
                            />
                        </div>
                    </div>


                    <div className="text-center mt-4">
                        <h3 className="text-xl font-bold text-purple-600">📽️ Carousel Preview</h3>
                        <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
                            {frames.map((frameId, index) => {
                                const frame = initialFrames.find(f => f.id === frameId);
                                return (
                                    <React.Fragment key={frameId}>
                                        <div className="bg-pink-50 p-4 rounded-2xl shadow text-center border border-pink-200 w-[200px]">
                                            <div className="text-4xl animate-bounce mb-2">{frame.emoji}</div>
                                            <div className="font-bold text-pink-600">{getToneHeading(frameId)}</div>
                                        </div>
                                        {index < frames.length - 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="text-3xl text-purple-400"
                                            >
                                                ➡️
                                            </motion.div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            disabled={!headings.cover || !headings.tip1 || !headings.tip2 || !headings.cta}
                            onClick={calculateScore}
                            className={`mt-4 px-6 py-3 rounded-full text-white text-lg font-bold transition-all shadow-lg ${!headings.cover || !headings.tip1 || !headings.tip2 || !headings.cta ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            ✅ Submit My Campaign!
                        </button>
                    </div>
                </motion.div>
            )}


            {/* STEP 4 */}
            {step === 4 && (
                <div className="text-center mt-10 p-6 bg-white shadow-md rounded-xl">
                    {points >= 7 && (
                        <Confetti width={window.innerWidth} height={window.innerHeight} />
                    )}
                    <h2 className="text-2xl font-bold mb-4">🎉 Your Campaign Score: {points} / 11</h2>

                    <p className="text-green-700 font-semibold mb-2">
                        {points >= 7 ? "✅ Great job! You passed the challenge!" : "🔄 Try again to pass the 7+ mark!"}

                    </p>

                    <div className="text-left mt-4 text-sm bg-purple-50 p-4 rounded-lg border border-purple-300">
                        <p>🧠 <strong>Rubric Breakdown:</strong></p>
                        <ul className="mt-2 list-disc list-inside">
                            <li>📐 Clear Structure: {checkOrderScore()} / 2</li>
                            <li>🎨 Platform Fit (Aesthetic + Tone): {checkPlatformFitScore()} / 2</li>
                            <li>🗣️ Correct Tone Match: {checkToneMatchScore()} / 3</li>
                            <li>📝 Headings & Copy: {checkHeadingsScore()} / 5</li>
                            <li>📣 Catchy CTA: {headings.cta?.toLowerCase().includes("save") || headings.cta?.toLowerCase().includes("try") ? 1 : 0} / 1</li>
                        </ul>
                    </div>

                    <button onClick={resetGame} className="mt-6 bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition">
                        🔁 Try Again
                    </button>
                </div>
            )}

        </div>
    );
}