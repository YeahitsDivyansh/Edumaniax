import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const questions = [
  {
    id: 1,
    type: "single",
    question:
      "Which of the following surfaces allows the highest water infiltration?",
    options: [
      "Concrete road",
      "Paver blocks with gaps",
      "Rooftop terrace",
      "Garden soil",
    ],
    correct: [3],
  },
  {
    id: 2,
    type: "single",
    question: "You have funds for only one: What do you prioritize?",
    options: [
      "A new pumping station",
      "Restoration of stormwater drains",
      "Expansion of sewer lines",
      "Rooftop rainwater harvesting across schools",
    ],
    correct: [1, 3],
  },
  {
    id: 3,
    type: "single",
    question: "What’s the best location to build a rain garden?",
    options: [
      "Inside a shopping mall",
      "Along storm drain pathways",
      "Near flyovers",
      "On slum rooftops",
    ],
    correct: [1],
  },
  {
    id: 4,
    type: "single",
    question:
      "What is the risk of encroaching on natural lakes with construction?",
    options: [
      "No impact",
      "Only reduces biodiversity",
      "Increases waterlogging and urban flooding",
      "Makes land more fertile",
    ],
    correct: [2],
  },
  {
    id: 5,
    type: "multiple",
    question:
      "Which blueprint features avoid flooding during extreme rainfall? (Select all that apply)",
    options: [
      "% of permeable surface",
      "Number of recharge pits",
      "Drainage slope and outlets",
      "More parking lots",
      "Wider concrete roads",
      "Tall skyscrapers",
      "No drainage outlets",
    ],
    correct: [0, 1, 2],
  },
];

const gifs = {
  intro1:
    "https://media.tenor.com/_ySHEpO5GNYAAAA1/atat%C3%BCrk-an%C4%B1tkabir.webp",
  intro2: "https://media.tenor.com/RIxhUuakMdEAAAA1/ready-are-you-ready.webp",
  correct: "https://media.tenor.com/dIOOnR-HKuQAAAA1/bingo-amelia.webp",
  wrong: "https://media.tenor.com/Cx9hfxXnVrgAAAAm/trump-trump-wrong.webp",
  multiCorrect: "https://media.tenor.com/h3dU1jihA54AAAAm/woah-po.webp",
  multiPartial:
    "https://media.tenor.com/YYa9x6OTeLIAAAA1/thats-not-good-enough-alex.webp",
  success: "https://media.tenor.com/jvkHhOQWinoAAAAm/yes-awesome.webp",
  fail: "https://media.tenor.com/_RTookVWiCsAAAA1/im-embracing-failure-7ven.webp",
};

const UrbanFloodFlashpoint = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [multiSelect, setMultiSelect] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentCorrect, setCurrentCorrect] = useState(false);
  const { width, height } = useWindowSize();
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const current = questions[step - 1];

  const allCorrect =
    answers.length === questions.length && answers.every(Boolean);

  useEffect(() => {
    const totalTimeMs = Date.now() - startTime;
    const correctCount = answers.filter(Boolean).length;

    if (step === questions.length + 1) {
      updatePerformance({
        moduleName: "Environment",
        topicName: "ecoDecisionMaker",
        score: Math.round((correctCount / questions.length) * 10),
        accuracy: parseFloat(((correctCount / questions.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / questions.length / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: allCorrect,

      });
      setStartTime(Date.now());

      if (allCorrect) {
        completeEnvirnomentChallenge(1, 0); // keep this if needed
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }


    }
  }, [step, answers, allCorrect]);


  const handleSelect = (index) => {
    if (current.type === "multiple") {
      setMultiSelect((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      const isCorrect = current.correct.includes(index);
      setCurrentCorrect(isCorrect);
      setShowFeedback(true);
    }
  };

  const handleMultiSubmit = () => {
    const isAllCorrect = current.correct.every((i) => multiSelect.includes(i));
    const isOnlyCorrect = multiSelect.every((i) => current.correct.includes(i));
    const isPerfect = isAllCorrect && isOnlyCorrect;
    setCurrentCorrect(isPerfect);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setAnswers([...answers, currentCorrect]);
    setShowFeedback(false);
    setCurrentCorrect(false);
    setMultiSelect([]);
    setStep(step + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setMultiSelect([]);
    setShowFeedback(false);
    setCurrentCorrect(false);
    setShowConfetti(false);
    setStartTime(Date.now());

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6 text-center">
      {step === 0 && (
        <div>
          <h1 className="text-4xl font-bold mb-4">Urban Flood Flashpoint 🌧️</h1>
          <p className="mb-4 text-lg max-w-xl">
            Learn how to manage urban water flow and prevent flooding through
            interactive questions!
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
              <div className="grid gap-4">
                {current.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`px-4 py-2 rounded-full border ${current.type === "multiple" && multiSelect.includes(idx)
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {current.type === "multiple" && (
                <button
                  onClick={handleMultiSubmit}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                >
                  Submit Selections
                </button>
              )}
            </>
          )}

          {showFeedback && (
            <div className="mt-4">
              {current.type === "multiple" ? (
                currentCorrect ? (
                  <div>
                    <img
                      src={gifs.multiCorrect}
                      alt="correct"
                      className="mx-auto mb-2 rounded-xl"
                    />
                    <p className="text-green-700 font-semibold">
                      ✅ All correct! You should be an urban city planner!
                    </p>
                  </div>
                ) : (
                  <div>
                    <img
                      src={gifs.multiPartial}
                      alt="partial"
                      className="mx-auto mb-2 rounded-xl"
                    />
                    <p className="text-yellow-700 font-semibold">
                      ⚠️ Some options are wrong. Try to pick only the right
                      ones!
                    </p>
                  </div>
                )
              ) : currentCorrect ? (
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
            <div>
              {showConfetti && (
                <Confetti
                  width={width}
                  height={height}
                  numberOfPieces={300} // or any number you want
                  recycle={false}
                />
              )}
              <img
                src={gifs.success}
                alt="success"
                className="mx-auto mb-4 rounded-xl"
              />
              <h2 className="text-3xl font-bold mb-2">
                🎉 You completed the game successfully!
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
                Oops! You need to try again.
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

export default UrbanFloodFlashpoint;
