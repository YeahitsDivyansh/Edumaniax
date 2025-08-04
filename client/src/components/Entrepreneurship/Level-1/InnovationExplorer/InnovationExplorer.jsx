// components/InnovationExplorer.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const initialFields = Array.from({ length: 5 }, (_, i) => ({
  problem: "",
  category: "",
  solution: "",
  review: "",
}));

const getGeminiReviewPrompt = (entry) => `
You're a helpful AI teacher for Class 6–8 students 👩‍🏫.

Here's a student idea:

📌 Problem: ${entry.problem}
⚙️ AI Category: ${entry.category}
🌟 Solution: ${entry.solution}

Check quickly:
1️⃣ Is it clear?
2️⃣ Can they do it?
3️⃣ Is it something they can control?

🎯 Your reply should be just 1 or 2 lines, super short and friendly:
- 👍 If it’s good: Start with “Awesome! 🎉” or “Great idea! 🌟”
- 🤔 If not perfect: Start with “Hmm, maybe improve...” and suggest a small change.

Use simple words, emojis, and cheer them on! 🎈
`;

const InnovationExplorer = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [step, setStep] = useState("intro");
  const [fields, setFields] = useState(initialFields);
  const [loading, setLoading] = useState(false);
  const [allReviewed, setAllReviewed] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [allPerfect, setAllPerfect] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (allReviewed && badgeEarned) {
      completeEntreprenerushipChallenge(0, 0); // Use actual IDs if different
    }
  }, [allReviewed, badgeEarned]);

  const handleChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };

  const resetGame = () => {
    setFields(initialFields);
    setAllReviewed(false);
    setBadgeEarned(false);
    setAllPerfect(false);
    setStep("intro");
     setStartTime(Date.now());
  };

  const getReview = async () => {
    const hasEmpty = fields.some(
      (f) => !f.problem.trim() || !f.category.trim() || !f.solution.trim()
    );
    if (hasEmpty) {
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    const updatedFields = await Promise.all(
      fields.map(async (entry) => {
        const prompt = getGeminiReviewPrompt(entry);
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY
            }`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );
          const data = await res.json();
          return {
            ...entry,
            review:
              data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
              "⚠️ Couldn't get feedback.",
          };
        } catch (err) {
          return { ...entry, review: "❌ Error getting feedback." };
        }
      })
    );

    setFields(updatedFields);
    setAllReviewed(true);

    const goodCount = updatedFields.filter(
      (f) =>
        f.review.startsWith("Awesome") ||
        f.review.startsWith("Great idea") ||
        f.review.startsWith("Good job")
    ).length;

    setBadgeEarned(goodCount >= 3);
    setAllPerfect(goodCount === 5);
    setLoading(false);

    // ✅ Performance tracking
    const endTime = Date.now();
    const timeTakenSec = (endTime - startTime) / 1000;
    const timeTakenMin = Math.round(timeTakenSec / 60);
    const score = Math.round((goodCount / 5) * 10);
    const accuracy = (goodCount / 5) * 100;

    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "ideationIntellect",
      score,
      accuracy,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes: timeTakenMin,
      completed: true,
      
    });
     setStartTime(Date.now());
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {step === "intro" && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src="https://media.tenor.com/IT6wteW4DlQAAAA1/chicken-little-are-you-ready-to-rock.webp"
            alt="intro"
            className="mx-auto rounded-xl w-96"
          />
          <h1 className="text-3xl font-bold mt-4">
            Welcome to Innovation Explorer! 💡
          </h1>
          <p className="mt-2 text-lg">
            Spot 5 real-world problems and solve them using AI! You’ll get
            feedback and maybe win a badge! 🏆
          </p>
          <Button onClick={() => setStep("game")} className="mt-4">
            🚀 Start Game
          </Button>
        </motion.div>
      )}

      {step === "game" && (
        <div>
          {fields.map((entry, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-xl mt-4"
            >
              <h2 className="font-bold">Problem #{index + 1}</h2>
              <input
                placeholder="Describe your problem..."
                className="mt-1 w-full border p-2 rounded"
                value={entry.problem}
                onChange={(e) => handleChange(index, "problem", e.target.value)}
              />
              <select
                className="mt-1 w-full border p-2 rounded"
                value={entry.category}
                onChange={(e) =>
                  handleChange(index, "category", e.target.value)
                }
              >
                <option value="">Select AI Category</option>
                <option value="Vision">Vision</option>
                <option value="Language">Language</option>
                <option value="Prediction">Prediction</option>
                <option value="Robotics">Robotics</option>
                <option value="Recommendation">Recommendation</option>
              </select>
              <textarea
                placeholder="Your creative AI solution..."
                className="mt-1 w-full border p-2 rounded"
                value={entry.solution}
                onChange={(e) =>
                  handleChange(index, "solution", e.target.value)
                }
              ></textarea>
              {allReviewed && (
                <p className="mt-2 bg-white p-2 rounded shadow text-sm">
                  <span className="font-semibold">AI Review:</span>{" "}
                  {entry.review}
                </p>
              )}
            </div>
          ))}
          <Button onClick={getReview} disabled={loading} className="mt-6">
            {loading ? "Checking..." : "✅ Submit & Get Review"}
          </Button>
        </div>
      )}

      {allReviewed && badgeEarned && (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold">
            🏅 You’ve earned the Innovation Badge!
          </h2>
          <p className="text-green-700">
            Amazing work! You're thinking like a young innovator! 🚀
          </p>
        </div>
      )}

      {allReviewed && (
        <div className="text-center mt-6 space-y-6">
          {allPerfect ? (
            <>
              <h2 className="text-2xl font-bold text-yellow-600">
                🎖️ Great problem hunter and solution finder!
              </h2>
              <p className="text-green-700 mb-2">
                You nailed all 5 solutions with creativity! 🧠💡
              </p>
              <img
                src="https://media.tenor.com/WdGV1rfxqwQAAAA1/slowclap-clap.webp"
                alt="Clap"
                className="mx-auto w-64 rounded-xl shadow"
              />
            </>
          ) : badgeEarned ? (
            <>
              <h2 className="text-2xl font-bold">
                🏅 You’ve earned the Innovation Badge!
              </h2>
              <p className="text-green-700">
                Amazing work! You're thinking like a young innovator! 🚀
              </p>
            </>
          ) : null}

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={() => getReview()}
              className="bg-blue-100 text-black border hover:bg-blue-200 hover:text-black"
            >
              🔁 Try Again
            </Button>

            <Button
              onClick={resetGame}
              className="bg-white text-black border hover:bg-gray-100"
            >
              🏠 Back to Start
            </Button>

            <Button
              onClick={() => alert("🎉 Response submitted successfully!")}
              className="bg-black text-white hover:bg-gray-800"
            >
              📤 Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InnovationExplorer;
