import React, { useState, useEffect } from "react";
import {
  Star,
  Play,
  Users,
  Globe,
  Zap,
  Target,
  TrendingUp,
  Award,
  Download,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { useDM } from "@/contexts/DMContext";
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

const CampaignBuilderGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("intro");

  const [campaignData, setCampaignData] = useState({
    targetAudience: "",
    ageGroup: "",
    interests: "",
    platforms: [],
    hook: "",
    cta: "",
    mainGoal: "",
    trackingMetric: "",
  });

  const [loadingProgress, setLoadingProgress] = useState(0);

  const [completedFields, setCompletedFields] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  // Game data
  const gameOptions = {
    targetAudience: [
      "Teenagers with acne concerns",
      "Social media savvy teens",
      "Beauty enthusiasts (13-19)",
      "Eco-conscious young people",
      "Budget-conscious students",
    ],
    ageGroups: [
      "13-15 years",
      "16-18 years",
      "13-19 years (all teens)",
      "18-22 years (young adults)",
    ],
    platforms: [
      {
        id: "instagram",
        name: "Instagram",
        icon: "📸",
        color: "from-pink-500 to-purple-500",
      },
      {
        id: "tiktok",
        name: "TikTok",
        icon: "🎵",
        color: "from-black to-red-500",
      },
      {
        id: "youtube",
        name: "YouTube Shorts",
        icon: "📺",
        color: "from-red-500 to-red-600",
      },
      {
        id: "snapchat",
        name: "Snapchat",
        icon: "👻",
        color: "from-yellow-400 to-yellow-500",
      },
      {
        id: "twitter",
        name: "Twitter/X",
        icon: "🐦",
        color: "from-blue-400 to-blue-500",
      },
    ],
    mainGoals: [
      "Build brand awareness & engagement",
      "Increase followers & community",
      "Drive website visits & conversions",
      "Generate user-generated content",
    ],
    trackingMetrics: [
      "Engagement Rate (likes, comments, shares)",
      "Follower Growth",
      "Click-through Rate to Website",
      "Brand Mention Tracking",
      "Video View Duration",
    ],
  };

  // Calculate completion
  useEffect(() => {
    const fields = [
      campaignData.targetAudience,
      campaignData.ageGroup,
      campaignData.interests,
      campaignData.platforms.length > 0,
      campaignData.hook.trim(),
      campaignData.cta.trim(),
      campaignData.mainGoal,
      campaignData.trackingMetric,
    ];
    const completed = fields.filter((field) => field).length;
    setCompletedFields(completed);
  }, [campaignData]);

  // Loading animation
  useEffect(() => {
    if (currentPage === "loading") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              completeDMChallenge(2, 2);

              const endTime = Date.now();
              const responseTimeSec = Math.round((endTime - startTime) / 1000);
              const studyTimeMinutes = Math.ceil(responseTimeSec / 60);

              const score = Math.round((completedFields / 8) * 10);
              const accuracy = Math.round((completedFields / 8) * 100);

              updatePerformance({
                moduleName: "DigitalMarketing",
                topicName: "creativity",
                score,
                accuracy,
                avgResponseTimeSec: responseTimeSec,
                studyTimeMinutes,
                completed: true,
              });
              setStartTime(Date.now());
              setCurrentPage("result");
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [currentPage]);


  const handleInputChange = (field, value) => {
    setCampaignData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlatformToggle = (platformId) => {
    setCampaignData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((id) => id !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const handleSubmit = () => {
    if (completedFields === 8) {
      setCurrentPage("loading");
      setLoadingProgress(0);
    }
  };

  const resetGame = () => {
    setCurrentPage("intro");
    setCampaignData({
      targetAudience: "",
      ageGroup: "",
      interests: "",
      platforms: [],
      hook: "",
      cta: "",
      mainGoal: "",
      trackingMetric: "",
    });
    setLoadingProgress(0);
    setCompletedFields(0);
    setStartTime(Date.now());
  };

  const downloadCertificate = () => {
    // Create a simple text certificate
    const certificateText = `
🏆 DIGITAL DYNAMO CERTIFICATE 🏆

This certifies that you have successfully completed
the Digital Marketing Campaign Challenge!

Campaign: GlowFuel Skincare Brand
Target: ${campaignData.targetAudience}
Platforms: ${campaignData.platforms
        .map((id) => gameOptions.platforms.find((p) => p.id === id)?.name)
        .join(", ")}
Goal: ${campaignData.mainGoal}

You are now officially a Digital Marketing Strategist!

Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([certificateText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Digital-Dynamo-Certificate.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit2 = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a campaign evaluator.
                  As the Lead Digital Marketing Strategist, a student has the role to plan a one-week digital marketing campaign to support GlowFuel’s mission of helping teens feel confident in their skin. His task is to define the target audience, choose the most effective platforms to reach them, craft compelling hooks and calls-to-action, and set clear goals and metrics to measure success.
                  Evaluate the deatils and give your feedback.
 
Form data provided by user : ${JSON.stringify(campaignData)} 

 ### FINAL INSTRUCTION ###
 Return ONLY raw JSON (no backticks, no markdown, no explanations).
 Example format:
 { 
feedback : ## Max 40 words
  }
 
 The feedback field should never be empty.
  
 Constraints - 
 - Feedback must include constructive criticism or praise and suggest something actionable, not vague advice.
 - Return object must have only feedback as a field and it should contain the text, nothing else.
 - If some random words used that have no meaning, criticise for that.
 `,
                },
              ],
            },
          ],
        }
      );

      const aiReply = response.data.candidates[0].content.parts[0].text;
      console.log(aiReply);
      const parsed = parsePossiblyStringifiedJSON(aiReply);
      console.log("Hi", parsed);
      setResult(parsed);
    } catch (err) {
      setError("Error fetching feedback");
      console.log(err);
    }
    setLoading(false);
  };

  // Intro Page
  if (currentPage === "intro") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🚀</div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Campaign Builder
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              Your Digital Pitch! 🎯
            </h2>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Meet GlowFuel! ✨
            </h3>
            <div className="text-gray-700 text-lg leading-relaxed space-y-3">
              <p>
                🧴 <strong>Brand:</strong> GlowFuel - Skincare for Teenagers
              </p>
              <p>
                🎯 <strong>Mission:</strong> Help teens feel confident in their
                skin
              </p>
              <p>
                ⏰ <strong>Campaign:</strong> Plan a 1-week digital marketing
                strategy
              </p>
              <p>
                👑 <strong>Your Role:</strong> Lead Digital Marketing Strategist
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🎮 Your Mission:
            </h3>
            <div className="text-gray-700 text-lg leading-relaxed space-y-2">
              <p>📊 Define your target audience</p>
              <p>📱 Choose the best platforms</p>
              <p>✍️ Create compelling hooks and CTAs</p>
              <p>🎯 Set clear goals and metrics</p>
              <p>🏆 Earn your Digital Dynamo certificate!</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage("game")}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-6 h-6" />
            Start Campaign Planning
          </button>
        </div>
      </div>
    );
  }

  // Game Page
  if (currentPage === "game") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-indigo-400 via-emerald-400 to-teal-400 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              GlowFuel Campaign Canvas 🧴✨
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Design a winning 1-week campaign for the coolest teen skincare
              brand!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">
                Campaign Progress
              </span>
              <span className="text-white font-semibold">
                {completedFields}/8 Complete
              </span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-green-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedFields / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Campaign Form */}
          <div className="space-y-6">
            {/* Target Audience */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-500" />
                1. Target Audience 🎯
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Audience:
                  </label>
                  <select
                    value={campaignData.targetAudience}
                    onChange={(e) =>
                      handleInputChange("targetAudience", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Choose your target...</option>
                    {gameOptions.targetAudience.map((audience) => (
                      <option key={audience} value={audience}>
                        {audience}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age Group:
                  </label>
                  <select
                    value={campaignData.ageGroup}
                    onChange={(e) =>
                      handleInputChange("ageGroup", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select age range...</option>
                    {gameOptions.ageGroups.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Interests/Pain Points:
                </label>
                <input
                  type="text"
                  value={campaignData.interests}
                  onChange={(e) =>
                    handleInputChange("interests", e.target.value)
                  }
                  placeholder="e.g., acne solutions, self-confidence, affordable skincare..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  maxLength="100"
                />
              </div>
            </div>

            {/* Platform Selection */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-500" />
                2. Platform Strategy 📱
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gameOptions.platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${campaignData.platforms.includes(platform.id)
                      ? `bg-gradient-to-r ${platform.color} text-white border-transparent transform scale-105`
                      : "border-gray-200 hover:border-gray-300 hover:scale-105"
                      }`}
                  >
                    <div className="text-3xl mb-2">{platform.icon}</div>
                    <div className="font-semibold">{platform.name}</div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                💡 Select 2-3 platforms where your audience is most active
              </p>
            </div>

            {/* Content Creation */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                3. Content Strategy ✍️
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hook for Your First Post (Day 1):
                  </label>
                  <input
                    type="text"
                    value={campaignData.hook}
                    onChange={(e) => handleInputChange("hook", e.target.value)}
                    placeholder="e.g., 'POV: You finally found skincare that gets you...' or 'That moment when your skin starts glowing...'"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                    maxLength="120"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {campaignData.hook.length}/120
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Call-to-Action for Day 3 Reel:
                  </label>
                  <input
                    type="text"
                    value={campaignData.cta}
                    onChange={(e) => handleInputChange("cta", e.target.value)}
                    placeholder="e.g., 'Try our 7-day glow challenge!' or 'Drop a 🌟 if you want clearer skin!'"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                    maxLength="100"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {campaignData.cta.length}/100
                  </div>
                </div>
              </div>
            </div>

            {/* Goals & Metrics */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Target className="w-8 h-8 text-green-500" />
                4. Goals & Measurement 📊
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Campaign Goal:
                  </label>
                  <select
                    value={campaignData.mainGoal}
                    onChange={(e) =>
                      handleInputChange("mainGoal", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Choose your primary goal...</option>
                    {gameOptions.mainGoals.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Key Metric to Track:
                  </label>
                  <select
                    value={campaignData.trackingMetric}
                    onChange={(e) =>
                      handleInputChange("trackingMetric", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Select your main metric...</option>
                    {gameOptions.trackingMetrics.map((metric) => (
                      <option key={metric} value={metric}>
                        {metric}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8 mb-8">
            <button
              onClick={() => {
                handleSubmit();
                handleSubmit2();
              }}
              disabled={completedFields !== 8}
              className={`font-bold py-4 px-8 rounded-full text-xl transform transition-all duration-300 shadow-lg ${completedFields === 8
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:scale-110 hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {completedFields === 8
                ? "🚀 Launch Campaign"
                : `⏳ Complete All Fields (${completedFields}/8)`}
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentPage("intro")}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full backdrop-blur transition-all duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading Page
  if (currentPage === "loading") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-purple-600 via-green-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-6 animate-spin">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Launching Your Campaign...
          </h2>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-full rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-lg">{loadingProgress}%</p>

          <div className="mt-4 text-white/70 space-y-2">
            <p>🎯 Reviewing your strategy...</p>
            <p>📱 Optimizing platform mix...</p>
            <p>✨ Preparing your certificate...</p>
          </div>
        </div>
      </div>
    );
  }

  // Result Page
  if (currentPage === "result") {
    return (
      <div className="min-h-screen w-[90%] mx-auto rounded-xl mt-5 mb-5 bg-gradient-to-br from-yellow-400 via-green-400 to-blue-400 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-2xl">
            {/* Celebration */}
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-4">
                Campaign Launched Successfully!
              </h2>
              <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-2xl p-4 sm:p-6 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                  🏆 You're now officially a{" "}
                  <span className="text-green-600">Digital Dynamo!</span>
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  You just planned your first digital marketing campaign from
                  scratch. Your strategic thinking and creativity make you a
                  natural marketing leader! 🌟
                </p>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>

                {/* Feedback Header */}
                <div className="relative z-10 mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-3 sm:mb-4 shadow-lg">
                    <span className="text-2xl sm:text-3xl">💬</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Your Personalized Feedback
                  </h3>
                  <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
                </div>

                {/* Feedback Content */}
                <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/50 shadow-inner">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✨</div>
                  <div className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-3 sm:space-y-4">
                    {/* This is where your feedback text will go */}

                    {/* Replace this with your dynamic feedback text */}
                    {loading && (
                      <div className="flex flex-col items-center justify-center my-6">
                        <div className="w-16 h-16 border-8 border-t-transparent border-b-blue-500 border-l-yellow-300 border-r-pink-400 rounded-full animate-spin shadow-xl"></div>
                        <p className="mt-6 text-white text-2xl tracking-wide animate-pulse">
                          Loading Results...
                        </p>
                      </div>
                    )}

                    {error && (
                      <p className="text-red-300 text-center mt-6 text-lg font-extrabold bg-black/30 p-2 rounded-xl">
                        {error}
                      </p>
                    )}
                    {result && result?.feedback && (
                      <p className="font-medium">Hi {result?.feedback} </p>
                    )}
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="relative z-10 mt-4 sm:mt-6">
                  <div className="flex justify-center items-center gap-2 sm:gap-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-purple-100 border-2 border-purple-300 rounded-2xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-purple-800 mb-3">
                  🎯 Your Target
                </h4>
                <p className="text-sm sm:text-base text-purple-700">
                  {campaignData.targetAudience}
                </p>
                <p className="text-xs sm:text-sm text-purple-600 mt-2">
                  Age: {campaignData.ageGroup}
                </p>
              </div>

              <div className="bg-blue-100 border-2 border-blue-300 rounded-2xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">
                  📱 Your Platforms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {campaignData.platforms.map((platformId) => {
                    const platform = gameOptions.platforms.find(
                      (p) => p.id === platformId
                    );
                    return (
                      <span
                        key={platformId}
                        className="bg-blue-200 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                      >
                        {platform?.icon} {platform?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-800 mb-3">
                  ⚡ Your Hook
                </h4>
                <p className="text-sm sm:text-base text-yellow-700 italic">
                  "{campaignData.hook}"
                </p>
              </div>

              <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3">
                  🎯 Your Goal
                </h4>
                <p className="text-sm sm:text-base text-green-700">
                  {campaignData.mainGoal}
                </p>
                <p className="text-xs sm:text-sm text-green-600 mt-2">
                  Tracking: {campaignData.trackingMetric}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Another Campaign
              </button>
              <button
                onClick={() => setCurrentPage("intro")}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Home
              </button>
            </div>

            {/* Final Tip */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                💡 Marketing Pro Tip:
              </h4>
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                Great campaigns start with understanding your audience deeply.
                You've shown excellent strategic thinking by considering
                demographics, platform behavior, and clear goal-setting. Keep
                this mindset as you grow! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CampaignBuilderGame;
