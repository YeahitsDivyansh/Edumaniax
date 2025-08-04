import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const sampleReplies = [
  "That must be frustrating. I hear you.",
  "Want to talk more about it?",
  "Maybe you’re just bad at exams.",
];

const goodPhrases = [
  "that must be", "i hear you", "want to talk", "i get it", "sounds really", "i understand"
];
const badPhrases = [
  "chill out", "not a big deal", "just bad", "stop overreacting", "deal with it"
];

const ListenerLensGame = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  const handleInputChange = (e) => {
    if (!submitted) {
      setUserResponse(e.target.value);
      setSelectedIndex(null);
    }
  };

  const handleSampleClick = (reply, index) => {
    if (!submitted) {
      setUserResponse(reply);
      setSelectedIndex(index);
    }
  };

  const checkTone = (text) => {
    const lower = text.toLowerCase();
    const isEmpathetic = goodPhrases.some(p => lower.includes(p));
    const isInsensitive = badPhrases.some(p => lower.includes(p));

    if (isInsensitive) {
      return "😟 Tone: Needs improvement – try showing more empathy.";
    } else if (isEmpathetic) {
      return "💖 Tone: Great job showing empathy and validation!";
    } else {
      return "🤔 Tone: Neutral – consider reflecting more feelings.";
    }
  };

  const handleSubmit = () => {
    const toneFeedback = checkTone(userResponse);
    setFeedback(toneFeedback);
    setSubmitted(true);

    const passed = toneFeedback.includes("Great job showing empathy");

    if (passed) {
      completeCommunicationChallenge(0, 1);

      const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
      updatePerformance({
        moduleName: "Communication",
        topicName: "communicationSkills",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: true,
         
      });
      setStartTime(Date.now());
    }
  };



  const handlePlayAgain = () => {
    setUserResponse('');
    setFeedback('');
    setSelectedIndex(null);
    setSubmitted(false);
    setStartTime(Date.now());

  };

  return (
    <div className="p-6 max-w-5xl mx-auto my-5 bg-gradient-to-br from-yellow-100 to-pink-200 rounded-xl shadow-lg text-center">
      <motion.h1
        className="text-4xl font-extrabold mb-4 text-purple-700 drop-shadow-sm"
        animate={{ opacity: [0.8, 1], scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✨🎧 Challenge 2: The Listener’s Lens 💡💬
      </motion.h1>

      <motion.p
        className="text-center text-purple-800 mb-6 text-lg font-medium bg-yellow-100 px-4 py-3 rounded-xl shadow-sm border-l-4 border-yellow-400"
        animate={{ opacity: [0.9, 1], y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        👀 Watch the scene closely and reply like a <span className="font-bold">super listener</span> 🦻💖
      </motion.p>

      <div className="bg-white border-2 border-purple-300 p-5 rounded-xl mb-6 shadow-md text-left">
        <video
          className="rounded-xl shadow-lg w-full mb-4"
          controls
          src="./ai_video.mp4"
        />
        <p className="text-center text-lg font-semibold text-purple-700 mb-4">
          🎧 What would you say in response?
        </p>
      </div>

      <p className="font-bold text-lg mb-3 text-purple-700 text-center">
        🌟 Pick or Write a Kind Reply!
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {sampleReplies.map((reply, index) => (
          <motion.div
            key={index}
            onClick={() => handleSampleClick(reply, index)}
            className={`cursor-pointer px-5 py-3 rounded-full text-md font-semibold border-4 shadow-sm transition-all text-center 
              ${selectedIndex === index
                ? "bg-lime-200 text-lime-900 border-lime-400"
                : "bg-white hover:bg-pink-100 text-purple-700 border-purple-300"
              }`}
            whileHover={{ scale: 1.05 }}
          >
            💌 {reply}
          </motion.div>
        ))}
      </div>

      <div className="relative mb-4">
        <label className="text-purple-800 font-semibold block mb-2 text-md">
          🖊️ Or type your own sweet reply:
        </label>
        <textarea
          rows="4"
          value={userResponse}
          onChange={handleInputChange}
          disabled={submitted}
          placeholder="💭 Type something kind and thoughtful..."
          className="w-full p-4 rounded-xl border-4 border-yellow-300 bg-yellow-50 focus:outline-none focus:ring-4 focus:ring-pink-200 text-purple-700 shadow-sm placeholder-purple-400 transition-all"
        />
      </div>

      {!submitted && userResponse && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all"
        >
          ✅ Submit
        </button>
      )}

      {submitted && (
        <>
          <motion.div
            className="mt-6 p-4 rounded-xl bg-white border-4 border-purple-300 shadow-lg flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <motion.div
              className="text-4xl mb-2"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 1.2 }}
            >
              🎉
            </motion.div>

            <motion.p
              className="text-xl font-bold text-purple-700 text-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {feedback}
            </motion.p>
          </motion.div>

          <motion.button
            onClick={handlePlayAgain}
            className="mt-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full font-bold shadow-md hover:from-green-500 hover:to-green-700 transition-all"
            whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
            whileTap={{ scale: 0.95 }}
          >
            🔁 Play Again & Try a New Reply!
          </motion.button>
        </>

      )}
    </div>
  );
};

export default ListenerLensGame;
