/**
 * Communication Module LevelsDisplay
 * Now uses the common access control logic
 */

import React from "react";
import { useCommunication } from "../contexts/CommunicationContext";
import CommonLevelsDisplay from "../components/CommonLevelsDisplay";

const LevelsDisplay = ({ modules }) => {
  const { progress } = useCommunication();

  return (
    <CommonLevelsDisplay
      modules={modules}
      moduleKey="communication"
      progress={progress}
      showDebug={false} // Set to false in production
    />
  );
};

export default LevelsDisplay;

