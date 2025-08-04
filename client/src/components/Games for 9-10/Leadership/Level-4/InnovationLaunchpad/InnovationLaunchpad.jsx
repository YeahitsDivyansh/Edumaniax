import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const InnovationLaunchpad = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState("intro");
  const [idea, setIdea] = useState("");
  const [pilot, setPilot] = useState("");
  const [pitch, setPitch] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [reviewing, setReviewing] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const startConfetti = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
  };

  const resetFields = () => {
    setIdea("");
    setPilot("");
    setPitch("");
    setVerifyMessage("");
    setStep("game");
    setStartTime(Date.now());

  };

  const extractScores = (text) => {
    const scores = { innovation: 0, impact: 0, feasibility: 0 };
    const match = text.match(/Innovation:\s*(\d+)\/(\d+)/i);
    if (match) scores.innovation = parseInt(match[1]);
    const match2 = text.match(/Impact:\s*(\d+)\/(\d+)/i);
    if (match2) scores.impact = parseInt(match2[1]);
    const match3 = text.match(/Feasibility:\s*(\d+)\/(\d+)/i);
    if (match3) scores.feasibility = parseInt(match3[1]);
    return scores;
  };

  const verifyActionWithGemini = async () => {
    setReviewing(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a cool high school mentor for teens in Class 9–10. 
A student shared their innovation project:

💡 Idea: "${idea}"
📅 Pilot Plan: "${pilot}"
🎤 Pitch: "${pitch}"

✅ Check if:
1️⃣ The idea is specific & creative.
2️⃣ The pilot plan is doable with timeline & metrics.
3️⃣ The pitch feels confident and realistic.

🎯 Now give feedback using emojis and fun Gen-Z language, in max 2 short paragraphs:
- If it's dope, say: "Awesome job!" and explain why it's 🔥.
- If not, say: "Hmm... needs a glow-up!" and give some quick, chill advice to fix it.

Then rate the following out of 10:
Innovation: ?/10
Impact: ?/10
Feasibility: ?/10

Keep it upbeat and encouraging, like you're hyping up your junior!`,
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
        return;
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setVerifyMessage(reply);

      const scores = extractScores(reply);
      const total = scores.innovation + scores.impact + scores.feasibility;

      // ⏱️ Time + performance tracking
      const totalTimeMs = Date.now() - startTime;
      const avgResponseTimeSec = parseFloat((totalTimeMs / 1000 / 3).toFixed(2));
      const studyTimeMinutes = parseFloat((totalTimeMs / 60000).toFixed(2));
      const accuracy = Math.round((total / 30) * 100);
      const completed = total >= 24;

      // Update performance
      updatePerformance({
        moduleName: "Leadership",
        topicName: "innovativeLeader",
        score: total,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes,
        completed,

      });
      setStartTime(Date.now());

      if (completed) {
        completeLeadershipChallenge(3, 1); // ✅ Marks the challenge as completed
        setStep("success");
        startConfetti();
      } else {
        setStep("feedback");
      }
    } catch (error) {
      setVerifyMessage("⚠️ Oops! Something went wrong. Try again later.");
    } finally {
      setReviewing(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center space-y-6">
      {step === "intro" && (
        <div>
          <h1 className="text-3xl font-bold mb-4">⚡ Innovation Launchpad</h1>
          <p className="mb-2 text-lg">Welcome, future change leader! 🚀</p>
          <p className="mb-4">
            You'll pick a school problem, design a cool idea, plan your pilot,
            and pitch it to AI reviewers. Ready?
          </p>
          <img
            src="https://media.tenor.com/zpqt3I6xILQAAAA1/good-to-see-you-marques-brownlee.webp"
            alt="intro gif"
            className="mx-auto rounded-xl mb-4"
          />
          <button
            onClick={() => setStep("game")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            🎮 Play Game
          </button>
        </div>
      )}

      {step === "game" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🎯 Build Your Change Plan</h2>
          <textarea
            className="w-full p-3 border rounded h-28"
            placeholder="💡 Your Idea (e.g., fix school waste problem...)"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded h-28"
            placeholder="📅 Pilot Plan (timeline + how you’ll test it...)"
            value={pilot}
            onChange={(e) => setPilot(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded h-28"
            placeholder="🎤 Pitch to School Board (what will you say?)"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
          />
          <button
            onClick={verifyActionWithGemini}
            disabled={reviewing}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🤖 AI Reviewer
          </button>
        </div>
      )}

      {step === "feedback" && (
        <div>
          <h2 className="text-xl font-bold text-yellow-600">📝 AI Feedback</h2>
          <p className="whitespace-pre-line mt-4 mb-6">{verifyMessage}</p>
          <button
            onClick={resetFields}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            🔁 Try Again
          </button>
        </div>
      )}

      {step === "success" && (
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            🌟 You did it!
          </h2>
          <img
            src="https://media.tenor.com/eQeH0MYbdOwAAAA1/marvelous-crowley.webp"
            alt="Success Gif"
            className="mx-auto rounded-xl mb-4"
          />
          <p className="whitespace-pre-line mb-4">{verifyMessage}</p>
          <p className="text-xl font-semibold mb-4">
            🎉 Badge Earned: ⚡ Change Pioneer
          </p>
          <button
            onClick={() => setStep("intro")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default InnovationLaunchpad;
