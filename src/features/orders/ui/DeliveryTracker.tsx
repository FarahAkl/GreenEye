const DELIVERY_STEPS = [
  { key: "Pending", label: "Placed" },
  { key: "LabelGenerated", label: "Packaged" },
  { key: "InTransit", label: "Shipped" },
  { key: "Delivered", label: "Delivered" },
] as const;

const DELIVERY_STEP_ORDER: Record<string, number> = {
  Pending: 0,
  LabelGenerated: 1,
  PickedUp: 1,
  InTransit: 2,
  OutForDelivery: 2,
  Delivered: 3,
  Failed: 3,
  Returned: 3,
};

const getStepIndex = (deliveryStatus: string): number =>
  DELIVERY_STEP_ORDER[deliveryStatus] ?? 0;

interface StepIconProps {
  filled: boolean;
  isCurrent: boolean;
  isLast: boolean;
  label: string;
}

const StepIcon = ({ filled, isCurrent, isLast, label }: StepIconProps) => {
  if (isLast && !filled) {
    return (
      <div className="relative z-10 h-5.5 w-5.5 rounded-full bg-[#c8d8d0]" />
    );
  }

  return (
    <div className="relative z-10 flex items-center justify-center">
      {isCurrent && (
        <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#1D9E75]/25" />
      )}
      <img
        src={filled ? "/icons/active-status.svg" : "/icons/inactive-status.svg"}
        alt={label}
        className={`relative z-10 h-6 w-6 transition-all duration-500 ${filled ? "drop-shadow-[0_2px_8px_rgba(29,158,117,0.45)]" : "opacity-50"} ${isCurrent ? "scale-110" : "scale-100"} `}
      />
    </div>
  );
};

const DeliveryTracker = ({
  deliveryStatus,
}: {
  deliveryStatus: string;
  createdAt?: string;
}) => {
  const currentStep = getStepIndex(deliveryStatus);

  return (
    <div className="w-full">
      <div className="flex items-center">
        {DELIVERY_STEPS.map((step, i) => {
          const filled = i <= currentStep;
          const isCurrent = i === currentStep;
          const isLast = i === DELIVERY_STEPS.length - 1;

          return (
            <div
              key={step.key}
              className={`flex items-center ${isLast ? "" : "flex-1"}`}
            >
              {/* Icon + label stacked */}
              <div className="flex flex-col items-center gap-2">
                <StepIcon
                  filled={filled}
                  isCurrent={isCurrent}
                  isLast={isLast}
                  label={step.label}
                />
                <span
                  className={`text-[11px] font-semibold tracking-wide uppercase transition-colors duration-500 ${
                    filled ? "text-[#1a3a2e]" : "text-[#b0c9bc]"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line between icons — sits between two steps */}
              {!isLast && (
                <div className="relative mx-1 -top-2.5 h-0.5 flex-1 overflow-hidden rounded-sm bg-gray-300">
                  <div
                    className={`h-full origin-left rounded-sm bg-[#1D9E75] transition-transform duration-500 ease-out ${
                      i < currentStep ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTracker;
