// MatchingGame.jsx
import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const brands = [
  { id: "b1", name: "Mens Rea" },
  { id: "b2", name: "Habeas Corpus" },
  { id: "b3", name: "Judicial Review" },
  { id: "b4", name: "Void ab initio" },
  { id: "b5", name: "Audi alteram partem" },
  { id: "b6", name: "Due Process" },
];

const options = [
  { id: "o1", label: "The mental intention to commit a crime" },
  { id: "o2", label: "Produce the body; protect against unlawful detention" },
  { id: "o3", label: "Courts can strike down unconstitutional laws" },
  { id: "o4", label: "Invalid from the beginning" },
  { id: "o5", label: "Hear both sides – principle of natural justice" },
  { id: "o6", label: "Law must be fair, just, and reasonable" },
];

const timeOutOption = { id: "o7", label: "Time's Up" };

const correctMatches = {
  b1: "o1", // Mens Rea → A. The mental intention to commit a crime
  b2: "o2", // Habeas Corpus → B. Produce the body; protect against unlawful detention
  b3: "o3", // Judicial Review → C. Courts can strike down unconstitutional laws
  b4: "o4", // Void ab initio → D. Invalid from the beginning
  b5: "o5", // Audi alteram partem → E. Hear both sides – principle of natural justice
  b6: "o6", // Due Process → F. Law must be fair, just, and reasonable
};

function getRandomIndices(n, max) {
  const indices = Array.from({ length: max }, (_, i) => i);
  const shuffled = indices.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const listOfIndices = getRandomIndices(6, brands.length); // use 3 or 4 or 5 as needed

const availBrands = listOfIndices.map((i) => brands[i]);

const availOptions = options.filter((option) =>
  availBrands.some((brand) => correctMatches[brand.id] === option.id)
);

export default function LegalConceptsGame() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remainingBrands, setRemainingBrands] = useState(availBrands);
  const [remainingOptions, setRemainingOptions] = useState(availOptions);
  const [matches, setMatches] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 3 minutes = 180 seconds
  const [gameEnded, setGameEnded] = useState(false);
  const navigate = useNavigate();

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || gameEnded) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - mark remaining brands as incorrect
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameEnded]);

  useEffect(() => {
    if (!gameEnded) return;

    const endTime = Date.now();
    const totalQuestions = availBrands.length;
    const correctAnswers = matches.filter((m) => m.isCorrect).length;
    const scaledScore = (correctAnswers / totalQuestions) * 10;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const avgResponseTimeSec = Math.round((endTime - startTime) / (1000 * totalQuestions));
    const studyTimeMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Law",
      topicName: "courtroomManerism",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,
    });
    setStartTime(Date.now());

  }, [gameEnded]);


  const handleTimeUp = () => {
    if (gameEnded) return;

    setGameEnded(true);

    // Mark all remaining brands as incorrect matches
    const incorrectMatches = remainingBrands.map((brand) => {
      const correctOption = options.find(
        (option) => correctMatches[brand.id] === option.id
      );
      return {
        brand,
        option: timeOutOption,
        isCorrect: false,
      };
    });

    setMatches((prev) => [...prev, ...incorrectMatches]);
    setRemainingBrands([]);
    setRemainingOptions([]);
  };

  const handleOptionSelect = (option) => {
    if (!selectedBrand || gameEnded) return;

    const isCorrect = correctMatches[selectedBrand.id] === option.id;

    setMatches((prev) => [
      ...prev,
      {
        brand: selectedBrand,
        option,
        isCorrect,
      },
    ]);

    setRemainingBrands((prev) => prev.filter((b) => b.id !== selectedBrand.id));
    setRemainingOptions((prev) => prev.filter((o) => o.id !== option.id));
    setSelectedBrand(null);
  };

  useEffect(() => {
    if (remainingBrands?.length > 0) {
      return;
    }

    setGameEnded(true);
    setLoading(true);
    const timer = setTimeout(() => {
      navigate("/LegalConceptsResult", {
        state: {
          score: matches.filter((m) => m.isCorrect).length,
          matches: matches,
          totalQuestions: availBrands.length,
        },
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [remainingBrands, navigate, matches]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    if (timeLeft > 60) return "text-green-600";
    if (timeLeft > 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div
      className="w-[95%] max-w-8xl mx-auto rounded-xl shadow-2xl p-4 md:p-6 min-h-[90vh] mt-5 bg-gradient-to-br from-blue-600 to-blue-800 via-slate-600"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="p-4 md:p-6 min-h-[80vh] rounded-2xl shadow-2xl bg-gradient-to-br from-pink-200 to-yellow-100">
        <motion.h1
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 text-purple-800"
        >
          🎯 Match the Legal Terms with their correct description!
        </motion.h1>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className={`text-2xl md:text-3xl font-bold ${getTimerColor()}`}>
            ⏰ {formatTime(timeLeft)}
          </div>
          <div className="text-sm md:text-base text-gray-600 mt-1">
            Time Remaining
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brands */}
          <div>
            <h2 className="text-base lg:text-xl text-center font-semibold mb-3 text-blue-600">
              Legal Term
            </h2>
            {remainingBrands.map((brand, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <div
                  key={brand.id}
                  onClick={() => !gameEnded && setSelectedBrand(brand)}
                  className={`floating-card ${floatClass} cursor-pointer p-3 md:p-4 rounded-xl mb-4 shadow-md text-center text-sm md:text-base font-medium
                ${selectedBrand?.id === brand.id
                      ? "bg-blue-300 text-white"
                      : "bg-blue-100 hover:bg-blue-200"
                    } ${gameEnded ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {brand.name}
                </div>
              );
            })}
          </div>

          {/* Options */}
          <div>
            <h2 className="text-base lg:text-xl text-center font-semibold mb-3 text-pink-600">
              Description
            </h2>
            {remainingOptions.map((option, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <div
                  key={option.id}
                  onClick={() => !gameEnded && handleOptionSelect(option)}
                  className={`floating-card ${floatClass} cursor-pointer p-3 md:p-4 rounded-xl mb-4 bg-pink-100 hover:bg-pink-200 text-sm md:text-base shadow-md text-center font-medium ${gameEnded ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {option.label}
                </div>
              );
            })}
          </div>

          {/* Results */}
          <div>
            <h2 className="text-base lg:text-xl text-center font-semibold mb-3 text-green-700">
              Your Matches
            </h2>
            {matches.map((pair, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <div
                  key={index}
                  className={`floating-card ${floatClass} p-3 md:p-4 mb-4 text-sm md:text-base rounded-xl shadow text-white text-center font-medium
                ${pair.isCorrect ? "bg-green-500" : "bg-red-500"}`}
                >
                  {pair.brand.name} ➡️ {pair.option.label}
                </div>
              );
            })}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center mt-6 text-base md:text-lg font-bold text-purple-800">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-pink-300 border-yellow-300 rounded-full animate-spin"></div>
            <div className="mt-4">Fetching results</div>
          </div>
        )}
      </div>
    </div>
  );
}
