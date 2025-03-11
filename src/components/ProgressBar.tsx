
import { useProgress } from "@/contexts/ProgressContext";
import { cn } from "@/lib/utils";

export function ProgressBar() {
  const { currentStep, steps } = useProgress();
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-2 relative">
        {/* Progress line */}
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <div
              key={step}
              className={cn(
                "flex flex-col items-center z-10"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  isCompleted
                    ? "gradient-card shadow-md"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {index + 1}
              </div>
              <div
                className={cn(
                  "mt-2 text-xs font-medium capitalize",
                  isActive ? "text-primary" : "text-gray-500"
                )}
              >
                {step.replace("-", " ")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
