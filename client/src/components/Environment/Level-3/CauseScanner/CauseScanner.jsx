import React, { useState, useEffect } from "react";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const statements = [
  {
    action: "Burning waste in open air",
    answer: "Contributes",
    gif: "https://media4.giphy.com/media/Kerg053G7ZJUQ/200.webp",
  },
  {
    action: "Cycling instead of driving",
    answer: "Helps",
    gif: "https://media2.giphy.com/media/3o6Zt2YL3H8a7vPBio/200.webp",
  },
  {
    action: "Using plastic water bottles daily",
    answer: "Contributes",
    gif: "https://media4.giphy.com/media/dIp08t2rGV4mA/giphy.webp",
  },
  {
    action: "Planting trees in your school",
    answer: "Helps",
    gif: "https://media4.giphy.com/media/scE6EIpdnxYzc8VvAH/giphy.webp",
  },
  {
    action: "Running AC all day at home",
    answer: "Contributes",
    gif: "https://media4.giphy.com/media/PlgZiX7xo0NdiR8489/200.webp",
  },
  {
    action: "Eating locally-grown food",
    answer: "Helps",
    gif: "https://media2.giphy.com/media/2pwlC4V60TsAg/200.webp",
  },
  {
    action: "Driving alone every day",
    answer: "Contributes",
    gif: "https://media1.giphy.com/media/WjomPxfNBBDeOOS5fB/200.webp",
  },
  {
    action: "Installing solar panels",
    answer: "Helps",
    gif: "https://media0.giphy.com/media/4Bgjyuw30beOLMfkfp/giphy.webp",
  },
  {
    action: "Burning coal for electricity",
    answer: "Contributes",
    gif: "https://media0.giphy.com/media/IaVWq3MSU6EMsVCTkz/giphy.webp",
  },
  {
    action: "Using energy-efficient appliances",
    answer: "Helps",
    gif: "https://media3.giphy.com/media/Cq2FEZGWR8XHYpyRNX/giphy.webp",
  },
];

const resultGifs = {
  perfect: "https://media4.giphy.com/media/NSDmc1yecieZBbMSFG/200.webp",
  great: "https://media0.giphy.com/media/088w8xc5HVkosnePWq/200.webp",
  okay: "https://media4.giphy.com/media/PqIcza4nNZm3bcl0Wy/giphy.webp",
  poor: "https://media0.giphy.com/media/MCOyeespFudGwqwnyH/200.webp",
};

const CauseScanner = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questionKey, setQuestionKey] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (showResult && score >= 6) {
      completeEnvirnomentChallenge(2, 0); // Challenge 1, Task 1 completed
    }
  }, [showResult, score]);

  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const totalTimeSec = Math.floor((endTime - startTime) / 1000);
      const avgResponseTimeSec = totalTimeSec / statements.length;
      const scaledScore = Number(((score / statements.length) * 10).toFixed(2));

      updatePerformance({
        moduleName: "Environment",
        topicName: "climateAnalyst",
        score: scaledScore,
        accuracy: (score / statements.length) * 100,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(totalTimeSec / 60),
        completed: score >= 6,
         
      });
      setStartTime(Date.now());
    }
  }, [showResult]);

  useEffect(() => {
    if (!started || showResult) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      nextQuestion();
    }
  }, [timeLeft, current, started, showResult]);

  const handleAnswer = (userAnswer) => {
    const correct = statements[current].answer === userAnswer;
    if (correct) setScore((s) => s + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (current < statements.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(10);
      setQuestionKey((k) => k + 1); // force re-render of gif
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(10);
    setQuestionKey(0);
    setStartTime(Date.now());
  };

  const getResultGif = () => {
    if (score === 10) return resultGifs.perfect;
    if (score >= 8) return resultGifs.great;
    if (score === 6) return resultGifs.okay;
    return resultGifs.poor;
  };

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
        <div className="max-w-md w-full">
          <img
            src="https://media2.giphy.com/media/lUuNl5aXQyV8HS8dpn/200.webp"
            alt="intro"
            className="w-full mb-4 rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          🌍 Challenge 1: Cause Scanner
        </h1>
        <p className="text-lg mb-4">
          Decide whether each action helps prevent or contributes to climate
          change. You have 10 seconds per question. Ready?
        </p>
        <button
          onClick={() => setStarted(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        >
          🚀 Start Game
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
        <p className="text-xl mb-4">
          Your Score: {score} / {statements.length}
        </p>
        <img
          src={getResultGif()}
          alt="result gif"
          className="w-64 mb-4 rounded-xl"
        />
        <button
          onClick={restart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
        >
          🔁 Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
      <p className="text-lg mb-2">
        ⏳ Time Left: <span className="font-bold">{timeLeft}s</span>
      </p>
      <img
        key={questionKey}
        src={statements[current].gif}
        alt="question gif"
        className="w-64 mb-4 rounded-xl"
      />
      <p className="text-xl font-semibold mb-6">{statements[current].action}</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleAnswer("Helps")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          ✅ Helps Prevent
        </button>
        <button
          onClick={() => handleAnswer("Contributes")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          ❌ Contributes To
        </button>
      </div>
    </div>
  );
};

export default CauseScanner;
