import React, { useState, useEffect, useMemo, useCallback } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// Placeholder for context functions if you're not setting up actual contexts
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

// Mock useNavigate for demonstration purposes
const useNavigate = () => {
  return (path) => console.log(`Navigating to: ${path || "previous page"}`);
};

// =============================================================================
// Game Data (Centralized)
// =============================================================================
const questions = [
  {
    id: 1,
    scenario:
      "Your school wants to reduce its environmental footprint. Pick 3 items.",
    items: [
      {
        name: "Solar Lights",
        cost: 250,
        imageUrl: "http://googleusercontent.com/file_content/0",
        sustainable: true,
      },
      {
        name: "Compost Bin",
        cost: 150,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/uAt6UTQyzg.png",
        sustainable: true,
      },
      {
        name: "Poster Printout",
        cost: 100,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/AOWFSJn2sB.png",
        sustainable: false,
      },
      {
        name: "Packaged water",
        cost: 100,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/WpoO0ju8bf.png",
        sustainable: false,
      },
      {
        name: "Plastic Dustbin",
        cost: 100,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/acqPZ0ZkQr.png",
        sustainable: false,
      },
      {
        name: "Cloth Banner",
        cost: 150,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/HjLNQqsr1Y.png",
        sustainable: true,
      },
    ],
  },
  {
    id: 2,
    scenario: "Design a 'green corner' for your classroom.",
    items: [
      {
        name: "Indoor plant set",
        cost: 150,
        imageUrl:
          "https://img.freepik.com/free-photo/arrangement-plants-pots-indoors_23-2149021200.jpg",
        sustainable: true,
      },
      {
        name: "Educational eco-posters",
        cost: 100,
        imageUrl:
          "https://img.freepik.com/free-vector/save-world-ecology-poster_1308-41221.jpg",
        sustainable: true,
      },
      {
        name: "Plastic plant holders",
        cost: 100,
        imageUrl: "https://img.freepik.com/free-photo/plant-pot_1203-8107.jpg",
        sustainable: false,
      },
      {
        name: "LED study lamp",
        cost: 250,
        imageUrl:
          "https://img.freepik.com/free-photo/desk-lamp-still-life_23-2150993540.jpg",
        sustainable: true,
      },
      {
        name: "Disposable cups",
        cost: 100,
        imageUrl:
          "https://img.freepik.com/free-photo/pile-plastic-cups_23-2148564070.jpg",
        sustainable: false,
      },
    ],
  },
  {
    id: 3,
    scenario: "Reduce waste at your school canteen.",
    items: [
      {
        name: "Steel utensils",
        cost: 200,
        imageUrl:
          "https://img.freepik.com/free-photo/cutlery-set_144627-24847.jpg",
        sustainable: true,
      },
      {
        name: "Paper straws",
        cost: 100,
        imageUrl:
          "https://img.freepik.com/free-photo/pile-paper-straws_23-2148762589.jpg",
        sustainable: true,
      },
      {
        name: "Plastic cutlery",
        cost: 100,
        imageUrl:
          "https://img.freepik.com/free-photo/plastic-cutlery-box_23-2148564071.jpg",
        sustainable: false,
      },
      {
        name: "Compost bin",
        cost: 150,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/uAt6UTQyzg.png",
        sustainable: true,
      },
      {
        name: "Promotional balloons",
        cost: 100,
        imageUrl:
          "https://img.freepik.com/free-photo/colorful-balloons-wall_23-2147775537.jpg",
        sustainable: false,
      },
    ],
  },
];

const initialBudget = 500;
const timeLimit = 180; // 3 minutes in seconds

// =============================================================================
// Components (Nested within the main file)
// =============================================================================

