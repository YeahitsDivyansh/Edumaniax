import React, { useReducer, useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import ThinkingCloud from "../../../icon/ThinkingCloud";

// Questions config
const QUESTIONS = [
  {
    id: "school",
    question: "1) One change at school",
    placeholder: "Eg : Organising a tree planting event",
    suggestion:
      "Organising a tree planting event is a great way to improve the school environment!",
  },
  {
    id: "home",
    question: "2) One change at home",
    placeholder: "Eg : Start composting food waste",
    suggestion:
      "Composting is a fantastic way to reduce waste and help your garden!",
  },
  {
    id: "energy",
    question: "3) One energy-saving habit",
    placeholder: "Eg : Switch off lights when not in use",
    suggestion:
      "Switching off lights is a simple but effective way to save energy.",
  },
  {
    id: "waste",
    question: "4) One waste-reducing habit",
    placeholder: "Eg : Carry reusable bags for shopping",
    suggestion: "Reusable bags are a great choice to reduce plastic waste.",
  },
  {
    id: "awareness",
    question: "5) One awareness action",
    placeholder: "Eg : Share climate facts on school bulletin",
    suggestion: "Sharing climate facts helps everyone learn and take action!",
  },
];

const INITIAL_TIME = 300; // 5 minutes in seconds

// Mock API call to simulate Gemini verification
const verifyPledgeWithGemini = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (text.length > 10) {
        resolve({
          isGood: true,
          message: "✅ Good choice! That's a clear and specific plan.",
        });
      } else {
        resolve({
          isGood: false,
          message: "⚠️ Needs improvement. Can you be more specific?",
        });
      }
    }, 1000);
  });
};

const initialState = {
  view: "intro", // 'intro', 'game', 'finish', 'review'
  currentQuestionIndex: 0,
  answers: [],
  inputValue: "",
  suggestion: "",
  isVerified: false,
  isInputEmpty: true,
  score: 0,
};

const reducer = (state, action) => {

  switch (action.type) {
    case "START_GAME":
      return { ...initialState, view: "game" };
    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload,
        isInputEmpty: action.payload.trim() === "",
        isVerified: false, // Re-enable verify on input change
        suggestion: "", // Clear suggestion when input changes
      };
    case "SET_SUGGESTION":
      return {
        ...state,
        suggestion: action.payload.message,
        isVerified: true,
      };
    case "NEXT_QUESTION":
      // Logic to record the final answer before moving to the next question
      const newAnswer = {
        question: QUESTIONS[state.currentQuestionIndex].question,
        answer: state.inputValue,
        suggestion: state.suggestion,
        isCorrect: state.suggestion.startsWith("✅"),
      };

      const updatedAnswers = [...state.answers, newAnswer];
      const newScore = newAnswer.isCorrect ? state.score + 1 : state.score;
      const nextIndex = state.currentQuestionIndex + 1;

      if (nextIndex < QUESTIONS.length) {
        return {
          ...state,
          currentQuestionIndex: nextIndex,
          answers: updatedAnswers,
          score: newScore,
          inputValue: "",
          suggestion: "",
          isVerified: false,
          isInputEmpty: true,
        };
      } else {
        return { ...state, view: "finish", answers: updatedAnswers, score: newScore };
      }
    case "FINISH_GAME":
      // Handle the case where the timer runs out before all questions are answered
      const finalAnswers = [...state.answers];
      if (state.inputValue && finalAnswers.length < QUESTIONS.length) {
        finalAnswers.push({
          question: QUESTIONS[state.currentQuestionIndex].question,
          answer: state.inputValue,
          suggestion: state.suggestion,
          isCorrect: state.suggestion.startsWith("✅"),
        });
      }
      return { ...state, view: "finish", answers: finalAnswers, score: finalAnswers.filter(a => a.isCorrect).length };
    case "RESET_GAME":
      return initialState;
    case "REVIEW_ANSWERS":
      return { ...state, view: "review" };
    case "BACK_TO_FINISH":
      return { ...state, view: "finish" };
    default:
      return state;
  }
};

const ClimatePledgeGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { width, height } = useWindowSize();
  const currentQuestion = QUESTIONS[state.currentQuestionIndex];

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Timer useEffect hook
  useEffect(() => {
    if (state.view === 'game' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && state.view === 'game') {
      dispatch({ type: "FINISH_GAME" });
    }
  }, [timeLeft, state.view]);

  // Handler for verifying the input with Gemini
  const handleVerify = async () => {
    const result = await verifyPledgeWithGemini(state.inputValue);
    dispatch({ type: "SET_SUGGESTION", payload: result });
  };

  const handlePlayAgain = () => {
    dispatch({ type: "RESET_GAME" });
    setTimeLeft(INITIAL_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const progressBarWidth = ((INITIAL_TIME - timeLeft) / INITIAL_TIME) * 100;


  const verifyDisabled = state.isInputEmpty;
  const arrowDisabled = !state.isVerified;

  // The main component render logic
  const renderGameContent = () => {
    switch (state.view) {
      case "intro":
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-[4.44vh] font-bold mb-[2.22vh] mt-[7vh]">Climate Pledge Challenge</h1>
            <p className="text-[2vh] text-gray-600 mb-[5.5vh] -mt-[1.5vh] ">
              Create your personal 5-point climate pledge.
            </p>
            <div className="bg-white rounded-[1.11vh] shadow-md p-[2.66vh] max-w-[44.44vw] mb-[6.66vh]">
              <p className="mb-[2.22vh]">
                You will be asked to make a pledge in <b>5 categories</b>. Your job is to write a clear and specific action plan for each:
              </p>
              <ul className="mb-[2.22vh] text-left list-disc pl-[5.55vh]">
                <li><b>School</b> (an action you can take at school)</li>
                <li><b>Home</b> (a change you can make at home)</li>
                <li><b>Energy</b> (a habit to save energy)</li>
                <li><b>Waste</b> (a habit to reduce waste)</li>
                <li><b>Awareness</b> (an action to raise awareness)</li>
              </ul>
              <p className="mb-[2.22vh]">🎯 <b>Scoring:</b> 1 point per good answer.</p>
              <p className="mb-[2.22vh]">💡 <b>Bonus:</b> Get suggestions from a friendly AI teacher to improve your answers!</p>
            </div>
            <button
              onClick={() => {
                dispatch({ type: "START_GAME" });
                setTimeLeft(INITIAL_TIME);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-[3.4vw] py-[2.8vh] rounded-[1.5vh] text-[2.22vh] font-semibold shadow-lg"
            >
              Start Pledge
            </button>
          </div>
        );

      case "game":
       return (
        <div className="main-container w-[100vw] h-[89vh] bg-[#fffcfd] relative overflow-hidden mx-auto my-0">
          {/* 👇 Mobile screen layout (sm and below) */}
          <div className="flex md:hidden w-full max-w-[400px] gap-[20px] justify-between items-center relative z-[16] mt-[20px] px-4">
            <div className="flex-1 h-[15px] bg-[#d9d9d9] rounded-[4px] relative">
              <div
                className="h-full bg-[rgba(9,190,67,0.8)] rounded-[4px]"
                style={{ width: `${Math.max(0, progressBarWidth)}%` }}
              />
            </div>
            <div className="flex gap-[5px] items-center">
              <div
                className="w-[25px] h-[22px] bg-cover bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/kFwo3bjqx3.png")',
                }}
              />
              <span className="font-['Comic_Sans_MS'] text-lg font-bold leading-[20px] text-[rgba(75,75,75,0.8)] whitespace-nowrap">
                {timerDisplay}
              </span>
            </div>
          </div>

          {/* md and lg screen layout */}
          <div className="hidden md:flex w-[70vw] gap-[2vw] justify-start items-center relative z-[23] mt-[5vh] ml-[18vw]">
            <div className="flex w-[59vw] h-[2.5vh] flex-col justify-start items-start shrink-0 bg-[#d9d9d9] rounded-[4px] relative z-[24]">
              <div
                className="h-[2.5vh] bg-[rgba(9,190,67,0.8)] rounded-[4px] relative z-[25]"
                style={{ width: `${Math.max(0, progressBarWidth)}%` }}
              />
            </div>
            <div className="flex gap-[0.5vw] items-center">
              <div
                className="w-[35px] h-[31px] bg-cover bg-no-repeat relative z-[27]"
                style={{
                  backgroundImage:
                    'url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-24/kFwo3bjqx3.png")',
                }}
              />
              <span className="font-['Comic_Sans_MS'] text-[2.5vh] font-bold leading-[20px] text-[rgba(75,75,75,0.8)] text-center whitespace-nowrap relative z-[28]">
                {timerDisplay}
              </span>
            </div>
          </div>

            {/* Title */}
            <div className="flex w-[33.75vw] flex-col justify-end items-center flex-nowrap relative z-[1] mt-[7vh] mr-0 mb-0 ml-[32.68vw]">
              <span className="flex w-[77vw] md:w-[44.06vw] h-[7vh] md:h-[5.33vh] justify-center items-center shrink-0 font-['Comic_Neue'] text-[3.1vh] leading-[4vh] lg:text-[5vh] font-bold leading-[2.66vh] text-[rgba(75,75,75,0.8)] relative text-center z-[2]">
                Create Your 5-Point Climate Pledge
              </span>
            </div>

            {/* Main Interactive Content */}
            <div className="flex flex-col items-center mx-auto mt-[2.77vh]">
              {/* Question Cloud */}
              <div className="relative w-[480px] md:w-[509.5px] h-[180px] md:h-[195px] z-[8]">
                <div className="w-[110px] md:w-[128px] h-[180px] md:h-[195px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-01/i1E0FUZifq.png)] bg-cover bg-no-repeat rounded-[10px] absolute top-0 left-14 md:left-0 z-[8]" />
                <div className="w-auto h-auto absolute top-[67px] left-[151px] z-[6] md:p-4 flex justify-center items-center min-w-[340px] min-h-[88px] md:min-w-[358.5px] md:min-h-[88px]">
                  <ThinkingCloud className="absolute left-5 md:inset-0 w-[220px] h-[88px] md:w-[359px] md:h-[88px]" />
                  <span className="flex justify-center items-center font-['Comic_Neue'] text-[15px] md:text-[28px] mr-15 md:mr-0 md:bottom-2.5 font-bold text-[#4b4b4b] text-center z-[7] relative p-4">
                    {currentQuestion.question}
                  </span> 
                </div>
              </div>

              {/* Input Box */}
              <div className="w-[75vw] h-[7vh] md:w-[36vw] md:h-[10vh] bg-[#eeeeee] rounded-[1.11vh] border-solid border-2 border-[#ababab] relative z-[11] mt-[4.44vh]">
                <input
                  type="text"
                  value={state.inputValue}
                  onChange={(e) => dispatch({ type: "SET_INPUT_VALUE", payload: e.target.value })}
                  placeholder={currentQuestion.placeholder}
                  className="flex w-full h-full justify-center items-center font-['Comic_Neue'] text-[2vh] md:text-[3.11vh] font-bold leading-[2.66vh] text-[#4b4b4b] placeholder-[#ababab] absolute top-0 left-0 text-center whitespace-nowrap z-[11] bg-transparent outline-none p-[1.11vh]"
                />
              </div>

                {/* Container for the suggestion message to prevent layout shift */}
                <div className="w-full h-[5vh] mt-[2vh] text-center">
                    {state.suggestion && (
                        <span className={`font-['Comic_Neue'] text-[3.11vh] font-normal leading-[2.66vh] text-center whitespace-nowrap
                            ${state.suggestion.startsWith("✅") ? "text-[#09be43]" : "text-[#d64636]"}`}>
                            {state.suggestion}
                        </span>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex w-[45vw] md:w-[21.25vw] h-[6.66vh] justify-around items-center relative z-[22] mt-[2.8vh] mr-0 mb-0 ml-[30vw] md:ml-[39.375vw]">
                <button
                    onClick={handleVerify}
                    disabled={verifyDisabled}
                    className={`flex w-[27vw] md:w-[14vw] gap-[18vw] justify-center items-center shrink-0 flex-nowrap rounded-[1.11vh] relative z-[19] transition-all duration-300
                        ${verifyDisabled ? 'bg-[#cccccc] shadow-[0_2px_10px_0_rgba(204,204,204,0.90)] cursor-not-allowed' : 'bg-[#09be43] shadow-[0_2px_10px_0_rgba(9,190,67,0.9)] hover:bg-green-600'}`}
                >
                    <div className="w-[14vw] h-[6.5vh] md:h-[8vh] shrink-0 rounded-[1.11vh] relative z-20">
                        <span className="flex w-auto md:h-[2.22vh] justify-center items-center font-['Comic_Sans_MS'] text-[2.44vh] font-bold leading-[2.22vh] text-[#fff] absolute top-[1.8vh] md:top-[2.5vh] left-[1.5vw] md:left-[calc(50%-2.125vw)] text-center whitespace-nowrap z-[21]">
                            Verify
                        </span>
                    </div>
                </button>
                <button

                    onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                    disabled={arrowDisabled}
                    className={`flex w-[12vw] md:w-[4.0625vw] h-[6.5vh] md:h-[8vh] gap-[23.43vw] justify-center items-center shrink-0 flex-nowrap bg-contain bg-no-repeat rounded-[1.11vh] relative z-[22] transition-all duration-300 text-2xl text-white
                        ${arrowDisabled ? 'bg-[#cccccc] shadow-[0_2px_10px_0_rgba(204,204,204,0.90)] cursor-not-allowed' : 'bg-[#09be43] shadow-[0_2px_10px_0_rgba(9,190,67,0.90)] hover:bg-green-600'}`}
                    style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}
                >→</button>

            </div>
        </div>
        );


      case "finish":
        return (
          <div className="flex flex-col items-center justify-center min-h-[90vh]">
            {state.score >= 3 && <Confetti width={width} height={height} />}
            <h1 className="text-[4.44vh] font-bold mb-[2.22vh] mt-[17.77vh] text-center">Climate Pledge</h1>
            <p className="text-[2vh] text-gray-600 mb-[6.66vh] text-center">
              You've completed your 5-point pledge.
            </p>
            <div className="flex flex-1 flex-col items-center justify-center w-full px-[0.43vw] pb-[0.43vw]">
              <div className="flex flex-col items-center justify-center mb-[6.66vh]">
                <img
                  src={
                    state.score >= 3
                      ? "https://www.freeiconspng.com/thumbs/trophy-png/gold-trophy-png-2.png"
                      : "https://www.freeiconspng.com/thumbs/unhappy-face-png/unhappy-face-png-2.png"
                  }
                  alt="Result"
                  className="w-[12vw] mx-auto mb-[4.44vh]"
                />
                <div className="text-[5.55vh] font-bold text-green-600 mb-[2.22vh] text-center">
                  {state.score}/{QUESTIONS.length}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-[3.33vh] mt-[4.44vh] w-full">
                <button
                  onClick={handlePlayAgain}
                  className="w-[15vw] h-[6.66vh] rounded-[1.11vh] text-[2vh] font-semibold transition-all bg-[#C9FF9F] border-[0.22vh] border-[rgba(9,190,67,0.65)] shadow-[0_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a] "
                  style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
                >
                  Play Again
                </button>
                <button
                  onClick={() => alert("Continue to next level")}
                  className="w-[15vw] h-[6.66vh] rounded-[1.11vh] text-[2vh] font-semibold transition-all bg-[#09BE43] text-white shadow-[0_2px_5px_0_rgba(9,190,67,0.90)] hover:bg-green-600 "
                  style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
                >
                  Continue
                </button>
                <button
                  onClick={() => dispatch({ type: "REVIEW_ANSWERS" })}
                  className="w-[15vw] h-[6.66vh] rounded-[1.11vh] text-[2vh] font-semibold transition-all bg-[#C9FF9F] border-[0.22vh] border-[rgba(9,190,67,0.65)] shadow-[0_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a]"
                  style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
                >
                  Review Answers
                </button>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="min-h-[90vh] flex flex-col items-center justify-center bg-green-100 py-[3.55vh] px-[1vw] sm:px-[1.5vw] lg:px-[2vw]">
            <div className="w-full max-w-[30vw] sm:max-w-[42vw] md:max-w-[56vw] lg:max-w-[84vw] bg-white rounded-[3.33vh] shadow flex flex-col items-center p-[2.66vh] sm:p-[3.55vh] lg:p-[4.44vh] relative">
              <button
                onClick={() => dispatch({ type: "BACK_TO_FINISH" })}
                className="flex justify-center items-center absolute top-[1.77vh] right-[1vw] z-[139] w-[2.5vw] h-[4.44vh] sm:w-[2.75vw] sm:h-[4.88vh] rounded-full hover:bg-gray-200 transition"
              >
                <span className="font-['Comfortaa'] text-[4vh] sm:text-[4.44vh] text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">+</span>
              </button>
              <h2 className="text-[3.55vh] sm:text-[4.44vh] font-bold text-center w-full" style={{ fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}>Check your answers</h2>
              <p className="mb-[6.66vh] sm:mb-[8.88vh] text-[1.77vh] sm:text-[2.22vh] text-gray-700 text-center w-full" style={{ fontFamily: 'Commissioner, Arial, sans-serif' }}>
                Review your pledge and the suggestions you received.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[0.5vw] sm:gap-[0.75vw] w-full justify-items-center">
                {state.answers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`main-container flex w-full max-w-[21.875vw] sm:max-w-[20vw] h-auto p-[1.77vh] flex-col gap-[1.11vh] justify-start items-start rounded-[1.66vh] relative ${ans.isCorrect ? "bg-[#c8ff9e]" : "bg-[#ffdfe0]"}`}
                  >
                    <div className="flex w-full justify-between items-start relative">
                      <div className="flex flex-col gap-[0.88vh] sm:gap-[1.11vh] items-start flex-1">
                        <span className={`font-['Comic_Neue'] text-[2.22vh] sm:text-[2.77vh] font-bold leading-[2.66vh] relative text-left z-[2] ${ans.isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>
                          {ans.question}
                        </span>
                        <div className="flex flex-col gap-[0.22vh] sm:gap-[0.33vh] items-start w-full">
                          <span className={`font-['Commissioner'] text-[1.55vh] sm:text-[2vh] font-light leading-[2.22vh] sm:leading-[2.66vh] relative text-left z-[4] ${ans.isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>
                            You: {ans.answer}
                          </span>
                          <span className={`font-['Commissioner'] text-[1.55vh] sm:text-[2vh] font-light leading-[2.22vh] sm:leading-[2.66vh] relative text-left z-[5] ${ans.isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"}`}>
                            Suggestion: {ans.suggestion}
                          </span>
                        </div>
                      </div>
                      <div
                        className="w-[1.875vw] h-[3.33vh] sm:w-[2.1875vw] sm:h-[3.88vh] shrink-0 bg-contain bg-no-repeat ml-[0.5vw]"
                        style={{ backgroundImage: ans.isCorrect ? "url(/check.png)" : "url(/cancel.png)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return <>{renderGameContent()}</>;
};

export default ClimatePledgeGame;
