import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Activity, BarChart3 } from "lucide-react";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-purple-200 p-3 rounded-xl shadow-lg text-sm text-left">
        <p className="font-bold text-purple-700">🔄 Round {label}</p>
        <p>📘 <strong>Event:</strong> {data.event}</p>
        <p>🎯 <strong>Inputs:</strong> ₹{data.inputs.price}, ₹{data.inputs.marketing}, {data.inputs.support}</p>
        <p>📦 <strong>Units Sold:</strong> {data.unitsSold}</p>
        <p>💰 <strong>Profit:</strong> ₹{data.profit}</p>
      </div>
    );
  }
  return null;
};

const marketEvents = [
  {
    message: "A competitor enters with a cheaper product.",
    effect: { demand: -20, trust: 0 }
  },
  {
    message: "Your marketing goes viral for one week.",
    effect: { demand: 30, trust: 5 }
  },
  {
    message: "Customers start complaining about delivery delays.",
    effect: { demand: -10, trust: -20 }
  },
  {
    message: "A news article boosts eco-friendly product popularity.",
    effect: { demand: 20, trust: 10 }
  }
];

const supportCostMap = { Low: 0, Medium: 1000, High: 2000 };

const SimulatedMarketGame = () => {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [round, setRound] = useState(1);
  const [price, setPrice] = useState(150);
  const [marketing, setMarketing] = useState(1000);
  const [support, setSupport] = useState("Medium");
  const [event, setEvent] = useState(null);
  const [results, setResults] = useState([]);
  const [final, setFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const restartGame = () => {
    setRound(1);
    setPrice(150);
    setMarketing(1000);
    setSupport("Medium");
    setEvent(null);
    setResults([]);
    setFinal(false);
    setErrorMsg("");
    setStartTime(Date.now());
  };

  const playRound = () => {
    setLoading(true);
    setErrorMsg("");

    const selectedEvent = marketEvents[Math.floor(Math.random() * marketEvents.length)];
    setEvent(selectedEvent);

    try {
      // --- Realistic base values ---
      const baseDemand = 1200;              // Avg potential customer base
      const baseCostPerUnit = 80;           // Lower than price to allow margin
      const baseSatisfaction = 70;          // Starts relatively high
      const competitorPrice = 150;          // Industry average for comparison

      // --- Price elasticity: higher price reduces demand, but increases margin
      const priceFactor = Math.max(1 - (price - competitorPrice) / 200, 0.4);  // Demand decreases after 150
      const marketingBoost = marketing / 1000;  // Scales 0–5
      const eventDemandBoost = selectedEvent.effect.demand / 100;
      const finalDemandFactor = Math.max(priceFactor + marketingBoost + eventDemandBoost, 0);

      const unitsSold = Math.floor(baseDemand * finalDemandFactor);

      // --- Revenue and costs ---
      const revenue = unitsSold * price;
      const supportCost = support === "High" ? 3000 : support === "Medium" ? 1500 : 500;
      const variableCost = unitsSold * baseCostPerUnit;
      const totalCost = variableCost + marketing + supportCost;
      const profit = revenue - totalCost;

      // --- Satisfaction logic ---
      const supportImpact = support === "High" ? 15 : support === "Medium" ? 5 : -10;
      const satisfaction = Math.min(baseSatisfaction + supportImpact + selectedEvent.effect.trust, 100);

      // --- Market share shift logic (approximate) ---
      const avgMarketSales = 1000;  // Benchmark for market comparison
      const marketShareChange = Math.round(((unitsSold - avgMarketSales) / avgMarketSales) * 100);

      // --- Build round result ---
      const result = {
        round,
        event: selectedEvent.message,
        unitsSold,
        revenue,
        profit,
        satisfaction,
        marketShareChange,
        inputs: { price, marketing, support }
      };

      setResults(prev => [...prev, result]);

      if (round === 3) {
        completeEntreprenerushipChallenge(1, 1);

        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - startTime) / 1000);
        updatePerformance({
          moduleName: "Entrepreneurship",
          topicName: "strategist",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: timeSpent,
          studyTimeMinutes: Math.ceil(timeSpent / 60),
          completed: true,
        });
        setStartTime(Date.now());


        setFinal(true);
      }
      else {
        setRound(prev => prev + 1);
      }
    } catch (error) {
      console.error("Simulation error:", error);
      setErrorMsg("❌ An error occurred during the simulation.");
    } finally {
      setLoading(false);
    }
  };



  const totalProfit = results.reduce((acc, r) => acc + r.profit, 0);
  const avgSatisfaction = Math.round(results.reduce((acc, r) => acc + r.satisfaction, 0) / results.length || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-100 p-6">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 bg-opacity-80 rounded-[2.5rem] shadow-2xl p-8 border-4 border-dashed border-pink-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          <motion.div
            className="flex items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Left Icon with Bounce */}
            <motion.div
              className="p-4 rounded-full bg-gradient-to-br from-pink-200 to-pink-100 shadow-xl"
              initial={{ x: -120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            >
              <BarChart3 className="w-12 h-12 text-pink-600 animate-pulse" />
            </motion.div>

            {/* Glowing Title with Reveal and Wiggle */}
            <motion.h1
              className="text-5xl sm:text-6xl font-black text-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] tracking-wide"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 3, -2, 0] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut", // ✅ Changed from 'spring' to 'easeInOut'
                delay: 0.6,
              }}
            >
              Simulated Market War
            </motion.h1>

            {/* Right Icon with Rotate & Glow */}
            <motion.div
              className="p-4 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-100 shadow-xl"
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            >
              <Activity className="w-12 h-12 text-yellow-500 animate-spin-slow" />
            </motion.div>
          </motion.div>




          <motion.p
            className="text-lg mt-4 text-gray-800 px-4 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 1,
              type: "spring",
              stiffness: 80,
              damping: 12
            }}
          >
            🎮 <span className="text-blue-600 font-bold">Get ready for <span className="text-red-500 font-extrabold">3 epic rounds ! </span></span><br />
            Set your <span className="font-bold text-pink-600">Product Price 💰</span>,
            <span className="font-bold text-yellow-500"> Marketing Budget 📣</span>, and
            <span className="font-bold text-purple-600"> Customer Support Level 🧑‍💼</span>, then hit
            <span className="italic text-green-600"> "Submit Strategy"</span> to see what happens! <br />
            🌪️ <span className="text-red-500 font-bold">Watch out!</span> A random
            <span className="italic underline decoration-dotted decoration-red-400"> market event </span>
            might shake up your results!
          </motion.p>
        </motion.div>


        {/* 🧭 Round Progress Indicator */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map(r => {
            const isDone = final || r < round;
            const isCurrent = !final && r === round;
            const isUpcoming = !final && r > round;

            return (
              <div
                key={r}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2
        ${isDone ? 'bg-green-100 border-green-400 text-green-800' :
                    isCurrent ? 'bg-yellow-100 border-yellow-400 text-yellow-800' :
                      'bg-gray-100 border-gray-300 text-gray-500'}`}
              >
                {isDone ? '✅' : isCurrent ? '🕒' : '⏳'} Round {r}
              </div>
            );
          })}
        </div>


        {!final ? (
          <>
            <div className="space-y-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-6 rounded-[2rem] shadow-2xl border-4 border-purple-200 transition-all duration-500">

              <div className="text-left space-y-4">
                {/* 🎨 Strategy Customization Card */}
                <div className="bg-gradient-to-br from-purple-50 via-pink-100 to-yellow-50 p-6 rounded-3xl shadow-xl transition-transform hover:scale-[1.02]">
                  <h2 className="text-3xl font-extrabold text-purple-600 text-center mb-6 drop-shadow-sm">
                    🛠️ Customize Your Strategy!
                  </h2>

                  <div className="space-y-6 text-left">
                    {/* 🏷️ Price Input */}
                    <div>
                      <label className="block text-lg font-bold text-pink-600 mb-2">
                        🏷️ Product Price (₹100–₹300): <span className="text-purple-700">₹{price}</span>
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="300"
                        value={price}
                        onChange={e => setPrice(+e.target.value)}
                        className="w-full h-3 rounded-lg bg-pink-200 accent-pink-600"
                      />
                    </div>

                    {/* 📣 Marketing Input */}
                    <div>
                      <label className="block text-lg font-bold text-yellow-600 mb-2">
                        📣 Marketing Budget (₹0–₹5000): <span className="text-orange-600">₹{marketing}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={marketing}
                        onChange={e => setMarketing(+e.target.value)}
                        className="w-full h-3 rounded-lg bg-yellow-200 accent-yellow-500"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-center text-gray-500 mt-6 italic">
                    🎯 Tip: Lower prices attract more buyers. More marketing brings attention — but it costs higher!
                  </p>
                </div>

                {/* 💬 Support Selection */}
                <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6 rounded-3xl shadow-xl transition-transform hover:scale-[1.02]">
                  <h2 className="text-3xl font-extrabold text-purple-600 text-center mb-6 drop-shadow-sm">💬 Choose Your Support Squad!</h2>

                  <div className="flex justify-center gap-6">
                    {["Low", "Medium", "High"].map(level => (
                      <button
                        key={level}
                        onClick={() => setSupport(level)}
                        className={`px-6 py-3 rounded-full text-lg font-bold border-4 transition-all duration-300 
                ${support === level
                            ? "bg-green-400 text-white border-green-700 shadow-xl scale-105"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                          }`}
                      >
                        {level === "Low" && "🐣 Tiny Help"}
                        {level === "Medium" && "🧑‍🏫 Helpful Team"}
                        {level === "High" && "🦸 Super Support"}
                      </button>
                    ))}
                  </div>

                  <p className="text-center text-sm text-gray-600 mt-4 italic">
                    🌟 Higher support = happier customers, but it costs higher !
                  </p>
                </div>
              </div>

              {/* 🚀 Play Button */}
              <button
                onClick={playRound}
                disabled={loading}
                className={`w-full py-3 text-lg font-bold rounded-full transition-all duration-300 
        ${loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white"
                  }`}
              >
                {loading ? "⏳ Thinking..." : "🚀 Submit Strategy!"}
              </button>

              {/* ❌ Error Message */}
              {errorMsg && <p className="text-red-600 mt-3 font-semibold text-center">❌ {errorMsg}</p>}
            </div>

            {/* 🌪️ Event Display */}
            {event && (
              <div className="mt-6 bg-gradient-to-br from-yellow-100 via-white to-pink-100 p-6 rounded-[2rem] shadow-2xl border-4 border-yellow-400 transition-all duration-500 space-y-4">
                <h3 className="text-3xl font-extrabold text-orange-600 mb-3 flex items-center gap-2">
                  🌪️ Surprise Market Twist!
                </h3>

                <p className="text-lg text-gray-800">
                  📘 <span className="font-bold text-purple-700">Scenario:</span> {event.message}
                </p>

                <div className="bg-white/70 border-l-4 border-blue-400 p-4 rounded-xl shadow-sm space-y-1">
                  <p className="text-md text-blue-700 font-semibold">
                    🔍 Impact {event.effect.demand > 0 ? "increased" : event.effect.demand < 0 ? "decreased" : "unchanged"} by{" "}
                    <span className={event.effect.demand > 0 ? "text-green-600" : event.effect.demand < 0 ? "text-red-500" : "text-gray-700"}>
                      {Math.abs(event.effect.demand)}%
                    </span>
                  </p>
                  <p className="text-md text-blue-700 font-semibold">
                    ⚖️ Trust {event.effect.trust > 0 ? "increased" : event.effect.trust < 0 ? "decreased" : "unchanged"} by{" "}
                    <span className={event.effect.trust > 0 ? "text-green-600" : event.effect.trust < 0 ? "text-red-500" : "text-gray-700"}>
                      {Math.abs(event.effect.trust)}%
                    </span>
                  </p>
                </div>

                <p className="text-center text-sm italic text-gray-500">
                  ✨ Stay smart — each round brings unexpected changes!
                </p>
              </div>

            )}
          </>

        ) : (
          <div className="space-y-6 bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 p-8 rounded-3xl shadow-xl mt-6">
            <div className="text-center bg-gradient-to-r from-pink-100 via-yellow-100 to-purple-100 p-4 rounded-2xl shadow-lg border-2 border-pink-300">
              <p className="text-xl font-semibold text-purple-700 mb-2">
                🎉 You are now a
                <span className="text-pink-600 font-extrabold mx-2 inline-block animate-bounce">🏅 Strategy Master</span>
                !
              </p>
              <p className="text-md text-gray-700">See your business report below 👇</p>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-purple-600 mb-6 tracking-wide animate-bounce drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
              🏁 Final Business Report
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <p className="text-xl bg-white bg-opacity-70 rounded-2xl p-4 shadow-md">
                💰 <strong>Total Profit:</strong><br />₹{totalProfit}
              </p>
              <p className="text-xl bg-white bg-opacity-70 rounded-2xl p-4 shadow-md">
                😊 <strong>Avg Satisfaction:</strong><br />{avgSatisfaction}
              </p>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-bold text-purple-700 text-center">
                📊 Visual Summary
              </h3>

              {/* 🔵 Units Sold – Gradient Bars */}
              {/* 📦 Units Sold Bar Chart */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-purple-700 text-center mb-2">📦 Units Sold Over Rounds</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={results}>
                    <defs>
                      <linearGradient id="barUnits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" tickFormatter={r => `🏁 Round ${r}`} />
                    <YAxis
                      label={{
                        value: 'Units Sold',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 10,
                        dx: -10, // shifts label further left
                        style: { textAnchor: 'middle', fill: '#4b5563', fontWeight: 'bold' },
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="unitsSold" fill="url(#barUnits)" name="Units Sold" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 💰 Profit Line Chart */}
              <div>
                <h3 className="text-xl font-bold text-green-700 text-center mb-2">💰 Profit Over Rounds</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" tickFormatter={r => `🏁 Round ${r}`} />
                    <YAxis
                      label={{
                        value: 'Profit (₹)',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 10,
                        dx: -10, // shifts label further left
                        style: { textAnchor: 'middle', fill: '#4b5563', fontWeight: 'bold' },
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#34d399"
                      strokeWidth={4}
                      dot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#a7f3d0' }}
                      name="Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>

        )}

        {results.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">📦 Outcome Reports</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {results.map(r => (
                <motion.div
                  key={r.round}
                  className="bg-white bg-opacity-80 border-2 border-yellow-200 rounded-3xl p-4 shadow-lg text-left"
                  whileHover={{ scale: 1.03 }}
                >
                  <p className="text-lg font-bold text-purple-700 mb-2">
                    🔄 Round {r.round}
                  </p>
                  <p>📘 <strong>Event:</strong> {r.event}</p>
                  <p>🎯 <strong>Inputs:</strong> ₹{r.inputs.price}, ₹{r.inputs.marketing}, {r.inputs.support}</p>
                  <p>📦 <strong>Units:</strong> {r.unitsSold}</p>
                  <p>💵 <strong>Revenue:</strong> ₹{r.revenue}</p>
                  <p>💰 <strong>Profit:</strong> ₹{r.profit}</p>
                  <p>😊 <strong>Satisfaction:</strong> {r.satisfaction}</p>
                  <p>📉 <strong>Market Share:</strong> {r.marketShareChange}%</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <motion.button
                onClick={restartGame}
                whileTap={{ scale: 0.9 }}
                className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:to-purple-600 text-white font-extrabold px-8 py-4 rounded-full shadow-xl"
              >
                🔁 Play Again
              </motion.button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SimulatedMarketGame;
