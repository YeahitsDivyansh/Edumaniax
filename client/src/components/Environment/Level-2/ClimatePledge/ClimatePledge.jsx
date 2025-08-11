import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// Import your shared components
import IntroScreen from "./IntroScreen";
import InstructionsScreen from "./InstructionsScreen";
import GameNav from "./GameNav";
import Checknow from "@/components/icon/GreenBudget/Checknow"; // Import the button component

// =============================================================================
// Game Data & Config
// =============================================================================
const QUESTIONS = [
  {
    id: "school",
    question: "One Change at School",
    placeholder: "Eg : Organising a tree planting event",
  },
  {
    id: "home",
    question: "One Change at Home",
    placeholder: "Eg : Start composting food waste",
  },
  {
    id: "energy",
    question: "One Energy-Saving Habit",
    placeholder: "Eg : Switch off lights when not in use",
  },
  {
    id: "waste",
    question: "One Waste-Reducing Habit",
    placeholder: "Eg : Carry reusable bags for shopping",
  },
  {
    id: "awareness",
    question: "One Awareness Action",
    placeholder: "Eg : Share climate facts on school bulletin",
  },
];

const PERFECT_SCORE = QUESTIONS.length * 10;
const PASSING_THRESHOLD = 0.7;
const GAME_TIME_LIMIT = 300; // 5 minutes

// Mock API call to simulate Gemini verification
const verifyPledgeWithGemini = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (text.trim().length > 10 && text.trim().split(' ').length > 2) {
        resolve({
          isGood: true,
          message: "Great Going!",
        });
      } else if (text.trim().length > 0) {
        resolve({
          isGood: false,
          message: "Can you be more specific?",
        });
      }
    }, 800);
  });
};


