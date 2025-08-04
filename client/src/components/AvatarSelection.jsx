import React from "react";
import { Check } from "lucide-react";

/**
 * @param {{ selectedStyle: string, onSelectStyle: (style: string) => void, gender: string }} props
 */
const AvatarSelection = ({ selectedStyle, onSelectStyle, gender }) => {
  // For demo purposes, we'll use different style options based on gender
  // In a real app, you would have actual avatar images here
  const styles =
    gender === "Boy"
      ? ["Casual", "Sporty", "Formal", "Fantasy", "Minimalist", "Playfull"]
      : gender === "Girl"
      ? ["Casual", "Elegant", "Sporty", "Fantasy",  "Minimalist", "Playfull"]
      : ["Casual", "Formal", "Sporty", "Fantasy", "Minimalist", "Playfull"];

  // Map of styles to image URLs (using Pexels placeholder images)
  const styleImages = {
    Casual:
      "/Casual.svg",
    Sporty:
      "/Sporty.svg",
    Formal:
      "/Formal.svg",
    Fantasy:
      "/Fantasy.svg",
    Minimalist:
      "/Minimalist.svg",
    Playfull:
      "/Playfull.svg",
  };

  return (
    <div className="grid grid-cols-3 gap-4 object-contain">
      {styles.map((style) => (
        <div
          key={style}
          onClick={() => onSelectStyle(style)}
          className={`
            cursor-pointer rounded-lg overflow-hidden border-2 
            transition-all duration-200 transform hover:scale-105
            ${
              selectedStyle === style
                ? "border-green-500 shadow-md"
                : "border-gray-200 hover:shadow-md"
            }
          `}
        >
          
          <div
            className={`p-2 text-center ${
              selectedStyle === style ? "bg-green-100" : "bg-gray-50"
            }`}
          >
            <div className="relative flex flex-col items-center justify-center ">
            <img
              src={styleImages[style]}
              alt={style}
              className="w-15 h-15 object-cover"
            />
            
          </div>
            <p
              className={`font-medium text-sm ${
                selectedStyle === style ? "text-black" : "text-black"
              }`}
            >
              {style}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarSelection;
