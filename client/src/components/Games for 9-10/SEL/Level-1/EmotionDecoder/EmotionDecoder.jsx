import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; 
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    question:
      "Your classmate suddenly snaps at you during group work, even though you didn’t say anything upsetting.",
    options: ["Angry", "Embarrassed", "Stressed", "Jealous"],
    correct: "Stressed",
    hint: "They might be overwhelmed with deadlines or group pressure.",
  },
  {
    question:
      "A friend who usually talks a lot becomes very quiet after seeing their test result.",
    options: ["Proud", "Disappointed", "Excited", "Curious"],
    correct: "Disappointed",
    hint: "Silence might indicate they expected better.",
  },
  {
    question:
      "Your teammate avoids eye contact after making a mistake in a match.",
    options: ["Embarrassed", "Angry", "Relieved", "Happy"],
    correct: "Embarrassed",
    hint: "Avoiding eye contact often signals shame or embarrassment.",
  },
  {
    question: "A classmate brags a lot after winning a small prize.",
    options: ["Insecure", "Joyful", "Arrogant", "Relaxed"],
    correct: "Insecure",
    hint: "Over-bragging can cover up feelings of insecurity.",
  },
  {
    question: "Your friend cancels plans but doesn’t explain why.",
    options: ["Anxious", "Tired", "Bored", "Excited"],
    correct: "Anxious",
    hint: "Cancelling without reason may reflect discomfort or anxiety.",
  },
];

