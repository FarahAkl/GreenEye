import { useState } from "react";
import type { shippingRateT } from "../../../schemas/shippingSchema";
import Spinner from "../../../ui/Spinner";
import { FaCheck } from "react-icons/fa";

type Props = {
  onSuccess: (rate: shippingRateT) => void;
  initialSelectedRate?: shippingRateT | null;
  isFetchShippingRate: boolean;
  shippingRates: shippingRateT[] | null;
  isError: boolean;
  onRetry: () => void;
};

const ShippingDetailsForm = ({
  onSuccess,
  initialSelectedRate,
  isFetchShippingRate,
  shippingRates,
  isError,
  onRetry,
}: Props) => {
  const [selectedRate, setSelectedRate] = useState<shippingRateT | null>(
    initialSelectedRate ?? null,
  );

  // ✅ No useEffect — no manual fetch trigger — no duplicate requests

  if (isFetchShippingRate) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-dark py-4 text-3xl">Shipment Details</p>
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isError || !shippingRates || shippingRates.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-dark py-4 text-3xl">Shipment Details</p>
        <p className="text-red-500">
          No shipping rates available. Please try again.
        </p>
        <button
          onClick={onRetry}
          className="bg-primary mt-4 h-12 w-full rounded-2xl text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-dark py-4 text-3xl">Shipment Details</p>
      <p className="text-dark mb-2 px-3 font-semibold">
        Select Shipping Method
      </p>

      <div className="flex flex-col gap-3">
        {shippingRates.map((rate) => (
          <div
            key={rate.rateId}
            onClick={() => setSelectedRate(rate)}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selectedRate?.rateId === rate.rateId
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50 border-gray-200 bg-white"
            }`}
          >
            {selectedRate?.rateId === rate.rateId && (
              <div className="bg-primary absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full">
                <FaCheck className="text-sm text-white" />
              </div>
            )}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {rate.imageUrl && (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={rate.imageUrl}
                    alt={rate.provider || "Shipping provider"}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1 text-center sm:pr-8 sm:text-start">
                <p className="text-dark font-semibold">{rate.provider}</p>
                <p className="text-sm text-gray-500">{rate.durationTerms}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-dark font-bold">
                  {rate.amount} {rate.currency}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => selectedRate && onSuccess(selectedRate)}
          disabled={!selectedRate}
          className="bg-primary h-12 w-full rounded-2xl font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
