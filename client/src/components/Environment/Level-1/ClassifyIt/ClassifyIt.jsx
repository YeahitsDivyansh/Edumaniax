import React, { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext";
import IntroScreen from "./IntroScreen";
import InstructionsScreen from "./InstructionsScreen";
import GameNav from "./GameNav";
import Checknow from "@/components/icon/GreenBudget/Checknow";

import NaturalBioticImg from "/environmentGameInfo/ClassifyIt/biotic.png";
import NaturalAbioticImg from "/environmentGameInfo/ClassifyIt/abiotic.png";
import HumanMadeImg from "/environmentGameInfo/ClassifyIt/human_made.png";
import SocialImg from "/environmentGameInfo/ClassifyIt/social.png";

const data = [
  { word: "Tree", answer: "Natural–Biotic" },
  { word: "River", answer: "Natural–Abiotic" },
  { word: "Cow", answer: "Natural–Biotic" },
  { word: "Law", answer: "Social" },
  { word: "Oxygen", answer: "Natural–Abiotic" },
  { word: "Airplane", answer: "Human-Made" },
  { word: "School", answer: "Social" },
  { word: "Bridge", answer: "Human-Made" },
  { word: "Sunlight", answer: "Natural–Abiotic" },
  { word: "Family", answer: "Social" },
  { word: "Road", answer: "Human-Made" },
  { word: "Fish", answer: "Natural–Biotic" },
];

const categories = [
  { name: "Natural–Biotic", image: NaturalBioticImg },
  { name: "Natural–Abiotic", image: NaturalAbioticImg },
  { name: "Human-Made", image: HumanMadeImg },
  { name: "Social", image: SocialImg },
];

const TIME_LIMIT = 180;
const TOTAL_QUESTIONS = data.length;

const initialState = {
  gameState: "intro",
  introStep: "first",
  currentIndex: 0,
  selected: null,
  score: 0,
  answers: [],
  timeLeft: TIME_LIMIT,
  timerActive: false,
  answerSubmitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_INSTRUCTIONS":
      return { ...state, introStep: "instructions" };
    case "START_GAME":
      return {
        ...initialState,
        gameState: "playing",
        introStep: "first",
        timerActive: true,
      };
    case "SELECT_OPTION":
      // Do not allow selection change after submitting
      if (state.answerSubmitted) {
        return state;
      }
      return { ...state, selected: state.selected === action.payload ? null : action.payload };
    case "SUBMIT_ANSWER": {
      const current = data[state.currentIndex];
      const isCorrect = current.answer === state.selected;
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            word: current.word,
            selected: state.selected,
            correctAnswer: current.answer,
            isCorrect,
          },
        ],
        score: isCorrect ? state.score + 2 : state.score,
        timerActive: false,
        answerSubmitted: true,
      };
    }
    case "NEXT_QUESTION":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selected: null,
        timerActive: true,
        answerSubmitted: false,
      };
    case "FINISH_GAME":
      return { ...state, gameState: "finished", timerActive: false };
    case "REVIEW_GAME":
      return { ...state, gameState: "review" };
    case "BACK_TO_FINISH":
      return { ...state, gameState: "finished" };
    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "RESET_GAME":
      return { ...initialState, gameState: "playing", timerActive: true };
    default:
      return state;
  }
}

