import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Meyda from "meyda";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const samples = [
  { id: "s1", src: "./voices/excited.mp3", label: "🥳 Excited" },
  { id: "s2", src: "./voices/sarcastic.mp3", label: "😏 Sarcastic" },
  { id: "s3", src: "./voices/angry.mp3", label: "😠 Angry" },
  { id: "s4", src: "./voices/polite.mp3", label: "😊 Polite" },
  { id: "s5", src: "./voices/bored.mp3", label: "😴 Bored" },
];

const labels = [
  "😏 Sarcastic",
  "😊 Polite",
  "😴 Bored",
  "🥳 Excited",
  "😡 Angry",
];

export default function ToneTranslatorGame() {
  const { completeCommunicationChallenge } = useCommunication();
  const [drops, setDrops] = useState({});
  const [dragging, setDragging] = useState(null);
  const [score, setScore] = useState(null);
  const [recordings, setRecordings] = useState({});
  const [feedback, setFeedback] = useState({});
  const mediaRecorder = useRef(null);
  const streamRef = useRef(null);
  const [loadingSample, setLoadingSample] = useState(null);
  const [isRecording, setIsRecording] = useState({});
  const [toneScore, setToneScore] = useState(0); // state to track tone-based score
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (score !== null) {
      const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);

      updatePerformance({
        moduleName: "Communication",
        topicName: "emotionalIntelligence",
        score: Math.round((score / 7) * 10),
        accuracy: Math.round((score / 7) * 100),
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: 1,
       
      });
      setStartTime(Date.now());

    }
  }, [score]);



  // 🎯 Tone analysis using Meyda
  const analyzeTone = async (blob, slot) => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: audioCtx,
      source,
      bufferSize: 512,
      featureExtractors: ["rms", "spectralCentroid", "zcr", "mfcc"],
      callback: (features) => {
        let tone = "😊 Neutral";
        let tip = "Try raising pitch slightly and adding warmth.";

        const rms = features.rms;
        const zcr = features.zcr;
        const centroid = features.spectralCentroid;
        const mfcc0 = features.mfcc[0];

        if (rms < 0.03 && zcr < 0.05 && centroid < 1500) {
          tone = "😴 Bored";
          tip = "Speak a bit louder and quicker!";
        } else if (rms > 0.05 && zcr > 0.15 && centroid > 2500 && mfcc0 > -50) {
          tone = "🥳 Excited";
          tip = "Nice energy! Keep it up.";
        } else if (mfcc0 < -100 && centroid > 2200) {
          tone = "😠 Angry";
          tip = "Try softening your tone and slowing down.";
        } else if (rms > 0.03 && zcr > 0.08 && mfcc0 > -80 && centroid < 2000) {
          tone = "😊 Polite";
          tip = "Great! You're sounding calm and respectful.";
        } else if (zcr > 0.2 && mfcc0 < -70 && centroid > 2000) {
          tone = "😏 Sarcastic";
          tip = "Sounds a bit sarcastic. Try being more genuine!";
        }
        setFeedback((f) => ({ ...f, [slot]: { tone, tip } }));
        analyzer.stop();
        source.stop();
      },
    });

    source.connect(audioCtx.destination);
    analyzer.start();
    source.start();
  };


  // 🎙️ Recording function
  const startRecord = async (slot) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    streamRef.current = stream;
    mediaRecorder.current = mr;

    setIsRecording((prev) => ({ ...prev, [slot]: true }));

    mr.ondataavailable = (e) => {
      const blob = e.data;
      setRecordings((r) => ({
        ...r,
        [slot]: URL.createObjectURL(blob),
      }));
      analyzeTone(blob, slot);
    };

    mr.start();

    // Auto stop after 5 sec
    setTimeout(() => {
      if (mediaRecorder.current?.state === "recording") {
        stopRecord(slot);
      }
    }, 5000);
  };

  // Stop recording manually
  const stopRecord = (slot) => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording((prev) => ({ ...prev, [slot]: false }));
      streamRef.current?.getTracks().forEach((track) => track.stop());
      mediaRecorder.current = null;
    }
  };

  const handleDrop = (label) => {
    if (dragging) {
      setDrops((prev) => ({ ...prev, [dragging]: label }));
      setDragging(null);
    }
  };



  const handleCheck = () => {
    let correct = 0;

    // 5 Drag-and-drop checks
    samples.forEach((s) => {
      if (drops[s.id] === s.label) correct++;
    });

    // 2 Recorded tone checks
    if (feedback["slot1"]?.tone === "🥳 Excited") correct++; // or any expected tone
    if (feedback["slot2"]?.tone === "😊 Polite") correct++;  // or any expected tone

    setScore(correct);

    if (correct === 7) {
      completeCommunicationChallenge(1, 2); // ✅ Trigger on perfect score
    }
  };

  const resetGame = () => {
    setDrops({});
    setDragging(null);
    setScore(null);
    setRecordings({});
    setFeedback({});
    setStartTime(Date.now());

  };

  return (
    <div className="relative max-w-5xl mx-auto my-5 p-6 rounded-[2rem] shadow-2xl font-sans border-4 border-blue-300 overflow-hidden">

      {/* 🌥️ Blue Cloud Background Layer */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-white via-blue-100 to-blue-200 overflow-hidden">
        <div className="absolute w-40 h-40 bg-white opacity-30 rounded-full animate-pulse top-10 left-10"></div>
        <div className="absolute w-60 h-60 bg-white opacity-20 rounded-full animate-pulse top-20 right-20"></div>
        <div className="absolute w-32 h-32 bg-white opacity-25 rounded-full animate-pulse bottom-10 left-1/3"></div>
      </div>
      {/* 🌟 Main Content */}
      <h2 className="text-3xl text-purple-700 font-bold text-center mb-2">🎧 Tone Translator Game</h2>
      <p className="text-center text-gray-600 mb-6">
        🎵 Listen and drag each voice to the correct emotion!
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {samples.map((sample, i) => (
          <motion.div
            key={sample.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl w-40 shadow text-center relative"
          >
            <button
              onClick={() => {
                const audio = document.getElementById(sample.id);
                audio.play();
                setLoadingSample(sample.id);
                setTimeout(() => setLoadingSample(null), 2500);
              }}
              className="text-xl bg-blue-300 hover:bg-blue-400 text-white rounded-full px-3 py-1 mb-2"
            >
              ▶️
            </button>
            <audio id={sample.id} src={sample.src} />
            <div
              className="cursor-grab text-sm bg-yellow-200 px-2 py-1 rounded-full font-semibold"
              draggable
              onDragStart={() => setDragging(sample.id)}
            >
              Voice {i + 1}
            </div>
            {loadingSample === sample.id && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-xl">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150" />
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {labels.map((label) => (
          <div
            key={label}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(label)}
            className="min-h-[100px] bg-white border-2 border-dashed border-purple-400 rounded-xl text-center p-3"
          >
            <div className="font-bold text-lg mb-2">{label}</div>
            {Object.entries(drops)
              .filter(([_, v]) => v === label)
              .map(([id]) => (
                <div
                  key={id}
                  className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-sm inline-block mt-1"
                >
                  {samples.find((s) => s.id === id)?.label}
                </div>
              ))}
          </div>
        ))}
      </div>



      <hr className="my-8 border-purple-300" />

      <h3 className="text-2xl text-purple-700 font-bold text-center mb-4">
        🎤 Try recording your own voice!
      </h3>

      {["slot1", "slot2"].map((slot, i) => (
        <div key={slot} className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <p className="font-semibold text-lg mb-2">
            {i === 0 ? `"You’re here early."` : `"That’s nice."`}
          </p>
          <div className="flex gap-3 mb-2">
            <button
              onClick={() => startRecord(slot)}
              disabled={isRecording[slot]}
              className={`${isRecording[slot] ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-500"
                } text-white py-2 px-4 rounded-full`}
            >
              🎙️ Start
            </button>
            <button
              onClick={() => stopRecord(slot)}
              disabled={!isRecording[slot]}
              className={`${!isRecording[slot] ? "bg-gray-300" : "bg-red-400 hover:bg-red-500"
                } text-white py-2 px-4 rounded-full`}
            >
              ⏹️ Stop
            </button>
          </div>
          {recordings[slot] && (
            <div className="mt-2">
              <audio controls src={recordings[slot]} className="my-2" />
              <p className="text-sm text-gray-700">
                🧠 Detected tone:{" "}
                <span className="font-semibold">{feedback[slot]?.tone}</span> <br />
                💡 Tip: {feedback[slot]?.tip}
              </p>
            </div>
          )}
        </div>
      ))}

      <div className="text-center mb-8">
        <button
          onClick={handleCheck}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-3"
        >
          ✅ Check Answers
        </button>
        <button
          onClick={resetGame}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full"
        >
          🔁 Replay
        </button>
        {score !== null && (
          <p className="my-3 text-xl font-semibold text-purple-800">
            🎯 You got {score} / 7 correct!
          </p>
        )}
      </div>

    </div>
  );
}
