import React, { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const introGifs = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VkaTg2cmpmNGZpMjVwM3RqZDU2aDBjeGl6NWM5cDMxbzlzOHN2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j2wu51IWlQzEYxnocJ/200.webp",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VkaTg2cmpmNGZpMjVwM3RqZDU2aDBjeGl6NWM5cDMxbzlzOHN2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10biAakhEisyVG/200.webp",
];

const successGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDlnNHBhaHRicjZlbDZtd2UwM205NXVubXplemdqaDU0ZmoxOGdnaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/t3sZxY5zS5B0z5zMIz/200.webp";
const failGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjMzYTB4bWw1OGtjZW1icHVxb3Y0OHVtc24zYjMwaTVtdHh5M2tsbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VL48WGMDjD64umCEkv/200.webp";

const correctSequence = [
  "Photosynthesis",
  "Respiration",
  "Decomposition",
  "Ocean uptake",
  "Combustion",
];

const CarbonCycleVault = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [page, setPage] = useState("intro");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const [sequence, setSequence] = useState([
    "Respiration",
    "Combustion",
    "Photosynthesis",
    "Decomposition",
    "Ocean uptake",
  ]);
  const [mcqAnswer, setMcqAnswer] = useState([]);
  const [roles, setRoles] = useState({
    Forests: "",
    "Fossil Fuels": "",
    Oceans: "",
  });

  const [result, setResult] = useState(null); // null, true, or false

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("text/plain", idx);
  };

  const handleDrop = (e, idx) => {
    const draggedIdx = e.dataTransfer.getData("text/plain");
    const newSequence = [...sequence];
    const temp = newSequence[draggedIdx];
    newSequence[draggedIdx] = newSequence[idx];
    newSequence[idx] = temp;
    setSequence(newSequence);
  };

  const toggleMcq = (option) => {
    setMcqAnswer((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleRoleChange = (comp, val) => {
    setRoles({ ...roles, [comp]: val });
  };

  const checkAnswers = () => {
    const isSeqCorrect =
      JSON.stringify(sequence) === JSON.stringify(correctSequence);
    const isMcqCorrect =
      mcqAnswer.includes("Deforestation") &&
      mcqAnswer.includes("Fossil fuel combustion") &&
      mcqAnswer.length === 2;
    const isRolesCorrect =
      roles.Forests === "Carbon Sink" &&
      roles["Fossil Fuels"] === "Carbon Source" &&
      roles.Oceans === "Carbon Sink & Temporary Reservoir";
    return isSeqCorrect && isMcqCorrect && isRolesCorrect;
  };

  const handleSubmit = () => {
    const correct = checkAnswers();
    setResult(correct);

    if (correct) {
      completeEnvirnomentChallenge(0, 0);

      const endTime = Date.now();
      const totalTimeMs = endTime - startTime;

      const payload = {
        moduleName: "Environment",
        topicName: "climateAnalyst",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: parseFloat((totalTimeMs / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: true,
      };

      updatePerformance(payload);
      setStartTime(Date.now());

    }
  };


  const resetGame = () => {
    setSequence([
      "Respiration",
      "Combustion",
      "Photosynthesis",
      "Decomposition",
      "Ocean uptake",
    ]);
    setMcqAnswer([]);
    setRoles({
      Forests: "",
      "Fossil Fuels": "",
      Oceans: "",
    });
    setResult(null);
    setPage("intro");
    setStartTime(Date.now());

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center p-6">
      {page === "intro" && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            The Carbon Cycle Vault 🔁
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-700">
            Explore how carbon moves through our planet's ecosystems! Rearrange,
            diagnose, and repair to earn your badge.
          </p>
          <div className="flex gap-4 justify-center">
            {introGifs.map((gif, idx) => (
              <img
                key={idx}
                src={gif}
                alt="Carbon Cycle Gif"
                className="w-40 rounded-xl shadow-md"
              />
            ))}
          </div>
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
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              🔍 Question 1: Fix the Sequence
            </h2>
            <p className="mb-4 text-gray-700">
              Rearrange the scrambled steps of the carbon cycle into the correct
              order.
            </p>
            <div className="space-y-2">
              {sequence.map((step, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, idx)}
                  className="bg-green-100 p-3 rounded cursor-move shadow hover:bg-green-200 transition"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              🧪 Question 2: Disruption Diagnosis
            </h2>
            <p className="mb-4 text-gray-700">
              A sudden spike in atmospheric CO₂ is detected. Forest cover is
              down 40%, and fossil fuel use is up 60%. Which two human
              activities are directly responsible?
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Mining",
                "Deforestation",
                "Industrial farming",
                "Fossil fuel combustion",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleMcq(opt)}
                  className={`border px-4 py-2 rounded-full ${mcqAnswer.includes(opt)
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              🔧 Question 3: System Repair
            </h2>
            <p className="mb-4 text-gray-700">
              Match the component to its correct carbon sink/source role:
            </p>
            <div className="space-y-4">
              {["Forests", "Fossil Fuels", "Oceans"].map((comp) => (
                <div key={comp} className="flex items-center gap-4">
                  <span className="font-semibold w-32">{comp}</span>
                  <select
                    value={roles[comp]}
                    onChange={(e) => handleRoleChange(comp, e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="">Select Role</option>
                    <option value="Carbon Sink">Carbon Sink</option>
                    <option value="Carbon Source">Carbon Source</option>
                    <option value="Carbon Sink & Temporary Reservoir">
                      Carbon Sink & Temporary Reservoir
                    </option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          {result === null && (
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition"
              >
                Submit Answers
              </button>
            </div>
          )}

          {/* Result */}
          {result !== null && (
            <div className="text-center space-y-4">
              <img
                src={result ? successGif : failGif}
                alt="Result GIF"
                className="w-52 mx-auto rounded-xl shadow-md"
              />
              <h2 className="text-3xl font-bold text-green-700">
                {result
                  ? "🎉 Well done! You earned the Carbon Crusader badge!"
                  : "❌ Oops! Not quite right. Try again!"}
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

export default CarbonCycleVault;
