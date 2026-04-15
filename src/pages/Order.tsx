import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useOrderSummaryData from "../features/orders/hooks/useOrderSummaryData";
import OrderSummary from "../features/orders/ui/OrderSummary";
import Stepper from "../ui/Stepper";

const Order = () => {
  const navigate = useNavigate();
  const steps = [
    { id: 1, label: "Your Information" },
    { id: 2, label: "Shipment Details" },
    { id: 3, label: "Payment" },
  ];

  const { items, subtotal, shipping, total, isLoading } = useOrderSummaryData({
    orderId: null,
    selectedShippingPrice: 0,
  });

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
          onClick={() => navigate(-1)}
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
      <div className="bg-primary/10 relative px-14 py-12">
        <img
          src="/images/productsBg.png"
          alt=""
          className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-4"
        />
        <div className="flex flex-col gap-4">
          <p className="text-dark text-4xl font-medium">Placing Order</p>
          <Stepper steps={steps.map(step => step.label)} currentStep={1-1} />
        </div>
      </div>
    </div>
  );
};

export default Order;
