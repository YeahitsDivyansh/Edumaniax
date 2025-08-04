import React, { useEffect, useState } from "react";
import PlatformCard from "./PlatformCard";
import { PlatformAnalysis } from "./PlatformAnalysis";
import { WhatIfSimulator } from "./WhatIfSimulator";
import { motion } from "framer-motion"; // Make sure to import motion
import toast from 'react-hot-toast';
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const initialData = [
  {
    name: "YouTube Shorts",
    views: 1000,
    clicks: 300,
    ctr: 30, // CTR: 300/1000 * 100
    sales: 30,
    label: null,
  },
  {
    name: "Instagram Stories",
    views: 1200,
    clicks: 180,
    ctr: 15, // CTR: 180/1200 * 100
    sales: 12,
    label: null,
  },
  {
    name: "Google Search Ads",
    views: 1500,
    clicks: 100,
    ctr: 6.7, // CTR: 100/1500 * 100
    sales: 5,
    label: null,
  },
];

/**
 * Determines the performance emoji based on conversion rate and click-through rate.
 * @param {object} platform - The platform data.
 * @returns {string} - The emoji representing performance (🔥, 👍, 😴).
 */
function getPerformanceEmoji(platform) {
  const conversionRate = (platform.sales / platform.views) * 100;
  if (conversionRate >= 2 && platform.ctr >= 20) return "🔥";
  if (conversionRate >= 1 || platform.ctr >= 15) return "👍";
  return "😴";
}

/**
 * Generates a summary of the platform's performance, including CTR and conversion rate calculation.
 * @param {object} platform - The platform data.
 * @returns {string} - A detailed performance summary.
 */
function getPerformanceSummary(platform) {
  const salesConversionRate = ((platform.sales / platform.clicks) * 100).toFixed(2);

  let summary = `CTR is ${platform.ctr.toFixed(2)}%, which means the ad is `; // Use toFixed(2) for CTR here too
  summary += platform.ctr >= 20 ? "very engaging." : platform.ctr >= 10 ? "moderately engaging." : "not engaging enough.";

  // Displaying the conversion rate calculation for clarity
  summary += ` Sales conversion rate (${platform.sales} sales / ${platform.clicks} clicks) is ${salesConversionRate}%, so `;

  summary += salesConversionRate >= 10 ? "sales performance is great." : salesConversionRate >= 5 ? "sales are okay." : "you may need to improve your landing page or product.";

  return summary;
}

