import React, { useEffect, useState } from "react";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance


// Dilemmas with GIFs
const dilemmas = [
  {
    question: "You see a friend cheating in a test.",
    options: ["Join them", "Ignore it", "Tell a teacher", "Laugh"],
    correct: 2,
    gif: "https://media.tenor.com/8kdjdtzG_fUAAAA1/cheating-in-exams-neethaane-en-ponvasantham.webp",
  },
  {
    question: "You are given credit for a group project you didn’t do.",
    options: [
      "Accept the praise",
      "Stay silent",
      "Say it was the whole team’s work",
      "Take a reward",
    ],
    correct: 2,
    gif: "https://media.tenor.com/-mYyKipXNvkAAAA1/it-was-all-you-i-give-you-full-credit-abe-weissman.webp",
  },
  {
    question: "You find a lost wallet on the school playground.",
    options: [
      "Keep the money",
      "Throw it away",
      "Give it to a teacher",
      "Hide it",
    ],
    correct: 2,
    gif: "https://media.tenor.com/w0yjJaV1R68AAAA1/wheres-my-wallet-wheres-my-wallet-terry-crews.webp",
  },
];

// Quizzes with GIFs
const quizzes = [
  {
    question: "Integrity means…",
    options: [
      "Winning always",
      "Doing the right thing",
      "Following your friends",
      "Being silent",
    ],
    correct: 1,
    gif: "https://media.tenor.com/scvH9MjF7iMAAAA1/technip-fmc-take5day.webp",
  },
  {
    question: "Which is an example of honesty?",
    options: [
      "Lying to get out of trouble",
      "Blaming others for mistakes",
      "Admitting when you did something wrong",
      "Hiding your report card",
    ],
    correct: 2,
    gif: "https://media.tenor.com/bXste3RvDaEAAAA1/honesty-is-the-best-policy-liam-scott-edwards.webp",
  },
  {
    question: "What would a trustworthy person do?",
    options: [
      "Break promises",
      "Keep secrets that shouldn’t be kept",
      "Spread rumors",
      "Keep their word",
    ],
    correct: 3,
    gif: "https://media.tenor.com/IwxcnmprU3IAAAA1/trust-me-im-a-doctor-trust-me-i%27m-a-doctor.webp",
  },
];

const IntegrityQuest = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1); // -1 = intro
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (finished && score >= 5) {
      completeLeadershipChallenge(3, 1);
    }

    if (finished) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "innovativeLeader",
        score: Math.round((score / 6) * 100),
        accuracy: parseFloat(((score / 6) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / 6000).toFixed(2)), // 6 questions
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score >= 5,

      });
      setStartTime(Date.now());

    }
  }, [finished, score]);


  const totalSteps = dilemmas.length + quizzes.length;

  const handleAnswer = (index) => {
    let isCorrect = false;
    if (step < dilemmas.length) {
      isCorrect = index === dilemmas[step].correct;
    } else {
      const quizIndex = step - dilemmas.length;
      isCorrect = index === quizzes[quizIndex].correct;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStep(-1);
    setScore(0);
    setFinished(false);
    setStartTime(Date.now());
  };

  const getResultGif = () => {
    if (score >= 5)
      return "https://media.tenor.com/G0OLTHn7sY4AAAA1/fab-fabulous.webp";
    if (score === 4)
      return "https://media.tenor.com/lLsyur_RJmUAAAA1/good-job.webp";
    if (score === 3)
      return "https://media.tenor.com/ocffM-fTUYwAAAA1/you-are-better-than-this-alex-boye.webp";
    return "https://media.tenor.com/MJeMLpuKeYEAAAA1/madagascar-alex-the-lion.webp";
  };

  const getResultText = () => {
    if (score >= 5)
      return "🎉 Awesome! You earned the 🛡️ Trustworthy Leader badge!";
    if (score === 4) return "👏 Good job! Almost perfect — keep it up!";
    if (score === 3) return "🙌 Not bad, but you can do better next time!";
    return "😅 Oops! Let's try again and aim for better choices!";
  };

  const renderQuestion = () => {
    let q, opts, gif;

    if (step < dilemmas.length) {
      q = dilemmas[step].question;
      opts = dilemmas[step].options;
      gif = dilemmas[step].gif;
    } else {
      const quizIndex = step - dilemmas.length;
      q = quizzes[quizIndex].question;
      opts = quizzes[quizIndex].options;
      gif = quizzes[quizIndex].gif;
    }

    return (
      <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
        <img src={gif} alt="Question Visual" className="mx-auto mb-4 rounded" />
        <h2 className="text-2xl font-bold mb-4">{q}</h2>
        <div className="space-y-2">
          {opts.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center p-4">
      {step === -1 ? (
        // Intro Screen
        <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">🛡️ Integrity Quest</h1>
          <img
            src="https://media.tenor.com/rUA9K4lAIQQAAAA1/sml-marvin.webp"
            alt="Intro"
            className="mx-auto mb-4 rounded"
          />
          <p className="mb-4 text-gray-700">
            Welcome to Integrity Quest! <br />
            - Face real-life dilemmas <br />
            - Answer quick ethics questions <br />
            - Show your integrity and earn the Trustworthy Leader badge! <br />
            Ready to prove your honesty and fairness?
          </p>
          <button
            onClick={() => setStep(0)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition"
          >
            Start Game
          </button>
        </div>
      ) : !finished ? (
        renderQuestion()
      ) : (
        // Results
        <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Integrity Quest Completed!
          </h2>
          <p className="text-lg mb-4">Your Score: {score} / 6</p>
          <img
            src={getResultGif()}
            alt="Result"
            className="mx-auto mb-4 rounded"
          />
          <p className="text-xl mb-4">{getResultText()}</p>
          <button
            onClick={handleRestart}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default IntegrityQuest;
