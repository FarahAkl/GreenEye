import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiPackage, FiCheck } from "react-icons/fi";
import type {
  shippingRateRequestT,
  shippingRateT,
} from "../../../schemas/shippingSchema";
import SpinnerBtn from "../../../ui/SpinnerBtn";

type Props = {
  shippingInfo: shippingRateRequestT;
  selectedShippingRate: shippingRateT;
  onConfirm: () => Promise<void>;
  isCreating: boolean;
  isError: boolean;
  errorMessage?: string;
};

const ConfirmationStep = ({
  shippingInfo,
  selectedShippingRate,
  onConfirm,
  isCreating,
  isError,
  errorMessage,
}: Props) => {
  const [clicked, setClicked] = useState(false);

  const handlePlaceOrder = async () => {
    setClicked(true);
    await onConfirm();
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-dark py-2 text-3xl">Confirm Your Order</p>

      {/* Delivery Address Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <FiMapPin className="text-primary" size={16} />
          <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            Delivery Address
          </p>
        </div>
        <p className="text-dark font-semibold">{shippingInfo.name}</p>
        <p className="mt-1 text-sm text-gray-600">
          {shippingInfo.street1}
          {/* {shippingInfo.street2 ? `, ${shippingInfo.street2}` : ""} */}
        </p>
        <p className="text-sm text-gray-600">
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
        <p className="text-sm text-gray-600">{shippingInfo.country}</p>

        <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiPhone size={13} />
            <span>{shippingInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiMail size={13} />
            <span>{shippingInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Shipping Method Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <FiPackage className="text-primary" size={16} />
          <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            Shipping Method
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark font-semibold">
              {selectedShippingRate.provider}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              {selectedShippingRate.durationTerms}
            </p>
          </div>
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-bold">
            {selectedShippingRate.amount} EGP
          </span>
        </div>
      </div>

      {/* Error */}
      {isError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage ?? "Failed to create order. Please try again."}
        </p>
      )}

      {/* CTA */}
      <button
        onClick={handlePlaceOrder}
        disabled={isCreating || (clicked && !isError)}
        className="bg-primary mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isCreating ? (
          <SpinnerBtn />
        ) : (
          <>
            <FiCheck size={18} />
            Place Order
          </>
        )}
      </button>
    </div>
  );
};

export default ConfirmationStep;
