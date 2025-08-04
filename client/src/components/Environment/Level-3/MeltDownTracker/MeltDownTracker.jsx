import React, { useState, useEffect } from "react";
import { useEnvirnoment } from "@/contexts/EnvirnomentContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const data = [
  {
    location: "Maldives",
    impact: "Sea level rise",
    image:
      "https://afar.brightspotcdn.com/dims4/default/5896a05/2147483647/strip/false/crop/3000x2247+0+0/resize/1486x1113!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fb2%2Ff4%2F9a1ebe3f427f8e5eb937f8df8998%2Ftravelguides-maldives-videomediastudioeurope-shutterstock.jpg",
  },
  {
    location: "Arctic",
    impact: "Ice caps melting",
    image:
      "https://d1jyxxz9imt9yb.cloudfront.net/medialib/5649/image/s1300x1300/IMG_9141_reduced.jpg",
  },
  {
    location: "Uttarakhand",
    impact: "Flash floods and landslides",
    image:
      "https://www.easeindiatrip.com/blog/wp-content/uploads/2025/02/Uttarakhand-Reasons-to-Visit.jpg",
  },
  {
    location: "Rajasthan",
    impact: "Drought and desertification",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Thar_Khuri.jpg/330px-Thar_Khuri.jpg",
  },
  {
    location: "Sundarbans",
    impact: "Cyclones and habitat loss",
    image:
      "https://www.sunderbannationalpark.in/wp-content/uploads/2020/02/sunderban-tourism.jpg",
  },
  {
    location: "Amazon Forest",
    impact: "Deforestation & carbon loss",
    image:
      "https://onetreeplanted.org/cdn/shop/articles/amazon-rainforest-facts_751x.jpg?v=1631742424",
  },
  {
    location: "Chennai",
    impact: "Urban flooding",
    image:
      "https://deih43ym53wif.cloudfront.net/large_kapaleeshwarar-tmple-india-chennai-shutterstock_1171245493_44b78953d1.jpeg",
  },
  {
    location: "Antarctica",
    impact: "Melting glaciers",
    image:
      "https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/widen_1600/media/default/0001/22/5232c763b05d537b5eaaf87509844cad98be702f.jpeg",
  },
];

const options = [
  "Sea level rise",
  "Ice caps melting",
  "Flash floods and landslides",
  "Drought and desertification",
  "Cyclones and habitat loss",
  "Deforestation & carbon loss",
  "Urban flooding",
  "Melting glaciers",
];

const resultGifs = {
  perfect: "https://media1.tenor.com/m/V1oCWmxLZYcAAAAd/internin-job.gif",
  great: "https://media.tenor.com/RB2G1B6l9iIAAAAM/the-simpsons-mr-burns.gif",
  okay: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamx5aDBydXYwbHUwMzdsNHpiNnFzb2NhNXoybDd5dGhqeTlwZHU3YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif",
  poor: "https://media.tenor.com/yssbr-JwvCQAAAAM/ponke-ponkesol.gif",
};

const MeltdownTracker = () => {
  const { completeEnvirnomentChallenge } = useEnvirnoment();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());

  useEffect(() => {
    if ((timeLeft <= 0 || currentIndex >= data.length) && score >= 8) {
      completeEnvirnomentChallenge(2, 1); // Challenge 2, Task 1 completed
    }
  }, [timeLeft, currentIndex, score]);


  useEffect(() => {
    if (timeLeft <= 0 || currentIndex >= data.length) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentIndex]);

  useEffect(() => {
    if (timeLeft <= 0 || currentIndex >= data.length) {
      const endTime = Date.now();
      const totalTimeSec = Math.floor((endTime - startTime) / 1000);
      const avgResponseTimeSec = totalTimeSec / data.length;
      const scaledScore = Number(((score / (data.length * 2)) * 10).toFixed(2));

      updatePerformance({
        moduleName: "Environment",
        topicName: "climateAnalyst",
        score: scaledScore,
        accuracy: (score / (data.length * 2)) * 100,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(totalTimeSec / 60),
        completed: score >= 8,
     
      });
      setStartTime(Date.now());
    }
  }, [timeLeft, currentIndex]);


  const handleSubmit = () => {
    if (submitted) return;
    if (selected === data[currentIndex].impact) {
      setScore((s) => s + 2);
    }
    setSubmitted(true);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setSelected("");
      setSubmitted(false);
    }, 1000);
  };

  const restart = () => {
    setCurrentIndex(-1);
    setScore(0);
    setSelected("");
    setSubmitted(false);
    setTimeLeft(120);
    setStartTime(Date.now());
  };

  if (timeLeft <= 0 || currentIndex >= data.length) {
    let resultGif = resultGifs.poor;
    if (score === 16) resultGif = resultGifs.perfect;
    else if (score >= 12) resultGif = resultGifs.great;
    else if (score >= 8) resultGif = resultGifs.okay;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">⏱️ Time's Up!</h2>
        <p className="text-xl mb-4">Your Score: {score} / 16</p>
        <img
          src={resultGif}
          alt="result gif"
          className="w-64 mb-4 rounded-xl"
        />
        <button
          onClick={restart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
        >
          🔁 Play Again
        </button>
      </div>
    );
  }

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-6 text-center">
        <img
          src="https://media2.giphy.com/media/lUuNl5aXQyV8HS8dpn/200.webp"
          alt="intro gif"
          className="w-72 mb-4 rounded-xl"
        />
        <h1 className="text-3xl font-bold mb-2">
          🌍 Challenge 2: Meltdown Tracker
        </h1>
        <p className="text-lg mb-4">
          You’re shown a location. Select the correct climate impact affecting
          that place. You have 2 minutes in total. +2 per correct answer.
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
        >
          🚀 Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">
        🧭 Challenge 2: Meltdown Tracker
      </h1>
      <p className="text-lg mb-2">
        Mark the correct climate impact for:{" "}
        <span className="font-semibold">{data[currentIndex].location}</span>
      </p>
      <img
        src={data[currentIndex].image}
        alt={data[currentIndex].location}
        className="w-64 h-40 object-cover mb-4 rounded-xl"
      />
      <p className="text-md mb-2">
        ⏳ Time Left: <span className="font-bold">{timeLeft}s</span>
      </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`px-4 py-2 rounded-xl border text-left ${selected === opt
              ? "bg-blue-200 border-blue-600"
              : "bg-white border-gray-300"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
        disabled={!selected || submitted}
      >
        ✅ Submit
      </button>
    </div>
  );
};

export default MeltdownTracker;
