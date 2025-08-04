import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const sampleGoals = {
  "Start a podcast": [
    { text: "Choose a podcast topic & format", category: "S" },
    { text: "Launch first 3 episodes in 6 weeks", category: "T" },
    { text: "Reach 100 listeners in 2 months", category: "M" },
    { text: "Record 2 episodes a week", category: "A" },
    { text: "Want to share knowledge with others", category: "R" },
  ],
  "Run 5k under 30 minutes": [
    { text: "Complete a 5k in under 30 mins", category: "S" },
    { text: "Track pace weekly on fitness app", category: "M" },
    { text: "Train 3x/week with run-walk plan", category: "A" },
    { text: "I want to run a local race in 2 months", category: "R" },
    { text: "Achieve it in 8 weeks", category: "T" },
  ],
  "Improve science grades": [
    { text: "I want to improve my physics test scores", category: "S" },
    { text: "Aim for 80%+ in next two tests", category: "M" },
    { text: "Study 1 hour daily + 1 weekly group session", category: "A" },
    { text: "Needed to apply for science stream", category: "R" },
    { text: "Achieve in 5 weeks", category: "T" },
  ],
};

const categories = ["S", "M", "A", "R", "T"];

const scenarioGifs = [
  {
    title: "Start a Podcast",
    gif: "https://media.tenor.com/_IMGsQH5Yb8AAAAm/utya-telegram.webp",
    goal: "Start a podcast",
  },
  {
    title: "Run 5K Under 30 Minutes",
    gif: "https://media.tenor.com/I6i5aqaoIdUAAAAm/most-popular-gerry-dee.webp",
    goal: "Run 5k under 30 minutes",
  },
  {
    title: "Improve Science Grades",
    gif: "https://media.tenor.com/_rCpXvedUL4AAAA1/theres-always-room-for-growth-and-innovation-jack-donaghy.webp",
    goal: "Improve science grades",
  },
];

