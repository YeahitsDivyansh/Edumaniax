import React, { useEffect, useState } from "react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const introGif =
  "https://media.tenor.com/ykI_6DBK2yYAAAA1/benjammins-you-go-girl.webp";
const successGif = "https://media.tenor.com/qHZihWtEKtAAAAAm/dynamike.webp";
const goodGif =
  "https://media.tenor.com/kQa5mEOUYwYAAAA1/i-think-we-can-do-it-even-better-marques-brownlee.webp";
const proceedGif =
  "https://media.tenor.com/adpQ92f6UfcAAAA1/do-you-wish-to-proceed-general-curtleigh.webp";

const pairs = [
  {
    leader: "Authoritative Leader",
    trait: "Makes bold decisions quickly",
    gif: "https://media.tenor.com/93WAVC-PpK8AAAAM/autocratic-elon-musk.gif",
  },
  {
    leader: "Democratic Leader",
    trait: "Asks team before deciding",
    gif: "https://media.tenor.com/n32bnOH0x0IAAAAM/pete-buttigieg-mayor.gif",
  },
  {
    leader: "Servant Leader",
    trait: "Cares for everyone’s needs",
    gif: "https://media.tenor.com/IQuIbqPRrXQAAAAM/chee-soon.gif",
  },
  {
    leader: "Transformational Leader",
    trait: "Brings big changes",
    gif: "https://media.tenor.com/Zy2vUte41PQAAAA1/obama-uspresident.webp",
  },
];

const mcqs = [
  {
    question: "Which leader asks for everyone’s opinion?",
    options: ["Authoritative", "Servant", "Democratic", "Passive"],
    answer: "Democratic",
  },
  {
    question: "Which trait is best for a leader?",
    options: ["Bossy", "Honest", "Selfish", "Quiet"],
    answer: "Honest",
  },
];

export default function LeaderTypeMatch() {
  const { completeLeadershipChallenge } = useLeadership();
  const [stage, setStage] = useState("intro");
  const [dragData, setDragData] = useState([]);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [score, setScore] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    const totalTimeMs = Date.now() - startTime;

    if (stage === "result") {
      updatePerformance({
        moduleName: "Leadership",
        topicName: "foresight",
        score: Math.round((score / 6) * 10),
        accuracy: parseFloat(((score / 6) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / 6 / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score >= 5,

      });
      setStartTime(Date.now());
      if (score >= 5) {
        completeLeadershipChallenge(0, 0); // Use your real IDs
      }


    }
  }, [stage, score]);


  const startGame = () => {
    setStage("drag");
    setDragData(Array(pairs.length).fill(null));
    setMcqAnswers({});
    setScore(0);
  };

  const handleDrop = (i, trait) => {
    const data = [...dragData];
    data[i] = trait;
    setDragData(data);
  };

  const checkDrag = () => {
    let points = 0;
    dragData.forEach((ans, i) => {
      if (ans === pairs[i].trait) points++;
    });
    setScore(points);
    setStage("mcq");
  };

  const handleMCQ = (i, val) => {
    const answers = { ...mcqAnswers, [i]: val };
    setMcqAnswers(answers);
  };

  const checkMCQ = () => {
    let total = score;
    mcqs.forEach((q, i) => {
      if (mcqAnswers[i] === q.answer) total++;
    });
    setScore(total);
    setStage("result");
  };

  const getResultGif = () => {
    if (score >= 5) return successGif;
    if (score === 4) return goodGif;
    return proceedGif; // for score 3 or below
  };

  const badge = "🧠 Style Sensei";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      {stage === "intro" && (
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4">What is Leadership? 🧑‍💼✨</h1>
          <p className="mb-6 text-lg">
            Leadership means guiding a team with honesty, courage, and vision.
            👥💡 A good leader motivates, listens, and takes responsibility to
            help everyone succeed! 🌟
          </p>
          <div className="flex justify-center">
            <img src={introGif} alt="Intro" className="mb-6 rounded-xl" />
          </div>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-800"
          >
            Start Game
          </button>
        </div>
      )}

      {stage === "drag" && (
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">
            Match leadership styles to traits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pairs.map((p, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow flex flex-col"
              >
                <strong>{p.leader}</strong>
                <img src={p.gif} alt={p.leader} className="my-2 rounded" />
                <select
                  value={dragData[i] || ""}
                  onChange={(e) => handleDrop(i, e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select trait</option>
                  {pairs.map((opt, idx) => (
                    <option key={idx} value={opt.trait}>
                      {opt.trait}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={checkDrag}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-800"
          >
            Submit Matches
          </button>
        </div>
      )}

      {stage === "mcq" && (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Answer the MCQs</h2>
          {mcqs.map((q, i) => (
            <div key={i} className="mb-6 p-4 bg-white rounded shadow">
              <p className="mb-2 font-medium">{q.question}</p>
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`mcq-${i}`}
                    checked={mcqAnswers[i] === opt}
                    onChange={() => handleMCQ(i, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button
            onClick={checkMCQ}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-800"
          >
            Submit MCQs
          </button>
        </div>
      )}

      {stage === "result" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your Score: {score} / 6</h2>
          <img
            src={getResultGif()}
            alt="Result"
            className="mb-4 rounded-xl mx-auto"
          />
          {score <= 3 && (
            <p className="text-xl mb-4">Do you wish to proceed?</p>
          )}
          {score >= 5 && (
            <div className="mt-4 text-xl font-semibold text-green-700">
              🎉 Congratulations! You earned a badge: {badge}
            </div>
          )}
          <button
            onClick={() => {
              setStage("intro")
              setStartTime(Date.now());
            }
            }
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-800"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
