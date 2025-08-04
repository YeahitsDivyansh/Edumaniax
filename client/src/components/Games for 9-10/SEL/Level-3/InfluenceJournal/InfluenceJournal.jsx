import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const items = [
  {
    text: "Worry about global warming",
    correct: "Concern",
    gif: "https://media.tenor.com/aCdPm-RQ_8AAAAA1/world-on-fire-run.webp",
  },
  {
    text: "Homework deadlines",
    correct: "Influence",
    gif: "https://media.tenor.com/xATuBt2dRhwAAAA1/kitten-cat.webp",
  },
  {
    text: "Traffic jams",
    correct: "Concern",
    gif: "https://media.tenor.com/fAjanV-7qGQAAAA1/traffic-jam.webp",
  },
  {
    text: "Eating healthy meals",
    correct: "Influence",
    gif: "https://media.tenor.com/d6cdu2C8CNwAAAA1/brocoli-healty.webp",
  },
  {
    text: "Friend’s mood swings",
    correct: "Concern",
    gif: "https://media.tenor.com/AViMxqF6mYYAAAA1/lucky4kelly-skin-care-with-kelly.webp",
  },
];

const verifyActionWithGemini = async (
  text,
  setVerifyMessage,
  setSuggestionGif
) => {
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

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    setVerifyMessage(reply);
    if (reply.toLowerCase().startsWith("good job")) {
      setSuggestionGif(
        "https://media.tenor.com/423OVsbnHFcAAAA1/wow-viral-indian.webp"
      );
    } else {
      setSuggestionGif(
        "https://media.tenor.com/oJiog5pttmwAAAA1/chi-chi-chota-chi.webp"
      );
    }
  } catch (error) {
    console.error("Gemini error:", error);
    setVerifyMessage("⚠️ Oops! Something went wrong. Try again later.");
  }
};

const InfluenceJournal = () => {
  const { completeSELChallenge } = useSEL();
  const [step, setStep] = useState("intro");
  const [idx, setIdx] = useState(0);
  const [selections, setSelections] = useState({});
  const [score, setScore] = useState(0);
  const [action, setAction] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [suggestionGif, setSuggestionGif] = useState("");
  const [finalResult, setFinalResult] = useState(null);
  const [feedbackGif, setFeedbackGif] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const handleSelect = (choice) => {
    if (selections[idx] != null) return;
    const isCorrect = choice === items[idx].correct;
    setSelections({ ...selections, [idx]: choice });
    if (isCorrect) setScore(score + 1);
    const gif = isCorrect
      ? "https://media.tenor.com/j70awjXSLhsAAAA1/dr-zeuss-zeuss-world.webp"
      : "https://media.tenor.com/4y20jEYe9SIAAAAm/youre-wrong-chris-cantada.webp";
    setFeedbackGif(gif);
    setShowFeedback(true);
  };

  const finalize = () => {
    const passed = score >= 4 && verifyMessage.startsWith("Good job");

    const endTime = Date.now();
    const durationSec = Math.round((endTime - startTime) / 1000);
    const accuracy = Math.round((score / 5) * 100);
    const avgResponseTimeSec = durationSec / 5;
    const roundedScore = Math.round((score / 5) * 10);

    updatePerformance({
      moduleName: "SEL",
      topicName: "peerSupportNetworks",
      score: roundedScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes: Math.ceil(durationSec / 60),
      completed: passed,
       
    });
    setStartTime(Date.now());


    if (passed) {
      completeSELChallenge(2, 2);
      confetti({ spread: 120, particleCount: 200, origin: { y: 0.6 } });
      setFinalResult("win");
    } else {
      setFinalResult("lose");
    }

    setStep("result");
  };


  const reset = () => {
    setStep("intro");
    setIdx(0);
    setSelections({});
    setScore(0);
    setAction("");
    setVerifyMessage("");
    setSuggestionGif("");
    setFinalResult(null);
    setStartTime(Date.now());

  };

  const finalGif =
    finalResult === "win"
      ? "https://media.tenor.com/HJZ5aRpjiNgAAAAm/wonderful-faisal-khan.webp"
      : score === 3
        ? "https://media.tenor.com/oSisjPetzfoAAAA1/bayless-mister-bayless.webp"
        : "https://media.tenor.com/LwQz3a4KDtcAAAA1/thumbs-down-bad-job.webp";

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
      {step === "intro" && (
        <>
          <h1 className="text-3xl font-bold">
            What Will You Do With Your Power?
          </h1>
          <img
            src="https://media.tenor.com/BJ8uAA-Go-YAAAAm/i-hope-youre-having-a-great-day-today-jared-dines.webp"
            alt="Intro"
            className="mx-auto rounded-lg"
          />
          <p>
            Sort 5 worries into <strong>Influence</strong> or{" "}
            <strong>Concern</strong>. Then write a 1‑sentence action plan for
            something you CAN influence.
          </p>
          <Button onClick={() => setStep("play")}>Start Journal ✏️</Button>
        </>
      )}

      {step === "play" && (
        <>
          <img
            src={items[idx].gif}
            alt="context"
            className="mx-auto rounded-lg"
          />
          <h2 className="text-xl font-semibold">{items[idx].text}</h2>
          {!showFeedback ? (
            <div className="flex justify-center gap-4 mt-4">
              {["Influence", "Concern"].map((opt) => (
                <Button key={opt} onClick={() => handleSelect(opt)}>
                  {opt}
                </Button>
              ))}
            </div>
          ) : (
            <>
              <img
                src={feedbackGif}
                alt="feedback"
                className="mx-auto rounded-lg my-4"
              />
              <Button
                onClick={() => {
                  setShowFeedback(false);
                  setFeedbackGif("");
                  if (idx === items.length - 1) {
                    setStep("action");
                  } else {
                    setIdx(idx + 1);
                  }
                }}
              >
                Next ➡️
              </Button>
            </>
          )}
        </>
      )}

      {step === "action" && (
        <>
          <h2 className="text-xl font-semibold">
            Write your 1‑sentence action:
          </h2>
          <textarea
            rows={3}
            className="w-full border p-2 rounded"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
          <Button
            className="mt-2"
            onClick={() =>
              verifyActionWithGemini(action, setVerifyMessage, setSuggestionGif)
            }
          >
            Verify Action ✅
          </Button>

          {verifyMessage && (
            <>
              <p className="mt-4">{verifyMessage}</p>
              <img
                src={suggestionGif}
                alt="suggestion"
                className="mx-auto rounded-lg w-32"
              />
              <div className="mt-4 space-x-4">
                <Button onClick={() => setAction("")}>Try Again ✍️</Button>
                <Button onClick={finalize}>Finish 🚀</Button>
              </div>
            </>
          )}
        </>
      )}

      {step === "result" && (
        <>
          <img src={finalGif} alt="final" className="mx-auto rounded-lg" />
          <h2 className="text-2xl font-bold mt-4">
            You sorted {score} / 5 correctly.
          </h2>
          <p className="italic">Your action: “{action}”</p>
          <Button onClick={reset}>🔁 Play Again</Button>
        </>
      )}
    </div>
  );
};

export default InfluenceJournal;
