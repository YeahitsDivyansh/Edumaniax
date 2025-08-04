import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, BrainCircuit } from "lucide-react"
const APIKEY = import.meta.env.VITE_API_KEY;
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

export default function ThoughtReframer() {
    const { completeSELChallenge } = useSEL();
    const [thoughts, setThoughts] = useState(["", "", ""]);
    const [reframes, setReframes] = useState(["", "", ""]);
    const [loading, setLoading] = useState(false);
    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());

    const handleChange = (i, value) => {
        const updated = [...thoughts];
        updated[i] = value;
        setThoughts(updated);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const newReframes = await Promise.all(
            thoughts.map(async (thought) => {
                if (!thought) return "⚠️ Please enter a thought.";
                try {
                    const res = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                contents: [
                                    {
                                        parts: [
                                            {
                                                text: `Reframe this negative thought for a teenager in a kind and short way (max 1 sentence, no explanation): "${thought}"`
                                            }
                                        ]
                                    }
                                ]
                            })
                        }
                    );
                    const data = await res.json();
                    return (
                        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                        "🌈 Try again later!"
                    );
                } catch {
                    return "❌ Network error!";
                }
            })
        );
        setReframes(newReframes);
        completeSELChallenge(0, 0); // ✅ Mark SEL challenge complete here

        // ✅ Update SEL Performance
        const endTime = Date.now();
        const durationSec = Math.round((endTime - startTime) / 1000);
        updatePerformance({
            moduleName: "SEL",
            topicName: "emotionalAwareness",
            score: 10,
            accuracy: 100,
            avgResponseTimeSec: durationSec,
            studyTimeMinutes: Math.ceil(durationSec / 60),
            completed: true,

        });
        setStartTime(Date.now());

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
            <motion.div
                className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <motion.div
                    className="flex items-center justify-center gap-4 mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Left Icon */}
                    <motion.div
                        className="bg-purple-100 p-4 rounded-full shadow-lg"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <Wand2 className="w-8 h-8 text-purple-600" />
                    </motion.div>

                    {/* Main Header */}
                    <motion.h1
                        className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 drop-shadow-md pb-2"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        Thought Reframer
                    </motion.h1>

                    {/* Right Icon */}
                    <motion.div
                        className="bg-yellow-100 p-4 rounded-full shadow-lg"
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <Sparkles className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                </motion.div>

                {/* Instructions */}
                <motion.p
                    className="text-center text-xl text-purple-700 font-medium px-4 max-w-3xl mx-auto leading-relaxed mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    🌧️ Write down 3 thoughts that make you feel bad.<br />
                    ✨ We’ll help turn them into kind and happy ones.<br />
                    🪄 Just type and click the <span className="border-r-red-500">"reframe my thought"</span> button!
                </motion.p>

                {/* Input Fields */}
                <motion.div
                    className="bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 rounded-3xl p-8 shadow-2xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Header */}
                    <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-6">
                        ✏️ Write Your Thoughts
                    </h2>
                    <p className="text-center text-purple-700 mb-6 text-lg font-medium">
                        Share 3 thoughts that make you feel low. We’ll help turn them into something brighter! 🌈
                    </p>

                    {/* Input Fields */}
                    <div className="space-y-6">
                        {thoughts.map((thought, i) => (
                            <div key={i}>
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    🧠 Thought {i + 1}
                                </label>
                                <input
                                    placeholder={`Type your thought here...`}
                                    value={thought}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    className="w-full p-4 rounded-2xl bg-white border-2 border-pink-200 shadow focus:outline-none focus:ring-2 focus:ring-pink-300 text-lg font-medium transition"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Submit Button */}
                    <div className="text-center mt-8 mb-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-full text-xl font-semibold shadow-md hover:scale-105 transition"
                        >
                            {loading ? "✨ Reframing..." : "🪄 Reframe My Thoughts"}
                        </motion.button>
                    </div>
                </motion.div>



                 {/* Reframed Results */}
                {reframes.filter((r) => r).length > 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-10"
                    >
                        <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6">
                            🌟 Brighter Thoughts
                        </h2>
                        <p className="text-center text-green-700 mb-8 text-lg">
                            Here's your sunshine version of the thoughts you shared ☀️
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {reframes.map((reframe, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.3 }}
                                    className="bg-gradient-to-br from-green-100 via-lime-50 to-white border-2 border-green-300 rounded-3xl p-6 shadow-xl text-center text-lg font-semibold text-green-800 hover:scale-105 transition-all duration-300"
                                >
                                    {reframe}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </motion.div>
        </div>
    );
}
