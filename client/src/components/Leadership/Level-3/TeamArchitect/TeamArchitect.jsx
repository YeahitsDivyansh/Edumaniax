import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const characters = [
  { name: "Aisha", skill: "good speaker", correctRole: "Team Spokesperson" },
  { name: "Rohan", skill: "good at drawing", correctRole: "Poster Designer" },
  { name: "Zara", skill: "fast writer", correctRole: "Note-taker" },
  { name: "Dev", skill: "tech expert", correctRole: "Slide Maker" },
];

const roles = [
  "Team Spokesperson",
  "Poster Designer",
  "Note-taker",
  "Slide Maker",
];

const mcqs = [
  {
    question: "What does a good team leader do?",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTVkcHJvY2s0bXJwbzg3OW0yZ2hiOGZlbTlvN2kwNWY1cDByczFhaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPGcjQ6dJEjH5uwMw/200w.webp",
    options: [
      "Does everything alone",
      "Blames others",
      "Shares work based on skills",
      "Only gives orders",
    ],
    answer: 2,
  },
  {
    question: "What should you do if two members want the same role?",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHlpcXNoaHM4djZvMHUzYThid3BpNXM4MDVtMzdsNXljcXpwZG9jdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1w2vvSVgAu3Ti/200w.webp",
    options: [
      "Pick your friend",
      "Flip a coin",
      "Talk and decide together",
      "Let them fight it out",
    ],
    answer: 2,
  },
  {
    question: "Why is delegation important?",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2IzOTM1ZXYydWlmejJwMDczcDMwZ2tzNXRwdzJnODIzMXBrbm91ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/48FpOfwgAuJxGap5v1/200w.webp",
    options: [
      "It helps one person do everything",
      "It reduces communication",
      "It builds trust and efficiency",
      "It wastes time",
    ],
    answer: 2,
  },
  {
    question: "What is a sign of a strong team?",
    gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTNubDM1ZzBscnJ2MXVyNXllN2lnMjEyZDJ2aHRnZHRoaGk3aTFydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n09hPsUbebNe8d24SS/100.webp",
    options: [
      "Blaming others",
      "Clear roles and teamwork",
      "Only one leader does all work",
      "Confusion in tasks",
    ],
    answer: 1,
  },
];

