import React, { useState, useEffect } from 'react';

const ScenarioContent = () => {
  // --- Animation Logic ---
  // State to track if the second item should be highlighted.
  const [isSecondItemSelected, setIsSecondItemSelected] = useState(false);

  // useEffect to run the animation loop.
  useEffect(() => {
    // This interval will toggle the isSecondItemSelected state every second.
    const intervalId = setInterval(() => {
      setIsSecondItemSelected(prev => !prev);
    }, 1000); // Toggle every 1000ms (1 second)

    // Cleanup function to stop the animation when the component is unmounted.
    return () => clearInterval(intervalId);
  }, []); // The empty array ensures this runs only once.


  return (
    // The entire structure below is your original code.
    // I have only inserted the animation logic where needed.
    <div className="flex w-[47vw] h-[48vh] gap-[1vw] justify-center items-center flex-wrap bg-[#00260d] rounded-[0.5vw] border-solid border border-[#f2f4f6]  absolute top-47 right-[33.5vw] translate-x-0 translate-y-[-48.75%] overflow-hidden z-[3]">
      <div className="flex w-[21.7vw] h-[30.5vh] flex-col gap-[0.5vh] justify-center items-center flex-nowrap bg-[rgba(32,47,54,0.3)] rounded-[0.6vw] relative z-[4]">
        <div className="flex w-[20vw] h-[25.1vh] flex-col gap-[0.5vh] items-start shrink-0 flex-nowrap relative z-[5]">
          <div className="flex flex-col gap-[0.5vh] items-start self-stretch shrink-0 flex-nowrap relative z-[6]">
            
            {/* --- Item 1: Solar Panel (Untouched) --- */}
            <div className="flex pt-[1.3vh] pr-[1.7vw] pb-[1.6vh] pl-[1.7vw] items-center self-stretch shrink-0 flex-nowrap rounded-[0.6vw] relative z-[7]">
              <div className="shrink-0 bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] absolute top-[-0.04vh] bottom-[0.2vh] left-[-0.04vw] right-[-0.04vw] shadow-[0_0.2vh_0_0_#37464f] z-[8]" />
              <div className="flex w-[4.9vw] h-[3vh] pt-[0.4vh] pr-[0.1vw] pb-[0.5vh] pl-[0.1vw] justify-center items-center shrink-0 flex-nowrap rounded-[0.4vw] border-solid border border-[#37464f] relative z-[9]">
                <div className="w-[1.6vw] h-[2.8vh] shrink-0 relative overflow-hidden z-10">
                  <div className="w-[1.3vw] h-[2.4vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/HCi3Qu79Ro.png)] bg-[length:100%_100%] bg-no-repeat relative z-[11] mt-[0.1vh] mr-0 mb-0 ml-[0.1vw]" />
                </div>
                <span className="flex w-[3.0vw] h-[2.1vh] justify-center items-start shrink-0 basis-auto font-['Lilita_One'] text-[1vw] font-normal leading-[2.0vh] text-[#fff] tracking-[-0.01vw] relative text-center uppercase whitespace-nowrap z-[12]">
                  ₹350
                </span>
              </div>
              <div className="flex pt-0 pr-[1.4vw] pb-0 pl-[1.2vw] flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[13]">
                <div className="flex justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[14]">
                  <span className="flex w-[4.9vw] h-[2.7vh] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[0.9vw] font-medium leading-[2.7vh] text-[#f1f7fb] relative text-center whitespace-nowrap z-[15]">
                    Solar Panel
                  </span>
                </div>
              </div>
              <div className="w-[1.3vw] h-[2.4vh] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/QBE1UCXTVW.png)] bg-cover bg-no-repeat relative overflow-hidden z-[16]" />
            </div>

            {/* --- Item 2: Plastic Dustbin (ANIMATED) --- */}
            <div className="flex pt-[1.3vh] pr-[1.7vw] pb-[1.6vh] pl-[1.7vw] items-center self-stretch shrink-0 flex-nowrap bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] relative shadow-[0_0.2vh_0_0_#37464f] z-[17]">
              
              {/* MODIFICATION 1: The highlight border is now rendered conditionally */}
              {isSecondItemSelected && (
                <div className="shrink-0 bg-[#202f36] rounded-[0.6vw] border-solid border border-[#5f8428] absolute top-[-0.14vh] bottom-[0.1vh] left-[-0.14vw] right-[-0.14vw] shadow-[0_0.2vh_0_0_#5f8428] z-[18]" />
              )}

              {/* MODIFICATION 2: The price border color changes based on state */}
              <div className="flex w-[4.9vw] h-[3vh] pt-[0.4vh] pr-[0.1vw] pb-[0.5vh] pl-[0.1vw] justify-center items-center shrink-0 flex-nowrap rounded-[0.4vw] border-solid border relative z-[19]" style={{ borderColor: isSecondItemSelected ? '#79b933' : '#37464f' }}>
                <div className="w-[1.6vw] h-[2.8vh] shrink-0 relative overflow-hidden z-20">
                  <div className="w-[1.3vw] h-[2.4vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/6hkKS8qzd3.png)] bg-[length:100%_100%] bg-no-repeat relative z-[21] mt-[0.1vh] mr-0 mb-0 ml-[0.1vw]" />
                </div>
                <span className="flex w-[3.0vw] h-[2.1vh] justify-center items-start shrink-0 basis-auto font-['Lilita_One'] text-[1vw] font-normal leading-[2.0vh] text-[#fff] tracking-[-0.01vw] relative text-center uppercase whitespace-nowrap z-[22]">
                  ₹150
                </span>
              </div>
              <div className="flex pt-0 pr-[1.4vw] pb-0 pl-[1.2vw] flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[23]">
                <div className="flex justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[24]">

                  {/* MODIFICATION 3: The text color changes based on state */}
                  <span className={`flex w-[6.7vw] h-[2.7vh] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[0.9vw] font-medium leading-[2.7vh] relative text-center whitespace-nowrap z-[25] ${isSecondItemSelected ? 'text-[#79b933]' : 'text-[#f1f7fb]'}`}>
                    Plastic Dustbin
                  </span>

                </div>
              </div>
              <div className="w-[1.3vw] h-[2.4vh] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/7K3HnRS1SW.png)] bg-cover bg-no-repeat relative overflow-hidden z-[26]" />
            </div>

            {/* --- Item 3: Poster Printouts (Untouched) --- */}
            <div className="flex pt-[1.3vh] pr-[1.7vw] pb-[1.6vh] pl-[1.7vw] items-center self-stretch shrink-0 flex-nowrap rounded-[0.6vw] relative z-[27]">
              <div className="shrink-0 bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] absolute top-[-0.04vh] bottom-[0.2vh] left-[-0.04vw] right-[-0.04vw] shadow-[0_0.2vh_0_0_#37464f] z-[28]" />
              <div className="flex w-[4.9vw] h-[3vh] pt-[0.4vh] pr-[0.1vw] pb-[0.5vh] pl-[0.1vw] justify-center items-center shrink-0 flex-nowrap rounded-[0.4vw] border-solid border border-[#37464f] relative z-[29]">
                <div className="w-[1.6vw] h-[2.8vh] shrink-0 relative overflow-hidden z-30">
                  <div className="w-[1.3vw] h-[2.4vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/sJaFWFFKN6.png)] bg-[length:100%_100%] bg-no-repeat relative z-[31] mt-[0.1vh] mr-0 mb-0 ml-[0.1vw]" />
                </div>
                <span className="flex w-[3.0vw] h-[2.1vh] justify-center items-start shrink-0 basis-auto font-['Lilita_One'] text-[1vw] font-normal leading-[2.0vh] text-[#fff] tracking-[-0.01vw] relative text-center uppercase whitespace-nowrap z-[32]">
                  ₹150
                </span>
              </div>
              <div className="flex w-[12vw] pt-0 pr-[1.4vw] pb-0 pl-[1.2vw] flex-col items-end shrink-0 flex-nowrap relative z-[33]">
                <div className="flex justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[34]">
                  <span className="flex w-[7.1vw] h-[2.7vh] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[0.9vw] font-medium leading-[2.7vh] text-[#f1f7fb] relative text-center whitespace-nowrap z-[35]">
                    Poster Printouts
                  </span>
                </div>
              </div>
              <div className="w-[1.4vw] h-[2.6vh] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/uYOeyhaVdV.png)] bg-cover bg-no-repeat relative overflow-hidden z-[41]" />
            </div>

            {/* --- Item 4: Packaged Water (Untouched) --- */}
            <div className="flex pt-[1.3vh] pr-[1.7vw] pb-[1.6vh] pl-[1.7vw] items-center self-stretch shrink-0 flex-nowrap rounded-[0.6vw] relative z-[42]">
                <div className="shrink-0 bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] absolute top-[-0.04vh] bottom-[0.2vh] left-[-0.04vw] right-[-0.04vw] shadow-[0_0.2vh_0_0_#37464f] z-[43]" />
                <div className="flex w-[4.9vw] h-[3vh] pt-[0.4vh] pr-[0.1vw] pb-[0.5vh] pl-[0.1vw] justify-center items-center shrink-0 flex-nowrap rounded-[0.4vw] border-solid border border-[#37464f] relative z-[44]">
                    <div className="w-[1.6vw] h-[2.8vh] shrink-0 relative overflow-hidden z-[45]">
                        <div className="w-[1.3vw] h-[2.4vh] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/OmSLheBXZe.png)] bg-[length:100%_100%] bg-no-repeat relative z-[46] mt-[0.1vh] mr-0 mb-0 ml-[0.1vw]" />
                    </div>
                    <span className="flex w-[3.0vw] h-[2.1vh] justify-center items-start shrink-0 basis-auto font-['Lilita_One'] text-[1vw] font-normal leading-[2.0vh] text-[#fff] tracking-[-0.01vw] relative text-center uppercase whitespace-nowrap z-[47]">
                        ₹210
                    </span>
                </div>
                <div className="flex pt-0 pr-[1.4vw] pb-0 pl-[1.2vw] flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[48]">
                    <div className="flex justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[49]">
                        <span className="flex w-[7.2vw] h-[2.7vh] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[0.9vw] font-medium leading-[2.7vh] text-[#f1f7fb] relative text-center whitespace-nowrap z-50">
                            Packaged Water
                        </span>
                    </div>
                </div>
                <div className="w-[1.3vw] h-[2.4vh] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/rscnAQ1mKy.png)] bg-cover bg-no-repeat relative overflow-hidden z-[56]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[21.7vw] h-[30.5vh] flex-col gap-[0.5vh] items-start flex-nowrap bg-[rgba(32,47,54,0.3)] rounded-[0.6vw] relative z-[57]">
        <div className="flex w-[21.7vw] h-[30.5vh] flex-col gap-[0.5vh] items-start shrink-0 flex-nowrap relative z-[58]">
          <div className="flex h-[30.5vh] pt-0 pr-[1.4vw] pb-0 pl-[1.2vw] flex-col justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[59]">
            <div className="flex justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[60]">
              <span className="flex w-[20.2vw] h-[5.4vh] justify-center items-center grow shrink-0 basis-0 font-['Inter'] text-[0.9vw] font-medium leading-[2.6vh] text-[#f1f7fb] relative text-center z-[61]">
                Your school wants to reduce its environment footprint. Pick 3 items.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioContent;