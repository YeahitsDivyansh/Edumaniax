import React, { useState, useEffect } from "react";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const questions = [
  {
    text: "Helping pick up books",
    gif: "https://media.tenor.com/jNrWl0aO-wgAAAAM/books-here-are-the-books.gif",
    answer: "Kind",
  },
  {
    text: "Eye rolling during a presentation",
    gif: "https://media.tenor.com/A2DB1HknjCsAAAAM/zendaya-look-away.gif",
    answer: "Unkind",
  },
  {
    text: "Sharing your snack",
    gif: "https://media.tenor.com/z9JR4iptt4YAAAAM/chainsaw-man-denji.gif",
    answer: "Kind",
  },
  {
    text: "Talking behind someone's back",
    gif: "https://media.tenor.com/-VKUR3803i4AAAAM/all-my-friends-are-laughing-behind-my-back-reza-farahan.gif",
    answer: "Unkind",
  },
  {
    text: "Saying “Thank you” to the teacher",
    gif: "https://media.tenor.com/khqMOHcog0UAAAAM/thank-you-so-much-indiana-black.gif",
    answer: "Kind",
  },
  {
    text: "Laughing when someone makes a mistake",
    gif: "https://media.tenor.com/AwMBNB3aRGYAAAAM/my-friends-after-i-make-the-slightest-mistake-jamal-sims.gif",
    answer: "Unkind",
  },
  {
    text: "Including someone new in a game",
    gif: "https://media.tenor.com/ueVHQqyJar8AAAAM/lincoln-clay-handshake.gif",
    answer: "Kind",
  },
  {
    text: "Taking someone’s seat on purpose",
    gif: "https://media.tenor.com/ZOvzOYR0SqIAAAAM/the-boyz-tbz.gif",
    answer: "Unkind",
  },
  {
    text: "Cheering for a classmate",
    gif: "https://media.tenor.com/nN9s7aQvsvEAAAAM/go-cheer.gif",
    answer: "Kind",
  },
  {
    text: "Making fun of someone’s clothes",
    gif: "https://media.tenor.com/tj0X4HSK7_QAAAAM/if-you-dont-like-people-making-fun-of-you-dont-make-fun-of-other-people.gif",
    answer: "Unkind",
  },
];

const results = [
  {
    min: 8,
    message: "Excellent Job! You're a Kindness Champion!",
    gif: "https://media.tenor.com/W-mgWTEXXJEAAAAM/excellent-job-gabriel.gif",
  },
  {
    min: 7,
    message: "Good Effort! Almost there!",
    gif: "https://media.tenor.com/6hgdu5SEjqcAAAAM/ok-ok-now-you-oldwoman.gif",
  },
  {
    min: 6,
    message: "Hmm... I expected better!",
    gif: "https://media.tenor.com/1RXU2f-c1dcAAAAM/i-expected-better-from-you-i-expected-better.gif",
  },
  {
    min: 0,
    message: "Oops! Try again to spot the kindness!",
    gif: "https://media.tenor.com/8Mcowi8IqB4AAAAm/poor-thing-poor-baby.webp",
  },
];

const KindnessClicks = () => {
  const { completeSELChallenge } = useSEL();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());
  const yay = new Audio(
    "/children-saying-yay-praise-and-worship-jesus-299607.mp3"
  );
  const sadViolin = new Audio("/Sad Violin - Sound Effect (HD).mp3");

  const handleAnswer = (selected) => {
    const correct = questions[current].answer === selected;
    setShowFeedback(true);
    setFeedbackCorrect(correct);

    const playNext = () => {
      setShowFeedback(false);
      setAnswers([...answers, selected]);

      if (correct) setScore(score + 1);

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    };

    if (correct) {
      yay.play();
      setTimeout(playNext, 2000); // 2s for correct
    } else {
      sadViolin.currentTime = 0;
      sadViolin.play();

      // Stop audio and proceed after total 3s
      setTimeout(() => {
        sadViolin.pause();
        sadViolin.currentTime = 0;
        playNext();
      }, 3000); // total 3s for incorrect (sound + gif)
    }
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setStartTime(Date.now());

  };

  const result = results.find((r) => score >= r.min);

  useEffect(() => {
    if (showResult) {
      const endTime = Date.now();
      const totalSeconds = Math.round((endTime - startTime) / 1000);
      const accuracy = (score / questions.length) * 100;
      const avgResponseTimeSec = totalSeconds / questions.length;

      updatePerformance({
        moduleName: "SEL",
        topicName: "selfAwareness",
        score: score * 1, // out of 10
        accuracy,
        avgResponseTimeSec,
        studyTimeMinutes: Math.ceil(totalSeconds / 60),
        completed: score >= 8,

      });
      setStartTime(Date.now());

      if (score >= 8) {
        completeSELChallenge(0, 2);
      }
    }
  }, [showResult]);


  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 text-center">
        {!showResult ? (
          <>
            <h1 className="text-3xl font-bold mb-2">
              Kindness Clicks: Spot the Good!
            </h1>
            <p className="text-gray-600 mb-6">
              You’re walking through your school. Tap on things you see
              happening and tag them as ‘Kind’ or ‘Unkind’. Let’s see how well
              you notice!
            </p>

            {!showFeedback ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  {questions[current].text}
                </h2>
                <img
                  src={questions[current].gif}
                  alt="gif"
                  className="w-full h-64 object-contain rounded-lg mx-auto mb-6"
                />
                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => handleAnswer("Kind")}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Kind
                  </button>
                  <button
                    onClick={() => handleAnswer("Unkind")}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                  >
                    Unkind
                  </button>
                </div>
                <p className="mt-6 text-gray-500">
                  Question {current + 1} of {questions.length}
                </p>
              </>
            ) : (
              <div>
                <img
                  src={
                    feedbackCorrect
                      ? "https://media.tenor.com/rITwtw_ErAgAAAAm/that%27s-right-corridor-crew.webp"
                      : "https://media.tenor.com/ZAoAvr7axwEAAAAM/what%27s-wrong-with-you-brothers.gif"
                  }
                  alt="feedback"
                  className="w-full h-64 object-contain rounded-lg mx-auto mb-6"
                />
              </div>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Score: {score}/10</h2>
            <p className="text-lg font-medium mb-4">{result.message}</p>
            <img
              src={result.gif}
              alt="result"
              className="w-full max-h-72 object-contain rounded-lg mb-6"
            />
            <button
              onClick={restartGame}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Start Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KindnessClicks;
