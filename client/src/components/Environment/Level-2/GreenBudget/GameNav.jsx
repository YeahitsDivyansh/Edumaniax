import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "@/components/icon/GreenBudget/BackButton";
import Vol from "@/components/icon/GreenBudget/Vol.jsx";
import Heart from "@/components/icon/GreenBudget/Heart.jsx";

// Assume bgMusic is available at this path.
import bgMusic from "/financeGames6to8/bgMusic.mp3";

const GameNav = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing by default

  const toggleAudio = () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  useEffect(() => {
    const playAudio = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay failed, user gesture required.");
        setIsPlaying(false);
      }
    };
    playAudio();
  }, []);

  return (
    <div className="w-full h-[10vh] bg-[#28343A] flex items-center justify-between px-[2vw] relative z-10">
      {/* Audio Element */}
      <audio ref={audioRef} loop src={bgMusic} />

      {/* Back Button */}
      <Link
        to="/environmental/games"
        className="transition transform hover:scale-110 opacity-95 hover:opacity-100"
      >
        <BackButton />
      </Link>

      {/* Title */}
      <span className="lilita [text-shadow:0_6px_0_#000] [text-stroke:1px_black] text-[4vh] md:text-[5vh] text-[#ffcc00] ml-[8vw] tracking-[0.05vw]">
        Green Budget
      </span>

      {/* Right Controls */}
      <div className="flex items-center space-x-[1vw]">
        <Heart />
        <button
          onClick={toggleAudio}
          className={`transition transform active:scale-95 hover:scale-110 ${
            isPlaying ? "opacity-100" : "opacity-90"
          }`}
        >
          <Vol isPlaying={isPlaying} />
        </button>
      </div>
    </div>
  );
};

export default GameNav;
