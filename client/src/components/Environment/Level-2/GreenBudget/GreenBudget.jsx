import React, { useState, useEffect, useMemo, useCallback } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import GameNav from "./GameNav";
import Checknow from "@/components/icon/GreenBudget/Checknow";
import ThinkingCloud from "@/components/icon/ThinkingCloud";
import IntroScreen from "./IntroScreen";
import InstructionsScreen from "./InstructionsScreen";

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
      "Your school wants to reduce its environment footprint. Pick 3 items.",
    items: [
      {
        name: "Solar lights",
        cost: 250, // Updated cost to match image
        imageUrl: "http://googleusercontent.com/file_content/0",
        sustainable: true,
      },
      {
        name: "Compost bins",
        cost: 150,
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/uAt6UTQyzg.png",
        sustainable: true,
      },
      {
        name: "Poster printout",
        cost: 100, // Updated cost to match image
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/AOWFSJn2sB.png",
        sustainable: false,
      },
      {
        name: "Packaged water",
        cost: 100, // Updated cost to match image
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/WpoO0ju8bf.png",
        sustainable: false,
      },
      {
        name: "Plastic Dustin",
        cost: 100, // Updated cost to match image
        imageUrl:
          "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-30/acqPZ0ZkQr.png",
        sustainable: false,
      },
      {
        name: "Cloth Banner",
        cost: 150, // Updated cost to match image
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

const initialBudget = 500; // Set initial budget to match image
const itemsToSelect = 3;

// =============================================================================
// Components (Nested within the main file)
// =============================================================================

function ItemCard({ item, isSelected, onClick, isDisabled }) {
  const cardClasses = `
    flex items-center w-[27vw] min-h-[9vh] px-[2vw] py-[1.5vh] rounded-[1.2vh]
    shadow-[0_2px_0_0_#37464f] transition-all duration-200 ease-in-out cursor-pointer
    ${
      isSelected
        ? "bg-[#202f36] border-[0.2vh] border-[#5f8428] shadow-[0_2px_0_0_#5f8428]"
        : "bg-[#131f24] border-[0.2vh] border-[#37464f]"
    }
    ${
      isDisabled && !isSelected
        ? "opacity-50 cursor-not-allowed"
        : "hover:scale-102"
    }
  `;

  const walletIconUrl = isSelected
    ? "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/tuvaKMgcsm.png"
    : "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/CGOQJaAXZU.png";

  const nameClasses = `
    font-['Inter'] text-[1.5vw] font-medium leading-[2.5vh]
    ${isSelected ? "text-[#79b933]" : "text-[#f1f7fb]"}
  `;
  const costClasses = `
    font-['Lilita_One'] text-[1.5vw] font-normal leading-[2.5vh] text-[#fff]
  `;
  const iconClasses = `
    w-[2.5vw] h-[2.5vw] shrink-0 object-contain ml-auto
  `;
  const priceContainerClasses = `
    flex w-[7vw] h-[4vh] justify-center items-center rounded-[0.8vh]
    ${
      isSelected
        ? "border-[0.2vh] border-[#79b933]"
        : "border-[0.2vh] border-[#37464f]"
    }
  `;
  const priceIconClasses = `
    w-[2.5vh] h-[2.5vh] shrink-0 object-contain
  `;

  // Helper function to get the correct icon for each item
  const getImage = (name) => {
    switch (name) {
      case "Solar lights":
        return "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/TrE3SVwwWd.png";
      case "Compost bins":
        return "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/NdXeMN6B8A.png";
      case "Poster printout":
        return "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/rvehUNdiKg.png";
      case "Packaged water":
        return "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/1phgSieVqr.png";
      case "Plastic Dustin":
        return "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/QJ8VpDtcVu.png";
      case "Cloth Banner":
        return "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-04/8qgVqGSWTH.png";
      default:
        return item.imageUrl;
    }
  };

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className={priceContainerClasses}>
        <img
          src={walletIconUrl}
          alt="wallet icon"
          className={priceIconClasses}
        />
        <span className={costClasses}>₹{item.cost}</span>
      </div>
      <div className="flex-1 px-[1vw]">
        <span className={nameClasses}>{item.name}</span>
      </div>
      <img src={getImage(item.name)} alt={item.name} className={iconClasses} />
    </div>
  );
}

// New GIF component to show feedback
function FeedbackGIF({ message, scoreAwarded }) {
  return (
    <div className="absolute -right-[9vw] -bottom-[8vh] flex items-end">
            {/* Character Image/GIF */}
           {" "}
      <img
        src="/feedbackcharacter.gif"
        alt="Character talking"
        className="w-[10vw] h-[15vh] object-contain"
      />
            {/* Thinking Cloud and Message */}     {" "}
      <div className="absolute left-[8vw] bottom-[6vh]">
                <ThinkingCloud width="11vw" />     {" "}
      </div>
           {" "}
      <p className="absolute bottom-[11vh] left-[8.8vw] w-full text-[0.7vw] text-white text-center font-['Comic_Neue'] ">
                {message}     {" "}
      </p>
         {" "}
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
          <span className="font-['Comfortaa'] text-[36px] sm:text-[40px]  text-[#6f6f6f] rotate-[-45deg] font-semibold select-none">
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
  const [introStep, setIntroStep] = useState("first"); // Add this state: 'first' or 'instructions'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(initialBudget);
  const [totalScore, setTotalScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [scoreAwarded, setScoreAwarded] = useState(0);
  const [scenarioResults, setScenarioResults] = useState([]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [currentQuestionIndex]
  );

  const handleShowInstructions = () => {
    setIntroStep("instructions");
  };

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

    let sustainableCount = selectedItems.filter(
      (item) => item.sustainable
    ).length;
    let newScore = 0;
    let message = "";

    if (sustainableCount === itemsToSelect) {
      newScore = 5;
      message = "Good going";
    } else if (sustainableCount === 2) {
      newScore = 2;
      message = "Good attempt, can do better";
    } else {
      newScore = 0;
      message = "try harder next time";
    }

    setTotalScore((prevScore) => prevScore + newScore);
    setScoreAwarded(newScore);
    setFeedbackMessage(message);
    setShowFeedback(true);

    setScenarioResults((prevResults) => [
      ...prevResults,
      {
        scenario: currentQuestion.scenario,
        selectedItems: selectedItems,
        scoreAwarded: newScore,
        feedbackMessage: message,
      },
    ]);
  }, [selectedItems, currentQuestion]);

  const startGame = () => {
    setStep("playing");
    setIntroStep("first"); // Reset for future plays
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
      if (selectedItems.length >= itemsToSelect) {
        return;
      }
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
  const handleContinue = () => navigate(-1);

  const totalPossibleScore = questions.length * 5;

  const buttonText = showFeedback ? "Continue" : "Check Now";
  const isButtonEnabled =
    showFeedback || selectedItems.length === itemsToSelect;

  return (
    <div>
      {/* Conditional rendering for the intro pages */}
      {step === "intro" && introStep === "first" && (
        <IntroScreen onShowInstructions={handleShowInstructions} />
      )}
      {step === "intro" && introStep === "instructions" && (
        <InstructionsScreen onStartGame={startGame} />
      )}

      {/* The main game container will only render when the step is not "intro" */}
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
                      isSelected={selectedItems.some(
                        (selected) => selected.name === item.name
                      )}
                      onClick={() => toggleItem(item)}
                      isDisabled={
                        (selectedItems.length >= itemsToSelect &&
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
                <div className="relative flex flex-col w-[29vw] h-[68vh] p-[4vh] bg-[rgba(32,47,54,0.3)] rounded-[1.2vh] justify-center items-center text-white">
                  <span className="font-['Inter'] text-[1.4vw] font-medium leading-[3vh] text-center max-w-[30vw]">
                    {currentQuestion.scenario}
                  </span>
                  {showFeedback && (
                    <FeedbackGIF
                      message={feedbackMessage}
                      scoreAwarded={scoreAwarded}
                    />
                  )}
                </div>
              </div>

              <div className="w-full h-[10vh] bg-[#28343A] flex justify-evenly items-center px-[5vw] z-10">
                <div className="flex items-center gap-[1vw]">
                  <div className="w-[7vh] h-[7vh] rounded-full bg-[#232e34] border-[0.2vh] border-white flex justify-center items-center">
                    <img
                      src="Coin_gold.png"
                      alt="wallet"
                      className="w-[5vh] h-[5vh]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="lilita text-[2.5vh] text-[#ffcc00] [text-stroke:1px_black] tracking-[0.05vw]">
                      Total Wallet:
                    </span>
                    <span className="lilita text-[2.5vh] text-white">
                      ₹{remainingBalance}
                    </span>
                  </div>
                </div>

                <div className="w-[12vw] h-[8vh]">
                  <button
                    className="relative w-full h-full cursor-pointer"
                    onClick={showFeedback ? handleNextQuestion : handleSubmit}
                    disabled={!isButtonEnabled}
                  >
                    <Checknow
                      topGradientColor="#09be43"
                      bottomGradientColor="#068F36"
                      width="100%"
                      height="100%"
                    />
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
              <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
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
                  setIntroStep("first"); // Reset to the very beginning
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Play Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
