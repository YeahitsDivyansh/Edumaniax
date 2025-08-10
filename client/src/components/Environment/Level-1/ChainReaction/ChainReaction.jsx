import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    useDroppable,
    useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// Import your components from their files
import IntroScreen from "./IntroScreen";
import InstructionsScreen from "./InstructionsScreen";
import GameNav from "./GameNav";
import Checknow from "@/components/icon/GreenBudget/Checknow";

// =============================================================================
// Game Data & Config
// =============================================================================
const puzzles = [
    {
        cause: "Cutting down trees",
        correctOrder: ["Loss of tree cover", "Soil erosion", "Crop failure and desertification"],
        image: "/environmentGameInfo/ChainReaction/cutdowntrees.png",
    },
    {
        cause: "Dumping industrial waste",
        correctOrder: ["Water pollution", "Death of aquatic life", "Unsafe drinking water"],
        image: "/environmentGameInfo/ChainReaction/cutdowntrees.png",
    },
    {
        cause: "Plastic usage",
        correctOrder: ["Waste accumulation", "Soil & water contamination", "Harm to marine life"],
        image: "/environmentGameInfo/ChainReaction/cutdowntrees.png",
    },
     {
        cause: "Over-mining",
        correctOrder: ["Resource depletion", "Habitat destruction", "Land degradation"],
        image: "/environmentGameInfo/ChainReaction/cutdowntrees.png",
    },
    {
        cause: "Burning fossil fuels",
        correctOrder: ["Air pollution", "Greenhouse gas buildup", "Global warming"],
        image: "/environmentGameInfo/ChainReaction/cutdowntrees.png",
    },
];
const PERFECT_SCORE = puzzles.length * 5;
const PASSING_THRESHOLD = 0.7; // 70% accuracy to win
const TIME_PER_PUZZLE = 60; // 1 minute per question

// =============================================================================
// Reusable End-Screen Components (Responsive)
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
                            <p className="font-semibold">Your Sequence:</p>
                            <p className={`font-mono ${ans.isCorrect ? 'text-white' : 'text-red-300'}`}>
                                {ans.userSequence.map(s => s || "Empty").join(" → ")}
                            </p>
                            {!ans.isCorrect && (
                                <>
                                <p className="font-semibold pt-[1vh]">Correct Sequence:</p>
                                <p className="font-mono text-green-300">
                                    {ans.correctSequence.join(" → ")}
                                </p>
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
// DnD Components (Responsive)
// =============================================================================
const DraggableCard = React.memo(({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        zIndex: isDragging ? 100 : 'auto',
        opacity: isDragging ? 0.5 : 1,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex h-[8.5vh] w-[24vw] items-center self-stretch shrink-0 rounded-[0.83vw] relative cursor-grab transition-opacity">
            <div className="shrink-0 bg-[#131f24] rounded-[0.83vw] border-solid border-[0.1vh] border-[#37464f] absolute inset-[-0.05vh] shadow-[0_0.22vh_0_0_#37464f]" />
            <div className="flex p-[1.1vw] items-center justify-center grow relative z-[5]">
                <span className="font-['Inter'] text-[2.2vh] font-medium text-[#f1f7fb] text-center">{content || id}</span>
            </div>
        </div>
    );
});

const DroppableSequenceSlot = React.memo(({ id, content, text }) => {
    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({ id });
    const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform, isDragging } = useDraggable({ id, disabled: !content });

    const combinedRef = useCallback(node => {
        setDroppableNodeRef(node);
        if (content) setDraggableNodeRef(node);
    }, [setDroppableNodeRef, setDraggableNodeRef, content]);

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        zIndex: isDragging ? 100 : 'auto',
        opacity: isDragging ? 0 : 1,
    };

    return (
        <div ref={combinedRef} style={style} {...(content ? attributes : {})} {...(content ? listeners : {})} className="flex h-[8.5vh] w-[24vw]items-center self-stretch shrink-0 rounded-[0.83vw] relative">
            {content ? (
                <>
                    <div className="shrink-0 bg-[#131f24] rounded-[0.83vw] border-solid border-[0.1vh] border-[#37464f] absolute inset-[-0.05vh] shadow-[0_0.22vh_0_0_#37464f] cursor-grab" />
                    <div className="flex p-[1.1vw] items-center justify-center grow relative z-[5]">
                        <span className="font-['Inter'] text-[2.2vh] font-medium text-[#f1f7fb] text-center">{content}</span>
                    </div>
                </>
            ) : (
                <>
                    <div className={`shrink-0 bg-[#131f24] rounded-[0.83vw] border-dashed border-[0.2vh] ${isOver ? 'border-yellow-400' : 'border-[#37464f]'} absolute inset-[-0.05vh] transition-colors`} />
                    <div className="flex justify-center items-center w-full h-full relative">
                        <span className="font-['Inter'] text-[2.2vh] font-medium text-[#f1f7fb]">{text}</span>
                    </div>
                </>
            )}
        </div>
    );
});

