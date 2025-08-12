import React from "react";

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const AboutUsSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full">
        <div className="bg-gray-100 w-full">
          <div className="w-full py-8 flex flex-col items-center">
            {/* Top badge */}
            <SkeletonBox className="h-6 w-40 rounded-full mb-4" />

            {/* Heading lines */}
            <SkeletonBox className="h-8 w-60 mb-2" />
            <SkeletonBox className="h-8 w-72 mb-6" />

            {/* Hero cards */}
            <div className="w-[90vw] h-[25vh] md:h-[60vh] grid grid-cols-4 gap-2 md:gap-6 mb-10">
              {[...Array(4)].map((_, i) => (
                <SkeletonBox key={i} className="rounded-3xl w-full h-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-gray-200 px-8 py-12 mb-16">
          <div className="text-center mb-8">
            <SkeletonBox className="h-4 w-3/4 mx-auto mb-2" />
            <SkeletonBox className="h-4 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <SkeletonBox className="h-8 w-20 mb-2" />
                <SkeletonBox className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision section */}
      <section className="px-4 sm:px-8 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row items-center gap-6"
            >
              <SkeletonBox className="w-full lg:w-1/2 h-48 rounded-3xl" />
              <div className="w-full lg:w-1/2 space-y-3">
                <SkeletonBox className="h-6 w-48" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="px-4 sm:px-8 lg:px-30 py-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <SkeletonBox className="h-8 w-72 mx-auto mb-10" />
          {/* Top row */}
          <div className="flex flex-col lg:flex-row gap-4">
            {[...Array(2)].map((_, i) => (
              <SkeletonBox
                key={i}
                className="flex-1 h-48 lg:h-56 rounded-3xl"
              />
            ))}
          </div>
          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonBox key={i} className="h-48 md:h-56 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Team members */}
      <section className="px-6 py-16">
        <SkeletonBox className="h-8 w-80 mx-auto mb-10" />
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
              <SkeletonBox className="w-full h-60 rounded-3xl" />
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-5 w-36" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-6 py-8 sm:py-12 lg:py-16">
        <SkeletonBox className="w-full h-56 rounded-3xl" />
      </section>
    </div>
  );
};

export default AboutUsSkeleton;