export default function AnalyticsDashboard() {
  const { completeDMChallenge } = useDM();
  const [challengeCompleted, setChallengeCompleted] = useState(false);


  const [platforms, setPlatforms] = useState(initialData);
  const [selected, setSelected] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [draggedLabel, setDraggedLabel] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");


  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (!challengeCompleted) return;

    const endTime = Date.now();
    const timeTakenSec = Math.floor((endTime - startTime) / 1000);
    const studyTimeMinutes = Math.ceil(timeTakenSec / 60);

    updatePerformance({
      moduleName: "DigitalMarketing",
      topicName: "marketer",
      score: 10,
      accuracy: 100,
      avgResponseTimeSec: timeTakenSec,
      studyTimeMinutes,
      completed: true,
      
    });
     setStartTime(Date.now());
  }, [challengeCompleted]);


  /**
   * Handles the simulation of increased sales, clicks, and views for a given platform.
   * Based on an investment amount, it calculates proportional increases AND applies a small improvement to CTR and conversion rate.
   * @param {string} platformName - The name of the platform to simulate.
   * @param {number} amount - The investment amount (e.g., 100 for ₹100).
   */
  const handleSimulate = (platformName, amount) => {
    // If you are using a toast library, uncomment this line:
    toast.success("Simulation Applied!");

    setPlatforms(prevPlatforms => {
      return prevPlatforms.map((p) => {
        if (p.name === platformName) {
          // Rule: 6 sales per ₹100 investment
          const salesIncreaseBase = Math.floor((amount / 100) * 6);

          // Calculate current sales per click and CTR for the platform
          const currentSalesPerClickRate = p.clicks > 0 ? (p.sales / p.clicks) * 100 : 5.0; // Default 5% if no clicks
          const currentCtr = p.views > 0 ? (p.clicks / p.views) * 100 : 15.0; // Default 15% if no views

          // Define an absolute improvement for CTR and Sales Conversion Rate
          // These values are added to the current rates for each simulation.
          const ctrAbsoluteIncrease = 0.5; // e.g., CTR goes from 10% to 10.5%
          const salesConversionAbsoluteIncrease = 0.1; // e.g., Sales Conversion goes from 4% to 4.1%

          // Calculate the NEW TARGET rates
          let newTargetCtr = Math.min(currentCtr + ctrAbsoluteIncrease, 100); // Cap at 100%
          let newTargetSalesConversionRate = Math.min(currentSalesPerClickRate + salesConversionAbsoluteIncrease, 100); // Cap at 100%

          // Calculate new total sales
          const newSales = p.sales + salesIncreaseBase;

          // Calculate new total clicks needed to achieve the new sales with the NEW TARGET conversion rate
          // Formula: newSales = newClicks * (newTargetSalesConversionRate / 100)
          // => newClicks = newSales / (newTargetSalesConversionRate / 100)
          let newClicks = Math.ceil(newSales / (newTargetSalesConversionRate / 100));

          // Calculate new total views needed to achieve the new clicks with the NEW TARGET CTR
          // Formula: newClicks = newViews * (newTargetCtr / 100)
          // => newViews = newClicks / (newTargetCtr / 100)
          let newViews = Math.ceil(newClicks / (newTargetCtr / 100));

          // Ensure views and clicks don't decrease, although with these calculations they should only increase
          newViews = Math.max(p.views, newViews);
          newClicks = Math.max(p.clicks, newClicks);

          // Recalculate the final CTR based on the potentially adjusted newViews and newClicks for accurate display
          const finalCtr = Number(((newClicks / newViews) * 100).toFixed(2));


          // Return the updated platform with increased views, clicks, sales, and the improved CTR
          return {
            ...p,
            views: newViews,
            clicks: newClicks,
            sales: newSales,
            ctr: finalCtr, // Update the CTR property with the new, improved value
          };
        }
        return p;
      });
    });
  };


  /**
   * Handles dropping a label onto a platform card.
   * Updates the platform's label and provides contextual feedback.
   * @param {string} platformName - The name of the platform being labeled.
   * @param {string} label - The label being dropped (e.g., 'Great', 'Okay', 'Needs Work').
   */
  const handleDrop = (platformName, label) => {
    // Update the platform with the new label in the main platforms array
    const updatedPlatforms = platforms.map((p) =>
      p.name === platformName ? { ...p, label } : p
    );
    setPlatforms(updatedPlatforms);

    // Find the platform that was just updated to get its current performance AND new label
    const updatedPlatform = updatedPlatforms.find(p => p.name === platformName);
    const performanceEmoji = updatedPlatform ? getPerformanceEmoji(updatedPlatform) : '';

    // IMPORTANT: Update the 'selected' state with the new platform object.
    // This ensures the displayed selected.label in the UI is current.
    setSelected(updatedPlatform);

    // Initialize the message for feedback
    let message = `You labeled ${platformName} as "${label}".`;

    // Customize feedback based on label and performance
    if (label === "Great") {
      if (performanceEmoji === "🔥") {
        message += ` Excellent! It's truly performing exceptionally well! `;
      } else if (performanceEmoji === "👍") {
        message += ` That's a positive outlook! Let's aim for even better. `;
      } else {
        message += ` Hmm, the performance doesn't quite match. Consider reviewing its metrics. `;
      }
    } else if (label === "Okay") {
      if (performanceEmoji === "👍") {
        message += ` Spot on! It's doing reasonably well, but there's room for growth. `;
      } else if (performanceEmoji === "🔥") {
        message += ` Are you sure? This platform seems to be a star! Re-evaluate? `;
      } else {
        message += ` Yes, 'Okay' seems accurate for its current state. Time to optimize! `;
      }
    } else if (label === "Needs Work") {
      if (performanceEmoji === "😴") {
        message += ` Agreed. This one needs attention to improve its performance. `;
      } else if (performanceEmoji === "👍") {
        message += ` It's performing 'Okay', but if you see potential, it's worth optimizing! `;
      } else {
        message += ` Oh, a 'Needs Work' label for a high-performer? Let's investigate further! `;
      }
    }

    if (!challengeCompleted && (
      (performanceEmoji === "🔥" && label === "Great") ||
      (performanceEmoji === "👍" && label === "Okay") ||
      (performanceEmoji === "😴" && label === "Needs Work")
    )) {
      completeDMChallenge(2, 2);
      setChallengeCompleted(true);
    }

    setFeedbackMessage(message);
    // Message disappears after 3 seconds for better UX
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  // Framer Motion variants for draggable labels
  const labelItemVariants = {
    hover: { scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 },
  };

  /**
   * Returns Tailwind CSS classes for specific label styles.
   * @param {string} label - The label name.
   * @returns {string} - Tailwind CSS classes for background and text color.
   */
  const getLabelStyle = (label) => {
    switch (label) {
      case 'Great':
        return 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300';
      case 'Okay':
        return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300';
      case 'Needs Work':
        return 'bg-orange-200 text-orange-800 hover:bg-orange-300';
      default:
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
  };

  return (
    <div className="w-[95%] max-w-7xl mx-auto p-4 md:p-6 min-h-screen" style={{ fontFamily: "'Comic Neue', cursive" }}>
      <div className="p-4 md:p-6 min-h-[80vh] rounded-2xl shadow-2xl bg-gradient-to-br from-pink-200 to-yellow-100">
        {/* Main Dashboard Heading with subtle motion */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: 0.3,
            },
          }}
          whileInView={{
            y: [0, -2, 0], // Very subtle up-down motion
            transition: {
              duration: 8,      // Very slow duration
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 1.5,
            },
          }}
          className="animate-bounce text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-purple-800"
        >
          📊 Analytics Adventure Dashboard
        </motion.h1>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((p) => (
            <PlatformCard
              key={p.name}
              platform={{ ...p, emoji: getPerformanceEmoji(p) }}
              onClick={setSelected}
              onDrop={handleDrop}
              draggedLabel={draggedLabel}
            />
          ))}
        </div>

        {/* Detailed Analysis Section (conditionally rendered) */}
        {selected && (
          <div className="mt-8 p-6 rounded-xl shadow-md border border-yellow-200 bg-gradient-to-br from-pink-200 to-yellow-100">
            {/* Analysis Header and Chart Type Buttons */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {selected.name} Analysis {getPerformanceEmoji(selected)}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${chartType === "bar" ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => setChartType("pie")}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${chartType === "pie" ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                >
                  Pie Chart
                </button>
              </div>
            </div>

            {/* Chart and Performance Summary Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Performance Summary Box */}
              <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-xl border border-purple-200">
                <h3 className="font-extrabold mb-3 text-xl text-purple-800 flex items-center">
                  ✨ Performance Summary
                </h3>
                <p className="text-gray-800 text-base leading-relaxed">
                  {getPerformanceSummary(selected)}
                </p>
              </div>
              {/* Platform Analysis Chart */}
              <div className="flex-1">
                <PlatformAnalysis platform={selected} chartType={chartType} />
              </div>
            </div>

            {/* Drag a flag to label section */}
            <div className="mt-6 bg-white bg-opacity-80 p-6 rounded-2xl shadow-md border border-gray-200">
              <p className="mb-3 text-lg font-semibold text-gray-700 text-center">
                Label this platform by dragging a flag:
              </p>
              <div className="flex gap-3 mb-4 justify-center">
                {['Great', 'Okay', 'Needs Work'].map((label) => (
                  <motion.div
                    key={label}
                    className={`px-4 py-2 rounded-full shadow-md cursor-grab active:cursor-grabbing text-sm font-bold ${getLabelStyle(label)}`}
                    draggable
                    onDragStart={() => setDraggedLabel(label)}
                    variants={labelItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    🚩 {label}
                  </motion.div>
                ))}
              </div>

              {/* Drop Zone */}
              <div
                onDrop={() => handleDrop(selected.name, draggedLabel)}
                onDragOver={(e) => e.preventDefault()}
                className="mt-6 border-2 border-dashed border-purple-400 bg-purple-50 bg-opacity-70 p-6 text-center rounded-xl transition-all duration-300 hover:bg-purple-100 hover:border-purple-600 hover:shadow-inner text-purple-700 font-semibold text-lg"
              >
                Drop a flag here to categorize: <strong>{selected.label || " "}</strong>
              </div>

              {/* Feedback Message */}
              {feedbackMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} // Framer motion for exiting state
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg shadow-sm text-center font-medium"
                >
                  {feedbackMessage}
                </motion.p>
              )}
            </div>
          </div>
        )}

        {/* What-If Simulator Section */}
        <WhatIfSimulator onSimulate={handleSimulate} />
      </div>
    </div>
  );
}
