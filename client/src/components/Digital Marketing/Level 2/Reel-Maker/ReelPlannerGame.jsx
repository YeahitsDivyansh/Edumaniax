import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const musicOptions = [
  "🎆 Festive",
  "💥 Boom",
  "🎶 Sweet Melody",
  "🔥 Drum Beat",
];
const emotionOptions = ["🥳 Excitement", "😍 Love", "😂 Fun", "😲 Surprise"];

export default function ReelPlannerGame() {
  const { completeDMChallenge } = useDM();
  const [challengeCompleted, setChallengeCompleted] = useState(false);


  const [story, setStory] = useState(["", "", ""]);
  const [showExamples, setShowExamples] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState("");
  const [screenText, setScreenText] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());
  const validClick = () => {
    if (
      story.every((part) => part) &&
      selectedMusic &&
      screenText &&
      selectedEmotion
    ) {
      return true;
    }
    return false;
  };

  const canvasRef = useRef(null);

  const handleConfetti = () => {
    const myCanvas = canvasRef.current;
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      myConfetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      myConfetti({
        ...defaults,
        particleCount: 30,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 300);
    setTimeout(shoot, 500);
    setTimeout(shoot, 700);
  };

  const handleClick = () => {
    if (showPreview) {
      setShowPreview(false);
      return;
    }
    setLoading(true);

    // ✅ Mark challenge complete once
    if (!challengeCompleted) {
      completeDMChallenge(1, 1);
      setChallengeCompleted(true);
    }

    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
      handleConfetti();
    }, 2000);
  };

  const exampleStorylines = [
    [
      "Kids run to the door as fireworks light up the sky.",
      "They open a magical box of ChocoBoom.",
      "Chocolates burst out with sparkle and joy!",
    ],
    [
      "A grandmother gives a gift to her grandson.",
      "He opens it and finds ChocoBoom treats inside.",
      "They both dance as the screen flashes 'Sweetest Diwali!'",
    ],
  ];

  useEffect(() => {
    if (!showPreview || !previewRef || !previewRef?.current) {
      return;
    }

    previewRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [showPreview, previewRef]);

  useEffect(() => {
    if (!showPreview || !validClick() || challengeCompleted) return;

    const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "contentStrategist",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: Math.ceil(timeTakenSec / 60),
      completed: true,
      
    });
     setStartTime(Date.now());
  }, [showPreview]);


  return (
    <div className="w-[100%] p-5 min-h-screen ">
      <div
        className=" w-full h-full  overflow-auto rounded-2xl bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-10 px-4 flex flex-col items-center font-bold space-y-10"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <motion.h1
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="text-2xl sm:text-xl md:text-5xl text-purple-700 drop-shadow-md"
        >
          🎬 Reel Planner Game
        </motion.h1>

        {/* Storyline Inputs */}
        <div className="text-3xl p-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 text-white">
          Write your own storyline of the reel
        </div>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
          {["Part 1", "Part 2", "Part 3"].map((label, idx) => {
            const floatClass = `float${(idx % 4) + 1}`;
            return (
              <div
                key={idx}
                className={`bg-white floating-card ${floatClass} rounded-3xl p-6 shadow-xl border-4 border-purple-300`}
              >
                <h2 className="text-xl text-purple-600 mb-2">🎥 {label}</h2>
                <textarea
                  className="w-full h-32 p-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-800"
                  placeholder={`Describe ${label.toLowerCase()} of the reel...`}
                  value={story[idx]}
                  onChange={(e) => {
                    const updated = [...story];
                    updated[idx] = e.target.value;
                    setStory(updated);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Example Button */}
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-3 rounded-full text-lg hover:scale-105 transition duration-300 shadow-lg"
        >
          {showExamples ? "Hide" : "See"} Example Storylines ✨
        </button>

        {/* Example Storylines */}
        {showExamples && (
          <div className="grid gap-4 max-w-4xl w-full">
            {exampleStorylines.map((lines, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border-l-8 border-purple-300 shadow-md"
              >
                <div className="text-xl">Example {i + 1}</div>
                {lines.map((line, idx) => (
                  <p key={idx} className="text-purple-700 text-xl mb-1">
                    👉 {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Music Selection */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl text-purple-700 mb-4">
            🎶 Choose a Music Vibe
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {musicOptions.map((music, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <button
                  key={music}
                  onClick={() => setSelectedMusic(music)}
                  className={`p-4 floating-card ${floatClass} rounded-2xl text-xl font-semibold transition-all duration-300 shadow-md ${selectedMusic === music
                    ? "bg-purple-500 text-white scale-105"
                    : "bg-white text-purple-700 hover:bg-yellow-100"
                    }`}
                >
                  {music}
                </button>
              );
            })}
          </div>
        </div>

        {/* Screen Text Input */}
        <div className="w-full max-w-xl text-center">
          <h2 className="text-2xl text-purple-700 mb-2">📢 Text on Screen</h2>
          <input
            type="text"
            value={screenText}
            onChange={(e) => setScreenText(e.target.value)}
            placeholder="E.g. 🎉 Celebrate with ChocoBoom!"
            className="w-full p-4 rounded-xl text-center border-2 border-purple-300 text-lg focus:ring-4 focus:ring-pink-200"
          />
        </div>

        {/* Emotion Selection */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl text-purple-700 mb-4 ">
            🤩 What Emotion Will It Create?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emotionOptions.map((emo, index) => {
              const floatClass = `float${(index % 4) + 1}`;
              return (
                <button
                  key={emo}
                  onClick={() => setSelectedEmotion(emo)}
                  className={`p-4 wiggleEmoji rounded-2xl   text-xl font-semibold transition-all duration-300 shadow-md ${selectedEmotion === emo
                    ? "bg-green-400 text-white scale-105"
                    : "bg-white text-purple-700 hover:bg-green-100"
                    }`}
                >
                  {emo}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <button
            disabled={!validClick()}
            onClick={handleClick}
            className={`${validClick() ? "cursor-pointer" : "cursor-not-allowed"
              } p-4 bg-purple-500 hover:rotate-2 transition-all duration-150 rounded-2xl text-white text-xl `}
          >
            {` ${showPreview ? "Close Preview" : "Preview Your Reel Plan"}`}
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center mt-6 text-base md:text-lg font-bold text-purple-800">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-pink-300 border-yellow-300 rounded-full animate-spin"></div>
            <div className="mt-4">Loading...</div>
          </div>
        )}

        {showPreview && (
          <div
            ref={previewRef}
            className="mt-12 w-full max-w-4xl relative bg-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-yellow-400 space-y-6 text-center"
          >
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />

            <h2 className="text-md md:text-xl lg:text-3xl text-purple-700 mb-6 font-extrabold tracking-wide">
              🎉 Preview Your Reel Plan
            </h2>

            <div className="space-y-4 text-purple-800 text-lg">
              <div className="text-2xl font-extrabold text-purple-600">
                🎬 Storyline:
              </div>
              <div className="text-left space-y-2">
                {story.map((line, i) => (
                  <p
                    key={i}
                    className="break-words whitespace-pre-wrap bg-white rounded-xl px-4 py-2 shadow-md border-l-4 border-purple-400"
                  >
                    Part {i + 1}: {line}
                  </p>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-pink-300">
                  <div className="text-xl font-bold">🎵 Music:</div>
                  <div className="font-semibold animate-pulse">
                    {selectedMusic}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-green-300">
                  <div className="text-xl font-bold">📢 Screen Text:</div>
                  <p className="break-words whitespace-pre-wrap font-semibold animate-pulse">
                    {screenText}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-300">
                  <div className="text-xl font-bold">🤩 Emotion:</div>
                  <div className="font-semibold animate-bounce text-xl">
                    <span>{selectedEmotion}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
