import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

// Gifs
const introGif =
  "https://media0.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGtqNWd1NWs4NXlmMnBtZmEzMnB2bWoxdThjNXN1enpybW83Z2JyZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WUBGy9VpwjMd8g4fzM/200.webp";

const successGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmx1MmUwczMwZTdoMmJmeTg4OXhubGgxa3Q4ZXRiMzBobXp6b3dqeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zaqclXyLz3Uoo/200.webp";

const failGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG5pYTU0aXhidHgwa25leW1idXZydW1tMzZiYTFqczI0bXh2dG45ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/li0dswKqIZNpm/200.webp";

const NitrogenReactor = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [page, setPage] = useState("intro");
  const [step, setStep] = useState(1);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  // Q1
  const [q1Process, setQ1Process] = useState("");
  const [q1Function, setQ1Function] = useState({});
  const [q1Correct, setQ1Correct] = useState(null);

  // Q2
  const [q2, setQ2] = useState("");
  const [q2Correct, setQ2Correct] = useState(null);

  // Q3
  const [q3, setQ3] = useState("");
  const [q3Correct, setQ3Correct] = useState(null);

  // Final result
  const [final, setFinal] = useState(null);

  // Check Q1 pair

  // Check Q2
  const checkQ2 = () => {
    setQ2Correct(q2 === "Eutrophication");
  };

  // Check Q3
  const checkQ3 = () => {
    setQ3Correct(q3 === "Nitrifying bacteria convert ammonia to nitrates");
    const allCorrect =
      q1Correct &&
      q2Correct &&
      q3 === "Nitrifying bacteria convert ammonia to nitrates";
    setFinal(allCorrect);
    if (allCorrect) confetti();
  };

  const resetGame = () => {
    setStep(1);
    setQ1Process("");
    setQ1Function("");
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
            The Nitrogen Reactor ⚠️
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-700">
            Learn how nitrogen flows through our ecosystem. Solve the tasks and
            become a NitroNinja!
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
          {/* Question 1 */}
          {/* Question 1 */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                🔍 Q1: Process Match-Up
              </h2>
              <p className="mb-4 text-gray-700">
                Match each nitrogen cycle process with its correct function:
              </p>

              {[
                "Nitrogen Fixation",
                "Nitrification",
                "Ammonification",
                "Denitrification",
              ].map((proc) => (
                <div
                  key={proc}
                  className="flex items-center justify-center mb-4"
                >
                  <span className="w-40 font-semibold">{proc}</span>
                  <select
                    value={q1Function[proc] || ""}
                    onChange={(e) =>
                      setQ1Function({ ...q1Function, [proc]: e.target.value })
                    }
                    className="border p-2 rounded w-full max-w-xs"
                  >
                    <option value="">Select Function</option>
                    <option>Converts N₂ to ammonia</option>
                    <option>Converts ammonia to nitrates</option>
                    <option>Converts organic waste to ammonia</option>
                    <option>Converts nitrates to atmospheric N₂</option>
                  </select>
                </div>
              ))}

              {/* Show submit button only when all are chosen */}
              {Object.keys(q1Function).length === 4 &&
                Object.values(q1Function).every((val) => val !== "") &&
                q1Correct === null && (
                  <button
                    onClick={() => {
                      const correctPairs = {
                        "Nitrogen Fixation": "Converts N₂ to ammonia",
                        Nitrification: "Converts ammonia to nitrates",
                        Ammonification: "Converts organic waste to ammonia",
                        Denitrification: "Converts nitrates to atmospheric N₂",
                      };
                      const allCorrect = Object.keys(correctPairs).every(
                        (proc) => q1Function[proc] === correctPairs[proc]
                      );
                      setQ1Correct(allCorrect);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                )}

              {q1Correct !== null && (
                <>
                  <img
                    src={
                      q1Correct
                        ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGcwYzhhaGJ4cWpxcTc5ZGNhaDEzbThkZ2VnOG8zM2doM21zcWRpMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/r9YPCIldstAcEGlbPg/giphy.webp"
                        : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFjY3J0MnNzaGtqMDBpeWQzN3F1Y3Vyb2lieWw2bTUwcXhobGRxNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kBVyxpXLJ94B6G4qHK/200.webp"
                    }
                    alt={q1Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md mb-4"
                  />
                  <p className="mt-2 font-semibold text-lg">
                    {q1Correct ? "✅ All Correct!" : "❌ Some pairs are wrong!"}
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
              <h2 className="text-2xl font-bold mb-4">🌱 Q2: Field Scenario</h2>
              <p className="mb-4 text-gray-700">
                Overuse of urea causes algae blooms & fish death. Which process
                is accelerated?
              </p>
              <div className="space-y-2">
                {[
                  "Ammonification",
                  "Nitrogen Fixation",
                  "Eutrophication",
                  "Nitrification",
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
                  onClick={() => setQ2Correct(q2 === "Eutrophication")}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              )}
              {q2Correct !== null && (
                <>
                  <img
                    src={
                      q2Correct
                        ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGcwYzhhaGJ4cWpxcTc5ZGNhaDEzbThkZ2VnOG8zM2doM21zcWRpMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/r9YPCIldstAcEGlbPg/giphy.webp"
                        : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFjY3J0MnNzaGtqMDBpeWQzN3F1Y3Vyb2lieWw2bTUwcXhobGRxNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kBVyxpXLJ94B6G4qHK/200.webp"
                    }
                    alt={q2Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md mb-4"
                  />
                  <p className="mt-2 font-semibold text-lg">
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
                🔁 Q3: Repair the Cycle
              </h2>
              <p className="mb-4 text-gray-700">
                Step 1: Nitrogen-fixing bacteria
                <br />
                Step 2: ___________
                <br />
                Step 3: Plants absorb nitrates
              </p>
              <div className="space-y-2">
                {[
                  "Nitrifying bacteria convert ammonia to nitrates",
                  "Ammonification by decomposers",
                  "Denitrification returns nitrogen",
                  "Nitrogen Fixation repeats",
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
                    const correct = q3 === "Nitrifying bacteria convert ammonia to nitrates";
                    setQ3Correct(correct);

                    const q3CorrectNow = correct;
                    const allCorrect = q1Correct && q2Correct && q3CorrectNow;
                    setFinal(allCorrect);

                    // Count total correct
                    const correctCount =
                      (q1Correct ? 1 : 0) + (q2Correct ? 1 : 0) + (q3CorrectNow ? 1 : 0);

                    if (correctCount > 0) {
                      const endTime = Date.now();
                      const totalTimeMs = endTime - startTime;

                      const payload = {
                        moduleName: "Environment",
                        topicName: "climateAnalyst",
                        score: Math.round((correctCount / 3) * 10),
                        accuracy: parseFloat(((correctCount / 3) * 100).toFixed(2)),
                        avgResponseTimeSec: parseFloat((totalTimeMs / 1000).toFixed(2)),
                        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
                        completed: allCorrect,
                      };
                      setStartTime(Date.now());
                      updatePerformance(payload);
                    }

                    if (allCorrect) {
                      confetti();
                      completeEnvirnomentChallenge(0, 1);
                    }
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              )}
              {q3Correct !== null && (
                <>
                  <img
                    src={
                      q3Correct
                        ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGcwYzhhaGJ4cWpxcTc5ZGNhaDEzbThkZ2VnOG8zM2doM21zcWRpMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/r9YPCIldstAcEGlbPg/giphy.webp"
                        : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFjY3J0MnNzaGtqMDBpeWQzN3F1Y3Vyb2lieWw2bTUwcXhobGRxNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kBVyxpXLJ94B6G4qHK/200.webp"
                    }
                    alt={q3Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md mb-4"
                  />
                  <p className="mt-2 font-semibold text-lg">
                    {q3Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Final */}
          {final !== null && (
            <div className="text-center space-y-4">
              <img
                src={final ? successGif : failGif}
                alt="Result GIF"
                className="w-52 mx-auto rounded-xl shadow-md"
              />
              <h2 className="text-3xl font-bold text-green-700">
                {final
                  ? "🎉 Congrats! You are a NitroNinja!"
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
      )
      }
    </div >
  );
};

export default NitrogenReactor;
