import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const VisionBuilderGame = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [screen, setScreen] = useState("intro");
  const [vision, setVision] = useState("");
  const [goal1, setGoal1] = useState("");
  const [goal2, setGoal2] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [warning, setWarning] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const resetAll = () => {
    setScreen("intro");
    setVision("");
    setGoal1("");
    setGoal2("");
    setSelectedOption("");
    setVerifyMessage("");
    setSubmitted(false);
    setIsCorrect(false);
    setWarning("");
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (screen === "result" && isCorrect) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [screen, isCorrect]);

  useEffect(() => {
    if (screen === "result") {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "foresight",
        score: isCorrect ? 10 : 4, // or adjust as per scale
        accuracy: isCorrect ? 100 : 40,
        avgResponseTimeSec: parseFloat((totalTimeMs / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: isCorrect,

      });
      setStartTime(Date.now());
      if (isCorrect) {
        completeLeadershipChallenge(0, 1); // correct challenge/task IDs
      }
    }
  }, [screen, isCorrect]);


  const verifyActionWithGemini = async (text) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You're a helpful and encouraging teacher for students in Class 6–8.

A student shared their vision and two SMART goals:

🌟 Vision: "${vision}"  
🎯 Goal 1: "${goal1}"  
🎯 Goal 2: "${goal2}"

Please check:

1. Is the vision clear and positive?  
2. Are both goals SMART (Specific, Measurable, Achievable, Relevant, Time-bound)?  
3. Can the student actually do these goals themselves?

🎓 Your reply must be short and in this style:

- If everything is good:  
"Awesome job! 🎉 Your vision and goals are SMART and inspiring. Keep going! 💪"

- If something needs improvement:  
Start with: "Try again! 🤔"  
Then give a short hint for what to fix. For example:  
• "Make your vision more specific and positive."  
• "Goal 1 needs a number or time frame."  
• "Goal 2 feels too broad — try something realistic and doable."

Give at most **2 hints**, in short sentences. Use emojis and keep it encouraging! Never write more than 2 lines.`,
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
      const geminiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setVerifyMessage(geminiReply.trim());
    } catch (error) {
      setVerifyMessage("⚠️ Oops! Something went wrong. Try again later.");
    }
  };

  const handleSubmit = () => {
    if (!vision || !goal1 || !goal2 || !selectedOption || !verifyMessage) {
      setWarning(
        "⚠️ Please fill in all fields and verify with Gemini before submitting."
      );
      return;
    }
    setWarning("");
    const correctMCQ = selectedOption === "B";
    const isPositive = verifyMessage.toLowerCase().includes("good job");

    setIsCorrect(correctMCQ && isPositive);
    setSubmitted(true);
    setScreen("result");
  };

  const handleTryAgain = () => {
    setVision("");
    setGoal1("");
    setGoal2("");
    setSelectedOption("");
    setSubmitted(false);
    setWarning("");
  };

  if (screen === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 to-indigo-100 text-center space-y-6">
        <img
          src="https://media.tenor.com/TFpua-j2V8YAAAAm/my-pleasure-youre-welcome.webp"
          alt="Intro"
          className="w-72 rounded-xl shadow-lg"
        />
        <h1 className="text-3xl font-bold text-blue-700">
          🔭 Vision Builder Quest
        </h1>
        <p className="text-lg text-gray-700 max-w-lg">
          In this journey, you'll become a visionary thinker 🌟. Set your SMART
          goals 🎯, craft a clear vision 👁️, and test your leadership mindset.
          Ready to play? 🎮
        </p>
        <button
          onClick={() => setScreen("game")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Play Game 🚀
        </button>
      </div>
    );
  }

  if (screen === "result") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center space-y-6 p-6">
        {isCorrect ? (
          <>
            <img
              src="https://media.tenor.com/-8Uay6X3E3UAAAA1/gil-cat.webp"
              alt="Success"
              className="w-72 rounded-xl"
            />
            <h2 className="text-2xl font-bold text-green-600">
              🏅 Badge Earned: Visionary Thinker!
            </h2>
            <p className="text-xl">🎉 Great job! You nailed it!</p>
          </>
        ) : (
          <>
            <img
              src="https://media.tenor.com/WJc7Lbp02EYAAAAm/watch-it-aaron-carter.webp"
              alt="Try Again"
              className="w-72 rounded-xl"
            />
            <p className="text-xl text-red-600">
              ❌ Some parts need improvement. Try again!
            </p>
          </>
        )}
        <button
          onClick={resetAll}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Play Again 🔁
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Build Your Vision & Goals
      </h2>
      <input
        type="text"
        placeholder="My Vision"
        className="w-full p-3 border rounded-lg"
        value={vision}
        onChange={(e) => setVision(e.target.value)}
      />
      <input
        type="text"
        placeholder="SMART Goal 1"
        className="w-full p-3 border rounded-lg"
        value={goal1}
        onChange={(e) => setGoal1(e.target.value)}
      />
      <input
        type="text"
        placeholder="SMART Goal 2"
        className="w-full p-3 border rounded-lg"
        value={goal2}
        onChange={(e) => setGoal2(e.target.value)}
      />

      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            verifyActionWithGemini(`${vision}. ${goal1}. ${goal2}`)
          }
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Verify ✨
        </button>
        {verifyMessage && !verifyMessage.toLowerCase().includes("good job") && (
          <button
            onClick={handleTryAgain}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Try Again 🔄
          </button>
        )}
      </div>

      {verifyMessage && (
        <div className="bg-gray-100 p-4 rounded text-sm border border-gray-300 whitespace-pre-wrap">
          {verifyMessage}
        </div>
      )}

      <div>
        <h3 className="font-semibold text-lg">Quiz Time 🧠</h3>
        <p className="mb-2">Which goal is SMART?</p>
        {["A", "B", "C", "D"].map((opt) => {
          const options = {
            A: "Become famous",
            B: "Score better in maths next year",
            C: "Be best student ever",
            D: "Do good things",
          };
          return (
            <label
              key={opt}
              className="block border p-3 rounded-lg cursor-pointer mt-1"
            >
              <input
                type="radio"
                name="smartGoal"
                value={opt}
                className="mr-2"
                checked={selectedOption === opt}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {options[opt]}
            </label>
          );
        })}
      </div>

      {warning && (
        <p className="text-red-600 text-sm font-semibold">{warning}</p>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit ✅
      </button>
    </div>
  );
};

export default VisionBuilderGame;
