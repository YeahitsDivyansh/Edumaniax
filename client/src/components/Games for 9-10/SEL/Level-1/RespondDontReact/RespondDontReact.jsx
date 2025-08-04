import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const scenarios = [
  {
    question:
      "A peer makes a sarcastic comment about your appearance in front of others.",
    gif: "https://media.tenor.com/9epeUhDEBgsAAAA1/tv-shows-friends.webp",
    choices: [
      {
        text: "Snap back with an insult",
        outcome: "Things escalate and both of you feel worse.",
        isRespectful: false,
      },
      {
        text: "Stay silent and avoid eye contact",
        outcome: "You feel hurt, and the behavior might continue.",
        isRespectful: false,
      },
      {
        text: "Calmly say, “I didn’t appreciate that. Please stop.”",
        outcome: "✅ Friend is surprised, but backs off and later apologizes.",
        isRespectful: true,
      },
      {
        text: "Post about it online later",
        outcome: "Drama increases and it causes more stress.",
        isRespectful: false,
      },
    ],
  },
  {
    question: "A friend cancels your plan last-minute.",
    gif: "https://media.tenor.com/UAPmIfTNmA4AAAA1/walter-white-w-up.webp",
    choices: [
      {
        text: "Ignore their messages",
        outcome: "Friend feels confused and the distance grows.",
        isRespectful: false,
      },
      {
        text: "Say, “I understand, but I was really looking forward to it.”",
        outcome:
          "✅ Friend appreciates your honesty and promises to reschedule.",
        isRespectful: true,
      },
      {
        text: "Blame them for ruining your day",
        outcome: "They feel bad and the conversation becomes tense.",
        isRespectful: false,
      },
      {
        text: "Send a passive-aggressive story",
        outcome: "They notice, and now both feel awkward.",
        isRespectful: false,
      },
    ],
  },
  {
    question: "Someone spreads a false rumor about you.",
    gif: "https://media.tenor.com/uIorgaD4_cUAAAA1/fake-news-point.webp",
    choices: [
      {
        text: "Spread a rumor back",
        outcome: "The conflict grows and more people get hurt.",
        isRespectful: false,
      },
      {
        text: "Talk behind their back",
        outcome: "It adds fuel to the gossip and nothing improves.",
        isRespectful: false,
      },
      {
        text: "Ask them directly and calmly about it",
        outcome: "✅ They deny it at first, but later apologize in private.",
        isRespectful: true,
      },
      {
        text: "Keep it all in and feel upset",
        outcome: "It hurts you silently, and the issue continues.",
        isRespectful: false,
      },
    ],
  },
  {
    question: "You weren’t invited to a group hangout.",
    gif: "https://media.tenor.com/m-hM7sDEBMkAAAA1/omori.webp",
    choices: [
      {
        text: "Post sad quotes to get attention",
        outcome: "Some friends notice but don’t say anything.",
        isRespectful: false,
      },
      {
        text: "Send a rude message to the group",
        outcome: "It creates drama and people get defensive.",
        isRespectful: false,
      },
      {
        text: "Ask someone kindly what happened",
        outcome:
          "✅ They explain it wasn’t intentional and plan to include you next time.",
        isRespectful: true,
      },
      {
        text: "Act cold the next day",
        outcome: "People feel confused and distant.",
        isRespectful: false,
      },
    ],
  },
];

const correctGif =
  "https://media.tenor.com/180kIEgXaVwAAAAm/one-hundred-percent-dr-randall-mindy.webp";
const wrongGif =
  "https://media.tenor.com/pOU53oV_1KEAAAA1/you-are-wrong-your-thoughts-are-wrong.webp";

