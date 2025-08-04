import React, { useState, useEffect } from "react";
import {
  Pause,
  Play,
  RefreshCw,
  Award,
  Clock,
  CheckCircle,
  Volume2,
} from "lucide-react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const InterruptGame = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [gameState, setGameState] = useState("intro"); // intro, playing, paused, rewrite, result
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [interruptionsFound, setInterruptionsFound] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedRewrite, setSelectedRewrite] = useState("");

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const [responseTimes, setResponseTimes] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(null);


  const dialogue = [
    {
      id: 1,
      speaker: "Alex",
      text: "My favorite part was when—",
      isInterrupted: false,
      avatar: "👦",
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: 2,
      speaker: "Bailey",
      text: "Oh yeah, then he jumps off the train! So cool!",
      isInterrupted: true,
      avatar: "👧",
      color: "bg-pink-100 border-pink-300",
      correctRewrite: "Sorry, what were you going to say?",
      rewriteOptions: [
        "Sorry, what were you going to say?",
        "That part was amazing! What did you think first?",
        "Oops! Please finish your thought!",
      ],
    },
    {
      id: 3,
      speaker: "Alex",
      text: "I… was going to say that.",
      isInterrupted: false,
      avatar: "👦",
      color: "bg-blue-100 border-blue-300",
    },
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (showTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && showTimer) {
      setShowTimer(false);
      setGameState("rewrite");
    }
    return () => clearInterval(interval);
  }, [timer, showTimer]);

  const startGame = () => {
    setGameState("playing");
    setCurrentDialogue(0);
  };

  const handleDialogueClick = (dialogueItem) => {
    const now = Date.now();

    // Track response time only for interruptions
    if (dialogueItem.isInterrupted && !interruptionsFound.includes(dialogueItem.id)) {
      if (lastClickTime) {
        const diffSec = (now - lastClickTime) / 1000;
        setResponseTimes((prev) => [...prev, diffSec]);
      }
      setLastClickTime(now);

      // Found an interruption
      setInterruptionsFound([...interruptionsFound, dialogueItem.id]);
      setScore(score + 10);
      setGameState("paused");
      setTimer(2);
      setShowTimer(true);
    } else if (!dialogueItem.isInterrupted) {
      // Wrong click - just update state
      setGameState("playing");
      setLastClickTime(now); // still update lastClickTime for next response
    }

    // Move to next dialogue
    if (currentDialogue < dialogue.length - 1) {
      setTimeout(
        () => {
          setCurrentDialogue(currentDialogue + 1);
        },
        dialogueItem.isInterrupted ? 0 : 1000
      );
    }
  };


  const handleRewrite = (option) => {
    setSelectedRewrite(option);
    const correctRewrite = dialogue.find((d) => d.isInterrupted)?.correctRewrite;

    if (
      option === correctRewrite ||
      dialogue.find((d) => d.isInterrupted)?.rewriteOptions.includes(option)
    ) {
      setScore(score + 20);
      setBadges([...badges, "🤝"]);
      setGameState("result");
      completeCommunicationChallenge(1, 1);
      setShowCelebration(true);

      // 🟢 Performance Tracking
      const endTime = Date.now();
      const durationSec = (endTime - startTime) / 1000;
      const totalPossible = (dialogue.filter((d) => d.isInterrupted).length * 10) + 20;
      const scaledScore = Math.min(Math.round((score / totalPossible) * 10), 10);
      const accuracy = Math.round((score / totalPossible) * 100);

      const avgResponseTimeSec =
        responseTimes.length > 0
          ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          : 0;

      const payload = {
        moduleName: "Communication",
        topicName: "emotionalIntelligence",
        score: scaledScore,
        accuracy,
        studyTimeMinutes: durationSec / 60,
        avgResponseTimeSec, // ✅ newly added
        completed: true,

      };
      updatePerformance(payload);
      setStartTime(Date.now());

      setTimeout(() => setShowCelebration(false), 3000);
    }
  };


  const resetGame = () => {
    setGameState("intro");
    setCurrentDialogue(0);
    setInterruptionsFound([]);
    setSelectedRewrite("");
    setTimer(0);
    setShowTimer(false);
    setStartTime(Date.now());
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 p-2 sm:p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-4 sm:mb-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-3 sm:p-6 border-2 sm:border-4 border-green-300">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-2xl sm:text-4xl">🔄</div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-3xl font-bold text-green-800">
                  Oops, I Interrupted!
                </h1>
                <p className="text-sm sm:text-lg text-green-600">
                  Learn to take turns talking
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="bg-green-200 rounded-full px-3 py-1 sm:px-4 sm:py-2 flex items-center space-x-1 sm:space-x-2">
                <Award className="text-green-600" size={16} />
                <span className="font-bold text-green-800 text-sm sm:text-base">
                  {score}
                </span>
              </div>
              <div className="flex space-x-1">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="text-xl sm:text-2xl animate-bounce"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Intro Phase */}
        {gameState === "intro" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border-2 sm:border-4 border-blue-300 mb-4 sm:mb-6">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎭</div>
              <h2 className="text-lg sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4">
                Listen to the Conversation
              </h2>
              <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-200 mb-4 sm:mb-6">
                <p className="text-sm sm:text-lg text-gray-700 mb-3 sm:mb-4">
                  <strong>Your Mission:</strong> Two friends are talking about a
                  TV show. Tap when someone interrupts! 🕵️‍♀️
                </p>
                <div className="bg-yellow-100 rounded-lg p-3 sm:p-4 border-2 border-yellow-300">
                  <p className="text-xs sm:text-sm text-yellow-800 font-medium">
                    💡 <strong>Tip:</strong> Look for when someone cuts off
                    another person mid-sentence!
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={startGame}
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Listening! 👂
              </button>
            </div>
          </div>
        )}

        {/* Playing Phase */}
        {(gameState === "playing" || gameState === "paused") && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border-2 sm:border-4 border-purple-300">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-purple-800 mb-2">
                {gameState === "paused"
                  ? "Great catch! 🎯"
                  : "Tap when you hear an interruption! 👆"}
              </h2>
              {gameState === "paused" && showTimer && (
                <div className="bg-yellow-100 rounded-full px-4 py-2 border-2 border-yellow-300 inline-flex items-center space-x-2">
                  <Clock className="text-yellow-600" size={16} />
                  <span className="font-bold text-yellow-800">
                    Wait {timer} seconds...
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
              {dialogue.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-500 ${index <= currentDialogue
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-30 transform translate-y-4"
                    }`}
                >
                  <div
                    onClick={() =>
                      index === currentDialogue && gameState === "playing"
                        ? handleDialogueClick(item)
                        : null
                    }
                    className={`${item.color
                      } rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 cursor-pointer transform transition-all duration-200 ${index === currentDialogue && gameState === "playing"
                        ? "hover:scale-102 hover:shadow-lg"
                        : ""
                      } ${interruptionsFound.includes(item.id)
                        ? "ring-2 sm:ring-4 ring-red-400 bg-red-100"
                        : ""
                      }`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="text-2xl sm:text-3xl">{item.avatar}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 text-sm sm:text-base mb-1">
                          {item.speaker}:
                        </div>
                        <div className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                          "{item.text}"
                          {interruptionsFound.includes(item.id) && (
                            <span className="ml-2 text-red-600 font-bold">
                              ← INTERRUPTION!
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(item.text);
                        }}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 sm:p-2 transition-colors"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {interruptionsFound.length > 0 &&
              gameState === "playing" &&
              currentDialogue >= dialogue.length - 1 && (
                <div className="text-center mt-6 sm:mt-8">
                  <div className="bg-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-300">
                    <CheckCircle
                      className="text-green-600 mx-auto mb-2"
                      size={32}
                    />
                    <p className="text-green-700 font-bold text-sm sm:text-lg">
                      You found {interruptionsFound.length} interruption
                      {interruptionsFound.length > 1 ? "s" : ""}! Now let's fix
                      it! 🔧
                    </p>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Rewrite Phase */}
        {gameState === "rewrite" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border-2 sm:border-4 border-orange-300">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">✏️</div>
              <h2 className="text-lg sm:text-2xl font-bold text-orange-800 mb-3 sm:mb-4">
                Let's Fix That Interruption!
              </h2>
              <p className="text-sm sm:text-lg text-orange-600">
                How should Bailey respond instead of interrupting Alex?
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl">👦</div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">
                      Alex:
                    </div>
                    <div className="text-sm sm:text-lg text-gray-700">
                      "My favorite part was when—"
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-dashed border-gray-300 pt-3 sm:pt-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl">👧</div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm sm:text-base">
                        Bailey should say:
                      </div>
                      <div className="text-sm sm:text-lg text-orange-600 font-medium">
                        Choose the best response! 👇
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
              {dialogue
                .find((d) => d.isInterrupted)
                ?.rewriteOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleRewrite(option)}
                    className="w-full p-4 sm:p-6 bg-orange-50 hover:bg-orange-100 rounded-xl sm:rounded-2xl border-2 border-orange-200 text-left transition-all duration-200 transform hover:scale-102 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="bg-orange-200 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-orange-800 text-sm sm:text-base">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="text-sm sm:text-lg text-gray-700 font-medium">
                        "{option}"
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Result Phase */}
        {gameState === "result" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border-2 sm:border-4 border-rainbow border-gradient-to-r from-green-300 to-blue-300 relative overflow-hidden">
            {showCelebration && (
              <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl animate-pulse z-10">
                🎉🤝✨🎊🌟
              </div>
            )}
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🏆</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3 sm:mb-4">
                Fantastic Job!
              </h2>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-green-300">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                  <Award className="text-green-600" size={24} />
                  <span className="text-lg sm:text-2xl font-bold text-green-800 text-center">
                    Respectful Talker Badge Earned!
                  </span>
                  <span className="text-2xl sm:text-3xl">🤝</span>
                </div>
                <p className="text-sm sm:text-lg text-green-700">
                  You learned how to have respectful conversations!
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-blue-200">
                <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2 sm:mb-3">
                  What You Learned:
                </h3>
                <div className="space-y-2 text-sm sm:text-base text-blue-600">
                  <p>✅ How to spot interruptions</p>
                  <p>✅ The importance of taking turns</p>
                  <p>✅ How to respond respectfully</p>
                  <p>🌟 Great listeners make great friends!</p>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2 mx-auto"
              >
                <RefreshCw size={20} />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterruptGame;
