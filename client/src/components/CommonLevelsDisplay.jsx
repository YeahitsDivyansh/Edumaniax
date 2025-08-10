/**
 * Common LevelsDisplay Component
 * 
 * This component provides unified level display and access control for all game modules.
 * It can be used across Leadership, Entrepreneurship, Finance, etc.
 */

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGameAccess } from "../hooks/useGameAccess";

const difficultyMap = {
  0: {
    label: "Beginner",
    color: "bg-[#DCFCE7]",
    stripColor: "bg-[#16A34A]", // Vibrant green
    textColor: "text-[#016630]",
    icon: "/imageForDesign/Be.svg",
    role: {
      label: "Explorer",
      bg: "bg-pink-100",
      textColor: "text-[#CC348D]",
      icon: "/imageForDesign/Explorer.png",
    },
    mascot: "/imageForDesign/level-1.png",
  },
  1: {
    label: "Intermediate",
    color: "bg-[#9C73001A]",
    stripColor: "bg-[#EAB308]", // Vibrant yellow
    textColor: "text-yellow-900",
    icon: "/imageForDesign/Intermediate.png",
    role: {
      label: "Builder",
      bg: "bg-[#CC348D1A]",
      textColor: "text-[#CC348D]",
      icon: "/imageForDesign/Builder.png",
    },
    mascot: "/imageForDesign/level-2.png",
  },
  2: {
    label: "Advance",
    color: "bg-[#FEE2E2]",
    stripColor: "bg-[#DC2626]", // Vibrant red
    textColor: "text-[#BC0808]",
    icon: "/imageForDesign/Advance.png",
    role: {
      label: "Hero",
      bg: "bg-[#FCE7F3]",
      textColor: "text-[#CC348D]",
      icon: "/imageForDesign/Hero.png",
    },
    mascot: "/imageForDesign/level-3.png",
  },
  3: {
    label: "Pro",
    color: "bg-[#FF3D3A1A]", // Distinct soft indigo background
    stripColor: "bg-[#4338CA]", // Rich indigo strip
    textColor: "text-[#BC0808]",
    icon: "/imageForDesign/Pro.png", // Add this icon
    role: {
      label: "Champ",
      bg: "bg-[#CC348D1A]", // Lavender-like soft role background
      textColor: "text-[#CC348D]", // Violet text
      icon: "/imageForDesign/Master.png", // Add this icon
    },
    mascot: "/imageForDesign/level-4.png",
  },
};

/**
 * Common LevelsDisplay Component
 * @param {Object} props - Component props
 * @param {Array} props.modules - Array of module objects with challenges
 * @param {string} props.moduleKey - Module key for access control (e.g., 'leadership')
 * @param {Array} props.progress - Progress array from module context
 * @param {boolean} props.showDebug - Whether to show debug information
 */
const CommonLevelsDisplay = ({ 
  modules, 
  moduleKey, 
  progress = [], 
  showDebug = false 
}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  // Use the common game access hook
  const {
    isChallengeUnlocked,
    getChallengeButtonConfig,
    getAccessInfo,
    currentPlan,
    isLoading
  } = useGameAccess(moduleKey, progress);

  const buttonBaseClasses =
    "btn-standard flex items-center justify-center gap-2 px-4 py-2 w-[120px] h-[40px] rounded-md text-sm font-semibold shadow transition duration-200";

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {modules.map((module, index) => {
        const difficulty = difficultyMap[index] || difficultyMap[0];
        const isExpanded = expanded[index];
        const accessInfo = getAccessInfo(index + 1);

        return (
          <div
            key={index}
            className="relative rounded-xl border shadow-sm p-4 pl-5 overflow-hidden bg-white"
          >
            {/* ✅ Left Color Strip using vibrant color */}
            <div
              className={`absolute top-0 left-0 h-full w-2 rounded-l-xl ${difficulty.stripColor}`}
            ></div>

            {/* Header + Toggle */}
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-start gap-4">
                <img
                  src={difficulty.mascot}
                  alt="Mascot"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {module.description}
                  </p>

                  {/* ✅ Updated Badges */}
                  <div className="flex gap-3 mt-3 items-center flex-wrap text-xs font-medium">
                    {/* Difficulty Tag */}
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${difficulty.color} ${difficulty.textColor}`}
                    >
                      <img
                        src={difficulty.icon}
                        alt="Difficulty"
                        className="h-4 w-4"
                      />
                      <span>{difficulty.label}</span>
                    </div>

                    {/* Role Tag */}
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${difficulty.role.textColor} ${difficulty.role.bg}`}
                    >
                      <img
                        src={difficulty.role.icon}
                        alt={difficulty.role.label}
                        className="h-4 w-4"
                      />
                      <span>{difficulty.role.label}</span>
                    </div>

                    {/* Access Status Badge */}
                    {accessInfo.hasAccess ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Unlocked</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span>Premium</span>
                      </div>
                    )}
                  </div>

                  {/* Debug Information */}
                  {showDebug && currentPlan && (
                    <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                      <div>Plan: {accessInfo.currentPlan}</div>
                      <div>Module: {moduleKey}</div>
                      <div>Level {index + 1} Access: {accessInfo.hasAccess ? 'Yes' : 'No'}</div>
                      <div>Selected Module: {accessInfo.selectedModule || 'None'}</div>
                      {accessInfo.isTrialValid !== null && (
                        <div>Trial Valid: {accessInfo.isTrialValid ? 'Yes' : 'No'}</div>
                      )}
                      {accessInfo.remainingDays !== null && (
                        <div>Trial Days Left: {accessInfo.remainingDays}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
                {isExpanded ? (
                  <ChevronUp className="text-green-600 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-green-600 w-5 h-5" />
                )}
              </div>
            </div>

            {/* Challenge List */}
            {isExpanded && (
              <ul className="mt-4 space-y-3 transition-all duration-300 ease-in-out">
                {module.challenges.map((challenge, i) => {
                  const isUnlocked = isChallengeUnlocked(index, i, modules);
                  const buttonConfig = getChallengeButtonConfig(isUnlocked, challenge, navigate);

                  return (
                    <li
                      key={i}
                      className="border rounded-md px-4 py-3 flex items-center justify-between gap-4 bg-white shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={
                            isUnlocked
                              ? "/imageForDesign/play-button.png"
                              : "/imageForDesign/red-lock.png"
                          }
                          alt="icon"
                          className="w-6 h-6 mt-1"
                        />
                        <div className="flex-1">
                          <p className="font-medium">
                            {`Challenge ${i + 1}: ${challenge.title}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {challenge.description}
                          </p>
                          {challenge.duration && (
                            <p className="text-xs text-gray-500 mt-1">
                              Duration: {challenge.duration}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={buttonConfig.onClick}
                        className={`${buttonBaseClasses} ${buttonConfig.className}`}
                        title={isUnlocked ? "Start challenge" : "Upgrade to unlock"}
                      >
                        <img 
                          src={buttonConfig.icon} 
                          alt={buttonConfig.type === 'start' ? "Start Icon" : "Unlock Icon"} 
                          className="w-4 h-4" 
                        />
                        <span className="whitespace-nowrap">{buttonConfig.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommonLevelsDisplay;
