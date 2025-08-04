import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    question: "You're stressed about exams.",
    gif: "https://media.tenor.com/L6rsnQOVdsoAAAA1/omori-stress.webp",
    options: ["Friend", "Mentor", "Parent", "Subject teacher"],
    correct: ["Mentor", "Subject teacher"],
  },
  {
    question: "You're in a conflict with your best friend.",
    gif: "https://media.tenor.com/0K2qdKbKMgIAAAAm/stop-fighting.webp",
    options: ["School counselor", "Another friend", "Trusted peer", "Sibling"],
    correct: ["School counselor", "Trusted peer"],
  },
  {
    question: "You've been feeling anxious for days.",
    gif: "https://media.tenor.com/BdOPn7l0H0wAAAA1/anxiety-scared.webp",
    options: ["Friend", "Mental health helpline", "Mentor", "Counselor"],
    correct: ["Mental health helpline", "Counselor"],
  },
  {
    question: "You're struggling to understand a topic.",
    gif: "https://media.tenor.com/g-c3yZSdfKcAAAA1/what-cant-understand.webp",
    options: ["Subject teacher", "Mentor", "Study buddy", "Sibling"],
    correct: ["Study buddy", "Subject teacher"],
  },
  {
    question: "You're feeling isolated or low.",
    gif: "https://media.tenor.com/Hu4yiRriRJgAAAA1/disappointed-om-nom.webp",
    options: ["Helpline", "Friend", "Counselor", "Mentor"],
    correct: ["Counselor", "Helpline"],
  },
  {
    question: "You're unsure how to apply for scholarships.",
    gif: "https://media.tenor.com/a0XEkI0YMPIAAAA1/kid-awkward.webp",
    options: ["School admin", "Teacher", "Friend", "Career counselor"],
    correct: ["Career counselor", "Teacher"],
  },
];

const HelpNetworkBuilder = () => {
  const { completeSELChallenge } = useSEL();
  const [stage, setStage] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleSelect = (opt) => {
    if (answers[current] != null) return;
    const isCorrect = scenarios[current].correct.includes(opt);
    setAnswers({ ...answers, [current]: opt });
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(score + 1);
  };

  const nextQuestion = () => {
    setFeedback(null);

    if (current < scenarios.length - 1) {
      setCurrent(current + 1);
    } else {
      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);
      const accuracy = Math.round((score / scenarios.length) * 100);
      const avgResponseTimeSec = durationSec / scenarios.length;
      const roundedScore = Math.round((score / scenarios.length) * 10);

      if (score >= 5) {
        completeSELChallenge(2, 1);
        confetti({ spread: 120, particleCount: 180, origin: { y: 0.6 } });
      }

      updatePerformance({
        moduleName: "SEL",
        topicName: "peerSupportNetworks",
        score: roundedScore,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: score >= 5,

      });
      setStartTime(Date.now());

      setStage("result");
    }
  };


  const playAgain = () => {
    setStage("intro");
    setCurrent(0);
    setAnswers({});
    setScore(0);
    setFeedback(null);
    setStartTime(Date.now());

  };

  // Final-screen GIF based on score
  const finalGif =
    score >= 5
      ? "https://media.tenor.com/Ot91v2KkrNQAAAAm/its-a-good-job-jeeveshu-ahluwalia.webp"
      : score === 4
        ? "https://media.tenor.com/sIzMTGPxIeMAAAA1/well-done.webp"
        : score === 3
          ? "https://media.tenor.com/7SMAiWi_FD4AAAA1/i-mean-its-alright.webp"
          : "https://media.tenor.com/QnpesWUmGgwAAAA1/mem622x.webp";

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto text-center">
      {stage === "intro" && (
        <>
          <h1 className="text-3xl font-bold">Who Can Help?</h1>
          <img
            src="https://media.tenor.com/y_dZ6krDn2gAAAAm/hey-there-blue.webp"
            alt="Intro GIF"
            className="mx-auto rounded-lg"
          />
          <p className="mt-4">
            Different problems need different types of support. Choose the best
            person or resource for each situation. You need at least 5 out of 6
            correct to win. Good luck!
          </p>
          <Button onClick={() => setStage("play")}>Play Game ▶️</Button>
        </>
      )}

      {stage === "play" && (
        <>
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <img
              src={scenarios[current].gif}
              alt="scenario GIF"
              className="mx-auto rounded"
            />
            <h2 className="text-xl font-semibold">
              {scenarios[current].question}
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {scenarios[current].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`px-4 py-2 rounded border ${answers[current] === opt
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback === "correct" && (
              <img
                src="https://media.tenor.com/p1CmWGxF9-wAAAAm/i-knew-happily.webp"
                alt="correct"
                className="mx-auto mt-4 rounded-lg"
              />
            )}
            {feedback === "wrong" && (
              <img
                src="https://media.tenor.com/5foTh9bZZmMAAAA1/as-expected-tum-se-yehi-umeed-thi-boman-irani.webp"
                alt="wrong"
                className="mx-auto mt-4 rounded-lg"
              />
            )}
            {feedback && (
              <Button className="mt-4" onClick={nextQuestion}>
                {current < scenarios.length - 1 ? "Next ▶️" : "See Results"}
              </Button>
            )}
          </div>
        </>
      )}

      {stage === "result" && (
        <>
          <img
            src={finalGif}
            alt="final feedback"
            className="mx-auto rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-4">
            You scored {score} / {scenarios.length}
          </h2>
          <Button className="mt-4" onClick={playAgain}>
            🔁 Play Again
          </Button>
          <Link to="/influence-journal">
            <Button variant="outline" className="ml-4">
              ➡️ Next Game
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HelpNetworkBuilder;
