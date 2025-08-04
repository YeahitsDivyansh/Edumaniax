import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  {
    scenario:
      "A classmate accuses you of copying their homework in front of others.",
    options: [
      { text: "Blame them loudly", correct: false },
      {
        text: "Calmly say, ‘Let’s talk after class – I can explain.’",
        correct: true,
      },
      { text: "Ignore and walk away", correct: false },
    ],
  },
  {
    scenario: "Your sibling takes your charger without asking.",
    options: [
      { text: "Yell and grab it back", correct: false },
      {
        text: "Say, ‘Please ask before using my stuff next time.’",
        correct: true,
      },
      { text: "Complain to your parents immediately", correct: false },
    ],
  },
  {
    scenario: "Your friend spreads a rumor about you.",
    options: [
      { text: "Spread one about them too", correct: false },
      {
        text: "Tell them you’re hurt and want to understand why",
        correct: true,
      },
      { text: "Avoid them forever", correct: false },
    ],
  },
  {
    scenario: "You and a peer are put on the same project team after a fight.",
    options: [
      { text: "Refuse to work with them", correct: false },
      {
        text: "Suggest setting ground rules and working fairly",
        correct: true,
      },
      { text: "Ask the teacher to remove them", correct: false },
    ],
  },
];

const ConflictQuest = () => {
  const { completeSELChallenge } = useSEL();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (completed) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);
      const scaledScore = Math.round((score / 3) * 10); // 3 questions

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: scaledScore,
        accuracy: (score / 3) * 100,
        avgResponseTimeSec: totalSeconds / 3,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 3,

      });
      setStartTime(Date.now());

      if (score >= 3) {
        completeSELChallenge(1, 1);
      }
    }
  }, [completed]);


  const shuffled = scenarios.sort(() => 0.5 - Math.random()).slice(0, 3);

  const handleOptionClick = (correct, index) => {
    setSelected(index);
    setShowFeedback(true);
    if (correct) setScore((prev) => prev + 1);
    setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (round === 2) setCompleted(true);
      else setRound((prev) => prev + 1);
    }, 2500);
  };

  const handleRestart = () => {
    setRound(0);
    setScore(0);
    setCompleted(false);
    setSelected(null);
    setShowFeedback(false);
    setStartTime(Date.now());

  };

  const getFinalGif = () => {
    if (score >= 3)
      return {
        gif: "https://media.tenor.com/q2-dENhwrlsAAAAm/youre-a-genius-faisal-khan.webp",
        message: "You stayed calm and respectful. Great conflict solving!",
      };
    if (score === 2)
      return {
        gif: "https://media.tenor.com/SyUwl-y0BHEAAAAM/make-it-better-wil-dasovich.gif",
        message:
          "You can still do better. Let’s try another way. You’ve got this!",
      };
    return {
      gif: "https://media.tenor.com/aFJj5AaJb3wAAAAM/you-have-to-work-hard-lisa-alexandra.gif",
      message: "This is tough, but you can improve. Try again!",
    };
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        Conflict Quest – Can You Talk It Out?
      </h1>
      <p className="text-center text-lg mb-6 max-w-xl">
        You’re in a tricky situation. Choose your words carefully! Let’s solve
        this like a calm communicator.
      </p>

      {!completed && (
        <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Scenario {round + 1}:</h2>
          <p className="mb-4">{scenarios[round].scenario}</p>
          <div className="space-y-3">
            {scenarios[round].options.map((opt, i) => (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => handleOptionClick(opt.correct, i)}
                className={cn(
                  "w-full text-left px-4 py-2 border rounded-lg transition-all duration-300",
                  selected === i && showFeedback
                    ? opt.correct
                      ? "bg-green-300 border-green-600"
                      : "bg-red-200 border-red-600"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {showFeedback && selected !== null && (
        <div className="text-center mb-4">
          <img
            src={
              scenarios[round].options[selected].correct
                ? "https://media.tenor.com/IMDTu5ABVyAAAAAM/ianbohen-ryan.gif"
                : "https://media.tenor.com/V5ZyuPSLqo4AAAAM/funhouse-family-daylins-funhouse.gif"
            }
            alt="Feedback Gif"
            className="w-60 h-auto mx-auto rounded-lg"
          />
          <p className="text-xl font-semibold mt-2">
            {scenarios[round].options[selected].correct
              ? "You're going great!"
              : "This is not the way..."}
          </p>
        </div>
      )}

      {completed && (
        <div className="text-center">
          <p className="text-2xl font-semibold text-green-700 mb-4">
            {getFinalGif().message}
          </p>
          <img
            src={getFinalGif().gif}
            alt="Final Result Gif"
            className="w-72 h-auto mx-auto rounded-lg mb-4"
          />
          <button
            onClick={handleRestart}
            className="mt-2 bg-gray-700 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ConflictQuest;
