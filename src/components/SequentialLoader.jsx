import { useState, useEffect } from "react";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SequentialLoader({
  onComplete,
  className,
  currentStep,
  setCurrentStep,
  isLoading,
  setIsLoading,
  error,
  setError,
}) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Authentication",
      description: "Verifying your credentials",
    },
    {
      id: 2,
      title: "User Data",
      description: "Loading your profile information",
    },
    {
      id: 3,
      title: "Content",
      description: "Getting your personalized content",
    },
    {
      id: 4,
      title: "Dashboard",
      description: "Setting up your experience",
    },
  ];

  // Simulate API calls
  const makeApiCall = (stepIndex) => {
    if (stepIndex === 2) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Failed to load user data."));
        }, 1000);
      });
    }
    return new Promise((resolve) => {
      // Simulate network delay (between 1-2 seconds)
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };

  useEffect(() => {
    const processApiCalls = async () => {
      try {
        setCurrentStep(0);
        setProgress(0);
        await makeApiCall(0);
        setCompletedSteps((prev) => [...prev, 0]);
        setProgress(25);

        setCurrentStep(1);
        await makeApiCall(1);
        setCompletedSteps((prev) => [...prev, 1]);
        setProgress(50);

        setCurrentStep(2);
        await makeApiCall(2);
        setCompletedSteps((prev) => [...prev, 2]);
        setProgress(75);

        setCurrentStep(3);
        await makeApiCall(3);
        setCompletedSteps((prev) => [...prev, 3]);
        setProgress(100);

        setIsLoading(false);
        if (onComplete) onComplete();
      } catch (err) {
        setError(err.message || "An error occurred.");
        setIsLoading(false);
      }
    };

    processApiCalls();
  }, [onComplete]);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-foreground">
          Getting things ready...
        </h2>

        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3 py-3 px-4 rounded-md transition-all duration-300",
                currentStep === index ? "bg-muted" : "bg-transparent"
              )}
            >
              <div className="mt-0.5">
                {error && currentStep === index ? (
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-3 w-3 text-red-500" />
                  </div>
                ) : completedSteps.includes(index) ? (
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                ) : currentStep === index ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-muted-foreground/30" />
                )}
              </div>

              <div>
                <h3
                  className={cn(
                    "text-sm font-medium",
                    error && currentStep === index
                      ? "text-red-500"
                      : currentStep === index
                      ? "text-primary"
                      : completedSteps.includes(index)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-sm text-red-500 font-medium">
            {error}. Please try again.
          </div>
        )}

        {!isLoading && !error && (
          <div className="text-sm text-primary font-medium">
            All set! Redirecting you now...
          </div>
        )}
      </div>
    </div>
  );
}
