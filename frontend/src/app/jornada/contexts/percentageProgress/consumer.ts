import { useContext } from "react";
import { PercentageProgressContext } from "./context";

export const usePercentageProgress = () => {
  const context = useContext(PercentageProgressContext);
  if (!context) {
    throw new Error("usePercentageProgress deve ser usado dentro de um PercentageProgressProvider");
  }
  return context;
};