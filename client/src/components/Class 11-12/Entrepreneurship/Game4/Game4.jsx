import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PitchPDF from './PitchPDF'; // path to your PDF component
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const initialDeck = {
  slide1: { problem: '', audience: '' },
  slide2: { solutionText: '', image: '' },
  slide3: { steps: [''] },
  slide4: { whyNow: '' },
};

export default function PitchArenaPro() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [showBadge, setShowBadge] = useState(false);
  const { width, height } = useWindowSize();
  const [step, setStep] = useState(1);
  const [deck, setDeck] = useState(initialDeck);
  const [videoType, setVideoType] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [submission, setSubmission] = useState({ name: '', tagline: '', confirm: false });
  const [showPDF, setShowPDF] = useState(false); // 🔁 New state
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const handleDeckChange = (field, value, slide = 'slide1') => {
    setDeck(prev => ({ ...prev, [slide]: { ...prev[slide], [field]: value } }));
  };

  const handleStep3Submit = () => {
    alert('🎉 Pitch submitted! Badge Unlocked: 💼 Boardroom Ready');
    setShowPDF(true);
    setShowBadge(true);
    completeEntreprenerushipChallenge(1, 0);

    const endTime = Date.now();
    const timeSpentMinutes = Math.floor((endTime - startTime) / 60000);
    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "masteringPitch",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec: 0,
      studyTimeMinutes: timeSpentMinutes,
      completed: true,
    });
    setStartTime(Date.now());
  };



  const handleRestart = () => {
    setStep(1);
    setDeck(initialDeck);
    setVideoType('');
    setVideoURL('');
    setSubmission({ name: '', tagline: '', confirm: false });
    setShowPDF(false);
    setShowBadge(false);
    setStartTime(Date.now());
  };



  const isStepOneComplete = (deck) => {
    return (
      deck.slide1.problem.trim() &&
      deck.slide1.audience.trim() &&
      deck.slide2.solutionText.trim() &&
      deck.slide2.image.trim() &&
      deck.slide3.steps.every(s => s.trim()) &&
      deck.slide4.whyNow.trim()
    );
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-2 my-4 rounded-3xl shadow-2xl border-4 border-yellow-300"
      style={{
        backgroundImage: "radial-gradient(circle at top left, #fef3c7 0%, #fde68a 25%, #fcd34d 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="text-6xl font-extrabold text-center text-yellow-50 drop-shadow-[0_0_20px_rgba(255,99,71,0.9)] mt-3 mb-5"
        style={{
          fontFamily: "'Comic Neue', 'Segoe UI', cursive",
          textShadow: '0 0 8px #f472b6, 0 0 16px #f472b6',
        }}
      >
        🎯 Pitch Arena Pro ! 🎯
      </motion.h1>


      {step === 1 && (
        <div className="space-y-6 bg-gradient-to-br from-yellow-100 via-white to-pink-100 p-6 rounded-3xl shadow-xl border-4 border-yellow-300">

          <h2 className="text-3xl font-bold text-center text-pink-600 drop-shadow">
            🧠 Step 1: Build Your Pitch Deck
          </h2>

          {/* Slide 1 */}
          <div className="bg-white rounded-xl p-4 shadow-inner border-l-4 border-purple-400 space-y-2">
            <h3 className="text-xl font-bold text-purple-600">🎯 Slide 1: Problem + Audience</h3>
            <label className="text-pink-500 font-semibold">What problem are you solving?</label>
            <input
              className="w-full p-3 rounded-lg border border-pink-200 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={deck.slide1.problem}
              onChange={e => handleDeckChange('problem', e.target.value, 'slide1')}
            />
            <label className="text-pink-500 font-semibold">Who is your target audience?</label>
            <input
              className="w-full p-3 rounded-lg border border-pink-200 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={deck.slide1.audience}
              onChange={e => handleDeckChange('audience', e.target.value, 'slide1')}
            />
          </div>

          {/* Slide 2 */}
          <div className="bg-white rounded-xl p-4 shadow-inner border-l-4 border-orange-400 space-y-2">
            <h3 className="text-xl font-bold text-orange-600">💡 Slide 2: Your Solution</h3>
            <label className="text-orange-500 font-semibold">Describe your solution</label>
            <input
              className="w-full p-3 rounded-lg border border-orange-200 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={deck.slide2.solutionText}
              onChange={e => handleDeckChange('solutionText', e.target.value, 'slide2')}
            />
            <label className="text-orange-500 font-semibold">Image URL</label>
            <input
              type="url"
              className="w-full p-3 rounded-lg border border-orange-200 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={deck.slide2.image}
              onChange={e => handleDeckChange('image', e.target.value, 'slide2')}
            />
          </div>

          {/* Slide 3 */}
          <div className="bg-white rounded-xl p-4 shadow-inner border-l-4 border-blue-400 space-y-2">
            <h3 className="text-xl font-bold text-blue-600">🔧 Slide 3: How the Idea Works (step by step) ?</h3>
            {deck.slide3.steps.map((step, i) => (
              <input
                key={i}
                className="w-full p-3 mt-1 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Step ${i + 1}`}
                value={step}
                onChange={e => {
                  const newSteps = [...deck.slide3.steps];
                  newSteps[i] = e.target.value;
                  setDeck(prev => ({ ...prev, slide3: { steps: newSteps } }));
                }}
              />
            ))}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-white font-semibold px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow hover:shadow-lg transition-all"
              onClick={() =>
                setDeck(prev => ({
                  ...prev,
                  slide3: { steps: [...prev.slide3.steps, ''] },
                }))
              }
            >
              ➕ Add Another Step
            </motion.button>
          </div>

          {/* Slide 4 */}
          <div className="bg-white rounded-xl p-4 shadow-inner border-l-4 border-green-400 space-y-2">
            <h3 className="text-xl font-bold text-green-600">⏰ Slide 4: Why Now?</h3>
            <label className="text-green-500 font-semibold"> What makes this the perfect time to launch your idea?</label>
            <textarea
              className="w-full p-3 rounded-lg border border-green-200 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows={4}
              value={deck.slide4.whyNow}
              onChange={e => handleDeckChange('whyNow', e.target.value, 'slide4')}
            />
          </div>

          {/* Navigation Button */}
          <button
            className={`w-full py-3 text-lg font-bold rounded-full transition-all duration-300 ${isStepOneComplete(deck)
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!isStepOneComplete(deck)}
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
      )}


      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 p-6 rounded-3xl shadow-xl border-4 border-purple-200"
        >
          <h2 className="text-2xl font-extrabold text-purple-700 text-center drop-shadow">🎥 Step 2: Record Your 90-Second Pitch</h2>

          <div className="text-left space-y-4 text-gray-700 font-medium bg-white p-4 rounded-2xl shadow-inner border border-yellow-300">
            <h3 className="text-pink-600 font-bold mb-2">📋 Prompt Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Start with: <strong>“Hi, I’m [Your Name], and here’s my idea…”</strong></li>
              <li>Cover: <span className="text-purple-600">Problem → Solution → Who it helps → What makes it different</span></li>
              <li>End with a 💪 confident call to action!</li>
            </ul>
            <p className="mt-3 text-green-700 text-sm italic">✅ Make it friendly, clear, and creative!</p>
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-1">🎬 Choose how to share your pitch:</label>
            <select
              className="w-full p-3 border-2 rounded-xl bg-blue-50 border-blue-300 text-blue-800 font-semibold"
              value={videoType}
              onChange={e => setVideoType(e.target.value)}
            >
              <option value="">🎯 -- Select Video Option --</option>
              <option value="upload">📁 Upload Video (MP4, Max 50MB)</option>
              <option value="link">🔗 Paste Loom / YouTube Link</option>
            </select>
          </div>

          {videoType === 'upload' && (
            <input
              type="file"
              accept="video/mp4"
              className="w-full p-3 border-2 rounded-xl border-purple-300 bg-purple-50"
            />
          )}

          {videoType === 'link' && (
            <input
              type="url"
              placeholder="🔗 Paste video link here"
              value={videoURL}
              onChange={e => setVideoURL(e.target.value)}
              className="w-full p-3 border-2 rounded-xl border-purple-300 bg-purple-50"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(3)}
            className="w-full bg-gradient-to-r from-green-400 to-lime-500 hover:from-lime-500 hover:to-green-400 text-white text-lg font-bold px-6 py-3 rounded-full shadow-md transition-all"
          >
            ✅ Next
          </motion.button>
        </motion.div>
      )}


      {step === 3 && (
        <motion.div
          className="space-y-6 bg-gradient-to-br from-yellow-50 via-white to-pink-50 p-6 rounded-3xl shadow-xl border border-yellow-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center text-purple-700 drop-shadow"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            🌟 Step 3: Submit & Earn Your Magical Badge!
          </motion.h2>

          {/* ✅ Show form only if badge not shown */}
          {!showPDF && !showBadge && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-pink-600 font-semibold">🎓 Team or Student Name</span>
                <input
                  className="w-full mt-1 p-3 rounded-lg border-2 border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none bg-white shadow-inner"
                  value={submission.name}
                  onChange={e =>
                    setSubmission(prev => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>

              <label className="block">
                <span className="text-blue-600 font-semibold">🪄 One-Line Tagline</span>
                <input
                  className="w-full mt-1 p-3 rounded-lg border-2 border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white shadow-inner"
                  value={submission.tagline}
                  onChange={e =>
                    setSubmission(prev => ({ ...prev, tagline: e.target.value }))
                  }
                />
              </label>

              <label className="flex items-center space-x-2 text-sm text-gray-700 mt-2">
                <input
                  type="checkbox"
                  checked={submission.confirm}
                  onChange={e =>
                    setSubmission(prev => ({ ...prev, confirm: e.target.checked }))
                  }
                  className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                />
                <span>✅ I confirm this is my original idea</span>
              </label>

              <motion.button
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-40"
                onClick={handleStep3Submit}
                disabled={!submission.confirm || !submission.name || !submission.tagline}
                whileHover={{ scale: 1.05 }}
              >
                🚀 Submit My Final Pitch & Claim Badge
              </motion.button>
            </div>
          )}

          {/* 🎉 Badge and Download section */}
          {showPDF && showBadge && (
            <>
              <div className="flex justify-center mt-6">
                <PDFDownloadLink
                  document={<PitchPDF deck={deck} />}
                  fileName="PitchDeck.pdf"
                  className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 transition text-white py-2 px-4 rounded-full shadow-md"
                >
                  📥 Download My Pitch PDF
                </PDFDownloadLink>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 transition text-white py-2 px-4 rounded-full"
                  onClick={handleRestart}
                >
                  🔄 Restart the Adventure
                </button>
              </div>

              <Confetti width={width} height={height} recycle={false} numberOfPieces={800} />

              <div className="text-center mt-8">
                <h3 className="text-3xl font-extrabold text-yellow-600 animate-pulse">🏆 You Earned a Badge!</h3>
                <motion.div
                  className="mt-4 inline-block p-6 bg-yellow-50 border-4 border-yellow-300 rounded-2xl shadow-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <div className="text-6xl animate-bounce">🎖️</div>
                  <p className="mt-2 text-lg font-semibold text-yellow-700">✨ Boardroom Ready Badge ✨</p>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
