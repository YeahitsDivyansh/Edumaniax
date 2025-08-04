import React, { useState, useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LegacyPDF from "./LegacyPDF";
import toast from "react-hot-toast";
import { Sparkles, RefreshCcw, Star, Smile, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const traits = ["Kindness", "Bravery", "Creativity", "Patience", "Honesty"];
const values = ["Justice", "Freedom", "Equality", "Curiosity", "Love"];
const causes = [
  "Climate Action",
  "Mental Health",
  "Education",
  "Animal Rights",
  "Innovation"
];

export default function LegacyBuilder() {
  const { completeSELChallenge } = useSEL();
  const [selected, setSelected] = useState({
    traits: [],
    values: [],
    causes: []
  });
  const [quote, setQuote] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const boardRef = useRef(null);

  const toggleSelect = (type, item) => {
    const updated = [...selected[type]];
    const isSelected = updated.includes(item);

    if (isSelected) {
      setSelected({ ...selected, [type]: updated.filter((i) => i !== item) });
    } else {
      if (updated.length >= 2)
        return toast.error(`You can select up to 2 ${type}.`);
      setSelected({ ...selected, [type]: [...updated, item] });
    }
  };

  const renderChips = (list, type) => (
    <div className="flex flex-wrap gap-3">
      {list.map((item) => (
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          key={item}
          onClick={() => toggleSelect(type, item)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-300 shadow-lg ${selected[type].includes(item)
            ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
            : "bg-white border-2 border-gray-300 text-gray-700"
            }`}
        >
          ✨ {item}
        </motion.button>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 min-h-screen p-6 font-sans"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl p-10 rounded-[40px] border-4 border-dashed border-purple-300"
      >
        <h1 className="text-5xl font-extrabold text-center text-purple-600 mb-4 flex justify-center items-center gap-3 animate__animated animate__rubberBand animate__slower">
          <Wand2 size={36} className="text-pink-400 animate-bounce" />
          <span className="pb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Legacy Builder
          </span>
        </h1>
        <p className="text-center text-lg text-gray-700 mb-8 animate__animated animate__pulse animate__infinite">
          ✨ Choose what makes you awesome and write your magical quote! 🌈
        </p>


        <div className="space-y-8 animate__animated animate__fadeInUp animate__slower">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-pink-500 mb-3 flex items-center gap-2">
              💫 Pick 2 Traits
            </h2>
            {renderChips(traits, "traits")}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-blue-500 mb-3 flex items-center gap-2">
              💖 Pick 2 Values
            </h2>
            {renderChips(values, "values")}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-green-500 mb-3 flex items-center gap-2">
              🌍 Pick 2 Causes
            </h2>
            {renderChips(causes, "causes")}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-purple-600 mb-3 flex items-center gap-2">
              📝 Your Legacy Quote
            </h2>
            <motion.textarea
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              rows={4}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full border-2 border-purple-200 rounded-2xl p-4 text-gray-700 text-md shadow-inner focus:ring-4 focus:ring-purple-200"
              placeholder={`Ex: I will lead with kindness.\nI will fight for what matters.\nI will leave the world better than I found it.`}
            />
          </motion.div>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 p-6 rounded-3xl shadow-inner border-2 border-purple-300"
          ref={boardRef}
        >
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">
            🌟 My Legacy Vision Board
          </h2>
          <div className="text-base text-gray-700 mb-4 leading-relaxed">
            <strong>💫 Traits:</strong> {selected.traits.join(", ") || "None"} <br />
            <strong>💖 Values:</strong> {selected.values.join(", ") || "None"} <br />
            <strong>🌍 Causes:</strong> {selected.causes.join(", ") || "None"}
          </div>
          <div className="whitespace-pre-line text-center text-lg italic text-purple-800 animate-fade-in">
            “{quote || "Your inspiring legacy quote will appear here…"}”
          </div>
        </motion.div>

        <div className="mt-10 text-center flex flex-col items-center gap-4">
          <PDFDownloadLink
            document={
              <LegacyPDF
                traits={selected.traits}
                values={selected.values}
                causes={selected.causes}
                quote={quote}
              />
            }
            fileName="legacy-board.pdf"
            onClick={() => {
              completeSELChallenge(1, 2);
              const endTime = Date.now();
              const durationSec = Math.round((endTime - startTime) / 1000);

              updatePerformance({
                moduleName: "SEL",
                topicName: "selfAwareness",
                score: 10,
                accuracy: 100,
                avgResponseTimeSec: durationSec,
                studyTimeMinutes: Math.ceil(durationSec / 60),
                completed: true,
                
              });
              setStartTime(Date.now());

            }}

          >
            {({ loading }) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105 transform transition-all duration-300 text-white py-3 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl tracking-wide flex items-center gap-2"
              >
                <Sparkles size={20} /> {loading ? "Preparing PDF..." : "Download My Legacy Board"}
              </motion.button>
            )}
          </PDFDownloadLink>

          <motion.button
            whileHover={{ rotate: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelected({ traits: [], values: [], causes: [] });
              setQuote("");
              setStartTime(Date.now());

            }}
            className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 hover:scale-105 transform transition-all duration-300 text-white py-3 px-8 rounded-full text-lg shadow-md tracking-wide flex items-center gap-2"
          >
            <RefreshCcw size={20} /> Reset My Legacy Board
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
