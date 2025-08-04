import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Zap,
  Target,
  Edit3,
  CheckCircle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const CaptionClinicGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("intro");
  const [highlightedParts, setHighlightedParts] = useState([]);
  const [newCaption, setNewCaption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const originalCaption =
    "Buy our new energy drink now. It's very good for concentration.";

  const weakParts = [
    {
      id: "hook",
      text: "Buy our new energy drink now",
      type: "Bland Hook",
      color: "bg-red-200 hover:bg-red-300",
    },
    {
      id: "benefit",
      text: "It's very good for concentration",
      type: "Vague Benefit",
      color: "bg-yellow-200 hover:bg-yellow-300",
    },
    {
      id: "cta",
      text: "now",
      type: "Weak CTA",
      color: "bg-orange-200 hover:bg-orange-300",
    },
  ];

  const toggleHighlight = (partId) => {
    setHighlightedParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId]
    );
  };

  const analyzeCaption = (caption) => {
    const improvements = [];
    let score = 0;

    // Check for engaging hook
    const hasQuestion = caption.includes("?");
    const hasEmotionalWord =
      /tired|yawning|sleepy|exhausted|drained|sluggish/i.test(caption);
    const hasExcitement = /wow|amazing|incredible|awesome|fantastic/i.test(
      caption
    );

    if (hasQuestion || hasEmotionalWord || hasExcitement) {
      improvements.push("hook");
      score++;
    }

    // Check for specific benefit
    const hasSpecificBenefit =
      /focus|brain|concentration|energy|alert|sharp|memory|study/i.test(
        caption
      );
    const hasBFF = /bff|friend|buddy|pal/i.test(caption);

    if (hasSpecificBenefit || hasBFF) {
      improvements.push("benefit");
      score++;
    }

    // Check for strong CTA
    const hasActionCTA = /tap|click|try|grab|get|discover|unlock/i.test(
      caption
    );
    const hasFreeOffer = /free|trial/i.test(caption);

    if (hasActionCTA || hasFreeOffer) {
      improvements.push("cta");
      score++;
    }

    return { improvements, score };
  };

  const handleSubmit = () => {
    if (highlightedParts?.length === 0) {
      toast.error("Find the weak parts first");
      return;
    }

    if (!newCaption.trim()) {
      toast.error("Write the caption");
      return;
    }

    const analysis = analyzeCaption(newCaption);
    const highlightScore = highlightedParts.length;
    const totalScore = Math.min(
      analysis.score + Math.min(highlightScore, 1),
      3
    );

    let feedbackMessage = "";
    let starCount = 0;

    if (totalScore === 3) {
      feedbackMessage = "🔥 That's how you stop the scroll! Amazing work!";
      starCount = 5;
      setCelebrationMode(true);
      setTimeout(() => setCelebrationMode(false), 2000);

      completeDMChallenge(1, 0); // 👈 Add this here
    } else if (totalScore === 2) {
      feedbackMessage =
        "You're on the right track! Try being more specific and punchy.";
      starCount = 3;
    } else {
      feedbackMessage =
        "Think: What would *you* want to hear if you were tired during class?";
      starCount = 1;
    }

    const timeTakenSec = Math.round((Date.now() - startTime) / 1000);
    const scaledScore = (starCount / 5) * 10; // out of 10

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "creativity",
      score: scaledScore,
      accuracy: (totalScore / 3) * 100, // percentage based on 3-point system
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: Math.round(timeTakenSec / 60),
      completed: totalScore === 3,

    });
    setStartTime(Date.now());
    setFeedback(feedbackMessage);
    setStars(starCount);
    setShowResults(true);
  };

  const resetGame = () => {
    setHighlightedParts([]);
    setNewCaption("");
    setFeedback("");
    setStars(0);
    setShowResults(false);
    setCurrentPage("game");
    setStartTime(Date.now());
  };

  const canvasRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (!resultRef.current || !showResults) {
      return;
    }

    if (!celebrationMode) {
      return;
    }

    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      // Center burst
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });

      // Left side burst
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.8 },
        colors,
      });

      // Right side burst
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.8 },
        colors,
      });

      // Only run once, not continuously
      if (Date.now() < end - 2500) {
        setTimeout(frame, 150);
      }
    };

    frame();
  }, [showResults, resultRef, celebrationMode]);

  useEffect(() => {
    setTimeout(() => {
      if (!resultRef.current || !showResults) {
        return;
      }
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [resultRef.current, showResults]);

  const renderIntroPage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Caption Clinic
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Make It Clickworthy! 🎯
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Mission:
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <Target className="text-red-500" size={20} />
              <span className="text-gray-700">
                Find the weak parts in FocusFuel's caption
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Edit3 className="text-blue-500" size={20} />
              <span className="text-gray-700">
                Rewrite it to be more engaging
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="text-yellow-500" size={20} />
              <span className="text-gray-700">
                Make it clickworthy for kids!
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage("game")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
        >
          <span>Start the Challenge</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderGamePage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto relative">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              Caption Clinic
            </h1>
            <p className="text-gray-600">
              Help FocusFuel write a better caption!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Original Caption Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Target className="text-red-500" />
                  <span>Original Caption (Find the weak parts!)</span>
                </h2>

                <div className="text-lg leading-relaxed">
                  <span
                    className={`px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 ${highlightedParts.includes("hook")
                      ? "bg-red-300"
                      : "hover:bg-red-100"
                      }`}
                    onClick={() => toggleHighlight("hook")}
                  >
                    Buy our new energy drink now
                  </span>
                  <span>. </span>
                  <span
                    className={`px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 ${highlightedParts.includes("benefit")
                      ? "bg-yellow-300"
                      : "hover:bg-yellow-100"
                      }`}
                    onClick={() => toggleHighlight("benefit")}
                  >
                    It's very good for concentration
                  </span>
                  <span>.</span>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  💡 Click on parts that seem weak or boring!
                </div>
              </div>

              {/* Highlighted Parts Display */}
              {highlightedParts.length > 0 && (
                <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">
                    You found these weak parts:
                  </h3>
                  <div className="space-y-2">
                    {highlightedParts.map((partId) => {
                      const part = weakParts.find((p) => p.id === partId);
                      return (
                        <div
                          key={partId}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="text-green-500" size={16} />
                          <span className="text-sm text-gray-700">
                            {part.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Rewrite Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Edit3 className="text-green-500" />
                  <span>Your Improved Caption</span>
                </h2>

                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Rewrite the caption to make it more engaging! Think: What would grab YOUR attention?"
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none text-lg resize-none"
                />

                <div className="mt-4 bg-yellow-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 font-semibold mb-2">
                    💡 Tips for a great caption:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Start with a question or relatable problem</li>
                    <li>• Be specific about the benefit</li>
                    <li>• Add a clear call-to-action</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-2xl text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Zap size={24} />
                <span>Check My Caption!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div
            ref={resultRef}
            className={`bg-white rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all duration-500 ${celebrationMode ? "animate-bounce" : ""
              }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 mx-1 ${i < stars
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                      } transition-all duration-300`}
                  />
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                <p className="text-xl font-semibold text-gray-800">
                  {feedback}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={20} />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={() => setCurrentPage("example")}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  See Example
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );

  const renderExamplePage = () => (
    <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
            Perfect Example! ✨
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              ❌ Original (Boring)
            </h2>
            <p className="text-lg text-gray-700 italic">
              "Buy our new energy drink now. It's very good for concentration."
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              ✅ Improved (Engaging!)
            </h2>
            <p className="text-lg text-gray-700 font-semibold">
              "Always yawning in math class? Try FocusFuel — your brain's new
              BFF. Tap to grab your free trial!"
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">
            Why This Works:
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Great Hook: "Always yawning in math class?"
                </p>
                <p className="text-gray-600">
                  Asks a relatable question that grabs attention
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-400 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Specific Benefit: "your brain's new BFF"
                </p>
                <p className="text-gray-600">
                  Fun, memorable way to describe the benefit
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Strong CTA: "Tap to grab your free trial!"
                </p>
                <p className="text-gray-600">
                  Clear action with an attractive offer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Try Another Caption
          </button>

          <button
            onClick={() => setCurrentPage("intro")}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Back to Start
          </button>
        </div>
      </div>
    </div>
  );

  switch (currentPage) {
    case "intro":
      return renderIntroPage();
    case "game":
      return renderGamePage();
    case "example":
      return renderExamplePage();
    default:
      return renderIntroPage();
  }
};

export default CaptionClinicGame;
