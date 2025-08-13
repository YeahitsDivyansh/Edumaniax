import React, { useState,useEffect } from "react";
import { Card, CardContent } from "../../Level1/LeanMachineGame/Card";
import { Button } from "../../Level1/LeanMachineGame/Button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import { motion } from "framer-motion";
import ThinkingEmoji from "@/components/ThinkingEmoji";
import MoneyAnimation from "@/components/Money";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const totalBudget = 100000;
const categories = ["Product Dev", "Marketing", "Operations", "Team"];
const colors = ["#f87171", "#facc15", "#60a5fa", "#a78bfa"];

const dilemmas = [
  {
    id: 1,
    text: "🔥 Marketing campaign underperformed. Add ₹10K more or pivot to influencers?",
    options: ["Add ₹10K to Marketing", "Pivot to Influencers"]
  },
  {
    id: 2,
    text: "👥 Dev team asks for tools upgrade. Invest ₹5000 or delay sprint?",
    options: ["Upgrade Tools", "Delay Sprint"]
  },
  {
    id: 3,
    text: "💻 Server crash: Pay ₹10,000 or delay launch by 2 weeks?",
    options: ["Pay ₹10,000", "Delay Launch"]
  },
  {
    id: 4,
    text: "🎯 Influencer offers promotion at 60% discount – take it?",
    options: ["Take the Deal", "Skip Offer"]
  }
];

export default function StartupFinanceFunGame() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const [allocations, setAllocations] = useState({});
  const [spent, setSpent] = useState(0);
  const [step, setStep] = useState("instructions");
  const [dilemmaIndex, setDilemmaIndex] = useState(0);
  const [decisionLog, setDecisionLog] = useState([]);
  const [showLogic, setShowLogic] = useState(false);
  const [prevAllocations, setPrevAllocations] = useState({});

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());
  const currentDilemma = dilemmas[dilemmaIndex];

  useEffect(() => {
    if (!currentDilemma && decisionLog.length === dilemmas.length) {
      const endTime = Date.now();
      const elapsedTimeSec = Math.floor((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "Entrepreneurship",
        topicName: "strategist",
        score: starRating * 2,
        accuracy: starRating * 20,
        avgResponseTimeSec: elapsedTimeSec / dilemmas.length,
        studyTimeMinutes: Math.ceil(elapsedTimeSec / 60),
        completed: true,
       
      });
      setStartTime(Date.now());

    }
  }, [currentDilemma]);

  const handleAllocation = (category, value) => {
    const num = parseInt(value) || 0;
    const updated = { ...allocations, [category]: num };
    const total = Object.values(updated).reduce((a, b) => a + b, 0);
    if (total <= totalBudget) {
      setAllocations(updated);
      setSpent(total);
    }
  };

  const getChartData = () =>
    categories.map((cat, i) => ({
      category: cat,
      amount: allocations[cat] || 0,
      fill: colors[i]
    }));

  const getStrategy = () => {
    const marketing = allocations["Marketing"] || 0;
    if (marketing > 40000) return "🚀 Aggressive Marketer";
    if (marketing < 20000) return "🧘 Calm Planner";
    return "🎯 Balanced Builder";
  };

  const handleDilemmaChoice = (choice) => {
    const before = { ...allocations }; // Save before-change snapshot
    const newAllocations = { ...allocations };

    const current = dilemmas[dilemmaIndex];

    if (current.id === 1 && choice === "Add ₹10K to Marketing") {
      newAllocations["Marketing"] = (newAllocations["Marketing"] || 0) + 10000;
    }
    if (current.id === 2 && choice === "Upgrade Tools") {
      newAllocations["Product Dev"] = (newAllocations["Product Dev"] || 0) + 5000;
    }
    if (current.id === 3 && choice === "Pay ₹10,000") {
      newAllocations["Operations"] = (newAllocations["Operations"] || 0) + 10000;
    }
    if (current.id === 4 && choice === "Take the Deal") {
      newAllocations["Marketing"] = (newAllocations["Marketing"] || 0) + 6000;
    }

    const total = Object.values(newAllocations).reduce((a, b) => a + b, 0);
    if (total <= totalBudget) {
      setAllocations(newAllocations);
      setSpent(total);
    }

    // ✅ Save this decision with before/after snapshot
    setDecisionLog((prev) => [
      ...prev,
      {
        dilemma: current.text,
        choice,
        before,
        after: newAllocations,
      },
    ]);

    setDilemmaIndex((prev) => {
      const nextIndex = prev + 1;
      // ✅ Award badge only once when last dilemma is completed
      if (nextIndex === dilemmas.length) {
        completeEntreprenerushipChallenge(1, 2);
      }
      return nextIndex;
    });
  };

  const estimatedLeads = Math.floor((allocations["Marketing"] || 0) / 500);
  const conversionRate = 0.15; // from 0.1
  const avgSale = 1500;        // from 1000
  const leads = estimatedLeads;
  const CAC = (allocations["Marketing"] || 0) / (leads || 1);
  const MRR = leads * conversionRate * avgSale;
  const monthlyBurn = Math.floor((spent || 1) / 6);
  const runway = Math.floor((totalBudget - spent) / (monthlyBurn || 1));
  const ROI = ((MRR * 6 - spent) / spent) * 100;
  const starRating = Math.min(5, Math.floor((MRR / 5000) + (runway / 2)));

  const renderRevenueForecast = () => {
    const forecastData = [
      { name: "CAC", value: CAC },
      { name: "MRR(Monthly Recurring Revenue)", value: MRR },
      { name: "Burn Rate", value: monthlyBurn },
      { name: "Runway", value: runway }
    ];


    return (
      <Card className="mt-10">
        <CardContent>
          <h2 className="text-xl font-bold text-indigo-700 mb-4">📊 Revenue Forecast Simulator</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <ReLegend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };
  return (
    <div className="p-6 bg-gradient-to-tr from-yellow-100 via-pink-100 to-blue-100 min-h-screen">

      {step === "instructions" && (
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-8 rounded-3xl shadow-xl border-4 border-dashed border-pink-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold text-fuchsia-700 drop-shadow-lg animate-bounce">
            🧠 Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500">Startup Finance Lab</span>
          </h1>
          <p className="text-xl font-medium text-gray-800 leading-relaxed">
            🎮 You’re the 🧑‍💼 CFO of a young startup for 7 days! <br />
            💸 Plan how to spend your <span className="font-bold text-green-700">₹1,00,000</span> smartly across:
            <br />
            🛠️ <span className="text-purple-700 font-semibold">Product</span>,
            📣 <span className="text-pink-600 font-semibold">Marketing</span>,
            ⚙️ <span className="text-blue-600 font-semibold">Operations</span>, and
            👥 <span className="text-yellow-600 font-semibold">Team</span>.
            <br />
            💥 Face surprising financial twists, 💡 make clever choices,
            and 🏆 impress investors with your strategy!
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4315/4315441.png"
            alt="Money Bag"
            className="w-28 mx-auto animate-wiggle"
          />
          <Button onClick={() => setStep("budget")} className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition">
            🚀 Let’s Begin the Adventure!
          </Button>
        </motion.div>

      )}

      {step === "budget" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.h1
            className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-yellow-300 drop-shadow-lg mb-6 pb-4"
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            🚀 Startup Finance Lab
          </motion.h1>


          <Card className="bg-white rounded-xl shadow-xl border-4 border-dashed border-blue-300">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-extrabold text-emerald-600">💸 Budget Allocation</h2>
              <p className="text-md text-gray-700">
                Total Budget: ₹{totalBudget.toLocaleString()} | Spent: ₹{spent.toLocaleString()} ({Math.round((spent / totalBudget) * 100)}%)
              </p>
              {categories.map((cat) => {
                const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);
                const remaining = totalBudget - totalAllocated + (allocations[cat] || 0);
                const safeMax = Math.max(0, Math.min(totalBudget, remaining));
                const percentage = Math.round(((allocations[cat] || 0) / totalBudget) * 100);

                return (
                  <div key={cat} className="flex items-center gap-4">
                    <label className="w-40 text-lg font-semibold text-purple-600">{cat}:</label>
                    <input
                      type="range"
                      min={0}
                      max={safeMax}
                      value={allocations[cat] || 0}
                      onChange={(e) => handleAllocation(cat, e.target.value)}
                      className="accent-pink-500 w-full"
                    />
                    <span className="text-pink-600 font-bold">
                      ₹{allocations[cat] || 0} ({percentage}%)
                    </span>
                  </div>
                );
              })}

            </CardContent>
          </Card>

          <Card className="mt-6 bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 shadow-lg rounded-xl p-4">
            <CardContent>
              <h2 className="text-xl font-bold text-purple-700 mb-2">📊 Budget Allocation Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getChartData()}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {getChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ReTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <ReLegend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {renderRevenueForecast()}
          <div className="flex flex-col items-center mt-6 space-y-3">
            {spent === 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-red-500 font-semibold animate-bounce"
              >
                ⚠️ Allocate at least some budget to proceed!
              </motion.p>
            )}

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Button
                onClick={() => {
                  setPrevAllocations({ ...allocations }); // ✅ Capture BEFORE changes
                  setStep("dilemma");
                }}
                disabled={spent === 0}
                className="bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎯 Next
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}


      {step === "dilemma" && currentDilemma && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2"
        >
          <motion.h1
            className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-yellow-300 drop-shadow-lg mb-2 pb-2"
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            🚀 Startup Finance Lab
          </motion.h1>

          <Card className="bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 border-4 border-dashed border-orange-300 shadow-xl rounded-3xl p-6">
            <CardContent className="space-y-6 text-center">
              <motion.h2
                className="text-3xl font-extrabold text-rose-600 animate-pulse"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2 }}
              >
                💥 Financial Twist!
              </motion.h2>

              <motion.p
                className="text-lg font-semibold text-gray-800"
                initial={{ rotate: -1 }}
                animate={{ rotate: 1 }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
              >
                {currentDilemma.text}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {currentDilemma.options.map((opt, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      onClick={() => handleDilemmaChoice(opt)}
                      className="bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-3 w-full rounded-full font-bold shadow-lg"
                    >
                      {opt}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <ThinkingEmoji />
            </CardContent>
          </Card>
        </motion.div>
      )}


      {step === "dilemma" && !currentDilemma && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="text-center px-2 pt-2 pb-6"
        >
          <motion.h1
            className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-yellow-300 drop-shadow-lg mb-2 pb-2"
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            🚀 Startup Finance Lab
          </motion.h1>
          <div className="bg-white border-4 border-dashed border-indigo-300 rounded-3xl shadow-xl px-6 py-6 max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-extrabold text-green-700 animate-pulse">
              🏁 Week Complete! Great Job CEO!
            </h2>

            <p className="text-2xl">
              🌟 Investor Scorecard: <span className="font-bold text-purple-700">⭐ {starRating} / 5</span>
            </p>

            <p className="text-lg text-rose-600">🧯 Runway Health: <strong>{runway}</strong> months</p>
            <p className="text-lg text-green-600">💰 Cash Balance: ₹{(totalBudget - spent).toLocaleString()}</p>
            <p className="text-lg text-blue-600">📈 ROI Estimate: {ROI.toFixed(2)}%</p>

            <MoneyAnimation />

            <Button
              onClick={() => setShowLogic(!showLogic)}
              className="text-blue-700 underline hover:font-semibold bg-transparent shadow-none"
            >
              {showLogic ? "Hide Calculation Logic" : "Show Calculation Logic"}
            </Button>

            {showLogic && (
              <div className="bg-yellow-50 border border-yellow-300 p-4 rounded shadow-md text-left text-sm text-gray-700">
                <p>📊 <strong>Calculations:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>🧲 Leads = Marketing / 500 → {leads}</li>
                  <li>🎯 CAC = Marketing / Leads → {CAC.toFixed(2)}</li>
                  <li>💵 MRR = Leads × Conversion × Avg Sale → {MRR.toLocaleString()}</li>
                  <li>🔥 Burn Rate = Spent / 6 → {monthlyBurn}</li>
                  <li>🛟 Runway = (Budget - Spent) / Burn Rate → {runway}</li>
                  <li>📊 ROI = ((MRR × 6) - Spent) / Spent × 100 → {ROI.toFixed(2)}%</li>
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {decisionLog.map((log, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-400">
                  <p className="font-bold mb-1">📌 {log.dilemma}</p>
                  <p className="text-sm text-gray-700 mb-1">🧠 You chose: <span className="font-semibold text-green-600">{log.choice}</span></p>
                  <div className="grid grid-cols-2 text-sm">
                    {categories.map((cat) => {
                      const before = log.before[cat] || 0;
                      const after = log.after[cat] || 0;
                      return before !== after ? (
                        <p key={cat} className="col-span-2 text-blue-700">
                          ➡️ {cat}: ₹{before} → ₹{after}
                        </p>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-6 bg-gradient-to-tr from-pink-100 via-yellow-100 to-blue-100 shadow-lg rounded-xl p-4 max-w-xl mx-auto">
              <CardContent>
                <h2 className="text-xl font-bold text-purple-700 mb-2 text-center">📊 Final Budget Allocation</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categories.map((cat, i) => ({
                        category: cat,
                        amount: allocations[cat] || 0,
                        fill: colors[i]
                      }))}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {categories.map((cat, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Pie>
                    <ReTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <ReLegend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-300 p-5 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">🎮 Smart Tips to Win!</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-900 text-left">
                <li>📣 Keep Marketing high to get more leads.</li>
                <li>🛠️ Keep Product Dev medium to handle tools and features.</li>
                <li>⚙️ Keep Operations ready for surprise problems.</li>
                <li>👥 Keep some budget for Team — don’t ignore it.</li>
                <li>💰 Try to keep Burn Rate low.</li>
                <li>📈 Try to keep ROI high.</li>
                <li>🧠 Choose the option that helps your weak category.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-tr from-yellow-100 via-pink-100 to-blue-100 border-2 border-yellow-300 rounded-3xl shadow-xl p-6 max-w-3xl mx-auto mt-6 text-left space-y-3">
              <h2 className="text-2xl font-extrabold text-purple-800 text-center">🎉 Congratulations, Young AI Entrepreneur!</h2>
              <p className="text-md text-gray-800 text-center font-semibold">You did it!</p>
              <p className="text-sm text-gray-700">
                You’ve completed the <strong>AI + Entrepreneurship Advanced Module</strong> — an incredible journey of creativity, innovation, and impact.
              </p>
              <p className="text-sm text-gray-700">You’ve learned how to:</p>
              <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
                <li>👀 Spot real-life problems</li>
                <li>💡 Design smart, AI-powered solutions</li>
                <li>🔧 Build prototypes and get feedback</li>
                <li>⚖️ Think ethically and act responsibly</li>
                <li>🎤 Pitch your ideas with passion and confidence</li>
              </ul>
              <p className="text-sm text-gray-700">
                This is not just the end of a course — it’s the beginning of your journey as a future innovator, creator, and changemaker.
              </p>
              <p className="text-md text-green-700 font-semibold">Keep building. Keep dreaming. The world needs your ideas.</p>
              <p className="text-xl font-extrabold text-green-700 text-center">🏆 You are now officially a Young AI Entrepreneur!</p>
            </div>


            <Button
              onClick={() => {
                setAllocations({});
                setSpent(0);
                setStep("instructions");
                setDilemmaIndex(0);
                setDecisionLog([]);
                setShowLogic(false);
                setStartTime(Date.now());

              }}
              className="mt-6 bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 shadow-lg"
            >
              🔁 Play Again
            </Button>
          </div>
        </motion.div>

      )}

    </div>
  );
}