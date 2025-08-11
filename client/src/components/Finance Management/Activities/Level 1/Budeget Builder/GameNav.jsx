import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const GameNav = ({ heartCount = 4 }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing by default
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBackClick = () => {
    setShowConfirm(true);
  };

  const handleYes = () => {
    navigate("/finance/games");
  };

  const handleNo = () => {
    setShowConfirm(false);
  };

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
    <div className="fixed top-0 left-0 w-full z-50 bg-[#263238] px-4 py-6 flex items-center justify-between shadow-md rounded-none">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/financeGames6to8/bgMusic.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="mt-6 transition active:scale-95 focus:outline-none"
      >
        <img
          src="/financeGames6to8/btn-navigation.svg"
          alt="Back"
          className="h-10 w-auto"
        />
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h2 className="text-lg lilita-one-regular font-semibold mb-4">
              Are you sure you want to leave?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleYes}
                className="bg-red-500 hover:bg-red-600 text-white px-4 lilita-one-regular py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                className="bg-gray-300 lilita-one-regular hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="text-yellow-400 mt-4 py-2 lilita-one-regular text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
        Weekly Budget Challenger
      </h1>

      {/* Right Icons */}
      <div className="flex gap-2 mt-4">
        {/* Life Button */}
        <div className="relative min-w-[70px] h-[31px] mt-2 sm:mt-0 sm:min-w-[90px] sm:h-[40px]">
          {/* Bottom shadow/border effect */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(4.2% 0, 99% 0, 93% 100%, 0% 100%)",
              backgroundColor: "#000", // shadow color
              transform: "translateY(1.5px)", // slightly less for smaller height
            }}
          ></div>

          {/* Main button with thin outline */}
          <div
            className="absolute inset-0 bg-[#232E34] flex items-center justify-center gap-1 sm:gap-2"
            style={{
              clipPath: "polygon(5.5% 0, 99% 0, 93% 100%, 0% 100%)",
              border: "1px solid black",
            }}
          >
            <img
              src="/financeGames6to8/iconHeart.svg"
              alt="Heart"
              className="h-4 w-auto sm:h-5"
            />
            <span className="text-[#FF5A5F] font-bold text-sm sm:text-base">
              {heartCount}
            </span>
          </div>
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className="relative transition active:scale-95 focus:outline-none"
        >
          {/* Base play icon */}
          <img
            src="/financeGames6to8/btnAudio.svg"
            alt="Audio"
            className="h-12 w-auto sm:h-10"
          />

          {/* Pause overlay when muted */}
          {!isPlaying && (
            <img
              src="/financeGames6to8/audio-pause.svg"
              alt="Paused"
              className="absolute inset-0 h-12 w-auto sm:h-10 mx-auto my-auto"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default GameNav;
