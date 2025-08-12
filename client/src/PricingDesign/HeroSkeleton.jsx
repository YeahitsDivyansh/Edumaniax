import React from "react";

const HeroSkeleton = () => {
  return (
    <section
      className="text-white -mt-10 py-20 pb-40 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #3F9400 0%, #2C6601 100%)",
      }}
    >
      {/* Light effect placeholder */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <div className="w-72 h-72 sm:w-80 sm:h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center space-y-4 relative z-10">
        {/* Heading placeholders */}
        <div className="skeleton-text h-8 sm:h-12 w-3/4 mb-2"></div>
        <div className="flex items-center justify-center space-x-3">
          <div className="skeleton-text h-8 sm:h-12 w-2/4"></div>
          <div className="skeleton rounded-full h-10 w-10 sm:w-11 sm:h-11"></div>
        </div>

        {/* Subtext placeholder */}
        <div className="skeleton-text h-4 w-5/6 mt-4"></div>
        <div className="skeleton-text h-4 w-2/3"></div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