const EmptyPlaceholderCardLeft = React.memo(({ id }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return <div ref={setNodeRef} className={`flex h-[8.5vh] w-[24vw] bg-[#131f24] rounded-[0.83vw] border-dashed border-[0.2vh] ${isOver ? 'border-yellow-400' : 'border-[#37464f]'} relative transition-colors`} />;
});

// =============================================================================
// Reducer Logic
// =============================================================================
const initialState = {
    gameState: "intro",
    currentPuzzleIndex: 0,
    score: 0,
    answers: [],
    timeLeft: TIME_PER_PUZZLE,
};

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function gameReducer(state, action) {
    switch (action.type) {
        case "SHOW_INSTRUCTIONS": return { ...state, gameState: "instructions" };
        case "START_GAME": return { ...initialState, gameState: "playing" };
        case "SUBMIT_ANSWER": {
            const { userSequence } = action.payload;
            const puzzle = puzzles[state.currentPuzzleIndex];
            const isCorrect = userSequence.every((item, index) => item && item.toLowerCase() === puzzle.correctOrder[index].toLowerCase());
            
            const nextState = {
                ...state,
                score: isCorrect ? state.score + 5 : state.score,
                answers: [...state.answers, { cause: puzzle.cause, userSequence, correctSequence: puzzle.correctOrder, isCorrect }],
                currentPuzzleIndex: state.currentPuzzleIndex + 1,
                timeLeft: TIME_PER_PUZZLE,
            };

            if (nextState.currentPuzzleIndex >= puzzles.length) {
                return { ...nextState, gameState: "finished" };
            }
            return nextState;
        }
        case "TICK": return { ...state, timeLeft: state.timeLeft - 1 };
        case "REVIEW_GAME": return { ...state, gameState: "review" };
        case "BACK_TO_FINISH": return { ...state, gameState: "finished" };
        case "RESET_GAME": return { ...initialState, gameState: "playing" };
        default: return state;
    }
}

