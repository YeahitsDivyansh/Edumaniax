import React, { useEffect, useState } from "react";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const introGif =
  "https://media.tenor.com/-yxM2tVxRlkAAAA1/let%27s-start-lets-start.webp";
const championGif =
  "https://media.tenor.com/snvJMzdt8FkAAAA1/stickergiant-champion.webp";
const tryAgainGif =
  "https://media.tenor.com/BTeSyQlKLfwAAAA1/try-one-more-time-alex.webp";

const UserPersonaDetective = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();

  const [step, setStep] = useState("intro");
  const [persona, setPersona] = useState("");
  const [problem, setProblem] = useState("");
  const [journey, setJourney] = useState("");
  const [benefit, setBenefit] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [uplift, setUplift] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (step === "result" && badgeEarned) {
      completeEntreprenerushipChallenge(2, 0); // Challenge 1, Task 5
    }
  }, [step, badgeEarned]);

  const startGame = () => {
    setStep("form");
    setBadgeEarned(false);
    setUplift(false);
    setFeedback("");
  };

  const verifyWithGemini = async () => {
    if (
      !persona.trim() ||
      !problem.trim() ||
      !journey.trim() ||
      !benefit.trim()
    ) {
      alert("Please fill in all fields before submitting!");
      return;
    }

    setLoading(true);
    setFeedback("");

    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are a kind UX mentor for a student creating a user persona for an AI startup.

✅ Check:
1) Is the Persona realistic and clear?
2) Is the Problem clearly described?
3) Is the User Journey logical?
4) Is the Benefit meaningful?

✅ If GOOD:
Reply: "✅ Well done! 🎉 Everything is clear and realistic. Great work!"

✅ If NEEDS IMPROVEMENT:
Reply: "❌ Needs improvement: Make the persona more specific, clarify the problem, add journey details, and explain the benefit better. You got this! 💪"

✅ Keep it short (max 1 paragraph). Use simple words and emojis.

Persona: ${persona}
Problem: ${problem}
Journey: ${journey}
Benefit: ${benefit}
`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      const data = await response.json();
      const geminiFeedback = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setFeedback(geminiFeedback || "No feedback received.");
    } catch (error) {
      console.error(error);
      setFeedback("An error occurred while verifying.");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setPersona("");
    setProblem("");
    setJourney("");
    setBenefit("");
    // Keep feedback so they can see what to fix
  };

  const handlePlayAgain = () => {
    setStep("intro");
    setPersona("");
    setProblem("");
    setJourney("");
    setBenefit("");
    setFeedback("");
    setBadgeEarned(false);
    setUplift(false);
     setStartTime(Date.now());
  };

  const handleSubmit = () => {
    if (!feedback) {
      alert("Please verify with Gemini before submitting!");
      return;
    }

    const lower = feedback.toLowerCase();
    if (
      lower.includes("well done") ||
      lower.includes("good") ||
      lower.includes("great work") ||
      lower.includes("clear and realistic")
    ) {
      setBadgeEarned(true);
    } else {
      setUplift(true);
    }

    setStep("result");

    const endTime = Date.now();
    const timeTakenSec = (endTime - startTime) / 1000;
    const timeTakenMin = Math.round(timeTakenSec / 60);

    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "strategist",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: timeTakenMin,
      completed: true,
      
    });
     setStartTime(Date.now());
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
      {step === "intro" && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🔍 User Persona Detective</h1>
          <p className="mb-4 text-lg">
            Mission: Discover who your users really are and design with empathy.
            Fill out the persona, problem, journey, and benefits. Then, verify
            with Gemini and earn your badge!
          </p>
          <img
            src={introGif}
            alt="Let's Start"
            className="w-60 mx-auto mb-6 rounded-xl shadow-lg"
          />
          <button
            onClick={startGame}
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {step === "form" && (
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            📝 Fill in your User Persona
          </h2>

          <label className="block mb-2 font-medium">
            Primary User Persona:
          </label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="3"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            placeholder="E.g. 28-year-old marketing manager who struggles to find time for data analysis..."
          />

          <label className="block mb-2 font-medium">Key Problem:</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="2"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="E.g. Spends hours compiling reports manually..."
          />

          <label className="block mb-2 font-medium">User Journey:</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="3"
            value={journey}
            onChange={(e) => setJourney(e.target.value)}
            placeholder="E.g. Logs in, uploads data, AI generates insights, exports a report..."
          />

          <label className="block mb-2 font-medium">How Product Helps:</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="2"
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
            placeholder="E.g. Saves hours each week, more time for creative work..."
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={verifyWithGemini}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button
              onClick={handleTryAgain}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
            >
              Try Again
            </button>
            <button
              onClick={handlePlayAgain}
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Play Again
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>

          {feedback && (
            <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-300">
              <h3 className="font-semibold mb-2">✅ Gemini Feedback:</h3>
              <p className="whitespace-pre-wrap">{feedback}</p>
            </div>
          )}
        </div>
      )}

      {step === "result" && (
        <div className="text-center">
          {badgeEarned ? (
            <>
              <h2 className="text-3xl font-bold mb-4">
                🏆 Badge Earned: User Champion
              </h2>
              <p className="text-lg mb-4">
                Fantastic job! Your user persona is strong and ready to guide
                your design decisions. You're a true User Champion!
              </p>
              <img
                src={championGif}
                alt="Champion Badge"
                className="w-60 mx-auto mb-6 rounded-xl shadow-lg"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">😅 Not There Yet</h2>
              <p className="text-lg mb-4">
                Don't worry! Review Gemini's feedback and try again. You've got
                this 💪
              </p>
              <img
                src={tryAgainGif}
                alt="Try Again"
                className="w-60 mx-auto mb-6 rounded-xl shadow-lg"
              />
            </>
          )}
          <button
            onClick={handlePlayAgain}
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPersonaDetective;
