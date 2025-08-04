import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  {
    id: 1,
    title: "The Lunch Table Drama",
    message: "Why did you ignore me today at lunch?",
    options: [
      { text: "Ugh! You’re overreacting.", isCorrect: false },
      {
        text: "Sorry, I just wanted to sit with everyone. Let’s talk at break?",
        isCorrect: true,
      },
      { text: "Whatever. Sit with someone else.", isCorrect: false },
    ],
  },
  {
    id: 2,
    title: "The Forgotten Invite",
    message: "*Visual: Sad classmate sitting alone, birthday hat on desk*",
    options: [
      { text: "Pretend you didn’t notice.", isCorrect: false },
      {
        text: "I’m really sorry. I forgot, and it wasn’t on purpose. Can I make it up to you?",
        isCorrect: true,
      },
      { text: "You didn’t miss much anyway.", isCorrect: false },
    ],
  },
  {
    id: 3,
    title: "The Drawing Disaster",
    message: "*Visual: Spilled water on artwork*",
    options: [
      { text: "Shout and crumple their paper.", isCorrect: false },
      {
        text: "I worked hard on that... but I know it was a mistake.",
        isCorrect: true,
      },
      { text: "Ignore them all day.", isCorrect: false },
    ],
  },
  {
    id: 4,
    title: "The Tug-of-War Friends",
    message: "*Visual: Two friends arguing, looking at you*",
    options: [
      { text: "Pick one friend just to end the drama.", isCorrect: false },
      {
        text: "I care about both of you. I don’t want to take sides.",
        isCorrect: true,
      },
      {
        text: "Lie to the teacher and say one bullied the other.",
        isCorrect: false,
      },
    ],
  },
];

const FriendshipFixer = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [feedbackGif, setFeedbackGif] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);
      const accuracy = (score / scenarios.length) * 100;
      const avgResponseTimeSec = durationSec / scenarios.length;

      updatePerformance({
        moduleName: "SEL",
        topicName: "selfAwareness",
        score: Math.round(score * 2.5), // out of 10
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: score >= 3,

      });
      setStartTime(Date.now());

      if (score >= 3) {
        completeSELChallenge(0, 1);
      }
    }
  }, [showResult]);


  const handleOptionClick = (option) => {
    if (selected !== null) return;
    setSelected(option);
    if (option.isCorrect) {
      setScore(score + 1);
      setFeedbackGif(
        "https://media.tenor.com/GM3WMvmBN7cAAAAM/terrific-elijah-wood.gif"
      );
      setFeedbackText("Great choice! That was a kind and wise response. 🌟");
    } else {
      setFeedbackGif(
        "https://media.tenor.com/pnceOM-fM3MAAAAm/so-bad-breez-kennedy.webp"
      );
      setFeedbackText(
        "Oops! That wasn't the best response. Let’s learn and do better. 🤔"
      );
    }
    setTimeout(() => {
      setFeedbackGif(null);
      setFeedbackText("");
      if (current + 1 < scenarios.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 4300);
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFeedbackGif(null);
    setFeedbackText("");
    setStartTime(Date.now());

  };

  const getOptionStyle = (option) => {
    if (!selected) return "bg-white hover:bg-gray-50";
    if (option === selected && option.isCorrect)
      return "bg-green-100 border-green-500";
    if (option === selected && !option.isCorrect)
      return "bg-red-100 border-red-500";
    return "bg-gray-100 opacity-60";
  };

  const getFinalGif = () => {
    if (score >= 3)
      return "https://media.tenor.com/Q298C2O1MBUAAAAM/you-did-a-great-job-leah.gif";
    if (score === 2)
      return "https://media.tenor.com/QBpZRohLJhEAAAAM/chernobyl-not-great.gif";
    return "https://media.tenor.com/cZBy5V95-ScAAAAm/you-have-to-work-really-hard-sam-johnson.webp";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-[#ece5dd] p-4 rounded-xl w-full max-w-2xl shadow-xl border border-[#c1b9af]">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 text-green-900">
          Friendship Fixer: Handle It Like a Hero!
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Choose your response wisely to handle friend situations like a hero!
        </p>

        {showResult ? (
          <div className="text-center bg-white p-6 rounded-xl">
            <img
              src={getFinalGif()}
              alt="Result gif"
              className="mx-auto w-64 rounded-xl"
            />
            <h2 className="text-2xl font-semibold mt-4 mb-2">
              You handled {score} out of 4 situations wisely!
            </h2>
            {score >= 3 ? (
              <p className="text-green-600 font-medium text-lg">
                You're a true friend! 🤝
              </p>
            ) : score === 2 ? (
              <p className="text-yellow-700 text-lg">
                You're getting there! Keep practicing kindness. ✨
              </p>
            ) : (
              <p className="text-red-600 text-lg">
                You’ve got room to grow — try again and be mindful. 💡
              </p>
            )}
            <Button className="mt-4" onClick={restartGame}>
              Play Again
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white text-sm md:text-base rounded-xl p-3 w-fit max-w-[80%] shadow-sm border border-gray-300">
              <h2 className="text-gray-600 font-semibold mb-1">
                {scenarios[current].title}
              </h2>
              <p className="text-gray-800 whitespace-pre-line">
                {scenarios[current].message}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {scenarios[current].options.map((option, idx) => (
                <motion.div
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  className={`self-end w-fit max-w-[80%] text-left px-4 py-2 border rounded-2xl text-md font-medium transition shadow-md ${getOptionStyle(
                    option
                  )}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </motion.div>
              ))}
            </div>

            {feedbackGif && (
              <div className="mt-4 text-center">
                <img
                  src={feedbackGif}
                  alt="Feedback gif"
                  className="mx-auto w-60 rounded-xl"
                />
                <p className="text-md font-semibold mt-2 text-gray-700">
                  {feedbackText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendshipFixer;
