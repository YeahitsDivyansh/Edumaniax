import React, { useState, useEffect, useRef } from "react";
import { Trophy, Star, RotateCcw, Home, Clock, Target } from "lucide-react";
import confetti from "canvas-confetti";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";

const ExternalityDetectiveGame = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const [currentPage, setCurrentPage] = useState("start");
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [showCard, setShowCard] = useState(null);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  // Game data - scenarios and their externalities
  const cardPairs = [
    {
      id: 1,
      scenario: "🚗 Heavy Traffic Congestion",
      detail: "A city has heavy traffic congestion during rush hour",
      externality: "🌫️ Air Pollution & Time Loss",
      externalityDetail: "Air pollution and time lost for all commuters",
    },
    {
      id: 2,
      scenario: "📦 Cheap Plastic Packaging",
      detail: "Companies use cheap plastic packaging for products",
      externality: "🌍 Environmental Cleanup Cost",
      externalityDetail: "Environment and taxpayers pay for cleanup",
    },
    {
      id: 3,
      scenario: "👕 Fast Fashion Store",
      detail: "Fast-fashion store sells clothes very cheaply",
      externality: "🗑️ Textile Waste & Poor Labor",
      externalityDetail: "Textile waste and poor labor conditions",
    },
    {
      id: 4,
      scenario: "🌾 Agricultural Fertilizers",
      detail: "Farmers use fertilizers to boost crop yields",
      externality: "💧 Water Pollution & Algae",
      externalityDetail: "Water pollution and harmful algae blooms",
    },
    {
      id: 5,
      scenario: "🏖️ Tourist Resort Motorboats",
      detail: "Tourist resorts near coral reefs use motorboats",
      externality: "🐠 Coral Damage & Noise",
      externalityDetail: "Coral damage and marine noise pollution",
    },
  ];

  // Create shuffled cards array
  const createCards = () => {
    const cards = [];
    cardPairs.forEach((pair) => {
      cards.push({
        id: `scenario-${pair.id}`,
        type: "scenario",
        content: pair.scenario,
        detail: pair.detail,
        pairId: pair.id,
      });
      cards.push({
        id: `externality-${pair.id}`,
        type: "externality",
        content: pair.externality,
        detail: pair.externalityDetail,
        pairId: pair.id,
      });
    });
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(createCards);

  // Timer effect
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
      setCurrentPage("result");
    }
  }, [timeLeft, gameStarted, gameOver]);

  // Auto-flip card effect
  useEffect(() => {
    if (showCard) {
      const timer = setTimeout(() => {
        setShowCard(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCard]);

  const startGame = () => {
    setCurrentPage("game");
    setGameStarted(true);
    setTimeLeft(120);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameOver(false);
    setCards(createCards());
    setStartTime(Date.now());

  };

  const handleCardClick = (cardId) => {
    if (
      gameOver ||
      flippedCards.includes(cardId) ||
      matchedPairs.includes(cardId)
    )
      return;

    // If no cards are flipped, flip the first card
    if (flippedCards.length === 0) {
      setFlippedCards([cardId]);

      // Auto-close after 3 seconds if no second card is selected
      setTimeout(() => {
        setFlippedCards((current) => {
          if (current.length === 1 && current[0] === cardId) {
            return [];
          }
          return current;
        });
      }, 3000);
    } else if (flippedCards.length === 1 && !flippedCards.includes(cardId)) {
      // Second card clicked - immediately show both cards
      setFlippedCards([...flippedCards, cardId]);
      setMoves(moves + 1);

      // Check for match
      const card1 = cards.find((c) => c.id === flippedCards[0]);
      const card2 = cards.find((c) => c.id === cardId);

      if (card1.pairId === card2.pairId) {
        // Match found!
        setTimeout(() => {
          const newMatchedPairs = [...matchedPairs, ...flippedCards, cardId];
          setMatchedPairs(newMatchedPairs);
          setFlippedCards([]);
          setScore(score + 100 + Math.max(0, 60 - moves) * 5); // Bonus for fewer moves
          if (newMatchedPairs.length === cards.length) {
            setIsWinner(true);
          }

          // Check if game is complete
          if (matchedPairs.length + 2 === cards.length) {
            setGameOver(true);
            setCurrentPage("result");
          }
        }, 1000);
      } else {
        // No match - flip both cards back after 3 seconds
        setTimeout(() => {
          setFlippedCards([]);
        }, 3000);
      }
    }
  };

  const resetGame = () => {
    setCurrentPage("start");
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setScore(0);
    setTimeLeft(120);
    setGameStarted(false);
    setGameOver(false);
    setShowCard(null);
    setStartTime(Date.now());

  };

  const getCardStyle = (card) => {
    const isFlipped =
      flippedCards.includes(card.id) ||
      matchedPairs.includes(card.id) ||
      showCard === card.id;
    const isMatched = matchedPairs.includes(card.id);

    let bgColor =
      card.type === "scenario"
        ? "from-blue-400 to-blue-600"
        : "from-green-400 to-green-600";

    if (isMatched) {
      bgColor = "from-yellow-400 to-orange-500";
    }

    return `${bgColor} ${isMatched ? "ring-4 ring-yellow-300" : ""}`;
  };

  // Start Screen
  const fullText = "Weelcome, Detective!";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isWinner || currentPage !== "result") {
      return;
    }

    completeEnvirnomentChallenge(1, 1);


    // Use the default confetti (full screen)
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    frame();
  }, [isWinner, currentPage]);

  useEffect(() => {
    if (!gameOver || currentPage !== "result") return;

    const endTime = Date.now();
    const timeTakenSec = Math.floor((endTime - startTime) / 1000);
    const studyTimeMin = Math.ceil(timeTakenSec / 60);
    const accuracy = matchedPairs.length / cards.length;

    // Scale score out of 10
    const maxPossibleScore = cardPairs.length * 2 * 100 + 60 * 5; // match points + max move bonus
    const scaledScore = parseFloat(((finalScore / maxPossibleScore) * 10).toFixed(2));

    updatePerformance({
      moduleName: "Environment",
      topicName: "ecoDecisionMaker",
      score: scaledScore, // score out of 10
      accuracy: parseFloat((accuracy * 100).toFixed(2)),
      avgResponseTimeSec: parseFloat((timeTakenSec / moves).toFixed(2)),
      studyTimeMinutes: studyTimeMin,
      completed: true,
       
    });
    setStartTime(Date.now());

  }, [gameOver, currentPage]);



  if (currentPage === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-red-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">
            {displayedText}
          </div>

          <div className="text-7xl mb-4 animate-bounce">🕵️‍♂️</div>

          <h1 className="text-4xl font-extrabold text-purple-800 mb-3 drop-shadow-md">
            Externality Detective
          </h1>

          <p className="text-pink-700 text-lg font-medium mb-6">
            Find the hidden costs in everyday scenarios!
          </p>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-200 rounded-xl p-5 mb-6 border-2 border-blue-300 shadow-inner">
            <h3 className="font-bold text-indigo-900 text-lg mb-2">
              🎮 How to Play:
            </h3>
            <ul className="text-sm text-indigo-800 text-left space-y-2 list-disc list-inside">
              <li>Tap cards to see them for 3 seconds</li>
              <li>Match scenarios with their hidden costs</li>
              <li>Complete all pairs before time runs out</li>
              <li>Fewer moves = higher score!</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-green-500 hover:to-purple-600 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Start Detective Mission! 🚀
          </button>
        </div>
      </div>
    );
  }

  // Game Screen
  if (currentPage === "game") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage("start")}
              className="bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
            >
              <Home className="w-6 h-6 text-white" />
            </button>
            <div className="text-white font-bold">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Moves: {moves}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-white font-bold">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>{score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span
                className={timeLeft < 30 ? "text-red-300 animate-pulse" : ""}
              >
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {cards.map((card) => {
            const isFlipped =
              flippedCards.includes(card.id) || matchedPairs.includes(card.id);
            const isMatched = matchedPairs.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  relative aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105
                  ${isMatched ? "animate-pulse" : ""}
                `}
              >
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br rounded-2xl shadow-lg transition-all duration-500
                  ${isFlipped ? getCardStyle(card) : "from-gray-400 to-gray-600"
                    }
                  ${isFlipped ? "rotate-0" : "rotate-y-180"}
                `}
                >
                  {!isFlipped ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-4xl animate-pulse">🔍</div>
                    </div>
                  ) : (
                    <div className="p-3 h-full flex flex-col justify-center items-center text-center">
                      <div className="text-4xl mb-2">
                        {card.content.split(" ")[0]}
                      </div>
                      <div className="text-lg font-bold text-white break-words">
                        {card.content.substring(card.content.indexOf(" ") + 1)}
                      </div>
                      {isMatched && (
                        <div className="absolute top-1 right-1 text-yellow-300">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>Progress</span>
            <span>
              {matchedPairs.length / 2} / {cardPairs.length} pairs
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(matchedPairs.length / cards.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (currentPage === "result") {
    const finalScore = score + (isWinner ? Math.max(0, timeLeft * 10) : 0); // Time bonus

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300 relative">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <div className="text-8xl mb-4 animate-bounce">
            {isWinner ? "🏆" : "⏰"}
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isWinner ? "Case Solved!" : "Time's Up!"}
          </h1>

          <p className="text-gray-600 mb-6">
            {isWinner
              ? "Great detective work! You found all the hidden costs!"
              : "Keep practicing to become a better externality detective!"}
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {finalScore}
                </div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {moves}
                </div>
                <div className="text-sm text-gray-600">Moves Used</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {matchedPairs.length / 2}
                </div>
                <div className="text-sm text-gray-600">Pairs Found</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {Math.floor((120 - timeLeft) / 60)}:
                  {((120 - timeLeft) % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600">Time Used</div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-6 rounded-full hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Home className="w-5 h-5 inline mr-2" />
              Home
            </button>
            <button
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ExternalityDetectiveGame;
