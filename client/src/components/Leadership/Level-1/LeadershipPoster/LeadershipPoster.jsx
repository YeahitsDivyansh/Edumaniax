import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LeadershipPoster = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [quote, setQuote] = useState("");
  const [theme, setTheme] = useState("blue");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const isReady = title.trim() && subtitle.trim() && quote.trim();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center">My Leadership Poster</h1>
        <p className="text-center text-gray-600 mt-2">
          Turn your leadership style and goals into a bold, share-worthy poster.
        </p>

        {!submitted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Poster Title</label>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Visionary Leader"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="e.g., I lead with empathy and focus"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Signature Quote</label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Small steps, big impact."
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <div className="flex items-center gap-3">
                  {[
                    { id: "blue", cls: "from-blue-600 to-blue-400" },
                    { id: "green", cls: "from-emerald-600 to-emerald-400" },
                    { id: "purple", cls: "from-purple-600 to-purple-400" },
                    { id: "orange", cls: "from-orange-600 to-orange-400" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`h-8 w-8 rounded-full bg-gradient-to-br ${t.cls} border-2 ${
                        theme === t.id ? "border-black" : "border-transparent"
                      }`}
                      aria-label={t.id}
                    />
                  ))}
                </div>
              </div>
              <button
                disabled={!isReady}
                onClick={() => setSubmitted(true)}
                className={`px-4 py-2 rounded text-white ${
                  isReady ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                }`}
              >
                Save Poster
              </button>
            </div>

            <div>
              <div
                className={`aspect-[3/4] w-full rounded-xl shadow-xl overflow-hidden bg-gradient-to-br ${
                  theme === "green"
                    ? "from-emerald-600 to-emerald-400"
                    : theme === "purple"
                    ? "from-purple-600 to-purple-400"
                    : theme === "orange"
                    ? "from-orange-600 to-orange-400"
                    : "from-blue-600 to-blue-400"
                } text-white p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-90">Leadership Poster</div>
                  <div className="mt-2 text-2xl font-extrabold break-words">{title || "Your Title"}</div>
                  <div className="mt-1 text-base opacity-95 break-words">{subtitle || "Your subtitle"}</div>
                </div>
                <div className="bg-white/15 rounded-lg p-4">
                  <div className="text-sm leading-relaxed break-words">{quote || "Your quote will appear here."}</div>
                </div>
                <div className="text-right text-xs opacity-90">edumaniax</div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">Live Preview</p>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto mt-10 text-center space-y-4">
            <div className="text-3xl">🎉</div>
            <h2 className="text-2xl font-bold text-green-700">Poster Saved</h2>
            <p className="text-gray-700">
              Great work. You captured your leadership style and voice in a clean visual.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Poster
              </button>
              <Link to="/conflict-simulator">
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Continue to Next Game
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadershipPoster;


