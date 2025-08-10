/**
 * Law Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useLaw } from "../contexts/LawContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useLaw();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="law"
      progress={progress}
      showDebug={true} // Set to false in production
    />
  );
};

export default LevelsDisplay;
