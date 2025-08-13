import React from 'react';
import CrossButton from '@/components/icon/GreenBudget/CrossButton';
import ScenarioContent from './ScenarioContent.jsx';

const InstructionsScreen = ({ onStartGame }) => {
  return (
    // Add the background color class to the top-level div of this component
    <div className="main-container bg-[#0A160E] relative mx-auto my-0 flex flex-col items-center justify-center h-screen w-screen">
      <div className="h-[7vh] absolute top-15 right-45 z-[68]">
        <CrossButton onClick={onStartGame} />
      </div> 
      <div className="flex flex-row items-center w-[90vw] h-[80vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/WxAZj0TxFZ.png)] bg-[length:100%_100%] bg-no-repeat absolute top-20 right-20 z-[1]">
        <span className=" font-['Lilita_One'] text-[30px] font-normal text-[#fff] relative text-left whitespace-nowrap z-[2] -mt-[73vh] mr-0 mb-0 ml-[38vw]">
          How to Play?{" "}
        </span>
        <div className="flex flex-col w-[70vw] h-[64.5vh] relative z-[65] mt-[128px] mr-0 mb-0 ">
          <div className="flex"><ScenarioContent/></div>
          <div className="flex flex-row">
            <span className="flex w-[50vw] justify-start items-center lilita text-[15px] font-normal leading-[28px] text-[#fff] tracking-[-0.1px] absolute top-5 left-36 text-left overflow-hidden z-[63]">
              For each dilemma, players pick one response. They’re 
              <br />
              then shown the real-world consequence of their action.
              <br />
              Scoring:
              <br />
              +3 → for sustainable, thoughtful action
              <br />
              +1 → for partial awareness but not proactive
              <br />
              0 → for harmful or passive decision
            </span>
            <div className="flex flex-col justify-start items-start w-[20vw] h-[11vh] text-white bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/KoaHzD7HnK.png)] bg-cover bg-no-repeat absolute top-[31vh] left-[9.5vw] z-[65] pt-[0.5vw] px-[1vw]">
              <span className="flex lilita text-[1.2vw] font-normal text-[#fff] tracking-[0.04vw] whitespace-nowrap">
                LEARNING OUTCOME:
              </span>
              <span className="flex w-full font-['Lilita_One'] text-[0.9vw] font-normal leading-[2vh] text-[#fff] tracking-[0.01vw]">
                Students experience the trade-offs and unexpected costs of real life
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;