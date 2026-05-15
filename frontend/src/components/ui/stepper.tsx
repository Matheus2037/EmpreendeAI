import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({
  totalSteps,
  currentStep,
  onStepClick,
}: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(index)}
                className={cn(
                  "size-8 rounded-full flex items-center justify-center transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "border-2 border-primary",
                  !isCompleted && !isCurrent && "border-2 border-muted"
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </button>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
