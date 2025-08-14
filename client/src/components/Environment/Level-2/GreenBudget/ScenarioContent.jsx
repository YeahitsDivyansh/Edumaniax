import React, { useState, useEffect } from 'react';

// --- Data for the items, making the code cleaner ---
const items = [
    { name: "Solar Panel", price: "₹350", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/QBE1UCXTVW.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/HCi3Qu79Ro.png" },
    { name: "Plastic Dustbin", price: "₹150", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/7K3HnRS1SW.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/6hkKS8qzd3.png" },
    { name: "Poster Printouts", price: "₹150", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/uYOeyhaVdV.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/sJaFWFFKN6.png" },
    { name: "Packaged Water", price: "₹210", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/rscnAQ1mKy.png", icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/OmSLheBXZe.png" }
];

// A smaller, reusable component for each item
const BudgetItem = ({ item, isHighlighted }) => {
    // Determine styles based on the isHighlighted prop
    const containerClasses = isHighlighted ? 'bg-[#202f36] border-[#5f8428]' : 'bg-[#131f24] border-[#37464f]';
    const priceClasses = isHighlighted ? 'border-[#79b933]' : 'border-[#37464f]';
    const textClasses = isHighlighted ? 'text-[#79b933]' : 'text-[#f1f7fb]';

    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg border shadow-md transition-all duration-300 ${containerClasses}`}>
            {/* Price */}
            <div className={`flex items-center gap-1 p-1 rounded border ${priceClasses}`}>
                <img src={item.icon} alt="" className="w-5 h-5 md:w-4 md:h-4" />
                <span className="font-['Lilita_One'] text-sm md:text-xs text-white">{item.price}</span>
            </div>
            {/* Name */}
            <span className={`flex-1 font-['Inter'] font-medium text-xs  ${textClasses}`}>
                {item.name}
            </span>
            {/* Image */}
            <img src={item.image} alt={item.name} className="w-6 h-6 object-contain" />
        </div>
    );
};


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
        // Main responsive container. Stacks vertically on mobile.
        <div className="w-full h-auto bg-[#00260d] rounded-lg border border-[#f2f4f6] flex flex-col md:flex-row gap-4 p-4">
            
            {/* Left Panel: Item List */}
            <div className="w-full md:w-1/2 bg-[rgba(32,47,54,0.3)] rounded-lg p-4 flex flex-col gap-3">
                {items.map((item, index) => (
                    <BudgetItem 
                        key={item.name}
                        item={item}
                        // The second item (index 1) is the one we animate
                        isHighlighted={index === 1 && isSecondItemSelected}
                    />
                ))}
            </div>

            {/* Right Panel: Description */}
            <div className="w-full md:w-1/2 bg-[rgba(32,47,54,0.3)] rounded-lg p-4 flex items-center justify-center min-h-[150px] md:min-h-0">
                <p className="font-['Inter'] text-base md:text-lg font-medium text-center text-gray-200">
                    Your school wants to reduce its environment footprint. Pick 3 items.
                </p>
            </div>
        </div>
    );
};

export default ScenarioContent;