const SmartGoalLab = () => {
  const { completeSELChallenge } = useSEL();
  const [step, setStep] = useState("intro");
  const [goal, setGoal] = useState(null);
  const [notes, setNotes] = useState([]);
  const [placements, setPlacements] = useState({});
  const [actionSteps, setActionSteps] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  const handleDrop = (noteText, cat) => {
    const note = notes.find((n) => n.text === noteText);
    if (!placements[noteText]) {
      setPlacements({ ...placements, [noteText]: cat });
    }
  };

  const isCompleted =
    goal &&
    Object.keys(placements).length === 5 &&
    actionSteps.every((step) => step.trim().length > 3);

  const handleSubmit = () => {
    const correctBreakdown = sampleGoals[goal];

    const expectedPlacements = {};
    correctBreakdown.forEach((item) => {
      expectedPlacements[item.category] = item.text;
    });

    const userPlacements = {};
    Object.entries(placements).forEach(([text, category]) => {
      userPlacements[category] = text;
    });

    const allCategoriesFilled = categories.every((cat) => userPlacements[cat]);
    const allActionStepsFilled = actionSteps.every(
      (step) => step.trim().length > 3
    );

    const allCorrect = categories.every(
      (cat) => userPlacements[cat] === expectedPlacements[cat]
    );

    if (!allCategoriesFilled || !allActionStepsFilled) {
      alert(
        "Make sure all SMART steps are matched and your action plan is filled!"
      );
      return;
    }

    setSubmitted(allCorrect);
    setStep("result");

    const endTime = Date.now();
    const durationSec = Math.round((endTime - startTime) / 1000);
    const avgResponseTimeSec = durationSec / 5;

    updatePerformance({
      moduleName: "SEL",
      topicName: "selfAwareness",
      score: 10, // out of 10
      accuracy: 100,
      avgResponseTimeSec,
      studyTimeMinutes: Math.ceil(durationSec / 60),
      completed: allCorrect,
       
    });

    setStartTime(Date.now());

    if (allCorrect) {
      completeSELChallenge(2, 0);
      confetti({ spread: 300, particleCount: 250, origin: { y: 0.6 } });
    }
  };


  const resetGame = () => {
    setGoal(null);
    setPlacements({});
    setActionSteps(["", "", ""]);
    setSubmitted(false);
    setStep("intro");
    setStartTime(Date.now());

  };

  if (step === "intro") {
    return (
      <div className="p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">
          🧠 Welcome to the Smart Goal Lab!
        </h1>
        <img
          src="https://media.tenor.com/Pp5Ta4hN92gAAAA1/are-you.webp"
          alt="Intro GIF"
          className="mx-auto rounded-lg"
        />
        <p className="max-w-xl mx-auto">
          In this game, you'll select a goal, break it into the SMART format,
          and drag each sticky note into the correct category:{" "}
          <strong>
            Specific, Measurable, Achievable, Relevant, Time-bound
          </strong>
          . Then, create a 3-step action plan to win!
        </p>
        <Button onClick={() => setStep("selectScenario")}>
          Let’s Begin 🚀
        </Button>
      </div>
    );
  }

  if (step === "selectScenario") {
    return (
      <div className="p-6 text-center space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Scenario:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarioGifs.map((s) => (
            <div
              key={s.goal}
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => {
                setGoal(s.goal);
                setNotes(sampleGoals[s.goal]);
                setStep("play");
              }}
            >
              <img src={s.gif} alt={s.title} className="rounded shadow-lg" />
              <p className="mt-2 font-medium">{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="text-center mt-10">
        {submitted ? (
          <>
            <img
              src="https://media.tenor.com/gw8v4ngGCFUAAAA1/what-an-unexpected-treat-judge-teresa-medina.webp"
              alt="Win"
              className="mx-auto rounded-lg"
            />
            <h2 className="text-3xl font-bold mt-4">
              🎉 You broke it down SMARTly!
            </h2>
            <p className="mb-6">
              Great job organizing your goal and creating a clear plan. 💪
            </p>
          </>
        ) : (
          <>
            <img
              src="https://media.tenor.com/L2lox2aFb4gAAAA1/amelia-shepherd.webp"
              alt="Try Again"
              className="mx-auto rounded-lg"
            />
            <h2 className="text-2xl font-semibold mt-4">
              Oops! Something was missing.
            </h2>
            <p className="mb-6">Maybe give it another shot?</p>
          </>
        )}
        <Button onClick={resetGame}>🔁 Play Again</Button>
        <Link to="/help-network-builder">
          <Button variant="outline" className="ml-4">
            ➡️ Next Game
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-yellow-50 min-h-screen font-handwriting">
      <h2 className="text-2xl font-semibold mb-4">Goal: {goal}</h2>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {categories.map((cat) => (
          <div
            key={cat}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const text = e.dataTransfer.getData("text/plain");
              handleDrop(text, cat);
            }}
            className="min-h-[100px] bg-white border-2 border-dashed rounded-lg p-2 text-center font-bold"
          >
            {cat} – {smartFull[cat]}
            <div className="mt-2 space-y-2">
              {Object.entries(placements)
                .filter(([, c]) => c === cat)
                .map(([text]) => (
                  <div key={text} className="bg-yellow-200 rounded p-1 text-sm">
                    {text}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {notes.map(
          (note) =>
            !placements[note.text] && (
              <div
                key={note.text}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", note.text)
                }
                className="bg-yellow-300 cursor-grab px-2 py-1 rounded shadow"
              >
                {note.text}
              </div>
            )
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">Your 3-step Action Plan:</h3>
      <div className="space-y-2 mb-4">
        {actionSteps.map((step, i) => (
          <input
            key={i}
            value={step}
            onChange={(e) => {
              const newSteps = [...actionSteps];
              newSteps[i] = e.target.value;
              setActionSteps(newSteps);
            }}
            placeholder={`Step ${i + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}
      </div>

      <Button onClick={handleSubmit}>Submit Plan ✅</Button>
    </div>
  );
};

const smartFull = {
  S: "Specific",
  M: "Measurable",
  A: "Achievable",
  R: "Relevant",
  T: "Time-bound",
};

export default SmartGoalLab;
