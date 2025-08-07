import React, { useRef, useState, useEffect } from "react";
import bgVid from "/financeGames6to8/bgVid.mp4";
import bgMusic from "/financeGames6to8/bgMusic.mp3";
import btnExit from "/financeGames6to8/btn-exit.svg";
import btnAudio from "/financeGames6to8/btnAudio.svg";
import BottomProgressLoader from "./BottomProgressLoader";
import { Link } from "react-router-dom";

const IntroScreen = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  // Attempt to autoplay on load
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
    <div className="w-full -mt-8 h-screen relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src={bgVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={bgMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Exit Button */}
      <Link
        to="/finance/games"
        className="absolute mt-10 top-4 left-4 w-[120px] h-[48px] sm:w-[160px] sm:h-[64px] md:w-[202px] md:h-[82px] transition transform active:scale-95 z-50"
      >
        <img
          src={btnExit}
          alt="Exit"
          className="w-full h-full object-contain cursor-pointer"
        />
      </Link>

      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="absolute mt-10 top-4 right-4 w-[82px] h-[82px] sm:w-[120px] sm:h-[120px] md:w-[202px] md:h-[82px] transition-transform active:scale-95 z-50"
      >
        <img
          src={btnAudio}
          alt="Audio"
          className="w-full h-full object-contain cursor-pointer"
        />
      </button>

      {/* Center Content */}
      <div className="relative z-10 text-center flex flex-col items-center justify-start sm:justify-center mt-10 sm:mt-0">
        <h1 className="text-5xl mt-14 sm:text-6xl lilita-one-regular text-[#FFE303] font-extrabold drop-shadow-lg mb-2 sm:mb-4">
          The Budgeter
        </h1>
        <h2 className="text-2xl lilita-one-regular sm:text-4xl text-white font-semibold mb-6 sm:mb-10">
          Challenge 1
        </h2>
        <BottomProgressLoader />
      </div>
    </div>
  );
};

export default IntroScreen;
