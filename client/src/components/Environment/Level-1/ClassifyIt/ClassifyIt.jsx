import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext";

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
  "Natural–Biotic",
  "Natural–Abiotic",
  "Human-Made",
  "Social",
];

const TIME_LIMIT = 180;
const TOTAL_QUESTIONS = data.length;

const initialState = {
  gameState: "start",
  currentIndex: 0,
  selected: null,
  score: 0,
  answers: [],
  timeLeft: TIME_LIMIT,
  timerActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_GAME":
      return { ...initialState, gameState: "playing", timerActive: true };
    case "SELECT_OPTION":
      return { ...state, selected: action.payload };
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
      };
    }
    case "NEXT_QUESTION":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selected: null,
        timerActive: true,
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

          const rawScore = state.score; // out of 24
          const scaledScore = parseFloat(((rawScore / 24) * 10).toFixed(2)); // out of 10
          const accuracy = totalAnswered ? (correct / totalAnswered) * 100 : 0;
          const scaledAccuracy = parseFloat(accuracy.toFixed(2)); // out of 100

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
          setStartTime(Date.now());
        } catch (error) {
          console.error("Error updating environment performance:", error);
        }
      };

      runPerformanceUpdate();
    }
  }, [state.gameState, state.score, state.answers, state.timeLeft]);



  const handleBackToLevels = () => navigate(-1);

  const progress = ((TIME_LIMIT - state.timeLeft) / TIME_LIMIT) * 100;

  if (state.gameState === "start") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold mb-2 mt-8">Classify it</h1>
        <p className="text-lg text-gray-600 mb-6">
          Classify the given word into one of the given categories
        </p>
        <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mb-6">
          <p className="mb-2">
            You’ll be given a list of <b>12 words</b>. Your job is to sort each into one of four categories:
          </p>
          <ul className="mb-2 text-left list-disc pl-5">
            <li><b>Natural–Biotic</b> (living natural elements)</li>
            <li><b>Natural–Abiotic</b> (non-living natural elements)</li>
            <li><b>Human-Made</b> (built by humans)</li>
            <li><b>Social</b> (related to society, rules, or institutions)</li>
          </ul>
          <p className="mb-2">🎯 <b>Scoring:</b> +2 per correct placement</p>
          <p className="mb-2">🕐 <b>Time Limit:</b> 3 minutes</p>
        </div>
        <button
          onClick={() => dispatch({ type: "START_GAME" })}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-xl font-semibold shadow-lg"
        >
          Start
        </button>
      </div>
    );

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
              setStartTime(Date.now());
            }
            } className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a] " style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Play Again
            </button>
            <button onClick={handleBackToLevels} className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)] hover:bg-green-600 " style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
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
          <button onClick={() => dispatch({ type: "BACK_TO_FINISH" })} className="flex justify-center items-center absolute top-4 right-4 z-[139] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full hover:bg-gray-200 transition"> {/* Adjusted button size */}
            <span className="font-['Comfortaa'] text-[36px] sm:text-[40px]  text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">+</span>
          </button>
          <h2 className="text-3xl sm:text-4xl font-bold text-center w-full" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>Check your answers</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-700 text-center w-full" style={{ fontFamily: 'Commissioner, Arial, sans-serif' }}>Classify the given word into one of the given categories</p> {/* Adjusted text size and margin */}
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
                      <span className={`font-['Comic_Neue'] text-xl sm:text-[25px] font-bold leading-[24px] relative text-left whitespace-nowrap z-[2] ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>{ans.word}</span> {/* Adjusted text size */}
                      <div className="flex flex-col gap-[2px] sm:gap-[3px] items-start w-full">
                        <span className={`font-['Commissioner'] text-sm sm:text-[18px] font-light leading-[20px] sm:leading-[24px] relative text-left whitespace-nowrap z-[4] ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>You : {ans.selected}</span> {/* Adjusted text size and leading */}
                        <span className={`font-['Commissioner'] text-sm sm:text-[18px] font-light leading-[20px] sm:leading-[24px] relative text-left whitespace-nowrap z-[5] ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>Ans : {ans.correctAnswer}</span> {/* Adjusted text size and leading */}
                      </div>
                    </div>
                    <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] shrink-0 bg-contain bg-no-repeat ml-2" style={{ backgroundImage: isCorrect ? "url(/check.png)" : "url(/cancel.png)" }} /> {/* Adjusted icon size */}
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
    <div className="w-full bg-white min-h-[89vh] flex flex-col justify-center items-center overflow-hidden mt-6 mb-8 px-6">
      <div className="flex flex-col items-center w-full">
        <div className="w-full lg:max-w-[64vw] max-w-[53vw] mt-12px items-end">
          <h1 className="text-4xl font-bold text-center" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive', fontWeight: 1500 }}>Classify it</h1>
          <p className="text-center mb-4" style={{ color: 'rgba(75,75,75,0.8)', fontFamily: 'Commissioner, Arial, sans-serif' }}>Classify the given word into one of the given categories</p>
          <div className="flex flex-col items-center gap-4 mb-6 w-full justify-center lg:flex-row">
            <div className="flex items-center text-lg font-semibold" style={{ color: 'rgba(75,75,75,0.8)', fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              <svg className="w-6 h-6 ml-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {Math.floor(state.timeLeft / 60)}:{(state.timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <div className="flex flex-col items-start w-full lg:ml-4">
              <div className="flex w-full h-[22px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
                <div className="h-[22px] rounded-[20px] bg-[#09BE43] transition-all duration-300" style={{ width: `${Math.max(0, progress)}%`, minWidth: 0 }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl mx-auto bg-white flex flex-col lg:flex-row lg:justify-start items-center lg:items-start">
          {/* Word Card and Submit Button for large screens */}
          <div className="flex-1 flex flex-col items-center w-lg lg:w-auto lg:mr-8 mb-8 lg:mb-0 lg:h-[55vh]">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-xl flex-1 flex items-center justify-center text-4xl font-semibold p-4 min-h-[250px] lg:h-[420px]" style={{ color: 'rgba(75,75,75,0.8)', fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>{data[state.currentIndex].word}</div>
            <button onClick={() => {
              if (state.selected === null) return;
              dispatch({ type: "SUBMIT_ANSWER" });
              if (state.currentIndex < TOTAL_QUESTIONS - 1) {
                setTimeout(() => dispatch({ type: "NEXT_QUESTION" }), 100);
              } else {
                setTimeout(() => dispatch({ type: "FINISH_GAME" }), 100);
              }
            }} disabled={state.selected === null} className={`lg:flex justify-center items-center w-[250px] h-[60px] mt-10 rounded-[10px] text-xl font-semibold transition-all ${state.selected === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)]"} hidden lg:block`} style={{ padding: '17.5px 0px 22.5px 0px', fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Submit
            </button>
          </div>

          {/* Options, Submit Button for small/medium screens, and Questions Left */}
          <div className="flex flex-col items-center justify-center w-full max-w-lg lg:w-80 lg:mt-0 mb-6 lg:mb-12 lg:h-[50vh]">
            <div className="flex flex-col justify-around w-full flex-1 gap-4 lg:gap-6 lg:my-6 ">
              {categories.map((cat) => {
                const isSelected = state.selected === cat;
                return (
                  <button key={cat} onClick={() => dispatch({ type: "SELECT_OPTION", payload: cat })} className={`flex justify-center items-center w-full h-[60px] rounded-[10px] text-lg font-semibold transition-all text-center ${isSelected ? "bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)]" : "bg-white border-2 border-[#E5E5E5] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.25)] hover:bg-gray-100"}`} style={{ padding: '17.5px 0px 22.5px 0px', fontFamily: 'Comic Neue, Comic Sans MS, cursive', color: isSelected ? '#4B4B4B' : 'rgba(75,75,75,0.8)' }}>{cat}</button>
                );
              })}
            </div>

            {/* Submit button for small and medium screens */}
            <button onClick={() => {
              if (state.selected === null) return;
              dispatch({ type: "SUBMIT_ANSWER" });
              if (state.currentIndex < TOTAL_QUESTIONS - 1) {
                setTimeout(() => dispatch({ type: "NEXT_QUESTION" }), 100);
              } else {
                setTimeout(() => dispatch({ type: "FINISH_GAME" }), 100);
              }
            }} disabled={state.selected === null} className={`flex justify-center items-center w-[250px] h-[60px] mt-8 rounded-[10px] text-xl font-semibold transition-all ${state.selected === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)]"} lg:hidden`} style={{ padding: '17.5px 0px 22.5px 0px', fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Submit
            </button>

            <div className="mt-8 w-full flex justify-center"> {/* Adjusted margin-top */}
              <div className="text-center font-bold text-[22px]" style={{ color: '#09BE43', fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
                Questions left : {TOTAL_QUESTIONS - state.currentIndex}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifyIt;