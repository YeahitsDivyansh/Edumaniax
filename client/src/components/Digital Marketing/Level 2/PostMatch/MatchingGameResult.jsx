import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";


const MatchingGameResult = () => {
  const { completeDMChallenge } = useDM();
  const navigate = useNavigate();

  const location = useLocation();
  const score = location.state?.score;

  useEffect(() => {
    if (typeof score === "number") {
      completeDMChallenge(1, 2);
    }
    // Only run when score changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);


  let remark = "";

  if (score > 3) {
    remark = "That was Excellent. Well done!!!";
  } else if (score === 3) {
    remark = "Well tried. You have great potential!!!";
  } else {
    remark = "You need to improve a lot. Try again";
  }

  const handlePlayAgain = () => {
    navigate("/matching-game"); // or wherever your main game starts
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (!myCanvas) return;

    // Prevent multiple confetti initializations
    let isConfettiInitialized = false;
    if (!isConfettiInitialized) {
      const myConfetti = confetti.create(myCanvas, {
        resize: false,
        useWorker: true,
      });
      isConfettiInitialized = true;

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

      // Cleanup to avoid multiple initializations
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div
      className="w-[90%] mx-auto p-5 h-screen "
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full h-[60%] md:h-[80%] lg:h-[90%] rounded-2xl relative shadow-2xl flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-yellow-100 text-center p-6">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="absolute top-0 left-0 pointer-events-none"
        />
        <h1 className="text-xl md:text-5xl font-extrabold text-purple-700 mb-4 animate-bounce">
          🎉 Game Complete! 🎉
        </h1>
        <p className=" text-xs md:text-2xl text-gray-800 mb-6">
          Your score : {score > 4 ? 4 : score}/4 🧠✨
          <br />
          {remark}
        </p>

        {score === 4 && (
          <div className="text-xs md:text-2xl lg:text-3xl mb-8">
            🏆{" "}
            <span className="text-yellow-600 font-bold">
              Post Matching Champion
            </span>{" "}
            🏆
          </div>
        )}

        <button
          onClick={handlePlayAgain}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
        >
          Play Again 🔁
        </button>
      </div>
    </div>
  );
};

export default MatchingGameResult;
