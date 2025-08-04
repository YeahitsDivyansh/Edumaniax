import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext";

const matchFalloutData = [
  { id: "1", text: "Dumping industrial waste", match: "Aquatic animal death" },
  { id: "2", text: "Plastic usage", match: "Wildlife choking" },
  { id: "3", text: "Over-mining", match: "Soil infertility" },
  { id: "4", text: "Cutting forests", match: "Loss of biodiversity" },
  {
    id: "5",
    text: "Excessive pesticide use",
    match: "Water poisoning and food chain damage",
  },
];

const DraggableCard = React.memo(({ id, content, isDraggingOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDraggingOverlay
      ? undefined
      : isDragging
      ? "transform 0.25s ease"
      : undefined,
    width: "[30vw]",
    minWidth: "[30vw]",
    height: "8vh",
    minHeight: "8vh",
    zIndex: isDragging ? 100 : "auto",
    opacity: isDraggingOverlay ? 1 : isDragging ? 0 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex justify-center items-center shrink-0 basis-auto text-center
        bg-[#d8bfd8] shadow-[2px_4px_10px_0_rgba(167,142,207,0.6)] font-['Comic_Sans_MS'] text-sm md:text-base font-bold leading-tight text-[rgba(75,0,130,0.6)] cursor-grab
      `}
    >
           {" "}
      <span className="flex w-auto h-auto justify-center items-center p-1 text-wrap break-words">
                {content || id}     {" "}
      </span>
         {" "}
    </div>
  );
});

const DroppableSequenceSlot = React.memo(
  ({ id, content, text, isDraggingOverlay }) => {
    const { setNodeRef: setDroppableNodeRef } = useDroppable({ id: id });

    const {
      attributes,
      listeners,
      setNodeRef: setDraggableNodeRef,
      transform,
      isDragging,
    } = useDraggable({ id: id, disabled: !content });

    const combinedRef = useCallback(
      (node) => {
        setDroppableNodeRef(node);
        if (content) {
          setDraggableNodeRef(node);
        }
      },
      [setDroppableNodeRef, setDraggableNodeRef, content]
    );

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: isDraggingOverlay
        ? undefined
        : isDragging
        ? "transform 0.25s ease"
        : undefined,
      width: "[30vw]",
      minWidth: "[30vw]",
      height: "8vh",
      minHeight: "8vh",
      zIndex: isDragging ? 100 : "auto",
      opacity: isDraggingOverlay ? 1 : isDragging ? 0 : 1,
    };

    const borderClass = content
      ? ""
      : "border-dashed border-[2.5px] border-[rgba(167,142,207,0.6)]";
    const slotBackgroundColorClass = content
      ? "bg-[#d8bfd8]"
      : "bg-[rgba(216,191,216,0.2)]";

    return (
      <div
        ref={combinedRef}
        style={style}
        {...(content ? attributes : {})}
        {...(content ? listeners : {})}
        className={`
        flex justify-center items-center shrink-0 basis-auto text-center
        ${slotBackgroundColorClass}
        font-['Commissioner'] text-xs sm:text-sm md:text-base font-medium leading-tight text-[#79caef] tracking-[1.82px]
        w-full relative ${borderClass}
        ${content ? "shadow-[2px_4px_10px_0_rgba(167,142,207,0.6)]" : ""}
        ${content ? "cursor-grab" : ""}
      `}
      >
             {" "}
        {content ? (
          <span className="flex w-auto h-auto justify-center items-center p-1 text-wrap break-words text-[rgba(75,0,130,0.6)] font-['Comic_Sans_MS'] text-sm md:text-base font-bold">
                      {content}       {" "}
          </span>
        ) : (
          <span className="flex w-auto h-auto justify-center items-center p-1 text-[rgba(121,202,239,0.9)] text-xs sm:text-sm md:text-base">
                      {text}       {" "}
          </span>
        )}
           {" "}
      </div>
    );
  }
);

const EmptyPlaceholderCardLeft = React.memo(({ id }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <div
      ref={setNodeRef}
      className="flex w-full min-w-[150px] h-[8vh] min-h-[60px] p-1 gap-[10px] justify-center items-center flex-nowrap bg-[rgba(216,191,216,0.2)] border-dashed border-[2.5px] border-[rgba(75,0,130,0.4)] relative"
    />
  );
});

const StaticReviewCard = React.memo(({ content, type }) => {
  const bgColorClass = type === "user" ? "bg-[#d8bfd8]" : "bg-[#e0ffe0]";
  const textColorClass =
    type === "user" ? "text-[rgba(75,0,130,0.6)]" : "text-[rgba(9,190,67,0.8)]";
  const shadowClass = "shadow-[2px_4px_10px_0_rgba(167,142,207,0.6)]";

  return (
    <div
      className={`
        flex justify-center items-center shrink-0 basis-auto text-center
        ${bgColorClass} ${shadowClass} font-['Comic_Sans_MS'] text-sm md:text-base font-bold leading-tight
        w-full min-w-[150px] h-[8vh] min-h-[60px] relative
      `}
    >
           {" "}
      <span
        className={`flex w-auto h-auto justify-center items-center p-1 text-wrap break-words ${textColorClass}`}
      >
                {content || "Empty Slot"}     {" "}
      </span>
         {" "}
    </div>
  );
});

const ReviewItemCard = React.memo(({ cause, userAnswer, correctAnswer }) => {
  const isCorrect =
    userAnswer[0] &&
    userAnswer[0].trim().toLowerCase() === cause.trim().toLowerCase();

  return (
    <div
      className={`main-container flex w-full max-w-[280px] sm:max-w-[256px] h-auto p-2 sm:pt-3 sm:pr-4 sm:pb-3 sm:pl-4 flex-col gap-[6px] justify-center items-start rounded-[15px] relative ${
        isCorrect ? "bg-[#c8ff9e]" : "bg-[#ffdfe0]"
      }`}
    >
           {" "}
      <div className="flex w-full justify-between items-start relative">
               {" "}
        <div className="flex flex-col gap-[4px] sm:gap-[6px] items-start flex-1">
                   {" "}
          <span
            className={`font-['Comic_Neue'] text-sm sm:text-base font-bold leading-tight relative text-left break-words z-[2] ${
              isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"
            }`}
          >
            Fallout: {correctAnswer}
          </span>
                   {" "}
          <div className="flex flex-col gap-[1px] sm:gap-[2px] items-start w-full">
                       {" "}
            <span
              className={`font-['Commissioner'] text-xs sm:text-sm font-light leading-tight relative text-left break-words z-[4] ${
                isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"
              }`}
            >
              Your Action : {userAnswer[0] || "N/A"}
            </span>
                       {" "}
            <span
              className={`font-['Commissioner'] text-xs sm:text-sm font-light leading-tight relative text-left break-words z-[5] ${
                isCorrect ? "text-[#09be43]" : "text-[#ea2b2b]"
              }`}
            >
              Correct Action : {cause}
            </span>
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <div
          className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] shrink-0 bg-contain bg-no-repeat ml-1"
          style={{
            backgroundImage: isCorrect ? "url(/check.png)" : "url(/cancel.png)",
          }}
        />
             {" "}
      </div>
         {" "}
    </div>
  );
});

const TOTAL_TIME_LIMIT = 120;
const TOTAL_PUZZLES_SCORE = matchFalloutData.length * 2;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const MatchFallout = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();
  const { updatePerformance } = usePerformance();
  const navigate = useNavigate();

  const [showStart, setShowStart] = useState(true);
  const [availableCards, setAvailableCards] = useState([]);
  const [sequenceSlotsContent, setSequenceSlotsContent] = useState(
    matchFalloutData.map((item, index) => ({
      id: null,
      slotId: `slot-${index}`,
      text: item.match,
    }))
  );

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_LIMIT);
  const [startTime, setStartTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [userAnswers, setUserAnswers] = useState([]);

  const activeDragItemDataRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleSubmit = useCallback(() => {
    setIsTimerRunning(false);

    let newScore = 0;
    const answersForReview = [];

    sequenceSlotsContent.forEach((item) => {
      const correctMatch = matchFalloutData.find((d) => d.match === item.text);
      const isCorrect = correctMatch && correctMatch.text === item.id;
      if (isCorrect) {
        newScore += 2;
      }
      answersForReview.push({
        cause: correctMatch ? correctMatch.text : "N/A",
        userAnswer: [item.id],
        correctAnswer: item.text,
      });
    });

    setScore(newScore);

    const endTime = Date.now();
    const totalTimeSec = Math.floor((endTime - startTime) / 1000);
    const avgResponseTimeSec = totalTimeSec / matchFalloutData.length;

    const scaledScore = Number(
      ((newScore / TOTAL_PUZZLES_SCORE) * 10).toFixed(2)
    );

    updatePerformance({
      moduleName: "Environment",
      topicName: "ecoDecisionMaker",
      score: scaledScore,
      accuracy: (newScore / TOTAL_PUZZLES_SCORE) * 100,
      avgResponseTimeSec,
      studyTimeMinutes: Math.ceil(totalTimeSec / 60),
      completed: true,
    });

    setUserAnswers(answersForReview);
    setShowResult(true);
  }, [sequenceSlotsContent, startTime, updatePerformance]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showResult && score >= 8) {
      completeEnvirnomentChallenge(1, 1);
    }
  }, [showResult, score]);

  useEffect(() => {
    let timer;
    if (
      !showStart &&
      !showResult &&
      !showReview &&
      isTimerRunning &&
      timeLeft > 0
    ) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && !showResult && !showReview && isTimerRunning) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [
    timeLeft,
    showStart,
    showResult,
    showReview,
    isTimerRunning,
    handleSubmit,
  ]);

  const startGame = () => {
    const shuffledCauses = shuffle(matchFalloutData.map((item) => item.text));
    const shuffledMatches = shuffle(matchFalloutData.map((item) => item.match));

    setAvailableCards(shuffledCauses);
    setSequenceSlotsContent(
      shuffledMatches.map((match, index) => ({
        id: null,
        slotId: `slot-${index}`,
        text: match,
      }))
    );
    setScore(0);
    setTimeLeft(TOTAL_TIME_LIMIT);
    setStartTime(Date.now());
    setShowStart(false);
    setShowResult(false);
    setShowReview(false);
    setUserAnswers([]);
    setIsTimerRunning(true);
  };

  const handleDragStart = (event) => {
    const draggedId = event.active.id;
    setActiveId(draggedId);

    const activeItemContent = availableCards.find((card) => card === draggedId);
    if (activeItemContent) {
      activeDragItemDataRef.current = {
        type: "card",
        content: activeItemContent,
        id: draggedId,
      };
    } else {
      const activeSlot = sequenceSlotsContent.find(
        (slot) => slot.slotId === draggedId
      );
      if (activeSlot && activeSlot.id) {
        activeDragItemDataRef.current = {
          type: "slot",
          content: activeSlot.id,
          slotText: activeSlot.text,
          id: activeSlot.slotId,
        };
      } else {
        activeDragItemDataRef.current = null;
        setActiveId(null);
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);
    activeDragItemDataRef.current = null;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    let newAvailableCards = [...availableCards];
    let newSequenceSlotsContent = [...sequenceSlotsContent];

    const isDraggingFromAvailable = newAvailableCards.includes(activeId);
    const activeSequenceSlot = newSequenceSlotsContent.find(
      (slot) => slot.slotId === activeId
    );
    const isDraggingFromSequence = activeSequenceSlot !== undefined;

    const overSequenceSlotIndex = newSequenceSlotsContent.findIndex(
      (slot) => slot.slotId === overId
    );
    const isOverSequenceSlot = overSequenceSlotIndex !== -1;
    const isOverAvailableCardsArea =
      overId === "available-cards-area" ||
      String(overId).startsWith("available-cards-placeholder");

    let draggedContent = null;
    if (isDraggingFromAvailable) {
      draggedContent = activeId;
    } else if (isDraggingFromSequence) {
      draggedContent = activeSequenceSlot.id;
      if (!draggedContent) return;
    } else {
      return;
    }

    if (isOverSequenceSlot) {
      const targetSlot = newSequenceSlotsContent[overSequenceSlotIndex];
      const cardCurrentlyInTargetSlot = targetSlot.id;

      newSequenceSlotsContent[overSequenceSlotIndex] = {
        ...targetSlot,
        id: draggedContent,
      };

      if (isDraggingFromAvailable) {
        newAvailableCards = newAvailableCards.filter(
          (id) => id !== draggedContent
        );
        if (cardCurrentlyInTargetSlot) {
          newAvailableCards.push(cardCurrentlyInTargetSlot);
        }
      } else if (isDraggingFromSequence) {
        const activeSequenceSlotIndex = newSequenceSlotsContent.findIndex(
          (slot) => slot.slotId === activeId
        );
        if (activeSequenceSlotIndex !== -1) {
          newSequenceSlotsContent[activeSequenceSlotIndex] = {
            ...newSequenceSlotsContent[activeSequenceSlotIndex],
            id: cardCurrentlyInTargetSlot,
          };
        }
      }
    } else if (isOverAvailableCardsArea) {
      if (isDraggingFromSequence) {
        const activeSequenceSlotIndex = newSequenceSlotsContent.findIndex(
          (slot) => slot.slotId === activeId
        );
        if (activeSequenceSlotIndex !== -1) {
          newSequenceSlotsContent[activeSequenceSlotIndex] = {
            ...newSequenceSlotsContent[activeSequenceSlotIndex],
            id: null,
          };
        }
        if (!newAvailableCards.includes(draggedContent)) {
          newAvailableCards.push(draggedContent);
        }
      }
    }

    setAvailableCards(newAvailableCards);
    setSequenceSlotsContent(newSequenceSlotsContent);
  };

  const { setNodeRef: setAvailableCardsAreaRef } = useDroppable({
    id: "available-cards-area",
  });

  const handleBackToLevels = () => navigate(-1);

  const handleReviewGame = () => {
    setShowResult(false);
    setShowReview(true);
  };

  const isSubmitEnabled = sequenceSlotsContent.every(
    (item) => item && item.id !== null
  );

  const progress = ((TOTAL_TIME_LIMIT - timeLeft) / TOTAL_TIME_LIMIT) * 100; // Helper to format MM:SS

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`; // DragOverlay renderer function

  const renderDragOverlayContent = useCallback(() => {
    if (activeId && activeDragItemDataRef.current) {
      const currentDragItem = activeDragItemDataRef.current;
      if (currentDragItem.type === "card") {
        return (
          <DraggableCard
            id={currentDragItem.id}
            content={currentDragItem.content}
            isDraggingOverlay={true}
          />
        );
      } else if (currentDragItem.type === "slot") {
        return (
          <DroppableSequenceSlot
            id={currentDragItem.id}
            content={currentDragItem.content}
            text={currentDragItem.slotText}
            isDraggingOverlay={true}
          />
        );
      }
    }
    return null; // Don't forget dependencies
  }, [activeId]);

  return (
    <div className="min-h-[89vh] flex flex-col justify-evenly items-center bg-white relative overflow-hidden">
           {" "}
      {/* ...START/REVIEW/MAIN GAME/RESULT screens, same as your existing code... */}
            {/* No changes needed here! */}     {" "}
      {/* ...see your provided code block for UI... */}   {" "}
    </div>
  );
};

export default MatchFallout;