const RespondDontReact = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [outcome, setOutcome] = useState("");
  const [score, setScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [feedbackGif, setFeedbackGif] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleChoice = (choice) => {
    setSelected(choice.text);
    setOutcome(choice.outcome);
    if (choice.isRespectful) {
      setScore((prev) => prev + 1);
      setFeedbackGif(correctGif);
    } else {
      setFeedbackGif(wrongGif);
    }
  };

  const handleNext = () => {
    if (current + 1 < scenarios.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setOutcome("");
      setFeedbackGif("");
    } else {
      setShowResult(true);
      setShowConfetti(score >= 3);
      if (score >= 3) {
        completeSELChallenge(0, 1); // ✅ Mark SEL challenge complete
      }

      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "SEL",
        topicName: "emotionalAwareness",
        score: Math.round((score / scenarios.length) * 10),
        accuracy: Math.round((score / scenarios.length) * 100),
        avgResponseTimeSec: durationSec / scenarios.length,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: score >= 3,

      });
      setStartTime(Date.now());

    }
  };


  const restartGame = () => {
    setShowIntro(true);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setOutcome("");
    setShowResult(false);
    setFeedbackGif("");
    setStartTime(Date.now());

  };

  const renderEndScreen = () => {
    let gif = "";
    let message = "";

    if (score >= 3) {
      gif = "https://media.tenor.com/o1Z1HmUlQIUAAAAm/cute-funny.webp";
      message =
        "🎉 You stayed calm and respectful! That’s emotional intelligence!";
    } else if (score === 2) {
      gif = "https://media.tenor.com/hrj3t9pi5LoAAAA1/despicable-me-gru.webp";
      message = "😬 Almost there! Let’s reflect and try again.";
    } else {
      gif =
        "https://media.tenor.com/Ovo0yEJuzy4AAAA1/ron-swanson-rethink-that-move-son.webp";
      message = "💀 Yikes! Time to rethink those reactions. Try again?";
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        {showConfetti && <Confetti />}
        <h2 className="text-2xl font-bold">Game Over 🎉</h2>
        <p className="text-lg">
          You got {score} out of {scenarios.length} respectful responses.
        </p>
        <p className="font-medium text-lg">{message}</p>
        <img
          src={gif}
          alt="result gif"
          className="mx-auto rounded-lg w-full max-w-xs"
        />
        <Button onClick={restartGame}>🔄 Play Again</Button>
        <Link to="/spot-the-strength">
          <Button variant="outline">➡️ Go to Next Game</Button>
        </Link>
      </motion.div>
    );
  };

  if (showIntro) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          Respond, Don’t React – What Will You Say?
        </h1>
        <p className="text-base">
          💬 You’ll face a few tricky social moments. Pick your response and see
          what happens next. Can you stay respectful even when things get tense?
        </p>
        <img
          src="https://media.tenor.com/l_Dt7LDpobAAAAA1/hey-buddy-ahmed-aldoori.webp"
          alt="Intro Gif"
          className="mx-auto rounded-lg w-full max-w-sm"
        />
        <Button onClick={() => setShowIntro(false)}>▶️ Play Game</Button>
      </div>
    );
  }

  if (showResult) return renderEndScreen();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 p-4 border rounded-2xl shadow-sm bg-white space-y-4"
      >
        <h2 className="text-xl font-semibold">
          Scenario {current + 1} of {scenarios.length}
        </h2>
        <p className="text-base">{scenarios[current].question}</p>
        <img
          src={scenarios[current].gif}
          alt="Scenario visual"
          className="mx-auto w-full max-w-sm rounded-lg"
        />
        <div className="space-y-2">
          {scenarios[current].choices.map((choice) => (
            <Button
              key={choice.text}
              variant={selected === choice.text ? "default" : "outline"}
              className="w-full text-left"
              onClick={() => handleChoice(choice)}
              disabled={!!selected}
            >
              {choice.text}
            </Button>
          ))}
        </div>
        {outcome && (
          <div className="text-sm mt-2 p-2 border rounded bg-gray-50 text-gray-800">
            {outcome}
          </div>
        )}
        {feedbackGif && (
          <img
            src={feedbackGif}
            alt="Feedback gif"
            className="mx-auto mt-2 w-full max-w-xs rounded-lg"
          />
        )}
        {selected && (
          <Button className="w-full mt-2" onClick={handleNext}>
            Next
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default RespondDontReact;
