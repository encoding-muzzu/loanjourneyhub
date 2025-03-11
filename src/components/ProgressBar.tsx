
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/lib/utils";

export function ProgressBar() {
  const { currentStep, steps } = useProgress();
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <div
              key={step}
              className={cn(
                "flex flex-col items-center flex-1",
                index < steps.length - 1 && "relative"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <div
                className={cn(
                  "mt-2 text-xs font-medium capitalize",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.replace("-", " ")}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 left-1/2 w-full h-[2px] -translate-y-1/2",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
