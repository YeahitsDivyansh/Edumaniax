import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const allHours = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

export default function FocusTracker() {
  const { completeSELChallenge } = useSEL();
  const [step, setStep] = useState(1);
  const [wakeTime, setWakeTime] = useState("6 AM");
  const [sleepTime, setSleepTime] = useState("10 PM");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());
  const filteredHours = allHours.slice(
    allHours.indexOf(wakeTime),
    allHours.indexOf(sleepTime) + 1
  );

  useEffect(() => {
    if (step === 4) {
      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "SEL",
        topicName: "selfAwareness",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: durationSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: true,
      });
      setStartTime(Date.now());
    }
  }, [step]);


  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput }]);
    setTaskInput("");
  };

  const onDragStart = (task) => {
    setDraggedTask(task);
  };

  const onDrop = (hour) => {
    if (!draggedTask || schedule[hour]) return;
    const updated = { ...schedule };
    updated[hour] = draggedTask;
    setSchedule(updated);
    setTasks((t) => t.filter((item) => item.id !== draggedTask.id));
    setDraggedTask(null);
  };

  const resetPlanner = () => {
    setTasks([]);
    setSchedule({});
    setStep(1);
    setStartTime(Date.now());

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-pink-100 p-6 font-sans">
      <motion.div
        className="max-w-6xl mx-auto bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white animate-fadeIn"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-6xl font-extrabold text-center text-purple-700 mb-6 flex justify-center items-center gap-3">
          <span className="animate-bounce">⏰</span>
          <span className="tracking-wide drop-shadow-lg">Focus Tracker</span>
          <span className="animate-bounce ">⏰</span>
        </h1>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-xl animate-pulse">
              Let's Set Up Your Magical Day! <br />Choose Your Day's Start & End!
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-200 p-6 rounded-2xl shadow-xl transition-transform hover:scale-105">
                <label className="block text-xl font-semibold text-purple-800 mb-3">
                  🌤️ What time do you wake up?
                </label>
                <select
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-pink-300 shadow-inner text-lg text-purple-800 bg-white focus:ring-4 focus:ring-pink-300 transition"
                >
                  {allHours.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>



              <div className="bg-gradient-to-br from-yellow-100 via-green-100 to-blue-200 p-6 rounded-2xl shadow-xl transition-transform hover:scale-105">
                <label className="block text-xl font-semibold text-blue-700 mb-3">
                  🌛 What time do you sleep?
                </label>
                <select
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-blue-300 shadow-inner text-lg text-blue-800 bg-white focus:ring-4 focus:ring-blue-300 transition"
                >
                  {allHours.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  completeSELChallenge(1, 0); // ✅ Mark challenge as complete
                  setStep(4);
                }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 text-white font-semibold py-3 px-10 rounded-full shadow-xl transition-all duration-300 tracking-wide"
              >
                🚀 Let's Go!
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-2xl animate-bounce">
              ✍️ What Tasks Will You Do Today?
            </h2>
            <p className="text-lg sm:text-xl font-medium text-center mt-2 bg-gradient-to-r from-fuchsia-600 via-indigo-500 to-orange-400 text-transparent bg-clip-text animate-pulse">
              🎯 Add at least 5 exciting tasks to your magical planner!
            </p>


            <div className="flex gap-3 mb-6 justify-center">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="flex-1 max-w-lg bg-white/80 border-2 border-indigo-300 rounded-2xl px-5 py-3 text-lg font-medium text-indigo-800 placeholder-indigo-400 shadow-inner focus:ring-4 focus:ring-indigo-200 transition"
                placeholder="🎨 Add your task here..."
              />
              <button
                onClick={addTask}
                className="bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-transform"
              >
                ➕ Add Task
              </button>
            </div>

            {/* Show Task Cards */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  draggable
                  onDragStart={() => onDragStart(task)}
                  whileHover={{ scale: 1.08 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-gradient-to-br from-indigo-200 via-pink-200 to-yellow-200 text-indigo-900 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md cursor-grab border-2 border-indigo-300"
                >
                  {task.text}
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep(3)}
                disabled={tasks.length < 5}
                className={`py-3 px-10 rounded-full text-lg font-bold shadow-xl transition-all ${tasks.length < 5
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600 text-white hover:scale-105"
                  }`}
              >
                🗓️ Next: Plan Your Day
              </button>
            </div>

          </motion.div>
        )}


        {/* STEP 3: Day Planner */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6 animate-bounce">
              🧩 Drag & Drop Your Tasks in the time slots!
            </h2>

            {/* Task Cards */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  draggable
                  onDragStart={() => onDragStart(task)}
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-200 text-indigo-900 px-5 py-3 rounded-2xl shadow-md cursor-grab text-lg font-semibold transition-all hover:bg-indigo-300"
                >
                  {task.text}
                </motion.div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filteredHours.map((hour) => (
                <motion.div
                  key={hour}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(hour)}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl p-4 min-h-[70px] text-md font-medium border-2 transition-all ${schedule[hour]
                    ? "bg-green-100 border-green-400 text-green-800"
                    : "bg-white border-gray-300 hover:bg-yellow-100 text-gray-700"
                    }`}
                >
                  <div className="mb-1 text-sm font-bold text-purple-600">🕒 {hour}</div>
                  <div>{schedule[hour]?.text || "🧺 Drop your task here"}</div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="text-center mt-12 space-x-6">
              <button
                onClick={() => setStep(4)}
                disabled={tasks.length > 0}
                className={`py-2 px-6 rounded-full text-lg shadow-md transition-all ${tasks.length === 0
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                ✅ Done
              </button>

              <button
                onClick={resetPlanner}
                className="bg-pink-400 hover:bg-pink-500 text-white py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition-all"
              >
                🔄 Reset Planner
              </button>
            </div>
          </motion.div>
        )}


        {/* STEP 4: Final Timetable */}
        {step === 4 && (
          <motion.div
            className="mt-10 p-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-2xl border-4 border-purple-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-6 animate-pulse">
              📅 Your Timetable
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full table-fixed border border-purple-400 border-separate border-spacing-0 text-md">
                <thead>
                  <tr className="bg-purple-300 text-purple-900">
                    <th className="border border-purple-400 p-3 w-1/3">⏰ Time</th>
                    <th className="border border-purple-400 p-3">🎯 Task</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHours.map((hour, idx) => (
                    <tr key={hour} className="bg-white even:bg-purple-100 hover:bg-yellow-100 transition-all">
                      <td className="border border-purple-400 p-3 font-semibold text-purple-700">{hour}</td>
                      <td className="border border-purple-400 p-3 text-gray-800">
                        {schedule[hour]?.text || "🕳️ (Empty Slot)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-md text-pink-700 mt-6 italic animate-bounce">
              🔍 Compare your planned day with how it really went tomorrow! 🌟
            </p>
            <div className="flex justify-center">
              <button
                onClick={resetPlanner}
                className="bg-pink-400 hover:bg-pink-500 text-white mt-2 py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition-all"
              >
                🔄 Reset Planner
              </button>
            </div>

          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
