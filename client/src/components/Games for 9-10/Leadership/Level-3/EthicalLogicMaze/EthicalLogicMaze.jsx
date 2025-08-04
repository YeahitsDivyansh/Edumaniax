import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useLeadership } from "@/contexts/LeadershipContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const EthicalLogicMaze = () => {
  const { completeLeadershipChallenge } = useLeadership();
  const [step, setStep] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [alert, setAlert] = useState("");
  const [reflection, setReflection] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  //for performance
  const { updatePerformance } = usePerformance();
 const [startTime,setStartTime] = useState(Date.now());
  useEffect(() => {
    if (step === "final" && showBadge) {
      completeLeadershipChallenge(2, 0);
    }
  }, [step, showBadge]);
  useEffect(() => {
    if (step !== "final") return;

    const totalTimeMs = Date.now() - startTime;
    const totalScore = 2; // reflection + completion
    let earned = 0;

    if (reflection.trim()) earned += 1;
    if (showBadge) earned += 1;

    const scaledScore = Math.round((earned / totalScore) * 10);

    updatePerformance({
      moduleName: "Leadership",
      topicName: "theStrategist",
      score: scaledScore,
      accuracy: scaledScore * 10,
      avgResponseTimeSec: parseFloat((totalTimeMs / 2000).toFixed(2)), // 2 decision steps
      studyTimeMinutes: parseFloat((totalTimeMs / 60000).toFixed(2)),
      completed: showBadge,
      
    });
    setStartTime(Date.now());

  }, [step]);


  const triggerConfetti = () => {
    confetti({ spread: 200, particleCount: 150, origin: { y: 0.6 } });
  };

  const handleChoice = (nextStep, bias = null) => {
    if (bias) {
      setAlert(bias);
      setStep("bias-feedback");
      return; // Stay on the same question
    }

    setStep("correct-feedback");
    setTimeout(() => {
      setStep(nextStep);
    }, 2000);
  };

  const handleFinalSubmit = () => {
    if (reflection.trim() === "") {
      alert("Please share your reflection before finishing.");
      return;
    }
    setShowBadge(true);
    triggerConfetti();
    setStep("final");
  };

  const restartGame = () => {
    setStep("intro");
    setAlert("");
    setReflection("");
    setShowBadge(false);
    setCurrentQuestion(null);
    setStartTime(Date.now());

  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl text-center">
      {step === "intro" && (
        <>
          <h1 className="text-3xl font-bold mb-4">🧠 Ethical Logic Maze</h1>
          <p className="mb-4 text-gray-700">
            Navigate an ethical dilemma in a group project. Choose wisely at
            each step. Bias alerts will pop up if your decision is influenced by
            flawed reasoning.
          </p>
          <img
            src="https://media.tenor.com/2JsKoyouvYgAAAAM/bane-batman.gif"
            alt="Intro Gif"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <Button onClick={() => setStep(0)}>🎮 Play Game</Button>
        </>
      )}

      {step === "correct-feedback" && (
        <>
          <img
            src="https://media.tenor.com/1XwouwqZIggAAAAm/thats-true-jared-dines.webp"
            alt="Correct"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <p className="text-green-700 font-semibold text-lg">
            ✅ Good thinking — you're making ethical choices!
          </p>
        </>
      )}

      {step === "bias-feedback" && (
        <>
          <img
            src="https://media.tenor.com/5jd95PgPZFsAAAAm/very-biased-danny-mullen.webp"
            alt="Bias Alert"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <p className="text-yellow-800 bg-yellow-100 p-4 rounded-xl shadow">
            {alert}
          </p>

          {currentQuestion === 0 && (
            <div className="space-y-3 mt-4">
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  handleChoice(1);
                }}
              >
                Talk to your partner privately
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  handleChoice(
                    null,
                    "🚨 Bias Alert: You're avoiding discomfort."
                  );
                }}
              >
                Stay quiet — it’s too late to fix
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  handleChoice(
                    3,
                    "🚨 Bias Alert: You're just following the group decision."
                  );
                }}
              >
                Ask the group — majority decides
              </Button>
            </div>
          )}

          {currentQuestion === 1 && (
            <div className="space-y-3 mt-4">
              <Button
                onClick={() => {
                  setCurrentQuestion(1);
                  handleChoice(4);
                }}
              >
                Tell them you can’t support dishonesty
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(1);
                  handleChoice(
                    null,
                    "🚨 Bias Alert: You're avoiding discomfort."
                  );
                }}
              >
                Agree — it's not your responsibility
              </Button>
            </div>
          )}

          {currentQuestion === 3 && (
            <div className="space-y-3 mt-4">
              <Button
                onClick={() => {
                  setCurrentQuestion(3);
                  handleChoice(4);
                }}
              >
                Speak to the teacher anyway
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(3);
                  handleChoice(
                    null,
                    "🚨 Bias Alert: Peer pressure is clouding your judgment."
                  );
                }}
              >
                Go with the group
              </Button>
            </div>
          )}
        </>
      )}

      {step === 0 && (
        <>
          <img
            src="https://media.tenor.com/9z6RCeeM6foAAAA1/mr-bean-exam.webp"
            alt="Q1"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <p className="mb-4">
            Your group partner copied from an online source without citing. What
            will you do?
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                handleChoice(1);
              }}
            >
              Talk to your partner privately
            </Button>
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                handleChoice(
                  null,
                  "🚨 Bias Alert: You're avoiding discomfort."
                );
              }}
            >
              Stay quiet — it’s too late to fix
            </Button>
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                handleChoice(
                  3,
                  "🚨 Bias Alert: You're just following the group decision."
                );
              }}
            >
              Ask the group — majority decides
            </Button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <img
            src="https://media.tenor.com/8PCWQMFQ720AAAA1/living-care-free-jordan-black.webp"
            alt="Q2"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <p className="mb-4">
            Your partner says, "Let’s leave it, the teacher won’t notice."
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setCurrentQuestion(1);
                handleChoice(4);
              }}
            >
              Tell them you can’t support dishonesty
            </Button>
            <Button
              onClick={() => {
                setCurrentQuestion(1);
                handleChoice(
                  null,
                  "🚨 Bias Alert: You're avoiding discomfort."
                );
              }}
            >
              Agree — it's not your responsibility
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <img
            src="https://media.tenor.com/CyJc-DlZ51YAAAA1/its-no-big-deal-maxine-chapman.webp"
            alt="Q3"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <p className="mb-4">
            Group says it’s not a big deal. “Everyone does it.”
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setCurrentQuestion(3);
                handleChoice(4);
              }}
            >
              Speak to the teacher anyway
            </Button>
            <Button
              onClick={() => {
                setCurrentQuestion(3);
                handleChoice(
                  null,
                  "🚨 Bias Alert: Peer pressure is clouding your judgment."
                );
              }}
            >
              Go with the group
            </Button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <img
            src="https://media.tenor.com/1XwouwqZIggAAAAm/thats-true-jared-dines.webp"
            alt="Correct"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <p className="mb-4 font-semibold">
            Final Step: What values shaped your decision?
          </p>
          <textarea
            className="w-full border rounded-lg p-3 mb-4"
            rows={3}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="E.g., honesty, responsibility, fairness..."
          />
          <Button onClick={handleFinalSubmit}>✅ Complete</Button>
        </>
      )}

      {step === "final" && showBadge && (
        <>
          <img
            src="https://media.tenor.com/AnV8Q7ENAPwAAAA1/enthiran-rajnikanth-hugging-robo-enthiran.webp"
            alt="Complete"
            className="rounded-xl mb-4 max-w-md w-full mx-auto"
          />
          <h2 className="text-2xl font-bold mb-2">🎉 Task Completed!</h2>
          <p className="text-xl font-semibold mb-4">
            You've earned the badge: 🧠 Justice Seeker
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={restartGame}>🔁 Play Again</Button>
            <a href="/team-architect-mission">
              <Button>Move to Next Game</Button>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default EthicalLogicMaze;
