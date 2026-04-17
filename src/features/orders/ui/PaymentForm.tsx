import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FiLock } from "react-icons/fi";
import SpinnerBtn from "../../../ui/SpinnerBtn";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  orderId: number;
  clientSecret: string;
  onSuccess: (orderId: number) => void;
};

// ─── Inner form (has access to Stripe context via hooks) ──────────────────────

const CheckoutForm = ({ orderId, onSuccess }: Props) => {
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
        return_url: `${window.location.origin}/order/${orderId}/confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      setPaymentError(error.message ?? "Payment failed. Please try again.");
      setIsProcessing(false);
      return;
    }

    onSuccess(orderId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Stripe Payment Element */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {paymentError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {paymentError}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="bg-primary mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isProcessing ? (
          <SpinnerBtn />
        ) : (
          <>
            <FiLock size={16} />
            Pay Now
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <FiLock size={11} />
        Secured by Stripe · Your payment info is never stored
      </p>
    </form>
  );
};

// ─── Outer wrapper (owns Stripe Elements provider) ────────────────────────────

const PaymentForm = ({ orderId, clientSecret, onSuccess }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-dark py-2 text-3xl">Payment</p>

      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: { theme: "stripe" } }}
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
