import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useLaw } from "@/contexts/LawContext";
const options = [
  { id: "o1", label: "The mental intention to commit a crime" },
  { id: "o2", label: "Produce the body; protect against unlawful detention" },
  { id: "o3", label: "Courts can strike down unconstitutional laws" },
  { id: "o4", label: "Invalid from the beginning" },
  { id: "o5", label: "Hear both sides – principle of natural justice" },
  { id: "o6", label: "Law must be fair, just, and reasonable" },
];

const correctMatches = {
  b1: "o1", // Mens Rea → The mental intention to commit a crime
  b2: "o2", // Habeas Corpus → Produce the body; protect against unlawful detention
  b3: "o3", // Judicial Review → Courts can strike down unconstitutional laws
  b4: "o4", // Void ab initio → Invalid from the beginning
  b5: "o5", // Audi alteram partem → Hear both sides – principle of natural justice
  b6: "o6", // Due Process → Law must be fair, just, and reasonable
};

const LegalConceptsResult = () => {
  const { completeLawChallenge } = useLaw();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const score = location.state?.score || 0;
  const matches = location.state?.matches || [];
  const totalQuestions = location.state?.totalQuestions || 6;

  let remark = "";

  if (score > 5) {
    remark = "That was Excellent. Well done!!!";
  } else if (score === 5) {
    remark = "Well tried. You have great potential!!!";
  } else {
    remark = "You need to improve a lot. Try again";
  }

  const handlePlayAgain = () => {
    navigate("/LegalConceptsGame"); // or wherever your main game starts
  };

  const canvasRef = useRef(null);

  // Get correct answer for a brand
  const getCorrectAnswer = (brandId) => {
    const correctOptionId = correctMatches[brandId];
    return options.find((option) => option.id === correctOptionId)?.label || "";
  };

  useEffect(() => {
    completeLawChallenge(2,0);

    const myCanvas = canvasRef.current;
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  return (
    <div
      className="w-[90%] mx-auto p-3 md:p-5 min-h-screen rounded-xl mt-5 shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800 via-slate-600"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full min-h-full rounded-2xl relative shadow-2xl flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-yellow-100 text-center p-4 md:p-6">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />

        <h1 className="text-xl md:text-5xl font-extrabold text-purple-700 mb-4 animate-bounce">
          🎉 Game Complete! 🎉
        </h1>

        <p className="text-sm md:text-xl text-gray-800 mb-6">
          Your score : {score}/{totalQuestions} 🧠✨
          <br />
          {remark}
        </p>

        {score === totalQuestions && (
          <div className="text-md md:text-3xl mb-8">
            🏆 <span className="text-yellow-600 font-bold">Juris Genius</span>{" "}
            🏆
          </div>
        )}

        {/* Detailed Results Section */}
        <div className="w-full max-w-4xl mb-8 bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6">
          <h2 className="text-lg md:text-2xl font-bold text-purple-700 mb-4">
            📊 Your Detailed Results
          </h2>

          <div className="space-y-3 md:space-y-4">
            {matches.map((match, index) => (
              <div
                key={index}
                className={`p-3 md:p-4 rounded-lg shadow-md ${
                  match.isCorrect
                    ? "bg-green-100 border-l-4 border-green-500"
                    : "bg-red-100 border-l-4 border-red-500"
                }`}
              >
                <div className="flex flex-col space-y-2">
                  {/* Question and User's Answer */}
                  <div className="text-left">
                    <div className="font-bold text-sm md:text-base text-gray-800">
                      {match.isCorrect ? "✅" : "❌"} {match.brand.name}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 mt-1">
                      <span className="font-medium">Your answer:</span>{" "}
                      {match.option.label}
                    </div>
                  </div>

                  {/* Show correct answer for incorrect matches */}
                  {!match.isCorrect && (
                    <div className="text-left bg-green-50 p-2 rounded border-l-2 border-green-400">
                      <div className="text-xs md:text-sm text-green-700">
                        <span className="font-medium">Correct answer:</span>{" "}
                        {getCorrectAnswer(match.brand.id)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePlayAgain}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg text-sm md:text-base"
        >
          Play Again 🔁
        </button>
      </div>
    </div>
  );
};

export default LegalConceptsResult;
