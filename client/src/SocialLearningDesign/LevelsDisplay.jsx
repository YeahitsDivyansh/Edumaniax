/**
 * Social Learning Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useSEL } from "../contexts/SELContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useSEL();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="sel"
      progress={progress}
      showDebug={false} // Set to false in production
    />
  );
};

export default LevelsDisplay;