// =============================================================================
// Reusable End-Screen Components
// =============================================================================
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
              <div className="bg-[#131F24] mt-0 w-full h-[8.8vh] rounded-[0.55vw] flex items-center justify-center py-[1.6vh] px-[1.3vw]">
                <img src="/financeGames6to8/accImg.svg" alt="Target Icon" className="w-[1.6vw] h-[2.6vh] mr-[0.5vw]" />
                <span className="text-[#09BE43] text-[2.7vh] font-extrabold">{accuracyScore}%</span>
              </div>
            </div>
            <div className="w-[20vw] bg-[#FFCC00] rounded-[0.83vw] p-[0.27vw] flex flex-col items-center">
              <p className="text-black text-[1.5vh] font-bold mb-[0.5vh] mt-[1vh]">INSIGHT</p>
              <div className="bg-[#131F24] mt-0 w-full h-[8.8vh] rounded-[0.55vw] flex items-center justify-center px-[1.1vw] text-center">
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
                        <div className="bg-[#131F24] mt-0 w-full h-[8.8vh] rounded-[0.55vw] flex items-center justify-center py-[1.6vh] px-[1.3vw]">
                            <img src="/financeGames6to8/accImg.svg" alt="Target Icon" className="w-[1.6vw] h-[2.6vh] mr-[0.5vw]" />
                            <span className="text-red-500 text-[2.7vh] font-extrabold">{accuracyScore}%</span>
                        </div>
                    </div>
                    <div className="w-[20vw] bg-[#FFCC00] rounded-[0.83vw] p-[0.27vw] flex flex-col items-center">
                        <p className="text-black text-sm font-bold mb-[0.5vh] mt-[1vh]">INSIGHT</p>
                        <div className="bg-[#131F24] mt-0 w-full h-[8.8vh] rounded-[0.55vw] flex items-center justify-center px-[1.1vw] text-center">
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
    return (
        <div className="w-full h-screen bg-[#0A160E] text-white p-[1.6vw] flex flex-col items-center">
            <h1 className="text-[4.4vh] font-bold lilita-one-regular mb-[2.7vh] text-yellow-400 flex-shrink-0">Review Your Pledges</h1>
            <div className="w-full max-w-[88vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.3vw] flex-grow overflow-y-auto p-[0.5vw]">
                {answers.map((ans, idx) => (
                    <div key={idx} className={`p-[1.1vw] rounded-[0.83vw] flex flex-col ${ans.isGood ? 'bg-green-900/70 border-green-700' : 'bg-red-900/70 border-red-700'} border-[0.1vh]`}>
                        <p className="text-gray-300 text-[1.7vh] mb-[1vh] leading-tight font-bold">{ans.question}</p>
                        <div className="text-[1.5vh] space-y-[0.5vh]">
                            <p className="font-semibold">Your Pledge:</p>
                            <p className={`font-mono ${ans.isGood ? 'text-white' : 'text-red-300'}`}>{ans.answer || "Not Answered"}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={onBackToResults} className="mt-[2.7vh] px-[2.7vw] py-[1.6vh] bg-yellow-500 hover:bg-yellow-600 rounded-[0.55vw] text-[2.2vh] font-bold text-black transition-colors flex-shrink-0">
                Back to Results
            </button>
        </div>
    );
}


// =============================================================================
// Reducer Logic
// =============================================================================
const initialState = {
    gameState: "intro", // intro, instructions, playing, finished, review
    timeLeft: GAME_TIME_LIMIT,
    score: 0,
    answers: [],
    currentQuestionIndex: 0,
    // Per-question state
    inputValue: "",
    feedback: { message: "", isGood: false, visible: false },
    isChecking: false, // For loading spinner on "Check Now" button
    isVerified: false, // Has the current pledge been checked at least once?
};

function gameReducer(state, action) {
    switch (action.type) {
        case "SHOW_INSTRUCTIONS": return { ...state, gameState: "instructions" };
        case "START_GAME": return { ...initialState, gameState: "playing", timeLeft: GAME_TIME_LIMIT };
        case "TICK":
            if (state.timeLeft <= 1) {
                return { ...state, timeLeft: 0, gameState: "finished" };
            }
            return { ...state, timeLeft: state.timeLeft - 1 };
        case "SET_INPUT_VALUE":
            return {
                ...state,
                inputValue: action.payload,
                isVerified: false, // Reset verification on new input
                feedback: { ...state.feedback, visible: false }, // Hide old feedback
            };
        case "START_VERIFICATION":
            return { ...state, isChecking: true };
        case "SET_VERIFICATION_RESULT":
            return {
                ...state,
                feedback: { ...action.payload, visible: true },
                isChecking: false,
                isVerified: true,
            };
        case "CONTINUE": {
            const currentAnswer = state.inputValue;
            const currentFeedback = state.feedback;
            const isGood = currentAnswer.trim() === "" ? false : currentFeedback.isGood;
            
            const newAnswer = {
                question: QUESTIONS[state.currentQuestionIndex].question,
                answer: currentAnswer,
                isGood: isGood,
            };

            const updatedAnswers = [...state.answers, newAnswer];
            const newScore = state.score + (isGood ? 10 : 0);
            const nextIndex = state.currentQuestionIndex + 1;

            if (nextIndex < QUESTIONS.length) {
                return {
                    ...state,
                    currentQuestionIndex: nextIndex,
                    answers: updatedAnswers,
                    score: newScore,
                    // Reset for next question
                    inputValue: "",
                    feedback: { message: "", isGood: false, visible: false },
                    isVerified: false,
                    isChecking: false,
                };
            } else {
                return { ...state, gameState: "finished", answers: updatedAnswers, score: newScore };
            }
        }
        case "REVIEW_GAME": return { ...state, gameState: "review" };
        case "BACK_TO_FINISH": return { ...state, gameState: "finished" };
        case "RESET_GAME": return { ...initialState, gameState: "playing", timeLeft: GAME_TIME_LIMIT };
        default: return state;
    }
}

// =============================================================================
// Main Game Component
// =============================================================================
const ClimatePledge = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Timer Effect
    useEffect(() => {
        if (state.gameState !== "playing") return;
        const timerId = setInterval(() => dispatch({ type: "TICK" }), 1000);
        return () => clearInterval(timerId);
    }, [state.gameState]);

    const handleCheck = useCallback(async () => {
        if (!state.inputValue.trim() || state.isChecking) return;
        dispatch({ type: "START_VERIFICATION" });
        const result = await verifyPledgeWithGemini(state.inputValue);
        dispatch({ type: "SET_VERIFICATION_RESULT", payload: result });
    }, [state.inputValue, state.isChecking]);

    const handleContinue = useCallback(() => {
        dispatch({ type: "CONTINUE" });
    }, []);

    // --- RENDER LOGIC ---

    if (state.gameState === "intro") {
        return <IntroScreen onShowInstructions={() => dispatch({ type: "SHOW_INSTRUCTIONS" })} />;
    }
    if (state.gameState === "instructions") {
        return <InstructionsScreen onStartGame={() => dispatch({ type: "START_GAME" })} />;
    }
    if (state.gameState === "finished") {
        const accuracyScore = Math.round((state.score / PERFECT_SCORE) * 100);
        const isVictory = accuracyScore >= PASSING_THRESHOLD * 100;
        const insightText = accuracyScore >= 80 ? "Excellent! Your pledges are strong." : "Good try! Review your pledges to make them stronger.";
        return isVictory
            ? <VictoryScreen accuracyScore={accuracyScore} insight={insightText} onViewFeedback={() => dispatch({ type: 'REVIEW_GAME' })} onContinue={() => navigate('/environmental/games')} />
            : <LosingScreen accuracyScore={accuracyScore} insight={insightText} onPlayAgain={() => dispatch({ type: 'RESET_GAME' })} onViewFeedback={() => dispatch({ type: 'REVIEW_GAME' })} onContinue={() => navigate('/environmental/games')} />;
    }
    if (state.gameState === "review") {
        return <ReviewScreen answers={state.answers} onBackToResults={() => dispatch({ type: "BACK_TO_FINISH" })} />;
    }

    // --- MAIN 'PLAYING' RENDER ---
    const currentQuestion = QUESTIONS[state.currentQuestionIndex];
    const isCheckNowDisabled = state.inputValue.trim() === "" || state.isChecking;
    const isContinueDisabled = !state.isVerified;

    return (
        <div className="w-full h-screen bg-[#0A160E] flex flex-col items-center justify-start pt-[10vh] pb-[12vh] relative overflow-hidden">
            <GameNav timeLeft={state.timeLeft} />
            
            <div className="flex-grow flex flex-col justify-between items-center text-center w-full max-w-4xl px-4">
                {/* Question */}<div className="mt-24">
                <div className="mb-9">
                    <h1 className="text-white text-2xl md:text-4xl font-bold font-['Comic_Neue'] leading-normal">{currentQuestion.question}</h1>
                </div>

                {/* Input Area */}
                <div className="w-[40vw] h-36 md:h-44 bg-gray-800/30 rounded-[10px] border border-zinc-700 p-2 mb-6">
                    <textarea
                        value={state.inputValue}
                        onChange={(e) => dispatch({ type: "SET_INPUT_VALUE", payload: e.target.value })}
                        placeholder={currentQuestion.placeholder}
                        className="w-full h-full bg-transparent text-center px-8 py-4 text-neutral-400 placeholder:text-neutral-500 md:text-2xl font-bold font-['Comic_Neue'] leading-normal outline-none resize-none flex items-center justify-center"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    />
                </div>
                </div>
                
                {/* Feedback Area */}
                <div className="w-full h-[18vh] flex justify-center items-end">
                    {state.feedback.visible && (
                        <div className="flex items-center w-auto max-w-[40vw] h-[18vh] -ml-4">
                             <img src="/feedbackcharacter.gif" alt="Feedback Character" className="w-[9vw] h-[18vh] object-contain" />
                             <div className="relative flex items-center">
                                 <div 
                                    className="absolute left-[-1.1vw] top-1/2 -translate-y-1/2 w-[1.25vw] h-[2.2vh] bg-cover bg-no-repeat"
                                    style={{ backgroundImage: "url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-09/cZcfryFaXc.png)" }}
                                 />
                                 <div className={`flex h-[7vh] justify-center items-center bg-[#131f24] rounded-[0.83vw] border-solid border-[0.32vh] px-[2.2vw] border-[#37464f]`}>
                                     <span className={`font-['Inter'] text-[2.6vh] font-medium text-center text-[#f1f7fb]`}>
                                         {state.feedback.message}
                                     </span>
                                 </div>
                             </div>
                         </div>
                    )}
                </div>
            </div>

            {/* Bottom Button Bar */}
            <div className="w-full h-[12vh] bg-[#28343A] flex justify-center items-center px-4 md:px-[5vw] gap-4 md:gap-8 fixed bottom-0 left-0 z-50">
                <button
                    onClick={handleCheck}
                    disabled={isCheckNowDisabled}
                    className="relative w-48 h-16"
                >
                    <Checknow
                        topGradientColor="#02ad3eff"
                        bottomGradientColor="#026123ff"
                        className={isCheckNowDisabled ? "opacity-70" : ""}
                        width="100%"
                        height="100%"
                    />
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lilita-one-regular text-[2.5vh] text-white [text-shadow:0_0.3vh_0_#000] transition-opacity ${isCheckNowDisabled ? "opacity-50" : ""}`}>
                        {state.isChecking ? "Checking..." : "Check Now"}
                    </span>
                </button>
                <button
                    onClick={handleContinue}
                    disabled={isContinueDisabled}
                    className="relative w-48 h-16"
                >
                    <Checknow
                        topGradientColor="#02ad3eff"
                        bottomGradientColor="#026123ff"
                        className={isCheckNowDisabled ? "opacity-70" : ""}
                        width="100%"
                        height="100%"
                    />
                    <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lilita-one-regular text-[2.5vh] text-white [text-shadow:0_0.3vh_0_#000] transition-opacity ${isContinueDisabled ? "opacity-50" : ""}`}>
                        Continue
                    </span>
                </button>
                
            </div>
        </div>
    );
};

export default ClimatePledge;