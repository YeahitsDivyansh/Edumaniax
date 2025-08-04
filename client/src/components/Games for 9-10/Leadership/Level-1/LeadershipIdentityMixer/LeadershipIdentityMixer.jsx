import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const scenarios = [
  { id: 1, text: "Peer mentoring a shy classmate", correct: "Servant" },
  {
    id: 2,
    text: "Leading a school protest for better lunch options",
    correct: "Transformational",
  },
  {
    id: 3,
    text: "Running a tight schedule for your team",
    correct: "Directive",
  },
];

const styles = ["Servant", "Transformational", "Directive", "Democratic"];

const crisisChoices = [
  {
    scenario: "During a school event, the lights go out. What do you do?",
    options: [
      "Calmly assign roles and solve it as a team (Democratic)",
      "Quickly take charge and give directions (Directive)",
      "Motivate everyone and turn it into an opportunity (Transformational)",
      "Ensure everyone's safe before taking action (Servant)",
    ],
  },
];

const allowedStyles = [
  "directive",
  "democratic",
  "servant",
  "transformational",
  "style",
];

const isValidLeadershipStyle = (text) => {
  return allowedStyles.includes(text.trim().toLowerCase());
};

const isMeaningfulText = (text) => {
  const words = text.trim().split(/\s+/);
  const realWords = words.filter(
    (word) => word.length > 2 && /[aeiou]/i.test(word)
  );
  return realWords.length >= 2;
};

