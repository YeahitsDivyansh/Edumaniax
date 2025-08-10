import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameNav = ({ heartCount = 4 }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing by default

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  // Auto-play when component mounts (handle user interaction restriction)
  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay failed, user gesture required.");
        setIsPlaying(false);
      }
    };
    playAudio();
  }, []);

  return (
    <div className="w-full bg-[#263238] px-4 py-6 flex items-center justify-between shadow-md rounded-none -mt-6">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/financeGames6to8/bgMusic.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Left Arrow */}
      <Link to="/finance/games">
        <button className="mt-6 transition active:scale-95 focus:outline-none">
          <img
            src="/financeGames6to8/btn-navigation.svg"
            alt="Back"
            className="h-10 w-auto"
          />
        </button>
      </Link>

      {/* Title */}
      <h1 className="text-yellow-400 mt-4 py-2 lilita-one-regular text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
        Weekly Budget Challenger
      </h1>

      {/* Right Icons */}
      <div className="flex gap-2 mt-4">
        <div className="h-10 px-3 bg-[#232E34] flex items-center justify-center gap-2 shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          <img
            src="/financeGames6to8/iconHeart.svg"
            alt="Heart"
            className="h-5 w-auto"
          />
          <span className="text-[#FF5A5F] font-bold text-base">
            {heartCount}
          </span>
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className="transition active:scale-95 focus:outline-none"
        >
          <img
            src="/financeGames6to8/btnAudio.svg"
            alt="Audio"
            className="h-10 w-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default GameNav;
