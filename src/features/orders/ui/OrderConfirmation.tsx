import { useParams, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import Spinner from "../../../ui/Spinner";
import useGetOrderById from "../hooks/useGetOrderById";
import OrderSummary from "./OrderSummary";
import SEO from "../../../ui/SEO";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { order, isFetchingOrder } = useGetOrderById({
    orderId: orderId ?? "",
  });

  if (isFetchingOrder) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const data = order?.data;

  if (!data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-500">Order not found.</p>
        <button
          onClick={() => navigate("/orders")}
          className="bg-primary rounded-2xl px-6 py-2.5 font-semibold text-white"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <SEO
        title="Order Confirmed"
        description="Thank you for your order! Your sustainable products are on their way."
      />
      <div className="flex flex-col gap-4 px-14 py-12">
        <OrderSummary
          items={data.items ?? []}
          subtotal={data.subTotal ?? 0}
          shipping={data.deliveryFee ?? 0}
          total={data.totalPrice ?? 0}
          isLoading={false}
        />
      </div>

      <div className="bg-primary/10 relative px-10 py-12 lg:px-14">
        <img
          src="/images/productsBg.webp"
          alt=""
          className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-4"
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <FiCheckCircle className="text-primary" size={56} />
            <p className="text-dark text-3xl font-semibold">
              Payment Successful!
            </p>
            <p className="text-gray-500">
              Your order has been placed and is being processed.
            </p>
            <p className="text-sm text-gray-400">Order #{orderId}</p>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="bg-primary mt-2 h-12 w-full rounded-2xl font-semibold text-white"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
