import { useParams, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
//   FiMapPin,
//   FiPackage,
//   FiPhone,
//   FiMail,
} from "react-icons/fi";
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
      <SEO title="Order Confirmed" description="Thank you for your order! Your sustainable products are on their way." />
      {/* Left — order summary */}
      <div className="flex flex-col gap-4 px-14 py-12">
        <OrderSummary
          items={data.items ?? []}
          subtotal={data.subTotal ?? 0}
          shipping={data.deliveryFee ?? 0}
          total={data.totalPrice ?? 0}
          isLoading={false}
        />
      </div>

      {/* Right — confirmation details */}
      <div className="bg-primary/10 relative px-10 py-12 lg:px-14">
        <img
          src="/images/productsBg.png"
          alt=""
          className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-4"
        />

        <div className="flex flex-col gap-6">
          {/* Success header */}
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

          {/* Delivery address */}
          {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <FiMapPin className="text-primary" size={16} />
              <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                Delivery Address
              </p>
            </div>
            <p className="text-dark text-sm">{data.street}</p>
            <p className="text-sm text-gray-600">
              {data.city}, {data.state} {data.zipCode}
            </p>
            <p className="text-sm text-gray-600">{data.country}</p>
            <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
              {data.phoneNumber && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiPhone size={13} />
                  <span>{data.phoneNumber}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiMail size={13} />
                  <span>{data.email}</span>
                </div>
              )}
            </div>
          </div> */}

          {/* Shipping method */}
          {/* {data.shippingMethod && (
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
                    {data.shippingMethod.provider}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {data.shippingMethod.durationTerms}
                  </p>
                </div>
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-bold">
                  {data.deliveryFee} EGP
                </span>
              </div>
            </div>
          )} */}

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
