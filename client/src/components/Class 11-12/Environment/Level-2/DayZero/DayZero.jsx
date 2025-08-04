import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const dragOptions = [
  "Water rationing schedules",
  "Rainwater harvesting campaigns",
  "Desalination plant investments",
  "Reuse greywater mandates",
  "Incentivize waterless urinals, low-flow taps",
  "Crack down on illegal groundwater extraction",
  "Build new golf courses",
  "Offer free car washes",
  "Increase swimming pool sizes",
  "Subsidize lawn sprinklers",
];

const dragCorrect = [
  "Water rationing schedules",
  "Rainwater harvesting campaigns",
  "Desalination plant investments",
  "Reuse greywater mandates",
  "Incentivize waterless urinals, low-flow taps",
  "Crack down on illegal groundwater extraction",
];

const questions = [
  {
    id: 1,
    type: "drag",
    question:
      "Design an emergency water plan by dragging 4 effective measures below:",
  },
  {
    id: 2,
    type: "single",
    question:
      "You must cut water supply by 40%. Which is the least disruptive method?",
    options: [
      "Turn off taps 3 days/week",
      "Uniform rationing (per household)",
      "Tanker supply only to slums",
      "Cut off industries temporarily",
    ],
    correct: [1, 3],
  },
  {
    id: 3,
    type: "single",
    question: "Which sector uses the most water in urban settings?",
    options: ["Households", "Car washes", "Industries", "Hotels"],
    correct: [2],
  },
  {
    id: 4,
    type: "single",
    question:
      "A celebrity posts: “How can the govt ask us to save water when hotels waste so much?” What do you do?",
    options: [
      "Ignore it",
      "Launch a hotel-targeted awareness campaign",
      "Send legal notice",
      "Block the post",
    ],
    correct: [1],
  },
  {
    id: 5,
    type: "single",
    question:
      "Which solution gives long-term relief, not just a short-term fix?",
    options: [
      "Water tankers",
      "New borewells",
      "Roof rainwater harvesting",
      "Buying water from another state",
    ],
    correct: [2],
  },
];

const gifs = {
  intro1: "https://media.tenor.com/2mAPegiljw0AAAA1/suspicious-eyes.webp",
  intro2: "https://media.tenor.com/Gxvin2ix27QAAAA1/house-flood.webp",
  correct:
    "https://media.tenor.com/hSafkqjhylwAAAAm/you%27re-right-blippi.webp",
  wrong:
    "https://media.tenor.com/4y20jEYe9SIAAAAm/youre-wrong-chris-cantada.webp",
  multiCorrect: "https://media.tenor.com/h3dU1jihA54AAAAm/woah-po.webp",
  multiPartial:
    "https://media.tenor.com/YYa9x6OTeLIAAAA1/thats-not-good-enough-alex.webp",
  success:
    "https://media.tenor.com/XRMFEI9zgskAAAA1/it%27s-a-success-malik-payne.webp",
  fail: "https://media.tenor.com/e5ndXMOWFFkAAAA1/fail-failure.webp",
};

const DayZero = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [dragSelected, setDragSelected] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentCorrect, setCurrentCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const current = questions[step - 1];

  const handleDragSelect = (option) => {
    setDragSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : prev.length < 4
          ? [...prev, option]
          : prev
    );
  };

  const handleDragSubmit = () => {
    const correctCount = dragSelected.filter((o) =>
      dragCorrect.includes(o)
    ).length;
    setCurrentCorrect(correctCount === 4);
    setShowFeedback(true);
  };

  const handleSelect = (index) => {
    const isCorrect = current.correct.includes(index);
    setCurrentCorrect(isCorrect);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setAnswers([...answers, currentCorrect]);
    setShowFeedback(false);
    setCurrentCorrect(false);
    setDragSelected([]);
    setStep(step + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setDragSelected([]);
    setShowFeedback(false);
    setCurrentCorrect(false);
    setShowConfetti(false);
    setStartTime(Date.now());

  };

  const allCorrect =
    answers.length === questions.length && answers.every(Boolean);

  useEffect(() => {
    const totalTimeMs = Date.now() - startTime;
    const correctCount = answers.filter(Boolean).length;

    if (step === questions.length + 1) {
      updatePerformance({
        moduleName: "Environment",
        topicName: "sustainableLeader",
        score: Math.round((correctCount / questions.length) * 10),
        accuracy: parseFloat(((correctCount / questions.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / questions.length / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: allCorrect,

      });
      setStartTime(Date.now());
      if (allCorrect) {
        completeEnvirnomentChallenge(1, 1);
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
    }
  }, [step, answers, allCorrect]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 flex flex-col items-center justify-center p-6 text-center">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
          />
        </div>
      )}
      {step === 0 && (
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Day Zero: Chennai Water Crisis 💧
          </h1>
          <p className="mb-4 text-lg max-w-xl">
            You’re the Crisis Response Leader. Delay “Day Zero” by making smart
            choices!
          </p>
          <img
            src={gifs.intro1}
            alt="intro1"
            className="mx-auto mb-4 rounded-xl"
          />
          <img
            src={gifs.intro2}
            alt="intro2"
            className="mx-auto mb-4 rounded-xl"
          />
          <button
            onClick={() => setStep(1)}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {step > 0 && step <= questions.length && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{current.question}</h2>

          {!showFeedback && (
            <>
              {current.type === "drag" ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {dragOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDragSelect(opt)}
                        className={`px-4 py-2 rounded-full border ${dragSelected.includes(opt)
                          ? "bg-green-500 text-white"
                          : "hover:bg-green-100"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleDragSubmit}
                    disabled={dragSelected.length !== 4}
                    className={`mt-4 px-6 py-2 rounded-full text-white ${dragSelected.length === 4
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Submit Selection
                  </button>
                </>
              ) : (
                <div className="grid gap-4">
                  {current.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className="px-4 py-2 rounded-full border hover:bg-green-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {showFeedback && (
            <div className="mt-4">
              {currentCorrect ? (
                <img
                  src={gifs.correct}
                  alt="correct"
                  className="mx-auto rounded-xl"
                />
              ) : (
                <img
                  src={gifs.wrong}
                  alt="wrong"
                  className="mx-auto rounded-xl"
                />
              )}
              <button
                onClick={handleNext}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {step === questions.length + 1 && (
        <div>
          {allCorrect ? (
            <div className="relative">
              {showConfetti && (
                // ✅ At the top of your component
                <Confetti
                  width={width}
                  height={height}
                  numberOfPieces={300}
                  recycle={false}
                  run={showConfetti} // Only runs when true
                />
              )}
              <img
                src={gifs.success}
                alt="success"
                className="mx-auto mb-4 rounded-xl"
              />
              <h2 className="text-3xl font-bold mb-2">
                🎉 You saved Chennai from Day Zero!
              </h2>
            </div>
          ) : (
            <div>
              <img
                src={gifs.fail}
                alt="fail"
                className="mx-auto mb-4 rounded-xl"
              />
              <h2 className="text-3xl font-bold mb-2 text-red-600">
                Oops! Try again to avoid Day Zero.
              </h2>
            </div>
          )}
          <button
            onClick={handleRestart}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 mt-4"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DayZero;
