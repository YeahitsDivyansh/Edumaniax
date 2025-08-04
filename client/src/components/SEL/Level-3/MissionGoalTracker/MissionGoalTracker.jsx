import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
// ✅ Goal data
const goals = [
  {
    id: "football",
    title: "⚽ Get better at football",
    steps: [
      {
        id: "f-s",
        type: "S",
        text: "I want to improve my football skills, especially in passing, dribbling, and stamina.",
      },
      {
        id: "f-m",
        type: "M",
        text: "I will improve my passing accuracy from 60% to 85%, increase dribbling drills completion speed by 30%, and run 5 km without stopping.",
      },
      {
        id: "f-a",
        type: "A",
        text: "I will train 4 times a week with my school coach and practice drills at home twice a week.",
      },
      {
        id: "f-r",
        type: "R",
        text: "This will help me perform better in my school team and prepare for upcoming inter-school tournaments.",
      },
      {
        id: "f-t",
        type: "T",
        text: "I will achieve these improvements in the next 8 weeks.",
      },
    ],
  },
  {
    id: "swim",
    title: "🏊 Learn how to swim",
    steps: [
      {
        id: "s-s",
        type: "S",
        text: "I want to learn how to swim freestyle and backstroke confidently in a pool.",
      },
      {
        id: "s-m",
        type: "M",
        text: "I should be able to swim 50 meters freestyle and 25 meters backstroke without stopping.",
      },
      {
        id: "s-a",
        type: "A",
        text: "I will join a beginner’s swim class and practice at the pool three times a week.",
      },
      {
        id: "s-r",
        type: "R",
        text: "Swimming is an essential life skill and also something I want to enjoy during holidays.",
      },
      {
        id: "s-t",
        type: "T",
        text: "I will learn to swim confidently within 6 weeks.",
      },
    ],
  },
  {
    id: "art",
    title: "🎨 Improve your art skills",
    steps: [
      {
        id: "a-s",
        type: "S",
        text: "I want to improve my drawing and shading techniques for portraits and still life.",
      },
      {
        id: "a-m",
        type: "M",
        text: "I will complete one portrait and one still-life drawing every week and compare them for progress.",
      },
      {
        id: "a-a",
        type: "A",
        text: "I will take online art tutorials and practice for 45 minutes daily.",
      },
      {
        id: "a-r",
        type: "R",
        text: "Improving my art skills will help me create a portfolio for art school next year.",
      },
      {
        id: "a-t",
        type: "T",
        text: "I will show significant improvement in 2 months.",
      },
    ],
  },
];

// ✅ SMART buckets
const buckets = ["S", "M", "A", "R", "T"];

