// MatchingGame.jsx
import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const brands = [
  { id: "b1", name: "CONSTITUTION" },
  { id: "b2", name: "SUPREME COURT" },
  { id: "b3", name: "JUDICIAL REVIEW" },
  { id: "b4", name: "LOK SABHA" },
  { id: "b5", name: "CYBER LAWS" },
  { id: "b6", name: "CONSTITUENT ASSEMBLY" },
  { id: "b7", name: "ASSENT" },
  { id: "b8", name: "PRIVACY" },
  { id: "b9", name: "UNITED NATIONS" },
  { id: "b10", name: "SECURITY COUNCIL" },
];

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

const timeOutOption = { id: "o7", label: "Time's Up" };

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

export default function MatchTermsGame() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remainingBrands, setRemainingBrands] = useState(availBrands);
  const [remainingOptions, setRemainingOptions] = useState(availOptions);
  const [matches, setMatches] = useState([]);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
  const [gameEnded, setGameEnded] = useState(false);
  const navigate = useNavigate();

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

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
      topicName: "beginnerLegalIntellect",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed: true,
     
    });
    setStartTime(Date.now());

  }, [gameEnded]);


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
      navigate("/match-terms-game-result", {
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
          🎯Match these terms with their correct description
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
              Term
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
