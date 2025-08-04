import React, { useEffect, useState } from "react";
import AdCreationGame from "./Stage1/AdCreationStage";
import TargetingStage from "./Stage2/TargetingStage";
import DashboardGame from "./Stage3/DashboardStage";
import FinalSummary from "./FinalSummary";
import { useDM } from "@/contexts/DMContext";
import { usePerformance } from "@/contexts/PerformanceContext"; //for performance

const LevelController = () => {
    const { completeDMChallenge } = useDM();

    const [stage, setStage] = useState(1);
    const [score, setScore] = useState(0);
    //for performance
    const { updatePerformance } = usePerformance();
   const [startTime,setStartTime] = useState(Date.now());

    useEffect(() => {
        if (stage === 4) {
            completeDMChallenge(2, 0);

            const endTime = Date.now();
            const timeTakenSec = Math.floor((endTime - startTime) / 1000);
            const studyTimeMinutes = Math.ceil(timeTakenSec / 60);
            const scaledScore = Math.min(10, Math.round((score / 9) * 10));
            const accuracy = Math.min(100, Math.round((score / 9) * 100)); // Assuming max score is 9

            updatePerformance({
                moduleName: "DigitalMarketing",
                topicName: "marketer",
                score: scaledScore,
                accuracy,
                avgResponseTimeSec: timeTakenSec,
                studyTimeMinutes,
                completed: true,
                
            });
            setStartTime(Date.now());
        }
    }, [stage]);


    const nextStage = () => setStage((prev) => prev + 1);

    const addScore = (points) => setScore((prev) => prev + points);
    const restartGame = () => {
        setStage(1);
        setScore(0);
        setStartTime(Date.now());

    };

    return (
        <div>
            {stage === 1 && (
                <AdCreationGame onNext={nextStage} addScore={addScore} />
            )}
            {stage === 2 && (
                <TargetingStage onNext={nextStage} addScore={addScore} onRestart={restartGame} />
            )}
            {stage === 3 && (
                <DashboardGame onNext={nextStage} addScore={addScore} onRestart={restartGame} />
            )}
            {stage === 4 && <FinalSummary score={score} onRestart={restartGame} />}
        </div>
    );
};

export default LevelController;
