import React, { useState } from "react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
export default function ConflictCommanderGame() {
  const { completeCommunicationChallenge } = useCommunication();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({});
  const [result, setResult] = useState(null);
  const [reflection, setReflection] = useState("");
  const [showResult, setShowResult] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const step1Options = [
    { id: "s1a", text: "😤 “You’re just yelling again.”", correct: false },
    { id: "s1b", text: "😟 “I get that you’re upset.”", correct: true },
  ];

  const step2Options = [
    { id: "s2a", text: "🤝 “Let’s divide the work now so we’re clear.”", correct: true },
    { id: "s2b", text: "🙅 “It’s not my fault entirely.”", correct: false },
  ];

  const handleSelect = (stepId, option) => {
    setSelected(prev => ({ ...prev, [stepId]: option }));
    if (stepId === 1) {
      setStep(2);
    } else if (stepId === 2) {
      setStep(3);
    }
  };

  const handleShowResult = () => {
    const empathy = selected[1]?.correct ?? false;
    const assertive = selected[2]?.correct ?? false;

    let message = "";
    let emoji = "";

    if (empathy && assertive) {
      message = "🌈 Awesome! You showed both empathy and leadership!";
      emoji = "🎉";
      completeCommunicationChallenge(2, 0);
    } else if (empathy) {
      message = "👍 You were kind, but could be more solution-focused!";
      emoji = "🙂";
    } else if (assertive) {
      message = "⚠️ You were solution-focused, but lacked empathy.";
      emoji = "😐";
    } else {
      message = "🚫 Oops! Let’s work on empathy *and* problem-solving.";
      emoji = "🙈";
    }

    // 🟢 Track performance
    const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
    updatePerformance({
      moduleName: "Communication",
      topicName: "interpersonalSkills",
      score: Math.round((empathy + assertive) * 5),
      accuracy: ((empathy + assertive) / 2) * 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: Math.ceil(timeTakenSec / 60),
      completed: empathy && assertive,

    });
    setStartTime(Date.now());
    setResult({ message, emoji });
    setShowResult(true);
  };


  const restartGame = () => {
    setStep(1);
    setSelected({});
    setResult(null);
    setReflection("");
    setShowResult(false);
    setStartTime(Date.now());
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-yellow-50 to-pink-100 rounded-3xl p-6 shadow-2xl transition-all duration-500">
      <h2 className="text-4xl font-extrabold text-center text-pink-700 mb-4 animate-pulse">
        🧠 Conflict Commander
      </h2>

      <p className="text-center text-lg text-purple-700 mb-6">
        🎮 Help resolve a conflict by choosing kind and confident replies!
      </p>

      <div className="mb-6 bg-white rounded-xl p-4 shadow-md">
        <div className="text-xl font-semibold mb-2 text-center text-purple-800">
          🎭 Scenario
        </div>
        <p className="text-center text-lg">
          <span className="font-bold">Teammate A:</span> “You never submit things on time! I always have to cover for you!”
        </p>
      </div>

      {step === 1 && (
        <>
          <h3 className="text-2xl font-bold text-purple-700 text-center mb-3">Step 1: 🎈 Acknowledge Emotion</h3>
          <p className="text-center text-sm mb-4 text-gray-600">Pick the best response to show you understand their feelings.</p>
          <div className="flex flex-col gap-4">
            {step1Options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect(1, opt)}
                className="bg-white border-2 border-yellow-300 hover:border-green-400 transition p-4 rounded-xl shadow text-left text-lg"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="text-2xl font-bold text-purple-700 text-center mb-3">Step 2: 🛠 Propose a Solution</h3>
          <p className="text-center text-sm mb-4 text-gray-600">Now help move things forward positively.</p>
          <div className="flex flex-col gap-4">
            {step2Options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect(2, opt)}
                className="bg-white border-2 border-blue-300 hover:border-green-500 transition p-4 rounded-xl shadow text-left text-lg"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && !showResult && (
        <>
          <div className="mt-6">
            <label className="block font-semibold text-purple-800 mb-2 text-lg">
              ✏️ Final Reflection: What worked best in your response and why?
            </label>
            <textarea
              className="w-full p-4 border-2 border-purple-300 rounded-xl bg-white text-gray-700 shadow"
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your answer here..."
            />
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleShowResult}
              className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 px-6 rounded-full transition"
            >
              ✅ See Result
            </button>
          </div>
        </>
      )}

      {showResult && result && (
        <>
          <div className="mt-6 bg-white p-6 rounded-3xl shadow-xl text-center border-4 border-purple-300">
            <div className="text-5xl mb-4">{result.emoji}</div>
            <h3 className="text-2xl font-bold text-purple-700">{result.message}</h3>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={restartGame}
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-3 px-6 rounded-full transition"
            >
              🔁 Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}
