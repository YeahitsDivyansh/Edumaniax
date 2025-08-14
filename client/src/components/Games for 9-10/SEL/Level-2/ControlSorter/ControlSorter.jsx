import React, { useState, useEffect } from "react";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext";

const statements = [
  { text: "My friend's bad mood", type: "Concern" },
  { text: "How much I study", type: "Influence" },
  { text: "What others post online", type: "Concern" },
  { text: "My reaction to being left out", type: "Influence" },
  { text: "School exam schedule", type: "Concern" },
  { text: "How I talk to others", type: "Influence" },
  { text: "The weather", type: "Concern" },
  { text: "Whether I ask for help when sad", type: "Influence" },
  { text: "Family arguments", type: "Concern" },
  { text: "Time spent on revision", type: "Influence" },
];

const ControlSorter = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (finished) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: score,
        accuracy: (score / 10) * 100,
        avgResponseTimeSec: totalSeconds / 10,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 8,
      });
      setStartTime(Date.now());

      if (score >= 8) {
        // Mark as complete (IDs depend on your tracking schema)
        completeSELChallenge(1, 3);
      }
    }
  }, [finished]);

  const handleChoice = (choice) => {
    const correct = statements[current].type === choice;
    if (correct) setScore((prev) => prev + 1);
    setFeedback(correct ? "correct" : "wrong");

    setTimeout(() => {
      setFeedback(null);
      if (current + 1 < statements.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setFeedback(null);
    setFinished(false);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">Control Sorter – What’s Within Your Power?</h1>
      <p className="text-lg font-medium text-center mb-6 max-w-xl">
        Sort these thoughts into “Influence” or “Concern” zones.
      </p>

      <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-bold mb-3 text-center">🎯 Objective</h2>
        <p className="text-lg mb-2">Click-and-Sort 10 thoughts into the correct category:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-bold text-green-700">✅ Influence:</span> Things you can control or take action on.
          </li>
          <li>
            <span className="font-bold text-red-700">❌ Concern:</span> Things you cannot control and should learn to let go of.
          </li>
        </ul>
       
      </div>

      {!finished ? (
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-xl font-semibold mb-6">{statements[current].text}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoice("Influence")}
              className={`px-6 py-3 rounded-xl font-bold text-white transition duration-300 ${
                feedback === "correct" && statements[current].type === "Influence"
                  ? "bg-green-500"
                  : feedback === "wrong" && statements[current].type !== "Influence"
                  ? "bg-red-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Influence
            </button>
            <button
              onClick={() => handleChoice("Concern")}
              className={`px-6 py-3 rounded-xl font-bold text-white transition duration-300 ${
                feedback === "correct" && statements[current].type === "Concern"
                  ? "bg-green-500"
                  : feedback === "wrong" && statements[current].type !== "Concern"
                  ? "bg-red-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Concern
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl text-center bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Score: {score}/10</h2>
          <p className="text-gray-700">{score >= 8 ? "Great job!" : "Keep practicing and try again!"}</p>
          <button
            onClick={handleRestart}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ControlSorter;


