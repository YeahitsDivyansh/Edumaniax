import React, { useState } from "react";
import axios from "axios";
import BankCard from "./BankCard";
import { useFinance } from "../../../../../contexts/FinanceContext.jsx";
import { usePerformance } from "@/contexts/PerformanceContext"; // for performance


const API_KEY = import.meta.env.VITE_API_KEY;

const upiOptions = ["Google Pay", "PhonePe", "Paytm", "BHIM"];
const banks = [
  {
    id: "A",
    name: "Bank A",
    fee: "₹0/month",
    interest: "3% interest",
    digital: "Basic digital features",
  },
  {
    id: "B",
    name: "Bank B",
    fee: "₹50/month",
    interest: "2.5%",
    digital: "Full digital banking, and free UPI + cashback",
  },
  {
    id: "C",
    name: "Bank C",
    fee: "₹0/month",
    interest: "1% interest",
    digital: "No digital access, Offline services only",
  },
];

const parentAdviceOptions = [
  "Choose digital bank",
  "Avoid fees",
  "Stick to traditional bank",
  "No advice",
];

const reasonOptions = [
  "High interest",
  "Low fee",
  "Supports digital payments",
  "Traditional bank",
  "As per parents' advice",
];

const feedbackMap = {
  // Bank A (Basic digital features, ₹0/month fee, 3% interest)
  "A|Choose digital bank|High interest":
    "Bank A offers a solid 3% interest with basic digital features, matching your parent's advice to choose a digital bank. Good choice for earning and convenience.",
  "A|Choose digital bank|Low fee":
    "Bank A has no monthly fees and basic digital features, aligning well with your parents’ advice and your fees sensitivity.",
  "A|Choose digital bank|Supports digital payments":
    "Bank A has basic digital services, which fits your desire for digital payments and your parents' advice to pick a digital bank. But Bank B would be a better option regarding digital services.",
  "A|Choose digital bank|Traditional bank":
    "Bank A leans digital but with basic features; if you want traditional banking, you might reconsider given your parents' advice.",
  "A|Choose digital bank|As per parents' advice":
    "Following your parents’ digital bank advice, Bank A is a reasonable choice with decent interest and zero fees. If digital services is your top priroty and not the fee, Bank B would be a far better choice.",

  "A|Avoid fees|High interest":
    "Bank A offers a good 3% interest and no fees, so this aligns well with your parents's advice as well as with your low-fees goal.",
  "A|Avoid fees|Low fee":
    "No fees at Bank A matches perfectly with your parent's advice to avoid fees and your preference. Best choice.",
  "A|Avoid fees|Supports digital payments":
    "Bank A offers basic digital features with no fees, a balanced choice for fee-conscious digital users. A very well-balanced choice.",
  "A|Avoid fees|Traditional bank":
    "Bank A is more digital than traditional, which may not perfectly match your parents’ advice but keeps fees low. You may consider Bank C as a better option.",
  "A|Avoid fees|As per parents' advice":
    "Bank A has zero fee. So, it aligns well with your parents’ advice. Perfect choice.",

  "A|Stick to traditional bank|High interest":
    "Bank A has good interest but is more digital than traditional, so this may not fully match your parents' advice. Bank C could be another option for you.",
  "A|Stick to traditional bank|Low fee":
    "Bank A charges no fees but offers only basic digital services — might be a compromise if you want traditional banking.",
  "A|Stick to traditional bank|Supports digital payments":
    "Bank A supports digital payments only in a basic way, which might differ from the traditional focus your parents suggested.",
  "A|Stick to traditional bank|Traditional bank":
    "Bank A is not truly traditional but has benefits like no fees and decent interest. Bank C would be the best option for you.",
  "A|Stick to traditional bank|As per parents' advice":
    "If your parents advised sticking to traditional banks, Bank A may be a partial fit with some modern features. But you should consider Bank C as a potential alternative.",

  "A|No advice|High interest":
    "Bank A’s 3% interest is a strong point if you have no parental advice guiding your choice. It is the best choice for you.",
  "A|No advice|Low fee":
    "Bank A offers zero fees and decent interest, the best option in your case.",
  "A|No advice|Supports digital payments":
    "With basic digital features, Bank A can satisfy digital payment needs without parental input.",
  "A|No advice|Traditional bank":
    "Bank A isn’t fully traditional. You must consider Bank C as an alternative.",
  "A|No advice|As per parents' advice":
    "No parental advice means this choice is based on your own preference. In such a case, Bank A is the go-to option.",

  // Bank B (Full digital banking, ₹50/month fee, 2.5% interest, free UPI + cashback)
  "B|Choose digital bank|High interest":
    "Bank B provides excellent digital features but lower interest. So it is suitable only if you are willing to compromise digital convenience over returns.",
  "B|Choose digital bank|Low fee":
    "With a ₹50 monthly fee, Bank B may not fit the low-fees goal but offers full digital benefits and cashback. Choose only if you are willing to compromise for the fee. Otherwise, Bank A could be a better option.",
  "B|Choose digital bank|Supports digital payments":
    "Bank B is ideal for digital payments and UPI usage, aligning well with your parents’ digital bank advice and your own choice.",
  "B|Choose digital bank|Traditional bank":
    "Bank B is fully digital, so it is well-suited with your parents' advice. However, your choice of a traditional bank is not met. You might wish to reconsider with Bank C as an alternative.",
  "B|Choose digital bank|As per parents' advice":
    "Following your parents' advice, Bank B offers top digital banking but at a monthly fee. But it is the perfect choice regarding digital services ",

  "B|Avoid fees|High interest":
    "Bank B is a bad choice in your case. It charges a high fees and does not give the best interest. Bank A would be a far better opton in this regard.",
  "B|Avoid fees|Low fee":
    "Bank B’s fees could be a drawback despite its cashback and features. Please reconsider with Bank A as an option.",
  "B|Avoid fees|Supports digital payments":
    "Bank B is great for digital payments, but fees may reduce overall value for fee-avoidant users. Bank A offers a far better tradeoff.",
  "B|Avoid fees|Traditional bank":
    "Bank B is a bad choice considering its fees and digital services. Bank C is the best choice with traditional banking and zero fees.",
  "B|Avoid fees|As per parents' advice":
    "If avoiding fees is important, Bank B is not the best fit despite digital perks. Bank A or C would be a better option.",

  "B|Stick to traditional bank|High interest":
    "Bank B is digital-first, so it may conflict with your parents' traditional bank advice.",
  "B|Stick to traditional bank|Low fee":
    "Bank B charges fees and is digital-focused, so it might not match traditional or low-fees preferences.",
  "B|Stick to traditional bank|Supports digital payments":
    "Bank B excels here but may conflict with traditional banking advice.",
  "B|Stick to traditional bank|Traditional bank":
    "Bank B is fully digital and may not be what parents expected for traditional banking.",
  "B|Stick to traditional bank|As per parents' advice":
    "Bank B may not fit traditional advice despite its strong digital features.",

  "B|No advice|High interest":
    "Bank B offers solid digital perks but lower interest and fees, a balanced choice with no external advice.",
  "B|No advice|Low fee":
    "The ₹50 fees might be a drawback, but you get cashback and full digital banking.",
  "B|No advice|Supports digital payments":
    "Excellent choice for digital payments and perks with no parental advice involved.",
  "B|No advice|Traditional bank":
    "Bank B is digital-first, so if you prefer traditional banks, consider this carefully.",
  "B|No advice|As per parents' advice":
    "Without advice, Bank B’s features stand on their own merit.",

  // Bank C (Offline services only, ₹0/month fee, 1% interest)
  "C|Choose digital bank|High interest":
    "Bank C offers low interest and no digital access, so it may not match your parents' digital bank advice.",
  "C|Choose digital bank|Low fee":
    "No fees, but lack of digital access may limit convenience despite parents’ advice to choose digital.",
  "C|Choose digital bank|Supports digital payments":
    "Bank C doesn’t support digital payments, which conflicts with both your reason and your parents’ advice.",
  "C|Choose digital bank|Traditional bank":
    "Bank C is the most traditional bank, but its low interest might be a drawback.",
  "C|Choose digital bank|As per parents' advice":
    "Parents advised digital banking but Bank C lacks digital features; might not be ideal.",

  "C|Avoid fees|High interest":
    "Bank C has no fees but low interest; this is a trade-off worth considering.",
  "C|Avoid fees|Low fee":
    "Perfect for avoiding fees, but note the lack of digital access.",
  "C|Avoid fees|Supports digital payments":
    "Bank C doesn’t support digital payments, so it may not meet your digital needs.",
  "C|Avoid fees|Traditional bank":
    "Good fit if avoiding fees and preferring traditional banking.",
  "C|Avoid fees|As per parents' advice":
    "Avoiding fees fits well here, but lack of digital features might not match parents' advice.",

  "C|Stick to traditional bank|High interest":
    "Bank C fits your parents’ traditional banking advice but offers lower interest.",
  "C|Stick to traditional bank|Low fee":
    "No fees and traditional approach make Bank C a solid choice for your criteria.",
  "C|Stick to traditional bank|Supports digital payments":
    "Bank C lacks digital payments, which may not align with your digital payment preference.",
  "C|Stick to traditional bank|Traditional bank":
    "Bank C is the best match for traditional banking advice and has no fees.",
  "C|Stick to traditional bank|As per parents' advice":
    "Following your parents’ advice, Bank C is traditional and fee-free, though low interest.",

  "C|No advice|High interest":
    "Bank C has the lowest interest but no fees and traditional service, a cautious no-advice pick.",
  "C|No advice|Low fee":
    "No fees make Bank C attractive without parental input, though interest is low.",
  "C|No advice|Supports digital payments":
    "Bank C lacks digital payments, so if you want that, reconsider.",
  "C|No advice|Traditional bank":
    "Bank C is the clear traditional bank option without parental advice.",
  "C|No advice|As per parents' advice":
    "Without advice, Bank C offers safety with traditional services but low interest.",
};

