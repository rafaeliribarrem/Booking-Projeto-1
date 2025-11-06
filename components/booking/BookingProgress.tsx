import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface BookingProgressProps {
  currentStep: number;
  steps: Step[];
}

export function BookingProgress({ currentStep, steps }: BookingProgressProps) {
  return (
    <div className="w-full py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted
                        ? "bg-sage-600 text-cream-50"
                        : isCurrent
                        ? "bg-terracotta-500 text-cream-50"
                        : "bg-sand-200 text-sand-600"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs sm:text-sm font-medium text-center max-w-[80px] sm:max-w-none ${
                      isCurrent ? "text-sand-900" : "text-sand-700"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      isCompleted ? "bg-sage-600" : "bg-sand-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
