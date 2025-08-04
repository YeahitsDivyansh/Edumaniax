import React, { useState } from "react";
import {
  ChevronRight,
  Download,
  Share2,
  Trophy,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react";
import axios from "axios";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

function parsePossiblyStringifiedJSON(text) {
  if (typeof text !== "string") return null;

  // Remove triple backticks and optional "json" after them
  text = text.trim();
  if (text.startsWith("```")) {
    text = text
      .replace(/^```(json)?/, "")
      .replace(/```$/, "")
      .trim();
  }

  // Remove single backticks
  if (text.startsWith("`") && text.endsWith("`")) {
    text = text.slice(1, -1).trim();
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}

const APIKEY = import.meta.env.VITE_API_KEY;

const ProblemSolutionGame = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [currentStep, setCurrentStep] = useState(0);
  const [problems, setProblems] = useState(["", "", ""]);
  const [aiIdeas, setAiIdeas] = useState([
    { idea1: "", idea2: "" },
    { idea1: "", idea2: "" },
    { idea1: "", idea2: "" },
  ]);
  const [businessPitch, setBusinessPitch] = useState({
    name: "",
    target: "",
    description: "",
    value: "",
  });
  const [showInstructions, setShowInstructions] = useState(true);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const problemExamples = [
    "Too much plastic waste at school",
    "Homework deadlines hard to track",
    "Students getting lost in large campus",
    "Difficulty finding study partners",
    "Food waste in cafeteria",
  ];

  const aiExamples = {
    problem: "Homework deadlines are hard to track",
    ideas: [
      "AI calendar assistant with smart reminders",
      "Chatbot that summarizes homework tasks",
    ],
  };

  const handleProblemsChange = (index, value) => {
    const newProblems = [...problems];
    newProblems[index] = value;
    setProblems(newProblems);
  };

  const handleAiIdeasChange = (problemIndex, ideaKey, value) => {
    const newIdeas = [...aiIdeas];
    newIdeas[problemIndex][ideaKey] = value;
    setAiIdeas(newIdeas);
  };

  const handleBusinessPitchChange = (key, value) => {
    setBusinessPitch((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    // Problems filled
    const filledProblems = problems.filter((p) => p.trim().length > 10).length;
    score += filledProblems * 10;

    // AI ideas filled
    const filledIdeas = aiIdeas.reduce((acc, idea) => {
      return (
        acc +
        (idea.idea1.trim().length > 5 ? 5 : 0) +
        (idea.idea2.trim().length > 5 ? 5 : 0)
      );
    }, 0);
    score += filledIdeas;

    // Business pitch completeness
    const pitchScore = Object.values(businessPitch).reduce((acc, val) => {
      return acc + (val.trim().length > 5 ? 10 : 0);
    }, 0);

    score += pitchScore;

    return Math.min(score, 100);
  };

  const canProceed = (step) => {
    switch (step) {
      case 0:
        return problems.every((p) => p.trim().length > 5);
      case 1:
        return aiIdeas.every(
          (idea) => idea.idea1.trim().length > 5 && idea.idea2.trim().length > 5
        );
      case 2:
        return Object.values(businessPitch).every(
          (val) => val.trim().length > 5
        );
      default:
        return true;
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an expert startup evaluator and business mentor. Evaluate a startup business idea submission. Be critical and strict.

The user provided:
- 3 Problems they want to solve : ${problems}
- 2 AI-based ideas for each problem (idea1 and idea2) : ${aiIdeas}
- A business pitch (fields like target audience, business model, unique value, and go-to-market strategy) : ${businessPitch}

Return feedback as a JSON object with the following structure:

-Rememeber that the user is a school student of grade 11-12. It may happen that he does not score 10/10, but if the score >= 8, and you think the the inputs are really worthy, you may give "worthyOfBadge" field as true, but only if you genuinely believe it.

### FINAL INSTRUCTION ###
Return ONLY raw JSON (no backticks, no markdown, no explanations).
Example format:

{
  score : ## Example, 6/10. Always give the score as score/10
  tip : ## An actionable improvement tip. Max length 30 words
  worthyOfBadge : ## true or false 
}

The two fields should never be empty. 
 
Constraints - 
-Always give score in the format "score/10".  
- Tip must suggest something actionable, not vague advice. Max length 30 words`,
                },
              ],
            },
          ],
        }
      );

      const aiReply = response.data.candidates[0].content.parts[0].text;
      const parsed = parsePossiblyStringifiedJSON(aiReply);
      console.log(parsed);
      setResult(parsed);
      completeEntreprenerushipChallenge(0, 0);
      setCurrentStep(3);

      // ✅ Calculate Performance
      const endTime = Date.now();
      const totalTimeMs = endTime - startTime;
      const avgResponseTimeSec = Math.round(totalTimeMs / 1000 / 3); // 3 steps
      const studyTimeMinutes = Math.floor(totalTimeMs / (1000 * 60));
      const rawScore = calculateScore(); // out of 100
      const scaledScore = Math.round((rawScore / 100) * 10); // out of 10
      const accuracy = (scaledScore / 10) * 100;

      // ✅ Send to performance tracker
      await updatePerformance({
        moduleName: "Entrepreneurship",
        topicName: "ideationIntellect",
        score: scaledScore,
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes,
        completed: true,
      });
      setStartTime(Date.now());
    } catch (err) {
      setError("Error fetching AI response");
      console.log(err);
    }

    setLoading(false);
  }

  if (showInstructions) {
    return (
      <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-purple-600   mb-4">
                Problem-to-Solution Relay
              </h1>
              <div className="inline-flex items-center bg-yellow-200 px-6 py-3 rounded-full">
                <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                <span className="text-yellow-800 font-bold text-lg">
                  Global Solver Badge
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-blue-800">Step 1</h3>
                </div>
                <h4 className="font-bold text-blue-700 mb-2">
                  Spot 3 Problems
                </h4>
                <p className="text-blue-600 text-sm">
                  Think of problems around you - school, home, or the world!
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-green-800">Step 2</h3>
                </div>
                <h4 className="font-bold text-green-700 mb-2">AI Solutions</h4>
                <p className="text-green-600 text-sm">
                  Suggest 2 AI-powered solutions for each problem!
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Rocket className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-orange-800">Step 3</h3>
                </div>
                <h4 className="font-bold text-orange-700 mb-2">
                  Business Pitch
                </h4>
                <p className="text-orange-600 text-sm">
                  Turn your favorite idea into a mini business pitch!
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowInstructions(false)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Start Your Journey!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="bg-orange-100 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Progress</h2>
            <span className="text-lg font-semibold text-purple-600">
              {currentStep + 1}/4
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Problems */}
        {currentStep === 0 && (
          <div className="bg-orange-200 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-800 mb-2">
                Step 1: Spot 3 Problems
              </h2>
              <p className="text-blue-600">
                Think of problems around you - school, home, or the world!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">
                      Problem {index + 1}:
                    </label>
                    <textarea
                      value={problem}
                      onChange={(e) =>
                        handleProblemsChange(index, e.target.value)
                      }
                      placeholder="Describe a problem you've noticed..."
                      className="w-full p-4 border-2 bg-white border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  💡 Example Problems:
                </h3>
                <div className="space-y-3">
                  {problemExamples.map((example, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <p className="text-blue-700">"{example}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                disabled={!canProceed(0)}
                className={`${canProceed(0)
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
                  } text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all duration-300`}
              >
                Next: AI Solutions{" "}
                <ChevronRight className="inline w-6 h-6 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: AI Ideas */}
        {currentStep === 1 && (
          <div className="bg-orange-200 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Step 2: AI Solutions
              </h2>
              <p className="text-green-600">
                Suggest 2 AI-powered solutions for each problem!
              </p>
            </div>

            <div className="space-y-8">
              {problems.map((problem, problemIndex) => (
                <div
                  key={problemIndex}
                  className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl"
                >
                  <h3 className="text-lg font-bold text-green-800 mb-4">
                    Problem {problemIndex + 1}: {problem.substring(0, 50)}...
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-md font-semibold text-green-700 mb-2">
                        🤖 AI Idea 1:
                      </label>
                      <textarea
                        value={aiIdeas[problemIndex].idea1}
                        onChange={(e) =>
                          handleAiIdeasChange(
                            problemIndex,
                            "idea1",
                            e.target.value
                          )
                        }
                        placeholder="How can AI solve this problem?"
                        className="w-full p-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-md font-semibold text-green-700 mb-2">
                        🤖 AI Idea 2:
                      </label>
                      <textarea
                        value={aiIdeas[problemIndex].idea2}
                        onChange={(e) =>
                          handleAiIdeasChange(
                            problemIndex,
                            "idea2",
                            e.target.value
                          )
                        }
                        placeholder="Another AI-powered solution?"
                        className="w-full p-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Example */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">
                💡 Example:
              </h3>
              <p className="text-yellow-700 mb-2">
                <strong>Problem:</strong> {aiExamples.problem}
              </p>
              <div className="space-y-2">
                <p className="text-yellow-700">
                  🤖 <strong>AI Idea 1:</strong> {aiExamples.ideas[0]}
                </p>
                <p className="text-yellow-700">
                  🤖 <strong>AI Idea 2:</strong> {aiExamples.ideas[1]}
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-8">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg transition-all duration-300"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceed(1)}
                className={`${canProceed(1)
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
                  } text-white font-bold py-4 md:px-4 lg:px-8 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300`}
              >
                Next: Business Pitch{" "}
                <ChevronRight className="inline w-6 h-6 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Business Pitch */}
        {currentStep === 2 && (
          <div className="bg-orange-200 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-orange-800 mb-2">
                Step 3: Business Pitch
              </h2>
              <p className="text-orange-600">
                Turn your favorite idea into a mini business pitch!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    🏢 Business Name:
                  </label>
                  <input
                    type="text"
                    value={businessPitch.name}
                    onChange={(e) =>
                      handleBusinessPitchChange("name", e.target.value)
                    }
                    placeholder="What's your business called?"
                    className="w-full p-4 border-2 bg-white border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    👥 Who will use it?
                  </label>
                  <textarea
                    value={businessPitch.target}
                    onChange={(e) =>
                      handleBusinessPitchChange("target", e.target.value)
                    }
                    placeholder="Describe your target users..."
                    className="w-full p-4 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    ⚙️ What does it do?
                  </label>
                  <textarea
                    value={businessPitch.description}
                    onChange={(e) =>
                      handleBusinessPitchChange("description", e.target.value)
                    }
                    placeholder="Describe what your solution does (1-2 lines)..."
                    className="w-full p-4 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    💡 Why is it useful?
                  </label>
                  <textarea
                    value={businessPitch.value}
                    onChange={(e) =>
                      handleBusinessPitchChange("value", e.target.value)
                    }
                    placeholder="Why would people want to use it? (1-2 lines)..."
                    className="w-full p-4 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    rows="3"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-orange-800 mb-4">
                  💡 Example Business:
                </h3>
                <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
                  <p>
                    <strong className="text-orange-700">Name:</strong>{" "}
                    AI-SkoolBot
                  </p>
                  <p>
                    <strong className="text-orange-700">Users:</strong> High
                    school students
                  </p>
                  <p>
                    <strong className="text-orange-700">What it does:</strong>{" "}
                    Helps students organize schoolwork using smart reminders and
                    task summaries
                  </p>
                  <p>
                    <strong className="text-orange-700">Why useful:</strong>{" "}
                    Reduces stress and helps students never miss deadlines
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2  mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg transition-all duration-300"
              >
                ← Back
              </button>
              {loading ? (
                <div className="flex flex-col items-center justify-center my-6">
                  <div className="w-12 h-12 border-4 border-t-pink-500 border-yellow-200 rounded-full animate-spin"></div>
                  <p className="mt-4 text-pink-600 text-2xl font-semibold">
                    Thinking...
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed(2)}
                  className={`${canProceed(2)
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-105"
                    : "bg-gray-400 cursor-not-allowed"
                    } text-white font-bold py-4 px-4 lg:px-8 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300`}
                >
                  🎉 Complete & Get Badge!
                </button>
              )}
              {error && (
                <p className="text-red-600 text-center mt-4 font-bold">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Completion Screen */}
        {currentStep === 3 && result && (
          <div className="min-h-screen bg-gradient-to-br  p-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-300 to-blue-700 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-yellow-200 mb-4">
                    {result?.worthyOfBadge
                      ? "🎖️ Congratulations!"
                      : "Keep trying! 😔"}
                  </h2>
                  <div className="inline-flex items-center  px-6 py-3 rounded-full ">
                    <span className="text-white font-bold text-lg">
                      {result?.worthyOfBadge
                        ? "Global Solver Badge Earned!"
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                    <div className="text-2xl font-bold text-blue-800 mb-2">
                      ⭐ Score
                    </div>
                    <div className="text-3xl text-blue-700 font-extrabold">
                      {result?.score}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                    <div className="text-2xl font-bold text-green-800 mb-2">
                      💡 Tip
                    </div>
                    <div className="text-lg text-green-700">{result?.tip}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-8">
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                    📇 Your Business Idea
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-bold text-purple-700 text-lg">
                        🏢 {businessPitch.name}
                      </h4>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p>
                        <strong className="text-purple-700">
                          👥 Target Users:
                        </strong>{" "}
                        {businessPitch.target}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p>
                        <strong className="text-purple-700">
                          ⚙️ What it does:
                        </strong>{" "}
                        {businessPitch.description}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p>
                        <strong className="text-purple-700">💎 Value:</strong>{" "}
                        {businessPitch.value}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      setProblems(["", "", ""]);
                      setAiIdeas([
                        { idea1: "", idea2: "" },
                        { idea1: "", idea2: "" },
                        { idea1: "", idea2: "" },
                      ]);
                      setBusinessPitch({
                        name: "",
                        target: "",
                        description: "",
                        value: "",
                      });
                      setShowInstructions(true);
                      setStartTime(Date.now());
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    🔄 Play Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolutionGame;
