import { useState } from "react";
import type {
  shippingRateRequestT,
  shippingRateT,
} from "../../../schemas/shippingSchema";
import type { createOrderT } from "../../../schemas/ordersSchema";
import useCreateOrder from "../hooks/useCreateOrder";
import SpinnerBtn from "../../../ui/SpinnerBtn";

type Props = {
  shippingInfo: shippingRateRequestT;
  selectedShippingRate: shippingRateT;
  onSuccess: (orderId: number, clientSecret: string) => void;
};

const PaymentForm = ({
  shippingInfo,
  selectedShippingRate,
  onSuccess,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { createOrder, isCreating } = useCreateOrder();

  const handleCreateOrder = () => {
    if (!agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);

    // Prepare order creation data
    const orderData: createOrderT = {
      phoneNumber: shippingInfo.phone,
      street: shippingInfo.street1,
      city: shippingInfo.city,
      state: shippingInfo.state,
      zipCode: shippingInfo.zip,
      country: shippingInfo.country,
      rateId: selectedShippingRate.rateId || "",
    };

    // Create order with callback
    createOrder(orderData, {
      onSuccess: (response) => {
        setIsProcessing(false);
        onSuccess(response.data.orderId, response.data.clientSecret);
      },
      onError: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-dark py-4 text-3xl">Payment</p>

      {/* Order Review */}
      <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-dark font-semibold">Order Review</p>

        {/* Shipping Info */}
        <div className="border-t border-gray-300 pt-3">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Delivery Address
          </p>
          <p className="text-dark text-sm">
            {shippingInfo.name}
            <br />
            {shippingInfo.street1}
            <br />
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
            <br />
            {shippingInfo.country}
          </p>
          <p className="text-dark mt-2 text-sm">📞 {shippingInfo.phone}</p>
          <p className="text-dark text-sm">✉️ {shippingInfo.email}</p>
        </div>

        {/* Shipping Method */}
        <div className="border-t border-gray-300 pt-3">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Shipping Method
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark text-sm font-semibold">
                {selectedShippingRate.provider}
              </p>
              <p className="text-xs text-gray-500">
                {selectedShippingRate.durationTerms}
              </p>
            </div>
            <p className="text-dark font-bold">
              {selectedShippingRate.amount} {selectedShippingRate.currency}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <p className="text-dark font-semibold">Payment Method</p>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">
            Stripe Payment will be processed on the next page after order
            confirmation.
          </p>
        </div>
      </div>

      {/* Agreement */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 cursor-pointer"
        />
        <label htmlFor="agree" className="cursor-pointer text-sm text-gray-600">
          I agree to the terms and conditions and confirm the delivery address
          is correct.
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          onClick={handleCreateOrder}
          disabled={isCreating || isProcessing || !agreed}
          className="bg-primary h-12 w-full rounded-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCreating || isProcessing ? (
            <div className="flex items-center justify-center">
              <SpinnerBtn />
            </div>
          ) : (
            "Complete Order"
          )}
        </button>
      </div>

      {/* Info Text */}
      <p className="text-center text-xs text-gray-500">
        You'll be redirected to payment after confirming this order.
      </p>
    </div>
  );
};

export default PaymentForm;
