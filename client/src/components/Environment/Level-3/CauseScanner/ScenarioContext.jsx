import React, { useState, useEffect } from 'react';

// --- Data for the items ---
const items = [
    { id: "1", name: "Solar Panel", price: "₹350", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/QBE1UCXTVW.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/HCi3Qu79Ro.png" },
    { id: "2", name: "Plastic Dustbin", price: "₹150", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/7K3HnRS1SW.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/6hkKS8qzd3.png" },
    { id: "3", name: "Poster Printouts", price: "₹150", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/uYOeyhaVdV.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/sJaFWFFKN6.png" },
    { id: "4", name: "Packaged Water", price: "₹210", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/rscnAQ1mKy.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/OmSLheBXZe.png" }
];

// A smaller, reusable component for each item, now fully responsive.
const BudgetItem = ({ item, isHighlighted }) => {
    // Dynamically set classes for the animation
    const highlightClasses = {
        container: isHighlighted ? 'bg-[#202f36] border-[#5f8428]' : 'bg-[#131f24] border-[#37464f]',
        priceBorder: isHighlighted ? 'border-[#79b933]' : 'border-[#37464f]',
        text: isHighlighted ? 'text-[#79b933]' : 'text-[#f1f7fb]',
    };

    return (
        // Base classes for mobile, lg: classes for your original desktop design
        <div className={`flex items-center p-2 rounded-lg border shadow-md relative transition-colors duration-300 ${highlightClasses.container}
            lg:p-0 lg:pt-[1.3vh] lg:pr-[1.7vw] lg:pb-[1.6vh] lg:pl-[1.7vw] lg:rounded-[0.6vw] lg:border-0 lg:shadow-none`}>
            
            {/* This is the original border/shadow element, only shown on desktop */}
            <div className="hidden lg:block shrink-0 bg-[#131f24] rounded-[0.6vw] border-solid border border-[#37464f] absolute top-[-0.04vh] bottom-[0.2vh] left-[-0.04vw] right-[-0.04vw] shadow-[0_0.2vh_0_0_#37464f]" />
            {isHighlighted && <div className="hidden lg:block shrink-0 bg-[#202f36] rounded-[0.6vw] border-solid border border-[#5f8428] absolute top-[-0.14vh] bottom-[0.1vh] left-[-0.14vw] right-[-0.14vw] shadow-[0_0.2vh_0_0_#5f8428]" />}
            
            {/* Price section - MODIFIED to be smaller on mobile */}
            <div className={`flex items-center gap-1 p-1 rounded border relative ${highlightClasses.priceBorder}
                lg:w-[4.9vw] lg:h-[3vh] lg:pt-[0.4vh] lg:pr-[0.1vw] lg:pb-[0.5vh] lg:pl-[0.1vw] lg:rounded-[0.4vw]`}>
                <img src={item.icon} alt="" className="w-4 h-4 lg:w-[1.3vw] lg:h-[2.4vh]" />
                <span className="font-['Lilita_One'] text-xs text-white uppercase lg:text-[1vw]">
                    {item.price}
                </span>
            </div>

            {/* Name section */}
            <div className={`flex-1 text-center px-2 relative ${highlightClasses.text}`}>
                <span className="font-['Inter'] font-medium text-sm lg:text-[0.9vw]">
                    {item.name}
                </span>
            </div>

            {/* Image section */}
            <img src={item.image} alt={item.name} className="w-6 h-6 object-contain relative lg:w-[1.3vw] lg:h-[2.4vh]" />
        </div>
    );
};

const ScenarioContent = () => {
    const [isSecondItemSelected, setIsSecondItemSelected] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => setIsSecondItemSelected(prev => !prev), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        // Responsive container: mobile-first, with lg: prefixes for original desktop styles.
        <div className="w-full h-auto bg-[#00260d] rounded-lg border border-[#f2f4f6] flex flex-col p-4 gap-4 
            lg:w-[47vw] lg:h-[48vh] lg:flex-row lg:flex-wrap lg:gap-[1vw] lg:p-0 lg:justify-center lg:items-center lg:rounded-[0.5vw]">
            
            {/* Left Panel */}
            <div className="w-full bg-[rgba(32,47,54,0.3)] rounded-lg p-2 flex flex-col gap-3
                lg:w-[21.7vw] lg:h-[30.5vh] lg:p-0 lg:justify-center lg:items-center lg:gap-[0.5vh] lg:rounded-[0.6vw]">
                {items.map((item, index) => (
                    <BudgetItem 
                        key={item.id}
                        item={item}
                        isHighlighted={index === 1 && isSecondItemSelected}
                    />
                ))}
            </div>

            {/* Right Panel */}
            <div className="w-full bg-[rgba(32,47,54,0.3)] rounded-lg p-4 flex items-center justify-center min-h-[100px]
                lg:w-[21.7vw] lg:h-[30.5vh] lg:p-0 lg:min-h-0 lg:items-start lg:rounded-[0.6vw]">
                 <p className="font-['Inter'] text-center text-gray-200 text-base
                    lg:w-[20.2vw] lg:h-[5.4vh] lg:text-[0.9vw] lg:leading-[2.6vh] lg:flex lg:items-center lg:justify-center lg:my-auto">
                    Your school wants to reduce its environment footprint. Pick 3 items.
                </p>
            </div>
        </div>
    );
};

export default ScenarioContent;