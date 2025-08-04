import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  {
    id: 1,
    question:
      "Someone accuses you of spreading a rumor. How will you handle it?",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDk4MzBqM2k1YWF1dzV0MG13MXlobXQyZXF6amNndWZib2ZoenhseiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KoBPBVSJRm8dVwi66c/giphy.webp",
    options: [
      {
        text: "React with anger",
        isCalm: false,
        feedback: "🔥 Uh-oh! That just poured fuel on the fire.",
      },
      {
        text: "Ask calmly to talk in private",
        isCalm: true,
        feedback: "😌 Smart! A private chat keeps it cool.",
      },
      {
        text: "Defend yourself respectfully",
        isCalm: true,
        feedback: "💬 Nice! Respect goes a long way.",
      },
      {
        text: "Offer to clarify with the teacher",
        isCalm: true,
        feedback: "📘 Good thinking! Clarity clears the air.",
      },
    ],
  },
  {
    id: 2,
    question: "You’re blamed for a group project failure.",
    gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGl5bHNsczlmOThyZHN0azQ5dzZoOGRiYmJncnIxMDFjNHJrbjBweiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o751WPZAOqQBLx9aE/200.webp",
    options: [
      {
        text: "Blame others loudly",
        isCalm: false,
        feedback: "📢 Yikes! Blaming backfires.",
      },
      {
        text: "Ask for a calm discussion",
        isCalm: true,
        feedback: "🧠 Thoughtful! That opens up dialogue.",
      },
      {
        text: "Explain your side respectfully",
        isCalm: true,
        feedback: "🗣️ Well said! Respect earns respect.",
      },
    ],
  },
  {
    id: 3,
    question: "A teammate criticizes your performance harshly.",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VsbHYwbjEwYmpiMThodnQzZmp1a3JzbG5yeXpveXRqYWlkZzRsMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tZpGRRMUoXgeQ/200.webp",
    options: [
      {
        text: "Criticize them back",
        isCalm: false,
        feedback: "😡 Uh-oh! You just doubled the heat!",
      },
      {
        text: "Take a breath and ask for feedback calmly",
        isCalm: true,
        feedback: "🌬️ Breathe in... de-escalation unlocked!",
      },
      {
        text: "Ignore them completely",
        isCalm: false,
        feedback: "🤐 Silent treatment rarely helps...",
      },
    ],
  },
];

const correctGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXduNGd2ZXBhN3Q5YzhncXF6b3YxdjR6Y2Eza3cyNHdmMmxlbWp6MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Gxsys0n1OahBxOwyYr/200.webp";
const wrongGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXZubHd6bDZpZzdkNnFienZkZGE0ZXZtOHhvZmljYjZ4bmFwcTdnZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZTra27awvhOMLfhcUH/giphy.webp";

const ConflictChoices = () => {
  const { completeSELChallenge } = useSEL();
  const [stage, setStage] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gif, setGif] = useState(null);
  const [answered, setAnswered] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  
  const startGame = () => {
    setStage("game");
  };

  const handleOptionClick = (isCalm, feedbackText) => {
  setAnswered(true);
  setGif(isCalm ? correctGif : wrongGif);
  setFeedback(feedbackText);
  if (isCalm) setScore((prev) => prev + 1);

  setTimeout(() => {
    setFeedback(null);
    setGif(null);
    setAnswered(false);

    const nextScore = score + (isCalm ? 1 : 0);
    const endTime = Date.now();
    const durationSec = Math.round((endTime - startTime) / 1000);
    const accuracy = Math.round((nextScore / scenarios.length) * 100);
    const avgResponseTimeSec = durationSec / scenarios.length;
    const roundedScore = Math.round((nextScore / scenarios.length) * 10);

    if (current < scenarios.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setStage("result");

      if (nextScore >= 2) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        completeSELChallenge(1, 1); // ✅ mark challenge complete
      }

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: roundedScore, // score out of 10
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: nextScore >= 2,
         
      });
      setStartTime(Date.now());

    }
  }, 2000);
};

  const resetGame = () => {
    setStage("game");
    setCurrent(0);
    setScore(0);
    setFeedback(null);
    setGif(null);
    setAnswered(false);
    setStartTime(Date.now());

  };

  const isWinner = score >= 2;

  if (stage === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">🗣️ Conflict Choices</h1>
        <p className="mb-4 text-lg text-gray-600 max-w-xl">
          Navigate 3 tough conversations. Can you stay calm and de-escalate at
          least 2?
        </p>
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzYyOTg1NmgzamZmd2twbGozNDg5dXhydmpvamNwbzduYXd0dmc1diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rEGAAcbyxuMMvdrW4X/giphy.webp"
          className="w-64 h-64 object-cover rounded-xl shadow mb-6"
          alt="Intro"
        />
        <button
          onClick={startGame}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (stage === "result") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Your Conflict Result</h2>
        <img
          src={
            isWinner
              ? "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExajI3YnlldTM4cnJtd3QyYmdhNWFzYTE0cGt4MzQwdHQ3Y2J5aTk1bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4QFAH0qZ0LQnIwVYKT/200.webp"
              : "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmRiaW55cWwya3E1djVna3Q4ZGIxenhhd2U3cDF6Z2gzem80anZmdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3q2J7KgtglQ5GQH6/200.webp"
          }
          className="w-64 h-64 mb-4 object-cover rounded-xl shadow"
          alt="Result"
        />
        <p className="text-lg font-medium mb-4">
          {isWinner
            ? "🎉 Nicely done! You kept your cool under pressure!"
            : "😬 Some hot-headed moments there! Want to try again?"}
        </p>
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400"
          >
            Try Again
          </button>
          {isWinner && (
            <Link
              to="/body-signal-matchup"
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Move to Next Game →
            </Link>
          )}
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[current];

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">
        Scenario {current + 1} of {scenarios.length}
      </h2>
      <p className="text-gray-600 mb-4">{currentScenario.question}</p>
      <img
        src={currentScenario.gif}
        alt="Scenario GIF"
        className="w-full max-w-md h-auto mb-4 object-contain rounded-xl mx-auto shadow"
      />

      <div className="space-y-3">
        {currentScenario.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(opt.isCalm, opt.feedback)}
            disabled={answered}
            className={`block w-full px-4 py-2 rounded-xl border text-left transition ${answered ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"
              }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-xl shadow text-sm inline-block">
          {feedback}
        </div>
      )}
      {gif && (
        <img
          src={gif}
          alt="Reaction GIF"
          className="w-32 h-32 mt-3 mx-auto rounded-xl object-cover"
        />
      )}
    </div>
  );
};

export default ConflictChoices;
