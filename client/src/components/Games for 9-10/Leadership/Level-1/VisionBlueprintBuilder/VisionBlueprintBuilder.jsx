import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const VisionBlueprintBuilder = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1);
  const [vision, setVision] = useState({ want: "", care: "", help: "" });
  const [smartGoals, setSmartGoals] = useState(["", ""]);
  const [stretchGoal, setStretchGoal] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { width, height } = useWindowSize();
  const [isSuccess, setIsSuccess] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (submitted && isSuccess) {
      completeLeadershipChallenge(0, 1);
    }
  }, [submitted, isSuccess]);

  useEffect(() => {
    if (!submitted) return;

    const totalTimeMs = Date.now() - startTime;

    const totalSteps = 2; // Step 0: Vision + Step 1: SMART+ER goals
    const score = isSuccess ? 10 : 5; // Full score if verified successful, else half
    const accuracy = score * 10;

    updatePerformance({
      moduleName: "Leadership",
      topicName: "foresight",
      score, // out of 10
      accuracy, // out of 100
      avgResponseTimeSec: parseFloat((totalTimeMs / (totalSteps * 1000)).toFixed(2)),
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: isSuccess,
      
    });
    setStartTime(Date.now());

  }, [submitted, isSuccess]);


  const handleVerify = async () => {
    const text = `SMART Goals: ${smartGoals.join(
      " | "
    )}. Stretch Goal: ${stretchGoal}`;

    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You're a cool Gen-Z friendly teacher helping students in grades 9–10. Your job is to review their goals and give feedback in a chill, friendly, emoji-filled tone.

Here are the goals to review:

SMART Goals: ${smartGoals.join(" | ")}  
Stretch Goal: ${stretchGoal}

💭 Review Checklist:
- Are the goals *specific*, *realistic*, and *clear*?
- Can the student actually do them on their own?
- Do they follow SMART or SMART+ER structure?

✍️ Your Response Rules:
- Write exactly 3 short and fun paragraphs
- Use Gen Z language (no boring teacher talk)
- Include emojis, hype words, or slang to keep it fun
- End your message with ONLY one of these lines:
  → status: success  
  → status: needs improvement

Let’s keep it simple, cool, and motivating! 😎`,
            },
          ],
        },
      ],
    };

    setVerifying(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      const message =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Couldn't fetch review. Try again!";
      setVerifyMessage(message);

      // ✅ Check Gemini's status line
      const statusLine = message
        .split("\n")
        .find((line) => line.toLowerCase().includes("status:"));

      if (statusLine?.toLowerCase().includes("needs improvement")) {
        setIsSuccess(false);
      } else if (statusLine?.toLowerCase().includes("success")) {
        setIsSuccess(true);
      } else {
        setIsSuccess(null); // fallback
      }
    } catch (err) {
      setVerifyMessage("⚠️ Something went wrong. Please try again.");
      setIsSuccess(false);
    } finally {
      setVerifying(false);
    }
  };

  const resetTryAgain = () => {
    setSmartGoals(["", ""]);
    setStretchGoal("");
    // retain review
  };

  const fullReset = () => {
    setStep(-1);
    setVision({ want: "", care: "", help: "" });
    resetTryAgain();
    setVerifyMessage("");
    setSubmitted(false);
    setIsSuccess(null);
    setStartTime(Date.now());

  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-center space-y-6">
      {step === -1 && (
        <div>
          <h1 className="text-3xl font-bold">Vision Blueprint Builder 🔭</h1>
          <p className="mt-4">
            Turn your dreams into a plan! Let’s build your vision & goals like a
            true visionary leader.
          </p>
          <img
            src="https://media.tenor.com/JSHagaTy5tAAAAA1/buddy-whats-up.webp"
            alt="intro gif"
            className="w-64 mx-auto my-6 rounded-lg"
          />
          <button
            onClick={() => setStep(0)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Building
          </button>
        </div>
      )}

      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🎯 Vision Canvas</h2>
          <input
            type="text"
            placeholder="I want to..."
            className="w-full p-2 border rounded"
            value={vision.want}
            onChange={(e) => setVision({ ...vision, want: e.target.value })}
          />
          <input
            type="text"
            placeholder="Because I care about..."
            className="w-full p-2 border rounded"
            value={vision.care}
            onChange={(e) => setVision({ ...vision, care: e.target.value })}
          />
          <input
            type="text"
            placeholder="It will help others by..."
            className="w-full p-2 border rounded"
            value={vision.help}
            onChange={(e) => setVision({ ...vision, help: e.target.value })}
          />
          <button
            onClick={() => setStep(1)}
            disabled={
              !vision.want.trim() || !vision.care.trim() || !vision.help.trim()
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🚀 Set SMART+ER Goals</h2>
          {smartGoals.map((goal, i) => (
            <input
              key={i}
              type="text"
              placeholder={`SMART Goal ${i + 1}`}
              className="w-full p-2 border rounded"
              value={goal}
              onChange={(e) => {
                const updated = [...smartGoals];
                updated[i] = e.target.value;
                setSmartGoals(updated);
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Your stretch goal"
            className="w-full p-2 border rounded"
            value={stretchGoal}
            onChange={(e) => setStretchGoal(e.target.value)}
          />
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={handleVerify}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              disabled={verifying}
            >
              {verifying ? "Verifying..." : "✅ Verify Goals"}
            </button>
            <button
              onClick={resetTryAgain}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              🔁 Try Again
            </button>
            <button
              onClick={() => {
                setSubmitted(true);
                setStep(2);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={
                !smartGoals[0].trim() ||
                !smartGoals[1].trim() ||
                !stretchGoal.trim()
              }
            >
              🎉 Submit
            </button>
          </div>
          {verifyMessage && (
            <div className="mt-4 p-4 bg-blue-100 border rounded text-left whitespace-pre-line">
              <strong>Gemini's Feedback:</strong>
              <p>{verifyMessage}</p>
            </div>
          )}
        </div>
      )}

      {step === 2 && submitted && (
        <div className="space-y-4">
          {isSuccess ? <Confetti width={width} height={height} /> : null}
          <h2
            className={`text-2xl font-bold ${isSuccess ? "text-green-600" : "text-red-600"
              }`}
          >
            {isSuccess
              ? "🌟 Vision Architect Badge Earned!"
              : "❌ Goals Need More Clarity!"}
          </h2>
          <img
            src={
              isSuccess
                ? "https://media.tenor.com/hdAqwiMZ3-AAAAA1/elon-musk-trump%27s-inauguration.webp"
                : "https://media.tenor.com/Xl08_7ZhMgUAAAA1/julesk-crying.webp"
            }
            alt={isSuccess ? "success gif" : "fail gif"}
            className="w-64 mx-auto"
          />
          <p className="text-lg">
            {isSuccess
              ? "You just laid down a roadmap to your dreams 💪 Keep that energy up!"
              : "Oops! Your goals need a little more power ⚡. Check the feedback and try making them more focused and realistic!"}
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={fullReset}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔁 Play Again
            </button>

            <Link to="/conflict-simulator">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Move to Next Game
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionBlueprintBuilder;