// =============================================================================
// Main Game Component
// =============================================================================
const ChainReaction = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    const [availableCards, setAvailableCards] = useState([]);
    const [sequenceSlotsContent, setSequenceSlotsContent] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (state.gameState === "playing") {
            const puzzle = puzzles[state.currentPuzzleIndex];
            if (puzzle) {
                setAvailableCards(shuffle([...puzzle.correctOrder]));
                setSequenceSlotsContent([{ id: null, slotId: 'slot-0' }, { id: null, slotId: 'slot-1' }, { id: null, slotId: 'slot-2' }]);
            }
        }
    }, [state.gameState, state.currentPuzzleIndex]);

    useEffect(() => {
        if (state.gameState !== "playing") return;
        if (state.timeLeft <= 0) {
            const userSequence = sequenceSlotsContent.map(item => item.id);
            dispatch({ type: "SUBMIT_ANSWER", payload: { userSequence } });
            return;
        }
        const timerId = setInterval(() => { dispatch({ type: "TICK" }); }, 1000);
        return () => clearInterval(timerId);
    }, [state.gameState, state.timeLeft, sequenceSlotsContent]);
    
    const handleDragStart = (event) => setActiveId(event.active.id);
    const handleDragEnd = (event) => {
        setActiveId(null);
        const { active, over } = event;
        if (!over) return;
        const { id: activeId } = active;
        const { id: overId } = over;

        const isDraggingFromAvailable = availableCards.includes(activeId);
        const activeSequenceSlotIndex = sequenceSlotsContent.findIndex(slot => slot.slotId === activeId);
        const isDraggingFromSequence = activeSequenceSlotIndex !== -1;
        const overSequenceSlotIndex = sequenceSlotsContent.findIndex(slot => slot.slotId === overId);
        const isOverSequenceSlot = overSequenceSlotIndex !== -1;
        const isOverAvailableCardsArea = overId.toString().startsWith('available-cards-placeholder');
        let draggedContent = isDraggingFromAvailable ? activeId : (isDraggingFromSequence ? sequenceSlotsContent[activeSequenceSlotIndex].id : null);
        if (!draggedContent) return;

        const newAvailableCards = [...availableCards];
        const newSequenceSlotsContent = [...sequenceSlotsContent];

        if (isOverSequenceSlot) {
            const cardCurrentlyInTargetSlot = newSequenceSlotsContent[overSequenceSlotIndex].id;
            newSequenceSlotsContent[overSequenceSlotIndex].id = draggedContent;

            if (isDraggingFromAvailable) {
                const indexToRemove = newAvailableCards.indexOf(draggedContent);
                if (indexToRemove > -1) newAvailableCards.splice(indexToRemove, 1);
                if (cardCurrentlyInTargetSlot) newAvailableCards.push(cardCurrentlyInTargetSlot);
            } else if (isDraggingFromSequence) {
                newSequenceSlotsContent[activeSequenceSlotIndex].id = cardCurrentlyInTargetSlot;
            }
        } else if (isOverAvailableCardsArea) {
            if (isDraggingFromSequence) {
                newSequenceSlotsContent[activeSequenceSlotIndex].id = null;
                if (!newAvailableCards.includes(draggedContent)) newAvailableCards.push(draggedContent);
            }
        }
        setAvailableCards(newAvailableCards);
        setSequenceSlotsContent(newSequenceSlotsContent);
    };

    const handleSubmit = () => {
        const userSequence = sequenceSlotsContent.map(item => item.id);
        dispatch({ type: "SUBMIT_ANSWER", payload: { userSequence } });
    };

    if (state.gameState === "intro") return <IntroScreen onShowInstructions={() => dispatch({ type: "SHOW_INSTRUCTIONS" })} />;
    if (state.gameState === "instructions") return <InstructionsScreen onStartGame={() => dispatch({ type: "START_GAME" })} />;
    if (state.gameState === "finished") {
        const accuracyScore = Math.round((state.score / PERFECT_SCORE) * 100);
        const isVictory = accuracyScore >= PASSING_THRESHOLD * 100;
        let insightText = accuracyScore >= 80 ? "Excellent grasp of cause and effect!" : "Good effort! Reviewing helps!";

        return isVictory
            ? <VictoryScreen accuracyScore={accuracyScore} insight={insightText} onViewFeedback={() => dispatch({type: 'REVIEW_GAME'})} onContinue={() => navigate('/environmental/games')} />
            : <LosingScreen accuracyScore={accuracyScore} insight={insightText} onPlayAgain={() => dispatch({ type: 'RESET_GAME'})} onViewFeedback={() => dispatch({type: 'REVIEW_GAME'})} onContinue={() => navigate('/environmental/games')} />;
    }
    if (state.gameState === "review") return <ReviewScreen answers={state.answers} onBackToResults={() => dispatch({ type: "BACK_TO_FINISH" })} />;

    const currentPuzzle = puzzles[state.currentPuzzleIndex];
    if (state.gameState === 'playing' && !currentPuzzle) return <div className="text-white bg-[#202f36] flex items-center justify-center h-screen">Loading...</div>;

    const isSubmitEnabled = sequenceSlotsContent.every(item => item.id !== null);
    const activeDragItem = activeId ? (availableCards.find(c => c === activeId) || sequenceSlotsContent.find(s => s.slotId === activeId)?.id) : null;

    return (
        <div className="w-full h-screen bg-[#0A160E] flex flex-col items-center justify-center p-[1.1vw] pt-[12.5vh] pb-[12vh] relative overflow-hidden">
            <GameNav timeLeft={state.timeLeft} />
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex flex-col items-center gap-[6vh]">
                    <div className="flex w-full max-w-[70.7vw] justify-between items-center gap-[2vw]">
                        <div className="flex w-[26vw] h-[38vh] flex-col gap-[2.5vh] py-[4vh] px-[1vw] justify-center items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                             {availableCards.map((item) => <DraggableCard key={item} id={item} content={item} />)}
                             {Array.from({ length: 3 - availableCards.length }).map((_, index) => <EmptyPlaceholderCardLeft key={`empty-${index}`} id={`available-cards-placeholder-${index}`} />)}
                        </div>
                        <div className="flex w-[26vw] h-[38vh] flex-col gap-[2.5vh] py-[4vh] px-[1vw]  justify-center items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                             {sequenceSlotsContent.map((item, index) => (
                                 <DroppableSequenceSlot key={item.slotId} id={item.slotId} content={item.id} text={['1st', '2nd', '3rd'][index]} />
                             ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-auto max-w-[43.5vw] h-[12.5vh]">
                         <img src={currentPuzzle.image} alt="Cause" className="w-[9vw] h-[12.5vh] object-contain" />
                         <div className="relative flex items-center">
                            <div className="absolute left-[-1.1vw] top-1/2 -translate-y-1/2 w-[1.25vw] h-[2.2vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-09/cZcfryFaXc.png)] bg-cover bg-no-repeat" />
                            <div className="flex h-[7vh] justify-center items-center bg-[#131f24] rounded-[0.83vw] border-solid border-[0.1vh] border-[#37464f] px-[2.2vw]">
                                 <span className="font-['Inter'] text-[2.6vh] font-medium text-[#f1f7fb] text-center">
                                     {currentPuzzle.cause}
                                 </span>
                            </div>
                         </div>
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
                            Continue
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChainReaction;