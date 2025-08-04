import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const EQTracker = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState(-1);
  const [moods, setMoods] = useState(["", "", ""]);
  const [reflection, setReflection] = useState({
    emotion: "",
    response: "",
    improvement: "",
  });
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (step === 3 && isSuccess) {
      completeLeadershipChallenge(1, 1);
    }
  }, [step, isSuccess]);

  useEffect(() => {
    if (step !== 3) return;

    const totalTimeMs = Date.now() - startTime;

    const totalScore = 3; // moods + reflection + quiz attempt
    let earned = 0;
    if (moods.every((m) => m)) earned += 1;
    if (reflection.emotion && reflection.response && reflection.improvement) earned += 1;
    if (quizAnswer) earned += 1;

    const scaledScore = Math.round((earned / totalScore) * 10);

    updatePerformance({
      moduleName: "Leadership",
      topicName: "foresight",
      score: scaledScore,
      accuracy: scaledScore * 10,
      avgResponseTimeSec: parseFloat((totalTimeMs / 3000).toFixed(2)), // 3 tasks
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: isSuccess, // only true if correct answer was chosen
     
    });
    setStartTime(Date.now());

  }, [step]);


  const handleMoodChange = (index, value) => {
    const updated = [...moods];
    updated[index] = value;
    setMoods(updated);
  };

  const handleReflectionChange = (field, value) => {
    setReflection({ ...reflection, [field]: value });
  };

  const handleSubmit = () => {
    const allFilled =
      moods.every((m) => m) &&
      reflection.emotion &&
      reflection.response &&
      reflection.improvement &&
      quizAnswer;
    const correct = quizAnswer === "Pause and explain your side calmly";
    if (allFilled && correct) {
      setShowConfetti(true);
      setIsSuccess(true);
    }
    setStep(step + 1);
  };

  const resetAll = () => {
    setStep(-1);
    setMoods(["", "", ""]);
    setReflection({ emotion: "", response: "", improvement: "" });
    setQuizAnswer("");
    setShowConfetti(false);
    setIsSuccess(false);
    setStartTime(Date.now());

  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {step === -1 && (
        <div>
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHd6cDlwN2JkdTNrbms0ZGkxeXRmZ2VuczE4eGh2aHpyYmtzZGY3YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nK98hQl9bTCq4/200.webp"
            alt="Intro"
            className="mx-auto mb-4 rounded-lg"
          />
          <h2 className="text-3xl font-bold mb-4">
            💓 Challenge 4: The EQ Tracker
          </h2>
          <p className="mb-4">
            Track your emotions, reflect on stress, and learn strategies to
            become emotionally stronger!
          </p>
          <button
            onClick={() => setStep(0)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Start Game
          </button>
        </div>
      )}

      {step === 0 && (
        <div>
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3BvM2l0b2I5N2prejF3dGcwam03YjIyOWgyM2hhdWtkOGlpZncwOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/57ZvMMkuBIVMlU88Yh/200.webp"
            alt="Mood Journal"
            className="mx-auto mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-4">📝 Mood Journal</h2>
          <p className="mb-4">
            Track your mood for the last 3 school days using emojis.
          </p>
          {moods.map((mood, idx) => (
            <div key={idx} className="mb-4">
              <label className="block mb-2 font-medium">
                Day {idx + 1} Mood:
              </label>
              <select
                value={mood}
                onChange={(e) => handleMoodChange(idx, e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">-- Choose Emoji --</option>
                <option value="😊">😊 Happy</option>
                <option value="😐">😐 Okay</option>
                <option value="😟">😟 Stressed</option>
                <option value="😢">😢 Sad</option>
                <option value="😡">😡 Angry</option>
              </select>
            </div>
          ))}
          <button
            onClick={() => {
              if (moods.some((m) => !m)) {
                alert("Please select your mood for all 3 days.");
                return;
              }
              setStep(1);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnlvaHo5cmtybmN6ZXFqeGtwNXJtbmVycjIxdm9ubjUzaXpvazVqNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZbgzoMOazuUR38uJIN/200.webp"
            alt="Stress Moment"
            className="mx-auto mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-4">💥 High-Stress Reflection</h2>
          <p className="mb-4">Think of a recent high-stress school moment.</p>
          <textarea
            className="w-full border p-2 mb-3 rounded"
            placeholder="What emotion did you feel?"
            value={reflection.emotion}
            onChange={(e) => handleReflectionChange("emotion", e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-3 rounded"
            placeholder="How did you respond?"
            value={reflection.response}
            onChange={(e) => handleReflectionChange("response", e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-4 rounded"
            placeholder="How would you handle it better next time?"
            value={reflection.improvement}
            onChange={(e) =>
              handleReflectionChange("improvement", e.target.value)
            }
          />
          <button
            onClick={() => {
              const { emotion, response, improvement } = reflection;
              if (!emotion || !response || !improvement) {
                alert("Please fill in all reflection fields.");
                return;
              }
              setStep(2);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTdqZmtjNWxremkxdHphaGU0Y29ubno2Nnh3dGpjZXJ2Yno3NG9ibiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rzFprQNlyXhY4Hb0rY/200.webp"
            alt="EQ Quiz"
            className="mx-auto mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-4">🧠 EQ Strategy Quiz</h2>
          <p className="mb-4">
            Which is the best EQ strategy in this situation?
          </p>
          <p className="mb-4 italic">
            "You just got blamed for something you didn’t do."
          </p>
          <div className="text-left space-y-2 mb-4">
            {[
              "Yell at the person",
              "Pause and explain your side calmly",
              "Ignore everyone",
              "Send a sarcastic message",
            ].map((opt, idx) => (
              <div key={idx}>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="quiz"
                    value={opt}
                    checked={quizAnswer === opt}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                  />
                  {opt}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const allFilled =
                moods.every((m) => m) &&
                reflection.emotion &&
                reflection.response &&
                reflection.improvement &&
                quizAnswer;
              if (!quizAnswer) {
                alert("Please select an EQ strategy.");
                return;
              }
              const correct =
                quizAnswer === "Pause and explain your side calmly";
              if (allFilled && correct) {
                setShowConfetti(true);
                setIsSuccess(true);
              }
              setStep(step + 1);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Finish
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <img
            src={
              isSuccess
                ? "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnoxNG13aHJ0eGc3enZzMXg2M29qYTM4OGZvaTU5NnMzNzFsMWZoMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j0vs5H7Kcz3Pm9LRDa/200.webp"
                : "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2N5MHcwd2NkMzBpdzA3M3BoZTZ0MmRyMTZjc2lwcWZwbXczeTMwYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CoND5j6Bn1QZUgm1xX/giphy.webp"
            }
            alt="Result"
            className="mx-auto mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2">🎉 Challenge Complete!</h2>
          {isSuccess ? (
            <>
              <p className="mb-2">
                🏅 You earned the <strong>💓 Resilience Master</strong> badge!
              </p>
              <p className="mb-2">
                Thanks for reflecting and building your EQ superpower.
              </p>
            </>
          ) : (
            <p className="mb-2 text-red-600 font-medium">
              😕 Maybe you should give it another shot.
            </p>
          )}

          <div className="flex justify-center gap-4 mt-4 flex-col sm:flex-row">
            <button
              onClick={resetAll}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Play Again
            </button>
            <Link to="/ethical-logical-maze">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Move to Next Game
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EQTracker;
