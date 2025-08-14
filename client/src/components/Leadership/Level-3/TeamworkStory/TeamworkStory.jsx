import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const TeamworkStory = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const { width, height } = useWindowSize();
  const [step, setStep] = useState(-1);
  const [story, setStory] = useState("");
  const [whatYouDid, setWhatYouDid] = useState("");
  const [impact, setImpact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (submitted && isSuccess) {
      // Level index 2 (Level 3), task index 2 (boss-level)
      completeLeadershipChallenge(2, 2);
    }
  }, [submitted, isSuccess]);

  useEffect(() => {
    if (!submitted) return;

    const totalTimeMs = Date.now() - startTime;
    // Simple scoring: each field with >= 20 chars earns points
    let earned = 0;
    if (story.trim().length >= 20) earned += 1;
    if (whatYouDid.trim().length >= 20) earned += 1;
    if (impact.trim().length >= 20) earned += 1;
    const score = Math.round((earned / 3) * 10);

    updatePerformance({
      moduleName: "Leadership",
      topicName: "teamworkReflection",
      score,
      accuracy: score * 10,
      avgResponseTimeSec: parseFloat((totalTimeMs / (3 * 1000)).toFixed(2)),
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: isSuccess,
    });
    setStartTime(Date.now());
  }, [submitted, isSuccess]);

  const canSubmit =
    story.trim().length >= 20 &&
    whatYouDid.trim().length >= 20 &&
    impact.trim().length >= 20;

  return (
    <div className="max-w-3xl mx-auto p-4 text-center space-y-6 min-h-screen">
      {step === -1 && (
        <div>
          <h1 className="text-3xl font-bold">My Teamwork Story 🤝</h1>
          <p className="mt-4">
            Share a time you made a decision or helped your team. Be specific
            about the situation, what you did, and the result.
          </p>
          <img
            src="https://media.tenor.com/ZgKFauxbDUoAAAAm/welcome-squad.webp"
            alt="intro gif"
            className="w-64 mx-auto my-6 rounded-lg"
          />
          <button
            onClick={() => setStep(0)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Start
          </button>
        </div>
      )}

      {step === 0 && (
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1">The situation</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              placeholder="Describe the team situation (min 20 characters)"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">What you did</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              placeholder="Explain your decision or actions (min 20 characters)"
              value={whatYouDid}
              onChange={(e) => setWhatYouDid(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Impact/result</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              placeholder="What changed because of your actions? (min 20 characters)"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
            />
          </div>
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
              onClick={() => {
                setStory("");
                setWhatYouDid("");
                setImpact("");
              }}
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
            {isSuccess ? "🌟 Team Strategist Badge Earned!" : "❌ Needs More Detail"}
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
              ? "Great reflection! You showed clear teamwork and decision-making."
              : "Add more specifics about what you did and the impact."}
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
            <Link to="/innovation-sprint">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Continue to Level 4
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamworkStory;