const LeadershipIdentityMixer = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1);
  const [matches, setMatches] = useState({});
  const [dominantStyle, setDominantStyle] = useState("");
  const [crisisChoice, setCrisisChoice] = useState("");
  const [values, setValues] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { width, height } = useWindowSize();
  const [styleWarning, setStyleWarning] = useState("");
  const [valueWarning, setValueWarning] = useState("");

  const isAllCorrect =
    scenarios.every((s) => matches[s.id] === s.correct) &&
    isValidLeadershipStyle(dominantStyle) &&
    crisisChoice.trim() !== "" &&
    values.trim() !== "";

  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (!submitted) return;

    const totalTimeMs = Date.now() - startTime;

    const totalScore = 4; // 3 scenario matches + dominant + crisis + values
    let earned = 0;
    if (scenarios.every((s) => matches[s.id] === s.correct)) earned += 1;
    if (isValidLeadershipStyle(dominantStyle)) earned += 1;
    if (crisisChoice.trim()) earned += 1;
    if (values.trim()) earned += 1;

    const scaledScore = Math.round((earned / totalScore) * 10);

    updatePerformance({
      moduleName: "Leadership",
      topicName: "understandableLeader",
      score: scaledScore,
      accuracy: scaledScore * 10,
      avgResponseTimeSec: parseFloat((totalTimeMs / 4000).toFixed(2)),
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: isAllCorrect,
       
    });
    setStartTime(Date.now());


    if (isAllCorrect) {
      completeLeadershipChallenge(0, 0);
    }
  }, [submitted, isAllCorrect]);


  const handleMatch = (id, style) => {
    setMatches((prev) => ({ ...prev, [id]: style }));
  };

  const getIncorrectAnswers = () => {
    const incorrect = [];
    scenarios.forEach((s) => {
      if (matches[s.id] !== s.correct) {
        incorrect.push(
          `Scenario: "${s.text}" - Correct: ${s.correct}, You chose: ${matches[s.id] || "None"
          }`
        );
      }
    });
    if (!isValidLeadershipStyle(dominantStyle)) {
      incorrect.push("Dominant Style: Not filled meaningfully or invalid.");
    }
    if (!crisisChoice.trim()) {
      incorrect.push("Crisis Scenario: No option selected.");
    }
    if (!values.trim()) {
      incorrect.push("Leadership Values: Field is empty.");
    }
    return incorrect;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(step + 1);
  };

  const resetGame = () => {
    setMatches({});
    setDominantStyle("");
    setCrisisChoice("");
    setValues("");
    setSubmitted(false);
    setStep(-1);
    setStartTime(Date.now());

  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 text-center">
      {step === -1 && (
        <div>
          <h1 className="text-3xl font-bold">Leadership Identity Mixer 🧠</h1>
          <p className="mt-4">
            Explore your leadership style through scenario matching,
            decision-making, and reflection. Ready to lead?
          </p>
          <img
            src="https://media.tenor.com/dF6MX5HkiAMAAAA1/gilonvl-gilvl.webp"
            alt="intro gif"
            className="w-64 mx-auto my-6 rounded-lg"
          />
          <button
            onClick={() => setStep(0)}
            className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Play Game
          </button>
        </div>
      )}

      {step >= 0 && step < scenarios.length && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            🎯 Match Leadership Style
          </h2>
          <p className="mb-4">{scenarios[step].text}</p>
          <select
            className="w-full p-2 border rounded-md"
            value={matches[scenarios[step].id] || ""}
            onChange={(e) => handleMatch(scenarios[step].id, e.target.value)}
          >
            <option value="">Select style</option>
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
          {matches[scenarios[step].id] && (
            <img
              src={
                matches[scenarios[step].id] === scenarios[step].correct
                  ? "https://media.tenor.com/41CoD30Ghb4AAAA1/damn-shookt.webp"
                  : "https://media.tenor.com/opobJT70dGsAAAAm/damn-maurice.webp"
              }
              alt="feedback gif"
              className="w-48 mx-auto my-4"
            />
          )}
          <button
            className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            onClick={() => setStep(step + 1)}
            disabled={!matches[scenarios[step].id]}
          >
            Next
          </button>
        </div>
      )}

      {step === scenarios.length && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            🧭 What’s your dominant style?
          </h2>
          <input
            type="text"
            placeholder="Eg. Transformational"
            value={dominantStyle}
            onChange={(e) => {
              const value = e.target.value;
              setDominantStyle(value);
              if (!isValidLeadershipStyle(value)) {
                setStyleWarning(
                  "❗ Please enter a genuine response — no random text or gibberish."
                );
              } else {
                setStyleWarning("");
              }
            }}
            className="w-full p-2 border rounded-md"
          />
          {styleWarning && <p className="text-red-600 mt-1">{styleWarning}</p>}
          {dominantStyle && (
            <img
              src="https://media.tenor.com/GtKv9d9EeO8AAAA1/kobe-bryant-dominate.webp"
              alt="dominant gif"
              className="w-48 mx-auto my-4"
            />
          )}
          <button
            onClick={() => setStep(step + 1)}
            disabled={!isValidLeadershipStyle(dominantStyle)}
            className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === scenarios.length + 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">🚨 Crisis Scenario</h2>
          <p>{crisisChoices[0].scenario}</p>
          <select
            className="w-full p-2 border rounded-md mt-2"
            value={crisisChoice}
            onChange={(e) => setCrisisChoice(e.target.value)}
          >
            <option value="">Select your response</option>
            {crisisChoices[0].options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button
            onClick={() => setStep(step + 1)}
            disabled={!crisisChoice.trim()}
            className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === scenarios.length + 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            💬 What values define your leadership?
          </h2>
          <textarea
            placeholder="Eg. Empathy, decisiveness, inclusion..."
            value={values}
            onChange={(e) => {
              const value = e.target.value;
              setValues(value);
              setValueWarning(
                value.trim() === "" ? "❗ Please fill in this field." : ""
              );
            }}
            className="w-full p-2 border rounded-md min-h-[100px]"
          />
          {valueWarning && <p className="text-red-600 mt-1">{valueWarning}</p>}
          {values && (
            <img
              src="https://media.tenor.com/ojxgZg5gPHoAAAA1/tony-stark-iron-man.webp"
              alt="values gif"
              className="w-48 mx-auto my-4"
            />
          )}
          <button
            onClick={handleSubmit}
            disabled={values.trim() === ""}
            className="mt-4 bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      )}

      {submitted && (
        <div className="mt-6">
          {isAllCorrect ? (
            <>
              <Confetti width={width} height={height} />
              <h2 className="text-2xl font-bold text-green-600">
                🏅 You earned the Style Strategist Badge!
              </h2>
              <img
                src="https://media.tenor.com/bGDhlmSctpEAAAA1/rdj-robert-downey-jr.webp"
                alt="success"
                className="w-64 mx-auto my-6"
              />
              <p className="text-lg">
                Well done! Your leadership instincts are sharp and inspiring. 💡
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600">
                Oops! Some answers weren’t quite right.
              </h2>
              <img
                src="https://media.tenor.com/VJTG2CImZzgAAAA1/rdj.webp"
                alt="fail"
                className="w-64 mx-auto my-6"
              />
              <p className="text-lg">
                No worries — leadership is a journey. Here’s what you can
                improve:
              </p>
              <ul className="text-left mt-4 list-disc list-inside space-y-2">
                {getIncorrectAnswers().map((msg, idx) => (
                  <li key={idx} className="text-red-500">
                    {msg}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={resetGame}
              className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Play Again
            </button>

            <Link to="/vision-blueprint-builder">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Move to Next Game
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipIdentityMixer;
