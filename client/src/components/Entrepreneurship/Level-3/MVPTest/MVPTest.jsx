import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const introGif =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGw5Y3ZmeG9qcXpreXo5NXN5czBnYnhvcGd1b3g5NXhqdHV0NzA4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZJ6r7T0GWbfdyXgVYs/200w.webp";
const championGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXdtNXMwa2lqNm15MWRkZTBibnJxYTdkZ2NqNWs4ajgwdDFtanVjbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xoHntNXFYkfzGAftEv/200w.webp";
const tryAgainGif =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmdleGF0ZWJvbGw5YXh1ZzFwbm1yY3VrYnprbWtqdGVxd282c2UyMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ji6zzUZwNIuLS/200.webp";

const MVPTest = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();

  const [step, setStep] = useState("intro");
  const { width, height } = useWindowSize();
  const [mockup, setMockup] = useState("");
  const [testPlan, setTestPlan] = useState("");
  const [simulatedFeedback, setSimulatedFeedback] = useState("");
  const [improvements, setImprovements] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (step === "result" && badgeEarned) {
      completeEntreprenerushipChallenge(2, 1); // Challenge 3, Task 5
    }
  }, [step, badgeEarned]);

  const startGame = () => {
    setStep("form");
    setFeedback("");
    setBadgeEarned(false);
  };

  const verifyWithGemini = async () => {
    if (!mockup.trim() || !testPlan.trim() || !improvements.trim()) {
      alert("Please fill in all fields before verifying!");
      return;
    }

    setLoading(true);
    setFeedback("");

    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `
  You're helping a middle school student (grade 6–8) who just finished an MVP Test Lab for their startup idea.
  
  Your job is to see if their work shows real thought, effort, and clear understanding. Focus **mainly** on the "Improvements" they suggested — are they meaningful, useful, and show they're learning from feedback?
  
  Also check:
  - Is the **Test Plan** realistic and makes sense?
  - Is the **Mockup** creative and thoughtful (even if simple)?
  
  Speak to the student in a friendly way using fun emojis! 🎉👍
  
  Examples:
  ✅ If their improvements are meaningful and realistic, say something like: 
  "Great job! These improvements show you're thinking like a real innovator! 🚀"
  
  ❌ If the improvements are vague or missing, say:
  "You're getting there! Try making your improvements more specific so we can see your genius at work! 🧠💡"
  
  Give short, friendly advice — this is a learning moment!
  
  Here's the student's MVP Test Lab:
  
  Mockup:
  ${mockup}
  
  Test Plan:
  ${testPlan}
  
  Improvements:
  ${improvements}
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

  const simulateFeedback = async () => {
    if (!mockup.trim() || !testPlan.trim()) {
      alert(
        "👀 First write your mockup and test plan before checking feedback!"
      );
      return;
    }

    setLoadingFeedback(true);
    setSimulatedFeedback("");

    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `
    You're a friendly kid product tester 🎮🧠
  
    A student has created a fun new idea and wants to test it.
    Here's what they made:
  
    ✏️ Mockup:
    ${mockup}
  
    🧪 Test Plan:
    ${testPlan}
  
    👉 Pretend you are a kid trying this out. 
    Write 2–3 short, real-sounding things a kid might say after trying it. 
    Use emojis and simple words (like "cool", "boring", "fun").
  
    Then, gently give a hint for how the idea could be even better 💡.
    Example: "Maybe add pictures?" or "Can I pick different pets?"
  
    Keep it fun, short, and helpful ✨🎉
    `;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      const data = await response.json();
      const feedbackText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setSimulatedFeedback(feedbackText || "No feedback received. Try again!");
    } catch (error) {
      console.error(error);
      setSimulatedFeedback(
        "⚠️ Oops! Something went wrong while getting feedback."
      );
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleTryAgain = () => {
    setMockup("");
    setTestPlan("");
    setSimulatedFeedback("");
    setImprovements("");
  };

  const handlePlayAgain = () => {
    setStep("intro");
    setMockup("");
    setTestPlan("");
    setSimulatedFeedback("");
    setImprovements("");
    setFeedback("");
    setBadgeEarned(false);
     setStartTime(Date.now());
  };

  const handleSubmit = () => {
    const lower = feedback.toLowerCase();
    if (
      lower.includes("good") ||
      lower.includes("great") ||
      lower.includes("well done") ||
      lower.includes("acceptable") ||
      lower.includes("realistic")
    ) {
      setBadgeEarned(true);
    }
    setStep("result");

    // ⬇️ Performance update logic
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

  useEffect(() => {
    if (step === "result" && badgeEarned) {
      setShowConfetti(true);
    }
  }, [step, badgeEarned]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center justify-center p-6">
      {step === "intro" && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🧪 MVP Test Lab</h1>
          <p className="mb-4 text-lg">
            Mission: Simulate your product idea, test it, and improve it wisely.
            Fill out your mockup, test plan, feedback, and improvements. Then
            verify with Gemini and earn your badge!
          </p>
          <img
            src={introGif}
            alt="Let's Start"
            className="w-60 mx-auto mb-6 rounded-xl shadow-lg"
          />
          <button
            onClick={startGame}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {step === "form" && (
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            ✏️ Fill in your MVP Test Lab
          </h2>

          <label className="block mb-2 font-medium">Mockup Description:</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="3"
            value={mockup}
            onChange={(e) => setMockup(e.target.value)}
            placeholder="E.g. A simple sketch showing the main screen and buttons..."
          />

          <label className="block mb-2 font-medium">Test Plan:</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="2"
            value={testPlan}
            onChange={(e) => setTestPlan(e.target.value)}
            placeholder="E.g. Ask 5 users if they understand how to use it..."
          />

          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={simulateFeedback}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition w-fit"
              disabled={loadingFeedback}
            >
              {loadingFeedback
                ? "Simulating..."
                : "Generate Simulated Feedback"}
            </button>

            {simulatedFeedback && (
              <div className="mt-2 p-3 bg-gray-100 border rounded">
                <p className="whitespace-pre-wrap">{simulatedFeedback}</p>
              </div>
            )}
          </div>

          <label className="block mb-2 font-medium">3 Improvements:</label>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows="2"
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="E.g. 1) Simplify homepage, 2) Add clear CTA, 3) Improve colors..."
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
        <div className="text-center relative">
          {badgeEarned && showConfetti && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </div>
          )}

          {badgeEarned ? (
            <>
              <h2 className="text-3xl font-bold mb-4">
                🎖 Badge Earned: MVP Strategist
              </h2>
              <p className="text-lg mb-4">
                Great work! Your MVP is clear and test-ready. You're officially
                an MVP Strategist!
              </p>
              <img
                src={championGif}
                alt="Champion Badge"
                className="w-60 mx-auto mb-6 rounded-xl shadow-lg"
              />
              {/* Additional celebration text + gif */}
              <p className="text-xl font-semibold leading-relaxed max-w-2xl mx-auto mb-4">
                Congratulations, Young AI Entrepreneur!
                <br />
                You did it! You’ve completed the AI + Entrepreneurship Master
                Module — an incredible journey of creativity, innovation, and
                impact. <br />
                <br />
                You’ve learned how to:
                <br />
                👀 Spot real-life problems
                <br />
                💡 Design smart, AI-powered solutions
                <br />
                🔧 Build prototypes and get feedback
                <br />
                ⚖️ Think ethically and act responsibly
                <br />
                🎤 Pitch your ideas with passion and confidence
                <br />
                <br />
                This is just the beginning of your journey as a future
                innovator, creator, and changemaker. 🌟
                <br />
                🏅 You’re now a Certified Young AI Entrepreneur!
              </p>
              <img
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG83Z3c4aWE2bXZoZnV6NTBkYm84dzVyNWw4eXZ5Zm5zdHJ6bWpiYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Jir7AUookJHIVb5aYM/100.webp"
                alt="Celebration"
                className="w-48 mx-auto mb-6"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">😅 Not There Yet</h2>
              <p className="text-lg mb-4">
                No worries! Review Gemini’s tips and try again. Keep iterating
                💪✨
              </p>
              <img
                src={tryAgainGif}
                alt="Try Again"
                className="w-60 mx-auto mb-6 rounded-xl shadow-lg"
              />
            </>
          )}

          <button
            onClick={() => {
              handlePlayAgain();
              setShowConfetti(false); // hide confetti only when play again is clicked
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MVPTest;