const MissionGoalTracker = () => {
  const { completeSELChallenge } = useSEL();
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [items, setItems] = useState(selectedGoal.steps);
  const [columns, setColumns] = useState(
    buckets.reduce((acc, bucket) => ({ ...acc, [bucket]: [] }), {})
  );
  const [attempts, setAttempts] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [showCorrect, setShowCorrect] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    if (resultMessage && isCorrect()) {
      completeSELChallenge(2, 0); // ✅ Adjust the parameters as needed
    }
  }, [resultMessage]);

  useEffect(() => {
    if (resultMessage && (isCorrect() || showCorrect)) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);


      updatePerformance({
        moduleName: "SEL",
        topicName: "peerSupportNetworks",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: totalSeconds / 5,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: isCorrect(),

      });
      setStartTime(Date.now());

    }
  }, [resultMessage]);


  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;

    if (sourceCol === destCol) {
      const colItems =
        sourceCol === "items"
          ? Array.from(items)
          : Array.from(columns[sourceCol]);

      const [moved] = colItems.splice(result.source.index, 1);
      colItems.splice(result.destination.index, 0, moved);

      if (sourceCol === "items") setItems(colItems);
      else setColumns({ ...columns, [sourceCol]: colItems });
    } else {
      const sourceItems =
        sourceCol === "items"
          ? Array.from(items)
          : Array.from(columns[sourceCol]);
      const destItems = Array.from(columns[destCol]);

      const [moved] = sourceItems.splice(result.source.index, 1);
      destItems.splice(result.destination.index, 0, moved);

      if (sourceCol === "items") setItems(sourceItems);
      else setColumns({ ...columns, [sourceCol]: sourceItems });

      setColumns((prev) => ({ ...prev, [destCol]: destItems }));
    }
  };

  const isCorrect = () => {
    for (let b of buckets) {
      for (let item of columns[b]) {
        if (item.type !== b) return false;
      }
    }
    return true;
  };

  const handleCheck = () => {
    if (isCorrect()) {
      setResultMessage("🎉 Well done! All steps matched correctly!");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setShowCorrect(true);
        setResultMessage(
          "😢 Oops! Better luck next time. Here's the correct placement."
        );
      } else {
        setResultMessage(
          `❌ Not quite right. Try again! (${3 - newAttempts} tries left)`
        );
      }
    }
  };

  const handleTryAgain = () => {
    setItems(selectedGoal.steps);
    setColumns(buckets.reduce((acc, b) => ({ ...acc, [b]: [] }), {}));
    setResultMessage("");
    setShowCorrect(false);
  };

  const handlePlayAgain = () => {
    setItems(selectedGoal.steps);
    setColumns(buckets.reduce((acc, b) => ({ ...acc, [b]: [] }), {}));
    setAttempts(0);
    setResultMessage("");
    setShowCorrect(false);
    setStartTime(Date.now());

  };

  const handleGoalChange = (id) => {
    const goal = goals.find((g) => g.id === id);
    setSelectedGoal(goal);
    setItems(goal.steps);
    setColumns(buckets.reduce((acc, b) => ({ ...acc, [b]: [] }), {}));
    setAttempts(0);
    setResultMessage("");
    setShowCorrect(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-700">
        Mission Goal Tracker – Set It, Plan It, Do It!
      </h1>
      <p className="text-lg text-center mb-4">
        It’s time to make your goal real. Drag each step into the right part of
        your SMART goal plan.
        <br />
        <strong>SMART</strong> = Specific, Measurable, Achievable, Relevant,
        Time-bound.
      </p>

      <div className="mb-4">
        <select
          value={selectedGoal.id}
          className="px-4 py-2 rounded-md shadow-md text-blue-800"
          onChange={(e) => handleGoalChange(e.target.value)}
        >
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.title}
            </option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          <Droppable droppableId="items">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white p-4 rounded-xl shadow-md min-h-[200px]"
              >
                <h2 className="font-semibold mb-2 text-blue-800">
                  Steps to Drag
                </h2>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-3 mb-2 rounded-md bg-blue-50 border border-blue-300 transition transform ${snapshot.isDragging ? "scale-105 shadow-lg" : ""
                          }`}
                      >
                        {item.text}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {buckets.map((bucket) => (
            <Droppable key={bucket} droppableId={bucket}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white p-4 rounded-xl shadow-md min-h-[200px] transition border-2 ${snapshot.isDraggingOver
                    ? "border-green-400"
                    : "border-transparent"
                    }`}
                >
                  <h2 className="font-bold mb-2 text-green-800">{bucket}</h2>
                  {columns[bucket].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-2 rounded-md bg-green-50 border border-green-300 transition transform ${snapshot.isDragging ? "scale-105 shadow-lg" : ""
                            }`}
                        >
                          {item.text}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {showCorrect &&
                    selectedGoal.steps
                      .filter((s) => s.type === bucket)
                      .map((s) => (
                        <div
                          key={`correct-${s.id}`}
                          className="p-3 mb-2 rounded-md bg-yellow-100 border border-yellow-400"
                        >
                          ✅ {s.text}
                        </div>
                      ))}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <button
        onClick={handleCheck}
        disabled={showCorrect}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        ✅ Check Answers
      </button>

      {resultMessage && (
        <div className="mt-4 p-4 bg-white border-l-4 border-blue-500 shadow rounded max-w-xl text-center">
          {/* ✅ Correct GIF */}
          {isCorrect() && (
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW16MjJ5MDVlM2Ztcnkxem9iMTcycGMyMWk3Z2o1bjk5djY4djljZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JjtwVfcEaO7Gfx7y8H/giphy.webp"
              alt="Success"
              className="mx-auto mb-2 rounded-lg w-40"
            />
          )}

          {/* ❌ Wrong attempt GIF */}
          {!isCorrect() && !showCorrect && attempts < 3 && (
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmJjcG93ZmlrMHlqYmIwb3FzYzEyNjlkZmE5b3lhMmdzNnppeDFxaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4ZUdfEa3zqjZldUz3K/giphy.webp"
              alt="Try Again"
              className="mx-auto mb-2 rounded-lg w-40"
            />
          )}

          {/* 😢 Out of attempts GIF */}
          {showCorrect && (
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjFjM2Zndjg0aWlnN2djY3cwZDN1YXRmb2Jqd2Z5cjE4cDIzNTFxdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5BLIUJbZfDzIPv0EpL/200.webp"
              alt="Better Luck Next Time"
              className="mx-auto mb-2 rounded-lg w-40"
            />
          )}

          {resultMessage}
        </div>
      )}

      {!isCorrect() && resultMessage && !showCorrect && attempts < 3 && (
        <button
          onClick={handleTryAgain}
          className="mt-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🔁 Try Again
        </button>
      )}

      {(isCorrect() || showCorrect) && (
        <button
          onClick={handlePlayAgain}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
        >
          🔄 Play Again
        </button>
      )}
    </div>
  );
};

export default MissionGoalTracker;
