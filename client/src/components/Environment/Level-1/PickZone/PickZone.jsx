import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext";
const questions = [
  {
    question: "The layer that includes soil, rocks, and land where we build houses and grow food",
    answer: "Lithosphere",
  },
  {
    question: "The part of Earth that holds all the air and gases like oxygen and carbon dioxide",
    answer: "Atmosphere",
  },
  {
    question: "All water bodies – including oceans, rivers, glaciers, and lakes",
    answer: "Hydrosphere",
  },
  {
    question: "The zone of life — where animals, plants, and humans interact with air, water, and land",
    answer: "Biosphere",
  },
  {
    question: "This zone plays a key role in the water cycle and supports aquatic life",
    answer: "Hydrosphere",
  },
  {
    question: "This zone is directly affected by air pollution and climate change",
    "answer": "Atmosphere",
  },
];

const options = [
  "Lithosphere",
  "Atmosphere",
  "Hydrosphere",
  "Biosphere",
];

const TOTAL_QUESTIONS = questions.length;
const TIME_LIMIT = 120;

const initialState = {
  gameState: "start", // "start", "playing", "finished", "review"
  currentIndex: 0,
  selected: null,
  score: 0,
  answers: [], // Stores { question, selected, correctAnswer, isCorrect } for review
  timeLeft: TIME_LIMIT,
  timerActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...initialState, gameState: "playing", timerActive: true };
    case "SELECT":
      return { ...state, selected: action.value };
    case "SUBMIT": {
      if (state.selected === null) return state;
      const current = questions[state.currentIndex];
      const isCorrect = current.answer === state.selected;
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            question: current.question,
            selected: state.selected,
            correctAnswer: current.answer,
            isCorrect,
          },
        ],
        score: isCorrect ? state.score + 1 : state.score,
        timerActive: false,
      };
    }
    case "NEXT":
      if (state.currentIndex < TOTAL_QUESTIONS - 1) {
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
          selected: null,
          timerActive: true,
        };
      } else {
        return {
          ...state,
          gameState: "finished",
          timerActive: false,
        };
      }
    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "TIME_UP":
      return { ...state, gameState: "finished", timerActive: false };

    case "FINISH_GAME":
      return { ...state, gameState: "finished", timerActive: false };
    case "REVIEW_GAME":
      return { ...state, gameState: "review" };
    case "BACK_TO_FINISH":
      return { ...state, gameState: "finished" };
    case "RESET_GAME":
      return { ...initialState, gameState: "playing", timerActive: true };

    default:
      return state;
  }
}


function PickZoneOption({ text, selected, onClick }) {
  const iconUrl = selected
    ? "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/OUPKF7XyuA.png"
    : "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/szijJePOLJ.png";

  return (
    <div
      className={`relative cursor-pointer w-full h-[58px] flex items-center justify-between
                   ${selected ? "border-transparent bg-[#ffffff]" : "border-solid border-[3px] border-[rgba(141,189,156,0.2)]"}`}
      onClick={onClick}
    >
      <div className="flex items-center h-full">
        <div className={`w-[11px] h-full absolute left-0 top-0 ${selected ? "bg-[#09be43]" : "bg-transparent"}`} />
        <span className="font-['Comic_Neue'] text-[20px] md:text-[22px] lg:text-[25px] font-bold leading-[24px] text-[#8cbd9c] ml-[20px] sm:ml-[33px] whitespace-nowrap">
          {text}
        </span>
      </div>
      <img
        src={iconUrl}
        alt={selected ? "selected" : "unselected"}
        className="w-[30px] h-[30px] mr-4 shrink-0"
      />
    </div>
  );
}


