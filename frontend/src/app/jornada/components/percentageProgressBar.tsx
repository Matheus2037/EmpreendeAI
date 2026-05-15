import { useEffect } from "react";
import { usePercentageProgress } from "@/app/jornada/contexts/percentageProgress";

type PercentageProgressBarProps = {
  color?: string;
  percentage: number;
};

export function PercentageProgressBar({
  color,
  percentage,
}: PercentageProgressBarProps) {
  const { percentage: contextPercentage, setPercentage } =
    usePercentageProgress();

  useEffect(() => {
    setPercentage(percentage);
  }, [percentage, setPercentage]);

  return (
    <>
      <div
        className="h-full rounded-sm"
        style={{
          backgroundColor: color,
          width: `${contextPercentage}%`,
        }}
      />
      <span className="absolute right-0 -top-7">{contextPercentage}%</span>
    </>
  );
}
