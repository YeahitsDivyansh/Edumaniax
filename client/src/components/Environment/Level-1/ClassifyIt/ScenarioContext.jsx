import React from 'react';

const ScenarioContent = () => {
  return ( 
    <div className="w-[890px] h-80 py-14 bg-green-950 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex justify-center items-start gap-1.5 flex-wrap content-start overflow-hidden">
        <div className="flex justify-start items-center gap-3.5">
            <div className="w-48 h-56 py-6 bg-gray-800/30 rounded-xl inline-flex flex-col justify-start items-center gap-6">
            <img className="w-28 h-28" src="/environmentGameInfo/ClassifyIt/biotic.png" />
            <div className="w-52 inline-flex justify-center items-center">
                <div className="w-96 text-center justify-center text-slate-100 text-2xl font-medium font-['Inter'] leading-relaxed">Natural- Biotic</div>
            </div>
            </div>
            <div className="w-48 h-56 pt-12 pb-6 bg-gray-800/30 rounded-xl inline-flex flex-col justify-start items-center gap-6">
            <img className="w-28 h-24" src="/environmentGameInfo/ClassifyIt/abiotic.png" />
            <div className="w-52 inline-flex justify-center items-center">
                <div className="w-96 text-center justify-center text-slate-100 text-2xl font-medium font-['Inter'] leading-relaxed">Natural- Abiotic</div>
            </div>
            </div>
            <div className="w-48 h-56 pt-10 pb-6 bg-gray-800/30 rounded-xl inline-flex flex-col justify-start items-center gap-6">
            <img className="w-28 h-28" src="/environmentGameInfo/ClassifyIt/human_made.png" />
            <div className="w-52 inline-flex justify-center items-center">
                <div className="w-96 text-center justify-center text-slate-100 text-2xl font-medium font-['Inter'] leading-relaxed">Human-Made</div>
            </div>
            </div>
            <div className="w-48 h-56 py-6 bg-gray-800/30 rounded-xl inline-flex flex-col justify-start items-center gap-6">
            <img className="w-24 h-28" src="/environmentGameInfo/ClassifyIt/social.png" />
            <div className="w-52 inline-flex justify-center items-center">
                <div className="w-96 text-center justify-center text-slate-100 text-3xl font-medium font-['Inter'] leading-relaxed">Social</div>
            </div>
            </div>
        </div>
        <div data-property-1="Default" className="w-[640px] flex justify-center items-center gap-5 flex-wrap content-center" />
    </div>
   );
};

export default ScenarioContent;