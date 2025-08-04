import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Building,
  DollarSign,
  Target,
  Mic,
  Upload,
  Star,
  Zap,
  Award,
  CheckCircle,
  Sparkles,
  Rocket,
  TrendingUp,
  Users,
  Heart,
  CheckSquare,
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

const StartupSimulationGame = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [currentStep, setCurrentStep] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [loading, setLoading] = useState(false);

  const [feedbackAvatarType, setFeedbackAvatarType] = useState("");

  // Form Data
  const [productData, setProductData] = useState({
    market: "",
    name: "",
    problem: "",
    audience: "",
    solution: "",
  });

  const [pricingData, setPricingData] = useState({
    model: "",
    price: 0,
    reason: "",
  });

  const [positioningData, setPositioningData] = useState({
    strengths: [],
    proposition: "",
  });

  const [pitchData, setPitchData] = useState({
    pitch: "",
    logo: null,
  });

  // New GTM and Launch Data
  const [gtmData, setGtmData] = useState({
    channels: "",
    targetAudience: "",
  });

  const [launchData, setLaunchData] = useState({
    timeline: "",
    objectives: "",
  });

  const [selectedmarket, setSelectedMarket] = useState("");

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const marketOptions = [
    {
      value: "edtech",
      label: "EdTech",
      icon: "📚",
      example: "Learning apps, online courses",
      ideas: "AI homework helper, virtual classrooms, skill assessments",
      gradient: "from-blue-400 to-blue-600",
      hoverGradient: "hover:from-blue-500 hover:to-blue-700",
    },
    {
      value: "healthtech",
      label: "HealthTech",
      icon: "🏥",
      example: "Fitness trackers, telemedicine",
      ideas: "Mental health apps, workout planners, symptom checkers",
      gradient: "from-green-400 to-green-600",
      hoverGradient: "hover:from-green-500 hover:to-green-700",
    },
    {
      value: "greentech",
      label: "GreenTech",
      icon: "🌱",
      example: "Solar apps, recycling solutions",
      ideas: "Carbon footprint trackers, eco-shopping guides, energy savers",
      gradient: "from-emerald-400 to-emerald-600",
      hoverGradient: "hover:from-emerald-500 hover:to-emerald-700",
    },
    {
      value: "fintech",
      label: "FinTech",
      icon: "💳",
      example: "Payment apps, budgeting tools",
      ideas: "Teen banking apps, expense trackers, investment guides",
      gradient: "from-purple-400 to-purple-600",
      hoverGradient: "hover:from-purple-500 hover:to-purple-700",
    },
    {
      value: "creator",
      label: "Creator Economy",
      icon: "🎨",
      example: "Content tools, monetization platforms",
      ideas:
        "Video editors, social media schedulers, brand collaboration tools",
      gradient: "from-pink-400 to-pink-600",
      hoverGradient: "hover:from-pink-500 hover:to-pink-700",
    },
  ];

  const pricingModels = [
    {
      value: "freemium",
      label: "Freemium Model",
      icon: "🆓",
      desc: "Basic free, premium paid features",
      examples: "Free: 5 projects, Paid: Unlimited + AI features",
      gradient: "from-cyan-400 to-cyan-600",
      color: "border-cyan-300 bg-cyan-50",
    },
    {
      value: "subscription",
      label: "Subscription Model",
      icon: "📅",
      desc: "Monthly/yearly recurring payments",
      examples: "₹99/month or ₹999/year with discounts",
      gradient: "from-orange-400 to-orange-600",
      color: "border-orange-300 bg-orange-50",
    },
    {
      value: "onetime",
      label: "One-time Purchase",
      icon: "💰",
      desc: "Single payment, own forever",
      examples: "₹1999 one-time, lifetime access + updates",
      gradient: "from-green-400 to-green-600",
      color: "border-green-300 bg-green-50",
    },
    {
      value: "b2b",
      label: "B2B Licensing",
      icon: "🏢",
      desc: "License to businesses/schools",
      examples: "₹50,000/year per school, bulk discounts available",
      gradient: "from-indigo-400 to-indigo-600",
      color: "border-indigo-300 bg-indigo-50",
    },
  ];

  const strengthOptions = [
    {
      value: "ai",
      label: "AI-Powered",
      icon: "🤖",
      color: "bg-blue-100 border-blue-300 text-blue-800",
      hoverColor: "hover:bg-blue-200 hover:border-blue-400",
    },
    {
      value: "easy",
      label: "Easy to Use",
      icon: "✨",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      hoverColor: "hover:bg-purple-200 hover:border-purple-400",
    },
    {
      value: "affordable",
      label: "Affordable",
      icon: "💸",
      color: "bg-green-100 border-green-300 text-green-800",
      hoverColor: "hover:bg-green-200 hover:border-green-400",
    },
    {
      value: "fastest",
      label: "Fastest",
      icon: "⚡",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      hoverColor: "hover:bg-yellow-200 hover:border-yellow-400",
    },
    {
      value: "eco",
      label: "Eco-Friendly",
      icon: "🌍",
      color: "bg-emerald-100 border-emerald-300 text-emerald-800",
      hoverColor: "hover:bg-emerald-200 hover:border-emerald-400",
    },
    {
      value: "students",
      label: "Built for Students",
      icon: "🎓",
      color: "bg-pink-100 border-pink-300 text-pink-800",
      hoverColor: "hover:bg-pink-200 hover:border-pink-400",
    },
  ];

  const handleProductChange = (key, value) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePricingChange = (key, value) => {
    setPricingData((prev) => ({ ...prev, [key]: value }));
  };

  const handleStrengthToggle = (strength) => {
    setPositioningData((prev) => {
      const newStrengths = prev.strengths.includes(strength)
        ? prev.strengths.filter((s) => s !== strength)
        : prev.strengths.length < 2
          ? [...prev.strengths, strength]
          : prev.strengths;
      return { ...prev, strengths: newStrengths };
    });
  };

  const handlePositioningChange = (key, value) => {
    setPositioningData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePitchChange = (key, value) => {
    setPitchData((prev) => ({ ...prev, [key]: value }));
  };

  // New handlers for GTM and Launch
  const handleGTMChange = (key, value) => {
    setGtmData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLaunchChange = (key, value) => {
    setLaunchData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = (step) => {
    switch (step) {
      case 0:
        return (
          productData.market &&
          productData.name.length > 2 &&
          productData.problem.length > 10 &&
          productData.audience.length > 5 &&
          productData.solution.length > 5
        );
      case 1:
        return (
          pricingData.model &&
          pricingData.price &&
          pricingData.reason.length > 10
        );
      case 2:
        return (
          positioningData.strengths.length === 2 &&
          positioningData.proposition.length > 10
        );
      case 3:
        return (
          gtmData.channels.length > 10 && gtmData.targetAudience.length > 10
        );
      case 4:
        return (
          launchData.timeline.length > 10 && launchData.objectives.length > 10
        );
      case 5:
        return pitchData.pitch.length > 20;
      default:
        return true;
    }
  };

  const calculateScore = () => {
    let score = 0;

    // Product definition completeness (30 points)
    if (productData.market) score += 5;
    if (productData.name.length > 3) score += 5;
    if (productData.problem.length > 20) score += 10;
    if (productData.audience.length > 10) score += 5;
    if (productData.solution.length > 15) score += 5;

    // Pricing strategy (20 points)
    if (pricingData.model) score += 7;
    if (pricingData.price) score += 6;
    if (pricingData.reason.length > 20) score += 7;

    // Positioning (15 points)
    if (positioningData.strengths.length === 2) score += 8;
    if (positioningData.proposition.length > 15) score += 7;

    // GTM Strategy (15 points)
    if (gtmData.channels.length > 15) score += 8;
    if (gtmData.targetAudience.length > 15) score += 7;

    // Launch Plan (10 points)
    if (launchData.timeline.length > 15) score += 5;
    if (launchData.objectives.length > 15) score += 5;

    // Pitch quality (10 points)
    if (pitchData.pitch.length > 50) score += 10;

    return Math.min(score, 100);
  };

  const [error, setError] = useState("");
  const [result2, setResult2] = useState(null);

  const handleSubmit2 = async () => {
    setLoading(true);
    setError("");
    setResult2(null);

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
  - Product Data : ${productData}
  - Pricing Information  : ${pricingData}
  -Strengths : ${positioningData.strengths}
  -Proposition : ${positioningData.proposition}
  -Pitch : ${pitchData.pitch}
  - Marketing Channels : ${gtmData.channels}
  -Target customer profile : ${gtmData.targetAudience}
  - Business pitch : ${pitchData.pitch}
  - Launch Timeline : ${launchData.timeline}
  
  Return feedback as a JSON object with the following structure:
  
  -Rememeber that the user is a school student of grade 11-12. It may happen that he does not score 10/10, but if the score >= 8, and you think the the inputs are really worthy, you may give "worthyOfBadge" field as true, but only if you genuinely believe it.
  
  ### FINAL INSTRUCTION ###
  Return ONLY raw JSON (no backticks, no markdown, no explanations).
  Example format:
  
  { 
    businessScore  : ## Example, 6/10. Always give the score as score/10 
    tip : ## An actionable improvement tip. Max length 30 words
    marketFit : ## Strong or Moderate or Needs work 
    categoryToImprove  : ## One of the provided information fields that can be improved                  
  }
  
  The four fields should never be empty.
   
  Constraints - 
  -Always give score in the format "score/10".  
  -Tip must suggest something actionable, not vague advice. Max length 30 words`,
                },
              ],
            },
          ],
        }
      );

      const aiReply = response.data.candidates[0].content.parts[0].text;
      console.log(aiReply);
      const parsed = parsePossiblyStringifiedJSON(aiReply);
      if (parsed) {
        setResult2(parsed);
        completeEntreprenerushipChallenge(0, 1);

        // Calculate performance metrics
        const endTime = Date.now();
        const totalTimeMs = endTime - startTime;
        const studyTimeMinutes = Math.floor(totalTimeMs / (1000 * 60));
        const totalSteps = 6;
        const avgResponseTimeSec = Math.round(totalTimeMs / 1000 / totalSteps);

        const rawScore = calculateScore(); // out of 100
        const scaledScore = Math.round((rawScore / 100) * 10); // out of 10
        const accuracy = (scaledScore / 10) * 100; // percentage

        const completed = true;

        await updatePerformance({
          moduleName: "Entrepreneurship",
          topicName: "strategist",
          score: scaledScore, // out of 10
          accuracy,           // in percentage
          avgResponseTimeSec,
          studyTimeMinutes,
          completed,
        });
        setStartTime(Date.now());
      }
    } catch (err) {
      setError("Error fetching AI response");
      console.log(err);
    }

    setLoading(false);
  };

  const resetGame = () => {
    setCurrentStep(0);
    setShowInstructions(true);

    setResult2(null);
    setProductData({
      market: "",
      name: "",
      problem: "",
      audience: "",
      solution: "",
    });
    setPricingData({ model: "", price: 0, reason: "" });
    setPositioningData({ strengths: [], proposition: "" });
    setPitchData({ pitch: "", logo: null });
    setGtmData({ channels: "", targetAudience: "" });
    setLaunchData({ timeline: "", objectives: "" });
    setStartTime(Date.now());
  };

  if (loading) {
    return (
      <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="animate-spin w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🧠 AI Analyzing Your Startup...
          </h2>
          <div className="space-y-2 text-left text-gray-600">
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
              Evaluating market potential...
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Analyzing pricing strategy...
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-2 text-blue-500" />
              Checking market positioning...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result2) {
    return (
      <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 animate-bounce">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
                🎉 Startup Analysis Complete!
              </h1>
              <div className="inline-flex items-center bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-3 rounded-full shadow-lg">
                <Award className="w-6 h-6 text-white mr-2" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-blue-800">
                    Business Score
                  </h3>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {result2.businessScore}
                </div>
                <div className="text-blue-600">Overall Performance</div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-green-800">
                    Market Fit
                  </h3>
                </div>
                <div className="text-2xl font-bold text-green-700 mb-2">
                  {result2.marketFit}
                </div>
                <div className="text-green-600">Product-Market Match</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                🎯 Personalized Feedback
              </h3>
              <p className="text-center text-gray-700 text-lg leading-relaxed">
                {result2.tip}
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-2xl mb-8">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                🚀 Focus Area for Growth
              </h3>
              <div className="text-center">
                <span className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 rounded-full text-white font-bold">
                  {result2.categoryToImprove}
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-4"
              >
                🔄 Try Another Startup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-2 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 transform hover:scale-105 transition-all duration-500">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 animate-pulse">
                <Building className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                🚀 Startup Simulation Sprint
              </h1>
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg animate-bounce">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white mr-2" />
                <span className="text-white font-bold text-sm sm:text-lg">
                  🧠 Strategic Thinker Badge
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                🎯 Your Mission
              </h2>
              <p className="text-center text-gray-700 text-sm sm:text-base">
                Simulate launching a startup by making 6 smart business
                decisions: define your product, set pricing, position in market,
                plan go-to-market strategy, create launch plan, and pitch to
                investors!
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800">
                    Steps 1 & 2
                  </h3>
                </div>
                <h4 className="font-bold text-blue-700 mb-2">
                  Product & Pricing 💰
                </h4>
                <p className="text-blue-600 text-xs sm:text-sm">
                  Define your product and choose how you'll make money!
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-purple-800">
                    Steps 3 & 4
                  </h3>
                </div>
                <h4 className="font-bold text-purple-700 mb-2">
                  Position & GTM 📣
                </h4>
                <p className="text-purple-600 text-xs sm:text-sm">
                  Stand out in the market and plan your strategy!
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-green-800">
                    Steps 5 & 6
                  </h3>
                </div>
                <h4 className="font-bold text-green-700 mb-2">
                  Launch & Pitch 🎤
                </h4>
                <p className="text-green-600 text-xs sm:text-sm">
                  Plan your launch and pitch your idea!
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowInstructions(false)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Launch Your Startup Journey!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-2 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
            🚀 Startup Plan Builder
          </h2>
          <p className="text-center text-white/80 text-lg">
            Step {currentStep + 1} of 6
          </p>
          <div className="w-full bg-white/20 rounded-full h-3 mt-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-200  via-yellow-200 to-orange-200 rounded-3xl shadow-2xl p-4 sm:p-8 transition-all duration-300 hover:shadow-3xl">
          {/* Step 1: Product Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  🎯 Define Your Product
                </h3>
                <p className="text-gray-600">
                  Choose your market and define your core value
                </p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  🌟 Choose Your Market
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketOptions.map((market) => (
                    <div
                      key={market.value}
                      onClick={() => {
                        handleProductChange("market", market.value);
                        setSelectedMarket(market.value);
                      }}
                      className={`p-4 ${market.value === selectedmarket
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                        }  rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 `}
                    >
                      <div className="text-3xl mb-2">{market.icon}</div>
                      <div className="font-bold text-lg mb-1">
                        {market.label}
                      </div>
                      <div className="text-sm opacity-90 mb-2">
                        {market.example}
                      </div>
                      <div className="text-xs opacity-75">{market.ideas}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  📝 Product Name
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => handleProductChange("name", e.target.value)}
                  placeholder="What's your product called?"
                  className="w-full p-4 border-2 bg-white  border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  🧠 What problem are you solving?
                </label>
                <textarea
                  value={productData.problem}
                  onChange={(e) =>
                    handleProductChange("problem", e.target.value)
                  }
                  placeholder="Describe the problem you're solving in detail..."
                  className="w-full p-4 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  🎯 Who is your target audience?
                </label>
                <input
                  type="text"
                  value={productData.audience}
                  // Continue from where your code left off - after the audience input field

                  onChange={(e) =>
                    handleProductChange("audience", e.target.value)
                  }
                  placeholder="e.g., High school students, College students, Working professionals..."
                  className="w-full bg-white p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  💡 How does your product solve this problem?
                </label>
                <textarea
                  value={productData.solution}
                  onChange={(e) =>
                    handleProductChange("solution", e.target.value)
                  }
                  placeholder="Describe your solution approach..."
                  className="w-full p-4 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Step 2: Pricing Model */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  💰 Build Your Revenue Model
                </h3>
                <p className="text-gray-600">Choose how you'll make money</p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  💼 Choose Your Pricing Model
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pricingModels.map((model) => (
                    <div
                      key={model.value}
                      onClick={() => handlePricingChange("model", model.value)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${pricingData.model === model.value
                        ? `bg-gradient-to-br ${model.gradient} text-white border-transparent shadow-lg`
                        : `${model.color} hover:shadow-md`
                        }`}
                    >
                      <div className="text-3xl mb-2">{model.icon}</div>
                      <div className="font-bold text-lg mb-1">
                        {model.label}
                      </div>
                      <div className="text-sm mb-2">{model.desc}</div>
                      <div className="text-xs opacity-75">{model.examples}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  💸 Set Your Price (₹)
                </label>
                <input
                  type="number"
                  value={pricingData.price}
                  onChange={(e) => handlePricingChange("price", e.target.value)}
                  placeholder="Enter your price..."
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  🤔 Why will users pay this price?
                </label>
                <textarea
                  value={pricingData.reason}
                  onChange={(e) =>
                    handlePricingChange("reason", e.target.value)
                  }
                  placeholder="Explain the value users get for this price..."
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="4"
                />
              </div>
            </div>
          )}

          {/* Step 3: Market Positioning */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  📣 Position Your Product
                </h3>
                <p className="text-gray-600">
                  Choose exactly 2 strengths to stand out
                </p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  ⚡ Pick Your 2 Key Strengths
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {strengthOptions.map((strength) => (
                    <div
                      key={strength.value}
                      onClick={() => handleStrengthToggle(strength.value)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${positioningData.strengths.includes(strength.value)
                        ? `${strength.color} shadow-lg border-opacity-80`
                        : `bg-gray-50 border-gray-200 ${strength.hoverColor}`
                        }`}
                    >
                      <div className="text-3xl mb-2">{strength.icon}</div>
                      <div className="font-bold text-lg">{strength.label}</div>
                      {positioningData.strengths.includes(strength.value) && (
                        <CheckCircle className="w-6 h-6 mt-2 mx-auto text-current" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {positioningData.strengths.length}/2
                </p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  🎯 Create Your Value Proposition
                </label>
                <textarea
                  value={positioningData.proposition}
                  onChange={(e) =>
                    handlePositioningChange("proposition", e.target.value)
                  }
                  placeholder="e.g., 'The fastest AI-powered homework planner built specifically for high school students.'"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Step 4: Go-to-Market Strategy */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  🚀 Go-to-Market Strategy
                </h3>
                <p className="text-gray-600">
                  Plan how you'll reach your customers
                </p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  📢 Marketing Channels
                </label>
                <textarea
                  value={gtmData.channels}
                  onChange={(e) => handleGTMChange("channels", e.target.value)}
                  placeholder="How will you reach customers? (e.g., Social media, influencer partnerships, school partnerships, content marketing...)"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  🎯 Target Customer Profile
                </label>
                <textarea
                  value={gtmData.targetAudience}
                  onChange={(e) =>
                    handleGTMChange("targetAudience", e.target.value)
                  }
                  placeholder="Describe your ideal customer in detail (age, interests, pain points, behavior...)"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="4"
                />
              </div>
            </div>
          )}

          {/* Step 5: Launch Plan */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  🎯 Launch Plan
                </h3>
                <p className="text-gray-600">
                  Plan your product launch strategy
                </p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  📅 Launch Timeline
                </label>
                <textarea
                  value={launchData.timeline}
                  onChange={(e) =>
                    handleLaunchChange("timeline", e.target.value)
                  }
                  placeholder="What's your launch timeline? (e.g., Month 1: MVP development, Month 2: Beta testing, Month 3: Public launch...)"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  🎯 Launch Objectives
                </label>
                <textarea
                  value={launchData.objectives}
                  onChange={(e) =>
                    handleLaunchChange("objectives", e.target.value)
                  }
                  placeholder="What do you want to achieve in your first 6 months? (e.g., 1000 users, ₹50k revenue, partnerships...)"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="4"
                />
              </div>
            </div>
          )}

          {/* Step 6: Pitch */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  🎤 Pitch Your Startup
                </h3>
                <p className="text-gray-600">Create your elevator pitch</p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  📝 Your 60-Second Pitch
                </label>
                <textarea
                  value={pitchData.pitch}
                  onChange={(e) => handlePitchChange("pitch", e.target.value)}
                  placeholder="Write your elevator pitch here... Include: What problem you solve, who you help, what makes you different, and your ask (funding/partnership/customers)"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-base"
                  rows="6"
                />
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  🚀 Ready to Launch?
                </h4>
                <p className="text-gray-600">
                  You're about to submit your startup for AI analysis. Make sure
                  your pitch captures your vision!
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-full font-bold transition-all duration-300 ${currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-lg transform hover:scale-105"
                }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed(currentStep)}
                className={`flex items-center px-6 py-3 rounded-full font-bold transition-all duration-300 ${canProceed(currentStep)
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Next Step
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSubmit2}
                  disabled={!canProceed(currentStep)}
                  className={`flex items-center px-8 py-3 rounded-full font-bold transition-all duration-300 ${canProceed(currentStep)
                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  🚀 Launch My Startup!
                  <Rocket className="w-5 h-5 ml-2" />
                </button>
                {error && (
                  <p className="text-red-600 text-center mt-4 font-bold">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupSimulationGame;
