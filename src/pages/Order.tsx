import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useOrderSummaryData from "../features/orders/hooks/useOrderSummaryData";
import OrderSummary from "../features/orders/ui/OrderSummary";
import Stepper from "../ui/Stepper";
import OrderInfoForm from "../features/orders/ui/OrderInfoForm";
import type {
  shippingRateRequestT,
  shippingRateT,
} from "../schemas/shippingSchema";
import ShippingDetailsForm from "../features/orders/ui/ShippingDetaisForm";
import PaymentForm from "../features/orders/ui/PaymentForm";

type CheckoutStep = 1 | 2 | 3;

const Order = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get step from URL, default to 1
  const stepFromUrl = (searchParams.get("step") as "1" | "2" | "3") || "1";
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    parseInt(stepFromUrl) as CheckoutStep,
  );

  // Restore data from localStorage
  const [shippingInfo, setShippingInfo] = useState<shippingRateRequestT | null>(
    () => {
      const saved = localStorage.getItem("checkoutShippingInfo");
      return saved ? JSON.parse(saved) : null;
    },
  );

  const [selectedShippingRate, setSelectedShippingRate] =
    useState<shippingRateT | null>(() => {
      const saved = localStorage.getItem("checkoutSelectedRate");
      return saved ? JSON.parse(saved) : null;
    });

  const [orderId, setOrderId] = useState<number | null>(null);
  const [, setClientSecret] = useState<string | null>(null);

  // Sync step to URL
  useEffect(() => {
    setSearchParams({ step: String(currentStep) });
  }, [currentStep, setSearchParams]);

  const steps = [
    { id: 1, label: "Your Information" },
    { id: 2, label: "Shipment Details" },
    { id: 3, label: "Payment" },
  ];

  const { items, subtotal, shipping, total, isLoading } = useOrderSummaryData({
    orderId: orderId ? String(orderId) : null,
    selectedShippingPrice: selectedShippingRate?.amount || 0,
  });

  const handleStep1Complete = (data: shippingRateRequestT) => {
    // Save to localStorage
    localStorage.setItem("checkoutShippingInfo", JSON.stringify(data));
    setShippingInfo(data);
    setCurrentStep(2);
  };

  const handleStep2Complete = (rate: shippingRateT) => {
    // Save to localStorage
    localStorage.setItem("checkoutSelectedRate", JSON.stringify(rate));
    setSelectedShippingRate(rate);
    setCurrentStep(3);
  };

  const handleStep3Complete = (createdOrderId: number, secret: string) => {
    setOrderId(createdOrderId);
    setClientSecret(secret);
    // Clear checkout data on successful order creation
    localStorage.removeItem("checkoutShippingInfo");
    localStorage.removeItem("checkoutSelectedRate");
    navigate(`/order/${createdOrderId}/confirmation`);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      // Clear data when exiting checkout
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
      <div className="bg-primary/10 relative px-10 lg:px-14 py-12">
        <img
          src="/images/productsBg.png"
          alt=""
          className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-4"
        />
        <div className="flex flex-col gap-4">
          <p className="text-dark text-4xl font-medium">Placing Order</p>
          <Stepper
            steps={steps.map((step) => step.label)}
            currentStep={currentStep - 1}
          />

          {/* Step 1: Your Information */}
          {currentStep === 1 && (
            <OrderInfoForm
              onSuccess={handleStep1Complete}
              initialData={shippingInfo}
            />
          )}

          {/* Step 2: Shipment Details */}
          {currentStep === 2 && shippingInfo && (
            <ShippingDetailsForm
              shippingInfo={shippingInfo}
              onSuccess={handleStep2Complete}
              initialSelectedRate={selectedShippingRate}
            />
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && selectedShippingRate && shippingInfo && (
            <PaymentForm
              shippingInfo={shippingInfo}
              selectedShippingRate={selectedShippingRate}
              onSuccess={handleStep3Complete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
