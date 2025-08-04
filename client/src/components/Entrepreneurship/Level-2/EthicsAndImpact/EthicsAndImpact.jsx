import React, { useEffect, useState } from "react";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

// GIFs
const introGif = "https://media0.giphy.com/media/YHvI6fvc1bwfrP9alV/200w.webp";
const successGif = "https://media4.giphy.com/media/lC69bczh51rZldSyA5/200.webp";
const failGif = "https://media3.giphy.com/media/5QW76Ww9bquHdg1fTv/100.webp";

const EthicsAndImpact = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [started, setStarted] = useState(false);
  const [risks, setRisks] = useState(["", "", ""]);
  const [solutions, setSolutions] = useState(["", "", ""]);
  const [reflection, setReflection] = useState("");

  const [pairFeedbacks, setPairFeedbacks] = useState(["", "", ""]);
  const [reflectionFeedback, setReflectionFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (showSuccess) {
      completeEntreprenerushipChallenge(1, 0); // Replace with correct challenge ID
    }
  }, [showSuccess]);

  // ✅ Gemini check with explicit instruction for positive wording
  const verifyInputsWithGemini = async () => {
    setLoading(true);
    setPairFeedbacks(["", "", ""]);
    setReflectionFeedback("");
    setShowSuccess(false);
    setShowFail(false);

    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const newPairFeedbacks = [];

      for (let i = 0; i < 3; i++) {
        const prompt = `
You are a supportive teacher for Class 6–8 kids.

Check this pair:
Risk: "${risks[i]}"
Solution: "${solutions[i]}"

✅ If the solution fits the risk well, respond starting with "Great idea! 🎉" or "Good solution! ✅", then explain why in a friendly way.

❌ If it does not match well, start with "Needs improvement:" and say how to fix it in simple words and an example.
`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        newPairFeedbacks.push(reply);
      }

      // Reflection check
      const reflectionPrompt = `
You are a supportive teacher for Class 6–8 kids.

Check this reflection:
"${reflection}"

✅ If it clearly says who is responsible for the risks (like developers, users or both), start with "Good reflection! ✅" and say why it's good.

❌ If it is unclear, start with "Needs improvement:" and suggest how to improve it.
`;

      const reflectionResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: reflectionPrompt }] }],
        }),
      });

      const reflectionData = await reflectionResponse.json();
      const reflectionReply =
        reflectionData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      setPairFeedbacks(newPairFeedbacks);
      setReflectionFeedback(reflectionReply);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const isPositive = (text) =>
      text.toLowerCase().startsWith("great") ||
      text.toLowerCase().startsWith("good");

    const isNegative = (text) =>
      text.toLowerCase().startsWith("needs improvement");

    let score = 0;
    let validPairs = 0;

    pairFeedbacks.forEach((feedback) => {
      if (isPositive(feedback)) {
        score += 2;
        validPairs++;
      } else if (isNegative(feedback)) {
        score += 1;
        validPairs++;
      }
    });

    // Reflect feedback scoring
    if (isPositive(reflectionFeedback)) {
      score += 2;
      validPairs++;
    } else if (isNegative(reflectionFeedback)) {
      score += 1;
      validPairs++;
    }

    const accuracy = Math.round((score / 8) * 100);
    const endTime = Date.now();
    const timeTakenSec = (endTime - startTime) / 1000;
    const timeTakenMin = Math.round(timeTakenSec / 60);

    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "masteringPitch",
      score,
      accuracy,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: timeTakenMin,
      completed: true,

    });
    setStartTime(Date.now());
    if (score >= 7) {
      setShowSuccess(true);
      setShowFail(false);
    } else {
      setShowSuccess(false);
      setShowFail(true);
    }
  };


  const handleTryAgain = () => {
    setRisks(["", "", ""]);
    setSolutions(["", "", ""]);
    setReflection("");
    setShowSuccess(false);
    setShowFail(false);
     
  };

  const handlePlayAgain = () => {
    setStarted(false);
    setRisks(["", "", ""]);
    setSolutions(["", "", ""]);
    setReflection("");
    setPairFeedbacks(["", "", ""]);
    setReflectionFeedback("");
    setShowSuccess(false);
    setShowFail(false);
    setStartTime(Date.now());
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-blue-50 text-center">
        <h1 className="text-3xl font-bold mb-4">
          🛡️ Challenge 3: Ethics & Impact Board
        </h1>
        <img src={introGif} alt="Intro" className="mb-4 rounded shadow" />
        <p className="text-lg mb-6 max-w-xl">
          <strong>Mission:</strong> Think about risks and fairness in using AI.
          Every idea must be responsible! 🧑‍💻💡
          <br />
          <br />
          ✏️ <strong>Tasks:</strong> <br />
          1️⃣ Identify 3 risks/problems your AI could cause. <br />
          2️⃣ Suggest how to prevent each risk. <br />
          3️⃣ Reflect on who is responsible.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🚀 Start the Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50 text-center">
      <h2 className="text-2xl font-bold mb-4">🛡️ Ethics & Impact Board</h2>

      <div className="w-full max-w-md space-y-6 text-left">
        {[0, 1, 2].map((index) => (
          <div key={index} className="space-y-2">
            <label className="block">
              <span className="font-semibold">{index + 1}️⃣ Risk</span>
              <input
                type="text"
                value={risks[index]}
                onChange={(e) => {
                  const updated = [...risks];
                  updated[index] = e.target.value;
                  setRisks(updated);
                }}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Eg: Might leak private info"
              />
            </label>
            <label className="block">
              <span className="font-semibold">🛠️ Solution</span>
              <input
                type="text"
                value={solutions[index]}
                onChange={(e) => {
                  const updated = [...solutions];
                  updated[index] = e.target.value;
                  setSolutions(updated);
                }}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Eg: Use strong encryption"
              />
            </label>
            <p className="bg-white border p-2 rounded shadow">
              {pairFeedbacks[index] || "No feedback yet."}
            </p>
          </div>
        ))}

        <label className="block">
          <span className="font-semibold">🪞 Reflection</span>
          <input
            type="text"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Eg: Developers & users should be careful."
          />
        </label>
        <p className="bg-white border p-2 rounded shadow">
          {reflectionFeedback || "No feedback yet."}
        </p>
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={verifyInputsWithGemini}
          disabled={loading}
          className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {loading ? "Checking..." : "✅ Verify "}
        </button>

        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🎉 Submit
        </button>

        <button
          onClick={handleTryAgain}
          className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔄 Try Again
        </button>

        <button
          onClick={handlePlayAgain}
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔁 Play Again
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center">
        {showSuccess && (
          <>
            <div className="flex justify-center">
              <img
                src={successGif}
                alt="Success"
                className="rounded shadow w-60 h-auto"
              />
            </div>
            <p className="text-xl font-bold mt-2 text-center">
              🎉 Great job! Everything looks responsible!
            </p>
          </>
        )}
        {showFail && (
          <>
            <div className="flex justify-center">
              <img
                src={failGif}
                alt="Try again"
                className="rounded shadow w-40 h-auto"
              />
            </div>
            <p className="text-xl font-bold mt-2 text-center">
              ⚠️ Oops! Some answers need fixing. Please improve them!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EthicsAndImpact;
