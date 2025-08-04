import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const initialScenarios = [
  {
    id: 1,
    text: '🗣️ A student whispers something during class. The other person doesn’t respond.',
    correctLabel: 'Feedback',
    dropTarget: '🧩 Missing Element',
    userAnswer: ''
  },
  {
    id: 2,
    text: '🤷‍♂️ A boy shrugs silently after being asked a question.',
    correctLabel: 'Non-verbal cue',
    dropTarget: '🔍 Type of communication',
    userAnswer: ''
  },
  {
    id: 3,
    text: '📜 A class announcement is written in French, and half the students don’t understand.',
    correctLabel: 'Message',
    dropTarget: '🚫 Barrier or broken element',
    userAnswer: ''
  },
  {
    id: 4,
    text: '📩 A student reads a note but doesn’t realize it’s meant for them.',
    correctLabel: 'Receiver',
    dropTarget: '🚫 Broken element',
    userAnswer: ''
  },
  {
    id: 5,
    text: '📧 A teacher emails a student, but the email ends up in the spam folder.',
    correctLabel: 'Medium',
    dropTarget: '🚫 Broken element',
    userAnswer: ''
  },
];

const labels = ['📤 Sender', '📜 Message', '📡 Medium', '🎯 Receiver', '🔁 Feedback', '🤫 Non-verbal cue'];

const DecodetheMessage = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [draggedLabel, setDraggedLabel] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    const allCorrect = scenarios.every(
      (s) => s.userAnswer.replace(/^[^a-zA-Z]+/, '') === s.correctLabel
    );

    if (allCorrect) {
      completeCommunicationChallenge(0, 0);

      const correctCount = scenarios.length; // 5
      const score = Math.round((correctCount / 5) * 10); // out of 10
      const accuracy = Math.round((correctCount / 5) * 100); // out of 100
      const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

      updatePerformance({
        moduleName: "Communication",
        topicName: "communicationSkills",
        score,
        accuracy,
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: true,

      });
      setStartTime(Date.now());

    }
  }, [scenarios]);


  const handleReplay = () => {
    setScenarios(initialScenarios); // Reset all answers
    setDraggedLabel(null);          // Clear drag state
    setStartTime(Date.now());

  };

  const handleDrop = (scenarioId) => {
    if (!draggedLabel) return;
    setScenarios((prev) =>
      prev.map((sc) =>
        sc.id === scenarioId ? { ...sc, userAnswer: draggedLabel } : sc
      )
    );
    setDraggedLabel(null);
  };

  const isCorrect = (scenario) => scenario.userAnswer.replace(/^[^a-zA-Z]+/, '') === scenario.correctLabel;

  const allAnswered = scenarios.every((s) => s.userAnswer);

  return (
    <div className="p-6 max-w-5xl my-4 mx-auto text-center bg-gradient-to-tr from-yellow-100 to-pink-100 rounded-xl shadow-xl">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 1, -1, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🌟 COMMUNICATION CADET 🚀
      </motion.h1>
      <motion.p
        className="mb-6 text-lg md:text-xl text-yellow-700 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ✨ Drag & drop the right element to complete each magical communication mission!
      </motion.p>

      <motion.h2
        className="mt-10 text-2xl font-bold text-pink-600 drop-shadow-md"
        animate={{ rotate: [0, 1, -1, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        🎯 Ready, Set, Drag a Label! ⬇️
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {labels.map((label, i) => (
          <motion.div
            key={label}
            draggable
            onDragStart={() => setDraggedLabel(label)}
            className="cursor-grab px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white text-base font-bold rounded-full shadow-lg transform hover:scale-110 hover:rotate-1 transition-all duration-300"
            whileHover={{ scale: 1.15 }}
            animate={{ y: [0, -4, 0], rotate: [0, 1, -1, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: i * 0.1 }}
          >
            {label}
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <motion.div
            key={scenario.id}
            className="relative border-4 border-pink-300 bg-gradient-to-br from-white via-yellow-50 to-pink-100 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(scenario.id)}
            whileHover={{ scale: 1.03, rotate: [0, 1, -1, 0] }}
          >
            <div className="absolute top-0 right-0 bg-purple-200 text-purple-800 px-3 py-1 rounded-bl-2xl text-sm font-bold shadow-sm">
              ✏️ Scenario {scenario.id}
            </div>
            <p className="mb-4 text-left text-base md:text-lg font-semibold text-purple-900 leading-relaxed">
              {scenario.text}
            </p>
            <div className="border-dashed border-2 border-indigo-400 bg-blue-50 p-4 rounded-2xl h-16 flex items-center justify-center transition-all hover:bg-indigo-100">
              {scenario.userAnswer ? (
                <motion.span
                  className={`font-bold text-lg ${isCorrect(scenario) ? 'text-green-600' : 'text-red-500'
                    }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {scenario.userAnswer}
                </motion.span>
              ) : (
                <motion.span
                  className="text-indigo-500 font-medium italic"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🎯 Drop here 👉 {scenario.dropTarget}
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>




      {allAnswered && (
        <motion.div
          className="mt-10 p-6 bg-white border-4 border-green-300 rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-extrabold text-green-600 mb-4">
            🎉 Great Job Cadet! Communication Cycle Complete!
          </h3>
          <p className="mb-6 text-gray-700 font-medium">
            Here's a recap of all your missions with the correct answers:
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                className="bg-gradient-to-br from-pink-50 to-yellow-50 p-4 rounded-xl shadow-md border-l-4 border-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="mb-2 text-base font-semibold text-purple-800">
                  {scenario.text}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Your Answer: {scenario.userAnswer}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${isCorrect(scenario)
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                      }`}
                  >
                    Correct Answer: {scenario.correctLabel}
                  </span>
                </div>


              </motion.div>

            ))}
          </div>

          <p className="mt-6 text-sm text-gray-500 italic">
            🚀 Keep learning, Cadet! Communication is your superpower!
          </p>


          <button
            onClick={handleReplay}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-lg font-bold rounded-full shadow-md hover:shadow-xl transition transform hover:scale-105"
          >
            🔄 Replay Game
          </button>
        </motion.div>
      )}

    </div>
  );
};

export default DecodetheMessage;