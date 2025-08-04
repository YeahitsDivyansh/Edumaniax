import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const thoughtsData = [
  {
    id: 1,
    text: "My exam score",
    correctCircle: "Concern",
    reason:
      "The score has already been given – you can’t change it now. You can learn from it, but the score itself is out of your hands.",
  },
  {
    id: 2,
    text: "Asking questions in class",
    correctCircle: "Influence",
    reason:
      "You can choose to raise your hand, clarify doubts, and participate. This is fully within your control.",
  },
  {
    id: 3,
    text: "What others think of me",
    correctCircle: "Concern",
    reason:
      "You can’t control people’s thoughts or opinions. You can only control your own actions.",
  },
  {
    id: 4,
    text: "Being kind today",
    correctCircle: "Influence",
    reason:
      "Kindness is a choice you make. You decide how you treat people every day.",
  },
  {
    id: 5,
    text: "Someone spreading gossip",
    correctCircle: "Concern",
    reason:
      "You can’t stop others from gossiping, but you can choose not to take part. Their actions aren’t in your control.",
  },
  {
    id: 6,
    text: "How I treat others",
    correctCircle: "Influence",
    reason:
      "This is 100% up to you. You control your behavior, attitude, and respect toward others.",
  },
  {
    id: 7,
    text: "How I spend my free time",
    correctCircle: "Influence",
    reason:
      "You can plan your day, choose activities, and build good habits – this is your power.",
  },
  {
    id: 8,
    text: "Who wins the school elections",
    correctCircle: "Concern",
    reason:
      "You can vote, but you can’t control who others vote for. The result is not in your hands.",
  },
  {
    id: 9,
    text: "If I try again after failing",
    correctCircle: "Influence",
    reason:
      "You always have the choice to try again, no matter how hard things are. This mindset is in your hands.",
  },
];

const MyCircleMission = () => {
  const { completeSELChallenge } = useSEL();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [actionText, setActionText] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  // Instead of useWindowSize, use:
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: document.body.scrollHeight, // key point
  });
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: document.body.scrollHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const correctCount = thoughtsData.filter(
    (t) => answers[t.id] === t.correctCircle
  ).length;

  const isWin = correctCount >= 7 && actionText.trim().length > 10;

  useEffect(() => {
    if (showResult && isWin) {
      completeSELChallenge(2, 2); // Adjust challenge ID and task ID as needed
    }
  }, [showResult, isWin, completeSELChallenge]);

  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);
      const accuracy = Math.round((correctCount / thoughtsData.length) * 100);
      const score = isWin ? 10 : accuracy >= 50 ? 5 : 2;

      updatePerformance({
        moduleName: "SEL",
        topicName: "peerSupportNetworks",
        score,
        accuracy,
        avgResponseTimeSec: totalSeconds / thoughtsData.length,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: isWin,

      });
      setStartTime(Date.now());

    }
  }, [showResult]);


  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    setActionText("");
    setVerifyMessage("");
    setStartTime(Date.now());

  };

  const verifyActionWithGemini = async (text) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a friendly teacher for students in Class 6–8. 
    
    A student wrote this action plan: "${text}"
    
    ✅ Please check if it meets all these:
    1️⃣ Is the action clear and specific?  
    2️⃣ Is it realistic and achievable today?  
    3️⃣ Does it show they are focusing on something they can control (Circle of Influence)?
    
    🎓 Then give simple feedback in **1-2 sentences**, using easy words a middle schooler understands:
    - If it's good, say: "Good job! ..." and explain why it's good.
    - If it needs changes, say: "Needs improvement: ..." and explain how to make it clearer or more realistic.
    
    Keep your answer short and supportive!`,
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
        console.error("API error:", response.status, response.statusText);
        setVerifyMessage(
          "⚠️ Gemini could not verify right now. Please try again."
        );
        return;
      }

      const data = await response.json();
      const geminiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setVerifyMessage(geminiReply);
    } catch (error) {
      console.error("Error:", error);
      setVerifyMessage("⚠️ Oops! Something went wrong. Try again later.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Circle Mission</h1>
      <p className="mb-4">
        🧠 <strong>Instructions:</strong> Every day brings new worries and new
        powers. For each thought, choose whether it belongs in your Circle of
        Influence or Circle of Concern. Then write an action you’ll take using
        something in your influence.
      </p>

      {thoughtsData.map((thought) => (
        <div key={thought.id} className="mb-4 p-4 border rounded">
          <p className="font-semibold">{thought.text}</p>
          <div className="mt-2">
            <label className="mr-4">
              <input
                type="radio"
                name={`q-${thought.id}`}
                checked={answers[thought.id] === "Influence"}
                onChange={() =>
                  setAnswers({ ...answers, [thought.id]: "Influence" })
                }
              />{" "}
              Influence
            </label>
            <label>
              <input
                type="radio"
                name={`q-${thought.id}`}
                checked={answers[thought.id] === "Concern"}
                onChange={() =>
                  setAnswers({ ...answers, [thought.id]: "Concern" })
                }
              />{" "}
              Concern
            </label>
          </div>
        </div>
      ))}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">✍️ Your Action Plan</h2>
        <p className="mb-2">
          Write 1 action you’ll take today using something in your influence. Be
          specific!
        </p>
        <p className="mb-4 italic">
          Example: “I will spend 30 minutes this evening practicing math
          problems instead of watching videos, because I want to improve for the
          next test. That’s something I can fully control.”
        </p>
        <textarea
          className="w-full border p-2"
          rows="4"
          value={actionText}
          onChange={(e) => setActionText(e.target.value)}
          placeholder="Write your action here..."
        ></textarea>

        <button
          onClick={() => verifyActionWithGemini(actionText)}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Verify
        </button>

        {verifyMessage && (
          <div className="mt-4 p-4 border border-green-400 rounded bg-green-50 text-green-700">
            {verifyMessage}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowResult(true)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🎉 Submit & Check Result
      </button>

      {showResult && (
        <div className="mt-6 text-center">
          {isWin && (
            <Confetti width={windowSize.width} height={windowSize.height} />
          )}

          {(() => {
            let resultGif = "";
            let resultText = "";

            if (correctCount >= 8) {
              resultGif =
                "https://media.tenor.com/3LTjHZ7ldOUAAAAM/im-proud-of-you-dan-levy.gif";
              resultText =
                "You’re focusing on what YOU can control. That’s a superpower!";
            } else if (correctCount >= 7) {
              resultGif =
                "https://media.tenor.com/63RHIfCjLkEAAAAM/declan-rice-rice-rice-baby.gif";
              resultText =
                "Great job! You're getting really good at spotting what you can influence!";
            } else if (correctCount >= 4) {
              resultGif =
                "https://media.tenor.com/eMq9vlIRw8wAAAAM/beet-applause.gif";
              resultText =
                "Good effort! You’re learning. Keep practicing to master your Circle of Influence!";
            } else {
              resultGif =
                "https://media.tenor.com/yHxKn-mRllUAAAAM/gif-perms-flex-image-perms-flex.gif";
              resultText =
                "Hmm... Let’s try again! Focus on what you can change!";
            }

            return (
              <>
                <h2 className="text-2xl font-bold">{resultText}</h2>
                <img
                  src={resultGif}
                  alt="Result GIF"
                  className="mx-auto my-4 w-64 h-auto rounded shadow-lg"
                />
                <p className="mt-2">Correct: {correctCount} / 9</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Play Again
                </button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default MyCircleMission;
