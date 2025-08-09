/**
 * Environment Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useEnvirnoment } from "../contexts/EnvirnomentContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useEnvirnoment();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="environment"
      progress={progress}
      showDebug={true} // Set to false in production
    />
  );
};

export default LevelsDisplay;
