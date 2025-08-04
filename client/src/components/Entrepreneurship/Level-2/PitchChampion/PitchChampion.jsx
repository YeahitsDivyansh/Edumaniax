import React, { useEffect, useState } from "react";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const PitchChampion = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();

  // ✅ Add a page state: "intro" or "pitch"
  const [page, setPage] = useState("intro");

  // Game states
  const [pitch, setPitch] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (submitted && verified) {
      completeEntreprenerushipChallenge(1, 1); // 🎯 Challenge 3, Task 4
    }
  }, [submitted, verified]);

  const verifyPitchWithGemini = async () => {
    if (!pitch.trim()) {
      alert("Please write your pitch first.");
      return;
    }

    setLoading(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a kind and encouraging startup mentor for students in Class 6–8.
  
  A student wrote this pitch: "${pitch}"
  
  ✅ Please check carefully:
  1️⃣ Is the problem clear?
  2️⃣ Is the AI solution clear?
  3️⃣ Are benefits for users listed?
  4️⃣ Is the AI type mentioned?
  5️⃣ Is it about 150 words?
  
  If the pitch is GOOD:
  - Reply like: "✅ Great work! 🎉 Your pitch is clear and strong. The problem is well explained, the AI solution is realistic, benefits are clear, and you mentioned the AI type. Keep it up! 💪✨"
  
  If the pitch NEEDS IMPROVEMENT:
  - Reply like: "❌ Needs improvement: 🤔 Please make the problem clearer, describe exactly how AI will solve it, add clear user benefits, and say what AI type you use. Try to write it in about 150 words. You can do it! 🚀"
  
  ✅ Always use simple words.
  ✅ Use some emojis to encourage the student.
  ✅ Keep your reply short: maximum 1 short paragraph.
  ✅ Do not add extra comments or disclaimers.`,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        setAiFeedback(
          "⚠️ Gemini could not verify right now. Please try again."
        );
        setLoading(false);
        return;
      }

      const data = await response.json();
      const geminiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      setAiFeedback(geminiReply);
      setVerified(geminiReply.toLowerCase().includes("great work"));
    } catch (error) {
      console.error("Error:", error);
      setAiFeedback("⚠️ Oops! Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (verified === null) {
      alert("Please get AI verification first.");
      return;
    }

    setSubmitted(true);

    const endTime = Date.now();
    const timeTakenSec = (endTime - startTime) / 1000;
    const timeTakenMin = Math.round(timeTakenSec / 60);

    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "masteringPitch",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: timeTakenMin,
      completed: true,

    });
    setStartTime(Date.now());
  };


  const handleTryAgain = () => {
    setPitch("");
    setVerified(null);
    setAiFeedback("");
    setSubmitted(false);
  };

  const handlePlayAgain = () => {
    // ✅ Reset everything and return to intro page
    setPitch("");
    setVerified(null);
    setAiFeedback("");
    setSubmitted(false);
    setPage("intro");
    setStartTime(Date.now());
  };

  // ✅ If page is intro, show intro content only
  if (page === "intro") {
    return (
      <div className="text-center p-10">
        <h1 className="text-5xl font-bold mb-6">🎙️ Pitch Champion</h1>
        <img
          src="https://media.tenor.com/2JsKoyouvYgAAAA1/bane-batman.webp"
          alt="Intro GIF"
          className="mx-auto mb-6 rounded-lg"
        />
        <p className="text-lg mb-4">
          Write a clear 1-minute pitch and earn your Pitch Pro badge!
        </p>
        <button
          onClick={() => setPage("pitch")}
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
        >
          🚀 Play Game
        </button>
      </div>
    );
  }

  // ✅ Otherwise, show the pitch game content
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-4">🎙️ Pitch Champion</h1>

      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="font-semibold mb-2">
          📝 <strong>How to write your pitch:</strong>
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>✅ State the problem clearly.</li>
          <li>✅ Explain your AI-powered solution.</li>
          <li>✅ List main benefits for users.</li>
          <li>✅ Mention the type of AI used.</li>
          <li>✅ Keep it around 1 minute (~150 words).</li>
        </ul>
      </div>

      {!submitted ? (
        <>
          <textarea
            className="w-full border p-3 rounded mb-4"
            rows={8}
            placeholder="Write your pitch here (~150 words)"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            disabled={loading}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={verifyPitchWithGemini}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              ✅ {loading ? "Verifying..." : "Get AI Verification"}
            </button>

            <button
              onClick={handlePlayAgain}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              🔁 Play Again
            </button>

            <button
              onClick={handleSubmit}
              disabled={verified === null}
              className={`px-4 py-2 rounded ${verified === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              🎉 Submit Pitch
            </button>
          </div>

          {aiFeedback && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">🤖 AI Feedback:</h3>
              <p>{aiFeedback}</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          {verified ? (
            <>
              <h2 className="text-2xl font-bold mb-2">
                🏅 Badge Earned: Pitch Pro
              </h2>
              <img
                src="https://media.tenor.com/yoQyYCpkKvUAAAA1/ultra-pro.webp"
                alt="Success Badge"
                className="mx-auto mb-4 rounded"
              />
              <p className="font-semibold text-green-700">
                Fantastic pitch! 🎉
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-red-600">
                🚫 Try Again!
              </h2>
              <img
                src="https://media.tenor.com/j9zCqy6jPGAAAAA1/last-chance-one-last-chance.webp"
                alt="Try Again"
                className="mx-auto mb-4 rounded"
              />
              <p className="font-semibold text-red-700">
                You can pitch much better — tweak your pitch and try again!
              </p>
            </>
          )}
          <button
            onClick={handleTryAgain}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PitchChampion;
