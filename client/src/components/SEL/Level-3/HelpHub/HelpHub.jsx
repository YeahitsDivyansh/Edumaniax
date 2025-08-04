import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  {
    id: 1,
    text: "You’re anxious about a test. Who do you reach out to?",
    options: [
      "Your subject teacher",
      "Your best friend who’s also nervous",
      "Your younger sibling",
      "The school guard",
    ],
    correct: 0,
    reason: "Teachers can guide you with study strategies and clarify doubts.",
  },
  {
    id: 2,
    text: "You had a fight with a friend. Who do you reach out to?",
    options: [
      "Another friend to gossip",
      "Your class teacher or school counselor",
      "A stranger online",
      "Ignore it and bottle it up",
    ],
    correct: 1,
    reason:
      "Trusted adults can help you reflect and resolve conflicts peacefully.",
  },
  {
    id: 3,
    text: "You’re feeling low for many days. Who do you reach out to?",
    options: [
      "School counselor or a trusted adult",
      "Ignore it and pretend to be okay",
      "Share jokes to distract yourself",
      "Post sad messages online",
    ],
    correct: 0,
    reason:
      "Mental health support is important, and counselors are trained to help.",
  },
  {
    id: 4,
    text: "You don’t understand homework. Who do you reach out to?",
    options: [
      "Your teacher or a classmate who understands",
      "Copy someone else’s work",
      "Skip it and make an excuse",
      "Ask your pet",
    ],
    correct: 0,
    reason: "Asking for academic help builds understanding and confidence.",
  },
  {
    id: 5,
    text: "Your cousin is being bullied and confided in you. Who do you reach out to?",
    options: [
      "A trusted adult in your family or a school counselor",
      "Spread the news to others",
      "Stay silent because it’s not your problem",
      "Fight the bully yourself",
    ],
    correct: 0,
    reason: "Trusted adults can intervene appropriately and ensure safety.",
  },
  {
    id: 6,
    text: "You feel pressured to join a challenge online. Who do you reach out to?",
    options: [
      "A trusted adult or digital safety helpline",
      "Join it so others don’t call you boring",
      "Ask the person who sent it if it’s safe",
      "Post about it to get others’ opinions",
    ],
    correct: 0,
    reason:
      "Online challenges can be risky. It's safest to ask a responsible adult.",
  },
];

export default function HelpHub() {
  const { completeSELChallenge } = useSEL();
  const [answers, setAnswers] = useState(Array(scenarios.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width, height } = useWindowSize();
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const checkScore = () => {
    return answers.filter((ans, i) => ans === scenarios[i].correct).length;
  };

  const score = checkScore();

  useEffect(() => {
    if (showResult && score >= 5) {
      completeSELChallenge(2, 1); // You can customize these parameters
    }
  }, [showResult, score]);

  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);
      const scaledScore = Math.round((score / scenarios.length) * 10);

      updatePerformance({
        moduleName: "SEL",
        topicName: "peerSupportNetworks",
        score: scaledScore,
        accuracy: Math.round((score / scenarios.length) * 100),
        avgResponseTimeSec: totalSeconds / scenarios.length,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 5,

      });
      setStartTime(Date.now());
    }
  }, [showResult]);


  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const getResultGIF = (score) => {
    if (score >= 5) {
      return {
        gif: "https://media.tenor.com/dCrUVMlV-q8AAAAM/oggy-jack.gif",
        message:
          "🎉 Great job! Knowing who to reach out to is the first step to feeling better and staying safe.",
      };
    } else if (score >= 3) {
      return {
        gif: "https://media.tenor.com/ajdvsLJG3vQAAAAM/johnny-test-not-bad.gif",
        message: "👍 Not bad! You know many safe choices, keep practicing!",
      };
    } else {
      return {
        gif: "https://media.tenor.com/JKGTMCk_NhcAAAAM/that-was-a-crap-performance-bradley-farquhar.gif",
        message:
          "😬 Oops! You need to learn more about who to reach out to. Try again!",
      };
    }
  };

  const handlePlayAgain = () => {
    setAnswers(Array(scenarios.length).fill(null));
    setShowResult(false);
    setCurrentIndex(0);
    setStartTime(Date.now());

  };

  const result = getResultGIF(score);
  const progress =
    (answers.filter((a) => a !== null).length / scenarios.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Confetti when winning */}
      {showResult && score >= 5 && <Confetti width={width} height={height} />}

      <h1 className="text-3xl font-bold mb-4 text-blue-700">🆘 Help Hub</h1>
      <p className="mb-6 text-gray-700">
        “You’re feeling overwhelmed. Who can you ask for help? Let’s explore
        your support system. Choose wisely – find the right person or place to
        turn to in each situation!”
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div
          className="bg-blue-500 h-4 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {!showResult && (
        <div className="mb-6 border border-gray-300 rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-2">🧩 Scenario {currentIndex + 1}</h2>
          <p className="mb-3">{scenarios[currentIndex].text}</p>
          <div className="space-y-2">
            {scenarios[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-2 rounded border transition-all duration-300 ${answers[currentIndex] !== null
                  ? idx === scenarios[currentIndex].correct
                    ? "bg-green-100 border-green-400"
                    : idx === answers[currentIndex]
                      ? "bg-red-100 border-red-400"
                      : "bg-white border-gray-300"
                  : "bg-white border-gray-300 hover:bg-blue-50 active:scale-95"
                  }`}
                disabled={answers[currentIndex] !== null}
              >
                {String.fromCharCode(65 + idx)}) {opt}
              </button>
            ))}
          </div>
          {answers[currentIndex] !== null && (
            <p
              className={`mt-2 font-medium transition-opacity duration-500 ${answers[currentIndex] === scenarios[currentIndex].correct
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {answers[currentIndex] === scenarios[currentIndex].correct
                ? "✅ Correct! "
                : "❌ Oops! "}
              {scenarios[currentIndex].reason}
            </p>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      {!showResult && (
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          {currentIndex < scenarios.length - 1 ? (
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, scenarios.length - 1)
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowResult(true)}
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={answers.includes(null)}
            >
              Check Result
            </button>
          )}
        </div>
      )}

      {showResult && (
        <div className="mt-6 p-4 border rounded bg-gray-50 text-center">
          <h2 className="text-xl font-bold mb-2">Your Score: {score} / 6</h2>
          <img
            src={result.gif}
            alt="Result GIF"
            className="mx-auto mb-4 rounded shadow-md"
          />
          <p className="mb-4 text-lg">{result.message}</p>
          <button
            onClick={handlePlayAgain}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 active:scale-95 transition-transform"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
