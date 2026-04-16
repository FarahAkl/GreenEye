import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type {
  shippingRateRequestT,
  shippingRateT,
} from "../../../schemas/shippingSchema";
import type { createOrderT } from "../../../schemas/ordersSchema";
import useCreateOrder from "../hooks/useCreateOrder";
import Spinner from "../../../ui/Spinner";
import SpinnerBtn from "../../../ui/SpinnerBtn";

// Initialize Stripe outside component to avoid re-creating on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  shippingInfo: shippingRateRequestT;
  selectedShippingRate: shippingRateT;
  onSuccess: (orderId: number, clientSecret: string) => void;
};

type CheckoutFormProps = {
  orderId: number;
  clientSecret: string;
  onSuccess: (orderId: number, clientSecret: string) => void;
};

// ─── Inner form (has access to Stripe context via hooks) ──────────────────────

const CheckoutForm = ({
  orderId,
  clientSecret,
  onSuccess,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Fallback redirect URL — only used if the payment method requires a redirect
        return_url: `${window.location.origin}/order/${orderId}/confirmation`,
      },
      // Stay in the SPA for cards that don't need a redirect (most cards)
      redirect: "if_required",
    });

    if (error) {
      // Show the error inline instead of redirecting
      setPaymentError(error.message ?? "Payment failed. Please try again.");
      setIsProcessing(false);
      return;
    }

    // Payment confirmed — hand off to parent
    onSuccess(orderId, clientSecret);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        {/* Stripe's prebuilt UI for card number, expiry, CVC, etc. */}
        <PaymentElement />
      </div>

      {paymentError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {paymentError}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="bg-primary h-12 w-full rounded-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <SpinnerBtn />
          </div>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

// ─── Outer form (creates order, owns Stripe Elements wrapper) ─────────────────

const PaymentForm = ({
  shippingInfo,
  selectedShippingRate,
  onSuccess,
}: Props) => {
  // Build order payload — stable object passed to useCreateOrder
  const orderData: createOrderT = {
    phoneNumber: shippingInfo.phone,
    street: shippingInfo.street1,
    city: shippingInfo.city,
    state: shippingInfo.state,
    zipCode: shippingInfo.zip,
    country: shippingInfo.country,
    rateId: selectedShippingRate.rateId ?? "",
  };

  const { orderId, clientSecret, isCreating, isError, error } =
    useCreateOrder(orderData);

  // ── Loading: waiting for clientSecret ──────────────────────────────────────
  if (isCreating) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-dark py-4 text-3xl">Payment</p>
        <div className="flex flex-col items-center justify-center gap-3 py-12">
          <Spinner />
          <p className="text-sm text-gray-500">Preparing your order…</p>
        </div>
      </div>
    );
  }

  // ── Error: order creation failed ───────────────────────────────────────────
  if (isError || !clientSecret || !orderId) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-dark py-4 text-3xl">Payment</p>
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error?.message ??
            "Failed to create order. Please go back and try again."}
        </p>
      </div>
    );
  }

  // ── Ready: render Stripe Elements ──────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      <p className="text-dark py-4 text-3xl">Payment</p>

      {/* Order & shipping summary */}
      <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-dark font-semibold">Order Review</p>

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

      {/*
        Elements must wrap CheckoutForm so useStripe/useElements work.
        clientSecret tells Stripe which PaymentIntent this is for.
      */}
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: { theme: "stripe" },
        }}
      >
        <CheckoutForm
          orderId={orderId}
          clientSecret={clientSecret}
          onSuccess={onSuccess}
        />
      </Elements>
    </div>
  );
};

export default PaymentForm;
