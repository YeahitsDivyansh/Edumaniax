import React, { useEffect, useState } from "react";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const dilemmas = [
  {
    question:
      "Your school is planning to cut down 5 trees to expand parking for teachers’ cars.",
    options: [
      "Protest with a placard and ask for a meeting with the principal",
      "Say nothing — not your problem",
      "Suggest vertical parking or carpooling and saving the trees",
    ],
    scores: [2, 0, 3],
    consequence:
      "🌿 You propose an eco-friendly solution. The school saves the trees and starts a carpool policy.",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnFpNjY5cHdoaDFmdmlhcTd4ZnRrcmRod3g5dDNraTBicWFndGY3aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AzOph57CPVtZv9wizL/giphy.webp",
  },
  {
    question:
      "Your school canteen only uses plastic plates, cups, and spoons every day.",
    options: [
      "Bring your own steel tiffin and ask friends to do the same",
      "Complain to the principal about health hazards of plastic",
      "Ignore — it’s convenient and fast",
    ],
    scores: [3, 2, 0],
    consequence:
      "🛍️ By setting an example, you start a student movement. The school shifts to reusable utensils.",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlneGU0ZDB0b3RhZ3ppcXlpcGZwNzlndDRybnIyNGtuNGx0MWdiOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XEPXpgrE79HeIkpNlx/200.webp",
  },
  {
    question: "Students keep the classroom AC on even when windows are open.",
    options: [
      "Close the windows every time and remind others",
      "Enjoy the cool — it’s not your electricity bill",
      "Talk to the class teacher about putting up an energy-saving rule",
    ],
    scores: [2, 0, 3],
    consequence:
      "⚡ The school starts a “1 Room = 1 Rule” campaign and saves on energy bills.",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmFjeDd1dDZ6bzJrOGh5YmhjdGVpcGh1aXl1ZW9manAyaXdidGhpbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPs1EVbbNZYq7EA/200.webp",
  },
  {
    question:
      "Your school is organizing a big celebration. Everything is plastic — balloons, flex banners, decorations.",
    options: [
      "Offer to make eco-friendly décor from paper and cloth with your class",
      "Ask the principal to cancel the event",
      "Just enjoy — it’s once a year",
    ],
    scores: [3, 1, 0],
    consequence:
      "🎨 You lead a DIY décor team. The school gets featured in a local newspaper for going green.",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDI5NHZrdmtta3g3cHphNGxvdnU3dnBqcTc1N2d3c2plZ2FqYXg5OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kTVLfKlKyoUMUOQmuR/200.webp",
  },
  {
    question:
      "The school throws away fruit peels and leftover food into regular dustbins.",
    options: [
      "Propose a compost bin and volunteer to maintain it",
      "Write an anonymous note to the teacher",
      "Pretend not to notice",
    ],
    scores: [3, 1, 0],
    consequence:
      "🍂 Your compost bin helps grow vegetables in the school garden.",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWV2eDEzanMyd2JiM3p5NWF0NzkzbXdwM2tkNnQyZ3ZjeXUybmZqOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohhwm7oY50xTfKrYI/giphy.webp",
  },
];

const resultGifs = {
  perfect: "https://media1.tenor.com/m/V1oCWmxLZYcAAAAd/internin-job.gif",
  great: "https://media.tenor.com/RB2G1B6l9iIAAAAM/the-simpsons-mr-burns.gif",
  okay: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamx5aDBydXYwbHUwMzdsNHpiNnFzb2NhNXoybDd5dGhqeTlwZHU3YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8L0Pky6C83SzkzU55a/giphy.gif",
  poor: "https://media.tenor.com/yssbr-JwvCQAAAAM/ponke-ponkesol.gif",
};

const getFeedbackText = (score) => {
  if (score >= 13)
    return "🌱 Sustainability Star — You're a true green leader who inspires action.";
  if (score >= 9)
    return "♻️ Eco Thinker — You care and make a difference with thoughtful choices.";
  return "🌍 Needs Reflection — Every step matters. Let’s keep learning and improving!";
};

const DilemmaCards = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();

  const [index, setIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (index >= dilemmas.length && score >= 9) {
      completeEnvirnomentChallenge(2, 2); // Challenge 3, Task 1 completed
    }
  }, [index, score]);
  useEffect(() => {
    if (index >= dilemmas.length) {
      const endTime = Date.now();
      const totalTimeSec = Math.floor((endTime - startTime) / 1000);
      const avgResponseTimeSec = totalTimeSec / dilemmas.length;
      const scaledScore = Number(((score / (dilemmas.length * 3)) * 10).toFixed(2));

      updatePerformance({
        moduleName: "Environment",
        topicName: "climateAnalyst",
        score: scaledScore,
        accuracy: (score / (dilemmas.length * 3)) * 100,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(totalTimeSec / 60),
        completed: score >= 9,
      });
      setStartTime(Date.now());
    }
  }, [index]);


  const handleChoice = (choiceIdx) => {
    const points = dilemmas[index].scores[choiceIdx];
    setScore((s) => s + points);
    setSelected(choiceIdx);
    setShowConsequence(true);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowConsequence(false);
    }, 3000);
  };

  const restart = () => {
    setIndex(-1);
    setScore(0);
    setSelected(null);
    setShowConsequence(false);
    setStartTime(Date.now());
  };

  if (index === -1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW54cHhoN2lvcDljY2xxczA5NzNwMHM5dXZ6eXdxazF1ZWJpODd5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WhY7LHnGaJqeHUIcvr/giphy.webp"
          alt="intro"
          className="w-64 mb-4 rounded-xl"
        />
        <h1 className="text-3xl font-bold mb-2">
          ♻️ Challenge 3: Dilemma Cards
        </h1>
        <p className="text-lg mb-4">
          Read the scenario, choose wisely, and see the real-world result. +3
          for the best action!
        </p>
        <button
          onClick={() => setIndex(0)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        >
          🎮 Play Game
        </button>
      </div>
    );
  }

  if (index >= dilemmas.length) {
    let resultGif = resultGifs.poor;
    if (score >= 13) resultGif = resultGifs.perfect;
    else if (score >= 9) resultGif = resultGifs.great;
    else if (score >= 5) resultGif = resultGifs.okay;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
        <h2 className="text-3xl font-bold mb-2">🏁 Game Over!</h2>
        <p className="text-xl mb-1">Your Score: {score} / 15</p>
        <p className="text-lg mb-4">{getFeedbackText(score)}</p>
        <img
          src={resultGif}
          alt="result gif"
          className="w-64 mb-4 rounded-xl"
        />
        <button
          onClick={restart}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        >
          🔁 Play Again
        </button>
      </div>
    );
  }

  const current = dilemmas[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">🔶 Dilemma {index + 1}</h2>
      <p className="text-lg mb-4">{current.question}</p>
      <img
        src={current.gif}
        alt="dilemma visual"
        className="w-64 mb-4 rounded-xl"
      />
      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(i)}
            disabled={showConsequence}
            className={`px-4 py-2 rounded-xl border text-left ${selected === i
              ? "bg-green-200 border-green-600"
              : "bg-white border-gray-300"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showConsequence && (
        <p className="mt-4 text-green-800 font-semibold">
          {current.consequence}
        </p>
      )}
    </div>
  );
};

export default DilemmaCards;
