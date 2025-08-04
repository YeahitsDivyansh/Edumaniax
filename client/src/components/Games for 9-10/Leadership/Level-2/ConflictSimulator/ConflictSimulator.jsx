import React, { useState } from "react";
import Confetti from "react-confetti";
import { useEffect } from "react";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  {
    id: 1,
    title: "Team Credit Conflict",
    gif: "https://media0.giphy.com/media/duQGj2WyE1fBm/200.webp",
    description:
      "Your classmate took full credit for a project you both worked on.",
    options: [
      {
        style: "Passive",
        response: "It's okay... I guess it doesn’t matter.",
        score: 2,
        gif: "https://media1.giphy.com/media/3mJZjX68h4g6T85Mo8/giphy.webp",
      },
      {
        style: "Aggressive",
        response: "You better fix this or else!",
        score: 3,
        gif: "https://media1.giphy.com/media/YoWpe73AHXxFYQtqo4/200.webp",
      },
      {
        style: "Assertive",
        response:
          "Hey, I feel hurt. We both worked on this and deserve credit.",
        score: 10,
        gif: "https://media1.giphy.com/media/rI7a2lUMUhYI3A0SPh/200.webp",
      },
      {
        style: "Passive-Aggressive",
        response: "Wow, must be nice to do everything alone.",
        score: 5,
        gif: "https://media1.giphy.com/media/h3p76MKN8vOFr9l4tX/giphy.webp",
      },
    ],
  },
  {
    id: 2,
    title: "Practice Argument",
    gif: "https://media2.giphy.com/media/TfFc9dvWg6OThgblq2/200.webp",
    description: "You and a teammate clash over strategy during practice.",
    options: [
      {
        style: "Passive",
        response: "I’ll just go along with whatever.",
        score: 2,
        gif: "https://media1.giphy.com/media/3mJZjX68h4g6T85Mo8/giphy.webp",
      },
      {
        style: "Aggressive",
        response: "You don’t know anything. Do it my way!",
        score: 3,
        gif: "https://media1.giphy.com/media/YoWpe73AHXxFYQtqo4/200.webp",
      },
      {
        style: "Assertive",
        response: "I think we both care. Let’s talk through both ideas.",
        score: 10,
        gif: "https://media1.giphy.com/media/rI7a2lUMUhYI3A0SPh/200.webp",
      },
      {
        style: "Passive-Aggressive",
        response: "Sure, your way is always perfect. 😒",
        score: 4,
        gif: "https://media1.giphy.com/media/h3p76MKN8vOFr9l4tX/giphy.webp",
      },
    ],
  },
  {
    id: 3,
    title: "School Rule Debate",
    gif: "https://media3.giphy.com/media/T2bDC7TBZfdJAqNCSh/giphy.webp",
    description: "There’s a heated group chat about a new strict school rule.",
    options: [
      {
        style: "Passive",
        response: "I don’t really want to get involved.",
        score: 1,
        gif: "https://media1.giphy.com/media/3mJZjX68h4g6T85Mo8/giphy.webp",
      },
      {
        style: "Aggressive",
        response: "This school sucks. Let's protest now!",
        score: 3,
        gif: "https://media1.giphy.com/media/YoWpe73AHXxFYQtqo4/200.webp",
      },
      {
        style: "Assertive",
        response: "Let’s hear both sides and suggest a better rule together.",
        score: 10,
        gif: "https://media1.giphy.com/media/rI7a2lUMUhYI3A0SPh/200.webp",
      },
      {
        style: "Passive-Aggressive",
        response: "So much for freedom, huh?",
        score: 5,
        gif: "https://media1.giphy.com/media/h3p76MKN8vOFr9l4tX/giphy.webp",
      },
    ],
  },
];

const introGif = "https://media1.giphy.com/media/l4hLPtk0S9HUFBWLe/200.webp";
const completionGif =
  "https://media4.giphy.com/media/xTiTnvN3OZXKAQW6wU/giphy.webp";

const ConflictSimulator = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1);
  const [score, setScore] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (step === scenarios.length) {
      completeLeadershipChallenge(1, 0);
    }
  }, [step]);

  useEffect(() => {
    if (step !== scenarios.length) return;

    const totalTimeMs = Date.now() - startTime;
    const scaledScore = Math.round((score / 30) * 10); // score scaled out of 10

    updatePerformance({
      moduleName: "Leadership",
      topicName: "understandableLeader",
      score: scaledScore,
      accuracy: scaledScore * 10, // out of 100
      avgResponseTimeSec: parseFloat((totalTimeMs / (scenarios.length * 1000)).toFixed(2)),
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: true,
       
    });
    setStartTime(Date.now());

  }, [step]);


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOptionSelect = (option) => {
    setScore((prev) => prev + option.score);
    setSelectedStyle((prev) => [...prev, option.style]);
    setShowFeedback(option);
    setTimeout(() => {
      setShowFeedback(null);
      setStep((prev) => prev + 1);
    }, 2000);
  };

  const restart = () => {
    setStep(-1);
    setScore(0);
    setSelectedStyle([]);
    setStartTime(Date.now());

  };

  if (step === -1) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <img src={introGif} alt="Intro" className="mx-auto mb-4 rounded-lg" />
        <h1 className="text-3xl font-bold mb-2">🎙️ Conflict Simulator</h1>
        <p className="mb-2">
          Welcome! In this challenge, you'll navigate 3 real-life teen conflicts
          using different communication styles.
        </p>
        <p className="mb-4">
          Handling conflict is a leadership superpower. It helps you build
          trust, avoid drama, and find win-win solutions.
        </p>
        <button
          onClick={() => setStep(0)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (step >= scenarios.length) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <Confetti width={windowSize.width} height={windowSize.height} />
        <img
          src={completionGif}
          alt="Complete"
          className="mx-auto mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold mb-2">🎉 Challenge Complete!</h2>
        <p className="mb-2">
          🧠 Leadership Score: <strong>{score}/30</strong>
        </p>
        <p className="mb-2">
          💬 Most Used Style:{" "}
          <strong>{getMostFrequentStyle(selectedStyle)}</strong>
        </p>
        <p className="mb-4">
          🏅 You earned the <strong>🎙️ Dialogue Champion</strong> badge!
        </p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={restart}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Play Again
          </button>

          <Link to="/eq-tracker">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Move to Next Game
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const scenario = scenarios[step];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">
        ⚔️ Conflict {step + 1} of 3: {scenario.title}
      </h2>
      <img src={scenario.gif} alt="Scenario" className="mb-3 rounded-lg" />
      <p className="mb-4">{scenario.description}</p>
      <div className="space-y-3">
        {scenario.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(opt)}
            className="w-full border p-3 rounded hover:bg-gray-100 text-left"
          >
            <strong>{opt.style}:</strong> {opt.response}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-4 text-center">
          <img
            src={showFeedback.gif}
            alt={showFeedback.style}
            className="mx-auto mb-2 rounded-lg"
          />
          <p className="font-medium">
            You chose a {showFeedback.style} style response.
          </p>
        </div>
      )}
    </div>
  );
};

const getMostFrequentStyle = (arr) => {
  const freq = {};
  arr.forEach((style) => {
    freq[style] = (freq[style] || 0) + 1;
  });
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
};

export default ConflictSimulator;
