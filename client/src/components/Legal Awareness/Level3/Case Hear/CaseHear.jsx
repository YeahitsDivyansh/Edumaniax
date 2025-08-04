import React, { useState, useEffect } from "react";
import {
  Scale,
  Timer,
  Trophy,
  Star,
  BookOpen,
  Users,
  TreePine,
  Smartphone,
  Computer,
  Award,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { useLaw } from "@/contexts/LawContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance
const cases = [
  {
    id: 1,
    title: "Broken Phone Bummer",
    emoji: "📱",
    law: "Consumer Rights",
    summary:
      "Ria's brand-new phone stopped working in 3 days. The shopkeeper refused to replace it, claiming she dropped it (she didn't).",
    sides: {
      plaintiff: {
        title: "Plaintiff's Advocate",
        subtitle: "Argue for replacement",
        arguments: [
          {
            text: "The product was defective under warranty – replacement is fair.",
            points: 4,
            correct: true,
          },
          {
            text: "The store must return money for all complaints.",
            points: 3,
          },
          {
            text: "It's the shop's duty to make sure phones never break.",
            points: 2,
          },
          { text: "Phones should last forever; this is cheating.", points: 1 },
        ],
      },
      defence: {
        title: "Defence Advocate",
        subtitle: "Argue it was buyer's fault",
        arguments: [
          {
            text: "There is no physical damage report from the store – buyer must prove fault isn't theirs.",
            points: 4,
            correct: true,
          },
          { text: "Phones sometimes break, it's normal.", points: 3 },
          {
            text: "Company policy says 'no refunds', so no refund.",
            points: 2,
          },
          { text: "Ria should have bought insurance.", points: 1 },
        ],
      },
    },
    legalPrinciple:
      "Consumer protection laws ensure defective products can be replaced or refunded within warranty period!",
  },
  {
    id: 2,
    title: "Trees and Trouble",
    emoji: "🌳",
    law: "Environmental Laws",
    summary:
      "A park near Arjun's school was bulldozed to make space for a parking lot. He and his friends want to stop it.",
    sides: {
      plaintiff: {
        title: "Plaintiff's Advocate",
        subtitle: "Defend the park",
        arguments: [
          {
            text: "Cutting trees without permission is illegal under environmental law.",
            points: 4,
            correct: true,
          },
          { text: "Trees are friends, not things!", points: 3 },
          { text: "We like playing there; that matters.", points: 2 },
          { text: "My grandparents planted those trees!", points: 1 },
        ],
      },
      defence: {
        title: "Defence Advocate",
        subtitle: "Defend the construction",
        arguments: [
          {
            text: "The land belongs to the city – they followed legal procedures.",
            points: 4,
            correct: true,
          },
          {
            text: "More cars means more people can come to school.",
            points: 3,
          },
          { text: "Kids have other parks to play.", points: 2 },
          { text: "Trees grow back fast, it's not a big deal.", points: 1 },
        ],
      },
    },
    legalPrinciple:
      "Environmental laws protect our nature and require proper permissions before cutting trees!",
  },
  {
    id: 3,
    title: "Cyber Confusion",
    emoji: "💻",
    law: "Cyber Law + Juvenile Justice",
    summary:
      "Kabir made a fake profile of his friend and posted silly photos. The school suspended him. Now, a legal notice has arrived.",
    sides: {
      plaintiff: {
        title: "Plaintiff's Advocate",
        subtitle: "Friend's Side",
        arguments: [
          {
            text: "Making fake profiles and harassment is punishable under cyber law.",
            points: 4,
            correct: true,
          },
          { text: "It was meant to embarrass my client in school.", points: 3 },
          { text: "This has caused emotional harm.", points: 2 },
          { text: "He broke friendship rules.", points: 1 },
        ],
      },
      defence: {
        title: "Defence Advocate",
        subtitle: "Kabir's Side",
        arguments: [
          {
            text: "Kabir is a minor – the Juvenile Justice Act focuses on reform, not punishment.",
            points: 4,
            correct: true,
          },
          { text: "He didn't know it was a big deal.", points: 3 },
          { text: "Everyone posts jokes online.", points: 2 },
          { text: "Kabir said sorry. That's enough.", points: 1 },
        ],
      },
    },
    legalPrinciple:
      "Cyber laws protect us online, but juvenile justice focuses on teaching kids rather than punishing them!",
  },
];

const GameHeader = ({ score, currentCase, gamePhase }) => (
  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg mb-6">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <Scale className="w-8 h-8 text-yellow-300 animate-bounce" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Courtroom Clash</h1>
          <p className="text-sm text-purple-200">Be the Legal Hero! ⚖️</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="font-bold">{score} pts</span>
        </div>
        {gamePhase === "playing" && (
          <div className="bg-white/20 px-3 py-2 rounded-full text-sm">
            Case {currentCase + 1}/3
          </div>
        )}
      </div>
    </div>
  </div>
);

const Timer2 = ({ timeLeft, isActive }) => {
  const percentage = (timeLeft / 20) * 100;
  const color =
    timeLeft > 10
      ? "bg-green-500"
      : timeLeft > 5
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="mb-6" style={{ fontFamily: "'Comic Neue', cursive" }}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Timer className="w-5 h-5 text-gray-600" />
        <span
          className={`font-bold text-lg ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-700"
            }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-linear rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const CaseCard = ({ caseData, onSelect, index }) => (
  <div
    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-purple-300"
    onClick={() => onSelect(index)}
  >
    <div className="text-center">
      <div className="text-4xl mb-3 animate-bounce">{caseData.emoji}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{caseData.title}</h3>
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full inline-block mb-3">
        <span className="text-sm font-semibold text-purple-700">
          {caseData.law}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {caseData.summary}
      </p>
    </div>
  </div>
);

const SideSelection = ({ caseData, onSelectSide }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="text-6xl mb-4 animate-pulse">{caseData.emoji}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {caseData.title}
      </h2>
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full inline-block mb-4">
        <span className="font-semibold text-purple-700">{caseData.law}</span>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">{caseData.summary}</p>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        🧩 Choose your Role:
      </h3>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div
        className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
        onClick={() => onSelectSide("plaintiff")}
      >
        <div className="text-center">
          <Users className="w-12 h-12 mx-auto mb-4 animate-bounce" />
          <h4 className="text-xl font-bold mb-2">
            {caseData.sides.plaintiff.title}
          </h4>
          <p className="text-green-100">{caseData.sides.plaintiff.subtitle}</p>
          <div className="mt-4 bg-white/20 px-4 py-2 rounded-full inline-block">
            <span className="text-sm font-semibold">Fight for Justice! ⚔️</span>
          </div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
        onClick={() => onSelectSide("defence")}
      >
        <div className="text-center">
          <Scale className="w-12 h-12 mx-auto mb-4 animate-bounce" />
          <h4 className="text-xl font-bold mb-2">
            {caseData.sides.defence.title}
          </h4>
          <p className="text-orange-100">{caseData.sides.defence.subtitle}</p>
          <div className="mt-4 bg-white/20 px-4 py-2 rounded-full inline-block">
            <span className="text-sm font-semibold">Defend Rights! 🛡️</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ArgumentSelection = ({
  caseData,
  selectedSide,
  onSelectArgument,
  timeLeft,
}) => {
  const sideData = caseData.sides[selectedSide];

  return (
    <div className="space-y-6" style={{ fontFamily: "'Comic Neue', cursive" }}>
      <div className="text-center">
        <div className="text-4xl mb-3">{caseData.emoji}</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {caseData.title}
        </h2>
        <div
          className={`px-4 py-2 rounded-full inline-block mb-4 ${selectedSide === "plaintiff"
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-700"
            }`}
        >
          <span className="font-semibold">{sideData.title}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          🎯 Choose your best argument:
        </h3>
      </div>

      <Timer2 timeLeft={timeLeft} isActive={true} />

      <div className="space-y-4 max-w-4xl mx-auto">
        {sideData.arguments.map((argument, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-300 to-green-200 border-2 border-gray-200 rounded-xl p-4 cursor-pointer transform hover:scale-102  transition-all duration-300 hover:shadow-lg hover:border-purple-300"
            onClick={() => onSelectArgument(argument, index)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm `}
              >
                {index + 1}
              </div>
              <p className="text-gray-700 flex-1 leading-relaxed">
                {argument.text}
              </p>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResultScreen = ({
  selectedArgument,
  correctArgument,
  caseData,
  onContinue,
}) => {
  let isCorrect;
  let points;

  if (selectedArgument === null) {
    isCorrect = false;
    points = 0;
  } else {
    isCorrect = selectedArgument.correct;
    points = selectedArgument.points;
  }

  return (
    <div
      className="space-y-6 text-center"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div
        className={`text-6xl mb-4 ${isCorrect ? "animate-bounce" : "animate-pulse"
          }`}
      >
        {isCorrect ? "🎉" : "🤔"}
      </div>

      <div
        className={`p-6 rounded-xl ${isCorrect
          ? "bg-green-100 border-green-300"
          : "bg-yellow-100 border-yellow-300"
          } border-2`}
      >
        <h2
          className={`text-2xl font-bold mb-2 ${isCorrect ? "text-green-700" : "text-yellow-700"
            }`}
        >
          {selectedArgument === null
            ? "Time's up"
            : isCorrect
              ? "Excellent Choice! 🌟"
              : "Good Try! 💪"}
        </h2>

        <div
          className={`text-4xl font-bold mb-4 ${isCorrect ? "text-green-600" : "text-yellow-600"
            }`}
        >
          +{points} points
        </div>

        <p
          className={`text-lg mb-4 ${isCorrect ? "text-green-700" : "text-yellow-700"
            }`}
        >
          {selectedArgument === null
            ? ""
            : isCorrect
              ? "You chose the strongest legal argument!"
              : "You earned points, but there was a stronger argument!"}
        </p>
      </div>

      {!isCorrect && (
        <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
          <h3 className="font-bold text-blue-700 mb-2">
            💡 The Best Argument Was:
          </h3>
          <p className="text-blue-600 italic">"{correctArgument.text}"</p>
        </div>
      )}

      <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl">
        <h3 className="font-bold text-purple-700 mb-2 flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5" />
          Legal Learning
        </h3>
        <p className="text-purple-600">{caseData.legalPrinciple}</p>
      </div>

      <button
        onClick={onContinue}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto"
      >
        Continue <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const FinalScore = ({ score, onRestart }) => {
  const maxScore = 12; // 3 cases × 4 points max
  const percentage = (score / maxScore) * 100;

  const getBadge = () => {
    if (percentage >= 85)
      return {
        emoji: "🏆",
        title: "Legal Superstar!",
        color: "text-yellow-500",
      };
    if (percentage >= 70)
      return { emoji: "⭐", title: "Legal Hero!", color: "text-blue-500" };
    if (percentage >= 50)
      return { emoji: "🎯", title: "Legal Learner!", color: "text-green-500" };
    return { emoji: "📚", title: "Future Lawyer!", color: "text-purple-500" };
  };

  const badge = getBadge();

  return (
    <div
      className="text-center space-y-6"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="text-6xl animate-bounce mb-4">{badge.emoji}</div>

      <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-xl border-2 border-purple-200">
        <h2 className={`text-3xl font-bold mb-4 ${badge.color}`}>
          {badge.title}
        </h2>

        <div className="text-5xl font-bold text-gray-800 mb-2">
          {score}/{maxScore}
        </div>
        <p className="text-gray-600 mb-4">Total Points Earned</p>

        <div className="bg-white rounded-full h-4 overflow-hidden mb-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">
          {Math.round(percentage)}% Legal Mastery
        </p>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl">
        <h3 className="font-bold text-yellow-700 mb-2 flex items-center justify-center gap-2">
          <Star className="w-5 h-5" />
          You've learned about:
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Consumer Rights
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Environmental Laws
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            Cyber Law
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {score >= 10 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl animate-pulse">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <span className="font-bold">Bonus Unlocked!</span>
            </div>
            <p className="text-sm">Lightning Law Quiz Coming Soon! ⚡</p>
          </div>
        )}

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default function CaseHear() {
  const { completeLawChallenge } = useLaw();
  const [gamePhase, setGamePhase] = useState("menu"); // menu, caseSelect, sideSelect, playing, result, final
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedSide, setSelectedSide] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedArgument, setSelectedArgument] = useState(null);
  const [correctArgument, setCorrectArgument] = useState(null);

  //for performance
  const { updatePerformance } = usePerformance();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    let timer;
    if (gamePhase === "playing" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gamePhase === "playing" && timeLeft === 0) {
      // Time up - select random argument
      const caseData = cases[currentCase];
      const sideData = caseData.sides[selectedSide];
      const randomArg =
        sideData.arguments[
        Math.floor(Math.random() * sideData.arguments.length)
        ];
      handleArgumentSelect(null, 0);
    }
    return () => clearTimeout(timer);
  }, [gamePhase, timeLeft, currentCase, selectedSide]);

  const handleCaseSelect = (caseIndex) => {
    setCurrentCase(caseIndex);
    setGamePhase("sideSelect");
  };

  const handleSideSelect = (side) => {
    setSelectedSide(side);
    setGamePhase("playing");
    setTimeLeft(20);
  };

  const handleArgumentSelect = (argument, index) => {
    const caseData = cases[currentCase];
    const correctArg = caseData.sides[selectedSide].arguments.find(
      (arg) => arg.correct
    );

    if (argument === null) {
      setCorrectArgument(correctArg);
      setScore(score + 0);
      setGamePhase("result");
    } else {
      setSelectedArgument(argument);
      setCorrectArgument(correctArg);
      setScore(score + argument.points);
      setGamePhase("result");
    }
  };

  const handleContinue = () => {
    if (currentCase < cases.length - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedSide(null);
      setGamePhase("sideSelect");
    } else {
      const endTime = Date.now();
      const timeTakenSec = Math.floor((endTime - startTime) / 1000);

      const maxScore = 12;
      const scaledScore = Math.round((score / maxScore) * 10); // out of 10
      const accuracyPercent = Math.round((score / maxScore) * 100); // out of 100

      updatePerformance({
        moduleName: "Law",
        topicName: "courtroomManerism",
        score: scaledScore,
        accuracy: accuracyPercent,
        avgResponseTimeSec: timeTakenSec / 3,
        studyTimeMinutes: Math.ceil(timeTakenSec / 60),
        completed: true,

      });
      setStartTime(Date.now());

      completeLawChallenge(2, 0);
      setGamePhase("final");
    }
  };


  const handleRestart = () => {
    setGamePhase("menu");
    setCurrentCase(0);
    setSelectedSide(null);
    setScore(0);
    setTimeLeft(20);
    setSelectedArgument(null);
    setCorrectArgument(null);
    setStartTime(Date.now());

  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-500 to-pink-500 p-4"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="max-w-6xl mx-auto">
        <GameHeader
          score={score}
          currentCase={currentCase}
          gamePhase={gamePhase}
        />

        <div className="bg-orange-100 rounded-xl shadow-xl p-6 md:p-8">
          {gamePhase === "menu" && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce mb-4">⚖️</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Courtroom Clash!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Become a legal hero! Choose cases, pick sides, make arguments,
                and learn the law while having fun! 🌟
              </p>
              <button
                onClick={() => setGamePhase("caseSelect")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Legal Journey! 🚀
              </button>
            </div>
          )}

          {gamePhase === "caseSelect" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🎯 Pick a Case
                </h2>
                <p className="text-gray-600">
                  Choose a case to argue and become a legal hero!
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {cases.map((caseData, index) => (
                  <CaseCard
                    key={index}
                    caseData={caseData}
                    onSelect={handleCaseSelect}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {gamePhase === "sideSelect" && (
            <SideSelection
              caseData={cases[currentCase]}
              onSelectSide={handleSideSelect}
            />
          )}

          {gamePhase === "playing" && (
            <ArgumentSelection
              caseData={cases[currentCase]}
              selectedSide={selectedSide}
              onSelectArgument={handleArgumentSelect}
              timeLeft={timeLeft}
            />
          )}

          {gamePhase === "result" && (
            <ResultScreen
              selectedArgument={selectedArgument}
              correctArgument={correctArgument}
              caseData={cases[currentCase]}
              onContinue={handleContinue}
            />
          )}

          {gamePhase === "final" && (
            <FinalScore score={score} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  );
}
