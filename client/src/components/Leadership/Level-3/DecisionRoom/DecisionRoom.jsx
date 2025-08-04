import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    question: "You must choose a class activity, but everyone disagrees.",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazhjc283YXRzb3UwcG5vMHVic2M0eDJhejdvbjN1dzJldDlka3hvZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dyUeo9WE4cuFGB9bMA/giphy.webp",
    options: [
      { text: "Vote and go with majority", isCorrect: true },
      { text: "Choose yourself", isCorrect: false },
      { text: "Do nothing", isCorrect: false },
      { text: "Pick your best friend’s idea", isCorrect: false },
    ],
  },
  {
    question: "Your group project is failing. What next?",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnlwYnJ4ZHptNnllaDhubDFyM3F3b2tmdmQ0cmN3ZXlsd3IxYzIwMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YTJXDIivNMPuNSMgc0/giphy.webp",
    options: [
      { text: "Blame the team", isCorrect: false },
      { text: "Try a new plan together", isCorrect: true },
      { text: "Quit the project", isCorrect: false },
      { text: "Let one person do everything", isCorrect: false },
    ],
  },
];

const puzzleSteps = [
  "Identify the problem",
  "Think of options",
  "Pick the best one",
  "Test it out",
];

const DecisionRoom = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const { width, height } = useWindowSize();
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [puzzleProgress, setPuzzleProgress] = useState([]);
  const [puzzleSelected, setPuzzleSelected] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (gameOver) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "theStrategist",
        score: Math.round((score / 6) * 100),
        accuracy: parseFloat(((score / 6) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / 6000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score === 6,

      });
      setStartTime(Date.now());
      if (score === 6) {
        completeLeadershipChallenge(2, 0);
      }

    }
  }, [gameOver, score]);


  const handleOptionClick = (isCorrect, i) => {
    setSelected(i);
    setShowFeedback(true);
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (step < scenarios.length - 1) {
        setStep((prev) => prev + 1);
      } else {
        setScreen("puzzle");
      }
    }, 1200);
  };

  const handlePuzzleClick = (stepText, index) => {
    setPuzzleSelected(index);
    if (stepText === puzzleSteps[puzzleProgress.length]) {
      setPuzzleProgress([...puzzleProgress, stepText]);
      setScore((prev) => prev + 1);
      if (puzzleProgress.length === puzzleSteps.length - 1) {
        setGameOver(true);
        setScreen("result");
      }
    } else {
      setPuzzleProgress([]);
    }
    setTimeout(() => setPuzzleSelected(null), 500);
  };

  const getResultGif = () => {
    if (score === 6)
      return {
        gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXYzNWF0Z202MzA5ZHUyczZ3d29wODVkM3plNTFhN3pocmdxcWE4ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xHMIDAy1qkzNS/200.webp",
        message: "Outstanding! You earned the 🧩 Critical Thinker badge!",
      };
    if (score >= 2)
      return {
        gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm1tcTlxbGJ3aWkxdDNhdHBvNHpsZTBoOTZmbDltcjF1M28wcGc1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AisJBlrQZT4Ze7rIdI/200.webp",
        message: "Nice try! You’re thinking in the right direction!",
      };
    return {
      gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGN6ZnpmM2s4cGMybjZxNHVrbXdsajViemMxZnlxajB5czV0OXBqZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4ZrFRwHGl4HTELW801/giphy.webp",
      message: "Give it another shot — you’ll get there!",
    };
  };

  const { gif, message } = getResultGif();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-100 to-indigo-200 text-center">
      {screen === "intro" && (
        <div className="max-w-xl bg-white rounded-2xl shadow p-6">
          <h1 className="text-4xl font-bold mb-4">🧠 The Decision Room</h1>
          <p className="text-gray-700 mb-4">
            Welcome to the Decision Room Challenge! Make smart decisions in
            tricky situations and test your problem-solving skills. Choose
            wisely and earn the 🧩 Critical Thinker badge!
          </p>
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJpajd6eTBpYWIwODU5OHR4MnJnaGNydmZobnB2bDc4ZXhyMHRkcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fsDFaSpcmTCuTBStqr/giphy.webp"
            alt="intro"
            className="rounded-xl mb-4 mx-auto"
          />
          <button
            onClick={() => setScreen("scenario")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            ▶️ Start Game
          </button>
        </div>
      )}

      {screen === "scenario" && !gameOver && (
        <div className="max-w-xl bg-white rounded-2xl shadow p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">
            {scenarios[step].question}
          </h2>
          <img
            src={scenarios[step].gif}
            alt="scenario"
            className="rounded-xl mb-4 mx-auto"
          />
          <div className="space-y-3">
            {scenarios[step].options.map((opt, i) => (
              <button
                key={i}
                className={`w-full px-4 py-2 rounded-xl transition border
                  ${selected === i
                    ? opt.isCorrect
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
                onClick={() => handleOptionClick(opt.isCorrect, i)}
                disabled={selected !== null}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "puzzle" && !gameOver && (
        <div className="max-w-xl bg-white rounded-2xl shadow p-6 w-full">
          <h2 className="text-xl font-bold mb-4">
            🧩 Solve this 4-Step Puzzle
          </h2>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWhlZW1zZ2JqcjhheWJqcGZ3NDl1NGFlYjJ5c2Y2Y3JyZmVpeTgwZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1zL7bm3xomm5R5PfRH/200.webp"
            alt="puzzle"
            className="rounded-xl mb-4 mx-auto"
          />
          <p className="mb-4 text-gray-600">
            Click the correct next step in problem-solving:
          </p>
          <div className="space-y-3">
            {puzzleSteps.map((stepText, index) => (
              <button
                key={index}
                onClick={() => handlePuzzleClick(stepText, index)}
                className={`w-full py-2 px-4 rounded-xl transition
                  ${puzzleSelected === index
                    ? "bg-yellow-300"
                    : "bg-blue-100 hover:bg-blue-200"
                  }`}
              >
                {stepText}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Progress: {puzzleProgress.length}/4 steps complete
          </p>
        </div>
      )}

      {screen === "result" && (
        <div className="max-w-xl bg-white rounded-2xl shadow p-6 text-center">
          {score === 6 && <Confetti width={width} height={height} />}
          <h2 className="text-2xl font-bold mb-4">Final Score: {score}/6</h2>
          <img src={gif} alt="result" className="rounded-xl mb-4 mx-auto" />
          <p className="text-lg font-medium mb-4">{message}</p>
          <button
            onClick={() => {
              setStep(0);
              setScore(0);
              setSelected(null);
              setPuzzleProgress([]);
              setPuzzleSelected(null);
              setGameOver(false);
              setScreen("intro");
              setStartTime(Date.now());
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DecisionRoom;
