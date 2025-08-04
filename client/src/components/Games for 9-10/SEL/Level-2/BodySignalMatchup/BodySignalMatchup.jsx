import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const signals = [
  { id: "1", text: "Tense jaw", match: "Frustration" },
  { id: "2", text: "Rapid heartbeat", match: "Anxiety" },
  { id: "3", text: "Restless energy", match: "Excitement" },
  { id: "4", text: "Slumped posture", match: "Low motivation" },
  { id: "5", text: "Stomach pain", match: "Stress" },
];

const emotions = [
  "Frustration",
  "Anxiety",
  "Excitement",
  "Low motivation",
  "Stress",
];

const DraggableSignal = ({ signal }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: signal.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-2 rounded-xl shadow cursor-move bg-white border"
    >
      {signal.text}
    </div>
  );
};

const DroppableEmotion = ({ emotion, matchedSignal }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: emotion,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl border-2 h-20 flex items-center justify-center text-center transition ${isOver ? "bg-blue-100 border-blue-400" : "bg-gray-100"
        }`}
    >
      {matchedSignal ? matchedSignal.text : <span>{emotion}</span>}
    </div>
  );
};

const BodySignalMatchup = () => {
  const { completeSELChallenge } = useSEL();
  const [matches, setMatches] = useState({});
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [activeSignal, setActiveSignal] = useState(null);
  const [step, setStep] = useState("intro");
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (Object.keys(matches).length === signals.length) {
      setWin(true);
      setGameOver(true);
      fireConfetti();
      completeSELChallenge(1, 2);

      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: durationSec / signals.length,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: true,
 
      });
      setStartTime(Date.now());

    }
  }, [matches]);

  useEffect(() => {
    if (step === "game" && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !win) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, win, step]);



  const handleDragStart = (event) => {
    const signal = signals.find((s) => s.id === event.active.id);
    setActiveSignal(signal);
  };

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over && activeSignal) {
      const isCorrect = activeSignal.match === over.id;
      if (isCorrect) {
        setMatches((prev) => ({
          ...prev,
          [over.id]: activeSignal,
        }));
      }
    }
    setActiveSignal(null);
  };

  useEffect(() => {
    if (Object.keys(matches).length === signals.length) {
      setWin(true);
      setGameOver(true);
      fireConfetti();
      completeSELChallenge(1, 2);
    }
  }, [matches]);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const resetGame = () => {
    setMatches({});
    setTimeLeft(90);
    setGameOver(false);
    setWin(false);
    setStartTime(Date.now());
    setStep("intro"); // 👈 this line brings the player back to the intro screen
  };

  if (step === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-blue-50 p-6">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWQzOXlybGkzM2s2ZXQ1NWVyc29iMmV3amhwZ3MzcTN2ZXR2OTl0OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9bK3VDWSdu1X8VGhlg/giphy.webp"
          alt="Intro GIF"
          className="w-80 h-auto mb-6 rounded-xl shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2">🧠 Mind-Body Signals</h1>
        <p className="text-gray-700 mb-6 max-w-xl">
          Welcome! You'll see 5 physical signs. Drag each one to the matching
          emotional state. You have <strong>90 seconds</strong> to complete the
          game. Can you recognize how your body talks to your brain?
        </p>
        <button
          onClick={() => setStep("game")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 p-6">
        <img
          src={
            win
              ? "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNzOTUzcDN0YmQwbzRxZXUwaXk2MGYyaGtidzFsMzVoZmQxam5sMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kzJ2kzfIeWUBwzryjl/giphy.webp"
              : "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmVyN3BlaXI3YjJ4dW1ldW5uanFrNjVsdzF1cTd6ZGVlMHYxZjZzdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kzj3PGiXUCEiv6WMz6/giphy.webp"
          }
          className="w-64 h-64 rounded-xl object-cover mb-4"
          alt="Result"
        />
        <h2 className="text-2xl font-bold mb-2">
          {win ? "🎉 You matched all signals!" : "⏳ Time’s up!"}
        </h2>
        <p className="text-gray-600 mb-6">
          {win
            ? "Amazing job! Your awareness is on point."
            : "Give it another go and tune into your body's clues."}
        </p>
        {win ? (
          <Link
            to="/smart-goal-lab"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 mb-4"
          >
            Move to Next Game →
          </Link>
        ) : null}
        <button
          onClick={resetGame}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">🧠 Mind-Body Signals</h1>
          <p className="text-gray-700">
            Match each physical sign to the correct emotional state. You have{" "}
            <strong>90 seconds</strong>!
          </p>
          <p className="text-2xl font-semibold mt-2 text-blue-800">
            ⏱️ {timeLeft}s
          </p>
        </div>

        {/* Silhouette GIF */}
        <div className="flex justify-center mb-6">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJvOTBhaTMxYTJnc3NxZ2dncWs1N3psNDhqY3dwMzZkMm83cjJmMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xfXqd2vysimRRYCb5u/giphy.webp"
            alt="Animated Silhouette"
            className="w-40 h-52 object-contain rounded-xl shadow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2 text-center">
              🏷️ Physical Signals
            </h3>
            {signals.map(
              (signal) =>
                !Object.values(matches).some((s) => s.id === signal.id) && (
                  <DraggableSignal key={signal.id} signal={signal} />
                )
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2 text-center">
              🎭 Emotions
            </h3>
            {emotions.map((emotion) => (
              <DroppableEmotion
                key={emotion}
                emotion={emotion}
                matchedSignal={matches[emotion]}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default BodySignalMatchup;
