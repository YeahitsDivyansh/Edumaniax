import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

// Reuse your GIFs:
const introGif =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmxwY2didGF4ZTZpZnByYmVkNXo5ZmZjM3lmMjVhbmx6eXJlYmYyMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jOmQmJkjcvB3Bc8CRb/200.webp";

const successGif =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmNsN3Qyb3ZvaDhhemRteDBtMzhwcDEwZTJlbGl0MWJ3eDF4OGg0eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IUZtGhVO8hZ6w/200.webp";

const failGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjMzYTB4bWw1OGtjZW1icHVxb3Y0OHVtc24zYjMwaTVtdHh5M2tsbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VL48WGMDjD64umCEkv/200.webp";

const correctGif =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODBlaDZlejVqMHByZzhoaHM2Z2RtemYxZ2M0bG1iZ3Y5azFuZHVvayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LRNxdA0soqs09YWa4F/giphy.webp";

const wrongGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXplbml5ejhiMjNieHBnNHdkYXZ4czVkeDVnNWJ6OHlzbjAwbnJwNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3s298sv3aevOC4fktQ/200.webp";

const WaterGridCrisis = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [page, setPage] = useState("intro");
  const [step, setStep] = useState(1);

  // Q1
  const [q1, setQ1] = useState("");
  const [q1Correct, setQ1Correct] = useState(null);

  // Q2
  const [q2, setQ2] = useState([]);
  const [q2Correct, setQ2Correct] = useState(null);

  // Q3
  const [q3, setQ3] = useState([]);
  const [q3Correct, setQ3Correct] = useState(null);

  // Final Riddle
  const [riddle, setRiddle] = useState("");
  const [riddleCorrect, setRiddleCorrect] = useState(null);

  const [final, setFinal] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());


  const resetGame = () => {
    setStep(1);
    setQ1("");
    setQ1Correct(null);
    setQ2([]);
    setQ2Correct(null);
    setQ3([]);
    setQ3Correct(null);
    setRiddle("");
    setRiddleCorrect(null);
    setFinal(null);
    setPage("intro");
    setStartTime(Date.now());

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col items-center justify-center p-6">
      {page === "intro" && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            The Water Grid Crisis 🌊
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-700">
            Solve the crisis. Fix the flow. Escape as the HydroHacker!
          </p>
          <img
            src={introGif}
            alt="Intro Gif"
            className="w-52 mx-auto rounded-xl shadow-md"
          />
          <button
            onClick={() => setPage("game")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {page === "game" && (
        <div className="w-full max-w-3xl space-y-10">
          {/* Q1 */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                🌫️ Q1: Missing Flowchart Step
              </h2>
              <p className="mb-4 text-gray-700">
                Flow: Evaporation → ? → Precipitation → Infiltration
              </p>

              {/* ✅ Only options in this block */}
              <div className="space-y-4">
                {["Condensation", "Runoff", "Transpiration"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setQ1(opt);
                      setQ1Correct(null);
                    }}
                    className={`block w-full border px-4 py-2 rounded-full ${q1 === opt
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* ✅ Submit button with top margin */}
              {q1 && q1Correct === null && (
                <button
                  onClick={() => setQ1Correct(q1 === "Condensation")}
                  className="mt-6 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-green-700 transition"
                >
                  Submit
                </button>
              )}

              {/* ✅ Feedback in its own block with top margin */}
              {q1Correct !== null && (
                <div className="mt-8 space-y-4">
                  <img
                    src={q1Correct ? correctGif : wrongGif}
                    alt={q1Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md"
                  />
                  <p className="font-semibold text-lg">
                    {q1Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Q2 */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">🌆 Q2: Urban Scenario</h2>
              <p className="mb-4 text-gray-700">
                City replaced wetlands → heavy flooding + groundwater loss.
                Which 2 steps are disrupted?
              </p>
              <div className="space-y-2">
                {[
                  "Transpiration",
                  "Infiltration",
                  "Runoff",
                  "Ocean absorption",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      if (q2.includes(opt)) {
                        setQ2(q2.filter((o) => o !== opt));
                      } else if (q2.length < 2) {
                        setQ2([...q2, opt]);
                      }
                      setQ2Correct(null);
                    }}
                    className={`block w-full border px-4 py-2 rounded-full ${q2.includes(opt)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {q2.length === 2 && q2Correct === null && (
                <button
                  onClick={() =>
                    setQ2Correct(
                      q2.includes("Infiltration") && q2.includes("Runoff")
                    )
                  }
                  className="mt-6 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-green-700 transition"
                >
                  Submit
                </button>
              )}

              {q2Correct !== null && (
                <div className="mt-8 space-y-4">
                  <img
                    src={q2Correct ? correctGif : wrongGif}
                    alt={q2Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md"
                  />
                  <p className="font-semibold text-lg">
                    {q2Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Q3 */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">💦 Q3: Action Time</h2>
              <p className="mb-4 text-gray-700">
                Pick 2 urgent fixes for the city’s water crisis:
              </p>
              <div className="space-y-2">
                {[
                  "Build more dams",
                  "Ban borewells",
                  "Restore green recharge zones",
                  "Introduce rainwater harvesting",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      if (q3.includes(opt)) {
                        setQ3(q3.filter((o) => o !== opt));
                      } else if (q3.length < 2) {
                        setQ3([...q3, opt]);
                      }
                      setQ3Correct(null);
                    }}
                    className={`block w-full border px-4 py-2 rounded-full ${q3.includes(opt)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {q3.length === 2 && q3Correct === null && (
                <button
                  onClick={() => {
                    const correct =
                      q3.includes("Restore green recharge zones") &&
                      q3.includes("Introduce rainwater harvesting");
                    setQ3Correct(correct);
                  }}
                  className="mt-6 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-green-700 transition"
                >
                  Submit
                </button>
              )}

              {q3Correct !== null && (
                <div className="mt-8 space-y-4">
                  <img
                    src={q3Correct ? correctGif : wrongGif}
                    alt={q3Correct ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md"
                  />
                  <p className="font-semibold text-lg">
                    {q3Correct ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Final Riddle */}
          {step === 4 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                🎉 FINAL ESCAPE PUZZLE
              </h2>
              <p className="mb-4 text-gray-700">
                “I move through plants but don't have leaves, <br />
                I cycle through rocks but never grieves, <br />
                You broke my flow but made amends — <br />
                Now Earth can breathe and life extends.”
              </p>

              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2UzZmdoYnF1Nzdpc29idG0xaWkwdDIzZWM4NmY5YjltY2NuMWRvaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/16DyNkohj3sh99MVVH/200.webp"
                alt="Hint Gif"
                className="w-52 mx-auto rounded-xl shadow-md mb-4"
              />

              <p className="text-sm mb-2 text-gray-500">
                Hint: It describes Earth’s natural nutrient flows!
              </p>

              <div className="space-y-2">
                {[
                  "Photosynthesis",
                  "Biogeochemical Cycle",
                  "Hydraulic Pump",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setRiddle(opt);
                      setRiddleCorrect(null);
                    }}
                    className={`block w-full border px-4 py-2 rounded-full ${riddle === opt
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {riddle && riddleCorrect === null && (
                <button
                  onClick={() => {
                    const correct = riddle === "Biogeochemical Cycle";
                    setRiddleCorrect(correct);

                    const correctCount =
                      (q1Correct ? 1 : 0) +
                      (q2Correct ? 1 : 0) +
                      (q3Correct ? 1 : 0) +
                      (correct ? 1 : 0);

                    const allCorrect = correctCount === 4;
                    setFinal(allCorrect);

                    if (allCorrect) {
                      confetti();
                      completeEnvirnomentChallenge(0, 3);
                    }
                    const totalTimeMs = Date.now() - startTime;
                    updatePerformance({
                      moduleName: "Environment",
                      topicName: "ecoDecisionMaker",
                      score: Math.round((correctCount / 4) * 10), // scaled out of 10
                      accuracy: parseFloat(((correctCount / 4) * 100).toFixed(2)), // %
                      avgResponseTimeSec: parseFloat((totalTimeMs / 4000).toFixed(2)), // 4 questions
                      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
                      completed: allCorrect,
                     
                    });
                    setStartTime(Date.now());
                  }}
                  className="mt-6 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-green-700 transition"
                >
                  Submit
                </button>
              )}

              {riddleCorrect !== null && (
                <div className="mt-8 space-y-4">
                  <img
                    src={riddleCorrect ? correctGif : wrongGif}
                    alt={riddleCorrect ? "Correct GIF" : "Wrong GIF"}
                    className="w-52 mx-auto rounded-xl shadow-md"
                  />
                  <p className="font-semibold text-lg">
                    {riddleCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                  </p>
                </div>
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
              <h2 className="text-3xl font-bold text-blue-700">
                {final
                  ? "🎉 HydroHacker Badge Unlocked!"
                  : "❌ Some answers were wrong. Try again!"}
              </h2>
              <button
                onClick={resetGame}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition"
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

export default WaterGridCrisis;
