import React from "react";

const PricingSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white shadow-xl rounded-3xl p-6 border flex flex-col"
        >
          {/* Title */}
          <div className="skeleton-text h-6 w-28 mb-3"></div>

          {/* Description */}
          <div className="skeleton h-4 w-full mb-2"></div>
          <div className="skeleton h-4 w-5/6 mb-4"></div>

          {/* Price */}
          <div className="skeleton h-8 w-20 mb-1"></div>
          <div className="skeleton h-3 w-16 mb-4"></div>

          {/* Features */}
          <div className="flex-1 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-3 w-5/6"></div>
            ))}
          </div>

          {/* Button */}
          <div className="skeleton h-10 w-full mt-4 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default PricingSkeleton;