const TeamArchitect = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const { width, height } = useWindowSize();
  const [screen, setScreen] = useState("intro");
  const [assignments, setAssignments] = useState({});
  const [draggingRole, setDraggingRole] = useState(null);
  const [score, setScore] = useState(0);
  const [mcqIndex, setMcqIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (screen === "result") {
      const totalTimeMs = Date.now() - startTime;

      updatePerformance({
        moduleName: "Leadership",
        topicName: "theStrategist",
        score: Math.round((score / 6) * 100),
        accuracy: parseFloat(((score / 6) * 100).toFixed(2)),
        avgResponseTimeSec: parseFloat((totalTimeMs / 6000).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: score >= 5,

      });
      setStartTime(Date.now());

      if (score >= 5) {
        completeLeadershipChallenge(2, 1); // Update as needed
      }
    }
  }, [screen, score]);


  const handleDrop = (characterName) => {
    if (draggingRole) {
      setAssignments((prev) => ({ ...prev, [characterName]: draggingRole }));
      setDraggingRole(null);
    }
  };

  const startMCQ = () => {
    let tempScore = 0;
    characters.forEach(({ name, correctRole }) => {
      if (assignments[name] === correctRole) tempScore += 1;
    });
    setScore(tempScore);
    setScreen("mcqs");
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === mcqs[mcqIndex].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      setSelectedOption(null);
      if (mcqIndex < mcqs.length - 1) {
        setMcqIndex((prev) => prev + 1);
      } else {
        setScreen("result");
      }
    }, 1000);
  };

  const getResult = () => {
    if (score >= 5)
      return {
        gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnV5NW83YTIweGRjb2FyYmhiaXpxdm9odzNyb2phdHk0ZnpqcWZkaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/14f6IQVKeBvaGk/200w.webp",
        text: "🏗️ Amazing! You’re a true Team Builder! Badge unlocked!",
      };
    if (score === 4)
      return {
        gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjQxdXZxZ3VvMnZodnU2aXRoZHRwNXp5cDgyOWlnb3IzcTB4OXhiMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Lk023zZqHJ3Zz4rxtV/200.webp",
        text: "Great job! You're close to earning that badge!",
      };
    if (score === 3)
      return {
        gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2swY2Y0YXVqdm1hOTgyZ3RkNjh0eTFoNWIxc2o4aXNiYnNsdjhxbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/I3JYewlC9EJLrSSGY9/200w.webp",
        text: "Not bad! Keep building your team skills.",
      };
    return {
      gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZnaHB2bXh6bGFhbzFvOHBrY3B3bmlwZmNndDl5anpkcHhrejVjdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0poqydvfLWFRbT6alD/100.webp",
      text: "Keep trying — teamwork takes practice!",
    };
  };

  const { gif, text } = getResult();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 text-center flex flex-col items-center justify-center">
      {screen === "intro" && (
        <div className="max-w-xl bg-white rounded-2xl p-6 shadow">
          <h1 className="text-3xl font-bold mb-4">
            🏗️ Team Architect Challenge
          </h1>
          <p className="mb-4 text-gray-700">
            Build the perfect team by assigning the right roles to the right
            members. Then answer questions to earn your badge!
          </p>
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamFoMG1qMG80dHJudWh3NHk0N2xvcW5qajFpMDk5d2Znc2VreHBybSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YHvI6fvc1bwfrP9alV/giphy.webp"
            className="rounded-xl mb-4 mx-auto"
          />
          <button
            onClick={() => setScreen("assign")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Start Building
          </button>
        </div>
      )}

      {screen === "assign" && (
        <div className="max-w-2xl bg-white rounded-2xl p-6 shadow w-full">
          <h2 className="text-xl font-bold mb-4">
            Assign Roles to Team Members
          </h2>
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXEzOWIzbTU0dml1Nno4OWQya2oxZ2VvZDJuMXlrZDc3eTYzYjI2ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jvghPtgdGWeKksBU8O/200w.webp"
            alt="assign roles"
            className="mb-4 mx-auto rounded-xl"
          />
          <div className="grid grid-cols-2 gap-4">
            {characters.map((char) => (
              <div
                key={char.name}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(char.name)}
                className="p-4 bg-gray-50 border rounded-xl text-left"
              >
                <p className="font-semibold">{char.name}</p>
                <p className="text-sm text-gray-500">({char.skill})</p>
                <div className="mt-2 text-blue-600">
                  Assigned: {assignments[char.name] || "None"}
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg mt-6 font-medium">Drag these roles:</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {roles.map((role) => (
              <div
                key={role}
                draggable
                onDragStart={() => setDraggingRole(role)}
                className="bg-blue-200 hover:bg-blue-300 text-blue-800 px-4 py-2 rounded-xl cursor-move"
              >
                {role}
              </div>
            ))}
          </div>
          <button
            onClick={startMCQ}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Next: Quiz
          </button>
        </div>
      )}

      {screen === "mcqs" && (
        <div className="max-w-xl bg-white rounded-2xl p-6 shadow w-full">
          <img
            src={mcqs[mcqIndex].gif}
            className="rounded-xl mb-4 mx-auto"
            alt="mcq"
          />
          <h2 className="text-xl font-semibold mb-4">
            {mcqs[mcqIndex].question}
          </h2>
          <div className="space-y-3">
            {mcqs[mcqIndex].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(i)}
                className={`w-full px-4 py-2 rounded-xl border transition text-left ${selectedOption === i
                  ? i === mcqs[mcqIndex].answer
                    ? "bg-green-400 text-white"
                    : "bg-red-400 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
                disabled={selectedOption !== null}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "result" && (
        <div className="max-w-xl bg-white rounded-2xl p-6 text-center shadow">
          {score >= 5 && <Confetti width={width} height={height} />}
          <img src={gif} className="rounded-xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-2">{text}</h2>
          <p className="text-lg mb-4">Score: {score}/6</p>
          <button
            onClick={() => {
              setAssignments({});
              setScore(0);
              setMcqIndex(0);
              setScreen("intro");
              setSelectedOption(null);
              setStartTime(Date.now());
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamArchitect;
