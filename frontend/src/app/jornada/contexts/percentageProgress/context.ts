import { createContext } from "react";

export const PercentageProgressContext = createContext<{
  percentage: number;
  setPercentage: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);
