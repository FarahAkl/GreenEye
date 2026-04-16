import { useEffect, useState } from "react";
import type {
  shippingRateRequestT,
  shippingRateT,
} from "../../../schemas/shippingSchema";
import useShippingRate from "../hooks/useShippingRate";
import Spinner from "../../../ui/Spinner";
import { FaCheck } from "react-icons/fa";

type Props = {
  shippingInfo: shippingRateRequestT;
  onSuccess: (rate: shippingRateT) => void;
  initialSelectedRate?: shippingRateT | null;
};

const ShippingDetailsForm = ({
  shippingInfo,
  onSuccess,
  initialSelectedRate,
}: Props) => {
  const [selectedRate, setSelectedRate] = useState<shippingRateT | null>(
    initialSelectedRate || null,
  );
  const { shippingRate, isFetchShippingRate, shippingRates } =
    useShippingRate();

  // Fetch shipping rates on mount if not already fetched
  useEffect(() => {
    if (!shippingRates || shippingRates.length === 0) {
      shippingRate(shippingInfo);
    }
  }, [shippingInfo]);

  const handleSelectRate = (rate: shippingRateT) => {
    setSelectedRate(rate);
  };

  const handleContinue = () => {
    if (selectedRate) {
      onSuccess(selectedRate);
    }
  };

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

  if (!shippingRates || shippingRates.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-dark py-4 text-3xl">Shipment Details</p>
        <p className="text-red-500">
          No shipping rates available. Please try again.
        </p>
        <button
          onClick={() => shippingRate(shippingInfo)}
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
            onClick={() => handleSelectRate(rate)}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selectedRate?.rateId === rate.rateId
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50 border-gray-200 bg-white"
            }`}
          >
            {/* Checkmark */}
            {selectedRate?.rateId === rate.rateId && (
              <div className="bg-primary absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full">
                <FaCheck className="text-sm text-white" />
              </div>
            )}

            <div className="flex items-center gap-4">
              {/* Shipping Provider Image */}
              {rate.imageUrl && (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={rate.imageUrl}
                    alt={rate.provider || "Shipping provider"}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              {/* Shipping Details */}
              <div className="flex-1 pr-8">
                <p className="text-dark font-semibold">{rate.provider}</p>
                <p className="text-sm text-gray-500">{rate.durationTerms}</p>
              </div>

              {/* Cost */}
              <div className="flex flex-col items-end">
                <p className="text-dark font-bold">
                  {rate.amount} {rate.currency}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-4">
        <button
          onClick={handleContinue}
          disabled={!selectedRate}
          className="bg-primary h-12 w-full rounded-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
