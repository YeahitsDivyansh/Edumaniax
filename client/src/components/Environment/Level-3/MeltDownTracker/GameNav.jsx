import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "@/components/icon/GreenBudget/BackButton";
import Vol from "@/components/icon/GreenBudget/Vol.jsx";
import Heart from "@/components/icon/GreenBudget/Heart.jsx";
import bgMusic from "/financeGames6to8/bgMusic.mp3"; 

// --- MODIFIED ---
// The component now accepts `timeLeft` as a prop instead of managing it internally.
const GameNav = ({ timeLeft }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // --- REMOVED ---
  // The state and useEffect for the countdown timer have been moved to MeltdownTracker.jsx

  // Format the time left into MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(1, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

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
    <div className="w-full h-[10.5vh] bg-[#28343A] flex items-center justify-between px-[2vw] relative z-10">
      
      <audio ref={audioRef} loop src={bgMusic} />

      <Link to="/environmental/games" className="transition transform hover:scale-110 opacity-95 hover:opacity-100 ">
        <BackButton />
      </Link>
      
      <span className="lilita [text-shadow:0_6px_0_#000] [text-stroke:1px_black] text-[4vh] md:text-[5vh] text-[#ffcc00] ml-[8vw] tracking-[0.05vw]">
        Meltdown Tracker
      </span>
      
      <div className="flex items-center space-x-[1vw]">
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          <Heart />
          <span className="absolute text-white font-bold text-[3vh] lilita tracking-[0.05vw] top-[49%] left-[65%] -translate-x-1/2 -translate-y-1/2">
            {/* --- MODIFIED --- This now uses the timeLeft prop */}
            {formatTime(timeLeft)}
          </span>
        </div>
        
        <button onClick={toggleAudio} 
          className={`transition transform active:scale-95 hover:scale-110 ${isPlaying ? 'opacity-100' : 'opacity-90'}`}>
          <Vol isPlaying={isPlaying} />
        </button>
      </div>
    </div>
  );
};

export default GameNav;