function Header({ scenario, timeRemaining, progressBarWidth }) {
  return (
    <div className="w-full max-w-4xl text-center px-4 pt-[7vh]">
      <span className="font-['Comic_Neue'] text-10 md:text-[26px] font-bold text-[rgba(75,75,75,0.8)] leading-[1.2] block mb-3">
        {scenario}
      </span>
      <div className="flex items-center justify-center gap-[4vw] md:gap-[36px] w-full max-w-[65vw] mx-auto">
        <div className="flex items-center justify-center shrink-0 w-[70px] md:w-[90px]">
          <img
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/AWHLELzyH6.png"
            alt="timer icon"
            className="w-[28px] h-[24px] md:w-[32px] md:h-[28px] mr-2"
          />
          <span className="font-['Comic_Sans_MS'] text-[18px] md:text-[22px] font-bold leading-[20px] text-[rgba(75,75,75,0.8)]">
            {timeRemaining}
          </span>
        </div>
        <div className="flex-1 h-[16px] md:h-[20px] bg-[#d9d9d9] rounded-[4px] relative overflow-hidden max-w-[65vw]">
          <div
            className="h-full bg-[rgba(9,190,67,0.8)] rounded-[4px] transition-all duration-1000 ease-linear"
            style={{ width: `${progressBarWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function BalanceDisplay({ balance }) {
  return (
    <div className="text-center mt-[5vh] md:mt-[7vh] mb-[4vh] md:mb-[8vh] mx-auto">
      <span className="font-['Comfortaa'] text-[40px] md:text-[60px] font-bold leading-[1] text-[#05df72] tracking-[2.8px] block">
        Rs {balance}
      </span>
      <span className="font-['Comic_Neue'] text-[12px] md:text-[16px] font-bold leading-[20px] text-[rgba(75,75,75,0.77)] block ">
        Remaining Balance
      </span>
    </div>
  );
}

function ItemCard({ item, isSelected, onClick, isDisabled }) {
  const cardClasses = `
    flex flex-col items-center p-[8px] sm:p-[10px] md:p-[12px] bg-white rounded-[12px] border border-[rgba(75,75,75,0.8)] shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] cursor-pointer
    transition-all duration-200 ease-in-out
    w-[110px] h-[145px] sm:w-[130px] sm:h-[165px] md:w-[150px] md:h-[195px] shrink-0
    ${isSelected ? "border-blue-500 ring-2 ring-blue-500 shadow-lg" : ""}
    ${
      isDisabled && !isSelected
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : ""
    }
    ${!isDisabled && !isSelected ? "hover:scale-105 hover:shadow-xl" : ""}
  `;

  const imageClasses = `
    w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-[8px] mb-[4px] md:mb-[6px] object-cover border border-gray-200
  `;

  const nameClasses = `
    block font-['Comic_Neue'] text-[13px] sm:text-[14px] md:text-[16px] font-bold leading-[1.1] text-[rgba(75,75,75,0.95)] whitespace-nowrap overflow-hidden text-ellipsis
  `;

  const costClasses = `
    block font-['Comic_Neue'] text-[14px] sm:text-[16px] md:text-[18px] font-bold leading-[1.1] text-[#4b4b4b] whitespace-nowrap
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <img src={item.imageUrl} alt={item.name} className={imageClasses} />
      <div className="text-center w-full px-1">
        <span className={nameClasses}>{item.name}</span>
        <span className={costClasses}>Rs {item.cost}</span>
      </div>
    </div>
  );
}

function ContinueButton({ onClick, isEnabled, isLastQuestion }) {
  const buttonClasses = `
    w-[18vw] h-[6vh] md:w-[20vw] md:h-[8vh] bg-[#09be43] rounded-[8px] shadow-[0_2px_8px_0_rgba(9,190,67,0.9)]
    flex justify-center items-center
    font-['Comic_Sans_MS'] text-[15px] md:text-[17px] font-bold leading-[20px] text-[#fff]
    transition-all duration-200 ease-in-out
    ${
      isEnabled
        ? "hover:bg-green-700 hover:shadow-xl cursor-pointer"
        : "opacity-60 cursor-not-allowed"
    }
  `;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={!isEnabled}>
      {isLastQuestion ? "Submit" : "Continue"}
    </button>
  );
}

function IntroScreen({ onStartGame }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center font-['Comic_Neue'] min-h-[89vh]">
      <h1 className="text-4xl font-bold mb-2 mt-8">Green Budget Challenge</h1>
      <p className="text-lg text-gray-600 mb-6">
        Test your eco-friendly budget skills!
      </p>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mb-6">
        <p className="mb-2">
          You have <b>₹500</b> and <b>3 minutes</b> for each scenario!
        </p>
        <p className="mb-2">
          Select <b>3 items</b> that best support sustainability in school.
        </p>
        <p className="mb-2">
          🎯 <b>Scoring:</b>
        </p>
        <ul className="mb-2 text-left list-disc pl-5">
          <li>
            <span className="font-bold text-green-600">+5</span> = All 3
            eco-wise
          </li>
          <li>
            <span className="font-bold text-yellow-600">+2</span> = 2
            sustainable
          </li>
          <li>
            <span className="font-bold text-red-600">0</span> = Mostly
            unsustainable
          </li>
        </ul>
        <p className="mb-2">
          🕐 <b>Time Limit:</b> 3 minutes per scenario
        </p>
      </div>
      <button
        onClick={onStartGame}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-xl font-semibold shadow-lg transition-colors duration-200"
      >
        Play Now
      </button>
    </div>
  );
}

