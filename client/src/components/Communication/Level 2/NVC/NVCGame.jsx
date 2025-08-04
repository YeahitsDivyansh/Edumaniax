import React, { useState, useEffect } from "react";
import { Star, Award, RefreshCw, Volume2, CheckCircle } from "lucide-react";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const NVCGame = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [gameState, setGameState] = useState("scenario");
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState([]);
  const [nveSentence, setNvcSentence] = useState({
    feeling: "",
    action: "",
    reason: "",
    solution: "",
  });
  const [showCelebration, setShowCelebration] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const [responseTimes, setResponseTimes] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());


  const scenario = {
    text: "Your friend grabbed the sketch pen while you were using it.",
    emoji: "✏️",
    choices: [
      {
        id: "A",
        text: "What's wrong with you?! I was using that!",
        correct: false,
        color: "bg-red-400",
      },
      {
        id: "B",
        text: "I feel upset when you grab the pen without asking. Can we take turns?",
        correct: true,
        color: "bg-green-400",
      },
    ],
  };

  const emotions = [
    { text: "angry", emoji: "😠", color: "bg-red-300" },
    { text: "sad", emoji: "😢", color: "bg-blue-300" },
    { text: "annoyed", emoji: "😤", color: "bg-orange-300" },
    { text: "upset", emoji: "😔", color: "bg-purple-300" },
    { text: "frustrated", emoji: "😫", color: "bg-yellow-300" },
  ];

  const actions = [
    "take without asking",
    "grab things from me",
    "interrupt what I'm doing",
    "don't wait for your turn",
  ];

  const reasons = [
    "it feels unfair",
    "I was using it first",
    "it makes me feel bad",
    "I need to finish my work",
  ];

  const solutions = [
    "share better next time",
    "ask before taking things",
    "take turns nicely",
    "talk about it first",
  ];

  const handleChoiceSelect = (choice) => {
    const responseTime = (Date.now() - questionStartTime) / 1000; // in seconds
    setResponseTimes((prev) => [...prev, responseTime]);

    setSelectedChoice(choice);
    setTimeout(() => {
      if (choice.correct) {
        setScore(score + 10);
        setGameState("builder");
      } else {
        setTimeout(() => {
          setSelectedChoice(null);
          setQuestionStartTime(Date.now()); // reset timer for retry
        }, 1500);
      }
    }, 1000);
  };


  const handleNvcSelect = (category, value) => {
    setNvcSentence((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const isNvcComplete = () => {
    return (
      nveSentence.feeling &&
      nveSentence.action &&
      nveSentence.reason &&
      nveSentence.solution
    );
  };

  const handleComplete = () => {
    if (isNvcComplete()) {
      const finalScore = score + 20; // last bonus
      setScore(finalScore);
      setBadges([...badges, "☮️"]);
      setGameState("result");
      completeCommunicationChallenge(1, 0);
      setShowCelebration(true);



      const endTime = Date.now();
      const durationSec = (endTime - startTime) / 1000;

      // Score already scaled out of 10
      const scaledScore = Math.min(Math.round(finalScore / 10), 10);

      // Accuracy: each 10 points = 1 correct answer
      const totalQs = 5; // or however many questions you have
      const correct = finalScore / 10;
      const accuracy = Math.min(Math.round((correct / totalQs) * 100), 100);
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
        avgResponseTimeSec, // ✅ added!
        completed: true,

      };



      updatePerformance(payload);
      setStartTime(Date.now());
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };



  const resetGame = () => {
    setGameState("scenario");
    setSelectedChoice(null);
    setStartTime(Date.now());
    setNvcSentence({ feeling: "", action: "", reason: "", solution: "" });
  };

  const speakSentence = () => {
    const sentence = `I feel ${nveSentence.feeling} when you ${nveSentence.action} because ${nveSentence.reason}. Can we ${nveSentence.solution}?`;
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 border-4 border-yellow-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🎮</div>
              <div>
                <h1 className="text-3xl font-bold text-purple-800">
                  Fix the Fight!
                </h1>
                <p className="text-lg text-purple-600">
                  Learn to communicate kindly
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <Star className="text-yellow-600" size={20} />
                <span className="font-bold text-yellow-800">{score}</span>
              </div>
              <div className="flex space-x-1">
                {badges.map((badge, index) => (
                  <div key={index} className="text-2xl animate-bounce">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Scenario Phase */}
        {gameState === "scenario" && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border-4 border-blue-300 mb-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{scenario.emoji}</div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Here's what happened:
              </h2>
              <p className="text-xl text-gray-700 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                {scenario.text}
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  setQuestionStartTime(Date.now());
                  setGameState("choice");
                }}
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                What should you do? 🤔
              </button>
            </div>
          </div>
        )}

        {/* Choice Phase */}
        {gameState === "choice" && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border-4 border-green-300">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
              Choose your response:
            </h2>
            <div className="space-y-4">
              {scenario.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  disabled={selectedChoice !== null}
                  className={`w-full p-6 rounded-2xl text-left text-lg font-medium transition-all duration-300 transform hover:scale-102 ${selectedChoice?.id === choice.id
                    ? choice.correct
                      ? "bg-green-400 text-white ring-4 ring-green-300"
                      : "bg-red-400 text-white ring-4 ring-red-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } ${selectedChoice !== null
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                    }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-700">
                      {choice.id}
                    </div>
                    <div>{choice.text}</div>
                    {selectedChoice?.id === choice.id && choice.correct && (
                      <CheckCircle className="text-white ml-auto" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
            {selectedChoice && !selectedChoice.correct && (
              <div className="mt-4 p-4 bg-red-100 rounded-2xl border-2 border-red-200 text-center">
                <p className="text-red-700 font-medium">
                  Try again! Think about how to be kind and clear. 💝
                </p>
              </div>
            )}
          </div>
        )}

        {/* NVC Builder Phase */}
        {gameState === "builder" && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border-4 border-purple-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                Build Your Kind Message! 🏗️
              </h2>
              <p className="text-lg text-purple-600">
                Fill in each part to create a caring response
              </p>
            </div>

            <div className="space-y-6">
              {/* Feeling Section */}
              <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-700 mb-4">
                  😊 I feel...
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.text}
                      onClick={() => handleNvcSelect("feeling", emotion.text)}
                      className={`p-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${nveSentence.feeling === emotion.text
                        ? "ring-4 ring-red-400 bg-red-300 text-white"
                        : `${emotion.color} hover:opacity-80 text-gray-700`
                        }`}
                    >
                      <div className="text-2xl mb-1">{emotion.emoji}</div>
                      <div className="text-sm">{emotion.text}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  👆 When you...
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {actions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleNvcSelect("action", action)}
                      className={`p-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${nveSentence.action === action
                        ? "ring-4 ring-blue-400 bg-blue-300 text-white"
                        : "bg-blue-200 hover:bg-blue-300 text-gray-700"
                        }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason Section */}
              <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-700 mb-4">
                  💭 Because...
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {reasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => handleNvcSelect("reason", reason)}
                      className={`p-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${nveSentence.reason === reason
                        ? "ring-4 ring-yellow-400 bg-yellow-300 text-white"
                        : "bg-yellow-200 hover:bg-yellow-300 text-gray-700"
                        }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              {/* Solution Section */}
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  🤝 Can we...
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {solutions.map((solution) => (
                    <button
                      key={solution}
                      onClick={() => handleNvcSelect("solution", solution)}
                      className={`p-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${nveSentence.solution === solution
                        ? "ring-4 ring-green-400 bg-green-300 text-white"
                        : "bg-green-200 hover:bg-green-300 text-gray-700"
                        }`}
                    >
                      {solution}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {isNvcComplete() && (
              <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
                  ✨ Your Kind Message:
                </h3>
                <div className="bg-white rounded-xl p-4 text-lg text-gray-700 mb-4 border-2 border-purple-200">
                  "I feel{" "}
                  <span className="font-bold text-red-600">
                    {nveSentence.feeling}
                  </span>{" "}
                  when you{" "}
                  <span className="font-bold text-blue-600">
                    {nveSentence.action}
                  </span>{" "}
                  because{" "}
                  <span className="font-bold text-yellow-600">
                    {nveSentence.reason}
                  </span>
                  . Can we{" "}
                  <span className="font-bold text-green-600">
                    {nveSentence.solution}
                  </span>
                  ?"
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={speakSentence}
                    className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-200"
                  >
                    <Volume2 size={20} />
                    <span>Listen</span>
                  </button>
                  <button
                    onClick={handleComplete}
                    className="bg-rainbow bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Complete! 🎉
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result Phase */}
        {gameState === "result" && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border-4 border-rainbow border-gradient-to-r from-pink-300 to-purple-300 relative overflow-hidden">
            {showCelebration && (
              <div className="absolute inset-0 flex items-center justify-center text-6xl animate-pulse z-10">
                🎉✨🎊🌟🎈
              </div>
            )}
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                Amazing Job!
              </h2>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-yellow-300">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Award className="text-yellow-600" size={32} />
                  <span className="text-2xl font-bold text-yellow-800">
                    Peace Maker Badge Earned!
                  </span>
                  <span className="text-3xl">☮️</span>
                </div>
                <p className="text-lg text-yellow-700">
                  You learned how to solve conflicts with kindness!
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-700 mb-3">
                  Your Perfect Kind Message:
                </h3>
                <div className="bg-white rounded-xl p-4 text-lg text-gray-700 border-2 border-purple-100">
                  "I feel{" "}
                  <span className="font-bold text-red-600">
                    {nveSentence.feeling}
                  </span>{" "}
                  when you{" "}
                  <span className="font-bold text-blue-600">
                    {nveSentence.action}
                  </span>{" "}
                  because{" "}
                  <span className="font-bold text-yellow-600">
                    {nveSentence.reason}
                  </span>
                  . Can we{" "}
                  <span className="font-bold text-green-600">
                    {nveSentence.solution}
                  </span>
                  ?"
                </div>
              </div>

              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2 mx-auto"
              >
                <RefreshCw size={24} />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NVCGame;
