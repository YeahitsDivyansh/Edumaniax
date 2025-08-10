/**
 * Leadership Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useLeadership } from "@/contexts/LeadershipContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useLeadership();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="leadership"
      progress={progress}
      showDebug={false} // Set to false in production gaurav
    />
  );
};

export default LevelsDisplay;
