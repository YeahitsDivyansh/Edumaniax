import React, { useState, useEffect } from "react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const dialogues = [
  {
    speaker: "Friend 1",
    text: [
      { word: "You", type: "normal" },
      { word: "ALWAYS", type: "swap", replacement: "Sometimes" },
      { word: "listen", type: "normal" },
      { word: "to", type: "normal" },
      { word: "me.", type: "normal" },
      { word: "You", type: "normal" },
      { word: "ruined", type: "normal" },
      { word: "everything!", type: "normal" },
    ],
  },
  {
    speaker: "Friend 2",
    text: [
      { word: "Why", type: "normal" },
      { word: "do", type: "normal" },
      { word: "you", type: "normal" },
      { word: "ALWAYS", type: "swap", replacement: "Often" },
      { word: "say", type: "normal" },
      { word: "that?", type: "normal" },
      { word: "I'm", type: "normal" },
      { word: "trying", type: "normal" },
      { word: "my", type: "normal" },
      { word: "best!", type: "normal" },
    ],
  },
  {
    speaker: "Friend 1",
    text: [
      { word: "I", type: "normal" },
      { word: "don't", type: "swap", replacement: "I feel upset" },
      { word: "care", type: "normal" },
      { word: "what", type: "normal" },
      { word: "you're", type: "normal" },
      { word: "trying.", type: "normal" },
      { word: "This", type: "normal" },
      { word: "is", type: "normal" },
      { word: "so", type: "normal" },
      { word: "unfair.", type: "normal" },
    ],
  },
];

const resolutionEndings = [
  {
    text: "I’m sorry if I hurt you. Let’s figure this out together.",
    isCorrect: true,
  },
  {
    text: "I care about our friendship and want to make things better.",
    isCorrect: true,
  },
  { text: "Whatever. I’m done talking.", isCorrect: false },
  { text: "You're always the problem here.", isCorrect: false },
];

const CoolTheConflict = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [swaps, setSwaps] = useState({});
  const [step, setStep] = useState("dialogue");
  const [selectedEndings, setSelectedEndings] = useState([]);
  const [isCorrectResolution, setIsCorrectResolution] = useState(null);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleGameFinish = () => {
    const endTime = Date.now();
    const durationSec = (endTime - startTime) / 1000;
    const avgResponseTimeSec = durationSec / 3; // ✅ simple calculation

    updatePerformance({
      moduleName: "Communication",
      topicName: "situationalAwareness",
      score: isCorrectResolution ? 10 : 5,
      accuracy: isCorrectResolution ? 100 : 50,
      studyTimeMinutes: durationSec / 60,
      avgResponseTimeSec,
      completed: true,

    });
    setStartTime(Date.now());
  };


  useEffect(() => {
    if (step === "result") {
      handleGameFinish(); // ✅ Log performance after game completes
    }
  }, [step]);


  const handleSwap = (lineIdx, wordIdx) => {
    setSwaps((prev) => ({
      ...prev,
      [`${lineIdx}-${wordIdx}`]:
        prev[`${lineIdx}-${wordIdx}`] === "swapped" ? null : "swapped",
    }));
  };

  const allSwapped = () => {
    for (let i = 0; i < dialogues.length; i++) {
      for (let j = 0; j < dialogues[i].text.length; j++) {
        const item = dialogues[i].text[j];
        if (item.type === "swap" && swaps[`${i}-${j}`] !== "swapped") {
          return false;
        }
      }
    }
    return true;
  };

  const handleResolutionClick = (index) => {
    setSelectedEndings((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      if (prev.length < 2) return [...prev, index];
      return prev;
    });
  };

  const handleResolutionSubmit = () => {
    if (selectedEndings.length !== 2) {
      alert("Please select exactly two responses to continue.");
      return;
    }
    const correctCount = selectedEndings.filter(
      (i) => resolutionEndings[i].isCorrect
    ).length;
    setIsCorrectResolution(correctCount === 2);
    setStep("result");
  };

  return (
    <div className="p-6 bg-purple-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🧘‍♀️ Cool the Conflict!</h1>

      {step === "dialogue" && (
        <div className="space-y-4 w-full max-w-3xl">
          {dialogues.map((line, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow text-lg flex flex-wrap"
            >
              <strong className="mr-2">{line.speaker}:</strong>
              {line.text.map((item, j) => {
                const key = `${i}-${j}`;
                if (item.type === "swap") {
                  const swapped = swaps[key] === "swapped";
                  return (
                    <span
                      key={key}
                      onClick={() => handleSwap(i, j)}
                      className={`cursor-pointer px-2 py-1 rounded-md mx-1 font-semibold transition-colors duration-200 ${swapped
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                        }`}
                    >
                      {swapped ? item.replacement : item.word}
                    </span>
                  );
                }
                return (
                  <span key={key} className="mx-1">
                    {item.word}
                  </span>
                );
              })}
            </div>
          ))}

          {allSwapped() && (
            <div className="text-center mt-6">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHh6NXAwZjgxeXJsb3Q1dGlmb3l6MGVzbWI5dWZvd2Yzd2loNHltNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MsMQLsb76EaHSnAYBF/giphy.webp"
                alt="Great going"
                className="mx-auto w-64 rounded-lg"
              />
              <button
                className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg"
                onClick={() => setStep("slider")}
              >
                Move to Emotion Slider →
              </button>
            </div>
          )}
        </div>
      )}

      {step === "slider" && (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Slide to show how the emotion is changing:
          </h2>
          <input
            type="range"
            min="0"
            max="100"
            className="w-64 accent-purple-500"
            onChange={(e) => {
              if (parseInt(e.target.value) > 80) setStep("ending");
            }}
          />
          <div className="mt-2 text-lg">From 😡 Angry to 🙂 Understanding</div>
        </div>
      )}

      {step === "ending" && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold mb-4">
            ✅ Now choose two responses that help resolve the conflict:
          </h3>
          <div className="grid gap-4 max-w-xl mx-auto">
            {resolutionEndings.map((ending, index) => (
              <div
                key={index}
                onClick={() => handleResolutionClick(index)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedEndings.includes(index)
                  ? "bg-green-200 border-green-500"
                  : "bg-white border-gray-300"
                  }`}
              >
                {ending.text}
              </div>
            ))}
          </div>
          <button
            onClick={handleResolutionSubmit}
            className={`mt-6 px-6 py-2 text-white rounded-lg ${selectedEndings.length === 2
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={selectedEndings.length !== 2}
          >
            Submit Resolution
          </button>
        </div>
      )}

      {step === "result" && (
        <div className="text-center mt-8">
          <img
            src={
              isCorrectResolution
                ? "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXBtdTRub2ZjYW1henhicWlqcXkwbzI3a2Nrazk1aGx5MmxyeGh5bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7abKhOpu0NwenH3O/200.webp"
                : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWxlMGMybTM0Mno0MDM5N3M1bDE5YjM1cHFtY21qeW1jeGQwNXp5YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/li0dswKqIZNpm/200.webp"
            }
            alt="Result Gif"
            className="w-64 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold">
            {isCorrectResolution
              ? "🎉 You’ve successfully cooled the conflict!"
              : "⚠️ Instead of cooling, you’re heating it up!"}
          </h2>
          <button
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg"
            onClick={() => {
              setSwaps({});
              setStep("dialogue");
              setSelectedEndings([]);
              setIsCorrectResolution(null);
              setStartTime(Date.now());
            }}
          >
            🔁 Replay
          </button>
        </div>
      )}
    </div>
  );
};

export default CoolTheConflict;
