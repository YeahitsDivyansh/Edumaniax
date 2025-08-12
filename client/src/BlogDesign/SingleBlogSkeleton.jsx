import React from "react";

const SingleBlogSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>

      {/* Meta info */}
      <div className="flex space-x-4 mb-8">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-72 bg-gray-300 rounded-lg mb-8"></div>

      {/* Blog content paragraphs */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-11/12"></div>
        <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-9/12"></div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
