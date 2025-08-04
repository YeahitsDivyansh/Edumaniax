import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const CommunicationLab = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedbackGif, setFeedbackGif] = useState(null);
  const { width, height } = useWindowSize();
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (step === scenarios.length) {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "understandableLeader",
        score: Math.round((score / scenarios.length) * 10),
        accuracy: parseFloat(((score / scenarios.length) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / 1000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score >= 5,
         
      });
setStartTime(Date.now());
      if (score >= 5) {
        completeLeadershipChallenge(1, 0); // Update challengeId and taskId as needed
      }
    }
  }, [step, score]);


  const scenarios = [
    {
      title: "Scenario 1",
      question: "Teammates are fighting during a project. What do you do?",
      gif: "https://media.tenor.com/LKI_U8Y5JMcAAAA1/family-guy-peter-griffin.webp",
      options: [
        { text: "Shout at them", correct: false },
        { text: "Calm them down and ask both sides", correct: true },
        { text: "Walk away", correct: false },
        { text: "Blame one person", correct: false },
      ],
    },
    {
      title: "Scenario 2",
      question: "A friend is sad but not talking. What should you do?",
      gif: "https://media.tenor.com/m4RN_O_yXI8AAAA1/sad-alone.webp",
      options: [
        { text: "Tell them to 'get over it'", correct: false },
        { text: "Listen patiently", correct: true },
        { text: "Make fun of them", correct: false },
        { text: "Ignore them", correct: false },
      ],
    },
    {
      title: "Scenario 3",
      question: "A classmate keeps interrupting you while you speak.",
      gif: "https://media.tenor.com/3w5IDADACyEAAAA1/gif.webp",
      options: [
        { text: "Shout to make your point", correct: false },
        { text: "Politely ask them to let you finish", correct: true },
        { text: "Walk out of the room", correct: false },
        { text: "Interrupt them back", correct: false },
      ],
    },
    {
      title: "Scenario 4",
      question: "You gave your opinion in a group, but others disagree.",
      gif: "https://media.tenor.com/S6uk4JBZYVQAAAA1/disagree-discord.webp",
      options: [
        { text: "Tell them they’re wrong", correct: false },
        { text: "Refuse to speak again", correct: false },
        { text: "Stay calm and hear their views", correct: true },
        { text: "Walk away angry", correct: false },
      ],
    },
    {
      title: "Quiz 1",
      question: "What does 'empathetic listening' mean?",
      gif: "https://media.tenor.com/HODAFKtRF6gAAAA1/hug-comfort.webp",
      options: [
        { text: "Giving advice quickly", correct: false },
        { text: "Ignoring the speaker", correct: false },
        {
          text: "Understanding and sharing the speaker’s feelings",
          correct: true,
        },
        { text: "Waiting for your turn to speak", correct: false },
      ],
    },
    {
      title: "Quiz 2",
      question: "What does active listening mean?",
      gif: "https://media.tenor.com/Hx2nxLEvrfkAAAA1/it%27s-good-listening-practice-adam.webp",
      options: [
        { text: "Speaking louder", correct: false },
        { text: "Interrupting", correct: false },
        { text: "Paying full attention", correct: true },
        { text: "Looking away", correct: false },
      ],
    },
  ];

  const handleSelect = (isCorrect, index) => {
    if (selected !== null) return;
    setSelected(index);
    setFeedbackGif(
      isCorrect
        ? "https://media.tenor.com/ynST0DWtFqgAAAA1/pointing-that-is-correct.webp"
        : "https://media.tenor.com/1OK2Woyhz-AAAAA1/try-again-never-again.webp"
    );
    if (isCorrect) setScore((prev) => prev + 1);
    setTimeout(() => {
      setSelected(null);
      setFeedbackGif(null);
      setStep((prev) => prev + 1);
    }, 1500);
  };

  const getResult = () => {
    if (score >= 5) {
      return {
        gif: "https://media.tenor.com/GM3WMvmBN7cAAAA1/terrific-elijah-wood.webp",
        message: "🎉 Diplomatic Leader badge earned!",
        confetti: true,
      };
    } else if (score === 4) {
      return {
        gif: "https://media.tenor.com/KXF7ZthaTo8AAAA1/thats-a-good-attitude-dikahn-wright.webp",
        message: "😊 Good effort! You're getting there!",
        confetti: false,
      };
    } else if (score === 3) {
      return {
        gif: "https://media.tenor.com/AsmU42bYWnkAAAA1/you-deserve-better-you-can-do-better.webp",
        message: "😐 You can do better. Try again!",
        confetti: false,
      };
    } else {
      return {
        gif: "https://media.tenor.com/V_ZtFABlFlAAAAA1/laughing-chimp.webp",
        message: "😅 That didn’t go well! Let’s retry!",
        confetti: false,
      };
    }
  };

  const result = getResult();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative">
      {step === -1 ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-blue-700">
            🎙️ Communication & Listening
          </h1>
          <p className="text-gray-700 text-lg">
            Explore how to become a better communicator and listener through
            real-life scenarios. Learn how to stay calm, listen actively, and
            handle conflict with empathy.
          </p>
          <img
            src="https://media.tenor.com/r3XdvPsAV3kAAAA1/despicable-me-minions.webp"
            alt="Intro"
            className="rounded-xl mx-auto max-h-64"
          />
          <button
            onClick={() => setStep(0)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            🚀 Start the Game
          </button>
        </div>
      ) : step < scenarios.length ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center space-y-4">
          <h2 className="text-xl font-semibold">{scenarios[step].title}</h2>
          <img
            src={scenarios[step].gif}
            alt="Scenario gif"
            className="rounded-xl mx-auto max-h-60"
          />
          <p className="text-gray-800">{scenarios[step].question}</p>
          <div className="space-y-3">
            {scenarios[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.correct, idx)}
                className={`w-full py-2 px-4 rounded-lg border text-left transition-all
                  ${selected === null
                    ? "bg-white hover:bg-blue-100"
                    : idx === selected
                      ? opt.correct
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "bg-white"
                  }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
          {feedbackGif && (
            <img
              src={feedbackGif}
              alt="Feedback"
              className="mx-auto max-h-40 mt-4"
            />
          )}
        </div>
      ) : (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-xl w-full text-center space-y-4">
          {result.confetti && <Confetti width={width} height={height} />}
          <h2 className="text-2xl font-bold text-green-700">
            Your Score: {score} / 6
          </h2>
          <p className="text-xl font-medium">{result.message}</p>
          <img
            src={result.gif}
            alt="Result"
            className="rounded-xl mx-auto max-h-64"
          />
          <button
            onClick={() => {
              setStep(-1);
              setScore(0);
              setStartTime(Date.now());
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunicationLab;
