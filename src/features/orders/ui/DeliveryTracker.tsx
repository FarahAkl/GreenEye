import PlantIcon from "../../../ui/svg/PlantIcon";

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

const getStepIndex = (deliveryStatus: string): number => {
  return DELIVERY_STEP_ORDER[deliveryStatus] ?? 0;
};

const DeliveryTracker = ({
  deliveryStatus,
}: {
  deliveryStatus: string;
  createdAt: string;
}) => {
  const currentStep = getStepIndex(deliveryStatus);

  return (
    <div className="w-full">
      <div className="flex items-start">
        {DELIVERY_STEPS.map((step, i) => {
          const filled = i <= currentStep;
          const isLast = i === DELIVERY_STEPS.length - 1;

          return (
            <div
              key={step.key}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Connector line (except first step) */}
              {i > 0 && (
                <div
                  className="absolute top-3.25 right-1/2 z-0 h-0.75 w-full rounded-sm"
                  style={{ background: filled ? "#2d9e7a" : "#d1e8df" }}
                />
              )}

              {/* Icon */}
              {isLast && !filled ? (
                <div className="relative z-10 mt-0.75 h-5.5 w-5.5 rounded-full bg-[#c8d8d0]" />
              ) : (
                <PlantIcon active={filled} />
              )}

              {/* Label */}
              <div className="mt-1.5 flex flex-col items-center gap-px">

                <span
                  className={`text-[12px] font-semibold ${
                    filled ? "text-[#1a3a2e]" : "text-[#b0c9bc]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTracker;
