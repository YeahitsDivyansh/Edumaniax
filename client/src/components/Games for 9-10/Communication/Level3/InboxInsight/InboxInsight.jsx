import React, { useState } from "react";
import axios from "axios";
import { useCommunication } from "@/contexts/CommunicationContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const EMAILS = [
    {
        id: 1,
        original: "Hey I won’t come. Tell ma’am.",
        context: "You’re going to be absent from class tomorrow. Ask a friend to inform the teacher and be polite."
    },
    {
        id: 2,
        original: "I need my ID proof signed urgently.",
        context: "You need your college ID proof signed by the coordinator urgently. Write a formal, polite request."
    },
    {
        id: 3,
        original: "Send me the homework file asap.",
        context: "You forgot to write down the homework. Request a classmate to share the file politely."
    }
];

export default function InboxInsightGame() {
    const { completeCommunicationChallenge } = useCommunication();
    const [responses, setResponses] = useState(
        EMAILS.map(() => ({ subject: "", greeting: "", body: "", closing: "" }))
    );
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    //for performance
    const { updatePerformance } = usePerformance();
    const [startTime, setStartTime] = useState(Date.now());
    const APIKEY = import.meta.env.VITE_API_KEY;

    const isAllEmailsFilled = responses.every(
        (res) =>
            res.subject.trim() &&
            res.greeting.trim() &&
            res.body.trim() &&
            res.closing.trim()
    );

    const handleChange = (index, field, value) => {
        const updated = [...responses];
        updated[index][field] = value;
        setResponses(updated);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setFeedback(null);
        try {
            const promptText = responses.map((res, i) => `
Email ${i + 1}:
Subject: ${res.subject}
Greeting: ${res.greeting}
Body: ${res.body}
Closing: ${res.closing}
      `).join("\n");

            const resultPrompt = `Evaluate the student's 3 rewritten emails based on:
- Formal greeting (+2)
- Clear subject (+2)
- Complete body (+2)
- Polite tone & proper closing (+2)

Each email max 8 points. Respond in this raw JSON format:
{
  "email1": "X/8",
  "email2": "X/8",
  "email3": "X/8",
  "tips": "Write some helpful improvement tips.",
  "avatarType": "congratulatory" or "disappointing"
}

Text:
${promptText}`;

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`,
                {
                    contents: [{ parts: [{ text: resultPrompt }] }]
                }
            );
            console.log(response);

            let text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            text = text.replace(/```json|```/g, "").trim();
            const parsedFeedback = JSON.parse(text);
            setFeedback(parsedFeedback);

            const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
            const totalScore =
                Number(parsedFeedback.email1[0]) +
                Number(parsedFeedback.email2[0]) +
                Number(parsedFeedback.email3[0]);

            updatePerformance({
                moduleName: "Communication",
                topicName: "interpersonalSkills",
                score: Math.round((totalScore / 24) * 10),
                accuracy: (totalScore / 24) * 100,
                avgResponseTimeSec: timeTakenSec,
                studyTimeMinutes: Math.ceil(timeTakenSec / 60),
                completed: parsedFeedback.avatarType === "congratulatory",

            });

            setStartTime(Date.now());

            if (parsedFeedback.avatarType === "congratulatory") {
                completeCommunicationChallenge(2, 2);
            }
        } catch (err) {
            console.error("Gemini API Error:", err);
            setFeedback({
                email1: "0/8", email2: "0/8", email3: "0/8",
                tips: "Error in scoring. Try again.", avatarType: "disappointing"
            });
        }
        setLoading(false);
    };

    const handleRestart = () => {
        setResponses(EMAILS.map(() => ({ subject: "", greeting: "", body: "", closing: "" })));
        setFeedback(null);
        setLoading(false);
        setStartTime(Date.now());
    };

    return (
        <div className="max-w-5xl mx-auto my-5 p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-[#FFF9C4] via-[#FFECB3] to-[#F8BBD0] border-4 border-pink-200 relative overflow-hidden">

            {/* Decorative Emojis or SVG Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full opacity-59 pointer-events-none">
                <div className="absolute top-6 left-6 text-6xl">🌈</div>
                <div className="absolute bottom-6 right-10 text-6xl">☁️</div>
                <div className="absolute top-12 right-12 text-6xl">🌟</div>
                <div className="absolute bottom-10 left-10 text-6xl">🦄</div>
            </div>
            <div className="relative z-10">


                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 mb-3 pb-2 animate-pulse">
                    📬✨ Inbox Insight ✨📬
                </h1>

                <p className="text-center text-lg mb-6 text-purple-800 font-medium">
                    📝 Let’s turn messy messages into magical mails with kind words and sparkle! 🌟
                </p>

                {EMAILS.map((email, index) => (
                    <div
                        key={email.id}
                        className="mb-8 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-2xl p-6 shadow-lg border-2 border-purple-300"
                    >
                        <p className="text-sm text-gray-600 mb-1">📨 <span className="font-semibold">Original Message:</span></p>
                        <p className="font-semibold italic text-red-600 text-lg mb-2">“{email.original}”</p>
                        <p className="text-sm text-purple-700 mb-4">🧠 <span className="font-medium">Context:</span> {email.context}</p>

                        <div className="grid gap-4">
                            <label className="text-sm font-semibold text-purple-800">
                                ✉️ Subject Line
                                <input
                                    placeholder="Enter a clear subject"
                                    value={responses[index].subject}
                                    onChange={(e) => handleChange(index, "subject", e.target.value)}
                                    className="mt-1 w-full p-2 rounded-xl border-2 border-yellow-300 bg-white shadow-inner"
                                />
                            </label>

                            <label className="text-sm font-semibold text-purple-800">
                                👋 Greeting
                                <input
                                    placeholder="Enter a polite greeting"
                                    value={responses[index].greeting}
                                    onChange={(e) => handleChange(index, "greeting", e.target.value)}
                                    className="mt-1 w-full p-2 rounded-xl border-2 border-yellow-300 bg-white shadow-inner"
                                />
                            </label>

                            <label className="text-sm font-semibold text-purple-800">
                                📩 Message Body
                                <textarea
                                    rows={3}
                                    placeholder="Write your message here..."
                                    value={responses[index].body}
                                    onChange={(e) => handleChange(index, "body", e.target.value)}
                                    className="mt-1 w-full p-2 rounded-xl border-2 border-yellow-300 bg-white shadow-inner"
                                />
                            </label>

                            <label className="text-sm font-semibold text-purple-800">
                                🙏 Polite Closing
                                <input
                                    placeholder="Enter a kind closing"
                                    value={responses[index].closing}
                                    onChange={(e) => handleChange(index, "closing", e.target.value)}
                                    className="mt-1 w-full p-2 rounded-xl border-2 border-yellow-300 bg-white shadow-inner"
                                />
                            </label>
                        </div>
                    </div>
                ))}

                <div className="text-center mb-6">
                    {!isAllEmailsFilled && (
                        <p className="text-sm text-red-500 mb-2 text-center">
                            ✏️ Please complete all email fields before submitting.
                        </p>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !isAllEmailsFilled}
                        className={`px-6 py-2 rounded-full text-lg shadow ${loading || !isAllEmailsFilled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                    >
                        {loading ? "🔍 Scoring..." : "📮 Submit for Scoring"}
                    </button>
                </div>

                {feedback && (
                    <div className="bg-white rounded-xl p-5 shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-3">
                            {feedback.avatarType === "congratulatory" ? "🎉 Great job!" : "🧐 Needs improvement"}
                        </h2>
                        <p className="text-lg mb-2">
                            ✏️ Scores: Email 1: {feedback.email1}, Email 2: {feedback.email2}, Email 3: {feedback.email3}
                        </p>
                        <p className="text-gray-700 italic">💡 Tips: {feedback.tips}</p>
                        <button
                            onClick={handleRestart}
                            className="mt-4 bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 rounded-full"
                        >
                            🔄 Restart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
