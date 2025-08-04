import React, { useState } from "react";
import { Star, Sparkles, User, Heart, Trophy, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
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

const PersonaBuilderGame = () => {
  const { completeDMChallenge } = useDM();
  const [currentPage, setCurrentPage] = useState("start");
  const [formData, setFormData] = useState({
    name: "",
    ageRange: "",
    interests: [],
    socialMedia: "",
  });
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const ageOptions = ["13-15", "16-18", "19-22", "23-25", "26-30", "31-35"];

  const interestOptions = [
    { id: "fitness", label: "Fitness", emoji: "💪" },
    { id: "kpop", label: "K-Pop", emoji: "🎵" },
    { id: "cricket", label: "Cricket", emoji: "🏏" },
    { id: "gaming", label: "Gaming", emoji: "🎮" },
    { id: "dance", label: "Dance", emoji: "💃" },
    { id: "art", label: "Art", emoji: "🎨" },
    { id: "movies", label: "Movies", emoji: "🎬" },
    { id: "food", label: "Food", emoji: "🍕" },
  ];

  const socialMediaOptions = [
    "Instagram",
    "TikTok",
    "YouTube",
    "Snapchat",
    "Twitter",
    "Facebook",
  ];

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const calculateScore = () => {
    let points = 0;
    let feedbackText = "";

    // Age and social media alignment
    const age = parseInt(formData.ageRange.split("-")[0]);
    const hasInstagram = formData.socialMedia === "Instagram";
    const hasTikTok = formData.socialMedia === "TikTok";
    const hasFitness = formData.interests.includes("fitness");

    if (age >= 16 && age <= 18 && hasInstagram && hasFitness) {
      points = 5;
      feedbackText = `🌟 Perfect match! ${formData.name} is a fitness-loving ${formData.ageRange}-year-old on Instagram - that's SnackFit's ideal customer! They'll love sharing their protein bar moments on their feed.`;
    } else if (
      age >= 16 &&
      age <= 22 &&
      (hasInstagram || hasTikTok) &&
      hasFitness
    ) {
      points = 4;
      feedbackText = `💪 Great choice! ${formData.name} fits well with SnackFit's target audience. Fitness enthusiasts in this age group are perfect for protein bars!`;
    } else if (hasFitness && age >= 13 && age <= 25) {
      points = 3;
      feedbackText = `👍 Good persona! ${formData.name} likes fitness which is great for SnackFit. Consider Instagram or TikTok for this age group - they're more active there!`;
    } else if (age >= 13 && age <= 25) {
      points = 2;
      feedbackText = `🤔 Almost there! ${formData.name} is in the right age range, but think about who would actually want protein bars. Fitness lovers are your best bet!`;
    } else {
      points = 1;
      feedbackText = `💭 Hmm... ${formData.name} might not be the best fit for SnackFit. Teen protein bar buyers usually love fitness and hang out on Instagram or TikTok!`;
    }

    setScore(points);
    setFeedback(feedbackText);
  };

  const handleSubmit2 = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a customer persona evaluator.
                  A student helps launch "SnackFit" - a protein bar for teens! He has created a customer persona by choosing the details wisely.
                  Evaluate the deatils and give your feedback.
 
Form data provided by user : ${JSON.stringify(formData)} 

 ### FINAL INSTRUCTION ###
 Return ONLY raw JSON (no backticks, no markdown, no explanations).
 Example format:
 { 
  persona : ""
   score: 1-5 , ##Here always give score between 1 to 5. 
   tip: ##An actionable tip. Max length 30 words.
   feedback : ##A constructive criticism. Max length 30 words. May include praise or criticsm depending on the quality of input provided.
  }
 
 The three fields should never be empty.
  
 Constraints - 
- If name is not a proper person's name, do criticise it and give 1 star. 
 - Always give scores from 1-5.  
 - Tip must suggest something actionable, not vague advice.`,
                },
              ],
            },
          ],
        }
      );

      const aiReply = response.data.candidates[0].content.parts[0].text;
      // console.log(aiReply);
      const parsed = parsePossiblyStringifiedJSON(aiReply);
      // console.log(parsed);



      if (parsed) {
        const scaledScore = parsed.score * 2; // Convert 1–5 to 2–10 scale
        const endTime = Date.now();
        const timeSpentSec = Math.floor((endTime - startTime) / 1000);

        updatePerformance({
          moduleName: "DigitalMarketing",
          topicName: "contentStrategist",
          score: scaledScore,
          accuracy: (parsed.score / 5) * 100, // Accuracy as %
          avgResponseTimeSec: timeSpentSec, // or timeSpentSec / 1 if 1 input = 1 question
          studyTimeMinutes: Math.ceil(timeSpentSec / 60),
          completed: true,
        });
        setStartTime(Date.now());
        completeDMChallenge(0, 1); // already present, keep it
      }

      setResult(parsed);

    } catch (err) {
      setError("Error fetching AI response");
      console.log(err);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    console.log(formData);
    if (
      !formData.name ||
      !formData.ageRange ||
      formData.interests.length === 0 ||
      !formData.socialMedia
    ) {
      toast.error("Please fill in all fields! 🎯");
      return;
    }
    calculateScore();
    setCurrentPage("cards");
  };

  const flipCard = (cardIndex) => {
    if (!flippedCards.includes(cardIndex)) {
      setFlippedCards([...flippedCards, cardIndex]);
    }
  };

  const resetGame = () => {
    setCurrentPage("start");
    setFormData({ name: "", ageRange: "", interests: [], socialMedia: "" });
    setFlippedCards([]);
    setScore(0);
    setFeedback("");
    setResult(null);
    setError("");
    setStartTime(Date.now());
  };

  // Start Screen
  if (currentPage === "start") {
    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full transform hover:scale-105 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎯</div>
            <motion.h1
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-4xl font-bold text-purple-800 mb-2"
            >
              Persona Builder
            </motion.h1>
            <p className="text-pink-600 text-lg font-medium">
              Know Your People!
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-yellow-300">
            <h3 className="font-bold text-orange-800 mb-3 text-xl">
              🎮 Your Mission:
            </h3>
            <p className="text-orange-700 text-md leading-relaxed">
              Help launch "SnackFit" - a protein bar for teens! Create the
              perfect customer persona by choosing their details wisely.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("form")}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-full text-xl hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Building! 🚀
          </button>
        </div>
      </div>
    );
  }

  // Form Screen
  if (currentPage === "form") {
    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 p-4">
        <ToastContainer />
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-purple-800">
                Create Your Persona
              </h2>
            </div>
            <p className="text-purple-600">For SnackFit Protein Bars 💪</p>
          </div>

          <div className="space-y-6">
            {/* Name Input */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
              <label className="block text-purple-800 font-bold mb-3 text-lg">
                👤 Customer Name:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Alex, Sam, Jordan..."
                className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            {/* Age Range */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
              <label className="block text-indigo-800 font-bold mb-3 text-lg">
                🎂 Age Range:
              </label>
              <select
                value={formData.ageRange}
                onChange={(e) =>
                  setFormData({ ...formData, ageRange: e.target.value })
                }
                className="w-full p-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg"
              >
                <option value="">Choose age range...</option>
                {ageOptions.map((age) => (
                  <option key={age} value={age}>
                    {age} years old
                  </option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
              <label className="block text-teal-800 font-bold mb-3 text-lg">
                ❤️ Interests (choose multiple):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${formData.interests.includes(interest.id)
                      ? "bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg"
                      : "bg-white border-2 border-green-200 text-teal-700 hover:bg-green-100"
                      }`}
                  >
                    <div className="text-2xl mb-1">{interest.emoji}</div>
                    <div className="text-sm">{interest.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
              <label className="block text-red-800 font-bold mb-3 text-lg">
                📱 Favorite Social Media:
              </label>
              <select
                value={formData.socialMedia}
                onChange={(e) =>
                  setFormData({ ...formData, socialMedia: e.target.value })
                }
                className="w-full p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none text-lg"
              >
                <option value="">Choose platform...</option>
                {socialMediaOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => setCurrentPage("start")}
              className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-6 rounded-full hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                handleSubmit();
                handleSubmit2();
              }}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Create Persona! ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cards Screen
  if (currentPage === "cards") {
    const cards = [
      {
        title: "Your Persona",
        content: `Meet ${formData.name}! A ${formData.ageRange
          }-year-old who loves ${formData.interests
            .map((id) => interestOptions.find((opt) => opt.id === id)?.label)
            .join(", ")} and spends time on ${formData.socialMedia}.`,
      },
      {
        title: "Feedback",
        content: feedback,
      },
      {
        title: "Pro Tips",
        content:
          "💡 Great personas match product needs with customer interests! Fitness lovers aged 16-22 on Instagram/TikTok are perfect for protein bars. They share their healthy lifestyle and influence friends!",
      },
    ];

    return (
      <div className="min-h-screen w-[90%] mx-auto mt-5 mb-5 rounded-xl bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 p-6 border-4 border-white shadow-[0_0_20px_#facc15] font-[\'Press_Start_2P\',cursive]">
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
        {result && (
          <div className="max-w-4xl mx-auto">
            {/* Score Display */}
            <div className="text-center mb-10">
              <div className="bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-white rounded-3xl shadow-[0_0_30px_#9333ea] p-8 inline-block transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center mb-6">
                  <Trophy className="w-10 h-10 text-yellow-300 mr-3 animate-bounce" />
                  <h2 className="text-4xl font-bold">Your Results!</h2>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-10 h-10 ${star <= result?.score
                        ? "text-yellow-300 drop-shadow-[0_0_5px_gold]"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-white text-lg">
                  {result?.score}/5 Stars
                </p>
              </div>
            </div>

            {/* Flip Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {cards.map((card, index) => (
                <div key={index} className="h-64 perspective ">
                  <div
                    className={`relative w-full  h-full transform transition-transform duration-700 preserve-3d ${flippedCards.includes(index) ? "rotate-y-180" : ""
                      } cursor-pointer`}
                    onClick={() => flipCard(index)}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center text-white backface-hidden hover:shadow-[0_0_20px_#e879f9]">
                      <div className="text-center">
                        <div className="text-5xl mb-3">
                          {index === 0 ? "👤" : index === 1 ? "🎯" : "💡"}
                        </div>
                        <h3 className="text-xl font-bold">{card.title}</h3>
                        <p className="text-xs mt-1 animate-pulse text-pink-200">
                          Tap to reveal!
                        </p>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0  bg-red-200   rounded-2xl shadow-2xl p-6 flex items-center justify-center backface-hidden rotate-y-180 hover:shadow-[0_0_20px_#9333ea]">
                      <div className="text-center text-gray-800">
                        <h3 className="text-xl text-purple-500 font-extrabold mb-3">
                          {card.title}
                        </h3>
                        <p className="text-md text-gray-600 leading-relaxed">
                          {card.title === "Your Persona"
                            ? card.content
                            : card.title === "Feedback"
                              ? result?.feedback
                              : result?.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="text-center space-y-6">
              <p className="text-white text-lg tracking-wide">
                {flippedCards.length < 3
                  ? "Click the cards above to see your results!"
                  : "Ready for another round?"}
              </p>
              <div className="space-x-4">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-blue-500 to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_10px_#3b82f6] hover:scale-110 transition-all duration-300"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  Try Again
                </button>
                <button
                  onClick={() => {
                    resetGame();
                    setCurrentPage("start");
                  }}
                  className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_10px_#10b981] hover:scale-110 transition-all duration-300"
                >
                  New Game
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .perspective {
            perspective: 1200px;
          }
        `}</style>
      </div>
    );
  }
};

export default PersonaBuilderGame;
