import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const EmpathyRadarGame = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedbackGif, setFeedbackGif] = useState(null);
  const [reflection, setReflection] = useState("");
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(false);
  const [geminiSuggestion, setGeminiSuggestion] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const { width, height } = useWindowSize();
  //for performance 
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (step === questions.length) {
      const totalTimeMs = Date.now() - startTime;
      updatePerformance({
        moduleName: "Leadership",
        topicName: "understandableLeader",
        score: Math.round((score / questions.length) * 10),
        accuracy: parseFloat(((score / questions.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score >= 5,
       
      });
      setStartTime(Date.now());

      if (score >= 5) {
        completeLeadershipChallenge(1, 1);
      }
    }
  }, [step, score]);


  const questions = [
    {
      type: "mcq",
      title: "Q1",
      question:
        "Your friend lost a competition and is crying. What should you do?",
      gif: "https://media.tenor.com/8P1HZvPlJs8AAAA1/d9luxe-crying.webp",
      options: [
        { text: "Say 'You’ll win next time!'", correct: true },
        { text: "Laugh at them", correct: false },
        { text: "Say 'It’s not a big deal'", correct: false },
        { text: "Walk away", correct: false },
      ],
    },
    {
      type: "mcq",
      title: "Q2",
      question: "Emotional Intelligence means:",
      gif: "https://media.tenor.com/Vi9HWR_CFm0AAAA1/travis-bradberry-gyat.webp",
      options: [
        { text: "Controlling others", correct: false },
        { text: "Ignoring emotions", correct: false },
        { text: "Understanding and managing feelings", correct: true },
        { text: "Acting tough", correct: false },
      ],
    },
    {
      type: "mcq",
      title: "Q3",
      question:
        "A friend is nervous before a speech. What’s the best thing to say?",
      gif: "https://media.tenor.com/tDfXlJnVctgAAAA1/sweating-nervous.webp",
      options: [
        { text: "You always mess up", correct: false },
        { text: "You got this, I believe in you!", correct: true },
        { text: "Why are you scared?", correct: false },
        { text: "Good luck, you'll need it", correct: false },
      ],
    },
    {
      type: "mcq",
      title: "Q4",
      question: "Which is an empathetic response?",
      gif: "https://media.tenor.com/AjOCcX6OIXkAAAA1/hug-comforting.webp",
      options: [
        { text: "Ignore them until they calm down", correct: false },
        { text: "Tell them to stop crying", correct: false },
        { text: "Sit with them and listen", correct: true },
        { text: "Say it’s not a big deal", correct: false },
      ],
    },
    {
      type: "mcq",
      title: "Q5",
      question: "Your sibling is upset and yelling. What should you do?",
      gif: "https://media.tenor.com/6-VM2tRMfOIAAAA1/scream-loud-scream.webp",
      options: [
        { text: "Yell back louder", correct: false },
        { text: "Walk away and never talk", correct: false },
        { text: "Stay calm and ask what’s wrong", correct: true },
        { text: "Say they’re overreacting", correct: false },
      ],
    },
    {
      type: "short",
      title: "Q6 - Reflection",
      question:
        "Write one time you helped a friend or family member when they were upset.",
      gif: "https://media.tenor.com/6pPmw1C_BVsAAAA1/lenymayyy-emunene.webp",
    },
  ];

  const handleSelect = (isCorrect, index) => {
    if (selected !== null) return;
    setSelected(index);
    setFeedbackGif(
      isCorrect
        ? "https://media.tenor.com/0yfVXGJ5yC0AAAA1/youre-right-izzy.webp"
        : "https://media.tenor.com/VWfnTC41cGoAAAA1/totally-wrong-neil-degrasse-tyson.webp"
    );
    if (isCorrect) setScore((prev) => prev + 1);
    setTimeout(() => {
      setSelected(null);
      setFeedbackGif(null);
      setStep((prev) => prev + 1);
    }, 1500);
  };

  const handleGeminiCheck = async () => {
    if (!reflection.trim()) return;

    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a friendly teacher for students in Class 6–8.

A student wrote this empathy reflection: "${reflection}"

✅ Please check if it shows:
1️⃣ Understanding of another person’s feelings  
2️⃣ A kind or helpful response  
3️⃣ Clear and simple expression (for grade 6–8)

🎓 Then give feedback in **1–2 sentences**:
- If it's good, start with: "Good job! ..."
- If it needs work, start with: "Needs improvement: ..." and suggest how to make it better.

Keep your reply short, simple, and kind with emojis if possible.`,
            },
          ],
        },
      ],
    };

    setChecking(true);
    setGeminiSuggestion("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (reply.toLowerCase().includes("good job")) {
        setVerified(true);
        setFeedbackGif("valid");
        setScore((prev) => prev + 1);
      } else {
        setFeedbackGif("invalid");
        setGeminiSuggestion(reply);
        setAttemptsLeft((prev) => {
          const updated = prev - 1;
          if (updated <= 0) {
            setTimeout(() => {
              setStep((prevStep) => prevStep + 1);
            }, 2000);
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("Gemini error:", error);
      alert("⚠️ Oops! Something went wrong. Try again later.");
    } finally {
      setChecking(false);
    }
  };

  const getResult = () => {
    if (score >= 5) {
      return {
        gif: "https://media.tenor.com/l12Bey8sZe4AAAAm/g5-games-sherlock-hidden-cases.webp",
        message: "🎉 HeartSmart Leader badge earned!",
        confetti: true,
      };
    } else if (score === 4) {
      return {
        gif: "https://media.tenor.com/uiNqdxWAC-IAAAAm/that%27s-great-applause.webp",
        message: "😊 Great effort! Keep growing!",
        confetti: false,
      };
    } else if (score === 3) {
      return {
        gif: "https://media.tenor.com/O65Ydy-5nHwAAAA1/you-will-improve-rebecca.webp",
        message: "😐 Room to improve your empathy.",
        confetti: false,
      };
    } else {
      return {
        gif: "https://media.tenor.com/WxuAA6dHn5EAAAA1/poorperformance-dog.webp",
        message: "😅 Let's try again with more heart!",
        confetti: false,
      };
    }
  };

  const result = getResult();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative">
      {step === -1 ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-pink-600">💓 Empathy Radar</h1>
          <p className="text-gray-700 text-lg">
            Test your emotional intelligence by choosing the kindest, most
            thoughtful responses and reflecting on real moments where you showed
            empathy.
          </p>
          <img
            src="https://media.tenor.com/ZgKFauxbDUoAAAAm/welcome-squad.webp"
            alt="Intro"
            className="rounded-xl mx-auto max-h-64"
          />
          <button
            onClick={() => setStep(0)}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            🚀 Start Game
          </button>
        </div>
      ) : step < questions.length ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center space-y-4">
          <h2 className="text-xl font-semibold">{questions[step].title}</h2>
          <img
            src={questions[step].gif}
            alt="Scenario gif"
            className="rounded-xl mx-auto max-h-60"
          />
          <p className="text-gray-800">{questions[step].question}</p>

          {questions[step].type === "mcq" ? (
            <div className="space-y-3">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.correct, idx)}
                  className={`w-full py-2 px-4 rounded-lg border text-left transition-all
                    ${selected === null
                      ? "bg-white hover:bg-pink-100"
                      : idx === selected
                        ? opt.correct
                          ? "bg-green-100 border-green-500"
                          : "bg-red-100 border-red-500"
                        : "bg-white"
                    }`}
                >
                  {opt.text}
                </button>
              ))}
              {feedbackGif && (
                <img
                  src={feedbackGif}
                  alt="Feedback"
                  className="mx-auto max-h-40 mt-4"
                />
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                rows="4"
                className="w-full p-3 border rounded-lg"
                placeholder="Type your reflection here..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                disabled={verified}
              />
              {!verified && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleGeminiCheck}
                    disabled={checking}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {checking ? "Checking..." : "🤖 Verify"}
                  </button>
                  {feedbackGif === "invalid" && (
                    <button
                      onClick={() => {
                        setReflection("");
                        setFeedbackGif(null);
                        setGeminiSuggestion("");
                      }}
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                    >
                      🔁 Try Again
                    </button>
                  )}
                </div>
              )}

              {feedbackGif === "invalid" && (
                <div className="text-left space-y-2">
                  <p className="text-red-600">❌ {geminiSuggestion}</p>
                  <p className="text-sm text-gray-600">
                    {attemptsLeft > 0
                      ? `Attempts left: ${attemptsLeft}`
                      : "⚠️ Maximum attempts used. Moving to result..."}
                  </p>
                </div>
              )}

              {feedbackGif === "valid" && (
                <div className="text-green-700 bg-green-50 p-4 rounded-lg space-y-2 text-left">
                  <p>✅ Great job! You showed wonderful empathy! 🌟</p>
                  <p>
                    It's amazing that you remembered such a moment. Helping
                    others shows true kindness. 😊
                  </p>
                  <p>
                    Keep being that thoughtful friend or sibling. Small acts of
                    kindness make a big difference! 💖✨
                  </p>
                </div>
              )}

              {verified && (
                <button
                  onClick={() => setStep((prev) => prev + 1)}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
                >
                  ✅ Continue
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center space-y-4">
          {result.confetti && <Confetti width={width} height={height} />}
          <h2 className="text-2xl font-bold text-pink-600">
            Your Score: {score} / 6
          </h2>
          <p className="text-xl font-medium">{result.message}</p>
          <img
            src={result.gif}
            alt="Result"
            className="rounded-xl mx-auto max-h-64"
          />
          <button
            onClick={() => {
              setStep(-1);
              setScore(0);
              setReflection("");
              setVerified(false);
              setFeedbackGif(null);
              setGeminiSuggestion("");
              setAttemptsLeft(3);
              setStartTime(Date.now());
            }}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default EmpathyRadarGame;