function EndScreen({
  totalScore,
  totalPossibleScore,
  onPlayAgain,
  onReviewAnswers,
  onContinue,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 text-center font-['Comic_Neue']">
      <h1 className="text-4xl font-bold mb-2 mt-16 text-center">Game Over!</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Your choices matter!
      </p>
      <div className="flex flex-1 flex-col items-center justify-center w-full px-7 pb-7">
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/blogDesign/kidsImage.svg"
            alt="Kids reading blog"
            className="w-48 mx-auto mb-4"
          />
          <div className="text-5xl font-bold text-green-600 mb-2 text-center">
            {totalScore}/{totalPossibleScore}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 w-full">
          <button
            onClick={onPlayAgain}
            className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a] "
            style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}
          >
            Play Again
          </button>
          <button
            onClick={onContinue}
            className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#09BE43] text-white shadow-[0px_2px_5px_0px_rgba(9,190,67,0.90)] hover:bg-green-600 "
            style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}
          >
            Continue
          </button>
          <button
            onClick={onReviewAnswers}
            className="w-60 h-[60px] rounded-[10px] text-lg font-semibold transition-all bg-[#C9FF9F] border-2 border-[rgba(9,190,67,0.65)] shadow-[0px_2px_0px_0px_rgba(9,190,67,0.65)] text-[#4B4B4B] hover:bg-[#b2f47a]"
            style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}
          >
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({ answers, onBackToResults }) {
  return (
    <div className="min-h-[89vh] bg-[#e6ffe6] flex flex-col items-center justify-center min-w-screen">
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col items-center p-6 sm:p-8 lg:p-10 relative">
        <button
          onClick={onBackToResults}
          className="flex justify-center items-center absolute top-4 right-4 z-[139] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-full hover:bg-gray-200 transition"
        >
          <span className="font-['Comfortaa'] text-[36px] sm:text-[40px]  text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">
            +
          </span>
        </button>
        <h2
          className="text-3xl sm:text-4xl font-bold text-center w-full"
          style={{ fontFamily: "Comic Neue, Comic Sans MS, cursive" }}
        >
          Check your answers
        </h2>
        <p
          className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-700 text-center w-full"
          style={{ fontFamily: "Commissioner, Arial, sans-serif" }}
        >
          See how you did in each scenario!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-evenly justify-items-center ">
          {answers.map((ans, idx) => {
            const isPassingScore = ans.scoreAwarded > 0;
            const cardBgColor = isPassingScore
              ? "bg-[#c8ff9e]"
              : "bg-[#ffdfe0]";

            return (
              <div
                key={idx}
                className={`main-container flex w-full max-w-[280px] sm:max-w-[250px] h-[200px] sm:h-[220px] md:h-[250px] p-4 flex-col gap-[8px] justify-start items-start rounded-[15px] relative ${cardBgColor}`}
              >
                <div className="flex w-full justify-between items-start relative h-full">
                  <div className="flex flex-col gap-[5px] items-start flex-1 overflow-hidden">
                    <span
                      className={`font-['Comic_Neue'] text-lg sm:text-[18px] font-bold leading-[1.2] relative text-left z-[2] ${
                        isPassingScore ? "text-[#09be43]" : "text-[#ea2b2b]"
                      } whitespace-normal mb-1`}
                    >
                      {ans.scenario}
                    </span>
                    <div className="flex flex-col gap-[2px] items-start w-full mb-2">
                      <span
                        className={`font-['Commissioner'] text-sm sm:text-[14px] font-light leading-[1.2] relative text-left whitespace-normal z-[4] ${
                          isPassingScore ? "text-[#09be43]" : "text-[#ea2b2b]"
                        }`}
                      >
                        Your Selection:{" "}
                        {ans.selectedItems.map((item) => item.name).join(", ")}
                      </span>
                    </div>
                    <span
                      className={`font-['Commissioner'] text-sm sm:text-[14px] font-light leading-[1.2] relative text-left whitespace-normal z-[5] ${
                        isPassingScore ? "text-[#09be43]" : "text-[#ea2b2b]"
                      }`}
                    >
                      Feedback: {ans.feedbackMessage}
                    </span>
                  </div>
                  <div
                    className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] shrink-0 bg-contain bg-no-repeat ml-2"
                    style={{
                      backgroundImage: isPassingScore
                        ? "url(/check.png)"
                        : "url(/cancel.png)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={onBackToResults}
          className="bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg font-['Comic_Sans_MS'] text-lg md:text-xl mt-8"
        >
          Back to Results
        </button>
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
  const { width, height } = useWindowSize();

  const navigate = useNavigate();

  const [step, setStep] = useState("intro"); // intro, playing, end, review
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(initialBudget);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [totalScore, setTotalScore] = useState(0);
  const [warning, setWarning] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [scenarioResults, setScenarioResults] = useState([]);

  // Memoize current question for easier access
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [currentQuestionIndex]
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedItems([]);
      setRemainingBalance(initialBudget);
      setTimeRemaining(timeLimit); // Reset timer for new question
    } else {
      setStep("end"); // Game ends
    }
  }, [currentQuestionIndex, questions.length]);
  //for performance
  const { updatePerformance } = usePerformance();

  // handleSubmit is defined BEFORE the useEffect that calls it.
  const handleSubmit = useCallback(() => {
    // Only enforce 3 items if not auto-submitting due to timer expiring
    if (selectedItems.length !== 3 && timeRemaining !== 0) {
      showWarning("Please select exactly 3 items.");
      return;
    }

    let sustainableCount = 0;
    selectedItems.forEach((item) => {
      if (item.sustainable) {
        sustainableCount++;
      }
    });

    let scoreAwarded = 0;
    let feedbackMessage = "";

    if (sustainableCount === 3) {
      scoreAwarded = 5;
      feedbackMessage = "Perfect eco-wise picks! Well done.";
    } else if (sustainableCount === 2) {
      scoreAwarded = 2;
      feedbackMessage = "Good attempt, one item could be more sustainable.";
    } else {
      scoreAwarded = 0;
      feedbackMessage = "Oops! Try to pick more sustainable items next time.";
    }

    setTotalScore((prevScore) => prevScore + scoreAwarded);

    // Store the result for the review screen
    setScenarioResults((prevResults) => [
      ...prevResults,
      {
        scenario: currentQuestion.scenario,
        selectedItems: selectedItems,
        scoreAwarded: scoreAwarded,
        feedbackMessage: feedbackMessage,
      },
    ]);

    handleNextQuestion();
  }, [selectedItems, timeRemaining, handleNextQuestion, currentQuestion]);

  // Effect for performance tracking on game end
  useEffect(() => {
    if (step === "end") {
      const endTime = Date.now();
      const totalTimeSec = Math.floor((endTime - startTime) / 1000);
      const avgResponseTimeSec = totalTimeSec / questions.length;
      const scaledScore = Number(
        ((totalScore / (questions.length * 5)) * 10).toFixed(2)
      );

      updateEnvirnomentPerformance({
        moduleName: "Environment",
        topicName: "greenBudget",
        score: scaledScore,
        accuracy: (totalScore / (questions.length * 5)) * 100,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(totalTimeSec / 60),
        completed: totalScore >= questions.length * 5 * 0.8,
      });
      setStartTime(Date.now());

      if (totalScore >= 12) {
        completeEnvirnomentChallenge(1, 0);
      }
    }
  }, [
    step,
    totalScore,
    questions.length,
    startTime,
    completeEnvirnomentChallenge,
    updateEnvirnomentPerformance,
  ]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (step === "playing" && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (step === "playing" && timeRemaining === 0) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, step, handleSubmit]);

  const startGame = () => {
    setStep("playing");
    setCurrentQuestionIndex(0);
    setSelectedItems([]);
    setRemainingBalance(initialBudget);
    setTimeRemaining(timeLimit);
    setTotalScore(0);
    setWarning("");
    setStartTime(Date.now());
    setScenarioResults([]);
  };

  const toggleItem = (item) => {
    const isSelected = selectedItems.some(
      (selected) => selected.name === item.name
    );
    let newSelectedItems;

    if (isSelected) {
      newSelectedItems = selectedItems.filter(
        (selected) => selected.name !== item.name
      );
      setRemainingBalance((prevBalance) => prevBalance + item.cost);
    } else {
      if (selectedItems.length >= 3) {
        showWarning("You can only select 3 items!");
        return;
      }
      if (remainingBalance < item.cost) {
        showWarning("Not enough balance for this item!");
        return;
      }
      newSelectedItems = [...selectedItems, item];
      setRemainingBalance((prevBalance) => prevBalance - item.cost);
    }
    setSelectedItems(newSelectedItems);
    setWarning("");
  };

  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(""), 1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressBarWidth = ((timeLimit - timeRemaining) / timeLimit) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Handlers for EndScreen buttons
  const handlePlayAgain = () => startGame();
  const handleReviewAnswers = () => setStep("review");
  const handleBackToResults = () => setStep("end");
  const handleContinue = () => navigate(-1);

  return (
    <div className="main-container w-full min-h-[89vh] flex flex-col items-center relative font-['Comic_Neue'] ">
      {step === "intro" && <IntroScreen onStartGame={startGame} />}

      {step === "playing" && currentQuestion && (
        <>
          <Header
            scenario={currentQuestion.scenario}
            timeRemaining={formatTime(timeRemaining)}
            progressBarWidth={progressBarWidth}
          />
          <BalanceDisplay balance={remainingBalance} />
          {warning && (
            <p className="text-red-600 font-semibold text-xl mt-4 animate-bounce">
              {warning}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-[12px] sm:gap-[18px]  max-w-[1200px] w-full px-4">
            {currentQuestion.items.map((item) => (
              <ItemCard
                key={item.name}
                item={item}
                isSelected={selectedItems.some(
                  (selected) => selected.name === item.name
                )}
                onClick={() => toggleItem(item)}
                isDisabled={
                  (selectedItems.length >= 3 &&
                    !selectedItems.some(
                      (selected) => selected.name === item.name
                    )) ||
                  (remainingBalance < item.cost &&
                    !selectedItems.some(
                      (selected) => selected.name === item.name
                    ))
                }
              />
            ))}
          </div>
          <div className="mt-[30px] md:mt-[5vh] mx-auto w-full max-w-[200px] flex justify-center">
            <ContinueButton
              onClick={handleSubmit}
              isEnabled={selectedItems.length === 3}
              isLastQuestion={isLastQuestion}
            />
          </div>
        </>
      )}

      {step === "end" && (
        <>
          <EndScreen
            totalScore={totalScore}
            totalPossibleScore={questions.length * 5}
            onPlayAgain={handlePlayAgain}
            onReviewAnswers={handleReviewAnswers}
            onContinue={handleContinue}
          />
        </>
      )}

      {step === "review" && (
        <>
          <ReviewScreen
            answers={scenarioResults}
            onBackToResults={handleBackToResults}
          />
          <button
            onClick={() => {
              setStep("intro");
              setStartTime(Date.now());
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
