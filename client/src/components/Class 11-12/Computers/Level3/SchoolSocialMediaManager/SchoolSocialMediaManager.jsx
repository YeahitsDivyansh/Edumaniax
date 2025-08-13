import React, { useEffect, useState } from "react";
import {
  Star,
  Trophy,
  Calendar,
  Bell,
  Users,
  Book,
  Award,
  MessageCircle,
  ThumbsUp,
  Share2,
} from "lucide-react";
import { useComputers } from "@/contexts/ComputersContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const SchoolSocialMediaManager = () => {
  const { completeComputersChallenge } = useComputers();
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("academic");
  const [selectedTone, setSelectedTone] = useState("friendly");
  const [gameStats, setGameStats] = useState({
    teacherApproval: 0,
    studentLikes: 0,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    studentName: "",
    achievement: "",
    announcement: "",
    subject: "",
  });

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const isGameWon = approvedPosts.filter((post) => post.approved).length >= 10;

  useEffect(() => {
    if (isGameWon) {
      completeComputersChallenge(2, 1);

      const endTime = Date.now();
      const studyTimeMinutes = Math.floor((endTime - startTime) / 60000);

      updatePerformance({
        moduleName: "Computers",
        topicName: "genAIInEverydayLife",
        score: 10,
        accuracy: 100, // actual %
        avgResponseTimeSec: gameStats.avgResponseTimeSec || 0,
        studyTimeMinutes,
        completed: true,
      });
      setStartTime(Date.now());
    }
  }, [isGameWon]);

  const categories = {
    academic: { icon: Book, color: "bg-blue-500", label: "Academic" },
    sports: { icon: Trophy, color: "bg-green-500", label: "Sports" },
    cultural: { icon: Star, color: "bg-purple-500", label: "Cultural" },
    general: { icon: Bell, color: "bg-orange-500", label: "General" },
  };

  const tones = {
    formal: { emoji: "📋", label: "Formal" },
    friendly: { emoji: "😊", label: "Friendly" },
    exciting: { emoji: "🎉", label: "Exciting" },
  };

  const templates = {
    academic: {
      formal: {
        event:
          "📚 Important: [eventName] scheduled for [date] at [location]. Please be punctual and prepared. #AcademicExcellence #[subject]",
        achievement:
          "🏆 We are pleased to announce that [studentName] has achieved [achievement]. Congratulations on this academic milestone! #AcademicSuccess",
        announcement:
          "📢 Academic Notice: [announcement] Please take note and plan accordingly. #SchoolUpdates",
      },
      friendly: {
        event:
          "📖 Hey everyone! [eventName] is happening on [date] at [location]. Looking forward to seeing you all there! #Learning #[subject]",
        achievement:
          "🌟 Shoutout to [studentName] for [achievement]! Your hard work is paying off! Keep it up! #ProudMoment",
        announcement:
          "📝 Quick update: [announcement] Thanks for staying informed! #SchoolLife",
      },
      exciting: {
        event:
          "🚀 AMAZING NEWS! [eventName] is coming up on [date] at [location]! This is going to be EPIC! #CantWait #[subject]",
        achievement:
          "🎊 INCREDIBLE! [studentName] just achieved [achievement]! This is absolutely fantastic news! #Champions",
        announcement:
          "⚡ BIG UPDATE: [announcement] This is going to be awesome! #ExcitingNews",
      },
    },
    sports: {
      formal:
        "🏃‍♂️ Sports Notice: [eventName] scheduled for [date] at [location]. All participants must report 30 minutes early. #SportsDay #Athletics",
      friendly:
        "⚽ Sports update! [eventName] is on [date] at [location]. Come support our teams! #GoTeam #SportsSpirit",
      exciting:
        "🔥 GAME DAY! [eventName] happening [date] at [location]! Let's show our school spirit! #Champions #Victory",
    },
    cultural: {
      formal:
        "🎭 Cultural Event: [eventName] will be held on [date] at [location]. Your participation is encouraged. #CulturalProgram #Arts",
      friendly:
        "🎨 Exciting cultural event! [eventName] on [date] at [location]. Come celebrate creativity with us! #ArtisticExpression #Culture",
      exciting:
        "🌟 SPECTACULAR EVENT! [eventName] is happening [date] at [location]! Prepare to be amazed! #CulturalExtravaganza #Amazing",
    },
    general: {
      formal:
        "ℹ️ Important Notice: [announcement] Please take note of this information. #SchoolNotice #Important",
      friendly:
        "📢 Hey everyone! Just a heads up: [announcement] Have a great day! #SchoolUpdates #Community",
      exciting:
        "🎯 ATTENTION EVERYONE! [announcement] Stay tuned for more updates! #SchoolLife #StayConnected",
    },
  };

  const generatePost = (type) => {
    let template = "";

    if (selectedCategory === "academic") {
      template = templates.academic[selectedTone][type];
    } else if (selectedCategory === "general") {
      template = templates.general[selectedTone];
    } else {
      template = templates[selectedCategory][selectedTone];
    }

    let post = template
      .replace("[eventName]", formData.eventName)
      .replace("[date]", formData.date)
      .replace("[location]", formData.location)
      .replace("[studentName]", formData.studentName)
      .replace("[achievement]", formData.achievement)
      .replace("[announcement]", formData.announcement)
      .replace("[subject]", formData.subject);

    // Add school hashtag
    post += " #OurSchoolRocks";

    setCurrentPost(post);
  };

  const submitPost = () => {
    if (!currentPost.trim()) return;

    const teacherScore = Math.floor(Math.random() * 3) + 3; // 3-5 rating
    const studentScore = Math.floor(Math.random() * 50) + 20; // 20-70 likes

    const newPost = {
      id: Date.now(),
      content: currentPost,
      category: selectedCategory,
      tone: selectedTone,
      teacherRating: teacherScore,
      studentLikes: studentScore,
      approved: teacherScore >= 4,
    };

    setApprovedPosts([...approvedPosts, newPost]);
    setGameStats({
      teacherApproval: gameStats.teacherApproval + (teacherScore >= 4 ? 1 : 0),
      studentLikes: gameStats.studentLikes + studentScore,
    });

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);

    // Reset form
    setCurrentPost("");
    setFormData({
      eventName: "",
      date: "",
      location: "",
      studentName: "",
      achievement: "",
      announcement: "",
      subject: "",
    });
  };

  useEffect(() => {
    if (isGameWon) {
      completeComputersChallenge(2, 1);
    }
  }, [isGameWon]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎓 School Social Media Manager
          </h1>
          <p className="text-gray-600">
            Create engaging posts for your school community!
          </p>
        </div>

        {/* Game Instructions */}
        {/* Game Instructions */}
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-xl mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center bg-gradient-to-r from-indigo-100 to-blue-100 py-3 rounded-lg">
            📋 How to Play
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">
                🎯 Your Mission
              </h3>
              <p className="text-gray-700 mb-3 text-sm">
                You’re the school’s social media manager. Your mission is to
                create{" "}
                <span className="font-bold text-indigo-900">
                  10 impressive posts
                </span>{" "}
                that spark excitement and show great communication skills.
              </p>
              <p className="text-blue-700 text-sm font-semibold bg-blue-100 px-3 py-2 rounded-lg border border-blue-300 mb-3">
                ✅ Target:{" "}
                <span className="font-bold">
                  Get 10 posts approved by teachers
                </span>
              </p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>Impress teachers with clear, well-structured posts ⭐</li>
                <li>Delight students and earn likes ❤️</li>
                <li>Pick the right tone: formal, fun, or exciting</li>
                <li>Use all fields smartly — little details matter!</li>
              </ul>
            </div>

            {/* Quick Start */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold mb-3 text-green-700">
                🚀 Quick Start
              </h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal pl-5">
                <li>Choose a category (Academic, Sports, etc.)</li>
                <li>Select a tone that matches the occasion</li>
                <li>Fill in the details (event name, date, etc.)</li>
                <li>Generate your post using AI</li>
                <li>Submit to see how it performs!</li>
              </ol>
            </div>
          </div>

          {/* Victory Highlight */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
            <p className="text-sm text-blue-800">
              🏆 <strong>Victory Tip:</strong> Want better results? Posts that
              match the mood, give clear info, and feel polished tend to stand
              out and win approval!
            </p>
          </div>

          {/* Pro Tip */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <p className="text-sm text-yellow-900">
              <strong>💡 Pro Tip:</strong> Some tones build trust, others add
              fun. Think about who’s reading and match your message with care —
              that often leads to a green light from teachers! 👍
            </p>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Teacher Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {gameStats.teacherApproval}/10
                </p>
              </div>
              <Award className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Student Likes</p>
                <p className="text-2xl font-bold text-blue-600">
                  {gameStats.studentLikes}
                </p>
              </div>
              <ThumbsUp className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Posts</p>
                <p className="text-2xl font-bold text-purple-600">
                  {approvedPosts.length}
                </p>
              </div>
              <MessageCircle className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Victory Message */}
        {isGameWon && (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
            <p className="text-xl">
              You've successfully created 10 approved posts! You're now a Social
              Media Pro!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Post Creator */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              📝 Create Your Post
            </h2>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Select Post Category:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(categories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === key
                          ? `${category.color} text-white border-transparent`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon size={20} className="inline mr-2" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {selectedCategory === "academic" &&
                  "Perfect for: Test announcements, project deadlines, academic achievements"}
                {selectedCategory === "sports" &&
                  "Perfect for: Match schedules, team celebrations, sports events"}
                {selectedCategory === "cultural" &&
                  "Perfect for: Festivals, art shows, cultural programs"}
                {selectedCategory === "general" &&
                  "Perfect for: Daily updates, menu changes, weather alerts"}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Select Post Tone:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(tones).map(([key, tone]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTone(key)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedTone === key
                        ? "bg-indigo-500 text-white border-transparent"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {tone.emoji} {tone.label}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {selectedTone === "formal" &&
                  "Best for: Official announcements, exam schedules, important notices"}
                {selectedTone === "friendly" &&
                  "Best for: Club meetings, casual events, daily updates"}
                {selectedTone === "exciting" &&
                  "Best for: Competitions, festivals, celebrations"}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {selectedCategory === "academic" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject/Course:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Mathematics, Science, English Literature"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Math Quiz Competition, Science Fair Exhibition"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.eventName}
                      onChange={(e) =>
                        setFormData({ ...formData, eventName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name (for achievements):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Sarah Johnson, Class 10A"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Achievement Details:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., First Place in Regional Math Olympiad"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.achievement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          achievement: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {selectedCategory !== "general" &&
                selectedCategory !== "academic" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name:
                      </label>
                      <input
                        type="text"
                        placeholder={
                          selectedCategory === "sports"
                            ? "e.g., Basketball Championship, Sports Day"
                            : selectedCategory === "cultural"
                            ? "e.g., Annual Cultural Festival, Art Exhibition"
                            : "e.g., School Assembly, Club Meeting"
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.eventName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            eventName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date & Time:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Friday, March 15th at 2:00 PM"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location/Venue:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., School Auditorium, Main Sports Ground"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}

              {selectedCategory === "general" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Announcement Details:
                  </label>
                  <textarea
                    placeholder="e.g., Tomorrow's lunch menu includes pizza and salad, or School closes early due to weather conditions"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    value={formData.announcement}
                    onChange={(e) =>
                      setFormData({ ...formData, announcement: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            {/* Generate Buttons */}
            <div className="space-y-3 mb-6">
              {selectedCategory === "academic" && (
                <>
                  <button
                    onClick={() => generatePost("event")}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    disabled={!formData.eventName || !formData.subject}
                  >
                    📅 Generate Academic Event Post
                  </button>
                  <button
                    onClick={() => generatePost("achievement")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    disabled={!formData.studentName || !formData.achievement}
                  >
                    🏆 Generate Student Achievement Post
                  </button>
                  <button
                    onClick={() => generatePost("announcement")}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    disabled={!formData.announcement}
                  >
                    📢 Generate Academic Announcement
                  </button>
                </>
              )}

              {selectedCategory !== "academic" &&
                selectedCategory !== "general" && (
                  <button
                    onClick={() => generatePost("event")}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    disabled={
                      !formData.eventName ||
                      !formData.date ||
                      !formData.location
                    }
                  >
                    ✨ Generate {categories[selectedCategory].label} Post
                  </button>
                )}

              {selectedCategory === "general" && (
                <button
                  onClick={() => generatePost("announcement")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  disabled={!formData.announcement}
                >
                  📢 Generate General Announcement
                </button>
              )}
            </div>

            {/* Generated Post Preview */}
            {currentPost && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                <h3 className="font-medium mb-2 text-gray-800">
                  ✨ AI Generated Post Preview:
                </h3>
                <div className="bg-white p-3 rounded border border-gray-200 mb-4">
                  <p className="text-gray-700">{currentPost}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Category: {categories[selectedCategory].label} | Tone:{" "}
                    {tones[selectedTone].label}
                  </span>
                  <button
                    onClick={submitPost}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    📤 Submit for Review
                  </button>
                </div>
              </div>
            )}

            {/* Form Validation Helper */}
            {!currentPost && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium mb-2 text-blue-800">
                  💡 Next Steps:
                </h3>
                <p className="text-sm text-blue-700">
                  {selectedCategory === "academic"
                    ? "Fill in the required fields above, then click one of the generation buttons to create your post."
                    : selectedCategory === "general"
                    ? "Add your announcement details and click generate to create your post."
                    : "Fill in the event details (name, date, location) and click generate to create your post."}
                </p>
              </div>
            )}
          </div>

          {/* Post Feed */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              📱 Your Posts
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {approvedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        categories[post.category].color.replace(
                          "bg-",
                          "bg-opacity-20 text-"
                        ) + "-800"
                      }`}
                    >
                      {categories[post.category].label}
                    </span>
                    <span className="text-xs text-gray-500">{post.tone}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-sm text-gray-500">
                        <ThumbsUp size={16} className="mr-1" />
                        {post.studentLikes}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Star size={16} className="mr-1" />
                        {post.teacherRating}/5
                      </span>
                    </div>
                    {post.approved && (
                      <span className="text-green-600 text-sm font-medium">
                        ✅ Approved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">📊 Post Submitted!</h3>
              <p className="text-gray-600 mb-4">
                Your post has been reviewed and feedback is in!
              </p>
              <div className="text-center">
                <p className="text-2xl mb-2">
                  {approvedPosts[approvedPosts.length - 1]?.approved
                    ? "🎉"
                    : "📝"}
                </p>
                <p className="font-medium">
                  {approvedPosts[approvedPosts.length - 1]?.approved
                    ? "Great job! Teachers approved your post!"
                    : "Good effort! Keep practicing to improve!"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolSocialMediaManager;