const ClassifyIt = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const { updatePerformance } = usePerformance();

  useEffect(() => {
    if (state.gameState === "playing" && state.timerActive && state.timeLeft > 0) {
      const timer = setTimeout(() => dispatch({ type: "TICK" }), 1000);
      return () => clearTimeout(timer);
    }
    if (state.timeLeft === 0 && state.gameState === "playing") {
      dispatch({ type: "FINISH_GAME" });
    }
  }, [state.gameState, state.timerActive, state.timeLeft]);

  useEffect(() => {
    if (state.gameState === "finished") {
      const runPerformanceUpdate = async () => {
        try {
          const totalAnswered = state.answers.length;
          const correct = state.answers.filter(a => a.isCorrect).length;
          const rawScore = state.score;
          const scaledScore = parseFloat(((rawScore / (TOTAL_QUESTIONS * 2)) * 10).toFixed(2));
          const accuracy = totalAnswered ? (correct / totalAnswered) * 100 : 0;
          const scaledAccuracy = parseFloat(accuracy.toFixed(2));
          const completed = totalAnswered === TOTAL_QUESTIONS;
          const studyTimeMinutes = Math.round((TIME_LIMIT - state.timeLeft) / 60);
          const avgResponseTimeSec = totalAnswered ? Math.round((TIME_LIMIT - state.timeLeft) / totalAnswered) : 0;

          await completeEnvirnomentChallenge(0, 0);

          await updatePerformance({
            moduleName: "Environment",
            topicName: "sustainableLeader",
            score: scaledScore,
            accuracy: scaledAccuracy,
            avgResponseTimeSec,
            studyTimeMinutes,
            completed,
          });
        } catch (error) {
          console.error("Error updating environment performance:", error);
        }
      };
      runPerformanceUpdate();
    }
  }, [state.gameState, state.score, state.answers, state.timeLeft, completeEnvirnomentChallenge, updatePerformance]);

  const handleSubmit = () => {
    if (state.selected === null) return;
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  const handleNextQuestion = () => {
    if (state.currentIndex < TOTAL_QUESTIONS - 1) {
      dispatch({ type: "NEXT_QUESTION" });
    } else {
      dispatch({ type: "FINISH_GAME" });
    }
  };

  const currentWord = data[state.currentIndex].word.toUpperCase();
  const buttonText = state.answerSubmitted ? "Continue" : "Submit";
  const isButtonEnabled = state.answerSubmitted || state.selected !== null;
  const showFeedback = state.answerSubmitted;

  if (state.gameState === "intro") {
    if (state.introStep === "first") {
      return <IntroScreen onShowInstructions={() => dispatch({ type: "SHOW_INSTRUCTIONS" })} />;
    }
    if (state.introStep === "instructions") {
      return <InstructionsScreen onStartGame={() => dispatch({ type: "START_GAME" })} />;
    }
  }

  if (state.gameState === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <h1 className="text-4xl font-bold mb-2 mt-16 text-center">Classify it</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Classify the given word into one of the given categories
        </p>
        <div className="flex flex-1 flex-col items-center justify-center w-full px-7 pb-7">
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src="/blogDesign/kidsImage.svg"
              alt="Kids reading blog"
              className="w-48 mx-auto mb-4"
            />
            <div className="text-5xl font-bold text-green-600 mb-2 text-center">
              {state.score}/{TOTAL_QUESTIONS * 2}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 w-full">
            <button onClick={() => {
              dispatch({ type: "RESET_GAME" })
            }} className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a] " style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Play Again
            </button>
            <button onClick={() => navigate(-1)} className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)] hover:bg-green-600 " style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Continue
            </button>
            <button onClick={() => dispatch({ type: "REVIEW_GAME" })} className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a]" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.gameState === "review") {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-green-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-6xl bg-white rounded-3xl shadow flex flex-col items-center p-6 sm:p-8 lg:p-10 relative">
          <button onClick={() => dispatch({ type: "BACK_TO_FINISH" })} className="flex justify-center items-center absolute top-4 right-4 z-[139] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full hover:bg-gray-200 transition">
            <span className="font-['Comfortaa'] text-[36px] sm:text-[40px]  text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">+</span>
          </button>
          <h2 className="text-3xl sm:text-4xl font-bold text-center w-full" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>Check your answers</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-700 text-center w-full" style={{ fontFamily: 'Commissioner, Arial, sans-serif' }}>Classify the given word into one of the given categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full justify-items-center">
            {state.answers.map((ans, idx) => {
              const isCorrect = ans.isCorrect;
              return (
                <div
                  key={idx}
                  className={`main-container flex w-full max-w-[280px] sm:max-w-[256px] h-[120px] sm:h-[117px] p-4 sm:pt-[18px] sm:pr-[24px] sm:pb-[18px] sm:pl-[24px] flex-col gap-[10px] justify-center items-start rounded-[15px] relative ${isCorrect ? "bg-[#c8ff9e]" : "bg-[#ffdfe0]"}`}
                >
                  <div className="flex w-full justify-between items-start relative">
                    <div className="flex flex-col gap-[8px] sm:gap-[10px] items-start flex-1">
                      <span className={`font-['Comic_Neue'] text-xl sm:text-[25px] font-bold leading-[24px] relative text-left whitespace-nowrap z-[2] ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>{ans.word}</span>
                      <div className="flex flex-col gap-[2px] sm:gap-[3px] items-start w-full">
                        <span className={`font-['Commissioner'] text-sm sm:text-[18px] font-light leading-[20px] sm:leading-[24px] relative text-left whitespace-nowrap z-[4] ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>You : {ans.selected}</span>
                        <span className={`font-['Commissioner'] text-sm sm:text-[18px] font-light leading-[20px] sm:leading-[24px] relative text-left whitespace-nowrap z-[5] ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>Ans : {ans.correctAnswer}</span>
                      </div>
                    </div>
                    <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] shrink-0 bg-contain bg-no-repeat ml-2" style={{ backgroundImage: isCorrect ? "url(/check.png)" : "url(/cancel.png)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <GameNav />
      <div className="w-full flex flex-col items-center pt-2 pb-8">
        {/* Word Section */}
        <div className="w-full max-w-5xl flex items-center justify-center mt-12 mb-16">
          <div className="flex items-center space-x-4">
            <h2 className="text-4xl text-white font-['Lilita_One']">Word:</h2>
              <span className="text-5xl text-white font-['Lilita_One']">{currentWord}</span>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-0">
          {categories.map((cat) => {
            const isSelected = state.selected === cat.name;
            const correctAnswer = data[state.currentIndex].answer;

            // --- MODIFICATION START: New logic for card styling ---
            let borderClass = 'border-gray-500';
            let interactionClass = '';

            if (state.answerSubmitted) {
              // After submission, no hover/scale effects
              interactionClass = '';
              // If this card is the correct one, its border is green
              if (cat.name === correctAnswer) {
                borderClass = 'border-green-500';
              }
              // If this card was selected AND it was wrong, its border is red
              else if (isSelected && cat.name !== correctAnswer) {
                borderClass = 'border-red-500';
              }
            } else {
              // Before submission
              interactionClass = 'hover:scale-102'; // Hover effect
              if (isSelected) {
                borderClass = 'border-green-500';
                interactionClass = 'transform '; // Active selection effect
              }
            }
            // --- MODIFICATION END ---

            return (
              <div
                key={cat.name}
                onClick={() => dispatch({ type: "SELECT_OPTION", payload: cat.name })}
                className={`
                  px-6 pb-4 rounded-2xl cursor-pointer transition-all duration-300
                  bg-gray-800/30 flex flex-col justify-start items-center  
                  border-2 ${borderClass}
                  ${interactionClass}
                `}
              >
                <img src={cat.image} alt={cat.name} className="w-48 h-60 object-contain" />
                <div className="w-full inline-flex justify-center items-center">
                  <span className="text-center justify-center text-slate-100 text-3xl font-medium font-['Inter'] leading-relaxed">
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar with Button */}
        <div className="w-full h-[12vh] bg-[#28343A] flex justify-center items-center px-[5vw] z-10 fixed bottom-0">
          <div className="w-[12vw] h-[8vh]">
            <button
              className="relative w-full h-full cursor-pointer"
              onClick={showFeedback ? handleNextQuestion : handleSubmit}
              disabled={!isButtonEnabled}
            >
              {/* --- MODIFICATION START: Updated Checknow component props --- */}
              <Checknow
                topGradientColor={"#09be43"}
                bottomGradientColor={"#068F36"}
                width="100%"
                height="100%"
              />
              {/* --- MODIFICATION END --- */}
              <span
                className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  lilita text-[2.5vh] text-white [text-shadow:0_3px_0_#000]
                  ${!isButtonEnabled && "opacity-50"}
                `}
              >
                {buttonText}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifyIt;