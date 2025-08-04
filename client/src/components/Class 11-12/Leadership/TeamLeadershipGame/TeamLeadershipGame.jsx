import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardList } from "lucide-react";
import toast from "react-hot-toast";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const teammates = [
  {
    id: 1,
    name: "Arjun",
    primary: "Design",
    secondary: "Marketing",
    motivation: 7,
  },
  {
    id: 2,
    name: "Priya",
    primary: "Tech",
    secondary: "Strategy",
    motivation: 9,
  },
  {
    id: 3,
    name: "Kabir",
    primary: "Marketing",
    secondary: "Design",
    motivation: 6,
  },
  {
    id: 4,
    name: "Meera",
    primary: "Strategy",
    secondary: "Tech",
    motivation: 8,
  },
  {
    id: 5,
    name: "Anaya",
    primary: "Design",
    secondary: "Strategy",
    motivation: 5,
  },
  {
    id: 6,
    name: "Rohan",
    primary: "Tech",
    secondary: "Marketing",
    motivation: 7,
  },
];

const tasks = [
  { id: 1, name: "Landing Page", required: "Design" },
  { id: 2, name: "Campaign Planning", required: "Marketing" },
  { id: 3, name: "App Debugging", required: "Tech" },
  { id: 4, name: "Strategy Deck", required: "Strategy" },
];

