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
// Game Data (Dilemma-Based)
// =============================================================================
const dilemmas = [
  {
    id: 1,
    scenario: "Your school is planning to cut down 5 trees to expand parking for teachers’ cars.",
    options: [
      { text: "Protest with a placard and ask for a meeting with the principal", score: 2, consequence: "Good job! While protesting raises awareness, proposing a concrete solution is even more powerful." },
      { text: "Say nothing — not your problem", score: 0, consequence: "Choosing to be passive allows environmental damage to happen. Every voice matters in protecting our planet." },
      { text: "Suggest vertical parking or carpooling and saving the trees", score: 3, consequence: "Excellent! You proposed an innovative, eco-friendly solution that solves the problem without harming nature." },
    ],
  },
  {
    id: 2,
    scenario: "Your school canteen only uses plastic plates, cups, and spoons every day.",
    options: [
      { text: "Bring your own steel tiffin and ask friends to do the same", score: 3, consequence: "Perfect! By setting a personal example, you start a powerful student-led movement for change." },
      { text: "Complain to the principal about health hazards of plastic", score: 2, consequence: "Raising the issue is a good step, but suggesting a practical alternative would be even more effective." },
      { text: "Ignore — it’s convenient and fast", score: 0, consequence: "Convenience shouldn't come at the cost of our planet's health. This choice adds to the plastic pollution problem." },
    ],
  },
  {
    id: 3,
    scenario: "Students keep the classroom AC on even when windows are open.",
    options: [
      { text: "Close the windows every time and remind others", score: 2, consequence: "This is a responsible action! You're actively stopping energy waste in the moment." },
      { text: "Enjoy the cool — it’s not your electricity bill", score: 0, consequence: "This mindset wastes valuable resources. Collective responsibility is key to energy conservation." },
      { text: "Talk to the class teacher about putting up an energy-saving rule", score: 3, consequence: "Great initiative! Creating a system-level change has a long-lasting impact beyond just one classroom." },
    ],
  },
  {
    id: 4,
    scenario: "Your school is organizing a big celebration. Everything is plastic — balloons, flex banners, decorations.",
    options: [
      { text: "Offer to make eco-friendly décor from paper and cloth with your class", score: 3, consequence: "Fantastic! You've turned a wasteful event into a creative, sustainable, and memorable one." },
      { text: "Ask the principal to cancel the event", score: 1, consequence: "While your intention is good, cancelling isn't always the answer. Finding a green alternative is a better approach." },
      { text: "Just enjoy — it’s once a year", score: 0, consequence: "This 'once a year' mindset, when adopted by many, leads to massive amounts of holiday waste." },
    ],
  },
  {
    id: 5,
    scenario: "The school throws away fruit peels and leftover food into regular dustbins.",
    options: [
      { text: "Propose a compost bin and volunteer to maintain it", score: 3, consequence: "Amazing! You're turning waste into a valuable resource that can nourish the school garden." },
      { text: "Write an anonymous note to the teacher", score: 1, consequence: "While it raises awareness, taking ownership of the idea is much more likely to lead to real action." },
      { text: "Pretend not to notice", score: 0, consequence: "Ignoring the problem of food waste contributes to landfill build-up and the release of harmful greenhouse gases." },
    ],
  },
];


// =============================================================================
// Components (Nested within the main file)
// =============================================================================

