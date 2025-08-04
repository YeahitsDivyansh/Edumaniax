import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom"; // Only needed if using React Router
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const options = [
  { id: 1, text: "Sleep 7 hours", isHelpful: true },
  { id: 2, text: "Doomscroll Instagram", isHelpful: false },
  { id: 3, text: "Talk to a mentor", isHelpful: true },
  { id: 4, text: "Skip meals", isHelpful: false },
  { id: 5, text: "Do breathing exercises", isHelpful: true },
  { id: 6, text: "Write out your worries", isHelpful: true },
  { id: 7, text: "Play video games for 6 hours straight", isHelpful: false },
];

const StressResponseBuilder = () => {
  const { completeSELChallenge } = useSEL();
  const [stage, setStage] = useState("intro"); // intro, game, result
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const handleSelect = (option) => {
    if (submitted) return;
    if (selected.some((o) => o.id === option.id)) {
      setSelected((prev) => prev.filter((o) => o.id !== option.id));
    } else {
      if (selected.length >= 4) return;
      setSelected((prev) => [...prev, option]);
    }
  };

  const handleSubmit = () => {
    if (selected.length !== 4) {
      alert("Please select exactly 4 strategies!");
      return;
    }

    setSubmitted(true);

    const correctCount = selected.filter((o) => o.isHelpful).length;

    const endTime = Date.now();
    const durationSec = Math.round((endTime - startTime) / 1000);
    const accuracy = Math.round((correctCount / 4) * 100);
    const avgResponseTimeSec = durationSec / 4;
    const roundedScore = Math.round((correctCount / 4) * 10);

    if (correctCount === 4) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      completeSELChallenge(1, 0); // ✅ Mark challenge complete
    }

    updatePerformance({
      moduleName: "SEL",
      topicName: "selfAwareness",
      score: roundedScore, // out of 10
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes: Math.ceil(durationSec / 60),
      completed: correctCount === 4,
     
    });
    setStartTime(Date.now());

  };



  const handleReset = () => {
    setSelected([]);
    setSubmitted(false);
    setStartTime(Date.now());

  };

  const handleStart = () => {
    setStage("game");
    setStartTime(Date.now());

  };

  const getStatus = (option) => {
    if (!submitted) return "";
    return option.isHelpful ? "correct" : "wrong";
  };

  const isWinner = selected.filter((o) => o.isHelpful).length === 4;

  if (stage === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">🧘 Stress Response Builder</h1>
        <p className="mb-4 text-lg text-gray-600 max-w-xl">
          Exam stress? Let's create a calm plan! Choose 4 helpful strategies
          from the options to manage stress in a healthy way.
        </p>
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dmV1aHdoNHhyMDRjZ2M0aXJvMHF3aDdiY3dzZ3FwZmF6ODlxazh0cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ReXbGKL5ljBmM33l0k/200.webp"
          alt="intro"
          className="rounded-xl mb-6 w-82 h-64 object-cover shadow"
        />
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Your Calm Plan is Ready!</h2>
        <img
          src={
            isWinner
              ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2VtMHhubWN1YzRuajk0MzJpaDd4NTRnZHFvZnRkMm85d3AwYXJqdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT0GqssRweIhlz209i/200.webp"
              : "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHNtZ3dhYzZ6bm85eHFkemV3Ymh4OGtzbm9zeDlvNnBxMjVqYjZsYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26ybwvTX4DTkwst6U/giphy.webp"
          }
          alt="result"
          className="w-64 h-64 mb-4 rounded-xl object-cover shadow"
        />
        <p className="text-lg font-medium mb-4">
          {isWinner
            ? "🎉 Great job! You've chosen all healthy stress strategies!"
            : "Oops! Some choices weren’t helpful. Try again?"}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400"
          >
            Try Again
          </button>

          {isWinner && (
            <Link
              to="/conflict-choices"
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Move to Next Game →
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🧘 Stress Response Builder</h1>
      <p className="text-gray-600 mb-6">
        You’re overwhelmed during exam week. Choose{" "}
        <b>4 effective strategies</b> to calm your mind.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {options.map((option) => {
          const selectedStatus = selected.some((o) => o.id === option.id);
          const status = getStatus(option);

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`p-4 rounded-xl border text-left transition-all duration-200
                ${selectedStatus ? "bg-blue-100 border-blue-500" : "bg-white"}
                ${submitted && status === "correct"
                  ? "border-green-500 shadow-md bg-green-100"
                  : ""
                }
                ${submitted && status === "wrong"
                  ? "border-red-300 opacity-50"
                  : ""
                }
              `}
            >
              <div className="flex justify-between items-center">
                <span>{option.text}</span>
                {submitted &&
                  (status === "correct" ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : status === "wrong" ? (
                    <XCircle className="text-red-400 w-5 h-5" />
                  ) : null)}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        Submit Plan
      </button>
    </div>
  );
};

export default StressResponseBuilder;
