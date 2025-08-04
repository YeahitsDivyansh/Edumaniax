import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const InnovationSprint = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1); // -1: intro, 0: form, 1: result
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [idea, setIdea] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const startGame = () => setStep(0);

  const resetForm = () => {
    setWhat("");
    setWhy("");
    setIdea("");
    setVerifyMessage("");
    setIsApproved(false);
    setStep(0);
  };

  const resetGame = () => {
    setWhat("");
    setWhy("");
    setIdea("");
    setVerifyMessage("");
    setIsApproved(false);
    setLoading(false);
    setStep(-1);
    setStartTime(Date.now());
  };

  const verifyWithGemini = async () => {
    if (!what.trim() || !why.trim() || !idea.trim()) {
      alert("Please fill out all fields.");
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
              text: `Hey Gemini 👋! You are a friendly teacher for kids in Class 6–8.
    
    A student wants to improve their school or neighborhood:
    🏫 What needs to change: "${what}"
    ❓ Why it's important: "${why}"
    💡 Their new idea: "${idea}"
    
    Please check:
    ✅ Is the idea simple and clear for their age?
    ✅ Can they test or try it soon?
    ✅ Will it help other people too?
    
    👉 Use easy words and short sentences. Give supportive feedback in 1-2 lines:
    - If it's good, say: "✨ Awesome! ..." and tell why it's a great idea.
    - If it needs work, say: "🧐 Needs a little tweak: ..." and explain what to fix.
    
    Use friendly emojis to make them feel proud! 🎉
    `,
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
        setVerifyMessage(
          "⚠️ Gemini could not verify right now. Please try again."
        );
        setLoading(false);
        return;
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      setVerifyMessage(reply);
      setIsApproved(
        reply.toLowerCase().includes("good job") ||
        reply.toLowerCase().includes("awesome")
      );
      setStep(1);

      if (
        reply.toLowerCase().includes("good job") ||
        reply.toLowerCase().includes("awesome")
      ) {
        setIsApproved(true);

        const totalTimeMs = Date.now() - startTime;

        updatePerformance({
          moduleName: "Leadership",
          topicName: "innovativeLeader",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: parseFloat((totalTimeMs / 1000).toFixed(2)),
          studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
          completed: true,

        });
        setStartTime(Date.now());

        completeLeadershipChallenge(3, 0); // Replace with your actual challenge and task ID
        // ✅ Trigger confetti immediately:
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          emojis: ["🎉", "✨", "🌟"],
        });
      }
    } catch (error) {
      console.error(error);
      setVerifyMessage("⚠️ Oops! Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-4">
      {step === -1 && (
        <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">⚡ Innovation Sprint</h1>
          <img
            src="https://media.tenor.com/V2qHy6Yhjj8AAAA1/lets-go-business.webp"
            alt="Intro"
            className="mx-auto mb-4 rounded"
          />
          <p className="text-gray-700 mb-4">
            Welcome to the Innovation Sprint!
            <br />
            📌 Think of one change to improve your school or neighborhood.
            <br />
            🗂️ Fill in what needs to change, why, and your new idea.
            <br />
            ✅ Check your idea with the Innovation Checklist.
            <br />
            🎓 Get feedback and earn your ⚡ Change Maker badge!
          </p>
          <button
            onClick={startGame}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded transition"
          >
            Start Sprint
          </button>
        </div>
      )}

      {step === 0 && (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">💡 Your Change Idea</h2>
          <div className="mb-2 text-left">
            <label className="block font-semibold">What needs to change?</label>
            <input
              type="text"
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 mb-2"
            />
          </div>
          <div className="mb-2 text-left">
            <label className="block font-semibold">Why is it important?</label>
            <input
              type="text"
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 mb-2"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block font-semibold">
              What is your new idea?
            </label>
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 mb-2"
            />
          </div>

          <div className="bg-yellow-100 p-4 rounded mb-4 text-left">
            <h3 className="font-bold mb-2">✅ Innovation Checklist:</h3>
            <ul className="list-disc list-inside">
              <li>Is it simple?</li>
              <li>Can you test it?</li>
              <li>Will it help others?</li>
            </ul>
          </div>

          <button
            onClick={verifyWithGemini}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check My Idea"}
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">✨ Gemini Feedback</h2>
          <p className="mb-4 whitespace-pre-wrap">{verifyMessage}</p>
          {isApproved ? (
            <>
              <img
                src="https://media.tenor.com/918EwUygx1IAAAA1/mission-impossible-we-got-this.webp"
                alt="Success"
                className="mx-auto mb-4 rounded"
              />
              <p className="text-xl mb-4">
                Congrats! You earned the ⚡ Change Maker badge!
              </p>
              <button
                onClick={resetGame}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded transition"
              >
                Play Again
              </button>
            </>
          ) : (
            <>
              <img
                src="https://media.tenor.com/DCI2uoqFUvEAAAA1/the-office-the.webp"
                alt="Try Again"
                className="mx-auto mb-4 rounded"
              />
              <p className="text-lg mb-4">
                Oops! Try improving your idea and check again.
              </p>
              <button
                onClick={resetForm}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded transition mr-2"
              >
                Try Again
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded transition"
              >
                Back to Intro
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InnovationSprint;