const PickZone = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const { updatePerformance } = usePerformance();

  useEffect(() => {
    if (state.gameState === "finished") {
      completeEnvirnomentChallenge(0, 1);

      const totalAnswered = state.answers.length;
      const correct = state.answers.filter(a => a.isCorrect).length;

      const rawScore = state.score; // out of 6
      const scaledScore = parseFloat(((rawScore / TOTAL_QUESTIONS) * 10).toFixed(2)); // out of 10
      const accuracy = totalAnswered ? (correct / totalAnswered) * 100 : 0;
      const scaledAccuracy = parseFloat(accuracy.toFixed(2)); // out of 100

      const completed = totalAnswered === TOTAL_QUESTIONS;
      const studyTimeMinutes = Math.round((TIME_LIMIT - state.timeLeft) / 60);
      const avgResponseTimeSec = totalAnswered ? Math.round((TIME_LIMIT - state.timeLeft) / totalAnswered) : 0;

      updatePerformance({
        moduleName: "Environment",
        topicName: "sustainableLeader",
        score: scaledScore,
        accuracy: scaledAccuracy,
        avgResponseTimeSec,
        studyTimeMinutes,
        completed,

      });
      setStartTime(Date.now());
    }
  }, [state.gameState, state.score, state.answers, state.timeLeft]);


  useEffect(() => {
    if (state.gameState === "playing" && state.timerActive && state.timeLeft > 0) {
      const timer = setTimeout(() => dispatch({ type: "TICK" }), 1000);
      return () => clearTimeout(timer);
    }
    if (state.timeLeft === 0 && state.gameState === "playing") {
      dispatch({ type: "FINISH_GAME" });
    }
  }, [state.gameState, state.timerActive, state.timeLeft]);

  const progress = ((TIME_LIMIT - state.timeLeft) / TIME_LIMIT) * 100;
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const handleBackToLevels = () => navigate(-1);

  if (state.gameState === "review") {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-green-100  px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-6xl bg-white rounded-3xl shadow flex flex-col items-center p-6 sm:p-8 lg:p-10 lg:px-20 relative">
          <button onClick={() => dispatch({ type: "BACK_TO_FINISH" })} className="flex justify-center items-center absolute top-4 right-4 z-[139] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full hover:bg-gray-200 transition">
            <span className="font-['Comfortaa'] text-[36px] sm:text-[40px] text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">+</span>
          </button>
          <h2 className="text-3xl sm:text-4xl font-bold text-center w-full" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>Check your answers</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-700 text-center w-full" style={{ fontFamily: 'Commissioner, Arial, sans-serif' }}>Match each environment description to its correct zone</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full justify-items-center">
            {state.answers.map((ans, idx) => {
              const isCorrect = ans.isCorrect;
              return (
                <div
                  key={idx}
                  className={`main-container flex flex-col p-4 sm:p-5 gap-2 rounded-[15px] relative w-full max-w-[300px] sm:max-w-[calc(100%-1rem)] lg:max-w-[calc(100%-1rem)] xl:max-w-[280px] ${isCorrect ? "bg-[#c8ff9e]" : "bg-[#ffdfe0]"}`}
                >
                  <div className="flex w-full justify-between items-start relative">
                    <div className="flex flex-col gap-1 items-start flex-1 mr-2">
                      <span className={`font-['Comic_Neue'] text-lg sm:text-xl font-bold leading-tight relative text-left ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>
                        {ans.question}
                      </span>
                      <span className={`font-['Commissioner'] text-sm sm:text-base font-light leading-tight relative text-left ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>You : {ans.selected}</span>
                      <span className={`font-['Commissioner'] text-sm sm:text-base font-light leading-tight relative text-left ${isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>Ans : {ans.correctAnswer}</span>
                    </div>
                    <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] shrink-0 bg-contain bg-no-repeat" style={{ backgroundImage: isCorrect ? "url(/check.png)" : "url(/cancel.png)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (state.gameState === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 pb-8 md:pb-0">
        <h1 className="text-4xl font-bold mb-2 mt-16 text-center">Pick the Zone</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Match each environment description to its correct zone
        </p>
        <div className="flex flex-1 flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src="/blogDesign/kidsImage.svg"
              alt="Result illustration"
              className="w-48 mx-auto mb-4"
            />
            <div className="text-5xl font-bold text-green-600 mb-2 text-center">
              {state.score}/{TOTAL_QUESTIONS}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4 w-full max-w-xl">
            <button onClick={() => {
              dispatch({ type: "RESET_GAME" })
              setStartTime(Date.now());
            }
            } className="w-full md:w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a] " style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Play Again
            </button>
            <button onClick={handleBackToLevels} className="w-full md:w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)] hover:bg-green-600 " style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Continue
            </button>
            <button onClick={() => dispatch({ type: "REVIEW_GAME" })} className="w-full md:w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a]" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.gameState === "playing") {
    const currentQ = questions[state.currentIndex];

    return (
      <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 md:p-8">

        <div className="w-full max-w-4xl flex items-center justify-between mb-8 relative">
          <div className="flex items-center gap-2 pr-2 sm:pr-4">
            <span className="font-['Comic_Neue'] text-lg md:text-xl font-bold text-[#4B4B4B]">
              {formattedTime}
            </span>
          </div>
          <div className="flex-1 h-[22px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
            <div
              className="h-[22px] rounded-[20px] bg-[#09BE43] transition-all duration-300"
              style={{ width: `${Math.max(0, progress)}%`, minWidth: 0 }}
            ></div>
          </div>
        </div>

        {/* Main Content Container (Light Green Box) */}

        <div className="w-full max-w-[1165px] bg-[#f5ffed] rounded-[25px] mx-auto
                    p-4 sm:p-8 md:px-12 md:py-18
                    flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-evenly
                    gap-8">

          {/* Left Section: Question and Image */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-2/5 xl:w-1/3 min-w-0 md:max-h-[500px]">
            <span className="font-['Comic_Neue'] text-lg md:text-xl font-bold leading-tight text-[#10903e] mb-2">
              Question : {state.currentIndex + 1}
            </span>
            <span className="font-['Comic_Neue'] text-lg md:text-xl font-bold leading-tight text-[rgba(75,75,75,0.8)] mb-4">
              {currentQ.question}
            </span>
            <div
              className="w-28 h-28 sm:w-42 sm:h-42 rounded-[25px] bg-cover bg-no-repeat shrink-0 mt-8 lg:mt-2 lg:self-center"
              style={{ backgroundImage: "url(/environmentGameInfo/lithosphere.png)" }}
            ></div>
          </div>

          {/* Right Section: Options */}
          <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-3/5 xl:w-1/2 max-w-lg lg:max-w-none ">
            {options.map((opt) => (
              <PickZoneOption
                key={opt}
                text={opt}
                selected={state.selected === opt}
                onClick={() => dispatch({ type: "SELECT", value: opt })}
              />
            ))}
          </div>
        </div>

        {/* Submit Button*/}
        <div className="mt-8 mb-8 w-full flex justify-center">
          <button
            onClick={() => {
              if (state.selected === null) return;
              dispatch({ type: "SUBMIT" });
              setTimeout(() => {
                if (state.currentIndex < TOTAL_QUESTIONS - 1) {
                  dispatch({ type: "NEXT" });
                } else {
                  dispatch({ type: "FINISH_GAME" });
                }
              }, 300);
            }}
            disabled={state.selected === null}
            className={`flex justify-center items-center w-[200px] sm:w-[250px] h-[50px] sm:h-[60px] rounded-[10px] text-lg sm:text-xl font-semibold transition-all
              ${state.selected === null
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)] hover:bg-green-600"}
            `}
            style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-8" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>Pick the Zone</h1>
      <p className="text-base md:text-lg text-gray-600 mb-6" style={{ fontFamily: 'Commissioner, Arial, sans-serif' }}>
        Match each environment description to its correct zone
      </p>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md mb-6 text-left">
        <p className="mb-2 text-sm md:text-base">You’ll be given <b>{TOTAL_QUESTIONS} questions</b>. Your job is to pick the correct zone for each:</p>
        <ul className="mb-2 list-disc list-inside text-sm md:text-base">
          <li><b>Lithosphere</b> (soil, rocks, land)</li>
          <li><b>Atmosphere</b> (air, gases)</li>
          <li><b>Hydrosphere</b> (water bodies)</li>
          <li><b>Biosphere</b> (zone of life)</li>
        </ul>
        <p className="mb-2 text-sm md:text-base">✅ <b>Scoring:</b> +1 per correct match</p>
        <p className="mb-2 text-sm md:text-base">⏱️ <b>Time Limit:</b> {TIME_LIMIT / 60} minutes</p>
      </div>
      <button
        onClick={() => dispatch({ type: "START" })}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg md:text-xl font-semibold shadow-lg"
      >
        Start
      </button>
    </div>
  );
};

export default PickZone;