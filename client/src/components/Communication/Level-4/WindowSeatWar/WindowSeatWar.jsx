import React, { useState } from "react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const allStatements = [
  {
    id: "1",
    text: "How about I sit by the window in the morning, and you get it after lunch?",
    isCorrect: true,
  },
  {
    id: "2",
    text: "We could ask the teacher if we can alternate seats every day.",
    isCorrect: true,
  },
  {
    id: "3",
    text: "Let’s both try sitting somewhere else today and see if we like it.",
    isCorrect: true,
  },
  {
    id: "4",
    text: "Fine, I’ll just sit alone then. Don’t talk to me!",
    isCorrect: false,
  },
  { id: "5", text: "Why do you always have to ruin things?", isCorrect: false },
  { id: "6", text: "I’m never sitting with you again!", isCorrect: false },
  {
    id: "7",
    text: "I’ll ask the driver to remove you from the bus.",
    isCorrect: false,
  },
];

const conversation = [
  {
    speaker: "Sara",
    tone: "😤 Frustrated",
    text: "I always sit by the window! You got it last week, so now it’s my turn.",
    align: "left",
  },
  {
    speaker: "Arjun",
    tone: "🛡️ Defensive",
    text: "But I really want to look outside today. It helps me feel calm before the test.",
    align: "right",
  },
  {
    speaker: "Sara",
    tone: "😢 Hurt",
    text: "That’s not fair! You just say that every time.",
    align: "left",
  },
  {
    speaker: "Arjun",
    tone: "😊 Calmer",
    text: "I didn’t mean to upset you. Maybe we can switch halfway through the ride?",
    align: "right",
  },
];

const WindowSeatWarGame = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [available, setAvailable] = useState(allStatements);
  const [dropped, setDropped] = useState([]);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleGameFinish = () => {
    const endTime = Date.now();
    const durationSec = (endTime - startTime) / 1000;
    const responseCount = dropped.length;
    const avgResponseTimeSec =
      responseCount > 0 ? durationSec / responseCount : 0;

    updatePerformance({
      moduleName: "Communication",
      topicName: "situationalAwareness",
      score: 10,
      accuracy: 100,
      studyTimeMinutes: durationSec / 60,
      avgResponseTimeSec: avgResponseTimeSec,
      completed: true,

    });
    setStartTime(Date.now());
  };



  const handleDrop = (statement) => {
    if (dropped.find((item) => item.id === statement.id)) return;

    const newDropped = [...dropped, statement];
    setDropped(newDropped);
    setAvailable(available.filter((s) => s.id !== statement.id));

    if (statement.isCorrect) {
      const correctCount = newDropped.filter((item) => item.isCorrect).length;

      if (correctCount === 1) {
        setMessage("✅ Good! You can still do better.");
        setGifUrl(
          "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW8xdHo2OXhvOWpobDFjbDV5bWpqbGp5NTJ0d2l1cXZvM3QxcjUxMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FemTGpEZeK27M5fKL4/giphy.webp"
        );
      } else if (correctCount === 2) {
        setMessage("🌟 Brilliant! Just give a last check.");
        setGifUrl(
          "https://media0.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dmYybjJxcHFpbGVkd2RwbmE5Y2txZXI5a3pqZnJwc2l1amN4aTg2OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BxPtlXBZjfsMKbGDZa/200.webp"
        );
      } else if (correctCount === 3) {
        setMessage("🏆 Excellent work!");
        setGifUrl(
          "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmFiN2pmYXQwMnlhcWlyNjI1d2cxbzZvZHlkb2R5dmRzZ2x1NDNwayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H1NIKdfygAAMruqArl/200.webp"
        );
        setCompleted(true);
        completeCommunicationChallenge(3, 0);
        handleGameFinish(); // ✅ Log performance data
      }
    } else {
      setMessage("❌ You're a conflict creator, not a resolver.");
      setGifUrl("https://media0.giphy.com/media/e37RbTLYjfc1q/200.webp"); // GIF for wrong drop
    }
  };

  const resetGame = () => {
    setAvailable(allStatements);
    setDropped([]);
    setMessage("");
    setCompleted(false);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🚌 The Window Seat War</h1>

      {/* 🗨️ Conversation Display */}
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-lg mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🎭 The Argument:
        </h2>
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.align === "right" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-sm px-4 py-3 rounded-xl shadow ${msg.align === "right"
                ? "bg-blue-200 text-right"
                : "bg-pink-200 text-left"
                }`}
            >
              <div className="text-sm font-semibold mb-1">
                {msg.speaker} <span className="ml-1 text-xs">({msg.tone})</span>
              </div>
              <div className="text-base">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🎮 Game Area */}
      <div className="text-lg mb-4 text-gray-700 max-w-2xl text-center">
        Drag the best resolution options into the box below. Only three are
        correct!
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Available Statements */}
        <div className="flex-1 bg-white rounded-xl p-4 shadow-md">
          <h2 className="font-semibold text-lg mb-4">
            🧩 Available Statements
          </h2>
          <div className="space-y-3">
            {available.map((statement) => (
              <div
                key={statement.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("statementId", statement.id);
                }}
                className="p-3 bg-gray-100 rounded-lg cursor-move hover:bg-gray-200 transition"
              >
                {statement.text}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("statementId");
            const dragged = allStatements.find((s) => s.id === id);
            if (dragged) handleDrop(dragged);
          }}
          className="flex-1 bg-green-50 rounded-xl p-4 shadow-md border-2 border-dashed border-green-400 min-h-[300px]"
        >
          <h2 className="font-semibold text-lg mb-4">📥 Resolution Box</h2>
          {dropped.length === 0 && (
            <p className="text-gray-500 italic">
              Drop resolution statements here...
            </p>
          )}
          <ul className="space-y-2">
            {dropped.map((s) => (
              <li
                key={s.id}
                className={`p-3 rounded-lg ${s.isCorrect ? "bg-green-200" : "bg-red-200"
                  }`}
              >
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feedback Message */}
      {message && (
        <div className="mt-6 text-xl font-semibold text-center text-indigo-700">
          {message}
        </div>
      )}

      {/* GIF Reaction */}
      {gifUrl && (
        <img
          src={gifUrl}
          alt="Reaction GIF"
          className="mt-4 w-64 h-auto rounded-xl shadow-lg"
        />
      )}

      {/* Play Again */}
      {completed && (
        <button
          onClick={resetGame}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          🔄 Play Again
        </button>
      )}
    </div>
  );
};

export default WindowSeatWarGame;
