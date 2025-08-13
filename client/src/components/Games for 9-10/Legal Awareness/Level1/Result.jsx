import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useLaw } from "@/contexts/LawContext";

const options = [
  { 
    id: "o1",
    label: "The supreme legal document of India created after independence.",
  },
  {
    id: "o2",
    label:
      "The apex judicial body ensuring justice and constitutional supremacy.",
  },
  {
    id: "o3",
    label:
      "The judiciary’s authority to strike down laws violating the Constitution.",
  },
  {
    id: "o4",
    label:
      "The directly elected house representing the Indian people in Parliament.",
  },
  {
    id: "o5",
    label:
      "Laws regulating digital conduct, data protection, and cybercrime.",
  },
  {
    id: "o6",
    label: "The group that drafted the Indian Constitution between 1946-49.",
  },
  {
    id: "o7",
    label: "The President’s formal approval required to make a bill a law.",
  },
  {
    id: "o8",
    label:
      "Recognized as a fundamental right protecting personal data and freedom.",
  },
  {
    id: "o9",
    label: "The global body promoting peace, security, and cooperation.",
  },
  {
    id: "o10",
    label:
      "The UN organ with permanent members having veto power on major issues.",
  },
];

const correctMatches = {
  b1: "o1",
  b2: "o2",
  b3: "o3",
  b4: "o4",
  b5: "o5",
  b6: "o6",
  b7: "o7",
  b8: "o8",
  b9: "o9",
  b10: "o10",
};

const MatchTermsGameResult = () => {
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
    navigate("/MatchTermsGame"); // or wherever your main game starts
  };

  // Get correct answer for a brand
  const getCorrectAnswer = (brandId) => {
    const correctOptionId = correctMatches[brandId];
    return options.find((option) => option.id === correctOptionId)?.label || "";
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (!myCanvas || !confetti) return; // check for canvas and confetti presence

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    let animationFrameId;

    const frame = () => {
      if (Date.now() > end) return;

      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.2 },
        colors,
      });

      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.2 },
        colors,
      });

      animationFrameId = requestAnimationFrame(frame);
    };

    frame();

    completeLawChallenge(0,0);

    // ✅ Cleanup function to stop the animation
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      className="w-[90%] mx-auto p-3 md:p-5 min-h-screen rounded-xl mt-5 shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800 via-slate-600"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full min-h-full rounded-2xl relative shadow-2xl flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-yellow-100 text-center p-4 md:p-6">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
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
            🏆{" "}
            <span className="text-yellow-600 font-bold">
              Congrats, Champion!
            </span>{" "}
            🏆
          </div>
        )}

        {/* Detailed Results Section */}
        <div className=" max-w-4xl mb-8 bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6">
          <h2 className="text-lg md:text-2xl font-bold text-purple-700 mb-4">
            📊 Your Detailed Results
          </h2>

          <div
            className={` space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 md:space-y-4`}
          >
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
                    <div className="font-bold text-sm md:text-lg text-gray-800">
                      {match.isCorrect ? "✅" : "❌"} {match.brand.name}
                    </div>
                    <div className="text-xs md:text-lg text-gray-600 mt-1">
                      <span className="font-medium">Your answer:</span>{" "}
                      {match.option.label}
                    </div>
                  </div>

                  {/* Show correct answer for incorrect matches */}
                  {!match.isCorrect && (
                    <div className="text-left bg-green-50 p-2 rounded border-l-2 border-green-400">
                      <div className="text-xs md:text-lg text-green-700">
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

export default MatchTermsGameResult;
