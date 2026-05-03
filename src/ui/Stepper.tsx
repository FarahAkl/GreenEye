import { motion } from "framer-motion"; 

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  const stepWidthPercentage = 100 / steps.length;
  const lineOffset = stepWidthPercentage / 2;

  return (
    <div className={`w-full py-8 ${className || ""}`}>
      <div className="relative flex items-center">
        {/* Connecting Lines Container */}
        <div
          className="absolute top-5 z-0 h-0.5 bg-gray-300"
          style={{
            left: `${lineOffset}%`,
            right: `${lineOffset}%`,
          }}
        />

        {/* Progress Line */}
        <motion.div
          className="absolute top-5 z-0 h-0.5 origin-left bg-primary"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: steps.length > 1 ? currentStep / (steps.length - 1) : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            left: `${lineOffset}%`,
            right: `${lineOffset}%`,
          }}
        />

        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-1 flex-col items-center self-start"
            >
              {/* Step Circle */}
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "bg-primary text-white" : "bg-gray-400 text-white"
                }`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isActive ? "var(--color-primary)" : "var(--color-gray-soft)",
                }}
              >
                {index + 1}
              </motion.div>

              {/* Step Label */}
              <div className="mt-4 px-2 text-center">
                <span
                  className={`line-clamp-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Stepper;