const EmotionDecoder = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintTimer, setHintTimer] = useState(null);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedbackGif, setFeedbackGif] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());


  const handleHint = () => {
    setShowHint(true);
    const timer = setTimeout(() => setShowHint(false), 5000);
    setHintTimer(timer);
  };

  const handleNext = () => {
    setSelected(null);
    setInput("");
    setShowHint(false);
    setSubmitted(false);
    setVerifyMessage("");
    setChecking(false);
    setFeedbackGif("");
    if (hintTimer) clearTimeout(hintTimer);
    setCurrent((prev) => prev + 1);
  };

  const restartGame = () => {
    setShowIntro(true);
    setCurrent(0);
    setScore(0);
    setStartTime(Date.now());

  };

  const verifyWithGemini = async (text, chosen) => {
    setChecking(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `A middle school student got this situation: "${scenarios[current].question}".\nThey chose "${chosen}" and said: "${text}".\n\nTell them in 1–2 easy sentences (with emojis!) if their choice and explanation make sense.\nIf good, say: "✅ Good job! ..."\nIf not, say: "❌ Needs work: ...".`,
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
        setVerifyMessage("⚠️ Gemini API issue. Try again.");
        setChecking(false);
        return;
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setVerifyMessage(reply);
      setSubmitted(true);

      setSubmitted(true);

      const isCorrectOption = selected === scenarios[current].correct;
      const isGeminiHappy = reply.includes("✅");

      if (isCorrectOption && isGeminiHappy) {
        setScore((prev) => prev + 1);
        setFeedbackGif(
          "https://media.tenor.com/rITwtw_ErAgAAAAm/that%27s-right-corridor-crew.webp"
        );
        setVerifyMessage(`✅ Correct! ${reply}`);
      } else if (isCorrectOption && !isGeminiHappy) {
        setScore((prev) => prev + 1);
        setFeedbackGif(
          "https://media.tenor.com/u2_v5ii9rSkAAAAM/home-alone-home-alone2.gif"
        );
        setVerifyMessage(
          `✅ You picked the right emotion, but your explanation needs work. ${reply}`
        );
      } else {
        setFeedbackGif(
          "https://media.tenor.com/u2_v5ii9rSkAAAAM/home-alone-home-alone2.gif"
        );
        setVerifyMessage(
          `❌ Not quite! The best match was "${scenarios[current].correct}". ${reply}`
        );
      }
    } catch (err) {
      setVerifyMessage("⚠️ Network error. Try again.");
    } finally {
      setChecking(false);
    }
  };

  

  useEffect(() => {
    if (current >= scenarios.length) {
      setShowConfetti(score >= 4);

      if (score >= 4) {
        completeSELChallenge(0, 0); // ✅ Mark challenge complete
      }

      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);
 
      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: Math.round((score / scenarios.length) * 10),
        accuracy: Math.round((score / scenarios.length) * 100),
        avgResponseTimeSec: durationSec / scenarios.length,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: score >= 4,
        
      });
      setStartTime(Date.now());

    }
  }, [current, score]);



  const renderEndScreen = () => {
    let gif = "";
    let message = "";
    if (score >= 4) {
      gif =
        "https://media.tenor.com/cifOmQEl1_YAAAAm/you-did-a-great-job-brad-mondo.webp";
      message =
        "🎉 Amazing work decoding emotions! You're a true empathy expert!";
    } else if (score === 3) {
      gif =
        "https://media.tenor.com/R3K5Ivixo9YAAAAm/not-bad-samus-paulicelli.webp";
      message =
        "👍 Not bad! You're getting there. Try again to improve even more!";
    } else if (score === 2) {
      gif =
        "https://media.tenor.com/ocffM-fTUYwAAAAM/you-are-better-than-this-alex-boye.gif";
      message = "😬 You're better than this! Let’s try one more time.";
    } else {
      gif = "https://media.tenor.com/Go6QqNlMeakAAAAM/wojak-laughing.gif";
      message =
        "💀 Uh-oh! Time to rethink those answers. Try again and do better!";
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        {showConfetti && <Confetti />}
        <h2 className="text-2xl font-bold">Game Over 🎉</h2>
        <p className="text-lg">
          You got {score} out of {scenarios.length} correct.
        </p>
        <p className="font-medium text-lg">{message}</p>
        <img
          src={gif}
          alt="result gif"
          className="mx-auto rounded-lg w-full max-w-xs"
        />
        <Button onClick={restartGame}>🔄 Play Again</Button>
        <Link to="/respond-dont-react">
          <Button variant="outline">➡️ Go to Next Game</Button>
        </Link>
      </motion.div>
    );
  };

  if (showIntro) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          Emotion Decoder – What’s Really Going On?
        </h1>
        <p className="text-base">
          🧠 You’ll read five real-life situations. Your job? Pick the emotion
          the person is feeling and give a short reason why you think so. Let’s
          see if you can decode 4 out of 5 correctly!
        </p>
        <img
          src="https://media.tenor.com/iZPmuJ0KON8AAAAM/hello-there.gif"
          alt="Intro Gif"
          className="mx-auto rounded-lg w-full max-w-sm"
        />
        <Button onClick={() => setShowIntro(false)}>▶️ Play Game</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {current < scenarios.length ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 p-4 border rounded-2xl shadow-sm bg-white space-y-4">
            <h2 className="text-xl font-semibold">
              Scenario {current + 1} of {scenarios.length}
            </h2>
            <p className="text-base">{scenarios[current].question}</p>
            <div className="grid gap-2">
              {scenarios[current].options.map((option) => (
                <Button
                  key={option}
                  variant={selected === option ? "default" : "outline"}
                  onClick={() => setSelected(option)}
                  disabled={submitted}
                >
                  {option}
                </Button>
              ))}
            </div>
            <textarea
              className="w-full mt-2 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={100}
              placeholder="Explain why (100 chars max)"
              disabled={submitted || checking}
              rows={2}
            />
            <div className="flex justify-between items-center mt-2">
              <Button
                variant="ghost"
                className="text-blue-600 hover:underline"
                onClick={handleHint}
                disabled={showHint || submitted}
              >
                Show Hint
              </Button>
              {showHint && (
                <span className="text-xs text-muted-foreground">
                  Hint visible for 5 seconds ⏱️
                </span>
              )}
            </div>
            {showHint && (
              <p className="text-sm text-muted-foreground">
                💡 Hint: {scenarios[current].hint}
              </p>
            )}
            {!submitted ? (
              <Button
                className="w-full mt-2"
                onClick={() => verifyWithGemini(input, selected)}
                disabled={!selected || input.trim() === "" || checking}
              >
                {checking ? "Checking..." : "Submit"}
              </Button>
            ) : (
              <Button className="w-full mt-2" onClick={handleNext}>
                Next
              </Button>
            )}
            {verifyMessage && (
              <div className="text-sm mt-2 p-2 border rounded bg-gray-50 text-gray-800">
                {verifyMessage}
              </div>
            )}
            {feedbackGif && (
              <img
                src={feedbackGif}
                alt="feedback gif"
                className="mx-auto mt-2 w-full max-w-xs rounded-lg"
              />
            )}
          </div>
        </motion.div>
      ) : (
        renderEndScreen()
      )}
    </div>
  );
};

export default EmotionDecoder;
