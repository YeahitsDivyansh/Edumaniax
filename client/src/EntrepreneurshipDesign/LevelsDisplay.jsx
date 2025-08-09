/**
 * Entrepreneurship Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useEntrepreneruship } from "@/contexts/EntreprenerushipContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useEntrepreneruship();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="entrepreneurship"
      progress={progress}
      showDebug={true} // Set to false in production
    />
  );
};

export default LevelsDisplay;
