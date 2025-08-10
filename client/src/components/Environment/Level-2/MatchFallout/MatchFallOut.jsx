import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay, useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// Import your components
import IntroScreen from "./IntroScreen";
import InstructionsScreen from "./InstructionsScreen";
import GameNav from "./GameNav";
import Checknow from "@/components/icon/GreenBudget/Checknow";

// =============================================================================
// Game Data & Config
// =============================================================================
const matchFalloutData = [
    { id: "1", text: "Dumping industrial waste", match: "Aquatic animal death" },
    { id: "2", text: "Plastic usage", match: "Wildlife choking" },
    { id: "3", text: "Over-mining", match: "Soil infertility" },
    { id: "4", text: "Cutting forests", match: "Loss of biodiversity" },
    { id: "5", text: "Excessive pesticide use", match: "Water poisoning and food chain damage" },
];

const PERFECT_SCORE = matchFalloutData.length * 5;
const PASSING_THRESHOLD = 0.7;
const GAME_TIME_LIMIT = 120;

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
            <h1 className="text-[4.4vh] font-bold lilita-one-regular mb-[2.7vh] text-yellow-400 flex-shrink-0">Review Your Answers</h1>
            <div className="w-full max-w-[88vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.3vw] flex-grow overflow-y-auto p-[0.5vw]">
                {answers.map((ans, idx) => (
                    <div key={idx} className={`p-[1.1vw] rounded-[0.83vw] flex flex-col ${ans.isCorrect ? 'bg-green-900/70 border-green-700' : 'bg-red-900/70 border-red-700'} border-[0.1vh]`}>
                        <p className="text-gray-300 text-[1.7vh] mb-[1vh] leading-tight font-bold">Cause: {ans.cause}</p>
                        <div className="text-[1.5vh] space-y-[0.5vh]">
                            <p className="font-semibold">Your Match:</p>
                            <p className={`font-mono ${ans.isCorrect ? 'text-white' : 'text-red-300'}`}>{ans.userAnswer || "Not Answered"}</p>
                            {!ans.isCorrect && (
                                <>
                                <p className="font-semibold pt-[1vh]">Correct Match:</p>
                                <p className="font-mono text-green-300">{ans.correctAnswer}</p>
                                </>
                            )}
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
// DnD Components
// =============================================================================
const DraggableCard = React.memo(({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        zIndex: isDragging ? 1000 : 'auto',
        opacity: isDragging ? 0.75 : 1,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex h-[8vh] w-[30vw] items-center self-stretch shrink-0 rounded-[0.7vw] relative cursor-grab transition-opacity bg-[#131f24] border-solid border-[0.1vh] border-[#37464f] shadow-[0_0.2vh_0_0_#37464f]">
            <div className="flex p-[1vw] items-center justify-center grow relative">
                <span className="font-['Inter'] text-[1.6vh] font-medium text-[#f1f7fb] text-center">{content || id}</span>
            </div>
        </div>
    );
});

const DroppableSlot = React.memo(({ id, labelText, content }) => {
    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({ id });
    const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform, isDragging } = useDraggable({ id, disabled: !content });
    
    const combinedRef = useCallback(node => {
        setDroppableNodeRef(node);
        if (content) setDraggableNodeRef(node);
    }, [setDroppableNodeRef, setDraggableNodeRef, content]);

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        zIndex: isDragging ? 1000 : 'auto',
        opacity: isDragging ? 0 : 1,
    };
    
    return (
        <div ref={combinedRef} style={style} {...(content ? attributes : {})} {...(content ? listeners : {})} className="flex h-[8vh] w-[30vw] items-center self-stretch shrink-0 rounded-[0.7vw] relative">
            {content ? (
                <div className="flex h-full w-full items-center rounded-[0.7vw] relative cursor-grab bg-[#131f24] border-solid border-[0.1vh] border-[#37464f] shadow-[0_0.2vh_0_0_#37464f]">
                     <div className="flex p-[1vw] items-center justify-center grow relative">
                         <span className="font-['Inter'] text-[1.6vh] font-medium text-[#f1f7fb] text-center">{content}</span>
                     </div>
                </div>
            ) : (
                <div className={`w-full h-full flex items-center justify-center rounded-[0.7vw] relative bg-black/30 border-dashed border-[0.2vh] ${isOver ? 'border-yellow-400' : 'border-[#37464f]'} transition-colors`}>
                    <span className="font-['Inter'] text-[1.6vh] font-medium text-gray-400 text-center p-2">{labelText}</span>
                </div>
            )}
        </div>
    );
});

const EmptyPlaceholder = React.memo(({ id }) => {
    const { setNodeRef, isOver } = useDroppable({ id: id });
    return <div ref={setNodeRef} className={`flex h-[8vh] w-[30vw] shrink-0 rounded-[0.7vw] bg-black/20 border-dashed border-[0.2vh] ${isOver ? 'border-yellow-400' : 'border-[#37464f]'} transition-colors`} />;
});


// =============================================================================
// Reducer Logic (with Timer)
// =============================================================================
const initialState = {
    gameState: "intro",
    score: 0,
    answers: [],
    timeLeft: GAME_TIME_LIMIT,
};

function gameReducer(state, action) {
    switch (action.type) {
        case "SHOW_INSTRUCTIONS": return { ...state, gameState: "instructions" };
        case "START_GAME": return { ...initialState, gameState: "playing" };
        case "SUBMIT_ANSWERS": {
            const { slots } = action.payload;
            let currentScore = 0;
            const newAnswers = matchFalloutData.map(item => {
                const userSlot = slots.find(s => s.id === item.id);
                const userAnswer = userSlot ? userSlot.content : null;
                const isCorrect = userAnswer === item.match;
                if (isCorrect) {
                    currentScore += 5;
                }
                return { cause: item.text, userAnswer, correctAnswer: item.match, isCorrect };
            });

            return { ...state, score: currentScore, answers: newAnswers, gameState: "finished" };
        }
        case "TICK":
            if (state.timeLeft <= 0) {
                return state;
            }
            return { ...state, timeLeft: state.timeLeft - 1 };
        case "REVIEW_GAME": return { ...state, gameState: "review" };
        case "BACK_TO_FINISH": return { ...state, gameState: "finished" };
        case "RESET_GAME": return { ...initialState, gameState: "playing" };
        default: return state;
    }
}

// =============================================================================
// Main Game Component
// =============================================================================
const MatchTheFallout = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    const [availableFallouts, setAvailableFallouts] = useState([]);
    const [slots, setSlots] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const shuffle = useCallback((array) => [...array].sort(() => Math.random() - 0.5), []);
    
    const handleSubmit = useCallback(() => {
        dispatch({ type: "SUBMIT_ANSWERS", payload: { slots } });
    }, [slots]);

    useEffect(() => {
        if (state.gameState === "playing") {
            setAvailableFallouts(shuffle(matchFalloutData.map(item => item.match)));
            setSlots(matchFalloutData.map(item => ({ id: item.id, labelText: item.text, content: null })));
        }
    }, [state.gameState, shuffle]);

    useEffect(() => {
        if (state.gameState !== "playing") return;
        if (state.timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timerId = setInterval(() => {
            dispatch({ type: "TICK" });
        }, 1000);
        return () => clearInterval(timerId);
    }, [state.gameState, state.timeLeft, handleSubmit]);
    
    const handleDragStart = (event) => setActiveId(event.active.id);

    // FIXED: Rewritten drag and drop logic to handle all cases correctly
    const handleDragEnd = (event) => {
        setActiveId(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const newSlots = [...slots];
        const newAvailableFallouts = [...availableFallouts];

        // Find out what is being dragged
        const isDraggingFromAvailable = availableFallouts.includes(activeId);
        const sourceSlotIndex = slots.findIndex(s => s.id === activeId);
        const isDraggingFromSlot = sourceSlotIndex !== -1;
        const draggedContent = isDraggingFromAvailable ? activeId : newSlots[sourceSlotIndex]?.content;

        if (!draggedContent) return;

        // Find out where it is being dropped
        const targetSlotIndex = slots.findIndex(s => s.id === overId);
        const isDroppingOnSlot = targetSlotIndex !== -1;
        const isDroppingOnAvailableArea = overId.toString().startsWith('placeholder');

        if (isDroppingOnSlot) {
            const contentInTargetSlot = newSlots[targetSlotIndex].content;
            
            // If dragging from another slot (SWAP)
            if (isDraggingFromSlot) {
                newSlots[sourceSlotIndex].content = contentInTargetSlot;
            } 
            // If dragging from the available pool
            else {
                const indexToRemove = newAvailableFallouts.indexOf(draggedContent);
                if (indexToRemove > -1) newAvailableFallouts.splice(indexToRemove, 1);
                if (contentInTargetSlot) newAvailableFallouts.push(contentInTargetSlot);
            }
            newSlots[targetSlotIndex].content = draggedContent;
        } 
        else if (isDroppingOnAvailableArea) {
             // If dragging from a slot back to the available area
            if (isDraggingFromSlot) {
                newSlots[sourceSlotIndex].content = null;
                if (!newAvailableFallouts.includes(draggedContent)) newAvailableFallouts.push(draggedContent);
            }
        }
        
        setSlots(newSlots);
        setAvailableFallouts(newAvailableFallouts);
    };
    
    if (state.gameState === "intro") return <IntroScreen onShowInstructions={() => dispatch({ type: "SHOW_INSTRUCTIONS" })} />;
    if (state.gameState === "instructions") return <InstructionsScreen onStartGame={() => dispatch({ type: "START_GAME" })} />;
    if (state.gameState === "finished") {
        const accuracyScore = Math.round((state.score / PERFECT_SCORE) * 100);
        const isVictory = accuracyScore >= PASSING_THRESHOLD * 100;
        let insightText = accuracyScore >= 80 ? "Excellent! You know the consequences." : "Good try! Review the matches to learn more.";
        return isVictory
            ? <VictoryScreen accuracyScore={accuracyScore} insight={insightText} onViewFeedback={() => dispatch({type: 'REVIEW_GAME'})} onContinue={() => navigate('/environmental/games')} />
            : <LosingScreen accuracyScore={accuracyScore} insight={insightText} onPlayAgain={() => dispatch({ type: 'RESET_GAME'})} onViewFeedback={() => dispatch({type: 'REVIEW_GAME'})} onContinue={() => navigate('/environmental/games')} />;
    }
    if (state.gameState === "review") return <ReviewScreen answers={state.answers} onBackToResults={() => dispatch({ type: "BACK_TO_FINISH" })} />;
    
    const isSubmitEnabled = availableFallouts.length === 0;
    const activeDragItem = activeId ? (availableFallouts.find(c => c === activeId) || slots.find(s => s.id === activeId)?.content) : null;

    return (
        <div className="w-full h-screen bg-[#202f36] flex flex-col items-center justify-center p-[1vw] pt-[10.5vh] pb-[12vh] relative overflow-hidden">
            <GameNav timeLeft={state.timeLeft} />
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex w-full max-w-[70vw] justify-between items-start">
                    {/* Left Column: Draggable Fallouts */}
                    <div className="flex w-[32vw] h-[60vh] flex-col gap-[2vh] p-[1vw] justify-center items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                        {availableFallouts.map(fallout => (
                            <DraggableCard key={fallout} id={fallout} content={fallout} />
                        ))}
                        {Array.from({ length: matchFalloutData.length - availableFallouts.length }).map((_, i) => (
                           <EmptyPlaceholder key={i} id={`placeholder-${i}`} />
                        ))}
                    </div>
                    {/* Right Column: Droppable Cause Slots */}
                    <div className="flex w-[32vw] h-[60vh] flex-col gap-[2vh] p-[1vw] justify-center items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                         {slots.map(slot => (
                            <DroppableSlot
                                key={slot.id}
                                id={slot.id}
                                labelText={slot.labelText}
                                content={slot.content}
                            />
                         ))}
                    </div>
                </div>
                
                <DragOverlay>
                    {activeId && activeDragItem ? <DraggableCard id={activeId} content={activeDragItem} /> : null}
                </DragOverlay>
            </DndContext>

            <div className="w-full h-[12vh] bg-[#28343A] flex justify-center items-center px-[5vw] z-50 fixed bottom-0">
                <div className="w-auto md:w-[15vw] h-[8vh]">
                    <button
                        className="relative w-full h-full cursor-pointer"
                        onClick={handleSubmit}
                        disabled={!isSubmitEnabled}
                    >
                        <Checknow topGradientColor={"#09be43"} bottomGradientColor={"#068F36"} width="100%" height="100%" />
                        <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lilita text-[2.5vh] text-white [text-shadow:0_0.3vh_0_#000] transition-opacity ${!isSubmitEnabled ? "opacity-50" : ""}`}>
                            Check Now
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchTheFallout;