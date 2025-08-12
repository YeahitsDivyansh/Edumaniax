import React, { useState, useEffect } from 'react';

// Demo data for the animation
const demoPuzzle = {
    cause: "Cutting down trees",
    effects: ["Loss of tree cover", "Soil erosion", "Crop failure and desertification"],
    image: "/environmentGameInfo/ChainReaction/cutdowntrees.png", // Verify this path
};

// Card component with reduced sizes
const Card = ({ content, isVisible = true, isPlaceholder = false }) => (
    <div className={`flex h-[7vh] w-[19vw] items-center self-stretch shrink-0 rounded-[0.83vw] relative transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {isPlaceholder ? (
            <div className="shrink-0 w-full h-full bg-[#131f24] rounded-[0.83vw] border-dashed border-[0.2vh] border-[#37464f]" />
        ) : (
            <>
                <div className="shrink-0 bg-[#131f24] rounded-[0.83vw] border-solid border-[0.1vh] border-[#37464f] absolute inset-[-0.05vh] shadow-[0_0.22vh_0_0_#37464f]" />
                <div className="flex p-[1vw] items-center justify-center grow relative z-[5]">
                    <span className="font-['Inter'] text-[1.8vh] font-medium text-[#f1f7fb] text-center">{content}</span>
                </div>
            </>
        )}
    </div>
);

// Slot component with reduced sizes
const Slot = ({ text, content }) => (
    <div className="flex h-[7vh] w-[19vw] items-center justify-center self-stretch shrink-0 rounded-[0.83vw] relative">
        {content ? (
             <>
                <div className="shrink-0 bg-[#131f24] rounded-[0.83vw] border-solid border-[0.1vh] border-[#37464f] absolute inset-[-0.05vh] shadow-[0_0.22vh_0_0_#37464f]" />
                <div className="flex p-[1vw] items-center justify-center grow relative z-[5]">
                    <span className="font-['Inter'] text-[1.8vh] font-medium text-[#f1f7fb] text-center">{content}</span>
                </div>
            </>
        ) : (
            <>
                <div className="w-full h-full bg-[#131f24] rounded-[0.83vw] border-dashed border-[0.2vh] border-[#37464f]" />
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <span className="font-['Inter'] text-[1.8vh] font-medium text-[#f1f7fb]">{text}</span>
                </div>
            </>
        )}
    </div>
);


const ScenarioContent = () => {
    const [animationState, setAnimationState] = useState('idle');

    useEffect(() => {
        const animationCycle = () => {
            setAnimationState('animating');
            const endTimeout = setTimeout(() => setAnimationState('finished'), 1000);
            const resetTimeout = setTimeout(() => setAnimationState('idle'), 3000);
            return () => {
                clearTimeout(endTimeout);
                clearTimeout(resetTimeout);
            };
        };
        const startTimeout = setTimeout(animationCycle, 500);
        const loopInterval = setInterval(animationCycle, 3500);
        return () => {
            clearTimeout(startTimeout);
            clearInterval(loopInterval);
        };
    }, []);

    const animatedCardContent = demoPuzzle.effects[0];

    return (
        <div className="w-full h-full bg-green-950/50 rounded-lg flex flex-col items-center justify-center p-4">
            <style>
                {`
                @keyframes slide-across {
                    from { transform: translateX(0); }
                    /* Updated calculation for new panel width and gap */
                    to { transform: translateX(calc(21vw + 1.5vw)); }
                }
                .animate-slide {
                    animation: slide-across 1s ease-in-out forwards;
                }
                `}
            </style>

            <div className="flex flex-col items-center gap-[4.5vh]"> {/* Reduced gap */}
                <div className="flex w-full max-w-[70.7vw] justify-center items-start gap-[1.5vw]"> {/* Reduced gap */}
                    
                    {/* Left Panel with reduced sizes */}
                    <div className="flex w-[21vw] h-auto flex-col gap-[2vh] py-[3vh] px-[1vw] justify-center items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                        
                        {/* Wrapper for the animation, with reduced size */}
                        <div className="relative h-[7vh] w-[19vw]">
                            {animationState === 'animating' && (
                                <div className="absolute top-0 left-0 z-10 animate-slide">
                                    <Card content={animatedCardContent} />
                                </div>
                            )}
                            <div className="absolute top-0 left-0">
                                <Card 
                                    content={animatedCardContent} 
                                    isPlaceholder={animationState === 'finished'} 
                                    isVisible={animationState === 'idle'}
                                />
                            </div>
                        </div>

                        <Card content={demoPuzzle.effects[1]} isVisible={true} />
                        <Card content={demoPuzzle.effects[2]} isVisible={true} />
                    </div>

                    {/* Right Panel with reduced sizes */}
                    <div className="flex w-[21vw] h-auto flex-col gap-[2vh] py-[3vh] px-[1vw] justify-center items-center bg-[rgba(32,47,54,0.3)] rounded-[0.83vw] border border-[#37464f]">
                        <Slot 
                            text="1st" 
                            content={animationState === 'finished' ? animatedCardContent : null}
                        />
                        <Slot text="2nd" />
                        <Slot text="3rd" />
                    </div>
                </div>

                {/* Bottom "Cause" section with reduced sizes */}
                <div className="flex items-center justify-center w-auto max-w-[43.5vw] h-[10vh]">
                    <img src={demoPuzzle.image} alt="Cause" className="w-[7vw] h-[10vh] object-contain" />
                    <div className="relative flex items-center">
                        <div className="absolute left-[-0.9vw] top-1/2 -translate-y-1/2 w-[1vw] h-[1.8vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-09/cZcfryFaXc.png)] bg-cover bg-no-repeat" />
                        <div className="flex h-[5.5vh] justify-center items-center bg-[#131f24] rounded-[0.83vw] border-solid border-[0.1vh] border-[#37464f] px-[1.8vw]">
                            <span className="font-['Inter'] text-[2.1vh] font-medium text-[#f1f7fb] text-center">
                                {demoPuzzle.cause}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScenarioContent;