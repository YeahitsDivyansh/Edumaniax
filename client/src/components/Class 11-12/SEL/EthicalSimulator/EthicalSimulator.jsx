import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSEL } from "@/contexts/SELContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const dilemmas = [
  {
    scenario: "📚 You didn’t study for a test and your friend offers to let you copy. What do you do?",
    choices: [
      {
        text: "🙈 Copy the answers",
        type: "risky",
        tree: [
          "You pass the test.",
          "You start depending on others often.",
          "You get caught in the final exam."
        ],
        reflection: "Did short-term success lead to long-term loss?"
      },
      {
        text: "🙅‍♀️ Do your best on your own",
        type: "assertive",
        tree: [
          "You score low but learn from mistakes.",
          "You study harder next time.",
          "Your marks improve in the finals."
        ],
        reflection: "How did effort lead to true improvement?"
      }
    ]
  },
  {
    scenario: "💬 Your friend asks for honest feedback on their project, but it’s not great. What do you do?",
    choices: [
      {
        text: "😊 Say it’s good to avoid hurting them",
        type: "neutral",
        tree: [
          "They feel happy.",
          "But they don't improve their work.",
          "They get poor feedback from others later."
        ],
        reflection: "Is kindness still kind if it hides the truth?"
      },
      {
        text: "🤔 Give honest but kind feedback",
        type: "assertive",
        tree: [
          "They feel surprised.",
          "They make changes and improve.",
          "They thank you later for the advice."
        ],
        reflection: "How does honest feedback help relationships grow?"
      }
    ]
  },
  {
    scenario: "🗣️ Your group gets praised, but only you get the credit. What do you do?",
    choices: [
      {
        text: "🤐 Stay silent",
        type: "risky",
        tree: [
          "You enjoy the praise.",
          "Your teammates stop trusting you.",
          "Next project you’re left out."
        ],
        reflection: "How does silence affect long-term trust?"
      },
      {
        text: "📢 Share the credit",
        type: "assertive",
        tree: [
          "Teammates feel valued.",
          "You build strong relationships.",
          "You become a team leader."
        ],
        reflection: "Why is sharing credit important?"
      }
    ]
  },
  {
    scenario: "📱 You see someone being cyberbullied in a group chat. What do you do?",
    choices: [
      {
        text: "😶 Ignore it",
        type: "risky",
        tree: [
          "The bullying continues.",
          "Others think you support it.",
          "The victim feels more alone."
        ],
        reflection: "How would you feel in their place?"
      },
      {
        text: "🛑 Speak up or report it",
        type: "assertive",
        tree: [
          "The bullying stops.",
          "The victim feels supported.",
          "Others are encouraged to do the same."
        ],
        reflection: "How can speaking up protect others?"
      }
    ]
  },
  {
    scenario: "🎉 Your friends pressure you to skip class to hang out. What do you do?",
    choices: [
      {
        text: "😜 Skip the class",
        type: "risky",
        tree: [
          "You have fun.",
          "You miss key lessons.",
          "You perform poorly on the next test."
        ],
        reflection: "Was it worth missing important lessons?"
      },
      {
        text: "📚 Attend the class",
        type: "assertive",
        tree: [
          "You stay on track.",
          "You understand the topic better.",
          "You ace the test and feel confident."
        ],
        reflection: "What long-term benefits come from self-discipline?"
      }
    ]
  },
  {
    scenario: "🧾 You find money on the ground at school. What do you do?",
    choices: [
      {
        text: "💸 Keep it",
        type: "risky",
        tree: [
          "You get excited.",
          "You feel guilty later.",
          "You see a notice about the lost money."
        ],
        reflection: "How would you feel if it was your lost money?"
      },
      {
        text: "🙋‍♂️ Report it to a teacher",
        type: "assertive",
        tree: [
          "You feel proud.",
          "The owner is grateful.",
          "Others see you as trustworthy."
        ],
        reflection: "How does doing the right thing build trust?"
      }
    ]
  },
  {
    scenario: "🤐 Your friend tells you a secret that could hurt them. What do you do?",
    choices: [
      {
        text: "🤫 Keep the secret no matter what",
        type: "neutral",
        tree: [
          "They trust you.",
          "You worry constantly.",
          "Their problem grows worse."
        ],
        reflection: "When is keeping a secret harmful?"
      },
      {
        text: "🆘 Tell a trusted adult",
        type: "assertive",
        tree: [
          "They get help.",
          "They may be upset initially.",
          "They thank you later for your care."
        ],
        reflection: "How can acting responsibly protect others?"
      }
    ]
  },
  {
    scenario: "📔 You forgot to do your homework. What do you do?",
    choices: [
      {
        text: "🙈 Copy a friend’s work",
        type: "risky",
        tree: [
          "You avoid trouble.",
          "You don’t learn anything.",
          "You struggle in the exam."
        ],
        reflection: "Is avoiding trouble better than learning?"
      },
      {
        text: "🙋 Admit the truth to your teacher",
        type: "assertive",
        tree: [
          "You may get a warning.",
          "The teacher helps you catch up.",
          "You feel more motivated next time."
        ],
        reflection: "Why is owning your mistake powerful?"
      }
    ]
  },
  {
    scenario: "🧑‍💼 You disagree with your team’s idea. What do you do?",
    choices: [
      {
        text: "😐 Stay silent",
        type: "neutral",
        tree: [
          "You avoid conflict.",
          "The plan fails.",
          "You feel frustrated."
        ],
        reflection: "How does silence affect teamwork?"
      },
      {
        text: "🗣️ Share your view respectfully",
        type: "assertive",
        tree: [
          "The team hears your idea.",
          "The project improves.",
          "Everyone feels heard."
        ],
        reflection: "Why is respectful disagreement valuable?"
      }
    ]
  },
  {
    scenario: "💻 You’re tempted to use AI to do your assignment. What do you do?",
    choices: [
      {
        text: "🤖 Let AI write it",
        type: "risky",
        tree: [
          "You submit it easily.",
          "You can't answer questions in class.",
          "You lose marks for lack of understanding."
        ],
        reflection: "Will this help you grow in the long run?"
      },
      {
        text: "📝 Use it for ideas, but write your own",
        type: "assertive",
        tree: [
          "You put in effort.",
          "You learn the topic better.",
          "You perform well in class."
        ],
        reflection: "How does effort lead to real growth?"
      }
    ]
  }
];


export default function EthicalSimulator() {
  const { completeSELChallenge } = useSEL();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const current = dilemmas[step];

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime,setStartTime] = useState(Date.now());

  const handleChoice = (i) => {
    const choice = current.choices[i];
    setSelected(i);
    if (choice.type === "assertive") setScore(score + 1);
  };

  const nextScenario = () => {
    if (step + 1 === dilemmas.length) {
      completeSELChallenge(1, 1); // ✅ Mark SEL challenge complete

      const endTime = Date.now();
      const durationSec = Math.round((endTime - startTime) / 1000);
      const scaledScore = score; // Already out of 10
      const accuracy = Math.round((scaledScore / 10) * 100);

      updatePerformance({
        moduleName: "SEL",
        topicName: "peerSupportNetworks",
        score: scaledScore,
        accuracy: accuracy,
        avgResponseTimeSec: durationSec,
        studyTimeMinutes: Math.ceil(durationSec / 60),
        completed: true,
         
      });
      setStartTime(Date.now());

    }

    setStep(step + 1);
    setSelected(null);
  };

  const getFinalMessage = () => {
    if (score >= 8) return "🌟 You're a values-driven leader!";
    if (score >= 5) return "💡 Great effort! Keep strengthening your decisions.";
    return "✨ You’re learning! Every choice teaches something.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6 font-sans">
      <motion.div className="max-w-5xl mx-auto bg-white p-10 rounded-[40px] shadow-2xl border-8 border-dashed border-pink-300 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce">
            🌟 Ethical Dilemma Simulator 🌟
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 bg-yellow-50 p-4 rounded-xl shadow-sm border-l-4 border-yellow-400">
            🚧 <strong>Instructions:</strong> Read each situation carefully and choose what you would do. Each choice leads to a consequence path and a chance to reflect. 💭 Earn points for honest, assertive decisions!
          </p>
        </div>

        {step < dilemmas.length ? (
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-2xl font-bold text-blue-800 mb-6 bg-blue-100 p-4 rounded-xl border-l-4 border-blue-400">
              {current.scenario}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.choices.map((choice, i) => (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleChoice(i)}
                  className={`p-5 rounded-2xl text-left text-lg font-semibold transition transform hover:scale-105 shadow-lg ${selected === i ? "bg-purple-200 border-2 border-purple-500" : "bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200"
                    }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>
            {selected !== null && (
              <motion.div
                className="mt-10 p-6 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 border-l-8 border-purple-400 rounded-3xl shadow-xl  "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h2 className="text-xl font-extrabold text-purple-700 mb-3 flex items-center gap-2">
                  🎯 <span className="underline decoration-wavy decoration-green-400">Consequence Path</span> 🌈
                </h2>
                <div className="relative border-l-4 border-purple-400 pl-6 space-y-6 mb-6">
                  {current.choices[selected].tree.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-4 top-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white animate-ping"></div>
                      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3 text-lg font-medium">
                          <ArrowRight className="w-6 h-6 text-pink-500 mt-1 animate-bounce" />
                          <span>{step}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-extrabold text-purple-700 mt-6 mb-3 flex items-center gap-2">
                  🤔 <span className="underline decoration-wavy decoration-yellow-500">Reflection Moment</span> 💭
                </h2>
                <p className="italic text-lg text-gray-700 bg-yellow-100 rounded-xl px-4 py-3 shadow-inner">
                  {current.choices[selected].reflection}
                </p>

                <div className="text-center mt-8">
                  <button
                    onClick={() => { nextScenario(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-8 rounded-full shadow-lg text-xl font-bold transform hover:scale-105 transition duration-300"
                  >
                    🚀 Next Adventure ➡️
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-center bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 p-8 rounded-3xl shadow-inner mt-10 animate-fade-in-up">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-4 animate-pulse">
              🏁 Woohoo! All Dilemmas Answered!
            </h2>
            <p className="text-2xl text-green-700 font-semibold mb-4">
              {getFinalMessage()}
            </p>
            <p className="text-lg text-gray-900 mb-6 bg-white px-4 py-2 rounded-xl shadow">
              🎯 Final Score: <span className="text-pink-600 font-bold">{score}/10</span>
            </p>
            <button
              onClick={() => {
                setStep(0);
                setSelected(null);
                setScore(0);
                setStartTime(Date.now());
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white py-3 px-10 rounded-full shadow-xl text-xl font-extrabold transform hover:scale-105 transition duration-300"
            >
              🔄 Play Again & Level Up!
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}