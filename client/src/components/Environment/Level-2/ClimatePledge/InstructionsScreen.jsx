import React from 'react';
import CrossButton from '@/components/icon/GreenBudget/CrossButton';
import ScenarioContent from './ScenarioContext';

const InstructionsScreen = ({ onStartGame }) => {
  return (
    // Main container to center the entire pop-up
    <div className="main-container bg-[#0A160E] flex flex-col items-center justify-center h-screen w-screen">
      
      {/* Pop-up box with the background image */}
      <div className="relative w-[75vw] h-[80vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/WxAZj0TxFZ.png)] bg-no-repeat bg-cover flex flex-col items-center pt-[5vh]">
        
        {/* Cross button positioned in the top-right corner */}
        <div className="absolute w-[7vw] h-[7vh] -top-[3vh] -right-[3.5vw] z-[68]">
          <CrossButton onClick={onStartGame} />
        </div> 
        
        {/* "How to Play?" title */}
        <h2 className="lilita text-[30px] -mt-6 text-[#fff] z-[2]">
          How to Play?
        </h2>
        
        {/* Container for the main content area (ScenarioContent and text) */}
        <div className="flex flex-row items-start justify-center w-[85vw] mt-[15vh] gap-[1vw]">
          
          {/* Left column: ScenarioContent */}
          <div className="flex justify-center">
            <ScenarioContent />
          </div>
          
          {/* Right column: Text and learning outcome */}
          <div className="flex flex-col items-center w-[25vw]">
            <span className="lilita text-[15px] font-normal leading-[28px] text-[#fff] text-left">
              Create your own 5-point climate action pledge. Your plan should include:
              <br/>
              • One change at school 
              <br/>
              • One change at home 
              <br/>
              • One energy-saving habit 
              <br/>
              • One waste-reducing habit 
              <br/>
              • One awareness action 
            </span>
            
            {/* Learning Outcome box */}
            <div className="flex flex-col justify-start items-start w-[25vw] text-white bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/KoaHzD7HnK.png)] bg-cover bg-no-repeat mt-[2vh] p-[1vw]">
              <span className="lilita text-[1.2vw] font-normal text-[#fff] tracking-[0.04vw]">
                LEARNING OUTCOME:
              </span>
              <span className="w-full font-['Lilita_One'] text-[0.9vw] font-normal leading-[2vh] text-[#fff] tracking-[0.01vw]">
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