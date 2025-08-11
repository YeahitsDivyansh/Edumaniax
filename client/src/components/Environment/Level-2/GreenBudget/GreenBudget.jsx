import React, { useState, useEffect, useMemo, useCallback } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import GameNav from "./GameNav";
import Checknow from "@/components/icon/GreenBudget/Checknow";
import ThinkingCloud from "@/components/icon/ThinkingCloud";
import IntroScreen from "./IntroScreen";
import InstructionsScreen from "./InstructionsScreen";
import { useNavigate } from "react-router-dom";

// Placeholder for context functions
const useEnvirnoment = () => ({
  completeEnvirnomentChallenge: (challengeId, taskId) => {
    console.log(
      `(Mock) Environment Challenge ${challengeId}, Task ${taskId} completed!`
    );
  },
});

const usePerformance = () => ({
  updateEnvirnomentPerformance: (data) => {
    console.log("(Mock) Performance updated:", data);
  },
});

// =============================================================================
// Game Data (Centralized) with Icons
// =============================================================================
const questions = [
  {
    id: 1,
    scenario:
      "Your school wants to reduce its environment footprint. Pick 3 items.",
    items: [
      { name: "Solar lights", cost: 250, imageUrl: "/financeGames6to8/level-1/weekend-movie.svg", sustainable: true },
      { name: "Compost bins", cost: 150, imageUrl: "/financeGames6to8/level-1/lend-to-a-friend.svg", sustainable: true },
      { name: "Poster printout", cost: 100, imageUrl: "/financeGames6to8/level-1/data-plan.svg", sustainable: false },
      { name: "Packaged water", cost: 100, imageUrl: "/financeGames6to8/level-1/gift.svg", sustainable: false },
      { name: "Plastic Dustin", cost: 100, imageUrl: "/financeGames6to8/level-1/ice-cream.svg", sustainable: false },
      { name: "Cloth Banner", cost: 100, imageUrl: "/financeGames6to8/level-1/shoes.svg", sustainable: true },
    ],
  },
  {
    id: 2,
    scenario: "Design a 'green corner' for your classroom.",
    items: [
      { name: "Indoor plant set", cost: 150, imageUrl: "/financeGames6to8/level-1/shoes.svg", sustainable: true },
      { name: "Educational eco-posters", cost: 100, imageUrl: "/financeGames6to8/level-1/lend-to-a-friend.svg", sustainable: true },
      { name: "Plastic plant holders", cost: 100, imageUrl: "/financeGames6to8/level-1/weekend-movie.svg", sustainable: false },
      { name: "LED study lamp", cost: 250, imageUrl: "/financeGames6to8/level-1/data-plan.svg", sustainable: true },
      { name: "Disposable cups", cost: 100, imageUrl: "/financeGames6to8/level-1/ice-cream.svg", sustainable: false },
    ],
  },
  {
    id: 3,
    scenario: "Reduce waste at your school canteen.",
    items: [
      { name: "Steel utensils", cost: 200, imageUrl: "/financeGames6to8/level-1/ice-cream.svg", sustainable: true },
      { name: "Paper straws", cost: 100, imageUrl: "/financeGames6to8/level-1/data-plan.svg", sustainable: true },
      { name: "Plastic cutlery", cost: 100, imageUrl: "/financeGames6to8/level-1/weekend-movie.svg", sustainable: false },
      { name: "Compost bin", cost: 150, imageUrl: "/financeGames6to8/level-1/lend-to-a-friend.svg", sustainable: true },
      { name: "Promotional balloons", cost: 100, imageUrl: "/financeGames6to8/level-1/gift.svg", sustainable: false },
    ],
  },
];

const initialBudget = 500;
const itemsToSelect = 3;

// =============================================================================
// Components (Nested within the main file)
// =============================================================================

