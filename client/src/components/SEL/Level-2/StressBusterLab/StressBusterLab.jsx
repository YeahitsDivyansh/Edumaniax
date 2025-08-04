import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const tools = [
  { label: "Deep breaths", helpful: true },
  { label: "Listen to music", helpful: true },
  { label: "Talk to a friend", helpful: true },
  { label: "Scroll Instagram", helpful: false },
  { label: "Eat junk food", helpful: false },
  { label: "Take a walk", helpful: true },
  { label: "Scream into your pillow", helpful: false },
  { label: "Watch a comedy video", helpful: true },
];

const StressBusterLab = () => {
  const { completeSELChallenge } = useSEL();
  const [dropItems, setDropItems] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const handleDrop = (e) => {
    const index = e.dataTransfer.getData("toolIndex");
    const tool = tools[index];

    if (dropItems.includes(index) || dropItems.length >= 5) return;

    const audio = new Audio(
      tool.helpful
        ? "/sonido-correcto-331225.mp3"
        : "https://www.myinstants.com/media/sounds/windows-error.mp3"
    );
    audio.play();

    setDropItems([...dropItems, index]);
    setFeedback((prev) => ({
      ...prev,
      [index]: tool.helpful ? "green" : "red",
    }));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("toolIndex", index);
  };

  const handlePlayAgain = () => {
    setDropItems([]);
    setFeedback({});
    setScore(null);
    setStartTime(Date.now());

  };

  const calculateScore = () => {
    let correct = 0;
    dropItems.forEach((i) => {
      if (tools[i].helpful) correct++;
    });
    setScore(correct);
  };

  useEffect(() => {
    if (score >= 4) {
      const audio = new Audio(
        "/children-saying-yay-praise-and-worship-jesus-299607.mp3"
      );
      audio.play();
    }
  }, [score]);

  useEffect(() => {
    if (score !== null) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);
      const scaledScore = Math.round((score / 5) * 10);

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: scaledScore,
        accuracy: (score / 5) * 100,
        avgResponseTimeSec: totalSeconds / 5,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 4,

      });
      setStartTime(Date.now());

      if (score >= 4) {
        completeSELChallenge(1, 0);
      }
    }
  }, [score]);



  const getGifForScore = () => {
    if (score >= 4)
      return "https://media.tenor.com/CgjirlJs7xsAAAAM/nice-nooice.gif";
    if (score === 3)
      return "https://media.tenor.com/IwHuU483A3MAAAA1/curb-your-enthusiasm-larry-david.webp";
    if (score === 2)
      return "https://media.tenor.com/UrIakXGExfUAAAAM/mr-bean.gif";
    return "https://media.tenor.com/LwQz3a4KDtcAAAAM/thumbs-down-bad-job.gif";
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        Stress Buster Lab – Build Your Toolkit!
      </h1>
      <p className="text-center text-lg mb-6 max-w-xl">
        You’re feeling super stressed. Can you choose the tools that will really
        help? <br />
        <strong>Drag 5 items</strong> into your stress toolkit.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            draggable={
              !dropItems.includes(index) &&
              score === null &&
              dropItems.length < 5
            }
            onDragStart={(e) => handleDragStart(e, index)}
            className={cn(
              "border rounded-lg p-4 text-center font-medium transition duration-300 cursor-pointer",
              {
                "bg-green-200 border-green-600 scale-105":
                  feedback[index] === "green",
                "bg-red-200 border-red-600 animate-shake":
                  feedback[index] === "red",
                "opacity-50 cursor-not-allowed":
                  dropItems.includes(index) || dropItems.length >= 5,
                "bg-white hover:bg-gray-100": !dropItems.includes(index),
              }
            )}
          >
            {tool.label}
          </div>
        ))}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full max-w-md min-h-[200px] border-4 border-dashed border-gray-400 rounded-xl flex flex-wrap justify-center items-center gap-4 p-6 bg-white shadow-md"
      >
        {dropItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            Drop your stress busters here
          </p>
        ) : (
          dropItems.map((index) => (
            <div
              key={index}
              className={cn(
                "px-4 py-2 rounded-lg text-white font-semibold",
                tools[index].helpful ? "bg-green-500" : "bg-red-500"
              )}
            >
              {tools[index].label}
            </div>
          ))
        )}
      </div>

      {dropItems.length === 5 && score === null && (
        <button
          onClick={calculateScore}
          className="mt-6 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          See Your Score
        </button>
      )}

      {score !== null && (
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-green-700 mb-2">
            You scored {score} out of 5 helpful choices!
          </p>
          <img
            src={getGifForScore()}
            alt="Result Gif"
            className="w-64 h-auto rounded-lg mx-auto mb-4"
          />
          <button
            onClick={handlePlayAgain}
            className="mt-2 bg-gray-700 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default StressBusterLab;
