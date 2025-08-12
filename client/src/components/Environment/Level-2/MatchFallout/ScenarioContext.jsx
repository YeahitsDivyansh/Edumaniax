import React, { useState, useEffect } from 'react';

// --- Data & Config (Simplified to 3 items) ---
const demoItems = [
    { id: "1", cause: "Dumping industrial waste", fallout: "Aquatic animal death" },
    { id: "2", cause: "Plastic usage", fallout: "Wildlife choking" },
    { id: "3", cause: "Over-mining", fallout: "Soil infertility" },
];
const animatedItem = demoItems[0];
const otherItems = demoItems.slice(1);

// --- Animation Timings ---
const ANIMATION_DURATION = 1500; // ms for the slide
const PAUSE_DURATION = 2000;     // ms for the pause after dropping

// --- Reusable UI Components for the Demo ---
const DemoCard = ({ content }) => (
    <div className="flex h-[8vh] w-full items-center justify-center rounded-[0.7vw] relative bg-[#131f24] border-solid border-[0.1vh] border-[#37464f] shadow-[0_0.2vh_0_0_#37464f]">
        <span className="font-['Inter'] text-[1.6vh] font-medium text-white text-center">{content}</span>
    </div>
);

// MODIFIED: Now accepts `isHighlighted` to show the yellow border
const EmptySlot = ({ text, isHighlighted }) => (
    <div className={`flex h-[8vh] w-full items-center justify-center rounded-[0.7vw] relative bg-black/30 border-dashed border-[0.2vh] transition-colors duration-300 ${isHighlighted ? 'border-yellow-400' : 'border-[#37464f]'}`}>
        <span className="font-['Inter'] text-[1.6vh] font-medium text-gray-400 text-center p-2">{text}</span>
    </div>
);

// --- Main Scenario Component ---
const ScenarioContent = () => {
    // A state machine to control the animation phase: 'initial' -> 'dragging' -> 'dropped'
    const [phase, setPhase] = useState('initial');

    useEffect(() => {
        const totalCycleTime = ANIMATION_DURATION + PAUSE_DURATION;

        const runAnimationCycle = () => {
            // Set phase to 'dragging' to start the animation
            setPhase('dragging');

            // After the animation duration, set phase to 'dropped'
            const dropTimer = setTimeout(() => {
                setPhase('dropped');
            }, ANIMATION_DURATION);

            // After the pause, reset to 'initial' for the next loop
            const resetTimer = setTimeout(() => {
                setPhase('initial');
            }, totalCycleTime);
            
            return [dropTimer, resetTimer];
        };
        
        // Use an interval to repeat the entire cycle
        const intervalId = setInterval(runAnimationCycle, totalCycleTime + 500); // Add buffer

        // Clean up all timers when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const getOverlayStyle = () => {
        // This calculates the distance the card needs to travel.
        // It moves 100% of its own column's width, plus the gap between columns.
        const xTranslate = `calc(100% + 2rem)`; // Assumes a gap-8 (2rem) between columns

        return {
            transition: `transform ${ANIMATION_DURATION}ms ease-in-out, opacity 300ms`,
            transform: (phase === 'dragging' || phase === 'dropped') ? `translateX(${xTranslate})` : 'translateX(0)',
            opacity: phase === 'dragging' ? 1 : 0, // Only visible while moving
        };
    };

    return (
        <div className="w-full h-full p-4 bg-green-950/50 rounded-lg flex items-center justify-center">
            {/* The Animation Stage: A relative container for positioning */}
            <div className="w-[45vw] flex justify-between items-start gap-8 relative">
                
                {/* The Animated Overlay: Absolutely positioned relative to the stage */}
                <div style={{ position: 'absolute', width: 'calc(50% - 2rem)', top: '0.5rem', left: '1.5rem', ...getOverlayStyle() }} className="z-50">
                    <DemoCard content={animatedItem.fallout} />
                </div>

                {/* Left Column (w-1/2 ensures it's perfectly half) */}
                <div className="w-1/2 flex flex-col gap-[2vh] p-2 items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                    {/* The static card is hidden when its animated counterpart is active */}
                    {phase === 'initial' ? <DemoCard content={animatedItem.fallout} /> : <EmptySlot />}
                    {otherItems.map(item => <DemoCard key={item.id} content={item.fallout} />)}
                </div>

                {/* Right Column (w-1/2 ensures it's perfectly half) */}
                <div className="w-1/2 flex flex-col gap-[2vh] p-2 items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                    {/* The slot is highlighted during drag and filled after drop */}
                    {phase === 'dropped'
                        ? <DemoCard content={animatedItem.fallout} />
                        : <EmptySlot text={animatedItem.cause} isHighlighted={phase === 'dragging'} />
                    }
                    {otherItems.map(item => <EmptySlot key={item.id} text={item.cause} />)}
                </div>
            </div>
        </div>
    );
};

export default ScenarioContent;