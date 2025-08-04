import React, { useState, useEffect, useRef } from "react";
import { Trophy, Clock, Star, RotateCcw, Info } from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
// Confetti component
const Confetti = ({ isActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const confetti = [];
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#ffeaa7",
      "#dda0dd",
      "#98d8c8",
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create confetti particles
    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 4 + 2,
        h: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 2 * Math.PI,
        angularSpeed: Math.random() * 0.2 - 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((p, index) => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.5;
        p.angle += p.angularSpeed;

        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > canvas.height) {
          confetti[index] = {
            x: Math.random() * canvas.width,
            y: -10,
            w: Math.random() * 4 + 2,
            h: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 2 * Math.PI,
            angularSpeed: Math.random() * 0.2 - 0.1,
          };
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const givenTerms = [
  { id: 1, term: "Fundamental Rights", matched: false },
  { id: 2, term: "Child Labour Act", matched: false },
  { id: 3, term: "Cyber Law", matched: false },
  { id: 4, term: "Consumer Rights", matched: false },
  { id: 5, term: "Environment Laws", matched: false },
  { id: 6, term: "Juvenile Justice Act", matched: false },
  { id: 7, term: "POCSO Act", matched: false },
  { id: 8, term: "Right to Equality", matched: false },
  { id: 9, term: "FIR", matched: false },
  { id: 10, term: "RTI Act", matched: false },
  { id: 11, term: "Fundamental Duties", matched: false },
];

const givenDescriptions = [
  {
    id: 1,
    desc: "Everyone can study free till a certain age.",
    hint: "Think about education!",
  },
  {
    id: 2,
    desc: "Protects children from hazardous work.",
    hint: "About kids and work safety!",
  },
  {
    id: 3,
    desc: "Rules about online safety and cyberbullying.",
    hint: "Internet and computers!",
  },
  {
    id: 4,
    desc: "Protects buyers from faulty products.",
    hint: "When you buy something!",
  },
  {
    id: 5,
    desc: "Laws against pollution and protecting nature.",
    hint: "Trees, air, and water!",
  },
  {
    id: 6,
    desc: "Special laws for kids who break the law, focusing on reform.",
    hint: "Helping kids learn from mistakes!",
  },
  {
    id: 7,
    desc: "Law that protects children from sexual abuse.",
    hint: "Keeping children safe!",
  },
  {
    id: 8,
    desc: "Ensures no one is treated unfairly based on religion, caste, or gender.",
    hint: "Everyone is equal!",
  },
  {
    id: 9,
    desc: "A written complaint you file at a police station to start a legal case.",
    hint: "First step at police station!",
  },
  {
    id: 10,
    desc: "Lets you ask the government for official information.",
    hint: "Right to know information!",
  },
  {
    id: 11,
    desc: "Includes respecting the national flag and protecting nature.",
    hint: "Our responsibilities!",
  },
];

const explanations = {
  1: "Fundamental Rights guarantee basic freedoms like education, which is why every child can go to school for free!",
  2: "The Child Labour Act protects children from dangerous work so they can focus on learning and playing.",
  3: "Cyber Laws keep us safe online by preventing cyberbullying and protecting our digital privacy.",
  4: "Consumer Rights ensure that when we buy things, they work properly and we're treated fairly.",
  5: "Environment Laws protect our planet by preventing pollution and conserving nature for future generations.",
  6: "The Juvenile Justice Act helps young people who make mistakes by focusing on teaching rather than punishment.",
  7: "The POCSO Act is a special law that keeps children safe from harm and abuse.",
  8: "Right to Equality means everyone should be treated fairly, no matter their background.",
  9: "An FIR is like a formal complaint that starts a police investigation when something wrong happens.",
  10: "The RTI Act lets citizens ask the government questions and get information about how it works.",
  11: "Fundamental Duties remind us of our responsibilities, like respecting our flag and protecting nature.",
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const PuzzleMatch = () => {
  const { completeLawChallenge } = useLaw();
  const [terms, setTerms] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [spin, setSpin] = useState(false);
  const [gameState, setGameState] = useState("playing"); // playing, completed
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({});
  const [shakeItem, setShakeItem] = useState(null);
  const [showExplanations, setShowExplanations] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setTerms(shuffleArray(givenTerms));
    setDescriptions(shuffleArray(givenDescriptions));
  }, []);

  useEffect(() => {
    if (gameState === "completed") {
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 2500);
    }
  }, [gameState]);

  // Track performance after game ends
  useEffect(() => {
    if (gameState === "completed") {
      const endTime = Date.now();
      const timeSpentMillis = endTime - startTime;
      const studyTimeMinutes = Math.round(timeSpentMillis / 60000);

      const totalPlayed = 11; // 11 terms total
      const accuracy = (Object.keys(matches).length / totalPlayed) * 100;
      const avgResponseTimeSec =
        Object.keys(matches).length > 0
          ? timeSpentMillis / Object.keys(matches).length / 1000
          : 0;

      const maxRawScore = totalPlayed * 100 + 180 * 10; // 100 per correct + bonus max
      const scaledScore = Math.min(10, parseFloat(((score / maxRawScore) * 10).toFixed(2)));

      updatePerformance({
        moduleName: "Law",
        topicName: "constitutionalRights",
        score: scaledScore,
        accuracy: parseFloat(accuracy.toFixed(2)),
        avgResponseTimeSec: parseFloat(avgResponseTimeSec.toFixed(2)),
        studyTimeMinutes,
        completed: true,

      });
      setStartTime(Date.now());

    }
  }, [gameState]);


  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState("completed");
    }
  }, [timeLeft, gameState]);

  // Check if game is completed
  useEffect(() => {
    if (Object.keys(matches).length === 11) {
      const bonusPoints = timeLeft * 10;
      setScore((prev) => prev + bonusPoints);
      setGameState("completed");
      completeLawChallenge(1, 0);
    }
  }, [matches, timeLeft]);

  const handleDragStart = (e, term) => {
    setDraggedItem(term);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, description) => {
    e.preventDefault();

    if (!draggedItem || matches[draggedItem.id]) return;

    // Check if correct match
    if (draggedItem.id === description.id) {
      setMatches((prev) => ({ ...prev, [draggedItem.id]: description.id }));
      setScore((prev) => prev + 100);

      // Success animation could be added here
    } else {
      // Wrong match - shake animation
      setShakeItem(description.id);
      setTimeout(() => setShakeItem(null), 600);
    }

    setDraggedItem(null);
  };

  const resetGame = () => {
    setGameState("playing");
    setTimeLeft(180);
    setScore(0);
    setMatches({});
    setShowExplanations(false);
    setShakeItem(null);
    setStartTime(Date.now());

  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getMatchedTerms = () => {
    return terms.filter((term) => matches[term.id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 p-4">
      <Confetti isActive={gameState === "completed"} />

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center gap-2">
              <Star className="text-yellow-500" />
              Legal Terms Matching Game
              <Star className="text-yellow-500" />
            </h1>

            <div className="flex items-center gap-4 text-lg font-semibold">
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                <Clock className="text-blue-600" size={20} />
                <span className="text-blue-800">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <Trophy className="text-green-600" size={20} />
                <span className="text-green-800">{score}</span>
              </div>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-full transition-colors"
              >
                <RotateCcw className="text-orange-600" size={20} />
                <span className="text-orange-800">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Game completed screen */}
        {gameState === "completed" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
            <div
              className={`bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 text-center ${spin ? "animate-bounce" : "animate-none"
                }`}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                You've successfully matched all legal terms!
                <br />
                Final Score:{" "}
                <span className="font-bold text-green-600">{score}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowExplanations(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Info size={20} />
                  Learn More About These Laws
                </button>
                <button
                  onClick={resetGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Explanations screen */}
        {showExplanations && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                Learn About These Important Laws!
              </h2>
              <div className="grid gap-4">
                {getMatchedTerms().map((term) => (
                  <div
                    key={term.id}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4 border-purple-400"
                  >
                    <h3 className="font-bold text-purple-800 text-lg mb-2">
                      {term.term}
                    </h3>
                    <p className="text-gray-700">{explanations[term.id]}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowExplanations(false)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-colors mx-auto block mt-6"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Game Board */}
        {gameState === "playing" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Terms */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-purple-800 mb-6 text-center">
                Legal Terms
              </h2>
              <div className="space-y-3">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    draggable={!matches[term.id]}
                    onDragStart={(e) => handleDragStart(e, term)}
                    className={`p-4 rounded-xl font-semibold text-center cursor-move transition-all duration-300 ${matches[term.id]
                      ? "bg-green-200 text-green-800 opacity-50 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 hover:shadow-lg hover:scale-105"
                      }`}
                  >
                    {term.term}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Descriptions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-purple-800 mb-6 text-center">
                Descriptions
              </h2>
              <div className="space-y-3">
                {descriptions.map((desc) => (
                  <div
                    key={desc.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, desc)}
                    className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 ${Object.values(matches).includes(desc.id)
                      ? "bg-green-100 border-green-300 text-green-800"
                      : shakeItem === desc.id
                        ? "bg-red-100 border-red-300 animate-pulse"
                        : "bg-blue-50 border-blue-300 hover:bg-blue-100"
                      } ${shakeItem === desc.id ? "animate-shake" : ""}`}
                  >
                    <p className="text-center font-medium">{desc.desc}</p>
                    {shakeItem === desc.id && (
                      <p className="text-center text-sm text-red-600 mt-2 italic">
                        💡 Hint: {desc.hint}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress indicator */}
        {gameState === "playing" && (
          <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-800 font-semibold">Progress</span>
              <span className="text-purple-800 font-semibold">
                {Object.keys(matches).length}/11
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${(Object.keys(matches).length / 11) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PuzzleMatch;
