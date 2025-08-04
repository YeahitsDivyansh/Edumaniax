import React, { useState, useEffect } from "react";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const statements = [
  { text: "My friend's bad mood", type: "Concern" },
  { text: "How much I study", type: "Influence" },
  { text: "What others post online", type: "Concern" },
  { text: "My reaction to being left out", type: "Influence" },
  { text: "School exam schedule", type: "Concern" },
  { text: "How I talk to others", type: "Influence" },
  { text: "The weather", type: "Concern" },
  { text: "Whether I ask for help when sad", type: "Influence" },
  { text: "My friend's opinion about my clothes", type: "Concern" },
  { text: "Choosing to get enough sleep", type: "Influence" },
];

const InfluenceExplorer = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (finished) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: score, // Already out of 10
        accuracy: (score / 10) * 100,
        avgResponseTimeSec: totalSeconds / 10,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 8,

      });
      setStartTime(Date.now());

      if (score >= 8) {
        completeSELChallenge(1, 3);
      }
    }
  }, [finished]);


  const handleChoice = (choice) => {
    const correct = statements[current].type === choice;
    const audio = new Audio(
      correct
        ? "/children-saying-yay-praise-and-worship-jesus-299607.mp3"
        : "https://www.myinstants.com/media/sounds/windows-error.mp3"
    );
    audio.play();

    if (correct) setScore((prev) => prev + 1);
    setFeedback(correct ? "correct" : "wrong");

    setTimeout(() => {
      setFeedback(null);
      if (current + 1 < statements.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
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
      <h1 className="text-3xl font-bold mb-4">
        Circle Check – What Can YOU Control?
      </h1>
      <p className="text-lg font-medium text-center mb-6 max-w-xl">
        Let’s figure out what you can do something about, and what you should
        let go of. Sort each thought into the right circle!
      </p>

      <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">🎯 Objective:</h2>
        <p className="text-lg mb-2">
          Sort 10 different thoughts or situations into two categories:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-bold text-green-700">✅ Influence:</span>{" "}
            Things you can control or take action on.
          </li>
          <li>
            <span className="font-bold text-red-700">❌ Concern:</span> Things
            you cannot control and should learn to let go of.
          </li>
        </ul>
      </div>

      {!finished ? (
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-xl font-semibold mb-6">
            {statements[current].text}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoice("Influence")}
              className={`px-6 py-3 rounded-xl font-bold text-white transition duration-300 ${feedback === "correct" &&
                statements[current].type === "Influence"
                ? "bg-green-500"
                : feedback === "wrong" &&
                  statements[current].type !== "Influence"
                  ? "bg-red-400"
                  : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              Influence
            </button>
            <button
              onClick={() => handleChoice("Concern")}
              className={`px-6 py-3 rounded-xl font-bold text-white transition duration-300 ${feedback === "correct" && statements[current].type === "Concern"
                ? "bg-green-500"
                : feedback === "wrong" &&
                  statements[current].type !== "Concern"
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
          {score >= 8 ? (
            <>
              <img
                src="https://media.tenor.com/q2-dENhwrlsAAAAm/youre-a-genius-faisal-khan.webp"
                alt="genius"
                className="w-60 mx-auto mb-4 rounded-xl"
              />
              <p className="text-green-700 font-semibold text-lg">
                You stayed calm and respectful. Great conflict solving!
              </p>
            </>
          ) : score >= 5 ? (
            <>
              <img
                src="https://media.tenor.com/SyUwl-y0BHEAAAAM/make-it-better-wil-dasovich.gif"
                alt="can improve"
                className="w-60 mx-auto mb-4 rounded-xl"
              />
              <p className="text-yellow-600 font-medium text-lg">
                You can still do better. Let’s try another way. You’ve got this!
              </p>
            </>
          ) : (
            <>
              <img
                src="https://media.tenor.com/aFJj5AaJb3wAAAAM/you-have-to-work-hard-lisa-alexandra.gif"
                alt="work harder"
                className="w-60 mx-auto mb-4 rounded-xl"
              />
              <p className="text-red-600 font-medium text-lg">
                Keep practicing! The more you try, the better you'll get.
              </p>
            </>
          )}
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

export default InfluenceExplorer;
