import React from 'react';
import CrossButton from '@/components/icon/GreenBudget/CrossButton';
import ScenarioContent from './ScenarioContext'; // Corrected import name from ScenarioContext

const InstructionsScreen = ({ onStartGame }) => {
  return (
    // Main container to center the pop-up, ensures it works on all screen heights
    <div className="main-container bg-[#0A160E] flex flex-col items-center justify-center min-h-screen w-screen p-4">
      
      {/* Pop-up box with responsive width and height */}
      <div className="relative w-full md:w-[80vw] h-auto md:h-[80vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/WxAZj0TxFZ.png)] bg-no-repeat bg-cover flex flex-col items-center py-8 md:pt-[5vh] rounded-2xl">
        
        {/* Cross button with responsive size and position */}
        <div className="absolute w-12 h-12 md:w-[7vw] md:h-[7vh] -top-5 -right-5 md:-top-[3vh] md:-right-[3.5vw] z-[68]">
          <CrossButton onClick={onStartGame} />
        </div> 
        
        {/* "How to Play?" title with responsive font size and margin */}
        <h2 className="lilita text-3xl md:text-[30px] -mt-2 md:-mt-6 text-[#fff] z-[2]">
          How to Play?
        </h2>
        
        {/* Container for the main content. 
          - Mobile: Stacks vertically (flex-col).
          - Desktop (md): Sits side-by-side (md:flex-row).
        */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full mt-8 md:mt-[15vh] gap-8 md:gap-[1vw] px-4">
          
          {/* Left column: ScenarioContent */}
          <div className="flex justify-center w-full md:w-auto mt-4 md:mt-0">
            <ScenarioContent />
          </div>
          
          {/* Right column: Text and learning outcome */}
          <div className="flex flex-col items-center md:items-start w-full md:w-[25vw]">
            <span className="lilita text-base md:text-[15px] font-normal leading-relaxed md:leading-[28px] text-[#fff] text-center md:text-left">
              You’ll be given a list of 12 words. <br/>Your job is to sort each into one of four categories:
              <br/>
              • Natural–Biotic (living natural elements)
              <br/>
              • Natural–Abiotic (non-living natural elements)
              <br/>
              • Human-Made (built by humans)
              <br/>
              • Social (related to society, rules, or institutions)
            </span>
            
            {/* Learning Outcome box with responsive text */}
            <div className="flex flex-col justify-start items-start w-full md:w-[25vw] text-white bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/KoaHzD7HnK.png)] bg-cover bg-no-repeat mt-6 md:mt-[2vh] p-4 md:p-[1vw]">
              <span className="lilita text-lg md:text-[1.2vw] font-normal text-[#fff] tracking-wide md:tracking-[0.04vw]">
                LEARNING OUTCOME:
              </span>
              <span className="w-full font-['Lilita_One'] text-base md:text-[0.9vw] font-normal leading-snug md:leading-[2vh] text-[#fff] tracking-normal md:tracking-[0.01vw] mt-1">
                You will learn to classify things in your surrounding.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;