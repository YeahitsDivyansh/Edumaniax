import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Instagram,
  MessageSquare,
  Star,
  Trophy,
  CheckCircle,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const BrandVoiceGame = () => {
  const [currentStep, setCurrentStep] = useState("intro");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [responses, setResponses] = useState({});
  const [caption, setCaption] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [animations, setAnimations] = useState({});
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  const platforms = [
    {
      id: "instagram",
      name: "Instagram DM",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      scenario: "Hey! Can I use the cleanser if I have acne-prone skin?",
      bgColor: "bg-gradient-to-br from-pink-100 to-purple-100",
    },
    {
      id: "reel",
      name: "Comment on Reel",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      scenario: "This ad is annoying!",
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Query",
      icon: FaWhatsapp,
      color: "from-green-500 to-emerald-600",
      scenario: "Love the look! Where can I buy this?",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
    },
  ];

  const vibes = [
    {
      id: "trendy",
      name: "Trendy",
      emoji: "✨",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "eco",
      name: "Eco-Friendly",
      emoji: "🌱",
      color: "from-green-400 to-emerald-500",
    },
    {
      id: "educational",
      name: "Educational",
      emoji: "📚",
      color: "from-blue-400 to-indigo-500",
    },
  ];

  const triggerAnimation = (key) => {
    setAnimations((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAnimations((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const evaluateResponse = (platformId, response) => {
    const text = response.toLowerCase().trim();

    // Tone Accuracy (2 points) - friendly greeting or positive tone
    const hasFriendlyGreeting =
      text.includes("hi") ||
      text.includes("hey") ||
      text.includes("hello") ||
      text.includes("thanks");
    const hasPositiveTone =
      text.includes("absolutely") ||
      text.includes("sure") ||
      text.includes("love") ||
      text.includes("great");
    const toneScore =
      hasFriendlyGreeting || hasPositiveTone ? 2 : text.length > 5 ? 1 : 0;

    // Addressed User Need (2 points) - actually answers the question
    let helpfulScore = 0;
    if (
      platformId === "instagram" &&
      (text.includes("yes") ||
        text.includes("acne") ||
        text.includes("gentle") ||
        text.includes("suitable"))
    ) {
      helpfulScore = 2;
    } else if (
      platformId === "reel" &&
      (text.includes("sorry") ||
        text.includes("feedback") ||
        text.includes("improve"))
    ) {
      helpfulScore = 2;
    } else if (
      platformId === "whatsapp" &&
      (text.includes("website") ||
        text.includes("store") ||
        text.includes("buy") ||
        text.includes("shop"))
    ) {
      helpfulScore = 2;
    } else if (response.length > 15) {
      helpfulScore = 1;
    }

    // Platform-appropriate length (1 point) - not too short, not too long
    const lengthScore = response.length >= 10 && response.length <= 200 ? 1 : 0;

    return toneScore + helpfulScore + lengthScore;
  };

  const evaluateCaption = (caption, vibe) => {
    const text = caption.toLowerCase().trim();

    // Has relevant content (1 point)
    const hasRelevantContent =
      text.includes("eco") ||
      text.includes("packaging") ||
      text.includes("new") ||
      text.includes("launch");

    // Has emoji (1 point)
    const hasEmoji =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
        caption
      );

    // Good length (1 point)
    const goodLength = caption.length >= 20 && caption.length <= 150;

    return (
      (hasRelevantContent ? 1 : 0) + (hasEmoji ? 1 : 0) + (goodLength ? 1 : 0)
    );
  };

  const handleResponseSubmit = (platformId) => {
    const score = evaluateResponse(platformId, responses[platformId] || "");
    setScores((prev) => ({ ...prev, [platformId]: score }));
    triggerAnimation(`response-${platformId}`);

    // Auto-close platform after submission
    setTimeout(() => {
      setSelectedPlatform(null);
    }, 2000);
  };

  const handleCaptionSubmit = () => {
    const score = evaluateCaption(caption, selectedVibe);
    setScores((prev) => ({ ...prev, caption: score }));
    triggerAnimation("caption");
  };

  const calculateFinalScore = () => {
    // Chat Responses: 3 platforms × 5 points each = 15 points
    const chatScore = platforms.reduce((acc, platform) => {
      return acc + (scores[platform.id] || 0);
    }, 0);

    // Caption Writing: 3 points
    const captionScore = scores.caption || 0;

    // Tone Match Across Platforms: 5 points (bonus for completing all platforms with good tone)
    const completedPlatforms = platforms.filter(
      (platform) => scores[platform.id] !== undefined
    ).length;
    const avgToneScore =
      completedPlatforms > 0 ? chatScore / completedPlatforms : 0;
    const toneBonus = completedPlatforms === 3 && avgToneScore >= 3 ? 5 : 0;

    return chatScore + captionScore + toneBonus;
  };

  const navigate = useNavigate();
  const finishGame = () => {
    const final = calculateFinalScore();
    setTotalScore(final);
    setShowResults(true);
    setCurrentStep("results");

    const passed = final >= 7;
    const endTime = Date.now();
    const durationInMinutes = Math.floor((endTime - startTime) / 60000); // rounded study time
    const avgResponseTimeSec = Math.round((endTime - startTime) / 1000 / 4); // assume 3 responses + 1 caption

    // ✅ Performance tracking
    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "contentStrategist",
      score: Math.round((final / 23) * 10),
      accuracy: ((final / 23) * 100).toFixed(2), // total max score = 15 + 3 + 5 = 23
      avgResponseTimeSec,
      studyTimeMinutes: durationInMinutes,
      completed: true,
      
    });
    setStartTime(Date.now());


    // Navigate to result page
    setTimeout(() => {
      navigate("/brand-voice-result", {
        state: {
          finalScore: final,
          scores,
          passed,
          platforms: platforms.map((item) => ({
            id: item.id,
            name: item.name,
          })),
        },
      });
    }, 500);
  };


  const resetGame = () => {
    setCurrentStep("intro");
    setSelectedPlatform(null);
    setResponses({});
    setCaption("");
    setSelectedVibe("");
    setScores({});
    setTotalScore(0);
    setShowResults(false);
    setStartTime(Date.now());

  };

  if (currentStep === "intro") {
    return (
      <div
        className="w-[100%] p-5 mx-auto"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <div className="w-[90%] mx-auto bg-gradient-to-br rounded-2xl from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Sparkles className="w-16 h-16 text-purple-500 animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <motion.h1
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
              >
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  GlowPop
                </span>{" "}
                Brand Voice Challenge! 🎮
              </motion.h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Help GlowPop respond to customers while their chatbot is down!
                Can you keep the brand voice{" "}
                <span className="font-bold text-purple-600">
                  friendly, helpful & awesome
                </span>
                ?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-4 text-white transform hover:scale-105 transition-all">
                  <MessageCircle className="w-8 h-8 mb-2 mx-auto" />
                  <div className="font-semibold">3 Chat Responses</div>
                  <div className=" opacity-90">5 points each</div>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-4 text-white transform hover:scale-105 transition-all">
                  <Instagram className="w-8 h-8 mb-2 mx-auto" />
                  <div className=" font-semibold">1 Caption Creation</div>
                  <div className=" opacity-90">3 points</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white transform hover:scale-105 transition-all">
                  <Trophy className="w-8 h-8 mb-2 mx-auto" />
                  <div className=" font-semibold">Bonus + Win!</div>
                  <div className=" opacity-90">5 bonus, 7+ to pass</div>
                </div>
              </div>

              {/* Scoring Rules Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  How to Score Points! 📊
                </h3>

                <div className="grid text-lg grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm wrap-break-word">
                    <h4 className="font-bold text-blue-600 mb-2">
                      💬 Chat Responses (5 pts each)
                    </h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>
                        • <strong>Tone (2):</strong> Be friendly! Say "hi",
                        "hey", etc.
                      </li>
                      <li>
                        • <strong>Helpful (2):</strong> Clearly answer the
                        question
                      </li>
                      <li>
                        • <strong>Length (1):</strong> 10–200 characters
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm wrap-break-word">
                    <h4 className="font-bold text-green-600 mb-2">
                      📸 Captions (3 pts)
                    </h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>
                        • <strong>Content (1):</strong> Mention
                        eco/packaging/new
                      </li>
                      <li>
                        • <strong>Emojis (1):</strong> Add fun ones! 🌱✨
                      </li>
                      <li>
                        • <strong>Length (1):</strong> 20–150 characters
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm wrap-break-word">
                    <h4 className="font-bold text-yellow-600 mb-2">
                      🏆 Bonus (5 pts)
                    </h4>
                    <p className="text-gray-700">
                      Do all 3 chats with 3+ pts each to earn bonus!
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep("platforms")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Challenge! 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "platforms") {
    return (
      <div
        className="w-[90%] min-h-screen p-5 mx-auto"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <div className="w-full h-full rounded-xl shadow-2xl mx-auto bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your Platform! 📱
              </h2>
              <p className="text-xl text-white/90">
                Tap each platform to see the customer message and respond!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {platforms.map((platform) => {
                const IconComponent = platform.icon;
                const isCompleted = scores[platform.id] !== undefined;

                return (
                  <div key={platform.id} className="relative">
                    <div
                      className={`${platform.bgColor
                        } rounded-3xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ${selectedPlatform === platform.id
                          ? "ring-4 ring-white"
                          : ""
                        }`}
                      onClick={() => setSelectedPlatform(platform.id)}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <div
                          className={`bg-gradient-to-r ${platform.color} rounded-full p-4`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                        {platform.name}
                      </h3>

                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 animate-bounce">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    {selectedPlatform === platform.id && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-gradient-to-br from-blue-400 to bg-blue-800 via-slate-600 rounded-2xl shadow-2xl p-6 z-10 animate-in slide-in-from-top-4 duration-300">
                        <div className="mb-4">
                          <h4 className="font-bold text-yellow-200 mb-2">
                            Customer says:
                          </h4>
                          <div className="bg-yellow-100 rounded-lg p-3 text-gray-700 italic">
                            "{platform.scenario}"
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block font-bold text-yellow-200 mb-2">
                            Your Response:
                          </label>
                          <textarea
                            value={responses[platform.id] || ""}
                            onChange={(e) =>
                              setResponses((prev) => ({
                                ...prev,
                                [platform.id]: e.target.value,
                              }))
                            }
                            className="w-full bg-yellow-100 p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                            rows="3"
                            placeholder="Type your friendly GlowPop response here..."
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleResponseSubmit(platform.id)}
                            disabled={!responses[platform.id]?.trim()}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            Submit Response! ✨
                          </button>
                          <button
                            onClick={() => setSelectedPlatform(null)}
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full transition-colors"
                          >
                            Close
                          </button>
                        </div>

                        {animations[`response-${platform.id}`] && (
                          <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 mb-3 rounded-full">
                              <Star className="w-5 h-5" />
                              <span className="font-bold">
                                Response Saved! +{scores[platform.id]} points
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentStep("caption")}
                disabled={Object.keys(scores).length < 3}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 transition-all duration-300 shadow-lg"
              >
                Next: Create Caption! 📝
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "caption") {
    return (
      <div
        className="w-[90%] min-h-screen p-5 mx-auto"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <div className="w-full h-full mx-auto bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Caption Creation Time! 📸
                </h2>
                <p className="text-xl text-gray-600">
                  GlowPop's eco-packaging is now live! Create an Instagram
                  caption to announce it.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Choose Your Vibe:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vibes.map((vibe) => (
                    <div
                      key={vibe.id}
                      className={`bg-gradient-to-r ${vibe.color
                        } rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 ${selectedVibe === vibe.id
                          ? "ring-4 ring-white shadow-2xl"
                          : "shadow-lg"
                        }`}
                      onClick={() => setSelectedVibe(vibe.id)}
                    >
                      <div className="text-center text-white">
                        <div className="text-3xl mb-2">{vibe.emoji}</div>
                        <div className="font-bold text-lg">{vibe.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-bold text-gray-800 mb-4">
                  Write Your Caption:
                </label>
                <textarea
                  value={caption}
                  maxLength={150}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 wrap-break-word focus:outline-none transition-colors text-lg"
                  rows="4"
                  placeholder="Create an exciting caption for GlowPop's new eco-packaging! Don't forget emojis! 🌱✨"
                />
                <div className="mt-2 flex justify-between text-sm">
                  <span
                    className={`${caption.length < 20
                      ? "text-red-500"
                      : caption.length > 150
                        ? "text-red-500"
                        : "text-green-600"
                      }`}
                  >
                    {caption.length < 20
                      ? `Need ${20 - caption.length} more characters`
                      : caption.length > 150
                        ? `${caption.length - 150} characters over limit`
                        : "Perfect length!"}
                  </span>
                  <span className="text-gray-500">
                    {caption.length}/150 characters
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-gray-800 mb-3">
                  Instagram Post Preview:
                </h4>
                <div className="bg-white rounded-lg p-4 shadow-inner">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-800">
                      @glowpop_official
                    </span>
                  </div>
                  <div className="text-gray-700 mb-3 wrap-break-word">
                    {caption || "Your caption will appear here..."}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {selectedVibe && `#${selectedVibe} #ecopackaging #glowpop`}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCaptionSubmit}
                  disabled={
                    !caption.trim() ||
                    !selectedVibe ||
                    caption.length < 20 ||
                    caption.length > 150
                  }
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
                >
                  Submit Caption! 🎉
                </button>
                <button
                  onClick={finishGame}
                  disabled={!scores.caption}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
                >
                  Finish Game! 🏆
                </button>
              </div>

              {animations.caption && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
                    <Zap className="w-6 h-6" />
                    <span className="font-bold text-lg">
                      Caption Scored! +{scores.caption} points
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BrandVoiceGame;
