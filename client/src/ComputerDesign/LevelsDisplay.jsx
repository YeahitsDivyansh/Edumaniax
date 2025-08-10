/**
 * Computer Science Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useComputers } from "../contexts/ComputersContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useComputers();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="computers"
      progress={progress}
      showDebug={false} // Set to false in production
    />
  );
};

export default LevelsDisplay;


