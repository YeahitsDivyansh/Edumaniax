import React from "react";

const HeroSkeleton = () => {
  return (
    <section
      className="-mt-6 text-white py-6 md:py-2 pb-0 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #3F9400 0%, #2C6601 100%)",
      }}
    >
      {/* Vector background skeleton */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-400/20 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Content Skeleton */}
        <div className="max-w-xl space-y-3 mb-8 md:mb-0">
          {/* Breadcrumb skeleton */}
          <div className="bg-black/20 ml-1 mb-7 px-4 py-3 rounded-lg inline-flex items-center space-x-3">
            <div className="h-4 w-4 bg-gray-300 rounded-full shimmer" />
            <div className="h-4 w-16 bg-gray-300 rounded shimmer" />
            <span className="text-white/60">&gt;</span>
            <div className="h-4 w-20 bg-gray-300 rounded shimmer" />
          </div>

          {/* Heading skeleton */}
          <div className="space-y-3">
            <div className="h-6 sm:h-8 md:h-10 w-64 bg-gray-300 rounded shimmer" />
            <div className="h-6 sm:h-8 md:h-10 w-48 bg-gray-300 rounded shimmer" />
          </div>

          {/* Paragraph skeleton */}
          <div className="space-y-2 mt-4">
            <div className="h-4 w-72 bg-gray-300 rounded shimmer" />
            <div className="h-4 w-60 bg-gray-300 rounded shimmer" />
          </div>
        </div>

        {/* Right Image Skeleton */}
        <div className="relative w-full max-w-sm md:max-w-md mt-6 md:mt-0 z-20 md:ml-6 mx-auto md:mx-0 flex items-end">
          <div className="w-full aspect-[4/5] bg-gray-300 rounded-lg shimmer" />
        </div>
      </div>

      {/* Shimmer CSS */}
      <style>
        {`
          .shimmer {
            position: relative;
            overflow: hidden;
          }
          .shimmer::before {
            content: "";
            position: absolute;
            top: 0;
            left: -150px;
            height: 100%;
            width: 150px;
            background: linear-gradient(
              to right,
              rgba(255,255,255,0),
              rgba(255,255,255,0.4),
              rgba(255,255,255,0)
            );
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer {
            100% {
              transform: translateX(300px);
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSkeleton;
