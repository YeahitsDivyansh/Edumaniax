// components/AIStartupBuilder.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const initialState = {
  name: "",
  description: "",
  features: ["", "", ""],
  aiTypes: "",
  logo: null,
  review: "",
  enhanced: false,
  submitted: false,
};

const getReviewPrompt = (desc, features) => `
You're an AI startup mentor. A student has written this idea:

💼 Description:
${desc}

✨ Features:
${features.join("\n")}

Please give very simple, 1–2 line feedback in kid-friendly language:
✅ If it's good, say "Looks awesome! 🌟 You’re a Startup Star!".
🛠️ If it needs work, say "Hmm, let’s tweak it a bit..." and give a friendly idea to improve.
Be short, clear, and fun!`;

const kidFriendlyTypes = [
  "NLP (Understands language)",
  "Vision (Sees pictures)",
  "Speech (Talks and listens)",
  "Robotics (Helps robots think)",
  "Recommendation (Gives smart suggestions)",
];

const AIStartupBuilder = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [step, setStep] = useState("intro");
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (form.review.startsWith("Looks awesome") && form.submitted) {
      completeEntreprenerushipChallenge(0, 1); // Update ID as needed
    }
  }, [form.review, form.submitted]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, logo: file }));
  };

  const checkValid = () => {
    return (
      form.name.trim() &&
      form.description.trim() &&
      form.features.every((f) => f.trim()) &&
      form.aiTypes.trim() &&
      form.logo
    );
  };

  const getReview = async () => {
    setLoading(true);
    const prompt = getReviewPrompt(form.description, form.features);
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
      const feedback =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Couldn't get feedback.";
      setForm((prev) => ({ ...prev, review: feedback }));
    } catch (err) {
      setForm((prev) => ({ ...prev, review: "❌ Error getting feedback." }));
    }
    setLoading(false);
  };

  const enhanceWithAI = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Improve this AI startup idea:

Description:
${form.description}

Features:
${form.features.join("\n")}

Make it clearer, exciting, and more suitable for school students.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ AI couldn't enhance it.";
      const parts = text.split("\n\n");
      setForm((prev) => ({
        ...prev,
        description:
          parts[0]?.replace("Improved Description:", "") || prev.description,
        features: parts.slice(1, 4).map((p) => p.replace(/[-*]\s*/, "")),
        enhanced: true,
      }));
    } catch (err) {
      console.log("Enhance error", err);
    }
    setLoading(false);
  };

  const resetFieldsOnly = () => {
    setForm((prev) => ({
      ...prev,
      name: "",
      description: "",
      features: ["", "", ""],
      aiTypes: "",
      logo: null,
      review: prev.review,
      enhanced: prev.enhanced,
      submitted: false,
    }));
  };

  const resetGame = () => {
    setForm(initialState);
    setStep("intro");
     setStartTime(Date.now());
  };

  const handleSubmit = () => {
    if (form.review.startsWith("Looks awesome")) {
      setForm((prev) => ({ ...prev, submitted: true }));

      // ✅ Performance tracking
      const endTime = Date.now();
      const timeTakenSec = (endTime - startTime) / 1000;
      const timeTakenMin = Math.round(timeTakenSec / 60);


      updatePerformance({
        moduleName: "Entrepreneurship",
        topicName: "ideationIntellect",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: timeTakenSec,
        studyTimeMinutes: timeTakenMin,
        completed: true,
        
      });
       setStartTime(Date.now());
    }
  };


  return (
    <div className="p-4 max-w-4xl mx-auto">
      {step === "intro" && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src="https://media.tenor.com/KL0H0VZILx4AAAAM/lets-get-started-saturday-night-live.gif"
            alt="Intro"
            className="mx-auto rounded-xl w-80"
          />
          <h1 className="text-3xl font-bold mt-4">AI Startup Builder 🚀</h1>
          <p className="mt-2 text-lg">
            Build your own AI startup! Name it, define its purpose, list 3 cool
            features, and upload a logo. Use AI to verify your idea and improve
            it.
          </p>
          <ul className="text-left mt-4 list-disc list-inside text-sm">
            <li>🎯 Choose a name for your startup</li>
            <li>📖 Write what it does and who it helps</li>
            <li>🧰 List 3 key features</li>
            <li>🧠 Choose the type of AI it uses</li>
            <li>🎨 Make a logo on Canva, then upload it</li>
          </ul>
          <Button className="mt-4" onClick={() => setStep("builder")}>
            🛠️ Start Building
          </Button>
        </motion.div>
      )}

      {step === "builder" && (
        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Startup Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Short Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="grid grid-cols-1 gap-2">
            {form.features.map((f, i) => (
              <input
                key={i}
                className="w-full p-2 border rounded"
                placeholder={`Feature ${i + 1}`}
                value={f}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
              />
            ))}
          </div>

          <select
            className="w-full p-2 border rounded"
            value={form.aiTypes}
            onChange={(e) => handleChange("aiTypes", e.target.value)}
          >
            <option value="">Choose type of AI</option>
            {kidFriendlyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="text-sm">
            <p className="mb-1">
              🎨 Design your logo on{" "}
              <a
                className="text-blue-700 underline"
                href="https://www.canva.com/templates/?category=tACZCvjI6mE"
                target="_blank"
              >
                Canva
              </a>{" "}
              and upload it here:
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <Button onClick={getReview} disabled={!checkValid() || loading}>
              {loading ? "Checking..." : "✅ Verify with AI"}
            </Button>

            {form.review && (
              <div className="bg-white p-3 rounded shadow text-sm">
                <p>
                  <span className="font-bold">AI Feedback:</span> {form.review}
                </p>
                {form.review.startsWith("Hmm") && (
                  <Button className="mt-2" onClick={enhanceWithAI}>
                    ✨ Improve with AI
                  </Button>
                )}
              </div>
            )}

            {form.review.startsWith("Looks awesome") && form.submitted && (
              <div className="text-center mt-6">
                <h2 className="text-xl font-bold text-green-600">
                  🎉 Badge Earned: Startup Architect
                </h2>
                <img
                  src="https://media.tenor.com/Fru8OWgw82QAAAA1/goatplaybanjo-cat.webp"
                  alt="Celebration"
                  className="mx-auto w-64 mt-2 rounded"
                />
                <p className="text-lg mt-2">Woohoo! You did it! 🌟</p>
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              <Button onClick={resetFieldsOnly}>🔁 Try Again</Button>
              <Button variant="outline" onClick={resetGame}>
                🏠 Back to Start
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!form.review.startsWith("Looks awesome")}
              >
                📤 Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStartupBuilder;
