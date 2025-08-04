import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const questions = [
  {
    clue: "Sweaty palms",
    correct: "Nervous",
    gif: "https://media.tenor.com/YpzTzz5H3igAAAAM/nakanohito-genome-jikkyouchuu-the-ones-within.gif",
    options: ["Excited", "Nervous", "Anxious", "Tired"],
  },
  {
    clue: "Dry mouth",
    correct: "Anxious",
    gif: "https://media.tenor.com/5J2A7MTVr-IAAAAM/summer-water-spongebob-squarepants.gif",
    options: ["Anxious", "Tired", "Dehydrated", "Scared"],
  },
  {
    clue: "Yawning in class",
    correct: "Tired",
    gif: "https://media.tenor.com/huQzXxrjr8MAAAAM/yawn-stretch.gif",
    options: ["Excited", "Tired", "Scared", "Nervous"],
  },
  {
    clue: "Headache",
    correct: "Dehydrated",
    gif: "https://media.tenor.com/jSAUYAzWe1sAAAAM/headache-jordan.gif",
    options: ["Nervous", "Tired", "Dehydrated", "Anxious"],
  },
  {
    clue: "Butterflies in stomach",
    correct: "Excited",
    gif: "https://media.tenor.com/bUw9MvHlREoAAAAm/tkthao219-peach.webp",
    options: ["Excited", "Scared", "Nervous", "Anxious"],
  },
  {
    clue: "Fast heartbeat",
    correct: "Scared",
    gif: "https://media.tenor.com/GJWKT4dho1YAAAAM/squidward-spongebob.gif",
    options: ["Nervous", "Scared", "Tired", "Excited"],
  },
];

const MindBodyMatchUp = () => {
  const { completeSELChallenge } = useSEL();
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);

      // Scale score out of 10
      const scaledScore = Math.round((score / questions.length) * 10);

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: scaledScore,
        accuracy: (score / questions.length) * 100,
        avgResponseTimeSec: totalSeconds / questions.length,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 3,

      });
      setStartTime(Date.now());

      if (score >= 3) {
        completeSELChallenge(1, 2);
      }
    }
  }, [showResult]);


  useEffect(() => {
    if (!started || showResult) return;
    if (timeLeft === 0) {
      setShowResult(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, showResult]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    const correct = questions[current].correct === option;

    const audio = new Audio(
      correct
        ? "/children-saying-yay-praise-and-worship-jesus-299607.mp3"
        : "https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3"
    );
    audio.play();

    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current === questions.length - 1) {
        setShowResult(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1500);
  };

  const handlePlayAgain = () => {
    setStarted(false);
    setTimeLeft(90);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setStartTime(Date.now());

  };

  const getResultGif = () => {
    if (score >= 3)
      return {
        src: "https://media.tenor.com/q2-dENhwrlsAAAAm/youre-a-genius-faisal-khan.webp",
        text: "You stayed calm and respectful. Great conflict solving!",
      };
    if (score === 2)
      return {
        src: "https://media.tenor.com/SyUwl-y0BHEAAAAM/make-it-better-wil-dasovich.gif",
        text: "You can still do better. Let’s try another way. You’ve got this!",
      };
    return {
      src: "https://media.tenor.com/aFJj5AaJb3wAAAAM/you-have-to-work-hard-lisa-alexandra.gif",
      text: "Keep practicing to get better at reading your body’s signs!",
    };
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        Mind-Body Match-Up – What’s Your Body Telling You?
      </h1>

      {!started && !showResult && (
        <button
          onClick={handleStart}
          className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Start the Game
        </button>
      )}

      {started && !showResult && (
        <>
          <div className="text-xl font-semibold mb-2">
            Time Left: {timeLeft}s
          </div>
          <img
            src="https://media.tenor.com/jxFkNgpJEdcAAAAM/heart-beating-out-of-chest-cartoon.gif"
            alt="Heart Pulse"
            className="w-32 h-auto mb-4"
          />

          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">
              {questions[current].clue}
            </h2>
            <img
              src={questions[current].gif}
              alt="Clue Gif"
              className="w-48 h-auto mx-auto rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-semibold border",
                    selected === opt &&
                    opt === questions[current].correct &&
                    "bg-green-200 border-green-600",
                    selected === opt &&
                    opt !== questions[current].correct &&
                    "bg-red-200 border-red-600",
                    !selected && "bg-gray-100 hover:bg-gray-200"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {showResult && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold mb-4">
            You scored {score} out of {questions.length}!
          </p>
          <img
            src={getResultGif().src}
            alt="Result Gif"
            className="w-64 h-auto mx-auto rounded-lg mb-4"
          />
          <p className="text-lg font-semibold text-gray-700 mb-4">
            {getResultGif().text}
          </p>
          <button
            onClick={handlePlayAgain}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MindBodyMatchUp;
