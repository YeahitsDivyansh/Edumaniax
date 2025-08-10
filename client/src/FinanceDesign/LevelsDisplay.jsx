/**
 * Finance Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useFinance } from "../contexts/FinanceContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useFinance();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="finance"
      progress={progress}
      showDebug={false} // Set to false in production
    />
  );
};

export default LevelsDisplay;
