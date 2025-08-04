import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const stories = [
  {
    id: 1,
    text: "During a school project, the teacher always picked Aryan to lead, saying he's a natural leader, even though others had good ideas.",
    correctBias: "Favoritism",
  },
  {
    id: 2,
    text: "In the robotics club, a girl’s suggestion was ignored until a boy repeated it and was praised.",
    correctBias: "Gender Bias",
  },
  {
    id: 3,
    text: "A popular student got away with being late repeatedly while others got punished.",
    correctBias: "Privilege Bias",
  },
];

const biasTypes = ["Favoritism", "Gender Bias", "Privilege Bias"];

const BiasDetective = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [rewrites, setRewrites] = useState({});
  const [finalReflection, setFinalReflection] = useState("");
  const [result, setResult] = useState(null);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [reviewFeedbacks, setReviewFeedbacks] = useState([]);
  const [rewriteVerifyFeedbacks, setRewriteVerifyFeedbacks] = useState({});
  const [biasIndex, setBiasIndex] = useState(0);
  const [biasReviewMistakes, setBiasReviewMistakes] = useState([]);
  const [currentBiasIndex, setCurrentBiasIndex] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const verifyRewritesWithGemini = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const allPromises = stories.map(async (s) => {
      const userText = rewrites[s.id] || "";

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are reviewing a rewrite of this leadership story:\n"${s.text}"\n\nRewrite: "${userText}"\n\nEvaluate how well it promotes fairness, avoids bias, and sounds inclusive. Respond with Gen Z tone and emojis.`,
              },
            ],
          },
        ],
      };

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await res.json();
        const feedback =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response.";
        return { id: s.id, feedback };
      } catch (error) {
        return { id: s.id, feedback: "⚠️ API Error" };
      }
    });

    const feedbackResults = await Promise.all(allPromises);
    const newFeedbackMap = {};
    feedbackResults.forEach((f) => {
      newFeedbackMap[f.id] = f.feedback;
    });
    setRewriteVerifyFeedbacks(newFeedbackMap);
  };

  const handleSelect = (storyId, bias) => {
    setAnswers((prev) => ({ ...prev, [storyId]: bias }));
  };

  const handleSubmitBias = () => {
    const allAnswered = stories.every((s) => answers[s.id]);
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const allCorrect = stories.every((s) => answers[s.id] === s.correctBias);
    if (allCorrect) {
      setStep("rewrite");
    } else {
      setStep("biasResult"); // new step for showing feedback
    }
  };

  const handleRewrite = (storyId, value) => {
    setRewrites((prev) => ({ ...prev, [storyId]: value }));
  };

  const handleSubmitRewrite = () => {
    const allFilled = stories.every(
      (s) => rewrites[s.id] && rewrites[s.id].length > 10
    );
    if (allFilled) {
      generateRewriteFeedback();
      setStep("review");
    } else setResult("incorrect");
  };

  const generateRewriteFeedback = () => {
    const feedback = stories.map((s) => {
      const txt = rewrites[s.id] || "";
      if (txt.length < 15) {
        return `Story ${s.id}: Needs improvement — try giving a clearer or longer rewrite that shows what fairness looks like.`;
      } else {
        return `Story ${s.id}: 👍 Good effort — your rewrite shows understanding of fairness and inclusion.`;
      }
    });
    setReviewFeedbacks(feedback);
  };

  const verifyActionWithGemini = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a supportive teacher reviewing a response by a student in Class 9–10:

"${finalReflection}"

✅ Please evaluate whether this reflection demonstrates:
1. Awareness of fairness and bias
2. Willingness to take moral action
3. Perspective-taking and inclusivity

🎓 Respond with feedback in **2-3 short paragraphs** using Gen Z-friendly tone, emojis, and clear reasons:
- If it’s strong, say: “🔥 Nailed it!” and explain why it’s great.
- If it needs work, say: “👀 Needs more work” and suggest how to improve it.

Also rate the following out of 10:
Awareness: ?/10
Action: ?/10
Inclusivity: ?/10

Be positive, honest, and use language that clicks with teens.`,
            },
          ],
        },
      ],
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setVerifyMessage(reply);

      // 🔍 Extract scores from the feedback
      const extractScore = (label) => {
        const match = reply.match(new RegExp(`${label}:\\s*(\\d+)\\/10`, "i"));
        return match ? parseInt(match[1]) : 0;
      };

      const awareness = extractScore("Awareness");
      const action = extractScore("Action");
      const inclusivity = extractScore("Inclusivity");

      const total = awareness + action + inclusivity;
      const scaledScore = Math.round(total / 30 * 10);
      const accuracy = Math.round((total / 30) * 100);
      const totalTimeMs = Date.now() - startTime;
      const avgResponseTimeSec = parseFloat((totalTimeMs / 1000 / 3).toFixed(2));
      const studyTimeMinutes = parseFloat((totalTimeMs / 60000).toFixed(2));
      const completed = reply.toLowerCase().includes("nailed it");

      // ✅ Update performance
      updatePerformance({
        moduleName: "Leadership",
        topicName: "understandableLeader",
        score: scaledScore,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes,
        completed,

      });
      setStartTime(Date.now());

      if (completed) {
        confetti();
        completeLeadershipChallenge(3, 0); // Mark as complete
        setResult("correct");
        setStep("end");
      } else {
        setResult("incorrect");
        setStep("end");
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setVerifyMessage("⚠️ Something went wrong. Try again later.");
    }
  };

  const resetGame = () => {
    setAnswers({});
    setRewrites({});
    setFinalReflection("");
    setResult(null);
    setStep("intro");
    setVerifyMessage("");
    setReviewFeedbacks([]);
    setCurrentBiasIndex(0);
    setStartTime(Date.now());

  };

  const resetRewriteInputs = () => {
    setRewrites({});
    setRewriteVerifyFeedbacks({});
  };

  const handleNextBias = () => {
    if (biasIndex < stories.length - 1) {
      setBiasIndex(biasIndex + 1);
    } else {
      const mistakes = stories.filter((s) => answers[s.id] !== s.correctBias);
      if (mistakes.length === 0) {
        setStep("rewrite");
      } else {
        setBiasReviewMistakes(mistakes);
        setStep("bias-review");
      }
    }
  };

  if (step === "review") {
    return (
      <div className="p-6 bg-yellow-50 min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">🔍 Quick Review</h2>
        <p className="mb-4">Here’s what we think about your rewrites:</p>
        <ul className="text-left max-w-2xl mx-auto">
          {reviewFeedbacks.map((f, i) => (
            <li key={i} className="mb-2">
              ✅ {f}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setStep("final")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Proceed to Final Reflection
        </button>
      </div>
    );
  }

  // Add the bias selection step to use handleSelect
  if (step === "intro") {
    return (
      <div className="text-center p-6 min-h-screen bg-yellow-50">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z2JmMnVyYXBiOTk2cG56cXgwcjV6ZGUwczRobTYyZ2M2amlscGV2eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dzaUX7CAG0Ihi/200.webp"
          alt="intro"
          className="w-80 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">🕵️ Bias Detective</h1>
        <p className="mb-4 max-w-xl mx-auto text-gray-700">
          Spot bias in leadership stories, rewrite ethically, and face a final
          reflection test. Earn your 🛡️ Truth Defender badge!
        </p>
        <button
          onClick={() => setStep("bias")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          ▶️ Start Game
        </button>
      </div>
    );
  }

  if (step === "bias-review") {
    return (
      <div className="p-6 bg-yellow-50 min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">⚠️ Bias Check Results</h2>
        <p className="mb-4 text-gray-700">You got some answers wrong:</p>
        <ul className="text-left max-w-2xl mx-auto">
          {biasReviewMistakes.map((s) => (
            <li key={s.id} className="mb-2">
              ❌ Story {s.id}: You chose "{answers[s.id]}", but the correct
              answer was "{s.correctBias}".
            </li>
          ))}
        </ul>
        <button
          onClick={resetGame}
          className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded"
        >
          🔁 Try Again
        </button>
      </div>
    );
  }

  if (step === "bias") {
    const currentStory = stories[currentBiasIndex];
    const isLast = currentBiasIndex === stories.length - 1;

    return (
      <div className="p-6 bg-yellow-50 min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Step 1: Spot the Bias</h2>
        <div className="bg-white p-4 rounded shadow mb-4 max-w-2xl mx-auto text-left">
          <p className="mb-2">{currentStory.text}</p>
          <select
            value={answers[currentStory.id] || ""}
            onChange={(e) => handleSelect(currentStory.id, e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="">Select Bias</option>
            {biasTypes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            if (!answers[currentStory.id]) {
              alert("Please select a bias before proceeding.");
              return;
            }

            if (isLast) {
              const allCorrect = stories.every(
                (s) => answers[s.id] === s.correctBias
              );
              if (allCorrect) {
                setStep("rewrite");
              } else {
                setStep("biasResult");
              }
            } else {
              setCurrentBiasIndex((prev) => prev + 1);
            }
          }}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          {isLast ? "Submit Answers" : "Next"}
        </button>
      </div>
    );
  }

  if (step === "biasResult") {
    return (
      <div className="bg-yellow-50 min-h-screen p-6 text-center">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">
          ⚠️ Bias Check Results
        </h2>
        <p className="mb-4 text-gray-700">You got some answers wrong:</p>
        <ul className="text-left max-w-2xl mx-auto mb-4">
          {stories.map((s) => {
            const userAnswer = answers[s.id] || "";
            const isCorrect = userAnswer === s.correctBias;
            return !isCorrect ? (
              <li key={s.id} className="mb-2 text-red-700">
                ❌ Story {s.id}: You chose "{userAnswer}", but the correct
                answer was "{s.correctBias}".
              </li>
            ) : null;
          })}
        </ul>
        <button
          onClick={resetGame}
          className="bg-orange-600 text-white px-6 py-2 rounded"
        >
          🔁 Try Again
        </button>
      </div>
    );
  }

  if (step === "rewrite") {
    return (
      <div className="p-6 bg-yellow-50 min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Step 2: Ethics Rewrite</h2>
        {stories.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded shadow mb-4 max-w-2xl mx-auto text-left"
          >
            <p className="mb-2">{s.text}</p>
            <textarea
              className="w-full border p-2 rounded"
              placeholder="How would a fair leader act differently?"
              value={rewrites[s.id] || ""}
              onChange={(e) => handleRewrite(s.id, e.target.value)}
              rows={3}
            />
            {rewriteVerifyFeedbacks[s.id] && (
              <p className="text-sm mt-2 text-gray-700 bg-gray-100 p-2 rounded">
                ✨ Feedback: {rewriteVerifyFeedbacks[s.id]}
              </p>
            )}
          </div>
        ))}

        <div className="space-x-4 mt-4">
          <button
            onClick={verifyRewritesWithGemini}
            className="bg-yellow-600 text-white px-6 py-2 rounded"
          >
            ✅ Verify
          </button>

          <button
            onClick={handleSubmitRewrite}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit Rewrite
          </button>

          <button
            onClick={resetRewriteInputs}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            🔁 Try Again
          </button>
        </div>
      </div>
    );
  }

  if (step === "final") {
    return (
      <div className="p-6 bg-yellow-50 min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Final Step: Your Reflection</h2>
        <p className="mb-4 max-w-xl mx-auto">
          How do you respond to “unfair but popular” decisions?
        </p>
        <textarea
          className="w-full max-w-2xl border rounded p-3"
          value={finalReflection}
          onChange={(e) => setFinalReflection(e.target.value)}
          rows={4}
          placeholder="Your thoughtful response here..."
        />
        <br />
        <button
          onClick={verifyActionWithGemini}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Submit Reflection
        </button>

        {verifyMessage && (
          <div className="mt-6 max-w-xl mx-auto bg-white shadow rounded p-4 text-left">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {verifyMessage}
            </p>
            <button
              onClick={() => setFinalReflection("")}
              className="mt-2 text-sm text-blue-600 underline"
            >
              🔁 Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step === "end") {
    const success = result === "correct";

    return (
      <div
        className={`text-center ${success ? "bg-green-50" : "bg-red-50"
          } min-h-screen flex flex-col justify-center items-center p-6`}
      >
        <img
          src={
            success
              ? "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnhha2kzbmZzeXI2cWpmaTJyN3pjYXA3cXVkem51Zmx4NW15ZHl3ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a0h7sAqON67nO/200.webp"
              : "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWR6NDJweTgwZ3d4dGozN2hmZ3NmOW16bWw2M2htd2dzbHoxN2tncCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vyTnNTrs3wqQ0UIvwE/200.webp"
          }
          className="w-72 mb-6"
          alt="result gif"
        />

        {success ? (
          <>
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              🎉 Badge Earned: 🛡️ Truth Defender!
            </h2>
            <p className="mb-4 max-w-xl text-gray-700">
              You showed moral courage, fairness, and leadership! Keep going —
              you're built for ethical action! 🔥
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-800 mb-2">
              😕 Almost there...
            </h2>
            <p className="mb-4 max-w-xl text-gray-700">
              It's okay to miss — being fair takes guts. Reflect, revise, and
              give it another shot. You’ve got this! 💪
            </p>
          </>
        )}

        <div className="space-x-4">
          <button
            onClick={resetGame}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg"
          >
            🔁 Play Again
          </button>

          {success && (
            <button
              onClick={() => (window.location.href = "/innovation-launchpad")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              ⏭️ Next Game
            </button>
          )}
        </div>
      </div>
    );
  }

  return <div className="p-10">Loading...</div>;
};

export default BiasDetective;
