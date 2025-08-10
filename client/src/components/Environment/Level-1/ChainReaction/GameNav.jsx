import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "@/components/icon/GreenBudget/BackButton";
import Vol from "@/components/icon/GreenBudget/Vol.jsx";
import Heart from "@/components/icon/GreenBudget/Heart.jsx";
import bgMusic from "/financeGames6to8/bgMusic.mp3";

// MODIFIED: GameNav now receives timeLeft as a prop
const GameNav = ({ timeLeft }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio logic remains self-contained here
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
    // Attempt to play audio when the component mounts, but muted to allow autoplay.
    // The user can unmute with the button.
    const playAudio = async () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false; // Let's try to play with sound
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay with sound failed. User must interact to enable audio.");
        setIsPlaying(false);
      }
    };
    playAudio();
  }, []);

  // Format the time left into MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-[10.5vh] bg-[#28343A] flex items-center justify-between px-[2vw] z-20 absolute top-0 left-0">
      <audio ref={audioRef} loop src={bgMusic} />
      
      <Link to="/environmental/games" className="transition transform hover:scale-110">
        <BackButton />
      </Link>
      
      <span className="lilita ml-[7vw] [text-shadow:0_6px_0_#000] text-[4vh] md:text-[5vh] text-[#ffcc00] tracking-[0.05vw]">
        Chain Reaction
      </span>
      
      <div className="flex items-center space-x-[1vw]">
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          <Heart />
          <span className="absolute text-white font-bold text-[3vh] lilita tracking-[0.05vw] top-[49%] left-[65%] -translate-x-1/2 -translate-y-1/2">
            {formatTime(timeLeft)}
          </span>
        </div>
        
        <button onClick={toggleAudio} className="transition transform active:scale-95 hover:scale-110">
          <Vol isPlaying={isPlaying} />
        </button>
      </div>
    </div>
  );
};

export default GameNav;