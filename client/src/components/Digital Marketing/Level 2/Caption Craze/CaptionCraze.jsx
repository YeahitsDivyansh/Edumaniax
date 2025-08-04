import { useState } from "react";
import { motion } from "framer-motion";
import SmoothieAvatar from "./SmoothieAnimation";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const captions = {
  "Mango Madness": [
    "⚡Charge up with Mango Madness! 🥭💥 #FruityFuel #MangoMagic",
    "😋 Slurp the sunshine! Mango Madness is here 🌞🍹 #TropicalBlast",
    "Zoom Zoom! It’s Mango Madness time 🚀🥭 #FuelTheFun",
  ],
  "Strawberry Zoom": [
    "🍓 Whoosh! Strawberry Zoom is in the room 💨 #BerrySpeed #YumFuel",
    "⚡Speed meets sweet! Strawberry Zoom for the win 🏁🍓 #ZoomZoomJuice",
    "Zoom to deliciousness with Strawberry Zoom 🚗🍓 #FruityRush #JuicyJourney",
  ],
  "Green Power": [
    "💪 Go green, feel strong! Green Power rocks! 🌿⚡ #SuperSips #GoGreen",
    "🌱 Hulk up with Green Power 💥💚 #LeafItToMe #FuelModeOn",
    "Get your green on! Power up your play 🌿🕹️ #GreenFuel #PlantPower",
  ],
};

const smoothieEmojis = {
  "Mango Madness": "🥭",
  "Strawberry Zoom": "🍓",
  "Green Power": "🌿",
};

const text =
  "You work for a smoothie brand called “FruityFuel” that wants to attract kids and teens. Write an eye-catchy, mouth-watering caption!!!";

const appearingText = text.split(" ");

export default function CaptionCraze() {
  const { completeDMChallenge } = useDM();
  const [challengeCompleted, setChallengeCompleted] = useState(false);


  const [selectedSmoothie, setSelectedSmoothie] = useState("Mango Madness");
  const [userCaption, setUserCaption] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  const handleSubmit = () => {
    if (userCaption.trim() !== "") {
      setSubmitted(true);

      if (!challengeCompleted) {
        completeDMChallenge(1, 0);
        setChallengeCompleted(true);

        const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
        updatePerformance({
          moduleName: "DigitalMarketing",
          topicName: "contentStrategist",
          score: 10,
          accuracy: 100,
          avgResponseTimeSec: timeTakenSec,
          studyTimeMinutes: Math.ceil(timeTakenSec / 60),
          completed: true,

        });
        setStartTime(Date.now());
      }
    }
  };



  return (
    <div className="w-[100%] mx-auto py-5 px-5 min-h-screen">
      <div className="w-full h-full bg-gradient-to-br from-yellow-200 via-pink-100 to-green-200 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center font-bold transition-all duration-500 ease-in-out ring-4 ring-purple-200">
        {!submitted ? (
          <>
            <div className="flex flex-col md:flex-row items-center gap-5">
              <h1 className="text-2xl md:text-4xl lg:text-5xl mb-4 text-purple-700 animate-bounce drop-shadow-lg text-center">
                🎮 Caption Craze
              </h1>
              <SmoothieAvatar className="w-24 h-24 md:w-28 md:h-28 drop-shadow-xl" />
            </div>

            <div className="text-lg md:text-2xl px-4 font-semibold flex flex-wrap  max-w-3xl mb-6 mt-6 text-center justify-center text-purple-800">
              {appearingText.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mr-2  text-purple-700"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {["Mango Madness", "Strawberry Zoom", "Green Power"].map(
                (smoothie) => (
                  <button
                    key={smoothie}
                    onClick={() => setSelectedSmoothie(smoothie)}
                    className={`px-6 py-2 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300 ${selectedSmoothie === smoothie
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white text-purple-600"
                      }`}
                  >
                    {smoothie}
                  </button>
                )
              )}
            </div>

            <textarea
              className="w-full max-w-lg p-4 rounded-2xl border-2 border-purple-300 bg-white shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-300 text-base md:text-lg mb-6 placeholder-purple-400"
              spellCheck={false}
              rows={3}
              placeholder="Type your amazing caption here! 🤩🍓🥭🌿 #HashtagsWelcome"
              value={userCaption}
              onChange={(e) => setUserCaption(e.target.value)}
            />

            <button
              onClick={() => setShowExamples(!showExamples)}
              className="mb-6 px-6 py-2 bg-pink-400 text-md md:text-xl text-white rounded-full hover:bg-pink-500 transition duration-300"
            >
              {showExamples ? "Hide Example Captions" : "See Example Captions"}
            </button>

            {
              showExamples && (
                <div className="grid gap-4 w-full max-w-lg mb-6">
                  {
                    captions[selectedSmoothie].map((caption, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border text-lg border-purple-300 shadow hover:bg-yellow-100 transition-all duration-300"
                      >
                        {caption}
                      </div>
                    ))}
                </div>
              )}

            <button
              onClick={handleSubmit}
              className="mt-4 px-8 py-3 bg-green-400 text-white rounded-full text-md md:text-xl text-center shadow-md hover:scale-105 hover:bg-green-500 transition-all duration-300"
            >
              Submit Caption 🚀
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <h1 className="text-2xl md:text-3xl lg:text-5xl mb-4 text-purple-700 animate-bounce drop-shadow-lg">
                🎮 Caption Craze
              </h1>
              <SmoothieAvatar className="w-24 h-24 md:w-30 md:h-30 drop-shadow-xl" />
            </div>

            <div className="text-5xl mt-10 mb-4 animate-bounce">
              {smoothieEmojis[selectedSmoothie]}
            </div>

            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="text-xl md:text-3xl text-purple-700 p-3 mb-4 drop-shadow-xl"
            >
              🎉 Great caption!
            </motion.h2>

            <p className="text-lg md:text-xl text-gray-800 mb-4">
              Your creativity just fueled {selectedSmoothie} awesomeness!
            </p>

            <p className="italic text-gray-600 max-w-md mx-auto px-4">
              "{userCaption}"
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setUserCaption("");
                setStartTime(Date.now());
              }}
              className="mt-8 px-6 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              Write Another ✍️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
