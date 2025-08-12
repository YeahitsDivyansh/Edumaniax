import React, { useState, useEffect, useMemo, useCallback } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import GameNav from "./GameNav"; 
import Checknow from "@/components/icon/GreenBudget/Checknow"; 
import ThinkingCloud from "@/components/icon/ThinkingCloud"; 
import IntroScreen from "./IntroScreen"; 
import InstructionsScreen from "./InstructionsScreen"; 
import { useNavigate } from "react-router-dom";

// Placeholder contexts (assuming these are correct)
const useEnvirnoment = () => ({ completeEnvirnomentChallenge: () => {} });
const usePerformance = () => ({ updateEnvirnomentPerformance: () => {} });

// Game Data (unchanged)
const gameLevels = [
  { id: 1, location: "Maldives", correctImpact: "Sea level rise" },
  { id: 2, location: "Arctic", correctImpact: "Ice caps melting" },
  { id: 3, location: "Uttarakhand", correctImpact: "Flash floods and landslides" },
  { id: 4, location: "Rajasthan", correctImpact: "Drought and desertification" },
  { id: 5, location: "Sundarbans", correctImpact: "Cyclones and habitat loss" },
  { id: 6, location: "Amazon Forest", correctImpact: "Deforestation & carbon loss" },
  { id: 7, location: "Chennai", correctImpact: "Urban flooding" },
  { id: 8, location: "Antarctica", correctImpact: "Melting glaciers" },
];
const allImpactOptions = [
  "Sea level rise", "Cyclones and habitat loss", "Ice caps melting", "Deforestation & carbon loss",
  "Flash floods and landslides", "Urban flooding", "Drought and desertification", "Melting glaciers",
];

