import React, { useState, useEffect, useRef, useCallback } from "react";
import { Heart, Star, Zap, Trophy, RotateCcw, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

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

const CatchYourRightsGame = () => {
  const { completeLawChallenge } = useLaw();
  const [gameState, setGameState] = useState("menu"); // menu, playing, paused, gameOver, completed
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [fallingItems, setFallingItems] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(2000);
  const [streak, setStreak] = useState(0);
  const [powerUps, setPowerUps] = useState({ slowTime: 0, autoSort: 0 });
  const [slowTimeActive, setSlowTimeActive] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelStatements, setLevelStatements] = useState([]);
  const [usedStatements, setUsedStatements] = useState(new Set());
  const [correctlySorted, setCorrectlySorted] = useState(0);
  const gameAreaRef = useRef(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [isTabVisible, setIsTabVisible] = useState(true);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (gameState === "completed" || gameState === "gameOver") {
      const endTime = Date.now();
      const timeSpentMillis = endTime - startTime;
      const studyTimeMinutes = Math.round(timeSpentMillis / 60000);
      const totalPlayed = level === 1 ? 10 : 15;
      const avgResponseTimeSec =
        correctlySorted > 0 ? timeSpentMillis / correctlySorted / 1000 : 0;

      const scaledScore = Math.min(10, parseFloat(((score / (totalPlayed * 3)) * 10).toFixed(2)));

      updatePerformance({
        moduleName: "Law",
        topicName: "constitutionalRights",
        score: scaledScore,
        accuracy: scaledScore * 10,
        avgResponseTimeSec: parseFloat(avgResponseTimeSec.toFixed(2)),
        studyTimeMinutes,
        completed: gameState === "completed",

      });
      setStartTime(Date.now());

    }
  }, [gameState]);


  const statements = {
    rights: [
      { id: 1, text: "You can speak your opinion freely", category: "rights" },
      {
        id: 2,
        text: "You have the right to go to school till age 14",
        category: "rights",
      },
      {
        id: 3,
        text: "No one can treat you unfairly for your caste or religion",
        category: "rights",
      },
      {
        id: 4,
        text: "You can follow any religion you choose",
        category: "rights",
      },
      { id: 5, text: "You can move freely across India", category: "rights" },
    ],
    duties: [
      { id: 6, text: "Defend the country if needed", category: "duties" },
      { id: 7, text: "Promote harmony among all citizens", category: "duties" },
      {
        id: 8,
        text: "Treat women with respect and equality",
        category: "duties",
      },
      { id: 9, text: "Protect public property", category: "duties" },
      { id: 10, text: "Develop a scientific temper", category: "duties" },
    ],
    laws: [
      {
        id: 11,
        text: "No child below 14 can work in a factory",
        category: "laws",
      },
      {
        id: 12,
        text: "Polluting rivers and cutting trees is punishable",
        category: "laws",
      },
      {
        id: 13,
        text: "Fake online accounts can lead to legal trouble",
        category: "laws",
      },
      { id: 14, text: "Using pirated apps is illegal", category: "laws" },
      {
        id: 15,
        text: "Misleading ads are against consumer rights",
        category: "laws",
      },
    ],
  };

  const getAllStatements = () => {
    return [...statements.rights, ...statements.duties, ...statements.laws];
  };

  const getRandomStatements = (count) => {
    const all = getAllStatements();
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState("playing");
    setScore(0);
    setLives(3);
    setFallingItems([]);
    setStreak(0);
    setGameSpeed(2000);
    setPowerUps({ slowTime: 0, autoSort: 0 });
    setSlowTimeActive(false);
    setUsedStatements(new Set());
    setCorrectlySorted(0);

    // Set level-specific statements
    const statements =
      selectedLevel === 1 ? getRandomStatements(10) : getAllStatements();
    setLevelStatements(statements);
  };

  const spawnItem = useCallback(() => {
    if (gameState !== "playing") return;

    if (usedStatements.size >= levelStatements.length) {
      return;
    }

    const unusedStatements = levelStatements.filter(
      (stmt) => !usedStatements.has(stmt.id)
    );
    if (unusedStatements.length === 0) {
      setGameState("gameover");
    }

    const randomStatement =
      unusedStatements[Math.floor(Math.random() * unusedStatements.length)];

    // Get responsive item width for proper positioning
    const screenWidth = window.innerWidth;
    const itemWidth =
      screenWidth < 480
        ? 150
        : screenWidth < 640
          ? 170
          : screenWidth < 768
            ? 200
            : screenWidth < 1024
              ? 240
              : 250;

    const newItem = {
      id: Date.now() + Math.random(),
      ...randomStatement,
      x: Math.random() * (window.innerWidth - itemWidth - 150), // Added extra margin
      y: -100,
      speed: slowTimeActive ? 0.5 : Math.max(1, 3 - score / 500),
    };

    setFallingItems((prev) => [...prev, newItem]);
    setUsedStatements((prev) => new Set([...prev, randomStatement.id]));
  }, [gameState, levelStatements, usedStatements, score, slowTimeActive]);

  const updateItems = useCallback(() => {
    if (gameState !== "playing" || !isTabVisible) return; // Add !isTabVisible check

    setFallingItems((prev) => {
      const updatedItems = prev
        .map((item) => ({
          ...item,
          y: item.y + item.speed,
        }))
        .filter((item) => {
          if (item.y > window.innerHeight) {
            // Item hit the ground
            setLives((prevLives) => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                setGameState("gameOver");
              }
              return newLives;
            });
            setScore((prev) => Math.max(0, prev - 2));
            setStreak(0);
            return false;
          }
          return true;
        });

      // Rest of your existing logic remains the same...
      setTimeout(() => {
        if (
          usedStatements.size >= levelStatements.length &&
          updatedItems.length === 0
        ) {
          const requiredCorrect = level === 1 ? 10 : 15;
          if (correctlySorted >= requiredCorrect) {
            setGameState("levelComplete");
          } else if (lives > 0) {
            const remainingStatements =
              levelStatements.length - usedStatements.size;
            const maxPossibleCorrect = correctlySorted + remainingStatements;

            if (maxPossibleCorrect < requiredCorrect) {
              setGameState("gameOver");
            }
          }
        }
      }, 0);

      return updatedItems;
    });
  }, [
    gameState,
    isTabVisible, // Add this to dependencies
    usedStatements,
    levelStatements,
    level,
    correctlySorted,
    lives,
  ]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = setInterval(updateItems, 50);
    const spawnLoop = setInterval(spawnItem, gameSpeed);

    return () => {
      clearInterval(gameLoop);
      clearInterval(spawnLoop);
    };
  }, [gameState, gameSpeed, updateItems, spawnItem]);

  // Speed increase
  useEffect(() => {
    const newSpeed = Math.max(800, 2000 - score / 10);
    setGameSpeed(newSpeed);
  }, [score]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, category) => {
    e.preventDefault();

    if (!draggedItem) return;

    const isCorrect = draggedItem.category === category;

    if (isCorrect) {
      setScore((prev) => prev + 3);
      setCorrectlySorted((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        // Award power-ups for streaks
        if (newStreak % 5 === 0) {
          setPowerUps((prev) => ({
            ...prev,
            slowTime: prev.slowTime + 1,
            autoSort: prev.autoSort + 1,
          }));
        }
        return newStreak;
      });
    } else {
      setScore((prev) => Math.max(0, prev - 2));
      setStreak(0);
    }

    // Remove the item from falling items
    setFallingItems((prev) =>
      prev.filter((item) => item.id !== draggedItem.id)
    );
    setDraggedItem(null);

    // Check level completion based on correctly sorted items
    const targetCount = level === 1 ? 10 : 15;
    if (isCorrect && correctlySorted + 1 >= targetCount) {
      setGameState("completed");
      completeLawChallenge(1, 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const usePowerUp = (type) => {
    if (powerUps[type] <= 0) return;

    setPowerUps((prev) => ({ ...prev, [type]: prev[type] - 1 }));

    if (type === "slowTime") {
      setSlowTimeActive(true);
      setTimeout(() => setSlowTimeActive(false), 5000);
    } else if (type === "autoSort") {
      // Auto-sort the next falling item
      if (fallingItems.length > 0) {
        const item = fallingItems[0];
        setScore((prev) => prev + 3);
        setCorrectlySorted((prev) => prev + 1);
        setFallingItems((prev) => prev.filter((i) => i.id !== item.id));
        setStreak((prev) => prev + 1);

        // Check completion after auto-sort
        const targetCount = level === 1 ? 10 : 15;
        if (correctlySorted + 1 >= targetCount) {
          setGameState("completed");
          completeLawChallenge(1, 1);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    }
  };

  const getTitle = () => {
    if (score >= 100) return "Legal Prodigy 🏆";
    if (score >= 50) return "Duty Master ⭐";
    if (score >= 20) return "Right Defender 🛡️";
    return "Legal Learner 📚";
  };

  const resetGame = () => {
    setGameState("menu");
    setScore(0);
    setLives(3);
    setLevel(1);
    setFallingItems([]);
    setStreak(0);
    setPowerUps({ slowTime: 0, autoSort: 0 });
    setSlowTimeActive(false);
    setShowConfetti(false);
    setLevelStatements([]);
    setUsedStatements(new Set());
    setCorrectlySorted(0);
    setStartTime(Date.now());

  };

  const getResponsiveItemSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) return { width: "150px", fontSize: "text-xs" };
    if (screenWidth < 640) return { width: "170px", fontSize: "text-xs" }; // Mobile
    if (screenWidth < 768) return { width: "200px", fontSize: "text-lg" }; // Small tablet
    if (screenWidth < 1024) return { width: "240px", fontSize: "text-lg" }; // Tablet
    return { width: "250px", fontSize: "text-lg" }; // Desktop
  };

  return (
    <div className="w-[95%] mx-auto  p-5">
      <div
        className="min-h-screen p-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden rounded-2xl"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <Confetti isActive={showConfetti} />

        {/* Menu Screen */}
        {gameState === "menu" && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center max-w-3xl w-full">
              <div className="text-6xl mb-4">⚖️</div>
              <h1 className="text-lg lg:text-3xl font-bold text-purple-800 mb-4">
                Catch Your Rights!
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 mb-6">
                Sort falling legal statements into the correct categories before
                they hit the ground!
              </p>

              <div className="text-left bg-white/80 rounded-xl p-4 shadow-inner text-gray-800 mb-6 space-y-3">
                <h2 className="text-sm lg:text-lg font-bold text-purple-700">
                  ⏱ Scoring + Bonus:
                </h2>
                <ul className="text-sm lg:text-lg  list-disc list-inside space-y-1">
                  <li>
                    <span className="font-semibold text-green-600">
                      +3 points
                    </span>{" "}
                    for correct placement.
                  </li>
                  <li>
                    <span className="font-semibold text-red-500">
                      -2 points
                    </span>{" "}
                    for wrong drop or if it hits the ground.
                  </li>
                  <li>
                    <span className="font-semibold text-red-500">Total 3 </span>{" "}
                    Lives.
                  </li>
                  <li>
                    <span className="font-semibold text-red-500">-1 Life</span>{" "}
                    if item hits the ground.
                  </li>
                </ul>

                <h2 className="text-sm lg:text-lg  font-bold text-yellow-600 mt-4">
                  ⚡ Power-ups:
                </h2>
                <p className="text-sm lg:text-lg ">
                  Earn “<span className="font-semibold">Slow Time</span>” or “
                  <span className="font-semibold">Auto-Categorize</span>” by
                  keeping a streak going!
                </p>

                <h2 className="text-sm lg:text-lg  font-bold text-blue-600 mt-4">
                  🏆 Titles to Earn:
                </h2>
                <p className="text-sm lg:text-lg ">
                  Unlock fun titles like “
                  <span className="italic font-md">Right Defender</span>”, “
                  <span className="italic font-md">Duty Master</span>”, and “
                  <span className="italic font-md">Legal Prodigy</span>” as you
                  play!
                </p>
                <p className="text-sm lg:text-lg font-bold">
                  This game is best experienced on a large-screen device.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => startGame(1)}
                  className="w-full text-sm lg:text-lg  bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Level 1 - Practice (10 statements)
                </button>
                <button
                  onClick={() => startGame(2)}
                  className="w-full text-sm lg:text-lg  bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Level 2 - Challenge (All 15 statements)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Screen */}
        {gameState === "playing" && (
          <div ref={gameAreaRef} className="relative h-screen ">
            {/* Header */}
            <div className="bg-black/20 backdrop-blur-sm p-4">
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-400" size={20} />
                    <span className="font-bold">{score}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`${i < lives
                          ? "text-red-500 fill-current"
                          : "text-gray-400"
                          }`}
                        size={20}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm lg:text-lg font-bold">
                    Level {level}
                  </div>
                  <div className="text-sm lg:text-lg">{getTitle()}</div>
                  <div className="text-xs lg:text-lg hidden md:block mt-1">
                    Sorted: {correctlySorted}/{level === 1 ? 10 : 15}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full">
                    <Zap className="text-orange-400" size={16} />
                    <span className="text-sm">{streak}</span>
                  </div>
                  <button
                    onClick={() => setGameState("paused")}
                    className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Pause size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Power-ups */}
            <div className="absolute top-20 right-4 space-y-2 z-20">
              <button
                onClick={() => usePowerUp("slowTime")}
                disabled={powerUps.slowTime <= 0}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm lg:text-lg font-bold transition-all ${powerUps.slowTime > 0
                  ? "bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
              >
                <Zap size={16} />
                Slow Time ({powerUps.slowTime})
              </button>
              <button
                onClick={() => usePowerUp("autoSort")}
                disabled={powerUps.autoSort <= 0}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm lg:text-lg font-bold transition-all ${powerUps.autoSort > 0
                  ? "bg-green-500 text-white hover:bg-green-600 transform hover:scale-105"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
              >
                <Star size={16} />
                Auto-Sort ({powerUps.autoSort})
              </button>
            </div>

            {/* Falling Items */}
            {fallingItems.map((item) => {
              const itemSize = getResponsiveItemSize();
              const itemWidth = parseInt(itemSize.width);

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className={`absolute bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg cursor-move transform hover:scale-105 transition-all border-4  border-sky-300 ${slowTimeActive ? "animate-pulse" : ""
                    }`}
                  style={{
                    left: `${item.x}px`, // Prevent overflow

                    // left: `${Math.min(
                    //   item.x,
                    //   window.innerWidth - itemWidth - 50
                    // )}px`, // Prevent overflow

                    top: `${item.y}px`,
                    width: itemSize.width,
                    zIndex: 10,
                  }}
                >
                  <p
                    className={`${itemSize.fontSize} font-semibold text-gray-800`}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}

            {/* Drop Zones */}
            <div className="absolute bottom-10 left-0 right-0 grid grid-cols-3 gap-4">
              <div
                onDrop={(e) => handleDrop(e, "rights")}
                onDragOver={handleDragOver}
                className=" bg-blue-500/80 backdrop-blur-sm rounded-xl p-6 text-white font-bold border-2 border-dashed border-blue-300 hover:bg-blue-600/80 transition-colors"
              >
                <div className="text-2xl text-center mb-2">🗽</div>
                <div className="text-sm lg:text-lg text-center wrap-break-word">
                  Fundamental Rights
                </div>
              </div>

              <div
                onDrop={(e) => handleDrop(e, "duties")}
                onDragOver={handleDragOver}
                className="flex-1 bg-green-500/80 backdrop-blur-sm rounded-xl p-6 text-center text-white font-bold border-2 border-dashed border-green-300 hover:bg-green-600/80 transition-colors"
              >
                <div className="text-2xl mb-2">🤝</div>
                <div className="text-sm lg:text-lg wrap-break-word">
                  Fundamental Duties
                </div>
              </div>

              <div
                onDrop={(e) => handleDrop(e, "laws")}
                onDragOver={handleDragOver}
                className="flex-1 bg-orange-500/80 backdrop-blur-sm rounded-xl p-6 text-center text-white font-bold border-2 border-dashed border-orange-300 hover:bg-orange-600/80 transition-colors"
              >
                <div className="text-2xl mb-2">⚖️</div>
                <div className="text-sm lg:text-lg wrap-break-word">Laws</div>
              </div>
            </div>

            {slowTimeActive && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500/90 text-white px-6 py-3 rounded-full font-bold animate-pulse">
                ⏱️ SLOW TIME ACTIVE!
              </div>
            )}
          </div>
        )}

        {/* Paused Screen */}
        {gameState === "paused" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-3xl p-8 text-center">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">
                Game Paused
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => setGameState("playing")}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 mx-auto"
                >
                  <Play size={20} />
                  Resume
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={20} />
                  Main Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === "gameOver" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <motion.div
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: 4,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="bg-gradient-to-br from-pink-200 to-yellow-100 rounded-3xl p-8 text-center max-w-md"
            >
              <div className="text-4xl mb-4">💔</div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Game Over!
              </h2>
              <p className="text-gray-700 mb-4">
                Final Score:{" "}
                <span className="font-bold text-purple-600">{score}</span>
              </p>
              <p className="text-sm text-gray-600 mb-6">{getTitle()}</p>
              <div className="space-y-4">
                <button
                  onClick={() => startGame(level)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Main Menu
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Completed Screen */}
        {gameState === "completed" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <motion.div
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: 4,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="bg-white rounded-3xl p-8 text-center max-w-md"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Congratulations!
              </h2>
              <p className="text-gray-700 mb-4">You've mastered all levels!</p>
              <p className="text-xl font-bold text-purple-600 mb-2">
                Final Score: {score}
              </p>
              <p className="text-lg text-green-600 mb-6">{getTitle()}</p>
              <div className="space-y-4">
                <button
                  onClick={resetGame}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchYourRightsGame;
