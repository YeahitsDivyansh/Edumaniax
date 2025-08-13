import React, { useState, useEffect } from 'react';

const ScenarioContent = () => {
  // --- Animation Logic ---
  const [isSecondItemSelected, setIsSecondItemSelected] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsSecondItemSelected(prev => !prev);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex w-[47vw] h-[48vh] gap-[1vw] justify-center items-center flex-wrap bg-[#00260d] rounded-[0.5vw] border-solid border border-[#f2f4f6] absolute top-47 right-[33.5vw] translate-x-0 translate-y-[-48.75%] overflow-hidden z-[3]">
      {/* Left Column for Options */}
      <div className="flex w-[21.7vw] h-auto flex-col gap-[1vh] justify-center items-center flex-nowrap bg-[rgba(32,47,54,0.3)] rounded-[0.6vw] relative z-[4] p-[1vw]">
        
        {/* --- Option 1 (was Item 2) --- */}
        <div className="flex items-center self-stretch shrink-0 flex-nowrap bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] relative shadow-[0_0.2vh_0_0_#37464f] z-[17] p-[1vw] min-h-[5vh]">
          {isSecondItemSelected && (
            <div className="shrink-0 bg-[#202f36] rounded-[0.6vw] border-solid border border-[#5f8428] absolute top-[-0.14vh] bottom-[0.1vh] left-[-0.14vw] right-[-0.14vw] shadow-[0_0.2vh_0_0_#5f8428] z-[18]" />
          )}
          <div className="flex flex-col items-center justify-center grow relative z-[23]">
            <span className={`w-full font-['Inter'] text-[0.9vw] font-medium leading-[2.2vh] relative text-center z-[25] whitespace-normal ${isSecondItemSelected ? 'text-[#79b933]' : 'text-[#f1f7fb]'}`}>
              Protest with a placard and ask for a meeting with the principal
            </span>
          </div>
        </div>

        {/* --- Option 2 (was Item 3) --- */}
        <div className="flex items-center self-stretch shrink-0 flex-nowrap bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] relative shadow-[0_0.2vh_0_0_#37464f] z-[27] p-[1vw] min-h-[5vh]">
          <div className="flex flex-col items-center justify-center grow relative z-[33]">
            <span className="w-full font-['Inter'] text-[0.9vw] font-medium leading-[2.7vh] text-[#f1f7fb] relative text-center z-[35] whitespace-normal">
              Say nothing — not your problem
            </span>
          </div>
        </div>

        {/* --- Option 3 (was Item 4) --- */}
        <div className="flex items-center self-stretch shrink-0 flex-nowrap bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] relative shadow-[0_0.2vh_0_0_#37464f] z-[42] p-[1vw] min-h-[5vh]">
          <div className="flex flex-col items-center justify-center grow relative z-[48]">
            <span className="w-full font-['Inter'] text-[0.9vw] font-medium leading-[2.2vh] text-[#f1f7fb] relative text-center z-50 whitespace-normal">
              Suggest vertical parking or carpooling and saving the trees
            </span>
          </div>
        </div>

      </div>

      {/* Right Column for Scenario Description */}
      <div className="flex w-[21.7vw] h-[30.5vh] flex-col justify-center items-center flex-nowrap bg-[rgba(32,47,54,0.3)] rounded-[0.6vw] relative z-[57] p-[1vw]">
        <div className="flex justify-center items-center self-stretch grow">
          <span className="w-full font-['Inter'] text-[0.9vw] font-medium leading-[2.6vh] text-[#f1f7fb] relative text-center z-[61] whitespace-normal">
            Your school is planning to cut down 5 trees to expand parking for teachers’ cars.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioContent;