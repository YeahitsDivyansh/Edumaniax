import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Meyda from "meyda";
import axios from "axios";
import SpeakingAnimation from "@/components/SpeakingAnimation";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const APIKEY = import.meta.env.VITE_API_KEY;

export default function TheBigSpeech() {
  const { completeCommunicationChallenge } = useCommunication();
  const [step, setStep] = useState(1);
  const [cause, setCause] = useState("");
  const [hook, setHook] = useState("");
  const [point1, setPoint1] = useState("");
  const [point2, setPoint2] = useState("");
  const [action, setAction] = useState("");
  const [recording, setRecording] = useState(null);
  const [feedback1, setFeedback1] = useState(null);
  const [feedback2, setFeedback2] = useState(null);
  const [score2, setScore2] = useState(0);
  const [totalScore, setTotalScore] = useState(null);
  const [loading, setLoading] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const videoRef = useRef();
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const analyzerRef = useRef(null);

  useEffect(() => {
    if (totalScore >= 7) {
      completeCommunicationChallenge(2, 1);
    }
  }, [totalScore]);

  // Step 1: Text Analysis (Gemini)
  const handleTextSubmit = async () => {
    if (!cause || !hook || !point1 || !point2 || !action) {
      alert("Please fill all fields.");
      return;
    }

    const prompt = `
You're a speech evaluator. Rate this speech .

Speech Details:
Cause: ${cause}
Hook: ${hook}
Point1: ${point1}
Point2: ${point2}
CallToAction: ${action}

Give score out of 7:
- Structure (3): All 3 parts clearly present.
- Clarity (2): Easy to follow and logical flow.
- Tone (2): Passionate, persuasive voice.

Only give full marks if it's clearly excellent.

Give 2–3 specific improvement tips (max 20 words each).Respond in JSON like: {"structure":3,"clarity":2,"tone":2, "tips": ["Tip 1...", "Tip 2..."]}
`;

    setLoading(true);
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      );
      const jsonText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/```json|```/g, "");
      const data = JSON.parse(jsonText.trim());
      setFeedback1(data);
      setStep(2);
    } catch (err) {
      alert("Gemini API error.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Audio Analysis (Meyda)
  const analyzeAudio = () => {
    if (!videoRef.current) return;
    setLoading(true);

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      sourceRef.current = audioCtxRef.current.createMediaElementSource(videoRef.current);
    }

    if (analyzerRef.current) {
      analyzerRef.current.stop();
      analyzerRef.current = null;
    }

    const feats = [];
    analyzerRef.current = Meyda.createMeydaAnalyzer({
      audioContext: audioCtxRef.current,
      source: sourceRef.current,
      bufferSize: 512,
      featureExtractors: ["rms", "zcr", "spectralCentroid"],
      callback: (f) => feats.push(f),
    });

    analyzerRef.current.start();
    videoRef.current.play();

    setTimeout(() => {
      analyzerRef.current.stop();
      videoRef.current.pause();

      const count = feats.length;
      const avg = feats.reduce(
        (a, f) => {
          a.rms += f.rms;
          a.zcr += f.zcr;
          a.spectralCentroid += f.spectralCentroid;
          return a;
        },
        { rms: 0, zcr: 0, spectralCentroid: 0 }
      );
      avg.rms /= count;
      avg.zcr /= count;
      avg.spectralCentroid /= count;

      // 🔄 Adjusted thresholds
      const vol = avg.rms > 0.02; // was 0.05 — now more fair
      const pace = avg.zcr > 0.07; // was 0.1 — slightly easier
      const conf = avg.spectralCentroid > 1500; // was 1800 — more lenient

      let pts = 0;
      if (vol) pts++;
      if (pace) pts++;
      if (conf) pts++;

      setFeedback2({
        volume: vol ? "✅ Clear volume" : "🔇 Speak a bit louder",
        pacing: pace ? "✅ Good pace" : "🐢 Could be faster",
        confidence: conf ? "✅ Confident tone" : "😐 Add more energy",
      });

      setScore2(pts);
      setStep(3);
      setLoading(false);
    }, 5000);
  };

  const finalize = () => {
    const total = feedback1.structure + feedback1.clarity + feedback1.tone + score2;
    setTotalScore(total);
    setStep(4);

    const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

    updatePerformance({
      moduleName: "Communication",
      topicName: "interpersonalSkills",
      score: total,
      accuracy: (total / 10) * 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: Math.ceil(timeTakenSec / 60),
      completed: total >= 7, // Mark completed if good score
      
    });
    setStartTime(Date.now());

  };


  const restart = () => {
    setCause("");
    setHook("");
    setPoint1("");
    setPoint2("");
    setAction("");
    setRecording(null);
    setFeedback1(null);
    setFeedback2(null);
    setTotalScore(null);
    setScore2(0);
    setStep(1);
    setStartTime(Date.now());

  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-8 rounded-3xl shadow-2xl border border-indigo-500 backdrop-blur-md">

      <motion.h1
        className="text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 mb-6 tracking-widest drop-shadow-[0_0_0.5rem_#9333ea] pb-5"
        animate={{
          scale: [1, 1.07, 1],
          rotate: [0, 1.5, -1.5, 0],
          opacity: [0.9, 1, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        🎤 The Big Speech
      </motion.h1>

      <SpeakingAnimation />

      {/* Instructions */}
      <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl mb-6 text-sm text-indigo-200 border border-indigo-400">
        <p>📝 <strong>Step 1:</strong> Choose your cause, select a hook, write 2 strong points, and a powerful call to action.</p>
        <p>🎥 <strong>Step 2:</strong> Upload a short 2-minute video of you delivering the speech.</p>
        <p>🏆 <strong>Step 3:</strong> Get feedback on your structure, clarity, tone, and delivery—and view your score out of 10!</p>
      </div>



      {/* Step 1 Form */}
      {step === 1 && (
        <div className="space-y-5">
          <label className="block font-semibold text-indigo-200 text-lg">
            🌟 Choose a Cause
          </label>
          <select
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            className="w-full p-3 rounded-xl border border-indigo-500 bg-gray-900 text-indigo-100 shadow-inner"
          >
            <option value="">Select...</option>
            <option value="Mental Health Week">Mental Health Week</option>
            <option value="Plastic-Free Campaign">Plastic-Free Campaign</option>
            <option value="Canteen Upgrade">Canteen Upgrade</option>
          </select>

          <label className="block font-semibold text-indigo-200 text-lg">
            🎯 Choose a Hook (How will you start?)
          </label>
          <select
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            className="w-full p-3 rounded-xl border border-indigo-500 bg-gray-900 text-indigo-100 shadow-inner"
          >
            <option value="">Choose...</option>
            <option value="Quote">Quote</option>
            <option value="Story">Story</option>
            <option value="Question">Question</option>
          </select>

          <label className="block font-semibold text-indigo-200 text-lg">
            💡 Strong Point 1
          </label>
          <input
            value={point1}
            onChange={(e) => setPoint1(e.target.value)}
            className="w-full p-3 rounded-xl border border-pink-500 bg-gray-800 text-white"
            placeholder="Your first main idea..."
          />

          <label className="block font-semibold text-indigo-200 text-lg">
            💬 Strong Point 2
          </label>
          <input
            value={point2}
            onChange={(e) => setPoint2(e.target.value)}
            className="w-full p-3 rounded-xl border border-pink-500 bg-gray-800 text-white"
            placeholder="Your second main idea..."
          />

          <label className="block font-semibold text-indigo-200 text-lg">
            📣 Call to Action
          </label>
          <input
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-500 bg-gray-800 text-white"
            placeholder="What do you want people to do?"
          />

          <button
            onClick={handleTextSubmit}
            className="mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:brightness-110 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            ✅ Submit Your Speech
          </button>
          {loading && (
            <motion.p
              className="text-center text-indigo-300 font-semibold animate-pulse mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              ⏳ Analyzing ...
            </motion.p>
          )}
        </div>
      )}

      {step === 2 && (
        <>
          <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-400 to-purple-400 tracking-wide mb-4 drop-shadow-md">
            📤 Upload Your Speech Video
          </h2>

          {/* Custom File Upload */}
          <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-800 rounded-2xl border-2 border-dashed border-indigo-400 cursor-pointer hover:border-pink-500 transition duration-300 ease-in-out">
            <span className="text-indigo-200 font-medium text-sm mb-2">Click or drag your video file here</span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setRecording(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
            <span className="text-xs text-indigo-400">Accepted: MP4, WebM, MOV</span>
          </label>
          {/* Video Preview */}
          {recording && (
            <motion.video
              ref={videoRef}
              src={recording}
              controls
              className="w-full mt-6 rounded-2xl border border-purple-500 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {/* Analyze Button */}
          <motion.button
            onClick={analyzeAudio}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:brightness-110 text-white text-lg font-semibold py-3 rounded-full shadow-lg tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            🎧 Analyze Delivery
          </motion.button>
          {/* Loading Text */}
          {loading && (
            <motion.p
              className="text-center text-indigo-200 font-semibold mt-4 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              ⏳ Analyzing...
            </motion.p>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <div className="mt-6 p-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-3xl shadow-xl border border-indigo-500 text-indigo-100">

            {/* Text Feedback Section */}
            <h3 className="text-2xl font-bold text-pink-300 mb-3 tracking-wide">
              📝 Text Feedback
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-semibold text-indigo-300">Structure:</span> {feedback1.structure}/3
              </li>
              <li>
                <span className="font-semibold text-indigo-300">Clarity:</span> {feedback1.clarity}/2
              </li>
              <li>
                <span className="font-semibold text-indigo-300">Tone:</span> {feedback1.tone}/2
              </li>
            </ul>

            {/* Improvement Tips */}
            {Array.isArray(feedback1.tips) && (
              <div className="mt-4">
                <p className="text-pink-400 font-semibold mb-1">💡 Tips to Improve:</p>
                <ul className="list-disc list-inside text-sm text-indigo-200 space-y-1 ml-2">
                  {feedback1.tips.map((tip, idx) => (
                    <li key={idx} className="leading-snug">{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Delivery Feedback Section */}
            <h3 className="text-2xl font-bold text-green-300 mt-6 mb-3 tracking-wide">
              🎤 Delivery Feedback
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-indigo-200">🔊 Volume:</span> {feedback2.volume.includes("✅") ? "1/1" : "0/1"} — <span className="text-indigo-100">{feedback2.volume}</span>
              </li>
              <li>
                <span className="text-indigo-200">⏱ Pacing:</span> {feedback2.pacing.includes("✅") ? "1/1" : "0/1"} — <span className="text-indigo-100">{feedback2.pacing}</span>
              </li>
              <li>
                <span className="text-indigo-200">💪 Confidence:</span> {feedback2.confidence.includes("✅") ? "1/1" : "0/1"} — <span className="text-indigo-100">{feedback2.confidence}</span>
              </li>
            </ul>
          </div>

          {/* Button - Final Score */}
          <motion.button
            onClick={finalize}
            whileHover={{ scale: 1.05 }}
            className="mt-6 w-full text-center bg-gradient-to-r from-pink-500 to-indigo-600 hover:brightness-110 text-white font-bold px-6 py-3 rounded-full shadow-md tracking-wide transition"
          >
            🎯 Show Final Score
          </motion.button>

        </>
      )}

      {step === 4 && (
        <div className="text-center mt-8 px-6 py-8 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-3xl shadow-2xl border border-purple-700 text-white">

          {/* Glowing Title */}
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 drop-shadow-lg tracking-widest animate-pulse">
            🏆 Final Score: {totalScore}/10
          </h2>

          {/* Confetti Lottie Animation or Score Sparkles can go here */}

          {/* Restart Button */}
          <motion.button
            onClick={restart}
            whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
            className="mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white px-8 py-3 rounded-full font-bold tracking-wide shadow-md hover:shadow-xl transition"
          >
            🔁 Restart
          </motion.button>
        </div>
      )}
    </div>
  );
}
