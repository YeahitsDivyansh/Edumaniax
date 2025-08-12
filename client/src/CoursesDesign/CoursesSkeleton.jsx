import React from "react";

const CoursesSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero / Heading Skeleton */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
        <div className="bg-gray-200 h-8 w-1/3 mx-auto rounded mb-4" />
        <div className="bg-gray-200 h-4 w-2/3 mx-auto rounded" />
      </section>

      {/* Courses Grid Skeleton */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl p-4 space-y-4 shadow-sm"
          >
            <div className="bg-gray-200 h-40 w-full rounded" />{" "}
            {/* Thumbnail */}
            <div className="bg-gray-200 h-5 w-3/4 rounded" /> {/* Title */}
            <div className="bg-gray-200 h-4 w-5/6 rounded" /> {/* Subtitle */}
            <div className="bg-gray-200 h-10 w-24 rounded mt-2" />{" "}
            {/* Button */}
          </div>
        ))}
      </section>

      {/* Bottom CTA Skeleton */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-gray-100 rounded-3xl p-8 space-y-4">
          <div className="bg-gray-200 h-6 w-1/3 rounded" />
          <div className="bg-gray-200 h-4 w-2/3 rounded" />
          <div className="bg-gray-200 h-4 w-1/2 rounded" />
          <div className="bg-gray-200 h-10 w-32 rounded mt-4" />
        </div>
      </section>
    </div>
  );
};

export default CoursesSkeleton;