export default function TeamLeadershipGame() {
  const { completeLeadershipChallenge } = useLeadership();
  const [assignments, setAssignments] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [draggedTeammate, setDraggedTeammate] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (submitted && percent >= 75) {
      const totalTimeMs = Date.now() - startTime;
      const scaledScore = Math.round((totalScore / maxScore) * 10);

      updatePerformance({
        moduleName: "Leadership",
        topicName: "theStrategist",
        score: scaledScore, // out of 10
        accuracy: percent, // already out of 100
        avgResponseTimeSec: parseFloat((totalTimeMs / (tasks.length * 1000)).toFixed(2)),
        studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
        completed: true,
      });
      setStartTime(Date.now());
      completeLeadershipChallenge(1, 2);
      setScoreSent(true);
    }
  }, [submitted, percent]);

  const getResult = (task) => {
    const teammateId = assignments[task.id];
    const mate = teammates.find((t) => t.id === teammateId);
    if (!mate) return { quality: 0, speed: 0, morale: 0 };
    const isPrimary = mate.primary === task.required;
    const isSecondary = mate.secondary === task.required;
    const quality = isPrimary ? 5 : isSecondary ? 3 : 1;
    const speed = mate.motivation >= 8 ? 5 : mate.motivation >= 6 ? 3 : 1;
    const morale = isPrimary ? 5 : isSecondary ? 3 : 2;
    return { quality, speed, morale };
  };

  const totalScore = tasks.reduce((acc, task) => {
    const r = getResult(task);
    return acc + r.quality + r.speed + r.morale;
  }, 0);
  const maxScore = tasks.length * 15;
  const percent = Math.round((totalScore / maxScore) * 100);



  const getAssignmentCount = (id) => {
    return Object.values(assignments).filter((val) => val === id).length;
  };

  const handleDrop = (taskId) => {
    if (!draggedTeammate) return;

    const count = getAssignmentCount(draggedTeammate.id);

    if (count >= 2) {
      toast.error(`${draggedTeammate.name} can't take more than 2 tasks! 🛑`, {
        icon: "⚠️",
        style: {
          borderRadius: "1rem",
          background: "#fff3f3",
          color: "#b91c1c",
          fontWeight: "bold",
        },
      });
      return;
    }

    setAssignments({ ...assignments, [taskId]: draggedTeammate.id });
  };

  const handleSubmit = () => {
    if (Object.keys(assignments).length < tasks.length) return;
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    setSubmitted(true);
  };

  const resetGame = () => {
    setAssignments({});
    setSubmitted(false);
    setShowIntro(true);
    setDraggedTeammate(null);
    setStartTime(Date.now());
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };

  const canSubmit = Object.keys(assignments).length === tasks.length;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-text-glow flex items-center justify-center gap-4"
      >
        <ClipboardList className="text-pink-600 w-8 h-8 animate-bounce" />
        <span className="tracking-wider">Team Architect Simulation</span>
        <ClipboardList className="text-pink-600 w-8 h-8 animate-bounce" />
      </motion.h1>

      {showIntro ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-3xl shadow-xl max-w-2xl mx-auto text-center border-4 border-yellow-200"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            🎮 Welcome to the Challenge!
          </h2>
          <p className="text-md text-gray-800 mb-4 font-medium leading-relaxed">
            🚀 <strong>How to Play:</strong> Drag teammates to the tasks that
            match their strengths.
            <br />
            🎯 Each teammate has unique{" "}
            <span className="text-purple-600 font-semibold">
              Primary
            </span> and{" "}
            <span className="text-pink-500 font-semibold">Secondary</span>{" "}
            skills.
            <br />❗ Remember: No one can take more than{" "}
            <span className="font-bold">2 tasks</span>.
            <br />✅ Once all tasks are assigned, hit{" "}
            <span className="text-green-600 font-semibold">Submit</span> to see
            your results and earn your badge!
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md"
          >
            🚀 Start Game
          </button>
        </motion.div>
      ) : (
        <>
          {!submitted && (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6 ">
                <div className="bg-white p-5 rounded-3xl border-4 border-purple-300 shadow-xl">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl text-center justify-center font-extrabold text-pink-600 mb-6 flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      👩‍💻
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      Virtual Teammates
                    </motion.span>
                  </motion.h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teammates.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-3xl bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 p-4 shadow-md border-2 border-purple-200 transition-transform hover:scale-105 cursor-grab active:cursor-grabbing"
                        draggable
                        onDragStart={() => setDraggedTeammate(t)}
                      >
                        <h4 className="text-lg font-bold text-purple-700 mb-2">
                          {t.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-1">
                          🎯 <strong>Primary Skill:</strong> {t.primary}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          🧩 <strong>Secondary Skill:</strong> {t.secondary}
                        </p>
                        <p className="text-sm text-gray-700">
                          ⚡ <strong>Motivation Level:</strong> {t.motivation}
                          /10
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border-4 border-lime-300 shadow-xl">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-extrabold text-green-600 mb-6 flex items-center justify-center gap-2 text-center"
                  >
                    <motion.span
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      🧩
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      Assign Tasks
                    </motion.span>
                  </motion.h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(task.id)}
                        className="bg-gradient-to-br from-yellow-100 via-pink-50 to-white p-5 rounded-full border-2 border-purple-300 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <label className="block text-lg font-bold text-purple-700 mb-2 text-center">
                          📝 {task.name}
                        </label>
                        <p className="text-sm text-gray-700 font-medium text-center mb-3">
                          🎯 Needs:{" "}
                          <span className="font-semibold text-pink-600">
                            {task.required}
                          </span>
                        </p>

                        <div className="p-3 rounded-full bg-white border-2 border-dashed border-purple-400 min-h-[50px] text-center text-md font-semibold text-purple-600">
                          {assignments[task.id]
                            ? teammates.find(
                              (t) => t.id === assignments[task.id]
                            )?.name
                            : "😃 Drag a teammate here"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`mt-1 px-8 py-3 rounded-full font-bold shadow-md text-white transition-all ${canSubmit
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  ✅ Submit Delegation
                </button>
              </div>
            </>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-[2rem] shadow-2xl text-center mt-10 border-4 border-yellow-300 max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-extrabold text-purple-700 mb-2 animate-pulse">
                🎯 Your Team's Performance
              </h2>
              <p className="text-md text-gray-700 mb-6">
                Your delegation decisions shaped the team's outcomes. Here's how
                you did:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-left text-sm text-gray-800">
                {tasks.map((task) => {
                  const r = getResult(task);
                  return (
                    <div
                      key={task.id}
                      className="bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-4 rounded-2xl border-2 border-purple-200 shadow hover:scale-[1.02] transition-transform"
                    >
                      <h4 className="font-bold text-purple-700 text-lg mb-2">
                        📝 {task.name}
                      </h4>
                      <p>
                        ✨ <strong>Quality:</strong> {r.quality}/5
                      </p>
                      <p>
                        ⚡ <strong>Speed:</strong> {r.speed}/5
                      </p>
                      <p>
                        😊 <strong>Morale:</strong> {r.morale}/5
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <p className="text-xl font-bold text-blue-700">
                  📊 Total Score:{" "}
                  <span className="text-purple-700">{percent}%</span>
                </p>

                {percent >= 75 ? (
                  <div className="mt-4 text-2xl font-bold text-green-600 flex items-center justify-center gap-2 animate-bounce">
                    🏆 Badge Earned:{" "}
                    <span className="underline text-yellow-600">
                      Team Strategist
                    </span>
                  </div>
                ) : (
                  <p className="mt-4 text-md text-gray-600">
                    🎯 Keep practicing your leadership to earn the badge!
                  </p>
                )}
              </div>

              <button
                onClick={resetGame}
                className="mt-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all"
              >
                🔁 Play Again
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