function ItemCard({ item, isSelected, onClick, isDisabled }) {
  const cardClasses = `flex items-center w-[27vw] min-h-[9vh] px-[2vw] py-[1.5vh] rounded-[1.2vh] shadow-[0_2px_0_0_#37464f] transition-all duration-200 ease-in-out cursor-pointer ${isSelected ? "bg-[#202f36] border-[0.2vh] border-[#5f8428] shadow-[0_2px_0_0_#5f8428]" : "bg-[#131f24] border-[0.2vh] border-[#37464f]"} ${isDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : "hover:scale-102"}`;
  const walletIconUrl = isSelected ? "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/tuvaKMgcsm.png" : "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/CGOQJaAXZU.png";
  const nameClasses = `font-['Inter'] text-[1.5vw] font-medium leading-[2.5vh] ${isSelected ? "text-[#79b933]" : "text-[#f1f7fb]"}`;
  const costClasses = `font-['Lilita_One'] text-[1.5vw] font-normal leading-[2.5vh] text-[#fff]`;
  const iconClasses = `w-[2.5vw] h-[2.5vw] shrink-0 object-contain ml-auto`;
  const priceContainerClasses = `flex w-[7vw] h-[4vh] justify-center items-center rounded-[0.8vh] ${isSelected ? "border-[0.2vh] border-[#79b933]" : "border-[0.2vh] border-[#37464f]"}`;
  const priceIconClasses = `w-[2.5vh] h-[2.5vh] shrink-0 object-contain`;

  // REMOVED: The unnecessary getImage function
  return (
    <div className={cardClasses} onClick={onClick}>
      <div className={priceContainerClasses}>
        <img src={walletIconUrl} alt="wallet icon" className={priceIconClasses} />
        <span className={costClasses}>₹{item.cost}</span>
      </div>
      <div className="flex-1 px-[1vw]"><span className={nameClasses}>{item.name}</span></div>
      {/* MODIFIED: Using item.imageUrl directly */}
      <img src={item.imageUrl} alt={item.name} className={iconClasses} />
    </div>
  );
}

