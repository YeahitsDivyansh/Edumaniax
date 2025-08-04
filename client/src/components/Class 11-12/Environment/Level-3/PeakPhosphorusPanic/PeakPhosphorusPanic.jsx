import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    id: 1,
    label: "Scenario 1",
    color: "bg-red-400",
    situation: "Lake turns toxic green from fertilizer runoff",
    options: [
      { text: "Add more chlorine", isCorrect: false },
      {
        text: "Control phosphorus in fertilizers and restore wetlands",
        isCorrect: true,
      },
      { text: "Drain the lake", isCorrect: false },
      { text: "Blame local fishers", isCorrect: false },
    ],
  },
  {
    id: 2,
    label: "Scenario 2",
    color: "bg-blue-400",
    situation: "India’s phosphorus mines are almost empty",
    options: [
      {
        text: "Launch phosphorus recycling from sewage and food waste",
        isCorrect: true,
      },
      { text: "Import from Morocco indefinitely", isCorrect: false },
      { text: "Start seawater extraction", isCorrect: false },
      { text: "Replace it with potassium", isCorrect: false },
    ],
  },
  {
    id: 3,
    label: "Scenario 3",
    color: "bg-green-400",
    situation: "Farmer yields drop due to phosphorus shortage",
    options: [
      {
        text: "Promote organic compost and precision fertilization",
        isCorrect: true,
      },
      { text: "Ban all fertilizer use", isCorrect: false },
      { text: "Subsidize chemical phosphorus", isCorrect: false },
      { text: "Tell farmers to grow less", isCorrect: false },
    ],
  },
  {
    id: 4,
    label: "Scenario 4",
    color: "bg-yellow-400",
    situation: "Phosphorus-rich algae overtakes a river",
    options: [
      { text: "Increase pesticide use", isCorrect: false },
      {
        text: "Implement strict agricultural runoff controls and buffer zones",
        isCorrect: true,
      },
      { text: "Add concrete banks", isCorrect: false },
      { text: "Introduce fish that eat algae", isCorrect: false },
    ],
  },
];

const correctGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGd4bGp0Nzg4YTNrZDRtMHRlYXdmdDYxZHJnamNndzd1aWU0N2hpdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PlxkQdfX6kglz5tCdv/200.webp";
const incorrectGif =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjd6ZXpwb3d6MGZ0ZThjZGU4OG0wYWUwd2s1NG8wZ2NqeW5kYWo4NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JOEnREV2UXEyAMJ4BO/giphy.webp";
const winGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXo3bmlxbmE5MWxzNnJndm41OThzeDFoMmZnczM1YzhwbHg0cHN3aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kmYBXYUp3K8lG/200.webp";
const loseGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3BzZzEzM2l3YXMzMDZvZnZvOW04d2p3b3J0d3N4Znc3OW1jcTE1cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kNwQN4ueScpbaeWtef/200.webp";
const introGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjIwcmh1MmR2bjN2bGE0NGN5ajNsMDBiZWpoYm1uN2Fsd2k4aGk0ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/42FKHckqBGwxu4uFzK/200.webp";

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const PeakPhosphorusPanic = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [step, setStep] = useState("intro");
  const [availableScenarios, setAvailableScenarios] = useState(
    shuffle([...scenarios])
  );
  const [currentScenario, setCurrentScenario] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answeredScenarios, setAnsweredScenarios] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { width, height } = useWindowSize();
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    const totalTimeMs = Date.now() - startTime;

    if (step === "result") {
      updatePerformance({
        moduleName: "Environment",
        topicName: "sustainableLeader",
        score: Math.round((score / cards.length) * 10),
        accuracy: parseFloat(((score / scenarios.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / scenarios.length / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score === scenarios.length,
         
      });
      setStartTime(Date.now());

      if (score === scenarios.length) {
        completeEnvirnomentChallenge(2, 1);
      }
    }
  }, [step, score]);


  const spinWheel = () => {
    const next = availableScenarios[0];
    const index = scenarios.findIndex((s) => s.id === next.id);
    const newRotation = rotation + 1440 + index * 90;
    setRotation(newRotation);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setCurrentScenario(next);
      setStep("question");
    }, 2500);
  };

  const handleOptionClick = (option) => {
    setFeedback(option.isCorrect);
    if (option.isCorrect) setScore((prev) => prev + 1);
    setTimeout(() => {
      setAnsweredScenarios((prev) => [...prev, currentScenario.id]);
      const remaining = availableScenarios.filter(
        (s) => s.id !== currentScenario.id
      );
      setAvailableScenarios(remaining);
      setFeedback(null);
      setCurrentScenario(null);
      if (remaining.length === 0) setStep("result");
      else setStep("spin");
    }, 2000);
  };

  const restart = () => {
    setScore(0);
    setFeedback(null);
    setAnsweredScenarios([]);
    setAvailableScenarios(shuffle([...scenarios]));
    setCurrentScenario(null);
    setRotation(0);
    setStep("spin");
    setStartTime(Date.now());
  };

  if (step === "intro") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-yellow-50">
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">
          🎡 Peak Phosphorus Panic
        </h1>
        <p className="max-w-xl text-gray-700 mb-4">
          Spin the wheel to land on phosphorus challenges. Choose wisely from
          the action cards!
        </p>
        <img
          src={introGif}
          alt="intro"
          className="w-64 rounded-xl shadow mb-6"
        />
        <button
          onClick={() => setStep("spin")}
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (step === "spin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 text-center">
        <div className="relative w-64 h-64 mb-4">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-black"></div>
          </div>
          <motion.div
            className="rounded-full border-4 border-yellow-500 w-full h-full grid grid-cols-2 grid-rows-2 text-white font-bold text-lg overflow-hidden"
            animate={{ rotate: spinning ? rotation : rotation }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {scenarios.map((s) => (
              <div
                key={s.id}
                className={`flex items-center justify-center ${s.color}`}
              >
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          🎯 Spin the Wheel
        </button>
      </div>
    );
  }

  if (step === "question" && currentScenario) {
    return (
      <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">
          🌀 {currentScenario.label}
        </h2>
        <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md">
          <p className="text-lg font-semibold text-center text-gray-800 mb-4">
            {currentScenario.situation}
          </p>
          <div className="flex flex-col gap-3">
            {currentScenario.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                disabled={feedback !== null}
                className="w-full py-2 px-4 border rounded-xl bg-white hover:bg-yellow-100 text-left"
              >
                {opt.text}
              </button>
            ))}
          </div>
          {feedback !== null && (
            <div className="flex justify-center mt-4">
              <img
                src={feedback ? correctGif : incorrectGif}
                alt="feedback"
                className="w-48 rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "result") {
    const allCorrect = score === scenarios.length;
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-yellow-50 p-6 relative">
        {allCorrect && <Confetti width={width} height={height} />}
        <img
          src={allCorrect ? winGif : loseGif}
          alt="result"
          className="w-64 rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">
          {allCorrect ? "🌟 Perfect Solutions!" : "📘 Good Effort!"}
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          You solved {score} out of {scenarios.length} scenarios correctly.
        </p>
        <button
          onClick={restart}
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
        >
          Play Again
        </button>
      </div>
    );
  }

  return null;
};

export default PeakPhosphorusPanic;
