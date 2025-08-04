// MatchingGame.jsx
import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const brands = [
  { id: "b1", name: "Nike" },
  { id: "b2", name: "Apple" },
  { id: "b3", name: "McDonald's" },
  { id: "b4", name: "Toyota" },
  { id: "b5", name: "Samsung" },
  { id: "b6", name: "Starbucks" },
  { id: "b7", name: "Coca-Cola" },
  { id: "b8", name: "Intel" },
  { id: "b9", name: "Netflix" },
  { id: "b10", name: "Adidas" },
  { id: "b11", name: "Amazon" },
  { id: "b12", name: "Pepsi" },
  { id: "b13", name: "Honda" },
  { id: "b14", name: "Sony" },
  { id: "b15", name: "Nestlé" },
  { id: "b16", name: "Uber" },
  { id: "b17", name: "Zoom" },
  { id: "b18", name: "LinkedIn" },
  { id: "b19", name: "Spotify" },
  { id: "b20", name: "KFC" },
];

const options = [
  { id: "o1", label: "Shoes" },
  { id: "o2", label: "Electronics" },
  { id: "o3", label: "Fast Food" },
  { id: "o4", label: "Cars" },
  { id: "o5", label: "Smartphones" },
  { id: "o6", label: "Coffee" },
  { id: "o7", label: "Soft Drinks" },
  { id: "o8", label: "Processors" },
  { id: "o9", label: "Streaming" },
  { id: "o10", label: "Athletic Wear" },
  { id: "o11", label: "E-commerce" },
  { id: "o12", label: "Cola" },
  { id: "o13", label: "Automobiles" },
  { id: "o14", label: "PlayStation" },
  { id: "o15", label: "Food & Beverage" },
  { id: "o16", label: "Ride Sharing" },
  { id: "o17", label: "Video Calls" },
  { id: "o18", label: "Professional Network" },
  { id: "o19", label: "Music Streaming" },
  { id: "o20", label: "Fried Chicken" },
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
  b11: "o11",
  b12: "o12",
  b13: "o13",
  b14: "o14",
  b15: "o15",
  b16: "o16",
  b17: "o17",
  b18: "o18",
  b19: "o19",
  b20: "o20",
};

function getRandomIndices(n, max) {
  const indices = Array.from({ length: max }, (_, i) => i);
  const shuffled = indices.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const listOfIndices = getRandomIndices(4, brands.length); // use 3 or 4 or 5 as needed

const availBrands = listOfIndices.map((i) => brands[i]);

const availOptions = options.filter((option) =>
  availBrands.some((brand) => correctMatches[brand.id] === option.id)
);

export default function MatchingGame() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);
  const [remainingBrands, setRemainingBrands] = useState(availBrands);
  const [remainingOptions, setRemainingOptions] = useState(availOptions);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleOptionSelect = (option) => {
    if (!selectedBrand) return;

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
    setLoadingGame(true);
    try {
      const listOfIndices = getRandomIndices(4, brands.length); // use 3 or 4 or 5 as needed

      const availBrands = listOfIndices.map((i) => brands[i]);

      const availOptions = options.filter((option) =>
        availBrands.some((brand) => correctMatches[brand.id] === option.id)
      );
      setRemainingBrands(availBrands);
      setRemainingOptions(availOptions);
    } catch (e) {
      console.log("Error loading Game", e);
    } finally {
      setLoadingGame(false);
    }
  }, []);

  useEffect(() => {
    if (remainingBrands?.length > 0) return;

    setLoading(true);
    const timer = setTimeout(() => {
      const total = matches.length;
      const correct = matches.filter((m) => m.isCorrect).length;
      const scaledScore = Math.round((correct / total) * 10); // scale out of 10
      const accuracy = Math.round((correct / total) * 100);
      const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

      updatePerformance({
        moduleName: "DigitalMarketing",
        topicName: "contentStrategist",
        score: scaledScore,
        accuracy,
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: true,

      });
      setStartTime(Date.now());
      navigate("/matching-game-result", {
        state: { score: scaledScore },
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [remainingBrands]);


  if (loadingGame) {
    return (
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col items-center justify-center mt-6 text-base md:text-lg font-bold text-purple-800">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-pink-300 border-yellow-300 rounded-full animate-spin"></div>
          <div className="mt-4">Loading Game</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[95%] max-w-7xl mx-auto p-4 md:p-6 min-h-screen"
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
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-purple-800"
        >
          🎯 Match the Brands!
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brands */}
          <div>
            <h2 className="text-base lg:text-xl text-center font-semibold mb-3 text-blue-600">
              Brands
            </h2>
            {remainingBrands.map((brand, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <div
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand)}
                  className={`floating-card ${floatClass} cursor-pointer p-3 md:p-4 rounded-xl mb-4 shadow-md text-center text-sm md:text-base font-medium
                ${selectedBrand?.id === brand.id
                      ? "bg-blue-300 text-white"
                      : "bg-blue-100 hover:bg-blue-200"
                    }`}
                >
                  {brand.name}
                </div>
              );
            })}
          </div>

          {/* Options */}
          <div>
            <h2 className="text-base lg:text-xl text-center font-semibold mb-3 text-pink-600">
              Options
            </h2>
            {remainingOptions.map((option, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`floating-card ${floatClass} cursor-pointer p-3 md:p-4 rounded-xl mb-4 bg-pink-100 hover:bg-pink-200 text-sm md:text-base shadow-md text-center font-medium`}
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