const getManualFeedback = (bank, advice, reason) => {
  const key = `${bank}|${advice}|${reason}`;

  return (
    feedbackMap[key] ||
    "That's a thoughtful choice! Every bank has its pros and cons — make sure it aligns with your needs."
  );
};

function parsePossiblyStringifiedJSON(text) {
  if (typeof text !== "string") return null;

  // Remove triple backticks and optional "json" after them
  text = text.trim();
  if (text.startsWith("```")) {
    text = text
      .replace(/^```(json)?/, "")
      .replace(/```$/, "")
      .trim();
  }

  // Remove single backticks
  if (text.startsWith("`") && text.endsWith("`")) {
    text = text.slice(1, -1).trim();
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}

export default function PickABank() {
  const { completeFinanceChallenge } = useFinance();
  const [selectedBank, setSelectedBank] = useState(null);
  const [upiApp, setUpiApp] = useState("");
  const [parentAdvice, setParentAdvice] = useState("");
  const [reason, setReason] = useState("");
  const [chosenReason, setChosenReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  //for Performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    setLoadingFeedback(true);

    const feedbackText = getManualFeedback(
      selectedBank?.id,
      parentAdvice,
      chosenReason
    );

    console.log(feedbackText);

    setFeedback(feedbackText);
    //for Performance
    const totalTime = (Date.now() - startTime) / 1000; // in seconds
    const studyTimeMinutes = Math.ceil(totalTime / 60);

    // Simple score logic: Bank A (best balance) gets 10, B gets 7, C gets 5
    const scoreMap = { A: 10, B: 7, C: 5 };
    const score = scoreMap[selectedBank.id] ?? 6;

    updatePerformance({
      moduleName: "Finance",
      topicName: "budgetExpert",
      score,
      accuracy: score * 10,
      avgResponseTimeSec: totalTime,
      studyTimeMinutes,
      completed: true,
     
    });
setStartTime(Date.now());
    setTimeout(() => {
      setLoadingFeedback(false);
    }, 1500);

    completeFinanceChallenge(0, 1); //MARK CHALLENGE COMPLETED
  };

  const notAllowed = () => {
    // console.log(selectedBank, parentAdvice, reason);
    if (!selectedBank || !parentAdvice || !chosenReason) {
      return true;
    }

    return false;
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-pink-100 to-yellow-50 p-4"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      {/* Main Content Card */}
      <div className="w-[92%] max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-6 pt-4 flex flex-col items-center rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-purple-700 drop-shadow animate-bounce text-center">
          🎉 You’ve turned 18. Welcome to banking!
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-indigo-600 text-center">
          🏦 Pick Your Bank Simulator
        </h2>

        {!submitted && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
              {banks?.map((bank) => (
                <div
                  key={bank.id}
                  className="transition-transform hover:scale-105"
                >
                  <BankCard
                    bank={bank}
                    onSelect={setSelectedBank}
                    selected={bank.id === selectedBank?.id}
                  />
                </div>
              ))}
            </div>

            {selectedBank && (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl space-y-5 text-lg bg-purple-50/60 p-5 rounded-xl shadow-xl"
              >
                <div>
                  <label className="block font-bold text-indigo-800 mb-1">
                    💳 Which UPI/digital wallet do you use?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {upiOptions.map((upi) => (
                      <label
                        key={upi}
                        className="flex items-center gap-2 bg-fuchsia-200 px-4 py-1.5 rounded-full cursor-pointer hover:bg-fuchsia-300"
                      >
                        <input
                          type="checkbox"
                          value={upi}
                          checked={upiApp === upi}
                          onChange={(e) =>
                            setUpiApp(e.target.checked ? upi : "")
                          }
                        />
                        <span>{upi}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-indigo-800 mb-1">
                    👨‍👩‍👧 Did your parents give you any advice?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {parentAdviceOptions.map((advice) => (
                      <label
                        key={advice}
                        className="flex items-center gap-2 bg-yellow-200 px-4 py-1.5 rounded-full cursor-pointer hover:bg-yellow-300"
                      >
                        <input
                          type="checkbox"
                          value={advice}
                          checked={parentAdvice === advice}
                          onChange={(e) =>
                            setParentAdvice(e.target.checked ? advice : "")
                          }
                        />
                        <span>{advice}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-indigo-800 mb-1">
                    🌟 Why did you choose this bank?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {reasonOptions.map((reason, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 bg-blue-200 px-4 py-1.5 rounded-full cursor-pointer hover:bg-blue-300"
                      >
                        <input
                          type="checkbox"
                          value={reason}
                          checked={chosenReason === reason}
                          onChange={(e) =>
                            setChosenReason(e.target.checked ? reason : "")
                          }
                        />
                        <span>{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={notAllowed()}
                  className={`w-full bg-indigo-500 text-white py-3 px-6 rounded-xl text-xl font-bold transition-all duration-300 ${notAllowed()
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-indigo-600 hover:scale-105"
                    }`}
                >
                  🚀 Submit for Feedback
                </button>
              </form>
            )}
          </>
        )}

        {/* Submission View */}
        {submitted && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md max-w-xl w-full border-2 border-indigo-300">
            <h2 className="text-2xl font-bold mb-3 text-green-700">
              ✅ Your Submission
            </h2>
            <p className="text-xl">
              <strong>🏦 Selected Bank:</strong> {selectedBank.name}
            </p>
            <p className="text-xl">
              <strong>📱 UPI App:</strong> {upiApp}
            </p>
            <p className="text-xl">
              <strong>👪 Parent Advice:</strong> {parentAdvice}
            </p>
            <p className="text-xl">
              <strong>🎯 Your Reason:</strong> {chosenReason}
            </p>

            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
                💬 Feedback:
              </h3>
              {loadingFeedback ? (
                <div className="flex flex-col items-center justify-center my-6">
                  <div className="w-12 h-12 border-4 border-t-purple-500 border-yellow-200 rounded-full animate-spin"></div>
                  <p className="mt-4 text-purple-600 text-2xl font-semibold">
                    Thinking...
                  </p>
                </div>
              ) : (
                <p className="text-xl whitespace-pre-line text-purple-800 font-medium">
                  {feedback}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
