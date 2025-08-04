import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

// Reuse your same GIFs
const introGif =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXNhdXM3cm4zMDYwajJqOWVhdTNxYmR4cG9oc2phazJ2aXJuc2FsNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yoJC2L06aZw6OoqtDG/200.webp";

const successGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDlnNHBhaHRicjZlbDZtd2UwM205NXVubXplemdqaDU0ZmoxOGdnaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/t3sZxY5zS5B0z5zMIz/200.webp";

const failGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjMzYTB4bWw1OGtjZW1icHVxb3Y0OHVtc24zYjMwaTVtdHh5M2tsbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VL48WGMDjD64umCEkv/200.webp";

const correctGif =
  "https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N3FlMm80bnN5Njdqbm0yeHFtanNsOHhmbWo0a3duMmN3cnhpdXhpNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/piSdVLJL4ggtq/200.webp";

const wrongGif =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW4zcTBmZzBuc3Iwd3cyOGsxZHQ1eHlqZnlobWljZ29yMHZzbjdrdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlOvSxIqi0huNQ4/200.webp";

const PhosphorusLockdown = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [page, setPage] = useState("intro");
  const [step, setStep] = useState(1);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  // Q1
  const scrambled = [
    "Animal excretion",
    "Rock weathering",
    "Plant absorption",
    "Decomposition",
    "Sediment formation",
  ];
  const correctSeq = [
    "Rock weathering",
    "Plant absorption",
    "Animal excretion",
    "Decomposition",
    "Sediment formation",
  ];
  const [q1Answer, setQ1Answer] = useState([]);
  const [q1Correct, setQ1Correct] = useState(null);

  // Q2
  const [q2, setQ2] = useState("");
  const [q2Correct, setQ2Correct] = useState(null);

  // Q3
  const [q3, setQ3] = useState("");
  const [q3Correct, setQ3Correct] = useState(null);

  const [final, setFinal] = useState(null);

  const resetGame = () => {
    setStep(1);
    setQ1Answer([]);
    setQ1Correct(null);
    setQ2("");
    setQ2Correct(null);
    setQ3("");
    setQ3Correct(null);
    setFinal(null);
    setPage("intro");
    setStartTime(Date.now());

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 flex flex-col items-center justify-center p-6">
      {page === "intro" && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            The Phosphorus Lockdown 🪨
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-700">
            Crack the secrets of the phosphorus cycle. Conquer the tasks to
            become a PhosphoPhantom!
          </p>
          <img
            src={introGif}
            alt="Intro Gif"
            className="w-52 mx-auto rounded-xl shadow-md"
          />
          <button
            onClick={() => setPage("game")}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-green-700 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {page === "game" && (
        <div className="w-full max-w-3xl space-y-10">
          {/* Question 1 */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                🔍 Q1: Sequence Puzzle
              </h2>
              <p className="mb-4 text-gray-700">
                Arrange these steps in natural phosphorus flow:
              </p>
              <div className="flex flex-col space-y-2 mb-4">
                {scrambled.map((step, idx) => (
                  <button
                    key={step + idx}
                    onClick={() =>
                      setQ1Answer(
                        q1Answer.includes(step) ? q1Answer : [...q1Answer, step]
                      )
                    }
                    className={`px-4 py-2 rounded-full border ${q1Answer.includes(step)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
              <p className="mb-2 font-medium">
                Selected Order:{" "}
                <span className="text-blue-700">
                  {q1Answer.join(" → ") || "None"}
                </span>
              </p>
              {q1Answer.length === scrambled.length && q1Correct === null && (
                <button
                  onClick={() => {
                    const isCorrect =
                      JSON.stringify(q1Answer) === JSON.stringify(correctSeq);
                    setQ1Correct(isCorrect);
                  }}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              )}
              {q1Correct !== null && (
                <>
                  <img
                    src={q1Correct ? correctGif : wrongGif}
                    alt={q1Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md mb-4"
                  />
                  <p className="font-semibold text-lg">
                    {q1Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-green-700 transition"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                🌊 Q2: Pollution Puzzle
              </h2>
              <p className="mb-4 text-gray-700">
                A lake near phosphate-rich farmland turned bright green. What
                caused this?
              </p>
              <div className="space-y-2">
                {[
                  "Acid rain",
                  "Algae harvesting",
                  "Excess fertilizer runoff",
                  "Dam construction",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setQ2(opt);
                      setQ2Correct(null);
                    }}
                    className={`block w-full border px-4 py-2 rounded-full ${q2 === opt
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {q2 && q2Correct === null && (
                <button
                  onClick={() =>
                    setQ2Correct(q2 === "Excess fertilizer runoff")
                  }
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              )}
              {q2Correct !== null && (
                <>
                  <img
                    src={q2Correct ? correctGif : wrongGif}
                    alt={q2Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md mb-4"
                  />
                  <p className="font-semibold text-lg">
                    {q2Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                  <button
                    onClick={() => setStep(3)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-green-700 transition"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                ⚠️ Q3: Resource Threat
              </h2>
              <p className="mb-4 text-gray-700">
                Why is phosphorus considered non-renewable on human timescales?
              </p>
              <div className="space-y-2">
                {[
                  "Because plants use it too fast",
                  "Because it comes from slow geological processes & we mine it faster",
                  "Because animals waste it",
                  "Because lakes trap it",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setQ3(opt);
                      setQ3Correct(null);
                    }}
                    className={`block w-full border px-4 py-2 rounded-full ${q3 === opt
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {q3 && q3Correct === null && (
                <button
                  onClick={() => {
                    const correct =
                      q3 ===
                      "Because it comes from slow geological processes & we mine it faster";
                    setQ3Correct(correct);

                    const correctCount =
                      (q1Correct ? 1 : 0) + (q2Correct ? 1 : 0) + (correct ? 1 : 0);
                    const allCorrect = correctCount === 3;
                    setFinal(allCorrect);

                    if (allCorrect) {
                      confetti();
                      completeEnvirnomentChallenge(0, 2);
                    }


                    const totalTimeMs = Date.now() - startTime;

                    updatePerformance({
                      moduleName: "Environment",
                      topicName: "climateAnalyst",
                      score: Math.round((correctCount / 3) * 10), // out of 10
                      accuracy: parseFloat(((correctCount / 3) * 100).toFixed(2)), // in %
                      avgResponseTimeSec: parseFloat((totalTimeMs / 3000).toFixed(2)), // 3 questions
                      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
                      completed: allCorrect,
                    });
                    setStartTime(Date.now());
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              )}
              {q3Correct !== null && (
                <>
                  <img
                    src={q3Correct ? correctGif : wrongGif}
                    alt={q3Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md mb-4"
                  />
                  <p className="font-semibold text-lg">
                    {q3Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Final Result */}
          {final !== null && (
            <div className="text-center space-y-4">
              <img
                src={final ? successGif : failGif}
                alt="Result GIF"
                className="w-52 mx-auto rounded-xl shadow-md"
              />
              <h2 className="text-3xl font-bold text-green-700">
                {final
                  ? "🎉 Congrats! You are a PhosphoPhantom!"
                  : "❌ Some answers were wrong. Try again!"}
              </h2>
              <button
                onClick={resetGame}
                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-green-700 transition"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhosphorusLockdown;
