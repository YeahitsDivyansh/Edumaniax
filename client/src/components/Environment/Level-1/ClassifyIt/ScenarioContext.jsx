import React from 'react';

const ScenarioContent = () => {

  return (
    <div
      className="w-[46.354vw] h-[35vh] py-[7vh] px-[1vw] bg-green-950 rounded-[0.521vw] outline outline-[0.052vw] outline-offset-[-0.052vw] outline-gray-100 inline-flex justify-start items-start gap-[0.078vw] flex-wrap content-start overflow-hidden"
    >
      <div className="flex justify-start items-center gap-[0.729vw]">
        <div className="w-[10.5vw] h-[22vh] py-[1.5vh] bg-gray-800/30 rounded-[0.521vw] inline-flex flex-col justify-start items-center gap-[1.563vh]">
          <img className="w-[6vw] h-[14vh]" src="/environmentGameInfo/ClassifyIt/biotic.png" alt="Biotic" />
          <div className="w-[13.542vw] inline-flex justify-center items-center">
            <div className="w-[20.833vw] text-center justify-center text-slate-100 text-[1vw]  leading-[1.042vw]">
              Natural- Biotic
            </div>
          </div>
        </div>
        <div className="w-[10.5vw] h-[22vh] py-[1.5vh]  bg-gray-800/30 rounded-[0.521vw] inline-flex flex-col justify-start items-center gap-[1.563vh]">
          <img className="w-[6vw] h-[14vh]" src="/environmentGameInfo/ClassifyIt/abiotic.png" alt="Abiotic" />
          <div className="w-[13.542vw] inline-flex justify-center items-center">
            <div className="w-[20.833vw] text-center justify-center text-slate-100 text-[1vw]  leading-[1.042vw]">
              Natural- Abiotic
            </div>
          </div>
        </div>
        <div className="w-[10.5vw] h-[22vh] py-[1.5vh]  bg-gray-800/30 rounded-[0.521vw] inline-flex flex-col justify-start items-center gap-[1.563vh]">
          <img className="w-[6vw] h-[14vh]" src="/environmentGameInfo/ClassifyIt/human_made.png" alt="Human-Made" />
          <div className="w-[13.542vw] inline-flex justify-center items-center">
            <div className="w-[20.833vw] text-center justify-center text-slate-100 text-[1vw]  leading-[1.042vw]">
              Human-Made
            </div>
          </div>
        </div>
        <div className="w-[10.5vw] h-[22vh] py-[1.5vh] bg-gray-800/30 rounded-[0.521vw] inline-flex flex-col justify-start items-center gap-[1.563vh]">
          <img className="w-[7vw] h-[14vh]" src="/environmentGameInfo/ClassifyIt/social.png" alt="Social" />
          <div className="w-[13.542vw] inline-flex justify-center items-center">
            <div className="w-[20.833vw] text-center justify-center text-slate-100 text-[1vw]  leading-[1.563vw]">
              Social
            </div>
          </div>
        </div>
      </div>
      <div data-property-1="Default" className="w-[33.333vw] flex justify-center items-center gap-[1.042vw] flex-wrap content-center" />
    </div>
  );
};

export default ScenarioContent;