import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const introGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWQ4b3VmcHNpcmRpZ2YzeDQxY3F1bjR3N2E1Y2RiMnBpOTk1cDg5aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9AaNbSShRHQQfosEOm/200.webp";
const correctGif =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTgwdGZlZzc3ZWg0YXF6dm5zM2tqNTZiNWozc282MmkwM3NsMG5lOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/M33UV4NDvkTHa/200.webp";
const incorrectGif =
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXNuMGF6cDVxaGc1Mjd0Mm00bzVsMTVrNnl0enU4cnJ6aTNyMnRpdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l49JVpIbwls7ihKxi/200.webp";
const winGif =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJpeWFnNzY3Yml6eDFuNWR3Ymg2bTdnang2Y2Y5cm5xYTQ5eWxxaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/K3RxMSrERT8iI/giphy.webp";
const loseGif =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDhiZGpmYTdqOHZ1MGNqNGM0amh5aTBpMzQzaDRhOXducHJjMDNnYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dag29oA7S87ar5TBub/giphy.webp";

const cards = [
  {
    question: "Why is urea overused in Indian agriculture?",
    options: [
      {
        front: "Urea gives a quick crop boost – every farmer swears by it!",
        back: "✅ Correct! 💥 It’s heavily subsidized and gives quick results. +1 mark!",
        isCorrect: true,
      },
      {
        front: "Long-term soil health? Urea is a magic fix!",
        back: "❌ Nope! 🧪 Urea actually degrades soil over time. 0 marks.",
        isCorrect: false,
      },
      {
        front: "It’s the only fertilizer accessible in rural markets.",
        back: "❌ Not quite! 📦 It’s common but not the only one available. 0 marks.",
        isCorrect: false,
      },
      {
        front: "Urea is eco-friendly and natural, right?",
        back: "❌ Incorrect. 🌿 It’s synthetic and overuse harms the environment. 0 marks.",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What environmental issue is directly linked to excess urea?",
    options: [
      {
        front: "More urea = fewer trees. It causes deforestation!",
        back: "❌ Incorrect! 🌳 Deforestation isn’t directly caused by urea. 0 marks.",
        isCorrect: false,
      },
      {
        front: "It seeps into water and weakens the soil?",
        back: "✅ Yes! 💧 It causes nitrate pollution and soil fatigue. +1 mark!",
        isCorrect: true,
      },
      {
        front: "It blocks drains and causes urban flooding!",
        back: "❌ Nope! 🌧️ Urban flooding isn’t linked to urea use. 0 marks.",
        isCorrect: false,
      },
      {
        front: "It speeds up melting glaciers due to emissions!",
        back: "❌ Incorrect! ❄️ That’s more about fossil fuels, not urea. 0 marks.",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What’s a smarter policy move than banning urea?",
    options: [
      {
        front: "Let’s promote compost and biofertilizers instead!",
        back: "✅ Spot on! 🌿 Subsidizing eco-alternatives is smart policy. +1 mark!",
        isCorrect: true,
      },
      {
        front: "Farmers should be fined for overusing it!",
        back: "❌ Not effective. 🚫 Penalties may increase resistance. 0 marks.",
        isCorrect: false,
      },
      {
        front: "Let’s build more urea factories to meet demand!",
        back: "❌ Nope! 🏭 That encourages more use, not less. 0 marks.",
        isCorrect: false,
      },
      {
        front: "Import more urea — problem solved!",
        back: "❌ Incorrect! 🌍 Importing just shifts the issue. 0 marks.",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What message can shift farmer behaviour?",
    options: [
      {
        front: "Let’s go hard — 'Urea is poison!'",
        back: "❌ Fear doesn’t work. ☠️ People shut down with such messaging. 0 marks.",
        isCorrect: false,
      },
      {
        front: "A farmer’s wealth starts with healthy soil!",
        back: "✅ Exactly! 💚 'Healthy Soil, Wealthy Farmer' motivates positive change. +1 mark!",
        isCorrect: true,
      },
      {
        front: "Strict rule: 'Stop using urea or get fined!'",
        back: "❌ Not ideal. 📢 It’s too threatening and could backfire. 0 marks.",
        isCorrect: false,
      },
      {
        front: "All or nothing: 'Chemical-free or nothing!'",
        back: "❌ Too extreme. 🧪 Real change needs balance, not ultimatums. 0 marks.",
        isCorrect: false,
      },
    ],
  },
];

const OptionCard = ({ front, back, isCorrect, onFlip, flipped, disabled }) => (
  <motion.div
    className="relative w-full h-24 sm:h-28 cursor-pointer rounded-xl"
    onClick={() => !flipped && !disabled && onFlip()}
    animate={{ rotateY: flipped ? 180 : 0 }}
    transition={{ duration: 0.6 }}
    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
  >
    <div
      className="absolute inset-0 bg-white border border-gray-300 flex items-center justify-center text-center px-4 py-2 text-sm sm:text-base font-medium rounded-xl shadow-md backface-hidden"
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {front}
    </div>
    <div
      className={`absolute inset-0 ${isCorrect ? "bg-green-100" : "bg-red-100"
        } border border-gray-300 flex items-center justify-center text-center px-4 py-2 text-sm sm:text-base font-semibold rounded-xl shadow-md`}
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {isCorrect ? `✅ ${back}` : `❌ ${back}`}
    </div>
  </motion.div>
);

const UreaAddiction = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [step, setStep] = useState("intro"); // "intro", "game", "end"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(null);
  const { width, height } = useWindowSize();
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());


  useEffect(() => {
    const allCorrect = score === cards.length && currentIndex >= cards.length;
    const totalTimeMs = Date.now() - startTime;

    if (currentIndex >= cards.length) {
      updatePerformance({
        moduleName: "Environment",
        topicName: "sustainableLeader",
        score: Math.round((score / cards.length) * 10),
        accuracy: parseFloat(((score / cards.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / cards.length / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: allCorrect,

      });
      setStartTime(Date.now());

      if (allCorrect) {
        completeEnvirnomentChallenge(2, 0);
      }
    }
  }, [currentIndex, score]);


  const currentCard = cards[currentIndex];

  const handleFlip = (isCorrect, idx) => {
    setFlippedIndex(idx);
    setLocked(true);
    setLastCorrect(isCorrect);
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setFlippedIndex(null);
      setLocked(false);
      setLastCorrect(null);
    }, 2500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStep("game");
    setFlippedIndex(null);
    setStartTime(Date.now());

  };

  if (step === "intro") {
    return (
      <div className="min-h-screen p-6 bg-green-50 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-2 text-green-800">
          🌾 Urea Addiction – Reform Without Fallout
        </h1>
        <p className="max-w-2xl mb-4 text-gray-700">
          Urea is widely used in Indian agriculture due to subsidies and instant
          yield boosts. However, overuse degrades soil and pollutes water
          bodies. Biofertilizers are a sustainable solution.
        </p>
        <ul className="text-left max-w-lg mb-6 text-gray-800">
          <li>
            ✅ <strong>Advantages:</strong> Immediate yield boost, easy access
          </li>
          <li>
            ❌ <strong>Disadvantages:</strong> Soil fatigue, water pollution,
            dependency
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          🕹️ How to Play
        </h2>
        <p className="mb-4">
          Flip the card you think is correct. Get it right to move forward!
        </p>
        <img
          src={introGif}
          alt="intro"
          className="w-64 rounded-xl shadow mb-4"
        />
        <button
          onClick={() => setStep("game")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (currentIndex >= cards.length) {
    const allCorrect = score === cards.length;
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-gray-50 relative">
        {allCorrect && <Confetti width={width} height={height} />}
        <img
          src={allCorrect ? winGif : loseGif}
          alt="result"
          className="w-64 rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">
          {allCorrect ? "🌟 Outstanding!" : "📘 Great Try!"}
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          You got {score} out of {cards.length} correct.
        </p>
        <button
          onClick={restart}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-green-800 mb-6">
        🌾 Urea Addiction – Reform Without Fallout
      </h2>

      <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-md">
        <p className="text-lg font-semibold text-center text-gray-800 mb-4">
          {currentCard.question}
        </p>

        <div className="flex flex-col gap-4">
          {currentCard.options.map((opt, idx) => (
            <OptionCard
              key={idx}
              front={opt.front}
              back={opt.back}
              isCorrect={opt.isCorrect}
              onFlip={() => handleFlip(opt.isCorrect, idx)}
              flipped={flippedIndex === idx}
              disabled={locked}
            />
          ))}
        </div>
      </div>

      {locked && lastCorrect !== null && (
        <div className="flex justify-center mt-4">
          <img
            src={lastCorrect ? correctGif : incorrectGif}
            alt="feedback"
            className="w-48 rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default UreaAddiction;
