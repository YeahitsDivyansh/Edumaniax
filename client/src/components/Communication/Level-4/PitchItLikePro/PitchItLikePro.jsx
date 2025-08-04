import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const correctAnswers = {
  1: {
    text: "Imagine how much less stressful our school would feel if soothing music played between classes.",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWc5ZzRzcDU5aHoxMWJ2MGlhd3RrcmdxeWVjeWV3Mms3NWRqYnI2aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tIeCLkB8geYtW/200.webp",
    message:
      "Good! You're great at choosing the Emotion Hook. See if you can choose more!",
  },
  2: {
    text: "Studies show calming music can reduce anxiety by up to 30%.",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHhhejBwejhuNWx0N3IwNW0xNWlsMjduNnFoNTV2ZDF1M2gweTQ0MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0He9xZWTKT1Y43ny/giphy.webp",
    message: "You have a hold on Real-Life Fact!",
  },
  3: {
    text: "Last year, our neighbor school started this, and fights in the hallway dropped.",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZoemFrdWh3anZ4cTZscHFqYjNlbmVvMm9qZTYyZ2FtM2g4YnZ6aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BOMBumnGk0l7W/giphy.webp",
    message: "Great story! You're presenting like a pro!",
  },
  4: {
    text: "Let’s ask the principal to start a calming music pilot program this semester!",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzBnendsOW1rNW1na3RoYWk5N3prd3hub3hjMzM1eDliaHc4cHlhYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/StchUy5QoDhDatHL5g/giphy.webp",
    message: "You've now become a pro in messaging!",
  },
};

const wrongGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHVycnVhdDh3ZDJncThzbmx4MGY4dm50ZmZncDVsY3NiMjE1eGVyeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Icco5JkQijJrOImq2X/200.webp";

const extraOptions = [
  "Let’s play music only on Fridays when everyone’s tired.",
  "Add loud rock music to energize students before class.",
  "Use music to announce school rules loudly.",
];

const allOptions = [
  ...Object.values(correctAnswers).map((a) => a.text),
  ...extraOptions,
];

const PitchItGame = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [finalWin, setFinalWin] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleGameFinish = () => {
    const endTime = Date.now();
    const durationSec = (endTime - startTime) / 1000;
    const avgResponseTimeSec = durationSec / 4; // ✅ Simple average

    updatePerformance({
      moduleName: "Communication",
      topicName: "situationalAwareness",
      score: 10,
      accuracy: 100,
      studyTimeMinutes: durationSec / 60,
      avgResponseTimeSec, // ✅ Include this
      completed: true,

    });
    setStartTime(Date.now());
  };


  const isCorrect = (text) =>
    Object.values(correctAnswers).some((a) => a.text === text);

  const getCorrectData = (text) =>
    Object.values(correctAnswers).find((a) => a.text === text);

  const toggleSelect = (text) => {
    let newSelection = [...selected];

    // If already selected, deselect
    if (newSelection.includes(text)) {
      newSelection = newSelection.filter((t) => t !== text);
      setSelected(newSelection);
      setFeedback(null);
      setFinalWin(false);
      return;
    }

    // If selecting a new one and already 4 selected
    if (newSelection.length === 4) {
      setFeedback({
        gif: wrongGif,
        message:
          "🚫 You can only select 4 options. Deselect one to try another!",
      });
      return;
    }

    // Select the new one
    newSelection.push(text);
    setSelected(newSelection);

    if (isCorrect(text)) {
      setFeedback(getCorrectData(text));
    } else {
      setFeedback({
        gif: wrongGif,
        message: "😕 That doesn't look like a strong pitch. Try changing it!",
      });
    }

    // Check if all 4 correct selected
    const correctSelected = newSelection.filter(isCorrect);
    if (correctSelected.length === 4) {
      const allCorrect = Object.values(correctAnswers)
        .map((a) => a.text)
        .every((t) => correctSelected.includes(t));
      if (allCorrect) {
        setFinalWin(true);
        setFeedback({
          gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3QwdmR4Y28zNDB3MGt4NG12aHFjeDA3Y3E2OXltdWNoaHAxYjd3aCZlcD1...",
          message: "🎉 You have now become a pro at pitching — congratulations!",
        });
        completeCommunicationChallenge(3, 1); // ✅ Mark Game 5 of Challenge 3 complete
        handleGameFinish(); // ✅ Log performance
      }
    }
  };

  const resetGame = () => {
    setSelected([]);
    setFeedback(null);
    setFinalWin(false);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 to-pink-200 p-6 flex flex-col items-center text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
        🎤 Pitch It Like a Pro!
      </h1>
      <p className="mb-4 text-gray-700 max-w-xl">
        Campaign: <strong>Add Calming Music to School Hallways</strong>
        <br />
        Choose the 4 best pitch ideas below. You can change your picks!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full mb-6">
        {allOptions.map((text, idx) => {
          const isActive = selected.includes(text);
          return (
            <motion.button
              whileTap={{ scale: 0.96 }}
              key={idx}
              onClick={() => toggleSelect(text)}
              className={`p-4 rounded-xl border-2 shadow-sm transition-all text-left text-sm font-medium ${isActive
                ? "bg-green-100 border-green-400"
                : "bg-white hover:bg-blue-50 border-gray-300"
                }`}
            >
              {text}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 bg-white p-4 rounded-xl shadow-md max-w-lg w-full"
          >
            <img
              src={feedback.gif}
              alt="feedback"
              className="w-40 h-40 mx-auto mb-3 object-contain rounded-lg"
            />
            <p className="text-base font-semibold text-gray-800">
              {feedback.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={resetGame}
        className="mt-4 text-blue-600 underline hover:text-blue-800"
      >
        🔁 Play Again
      </button>
    </div>
  );
};

export default PitchItGame;