function OptionCard({ option, isSelected, onClick, isDisabled }) {
  const cardClasses = `flex items-center justify-center w-[26vw] min-h-[9vh] px-[2vw] py-[1.5vh] rounded-[1.2vh] shadow-[0_2px_0_0_#37464f] transition-all duration-200 ease-in-out cursor-pointer text-center ${isSelected ? "bg-[#202f36] border-[0.2vh] border-[#5f8428] shadow-[0_2px_0_0_#5f8428]" : "bg-[#131f24] border-[0.2vh] border-[#37464f]"} ${isDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : "hover:scale-102"}`;
  const textClasses = `font-['Inter'] text-[1.1vw] font-medium leading-[3vh] ${isSelected ? "text-[#79b933]" : "text-[#f1f7fb]"}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      <span className={textClasses}>{option.text}</span>
    </div>
  );
}

function FeedbackCharacter({ message }) {
  return (
    <div className="absolute -right-[5vw] top-[46vh] flex items-end">
      <img src="/feedbackcharacter.gif" alt="Character talking" className="w-[10vw] h-[15vh] object-contain" />
      <div className="absolute left-[7.5vw] bottom-[5vh]"><ThinkingCloud width="18vw"/></div>
      <p className="absolute bottom-[9vh] left-[9.2vw] w-[16vw] text-[0.68vw] text-white text-center font-['Comic_Neue'] ">{message}</p>
    </div>
  );
}

// === NEW VICTORY AND LOSING SCREENS ===
function VictoryScreen({ onContinue, onViewFeedback, accuracyScore, insight }) {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />
      <div className="flex flex-col justify-between h-screen bg-[#0A160E] text-center">
        <div className="flex flex-col items-center justify-center flex-1 p-[1.6vw]">
          <div className="relative w-[17.7vw] h-[28.4vh] flex items-center justify-center">
            <img src="/financeGames6to8/trophy-rotating.gif" alt="Rotating Trophy" className="absolute w-full h-full object-contain" />
            <img src="/financeGames6to8/trophy-celebration.gif" alt="Celebration Effects" className="absolute w-full h-full object-contain" />
          </div>
          <h2 className="text-yellow-400 lilita-one-regular text-[4vh] font-bold mt-[2.7vh]">Challenge Complete!</h2>
          <div className="mt-[2.7vh] flex flex-col sm:flex-row gap-[1.1vw]">
            <div className="w-[17.7vw] bg-[#09BE43] rounded-[0.83vw] p-[0.27vw] flex flex-col items-center">
              <p className="text-black text-[1.5vh] font-bold mb-[0.5vh] mt-[1vh]">TOTAL ACCURACY</p>
              <div className="bg-[#131F24] mt-0 w-full h-[10vh] rounded-[0.55vw] flex items-center justify-center py-[1.6vh] px-[1.3vw]">
                <img src="/financeGames6to8/accImg.svg" alt="Target Icon" className="w-[1.6vw] h-[2.6vh] mr-[0.5vw]" />
                <span className="text-[#09BE43] text-[2.7vh] font-extrabold">{accuracyScore}%</span>
              </div>
            </div>
            <div className="w-[20vw] bg-[#FFCC00] rounded-[0.83vw] p-[0.27vw] flex flex-col items-center">
              <p className="text-black text-[1.5vh] font-bold mb-[0.5vh] mt-[1vh]">INSIGHT</p>
              <div className="bg-[#131F24] mt-0 w-full h-[10vh] rounded-[0.55vw] flex items-center justify-center px-[1.1vw] text-center">
                <span className="text-[#FFCC00] lilita-one-regular text-[1.5vh] font-medium italic">{insight}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2f3e46] border-t-[0.1vh] border-gray-700 py-[2.2vh] px-[1.6vw] flex justify-center gap-[1.6vw]">
          <img src="/financeGames6to8/feedback.svg" alt="Feedback" onClick={onViewFeedback} className="cursor-pointer w-[12.2vw] h-[7.7vh] object-contain hover:scale-105 transition-transform duration-200" />
          <img src="/financeGames6to8/next-challenge.svg" alt="Next Challenge" onClick={onContinue} className="cursor-pointer w-[12.2vw] h-[7.7vh] object-contain hover:scale-105 transition-transform duration-200" />
        </div>
      </div>
    </>
  );
}

function LosingScreen({ onPlayAgain, onViewFeedback, onContinue, insight, accuracyScore }) {
    return (
        <div className="flex flex-col justify-between h-screen bg-[#0A160E] text-center">
            <div className="flex flex-col items-center justify-center flex-1 p-[1.6vw]">
                <img src="/financeGames6to8/game-over-game.gif" alt="Game Over" className="w-[17.7vw] h-auto mb-[2.7vh]" />
                <p className="text-yellow-400 lilita-one-regular text-[3.3vh] font-semibold text-center">Oops! That was close! Wanna Retry?</p>
                <div className="mt-[2.7vh] flex flex-col sm:flex-row gap-[1.1vw]">
                    <div className="w-[17.7vw] bg-red-500 rounded-[0.83vw] p-[0.27vw] flex flex-col items-center">
                        <p className="text-black text-[1.5vh] font-bold mb-[0.5vh] mt-[1vh]">TOTAL ACCURACY</p>
                        <div className="bg-[#131F24] mt-0 w-full h-[10vh] rounded-[0.55vw] flex items-center justify-center py-[1.6vh] px-[1.3vw]">
                            <img src="/financeGames6to8/accImg.svg" alt="Target Icon" className="w-[1.6vw] h-[2.6vh] mr-[0.5vw]" />
                            <span className="text-red-500 text-[2.7vh] font-extrabold">{accuracyScore}%</span>
                        </div>
                    </div>
                    <div className="w-[20vw] bg-[#FFCC00] rounded-[0.83vw] p-[0.27vw] flex flex-col items-center">
                        <p className="text-black text-sm font-bold mb-[0.5vh] mt-[1vh]">INSIGHT</p>
                        <div className="bg-[#131F24] mt-0 w-full h-[10vh] rounded-[0.55vw] flex items-center justify-center px-[1.1vw] text-center">
                            <span className="text-[#FFCC00] lilita-one-regular text-[1.5vh] font-medium italic">{insight}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#2f3e46] border-t-[0.1vh] border-gray-700 py-[2.2vh] px-[1.6vw] flex justify-center gap-[1.6vw]">
                <img src="/financeGames6to8/feedback.svg" alt="Feedback" onClick={onViewFeedback} className="cursor-pointer w-[12.2vw] h-[7.7vh] object-contain hover:scale-105 transition-transform duration-200" />
                <img src="/financeGames6to8/retry.svg" alt="Retry" onClick={onPlayAgain} className="cursor-pointer w-[12.2vw] h-[7.7vh] object-contain hover:scale-105 transition-transform duration-200" />
                <img src="/financeGames6to8/next-challenge.svg" alt="Next Challenge" onClick={onContinue} className="cursor-pointer w-[12.2vw] h-[7.7vh] object-contain hover:scale-105 transition-transform duration-200" />
            </div>
        </div>
    );
}

function ReviewScreen({ answers, onBackToResults }) {
  const getCardColorAndIcon = (score) => {
    if (score === 3) return { color: "bg-[#c8ff9e]", icon: "/check.png", textColor: "text-[#09be43]" };
    if (score >= 1) return { color: "bg-[#fff8bd]", icon: "/neutral.png", textColor: "text-[#D1A600]" }; // Assumes a neutral icon exists
    return { color: "bg-[#ffdfe0]", icon: "/cancel.png", textColor: "text-[#ea2b2b]" };
  };

  return (
    <div className="min-h-[89vh] bg-[#e6ffe6] flex flex-col items-center justify-center min-w-screen">
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col items-center p-6 sm:p-8 lg:p-10 relative">
        <button onClick={onBackToResults} className="flex justify-center items-center absolute top-4 right-4 z-[139] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full hover:bg-gray-200 transition">
          <span className="font-['Comfortaa'] text-[36px] sm:text-[40px] text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">+</span>
        </button>
        <h2 className="text-3xl sm:text-4xl font-bold text-center w-full" style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}>Check your answers</h2>
        <p className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-700 text-center w-full" style={{ fontFamily: "Commissioner, Arial, sans-serif" }}>See how you did in each dilemma!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-evenly justify-items-center ">
          {answers.map((ans, idx) => {
            const { color, icon, textColor } = getCardColorAndIcon(ans.scoreAwarded);
            return (
              <div key={idx} className={`flex w-full max-w-[280px] sm:max-w-[250px] min-h-[250px] p-4 flex-col gap-[8px] justify-start items-start rounded-[15px] relative ${color}`}>
                <div className="flex w-full justify-between items-start relative h-full">
                  <div className="flex flex-col gap-[5px] items-start flex-1 overflow-hidden">
                    <span className={`font-['Comic_Neue'] text-lg sm:text-[18px] font-bold leading-[1.2] relative text-left z-[2] ${textColor} whitespace-normal mb-1`}>{ans.scenario}</span>
                    <div className="flex flex-col gap-[2px] items-start w-full mb-2">
                      <span className={`font-['Commissioner'] text-sm sm:text-[14px] font-bold leading-[1.2] relative text-left whitespace-normal z-[4] ${textColor}`}>Your Selection:</span>
                      <span className={`font-['Commissioner'] text-sm sm:text-[14px] font-light leading-[1.2] relative text-left whitespace-normal z-[4] ${textColor}`}>{ans.selectedOption.text}</span>
                    </div>
                     <span className={`font-['Commissioner'] text-sm sm:text-[14px] font-bold leading-[1.2] relative text-left whitespace-normal z-[5] ${textColor}`}>Consequence:</span>
                    <span className={`font-['Commissioner'] text-sm sm:text-[14px] font-light leading-[1.2] relative text-left whitespace-normal z-[5] ${textColor}`}>{ans.selectedOption.consequence}</span>
                  </div>
                  <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] shrink-0 bg-contain bg-no-repeat ml-2" style={{ backgroundImage: `url(${icon})` }} />
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
// Main Game Component: DilemmaCardsGame
// =============================================================================

export default function DilemmaCardsGame() {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const { updateEnvirnomentPerformance } = usePerformance();
  const navigate = useNavigate();

  const [step, setStep] = useState("intro");
  const [introStep, setIntroStep] = useState("first");
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [dilemmaResults, setDilemmaResults] = useState([]);

  const currentDilemma = useMemo(() => dilemmas[currentDilemmaIndex], [currentDilemmaIndex]);

  const handleShowInstructions = () => setIntroStep("instructions");

  const handleNextDilemma = useCallback(() => {
    setShowFeedback(false);
    if (currentDilemmaIndex < dilemmas.length - 1) {
      setCurrentDilemmaIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setFeedbackMessage("");
    } else {
      setStep("end");
    }
  }, [currentDilemmaIndex]);

  const handleSubmit = useCallback(() => {
    if (!selectedOption) {
      setFeedbackMessage("Please select an option.");
      setShowFeedback(true);
      return;
    }

    const { score, consequence } = selectedOption;
    
    setTotalScore((prevScore) => prevScore + score);
    setFeedbackMessage(consequence);
    setShowFeedback(true);

    setDilemmaResults((prevResults) => [...prevResults, {
      scenario: currentDilemma.scenario,
      selectedOption: selectedOption,
      scoreAwarded: score,
    }]);
  }, [selectedOption, currentDilemma]);

  const startGame = () => {
    setStep("playing");
    setIntroStep("first");
    setCurrentDilemmaIndex(0);
    setSelectedOption(null);
    setTotalScore(0);
    setDilemmaResults([]);
    setShowFeedback(false);
    setFeedbackMessage("");
  };

  const handleSelectOption = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(false);
  };
  
  const handlePlayAgain = () => startGame();
  const handleReviewAnswers = () => setStep("review");
  const handleBackToResults = () => setStep("end");
  const handleContinue = () => navigate("/environmental/games");

  const buttonText = showFeedback ? "Continue" : "Check Now";
  const isButtonEnabled = showFeedback || selectedOption !== null;

  return (
    <div>
      {step === "intro" && introStep === "first" && (<IntroScreen onShowInstructions={handleShowInstructions} />)}
      {step === "intro" && introStep === "instructions" && (<InstructionsScreen onStartGame={startGame} />)}
      {step !== "intro" && (
        <div className="main-container w-full h-[100vh] bg-[#0A160E] relative overflow-hidden flex flex-col justify-between">
          {step === "playing" && currentDilemma && (
            <>
              <GameNav />

              <div className="flex flex-1 items-center justify-center w-full px-[5vw] py-[2vh] gap-[2vw]">
                {/* Options on the left */}
                <div className="flex flex-col py-[4.6vh] w-auto h-auto px-[2.4vh] bg-[rgba(32,47,54,0.3)] rounded-[1.2vh] gap-[2.8vh]">
                  {currentDilemma.options.map((option) => (
                    <OptionCard
                      key={option.text}
                      option={option}
                      isSelected={selectedOption?.text === option.text}
                      onClick={() => handleSelectOption(option)}
                      isDisabled={showFeedback && selectedOption?.text !== option.text}
                    />
                  ))}
                </div>

                {/* Scenario on the right */}
                <div className="relative flex flex-col w-[28vw] h-[42vh] p-[2vh] bg-[rgba(32,47,54,0.3)] rounded-[1.2vh] justify-center items-center text-white">
                  <span className="font-['Inter'] text-[1.1vw] font-medium leading-[4vh] text-center max-w-[30vw]">
                    {currentDilemma.scenario}
                  </span>
                  {showFeedback && <FeedbackCharacter message={feedbackMessage} />}
                </div>
              </div>
              
              {/* Bottom Bar */}
              <div className="w-full h-[10vh] bg-[#28343A] flex justify-evenly items-center px-[5vw] z-10">
                <div className="w-[15vw] h-[8vh]">
                  <button className="relative w-full h-full cursor-pointer" onClick={showFeedback ? handleNextDilemma : handleSubmit} disabled={!isButtonEnabled}>
                    <Checknow topGradientColor="#09be43" bottomGradientColor="#068F36" width="100%" height="100%" />
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lilita text-[2.8vh] text-white [text-shadow:0_3px_0_#000] ${!isButtonEnabled && "opacity-50"}`}>{buttonText}</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "end" && (() => {
            const totalPossibleScore = dilemmas.length * 3;
            const accuracyScore = Math.round((totalScore / totalPossibleScore) * 100);
            const isVictory = accuracyScore === 100;

            let insightText = "";
            if (accuracyScore === 100) {
                insightText = "Fantastic! You're an expert at finding creative, eco-friendly solutions. Your proactive approach makes you a true leader in sustainability.";
            } else if (totalScore >= 9) {
                insightText = "Great work! You have a strong sense of responsibility. To improve, try focusing more on proactive solutions instead of just identifying problems.";
            } else {
                insightText = "A good start! Some of your choices were passive. Remember that even small, proactive steps can make a big difference. Review your answers to learn more.";
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
                        accuracyScore={accuracyScore}
                        insight={insightText}
                        onPlayAgain={handlePlayAgain}
                        onViewFeedback={handleReviewAnswers}
                        onContinue={handleContinue}
                    />
                );
            }
          })()}

          {step === "review" && (
            <ReviewScreen answers={dilemmaResults} onBackToResults={handleBackToResults} />
          )}
        </div>
      )}
    </div>
  );
}