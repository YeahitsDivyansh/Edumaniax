import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const floatAnim = {
  animate: {
    y: [0, -8, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 1.5,
    },
  },
};


const DigitalDilemma = () => {
  const { completeCommunicationChallenge } = useCommunication();
  const [rewrite, setRewrite] = useState("");
  const [emoji, setEmoji] = useState("None");
  const [clarification, setClarification] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (score !== null) {
      const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

      updatePerformance({
        moduleName: "Communication",
        topicName: "emotionalIntelligence",
        score: Math.round((score / 7) * 10), // Score out of 10
        accuracy: Math.round((score / 7) * 100),
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: score >= 6,
        
      });
      setStartTime(Date.now());


      if (score >= 6 && !challengeCompleted) {
        completeCommunicationChallenge(1, 1);
        setChallengeCompleted(true);
      }
    }
  }, [score]);



  const handleSubmit = () => {
    let points = 0;

    if (/sorry|didn['’]t mean|apolog|not my intention/i.test(rewrite)) points += 3;
    if (emoji === "😊" || emoji === "❤️") points += 2;
    if (/sorry|just meant|i meant|i was trying|i really/i.test(clarification)) points += 2;

    setScore(points);
    setFeedback(getFeedback(points));
  };

  const handleReset = () => {
    setRewrite("");
    setEmoji("None");
    setClarification("");
    setScore(null);
    setFeedback("");
    setStartTime(Date.now());

  };

  const getFeedback = (pts) => {
    if (pts >= 7) return "🌟 Super Star! You showed awesome empathy!";
    if (pts >= 5) return "😊 Great try! You're on your way to kindness mastery!";
    return "💡 Oops! Let’s try again with more kindness and care!";
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto my-5 p-10 sm:p-12 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-3xl shadow-[0_10px_30px_rgba(255,173,210,0.4)] border-[6px] border-purple-300 transition-all duration-700"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Dancing Title */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-4 text-center"
        initial={{ scale: 0.8, rotate: -3 }}
        animate={{ scale: 1.05, rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        🎉 Digital Dilemma Challenge!
      </motion.h2>

      {/* Wiggling Subheading */}
      <motion.p
        className="text-lg sm:text-xl text-purple-800 mb-6 text-center font-semibold"
        variants={floatAnim}
        animate="animate"
      >
        📱 Uh-oh! Your friend felt hurt by your message:<br />
        <motion.span className="text-red-500 font-bold text-2xl inline-block mt-1 animate-pulse">"Whatever."</motion.span><br />
        Can you fix it using kindness and emojis?
      </motion.p>

      {/* Rewrite */}
      <label className="block mb-2 text-purple-800 font-bold tracking-wide">✍️ Rewrite the message using kind words:</label>
      <motion.textarea
        className="w-full p-3 rounded-xl border-4 border-purple-300 bg-white text-purple-900 shadow-lg mb-4 text-base"
        whileFocus={{ scale: 1.02 }}
        value={rewrite}
        onChange={(e) => setRewrite(e.target.value)}
        placeholder="Use kind words to rewrite the message..."
      />

      {/* Emoji Picker */}
      <label className="block mb-2 text-blue-700 font-bold tracking-wide">😀 Choose an emoji to help express your tone:</label>
      <motion.select
        className="w-full p-3 rounded-xl border-4 border-blue-300 bg-white text-blue-900 shadow-lg mb-4 text-base"
        whileFocus={{ scale: 1.02 }}
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      >
        <option value="None">🚫 None</option>
        <option value="🙁">🙁 Sad Face</option>
        <option value="😊">😊 Smile</option>
        <option value="❤️">❤️ Heart</option>
      </motion.select>

      {/* Clarification */}
      <label className="block mb-2 text-green-700 font-bold tracking-wide">💬 Clarify what you meant in a kind way:</label>
      <motion.textarea
        className="w-full p-3 rounded-xl border-4 border-green-300 bg-white text-green-900 shadow-lg mb-6 text-base"
        whileFocus={{ scale: 1.02 }}
        value={clarification}
        onChange={(e) => setClarification(e.target.value)}
        placeholder="Add a short explanation or apology..."
      />

      {!score && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:from-pink-500 hover:to-yellow-500 transition"
        >
          🚀 Submit Your Kind Message
        </motion.button>
      )}

      {score !== null && (
        <>
          <motion.div
            className="mt-6 p-4 bg-white rounded-2xl border-4 border-blue-300 text-center shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-extrabold text-green-600 mb-2">🎯 Your Score: {score} / 7</h3>
            <p className="text-lg text-gray-800">{feedback}</p>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="mt-4 w-full py-3 bg-yellow-300 text-purple-900 font-bold rounded-full shadow hover:bg-yellow-400 transition"
          >
            🔁 Play Again
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default DigitalDilemma;
