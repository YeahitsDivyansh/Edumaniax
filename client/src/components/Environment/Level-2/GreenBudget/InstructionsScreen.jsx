import React from 'react';
import CrossButton from '@/components/icon/GreenBudget/CrossButton';
import ScenarioContent from './ScenarioContent.jsx';

const InstructionsScreen = ({ onStartGame }) => {
  return (
    // Main container to center the pop-up
    <div className="main-container bg-[#0A160E] flex flex-col items-center justify-center min-h-screen w-screen p-4">
      
      {/* Pop-up box with responsive width, height, and padding */}
      <div className="relative w-full max-w-4xl md:w-[75vw] h-auto bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/WxAZj0TxFZ.png)] bg-no-repeat bg-cover flex flex-col items-center py-8 px-4 md:p-8 ">
        
        {/* Cross button with responsive size and position */}
        <div className="absolute w-12 h-12 md:w-16 md:h-16 -top-5 -right-5 md:-top-6 md:-right-8 z-10">
          <CrossButton onClick={onStartGame} />
        </div> 
        
        <h2 className="lilita text-3xl md:text-4xl text-white mb-6">
          How to Play?
        </h2>
        
        {/* Main content area: Stacks on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-8">
          
          {/* Left Column: Instructions & Learning Outcome */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="lilita text-base md:text-lg leading-relaxed text-white">
              <p className="mb-2">You have ₹500 and 3 minutes for each scenario!</p>
              <p className="mb-4">Select 3 items that best support sustainability in school.</p>
              <p className="font-bold">Scoring:</p>
              <ul className="list-none ml-0">
                <li>+5 = All 3 eco-wise</li>
                <li>+2 = 2 sustainable</li>
                <li>0 = Mostly unsustainable</li>
              </ul>
            </div>
            
            {/* Learning Outcome Box */}
            <div className="w-full max-w-sm mt-6 text-white bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/KoaHzD7HnK.png)] bg-cover bg-no-repeat p-4 rounded-lg">
              <span className="lilita text-lg md:text-xl font-normal text-white tracking-wide">
                LEARNING OUTCOME:
              </span>
              <span className="block mt-1 font-sans text-sm md:text-base leading-snug">
                Students experience the trade-offs and unexpected costs of real life.
              </span>
            </div>
          </div>

          {/* Right Column: ScenarioContent Demo */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <ScenarioContent />
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;