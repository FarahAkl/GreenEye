import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useOrderSummaryData from "../features/orders/hooks/useOrderSummaryData";
import useShippingRate from "../features/orders/hooks/useShippingRate";
import useCreateOrder from "../features/orders/hooks/useCreateOrder";
import useGetOrderById from "../features/orders/hooks/useGetOrderById";
import OrderSummary from "../features/orders/ui/OrderSummary";
import Stepper from "../ui/Stepper";
import OrderInfoForm from "../features/orders/ui/OrderInfoForm";
import PaymentForm from "../features/orders/ui/PaymentForm";
import type {
  shippingRateRequestT,
  shippingRateT,
} from "../schemas/shippingSchema";
import ShippingDetailsForm from "../features/orders/ui/ShippingDetaisForm";
import type { createOrderT } from "../schemas/ordersSchema";
import ConfirmationStep from "../features/orders/ui/ConfirmationStep";
import { useScrollToTop } from "../hooks/useScrollToTop";

// Steps 1–3 are inside the stepper. Payment is a 4th phase outside it.
type CheckoutStep = 1 | 2 | 3;
type Phase = "checkout" | "payment";

const Order = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const stepFromUrl = (searchParams.get("step") as "1" | "2" | "3") || "1";
  const orderIdFromUrl = searchParams.get("orderId");
  const shouldRestoreCheckout = searchParams.has("step") || !!orderIdFromUrl;
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    shouldRestoreCheckout ? (parseInt(stepFromUrl) as CheckoutStep) : 1,
  );
  const [phase, setPhase] = useState<Phase>("checkout");

  const [shippingInfo, setShippingInfo] = useState<shippingRateRequestT | null>(
    () => {
      if (!shouldRestoreCheckout) return null;
      const saved = localStorage.getItem("checkoutShippingInfo");
      return saved ? JSON.parse(saved) : null;
    },
  );

  const [selectedShippingRate, setSelectedShippingRate] =
    useState<shippingRateT | null>(() => {
      if (!shouldRestoreCheckout) return null;
      const saved = localStorage.getItem("checkoutSelectedRate");
      return saved ? JSON.parse(saved) : null;
    });

  const {
    isFetchShippingRate,
    shippingRates,
    isError: isShippingError,
    refetch,
  } = useShippingRate(currentStep === 2 ? shippingInfo : null);

  const {
    createOrder,
    orderId,
    clientSecret,
    isCreating,
    isError: isOrderError,
    error: orderError,
  } = useCreateOrder();

  const activeOrderId = orderId ? String(orderId) : orderIdFromUrl;
  const derivedPhase: Phase = activeOrderId ? "payment" : "checkout";
  const { order } = useGetOrderById({ orderId: activeOrderId || "" });
  const resolvedClientSecret = clientSecret ?? order?.data?.clientSecret ?? null;

  useEffect(() => {
    const hasCheckoutStep = searchParams.has("step");

    if (!orderIdFromUrl && !hasCheckoutStep) {
      localStorage.removeItem("checkoutShippingInfo");
      localStorage.removeItem("checkoutSelectedRate");
    }
  }, [orderIdFromUrl, searchParams]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (derivedPhase === "payment" && activeOrderId) {
      nextParams.set("orderId", activeOrderId);
      nextParams.delete("step");
    } else {
      nextParams.set("step", String(currentStep));
      nextParams.delete("orderId");
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeOrderId, currentStep, derivedPhase, searchParams, setSearchParams]);


  const steps = ["Your Information", "Shipment Details", "Confirmation"];

  const { items, subtotal, shipping, total, isLoading } = useOrderSummaryData({
    orderId: activeOrderId,
    selectedShippingPrice: selectedShippingRate?.amount || 0,
  });

  // ─── Step handlers ────────────────────────────────────────────────────────

  const handleStep1Complete = (data: shippingRateRequestT) => {
    localStorage.setItem("checkoutShippingInfo", JSON.stringify(data));
    localStorage.removeItem("checkoutSelectedRate");
    setShippingInfo(data);
    setSelectedShippingRate(null);
    setCurrentStep(2);
  };

  const handleStep2Complete = (rate: shippingRateT) => {
    localStorage.setItem("checkoutSelectedRate", JSON.stringify(rate));
    setSelectedShippingRate(rate);
    setCurrentStep(3);
  };

  // Step 3: user clicks "Place Order" — create the order, then move to payment
  const handleConfirm = async () => {
    if (!shippingInfo || !selectedShippingRate) return;

    const orderData: createOrderT = {
      phoneNumber: shippingInfo.phone,
      street: shippingInfo.street1,
      city: shippingInfo.city,
      state: shippingInfo.state,
      zipCode: shippingInfo.zip,
      country: shippingInfo.country,
      rateId: selectedShippingRate.rateId ?? "",
    };

    try {
      const createdOrder = await createOrder(orderData);
      setPhase("payment");
      setSearchParams(
        new URLSearchParams({ orderId: String(createdOrder.data.orderId) }),
        { replace: true },
      );
    } catch {
      // Error is captured in isOrderError / orderError inside the hook
    }
  };

  // Payment success
  const handlePaymentSuccess = (createdOrderId: number) => {
    localStorage.removeItem("checkoutShippingInfo");
    localStorage.removeItem("checkoutSelectedRate");
    navigate(`/order/${createdOrderId}/confirmation`);
  };

  const handleBack = () => {
    if (phase === "payment") {
      // Allow going back to confirmation to review (order is already created, that's fine)
      setPhase("checkout");
      setCurrentStep(3);
      return;
    }
    if (currentStep === 1) {
      localStorage.removeItem("checkoutShippingInfo");
      localStorage.removeItem("checkoutSelectedRate");
      navigate(-1);
    } else {
      setCurrentStep((prev) => (prev - 1) as CheckoutStep);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ─── Main checkout + payment layout ──────────────────────────────────────

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col gap-4 px-14 py-12">
        <div
          className="flex cursor-pointer items-center gap-2 font-semibold text-gray-400"
          onClick={handleBack}
        >
          <FaArrowLeft />
          <p>Back</p>
        </div>
        <OrderSummary
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          isLoading={false}
        />
      </div>

      {/* Right side */}
      <div className="bg-primary/10 relative px-10 py-12 lg:px-14">
        <img
          src="/images/productsBg.png"
          alt=""
          className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-4"
        />

        <div className="flex flex-col gap-4">
          {/* Header + stepper only during checkout steps */}
          {phase === "checkout" && (
            <>
              <p className="text-dark text-4xl font-medium">Placing Order</p>
              <Stepper steps={steps} currentStep={currentStep - 1} />
            </>
          )}

          {/* Payment phase header */}
          {derivedPhase === "payment" && (
            <p className="text-dark text-4xl font-medium">Placing Order</p>
          )}

          {/* Step 1 */}
          {derivedPhase === "checkout" && currentStep === 1 && (
            <OrderInfoForm
              onSuccess={handleStep1Complete}
              initialData={shippingInfo}
            />
          )}

          {/* Step 2 */}
          {derivedPhase === "checkout" && currentStep === 2 && shippingInfo && (
            <ShippingDetailsForm
              onSuccess={handleStep2Complete}
              initialSelectedRate={selectedShippingRate}
              isFetchShippingRate={isFetchShippingRate}
              shippingRates={shippingRates}
              isError={isShippingError}
              onRetry={refetch}
            />
          )}

          {/* Step 3 — Confirmation */}
          {derivedPhase === "checkout" &&
            currentStep === 3 &&
            selectedShippingRate &&
            shippingInfo && (
              <ConfirmationStep
                shippingInfo={shippingInfo}
                selectedShippingRate={selectedShippingRate}
                onConfirm={handleConfirm}
                isCreating={isCreating}
                isError={isOrderError}
                errorMessage={orderError?.message}
              />
            )}

          {/* Payment phase — outside the stepper */}
          {derivedPhase === "payment" && activeOrderId && resolvedClientSecret && (
            <PaymentForm
              orderId={Number(activeOrderId)}
              clientSecret={resolvedClientSecret}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
