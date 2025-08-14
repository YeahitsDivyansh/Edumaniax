import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const KindWordsChallenge = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const { width, height } = useWindowSize();
  const [step, setStep] = useState(-1);
  const [examples, setExamples] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (submitted && isSuccess) {
      // Level index 1 (Level 2), task index 2 (boss-level)
      completeLeadershipChallenge(1, 2);
    }
  }, [submitted, isSuccess]);

  useEffect(() => {
    if (!submitted) return;

    const totalTimeMs = Date.now() - startTime;
    const filled = examples.filter((e) => e.trim().length >= 10).length;
    const score = Math.round((filled / 3) * 10); // out of 10
    const accuracy = score * 10;

    updatePerformance({
      moduleName: "Leadership",
      topicName: "communicationKindness",
      score,
      accuracy,
      avgResponseTimeSec: parseFloat((totalTimeMs / (3 * 1000)).toFixed(2)),
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: isSuccess,
    });
    setStartTime(Date.now());
  }, [submitted, isSuccess]);

  const canSubmit = examples.every((e) => e.trim().length >= 10);

  return (
    <div className="max-w-3xl mx-auto p-4 text-center space-y-6 min-h-screen">
      {step === -1 && (
        <div>
          <h1 className="text-3xl font-bold">Kind Words Challenge 💬✨</h1>
          <p className="mt-4">
            Write 3 real examples where you used kind, clear words to handle a
            situation. Keep it specific and positive.
          </p>
          <img
            src="https://media.tenor.com/ZgKFauxbDUoAAAAm/welcome-squad.webp"
            alt="intro gif"
            className="w-64 mx-auto my-6 rounded-lg"
          />
          <button
            onClick={() => setStep(0)}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Start Challenge
          </button>
        </div>
      )}

      {step === 0 && (
        <div className="space-y-4 text-left">
          <h2 className="text-xl font-semibold text-center">Your 3 Examples</h2>
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-1">
                Example {i + 1}
              </label>
              <textarea
                rows={3}
                className="w-full p-2 border rounded"
                placeholder="Describe how you used kind words (min 10 characters)"
                value={examples[i]}
                onChange={(e) => {
                  const updated = [...examples];
                  updated[i] = e.target.value;
                  setExamples(updated);
                }}
              />
            </div>
          ))}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setSubmitted(true);
                setIsSuccess(canSubmit);
                setStep(1);
              }}
              disabled={!canSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              🎉 Submit
            </button>
            <button
              onClick={() => setExamples(["", "", ""])}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              🔁 Reset
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          {isSuccess ? <Confetti width={width} height={height} /> : null}
          <h2 className={`text-2xl font-bold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
            {isSuccess ? "🌟 Kind Communicator Badge Earned!" : "❌ Needs More Detail"}
          </h2>
          <img
            src={
              isSuccess
                ? "https://media.tenor.com/l12Bey8sZe4AAAAm/g5-games-sherlock-hidden-cases.webp"
                : "https://media.tenor.com/Xl08_7ZhMgUAAAA1/julesk-crying.webp"
            }
            alt={isSuccess ? "success gif" : "fail gif"}
            className="w-64 mx-auto"
          />
          <p className="text-lg">
            {isSuccess
              ? "Nice! You captured real moments of kind communication."
              : "Add specific words you used and why they were kind."}
          </p>
          <div className="flex justify-center items-center gap-4 mt-2 flex-wrap">
            <button
              onClick={() => {
                setStep(0);
                setSubmitted(false);
                setIsSuccess(false);
                setStartTime(Date.now());
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔁 Try Again
            </button>
            <Link to="/decision-room">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Continue to Next Level
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default KindWordsChallenge;