function FeedbackGIF({ message, scoreAwarded }) {
  return (
    <div className="absolute -right-[9vw] -bottom-[8vh] flex items-end">
      <img src="/feedbackcharacter.gif" alt="Character talking" className="w-[10vw] h-[15vh] object-contain" />
      <div className="absolute left-[8vw] bottom-[6vh]"><ThinkingCloud width="11vw" /></div>
      <p className="absolute bottom-[11vh] left-[8.8vw] w-full text-[0.7vw] text-white text-center font-['Comic_Neue'] ">{message}</p>
    </div>
  );
}

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
    <div className="min-h-[89vh] bg-[#e6ffe6] flex flex-col items-center justify-center min-w-screen">
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col items-center p-6 sm:p-8 lg:p-10 relative">
        <button onClick={onBackToResults} className="flex justify-center items-center absolute top-4 right-4 z-[139] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full hover:bg-gray-200 transition">
          <span className="font-['Comfortaa'] text-[36px] sm:text-[40px] text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">+</span>
        </button>
        <h2 className="text-3xl sm:text-4xl font-bold text-center w-full" style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}>Check your answers</h2>
        <p className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-700 text-center w-full" style={{ fontFamily: "Commissioner, Arial, sans-serif" }}>See how you did in each scenario!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-evenly justify-items-center ">
          {answers.map((ans, idx) => {
            const isPassingScore = ans.scoreAwarded > 0;
            const cardBgColor = isPassingScore ? "bg-[#c8ff9e]" : "bg-[#ffdfe0]";
            return (
              <div key={idx} className={`main-container flex w-full max-w-[280px] sm:max-w-[250px] h-[200px] sm:h-[220px] md:h-[250px] p-4 flex-col gap-[8px] justify-start items-start rounded-[15px] relative ${cardBgColor}`}>
                <div className="flex w-full justify-between items-start relative h-full">
                  <div className="flex flex-col gap-[5px] items-start flex-1 overflow-hidden">
                    <span className={`font-['Comic_Neue'] text-lg sm:text-[18px] font-bold leading-[1.2] relative text-left z-[2] ${isPassingScore ? "text-[#09be43]" : "text-[#ea2b2b]"} whitespace-normal mb-1`}>{ans.scenario}</span>
                    <div className="flex flex-col gap-[2px] items-start w-full mb-2">
                      <span className={`font-['Commissioner'] text-sm sm:text-[14px] font-light leading-[1.2] relative text-left whitespace-normal z-[4] ${isPassingScore ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>Your Selection: {ans.selectedItems.map((item) => item.name).join(", ")}</span>
                    </div>
                    <span className={`font-['Commissioner'] text-sm sm:text-[14px] font-light leading-[1.2] relative text-left whitespace-normal z-[5] ${isPassingScore ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>Feedback: {ans.feedbackMessage}</span>
                  </div>
                  <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] shrink-0 bg-contain bg-no-repeat ml-2" style={{ backgroundImage: isPassingScore ? "url(/check.png)" : "url(/cancel.png)" }} />
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onBackToResults} className="bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg font-['Comic_Sans_MS'] text-lg md:text-xl mt-8">Back to Results</button>
      </div>
    </div>
  );
}

// =============================================================================
// Main Game Component: GreenBudgetGame
// =============================================================================

export default function GreenBudgetGame() {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const { updateEnvirnomentPerformance } = usePerformance();
  const navigate = useNavigate();

  const [step, setStep] = useState("intro");
  const [introStep, setIntroStep] = useState("first");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(initialBudget);
  const [totalScore, setTotalScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [scoreAwarded, setScoreAwarded] = useState(0);
  const [scenarioResults, setScenarioResults] = useState([]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex]);

  const handleShowInstructions = () => setIntroStep("instructions");

  const handleNextQuestion = useCallback(() => {
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedItems([]);
      setRemainingBalance(initialBudget);
      setFeedbackMessage("");
    } else {
      setStep("end");
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(() => {
    if (selectedItems.length !== itemsToSelect) {
      setFeedbackMessage("Please select exactly 3 items.");
      setScoreAwarded(0);
      setShowFeedback(true);
      return;
    }

    const sustainableCount = selectedItems.filter((item) => item.sustainable).length;
    let newScore = 0;
    let message = "";

    if (sustainableCount === itemsToSelect) {
      newScore = 5; message = "Good going";
    } else if (sustainableCount === 2) {
      newScore = 2; message = "Good attempt, can do better";
    } else {
      newScore = 0; message = "try harder next time";
    }

    setTotalScore((prevScore) => prevScore + newScore);
    setScoreAwarded(newScore);
    setFeedbackMessage(message);
    setShowFeedback(true);

    setScenarioResults((prevResults) => [...prevResults, { scenario: currentQuestion.scenario, selectedItems: selectedItems, scoreAwarded: newScore, feedbackMessage: message }]);
  }, [selectedItems, currentQuestion]);

  const startGame = () => {
    setStep("playing");
    setIntroStep("first");
    setCurrentQuestionIndex(0);
    setSelectedItems([]);
    setRemainingBalance(initialBudget);
    setTotalScore(0);
    setScenarioResults([]);
    setShowFeedback(false);
    setFeedbackMessage("");
    setScoreAwarded(0);
  };

  const toggleItem = (item) => {
    if (showFeedback) return;
    const isSelected = selectedItems.some((selected) => selected.name === item.name);
    let newSelectedItems;
    if (isSelected) {
      newSelectedItems = selectedItems.filter((selected) => selected.name !== item.name);
      setRemainingBalance((prevBalance) => prevBalance + item.cost);
    } else {
      if (selectedItems.length >= itemsToSelect) return;
      if (remainingBalance < item.cost) {
        setFeedbackMessage("Not enough balance for this item!");
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
        return;
      }
      newSelectedItems = [...selectedItems, item];
      setRemainingBalance((prevBalance) => prevBalance - item.cost);
    }
    setSelectedItems(newSelectedItems);
    setShowFeedback(false);
  };

  const handlePlayAgain = () => startGame();
  const handleReviewAnswers = () => setStep("review");
  const handleBackToResults = () => setStep("end");
  const handleContinue = () => navigate("/environmental/games");

  const buttonText = showFeedback ? "Continue" : "Check Now";
  const isButtonEnabled = showFeedback || selectedItems.length === itemsToSelect;

  return (
    <div>
      {step === "intro" && introStep === "first" && (<IntroScreen onShowInstructions={handleShowInstructions} />)}
      {step === "intro" && introStep === "instructions" && (<InstructionsScreen onStartGame={startGame} />)}
      {step !== "intro" && (
        <div className="main-container w-full h-[100vh] bg-[#0A160E] relative overflow-hidden flex flex-col justify-between">
          {step === "playing" && currentQuestion && (
            <>
              <GameNav />
              <div className="flex flex-1 items-center justify-center w-full px-[5vw] py-[2vh] gap-[4vw]">
                <div className="flex flex-col w-auto h-[68vh] py-[3vh] p-[2vh] bg-[rgba(32,47,54,0.3)] rounded-[1.2vh] gap-[1.5vh] overflow-y-auto">
                  {currentQuestion.items.map((item) => (
                    <ItemCard
                      key={item.name}
                      item={item}
                      isSelected={selectedItems.some((selected) => selected.name === item.name)}
                      onClick={() => toggleItem(item)}
                      isDisabled={
                        (selectedItems.length >= itemsToSelect && !selectedItems.some((selected) => selected.name === item.name)) ||
                        (remainingBalance < item.cost && !selectedItems.some((selected) => selected.name === item.name))
                      }
                    />
                  ))}
                </div>
                <div className="relative flex flex-col w-[29vw] h-[68vh] p-[4vh] bg-[rgba(32,47,54,0.3)] rounded-[1.2vh] justify-center items-center text-white">
                  <span className="font-['Inter'] text-[1.4vw] font-medium leading-[3vh] text-center max-w-[30vw]">{currentQuestion.scenario}</span>
                  {showFeedback && <FeedbackGIF message={feedbackMessage} scoreAwarded={scoreAwarded} />}
                </div>
              </div>
              <div className="w-full h-[10vh] bg-[#28343A] flex justify-evenly items-center px-[5vw] z-10">
                <div className="flex items-center gap-[1vw]">
                  <div className="w-[7vh] h-[7vh] rounded-full bg-[#232e34] border-[0.2vh] border-white flex justify-center items-center">
                    <img src="/Coin_gold.png" alt="wallet" className="w-[5vh] h-[5vh]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="lilita text-[2.5vh] text-[#ffcc00] [text-stroke:1px_black] tracking-[0.05vw]">Total Wallet:</span>
                    <span className="lilita text-[2.5vh] text-white">₹{remainingBalance}</span>
                  </div>
                </div>
                <div className="w-[12vw] h-[8vh]">
                  <button className="relative w-full h-full cursor-pointer" onClick={showFeedback ? handleNextQuestion : handleSubmit} disabled={!isButtonEnabled}>
                    <Checknow topGradientColor="#09be43" bottomGradientColor="#068F36" width="100%" height="100%" />
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lilita text-[2.5vh] text-white [text-shadow:0_3px_0_#000] ${!isButtonEnabled && "opacity-50"}`}>{buttonText}</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "end" && (() => {
            const totalPossibleScore = questions.length * 5;
            const accuracyScore = Math.round((totalScore / totalPossibleScore) * 100);
            const isVictory = totalScore === totalPossibleScore;
            let insightText = "";

            if (isVictory) {
              insightText = "Perfect budgeting! You're a true Green Champion.";
            } else if (accuracyScore >= 70) {
              insightText = "Great choices! You're making a real difference for the environment.";
            } else {
              insightText = "Good start! Review your choices to learn how to make an even bigger impact.";
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
            <ReviewScreen answers={scenarioResults} onBackToResults={handleBackToResults} />
          )}
        </div>
      )}
    </div>
  );
}