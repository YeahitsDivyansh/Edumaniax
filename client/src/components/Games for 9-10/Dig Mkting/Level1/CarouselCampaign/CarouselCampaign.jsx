import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Heart,
  Sparkles,
  Trophy,
  RefreshCw,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import clickSoundFile from "./clickSoundFile.mp3";
import clickSoundFileYay from "./clickSoundFileYay.mp3";
import clickSoundFileOops from "./clickSoundFileOops.mp3";
import { motion } from "framer-motion";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance


const CarouselCampaign = () => {
  const { completeDMChallenge } = useDM();
  const [currentStep, setCurrentStep] = useState(1);
  const [frames, setFrames] = useState([null, null, null, null]);
  const [usedFrames, setUsedFrames] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTone, setSelectedTone] = useState(null);
  const [slideContent, setSlideContent] = useState({
    coverHook: "",
    tip1: "",
    tip2: "",
    cta: "",
  });
  const [scores, setScores] = useState({
    carouselBuild: 0,
    toneMatch: 0,
    headings: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const frameTypes = [
    {
      id: "cover",
      name: "Cover Frame",
      icon: "🎯",
      color: "bg-pink-200",
      description: "Hook your audience!",
    },
    {
      id: "tip1",
      name: "Tip Frame 1",
      icon: "💡",
      color: "bg-blue-200",
      description: "First helpful tip",
    },
    {
      id: "tip2",
      name: "Tip Frame 2",
      icon: "✨",
      color: "bg-purple-200",
      description: "Second amazing tip",
    },
    {
      id: "cta",
      name: "CTA Frame",
      icon: "🚀",
      color: "bg-green-200",
      description: "Call to action!",
    },
  ];

  const themes = [
    {
      id: "pastel",
      name: "Clean & Pastel",
      colors: "bg-gradient-to-r from-pink-100 to-purple-100",
      preview: "🌸",
    },
    {
      id: "vibrant",
      name: "Vibrant & Emoji-rich",
      colors: "bg-gradient-to-r from-yellow-300 to-orange-300",
      preview: "🌈",
    },
    {
      id: "earthy",
      name: "Earthy & Calming",
      colors: "bg-gradient-to-r from-green-200 to-teal-200",
      preview: "🌿",
    },
  ];

  const tones = [
    {
      id: "informative",
      name: "Informative",
      icon: "📚",
      description: "Educational and clear",
    },
    {
      id: "conversational",
      name: "Conversational",
      icon: "💬",
      description: "Friendly and chatty",
    },
    {
      id: "trendy",
      name: "Trendy",
      icon: "🔥",
      description: "Hip and current",
    },
  ];

  const removeFrame = (position) => {
    const newFrames = [...frames];
    const removedFrame = newFrames[position];

    if (removedFrame) {
      // Remove from used frames to make it available again
      setUsedFrames((prev) => prev.filter((id) => id !== removedFrame.id));
      newFrames[position] = null;
      setFrames(newFrames);
    }
  };

  const correctOrder = ["cover", "tip1", "tip2", "cta"];

  const handleDragStart = (e, frameType) => {
    setDraggedItem(frameType);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, position) => {
    e.preventDefault();
    if (draggedItem && !usedFrames.includes(draggedItem.id)) {
      const newFrames = [...frames];

      // If there's already a frame in this position, remove it from used frames
      if (newFrames[position]) {
        setUsedFrames((prev) =>
          prev.filter((id) => id !== newFrames[position].id)
        );
      }

      // Place the new frame
      newFrames[position] = draggedItem;
      setFrames(newFrames);

      // Add to used frames
      setUsedFrames((prev) => [...prev, draggedItem.id]);
      setDraggedItem(null);
    }
  };

  const checkFrameOrder = () => {
    const isCorrect =
      frames.length === 4 &&
      frames.every((frame, index) => frame && frame.id === correctOrder[index]);
    const score = isCorrect ? 3 : frames.length === 4 ? 1 : 0;
    return { isCorrect, score };
  };

  const checkToneMatch = () => {
    let score = 0;

    if (selectedTheme && selectedTone) {
      const themeId = selectedTheme.id;
      const toneId = selectedTone.id;

      score = compatibilityMatrix[themeId]?.[toneId] ?? 0;
    } else if (selectedTheme || selectedTone) {
      score = -2; // Partial selection
    } else {
      score = -3; // Nothing selected
    }

    setScores((prev) => ({ ...prev, toneMatch: score }));
    return score > 0;
  };

  const checkHeadings = () => {
    const { coverHook, tip1, tip2, cta } = slideContent;
    let score = 0;

    // Clear structure (2 pts)

    if (coverHook.trim() && tip1.trim() && tip2.trim() && cta.trim()) {
      score += 2;
    }

    // Platform fit (2 pts) - check for engaging language
    const engagingWords = [
      "you",
      "your",
      "how",
      "tips",
      "easy",
      "quick",
      "best",
      "amazing",
    ];

    const hasEngaging = [coverHook, tip1, tip2, cta].some((text) =>
      engagingWords.some((word) => text.toLowerCase().includes(word))
    );

    if (hasEngaging) score += 2;

    // Catchy CTA (1 pt)
    const ctaWords = ["save", "try", "swipe", "share", "tag", "comment"];
    if (ctaWords.some((word) => cta.toLowerCase().includes(word))) {
      score += 1;
    }

    setScores((prev) => ({ ...prev, headings: score }));
    return score;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const { score } = checkFrameOrder();
      setScores((prev) => ({ ...prev, carouselBuild: score }));
    } else if (currentStep === 2) {
      checkToneMatch();
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      checkHeadings();
      setShowResults(true);
    }
  };

  const resetGame = () => {
    setCurrentStep(1);
    setFrames([null, null, null, null]);
    setUsedFrames([]);
    setSelectedTheme(null);
    setSelectedTone(null);
    setSlideContent({ coverHook: "", tip1: "", tip2: "", cta: "" });
    setScores({ carouselBuild: 0, toneMatch: 0, headings: 0 });
    setShowResults(false);
    setStartTime(Date.now());

  };

  const totalScore = scores.carouselBuild + scores.toneMatch + scores.headings;
  const isPassed = totalScore >= 7;

  const clickSoundRefPop = useRef(new Audio(clickSoundFile));
  const clickSoundRefYay = useRef(new Audio(clickSoundFileYay));
  const clickSoundRefOops = useRef(new Audio(clickSoundFileOops));

  const playClickSound = (clickSoundRef) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
  };

  useEffect(() => {
    if (!showResults) {
      return;
    }
    if (isPassed) playClickSound(clickSoundRefYay);
    else {
      playClickSound(clickSoundRefOops);
    }
  }, [showResults, isPassed]);

  useEffect(() => {
    if (showResults && isPassed) {
      completeDMChallenge(0, 1);

      const endTime = Date.now();
      const totalTimeSec = Math.floor((endTime - startTime) / 1000);
      const accuracy = parseFloat(((totalScore / 11) * 100).toFixed(2));
      const avgResponseTimeSec = parseFloat((totalTimeSec / 3).toFixed(2));
      const studyTimeMinutes = parseFloat((totalTimeSec / 60).toFixed(2));

      const scaledScore = Math.round((totalScore / 11) * 100);
      const scaledStudyTime = Math.min(Math.round(studyTimeMinutes * 10), 100);

      const payload = {
        moduleName: "DigitalMarketing",
        topicName: "contentStrategist",
        score: scaledScore,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes: scaledStudyTime,
        completed: true,
         
      };

      updatePerformance(payload);
      setStartTime(Date.now());

    }
  }, [showResults, isPassed]);


  const compatibilityMatrix = {
    pastel: {
      informative: 2,
      conversational: 1,
      trendy: -1,
    },
    vibrant: {
      informative: 0,
      conversational: 2,
      trendy: 3,
    },
    earthy: {
      informative: 3,
      conversational: 1,
      trendy: -2,
    },
  };

  return (
    <div
      className="w-[95%] mx-auto p-4 min-h-screen "
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400  p-4 rounded-2xl shadow-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4">
            <Sparkles className="text-yellow-300 animate-pulse" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Storyboard Sprint
            </h1>
            <Sparkles className="text-yellow-300 animate-pulse" />
          </div>
          <p className="text-white/90 text-lg mb-4">
            Design an amazing Instagram carousel for GlowPop's #SelfCareSunday!
          </p>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-3 max-w-md mx-auto mb-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <p className="text-white/80">Step {currentStep} of 3</p>
        </div>

        {!showResults ? (
          <div className="bg-gradient-to-br from-purple-200 to-blue-800  backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-2xl">
            {/* Step 1: Frame Builder */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    🧩 Step 1: Frame Builder
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Drag the frames in the correct order to tell your skincare
                    story!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Available Frames */}
                  <div>
                    <h3 className="text-xl text-center font-bold text-gray-700 mb-4">
                      📦 Available Frames
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {frameTypes.map((frame, index) => {
                        const isUsed = usedFrames.includes(frame.id);
                        const floatClass = `float${(index % 4) + 1}`;
                        return (
                          <div
                            key={frame.id}
                            draggable={!isUsed}
                            onDragStart={(e) =>
                              !isUsed && handleDragStart(e, frame)
                            }
                            className={`${frame.color
                              } floating-card ${floatClass} p-2 md:p-4 rounded-2xl transform transition-all duration-200 ${isUsed
                                ? "opacity-30 cursor-not-allowed grayscale"
                                : "cursor-move hover:scale-105 hover:shadow-lg"
                              }`}
                          >
                            <div className="text-xl md:text-3xl mb-2">
                              {frame.icon}
                            </div>
                            <h4 className="font-bold text-gray-800">
                              {frame.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {frame.description}
                            </p>
                            {isUsed && (
                              <div className="mt-2 text-xs font-bold text-gray-500 bg-gray-200 rounded-full px-2 py-1 inline-block">
                                USED ✓
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Drop Zones */}
                  <div>
                    <h3 className="text-xl text-center font-bold text-gray-700 mb-4">
                      🎯 Your Carousel Order
                    </h3>
                    <div className="space-y-4">
                      {[0, 1, 2, 3].map((position, index) => {
                        const floatClass = `float${(index % 4) + 1}`;
                        return (
                          <div
                            key={position}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, position)}
                            className={`border-3 floating-card ${floatClass} border-dashed border-gray-300 rounded-2xl p-6 min-h-24 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative`}
                          >
                            {frames[position] ? (
                              <div
                                className={`${frames[position].color} p-3 rounded-xl flex items-center gap-3 w-full relative group`}
                              >
                                <span className="text-2xl">
                                  {frames[position].icon}
                                </span>
                                <span className="font-bold text-gray-800 flex-1">
                                  {frames[position].name}
                                </span>
                                <button
                                  onClick={() => removeFrame(position)}
                                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 flex items-center justify-center text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400 font-medium">
                                Drop frame {position + 1} here
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                {frames.some((frame) => frame !== null) && (
                  <div className="mt-6">
                    {frames.filter((f) => f).length === 4 && (
                      <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
                        {checkFrameOrder().isCorrect ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Check className="w-5 h-5" />
                            <span className="font-bold">
                              Swipe-worthy sequence unlocked! 🎉
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-orange-600">
                            <X className="w-5 h-5" />
                            <span className="font-bold">
                              Try again — story flow got disrupted! Remove wrong
                              frames.
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {frames.filter((f) => f).length > 0 &&
                      frames.filter((f) => f).length < 4 && (
                        <div className="p-4 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
                          <div className="flex items-center gap-2 text-yellow-600">
                            <span className="font-bold">
                              Keep going! Add{" "}
                              {4 - frames.filter((f) => f).length} more frame(s)
                              💪
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Theme & Tone Selector */}
            {currentStep === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    🧪 Step 2: Theme & Tone Selector
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Choose the perfect aesthetic and tone for your campaign!
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Theme Selection */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">
                      🎨 Choose Your Aesthetic
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {themes.map((theme, index) => {
                        const floatClass = `float${(index % 4) + 1}`;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => {
                              setSelectedTheme(theme);
                              playClickSound(clickSoundRefPop);
                            }}
                            className={`${theme.colors
                              } floating-card ${floatClass} p-6 rounded-2xl transform hover:scale-105 transition-all duration-200 ${selectedTheme?.id === theme.id
                                ? "ring-4 ring-purple-500 shadow-lg"
                                : "hover:shadow-md"
                              }`}
                          >
                            <div className="text-4xl mb-2">{theme.preview}</div>
                            <h4 className="font-bold text-gray-800">
                              {theme.name}
                            </h4>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tone Selection */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">
                      💬 Choose Your Tone
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {tones.map((tone, index) => {
                        const floatClass = `float${(index % 4) + 1}`;
                        return (
                          <button
                            key={tone.id}
                            onClick={() => {
                              setSelectedTone(tone);
                              playClickSound(clickSoundRefPop);
                            }}
                            className={`bg-gradient-to-br floating-card ${floatClass} from-indigo-100 to-purple-100 p-6 rounded-2xl transform hover:scale-105 transition-all duration-200 ${selectedTone?.id === tone.id
                              ? "ring-4 ring-indigo-500 shadow-lg"
                              : "hover:shadow-md"
                              }`}
                          >
                            <div className="text-3xl mb-2">{tone.icon}</div>
                            <h4 className="font-bold text-gray-800">
                              {tone.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {tone.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preview */}
                  {selectedTheme && selectedTone && (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border-2 border-green-200">
                      <h4 className="font-bold text-gray-800 mb-2">
                        ✨ Preview Your Style
                      </h4>
                      <div className={`${selectedTheme.colors} p-4 rounded-xl`}>
                        <p className="text-gray-800 font-medium">
                          {selectedTheme.name} + {selectedTone.name} = Perfect
                          match! 🎯
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Write Content */}
            {currentStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    🖊 Step 3: Write Your Content
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Create catchy headlines and calls-to-action for each slide!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="floating-card float1 bg-pink-50 p-6 rounded-2xl border-2 border-pink-200">
                    <label className="block text-lg font-bold text-gray-800 mb-2">
                      🎯 Cover Hook (Grab attention!)
                    </label>
                    <input
                      type="text"
                      value={slideContent.coverHook}
                      onChange={(e) =>
                        setSlideContent({
                          ...slideContent,
                          coverHook: e.target.value,
                        })
                      }
                      placeholder="e.g., '4 Steps to Glowing Skin ✨'"
                      className="w-full p-4 rounded-xl border-2 border-pink-300 focus:border-pink-500 focus:outline-none text-lg"
                    />
                  </div>

                  <div className="bg-blue-50 floating-card float2 p-6 rounded-2xl border-2 border-blue-200">
                    <label className="block text-lg font-bold text-gray-800 mb-2">
                      💡 Tip Frame 1
                    </label>
                    <input
                      type="text"
                      value={slideContent.tip1}
                      onChange={(e) =>
                        setSlideContent({
                          ...slideContent,
                          tip1: e.target.value,
                        })
                      }
                      placeholder="e.g., 'Start with a gentle cleanser'"
                      className="w-full p-4 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>

                  <div className="bg-purple-50 floating-card float3 p-6 rounded-2xl border-2 border-purple-200">
                    <label className="block text-lg font-bold text-gray-800 mb-2">
                      ✨ Tip Frame 2
                    </label>
                    <input
                      type="text"
                      value={slideContent.tip2}
                      onChange={(e) =>
                        setSlideContent({
                          ...slideContent,
                          tip2: e.target.value,
                        })
                      }
                      placeholder="e.g., 'Don't forget moisturizer!'"
                      className="w-full p-4 rounded-xl border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-lg"
                    />
                  </div>

                  <div className="bg-green-50 p-6 floating-card float4 rounded-2xl border-2 border-green-200">
                    <label className="block text-lg font-bold text-gray-800 mb-2">
                      🚀 Call to Action
                    </label>
                    <input
                      type="text"
                      value={slideContent.cta}
                      onChange={(e) =>
                        setSlideContent({
                          ...slideContent,
                          cta: e.target.value,
                        })
                      }
                      placeholder="e.g., 'Save this for your Sunday routine!'"
                      className="w-full p-4 rounded-xl border-2 border-green-300 focus:border-green-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-gray-700 transition-colors"
                >
                  ← Back
                </button>
              )}

              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && frames.filter((f) => f).length < 4) ||
                  (currentStep === 2 && (!selectedTheme || !selectedTone)) ||
                  (currentStep === 3 &&
                    (!slideContent.coverHook.trim() ||
                      !slideContent.tip1.trim() ||
                      !slideContent.tip2.trim() ||
                      !slideContent.cta.trim()))
                }
                className="ml-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                {currentStep === 3 ? "Get Results!" : "Next Step"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-4 md:p-10 shadow-2xl text-center border-4 border-dashed border-yellow-200 relative overflow-hidden">
            {/* 🎈 Floating cartoon buddy */}

            <div className="mb-8">
              <div
                className={`text-7xl mb-4 ${isPassed ? "animate-bounce" : "animate-pulse"
                  }`}
              >
                {isPassed ? "🎉" : "🔍"}
              </div>
              <motion.h2
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-2 drop-shadow-sm"
              >
                {isPassed ? "Woohoo! You Did It!" : "Oopsie! Try Again!"}
              </motion.h2>
              <p className="text-xl text-gray-700 font-medium">
                {isPassed
                  ? "You're a carousel champ! 🏆"
                  : "Give it another go, superstar! 🌟"}
              </p>
            </div>

            {/* ⭐ Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              {/* Card 1 */}
              <div className="bg-blue-100 p-6 rounded-xl shadow-inner border-2 border-blue-300">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  🛠️ Build-a-Carousel
                </h3>
                <p className="text-3xl font-black text-blue-600">
                  {scores.carouselBuild}/3
                </p>
                <div className="flex mt-2">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < scores.carouselBuild
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-purple-100 p-6 rounded-xl shadow-inner border-2 border-purple-300">
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  🎤 Matching the Mood
                </h3>
                <p className="text-3xl font-black text-purple-600">
                  {scores.toneMatch}/3
                </p>
                <div className="flex mt-2">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < scores.toneMatch
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-green-100 p-6 rounded-xl shadow-inner border-2 border-green-300">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  ✏️ Amazing Ideas
                </h3>
                <p className="text-3xl font-black text-green-600">
                  {scores.headings}/5
                </p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < scores.headings
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 🎯 Final Score */}
            <div
              className={`p-6 rounded-2xl border-4 text-center mb-10 ${isPassed
                ? "bg-gradient-to-r from-green-100 to-emerald-200 border-green-400"
                : "bg-gradient-to-r from-orange-100 to-yellow-200 border-orange-400"
                }`}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                🎯 Total Score
              </h3>
              <div
                className={`text-5xl font-extrabold ${isPassed ? "text-green-600" : "text-orange-600"
                  }`}
              >
                {totalScore}/11
              </div>
              <p className="text-lg mt-2 font-semibold text-gray-700">
                {isPassed
                  ? "✅ You Passed! Super Job!"
                  : "❌ You need 7+ to pass — You got this!"}
              </p>
            </div>

            {/* 🔄 Play Again Button */}
            <button
              onClick={resetGame}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white text-lg font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselCampaign;
