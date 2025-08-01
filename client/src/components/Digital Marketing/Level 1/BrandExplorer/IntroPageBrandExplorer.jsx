import React from "react";
import { useNavigate } from "react-router-dom";

const IntroPageBrandExplorer = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/brand-explorer-game");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-200 text-center p-6 pt-12"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      {/* Intro Content */}
      <h1 className="text-3xl  md:text-5xl font-extrabold text-purple-700 mb-4 drop-shadow-lg animate-bounce">
        🧠 Brand Explorer!
      </h1>

      <p className="text-lg md:text-2xl text-gray-800 mb-6 max-w-xl leading-relaxed">
        Welcome, young explorer! 🎒🌟
        <br />
        Your mission: Pick your favorite brands and discover how they talk,
        feel, and express themselves online!
      </p>

      <div className="text-2xl font-semibold text-pink-600 mb-8 animate-caret-blink">
        Ready to start your brand adventure? 🚀
      </div>

      <button
        onClick={handleStart}
        className="bg-purple-600 hover:bg-purple-800 hover:rotate-1 hover:shadow-purple-900 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 shadow-xl"
      >
        Start Game 🎮
      </button>
    </div>
  );
};

export default IntroPageBrandExplorer;
