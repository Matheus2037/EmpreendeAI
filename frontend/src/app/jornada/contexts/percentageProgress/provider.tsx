import React, { useState } from "react";
import { PercentageProgressContext } from "./context";

export const PercentageProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [percentage, setPercentage] = useState(0);

  return (
    <PercentageProgressContext.Provider value={{ percentage, setPercentage }}>
      {children}
    </PercentageProgressContext.Provider>
  );
};
