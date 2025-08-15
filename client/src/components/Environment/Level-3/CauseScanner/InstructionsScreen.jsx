import React from 'react';
import CrossButton from '@/components/icon/GreenBudget/CrossButton';
import ScenarioContent from './ScenarioContext';

const InstructionsScreen = ({ onStartGame }) => {
  return (
    // Main container: Centers pop-up, allows scrolling on small screens if needed.
    <div className="main-container bg-[#0A160E] flex flex-col items-center justify-center min-h-screen w-screen p-4">
      
      {/* Pop-up box with responsive width, height, and padding */}
      <div className="relative w-full md:w-[75vw] h-auto md:h-[80vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/WxAZj0TxFZ.png)] bg-no-repeat bg-cover flex flex-col items-center py-8 px-4 md:p-8 ">
        
        {/* Cross button with responsive size and position */}
        <div className="absolute w-12 h-12 md:w-[7vw] md:h-[7vh] -top-5 -right-5 md:-top-[3vh] md:-right-[3.5vw] z-10">
          <CrossButton onClick={onStartGame} />
        </div> 
        
        {/* "How to Play?" title with responsive margin and font size */}
        <h2 className="lilita text-3xl md:text-[30px] mb-6 md:mb-0 md:-mt-6 text-[#fff] z-[2]">
          How to Play?
        </h2>
        
        {/* Main content area: Stacks on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full mt-8 md:mt-[15vh] gap-8 md:gap-[1vw]">
          
          {/* Left column: ScenarioContent Demo */}
          <div className="w-full md:w-auto flex justify-center">
            <ScenarioContent />
          </div>
          
          {/* Right column: Instructions & Learning Outcome */}
          <div className="w-full md:w-[25vw] flex flex-col items-center md:items-start text-center md:text-left">
            <span className="lilita text-base md:text-[15px] font-normal leading-relaxed text-white">
              Match the description of the environment zone to its correct name:
              <br/>
              • Lithosphere 
              <br/>
              • Hydrosphere 
              <br/>
              • Biosphere 
              <br/>
              • Atmosphere 
            </span>
            
            {/* Learning Outcome box with responsive text */}
            <div className="w-full max-w-xs md:w-[25vw] text-white bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/KoaHzD7HnK.png)] bg-cover bg-no-repeat mt-6 p-4 rounded-lg">
              <span className="lilita text-lg md:text-[1.2vw] font-normal text-white tracking-wide">
                LEARNING OUTCOME:
              </span>
              <span className="block w-full font-['Lilita_One'] text-base md:text-[0.9vw] font-normal leading-snug text-white mt-1">
                You will learn to classify your surroundings into layers of earth.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;