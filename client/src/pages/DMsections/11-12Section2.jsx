import React, { useState, useEffect } from "react";
import {
  User,
  Building2,
  Eye,
  MessageCircle,
  Palette,
  Camera,
  Hash,
  CheckCircle,
  ArrowRight,
  Star,
  Lightbulb,
  RefreshCw,
  Users,
  Zap,
  Target,
  Trophy,
} from "lucide-react";

const Module2PersonalBusinessBrand = ({ topicRefs }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentBrandType, setCurrentBrandType] = useState(0);
  const [currentElement, setCurrentElement] = useState(0);
  const [userBrand, setUserBrand] = useState({
    name: "",
    bio: "",
    voice: "",
    themes: "",
    postIdea: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5, 6]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandType((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentElement((prev) => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const brandTypes = [
    {
      type: "Personal Brand",
      description: "Who you are online, what you post, what you stand for",
      example: "A student who shares motivational study tips on Instagram",
      icon: <User className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      type: "Business Brand",
      description: "The identity of a company or product",
      example: "A page that sells eco-friendly notebooks",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
    },
  ];

  const brandElements = [
    {
      title: "Name and Handle",
      description: "Keep it simple, easy to remember, and searchable",
      icon: <Hash className="w-6 h-6" />,
      examples: ["@studywithsana (personal)", "@plantpalsindia (business)"],
      tips: [
        "Use your own name for personal brand",
        "Reflect what you offer for business",
      ],
      color: "green",
    },
    {
      title: "Profile Picture and Bio",
      description: "Your DP and bio are the first impression",
      icon: <Camera className="w-6 h-6" />,
      examples: ["Clear headshot for personal", "Logo for business"],
      tips: ["Keep bio clear and focused", "Say what you do in bio"],
      color: "emerald",
    },
    {
      title: "Brand Voice and Tone",
      description: "How you 'sound' online - should match your personality",
      icon: <MessageCircle className="w-6 h-6" />,
      examples: ["Friendly & Fun", "Calm & Professional", "Witty & Trendy"],
      tips: [
        "Stay consistent across posts",
        "Match your audience expectations",
      ],
      color: "teal",
    },
    {
      title: "Visual Identity",
      description: "Your brand's look - colors, fonts, layout styles",
      icon: <Palette className="w-6 h-6" />,
      examples: ["Same filter/color scheme", "Consistent fonts"],
      tips: ["Use Canva for consistency", "Create recognizable vibe"],
      color: "green",
    },
    {
      title: "Content Themes",
      description: "Your audience should know what to expect",
      icon: <Target className="w-6 h-6" />,
      examples: ["Study hacks + Productivity", "Product demos + Reviews"],
      tips: ["Stick to 2-3 main themes", "Be consistent with content type"],
      color: "emerald",
    },
  ];

  const voiceTypes = [
    {
      type: "Friendly & Fun",
      example: "OMG! You HAVE to try this app for notes 😍",
      color: "bg-green-100 text-green-700",
    },
    {
      type: "Calm & Professional",
      example: "5 key strategies to boost your study routine.",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      type: "Witty & Trendy",
      example: "Your books called. They miss you. 📚💔",
      color: "bg-teal-100 text-teal-700",
    },
  ];

  const whyBrandingMatters = [
    {
      title: "Trust",
      description: "People buy from or follow those they trust",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "green",
    },
    {
      title: "Recognition",
      description: "A strong brand makes you memorable",
      icon: <Eye className="w-8 h-8" />,
      color: "emerald",
    },
    {
      title: "Growth",
      description:
        "Brands grow faster because they look professional and reliable",
      icon: <Trophy className="w-8 h-8" />,
      color: "teal",
    },
  ];

  const handleInputChange = (field, value) => {
    setUserBrand((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      id="s-2"
      ref={(el) => {
        if (topicRefs?.current) {
          topicRefs.current["s-2"] = el;
        }
      }}
      className="mb-10"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <Star className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Building Your Brand
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Create a powerful personal or business identity that stands out
              and builds trust
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* What is a Brand Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is a Brand?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-400">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong className="text-green-600">brand</strong> is not just
                a name or logo—it's how people
                <strong className="text-emerald-600"> feel</strong> and{" "}
                <strong className="text-teal-600">think</strong> about you or
                your business.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It's the{" "}
                <strong className="text-green-600">
                  personality, voice, and vibe
                </strong>{" "}
                you give off online or offline.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">💬</div>
                <h3 className="text-lg font-bold text-gray-800">
                  Jeff Bezos, Founder of Amazon:
                </h3>
              </div>
              <blockquote className="text-gray-600 italic text-lg border-l-4 border-green-400 pl-4">
                "A brand is what people say about you when you're not in the
                room."
              </blockquote>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Your Brand Identity
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-green-600" />
                      <p className="text-gray-700 font-medium">
                        How people perceive you
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                      <p className="text-gray-700 font-medium">
                        Your unique voice & style
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-teal-400 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-teal-600" />
                      <p className="text-gray-700 font-medium">
                        What makes you memorable
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal vs Business Brand */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Personal vs. Business Brand
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding the difference helps you choose the right approach
            </p>
          </div>

          {/* Auto-rotating Brand Types */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">
                Currently Highlighting
              </div>
              <div
                className={`bg-gradient-to-r ${brandTypes[currentBrandType].color} text-white rounded-2xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-500`}
              >
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-white">
                    {brandTypes[currentBrandType].icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold mb-3">
                      {brandTypes[currentBrandType].type}
                    </h3>
                    <p className="text-xl opacity-90 mb-4">
                      {brandTypes[currentBrandType].description}
                    </p>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>Example:</strong>{" "}
                        {brandTypes[currentBrandType].example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-green-200">
                    <th className="text-left py-4 px-6 text-xl font-bold text-gray-800">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-xl font-bold text-gray-800">
                      Description
                    </th>
                    <th className="text-left py-4 px-6 text-xl font-bold text-gray-800">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-100 hover:bg-white/50 transition-colors duration-300">
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-green-700">
                          Personal Brand
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-gray-700">
                      Who <em>you</em> are online, what you post, what you stand
                      for
                    </td>
                    <td className="py-6 px-6 text-gray-700">
                      A student who shares motivational study tips on Instagram
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors duration-300">
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-2">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-emerald-700">
                          Business Brand
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-gray-700">
                      The identity of a company or product
                    </td>
                    <td className="py-6 px-6 text-gray-700">
                      A page that sells eco-friendly notebooks
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">Pro Tip:</h3>
            </div>
            <p className="text-gray-700">
              You can have both! A student might run a business selling digital
              planners (business brand) while also posting time management tips
              (personal brand).
            </p>
          </div>
        </div>

        {/* Elements of Strong Brand */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Elements of a Strong Brand
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The main parts that build a solid brand identity
            </p>
          </div>

          {/* Featured Element (Auto-rotating) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-lg text-gray-600 mb-4">
                Currently Highlighting
              </div>
              <div
                className={`bg-gradient-to-r from-${
                  brandElements[currentElement].color
                }-500 to-${
                  brandElements[currentElement].color === "green"
                    ? "emerald"
                    : brandElements[currentElement].color === "emerald"
                    ? "teal"
                    : "green"
                }-500 text-white rounded-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500`}
              >
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-white">
                    {brandElements[currentElement].icon}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-3xl font-bold mb-3">
                      {brandElements[currentElement].title}
                    </h3>
                    <p className="text-xl opacity-90 mb-4">
                      {brandElements[currentElement].description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-sm font-semibold mb-2">Examples:</p>
                        {brandElements[currentElement].examples.map(
                          (example, idx) => (
                            <p key={idx} className="text-sm opacity-90">
                              • {example}
                            </p>
                          )
                        )}
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-sm font-semibold mb-2">Tips:</p>
                        {brandElements[currentElement].tips.map((tip, idx) => (
                          <p key={idx} className="text-sm opacity-90">
                            • {tip}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Elements Grid */}
          <div className="grid md:grid-cols-5 gap-4">
            {brandElements.map((element, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-${element.color}-50 to-${
                  element.color === "green"
                    ? "emerald"
                    : element.color === "emerald"
                    ? "teal"
                    : "green"
                }-50 border-2 border-${
                  element.color
                }-200 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  currentElement === index
                    ? `ring-4 ring-${element.color}-300 scale-105`
                    : ""
                } ${
                  visibleCards.includes(index) ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setCurrentElement(index)}
              >
                <div
                  className={`bg-gradient-to-r from-${element.color}-500 to-${
                    element.color === "green"
                      ? "emerald"
                      : element.color === "emerald"
                      ? "teal"
                      : "green"
                  }-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4`}
                >
                  {element.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {element.title}
                </h3>
                <p className="text-sm text-gray-600">{element.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Voice Examples */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Brand Voice Examples
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {voiceTypes.map((voice, index) => (
              <div
                key={index}
                className={`${
                  voice.color
                } rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 3)
                    ? "animate-fade-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 3) * 200}ms` }}
              >
                <h3 className="font-bold text-lg mb-4">{voice.type}</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 italic">"{voice.example}"</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-lg text-gray-700">
              <strong className="text-green-600">Remember:</strong> Stay{" "}
              <strong className="text-emerald-600">consistent</strong> with your
              tone across all your posts!
            </p>
          </div>
        </div>

        {/* Why Branding Matters */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Is Branding Important?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyBrandingMatters.map((reason, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-${reason.color}-50 to-${
                  reason.color === "green"
                    ? "emerald"
                    : reason.color === "emerald"
                    ? "teal"
                    : "green"
                }-50 rounded-2xl p-8 text-center border-2 border-${
                  reason.color
                }-200 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 6)
                    ? "animate-fade-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
              >
                <div
                  className={`bg-gradient-to-r from-${reason.color}-500 to-${
                    reason.color === "green"
                      ? "emerald"
                      : reason.color === "emerald"
                      ? "teal"
                      : "green"
                  }-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}
                >
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Branding Comparison */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Social Media Branding in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">❌</div>
                <h3 className="text-xl font-bold text-red-700">
                  Profile A - Weak Brand
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Random posts, inconsistent tone</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Bio says "random stuff lol"</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>No clear idea who runs the page</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-green-700">
                  Profile B - Strong Brand
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Organized, same color palette</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Bio says "CBSE Class 12 | Study Tips"</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Face visible, consistent name</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Trophy className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">Result:</h3>
            </div>
            <p className="text-lg text-gray-700">
              Profile B builds trust, gets more shares and followers, and starts
              growing quickly.
            </p>
          </div>
        </div>

        {/* Rebranding Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <RefreshCw className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Rebranding: It's Okay to Evolve
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                You might start as{" "}
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                  @boardexam_buddy
                </span>{" "}
                but later grow into{" "}
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">
                  @theexamcoach
                </span>{" "}
                with better visuals and content style.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400">
                <p className="text-lg text-gray-700">
                  That's called{" "}
                  <strong className="text-green-600">rebranding</strong>, and
                  it's totally normal! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Activity */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Build Your Own Brand
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Create a draft of your personal or project brand
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Name/Handle:
                  </label>
                  <input
                    type="text"
                    value={userBrand.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="@studywithsana"
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Bio:
                  </label>
                  <textarea
                    value={userBrand.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Study tips for Class 12 | Helping you score better"
                    rows="3"
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Brand Voice:
                  </label>
                  <select
                    value={userBrand.voice}
                    onChange={(e) => handleInputChange("voice", e.target.value)}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  >
                    <option value="">Choose your voice</option>
                    <option value="friendly">Friendly & Fun</option>
                    <option value="professional">Calm & Professional</option>
                    <option value="witty">Witty & Trendy</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Content Themes:
                  </label>
                  <input
                    type="text"
                    value={userBrand.themes}
                    onChange={(e) =>
                      handleInputChange("themes", e.target.value)
                    }
                    placeholder="Study hacks, Productivity tips"
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Sample Post Idea:
                  </label>
                  <textarea
                    value={userBrand.postIdea}
                    onChange={(e) =>
                      handleInputChange("postIdea", e.target.value)
                    }
                    placeholder="5 study hacks that actually work for exams"
                    rows="3"
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </div>

                {/* Brand Preview */}
                {(userBrand.name || userBrand.bio) && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">
                      Your Brand Preview:
                    </h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {userBrand.name
                            ? userBrand.name.charAt(0).toUpperCase()
                            : "?"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">
                            {userBrand.name || "Your Name"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {userBrand.bio || "Your bio here..."}
                          </p>
                        </div>
                      </div>
                      {userBrand.voice && (
                        <div className="mt-3 p-2 bg-green-50 rounded border-l-4 border-green-400">
                          <p className="text-xs text-gray-600">
                            Voice:{" "}
                            <span className="font-semibold text-green-600">
                              {userBrand.voice}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  // Simple feedback animation
                  const button = document.getElementById("save-brand-btn");
                  if (button) {
                    button.innerHTML = "✅ Saved!";
                    setTimeout(() => {
                      button.innerHTML = "💾 Save My Brand";
                    }, 2000);
                  }
                }}
                id="save-brand-btn"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                💾 Save My Brand
              </button>
            </div>
          </div>
        </div>

        {/* Recap Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Recap: Key Terms
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                term: "Brand",
                meaning:
                  "The identity or image people associate with you or your business",
                icon: <Star className="w-6 h-6" />,
                color: "green",
              },
              {
                term: "Personal Brand",
                meaning: "How you present yourself online",
                icon: <User className="w-6 h-6" />,
                color: "emerald",
              },
              {
                term: "Business Brand",
                meaning: "The identity of a company, shop, or product",
                icon: <Building2 className="w-6 h-6" />,
                color: "teal",
              },
              {
                term: "Visual Identity",
                meaning: "Consistent look and design elements",
                icon: <Palette className="w-6 h-6" />,
                color: "green",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-${item.color}-50 to-${
                  item.color === "green"
                    ? "emerald"
                    : item.color === "emerald"
                    ? "teal"
                    : "green"
                }-50 rounded-2xl p-6 border-2 border-${
                  item.color
                }-200 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 7)
                    ? "animate-fade-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 7) * 150}ms` }}
              >
                <div
                  className={`bg-gradient-to-r from-${item.color}-500 to-${
                    item.color === "green"
                      ? "emerald"
                      : item.color === "emerald"
                      ? "teal"
                      : "green"
                  }-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {item.term}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Self-Test Questions */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-l-4 border-green-400">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Quick Questions to Test Yourself
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "What's the difference between a personal brand and a business brand?",
              "Why is it important to have a consistent tone and theme?",
              "Give one example of a strong Instagram bio for a student-led page.",
              "What does visual identity include?",
              "Why do people rebrand?",
            ].map((question, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-400 transform hover:scale-105 transition-all duration-300 ${
                  visibleCards.includes(index + 11)
                    ? "animate-fade-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 11) * 200}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Remember: A strong brand takes time to build, but every post,
              every interaction, and every piece of content is a step toward
              creating something memorable and trustworthy.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400">
              <p className="text-xl font-bold text-gray-800">
                Start small, stay consistent, and watch your brand grow! 🌱✨
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Module2PersonalBusinessBrand;
