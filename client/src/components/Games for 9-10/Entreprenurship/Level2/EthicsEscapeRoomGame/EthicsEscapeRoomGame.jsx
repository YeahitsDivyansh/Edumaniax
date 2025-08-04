import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../Level1/LeanMachineGame/Card";
import { Button } from "../../Level1/LeanMachineGame/Button";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const rooms = ["Bias Buster", "Privacy Protector", "Inclusivity Integrator", "Accountability Audit"];

export default function EthicsEscapeRoomGame() {
  const { completeEntreprenerushipChallenge } = useEntrepreneruship();
  const { width, height } = useWindowSize();
  const [draggedItem, setDraggedItem] = useState("");
  const [currentRoom, setCurrentRoom] = useState(0);
  const [roomComplete, setRoomComplete] = useState(false);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [auditFeedback, setAuditFeedback] = useState("");
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if (currentRoom >= rooms.length) {
      completeEntreprenerushipChallenge(1, 1); // Mark challenge complete

      const endTime = Date.now();
      const timeTakenSeconds = Math.floor((endTime - startTime) / 1000);

      updatePerformance({
        moduleName: "Entrepreneurship",
        topicName: "masteringPitch",
        score: 10,
        accuracy: 100,
        avgResponseTimeSec: timeTakenSeconds / rooms.length,
        studyTimeMinutes: Math.round(timeTakenSeconds / 60),
        completed: true,
        
      });
      setStartTime(Date.now());

    }
  }, [currentRoom]);



  const restartGame = () => {
    setAnswers({});
    setCurrentRoom(0);
    setRoomComplete(false);
    setFeedback("");
    setJustification("");
    setStartTime(Date.now());

  };

  const handleAnswer = (room, value) => {
    setAnswers({ ...answers, [room]: value });
  };

  const resetPrivacyPolicy = () => {
    const updatedAnswers = { ...answers };
    updatedAnswers["Privacy Protector"] = [];
    setAnswers(updatedAnswers);
    setFeedback("");
    setRoomComplete(false);
  };

  const correctAuditAnswers = {
    q1: "Design Team",
    q3: "Security Team",
    q4: "UI/UX Team",
    q5: "Customer Support",
    q6: "Data Science Team",
  };

  const checkRoomCompletion = () => {
    if (
      currentRoom === 0 &&
      answers["Bias Buster"]?.["Fair Responses"] === "Balanced Demographics" &&
      answers["Bias Buster"]?.["Sentiment Detection"] === "User Reviews Only" &&
      answers["Bias Buster"]?.["Language Understanding"] === "English-only Data"
    ) {
      setRoomComplete(true);
    }

    else if (currentRoom === 1 && Array.isArray(answers["Privacy Protector"])) {
      const correctClauses = [
        "We collect only data necessary to provide our service.",
        "Users can opt out of data collection at any time.",
        "All user data is encrypted and stored securely.",
      ];

      const selected = answers["Privacy Protector"];
      const hasOnlyCorrect =
        selected.length === correctClauses.length &&
        correctClauses.every(clause => selected.includes(clause));

      if (hasOnlyCorrect) {
        setRoomComplete(true);
        setFeedback("✅ Great! You've included the right privacy clauses.");
      } else {
        setRoomComplete(false);
        setFeedback("❌ Some clauses may violate user privacy. Try again.");
      }
    }

    else if (
      currentRoom === 2 &&
      answers["Inclusivity Integrator"]?.["Color Vision Deficiency"] === "High Contrast Colors" &&
      answers["Inclusivity Integrator"]?.["Hearing Disability"] === "Captions/Subtitles" &&
      answers["Inclusivity Integrator"]?.["Cognitive Impairment"] === "Large Fonts" &&
      answers["Inclusivity Integrator"]?.["Language Barrier"] === "Multilingual Support" &&
      answers["Inclusivity Integrator"]?.["Brightness Sensitivity"] === "Dark Mode" &&
      answers["Inclusivity Integrator"]?.["Low Bandwidth Access"] === "Minimal Animations"
    ) {
      setRoomComplete(true);
    }

    else if (currentRoom === 3) {
      const userAnswers = answers["Accountability Audit"] || {};
      const correctAuditAnswers = {
        q1: "Design Team",
        q3: "Security Team",
        q4: "UI/UX Team",
        q5: "Customer Support",
        q6: "Data Science Team",
      };

      const isCorrect = Object.entries(correctAuditAnswers).every(
        ([key, value]) => userAnswers[key] === value
      );

      if (isCorrect) {
        setRoomComplete(true);
        setAuditFeedback(""); // make sure this matches your feedback state
      } else {
        setRoomComplete(false);
        setAuditFeedback("❌ Oops! One or more answers are incorrect. Try again! 💡");
      }
    }

    else {
      setRoomComplete(false);
      if (currentRoom === 1) {
        setFeedback("❌ Some clauses may violate user privacy. Try again.");
      }
    }
  };

  const nextRoom = () => {
    if (roomComplete) {
      setCurrentRoom(currentRoom + 1);
      setRoomComplete(false);
      setFeedback("");
    }
  };

  const renderRoom = () => {
    switch (currentRoom) {
      case 0:
        return (
          <Card className="bg-blue-50 border-blue-300 border-2 shadow-lg">
            <CardContent className="space-y-3 text-center">
              <h2 className="text-2xl font-bold text-blue-700 animate-bounce">🧠 Bias Buster Challenge</h2>
              <p className="text-sm text-gray-700 animate-pulse">🎯 Drag and drop the dataset onto the correct AI feature:</p>
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-700">📚 Choose a Dataset:</h3>

                  <div className="flex flex-col gap-4">
                    {["Balanced Demographics", "User Reviews Only", "English-only Data"].map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => setDraggedItem(item)}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(0,0,0,0)",
                            "0 0 10px rgba(59,130,246,0.4)",
                            "0 0 20px rgba(59,130,246,0.6)",
                            "0 0 10px rgba(59,130,246,0.4)",
                            "0 0 0px rgba(0,0,0,0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                        className={`w-full text-center px-3 py-3 rounded-xl cursor-grab text-lg font-semibold tracking-wide border-l-8 
        ${i === 0
                            ? "bg-blue-100 text-blue-800 border-blue-400"
                            : i === 1
                              ? "bg-green-100 text-green-800 border-green-400"
                              : "bg-yellow-100 text-yellow-800 border-yellow-400"
                          }`}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>


                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 text-center text-blue-700">🤖 Match Chatbot Features:</h3>
                  {["Language Understanding", "Sentiment Detection", "Fair Responses"].map((target, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const updated = { ...answers["Bias Buster"] } || {};
                        updated[target] = draggedItem;
                        handleAnswer("Bias Buster", updated);
                      }}
                      className="p-4 my-2 min-h-[60px] bg-blue-100 border-4 border-dashed border-blue-400 rounded-xl flex items-center justify-between text-blue-700"
                    >
                      <span className="font-semibold animate-bounce">{target}</span>
                      {answers["Bias Buster"]?.[target] && (
                        <span className="text-xs bg-white px-2 py-1 rounded shadow text-blue-800 animate-bounce">
                          {answers["Bias Buster"][target]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button
                  onClick={checkRoomCompletion}
                  disabled={roomComplete}
                  className={`mt-4 ${roomComplete ? "bg-gray-300 cursor-not-allowed" : "bg-green-400 hover:bg-green-500"} text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200`}
                >
                  🔑 Unlock Next Room
                </Button>


                {roomComplete && (
                  <Button
                    className="ml-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-200"
                    onClick={nextRoom}
                  >
                    ➡️ Go to Next Room
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      case 1:
        const privacyClauses = [
          "We collect only data necessary to provide our service.",
          "We sell user data to trusted partners.",
          "Users can opt out of data collection at any time.",
          "We store user data indefinitely without deletion options.",
          "Users must agree to data tracking to use the app.",
          "Our privacy practices comply with major data protection laws.",
          "All user data is encrypted and stored securely."
        ];

        const selected = answers["Privacy Protector"] || [];

        return (
          <Card className="bg-purple-50 border-2 border-purple-300 shadow-lg text-center">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-extrabold text-purple-700 animate-bounce">🔐 Privacy Protector Mission</h2>
              <p className="text-md text-gray-700 animate-pulse">🧩 Drag the correct clauses into the Privacy Policy box below:</p>

              <div className="flex flex-wrap gap-4 justify-center">

                {privacyClauses.map((clause, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={() => setDraggedItem(clause)}
                    className="w-[250px] h-[140px] p-4 rounded-xl shadow-2xl border-4 border-purple-300 
    bg-gradient-to-br from-pink-200 via-yellow-100 to-purple-200 
    cursor-grab flex items-center justify-center text-center"
                  >
                    <motion.span
                      animate={{
                        y: [0, -4, 0, 4, 0],
                        rotate: [0, 2, -2, 2, 0],
                        textShadow: [
                          "0 0 2px #A855F7",
                          "0 0 4px #D946EF",
                          "0 0 6px #D946EF",
                          "0 0 4px #D946EF",
                          "0 0 2px #A855F7"
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                      className="text-sm font-bold text-purple-900"
                    >
                      {clause}
                    </motion.span>
                  </div>
                ))}

              </div>

              <div
                className="mt-6 p-6 min-h-[180px] border-4 border-dashed border-purple-400 bg-white rounded-xl shadow-inner animate-fade-in text-left"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (!selected.includes(draggedItem)) {
                    handleAnswer("Privacy Protector", [...selected, draggedItem]);
                  }
                }}
              >
                <h3 className="text-lg font-bold text-purple-800 mb-2  ">📝 Privacy Policy Preview</h3>
                <p className="text-sm text-gray-700 mb-2">📣 We value your privacy! Here's how we handle your data:</p>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                  {selected.map((cl, i) => (
                    <li key={i}>{cl}</li>
                  ))}
                </ul>
              </div>

              {feedback && (
                <p className="text-sm mt-2 font-medium text-red-600">{feedback}</p>
              )}

              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {/* Unlock Button */}
                <Button
                  onClick={checkRoomCompletion}
                  disabled={roomComplete}
                  className={`font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200
      ${roomComplete ? "bg-gray-300 cursor-not-allowed text-white" : "bg-green-400 hover:bg-green-500 text-white"}`}
                >
                  🔑 Unlock Next Room
                </Button>

                {/* Reset Button */}
                <Button
                  onClick={resetPrivacyPolicy}
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200"
                >
                  🔄 Reset
                </Button>

                {/* Next Room Button (only visible after completion) */}
                {roomComplete && (
                  <Button
                    onClick={nextRoom}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    ➡️ Go to Next Room
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 border-4 border-pink-200 rounded-3xl shadow-2xl p-4">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-extrabold text-center text-pink-700 animate-bounce">
                📱 Inclusivity Integrator 💡
              </h2>
              <p className="text-md text-center text-gray-700 font-medium">
                🎯 Match the accessibility features to the right user needs to make tech more inclusive!
              </p>

              <div className="flex flex-col sm:flex-row justify-around gap-8">
                {/* Accessibility Features */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-center text-emerald-700">🌟 Accessibility Features</h3>
                  {[
                    { label: "Dark Mode", emoji: "🕶️" },
                    { label: "Minimal Animations", emoji: "🐢" },
                    { label: "Captions/Subtitles", emoji: "🎬" },
                    { label: "Large Fonts", emoji: "🔠" },
                    { label: "Multilingual Support", emoji: "🌍" },
                    { label: "High Contrast Colors", emoji: "🎨" },
                  ].map(({ label, emoji }, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => setDraggedItem(label)}
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="w-full h-[80px] my-2 bg-gradient-to-r from-emerald-50 via-sky-50 to-emerald-50 border border-emerald-200 rounded-xl shadow-md flex items-center justify-center text-center text-sm font-semibold text-sky-800 cursor-grab"
                    >
                      <motion.span
                        animate={{
                          y: [0, -2, 0, 2, 0],
                          textShadow: [
                            "0 0 2px #0ea5e9",
                            "0 0 4px #38bdf8",
                            "0 0 6px #22d3ee",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center gap-3"
                      >
                        {emoji} {label}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>


                {/* User Needs */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-center text-rose-700">👥 User Needs</h3>
                  {[
                    { need: "Color Vision Deficiency", icon: "👁️‍🗨️" },
                    { need: "Hearing Disability", icon: "👂" },
                    { need: "Cognitive Impairment", icon: "🧠" },
                    { need: "Language Barrier", icon: "🗣️" },
                    { need: "Brightness Sensitivity", icon: "🌞" },
                    { need: "Low Bandwidth Access", icon: "📶" },
                  ].map(({ need, icon }, i) => (
                    <motion.div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const updated = { ...answers["Inclusivity Integrator"] } || {};
                        updated[need] = draggedItem;
                        handleAnswer("Inclusivity Integrator", updated);
                      }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="p-4 my-3 min-h-[80px] bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border-4 border-dashed border-rose-300 rounded-xl text-rose-800 font-semibold shadow-lg flex items-center justify-between"
                    >
                      <motion.span
                        animate={{
                          rotate: [0, 2, -2, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-2"
                      >
                        {icon} {need}
                      </motion.span>

                      {answers["Inclusivity Integrator"]?.[need] && (
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                            textShadow: [
                              "0 0 5px #fb7185",
                              "0 0 10px #f43f5e",
                              "0 0 12px #e11d48",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-white text-rose-700 text-xs px-3 py-1 rounded-full shadow"
                        >
                          {answers["Inclusivity Integrator"][need]}
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {feedback && <p className="text-center text-red-600 font-medium text-sm">{feedback}</p>}

              <div className="text-center mt-4">
                <Button
                  onClick={checkRoomCompletion}
                  disabled={roomComplete}
                  className={`mt-4 ${roomComplete ? "bg-gray-300 cursor-not-allowed" : "bg-green-400 hover:bg-green-500"} text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200`}
                >
                  🔑 Unlock Next Room
                </Button>


                {roomComplete && (
                  <Button
                    className="ml-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-200"
                    onClick={nextRoom}
                  >
                    ➡️ Go to Next Room
                  </Button>
                )}
              </div>
            </CardContent>
          </Card >
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-6 bg-gradient-to-br from-pink-50 via-yellow-50 to-sky-50 border-4 border-dashed border-rose-300 shadow-xl rounded-3xl p-6">
              <h2 className="text-3xl font-extrabold text-center text-rose-600 flex items-center justify-center gap-2 animate-bounce">
                🧾✨ Accountability Audit Adventure!
              </h2>

              {[
                { q: "1️⃣ Who is most responsible for ethical design flaws?", key: "q1", options: ["🎮 End User", "📢 Marketing", "🎨 Design Team"] },
                { q: "2️⃣ What team ensures user data is handled securely?", key: "q3", options: ["👥 HR Team", "🛡️ Security Team", "🎨 Design Team"] },
                { q: "3️⃣ Who is responsible for ensuring the app is inclusive?", key: "q4", options: ["🧑‍💻 UI/UX Team", "🧾 Sales Team", "⚖️ Legal Team"] },
                { q: "4️⃣ Who should respond to ethical concerns raised by users?", key: "q5", options: ["📣 Marketing", "💰 Finance", "🙋 Customer Support"] },
                { q: "5️⃣ Who should check for bias in AI outputs?", key: "q6", options: ["📝 Content Team", "📺 PR Team", "📊 Data Science Team"] },
              ].map(({ q, key, options }, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-lg border-l-8 border-rose-300 animate__animated animate__fadeInUp">
                  <p className="text-lg font-semibold text-rose-700 mb-3">{q}</p>
                  {options.map((option, i) => (
                    <label key={i} className="flex items-center gap-2 my-1 text-md text-gray-700 hover:text-rose-500 transition duration-150">
                      <input
                        type="radio"
                        name={key}
                        onChange={() =>
                          handleAnswer("Accountability Audit", {
                            ...answers["Accountability Audit"],
                            [key]: option.replace(/^[^a-zA-Z]+/, ""), // remove emoji from value
                          })
                        }
                        className="accent-rose-500"
                      />
                      <span className="hover:underline font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              ))}

              <div className="text-center">
                {auditFeedback && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-600 font-semibold bg-red-50 border border-red-300 p-3 rounded-lg mt-4"
                  >
                    {auditFeedback}
                  </motion.p>
                )}
                <Button
                  onClick={checkRoomCompletion}
                  disabled={roomComplete}
                  className={`mt-4 ${roomComplete ? "bg-gray-300 cursor-not-allowed" : "bg-green-400 hover:bg-green-500"} text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200`}
                >
                  🔑 Unlock Next Room
                </Button>


                {roomComplete && (
                  <Button
                    className="ml-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-200"
                    onClick={nextRoom}
                  >
                    ➡️ Go to Next Room
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

        );
      default:
        return (
          <>
            <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
            <Card className="bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 border-4 border-green-300 shadow-2xl rounded-3xl p-6 animate__animated animate__fadeInUp">
              <CardContent className="text-center space-y-6">
                <h2 className="text-4xl font-extrabold text-green-700 animate-bounce flex justify-center items-center gap-2">
                  🎉 You Escaped the Ethics Room!
                </h2>
                <p className="text-lg text-gray-700 animate__animated animate__fadeIn delay-300">
                  🌟 Great job solving all dilemmas with ethics, empathy, and integrity!
                </p>
                <div className="text-5xl animate__animated animate__jello animate__delay-1s">
                  🧠 💡 🌈 🏆
                </div>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-yellow-50 to-pink-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 animate-pulse drop-shadow-lg mb-1 pb-2">
        🎮🔐 Ethics Escape Room ! 🧠✨
      </h1>

      <div className="text-center text-base font-bold text-purple-600 animate-fadeInUp">
        🚪✨ You're in <span className="text-yellow-600">Room {currentRoom + 1}</span> – Let’s solve some mysteries! 🕵️‍♂️💡
      </div>
      {renderRoom()}
      <div className="text-center">
        <Button className="bg-yellow-500 text-white mt-2 px-6 py-2 rounded-full hover:bg-yellow-600 transition-all duration-200" onClick={restartGame}>🔁 Restart Game</Button>
      </div>
    </div>
  );
}
