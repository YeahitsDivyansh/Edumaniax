import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Trophy,
  Target,
  ShoppingCart,
  Leaf,
  ThumbsUp,
  X,
  Sparkles,
  Phone,
  Play,
  Edit3,
} from "lucide-react";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const DigitalExplorer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [seeResults, setSeeResults] = useState(false);
  const [scores, setScores] = useState({
    matching: 0,
    flow: 0,
    creative: 0,
  });
  const [badges, setBadges] = useState([]);
  const [draggedCard, setDraggedCard] = useState(null);
  const [matches, setMatches] = useState({});
  const [flowChoices, setFlowChoices] = useState({});
  const [reelIdea, setReelIdea] = useState("");
  const [showFeedback, setShowFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const personas = [
    {
      id: "sneha",
      name: "Sneha",
      subtitle: "The Trend Follower",
      emoji: "💅📱✨",
      color: "bg-pink-400",
      borderColor: "border-pink-500",
      matched: false,
    },
    {
      id: "aarav",
      name: "Aarav",
      subtitle: "The Budget Buyer",
      emoji: "🛒💸📊",
      color: "bg-blue-400",
      borderColor: "border-blue-500",
      matched: false,
    },
    {
      id: "kavya",
      name: "Kavya",
      subtitle: "The Conscious Shopper",
      emoji: "🌿♻️📦",
      color: "bg-green-400",
      borderColor: "border-green-500",
      matched: false,
    },
  ];

  const mysteryCards = [
    {
      id: "card-a",
      text: "Age 15, follows skincare influencers, posts reviews",
      correctMatch: "sneha",
      emoji: "🎯",
    },
    {
      id: "card-b",
      text: "Uses price filters, waits for offers",
      correctMatch: "aarav",
      emoji: "🎯",
    },
    {
      id: "card-c",
      text: "Watches climate docs, buys refill packs",
      correctMatch: "kavya",
      emoji: "🎯",
    },
  ];

  const flowSteps = [
    {
      id: "platform",
      question: "Pick a Platform:",
      options: [
        { id: "instagram", text: "Instagram", correct: true, emoji: "📸" },
        { id: "linkedin", text: "LinkedIn", correct: false, emoji: "💼" },
        { id: "email", text: "Email", correct: false, emoji: "📧" },
      ],
    },
    {
      id: "format",
      question: "Pick a Content Format:",
      options: [
        { id: "reel", text: "Reel", correct: true, emoji: "🎬" },
        { id: "pdf", text: "PDF Download", correct: false, emoji: "📄" },
        { id: "poll", text: "Poll", correct: false, emoji: "📊" },
      ],
    },
    {
      id: "hook",
      question: "Choose a Campaign Hook:",
      options: [
        {
          id: "influencer",
          text: "Influencer using product",
          correct: true,
          emoji: "⭐",
        },
        {
          id: "discount",
          text: "Discount Text Only",
          correct: false,
          emoji: "💰",
        },
        { id: "survey", text: "Survey Link", correct: false, emoji: "📋" },
      ],
    },
  ];

  const handleDragStart = (e, cardId) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, personaId) => {
    e.preventDefault();
    const card = mysteryCards.find((c) => c.id === draggedCard);
    const isCorrect = card?.correctMatch === personaId;

    if (isCorrect) {
      setMatches((prev) => ({ ...prev, [draggedCard]: personaId }));
      setShowFeedback(`correct-${personaId}`);
      setScores((prev) => ({ ...prev, matching: prev.matching + 1 }));

      // Check if all matches are complete
      const newMatches = { ...matches, [draggedCard]: personaId };
      if (Object.keys(newMatches).length === 3) {
        setBadges((prev) => [...prev, "social-sleuth"]);
      }
    } else {
      setShowFeedback(`incorrect-${personaId}`);
      setAttempts((prev) => prev + 1);
    }

    setTimeout(() => setShowFeedback(""), 2000);
    setDraggedCard(null);
  };

  const handleFlowChoice = (stepId, choiceId, isCorrect) => {
    setFlowChoices((prev) => ({ ...prev, [stepId]: choiceId }));

    if (isCorrect) {
      setScores((prev) => ({ ...prev, flow: prev.flow + 1 }));
      setShowFeedback(`flow-correct-${stepId}`);
    } else {
      setShowFeedback(`flow-incorrect-${stepId}`);
    }

    setTimeout(() => setShowFeedback(""), 1500);
  };

  const evaluateReelIdea = () => {
    let score = 0;
    const idea = reelIdea.toLowerCase();

    // Format match (mentions reel/video/transform/glow)
    if (
      idea.includes("reel") ||
      idea.includes("transform") ||
      idea.includes("glow") ||
      idea.includes("✨")
    ) {
      score += 2;
    }

    // Persona alignment (trendy/influencer language)
    if (
      idea.includes("trend") ||
      idea.includes("viral") ||
      idea.includes("filter") ||
      idea.includes("💖")
    ) {
      score += 2;
    }

    // Creativity (engaging hook)
    if (idea.includes("!") || idea.includes("?") || idea.length > 50) {
      score += 1;
    }

    setScores((prev) => ({ ...prev, creative: score }));

    if (score >= 4) {
      setBadges((prev) => [...prev, "trendsetter"]);
    }

    setSeeResults(true);
  };

  const getTotalScore = () => {
    return scores.matching + scores.flow + scores.creative;
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetGame = () => {
    setCurrentStep(1);
    setScores({ matching: 0, flow: 0, creative: 0 });
    setBadges([]);
    setMatches({});
    setFlowChoices({});
    setReelIdea("");
    setShowFeedback("");
    setAttempts(0);
    setStartTime(Date.now());

  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    const endTime = Date.now();
    const totalTimeSec = Math.floor((endTime - startTime) / 1000);

    const totalScore = getTotalScore(); // out of 11
    const accuracy = parseFloat(((totalScore / 11) * 100).toFixed(2));
    const avgResponseTimeSec = parseFloat((totalTimeSec / 3).toFixed(2));
    const studyTimeMinutes = parseFloat((totalTimeSec / 60).toFixed(2));

    // Scaled values (0–100 scale)
    const scaledScore = Math.round((totalScore / 11) * 100); // scale to 100
    const scaledStudyTime = Math.min(Math.round(studyTimeMinutes * 10), 100); // e.g., cap at 100

    const payload = {
      moduleName: "DigitalMarketing",
      topicName: "contentStrategist",
      score: scaledScore,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes: scaledStudyTime,
      completed: true,
      
    };

    updatePerformance(payload); // call context method
    setStartTime(Date.now());


    setLoading(true);
    setTimeout(() => {
      navigate("/digital-explorer-result", { state: scores });
      setLoading(false);
      resetGame();
    }, 500);
  };


  return (
    <div className="w-[95%] mx-auto max-h-screen  p-5">
      <div className="w-full min-h-screen relative rounded-xl shadow-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0.1, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="text-4xl font-bold text-white mb-2 drop-shadow-lg"
          >
            🎬 GlowPop Junior Strategist 🎬
          </motion.h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            <span className="text-white font-semibold">
              Step {currentStep} of 3
            </span>
          </div>
        </div>

        {/* Score Display */}
        <div className="absolute  top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {getTotalScore()}/11
            </div>
            <div className="text-sm text-gray-600">Total Score</div>
            <div className="flex gap-1 mt-2">
              {badges.map((badge, index) => (
                <div key={index} className="text-yellow-500">
                  {badge === "social-sleuth" && <Target size={16} />}
                  {badge === "trendsetter" && <Trophy size={16} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Persona Matching */}
        {currentStep === 1 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 via-slate-900 to-blue-950 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-xl">
              <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
                🕵️ Decode Mystery Profiles!
              </h2>
              <p className="text-center text-yellow-50 mb-6">
                Use your detective skills to match each mystery profile to the
                right persona!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Persona Boards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white text-center">
                  Persona Boards
                </h3>
                {personas.map((persona, index) => {
                  const floatClass = `float${(index % 4) + 1}`;
                  return (
                    <div
                      key={persona.id}
                      className={`${persona.color} ${persona.borderColor} floating-card ${floatClass} border-4 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, persona.id)}
                    >
                      {/* Animated background sparkles */}
                      <div className="absolute inset-0 opacity-20">
                        <Sparkles className="absolute top-2 right-2 animate-pulse" />
                        <Sparkles className="absolute bottom-2 left-2 animate-pulse delay-500" />
                      </div>

                      <div className="relative z-10">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{persona.emoji}</div>
                          <h4 className="text-xl font-bold text-white">
                            {persona.name}
                          </h4>
                          <p className="text-white/80">{persona.subtitle}</p>
                        </div>

                        {/* Feedback animations */}
                        {showFeedback === `correct-${persona.id}` && (
                          <div className="absolute inset-0 flex items-center justify-center bg-green-500/80 rounded-lg">
                            <ThumbsUp
                              className="text-white animate-bounce"
                              size={48}
                            />
                          </div>
                        )}

                        {showFeedback === `incorrect-${persona.id}` && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-lg">
                            <X className="text-white animate-shake" size={48} />
                          </div>
                        )}

                        {/* Success star */}
                        {Object.values(matches).includes(persona.id) && (
                          <div className="absolute top-2 right-2">
                            <Star
                              className="text-yellow-300 animate-spin"
                              fill="currentColor"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mystery Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white text-center">
                  Mystery Cards
                </h3>
                {mysteryCards.map((card, index) => {
                  const floatClass = `float${(index % 4) + 1}`;
                  return (
                    <div
                      key={card.id}
                      draggable={!matches[card.id]}
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      className={`bg-white floating-card ${floatClass} rounded-xl p-4 shadow-lg cursor-move transform transition-all duration-300 hover:scale-105 ${matches[card.id]
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-xl"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{card.emoji}</div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            {card.text}
                          </p>
                          {matches[card.id] && (
                            <p className="text-green-600 text-sm mt-1">
                              ✅ Matched!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Step Button */}
            {Object.keys(matches).length === 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  Next: Campaign Flow! 🚀
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Campaign Flow Simulation */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-300 to-yellow-200 via-orange-300 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-xl">
              <motion.h2
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="text-lg lg:text-2xl font-bold text-center text-purple-600 mb-4"
              >
                📱 Plan Sneha's Campaign!
              </motion.h2>
              <p className="text-center text-gray-600 mb-6">
                She's just logged in after school. What would you do to grab her
                attention?
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="bg-gray-800 rounded-3xl relative p-6 max-w-md mx-auto shadow-2xl">
              <div className="bg-white rounded-2xl p-4 h-96  overflow-y-auto">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                  <Phone size={20} className="text-purple-500" />
                  <span className="font-semibold text-gray-700">
                    Sneha's Phone
                  </span>
                </div>

                {/* Campaign Flow Steps */}
                <div className="space-y-6">
                  {flowSteps.map((step, index) => (
                    <div key={step.id} className="space-y-3">
                      <h4 className="font-bold text-gray-700">
                        {step.question}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {step.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              handleFlowChoice(
                                step.id,
                                option.id,
                                option.correct
                              )
                            }
                            disabled={flowChoices[step.id]}
                            className={`p-3 rounded-lg border-2 transition-all duration-300 ${flowChoices[step.id] === option.id
                              ? option.correct
                                ? "bg-green-100 border-green-500 text-green-700"
                                : "bg-red-100 border-red-500 text-red-700"
                              : "bg-gray-50 border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{option.emoji}</span>
                              <span className="font-medium">{option.text}</span>
                              {flowChoices[step.id] === option.id &&
                                option.correct && (
                                  <ThumbsUp
                                    size={16}
                                    className="text-green-600 ml-auto"
                                  />
                                )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Animation */}
              {Object.keys(flowChoices).length === 3 && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-slate-900 to-blue-950 flex items-center justify-center rounded-2xl">
                  <div className="text-center text-white animate-bounce">
                    <p className="font-bold text-lg">🔥 Great flow!</p>
                    <p className="text-lg">Sneha would love this!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Next Step Button */}
            {Object.keys(flowChoices).length === 3 && (
              <div className="text-center mt-5">
                <button
                  onClick={nextStep}
                  className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  Next: Create Your Reel! 🎬
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Creative Reel Idea */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 via-slate-900 to-blue-950 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-xl">
              <motion.h2
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="text-2xl font-bold text-center text-purple-600 mb-4"
              >
                ✨ Creative Spark Time!
              </motion.h2>
              <p className="text-center text-yellow-200 mb-6">
                Write a catchy 15-second Instagram Reel idea for Sneha!
              </p>
            </div>

            {/* Reel Creator */}
            <div className="bg-gradient-to-br from-green-100 to-purple-300 rounded-xl p-6 shadow-xl mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Edit3 className="text-purple-500" />
                <h3 className="font-bold text-gray-700">Your Reel Idea</h3>
              </div>

              <textarea
                value={reelIdea}
                onChange={(e) => setReelIdea(e.target.value)}
                placeholder="Example: Glow up in 10 seconds 💖✨ Watch me transform with just one swipe!"
                className="w-full p-4 border-2 border-purple-400 rounded-lg focus:border-purple-600 focus:outline-none resize-none"
                rows="4"
                maxLength="200"
              />

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-black">
                  {reelIdea.length}/200 characters
                </span>
                <button
                  onClick={evaluateReelIdea}
                  disabled={!reelIdea.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-center font-semibold hover:rotate-1 hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Idea! 🚀
                </button>
              </div>
            </div>

            {/* Inspiration Examples */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h4 className="font-bold text-black  mb-3">
                💡 Need Inspiration?
              </h4>
              <div className="space-y-2 text-md font-medium text-gray-700">
                <p>• "No filter. Just foam, fun, and flawless skin."</p>
                <p>• "POV: You found the perfect skincare routine ✨"</p>
                <p>• "Before vs After: 30 days with GlowPop 💖"</p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                disabled={!seeResults}
                onClick={handleSubmit}
                className={`${seeResults ? "bg-purple-400" : "bg-gray-400"
                  } px-5 py-3 text-lg rounded-4xl hover:rotate-1 hover:scale-105 transition-all duration-300 ease-in-out`}
              >
                See Your Results
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center mt-6">
                <div className="w-12 h-12 border-4 border-t-pink-500 border-yellow-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-pink-600 text-2xl font-semibold">
                  Thinking...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-items-start mt-3">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="bg-white/80 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-white transform transition-all duration-300 hover:scale-105"
            >
              ← Previous
            </button>
          )}
        </div>

        {currentStep < 3 &&
          Object.keys(matches).length < 3 &&
          currentStep === 1 && (
            <div className="mt-5 flex justify-center">
              <div className="bg-white/80 text-center backdrop-blur-sm text-gray-500 px-4 py-2 rounded-full">
                Complete all matches to continue
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default DigitalExplorer;
