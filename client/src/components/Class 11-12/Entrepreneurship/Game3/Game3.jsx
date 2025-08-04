import React, { useState, useEffect } from "react";
import {
  Shield,
  Target,
  Users,
  CheckCircle,
  XCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  Eye,
  AlertTriangle,
  Download,
  Star,
  Zap,
  Heart,
} from "lucide-react";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const EthicsFirewallGame = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [currentPage, setCurrentPage] = useState("instructions");
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [matrixResponses, setMatrixResponses] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [matrixScore, setMatrixScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const scenario = {
    title: "FitTracker Pro: The Data Dilemma",
    content: `Meet FitTracker Pro, a popular fitness app used by millions! 🏃‍♀️

The app tracks users' location, heart rate, sleep patterns, and workout data. Recently, the company made some controversial decisions:

📍 They started selling detailed location and health data to insurance companies without clearly informing users
📱 The app began auto-suggesting extreme diet plans to teenage users, leading to unhealthy eating habits
👨‍👩‍👧‍👦 Parents complained they had no way to monitor or control what their children saw in the app
💰 The company prioritized quick profits over user safety, ignoring expert warnings about their algorithms
🔒 Important privacy settings were buried deep in confusing terms and conditions
📊 User data was shared with third-party advertisers without explicit consent
⚠️ The app sent push notifications encouraging users to exercise even when they reported feeling unwell
🎯 Marketing targeted vulnerable users with promises of "instant weight loss"`,
  };

  const flagOptions = [
    {
      id: 1,
      text: "Data sold without user consent",
      correct: true,
      icon: "🔒",
    },
    {
      id: 2,
      text: "Harmful advice to vulnerable teens",
      correct: true,
      icon: "⚠️",
    },
    {
      id: 3,
      text: "No parental controls available",
      correct: true,
      icon: "👨‍👩‍👧‍👦",
    },
    { id: 4, text: "Hidden privacy settings", correct: true, icon: "🔍" },
    { id: 5, text: "App uses colorful design", correct: false, icon: "🎨" },
    { id: 6, text: "Company has a mobile app", correct: false, icon: "📱" },
    { id: 7, text: "App tracks fitness data", correct: false, icon: "💪" },
    { id: 8, text: "App sends notifications", correct: false, icon: "🔔" },
  ];

  const matrixTemplate = [
    {
      stakeholder: "Users",
      riskOptions: [
        "Data sold without consent",
        "Privacy violations",
        "Misleading information",
      ],
      responseOptions: [
        "Add clear consent options",
        "Implement transparent privacy policy",
        "Provide opt-out choices",
      ],
      correctRisk: "Data sold without consent",
      correctResponse: "Add clear consent options",
    },
    {
      stakeholder: "Teen Users",
      riskOptions: [
        "Harmful diet advice",
        "Mental health impact",
        "Peer pressure",
      ],
      responseOptions: [
        "Include expert-reviewed content",
        "Add age-appropriate filters",
        "Provide mental health resources",
      ],
      correctRisk: "Harmful diet advice",
      correctResponse: "Include expert-reviewed content",
    },
    {
      stakeholder: "Parents",
      riskOptions: [
        "No parental controls",
        "Unable to monitor usage",
        "Child safety concerns",
      ],
      responseOptions: [
        "Add parental controls",
        "Send usage reports to parents",
        "Create family-friendly settings",
      ],
      correctRisk: "No parental controls",
      correctResponse: "Add parental controls",
    },
    {
      stakeholder: "Investors",
      riskOptions: [
        "Short-term profit focus",
        "Reputation damage",
        "Legal compliance issues",
      ],
      responseOptions: [
        "Balance ethics with revenue",
        "Invest in compliance",
        "Focus on sustainable growth",
      ],
      correctRisk: "Short-term profit focus",
      correctResponse: "Balance ethics with revenue",
    },
  ];

  const correctFlags = flagOptions
    .filter((flag) => flag.correct)
    .map((flag) => flag.id);

  const handleFlagToggle = (flagId) => {
    setSelectedFlags((prev) =>
      prev.includes(flagId)
        ? prev.filter((id) => id !== flagId)
        : [...prev, flagId]
    );
  };

  const checkFlags = () => {
    const correctCount = selectedFlags.filter((id) =>
      correctFlags.includes(id)
    ).length;
    const incorrectCount = selectedFlags.filter(
      (id) => !correctFlags.includes(id)
    ).length;
    setScore(Math.max(0, correctCount - incorrectCount));
    setShowFeedback(true);
  };

  const handleMatrixChange = (stakeholder, field, value) => {
    setMatrixResponses((prev) => ({
      ...prev,
      [`${stakeholder}_${field}`]: value,
    }));
  };

  const completeGame = () => {
    let matrixPoints = 0;
    matrixTemplate.forEach((item) => {
      const riskKey = `${item.stakeholder}_risk`;
      const responseKey = `${item.stakeholder}_response`;

      if (matrixResponses[riskKey] === item.correctRisk) matrixPoints += 1;
      if (matrixResponses[responseKey] === item.correctResponse) matrixPoints += 1;
    });

    setMatrixScore(matrixPoints);
    const finalScore = score + matrixPoints;
    setTotalScore(finalScore);

    completeEntreprenerushipChallenge(0, 2);

    const endTime = Date.now();
    const durationInMinutes = Math.round((endTime - startTime) / 60000);

    updatePerformance({
      moduleName: "Entrepreneurship",
      topicName: "strategist",
      score: Math.round((finalScore / 12) * 10),
      accuracy: Math.round((finalScore / 12) * 100),
      avgResponseTimeSec: Math.round((endTime - startTime) / 1000 / 12),
      studyTimeMinutes: durationInMinutes,
      completed: true,
    });
    setStartTime(Date.now());
    setGameCompleted(true);
    setCurrentPage("completion");
  };


  // Instructions Page
  const InstructionsPage = () => (
    <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mt-8 mb-8 animate-bounce">
          <Shield className="w-14 h-14 md:w-18 md:h-18 mx-auto text-white mb-4" />
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            Ethics Firewall
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            🎯 Mission: Become a Responsible Innovator!
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <Target className="w-12 h-12 mx-auto text-purple-600 mb-3" />
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-2">
              Your Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Help protect users by identifying ethical problems and creating
              solutions!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 sm:p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
              <Eye className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-blue-600 mb-3" />
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
                Step 1: Investigate
              </h3>
              <p className="text-sm sm:text-base text-blue-700">
                Read the startup scenario carefully and look for problems
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 sm:p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-red-600 mb-3" />
              <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-2">
                Step 2: Spot Red Flags
              </h3>
              <p className="text-sm sm:text-base text-red-700">
                Find 4 ethical problems that could hurt people
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 sm:p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-green-600 mb-3" />
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
                Step 3: Create Solutions
              </h3>
              <p className="text-sm sm:text-base text-green-700">
                Build an Ethics Matrix to help everyone fairly
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-4 sm:p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-center mb-3">
              <Award className="w-8 h-8 text-orange-600 mr-2" />
              <h3 className="text-lg sm:text-xl font-bold text-orange-800">
                Reward
              </h3>
            </div>
            <p className="text-center text-sm sm:text-base text-orange-700">
              Complete all steps to earn the ⚖️{" "}
              <strong>Responsible Innovator</strong> badge!
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("scenario")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-2xl text-lg sm:text-xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            Start Your Mission!{" "}
            <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );

  // Scenario Page
  const ScenarioPage = () => (
    <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <Eye className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white mb-4 animate-pulse" />
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Step 1: Investigate the Scenario
          </h1>
          <p className="text-base sm:text-lg text-white/90">
            Read carefully and look for ethical problems!
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              {scenario.title}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl mb-6 text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {scenario.content}
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-sm sm:text-base text-yellow-700 font-medium">
                <strong>Your Task:</strong> Look for things that might hurt
                users, especially kids and families!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCurrentPage("instructions")}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </button>
            <button
              onClick={() => setCurrentPage("flags")}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Find Red Flags! <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Red Flags Page
  const RedFlagsPage = () => (
    <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white mb-4 animate-bounce" />
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Step 2: Spot the Red Flags
          </h1>
          <p className="text-base sm:text-lg text-white/90">
            Find exactly 4 ethical problems!
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Select the Ethical Problems:
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Click on 4 options that represent unethical practices:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {flagOptions.map((flag) => {
              const isSelected = selectedFlags.includes(flag.id);
              const isCorrect = correctFlags.includes(flag.id);
              const showResult = showFeedback;

              return (
                <div
                  key={flag.id}
                  onClick={() => !showFeedback && handleFlagToggle(flag.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${showResult
                    ? isSelected && isCorrect
                      ? "bg-green-100 border-green-500 text-green-800"
                      : isSelected && !isCorrect
                        ? "bg-red-100 border-red-500 text-red-800"
                        : isCorrect
                          ? "bg-blue-100 border-blue-500 text-blue-800"
                          : "bg-gray-100 border-gray-300 text-gray-600"
                    : isSelected
                      ? "bg-purple-100 border-purple-500 text-purple-800"
                      : "bg-white border-gray-300 text-gray-700 hover:border-purple-400"
                    }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{flag.icon}</span>
                    <span className="text-sm sm:text-base font-medium flex-1">
                      {flag.text}
                    </span>
                    {showResult &&
                      isSelected &&
                      (isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          {showFeedback && (
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 sm:p-6 rounded-2xl mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-3">
                Your Score: {score}/4
              </h3>
              <div className="text-sm sm:text-base text-purple-700 space-y-2">
                <p>
                  <strong>✅ Correct Red Flags:</strong>
                </p>
                <ul className="list-disc list-inside pl-4">
                  <li>Data sold without user consent</li>
                  <li>Harmful advice to vulnerable teens</li>
                  <li>No parental controls available</li>
                  <li>Hidden privacy settings</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCurrentPage("scenario")}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </button>

            {!showFeedback ? (
              <button
                onClick={checkFlags}
                disabled={selectedFlags.length !== 4}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${selectedFlags.length === 4
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Check My Answers ({selectedFlags.length}/4)
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage("matrix")}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Build Ethics Matrix! <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Ethics Matrix Page
  const EthicsMatrixPage = () => (
    <div className="w-[90%] mx-auto rounded-xl mt-3 mb-3 min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-white mb-4 animate-spin" />
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Step 3: Build Your Ethics Matrix
          </h1>
          <p className="text-base sm:text-lg text-white/90">
            Create fair solutions for everyone!
          </p>
        </div>

        <div className="bg-orange-100 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Ethics Matrix Builder
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Choose the best risk and response for each stakeholder:
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {matrixTemplate.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  {item.stakeholder}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Identified:
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      value={matrixResponses[`${item.stakeholder}_risk`] || ""}
                      onChange={(e) =>
                        handleMatrixChange(
                          item.stakeholder,
                          "risk",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select a risk...</option>
                      {item.riskOptions.map((risk, i) => (
                        <option key={i} value={risk}>
                          {risk}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fair Response:
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      value={
                        matrixResponses[`${item.stakeholder}_response`] || ""
                      }
                      onChange={(e) =>
                        handleMatrixChange(
                          item.stakeholder,
                          "response",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select a response...</option>
                      {item.responseOptions.map((response, i) => (
                        <option key={i} value={response}>
                          {response}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setCurrentPage("flags")}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </button>

            <button
              onClick={completeGame}
              disabled={Object.keys(matrixResponses).length < 8}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${Object.keys(matrixResponses).length >= 8
                ? "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Complete Mission! <Award className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Completion Page
  const CompletionPage = () => {
    const getPerformanceMessage = () => {
      const percentage = (totalScore / 12) * 100; // 4 flags + 8 matrix points = 12 total

      if (percentage === 100) {
        return {
          title: "🎉 Outstanding Work!",
          message:
            "You're a true Ethics Champion! You've mastered identifying ethical problems and creating fair solutions.",
          color: "from-green-400 to-blue-400",
          badge: "🏆 Ethics Champion",
        };
      } else if (percentage >= 90) {
        return {
          title: "👏 Great Job!",
          message:
            "You're well on your way to becoming an Ethics Expert! You understand the basics of responsible innovation.",
          color: "from-blue-400 to-purple-400",
          badge: "⚖️ Responsible Innovator",
        };
      } else {
        return {
          title: "📚 Keep Learning!",
          message:
            "You're making good progress! Practice more to become better at spotting ethical issues and creating solutions.",
          color: "from-purple-400 to-pink-400",
          badge: "🌟 Ethics Learner",
        };
      }
    };

    const performance = getPerformanceMessage();

    return (
      <div
        className={`w-[90%] mx-auto rounded-[30px] mt-4 mb-4 min-h-screen bg-gradient-to-br ${performance.color} p-4 sm:p-6 shadow-2xl border-4 border-white`}
      >
        <div className="max-w-4xl mx-auto font-[Comic Sans MS, Comic Neue, cursive]">
          <div className="text-center mb-10">
            <div className="animate-bounce mt-4 mb-6">
              <Award className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-yellow-300 drop-shadow-lg" />
              <div className="text-5xl sm:text-7xl mb-2">🎉</div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-md tracking-wide">
              Mission Complete!
            </h1>

            <div className="bg-white/30 backdrop-blur-lg rounded-[25px] p-6 sm:p-8 mt-6 shadow-md border-2 border-yellow-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                🌟 Your Final Score
              </h2>
              <div className="grid grid-cols-3 gap-4 text-white text-center">
                {[
                  { label: "Red Flags", value: score, outOf: 4 },
                  { label: "Matrix", value: matrixScore, outOf: 8 },
                  { label: "Total", value: totalScore, outOf: 12 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-yellow-200 to-yellow-400 text-black rounded-2xl p-4 drop-shadow-sm"
                  >
                    <div className="text-3xl font-extrabold">{item.value}</div>
                    <div className="text-sm">{item.label}</div>
                    <div className="text-xs opacity-80">
                      out of {item.outOf}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/30 backdrop-blur-lg rounded-[25px] p-6 sm:p-8 mt-6 shadow-md border-2 border-green-200">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {performance.title}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-4">
                {performance.message}
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold text-yellow-200">
                {performance.badge}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-xl mb-8 border-[3px] border-dashed border-purple-200">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 mb-8">
              🧠 Your Ethics Matrix Summary
            </h2>

            <div className="space-y-6">
              {matrixTemplate.map((item, index) => {
                const riskKey = `${item.stakeholder}_risk`;
                const responseKey = `${item.stakeholder}_response`;
                const selectedRisk = matrixResponses[riskKey];
                const selectedResponse = matrixResponses[responseKey];
                const riskCorrect = selectedRisk === item.correctRisk;
                const responseCorrect =
                  selectedResponse === item.correctResponse;

                return (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-pink-100 to-blue-100 p-5 sm:p-6 rounded-[20px] border-4 border-white shadow-sm"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4 flex items-center">
                      <Star className="w-6 h-6 text-yellow-500 mr-2" />
                      {item.stakeholder}
                    </h3>

                    <div className="space-y-4">
                      {[
                        {
                          label: "Risk",
                          selected: selectedRisk,
                          correct: item.correctRisk,
                          isCorrect: riskCorrect,
                          textColor: "text-red-700",
                        },
                        {
                          label: "Response",
                          selected: selectedResponse,
                          correct: item.correctResponse,
                          isCorrect: responseCorrect,
                          textColor: "text-green-700",
                        },
                      ].map(
                        (
                          { label, selected, correct, isCorrect, textColor },
                          idx
                        ) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl ${isCorrect
                              ? "bg-green-200 border-2 border-green-400"
                              : "bg-yellow-200 border-2 border-yellow-400"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className={`font-medium ${textColor}`}>
                                  {label}:{" "}
                                </span>
                                <span className="text-gray-800">
                                  {selected || "Not selected"}
                                </span>
                              </div>
                              {isCorrect ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : (
                                <div className="text-xs md:text-lg text-yellow-700">
                                  Best: {correct}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-green-200 to-blue-200 p-5 sm:p-6 rounded-[20px] mt-8 border-2 border-blue-300 shadow-inner">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-red-500 mr-2" />
                <h3 className="text-xl sm:text-2xl font-bold text-purple-700">
                  What You've Learned!
                </h3>
              </div>
              <p className="text-center text-base sm:text-lg text-gray-700 px-4">
                {totalScore >= 10
                  ? "🎯 You've mastered the art of ethical thinking! You're a superhero of fairness!"
                  : totalScore >= 6
                    ? "🚀 You're doing great! Keep going and you'll be an ethics master soon!"
                    : "🌱 You're on your way! Keep practicing and your powers will grow!"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentPage("instructions");
                setSelectedFlags([]);
                setMatrixResponses({});
                setShowFeedback(false);
                setGameCompleted(false);
                setScore(0);
                setMatrixScore(0);
                setTotalScore(0);
                setStartTime(Date.now());
              }}
              className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-6 rounded-2xl font-extrabold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              🔁 Play Again! <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "instructions":
        return <InstructionsPage />;
      case "scenario":
        return <ScenarioPage />;
      case "flags":
        return <RedFlagsPage />;
      case "matrix":
        return <EthicsMatrixPage />;
      case "completion":
        return <CompletionPage />;
      default:
        return <InstructionsPage />;
    }
  };

  return <div className="font-sans">{renderCurrentPage()}</div>;
};

export default EthicsFirewallGame;
