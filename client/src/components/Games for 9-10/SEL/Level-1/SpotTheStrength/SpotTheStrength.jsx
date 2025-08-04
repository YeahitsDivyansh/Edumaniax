import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    text: "Mira stays behind to help a classmate understand a math problem.",
    strength: "Empathy",
  },
  {
    text: "Dev keeps practicing for a speech despite stammering issues.",
    strength: "Perseverance",
  },
  {
    text: "Riya apologizes after realizing her joke hurt someone.",
    strength: "Accountability",
  },
  {
    text: "Aman speaks up when someone is being treated unfairly.",
    strength: "Courage",
  },
  {
    text: "Tara organizes her study time and sticks to it.",
    strength: "Self-Discipline",
  },
  {
    text: "Kabir helps resolve a fight between classmates.",
    strength: "Conflict Resolution",
  },
];

const strengths = [
  "Empathy",
  "Perseverance",
  "Accountability",
  "Courage",
  "Self-Discipline",
  "Conflict Resolution",
];

const SpotTheStrength = () => {
  const { completeSELChallenge } = useSEL();
  const [matches, setMatches] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleDrop = (strength, index) => {
    setMatches((prev) => ({ ...prev, [index]: strength }));
  };

  const handleSubmit = () => {
    let correct = 0;
    scenarios.forEach((s, i) => {
      if (matches[i] === s.strength) correct++;
    });

    setScore(correct);
    setSubmitted(true);

    const endTime = Date.now();
    const durationSec = Math.round((endTime - startTime) / 1000);

    updatePerformance({
      moduleName: "SEL",
      topicName: "selfAwareness",
      score: Math.round((correct / scenarios.length) * 10),
      accuracy: Math.round((correct / scenarios.length) * 100),
      avgResponseTimeSec: durationSec / scenarios.length,
      studyTimeMinutes: Math.ceil(durationSec / 60),
      completed: correct >= 5,

    });
    setStartTime(Date.now());

    if (correct >= 5) {
      setShowConfetti(true);
      completeSELChallenge(0, 2); // ✅ Mark challenge as complete
    }
  };



  const restartGame = () => {
    setMatches({});
    setDraggedItem(null);
    setSubmitted(false);
    setScore(0);
    setShowConfetti(false);
    setShowIntro(true);
    setStartTime(Date.now());

  };

  if (showIntro) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Spot the Strength – What Are They Using?
        </h1>
        <p className="text-base">
          💪 Drag and drop each behavior card to the strength you think it
          shows. Get at least 5 out of 6 right to win!
        </p>
        <img
          src="https://media.tenor.com/CW2LDJlxUOQAAAA1/lets-get-to-work-art-rosebaum.webp"
          alt="Intro Gif"
          className="mx-auto rounded-lg w-full max-w-sm"
        />
        <Button onClick={() => setShowIntro(false)}>▶️ Play Game</Button>
      </div>
    );
  }

  if (submitted) {
    let gif = "";
    let message = "";
    if (score >= 5) {
      gif =
        "https://media.tenor.com/k6aVUySE_nQAAAA1/hulk-1996-hulk-animated-series.webp";
      message = "💥 Incredible! You truly know your strengths!";
    } else if (score === 4) {
      gif = "https://media.tenor.com/G0OLTHn7sY4AAAA1/fab-fabulous.webp";
      message = "✨ Almost perfect! You're doing great!";
    } else if (score === 3) {
      gif = "https://media.tenor.com/bH6nyU4iGTkAAAA1/okay-keyshawn.webp";
      message = "🙂 Not bad, but let’s level it up!";
    } else {
      gif =
        "https://media.tenor.com/Rg19J4vUa7UAAAAm/thats-not-good-fatima.webp";
      message = "😕 Needs improvement. Give it another shot!";
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4 p-4"
      >
        {showConfetti && <Confetti />}
        <h2 className="text-2xl font-bold">Game Over 🎉</h2>
        <p className="text-lg">You matched {score} out of 6 correctly.</p>
        <p className="font-medium text-lg">{message}</p>
        <img
          src={gif}
          alt="result gif"
          className="mx-auto rounded-lg w-full max-w-xs"
        />
        <Button onClick={restartGame}>🔄 Play Again</Button>
        <Link to="/stress-response-builder">
          <Button variant="outline">➡️ Go to Next Game</Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Drag and Drop the Strengths
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-50 border shadow-sm min-h-[80px] flex items-center justify-between"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(draggedItem, i)}
            >
              <p className="text-sm">{s.text}</p>
              {matches[i] && (
                <span className="text-xs font-medium text-blue-600">
                  {matches[i]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-100 rounded-xl space-y-3">
          <h3 className="text-lg font-semibold">🧠 Strengths</h3>
          {strengths.map((s) => (
            <div
              key={s}
              draggable
              onDragStart={() => setDraggedItem(s)}
              className="p-2 bg-white border rounded-lg cursor-move shadow-sm hover:bg-blue-50"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button
          className="w-full sm:w-auto"
          onClick={handleSubmit}
          disabled={Object.keys(matches).length < 6}
        >
          ✅ Submit
        </Button>
      </div>
    </div>
  );
};

export default SpotTheStrength;
