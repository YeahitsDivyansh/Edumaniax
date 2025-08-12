import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSkeleton from "./HeroSkeleton";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate API/data delay
  }, []);

  if (loading) return <HeroSkeleton />;

  return (
    <section
      className="-mt-6 text-white py-6 md:py-2 pb-0 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #3F9400 0%, #2C6601 100%)",
      }}
    >
      {/* Vector background */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <img
          src="/imageForDesign/Vector.png"
          alt="Vector background"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="max-w-xl space-y-3 mb-8 md:mb-0">
          <nav className="text-sm mt-6 -ml-2">
            <div className="bg-black/20 ml-1 mb-7 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2">
              <Link
                to="/"
                className="flex items-center gap-1 text-white hover:underline"
              >
                <img
                  src="/blogDesign/home.svg"
                  alt="Home Icon"
                  className="w-4 h-4"
                />
                <span>Home</span>
              </Link>
              <span className="text-white/60">&gt;</span>
              <Link to="/blogs">
                <span className="text-white">Blogs</span>
              </Link>
            </div>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl sigmar-font font-bold leading-snug sm:leading-tight">
            <div>Discover something new in</div>
            <div className="inline-flex items-center gap-2 -mt-8">
              <span>every blog</span>
              <img
                src="/blogDesign/eyeMoving.gif"
                alt="Eyes"
                className="h-[5.9rem] sm:h-[6.5rem] -ml-3 w-auto -translate-y-[1px]"
              />
            </div>
          </h1>

          <p className="text-white text-sm md:text-base -mt-7 leading-relaxed max-w-xl">
            Fun facts, cool ideas, and easy reads on science, tech, and more —
            perfect for curious kids, teachers and parents learning together.
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-full max-w-sm md:max-w-md mt-6 md:mt-0 z-20 md:ml-6 mx-auto md:mx-0 flex items-end">
          {/* Glow effect */}
          <div className="absolute inset-0 z-0 blur-2xl opacity-30 scale-110 bg-white rounded-full pointer-events-none" />
          <img
            src="/blogDesign/kidsImage.svg"
            alt="Kids reading blogs"
            className="w-full relative z-10 translate-y-0 md:translate-y-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
