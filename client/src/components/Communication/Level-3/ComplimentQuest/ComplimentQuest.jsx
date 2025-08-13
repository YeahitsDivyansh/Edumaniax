import React, { useState } from "react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const compliments = [
  {
    action: "Ayaan helped you when your project crashed.",
    options: [
      "Thanks, Ayaan. You always do everything for me.",
      "Appreciate the help. I was really lost without you.",
      "Thank you for helping me fix my file, Ayaan. You stayed calm and patient when I was stressed. That meant a lot!",
      "I guess you saved me. Nice job, I guess.",
    ],
    correctIndex: 2,
  },
  {
    action: "Priya included everyone in the group discussion.",
    options: [
      "Priya, that was so inclusive of you! You made sure everyone’s voice was heard, and that made our session better.",
      "Priya, you talk too much.",
      "It was okay, Priya. You could have let me speak more.",
      "Thanks for running the meeting.",
    ],
    correctIndex: 0,
  },
  {
    action: "Ravi stayed back to clean the classroom.",
    options: [
      "Ravi, thanks for staying and cleaning. You didn’t have to, but it really helped us get done faster.",
      "That’s your job, Ravi.",
      "Cool, you like cleaning I guess?",
      "Wish you told me, I could have left earlier.",
    ],
    correctIndex: 0,
  },
  {
    action: "Sara stood up for a friend being teased.",
    options: [
      "Thanks, Sara. It took courage to speak up. You showed kindness and strength, and that’s inspiring.",
      "Wow, you really went off.",
      "Next time maybe don’t make it a scene.",
      "I didn’t think it was a big deal, but okay.",
    ],
    correctIndex: 0,
  },
  {
    action: "Kabir offered to share his notes when you were absent.",
    options: [
      "Kabir, your notes really helped me catch up. I appreciate you taking the time and being thoughtful.",
      "You always want to show off your notes.",
      "Thanks Kabir. Next time can you type them?",
      "They were alright I guess.",
    ],
    correctIndex: 0,
  },
];

const ComplimentQuest = () => {
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
    if (index === compliments[current].correctIndex) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setTimeout(() => {
        if (current === compliments.length - 1) {
          const finalScore = score + (index === compliments[current].correctIndex ? 1 : 0);
          setScore(finalScore);
          setShowResult(true);
          completeCommunicationChallenge(2, 2);

          // ✅ Performance tracking
          const endTime = Date.now();
          const durationSec = (endTime - startTime) / 1000;
          const accuracy = finalScore / compliments.length;
          const avgResponseTimeSec = durationSec / compliments.length;

          updatePerformance({
            moduleName: "Communication",
            topicName: "communicationSkills",
            score: Math.round(accuracy * 10),
            accuracy: Math.round(accuracy * 100),
            studyTimeMinutes: durationSec / 60,
            avgResponseTimeSec, // ✅ new simple field
            completed: true,

          });
          setStartTime(Date.now());
        } else {
          setCurrent(current + 1);
          setSelected(null);
        }
      }, 1000);
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
    const percentage = Math.round((score / compliments.length) * 100);
    let gif = "";
    if (score === 5) {
      gif = "https://media1.tenor.com/m/V1oCWmxLZYcAAAAd/internin-job.gif";
    } else if (score === 4) {
      gif =
        "https://media.tenor.com/RB2G1B6l9iIAAAAM/the-simpsons-mr-burns.gif";
    } else if (score === 3) {
      gif =
        "https://media.tenor.com/G6x1XW6RLccAAAAM/it%27s-not-a-bad-thing-bryce.gif";
    } else {
      gif =
        "https://media.tenor.com/JKGTMCk_NhcAAAAM/that-was-a-crap-performance-bradley-farquhar.gif";
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0faff] p-4 text-center">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">
          💌 Compliment Quest
        </h1>
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6">
          <h2 className="text-2xl font-bold">🌟 Report Card</h2>
          <img src={gif} alt="Result GIF" className="rounded-xl mx-auto" />
          <p className="text-xl">
            ✅ Score: {score} / {compliments.length}
          </p>
          <p className="text-xl">📊 Percentage: {percentage}%</p>
          <button
            onClick={resetGame}
            className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 transition"
          >
            🔁 Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentScenario = compliments[current];

  return (
    <div className="min-h-screen bg-[#f0faff] py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-pink-800 mb-6 text-center">
        💌 Compliment Quest
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl">
        Choose the most kind and thoughtful STAR compliment for the given peer
        action. STAR = Specific, True, Appreciative, Related to action.
      </p>
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-pink-700">
            Peer Action {current + 1}
          </h2>
          <div className="text-sm text-gray-500">Badge: 🌟 Kind Word Hero</div>
        </div>

        <div className="text-gray-700 font-medium bg-yellow-100 p-4 rounded-xl">
          {currentScenario.action}
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
                  : "bg-white hover:bg-pink-50 border-gray-300"
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
                  ? "https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif"
                  : "https://media.tenor.com/yssbr-JwvCQAAAAM/ponke-ponkesol.gif"
              }
              alt="Feedback GIF"
              className="w-60 mx-auto mt-4 rounded-xl"
            />
          </div>
        )}

        <div className="text-right text-sm text-gray-500">
          Question {current + 1} of {compliments.length}
        </div>
      </div>
    </div>
  );
};

export default ComplimentQuest;
