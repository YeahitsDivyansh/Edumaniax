import React, { useState } from "react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    text: "A teammate keeps bossing you in a group project.",
    options: [
      "Why are you always controlling everything?!",
      "Whatever, do what you want.",
      "I feel frustrated when you don’t let me share my ideas because I want to be part of the project. I need us to listen to each other.",
    ],
    correctIndex: 2,
  },
  {
    text: "A friend often cancels plans last minute.",
    options: [
      "I feel disappointed when plans are canceled last minute because I value our time together. I need better notice next time.",
      "You are so unreliable, I’m done making plans with you.",
      "Fine, I didn’t want to go anyway.",
    ],
    correctIndex: 0,
  },
  {
    text: "A classmate keeps copying your homework.",
    options: [
      "Stop copying me! Get your own brain.",
      "I feel uncomfortable when you copy my work because it’s unfair. I need you to try doing it yourself.",
      "Whatever, just don’t get caught.",
    ],
    correctIndex: 1,
  },
  {
    text: "Your sibling keeps interrupting you during online classes.",
    options: [
      "I feel distracted when you interrupt because I need to focus during class. I need you to wait until I'm done.",
      "Ugh! You’re the worst sibling ever!",
      "Can you just go away?",
    ],
    correctIndex: 0,
  },
];

const SpeakUpGame = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleOptionClick = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === scenarios[current].correctIndex) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setTimeout(() => {
        if (current === scenarios.length - 1) {
          const finalScore = score + (index === scenarios[current].correctIndex ? 1 : 0);
          setScore(finalScore);
          setShowResult(true);
          completeCommunicationChallenge(2, 1);

          // ⏱️ Calculate performance
          const endTime = Date.now();
          const durationSec = (endTime - startTime) / 1000;
          const accuracy = finalScore / scenarios.length;
          const avgResponseTimeSec = durationSec / scenarios.length;

          updatePerformance({
            moduleName: "Communication",
            topicName: "communicationSkills",
            score: Math.round(accuracy * 10),       // out of 10
            accuracy: Math.round(accuracy * 100),   // %
            studyTimeMinutes: durationSec / 60,
            avgResponseTimeSec,                     // ✅ new field
            completed: true,

          });
          setStartTime(Date.now());
        }
        else {
          setCurrent(current + 1);
          setSelected(null);
        }
      }, 2000);
    }, 1000);
  };

  const resetGame = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setStartTime(Date.now());
  };

  if (showResult) {
    const percentage = Math.round((score / scenarios.length) * 100);
    let gif = "";
    if (score === 4) {
      gif = "https://media.tenor.com/XHMurl9mMPcAAAAM/multiversx-x.gif";
    } else if (score === 3) {
      gif =
        "https://media.tenor.com/sVUg-nFdn0kAAAAM/the-rock-dwayne-johnson.gif";
    } else if (score === 2) {
      gif =
        "https://media.tenor.com/fXwSEyXzcrcAAAAM/you-can-do-better-than-that-michael-rapaport.gif";
    } else {
      gif = "https://media.tenor.com/pjdN11ejPjEAAAAM/wink-youtuber.gif";
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9ff] p-4 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          💪 Speak Up Without Blowing Up
        </h1>
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6">
          <h2 className="text-2xl font-bold">🎉 Report Card</h2>
          <img src={gif} alt="Result GIF" className="rounded-xl mx-auto" />
          <p className="text-xl">
            ✅ Score: {score} / {scenarios.length}
          </p>
          <p className="text-xl">📊 Percentage: {percentage}%</p>
          <button
            onClick={resetGame}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            🔁 Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[current];

  return (
    <div className="min-h-screen bg-[#f9f9ff] py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
        💪 Speak Up Without Blowing Up
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl">
        Choose the correct speak-up sentence to reply back in the most
        appropriate and respectful manner.
      </p>
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-700">
            Scenario {current + 1}
          </h2>
          <div className="text-sm text-gray-500">Badge: 🧍 Assertive Ace</div>
        </div>

        <div className="text-gray-700 font-medium bg-yellow-100 p-4 rounded-xl">
          {currentScenario.text}
        </div>

        <div className="space-y-4">
          {currentScenario.options.map((option, index) => {
            const isCorrect = index === currentScenario.correctIndex;
            const isSelected = index === selected;

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={selected !== null}
                className={`w-full text-left p-4 rounded-lg border transition ${selected !== null
                  ? isCorrect
                    ? "bg-green-100 border-green-600 text-green-800 font-semibold"
                    : isSelected
                      ? "bg-red-100 border-red-600 text-red-800 font-semibold"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  : "bg-white hover:bg-blue-50 border-gray-300"
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="text-center">
            <img
              src={
                selected === currentScenario.correctIndex
                  ? "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDU1aXpjbHQ3enBjbmVlejV2YTY1cHRjeHN3cmc4MDVzOWJ2eHU2NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FtCoZuA3fRk59unsXb/giphy.gif"
                  : "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzdzbmNjdHpmdTZnejJtcjZ2NnptZnVhOXluajVvbTJxOXRrdXA1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6gLyE15StAs3C/giphy.gif"
              }
              alt="Feedback GIF"
              className="w-60 mx-auto mt-4 rounded-xl"
            />
          </div>
        )}

        <div className="text-right text-sm text-gray-500">
          Question {current + 1} of {scenarios.length}
        </div>
      </div>
    </div>
  );
};

export default SpeakUpGame;
