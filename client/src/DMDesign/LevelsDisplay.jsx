/**
 * Digital Marketing Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useDM } from "@/contexts/DMContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { dmprogress: progress } = useDM();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="digital-marketing"
      progress={progress}
      showDebug={false} // Set to false in production
    />
  );
};

export default LevelsDisplay;
