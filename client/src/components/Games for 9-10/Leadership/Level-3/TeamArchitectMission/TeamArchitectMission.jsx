import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const teamMembers = [
  {
    id: 1,
    name: "Aisha",
    strengths: ["Organized", "Timely"],
    avatar: "🗂️",
    correctRole: "coordinator",
  },
  {
    id: 2,
    name: "Rohan",
    strengths: ["Creative", "Visual"],
    avatar: "🎨",
    correctRole: "designer",
  },
  {
    id: 3,
    name: "Mehul",
    strengths: ["Analytical", "Logical"],
    avatar: "📊",
    correctRole: "analyst",
  },
  {
    id: 4,
    name: "Tara",
    strengths: ["Empathetic", "Supportive"],
    avatar: "💬",
    correctRole: "mentor",
  },
];

const roles = [
  { id: "coordinator", title: "Team Coordinator" },
  { id: "designer", title: "Brand Designer" },
  { id: "analyst", title: "Data Lead" },
  { id: "mentor", title: "Peer Mentor" },
];

const TeamArchitectMission = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [assignments, setAssignments] = useState({});
  const [step, setStep] = useState("intro");
  const [result, setResult] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (!result) return;

    const totalTimeMs = Date.now() - startTime;

    // Count how many assignments are correct
    let correctCount = 0;
    for (const roleId in assignments) {
      if (assignments[roleId]?.correctRole === roleId) {
        correctCount++;
      }
    }

    const totalRoles = Object.keys(assignments).length;
    const score = Math.round((correctCount / totalRoles) * 10); // score out of 10
    const accuracy = score * 10; // assuming 1:1 mapping here
    const avgResponseTimeSec = parseFloat((totalTimeMs / totalRoles / 1000).toFixed(2));
    const studyTimeMinutes = parseFloat((totalTimeMs / 60000).toFixed(2));
    const completed = correctCount === totalRoles;

    updatePerformance({
      moduleName: "Leadership",
      topicName: "theStrategist",
      score,
      accuracy,
      avgResponseTimeSec,
      studyTimeMinutes,
      completed,
       
    });
    setStartTime(Date.now());

  }, [result]);


  const handleDrop = (roleId, member) => {
    setAssignments((prev) => ({ ...prev, [roleId]: member }));
  };

  const isAssigned = (id) =>
    Object.values(assignments).some((m) => m.id === id);

  const handleSubmit = () => {
    let allCorrect = true;
    for (const roleId in assignments) {
      if (assignments[roleId].correctRole !== roleId) {
        allCorrect = false;
        break;
      }
    }
    setResult(allCorrect ? "correct" : "incorrect");
    if (allCorrect) {
      confetti();
      completeLeadershipChallenge(2, 1); // ✅ Mark challenge as complete
    }
  };

  const handleReset = () => {
    setAssignments({});
    setResult(null);
    setStartTime(Date.now());

  };

  if (step === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM2a2RsZzBhOHRqb21sdmFibTdvMHBpZXBucDJmejluZGpudnRmZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Rsp9jLIy0VZOKlZziw/giphy.webp"
          className="w-80 mb-6 rounded-lg"
        />
        <h1 className="text-3xl font-bold mb-2">🏗️ Team Architect Mission</h1>
        <p className="max-w-xl text-gray-600 mb-4">
          Assign each team member to the role that best suits their strengths.
          Use the drag-and-drop grid, then submit to see how your team performs.
          You'll earn the <strong>Team Strategist</strong> badge if your choices
          match perfectly!
        </p>
        <button
          onClick={() => setStep("game")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          ▶️ Play Game
        </button>
      </div>
    );
  }

  if (result === "correct") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50 text-center">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3NzazkxbWhjcXY1amtmdGE4MzY5em52c2NsNG1kcjBtM3QwYWZ1ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT1XGwZ2FhCBloPgxW/200.webp"
          className="w-64 mb-6 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          🎉 Perfect Team! You’re a Team Strategist!
        </h2>
        <button
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg"
          onClick={() => (window.location.href = "/bias-detective")}
        >
          🚀 Move to Next Game
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">🏗️ Team Architect Mission</h1>
      <p className="mb-6 text-gray-600">
        Drag team members into the role you think suits them best.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {teamMembers.map((member) =>
          isAssigned(member.id) ? null : (
            <div
              key={member.id}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("member", JSON.stringify(member))
              }
              className="p-4 bg-white shadow-md rounded-lg w-48 cursor-grab"
            >
              <div className="text-4xl">{member.avatar}</div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-sm text-gray-500">
                {member.strengths.join(", ")}
              </p>
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
        {roles.map((role) => (
          <div
            key={role.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = JSON.parse(e.dataTransfer.getData("member"));
              handleDrop(role.id, data);
            }}
            className="bg-white p-4 h-32 border-2 border-dashed rounded-lg flex items-center justify-center shadow-inner"
          >
            {assignments[role.id] ? (
              <div className="text-center">
                <div className="text-2xl">{assignments[role.id].avatar}</div>
                <div className="font-semibold">{assignments[role.id].name}</div>
              </div>
            ) : (
              <span className="text-gray-400 italic">
                Drop here: {role.title}
              </span>
            )}
          </div>
        ))}
      </div>

      {Object.keys(assignments).length === roles.length && !result && (
        <button
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={handleSubmit}
        >
          ✅ Submit Team
        </button>
      )}

      {result === "incorrect" && (
        <div className="mt-8 text-center">
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3I5OHh0Z3Bua2E3MzE3cXZ6ZDdhZW16cHdyZWVtdnpqeHkzczU2eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12ey1CgA3uTqfK/200w.webp"
            className="w-56 mx-auto rounded-md mb-4"
          />
          <p className="text-red-600 font-semibold">
            Oops! Some roles don’t match their strengths.
          </p>
          <button
            className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg"
            onClick={handleReset}
          >
            🔄 Change Roles
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamArchitectMission;
