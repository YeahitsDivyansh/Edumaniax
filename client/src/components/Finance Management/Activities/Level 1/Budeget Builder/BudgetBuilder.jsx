import { useEffect, useRef, useState } from "react";
import {
  FaWallet,
  FaFilm,
  FaHamburger,
  FaGift,
  FaBook,
  FaPiggyBank,
  FaShoePrints,
  FaQuestionCircle,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Avatar from "./Avatar.jsx";
import SurpriseAvatar from "./SurpriseAvatar.jsx";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useFinance } from "../../../../../contexts/FinanceContext.jsx";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance


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

  const initialExpenses = [
    {
      id: "1",
      label: "Weekend Movie",
      cost: 200,
      icon: <FaFilm />,
      priorityScore: 2,
    },
    {
      id: "2",
      label: "Data Plan",
      cost: 210,
      icon: <FaPiggyBank />,
      priorityScore: 4,
    },
    {
      id: "3",
      label: "Lunch",
      cost: 125,
      icon: <FaHamburger />,
      priorityScore: 3,
    },
    {
      id: "4",
      label: "Save for Shoes",
      cost: 350,
      icon: <FaShoePrints />,
      priorityScore: 4,
    },
    { id: "5", label: "Books", cost: 200, icon: <FaBook />, priorityScore: 5 },
    { id: "6", label: "Gift", cost: 150, icon: <FaGift />, priorityScore: 4 },
  ];

  const [surpriseExpenses, setSurpriseExpenses] = useState([
    {
      id: "s1",
      label: "Car Repair",
      cost: 250,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 5,
    },
    {
      id: "s2",
      label: "Medical Bill",
      cost: 180,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 5,
    },
    {
      id: "s3",
      label: "Midnight Cravings",
      cost: 120,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 1,
    },
    {
      id: "s4",
      label: "Ice Cream Treat",
      cost: 80,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 1,
    },
    {
      id: "s5",
      label: "Stationery",
      cost: 60,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 5,
    },
    {
      id: "s6",
      label: "Lend to a friend",
      cost: 50,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 3,
    },
    {
      id: "s7",
      label: "Split an Unexpected Bill",
      cost: 200,
      icon: <FaQuestionCircle />,
      shown: false,
      priorityScore: 2,
    },
  ]);

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
  const [showSurpriseAvatar, setShowSurpriseAvatar] = useState(false);
  const surpriseCount = useRef(0);

  const addSurpriseExpense = (currentWallet) => {
    if (surpriseCount.current >= 2) {
      return;
    }

    let index;

    index = Math.floor(Math.random() * surpriseExpenses.length);
    let trial = 0;

    while (
      surpriseExpenses[index].cost > currentWallet ||
      surpriseExpenses[index].shown
    ) {
      if (trial > 5) {
        return;
      }
      trial++;
      index = Math.floor(Math.random() * surpriseExpenses.length);
    }

    setSurpriseExpenses((prev) => {
      return surpriseExpenses.map((item, idx) => {
        if (idx === index) {
          return { ...item, shown: true };
        }
        return item;
      });
    });

    const surpriseItem = surpriseExpenses[index];

    console.log("Surprise expenses", surpriseExpenses);
    console.log("Surprise item", surpriseItem);

    toast.info(
      `💥 Surprise Expense Added : ${surpriseItem.label} : ₹${surpriseItem.cost}`
    );

    setSpent((prev) => [...prev, surpriseItem]);
    setShowSurpriseAvatar(true);
    setTimeout(() => {
      setShowSurpriseAvatar(false);
    }, 3000);
    setWallet((prev) => prev - surpriseItem.cost);
    surpriseCount.current += 1;
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result, source, destination);

    if (!destination) return;

    // Moving within same list - do nothing for now
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

      setAvailable(newAvailable);
      setSpent(newSpent);
      const newWallet = wallet - movedItem.cost;
      setWallet(newWallet);

      if (Math.random() > 0.3) {
        addSurpriseExpense(newWallet);
      }
    }

    // FROM SPENT TO AVAILABLE
    else {
      movedItem = spent[source.index];

      const newSpent = [...spent];
      newSpent.splice(source.index, 1);

      const newAvailable = [...available];
      newAvailable.splice(destination.index, 0, movedItem);

      setSpent(newSpent);
      setAvailable(newAvailable);
      const refund = wallet + movedItem.cost;
      setWallet(refund);

      if (Math.random() > 0.3) {
        addSurpriseExpense(refund);
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");

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
        completeFinanceChallenge(0, 0);// mark completed 
      }
    } catch (err) {
      setError("Error fetching AI response");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-6 p-4 sm:p-6 lg:p-8">
      {/* 🎮 Weekly Budget Builder */}
      <div
        className="w-full lg:w-3/5 bg-gradient-to-b from-sky-200 to-blue-100 rounded-3xl p-6 font-sans shadow-xl border-4 border-yellow-300"
        style={{ fontFamily: "'Comic Neue', cursive" }}
      >
        <div
          className={`text-center text-4xl sm:text-5xl font-bold mb-8 text-pink-600 drop-shadow-sm`}
        >
          🎯 Weekly Budget Builder!
        </div>

        <div className="flex justify-center items-center text-2xl sm:text-3xl mb-8 text-green-700 font-bold animate-bounce">
          💰 Wallet <FaWallet className="ml-3 mr-2" /> ₹{wallet}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col md:flex-row justify-center md:space-x-14 space-y-8 md:space-y-0">
            {/* Available Expenses */}
            <Droppable droppableId="available">
              {(provided) => (
                <div
                  className="bg-white p-5 rounded-3xl shadow-lg w-full md:w-80 min-h-[300px] border-4 border-blue-300"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-2xl font-bold text-center text-blue-600 mb-3">
                    🛍️ Available Expenses
                  </h2>
                  {available.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-blue-100 hover:bg-blue-300 transition-all duration-300 p-3 m-2 rounded-xl flex justify-between items-center shadow-sm cursor-grab"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span className="text-lg flex items-center gap-2">
                            {item.icon} {item.label}
                          </span>
                          <span className="text-sm font-bold">
                            ₹{item.cost}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Spent Expenses */}
            <Droppable droppableId="spent">
              {(provided) => (
                <div
                  className="bg-white p-5 rounded-3xl shadow-lg w-full md:w-80 min-h-[300px] border-4 border-red-300"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-2xl font-bold text-center text-red-600 mb-3">
                    🧾 Spent
                  </h2>
                  {spent.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-red-100 hover:bg-red-200 transition-all duration-300 p-3 m-2 rounded-xl flex justify-between items-center shadow-sm cursor-grab"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span className="flex items-center gap-2">
                            {item.icon} {item.label}
                          </span>
                          <span className="text-sm font-bold">
                            ₹{item.cost}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        <div className="mt-12">
          <div className="flex justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center my-6">
                <div className="w-12 h-12 border-4 border-t-pink-500 border-yellow-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-pink-600 text-2xl font-semibold">
                  Thinking...
                </p>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="text-2xl rounded-full py-3 px-6 bg-yellow-300 hover:bg-yellow-400 text-pink-700 font-bold shadow-md hover:scale-105 transition-transform duration-300"
              >
                🎉 Click for Feedback!
              </button>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-center mt-4 font-bold">{error}</p>
          )}
        </div>

        {result && (
          <div className="mt-12">
            <div className="flex justify-center items-center">
              <h2 className="text-3xl text-purple-600 font-bold">
                📣 Feedback
              </h2>
            </div>
            <div className="w-full lg:w-2/3 p-6 mx-auto mt-4 flex items-center justify-center">
              <div className="bg-white border-4 p-6 border-fuchsia-400 rounded-3xl shadow-md whitespace-pre-wrap">
                <div className="text-gray-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-5 space-y-4 sm:space-y-0">
                    <Avatar
                      style={{ width: 120, height: 120 }}
                      type={feedbackAvatarType}
                    />
                    <span className="text-xl rounded-full shadow-lg p-4 bg-yellow-200 font-semibold">
                      {feedbackAvatarType === "disappointing"
                        ? "😟 You can do better!"
                        : "🌟 Great job budgeting!"}
                    </span>
                  </div>
                  <p>
                    <strong>🎯 Spending Score:</strong> {result?.spendingScore}
                  </p>
                  <p>
                    <strong>💡 Tip:</strong> {result?.tip}
                  </p>
                  <div>
                    <strong>✂️ Cut this category:</strong>{" "}
                    {result?.categoryToCut}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showSurpriseAvatar && (
            <SurpriseAvatar
              show={showSurpriseAvatar}
              onClose={() => setShowSurpriseAvatar(false)}
            />
          )}
        </AnimatePresence>

        <ToastContainer />
      </div>
    </div>
  );
};

export default BudgetBuilder;
