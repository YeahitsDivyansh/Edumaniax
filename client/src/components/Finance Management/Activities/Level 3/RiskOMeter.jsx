import React, { useState } from "react";
import { GiMoneyStack, GiReceiveMoney, GiChart } from "react-icons/gi";
import { BackgroundBeamsWithCollision } from "../../../../../StyleComponents/BackGroundWithBeams";
import { useFinance } from "@/contexts/FinanceContext";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance


const questions = [
  {
    text: "How would you feel if your money dropped by 20%?",
    icon: <GiMoneyStack className="text-3xl text-yellow-600" />,
    options: [
      { text: "😰 Very anxious", score: 1 },
      { text: "😟 A bit uneasy", score: 2 },
      { text: "😎 Fine, it happens", score: 3 },
    ],
  },
  {
    text: "Would you invest if there's no guarantee but high reward?",
    icon: <GiReceiveMoney className="text-3xl text-green-600" />,
    options: [
      { text: "🙅 No way", score: 1 },
      { text: "🤔 Maybe", score: 2 },
      { text: "🚀 Absolutely", score: 3 },
    ],
  },
  {
    text: "Do you prefer slow, steady growth?",
    icon: <GiChart className="text-3xl text-blue-600" />,
    options: [
      { text: "🐢 Yes", score: 1 },
      { text: "⚖️ Somewhat", score: 2 },
      { text: "🏎️ No, I want faster gains", score: 3 },
    ],
  },
];

function calculateRiskProfile(score) {
  if (score <= 4)
    return {
      label: "🛡️ Cautious",
      color: "text-blue-600",
      img: "./cautions.png",
      description:
        "You prefer safe investments with lower risk and stable returns. You're careful with your money and prioritize financial security.",
    };
  if (score <= 6)
    return {
      label: "⚖️ Balanced",
      color: "text-yellow-600",
      img: "./balanced.jpg",
      description:
        "You like to balance between risk and reward. You’re open to opportunities but also like a safety net in place.",
    };
  return {
    label: "🔥 Aggressive",
    color: "text-red-600",
    img: "./aggressive.jpg",
    description:
      "You’re a bold investor! You seek high rewards and don’t mind market ups and downs as long as the gains are big.",
  };
}

export default function RiskOMeter() {
  const { completeFinanceChallenge } = useFinance();
  const [currentQ, setCurrentQ] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [animate, setAnimate] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const [responseTimes, setResponseTimes] = useState([]);


  const handleAnswer = (score) => {
    // for performance
    const now = Date.now();
    const responseTime = (now - startTime) / 1000;
    setResponseTimes((prev) => [...prev, responseTime]);


    const newScore = totalScore + score;
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setTotalScore(newScore);
    } else {
      setTotalScore(newScore);
      setShowResult(true);
      setAnimate(true);

      //for performance
      const totalTime = [...responseTimes, responseTime].reduce((a, b) => a + b, 0);
      const avgResponseTime = totalTime / questions.length;
      const scaledScore = Math.round((newScore / 9) * 10);
      updatePerformance({
        moduleName: "Finance",
        topicName: "investorLevel",
        score: scaledScore,
        accuracy: scaledScore * 10,
        avgResponseTimeSec: avgResponseTime,
        studyTimeMinutes: Math.ceil(totalTime / 60),
        completed: true,
        
      });
      setStartTime(Date.now());
      // mark challenge completed
      completeFinanceChallenge(2, 1);

      setTimeout(() => {
        setAnimate(false);
      }, 2500);
    }
  };

  const progress = ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100;
  const riskProfile = calculateRiskProfile(totalScore);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background beams behind content */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeamsWithCollision />
      </div>

      {/* Foreground content - centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-5">
        <div className="w-full max-w-2xl rounded-3xl shadow-2xl bg-gradient-to-br from-yellow-100 to-pink-100 transition-all duration-500 p-6">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-pink-600 drop-shadow-md">
            🎉 Risk-O-Meter Game 🎯
          </h2>

          {/* Progress Bar */}
          <div className="w-full bg-pink-200 h-4 rounded-full mb-6">
            <div
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-4 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Result or Questions */}
          {showResult ? (
            <div
              className={`text-center px-4 py-6 rounded-xl shadow-xl bg-white/70 backdrop-blur-md border-4 border-dashed border-purple-200 ${animate ? "animate-bounce" : "animate-none"
                }`}
            >
              <p className="text-3xl font-extrabold text-purple-800 mb-2 tracking-wide">✨ Your Risk Profile ✨</p>
              <p className="mt-1 mb-4 text-lg text-pink-800 font-semibold italic bg-gradient-to-r from-pink-100 to-yellow-100 px-4 py-2 rounded-xl shadow-md inline-block animate-fade-in">
                🌟This profile shows how brave you are with your treasures🌟
              </p>
              <p className={`text-5xl mt-2 ${riskProfile.color} drop-shadow-lg`}>{riskProfile.label}</p>
              <img
                src={riskProfile.img}
                alt={riskProfile.label}
                className="w-44 h-44 mx-auto mt-6 rounded-full border-4 border-purple-300 shadow-2xl ring-2 ring-offset-2 ring-purple-400"
              />

              <p className="mt-6 text-base font-semibold text-gray-800 leading-relaxed bg-gradient-to-br from-white via-rose-50 to-amber-100 p-5 rounded-2xl shadow-2xl border-4 border-dashed border-pink-300 hover:border-rose-500 hover:shadow-pink-200 hover:ring-2 hover:ring-amber-300 backdrop-blur-md animate-slide-up transition-transform transform hover:scale-105">
                ✨ {riskProfile.description} ✨
              </p>

            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4 animate-wiggle">{questions[currentQ].icon}</div>
              <p className="text-2xl font-semibold text-purple-800 mb-6">{questions[currentQ].text}</p>
              <div className="grid gap-4">
                {questions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.score)}
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-400 hover:to-cyan-500 text-white py-3 px-5 rounded-full shadow-md hover:scale-105 transition-transform duration-300 ease-out"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
