import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const plants = [
    {
        id: "rose",
        name: "Rose",
        img: "./rose_train.jpg",
        features: ["Petal Shape", "Leaf Color", "Thorns on Stem"]
    },
    {
        id: "cactus",
        name: "Cactus",
        img: "./cactus_train.jpg",
        features: ["Spikes", "Thick Green Stem", "Ribbed Texture"]
    },
    {
        id: "tulsi",
        name: "Tulsi",
        img: "./tulsi_train.jpg",
        features: ["Leaf Shape", "Leaf Vein Pattern", "Stem Color"]
    }
];

const testImages = [
    { id: 1, actual: "Rose", img: "./rose_test.jpg" },
    { id: 2, actual: "Cactus", img: "./cactus_test.jpg" },
    { id: 3, actual: "Tulsi", img: "./tulsi_test.jpg" }
];

export default function TrainAIModelGame() {
    const { completeComputersChallenge } = useComputers();
    const [trainingData, setTrainingData] = useState({});
    const [step, setStep] = useState(1);
    const [dragged, setDragged] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const dropZoneRef = useRef(null);

    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        if (showResults) {
            completeComputersChallenge(1, 0);

            const endTime = Date.now();
            const total = testImages.length;
            let correct = 0;

            for (const test of testImages) {
                if (predictPlant(test.actual) === test.actual) {
                    correct++;
                }
            }

            const score = Math.round((correct / total) * 10);
            const accuracy = Math.round((correct / total) * 100);
            const avgResponseTimeSec = ((endTime - startTime) / 1000) / total;
            const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

            updatePerformance({
                moduleName: "Computers",
                topicName: "understandingAIPerformance",
                score,
                accuracy,
                avgResponseTimeSec,
                studyTimeMinutes,
                completed: true,

            });
            setStartTime(Date.now());

        }
    }, [showResults]);


    const handleTrainingChoice = (plantId, quality) => {
        setTrainingData((prev) => ({ ...prev, [plantId]: quality }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragged(true);
    };

    const handleTrainAI = () => {
        setStep(3);
    };

    const predictPlant = (actual) => {
        const trainingQuality = trainingData[actual.toLowerCase()];
        if (trainingQuality === "good") return actual;
        const wrongOptions = plants.filter((p) => p.name !== actual);
        return wrongOptions[Math.floor(Math.random() * wrongOptions.length)].name;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gradient-to-tr from-yellow-100 to-blue-100 min-h-screen rounded-lg">
            <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-purple-700 drop-shadow-xl"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <span className="inline-block text-green-600 animate-bounce">🌱 Train the Trainer –</span>{" "}
                <span className="inline-block text-pink-600 animate-pulse">AI Edition ✨</span>
            </motion.h1>

            {/* Step 1: Training Selection */}
            {step === 1 && (
                <>
                    <h2 className="text-2xl font-bold text-center mb-4 text-pink-600">
                        Step 1: Select Data Quality for Training Samples
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plants.map((plant) => (
                            <div
                                key={plant.id}
                                className="bg-white rounded-xl p-4 shadow-lg border-4 border-yellow-300 text-center"
                            >
                                <img
                                    src={plant.img}
                                    alt={plant.name}
                                    className="w-full h-64 object-cover rounded-lg mb-3"
                                />
                                <h3 className="text-xl font-bold text-blue-800 mb-2">{plant.name} Images</h3>

                                <p className="text-base font-bold text-yellow-800 mb-2">
                                    🌟 The AI model will learn from these features:
                                </p>

                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {plant.features.map((feat, i) => (
                                        <span
                                            key={i}
                                            className="bg-yellow-200 text-yellow-900 font-semibold px-3 py-1.5 rounded-full text-sm shadow-md border border-yellow-400 hover:scale-105 transition-transform"
                                        >
                                            {feat}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 flex flex-col gap-5 items-center">
                                    <p className="text-sm sm:text-base text-center font-medium text-gray-700 mb-2">
                                        🎯 Choose the sample quality to teach AI!
                                    </p>

                                    <motion.button
                                        onClick={() => handleTrainingChoice(plant.id, "good")}
                                        className={`px-5 py-2 rounded-full font-bold text-base sm:text-lg w-44 shadow-md transition text-center ${trainingData[plant.id] === "good"
                                            ? "bg-green-600 text-white ring-4 ring-green-300"
                                            : "bg-green-100 text-green-900 hover:bg-green-200"
                                            }`}
                                        animate={
                                            trainingData[plant.id]
                                                ? {}
                                                : { scale: [1, 1.05, 1], boxShadow: "0 0 8px rgba(34,197,94,0.6)" }
                                        }
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        ✅ High-Quality Sample
                                    </motion.button>

                                    <motion.button
                                        onClick={() => handleTrainingChoice(plant.id, "bad")}
                                        className={`px-5 py-2 rounded-full font-bold text-base sm:text-lg w-44 shadow-md transition text-center ${trainingData[plant.id] === "bad"
                                            ? "bg-red-600 text-white ring-4 ring-red-300"
                                            : "bg-red-100 text-red-900 hover:bg-red-200"
                                            }`}
                                        animate={
                                            trainingData[plant.id]
                                                ? {}
                                                : { scale: [1, 1.05, 1], boxShadow: "0 0 8px rgba(239,68,68,0.6)" }
                                        }
                                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                                    >
                                        ⚠️ Low-Quality Sample
                                    </motion.button>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => {
                                if (Object.keys(trainingData).length === plants.length) {
                                    setStep(2);
                                } else {
                                    alert("Train all plants before continuing!");
                                }
                            }}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-xl mt-4"
                        >
                            ➡️ Next: Load Data into AI
                        </button>
                    </div>
                </>
            )}

            {/* Step 2: Drag & Drop Training Data */}
            {step === 2 && (
                <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold text-green-700 mb-4">
                        Step 2: Feed Training Data into the AI Machine 🤖🧠
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Drag and drop the data into the AI Model below to begin training.
                    </p>

                    {/* Draggable Training File */}
                    {!dragged && (
                        <motion.div
                            draggable
                            whileHover={{ scale: 1.1 }}
                            whileDrag={{ rotate: 10 }}
                            className="inline-block cursor-grab mt-6"
                        >
                            <div className="bg-yellow-400 hover:bg-yellow-300 px-6 py-3 rounded-full font-bold text-white shadow-md text-lg mb-5">
                                <span className="text-black">📂</span> Training Data
                            </div>
                        </motion.div>
                    )}

                    {/* AI Machine Graphic Box */}
                    <div className="relative w-80 h-56 mx-auto bg-gradient-to-tr from-gray-100 to-purple-100 rounded-3xl border-4 border-dashed border-purple-400 shadow-xl flex items-center justify-center text-purple-700 font-bold text-lg overflow-hidden"
                        ref={dropZoneRef}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {/* Front panel style */}
                        <div className="absolute top-2 left-2 w-6 h-6 bg-red-400 rounded-full shadow-inner"></div>
                        <div className="absolute top-2 left-10 w-6 h-6 bg-yellow-400 rounded-full shadow-inner"></div>
                        <div className="absolute top-2 left-18 w-6 h-6 bg-green-400 rounded-full shadow-inner"></div>

                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-3xl"
                        >
                            🧠 Drop Training File Here
                        </motion.div>

                        {/* Animated Gears */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute bottom-3 left-3 text-2xl"
                        >
                            ⚙️
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute bottom-3 right-3 text-2xl"
                        >
                            ⚙️
                        </motion.div>
                    </div>


                    {/* Train Button */}
                    {dragged && (
                        <div className="mt-8">
                            <button
                                onClick={handleTrainAI}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-xl shadow-lg transition transform hover:scale-105"
                            >
                                🚀 Start Training AI Model
                            </button>
                        </div>
                    )}
                </div>
            )}


            {/* Step 3: Test Model */}
            {step === 3 && !showResults && (
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-bold text-green-700 mb-4">
                        Step 3: Test Your AI Model 🌸
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Click below to test the model on new plant images.
                    </p>
                    <button
                        onClick={() => setShowResults(true)}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-lg"
                    >
                        🧪 Test AI Model
                    </button>
                </div>
            )}

            {/* Step 4: Show Results */}
            {showResults && (
                <div className="mt-10">
                    <div className="flex justify-center">
                        <motion.h2
                            className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-8 bg-purple-100 px-6 py-3 rounded-full shadow-md"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.95, 1.05, 1], opacity: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        >
                            🧠 See Your AI Predictions
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testImages.map((test) => {
                            const predicted = predictPlant(test.actual);
                            const isCorrect = predicted === test.actual;
                            return (
                                <div
                                    key={test.id}
                                    className="bg-white rounded-xl p-4 shadow-md border-4 border-blue-300 text-center"
                                >
                                    <img
                                        src={test.img}
                                        alt={test.actual}
                                        className="w-full h-48 object-cover rounded-lg mb-3"
                                    />
                                    <p className="text-lg font-semibold text-gray-700">Actual: {test.actual}</p>
                                    <p
                                        className={`text-lg font-bold ${isCorrect ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        AI Guessed: {predicted} {isCorrect ? "✅" : "❌"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        <motion.h3
                            className="text-xl font-semibold text-yellow-800 bg-yellow-100 px-4 py-3 rounded-xl shadow-md border border-yellow-300 mx-auto text-center max-w-md"
                            animate={{ boxShadow: ["0 0 0px #facc15", "0 0 12px #facc15", "0 0 0px #facc15"] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            📚 Lesson: AI learns from what it’s shown. Garbage in, garbage out!
                        </motion.h3>
                        {/* Try Again Button */}
                        <button
                            onClick={() => {
                                setTrainingData({});
                                setShowResults(false);
                                setDragged(false);
                                setStep(1); // ✅ critical line
                                setStartTime(Date.now());

                            }}
                            className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold text-lg"
                        >
                            🔁 Try Again
                        </button>
                        <div className="mt-4 text-3xl">
                            🏅 You earned: <span className="text-pink-600">Data Trainer Badge</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