// Re-styled Components (ImpactOptionCard, VictoryScreen, LosingScreen, ReviewScreen - unchanged)
// ... (Your component functions for ImpactOptionCard, VictoryScreen, etc. go here) ...
function ImpactOptionCard({ impactText, isSelected, onClick, isDisabled }) {
  const cardClasses = `
    relative flex items-center justify-center p-4 h-[85px] 
    rounded-xl cursor-pointer transition-all duration-200 ease-in-out
    ${isSelected
      ? "bg-[#202f36] border-2 border-[#5f8428] shadow-[0_4px_0_0_#5f8428]"
      : "bg-[#131f24] border-2 border-[#37464f] shadow-[0_4px_0_0_#37464f]"
    }
    ${isDisabled && !isSelected
      ? "opacity-50 cursor-not-allowed"
      : "hover:scale-105"
    }
  `;
  const textClasses = `
    font-['Inter'] text-center text-base font-medium 
    ${isSelected ? "text-[#79b933]" : "text-[#f1f7fb]"}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <span className={textClasses}>{impactText}</span>
    </div>
  );
}


// Victory, Losing, and Review screens are re-used with minor text/logic changes handled in the main component.
// NOTE: Make sure to pass a "gameTitle" prop to Intro and Instructions screens, or update their text internally.

function VictoryScreen({ onContinue, onViewFeedback, accuracyScore, insight }) {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
      <div className="flex flex-col justify-between h-screen bg-[#0A160E] text-center">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <img src="/financeGames6to8/trophy-rotating.gif" alt="Rotating Trophy" className="absolute w-full h-full object-contain" />
            <img src="/financeGames6to8/trophy-celebration.gif" alt="Celebration Effects" className="absolute w-full h-full object-contain" />
          </div>
          <h2 className="text-yellow-400 lilita-one-regular text-3xl sm:text-4xl font-bold mt-6">Challenge Complete!</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="w-64 bg-[#09BE43] rounded-xl p-1 flex flex-col items-center">
              <p className="text-black text-sm font-bold mb-1 mt-2">TOTAL ACCURACY</p>
              <div className="bg-[#131F24] mt-0 w-63 h-16 rounded-xl flex items-center justify-center py-3 px-5">
                <img src="/financeGames6to8/accImg.svg" alt="Target Icon" className="w-6 h-6 mr-2" />
                <span className="text-[#09BE43] text-xl font-extrabold">{accuracyScore}%</span>
              </div>
            </div>
            <div className="w-74 bg-[#FFCC00] rounded-xl p-1 flex flex-col items-center">
              <p className="text-black text-sm font-bold mb-1 mt-2">INSIGHT</p>
              <div className="bg-[#131F24] mt-0 w-73 h-16 rounded-xl flex items-center justify-center px-4 text-center">
                <span className="text-[#FFCC00] lilita-one-regular text-sm font-medium italic">{insight}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2f3e46] border-t border-gray-700 py-4 px-6 flex justify-center gap-6">
          <img src="/financeGames6to8/feedback.svg" alt="Feedback" onClick={onViewFeedback} className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200" />
          <img src="/financeGames6to8/next-challenge.svg" alt="Next Challenge" onClick={onContinue} className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200" />
        </div>
      </div>
    </>
  );
}

function LosingScreen({ onPlayAgain, onViewFeedback, onContinue, insight }) {
    return (
        <div className="flex flex-col justify-between h-screen bg-[#0A160E] text-center">
            <div className="flex flex-col items-center justify-center flex-1 p-6">
                <img src="/financeGames6to8/game-over-game.gif" alt="Game Over" className="w-64 h-auto mb-6" />
                <p className="text-yellow-400 lilita-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center">Oops! That was close! Wanna Retry?</p>
                <div className="mt-6 w-74 bg-[#FFCC00] rounded-xl p-1 flex flex-col items-center">
                    <p className="text-black text-sm font-bold mb-1 mt-2">INSIGHT</p>
                    <div className="bg-[#131F24] mt-0 w-73 h-16 rounded-xl flex items-center justify-center px-4 text-center">
                        <span className="text-[#FFCC00] lilita-one-regular text-sm font-medium italic">{insight}</span>
                    </div>
                </div>
            </div>
            <div className="bg-[#2f3e46] border-t border-gray-700 py-4 px-6 flex justify-center gap-6">
                <img src="/financeGames6to8/feedback.svg" alt="Feedback" onClick={onViewFeedback} className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200" />
                <img src="/financeGames6to8/retry.svg" alt="Retry" onClick={onPlayAgain} className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200" />
                <img src="/financeGames6to8/next-challenge.svg" alt="Next Challenge" onClick={onContinue} className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200" />
            </div>
        </div>
    );
}

function ReviewScreen({ answers, onBackToResults }) {
    return (
        <div className="min-h-screen bg-[#e6ffe6] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg flex flex-col items-center p-8 relative">
                <button onClick={onBackToResults} className="flex justify-center items-center absolute top-4 right-4 z-10 w-11 h-11 rounded-full hover:bg-gray-200 transition">
                    <span className="font-['Comfortaa'] text-4xl text-[#6f6f6f] rotate-45 font-semibold select-none">+</span>
                </button>
                <h2 className="text-4xl font-bold text-center w-full" style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}>Check your answers</h2>
                <p className="mb-8 text-xl text-gray-700 text-center w-full" style={{ fontFamily: "Commissioner, Arial, sans-serif" }}>See how you did in each level!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {answers.map((ans, idx) => {
                        const isCorrect = ans.isCorrect;
                        const cardBgColor = isCorrect ? "bg-[#c8ff9e]" : "bg-[#ffdfe0]";
                        const textColor = isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]";
                        return (
                            <div key={idx} className={`p-4 rounded-xl ${cardBgColor} flex flex-col gap-2`}>
                                <div className="flex justify-between items-start">
                                    <span className={`font-['Comic_Neue'] text-lg font-bold ${textColor}`}>Level {idx + 1}: {ans.location}</span>
                                    <div className="w-7 h-7 shrink-0 bg-contain bg-no-repeat" style={{ backgroundImage: isCorrect ? "url(/check.png)" : "url(/cancel.png)" }} />
                                </div>
                                <div className="font-['Commissioner'] text-sm">
                                    <p><span className="font-semibold">Your Answer:</span> {ans.selectedImpact}</p>
                                    {!isCorrect && <p><span className="font-semibold">Correct Answer:</span> {ans.correctImpact}</p>}
                                    <p className="mt-2 italic">{ans.feedbackMessage}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={onBackToResults} className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg font-['Comic_Sans_MS'] text-xl mt-8">Back to Results</button>
            </div>
        </div>
    );
}

export default function MeltdownTracker() {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const { updateEnvirnomentPerformance } = usePerformance();
  const navigate = useNavigate();

  const [step, setStep] = useState("intro");
  const [introStep, setIntroStep] = useState("first");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [levelResults, setLevelResults] = useState([]);
  
  // --- ADDED --- State for the timer is now in the main component.
  const [timeLeft, setTimeLeft] = useState(180);

  const currentLevel = useMemo(() => gameLevels[currentLevelIndex], [currentLevelIndex]);

  // --- ADDED --- This useEffect hook manages the countdown.
  useEffect(() => {
    // Only run the timer when the game is actively being played.
    if (step !== "playing") {
      return;
    }

    // When the timer hits 0, end the game.
    if (timeLeft <= 0) {
      setStep("end");
      return;
    }

    // Set up the interval to decrease the timer every second.
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component unmounts or dependencies change.
    return () => clearInterval(intervalId);
  }, [timeLeft, step]);


  const handleShowInstructions = () => setIntroStep("instructions");

  const handleNextLevel = useCallback(() => {
    setShowFeedback(false);
    if (currentLevelIndex < gameLevels.length - 1) {
      setCurrentLevelIndex((prevIndex) => prevIndex + 1);
      setSelectedImpact(null);
      setFeedbackMessage("");
    } else {
      setStep("end");
    }
  }, [currentLevelIndex]);

  const handleSubmit = useCallback(() => {
    if (!selectedImpact) return;
    const isCorrect = selectedImpact === currentLevel.correctImpact;
    let message = "";
    let score = 0;

    if (isCorrect) {
      score = 5;
      message = "That's correct! Great job!";
    } else {
      score = 0;
      message = `Not quite. The right match for ${currentLevel.location} is ${currentLevel.correctImpact}.`;
    }

    setTotalScore((prevScore) => prevScore + score);
    setFeedbackMessage(message);
    setShowFeedback(true);

    setLevelResults((prevResults) => [
      ...prevResults,
      {
        location: currentLevel.location,
        selectedImpact: selectedImpact,
        correctImpact: currentLevel.correctImpact,
        isCorrect: isCorrect,
        feedbackMessage: isCorrect ? "You nailed it!" : "A learning moment!",
      },
    ]);
  }, [selectedImpact, currentLevel]);

  const startGame = () => {
    setStep("playing");
    setIntroStep("first");
    setCurrentLevelIndex(0);
    setSelectedImpact(null);
    setTotalScore(0);
    setLevelResults([]);
    setShowFeedback(false);
    setFeedbackMessage("");
    // --- ADDED --- Reset the timer whenever the game starts.
    setTimeLeft(180);
  };

  const handleSelectImpact = (impact) => {
    if (showFeedback) return;
    setSelectedImpact(impact);
  };

  const handlePlayAgain = () => startGame();
  const handleReviewAnswers = () => setStep("review");
  const handleBackToResults = () => setStep("end");
  const handleContinue = () => navigate("/environmental/games");

  const buttonText = showFeedback ? "Continue" : "Check Now";
  const isButtonEnabled = !!selectedImpact;

  return (
    <div>
      {step === "intro" && introStep === "first" && (<IntroScreen onShowInstructions={handleShowInstructions} gameTitle="Meltdown Tracker" />)}
      {step === "intro" && introStep === "instructions" && (<InstructionsScreen onStartGame={startGame} gameTitle="Meltdown Tracker" />)}
      {step !== "intro" && (
        <div className="main-container w-full h-[100vh] bg-[#0A160E] relative overflow-hidden flex flex-col justify-between">
          {step === "playing" && currentLevel && (
            <>
              {/* --- MODIFIED --- Pass timeLeft as a prop to GameNav */}
              <GameNav timeLeft={timeLeft} />

              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-[#202f36]/30 rounded-xl p-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {allImpactOptions.map((impact) => (
                      <ImpactOptionCard
                        key={impact}
                        impactText={impact}
                        isSelected={selectedImpact === impact}
                        onClick={() => handleSelectImpact(impact)}
                        isDisabled={showFeedback && selectedImpact !== impact}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full h-[10vh] bg-[#28343A] flex justify-evenly items-center px-[5vw] z-10">
                <span className="lilita text-[3.8vh] [-webkit-text-stroke:0.7px_black] text-white">Location: {currentLevel.location}</span>
                <div className="w-[12vw] h-[8vh]">
                  <button className="relative w-full h-full cursor-pointer" onClick={showFeedback ? handleNextLevel : handleSubmit} disabled={!isButtonEnabled}>
                    <Checknow topGradientColor="#09be43" bottomGradientColor="#068F36" width="100%" height="100%" />
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lilita text-[2.5vh] text-white [text-shadow:0_3px_0_#000] ${!isButtonEnabled && "opacity-50"}`}>{buttonText}</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* --- MODIFIED --- This logic now handles the game ending due to time out */}
          {step === "end" && (() => {
            const totalPossibleScore = gameLevels.length * 5;
            const accuracyScore = totalPossibleScore > 0 ? Math.round((totalScore / totalPossibleScore) * 100) : 0;
            
            // A game is lost if the timer runs out, regardless of score.
            const gameTimedOut = timeLeft <= 0;
            const isVictory = accuracyScore >= 80 && !gameTimedOut;

            let insightText = "";
            if (gameTimedOut) {
              insightText = "Time's up! Review your answers and try to be quicker next time.";
            } else if (accuracyScore === 100) {
              insightText = "Perfect score! You're a true climate expert!";
            } else if (isVictory) {
              insightText = "Great work! You have a strong understanding of climate impacts.";
            } else {
              insightText = "Good effort! Review your answers to become a climate champion.";
            }

            if (isVictory) {
              return (
                <VictoryScreen
                  accuracyScore={accuracyScore}
                  insight={insightText}
                  onViewFeedback={handleReviewAnswers}
                  onContinue={handleContinue}
                />
              );
            } else {
              return (
                <LosingScreen
                  insight={insightText}
                  onPlayAgain={handlePlayAgain}
                  onViewFeedback={handleReviewAnswers}
                  onContinue={handleContinue}
                />
              );
            }
          })()}

          {step === "review" && (
            <ReviewScreen answers={levelResults} onBackToResults={handleBackToResults} />
          )}
        </div>
      )}
    </div>
  );
}