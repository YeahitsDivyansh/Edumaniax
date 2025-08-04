import React, { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  {
    text: "You forgot your lunch.",
    emojis: ["😠", "😔", "😋", "🤔"],
    correct: ["😔", "😋"],
    gif: "https://media.tenor.com/B77_DRU-GhgAAAAM/monsters-inc-where-is-my-lunch.gif",
  },
  {
    text: "You got picked last for a team.",
    emojis: ["😊", "😞", "😡", "😶"],
    correct: ["😞"],
    gif: "https://media.tenor.com/Db3yx5C9NzEAAAAM/draft-rob-gronkowski.gif",
  },
  {
    text: "Your friend gives you a kind note.",
    emojis: ["😊", "😠", "😳", "😐"],
    correct: ["😊"],
    gif: "https://media.tenor.com/rvVM6O_04lgAAAAm/good-friend-jared-dines.webp",
  },
  {
    text: "You answer correctly in class.",
    emojis: ["😃", "😬", "😞", "😴"],
    correct: ["😃"],
    gif: "https://media.tenor.com/kL5bKx9lFt8AAAAM/thats-right-martin-scorsese.gif",
  },
  {
    text: "Someone laughs when you trip.",
    emojis: ["😡", "😳", "😂", "😢"],
    correct: ["😳", "😢"],
    gif: "https://media.tenor.com/5cvp497SzakAAAAM/lol-fake-smile.gif",
  },
];

const MoodMirror = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [feedbackGif, setFeedbackGif] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);
      const scaledScore = Math.round((score / scenarios.length) * 10);
      const accuracy = (score / scenarios.length) * 100;
      const avgResponseTimeSec = totalSeconds / scenarios.length;

      updatePerformance({
        moduleName: "SEL",
        topicName: "selfAwareness",
        score: scaledScore,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 4,

      });
      setStartTime(Date.now());

      if (score >= 4) {
        completeSELChallenge(0, 0);
      }
    }
  }, [showResult]);


  const handleDrop = (emoji) => {
    if (selected) return;
    setSelected(emoji);
    const isCorrect = scenarios[current].correct.includes(emoji);
    if (isCorrect) {
      setScore(score + 1);
      setFeedbackGif(
        "https://media.tenor.com/9CArIutRIUQAAAAm/thats-the-correct-answer-kenny-sebastian.webp"
      );
    } else {
      setFeedbackGif(
        "https://media.tenor.com/2Mrtn8RQfkUAAAAm/that-is-a-wrong-answer-rich-benoit.webp"
      );
    }

    setTimeout(() => {
      if (current + 1 < scenarios.length) {
        setCurrent(current + 1);
        setSelected(null);
        setFeedbackGif(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFeedbackGif(null);
    setStartTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Mood Mirror – Spot That Feeling!
      </h1>
      <p className="text-center max-w-xl text-md md:text-lg mb-4">
        You’ll go through 5 moments from a regular school day. For each, choose
        the emoji that best shows how you might feel. Let’s see how well you
        know your emotions!
      </p>

      {showResult ? (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            You matched {score} out of 5 emotions correctly!
          </h2>
          {score >= 4 ? (
            <p className="text-green-600 font-bold text-lg">Great job! 🎉</p>
          ) : (
            <p className="text-yellow-700 text-lg">
              Nice try! Give it another go!
            </p>
          )}
          <Button className="mt-4" onClick={resetGame}>
            Play Again
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-xl text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            {scenarios[current].text}
          </h3>
          <img
            src={scenarios[current].gif}
            alt="scenario gif"
            className="mx-auto rounded-xl mb-4 w-full max-h-72 object-contain"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {scenarios[current].emojis.map((emoji, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDrop(emoji)}
                className={`text-4xl md:text-5xl p-4 rounded-full border-2 transition cursor-pointer ${selected === emoji &&
                  scenarios[current].correct.includes(emoji)
                  ? "border-green-500"
                  : selected === emoji
                    ? "border-red-500"
                    : "border-transparent hover:border-blue-300"
                  }`}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
          {feedbackGif && (
            <img
              src={feedbackGif}
              alt="feedback gif"
              className="mx-auto mt-6 rounded-xl w-full max-h-64 object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MoodMirror;
