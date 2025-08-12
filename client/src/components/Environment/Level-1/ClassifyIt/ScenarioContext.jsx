import React, { useState, useEffect } from 'react';

// Card data remains the same
const categories = [
  { name: "Natural–Biotic", image: "/environmentGameInfo/ClassifyIt/biotic.png" },
  { name: "Natural–Abiotic", image: "/environmentGameInfo/ClassifyIt/abiotic.png" },
  { name: "Human-Made", image: "/environmentGameInfo/ClassifyIt/human_made.png" },
  { name: "Social", image: "/environmentGameInfo/ClassifyIt/social.png" },
];

const SELECTED_DURATION_MS = 1000; // 1 second
const PAUSE_BETWEEN_CYCLES_MS = 1500; // 1.5 seconds

const ANIMATED_CARD_INDEX = 0;

const ScenarioContent = () => {
  // State to track the INDEX of the selected card.
  const [selectedIndex, setSelectedIndex] = useState(null);

  // useEffect hook to run the animation logic.
  useEffect(() => {
    let timer;

    // This function now animates only one card repeatedly.
    const animateOneCard = () => {
      // Step A: Select the specified card
      setSelectedIndex(ANIMATED_CARD_INDEX);

      // Step B: Set a timer to deselect the card after a duration
      timer = setTimeout(() => {
        setSelectedIndex(null); // Deselect the card

        // Step C: Set another timer to pause, then repeat the whole animation
        timer = setTimeout(() => {
          animateOneCard();
        }, PAUSE_BETWEEN_CYCLES_MS);

      }, SELECTED_DURATION_MS);
    };

    // Start the animation cycle
    animateOneCard();

    // Cleanup function to stop the timer if the component is unmounted
    return () => {
      clearTimeout(timer);
    };
  }, []); // The empty array `[]` ensures this effect runs only once.

  return (
    <div
      className="w-[46.354vw] h-[35vh] py-[7vh] px-[1vw] bg-green-950 rounded-[0.521vw] outline outline-[0.052vw] outline-offset-[-0.052vw] outline-gray-100 flex justify-center items-start"
    >
      <div className="flex justify-start items-center gap-[0.729vw]">
        {categories.map((cat, index) => {
          // Check if the current card's index matches the selectedIndex from our state
          const isSelected = selectedIndex === index;

          return (
            <div
              key={cat.name}
              className={`
                w-[10.5vw] h-[22vh] py-[1.5vh] bg-gray-800/30 rounded-[0.521vw] 
                inline-flex flex-col justify-start items-center gap-[1.563vh]
                transition-all duration-300 ease-in-out
                border-2
                ${isSelected ? 'scale-105 border-green-500' : 'border-transparent'}
              `}
            >
              <img 
                className="w-[6vw] h-[14vh] object-contain" 
                src={cat.image} 
                alt={cat.name} 
              />
              <div className="w-[13.542vw] inline-flex justify-center items-center">
                <div className="text-center justify-center text-slate-100 text-[1vw] leading-[1.042vw]">
                  {cat.name.replace('–', '- ')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioContent;