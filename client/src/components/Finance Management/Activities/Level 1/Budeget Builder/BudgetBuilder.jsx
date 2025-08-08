import { useEffect, useState } from "react";
import {
  FaShoePrints,
  FaIceCream,
  FaGift,
  FaMobileAlt,
  FaUserFriends,
  FaFilm,
  FaHamburger,
  FaBook,
  FaWallet,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { useFinance } from "../../../../../contexts/FinanceContext.jsx";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance
import IntroScreen from "./IntroScreen.jsx";
import GameNav from "./GameNav.jsx";
import { useNavigate } from "react-router-dom";

function parsePossiblyStringifiedJSON(text) {
  if (typeof text !== "string") return null;

  // Remove triple backticks and optional "json" after them
  text = text.trim();
  if (text.startsWith("```")) {
    text = text
      .replace(/^```(json)?/, "")
      .replace(/```$/, "")
      .trim();
  }

  // Remove single backticks
  if (text.startsWith("`") && text.endsWith("`")) {
    text = text.slice(1, -1).trim();
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}

const APIKEY = import.meta.env.VITE_API_KEY;

const BudgetBuilder = () => {
  const { completeFinanceChallenge } = useFinance();

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const [showIntro, setShowIntro] = useState(true);

  const initialExpenses = [
    {
      id: "1",
      label: "Save for Shoes",
      cost: 350,
      imgSrc: "/financeGames6to8/level-1/shoes.svg",
      priorityScore: 4,
    },
    {
      id: "2",
      label: "Ice Cream Treat",
      cost: 150,
      imgSrc: "/financeGames6to8/level-1/ice-cream.svg",
      priorityScore: 2,
    },
    {
      id: "3",
      label: "Gift",
      cost: 150,
      imgSrc: "/financeGames6to8/level-1/gift.svg",
      priorityScore: 4,
    },
    {
      id: "4",
      label: "Data Plan",
      cost: 210,
      imgSrc: "/financeGames6to8/level-1/data-plan.svg",
      priorityScore: 4,
    },
    {
      id: "5",
      label: "Lend to a Friend",
      cost: 50,
      imgSrc: "/financeGames6to8/level-1/lend-to-a-friend.svg",
      priorityScore: 3,
    },
    {
      id: "6",
      label: "Weekend Movie",
      cost: 50,
      imgSrc: "/financeGames6to8/level-1/weekend-movie.svg",
      priorityScore: 2,
    },
    {
      id: "7",
      label: "Lunch",
      cost: 50,
      imgSrc: "/financeGames6to8/level-1/lunch.svg",
      priorityScore: 3,
    },
    {
      id: "8",
      label: "Books",
      cost: 50,
      imgSrc: "/financeGames6to8/level-1/books.svg",
      priorityScore: 5,
    },
  ];

  function getSavingsScore(percentageSpent) {
    let savingsScore;

    if (percentageSpent > 90 && percentageSpent <= 100) {
      savingsScore = 1;
    } else if (percentageSpent > 60 && percentageSpent <= 80) {
      savingsScore = 4;
    } else if (percentageSpent >= 50 && percentageSpent <= 60) {
      savingsScore = 7;
    } else if (percentageSpent < 50) {
      savingsScore = 10;
    } else {
      savingsScore = 2; // fallback if needed, e.g. for 81–90%
    }

    return savingsScore;
  }

  const [wallet, setWallet] = useState(1000);
  const [available, setAvailable] = useState(initialExpenses);
  const [spent, setSpent] = useState([]);
  const [feedbackAvatarType, setFeedbackAvatarType] = useState("disappointing");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const navigate = useNavigate(); // ensure `useNavigate()` is defined
  const [heartCount, setHeartCount] = useState(4);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (heartCount === 0) {
      setIsGameOver(true);
    }
  }, [heartCount]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Ignore same list movement
    if (source.droppableId === destination.droppableId) return;

    let movedItem;

    // FROM AVAILABLE TO SPENT
    if (
      source.droppableId === "available" &&
      destination.droppableId === "spent"
    ) {
      movedItem = available[source.index];

      if (wallet < movedItem.cost) {
        toast.error("💸 Not enough money in wallet!");
        return;
      }

      const newAvailable = [...available];
      newAvailable.splice(source.index, 1);

      const newSpent = [...spent];
      newSpent.splice(destination.index, 0, movedItem);

      const newWallet = wallet - movedItem.cost;
      setAvailable(newAvailable);
      setSpent(newSpent);
      setWallet(newWallet);

      // 💔 Deduct a life if priorityScore is 3 or below
      if (movedItem.priorityScore <= 3) {
        setHeartCount((prev) => {
          const updated = Math.max(0, prev - 1);
          if (updated === 0) {
            setIsGameOver(true); // Trigger Game Over
          }
          return updated;
        });
      }

      // 🎯 Show gif for 1 sec, only 3 times
      if (gifCount < 3) {
        setShowGif(true);
        setGifCount((prev) => prev + 1);
        setTimeout(() => setShowGif(false), 3000);
      }
    }

    // FROM SPENT TO AVAILABLE
    else if (
      source.droppableId === "spent" &&
      destination.droppableId === "available"
    ) {
      movedItem = spent[source.index];

      const newSpent = [...spent];
      newSpent.splice(source.index, 1);

      const newAvailable = [...available];
      newAvailable.splice(destination.index, 0, movedItem);

      const refund = wallet + movedItem.cost;
      setSpent(newSpent);
      setAvailable(newAvailable);
      setWallet(refund);

      // 🛑 No heartCount logic here as per your current rule
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");
  const [showGif, setShowGif] = useState(false);
  const [gifCount, setGifCount] = useState(0);

  useEffect(() => {
    if (parseInt(result?.spendingScore?.split("/")[0]) >= 7) {
      setShowVictoryScreen(true);
    }
  }, [showVictoryScreen, result]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // show intro for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <IntroScreen />;
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    const cleanExpenses = initialExpenses.map(
      ({ id, label, cost, priorityScore }) => ({
        id,
        label,
        cost,
        priorityScore,
      })
    );

    const cleanSpent = spent.map(({ id, label, cost, priorityScore }) => ({
      id,
      label,
      cost,
      priorityScore,
    }));

    const totalSpent = spent.reduce((acc, item) => acc + item.cost, 0);
    const percentageSpent = Number(((totalSpent / 1000) * 100).toFixed(0));
    const totalPriorityScore = spent.reduce(
      (acc, item) => acc + item.priorityScore * item.cost,
      0
    );

    const priorityScoreRatio = totalPriorityScore / (5 * totalSpent);
    const savingScore = Number(getSavingsScore(percentageSpent));
    const finalScore = Number(
      (7 * priorityScoreRatio + 0.3 * savingScore).toFixed(1)
    );
    console.log(
      cleanSpent,
      percentageSpent,
      totalPriorityScore,
      priorityScoreRatio,
      savingScore,
      finalScore
    );

    // console.log(finalScore);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Evaluate the user's budget decisions and return feedback. The user is a school student.

Initial wallet: ₹1000
Initial Planned expenses: ${JSON.stringify(cleanExpenses)}
Final spent: ${JSON.stringify(cleanSpent)}
Percentage spent : ${percentageSpent}

### FINAL INSTRUCTION ###
Return ONLY raw JSON (no backticks, no markdown, no explanations).
Example format:
{
  spendingScore: ${finalScore} / 10, ##Here always give marks in the format "marks/10". 
  tip: "Saving is crucial. Consider a higher savings rate in future.",
  categoryToCut: "Movie", ##The categoryToCut, if present, must be one of the spent items only and must be of the lowest priority score among all spent items.
  avatarType : "congratulatory" or "disappointing"
}

The four fields should never be empty. If you find exceptionally well-balanced expenses, you may keep the categoryToCut field as "None - you balanced your expenses really well".
 
Constraints - 
- Do not make any changes int he spending score. Keep the given score as it is.
-Always give marks in the format "marks/10".  
- Tip must suggest something actionable, not vague advice.
- If final spending score <= 6, the tip must be critical.  
- If final spending score > 6, the tip include some praise.
- If final spending score <= 6, avatarType should be "disappointing".
- If final spending score > 6, avatarType should be "congratulatory".
- If you find exceptional budgeting, the categoryToCut must be "None - you managed your expenses really well".`,
                },
              ],
            },
          ],
        }
      );

      const aiReply = response.data.candidates[0].content.parts[0].text;
      console.log(aiReply);
      const parsed = parsePossiblyStringifiedJSON(aiReply);
      console.log(parsed);
      setResult(parsed);
      setFeedbackAvatarType(parsed.avatarType);

      // ✅ For performance
      const scoreNumber = parseInt(parsed.spendingScore?.split("/")[0]);

      const totalTime = (Date.now() - startTime) / 1000;
      const studyTimeMinutes = Math.ceil(totalTime / 60);

      updatePerformance({
        moduleName: "Finance",
        topicName: "budgetExpert",
        score: scoreNumber, // Already scaled out of 10
        accuracy: scoreNumber * 10,
        avgResponseTimeSec: totalTime,
        studyTimeMinutes,
        completed: true,
      });
      setStartTime(Date.now());
      if (!isNaN(scoreNumber) && scoreNumber >= 8) {
        completeFinanceChallenge(0, 0); // mark completed
      }
    } catch (err) {
      setError("Error fetching AI response");
      console.log(err);
    }
    setLoading(false);
  };

  // View Feedback Handler
  const handleViewFeedback = () => {
    setShowFeedback(true);
  };

  // Next Challenge Handler
  const handleNextChallenge = () => {
    navigate("/budget-activity"); // ensure `useNavigate()` is defined
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col justify-between h-screen bg-[#0A160E] text-center">
        {/* Game Over Content */}
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          {/* Game Over GIF */}
          <img
            src="/financeGames6to8/game-over-game.gif"
            alt="Game Over"
            className="w-64 h-auto mb-6"
          />

          {/* Text */}
          <p className="text-yellow-400 lilita-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
            Oops! That was close! Wanna Retry?
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="bg-[#2f3e46] border-t border-gray-700 py-4 px-6 flex justify-center gap-6">
          <img
            src="/financeGames6to8/feedback.svg"
            alt="Feedback"
            onClick={handleViewFeedback}
            className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200"
          />
          <img
            src="/financeGames6to8/retry.svg"
            alt="Retry"
            onClick={() => {
              setWallet(1000);
              setAvailable(initialExpenses);
              setSpent([]);
              setHeartCount(4);
              setIsGameOver(false);
              setShowIntro(false);
            }}
            className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200"
          />
          <img
            src="/financeGames6to8/next-challenge.svg"
            alt="Next Challenge"
            onClick={handleNextChallenge}
            className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <GameNav heartCount={heartCount} />
      <div className="flex flex-col bg-[#0A160E] lg:flex-row justify-center items-start gap-8 lg:gap-6 p-4 sm:p-6 lg:p-8">
        {/* Dark Theme Weekly Budget Builder */}
        <div
          className="w-full bg-[#0A160E] font-sans"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-12 lg:gap-16 px-4 lg:px-8">
              {/* Available Expenses Section */}
              <div className="w-full lg:w-auto">
                <h2 className="text-xl font-semibold text-center text-white mb-4">
                  Available Expenses
                </h2>

                <Droppable droppableId="available">
                  {(provided) => (
                    <div
                      className="bg-[#202F364D] p-6 rounded-xl shadow-lg w-full lg:w-96 min-h-[450px] border border-gray-600"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {available.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={`transition-all duration-200 p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm cursor-grab border ${
                                snapshot.isDragging
                                  ? "border-[#5F8428]"
                                  : "border-gray-600"
                              } bg-[#131F24] hover:bg-[#202F36]`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {/* Left: Coin + Cost (inside bordered box) */}
                              <div
                                className={`flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border ${
                                  snapshot.isDragging
                                    ? "border-[#5F8428]"
                                    : "border-gray-600"
                                }`}
                              >
                                <img
                                  src="/financeGames6to8/coin.svg"
                                  alt="coin"
                                  className="w-5 h-5"
                                />
                                <span className="text-yellow-400 font-bold">
                                  ₹{item.cost}
                                </span>
                              </div>

                              {/* Center: Label */}
                              <div className="text-white font-medium text-sm text-center flex-1">
                                {item.label}
                              </div>

                              {/* Right: Icon Image */}
                              <img
                                src={item.imgSrc}
                                alt={item.label}
                                className="w-6 h-6 flex-shrink-0"
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Spent Expenses */}
              <div className="w-full lg:w-96">
                <h2 className="text-xl font-semibold text-center text-white mb-4">
                  Spend It
                </h2>

                <Droppable droppableId="spent">
                  {(provided) => (
                    <div
                      className="bg-[#0A160E] p-6 rounded-xl shadow-lg w-full min-h-[450px] border border-gray-600"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {spent.length === 0 ? (
                        <div className="text-gray-400 text-center mt-40 text-sm">
                          Drag and drop here from
                          <br />
                          available expenses
                        </div>
                      ) : (
                        spent.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className={`transition-all duration-200 p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm cursor-grab border ${
                                  snapshot.isDragging
                                    ? "border-[#5F8428]"
                                    : "border-[#5F8428]"
                                } bg-[#131F24] hover:bg-[#202F36]`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* Left: Coin + Cost */}
                                <div className="flex items-center gap-1 min-w-[70px] px-2 py-1 rounded-md border border-[#5F8428]">
                                  <img
                                    src="/financeGames6to8/coin.svg"
                                    alt="coin"
                                    className="w-5 h-5"
                                  />
                                  <span className="text-yellow-400 font-bold">
                                    ₹{item.cost}
                                  </span>
                                </div>

                                {/* Center: Label with green color */}
                                <div className="text-[#5F8428] font-medium text-sm text-center flex-1">
                                  {item.label}
                                </div>

                                {/* Right: Icon Image */}
                                <img
                                  src={item.imgSrc}
                                  alt={item.label}
                                  className="w-6 h-6 flex-shrink-0"
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>

          {!showVictoryScreen && result && (
            <div className="mt-10">
              <div className="w-full lg:w-2/3 p-6 mx-auto mt-4 flex items-center justify-center">
                <div className="bg-[#243324] border border-gray-600 p-6 rounded-xl shadow-lg text-center space-y-4">
                  {parseInt(result?.spendingScore?.split("/")[0]) >= 7 ? (
                    // Victory Mode
                    <>
                      <h3 className="text-2xl font-semibold text-green-400">
                        🎉 Challenge Complete!
                      </h3>
                      <p className="text-lg text-gray-300">
                        🎯 Accuracy Score:{" "}
                        <span className="font-bold text-yellow-400">
                          {parseInt(result?.spendingScore?.split("/")[0]) * 10}%
                        </span>
                      </p>
                      <div className="flex justify-center gap-4 pt-4">
                        <button
                          onClick={handleViewFeedback}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                        >
                          🔍 View Feedback
                        </button>
                        <button
                          onClick={handleNextChallenge}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                        >
                          ➡️ Next Challenge
                        </button>
                      </div>
                    </>
                  ) : (
                    // Normal Feedback Mode
                    <>
                      <p className="text-lg font-semibold text-green-400">
                        🎯 Spending Score: {result?.spendingScore}
                      </p>
                      <p className="text-sm text-gray-300">
                        💡 Tip: {result?.tip}
                      </p>
                      <p className="text-sm text-red-400">
                        ✂️ Cut this category: {result?.categoryToCut}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer with Total Wallet and Check Now Button */}
          <div className="relative mt-20 left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#2f3e46] border-t-4 border-[#1a2e1a] shadow-inner py-6 flex items-center justify-center">
            {/* Kid Celebration Gif + Speech Bubble */}
            {showGif && (
              <div className="absolute -top-28 left-[83%] transform -translate-x-1/2 z-50 flex items-start">
                {/* Kid gif */}
                <img
                  src="/financeGames6to8/kid-gif.gif"
                  alt="Kid Celebration"
                  className="w-28 h-28"
                />
                {/* Speech bubble */}
                <img
                  src="/financeGames6to8/kid-saying.svg"
                  alt="Kid Saying"
                  className="absolute top-2 left-24 w-24"
                />
              </div>
            )}

            <div className="w-full max-w-4xl px-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                {/* Wallet Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
                    <img
                      src="/financeGames6to8/coin.svg"
                      alt="Coin"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="text-white">
                    <span className="text-md sm:text-lg font-medium text-yellow-400">
                      Total Wallet:
                    </span>
                    <span className="text-white text-xl font-bold ml-2">
                      ₹{wallet}
                    </span>
                  </div>
                </div>

                {/* Button or Loader */}
                <div>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-t-green-500 border-gray-600 rounded-full animate-spin"></div>
                      <p className="mt-2 text-green-400 text-sm font-medium">
                        Analyzing...
                      </p>
                    </div>
                  ) : (
                    <img
                      src="/financeGames6to8/check-now-btn.svg"
                      alt="Check Now"
                      onClick={handleSubmit}
                      className="cursor-pointer w-[150px] hover:scale-105 transition-transform duration-200"
                    />
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-400 text-center mt-4 font-medium">
                  {error}
                </p>
              )}
            </div>
          </div>

          {showVictoryScreen && (
            <div className="fixed inset-0 z-50 bg-[#0A160E] flex flex-col justify-between">
              {/* Center Content */}
              <div className="flex flex-col items-center justify-center flex-1 p-6">
                {/* Trophy GIFs */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <img
                    src="/financeGames6to8/trophy-rotating.gif"
                    alt="Rotating Trophy"
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="/financeGames6to8/trophy-celebration.gif"
                    alt="Celebration Effects"
                    className="absolute w-full h-full object-contain"
                  />
                </div>

                {/* Challenge Complete Text */}
                <h2 className="text-yellow-400 lilita-one-regular text-3xl sm:text-4xl font-bold mt-6">
                  Challenge Complete!
                </h2>

                {/* Accuracy Box */}
                <div className="mt-6 w-64 bg-[#FFCC00] rounded-xl p-1 flex flex-col items-center">
                  {/* Title - shifted down */}
                  <p className="text-black text-sm font-bold mb-1 mt-2">
                    TOTAL ACCURACY
                  </p>

                  {/* Inner Dark Box - moved closer to title */}
                  <div className="bg-[#131F24] mt-0 w-63 h-16 rounded-xl flex items-center justify-center py-3 px-5">
                    <img
                      src="/financeGames6to8/accImg.svg"
                      alt="Target Icon"
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-yellow-400 text-xl font-extrabold">
                      {parseInt(result?.spendingScore?.split("/")[0]) * 10}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="bg-[#2f3e46] border-t border-gray-700 py-4 px-6 flex justify-center gap-6">
                <img
                  src="/financeGames6to8/feedback.svg"
                  alt="Feedback"
                  onClick={handleViewFeedback}
                  className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200"
                />
                <img
                  src="/financeGames6to8/next-challenge.svg"
                  alt="Next Challenge"
                  onClick={handleNextChallenge}
                  className="cursor-pointer w-44 h-14 object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default BudgetBuilder;
